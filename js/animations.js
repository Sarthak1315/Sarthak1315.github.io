/* ========================================
   SCROLL ANIMATIONS
   Intersection Observer based reveal effects
======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initParallax();
});

/* ========================================
   SCROLL REVEAL
======================================== */
function initScrollReveal() {
    // Configuration
    const defaultOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                const delay = entry.target.dataset.delay || index * 0.1;
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, defaultOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll(`
        .section-header,
        .skill-category,
        .skill-card,
        .project-card,
        .blog-card,
        .timeline-item,
        .about-image,
        .about-text,
        .contact-info,
        .contact-form,
        .stat-item
    `);

    // Add reveal class and observe
    animatedElements.forEach((el, index) => {
        // Determine animation direction
        if (el.classList.contains('about-image') ||
            el.closest('.timeline-item:nth-child(odd)')) {
            el.classList.add('reveal-left');
        } else if (el.classList.contains('about-text') ||
            el.closest('.timeline-item:nth-child(even)')) {
            el.classList.add('reveal-right');
        } else if (el.classList.contains('skill-card') ||
            el.classList.contains('stat-item')) {
            el.classList.add('reveal-scale');
        } else {
            el.classList.add('reveal');
        }

        observer.observe(el);
    });
}

/* ========================================
   PARALLAX EFFECTS
======================================== */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-bg, .image-border, .image-dots');

    if (parallaxElements.length === 0) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateParallax() {
        const scrollY = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.dataset.parallaxSpeed || 0.3;
            const yPos = -(scrollY * speed);

            if (el.classList.contains('hero-bg')) {
                el.style.transform = `translateY(${yPos * 0.5}px)`;
            } else {
                el.style.transform = `translate(${15 + yPos * 0.1}px, ${15 + yPos * 0.1}px)`;
            }
        });
    }
}

/* ========================================
   SKILL CARDS TILT EFFECT
======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

/* ========================================
   PROJECT CARDS HOVER EFFECT
======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Update Lucide icons in overlay if needed
            lucide.createIcons({
                icons: {
                    'external-link': lucide.icons['external-link'],
                    'github': lucide.icons['github']
                },
                attrs: {
                    width: 20,
                    height: 20
                }
            });
        });
    });
});

/* ========================================
   MAGNETIC BUTTONS
======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const magneticButtons = document.querySelectorAll('.btn-primary');

    magneticButtons.forEach(btn => {
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
});

/* ========================================
   TEXT SCRAMBLE EFFECT (Optional Enhancement)
======================================== */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Export for potential use
window.TextScramble = TextScramble;
