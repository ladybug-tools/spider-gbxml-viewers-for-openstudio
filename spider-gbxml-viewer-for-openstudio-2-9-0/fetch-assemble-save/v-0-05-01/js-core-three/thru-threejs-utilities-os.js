// /* global THREE, THR, Stats, rngOpacity, outOpacity */
// jshint esversion: 6
// jshint loopfunc: true

"use strict";

var THRU = {

	copyright: "Copyright 2019 Ladybug Tools authors",
	date: "2019-07-24",
	description: "Three.js utilities",
	helpFile: "../js-core/thru-threejs-utilities.md",
	license: "MIT License",
	version: "0.17.00-0thru-os"

};



THRU.initializeThreejsUtilities = function( radius ) {

	//console.log( '', THRU );

	// called from main html / assumes three.js is loaded

	THRU.helperNormalsFaces = undefined;

	THRU.radius = radius || 50;

	THRU.zoomObjectBoundingSphere();

	THRU.addSomeLights2();

	THRU.toggleAxesHelper();

	//THR.controls.autoRotate = true;

	//THRU.toggleGroundHelper();

	//THRU.toggleEdges();

	//THRU.toggleBoundingBoxHelper();


	window.addEventListener( 'keyup', THRU.onSetRotate , false );
	THR.renderer.domElement.addEventListener( 'click', THRU.onSetRotate, false );
	THR.renderer.domElement.addEventListener( 'touchstart', THRU.onSetRotate, false );

};




////////// Scene

THRU.setSceneDispose = function( objArr ) {
	// console.log( 'THR.scene', THR.scene );

	THR.scene.traverse( child => {

		if ( child.geometry ) {

			child.geometry.dispose();

		}

		if ( child.material ) {

			child.material.dispose();

		}

	} );

	THR.scene.children.forEach( child => THR.scene.remove( child ) );

	THR.scene.remove( THRU.helperNormalsFaces );

	THR.scene.dispose();

	THR.scene = new THREE.Scene();


};



////////// Info / move to a view menu??

THRU.getRendererInfo = function() {

	var txt =
	"Memory" +
	"\n- Geometries: " + THR.renderer.info.memory.geometries.toLocaleString() +
	"\n\nRenderer" +
	"\n- Triangles: " + THR.renderer.info.render.triangles.toLocaleString() +
	"\n- Lines:" + THR.renderer.info.render.lines.toLocaleString();

	alert( txt );

	console.log( 'THR.renderer.info', THR.renderer.info );

	// var htm =
	// `
	// 	<p>
	// 		<b>memory</b><br>
	// 		geometries: ${ THR.renderer.info.memory.geometries.toLocaleString() }
	// 	</p>
	// 	<p>
	// 		<b>renderer</b><br>
	// 		triangles: ${ THR.renderer.info.render.triangles.toLocaleString() } <br>
	// 		lines: ${ THR.renderer.info.render.lines.toLocaleString() } <br>
	// 	</p>
	// 	<p>
	// 		<button onclick=divRendererInfo.innerHTML=THRU.getRendererInfo(); >update info</button>

	// 		<a href="https://threejs.org/docs/#api/en/renderers/WebGLRenderer.info" target="_blank">?</a>

	// 		<button onclick=THRU.setStats(); >stats</button>

	// 		<a href="https://github.com/mrdoob/stats.js/" target="_blank">?</a>

	// 	</p>
	// `;

	// return htm;

};



THRU.setStats = function() {

	var script = document.createElement('script');

	script.onload = function() {

		var stats = new Stats();

		document.body.appendChild( stats.dom );

		requestAnimationFrame( function loop() {

			stats.update();

			requestAnimationFrame( loop );

		} );

	};

	script.src = 'https://cdn.jsdelivr.net/gh/mrdoob/stats.js@master/build/stats.min.js';

	document.head.appendChild( script );

};



////////// Camera and Controls

