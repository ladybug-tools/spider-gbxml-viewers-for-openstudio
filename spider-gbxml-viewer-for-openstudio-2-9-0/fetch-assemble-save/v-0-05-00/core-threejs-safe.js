
const sourceTop =

`<!doctype html>
<html lang="en" >
<head>
<meta charset="utf-8" >
<meta name="viewport" content = "width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" >
<meta name=description content="Open, view gbXML files in 3D in your browser with free, open source entry-level Three.js JavaScript" >
<meta name=keywords content="Three.js,WebGL,JavaScript,GitHub,FOSS,3D,STEM" >
<meta name = "date" content = "2018-07-16" >
<title>gbXML Viewer basic R5.2</title>
<style>

	body { font: 11pt monospace; margin: 0; overflow: hidden; }
	a { color: crimson; text-decoration: none; }
	a:hover, a:focus { background-color: yellow; color: #aaa; text-decoration: underline }

	button { background-color: #ddd; border: none; color: #322; cursor: pointer; padding: 3px 5px; }
	button:hover { background: #ccc; color: #fff }

	#divMenu { margin: 0 20px; max-width: 20rem; position: absolute; }

</style>
</head>
<body>
<script>
// https://cdn.jsdelivr.net/gh/mrdoob/three.js@r94/build/three.min.js

`;




const sourceBottom =

`

</script>
	<div id = "divMenu" >

		<div id = "divTitle" ></div>

		<p>
			<button onclick = "controls.autoRotate=!controls.autoRotate;" >rotation</button>

			<button onclick = "zoomObjectBoundingSphere(GBX.surfaceEdges);" >zoomObjectBoundingSphere</button>

		</p>

		<p>
			<button onclick = "setSceneDispose( [ GBX.surfaceMeshes, GBX.surfaceEdges, GBX.surfaceOpenings, axesHelper ] );" >setSceneDispose</button>
			<button onclick = "getRenderInfo();" >getRenderInfo</button>
		</p>

		<p>
			<button onclick = "GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible;" >surfaces</button>
			<button onclick = "GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible;" >edges</button>
			<button onclick = "GBX.surfaceOpenings.visible=!GBX.surfaceOpenings.visible;" title="toggle the windows" >openings</button>
			<button onclick = "GBX.surfaceMeshes.visible=GBX.surfaceEdges.visible=GBX.surfaceOpenings.visible=true;" >all visible</button>
		</p>

		<div id = "divLog" ></div>

	</div>

<script>


	var timeStart;

	var renderer, camera, controls, scene;
	var lightAmbient, lightDirectional, lightPoint, axesHelper;
	var geometry, material, mesh;

	init();
	animate();

	function init() {

		const source = "https://github.com/ladybug-tools/spider-gbxml-tools/tree/develop/gbxml-viewer-basic";
		const title = document.title;

		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true }  );
		renderer.setSize( window.innerWidth, window.innerHeight );

		document.body.appendChild( renderer.domElement );

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.set( -100, -100, 100 );
		camera.up.set( 0, 0, 1 );

		controls = new THREE.OrbitControls( camera, renderer.domElement );

		scene = new THREE.Scene();

		lightAmbient = new THREE.AmbientLight( 0x444444 );
		scene.add( lightAmbient );

		lightDirectional = new THREE.DirectionalLight( 0xffffff, 1 );
		lightDirectional.shadow.mapSize.width = 2048;  // default 512
		lightDirectional.shadow.mapSize.height = 2048;
		lightDirectional.castShadow = true;
		scene.add( lightDirectional );

		lightPoint = new THREE.PointLight( 0xffffff, 0.5 );
		lightPoint.position = new THREE.Vector3( 0, 0, 1 );

		camera.add( lightPoint );
		scene.add( camera );

		window.addEventListener( 'resize', onWindowResize, false );

		window.addEventListener( 'orientationchange', onWindowResize, false );

		const geometry = new THREE.BoxGeometry( 50, 50, 50 );
		const material = new THREE.MeshNormalMaterial();
		mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );

	}



	function setGbXml ( text ) {

		var _scene;
		timeStart = Date.now();

		try {

			//meshes = GBX.parseFileXML( text );
			(_scene = scene).add.apply(_scene, mesh);
			zoomObjectBoundingSphere( mesh );
			divLog.innerHTML = "Success: " + (Date.now() - timeStart) + " ms<br><br>";
			divLog.innerHTML += "Please visit full spider viewer at https://www.ladybug.tools/spider/gbxml-viewer  (note full site is not yet available in embedded viewer) to edit and inspect your file in more detail.<br>"

		}
			catch(err) {
			divLog.innerHTML = "Error: " + err.message + "<br><br>";
			divLog.innerHTML += "You may still be able to preview and merge this file using OSM translation tools.<br><br>"
			divLog.innerHTML += "Please visit full spider viewer at https://www.ladybug.tools/spider/gbxml-viewer  (note full site is not yet available in embedded viewer) to edit and inspect your file in more detail.<br>"

		}

	}


	function zoomObjectBoundingSphere ( obj ) {

		const bbox = new THREE.Box3().setFromObject( obj );

		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
		const center = sphere.center;
		const radius = sphere.radius;

		controls.target.copy( center );
		controls.maxDistance = 5 * radius;

		camera.position.copy( center.clone().add( new THREE.Vector3( 1.0 * radius, - 1.0 * radius, 1.0 * radius ) ) );
		camera.far = 10 * radius; //2 * camera.position.length();
		camera.updateProjectionMatrix();

		lightDirectional.position.copy( center.clone().add( new THREE.Vector3( -1.5 * radius, -1.5 * radius, 1.5 * radius ) ) );
		lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );
		lightDirectional.target = obj;

	};


	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

		//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

	}


	function animate() {

		requestAnimationFrame( animate );
		renderer.render( scene, camera );
		controls.update();

	}

</script>
</body>
</html>

`;