
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
// https://cdn.rawgit.com/mrdoob/three.js/r108/build/three.min.js

`;




const sourceBottom =

`

</script>


	<div id = "divMenu" >

		<div id = "divTitle" >Ladybug Tools / Spider gbXML Viewer for OpenStudio v0.17.00</div>

		<p>
			<button onclick = "THR.controls.autoRotate=!THR.controls.autoRotate;" >rotation</button>
		</p>
		<p>
			<button onclick = "THRU.zoomObjectBoundingSphere();" >zoomObjectBoundingSphere</button>
		</p>
		<p>
			<button onclick = "THRU.setSceneDispose();" >setSceneDispose</button>
		</p>
		<p>
			<button onclick = "THRU.getRendererInfo();" >getRenderInfo</button>
		</p>
		<p>
			<button onclick = "THRU.setStats();" >set stats</button>
		</p>

		<p>
			<button onclick = "THRU.toggleWireframe()" >wireframe</button>
		</p>
		<p>
			<button onclick = "THRU.toggleMeshesVisible()" >surfaces</button>
		</p>
		<p>
			<button onclick = "THRU.toggleSurfaceNormalsVisible()" >surface normals</button>
		</p>
		<p>
			<button onclick = "THRU.toggleAxesHelper()" >axes helper</button>
		</p>
		<p>
			<button onclick = "THRU.toggleBoundingBoxHelper()" >bounding box</button>
		</p>
		<p>
			<button onclick = "THRU.toggleGroundHelper()" >ground helper</button>
		</p>
		<p>
			<button onclick = "THRU.toggleEdges()" >edges</button>
		</p>

		<!--
		<p>
			<button onclick = "GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible;" >edges</button>
			<button onclick = "GBX.surfaceOpenings.visible=!GBX.surfaceOpenings.visible;" title="toggle the windows" >openings</button>
			<button onclick = "GBX.surfaceMeshes.visible=GBX.surfaceEdges.visible=GBX.surfaceOpenings.visible=true;" >all visible</button>
		</p>

		-->

		<div id = "divMsg" ></div>

		<div id = "divLog" ></div>

	</div>

<script>


	init();
	animate();

	function init() {

		THR.initializeThreejs();

		THRU.initializeThreejsUtilities();

	}


	function setGbXml ( text ) {

		//var _scene;
		timeStart = Date.now();

		try {

			const length = GBX.parseFile( text );
			console.log( 'length', length );
			//( _scene = scene ).add.apply( _scene, mesh );
			//THRU.zoomObjectBoundingSphere( GBX.meshGroup );
			divLog.innerHTML = "Success: " + (Date.now() - timeStart) + " ms<br><br>";
			divLog.innerHTML += "Please visit full spider viewer at https://www.ladybug.tools/spider/gbxml-viewer  (note full site is not yet available in embedded viewer) to edit and inspect your file in more detail.<br>"

		}
			catch( err ) {
			divLog.innerHTML = "Error: " + err.message + "<br><br>";
			divLog.innerHTML += "You may still be able to preview and merge this file using OSM translation tools.<br><br>"
			divLog.innerHTML += "Please visit full spider viewer at https://www.ladybug.tools/spider/gbxml-viewer  (note full site is not yet available in embedded viewer) to edit and inspect your file in more detail.<br>"

		}

	}

	function animate() {

		THR.animate();

	}

</script>
</body>
</html>

`;