/* globals THREE, THR, THRU, FOB, GBXU */
// jshint esversion: 6
// jshint loopfunc: true

"use strict";

var GBX = {
	script: {

		copyright: "Copyright 2019 Ladybug Tools authors",
		date: "2019-09-06",
		description: "Parse gbXML surfaces etc and use the data to create Three.js meshes",
		helpFile: "../js-core-gbxml/gbx-gbxml-parser.md",
		license: "MIT License",
		urlSourceCode: "https://github.com/ladybug-tools/spider-gbxml-tools/tree/master/spider-gbxml-viewer/v-0-17-01/js-core-gbxml",
		version: "0.17.00-0gbx"
	}

};

GBX.filtersDefault = [ "Air", "ExposedFloor", "ExteriorWall", "RaisedFloor", "Roof",  "Shade",
	"SlabOnGrade", "UndergroundWall", "UndergroundSlab" ];


GBX.colorsDefault = {

	InteriorWall: 0x008000,
	ExteriorWall: 0xFFB400,
	Roof: 0x800000,
	InteriorFloor: 0x80FFFF,
	ExposedFloor: 0x40B4FF,
	Shade: 0xFFCE9D,
	UndergroundWall: 0xA55200,
	UndergroundSlab: 0x804000,
	Ceiling: 0xFF8080,
	Air: 0xFFFF00,
	UndergroundCeiling: 0x408080,
	RaisedFloor: 0x4B417D,
	SlabOnGrade: 0x804000,
	FreestandingColumn: 0x808080,
	EmbeddedColumn: 0x80806E,
	Undefined: 0x88888888

};

GBX.colors = Object.assign( {}, GBX.colorsDefault ); // create working copy of default colors
GBX.surfaceTypes = Object.keys( GBX.colors );

//var colors =  GBX.surfaceTypes.map( type => GBX.colorsDefault[ type ].toString( 16 ) );
//GBX.colorsHex = colors.map( color => color.length > 4 ? color : '00' + color ); // otherwise greens no show


GBX.opacity = 0.85;

GBX.referenceObject = new THREE.Object3D();
GBX.triangle = new THREE.Triangle(); // used by GBX.getPlane


GBX.parseFile = function( gbxml )  {
	//console.log( 'gbxml', gbxml );

	if ( !gbxml || gbxml.includes( "xmlns" ) === false ) { return; }

	GBX.timeStart = performance.now();

	THRU.setSceneDispose();

	GBX.openingGroup = [];
	GBX.boundingBox = undefined;
	GBX.placards = new THREE.Group();

	GBX.text = gbxml.replace( /\r\n|\n/g, '' );
	//console.log( 'GBX.text', GBX.text );

	const reSurface = /<Surface(.*?)<\/surface>/gi;
	GBX.surfaces = GBX.text.match( reSurface );
	console.log( 'GBX.surfaces', GBX.surfaces.length );

	var meshes = GBX.getSurfaceMeshes( GBX.surfaces );
	//console.log( '', meshes.length );

	GBX.meshGroup = new THREE.Group();
	GBX.meshGroup.name = 'GBX.meshGroup';

	for ( var mesh of meshes ) { GBX.meshGroup.add( mesh ); }

	//divMsg.innerHTML += "<p>mesh " + JSON.stringify( mesh )
	divMsg.innerHTML += "<p>len " + GBX.meshGroup.children.length;

	THR.scene.add( GBX.meshGroup );

	const event = new Event( 'onGbxParse' );
	document.body.dispatchEvent( event );
	//use this: document.body.addEventListener( 'onGbxParse', yourFunction, false );

	THRU.zoomObjectBoundingSphere();

	return GBX.surfaces.length;

};



GBX.getSurfaceMeshes = function( surfaces ) {
	// console.log( 'surfaces', surfaces );

	const timeStart = performance.now();

	GBX.materialType = THREE.MeshPhongMaterial;
	//GBX.materialType = THREE.MeshBasicMaterial;

	const meshes = surfaces.map( ( surface ) => {

		const polyLoops = GBX.getPolyLoops( surface );
		//console.log( 'polyLoops', polyLoops );

		const coordinates = GBX.getCoordinates( polyLoops[ 0 ] );

		const index = GBX.surfaces.indexOf( surface );
		//console.log( 'index', index );

		const openings = polyLoops.slice( 1 ).map( polyLoop => GBX.getCoordinates( polyLoop ) );
		//console.log( 'openings', openings );

		//console.log( 'surface', surface );

		const mesh = GBX.getSurfaceMesh( coordinates, index, openings );
		//console.log( 'mesh', index, mesh );

		return mesh;

	} );

	//console.log( '',  performance.now() - timeStart );

	return meshes;

};



GBX.getPolyLoops = function( surface ) {
	//console.log( 'surface', surface );

	const re = /<PlanarGeometry(.*?)<polyloop(.*?)<\/polyloop>/gi;
	const polyloopText = surface.match( re );

	const polyloops = polyloopText.map( polyloop => polyloop.replace(/<\/?polyloop>/gi, '' ) );

	return polyloops;

};



GBX.getCoordinates = function( text ) {

	const re = /<coordinate(.*?)<\/coordinate>/gi;
	const coordinatesText = text.match( re );
	const coordinates = coordinatesText.map( coordinate =>

		coordinate.replace(/<\/?coordinate>/gi, '' ) )
		.map( txt => Number( txt )

	);

	return coordinates;

};



