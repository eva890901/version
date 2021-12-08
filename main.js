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
	//texture = loader2.load('https://i.imgur.com/g2zYLH9.jpeg');

	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(10, 10);
  
	mesh = new THREE.Mesh(new THREE.PlaneGeometry(240, 240), 
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
	scene.obstacles.push ( new Obstacle (new THREE.Vector3(50,0,55), 30) );
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
	ghost = new Agent (new THREE.Vector3(30,0,0), agentMesh1 (2,'red'), 'ghost');
		
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
	// 秒數 loader
	/*
	var loader = new THREE.TextureLoader();

    // load a resource
    loader.load(
    // resource URL
    'https://i.imgur.com/ZKmfyju.png',
    // Function when resource is loaded
    function(texture) {

        var texMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
        });
        mesh = new THREE.Mesh(buildGeometry(), texMat);
        sceneHUD.add(mesh);
        mesh.position.set(-16, 7 , 0);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
    },
        undefined,
    // Function called when download errors
    function(xhr) {
      console.log('An error happened');
		}
	);
	var loader1 = new THREE.TextureLoader();

	// load a resource
	loader1.load(
    // resource URL
    'https://i.imgur.com/krJVJEW.png',
    // Function when resource is loaded
    function(texture) {
		// do something with the texture
		// Plane with default texture coordinates [0,1]x[0,1]
		var texMat1 = new THREE.MeshBasicMaterial({
			map: texture,
			transparent: true
		});
		mesh1 = new THREE.Mesh(buildGeometry1(), texMat1);
		sceneHUD.add(mesh1);
		mesh1.position.set(-18, 7 , 0);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
    },
        undefined,
    // Function called when download errors
    function(xhr) {
		console.log('An error happened');
    }
	);
	//setInterval (textureAnimate, 1000);
    //setInterval (textureAnimate1, 10000);*/
	
	// d-drive initial

	speed = 5.0;
	angle = 0.0;
	ghost.vel = new THREE.Vector3(-1,0,1).setLength(speed);
	angle = -0.75*Math.PI;
	clockOn = true;
	setTimeout (countDown, 0);
	setTimeout (bling, 0);
	counter = 59;

	updateTachometer (0.1);
	
	group = new THREE.Group();
	sceneHUD.add (group);
  
  	let loader89 = new THREE.TextureLoader();
	let firstMap = loader89.load ("https://i.imgur.com/9u1brLw.png");
	let firstMesh = new THREE.Mesh (new THREE.CircleGeometry(1,20), new THREE.MeshBasicMaterial(
		{map: firstMap, transparent: true, alphaTest: 1, side:THREE.DoubleSide}));
	group.add (firstMesh);
  
  	let thirdMap = loader89.load ("https://i.imgur.com/4cplgbb.png");
	let thirdMesh = new THREE.Mesh (new THREE.CircleGeometry(1,20), new THREE.MeshBasicMaterial(
		{map: thirdMap, transparent: true, alphaTest: 1, side:THREE.DoubleSide}));	
	group.add (thirdMesh);
	group.children[1].material.visible = false;
	group.position.set(-13,-8.5,0);
	
	buildsecond();
	console.log(turn);
	turn = true;
	if(turn){
		console.log(0);
		setTimeout (time1, 50);
	}
	
}

// buildGeometry 秒數
function buildGeometry() {

	var geometry = new THREE.BufferGeometry();
	let vertices = [];
	let uvs = [];
	let indices = [0,1,2, 0,2,3];
	vertices.push(-0.9,-0.9,0, 0.9,-0.9,0, 0.9,0.9,0, -0.9,0.9,0);
	uvs.push (0.8,0.5, 1, 0.5, 1,1, 0.8,1);

	geometry.setIndex(indices);
	geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

	geometry.computeBoundingSphere();

	geometry.computeVertexNormals();
	return geometry;
}

