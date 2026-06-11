/* ============================================
   CURSOR CUSTOM
   - Dot blanco (rápido)
   - Ring con delay (inercia)
   - Texto contextual para project cards
   ============================================ */

(function () {
    'use strict';

    if (window.matchMedia('(max-width: 768px)').matches) return;

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const text = document.getElementById('cursor-text');

    if (!dot || !ring) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { x: mouse.x, y: mouse.y };
    const ringPos = { x: mouse.x, y: mouse.y };
    const textPos = { x: mouse.x, y: mouse.y };

    const dotEase = 0.6;
    const ringEase = 0.15;
    const textEase = 0.2;

    let isVisible = false;
    let textVisible = false;

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        if (!isVisible) {
            isVisible = true;
            dot.style.opacity = '1';
            ring.style.opacity = '1';
        }
    });

    window.addEventListener('mouseleave', () => {
        isVisible = false;
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });

    // Hover contextual con texto (project cards) — tiene prioridad
    const textTargets = document.querySelectorAll('[data-cursor-text]');
    textTargets.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            const label = el.getAttribute('data-cursor-text');
            if (label && text) {
                text.textContent = label;
                showText();
            }
        });
        el.addEventListener('mouseleave', () => {
            hideText();
        });
    });

    // Hover genérico en links/botones (excluir los que tienen data-cursor-text)
    const hoverables = document.querySelectorAll('[data-cursor="hover"], a, button');
    hoverables.forEach((el) => {
        // No aplicar hover genérico si el elemento (o un ancestro) tiene data-cursor-text
        if (el.closest('[data-cursor-text]')) return;
        el.addEventListener('mouseenter', () => {
            dot.classList.add('hover');
            ring.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            dot.classList.remove('hover');
            ring.classList.remove('hover');
        });
    });

    function showText() {
        if (text && !textVisible) {
            textVisible = true;
            text.classList.add('active');
        }
    }

    function hideText() {
        if (text && textVisible) {
            textVisible = false;
            text.classList.remove('active');
        }
    }

    function update() {
        dotPos.x += (mouse.x - dotPos.x) * dotEase;
        dotPos.y += (mouse.y - dotPos.y) * dotEase;

        ringPos.x += (mouse.x - ringPos.x) * ringEase;
        ringPos.y += (mouse.y - ringPos.y) * ringEase;

        textPos.x += (mouse.x - textPos.x) * textEase;
        textPos.y += (mouse.y - textPos.y) * textEase;

        dot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
        ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
        if (text) {
            text.style.transform = `translate(${textPos.x}px, ${textPos.y}px) translate(-50%, -50%)`;
        }

        requestAnimationFrame(update);
    }

    update();
})();
