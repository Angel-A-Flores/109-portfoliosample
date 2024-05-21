// import './css/styles.css'

import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

let chair, mixer


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render (scene, camera);

// const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
// const material = new THREE.MeshStandardMaterial( {color: 0xFF6347});
// const torus = new THREE.Mesh ( geometry, material );

// scene.add(torus)

// const boxMaterial = new THREE.ShaderMaterial({
//     vertexShader: `
//     void main() {
//         // projectionMatrix, modelViewMatrix, position -> passed in from Three.js
//         gl_Position = projectionMatrix
//         * modelViewMatrix
//         * vec4(position.x, position.y, position.z, 1.0);
//     }
//     `,
//     fragmentShader: `
//     void main() {
//         gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
//     }
//     `,
// });

const pointLight = new THREE.PointLight(0xffffff, 5.0)
pointLight.position.set(0,20,28)

const pointLight2 = new THREE.PointLight(0xffffff, 5.0)
pointLight2.position.set(0,12,27.8)

const pointLight3 = new THREE.PointLight(0xffffff, 25.0)
pointLight3.position.set(0,0,31)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight, pointLight2, pointLight3)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);

// scene.add(lightHelper, gridHelper)


// const controls = new OrbitControls(camera, renderer.domElement); 

const loader = new GLTFLoader(); // to load 3d models

loader.load('assets/chair/scene5.gltf', function (gltf) {
	chair = gltf.scene;
	scene.add(chair);

	
// Modify the position
//(?,z,HERE)
chair.position.set(0, 0, 26.4);

// Modify the scale
chair.scale.set(0.1, 0.1, 0.1);

    // Set up the animation mixer
    mixer = new THREE.AnimationMixer(chair);
    gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
    });
}, undefined, function (error) {
    console.error(error);
});


function moveCamera() {

    const t = document.body.getBoundingClientRect().top;

    camera.position.y = t * -0.03;
}

document.body.onscroll = moveCamera

// function addStar() {
//     const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//     const material = new THREE.MeshStandardMaterial( {color: 0xFFFFFF});
//     const star = new THREE.Mesh (geometry, material);

//     const [x,y,z] = Array (3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

//     star.position.set(x,y,z);
//     scene.add(star)
// }

// Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('sunset.jpg');
scene.background = spaceTexture;

const clock = new THREE.Clock();



function handleMouseMove(event) {
    // Get the vertical position of the mouse
    var mouseY = event.clientY;

    // Get the height of the viewport
    var viewportHeight = window.innerHeight;

    // Get the height of the document
    var documentHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    // Determine whether the mouse is in the upper half, lower half, or center of the viewport
    if (mouseY < viewportHeight / 2 && window.scrollY > 0) {
        // If the mouse is in the upper half and not at the top of the document, scroll upwards
        window.scrollBy(0, -1); // Adjust the scrolling speed as needed
    } else if (mouseY > viewportHeight / 2 && window.scrollY < (documentHeight - viewportHeight)) {
        // If the mouse is in the lower half and not at the bottom of the document, scroll downwards
        window.scrollBy(0, 1); // Adjust the scrolling speed as needed
    }
}

// Add event listener for mouse movement
document.addEventListener('mousemove', handleMouseMove);


function animate() {
    requestAnimationFrame( animate );

    // torus.rotation.x += 0.01;
    // torus.rotation.y += 0.005;
    // torus.rotation.z += 0.01;

    // controls.update();

    if (mixer) {
        mixer.update(clock.getDelta());
    }


    renderer.render( scene, camera );
}

animate ();