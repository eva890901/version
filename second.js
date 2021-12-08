function buildsecond(){
	let loader = new THREE.TextureLoader();
	let map = loader.load("https://i.imgur.com/J8TCJl0.png");
	let map1 = loader.load("https://i.imgur.com/3b1cq3w.png");
	let map2 = loader.load("https://i.imgur.com/H7egIFH.png");
	let map3 = loader.load("https://i.imgur.com/2hlGGAS.png");
	let map4 = loader.load("https://i.imgur.com/6QYLvkv.png");
	let map5 = loader.load("https://i.imgur.com/gkdeGBM.png");
	let map6 = loader.load("https://i.imgur.com/jyTeYmH.png");
	let map7 = loader.load("https://i.imgur.com/9Yf5aAC.png");
	let map8 = loader.load("https://i.imgur.com/T49yyjd.png");
	let map9 = loader.load("https://i.imgur.com/DbNtfcp.png");
	/////////////////////////////////////////////////////
	let map00 = loader.load("https://i.imgur.com/J8TCJl0.png");
	let map11 = loader.load("https://i.imgur.com/3b1cq3w.png");
	let map22 = loader.load("https://i.imgur.com/H7egIFH.png");
	let map33 = loader.load("https://i.imgur.com/2hlGGAS.png");
	let map44 = loader.load("https://i.imgur.com/6QYLvkv.png");
	let map55 = loader.load("https://i.imgur.com/gkdeGBM.png");
	
	ccgg = new THREE.Object3D();
	let card = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map}));
	ccgg.add (card);
	
	ccgg1 = new THREE.Object3D();
	let card1 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map1}));
	ccgg1.add (card1);
	
	ccgg2 = new THREE.Object3D();
	let card2 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map2}));
	ccgg2.add (card2);
	
	ccgg3 = new THREE.Object3D();
	let card3 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map3}));
	ccgg3.add (card3);
	
	ccgg4 = new THREE.Object3D();
	let card4 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map4}));
	ccgg4.add (card4);
	
	ccgg5 = new THREE.Object3D();
	let card5 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map5}));
	ccgg5.add (card5);
	
	ccgg6 = new THREE.Object3D();
	let card6 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map6}));
	ccgg6.add (card6);
	
	ccgg7 = new THREE.Object3D();
	let card7 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map7}));
	ccgg7.add (card7);
	
	ccgg8 = new THREE.Object3D();
	let card8 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map8}));
	ccgg8.add (card8);
	
	ccgg9 = new THREE.Object3D();
	let card9 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map9}));
	ccgg9.add (card9);
	///////////////////////////////////////////////
	
	ccgg00 = new THREE.Object3D();
	let card00 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map}));
	ccgg00.add (card00);
	
	ccgg11 = new THREE.Object3D();
	let card11 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map1}));
	ccgg11.add (card11);
	
	ccgg22 = new THREE.Object3D();
	let card22 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map2}));
	ccgg22.add (card22);
	
	ccgg33 = new THREE.Object3D();
	let card33 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map3}));
	ccgg33.add (card33);
	
	ccgg44 = new THREE.Object3D();
	let card44 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map4}));
	ccgg44.add (card44);
	
	ccgg55 = new THREE.Object3D();
	let card55 = new THREE.Mesh (new THREE.PlaneGeometry(2,4), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map:map5}));
	ccgg55.add (card55);
	
	card.position.set (-16,-2,0);
	card1.position.set (-16,-2,0.01);
	card2.position.set (-16,-2,0.02);
	card3.position.set (-16,-2,0.03);
	card4.position.set (-16,-2,0.04);
	card5.position.set (-16,-2,0.05);
	card6.position.set (-16,-2,0.06);
	card7.position.set (-16,-2,0.07);
	card8.position.set (-16,-2,0.08);
	card9.position.set (-16,-2,0.09);
	
	card00.position.set (0,-2,0);
	card11.position.set (0,-2,0.01);
	card22.position.set (0,-2,0.02);
	card33.position.set (0,-2,0.03);
	card44.position.set (0,-2,0.04);
	card55.position.set (0,-2,0.05);
	
	sceneHUD.add (ccgg);
	sceneHUD.add (ccgg1);
	sceneHUD.add (ccgg2);
	sceneHUD.add (ccgg3);
	sceneHUD.add (ccgg4);
	sceneHUD.add (ccgg5);
	sceneHUD.add (ccgg6);
	sceneHUD.add (ccgg7);
	sceneHUD.add (ccgg8);
	sceneHUD.add (ccgg9);
	
	sceneHUD.add (ccgg00);
	sceneHUD.add (ccgg11);
	sceneHUD.add (ccgg22);
	sceneHUD.add (ccgg33);
	sceneHUD.add (ccgg44);
	sceneHUD.add (ccgg55);
	
	ccgg.position.y = 9;
	ccgg1.position.y =9;
	ccgg2.position.y = 9;
	ccgg3.position.y = 9;
	ccgg4.position.y = 9;
	ccgg5.position.y = 9;
	ccgg6.position.y = 9;
	ccgg7.position.y = 9;
	ccgg8.position.y = 9;
	ccgg9.position.y = 9;
	
	ccgg00.position.set(-18,9,0);
	ccgg11.position.set(-18,9,0);
	ccgg22.position.set(-18,9,0);
	ccgg33.position.set(-18,9,0);
	ccgg44.position.set(-18,9,0);
	ccgg55.position.set(-18,9,0);
	// orientations: q1 - q2(halfway) - q3
	q1 = new THREE.Quaternion();  // no turn
	q2 = 
	new THREE.Quaternion().setFromEuler (new THREE.Euler(-Math.PI*0.95,0,0));
	q3 = 
	new THREE.Quaternion().setFromEuler (new THREE.Euler(-Math.PI*1.94,0,0));

	// the interpolating quaterion
	qq = new THREE.Quaternion(); 
	qq1 = new THREE.Quaternion();
}
function time1(){
let qa, qb, qc, qd;
	t += 0.01;
	//console.log(t);
  // for 0<t<1: [q1, q2] (offset = 0)
  // for 1<t<2: [q2, q3] (offset = 1)

	if (t < 1) { // first half
		qa = q1, qb = q2;
		qc = q3, qd = q1;
		offset = 0;
	} 
	else if (t > 1) { // second half
		qa = q2, qb = q3;
		qc = q1, qd = q1;
		offset = 1;
	} 

	if(t>=2){
		t=0;
		i--;
	}
	if(i<0){
		i=9;
		open = true;
		j--;
		
	}

	if (turn && t <= 2) {
		qq.slerpQuaternions (qa, qb, t - offset);
		qq1.slerpQuaternions (qc, qd, t - offset);
		if(!open){
			if(i===0){
				ccgg.quaternion.copy (qq);
				ccgg9.quaternion.copy (qq1);
				if(j===5){
					ccgg55.quaternion.copy (qq);
				}
				
			}
			else if(i===1){
				ccgg1.quaternion.copy (qq);
			}	
			else if(i===2)
				ccgg2.quaternion.copy (qq); 
			else if(i===3)
				ccgg3.quaternion.copy (qq)	
			else if(i===4)
				ccgg4.quaternion.copy (qq);
			else if(i===5)
				ccgg5.quaternion.copy (qq);
			else if(i===6)
				ccgg6.quaternion.copy (qq); 
			else if(i===7)
				ccgg7.quaternion.copy (qq)	
			else if(i===8)
				ccgg8.quaternion.copy (qq); 	
			else if(i===9)
				ccgg9.quaternion.copy (qq); 
		
		
		}
		else{
		if(i===0){
			ccgg.quaternion.copy (qq);
			ccgg9.quaternion.copy (qq1);
			if(j===4){
				ccgg44.quaternion.copy (qq);

			}
			else if(j===3){
				ccgg33.quaternion.copy (qq);

			}
			else if(j===2){
				ccgg22.quaternion.copy (qq);

			}
			else if(j===1){
				ccgg11.quaternion.copy (qq);

			}
			else if(j===0){
				ccgg11.quaternion.copy (qq);

			}
			
			console.log(j);
		}
		else if(i===1){
			ccgg1.quaternion.copy (qq);
			ccgg.quaternion.copy (qq1);
			//console.log(i);
			//console.log (t);
			//console.log (open);
		}	
		else if(i===2){
			ccgg2.quaternion.copy (qq);
			ccgg1.quaternion.copy (qq1);
		}
		else if(i===3){
			ccgg3.quaternion.copy (qq);
			ccgg2.quaternion.copy (qq1);
		}
		else if(i===4){
			ccgg4.quaternion.copy (qq);
			ccgg3.quaternion.copy (qq1);
		}		
		else if(i===5){
			ccgg5.quaternion.copy (qq);
			ccgg4.quaternion.copy (qq1);
		}	
		else if(i===6){
			ccgg6.quaternion.copy (qq);
			ccgg5.quaternion.copy (qq1);
		}	
		else if(i===7){
			ccgg7.quaternion.copy (qq);
			ccgg6.quaternion.copy (qq1);
		}	
		else if(i===8){
			ccgg8.quaternion.copy (qq);
			ccgg7.quaternion.copy (qq1);
		}
		else if(i===9){
			ccgg9.quaternion.copy (qq);
			ccgg8.quaternion.copy (qq1);
		}
		
		
		
		}

  } else {
  	turn = false; 
    t = 0;

  }
	setTimeout (time1, 0);
}