GBX.getSurfaceMesh = function( arr, index, holes ) {
	//console.log( 'array', arr, 'index', index );

	holes = holes || [];
	const surface = GBX.surfaces[ index ];

	const surfaceType = surface.match( 'surfaceType="(.*?)"')[ 1 ];
	const color = new THREE.Color( GBX.colors[ surfaceType ] );
	const v = ( arr ) => new THREE.Vector3().fromArray( arr );

	var points, mesh, pointsHoles;

	if ( arr.length < 6 ) {

		console.log( 'not enough to draw a line', arr );
		return;

	} else if ( arr.length < 9 ) {

		points = [ v( arr.slice( 0, 3 ) ), v( arr.slice( 3, 6 ) ), v( arr.slice( 0, 3 ) ) ];

		mesh = GBX.getBufferGeometry( points, color );

		return;

	} else if ( arr.length === 9 ) {

		points = [ v( arr.slice( 0, 3 ) ), v( arr.slice( 3, 6 ) ), v( arr.slice( 6 ) ) ];

		mesh = GBX.getBufferGeometry( points, color );

	} else if ( arr.length === 12 && holes.length === 0 ) {

		points = [

			v( arr.slice( 0, 3 ) ), v( arr.slice( 3, 6 ) ), v( arr.slice( 6, 9 ) ),
			v( arr.slice( 0, 3 ) ),  v( arr.slice( 6, 9 ) ), v( arr.slice( 9, 12 ) )

		];

		mesh = GBX.getBufferGeometry( points, color );

	} else {

		points = [];

		for ( var i = 0; i < ( arr.length / 3 ); i ++ ) {

			points.push( v( arr.slice( 3 * i, 3 * i + 3 ) )  );

		}

		pointsHoles = [];

		for ( var i = 0; i < holes.length; i ++ ) {

			const hole = holes[ i ];
			const points2 = [];

			for ( var j = 0; j < ( hole.length / 3 ); j ++ ) {

				points2.push( v( hole.slice( 3 * j, 3 * j + 3 ) ) );

			}

			pointsHoles.push( points2 );

		}

		//console.log( 'index', index, pointsHoles );

		mesh = GBX.setPolygon( points, color, pointsHoles, index );


	}

	//mesh.castShadow = mesh.receiveShadow = true;
	mesh.userData.index = index;
	mesh.userData.surfaceType = surfaceType;

	return mesh;

};


GBX.getBufferGeometry = function ( points, color ) {
	//console.log( 'points', points, color );

	const geometry = new THREE.BufferGeometry();
	geometry.setFromPoints( points );
	geometry.computeVertexNormals();

	const material = new GBX.materialType( { color: color, opacity: GBX.opacity, side: 2, transparent: true });

	const mesh = new THREE.Mesh( geometry, material );

	return mesh;

};


GBX.setPolygon = function( points, color, holes, index ) {

	holes = holes || [];
	//console.log( 'holes', holes );

	//assume points are coplanar but at an arbitrary rotation and position in space
	const plane = GBX.getPlane( points );
	//console.log( '', index, plane );

	// rotate points to lie on XY plane
	GBX.referenceObject.lookAt( plane.normal ); // copy the rotation of the plane
	GBX.referenceObject.quaternion.conjugate(); // figure out the angle it takes to rotate the points so they lie on the XY plane
	GBX.referenceObject.updateMatrixWorld();

	const pointsFlat = points.map( vertex => GBX.referenceObject.localToWorld( vertex ) );
	//console.log( { index },{ pointsFlat } );

	holes.forEach( pointsHoles => pointsHoles.forEach( vertex => GBX.referenceObject.localToWorld( vertex ) ) );

	// points must be coplanar with the XY plane for Earcut.js to triangulate a set of points
	const triangles = THREE.ShapeUtils.triangulateShape( pointsFlat, holes );
	//const triangles = THREE.ShapeUtils.triangulateShape( pointsFlat );
	//console.log( { triangles } );

	//var pointsAll = points.slice().concat( ...holes );
	//console.log( '', JSON.stringify( pointsAll ) );
	//divMsg.innerHTML += "<p>pointsAll " + index + JSON.stringify( pointsAll )

	var pointsAll2 = points.slice();

	for ( var hole of holes ) {

		for ( var ptH of hole ) {

			pointsAll2.push( ptH );

		}

	}
	//console.log( 'pointsAll2', JSON.stringify( pointsAll2 ) );

	//if ( JSON.stringify( pointsAll )  !== JSON.stringify( pointsAll2 )  ) { console.log( '', JSON.stringify( pointsAll2 )  );}

	//divMsg.innerHTML += "<p>pointsAll2 " + index + JSON.stringify( pointsAll2 )

	const pointsTriangles = [];

	for ( var triangle of triangles ) {

		for ( var j = 0; j < 3; j++ ) {

			const vertex = pointsAll2[ triangle[ j ] ];

			pointsTriangles.push( vertex );

		}

	}
	//console.log( { pointsTriangles } );

	const geometry = new THREE.BufferGeometry();
	geometry.setFromPoints( pointsTriangles );
	geometry.computeVertexNormals();

	const material = new GBX.materialType( {
		color: color, opacity: GBX.opacity, side: 2, transparent: true } );

	const mesh = new THREE.Mesh( geometry, material );
	mesh.lookAt( plane.normal );

	return mesh;

};



GBX.getPlane = function( points, start ) {
	//console.log( 'points', points, start );

	start = start || 0;

	GBX.triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );

	if ( GBX.triangle.getArea() === 0 && ( ++start < points.length - 2 ) ) { // looks like points are colinear and do not form a plane therefore try next set of points

		GBX.getPlane( points, start );

	}

	return GBX.triangle.getPlane( new THREE.Plane() );

};