function buildGeometry1() {

	var geometry = new THREE.BufferGeometry();
	let vertices = [];
	let uvs = [];
	let indices = [0,2,3, 0,1,2];
	vertices.push(-1,-1,0, 1,-1,0, 1,1,0, -1,1,0);
	uvs.push (0.8,0, 1, 0, 1,1, 0.8,1);

	geometry.setIndex(indices);
	geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

	geometry.computeBoundingSphere();
	geometry.computeVertexNormals();
	return geometry;
	
}
// textureAnimate  秒數
function textureAnimate() {
  textureAnimate.count = (textureAnimate.count === undefined) ? 1 : textureAnimate.count;

    if (mesh) {
    var texture = mesh.material.map;
	//console.log (${textureAnimate.count}: [${texture.offset.x},${texture.offset.y}]);
    texture.offset.x -= 0.2;
 
         if (textureAnimate.count % 5 === 0) {
        texture.offset.y += 0.5;
		}
    textureAnimate.count++;
  }
}


function textureAnimate1() {
  textureAnimate1.count = (textureAnimate1.count === undefined) ? 1 : textureAnimate1.count;

    if (mesh1) {
    var texture = mesh1.material.map;
	//console.log (${textureAnimate1.count}: [${texture.offset.x},${texture.offset.y}]);
    texture.offset.x -= 0.2;

     if (textureAnimate1.count % 5 === 0) {
			$('#result').text ('YOU Lose!!!!');
			collisionsound.play();
			//setTimeout(cancelAnimationFrame( id ),0);
			window.location.replace('./result.html')
		}
		textureAnimate1.count++;
	}
}

function countDown() {
	if (clockOn === false) 
		return;
	else  // clock is still one: set next timeout
		setTimeout (countDown, 1000);

	//$('#msg').text (counter);
	--counter;

	if (counter < 0){
		clockOn = false;
		$('#result').text ('YOU Lose!!!!');
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
		console.log("Gas recharge");
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
		console.log(turn);
		start.innerHTML = " ";
	}
    if(tg){
        let cameraPos = new THREE.Vector3(-50,25,0);
        ghost.mesh.localToWorld (cameraPos);
        camera.position.copy (cameraPos);
        let cameraLookAt = new THREE.Vector3(0,4,0);
        ghost.mesh.localToWorld (cameraLookAt);
        camera.lookAt (cameraLookAt);
		group.children[0].material.visible = false;
		group.children[1].material.visible = true;
    }
    else{
        camera.position.set( 0, 180 , 0 );
        camera.lookAt (new THREE.Vector3(0,0,0));
		group.children[1].material.visible = false;
		group.children[0].material.visible = true;
    }
    
    animate.distance = (animate.distance) ? animate.distance : 0;
    renderer.clear();
    id = requestAnimationFrame(animate);
    render();
    renderer.render (sceneHUD, cameraHUD);
    
    findNbhd(humans);

    ghost.update(dt*2);
    
    humans.forEach(function(human) { 
        human.update(dt);

        let distanceNow = ghost.pos.distanceTo (human.pos);
      
        let BW = 10;
        // event firing
        if (human.fsm.state === "flee" && distanceNow < animate.distance && distanceNow < 25){
            human.fsm.halt();
        }
            
        if (human.fsm.state === "flee" && distanceNow > animate.distance && distanceNow > 40+BW/2){
            human.fsm.depart();
        }    

        if (human.fsm.state === "idle" && distanceNow < animate.distance && distanceNow < 40-BW/2){
            human.fsm.approach(); 
        }
        
        let beSaved = 0;
        
        for (let i = 0; i < human.nbhd.length; i++) {
            if(human.distanceTo(human.nbhd[i])<20){
                beSaved = 1;
                break;
            }
        }
        
        if (human.fsm.state === "stop" && beSaved === 1){
            human.fsm.saved();
        }
              
        animate.distance = distanceNow;
        
    })
    
    if(result()){
        start.innerHTML = "YOU WIN!!!!";
        collisionsound1.play();
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
	renderer.render(scene, camera);
}