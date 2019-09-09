// /* global THREE, divContents */
// jshint esversion: 6
// jshint loopfunc: true

//"use strict";

var THR = {

	copyright: "Copyright 2019 Ladybug Tools authors",
	date: "2019-09-06",
	description: "Three.js core - the basic functionality to bring Three.js up in your browser",
	helpFile: "../js-view-threejs/thr-threejs.md",
	license: "MIT License",
	version: "0.17.00-0thr-os"

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