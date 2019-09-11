
var THC = {};

THC.raycaster = new THREE.Raycaster();
THC.mouse = new THREE.Vector2();


//window.addEventListener( 'click', THC.onClick, false );


THC.onClick = function( event ) {
	//console.log( '', event );

	THC.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	THC.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	THC.raycaster.setFromCamera( THC.mouse, THR.camera );

	var intersects = THC.raycaster.intersectObjects( GBX.meshGroup.children );

	for ( var i = 0; i < intersects.length; i++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );

		//console.log( '', intersects[ 0 ]  );

		var mesh = intersects[ 0 ].object.userData;

		var surface = GBX.surfaces[ mesh.index ]
		//console.log( '', surface.match( / spaceIdRef="(.*?)"/gi ) );

		var spaceIds = surface.match( / spaceIdRef="(.*?)"/gi );

		spaceIds = spaceIds ? spaceIds.map( space => space.slice( 13, -1)) : "none";

		var htm =
		`
		<p>
			Index:  ${ mesh.index }
		</p>
		<p>
			Id: ${ surface.match( / id="(.*?)"/i )[ 1 ] }
		</p>
		<p>
			Name: ${ surface.match( /<Name>(.*?)<\/Name>/i )[ 1 ] }
		</p>
		<p>
			Surface type: ${ mesh.surfaceType }
		</p>
		<p>
			Space ids: ${ spaceIds }
		</p>
		`;

		divMsg.innerHTML = htm;
	}

}
