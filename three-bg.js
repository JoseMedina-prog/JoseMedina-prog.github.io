/* ============================================
   FONDO 3D CON THREE.JS
   Geometría wireframe que reacciona al mouse
   ============================================ */

(function () {
    'use strict';

    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // === Setup ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // === Geometría: Icosahedron wireframe (la "estrella" 3D) ===
    const geometry = new THREE.IcosahedronGeometry(2.2, 1);

    // Material wireframe con color morado
    const material = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
    });

    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);

    // === Segundo objeto: torus más pequeño, color cyan ===
    const torusGeometry = new THREE.TorusGeometry(1.4, 0.02, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.5,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // === Partículas flotantes de fondo ===
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.015,
        transparent: true,
        opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // === Mouse tracking ===
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // === Resize handler ===
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // === Animation loop ===
    function animate() {
        requestAnimationFrame(animate);

        // Rotación base
        icosahedron.rotation.x += 0.002;
        icosahedron.rotation.y += 0.003;

        torus.rotation.x += 0.004;
        torus.rotation.y -= 0.002;

        // Reacción suave al mouse
        targetRotation.x = mouse.y * 0.3;
        targetRotation.y = mouse.x * 0.3;

        icosahedron.rotation.x += (targetRotation.x - icosahedron.rotation.x) * 0.05;
        icosahedron.rotation.y += (targetRotation.y - icosahedron.rotation.y) * 0.05;

        // Partículas rotan lento
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0002;

        renderer.render(scene, camera);
    }

    animate();
})();