THRU.zoomObjectBoundingSphere = function( obj ) {
	//console.log( 'obj', obj );

	obj = obj || THR.scene;
	var bbox = new THREE.Box3().setFromObject( obj );
	//console.log( 'bbox', bbox )

	if ( bbox.isEmpty() === true ) { return; }

	var sphere = bbox.getBoundingSphere( new THREE.Sphere() );
	THRU.center = sphere.center;
	THRU.radius = sphere.radius;

	THR.controls.target.copy( THRU.center ); // needed because model may be far from origin
	THR.controls.maxDistance = 5 * THRU.radius;

	THR.camera.position.copy( THRU.center.clone().add( new THREE.Vector3( 1.5 * THRU.radius, 1.5 * THRU.radius, 1.5 * THRU.radius ) ) );
	THR.camera.near = 0.001 * THRU.radius; //2 * camera.position.length();
	THR.camera.far = 10 * THRU.radius; //2 * camera.position.length();
	THR.camera.updateProjectionMatrix();

	if ( THRU.lightDirectional ) {

		THRU.lightDirectional.position.copy( THRU.center.clone().add( new THREE.Vector3( 1.5 * THRU.radius, -1.5 * THRU.radius, 1.5 * THRU.radius ) ) );
		THRU.lightDirectional.shadow.camera.scale.set( 0.2 * THRU.radius, 0.2 * THRU.radius, 0.01 * THRU.radius );

		THRU.targetObject.position.copy( THRU.center );

		//THR.scene.remove( THRU.cameraHelper );
		//THRU.cameraHelper = new THREE.CameraHelper( THRU.lightDirectional.shadow.camera );
		//THR.scene.add( THRU.cameraHelper );

	}

};



////////// Visibility


THRU.getMeshesVisible = function ( objThree ) { // not??
	//console.log( '', objThree );

	objThree = objThree || THR.scene;

	THRU.meshGroupVisible = new THREE.Object3D();

	var arr = objThree.children.filter( mesh => mesh.visible ).map ( mesh => mesh.clone() );
	//THRU.meshGroupVisible.add( ...arr );

	//console.log( 'THRU.meshGroupVisible', THRU.meshGroupVisible );

	return THRU.meshGroupVisible;

};




THRU.toggleMeshesVisible = function( obj) {

	obj = obj || THR.scene;

	obj.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.visible = !child.visible;

		}

	} );

};



THRU.toggleWireframe = function( obj ) {

	obj = obj || THR.scene;

	obj.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.material.wireframe = !child.material.wireframe;

		}

	} );

};




THRU.toggleSurfaceNormalsVisible = function() {

	var material = new THREE.MeshNormalMaterial();

	var types = [ 'BoxBufferGeometry', 'BufferGeometry', 'ConeBufferGeometry', 'CylinderBufferGeometry',
		'ShapeBufferGeometry', 'SphereBufferGeometry' ];

	if ( THRU.helperNormalsFaces ) {

		THR.scene.remove( THRU.helperNormalsFaces );

		THRU.helperNormalsFaces = undefined;

	} else {

		THRU.helperNormalsFaces = new THREE.Group();

		THR.scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh && child.visible ) {

				if ( child.geometry.type === 'Geometry' ) {

					child.geometry.computeFaceNormals();

					var helperNormalsFace = new THREE.FaceNormalsHelper( child, 2, 0xff00ff, 3 );
					THRU.helperNormalsFaces.add( helperNormalsFace );
					//THRU.helperNormalsFaces.visible = false;
					//console.log( 'helperNormalsFace', helperNormalsFace );

				} else if ( types.indexOf( child.geometry.type ) >= 0 ) {

					var geometry = new THREE.Geometry();
					var geo = geometry.fromBufferGeometry( child.geometry );
					var mesh = new THREE.Mesh( geo, material );
					mesh.rotation.copy( child.rotation );
					mesh.position.copy( child.position );

					var helperNormalsFace = new THREE.FaceNormalsHelper( mesh, 0.05 * THRU.radius, 0xff00ff );
					helperNormalsFace.userData.index = child.userData.index;

					THRU.helperNormalsFaces.add( helperNormalsFace );
					//THRU.helperNormalsFaces.visible = false;

				} else {

					//console.log( 'child.geometry.type', child.geometry.type );

				}

			}

		} );

		THRU.helperNormalsFaces.name = 'helperNormalsFaces';

		THR.scene.add( THRU.helperNormalsFaces );

	}

	//console.log( 'THRU.helperNormalsFaces', THRU.helperNormalsFaces );

};


THRU.setObjectOpacity = function( obj, range ) {

	obj = obj || THR.scene;

	range = range || rngOpacity;

	var opacity = parseInt( range.value, 10 );
	outOpacity.value = opacity + '%';

	obj.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.material.opacity = opacity / 100;

		}

	} );

};


////////// Helpers in the scene

