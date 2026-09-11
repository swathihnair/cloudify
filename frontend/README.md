# Cloudify Frontend

React + Vite frontend with Tailwind CSS and Framer Motion animations.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

App runs on `http://localhost:5173`

## Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Axios** - HTTP client

## Project Structure

- `src/screens/` - Page components for each screen
- `src/api.js` - API client functions
- `src/App.jsx` - Main app with routing
- `src/index.css` - Tailwind imports

## API Integration

Backend proxy configured in `vite.config.js` to forward `/api` and `/uploads` requests to `http://localhost:8000`.
