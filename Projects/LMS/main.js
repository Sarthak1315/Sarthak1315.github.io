// Three.js 3D Background Animation
// This creates an animated 3D background with particles and geometric shapes

// Setup Scene, Camera, Renderer
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();

// Add atmospheric fog for depth
scene.fog = new THREE.Fog(0x0d0d0d, 10, 50);

// Camera setup
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.z = 8;
camera.position.y = 2;

// Renderer setup
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ============ CREATE 3D OBJECTS ============

// 1. Main Core Object (Rotating Wireframe)
const coreGeometry = new THREE.IcosahedronGeometry(2, 1);
const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x007bff,
    wireframe: true,
    transparent: true,
    opacity: 0.6
});
const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
coreMesh.position.set(0, 0, 0);
scene.add(coreMesh);

// 2. Secondary Ring (Torus)
const ringGeometry = new THREE.TorusGeometry(3, 0.1, 16, 100);
const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0x00c9ff,
    transparent: true,
    opacity: 0.4
});
const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
ringMesh.rotation.x = Math.PI / 2;
scene.add(ringMesh);

// 3. Particle System (Representing Data/Leads)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 800;
const posArray = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i += 3) {
    // Position
    posArray[i] = (Math.random() - 0.5) * 25;
    posArray[i + 1] = (Math.random() - 0.5) * 25;
    posArray[i + 2] = (Math.random() - 0.5) * 25;

    // Colors (mix of blue and cyan)
    colors[i] = Math.random() * 0.5;
    colors[i + 1] = Math.random() * 0.5 + 0.5;
    colors[i + 2] = 1;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// 4. Orbiting Cubes (Representing Features)
const cubes = [];
const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x8e2de2,
    transparent: true,
    opacity: 0.7
});

for (let i = 0; i < 6; i++) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial.clone());
    const angle = (i / 6) * Math.PI * 2;
    cube.position.set(
        Math.cos(angle) * 4,
        Math.sin(angle * 2) * 2,
        Math.sin(angle) * 4
    );
    cubes.push({ mesh: cube, angle: angle, speed: 0.2 + Math.random() * 0.3 });
    scene.add(cube);
}

// ============ LIGHTING ============

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Point light (moving)
const pointLight = new THREE.PointLight(0x007bff, 1.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Secondary point light
const pointLight2 = new THREE.PointLight(0x00c9ff, 1);
pointLight2.position.set(-5, -5, -5);
scene.add(pointLight2);

// ============ SCROLL-BASED ANIMATION ============

let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;

    // Calculate which section we're in
    const sectionHeight = window.innerHeight;
    currentSection = Math.round(scrollY / sectionHeight);
});

// ============ MOUSE INTERACTION ============

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// ============ ANIMATION LOOP ============

const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Rotate main core
    coreMesh.rotation.x = elapsedTime * 0.1;
    coreMesh.rotation.y = elapsedTime * 0.15;

    // Rotate ring
    ringMesh.rotation.z = elapsedTime * 0.1;

    // Rotate particles slowly
    particlesMesh.rotation.y = elapsedTime * 0.05;

    // Animate orbiting cubes
    cubes.forEach((cubeObj, index) => {
        cubeObj.angle += cubeObj.speed * 0.01;
        cubeObj.mesh.position.x = Math.cos(cubeObj.angle) * 4;
        cubeObj.mesh.position.z = Math.sin(cubeObj.angle) * 4;
        cubeObj.mesh.position.y = Math.sin(cubeObj.angle * 2) * 2;
        cubeObj.mesh.rotation.x += 0.01;
        cubeObj.mesh.rotation.y += 0.01;
    });

    // Animate lights
    pointLight.position.x = Math.sin(elapsedTime * 0.5) * 5;
    pointLight.position.z = Math.cos(elapsedTime * 0.5) * 5;

    // Mouse parallax effect on camera
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;

    // Scroll-based transformations
    const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight);

    // Section 0: Hero - Center everything
    if (currentSection === 0) {
        coreMesh.position.x += (0 - coreMesh.position.x) * 0.05;
        coreMesh.position.y += (0 - coreMesh.position.y) * 0.05;
        coreMesh.scale.set(1, 1, 1);
        coreMaterial.color.setHex(0x007bff);
    }

    // Section 1: Multi-Tenant - Move left
    else if (currentSection === 1) {
        coreMesh.position.x += (-4 - coreMesh.position.x) * 0.05;
        coreMesh.position.y += (1 - coreMesh.position.y) * 0.05;
        coreMesh.scale.set(1.2, 1.2, 1.2);
        coreMaterial.color.setHex(0x8e2de2);
    }

    // Section 2: Lead Management - Move right
    else if (currentSection === 2) {
        coreMesh.position.x += (4 - coreMesh.position.x) * 0.05;
        coreMesh.position.y += (0 - coreMesh.position.y) * 0.05;
        coreMesh.scale.set(1.1, 1.1, 1.1);
        coreMaterial.color.setHex(0x28a745);
    }

    // Section 3: Follow-ups - Move left again
    else if (currentSection === 3) {
        coreMesh.position.x += (-4 - coreMesh.position.x) * 0.05;
        coreMesh.position.y += (-1 - coreMesh.position.y) * 0.05;
        coreMesh.scale.set(1.3, 1.3, 1.3);
        coreMaterial.color.setHex(0x00c9ff);
    }

    // Section 4+: Security - Move right
    else {
        coreMesh.position.x += (4 - coreMesh.position.x) * 0.05;
        coreMesh.position.y += (1 - coreMesh.position.y) * 0.05;
        coreMesh.scale.set(1, 1, 1);
        coreMaterial.color.setHex(0xff6b6b);
    }

    // Render
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// ============ HANDLE WINDOW RESIZE ============

window.addEventListener('resize', () => {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ============ SMOOTH SCROLL (Simple Implementation) ============

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('🚀 LMS Enterprise Landing Page Loaded');
console.log('📊 3D Background: Active');
console.log('🎯 Features: Multi-Tenant, Lead Management, Follow-ups, Security');