
const sourceTop =
`

<!doctype html>
<html lang="en" >
<head>
<meta charset="utf-8" >
<meta name="viewport" content = "width=device-width,user-scalable=no,minimum-scale=1.0,maximum-scale=1.0" >
<meta name=description content="Real-time interactive 3D graphics in your browser using the WebGL and the Three.js JavaScript library" >
<meta name=keywords content="Three.js,WebGL,JavaScript,GitHub,FOSS,3D,STEM" >
<meta name = "date" content = "2019-06-03" >
<title></title>
<style>
	/* Copyright 2019 pushMe pullYou authors. MIT License */

	body { font: 11pt monospace; margin: 0; overflow: hidden; }
	a { color: crimson; text-decoration: none; }
	a:hover, a:focus { background-color: yellow; color: #aaa; text-decoration: underline }

	button { background-color: #ddd; border: none; color: #322; cursor: pointer; padding: 3px 5px; }
	button:hover { background: #ccc; color: #fff }

	input[ type = range ] { -webkit-appearance: none; -moz-appearance: none; background-color: #ddd; width: 100%; }
	input[ type = range ]::-moz-range-thumb { background-color: #888; border-radius: 0; width: 10px; }
	input[ type = range ]::-webkit-slider-thumb { -webkit-appearance: none; background-color: #888; height: 20px; width: 10px; }

	#navMenu { margin: 0 20px; max-width: 15rem; position: absolute; }

</style>
</head>
<body>
<script>

`;

const sourceBottom =

`
</script>

<nav id = "navMenu" >

<div id = "divTitle" ></div>

<p>
	<button onclick="sceneRotation = sceneRotation === 1 ? 0 : 1;" >rotation</button>
</p>

<p>
	<input type="range" id="inpSpeed" onclick="sceneRotation=0.03 * this.value;" />
</p>

<div id = "divLog" ></div>

</nav>

<script>


const urlSourceCode = "https://github.com/zzzzz/zzzzz.github.io/tree/master/xxxxx/";

let sceneRotation = 1;
let renderer, camera, controls, scene;

init();
animate();

function init() {

renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( - 100, - 100, 100 );
camera.up.set( 0, 0, 1 );

controls = new THREE.TrackballControls( camera, renderer.domElement );
controls.rotateSpeed = 4;

scene = new THREE.Scene();

window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener( 'orientationchange', onWindowResize, false );
window.addEventListener( 'keyup', () => sceneRotation = 0, false );
renderer.domElement.addEventListener( 'click', () => sceneRotation = 0, false );

const axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );

const geometry = new THREE.BoxGeometry( 50, 50, 50 );
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

}



function onWindowResize() {

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );

controls.handleResize();

//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

}



function animate() {

requestAnimationFrame( animate );
renderer.render( scene, camera );
controls.update();
scene.rotation.z += sceneRotation / 1000;

}

</script>
</body>
</html>

`;