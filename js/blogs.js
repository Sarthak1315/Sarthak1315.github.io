/* ========================================
   BLOGS LOADER
======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Only load if the blog grid exists (e.g. on index.html)
    if (document.getElementById('blog-grid')) {
        loadBlogs();
    }
});

let allBlogs = [];

async function loadBlogs() {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;

    try {
        const response = await fetch('./blogs/blogs-list.json');
        if (!response.ok) throw new Error('Failed to load blogs list');

        const data = await response.json();

        const blogPromises = data.folders.map(folder =>
            fetch(`./blogs/${folder}/blog.json`)
                .then(res => {
                    if (!res.ok) return null;
                    return res.json();
                })
                .catch(err => {
                    console.warn(`Failed to load blog: ${folder}`, err);
                    return null;
                })
        );

        const blogsData = await Promise.all(blogPromises);
        allBlogs = blogsData.filter(b => b !== null);

        // Sort by date (newest first)
        allBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));

        grid.innerHTML = '';

        if (allBlogs.length === 0) {
            grid.innerHTML = '<div class="certificates-loader"><p>No articles found.</p></div>';
            return;
        }

        renderBlogs(allBlogs);

    } catch (error) {
        console.error('Error loading blogs:', error);
        grid.innerHTML = '<div class="certificates-loader"><p class="error">Failed to load articles.</p></div>';
    }
}

function renderBlogs(blogs) {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;

    // Limit logic if needed
    const limit = grid.dataset.limit ? parseInt(grid.dataset.limit) : blogs.length;
    const blogsToRender = blogs.slice(0, limit);

    grid.innerHTML = '';

    blogsToRender.forEach((blog, index) => {
        const card = createBlogCard(blog, index);
        grid.appendChild(card);
    });

    // Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function createBlogCard(blog, index) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.setAttribute('data-aos', 'fade-up');
    card.style.animationDelay = `${index * 0.1}s`;

    // Encode the folder name or ID to pass to the detail page
    // We assume the folder name is the ID. We need to pass it.
    // However, blog object might not have "id". We should add it or use the folder name if we had it.
    // In loadBlogs, we mapped folders. We should probably attach the ID to the blog object.
    // For now, let's assume the blog.json has an "id" or "slug" field, or we can't link easily.
    // I'll add "slug": "adversarial-attacks" to the json.

    const href = blog.slug ? `blog-post.html?id=${blog.slug}` : '#';

    card.innerHTML = `
        <div class="blog-image">
            <img src="${blog.image}" alt="${blog.title}" loading="lazy">
        </div>
        <div class="blog-content">
            <div class="blog-meta">
                <span class="blog-date">${blog.date}</span>
                <span class="blog-category">${blog.category}</span>
            </div>
            <h3 class="blog-title">${blog.title}</h3>
            <p class="blog-excerpt">${blog.excerpt}</p>
            <a href="${href}" class="blog-read-more">
                Read Article <i data-lucide="arrow-right"></i>
            </a>
        </div>
    `;

    return card;
}
