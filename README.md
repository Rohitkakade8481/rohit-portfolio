# Rohit Kakade — Responsive Developer Portfolio

A React + Vite portfolio with separate responsive pages, detailed project pages, a preloaded resume draft, static project preview images, and shared default content bundled with the website. It intentionally ignores old portfolio data from browser localStorage.

## Run locally

1. Install Node.js (LTS).
2. Extract this ZIP.
3. Open a terminal in `rohit-attractive-portfolio`.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite.

## Deploy to Netlify

Upload the project to a GitHub repository and import it into Netlify, or build locally and publish the `dist` folder. Build command: `npm run build`. Publish directory: `dist`. The included `public/_redirects` file supports React Router direct links.

## Pages

- Home, About, Education, Skills, Projects, individual project detail pages, Experience, Certificates, Achievements, Resume, Contact, Edit Portfolio.

## How portfolio data works

- Public default content is in `src/data.js`. It is bundled into the website, so visitors see the same default details.
- The app does not read old portfolio details from localStorage. Theme preference may be stored locally only.
- The Edit Portfolio page is a temporary preview editor. Changes made there are not published for other visitors. To publish changes, edit `src/data.js` and redeploy.
- Contact form messages are not sent to a server; use the email app button or connect a form service/backend for real submissions.
- `public/images/profile-placeholder.svg` is a placeholder graphic, not the user's real photograph. Replace it with a real profile image and update `profileImage` in `src/data.js`.
- Project SVG previews are illustrative mockups, not screenshots from a running app. Replace them with real project screenshots under `public/images` and update each project's `image` field in `src/data.js`.
- The Resume page shows a draft built from the portfolio details, and visitors can download the generated PDF. It is not the user's original resume because no original PDF was provided.
- The two certificate records are clearly marked dummy/demo entries. Replace them with real certificates before sharing with recruiters. No actual certificates are fabricated or included.
- Verify all technical claims, project details, endpoint names, personal contact information, and timelines before publishing.

## Tech stack

React, React Router, Vite, Lucide React, jsPDF, CSS.
