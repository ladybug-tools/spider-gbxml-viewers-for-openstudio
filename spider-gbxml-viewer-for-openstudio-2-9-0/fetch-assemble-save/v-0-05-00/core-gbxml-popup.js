
const sourceTop =

`<!doctype html>
<html lang="en" >
<head>
<meta charset="utf-8" >
<meta name="viewport" content = "width=device-width,user-scalable=no,minimum-scale=1.0,maximum-scale=1.0" >
<meta name=description content="Real-time interactive 3D graphics in your browser using the WebGL and the Three.js JavaScript library" >
<meta name=keywords content="Three.js,WebGL,JavaScript,GitHub,FOSS,3D,STEM" >
<meta name = "date" content = "2019-09-02" >
<meta name = "version" content = "0.05.00" >
<title></title>
<style>
	/* Copyright 2019 pushMe pullYou authors. MIT License */

	/* Copyright 2019 pushMe-pullYou authors. MIT License */
/* Forked from TooToo14 2019-06-03 0.14.5 */
/* Used by spider-gbxml-fixer, add-a-line */

* { box-sizing: border-box; }

:root { font-size: 100%; --mnu-width: 22rem; --screen-width: calc( 100vw ); --headerHeight: 6rem; }

html { height: 100%; }

/* font-family: 'inconsolata'; */

body { background-color: #ffffff; color: #555; font: 12pt monospace; height: 100%;
	 margin: 0px; /* overflow: hidden; */ }

a { color: rgb(206, 33, 33); text-decoration: none; }
a:hover, a:focus { background-color: yellow; color: #aaa; text-decoration: underline }

aside { border: 1px solid lightgray; margin-top:15px; padding: 2px; }

blockquote, pre { background-color: #ddd; padding: 5px; }

button, input[ type=button ] { background-color: #ddd; border: 1px solid #ccc; border-radius: 2px;
	color: #322; cursor: pointer; outline: none; padding: 3px 5px; }

button:hover, input[ type=button ]:hover{ background: #ccc;
	box-shadow: 5px 5px 5px rgba(0,0,0,0.3); color: #f00 }

button.active { border-color: black; font-style: oblique; font-weight: bold; margin-left: 0.3rem;
	box-shadow: 10px 2px #888; }

code { background-color: #ddd; }

input[ type = range ] { -webkit-appearance: none; -moz-appearance: none; background-color: #ddd; width: 90%; }
input[ type = range ]::-moz-range-thumb { background-color: rgb(228, 225, 225); border-radius: 0; width: 10px; }
input[ type = range ]::-webkit-slider-thumb { -webkit-appearance: none; background-color: #888; height: 20px; width: 10px; }

main { border: 0px; height: 100%; left: var( --mnu-width ); margin: 0; /* overflow: hidden; */
	position: absolute; width: calc( 100% - var( --mnu-width ) );  }


summary { cursor: pointer; font-size: 1rem; font-weight: bold; outline: none; }

.attributeTitle { font-style: italic; }
.attributeValue { color: blue; }
.butHelp { font-size: 0.7rem; padding: 0 0.5rem; float:right; z-index: 1; }
.dragDropArea { border: 1px dashed gray; margin: 0.5rem  0; padding: 0 0.5rem; }
.helpItem { float: right; clear: both; }
.highlight {background-color: lightgreen }
.navSubMenu { /* background-color: yellow; */ padding: 0 0.5rem; }
.sumMenuTitle { background-color: #ccc; color: #888; margin: 10px 0; text-align: center; }

.secContent { padding: 0px 8px 20px 10px; }
.sumHeader { font-size: 1.3rem; }


#aViewSource { position: fixed; bottom: 20px; right: 20px; padding: 8px; color: #fff;
	background-color: #555; opacity: 0.7; }

#aViewSource:hover { cursor: pointer; opacity: 1; }


#divContents { border: 0px solid red; margin: 0 auto; max-width: 40rem; }


#expandButton { height: 32px; position: absolute; left: var( --mnu-width ); top: 0px; width: 32px; transition: left 0.5s; z-index: 1; }


#navPanel { height: 100%; left: 0px; overflow: auto; position: fixed;
	transition: left 0.5s; width: var( --mnu-width ); z-index: 1; }

#navPanel h1 { margin-top: 30px; margin-bottom: 5px; font-size: 25px; font-weight: normal; }

#navPanel h2 { font-size: 20px; font-weight: normal; }

#navPanel #secContent a { color: #2194CE; text-decoration: none; cursor: pointer; }

#navPanel #secContent a:hover { text-decoration: underline; }

#navPanel #secContent a:active, #navPanel #secContent a:focus { color: #ff0000; }


#navDragMove {
	background-color: #f1f1f1;
	border: 1px solid #aaa;
	left: 80%;
	max-height: 90vh;
	max-width: 40vw;
	overflow: auto;
	position: absolute;
	right: 1rem;
	top: 1rem;
	resize: both;
}

#secDragMove {
	border: 0px solid green;
	margin-bottom: 0.5rem;
}

#divDragMoveHeader {
	background-color: #2196F3;
	color: #fff;
	cursor: move;
	padding: 0.5rem;
	/*position: fixed; Wish list */
}

#divDragMoveContent {
	border: 0px solid blue;
	padding: 0 0.5rem;
}

#divDragMoveFooter {
	border: 0px solid red;
	padding: 0.5rem 0.5rem 0 0.5rem;
}


#expandButton.collapsed { left: 0; }
#navPanel.collapsed { left: calc( var( --mnu-width ) * -1 ); padding: 0; }
#main.collapsed { left: 0; width: 100%; }


@media all and ( max-width: 640px ) {

	#main { left: 0; padding: 0; width: 100%; }

	#navDragMove { left: 60%; max-height: 70%; max-width: 70%; right: 0.2rem; }

	#POPspanFooter { display: none; }

	#aViewSource { display: none; }

}


@media all and ( max-height: 640px ) {

	#main { left: 0; padding: 0rem; width: 100%; }

	#navDragMove { left: 55%; max-height: 95%; max-width: 70%; right: 0.2rem; top: 0.2rem; }

	#POPspanFooter { display: none; }

	#aViewSource { display: none; }

}
	* { box-sizing: border-box; }

	body { font: 11pt monospace; margin: 0; overflow: hidden; }

	main { border: 0px solid red; left: 0; height: 100vh; width: 100vw;}

	#divContents { border: 0px solid red; height: 100vh; max-width: 100vw;  }

</style>
</head>
<body>

`;

