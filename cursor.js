/* ============================================
   CURSOR CUSTOM
   Sigue al mouse con inercia y reacciona a hover
   ============================================ */

(function () {
    'use strict';

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    if (!dot || !ring) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { x: mouse.x, y: mouse.y };
    const ringPos = { x: mouse.x, y: mouse.y };

    // Sensibilidad: el ring va más lento que el dot
    const dotEase = 0.6;
    const ringEase = 0.15;

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Hover en links/botones
    const hoverables = document.querySelectorAll('[data-cursor="hover"], a, button');
    hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            dot.classList.add('hover');
            ring.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            dot.classList.remove('hover');
            ring.classList.remove('hover');
        });
    });

    function update() {
        // Dot sigue casi instantáneo
        dotPos.x += (mouse.x - dotPos.x) * dotEase;
        dotPos.y += (mouse.y - dotPos.y) * dotEase;

        // Ring tiene más delay (sensación de "inercia")
        ringPos.x += (mouse.x - ringPos.x) * ringEase;
        ringPos.y += (mouse.y - ringPos.y) * ringEase;

        dot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
        ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;

        requestAnimationFrame(update);
    }

    update();
})();
