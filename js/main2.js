// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

let scene, camera, renderer, cube, cylinder, light, chair, rotation;
let sceneContainer = document.querySelector("#scene-container")

function init(){

	// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);
light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(1,1,15);
scene.add(light);

renderer = new THREE.WebGLRenderer({antialias : true});
renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
sceneContainer.appendChild(renderer.domElement);

const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 ); 
// const material = new THREE.MeshBasicMaterial( {color: 0x0000ff} ); 
const cubeTexture = new THREE.TextureLoader().load('textures/Checker.jpg')
const cubeMaterial = new THREE.MeshBasicMaterial( {map : cubeTexture} );
cube = new THREE.Mesh( cubeGeometry, cubeMaterial ); 
scene.add(cube);

const cylinderGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 1, 32 ); 
const cylinderMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial ); 
scene.add( cylinder );

cylinder.position.set(-2, 0, 0);





// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader(); // to load 3d models

loader.load('assets/chair/scene.gltf', function (gltf) {
	chair = gltf.scene;
	scene.add(chair);

	
// Modify the position
chair.position.set(4, 0, 0);

// Modify the scale
chair.scale.set(0.1, 0.1, 0.1);

})




camera.position.z = 5;

}


    
// }



function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	chair.rotation.x += 0.01;
	chair.rotation.y += 0.01;


	cylinder.rotation.x += 0.01;
	cylinder.rotation.y += 0.01;

	renderer.render( scene, camera );
}


function onWindowResize() {
	camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate(); 

// →→→→→→ Follow next steps in tutorial: // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


