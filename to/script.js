// ── FULL SECTION MOTION SYSTEM ──

const init = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        document.body.style.opacity = "1";
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // 1. Smooth Scroll (Lenis)
    let lenis;
    try {
        if (typeof Lenis !== 'undefined') {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true
            });
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
            lenis.on('scroll', ScrollTrigger.update);
        }
    } catch (e) { console.error(e); }

    // ── MATCH MEDIA ──
    let mm = gsap.matchMedia();

    mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
    }, (context) => {
        let { isDesktop } = context.conditions;

        // CURSOR
        if (isDesktop) {
            const cursor = document.getElementById('cursor');
            const ring = document.getElementById('cursor-ring');
            if (cursor && ring) {
                gsap.set([cursor, ring], { autoAlpha: 1 });
                const xSet = gsap.quickSetter(cursor, "x", "px");
                const ySet = gsap.quickSetter(cursor, "y", "px");
                let mX = 0, mY = 0, rX = 0, rY = 0;
                window.addEventListener("mousemove", e => { mX = e.clientX; mY = e.clientY; xSet(mX); ySet(mY); });
                gsap.ticker.add(() => {
                    rX += (mX - rX) * 0.15; rY += (mY - rY) * 0.15;
                    gsap.set(ring, { x: rX, y: rY });
                });
            }
        }

        // HERO ENTRANCE
        const heroTl = gsap.timeline({ 
            defaults: { ease: "power4.out", duration: 1.2 },
            onComplete: () => ScrollTrigger.refresh()
        });
        
        gsap.set(".hero-tag, h1 span, .hero-desc, .hero-actions > *, .terminal-card, .badge, .stat-pill", { autoAlpha: 1, visibility: "visible", opacity: 1 });

        if (document.querySelector('.hero')) {
            heroTl.from("nav", { yPercent: -100, autoAlpha: 0, duration: 0.8 })
                  .from(".hero-tag", { autoAlpha: 0, x: -20, duration: 0.6 }, "-=0.4")
                  .from("h1 span", { y: "110%", autoAlpha: 0, stagger: 0.1, duration: 1.2 }, "-=0.6")
                  .from(".hero-desc", { autoAlpha: 0, y: 20, duration: 0.8 }, "-=0.8")
                  .from(".hero-actions > *", { autoAlpha: 0, y: 15, stagger: 0.1, duration: 0.6 }, "-=0.7")
                  .from(".terminal-card", { autoAlpha: 0, x: 50, rotationY: 10, duration: 1.2 }, "-=1.0")
                  .from(".badge", { autoAlpha: 0, scale: 0.8, stagger: 0.1, duration: 0.5 }, "-=0.8")
                  .from(".stat-pill", { autoAlpha: 0, y: 15, stagger: 0.05 }, "-=0.6");

            // Stats
            heroTl.add(() => {
                const stats = [{ el: '.stat-pill:nth-child(1) .num', end: 50, s: '+' }, { el: '.stat-pill:nth-child(2) .num', end: 3, s: '' }, { el: '.stat-pill:nth-child(3) .num', end: 99, s: '%' }];
                stats.forEach(s => {
                    const el = document.querySelector(s.el);
                    if (el) gsap.to({ v: 0 }, { v: s.end, duration: 2, onUpdate: function() { el.textContent = Math.round(this.targets()[0].v) + s.s; }});
                });
            }, "-=0.5");
        }

        // ── PINNED SECTIONS ──

        // 1. Portfolio Marquee (Horizontal Slide)
        const marqueeInner = document.querySelector('.marquee-inner');
        const marqueeTrack = document.querySelector('.marquee-track');
        if (marqueeInner && marqueeTrack) {
            gsap.fromTo(marqueeInner, { x: 0 }, {
                x: () => -(marqueeInner.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "20% top",
                    endTrigger: marqueeTrack,
                    end: "bottom top",
                    scrub: 1.5,
                    invalidateOnRefresh: true
                }
            });
        }

        // 2. Full Tech Stack Pinning
        const techSection = document.querySelector('.tech-stack');
        const techTicker = document.querySelector('.tech-ticker');
        if (techSection && techTicker) {
            gsap.to(techTicker, {
                x: () => -(techTicker.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: techSection,
                    start: "top top", // Pin the whole section
                    end: () => "+=" + (techTicker.scrollWidth),
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });
        }

        // ── REVEALS ──
        const revealTargets = ['.section-title', '.service-row', '.project-card', '.contact-info', '.contact-form', '.tech-item-large'];
        revealTargets.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                gsap.fromTo(el, { y: 60, autoAlpha: 0 }, {
                    y: 0, autoAlpha: 1, duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 95%",
                        toggleActions: "play none none none"
                    }
                });
            });
        });

        // PROGRESS
        const prog = document.getElementById('scrollProgress');
        if (prog) {
            gsap.to(prog, { width: "100%", ease: "none", scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0.3 } });
        }

        return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
    });

    // SCRAMBLE
    const scrambleEl = document.querySelector('.hero-tag');
    if (scrambleEl) {
        setTimeout(() => {
            const text = 'Surat, India · Est. 2024';
            const chars = '01ABC!@#';
            let i = 0;
            const timer = setInterval(() => {
                scrambleEl.textContent = text.split('').map((c, idx) => (idx < i ? c : (c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]))).join('');
                if (i >= text.length) clearInterval(timer);
                i++;
            }, 30);
        }, 1000);
    }
};

// Start
if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
} else {
    window.addEventListener("load", init);
}