THRU.toggleAxesHelper = function() {

	if ( !THRU.axesHelper ) {

		THRU.axesHelper = new THREE.AxesHelper();
		THR.scene.add( THRU.axesHelper );

	 } else {

		THRU.axesHelper.visible = !THRU.axesHelper.visible;

	}

	THRU.axesHelper.scale.set( THRU.radius, THRU.radius, THRU.radius );
	THRU.axesHelper.name = "axesHelper";

	var center = THRU.center || THR.scene.position;

	THRU.axesHelper.position.copy( center );

};



THRU.toggleBoundingBoxHelper = function( obj ){

	obj = obj || THR.scene;

	if ( !THRU.boundingBoxHelper ) {

		var bbox = new THREE.Box3().setFromObject( obj );

		THRU.boundingBoxHelper = new THREE.Box3Helper( bbox, 0xff0000 );
		THRU.boundingBoxHelper.geometry.computeBoundingBox();
		THRU.boundingBoxHelper.name = "boundingBoxHelper";
		THR.scene.add( THRU.boundingBoxHelper );

	 } else {

		THRU.boundingBoxHelper.visible = !THRU.boundingBoxHelper.visible;

	}

};



THRU.toggleGroundHelper = function( position, elevation ) {

	// move to THRU but z min should be zero

	position = position || THR.scene.position.clone(),
	elevation = elevation || 0;

	if ( !THRU.groundHelper ) {

		//var reElevation = /<Elevation>(.*?)<\/Elevation>/i;
		//GBX.elevation = GBX.text.match( reElevation )[ 1 ];
		//console.log( 'elevation', GBX.elevation );

		//elevation = GBX.boundingBox.box.min.z - 0.001 * THRU.radius;
		//elevation = 0;

		var geometry = new THREE.PlaneGeometry( 2 * THRU.radius, 2 * THRU.radius);
		var material = new THREE.MeshPhongMaterial( { color: 0x888888, opacity: 0.5, side: 2 } );
		THRU.groundHelper = new THREE.Mesh( geometry, material );
		THRU.groundHelper.receiveShadow = true;

		THRU.groundHelper.position.set( position.x, position.y, parseFloat( elevation ) );
		THRU.groundHelper.name = "groundHelper";

		THR.scene.add( THRU.groundHelper );

		return;

	}

	THRU.groundHelper.visible = !THRU.groundHelper.visible;

};


//////////

THRU.getMeshEdges = function( obj ) {


	var meshEdges = [];
	var lineMaterial = new THREE.LineBasicMaterial( { color: 0x888888 } );

	for ( var mesh of obj.children ) {

		if ( !mesh.geometry ) { continue; }

		var edgesGeometry = new THREE.EdgesGeometry( mesh.geometry );
		var surfaceEdge = new THREE.LineSegments( edgesGeometry, lineMaterial );
		//surfaceEdge.rotation.copy( mesh.rotation );
		//surfaceEdge.position.copy( mesh.position );
		mesh.add( surfaceEdge );

	}
	//console.log( 'meshEdges', meshEdges );

	return meshEdges;

};



THRU.toggleEdges = function( obj ) {

	obj = obj || THR.scene;

	obj.traverse( child => {

		if ( child instanceof THREE.Line ) {

			child.visible = !child.visible;

		}

	} );

};


////////// Lights

THRU.addSomeLights = function() {

	THR.renderer.shadowMap.enabled = true;
	THR.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	THRU.lightAmbient = new THREE.AmbientLight( 0x888888 );
	THRU.lightAmbient.name = 'lightAmbient';
	THR.scene.add( THRU.lightAmbient );

	THRU.light1 = new THREE.DirectionalLight( 0xffffff, 0.75 );
	THRU.light1.position.set( 1, 1, 1 ).normalize();
	THRU.light1.castShadow = true;
	THR.scene.add( THRU.light1 );

	THRU.light2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
	THRU.light2.position.set( 0, 0, -1 ).normalize();
	THR.scene.add( THRU.light2 );

};



THRU.addSomeLights2 = function() {

	THR.renderer.shadowMap.enabled = true;
	THR.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	THRU.lightAmbient = new THREE.AmbientLight( 0x444444 );
	THRU.lightAmbient.name = 'lightAmbient';
	THR.scene.add( THRU.lightAmbient );

	THRU.lightDirectional = new THREE.DirectionalLight( 0xffffff, 1 );
	THRU.lightDirectional.shadow.mapSize.width = 2048;  // default 512
	THRU.lightDirectional.shadow.mapSize.height = 2048;
	THRU.lightDirectional.castShadow = true;
	THR.scene.add( THRU.lightDirectional );

	THRU.targetObject = new THREE.Object3D();
	THR.scene.add( THRU.targetObject );

	THRU.lightDirectional.target = THRU.targetObject;

	var position = new THREE.Vector3( 0, 0, 1 );
	THRU.lightPoint = ( new THREE.PointLight( 0xffffff, 0.5, { position } ) );

	THR.camera.add( THRU.lightPoint );
	THR.scene.add( THR.camera );

};



