<p align="center">
  <img src="https://img.shields.io/badge/CINEVERSE-E50914?style=for-the-badge&logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTIwIDRINGMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY2YzAtMS4xLS45LTItMi0yek0xMCAxNi41di05bDYgNC41LTYgNC41eiIvPjwvc3ZnPg==" alt="Cineverse"/>
</p>

<h1 align="center">🎬 CineVerse — Streaming Platform</h1>

<p align="center">
  A Netflix-inspired streaming UI built with <strong>React 19</strong>, <strong>Vite</strong>, and <strong>Three.js</strong>.<br/>
  Features authentication, RBAC, ticket booking, and an immersive 3D glassmorphism interface.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/Three.js-3D-000000?style=flat-square&logo=threedotjs" />
  <img src="https://img.shields.io/badge/Axios-API-5A29E4?style=flat-square&logo=axios" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=reactrouter" />
</p>

---

## 📁 Project Structure

The repository is organized by development phase:

```
CineVerse/
├── day1/          # Day 1 — Core UI & Component Architecture
└── day2/          # Day 2 — Auth, Routing, Booking, 3D & API Layer
```

Each folder is a **self-contained React + Vite project** that can be run independently.

---

## 🗓️ Day 1 — Core UI & Component Architecture

> Foundation of the streaming platform — modular components, responsive design, and a polished Netflix-style interface.

### Features
- 🎨 **Design System** — CSS custom properties, Inter font, custom scrollbar, utility animations
- 🧭 **Navbar** — Sticky navigation with search, notifications, profile dropdown, mobile hamburger menu
- 🖼️ **Hero Banner** — Full-width featured movie showcase with gradient overlays
- 🎞️ **Content Rows** — Horizontal scrollable carousels with arrow navigation
- 🃏 **Movie Cards** — Poster thumbnails with rich hover-expand cards (actions, metadata, genres)
- 🪟 **Movie Modal** — Detailed overlay with cast info, ratings, and maturity details
- 📄 **Pages** — Home, Browse (with sort & grid/list toggle), My List, Search (real-time filtering)
- 📱 **Fully Responsive** — Mobile-first design across all breakpoints

### Tech Stack
| Tech | Purpose |
|------|---------|
| React 19 | Component UI library |
| Vite 8 | Build tool & dev server |
| React Router 7 | SPA routing |
| React Icons | Icon library (Feather Icons) |
| Vanilla CSS | Custom design system with BEM naming |

### Component Architecture
```
src/
├── components/
│   ├── ContentRow/      # Scrollable movie carousels
│   ├── Footer/          # Site footer with links
│   ├── HeroBanner/      # Featured movie hero section
│   ├── MovieCard/        # Card with hover-expand preview
│   ├── MovieModal/       # Full detail overlay
│   └── Navbar/           # Top navigation bar
├── pages/
│   ├── HomePage/         # Hero + content rows
│   ├── BrowsePage/       # Grid view with sorting
│   ├── MyListPage/       # Saved titles
│   └── SearchPage/       # Real-time search
└── data/
    └── movies.js         # Mock TMDB-style dataset
```

---

## 🗓️ Day 2 — Auth, Routing, Booking, 3D & API Layer

> Builds on Day 1 by adding authentication, role-based access control, a ticket booking system, Axios API integration, and an immersive 3D background.

### New Features
- 🔐 **Authentication** — Login/Signup page with JWT simulation (localStorage token management)
- 🛡️ **RBAC (Role-Based Access Control)** — Three roles: `user`, `owner`, `admin` with conditional UI rendering
- 🚧 **Protected Routes** — Unauthenticated users are redirected to `/login`
- 🎟️ **Ticket Booking** — Interactive seat selection grid with real-time pricing and checkout
- 🌐 **Axios API Service** — Pre-configured with request/response interceptors and JWT header injection
- 🎆 **3D Background** — Interactive Three.js scene with glassmorphism torus knots, floating orbs, stars, and mouse-tracking camera
- 🪟 **Glassmorphism UI** — Translucent cards, frosted-glass navbar, and backdrop-blur effects throughout

### New Tech
| Tech | Purpose |
|------|---------|
| Three.js | 3D WebGL rendering |
| @react-three/fiber | React renderer for Three.js |
| @react-three/drei | Helper components (Float, Stars, Sparkles, etc.) |
| Axios | HTTP client with interceptors |
| React Context API | Global auth state management |

### New Files Added
```
src/
├── context/
│   └── AuthContext.jsx          # Auth state provider (login, logout, role)
├── routes/
│   └── AppRoutes.jsx            # Centralized route definitions
├── services/
│   └── api.js                   # Axios instance with JWT interceptors
├── components/
│   ├── ProtectedRoute/          # Route guard component
│   └── ThreeBackground/         # Interactive 3D canvas
└── pages/
    ├── LoginPage/               # Sign In / Sign Up screen
    └── BookingPage/             # Seat selection & checkout
```

### RBAC Roles
| Feature | User | Theatre Owner | Admin |
|---------|------|---------------|-------|
| View Movies | ✅ | ✅ | ✅ |
| Book Tickets | ✅ | ❌ | ❌ |
| Manage Shows | ❌ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |

> **Login hints:** Use `admin@cineverse.com` for Admin, `owner@cineverse.com` for Theatre Owner, or any other email for User role.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Sharingan001/CineVerse.git
cd CineVerse

# Run Day 1
cd day1
npm install
npm run dev

# Or run Day 2 (recommended — includes all features)
cd day2
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📸 Key Screens

| Screen | Description |
|--------|-------------|
| **Login** | Netflix-style auth with RBAC role simulation |
| **Home** | Hero banner + scrollable content rows |
| **Browse** | Grid/List view with sort by title, year, or match |
| **Search** | Real-time filtering across titles, genres, descriptions |
| **Movie Modal** | Detailed view with Book Tickets button |
| **Booking** | Interactive seat map with checkout summary |

---

## 🏗️ Architecture Highlights

- **Component-Based Design** — Co-located `.jsx` and `.css` files using BEM methodology
- **Static-First Development** — Mock data layer (`movies.js`) enables parallel frontend/backend development
- **API-Ready Structure** — Axios service layer prepared for seamless backend integration
- **Performance** — `useMemo` for expensive computations, `useCallback` for stable references, CSS transitions at 60fps
- **Clean Architecture** — Separated concerns: components → pages → routes → services → context

---

## 📄 License

This project is built for academic and learning purposes.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Sharingan001">Sharingan001</a>
</p>
