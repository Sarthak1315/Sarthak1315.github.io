/* ========================================
   MAIN JAVASCRIPT
   Core functionality & interactions
======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize all modules
    initLoader();
    initNavigation();
    initCustomCursor();
    initParticles();
    initScrollEffects();
    initCounterAnimation();
    initCounterAnimation();
    initCounterAnimation();
    initTypingAnimation();
    initFloatingShapes(); // Add random shapes
    initContactForm();
    initBackToTop();
    initFooterYear();
});

/* ========================================
   FLOATING SHAPES RANDOMIZER (WANDERING)
======================================== */
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape) => {
        // Initial Random Position & Size
        const startTop = Math.floor(Math.random() * 90) + 5;
        const startLeft = Math.floor(Math.random() * 90) + 5;
        const randomSize = Math.floor(Math.random() * 4) + 4; // 4rem - 8rem

        shape.style.top = `${startTop}%`;
        shape.style.left = `${startLeft}%`;
        shape.style.fontSize = `${randomSize}rem`;

        // Continuous Wandering Function
        function wander() {
            // Random duration for this specific leg of the journey
            const duration = Math.floor(Math.random() * 10) + 15; // 15s - 25s

            // Random Translation (relative to viewport approx)
            // Limit movement to avoid going too far off screen
            const moveX = (Math.random() - 0.5) * 500; // -250px to +250px
            const moveY = (Math.random() - 0.5) * 500; // -250px to +250px
            const rotate = Math.floor(Math.random() * 360);

            // Apply Transition & Transform
            shape.style.transition = `transform ${duration}s ease-in-out`;
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`;

            // Schedule next move
            setTimeout(wander, duration * 1000);
        }

        // Start wandering with a slight random initial delay to desynchronize
        setTimeout(wander, Math.random() * 5000);
    });
}

/* ========================================
   TYPING ANIMATION
======================================== */
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const roles = [
        "Software Developer",
        "Cybersecurity Analyst",
        "Backend Developer",
        "AI Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster deleting speed
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ========================================
   LOADER
======================================== */
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    });

    // Fallback to hide loader after max 3 seconds
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 3000);
}

/* ========================================
   NAVIGATION
======================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ========================================
   CUSTOM CURSOR
======================================== */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    // Only enable on devices with hover capability
    if (!window.matchMedia('(hover: hover)').matches) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows immediately
        cursorX = mouseX;
        cursorY = mouseY;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower has delay
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects
    const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .filter-btn');

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });

        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

/* ========================================
   PARTICLES
======================================== */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

/* ========================================
   SCROLL EFFECTS
======================================== */
function initScrollEffects() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.skill-category, .project-card, .blog-card, .timeline-item, .about-content, .contact-container');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
}

/* ========================================
   COUNTER ANIMATION
======================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    const suffix = element.getAttribute('data-suffix') || '';

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

/* ========================================
   CONTACT FORM
======================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<span class="loader-spinner" style="width: 20px; height: 20px;"></span> Sending...';
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Create mailto link as fallback (no backend)
            const subject = encodeURIComponent(data.subject);
            const body = encodeURIComponent(
                `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
            );

            // Open email client
            window.location.href = `mailto:work.sarthakpatel@gmail.com?subject=${subject}&body=${body}`;

            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                showNotification('Email client opened! Please send the email.', 'success');
            }, 1000);

        } catch (error) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            showNotification('Something went wrong. Please try again.', 'error');
        }
    });
}

/* ========================================
   NOTIFICATION
======================================== */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '16px 24px',
        background: type === 'success' ? 'var(--primary)' :
            type === 'error' ? '#ef4444' : 'var(--bg-card)',
        color: type === 'success' ? 'var(--bg-primary)' : 'var(--text-primary)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xl)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '90vw'
    });

    document.body.appendChild(notification);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = 'background: none; border: none; font-size: 20px; cursor: pointer; color: inherit;';

    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

/* ========================================
   BACK TO TOP
======================================== */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   FOOTER YEAR
======================================== */
function initFooterYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/* ========================================
   EXPORT FOR OTHER MODULES
======================================== */
window.showNotification = showNotification;
