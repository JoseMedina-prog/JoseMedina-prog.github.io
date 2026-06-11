/* ============================================
   APP.JS - Lógica principal
   - Lenis (smooth scroll)
   - Loader
   - GSAP animaciones de scroll + texto split
   - Mouse glow + scroll progress
   - Magnetic buttons mejorados
   - VanillaTilt init
   - Count-up de stats
   - Parallax suave
   ============================================ */

(function () {
    'use strict';

    // Solo marcar "gsap-ready" si GSAP realmente cargó.
    const gsapReady = typeof gsap !== 'undefined';
    if (gsapReady) {
        document.documentElement.classList.add('gsap-ready');
    }

    // === 0. SPLIT TEXT (letras animadas) ===
    // Convierte cada palabra en spans y cada letra en spans para animar.
    function splitTextNodes(root) {
        if (!root || root.dataset.splitDone) return [];
        const text = root.textContent;
        const fragment = document.createDocumentFragment();
        const words = text.split(' ');
        const allChars = [];

        words.forEach((word, wi) => {
            const wordEl = document.createElement('span');
            wordEl.className = 'split-word';
            [...word].forEach((ch) => {
                const chEl = document.createElement('span');
                chEl.className = 'split-char';
                chEl.textContent = ch;
                wordEl.appendChild(chEl);
                allChars.push(chEl);
            });
            fragment.appendChild(wordEl);
            if (wi < words.length - 1) {
                fragment.appendChild(document.createTextNode(' '));
            }
        });

        root.textContent = '';
        root.appendChild(fragment);
        root.dataset.splitDone = '1';
        return allChars;
    }

    // Pre-split de los textos marcados con [data-split]
    const splitElements = document.querySelectorAll('[data-split]');
    const splitMap = new Map();
    splitElements.forEach((el) => {
        const chars = splitTextNodes(el);
        splitMap.set(el, chars);
    });

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
                if (gsapReady && typeof animateHero === 'function') animateHero();
            }, 400);
        }
    }, 80);

    // Si GSAP no cargó, salimos del script.
    if (!gsapReady) {
        console.warn('[portfolio] GSAP no cargó — animaciones deshabilitadas, contenido visible.');
        return;
    }

    // === 2. LENIS SMOOTH SCROLL ===
    const lenisAvailable = typeof Lenis !== 'undefined';
    const lenis = lenisAvailable ? new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    }) : null;

    if (lenis) {
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }

    // === 3. SCROLL PROGRESS BAR + MOUSE GLOW (no requieren GSAP) ===
    const scrollProgress = document.getElementById('scroll-progress');
    const mouseGlow = document.getElementById('mouse-glow');
    const glowPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const glowTarget = { x: glowPos.x, y: glowPos.y };
    let glowActive = false;

    if (mouseGlow) {
        window.addEventListener('mousemove', (e) => {
            glowTarget.x = e.clientX;
            glowTarget.y = e.clientY;
            if (!glowActive) {
                glowActive = true;
                mouseGlow.style.opacity = '1';
            }
        });
        window.addEventListener('mouseleave', () => {
            glowActive = false;
            mouseGlow.style.opacity = '0';
        });

        function updateGlow() {
            glowPos.x += (glowTarget.x - glowPos.x) * 0.15;
            glowPos.y += (glowTarget.y - glowPos.y) * 0.15;
            mouseGlow.style.transform = `translate(${glowPos.x}px, ${glowPos.y}px) translate(-50%, -50%)`;
            requestAnimationFrame(updateGlow);
        }
        requestAnimationFrame(updateGlow);
    }

    function updateScrollProgress() {
        if (!scrollProgress) return;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        scrollProgress.style.width = pct + '%';
    }

    if (lenis) {
        lenis.on('scroll', updateScrollProgress);
    } else {
        window.addEventListener('scroll', updateScrollProgress, { passive: true });
    }

    // === 4. GSAP - Animación del HERO (con split) ===
    function animateHero() {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.8 });

        // Anima cada letra del hero
        document.querySelectorAll('.hero-line').forEach((line, i) => {
            const chars = splitMap.get(line) || [];
            if (chars.length) {
                gsap.set(chars, { yPercent: 110 });
                tl.to(chars, {
                    yPercent: 0,
                    duration: 1.2,
                    stagger: 0.025,
                    ease: 'power4.out',
                }, i === 0 ? '-=0.4' : '-=1.0');
            } else {
                tl.to(line, { y: 0, duration: 1.2 }, i === 0 ? '-=0.4' : '-=1.0');
            }
        });

        tl.to('.hero-sub', { opacity: 1, y: 0, duration: 1 }, '-=0.6')
          .to('.hero-cta', { opacity: 1, y: 0, duration: 1 }, '-=0.7')
          .to('.hero-scroll', { opacity: 1, duration: 0.8 }, '-=0.4');
    }

    // === 5. GSAP SCROLL - Animaciones de las secciones ===
    gsap.registerPlugin(ScrollTrigger);

    if (lenis) {
        lenis.on('scroll', ScrollTrigger.update);
    }

    // Helper: animar un texto con split al entrar en viewport
    function animateSplitOnScroll(selector, triggerEl) {
        const el = document.querySelector(selector);
        if (!el) return;
        const chars = splitMap.get(el);
        if (!chars || !chars.length) return;

        gsap.set(chars, { yPercent: 110, opacity: 0 });
        gsap.to(chars, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.02,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: triggerEl || el,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        });
    }

    // About text
    gsap.from('.about-text', {
        scrollTrigger: { trigger: '.about-text', start: 'top 85%' },
        opacity: 0, y: 60, duration: 1, ease: 'power3.out',
    });
    animateSplitOnScroll('.about-text .gradient-text', '.about-text');

    // About stats (count-up + entrada)
    document.querySelectorAll('.about-stat').forEach((stat) => {
        const numEl = stat.querySelector('.font-display');
        if (numEl) {
            const rawText = numEl.textContent.trim();
            // Solo animar si es número (o contiene número)
            const match = rawText.match(/(\d+)([^\d]*)/);
            if (match) {
                const target = parseInt(match[1], 10);
                const suffix = rawText.replace(match[1], '');
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                    onUpdate: () => {
                        numEl.textContent = Math.floor(obj.val) + suffix;
                    },
                });
            }
        }
    });

    gsap.fromTo('.about-stat',
        { opacity: 0, y: 40 },
        {
            scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        }
    );

    // Projects header
    gsap.fromTo('.projects-header',
        { opacity: 0, y: 40 },
        {
            scrollTrigger: {
                trigger: '.projects-header',
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        }
    );
    animateSplitOnScroll('.projects-header .gradient-text', '.projects-header');

    // Project cards
    document.querySelectorAll('.project-card').forEach((card) => {
        const visual = card.querySelector('.project-visual');
        const inner = visual ? visual.querySelector('.absolute.inset-0') : null;
        gsap.fromTo(card,
            { opacity: 0, y: 60 },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
            }
        );
    });

    // Skills header
    gsap.fromTo('.skills-header',
        { opacity: 0, y: 40 },
        {
            scrollTrigger: {
                trigger: '.skills-header',
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        }
    );
    animateSplitOnScroll('.skills-header .gradient-text', '.skills-header');

    // Skills grid
    gsap.fromTo('.skill-item',
        { opacity: 0, y: 50, scale: 0.9 },
        {
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 1, y: 0, scale: 1, duration: 0.7,
            stagger: { amount: 0.5, from: 'start' },
            ease: 'back.out(1.2)',
        }
    );

    // Contact
    gsap.fromTo('.contact-content > *',
        { opacity: 0, y: 30 },
        {
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        }
    );

    // === 6. PARALLAX SUAVE en hero y project visuals ===
    const heroContent = document.querySelector('[data-parallax]');
    if (heroContent) {
        gsap.to(heroContent, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    }

    document.querySelectorAll('.project-visual').forEach((visual) => {
        gsap.fromTo(visual,
            { yPercent: -5 },
            {
                yPercent: 5,
                ease: 'none',
                scrollTrigger: {
                    trigger: visual,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            }
        );
    });

    // === 7. NAV SCROLL BEHAVIOR ===
    const nav = document.getElementById('nav');

    if (lenis) {
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
    }

    // === 8. MAGNETIC BUTTONS (mejorado) ===
    document.querySelectorAll('.hero-cta a, #contact a, nav a').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // === 9. SMOOTH SCROLL EN ANCHORS ===
    if (lenis) {
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
    }

    // === 10. VANILLATILT EN PROJECT VISUALS ===
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 8,
            speed: 600,
            glare: true,
            'max-glare': 0.25,
            scale: 1.02,
            perspective: 1200,
        });
    }

    // === 11. SKILL ITEMS - glow que sigue al mouse ===
    document.querySelectorAll('.skill-item').forEach((item) => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            item.style.setProperty('--mx', x + '%');
            item.style.setProperty('--my', y + '%');
        });
    });

    // === 12. SAFETY NET ===
    setTimeout(() => {
        document.querySelectorAll('.project-card, .projects-header, .skills-header, .skill-item, .contact-content > *').forEach((el) => {
            const computed = window.getComputedStyle(el);
            if (parseFloat(computed.opacity) < 0.1) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }, 3000);
})();