const sourceBottom =

`

<div id=GBXdivMessage style=position:absolute; ></div>

<main id="main" >

<div id="divContents" >


</div>

</main>


<nav id="navDragMove"  >

<section id="secDragMove" >

	<div id=divDragMoveHeader >

		<span title="Move and resize me" ><img src = 'https://ladybug.tools/artwork/icons_bugs/ico/spider.ico' height=12 alt="Ladybug Tools logo" ></span>

		<div style=float:right; >
			<button id=butPopupClose onclick="POP.onClickClose(butPopupClose);" >
				&times;
			</button>
		</div>

	</div>

	<div id="divDragMoveContent" ></div>

	<div id="divDragMoveFooter" ></div>

</section>

</nav>



<script>


init();
THR.animate();

function init() {

	THR.getThreejs();

	THRU.init();

	POP.init();

	PIN.init();

	GBX.init( GBXdivMessage );  // parameter not required

	THRU.axesHelper = new THREE.AxesHelper( 100 );
	THR.scene.add( THRU.axesHelper );

	FOB.fileInfo = "<br>tbd";

	POP.popup = "";
	
	POP.footer =
	"<div><span id=POPspanInfo ></div>";

	// <button onclick=POP.requestFile(POP.popup,divDragMoveContent); >🏠</button>&nbsp;
	// <button onclick=POP.requestFile(POP.license,divDragMoveContent); >⚖️</button>&nbsp;

}

</script>
</body>
</html>

`;