// /* global THREE, divContents */
// jshint esversion: 6
// jshint loopfunc: true

//"use strict";

var THR = {

	copyright: "Copyright 2019 Ladybug Tools authors. MIT License",
	date: "2019-09-05",
	description: "Three.js core - the basic function to bring Three.js up in your browser",
	helpFile: "../js-view-threejs/thr-threejs.md",
	license: "MIT License",
	version: "0.17.01-0thr-os"

};


THR.initializeThreejs = function () {

	THR.renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true } );
	THR.renderer.setPixelRatio( window.devicePixelRatio );
	THR.renderer.setSize( window.innerWidth , window.innerHeight );
	document.body.appendChild( THR.renderer.domElement );

	THR.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 );
	THR.camera.position.set( - 100, - 100, 100 );
	THR.camera.up.set( 0, 0, 1 );

	THR.controls = new THREE.OrbitControls( THR.camera, THR.renderer.domElement );

	THR.scene = new THREE.Scene();

	THR.lightAmbient = new THREE.AmbientLight( 0x888888 );
	THR.scene.add( THR.lightAmbient );

	THR.lightDirectional = new THREE.DirectionalLight( 0x888888 );
	THR.scene.add( THR.lightDirectional );

	window.addEventListener( 'resize', THR.onWindowResize, false );
	window.addEventListener( 'orientationchange', THR.onWindowResize, false );

	//window.addEventListener( 'keyup', () => sceneRotation = 0, false );
	//THR.renderer.domElement.addEventListener( 'click', () => sceneRotation = 0, false );

	//THR.axesHelper = new THREE.AxesHelper( 100 );
	//THR.scene.add( THR.axesHelper );

	// const geometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
	// const material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
	// mesh = new THREE.Mesh( geometry, material );

	// const edgesGeometry = new THREE.EdgesGeometry( mesh.geometry );
	// const edgesMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
	// const surfaceEdge = new THREE.LineSegments( edgesGeometry, edgesMaterial );

	// mesh.add( surfaceEdge );

	// THR.scene.add( mesh );

	//console.log( '', THR );
	//console.log( '', THRU );

};



THR.onWindowResize = function() {

	THR.camera.aspect = window.innerWidth / window.innerHeight;
	THR.camera.updateProjectionMatrix();
	THR.renderer.setSize( window.innerWidth / window.innerHeight );
	//THR.controls.handleResize(); // trackball only

	//console.log( 'onWindowResize', window.innerWidth, window.innerHeight );

};



THR.animate = function() {

	requestAnimationFrame( THR.animate );
	THR.renderer.render( THR.scene, THR.camera );
	THR.controls.update();

};