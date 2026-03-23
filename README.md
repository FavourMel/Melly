# Melly Portfolio

A bold, modern Web3 portfolio site built with React + Vite + Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

## Adding Your Photo

1. Place your photo (e.g. `photo.jpg`) inside the `/public` folder.
2. Open `src/App.jsx` and find the comment block that says **"TO ADD YOUR PHOTO"**.
3. Replace the placeholder `<div>` block with:

```jsx
<img
  src="/photo.jpg"
  alt="Melly"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%"
  }}
/>
```

## Customising Content

All text content is in `src/App.jsx`:
- **Email / social links** — search for `hello@melly.xyz` and `twitter.com/melly`
- **Bio paragraphs** — in the `About` component
- **Service cards** — edit the `SERVICES` array at the top of the file
- **Typewriter lines** — edit the array passed to `useTypewriter` in `Hero`

## Build for Production

```bash
npm run build
```

Output goes to `/dist` — deploy anywhere (Vercel, Netlify, GitHub Pages, etc.)

## Tech Stack
- React 18
- Vite 5
- Tailwind CSS 3
- Google Fonts: Syne + DM Mono