////////// Get some meshes and stuff for testing or annotating

THRU.getGeometry = function() {

	// useful debug snippet
	var geometry = new THREE.TorusKnotBufferGeometry( 10, 3, 100, 16 );
	//var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );

	var material = new THREE.MeshNormalMaterial();
	var mesh = new THREE.Mesh( geometry, material );

	var edgesGeometry = new THREE.EdgesGeometry( geometry );
	var edgesMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
	var surfaceEdge = new THREE.LineSegments( edgesGeometry, edgesMaterial );

	mesh.add( surfaceEdge );

	return mesh;

	// add to HTML file:
	// mesh = THRU.getGeometry();
	// THR.scene.add( mesh );

};



THRU.getSomeBoxes = function( count, size, material ) {

	count = count || 500;
	size = size || 10;
	material = material || new THREE.MeshNormalMaterial();

	var geometry = new THREE.BoxBufferGeometry( size, size, size );

	var boxes = new THREE.Group();

	for ( var i = 0; i < count; i++ ) {

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 100 * Math.random() - 50, 100 * Math.random() - 50, 100 * Math.random() - 50 );
		mesh.rotation.set( 2 * Math.random(), 2 * Math.random(), 2 * Math.random() );

		var edgesGeometry = new THREE.EdgesGeometry( mesh.geometry );
		var edgesMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
		var surfaceEdge = new THREE.LineSegments( edgesGeometry, edgesMaterial );

		var placard = THRU.drawPlacard( 'box ' + i );

		mesh.add( surfaceEdge, placard );

		boxes.add( mesh );

	}

	return boxes;

};



THRU.drawPlacard = function( text, scale, color, x, y, z ) {

	// add update
	// 2019-07-12 ~ https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/placards

	text = text || 'abc';
	scale = scale || 0.05;
	color = color || Math.floor( Math.random() * 255 );
	x = x || 0;
	y = y || 0;
	z = z || 10;

	var placard = new THREE.Object3D();

	var texture = canvasMultilineText( text, { backgroundColor: color }   );
	var spriteMaterial = new THREE.SpriteMaterial( { map: texture, opacity: 0.9, transparent: true } );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.position.set( x, y, z ) ;
	sprite.scale.set( scale * texture.image.width, scale * texture.image.height );

	//var geometry = new THREE.Geometry();
	//var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };
	//geometry.vertices = [ v( 0, 0, 0 ),  v( x, y, z ) ];
	//var material = new THREE.LineBasicMaterial( { color: 0xaaaaaa } );
	//var line = new THREE.Line( geometry, material );
	//placard.add( sprite, line );

	placard.add( sprite );

	return placard;


	function canvasMultilineText( textArray, parameters ) {

		parameters = parameters || {} ;

		var canvas = document.createElement( 'canvas' );
		var context = canvas.getContext( '2d' );
		var width = parameters.width ? parameters.width : 0;
		var font = parameters.font ? parameters.font : '48px monospace';
		var color = parameters.backgroundColor ? parameters.backgroundColor : 120 ;

		if ( typeof textArray === 'string' ) textArray = [ textArray ];

		context.font = font;

		for ( var i = 0; i < textArray.length; i++) {

			width = context.measureText( textArray[ i ] ).width > width ? context.measureText( textArray[ i ] ).width : width;

		}

		canvas.width = width + 20;
		canvas.height =  parameters.height ? parameters.height : textArray.length * 60;

		context.fillStyle = 'hsl( ' + color + ', 80%, 50% )' ;
		context.fillRect( 0, 0, canvas.width, canvas.height);

		context.lineWidth = 1 ;
		context.strokeStyle = '#000';
		context.strokeRect( 0, 0, canvas.width, canvas.height );

		context.fillStyle = '#000' ;
		context.font = font;

		for ( var i = 0; i < textArray.length; i++) {

			context.fillText( textArray[ i ], 10, 48  + i * 60 );

		}

		var texture = new THREE.Texture( canvas );
		texture.minFilter = texture.magFilter = THREE.NearestFilter;
		texture.needsUpdate = true;

		return texture;

	}

};