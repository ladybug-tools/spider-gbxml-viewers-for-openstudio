/* global THREE, THR, GBX, divLog, Stats, rngOpacity, outOpacity */
// jshint esversion: 6
// jshint loopfunc: true


var THRU = {

	copyright: "Copyright 2019 Ladybug Tools authors",
	date: "2019-09-10",
	description: "Three.js utilities",
	helpFile: "",
	license: "MIT License",
	version: "0.17.00-0thru-os"

};



THRU.initializeThreejsUtilities = function( radius ) {

	//console.log( '', THRU );

	THRU.helperNormalsFaces = undefined;

	THRU.radius = radius || 50;

	THRU.addSomeLights2();

	THRU.toggleAxesHelper();

	THR.controls.autoRotate = true;

	//THRU.toggleEdges();

	//THRU.toggleBoundingBoxHelper();

	window.addEventListener( 'keyup', THRU.onSetRotate , false );
	THR.renderer.domElement.addEventListener( 'click', THRU.onSetRotate, false );
	THR.renderer.domElement.addEventListener( 'touchstart', THRU.onSetRotate, false );

};


THRU.onSetRotate = function() {

	THR.controls.autoRotate = false;

	window.removeEventListener( 'keyup', THRU.onSetRotate );
	THR.renderer.domElement.removeEventListener( 'click', THRU.onSetRotate );
	THR.renderer.domElement.removeEventListener( 'touchstart', THRU.onSetRotate );

};

THRU.setSceneDispose = function() {

	THR.scene.remove( GBX.meshGroup, THRU.axesHelper, THRU.boundingBoxHelper, THRU.groundHelper );

	THRU.axesHelper = undefined;
	THRU.boundingBoxHelper = undefined;
	THRU.groundHelper = undefined;

	THR.scene.traverse( child => {

		if ( child.geometry ) {

			child.geometry.dispose();
			child.material.dispose();

		}

	} );

};


THRU.setRendererInfo = function() {

	var htm =

	"Memory" +
	"<br>- Geometries: " + THR.renderer.info.memory.geometries.toLocaleString() +
	"<br>Renderer" +
	"<br>- Triangles: " + THR.renderer.info.render.triangles.toLocaleString() +
	"<br>- Lines: " + THR.renderer.info.render.lines.toLocaleString();

	divLog.innerHTML = htm;

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


////////// Visibility - not used

THRU.getMeshesVisible = function ( objThree ) { // not??
	//console.log( '', objThree );

	objThree = objThree || THR.scene;

	THRU.meshGroupVisible = new THREE.Object3D();

	//var arr = objThree.children.filter( mesh => mesh.visible ).map ( mesh => mesh.clone() );
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


////////// helpers

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

					helperNormalsFace = new THREE.FaceNormalsHelper( mesh, 0.05 * THRU.radius, 0xff00ff );
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


//////////

THRU.getMeshEdges = function( obj ) {

	THRU.meshEdges = [];
	var lineMaterial = new THREE.LineBasicMaterial( { color: 0x888888 } );

	for ( var mesh of obj.children ) {

		if ( !mesh.geometry ) { continue; }

		var edgesGeometry = new THREE.EdgesGeometry( mesh.geometry );
		var surfaceEdge = new THREE.LineSegments( edgesGeometry, lineMaterial );
		mesh.add( surfaceEdge );

		THRU.meshEdges.push( surfaceEdge );

	}

};


THRU.toggleEdges = function( obj ) {

	obj = obj || THR.scene;

	if ( !THRU.meshEdges ) {

		THRU.getMeshEdges( obj );

	} else {

		THRU.meshEdges.forEach( edge => edge.visible = !edge.visible );

	}

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
	THRU.light1.name = "light1";

	THR.scene.add( THRU.light1 );

	THRU.light2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
	THRU.light2.position.set( 0, 0, -1 ).normalize();
	THRU.light2.name = "light2";

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
