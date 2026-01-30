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
        // Sort by order property (ascending)
        allCertificates.sort((a, b) => (a.order || 999) - (b.order || 999));
        visibleCertificates = allCertificates;

        // Clear loader
        grid.innerHTML = '';

        if (allCertificates.length === 0) {
            grid.innerHTML = '<p class="text-center w-100">No certificates found.</p>';
            return;
        }

        // Initial Render
        renderCertificates(allCertificates);

        // Generate filter buttons dynamically
        generateFilterButtons();

        // Check URL params for direct certificate link
        checkUrlParams();

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

// Display name mapping for categories
const categoryDisplayNames = {
    'all': 'All',
    'google': 'Google',
    'ibm': 'IBM',
    'coursera': 'Coursera',
    'hackerrank': 'HackerRank',
    'srki': 'SRKI/SCET',
    'svnit': 'SVNIT',
    'iitb': 'IIT Bombay',
    'isro': 'ISRO',
    'deeplearning': 'DeepLearning.AI',
    'language': 'Programming',
    'security': 'Security',
    'ai': 'AI/ML',
    'web': 'Web Dev',
    'database': 'Database',
    'other': 'Other'
};

// Priority order for filter buttons (lower = appears first)
const categoryPriority = {
    'all': 0,
    'google': 1,
    'ibm': 2,
    'isro': 3,
    'iitb': 5,
    'svnit': 6,
    'coursera': 9,
    'hackerrank': 8,
    'srki': 7,
    'deeplearning': 4,
    'language': 10,
    'security': 11,
    'ai': 12,
    'web': 13,
    'database': 14,
    'other': 99
};

function generateFilterButtons() {
    const filterContainer = document.querySelector('.certificates-filter');
    if (!filterContainer || allCertificates.length === 0) return;

    // Extract unique categories from all certificates
    const categories = new Set();
    allCertificates.forEach(cert => {
        const cats = Array.isArray(cert.category) ? cert.category : [cert.category];
        cats.forEach(cat => categories.add(cat));
    });

    // Convert to array and sort by priority
    const sortedCategories = Array.from(categories).sort((a, b) => {
        return (categoryPriority[a] || 50) - (categoryPriority[b] || 50);
    });

    // Clear existing buttons and rebuild
    filterContainer.innerHTML = '';

    // Add "All" button first
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.filter = 'all';
    allBtn.textContent = 'All';
    filterContainer.appendChild(allBtn);

    // Add category buttons
    sortedCategories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.filter = cat;
        btn.textContent = categoryDisplayNames[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
        filterContainer.appendChild(btn);
    });

    // Initialize click handlers
    initFilterClickHandlers();
}

function initFilterClickHandlers() {
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

function initCertificateFilters() {
    // Filters are now generated dynamically after certificates load
    // This function is kept for backward compatibility
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

/* ========================================
   URL PARAMETER HANDLING
   Usage: 
   - certificates.html?cert=3 (open by order number)
   - certificates.html?title=Python (open by title, case-insensitive)
======================================== */
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);

    // Check for 'cert' parameter (order number)
    const certOrder = urlParams.get('cert');
    if (certOrder) {
        const orderNum = parseInt(certOrder);
        const cert = allCertificates.find(c => c.order === orderNum);
        if (cert) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                openLightbox(cert.image, cert.title, cert.issuer);
            }, 100);
            return;
        }
    }

    // Check for 'title' parameter (partial match, case-insensitive)
    const certTitle = urlParams.get('title');
    if (certTitle) {
        const searchTitle = certTitle.toLowerCase();
        const cert = allCertificates.find(c =>
            c.title.toLowerCase().includes(searchTitle)
        );
        if (cert) {
            setTimeout(() => {
                openLightbox(cert.image, cert.title, cert.issuer);
            }, 100);
            return;
        }
    }
}
