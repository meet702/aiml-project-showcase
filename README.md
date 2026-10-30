# AIML Project Showcase

A responsive, static React showcase for college AI and machine learning projects. Project data lives in `src/data/projects.json`; uploaded materials live under `public/projects/<project-id>/`. No backend or database is required.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`; preview it with `npm run preview`.

## Update the college identity

Edit `src/config/site.js` to change the showcase title, college name, mark, or subtitle. The project header and home page use these values.

## Add a project

Add an object to `src/data/projects.json` with a unique URL-safe `id`, a title, category, summary, team names, description, tech stack, and materials. Categories and their project counts are generated from the JSON. The summary is shown on the card; the description supports Markdown. Create `public/projects/<project-id>/` for that project's files. For example:

```json
{
  "id": "example-project",
  "title": "Example Project",
  "category": "Generative AI & RAG",
  "summary": "A short project summary.",
  "description": "A longer overview in **Markdown**.",
  "team": ["Student One", "Student Two"],
  "techStack": ["Python", "PyTorch"],
  "materials": []
}
```

## Add project materials

Put local files in `public/projects/<project-id>/`, then refer to them with a root-relative `src`. Material types are rendered from their JSON type; adding a material does not require component changes.

```json
"materials": [
  { "type": "pdf", "label": "Project Report", "src": "/projects/example-project/report.pdf" },
  { "type": "ppt", "label": "Presentation", "src": "/projects/example-project/slides.pptx", "embedUrl": "https://docs.google.com/presentation/d/ID/embed" },
  { "type": "video", "label": "Demo Video", "src": "https://youtu.be/VIDEO_ID" },
  { "type": "video", "label": "Local Demo", "src": "/projects/example-project/demo.mp4" },
  { "type": "text", "label": "Notes", "content": "Markdown **notes** can be written here." },
  { "type": "link", "label": "GitHub", "src": "https://github.com/organization/repository" }
]
```

PDFs and PDF reports embed in the detail page and include a download link. PPT files get a download link and display an embedded preview when `embedUrl` is provided. YouTube and Vimeo URLs embed as video players; local `.mp4` files use the browser video player. A text material can use inline `content` in Markdown. Team lists intentionally show names only.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, import the GitHub repository.
3. Select the Vite framework preset and deploy. Vercel detects the build command (`npm run build`) and output directory (`dist`).

The included `vercel.json` rewrites deep links such as `/project/mlops` to the app entry point so direct navigation and refresh work.
