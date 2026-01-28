# Blog Post Template

Create a folder for each blog post in `./blogs/` directory.

## Folder Structure
```
blogs/
├── blogs-list.json       # List of blog folder names
├── my-first-post/
│   ├── post.json        # Post metadata
│   ├── index.html       # Full blog post content
│   └── cover.jpg        # Cover image
```

## post.json Format
```json
{
    "title": "Your Blog Post Title",
    "description": "A brief description of the post",
    "excerpt": "Short excerpt shown on card",
    "category": "Tutorial",
    "date": "2026-01-28",
    "image": "cover.jpg",
    "tags": ["web", "development"]
}
```

## blogs-list.json Format
```json
{
    "folders": [
        "my-first-post",
        "another-post"
    ]
}
```
