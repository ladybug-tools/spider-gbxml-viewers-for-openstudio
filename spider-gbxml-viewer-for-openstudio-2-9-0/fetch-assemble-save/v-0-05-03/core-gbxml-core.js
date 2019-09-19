
const sourceTop =

`<!doctype html>
<html lang="en" >
<head>
<meta charset="utf-8" >
<meta name="viewport" content = "width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" >
<meta name=description content="Open, view gbXML files in 3D in your browser with free, open source entry-level Three.js JavaScript" >
<meta name=keywords content="Three.js,WebGL,JavaScript,GitHub,FOSS,3D,STEM" >
<meta name = "date" content = "2019-09-19" >
<title>gbXML Viewer basic v0.06.01</title>
<style>


	* { box-sizing: border-box; }

	body { font: 11pt monospace; margin: 0; overflow: hidden; }
	a { color: crimson; text-decoration: none; }
	a:hover, a:focus { background-color: yellow; color: #aaa; text-decoration: underline }

	button { background-color: #ddd; border: none; color: #322; cursor: pointer; padding: 3px 5px; }
	button:hover { background: #ccc; color: #fff }

	input[ type = range ] { -webkit-appearance: none; -moz-appearance: none; background-color: #ddd; width: 100%; }
	input[ type = range ]::-moz-range-thumb { background-color: #888; border-radius: 0; width: 10px; }
	input[ type = range ]::-webkit-slider-thumb { -webkit-appearance: none; background-color: #888; height: 20px; width: 10px; }


	#navMenu { background-color: #eee; height: 100%; left: 0; margin: 0; opacity: 0.85; overflow: auto;
		padding: 0 1rem; position: fixed; transition: left 0.5s; top: 0; width: 15rem; }

	#expandButton { height: 32px; position: absolute; left: 15rem; top: 0px;
		transition: left 0.5s; width: 32px; z-index: 1; }

	#expandButton.collapsed { left: 0; }
	#navMenu.collapsed { left: -17em; padding: 0; }rgin: 0 20px; max-width: 20rem; position: absolute; }

</style>
</head>
<body>
<script>
// https://cdn.rawgit.com/mrdoob/three.js/r108/build/three.min.js

`;




const sourceBottom =

`
</script>


	<button id="expandButton" onclick="toggleNavPanel();" >☰</button>

	<nav id = "navMenu" >

		<div id = "divTitle" >Ladybug Tools / Spider gbXML Viewer for OpenStudio v0.06.01 dev</div>

		<p title="opacity: 0 to 100%" >
			opacity <output id=outOpacity class=floatRight >85%</output><br>
			<input type="range" id="rngOpacity" min=0 max=100 step=1 value=85 oninput=THRU.setObjectOpacity(); >
		</p>
		<p>
			<button onclick = "THR.controls.autoRotate=!THR.controls.autoRotate;" >rotation</button>

			<button onclick = "THRU.zoomObjectBoundingSphere(GBX.meshGroup);" >zoom all</button>
		</p>

		<p>
			<button onclick = "THRU.setRendererInfo();" >renderer info</button>

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
			<button onclick = "THRU.toggleBoundingBoxHelper(GBX.meshGroup)" >bounding box</button>
		</p>
		<p>
			<button onclick = "THRU.toggleEdges(GBX.meshGroup)" >edges</button>
		</p>

		<div id = "divTim" ></div>

		<div id = "divLog" ></div>

	</nav>

	</div>

	<div id = "divMsg" style="border:0px solid red;position:absolute;max-height:90%;right:0;top:0;max-width:50%;
		margin: 1 rem;overflow:auto;padding: 1rem;" ></div>


<script>


init();
animate();


function init() {

	THR.initializeThreejs();

	THRU.initializeThreejsUtilities();

	window.addEventListener( 'click', THC.onClick, false );
}


function setGbXml ( text ) {

	var timeStart = Date.now();

	const htm =
		"<p>Please visit Ladybug Tools at https://www.ladybug.tools/spider-gbxml-tools " +
		"to edit and inspect your files in more detail.<p>";

	try {

		const length = GBX.parseFile( text );

		if ( length ) {

			divTim.innerHTML =
			"<p>" +
				"Success: " + ( Date.now() - timeStart ) + " ms - " + length + " surfaces" +
			"</p>";

			divLog.innerHTML = htm;

		} else {

			divTim.innerHTML =
			"<p>This may not be a gbXML file. Here are the first 200 characters:</p>" +
			"<p>" + text.slice( 0, 200 ) + "</p>";

		}

	} catch( err ) {

		divTim.innerHTML = "Error: " + err.message + "<br><br>";
		divLog.innerHTML = "You may still be able to preview and merge this file using OSM translation tools.<br><br>"
		divLog.innerHTML += htm;

	}

}


function toggleNavPanel() {// move to COR??

	expandButton.classList.toggle( 'collapsed' );
	navMenu.classList.toggle( 'collapsed' );

}

function animate() {

	THR.animate();

}

</script>
</body>
</html>

`;