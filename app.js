/* ============================================
   APP.JS - Lógica principal
   - Lenis (smooth scroll)
   - Loader
   - GSAP animaciones de scroll
   - Magnetic buttons
   ============================================ */

(function () {
    'use strict';

    // === 1. LOADER ===
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loader-bar');
    const loaderNum = document.getElementById('loader-num');

    let progress = 0;
    const loaderInterval = setInterval(() => {
        progress += Math.random() * 12;
        if (progress > 100) progress = 100;

        loaderBar.style.width = progress + '%';
        loaderNum.textContent = Math.floor(progress);

        if (progress >= 100) {
            clearInterval(loaderInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                // Disparar animaciones del hero después del loader
                animateHero();
            }, 400);
        }
    }, 80);

    // === 2. LENIS SMOOTH SCROLL ===
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrar Lenis con GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // === 3. GSAP - Animación del HERO ===
    function animateHero() {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.to('.hero-badge', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        })
        .to('.hero-line', {
            y: 0,
            duration: 1.2,
            stagger: 0.1,
        }, '-=0.4')
        .to('.hero-sub', {
            opacity: 1,
            y: 0,
            duration: 1,
        }, '-=0.6')
        .to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 1,
        }, '-=0.7')
        .to('.hero-scroll', {
            opacity: 1,
            duration: 0.8,
        }, '-=0.4');
    }

    // === 4. GSAP SCROLL - About, Projects, Skills, Contact ===

    // Registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // About text
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
    });

    // About stats (stagger)
    gsap.from('.about-stat', {
        scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
    });

    // Projects header
    gsap.from('.projects-header', {
        scrollTrigger: {
            trigger: '.projects-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
    });

    // Project cards (cada una con su propio trigger)
    document.querySelectorAll('.project-card').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
        });
    });

    // Skills header
    gsap.from('.skills-header', {
        scrollTrigger: {
            trigger: '.skills-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
    });

    // Skills grid (stagger desde el centro)
    gsap.from('.skill-item', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.7,
        stagger: {
            amount: 0.5,
            from: 'start',
        },
        ease: 'back.out(1.2)',
    });

    // Contact
    gsap.from('.contact-content > *', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
    });

    // === 5. NAV SCROLL BEHAVIOR ===
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    lenis.on('scroll', ({ scroll }) => {
        if (scroll > 100) {
            nav.style.background = 'rgba(10, 10, 15, 0.6)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
            nav.style.mixBlendMode = 'normal';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
            nav.style.borderBottom = '1px solid transparent';
            nav.style.mixBlendMode = 'difference';
        }
    });

    // === 6. MAGNETIC BUTTONS ===
    document.querySelectorAll('.hero-cta a, #contact a').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // === 7. SMOOTH SCROLL EN ANCHORS ===
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                lenis.scrollTo(target, { offset: -50 });
            }
        });
    });
})();
