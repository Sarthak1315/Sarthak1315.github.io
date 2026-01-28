/* ========================================
   PROJECTS LOADER (DYNAMIC VERSION)
======================================== */

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initProjectFilters();
});

let allProjects = [];

/* ========================================
   LOAD PROJECTS
======================================== */
async function loadProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    try {
        // 1. Fetch the list of project folders
        const response = await fetch('./Projects/projects-list.json');
        if (!response.ok) throw new Error('Failed to load projects list');

        const data = await response.json();

        // 2. Fetch details for each project
        const projectPromises = data.folders.map(folder =>
            fetch(`./Projects/${folder}/project.json`)
                .then(res => {
                    if (!res.ok) return null;
                    return res.json();
                })
                .catch(err => {
                    console.warn(`Failed to load project: ${folder}`, err);
                    return null;
                })
        );

        const projectsData = await Promise.all(projectPromises);

        // Filter out any failed loads
        allProjects = projectsData.filter(p => p !== null);

        // Sort by order 
        allProjects.sort((a, b) => (a.order || 99) - (b.order || 99));

        // Clear loader
        grid.innerHTML = '';

        if (allProjects.length === 0) {
            grid.innerHTML = '<p class="text-center w-100">No projects found.</p>';
            return;
        }

        // Initial Render
        renderProjects(allProjects);

    } catch (error) {
        console.error('Error loading projects:', error);
        grid.innerHTML = `
            <div class="text-center w-100 text-danger">
                <p>Failed to load projects.</p>
                <small>Note: If viewing locally, please use a local server (e.g. Live Server).</small>
            </div>
        `;
    }
}

/* ========================================
   RENDER PROJECTS
======================================== */
function renderProjects(projectsToRender) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    // Check for limit
    const limit = grid.dataset.limit ? parseInt(grid.dataset.limit) : projectsToRender.length;

    // If we have a limit, likely we are on homepage, so we just take top N from the filtered list
    // If not limited, we show all provided
    const projects = projectsToRender.slice(0, limit);

    grid.innerHTML = '';

    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        grid.appendChild(card);
    });

    // Re-initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/* ========================================
   CREATE PROJECT CARD
======================================== */
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;

    // Handle image array (slider) or single string
    let imageHtml = '';
    if (Array.isArray(project.image)) {
        // Create slider
        const slides = project.image.map((img, i) =>
            `<img src="${img}" alt="${project.title}" class="${i === 0 ? 'active' : ''}" data-index="${i}">`
        ).join('');

        imageHtml = `
            <div class="project-image slider">
                ${slides}
                ${project.image.length > 1 ? `
                <div class="slider-nav">
                    <button class="prev" onclick="moveSlide(this, -1, event)">&#10094;</button>
                    <button class="next" onclick="moveSlide(this, 1, event)">&#10095;</button>
                </div>
                ` : ''}
            </div>
        `;
    } else {
        imageHtml = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
        `;
    }

    const techTags = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

    card.innerHTML = `
        ${imageHtml}
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.description}</p>
            <div class="project-tech">
                ${techTags}
            </div>
            <div class="project-links">
                ${project.liveUrl ? `
                <a href="${project.liveUrl}" class="btn-link" target="_blank" rel="noopener noreferrer">
                    <i data-lucide="external-link"></i> Live Demo
                </a>` : ''}
                ${project.githubUrl ? `
                <a href="${project.githubUrl}" class="btn-link" target="_blank" rel="noopener noreferrer">
                    <i data-lucide="github"></i> Source Code
                </a>` : ''}
            </div>
        </div>
    `;

    return card;
}

/* ========================================
   SLIDER FUNCTIONALITY
======================================== */
window.moveSlide = function (btn, n, e) {
    if (e) e.stopPropagation();
    const slider = btn.closest('.slider');
    const images = slider.querySelectorAll('img');
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));

    images[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + n + images.length) % images.length;
    images[activeIndex].classList.add('active');
}

/* ========================================
   FILTERS
======================================== */
function initProjectFilters() {
    const buttons = document.querySelectorAll('.projects-filter .filter-btn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            let filtered = [];
            if (filter === 'all') {
                filtered = allProjects;
            } else {
                filtered = allProjects.filter(p => {
                    if (Array.isArray(p.category)) {
                        return p.category.includes(filter);
                    }
                    return p.category === filter;
                });
            }

            renderProjects(filtered);
        });
    });
}
