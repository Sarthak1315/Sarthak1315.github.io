/* ========================================
   CERTIFICATES LOADER (DYNAMIC VERSION)
======================================== */

document.addEventListener('DOMContentLoaded', () => {
    loadCertificates();
    initCertificateFilters();
    initLightbox();
});

let allCertificates = [];
let visibleCertificates = [];

/* ========================================
   LOAD CERTIFICATES
======================================== */
async function loadCertificates() {
    const grid = document.getElementById('certificates-grid');
    if (!grid) return;

    try {
        const response = await fetch('./certificates/certificates.json');
        if (!response.ok) throw new Error('Failed to load certificates');

        allCertificates = await response.json();
        visibleCertificates = allCertificates;

        // Clear loader
        grid.innerHTML = '';

        if (allCertificates.length === 0) {
            grid.innerHTML = '<p class="text-center w-100">No certificates found.</p>';
            return;
        }

        // Initial Render
        renderCertificates(allCertificates);

    } catch (error) {
        console.error('Error loading certificates:', error);
        grid.innerHTML = `
            <div class="text-center w-100 text-danger">
                <p>Failed to load certificates.</p>
                <small>Note: If viewing locally, please use a local server (e.g. Live Server).</small>
            </div>
        `;
    }
}

/* ========================================
   RENDER CERTIFICATES
======================================== */
function renderCertificates(certsToRender) {
    const grid = document.getElementById('certificates-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // Check for limit
    const limit = grid.dataset.limit ? parseInt(grid.dataset.limit) : certsToRender.length;
    const certs = certsToRender.slice(0, limit);

    certs.forEach((cert, index) => {
        const card = createCertificateCard(cert, index);
        grid.appendChild(card);
    });

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // For lightbox, we let it navigate through the visible set (filtered set)
    visibleCertificates = certsToRender;
}

/* ========================================
   CREATE CARD
======================================== */
function createCertificateCard(cert, index) {
    const card = document.createElement('div');
    card.className = 'certificate-card';
    card.style.animationDelay = `${index * 0.05}s`;

    card.innerHTML = `
        <div class="certificate-image" onclick="openLightbox('${cert.image}', '${cert.title}', '${cert.issuer}')">
            <img src="${cert.image}" alt="${cert.title}" loading="lazy">
            <div class="certificate-overlay">
                <div class="view-btn">
                    <i data-lucide="eye"></i>
                </div>
            </div>
        </div>
        <div class="certificate-content">
            <h3 class="certificate-title" title="${cert.title}">${cert.title}</h3>
            <div class="certificate-issuer">
                <span>${cert.issuer}</span>
            </div>
        </div>
    `;

    return card;
}

/* ========================================
   FILTERS
======================================== */
function initCertificateFilters() {
    const buttons = document.querySelectorAll('.certificates-filter .filter-btn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            let filtered = [];
            if (filter === 'all') {
                filtered = allCertificates;
            } else {
                filtered = allCertificates.filter(c => {
                    const cats = Array.isArray(c.category) ? c.category : [c.category];
                    return cats.includes(filter);
                });
            }

            renderCertificates(filtered);
        });
    });
}

/* ========================================
   LIGHTBOX
======================================== */
let currentImageIndex = 0;

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

window.openLightbox = function (image, title, issuer) {
    const lightbox = document.getElementById('lightbox');
    const imgElement = document.getElementById('lightbox-img');
    const titleElement = document.getElementById('lightbox-title');
    const issuerElement = document.getElementById('lightbox-issuer');

    currentImageIndex = visibleCertificates.findIndex(c => c.image === image);
    if (currentImageIndex === -1) currentImageIndex = 0;

    imgElement.src = image;
    titleElement.textContent = title;
    issuerElement.textContent = issuer;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    if (visibleCertificates.length === 0) return;

    currentImageIndex = (currentImageIndex + direction + visibleCertificates.length) % visibleCertificates.length;
    const nextCert = visibleCertificates[currentImageIndex];

    const imgElement = document.getElementById('lightbox-img');
    const titleElement = document.getElementById('lightbox-title');
    const issuerElement = document.getElementById('lightbox-issuer');

    imgElement.style.opacity = '0';

    setTimeout(() => {
        imgElement.src = nextCert.image;
        titleElement.textContent = nextCert.title;
        issuerElement.textContent = nextCert.issuer;
        imgElement.style.opacity = '1';
    }, 200);
}
