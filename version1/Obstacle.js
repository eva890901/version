class Obstacle {
	constructor (center,size) {
		let loader = new THREE.TextureLoader();
		let icon = loader.load('https://i.imgur.com/Vby3M2t.png%27');
		this.center = center.clone();  
		this.mesh = new THREE.Mesh (new THREE.CylinderGeometry(size,size,3,20),
		new THREE.MeshBasicMaterial({map: icon, transparent: true}));
		this.mesh.position.copy (center);
		this.size = size;
		scene.add (this.mesh);
	}
}