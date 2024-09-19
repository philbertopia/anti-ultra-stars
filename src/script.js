import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// // Slowly load image container
// document.addEventListener('DOMContentLoaded', () => {
//     const imageContainer = document.querySelector('.image-container');
//     imageContainer.classList.add('visible');
// });

// Canvas
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture1 = textureLoader.load('/textures/particles/red_no_trans.png');
particleTexture1.magFilter = THREE.NearestFilter;
particleTexture1.minFilter = THREE.NearestFilter;
const particleTexture2 = textureLoader.load('/textures/particles/red_x_trans.png');
particleTexture2.magFilter = THREE.NearestFilter;
particleTexture2.minFilter = THREE.NearestFilter;

/**
 * PARTICLES
 */
const count = 100; // Number of particles
const radius = 5;  // Radius of the sphere

// Positions for particles1
const positions1 = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi); // Fixed missing closing parenthesis

    positions1[i * 3] = x;
    positions1[i * 3 + 1] = y;
    positions1[i * 3 + 2] = z;
}

// Create geometry for particles1
const particlesGeometry1 = new THREE.BufferGeometry();
particlesGeometry1.setAttribute('position', new THREE.BufferAttribute(positions1, 3));

// Create material for particles1
const particleMaterial1 = new THREE.PointsMaterial({
    size: 0.5,
    sizeAttenuation: true,
    map: particleTexture1,
    alphaTest: 0.5,
    transparent: true, // Enable transparency
});

// Create points for particles1
const particles1 = new THREE.Points(particlesGeometry1, particleMaterial1);
scene.add(particles1);

// Positions for particles2
const positions2 = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions2[i * 3] = x;
    positions2[i * 3 + 1] = y;
    positions2[i * 3 + 2] = z;
}

// Create geometry for particles2
const particlesGeometry2 = new THREE.BufferGeometry();
particlesGeometry2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));

// Create material for particles2
const particleMaterial2 = new THREE.PointsMaterial({
    size: 0.5,
    sizeAttenuation: true,
    map: particleTexture2,
    alphaTest: 0.5,
    transparent: true, // Enable transparency
});

// Create points for particles2
const particles2 = new THREE.Points(particlesGeometry2, particleMaterial2);
scene.add(particles2);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enableRotate = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update particles rotation
    particles1.rotation.x -= 0.0002; // Rotate particles1
    particles2.rotation.x += 0.0002; // Rotate particles2 in the opposite direction

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();



// // CLOCK
// function updateClock() {
//     const now = new Date();
//     const second = now.getSeconds();
//     const minute = now.getMinutes();
//     const hour = now.getHours();

//     const secondHand = document.querySelector('.second-hand');
//     const minuteHand = document.querySelector('.minute-hand');
//     const hourHand = document.querySelector('.hour-hand');

//     const secondDegrees = (second / 60) * 360 + 90;
//     const minuteDegrees = (minute / 60) * 360 + (second / 60) * 6 + 90;
//     const hourDegrees = (hour / 12) * 360 + (minute / 60) * 30 + 90;

//     secondHand.style.transform = `rotate(${secondDegrees}deg)`;
//     minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
//     hourHand.style.transform = `rotate(${hourDegrees}deg)`;
// }

// setInterval(updateClock, 1000);
// updateClock(); // Initial call to set the clock immediately