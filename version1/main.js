class wall {
	constructor(width,height,depth,pos) {
		let loader = new THREE.TextureLoader();
		let icon = loader.load('https://i.imgur.com/cDbkSZw.png');
		this.pos = pos.clone();
		this.width = width;
		this.height = height;
		this.depth = depth;
		this.mesh = new THREE.Mesh(new THREE.BoxGeometry(width,height,depth),new THREE.MeshBasicMaterial({map: icon, transparent: true}));
		this.mesh.position.copy(this.pos);

		scene.add(this.mesh);
    }
}
function initHUD() {
	  // sceneHUD: a simple line boundary
	  sceneHUD1 = new THREE.Scene();
	  cameraHUD1 = new THREE.OrthographicCamera(-10.5, 10.5, 10.5, -10.5, -50, 50);
	  cameraHUD1.position.z = 20;  // for border
	  
	  //小視窗
	cameraHUD2 = new THREE.OrthographicCamera(-130,130,130,-130,-420,420);
	cameraHUD2.position.set (0,30,0)
	cameraHUD2.up.set (0,0,-1)   // for top view
	cameraHUD2.lookAt (new THREE.Vector3())

	  let points = [];
	  points.push (
		new THREE.Vector3(-10, -10, 0),
		new THREE.Vector3(10, -10, 0),
		new THREE.Vector3(10, 10, 0),
		new THREE.Vector3(-10, 10, 0),
		new THREE.Vector3(-10, -10, 0));
	  var lineGeometry = new THREE.BufferGeometry().setFromPoints (points);
		
	  var line = new THREE.Line(lineGeometry,
		new THREE.LineBasicMaterial({
		  color: 0xff0000
		}));
	 // sceneHUD.add(line);
  
}

function init() {

	clock = new THREE.Clock();
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 100;
	camera.position.y = 50;

	camera1 = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000);
	camera1.position.z = 500;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x888888);
	start = document.getElementById("start");
	
	start.innerHTML = "Press enter to begin";
	
	var controls = new THREE.OrbitControls(camera, renderer.domElement);

	document.body.appendChild(renderer.domElement);
	
	
	/////////////////////////////////////////////////////////////////////

	let loader2 = new THREE.TextureLoader()
	loader2.crossOrigin = '';

	texture = loader2.load('https://i.imgur.com/S2LPXOw.jpg');

	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(10, 10);
  
	mesh = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), 
  	new THREE.MeshBasicMaterial({map: texture,side:THREE.DoubleSide}))
	mesh.rotation.x = -Math.PI / 2;
	scene.add(mesh);
	
	/////////////////////////////////////////////////////////////////////
	
	sceneRTT = new THREE.Scene();
	cameraRTT = new THREE.OrthographicCamera(-4, 4, 4, -4, -10, 100);
	cameraRTT.position.z = 10;

	renderTarget = new THREE.WebGLRenderTarget(
		1024, 1024, {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.NearestFilter,
			format: THREE.RGBFormat
		}
	);
	
	// width/height ratio
	whRatio = window.innerWidth/window.innerHeight;
	sceneHUD = new THREE.Scene();
	halfH = 10;
	halfW = halfH * whRatio;
	
	cameraHUD = new THREE.OrthographicCamera (-halfW,halfW, halfH,-halfH, -10,10);
	renderer.autoClear = false;
	///////////////////////////////////////////////////////////////////
	
	scene.obstacles = [];
	scene.obstacles.push ( new Obstacle (new THREE.Vector3(-20,0,0), 20) );
	scene.obstacles.push ( new Obstacle (new THREE.Vector3(50,0,60), 30) );
	//scene.obstacles.push ( new Obstacle (new THREE.Vector3(0,0,30), 15) );
	walls.push(new wall(10,100,240,new THREE.Vector3(125,20,0)));
    walls.push(new wall(10,100,240,new THREE.Vector3(-125,20,0)));
    walls.push(new wall(240,100,10,new THREE.Vector3(0,20,125)));
    walls.push(new wall(240,100,10,new THREE.Vector3(0,20,-125)));


	//blood && N2
	N2 = makeTachometerHUD(5);
    N2.position.set(-17, -9 , 0);
    blood = makeTachometerHUD1(5);
    blood.position.set(-17, -8 , 0);
    sceneHUD.add(N2);
    sceneHUD.add(blood);
	
	/////////////////////////////////////
	ghost = new Agent (new THREE.Vector3(-85,0,-85), agentMesh1 (2,'red'), 'ghost');
		
	for (let i = 0; i < 5; i++) {
		let human = new Agent (randomPosZX(-100,100),agentMesh (1,'cyan'), 'human', initFSM());
		human.stateSign = stateSign();
		scene.add (human.stateSign);
		humans.push(human);
	}
	//trail 
	for (let i = 0; i < NPUFFS; i++) {
		puff = new THREE.Mesh(new THREE.SphereGeometry(3, 20, 20),
			new THREE.MeshBasicMaterial({
				transparent: true,
				color: 'cyan'
			}));
		
		puffs.push(puff);
		puff.position.copy (ghost.pos);
		scene.add(puff);
	}

	
	// d-drive initial

	speed = 0.0;
	angle = 0.0;
	ghost.vel = new THREE.Vector3(-1,0,1).setLength(speed);
	angle = -0.75*Math.PI;
	clockOn = true;
	//setTimeout (countDown, 0);
	setTimeout (bling, 0);
	counter = 59;

	updateTachometer (0.1);
	
