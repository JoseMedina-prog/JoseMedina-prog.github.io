/* ============================================
   FONDO 3D CON THREE.JS
   - Icosahedron wireframe (violeta)
   - Torus (cyan)
   - Partículas flotantes
   - Reacción al mouse + parallax al scroll
   ============================================ */

(function () {
    'use strict';

    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

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

    // Icosahedron wireframe
    const icosahedron = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.2, 1),
        new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: 0.6,
        })
    );
    scene.add(icosahedron);

    // Torus cyan
    const torus = new THREE.Mesh(
        new THREE.TorusGeometry(1.4, 0.02, 16, 100),
        new THREE.MeshBasicMaterial({
            color: 0x06b6d4,
            transparent: true,
            opacity: 0.5,
        })
    );
    scene.add(torus);

    // Tercer objeto: anillo rosa para más color
    const ringPink = new THREE.Mesh(
        new THREE.TorusGeometry(1.8, 0.01, 16, 100),
        new THREE.MeshBasicMaterial({
            color: 0xec4899,
            transparent: true,
            opacity: 0.35,
        })
    );
    ringPink.rotation.x = Math.PI / 3;
    scene.add(ringPink);

    // Partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particles = new THREE.Points(
        particlesGeometry,
        new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.015,
            transparent: true,
            opacity: 0.6,
        })
    );
    scene.add(particles);

    // Mouse
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Scroll parallax
    let scrollY = 0;
    const updateScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', updateScroll, { passive: true });

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
        requestAnimationFrame(animate);

        icosahedron.rotation.x += 0.002;
        icosahedron.rotation.y += 0.003;
        torus.rotation.x += 0.004;
        torus.rotation.y -= 0.002;
        ringPink.rotation.z += 0.003;

        targetRotation.x = mouse.y * 0.3;
        targetRotation.y = mouse.x * 0.3;
        icosahedron.rotation.x += (targetRotation.x - icosahedron.rotation.x) * 0.05;
        icosahedron.rotation.y += (targetRotation.y - icosahedron.rotation.y) * 0.05;

        // Parallax con scroll: la cámara se aleja/acerca al hacer scroll
        const scrollFactor = scrollY * 0.0015;
        camera.position.z = 5 + scrollFactor * 2;
        camera.position.y = -scrollFactor * 1.5;

        // Las partículas también se mueven un poco
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0002;

        renderer.render(scene, camera);
    }

    animate();
})();
