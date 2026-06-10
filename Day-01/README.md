# Day 01: Project Setup & Static React App

## Learning Objectives
By the end of this session, learners will be able to:
- Set up a React + Vite development environment
- Understand project structure and file organization
- Create basic React components (Navbar, HeroBanner, MovieCard, Footer)
- Use static data to render movie content
- Implement basic CSS styling with custom properties
- Set up React Router for page navigation
- Build a responsive Netflix-clone layout

## Project Structure
```
Day-01/
├── public/              # Static assets (favicon, icons)
├── src/
│   ├── assets/          # Images and media
│   ├── components/      # Reusable UI components
│   │   ├── ContentRow/  # Horizontal scrollable movie row
│   │   ├── Footer/      # Site footer
│   │   ├── HeroBanner/  # Featured movie hero section
│   │   ├── MovieCard/   # Individual movie card with hover
│   │   ├── MovieModal/  # Movie detail modal overlay
│   │   └── Navbar/      # Navigation bar
│   ├── data/            # Static movie data
│   ├── pages/           # Route-level page components
│   │   ├── BrowsePage/
│   │   ├── HomePage/
│   │   ├── MyListPage/
│   │   └── SearchPage/
│   ├── App.jsx          # Main app with routing
│   ├── App.css          # App-level styles
│   ├── index.css        # Global design system
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Tech Stack
- **React 19** — UI library
- **Vite 8** — Build tool & dev server
- **React Router DOM 7** — Client-side routing
- **React Icons** — Icon library
- **Vanilla CSS** — Styling with CSS custom properties

## Getting Started
```bash
cd Day-01
npm install
npm run dev
```

## Key Concepts Covered
1. **Component Architecture** — Navbar, HeroBanner, MovieCard, ContentRow, MovieModal, Footer
2. **React Router** — BrowserRouter, Routes, Route, Link, useNavigate, useLocation
3. **React Hooks** — useState, useEffect, useRef, useCallback, useMemo
4. **CSS Design System** — Custom properties, responsive design, animations
5. **Static Data** — Movie data with TMDB image URLs