initHUD();
	
	buildsecond();

	
}


function countDown() {
	turn = true;
	if (clockOn === false) 
		return;
	else if(result())
		return;
	else  // clock is still one: set next timeout
		setTimeout (countDown, 1000);

	//$('#msg').text (counter);
	//t += 0.5;
	--counter;
	console.log(counter);

	if (counter === 0){
		clockOn = false;
		collisionsound.play();
		//setTimeout(cancelAnimationFrame( id ),0);
		window.location.replace('./result.html')
	}
  	
}
function bling() {
	if (clockOn === false) 
		return;
	else  // clock is still one: set next timeout
		setTimeout (bling, 100);
	blingcount++;
  	
}
function result(){
    
    result1 = 1 ;
    humans.forEach(function(human) {
        if (human.fsm.state !== 'stop')result1 = 0;
    })
    return result1;
}

function gasRecharge(){
	
	if(speed === 25){
		toggle = 1 ;
		return;
	}
	else{
		gas += 0.1;
		gas = clamp (gas,0,1);
		toggle = 0;

		setTimeout(gasRecharge,1000);
	}

}

function gasRelease(){
	
	if( gas === 0 ){
		speed = 10; 
		$('#ghoststate').text ('normal mode');
		toggle = 1;
		return;
	}
	gas -= 0.01;
	gas = clamp (gas,0,1);
	toggle = 1;
}

