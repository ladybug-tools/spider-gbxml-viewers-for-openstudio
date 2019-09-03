
const sourceTop =
`

<!doctype html>
<html lang="en" >
<head>
<meta charset="utf-8" >
<meta name="viewport" content = "width=device-width,user-scalable=no,minimum-scale=1.0,maximum-scale=1.0" >
<meta name=description content="Real-time interactive 3D graphics in your browser using the WebGL and the Three.js JavaScript library" >
<meta name=keywords content="Three.js,WebGL,JavaScript,GitHub,FOSS,3D,STEM" >
<meta name = "date" content = "2019-09-02" >
<title></title>
<style>
	/* Copyright 2019 pushMe pullYou authors. MIT License */

	* { box-sizing: border-box; }

	body { font: 11pt monospace; margin: 0; overflow: hidden; }

	#navMenu { margin: 0 20px; max-width: 15rem; position: absolute; }

	#divContents {  height: 100vh; width: 100vw; }

</style>
</head>
<body>
</script>

`;

const sourceBottom =

`
</script>

<nav>

	<div id="divRendererInfo" style=position:absolute; ></div>

	<div id="divContents" ></div>

	<div style=position:absolute;left:3vh;top:1vh; >

	<!-- following not required -->

	<div id="GBXdivMessage" ></div>

	<div id="FOBdivMessages" ></div>

</nav>


<script>


init();
THR.animate();

function init() {

	THR.getThreejs();

	THRU.init();

	GBX.init( GBXdivMessage );  // parameter not required

	THRU.axesHelper = new THREE.AxesHelper( 100 );
	THR.scene.add( THRU.axesHelper );

	FOB.fileInfo = "<br>tbd";

}

</script>
</body>
</html>

`;