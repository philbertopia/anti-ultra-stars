import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

// slowly load image container
document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.image-container');
    imageContainer.classList.add('visible');
});


/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

// PARTICLES
// GEOMETRY
// const particleGeometry = new THREE.SphereGeometry(1, 32, 32)
const particlesGeometry = new THREE.BufferGeometry(1, 32, 32)
const count = 5000

const positions = new Float32Array(count * 3)

// for(let i = 0; i < count * 3; i++) {
//     positions[i] = (Math.random() - 0.5) * 10
// }

// Randomly distribute particles on the surface of a sphere
const radius = 5;  // Radius of the sphere

for (let i = 0; i < count; i++) {
    // Spherical coordinates
    const theta = Math.random() * 2 * Math.PI; // Random angle around the Z axis
    const phi = Math.acos(2 * Math.random() - 1); // Random angle from the Z axis

    // Convert spherical coordinates to Cartesian coordinates
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    // Set the positions array
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
}


particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

// MATERIAL
const particleMaterial = new THREE.PointsMaterial({
    size: 0.03,
    sizeAttenuation: true,

})

//POINTS
const particles = new THREE.Points(particlesGeometry, particleMaterial)
scene.add(particles)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false; // Disable zooming with the scroll wheel
controls.enableRotate = true; // Ensure rotation is enabled

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update particles rotation
    particles.rotation.x -= 0.0002; // Rotate slowly along the y-axis

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


// CLOCK
function updateClock() {
    const now = new Date();
    const second = now.getSeconds();
    const minute = now.getMinutes();
    const hour = now.getHours();

    const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const hourHand = document.querySelector('.hour-hand');

    const secondDegrees = (second / 60) * 360 + 90;
    const minuteDegrees = (minute / 60) * 360 + (second / 60) * 6 + 90;
    const hourDegrees = (hour / 12) * 360 + (minute / 60) * 30 + 90;

    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to set the clock immediately