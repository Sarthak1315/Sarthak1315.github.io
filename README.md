# Sarthak Patel - Portfolio Website

A modern, responsive portfolio website with dynamic project loading and premium dark theme design.

## Features

- 🎨 **Dark Mode Theme** - Premium design with #64f4ac accent color
- 📱 **Fully Responsive** - Works on all device sizes
- ⚡ **Dynamic Project Loading** - Projects loaded from JSON files
- 📝 **Dynamic Blog** - Blog posts loaded from JSON files
- ✨ **Smooth Animations** - Scroll reveals, hover effects, parallax
- 🖱️ **Custom Cursor** - Interactive cursor on desktop
- 📧 **Contact Form** - Opens email client for sending messages

## Project Structure

```
SarthakPatel-portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── style.css           # Main styles & design system
│   ├── animations.css      # Animation keyframes
│   └── responsive.css      # Media queries
├── js/
│   ├── main.js             # Core functionality
│   ├── animations.js       # Scroll effects
│   └── projects.js         # Dynamic loader
├── assets/
│   ├── images/             # Profile, placeholder images
│   ├── icons/              # Custom icons
│   └── documents/          # Resume PDF
├── Projects/
│   ├── projects-list.json  # List of project folders
│   └── [project-name]/
│       ├── project.json    # Project metadata
│       └── *.png           # Project screenshots
└── blogs/
    ├── blogs-list.json     # List of blog folders
    └── [post-name]/
        ├── post.json       # Post metadata
        ├── index.html      # Full post content
        └── cover.jpg       # Cover image
```

## Adding Projects

1. Create a folder in `Projects/` with your project name
2. Add a `project.json` file with this format:

```json
{
    "title": "Project Name",
    "description": "Project description",
    "technologies": ["Tech1", "Tech2"],
    "image": ["./Projects/folder-name/1.png"],
    "liveUrl": "./Projects/folder-name/index.html",
    "githubUrl": "https://github.com/...",
    "category": "backend",
    "featured": true,
    "order": 1
}
```

3. Add the folder name to `Projects/projects-list.json`

## Adding Blog Posts

1. Create a folder in `blogs/` with your post name
2. Add a `post.json` file with metadata
3. Add an `index.html` file with the post content
4. Add the folder name to `blogs/blogs-list.json`

## Required Assets

Add these files to complete the setup:
- `assets/images/profile.jpg` - Your profile photo
- `assets/images/placeholder.jpg` - Project fallback image
- `assets/documents/resume.pdf` - Your resume
- `assets/favicon.png` - Browser icon

## Tech Stack

- HTML5
- CSS3 (Vanilla CSS with custom properties)
- Vanilla JavaScript
- Google Fonts (Inter, JetBrains Mono)
- Lucide Icons

## Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary: #64f4ac;  /* Your primary color */
    --bg-primary: #0a0a0f;  /* Background */
}
```

### Content
- Update personal info in `index.html`
- Update timeline events in `index.html`
- Add your projects to `Projects/`
- Add blog posts to `blogs/`

## License

© 2026 Sarthak Patel. All rights reserved.