var toggle = 1;
function animate() {
    keyboard.update();
	      
    if ( keyboard.pressed("left") ) {
        angle += 0.03;    
    }                   
    if ( keyboard.pressed("right") ){
        angle -= 0.03;    
    }
    if ( keyboard.pressed("up") ){
        if( gas >= 0.3 ){
            speed = 25;
            $('#ghoststate').text ('speedup mode');
        }
        else{
            $('#ghoststate').text ('gas is not enough');
        }
    }

    if ( keyboard.pressed("down") ){        
        speed = 10;
        $('#ghoststate').text ('normal mode');
    }
    if ( keyboard.pressed("space") ){  
        speed = 0;
        $('#ghoststate').text ('stop');
    }

    if( speed !== 25 ){
        if(toggle)gasRecharge();
    }
    else{
        gasRelease();
    }

    var dt = clock.getDelta();
    if(keyboard.down('Z'))
		tg=!tg;
	if(keyboard.down("enter")) {
		conclose()
		turn = true;
		if(turn){
			//console.log(0);
			setTimeout (time1, 50);
		}
		setTimeout (countDown, 0);
		start.innerHTML = " ";
	}
    if(!tg){
        let cameraPos = new THREE.Vector3(-50,25,0);
        ghost.mesh.localToWorld (cameraPos);
        camera.position.copy (cameraPos);
        let cameraLookAt = new THREE.Vector3(0,4,0);
        ghost.mesh.localToWorld (cameraLookAt);
        camera.lookAt (cameraLookAt);
		//group.children[0].material.visible = false;
		//group.children[1].material.visible = true;
    }
    else{
        camera.position.set( 0, 180 , 0 );
        camera.lookAt (new THREE.Vector3(0,0,0));
		//group.children[1].material.visible = false;
		//group.children[0].material.visible = true;
    }
    
    animate.distance = (animate.distance) ? animate.distance : 0;
    renderer.clear();
    id = requestAnimationFrame(animate);
    render();
    //renderer.render (sceneHUD, cameraHUD);
    
    findNbhd(humans);

    ghost.update(dt*2);
    
    humans.forEach(function(human) { 
        human.update(dt);

        let distanceNow = ghost.pos.distanceTo (human.pos);
      
        let BW = 10;
        // event firing
		let min = 100000;
		let record = 0;
        if (human.fsm.state === "flee" && distanceNow < animate.distance && distanceNow < 25){
            human.fsm.halt();
			for (let i = 0; i < human.nbhd.length; i++) {
				if( humans[i].fsm.state ===  "idle" && human.distanceTo(humans[i]) < min ){
					record = i;
					min = human.distanceTo(humans[i]);
				}
			}
			Agent.sendMsg(human, humans[record], 'help!');
			humans[record].rescue = human;
        }
            
        if (human.fsm.state === "flee" && distanceNow > animate.distance && distanceNow > 40+BW/2){
            human.fsm.depart();
        }    

        if (human.fsm.state === "idle" && distanceNow < animate.distance && distanceNow < 60-BW/2){
            human.fsm.approach(); 
        }
		
		if (human.fsm.state === "save" && distanceNow < animate.distance && distanceNow < 60-BW/2){
            human.fsm.danger();		// save -> flee 要讓被拯救者知道自己該重新求救了
			human.rescue.contract = true;
        }
        min = 100000;
		record = 0;
		if( human.contract ) {
			human.contract = false;
			for (let i = 0; i < human.nbhd.length; i++) {
				if( humans[i].fsm.state ===  "idle" && human.distanceTo(humans[i]) < min ){
					record = i;
					min = human.distanceTo(humans[i]);
				}
			}
			Agent.sendMsg(human, humans[record], 'help!');
			humans[record].rescue = human;
		}
        
        for (let i = 0; i < human.nbhd.length; i++) {
            if(human.distanceTo(human.nbhd[i]) < 21){
				if( human.fsm.state === "stop" && human.nbhd[i].fsm.state === "save" ){
				   human.fsm.saved();
				   human.nbhd[i].fsm.saving();
				   human.rescue = null;
				}
				else if (human.fsm.state === "save" && human.nbhd[i].fsm.state === "stop" ){
				   human.fsm.saving();
				   human.nbhd[i].fsm.saved();
				   human.rescue = null;
				}
				
            }
        }
	          
        animate.distance = distanceNow;
        
    })
    
    if(result()){
        collisionsound1.play();
		start.innerHTML = "WIN!!!! ";
		//counter=0;
        setTimeout(cancelAnimationFrame( id ),0);
    }
    
    updateTachometer (gasLevel); 
    updateTachometer1(gas);
    puffs[which % NPUFFS].position.copy(ghost.pos);
    
    for (let i = 0; i < NPUFFS; i++) {
        puffs[(which+1+i)%NPUFFS].material.opacity = (i+1)/NPUFFS;
        if(speed === 25)puffs[(which+1+i)%NPUFFS].material.color.setColorName('red');
        else puffs[(which+1+i)%NPUFFS].material.color.setColorName('cyan');
        puffs[(which+1+i)%NPUFFS].scale.set ( (i+1)/NPUFFS,(i+1)/NPUFFS,(i+1)/NPUFFS );  
    }
    ++which;

}

function render() {

		var WW = window.innerWidth;
		var HH = window.innerHeight;
		renderer.setScissorTest( true );

		renderer.setViewport(0, 0, WW, HH);
		camera.aspect = WW / HH;
		camera.updateProjectionMatrix();
		
		renderer.setScissor(0, 0, WW, HH);
		renderer.clear();
		
		//renderer.setViewport(0, 0, WW/2, HH);
		//renderer.setScissor(0, 0, WW/2, HH);
		renderer.render(scene, camera);
		renderer.render (sceneHUD, cameraHUD);
		renderer.setViewport(WW / 1.25, HH/1.6 , WW / 6, HH / 3);
		renderer.setScissor(WW / 1.25, HH/1.6  , WW / 6, HH / 3);
		
		renderer.clear(true);  // important!
		
		renderer.render(sceneHUD1, cameraHUD1);		// border
		renderer.render(scene, cameraHUD2);
		
		

		renderer.setScissorTest( false );
}