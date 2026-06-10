# Day 02: React Frontend Development (Static UI & Navigation Layer)

## Learning Objectives
By the end of this session, learners will be able to:
- **Design a modular frontend architecture** using React.js
- **Implement component-based UI design** with reusable layouts
- **Establish routing and navigation flow** using `react-router-dom`
- **Integrate API-ready frontend** using Axios (with conceptual interceptors)
- **Simulate authentication flow** using JWT stored in `localStorage`
- **Manage UI state effectively** using React Context API (`AuthContext`, `ListContext`)
- **Build a fully navigable frontend** using static data

## Key Features Implemented
1. **Pre-Authentication Flow**:
   - `LandingPage`: Marketing landing page for unauthenticated users.
   - `LoginPage` & `SignupPage`: Simulated authentication forms.
2. **Authentication & Authorization**:
   - `AuthContext`: Manages user sessions, JWT tokens, and profiles.
   - `ProtectedRoute`: React Router component that restricts access to authenticated users.
   - `ProfileSelectPage`: The classic "Who's watching?" screen.
3. **Post-Authentication Flow**:
   - `HomePage` (`/browse`): The main dashboard with Hero Banner and Content Rows.
   - `TVShowsPage` & `MoviesPage`: Filtered views using a CSS Grid layout.
   - `MyListPage`: Personalized watchlist powered by `ListContext`.
   - `SearchPage`: Dynamic search across all categories.
4. **API-Ready Architecture**:
   - Organized `services/api.js` using Axios instances and interceptors, ready to be connected to a real backend.

## Project Structure
```
Day-02/
├── src/
│   ├── components/      # UI Components (Navbar, MovieCard, ProtectedRoute)
│   ├── contexts/        # Global State (AuthContext, ListContext)
│   ├── data/            # Static Data (movies, tvShows, profiles)
│   ├── hooks/           # Custom Hooks (useAuth, useList)
│   ├── pages/           # Route Pages (Landing, Login, Home, Browse, etc.)
│   ├── services/        # API Layer (api.js with Axios)
│   ├── App.jsx          # Router and Context Providers
│   └── index.css        # Global Design System
```

## Running the Application
```bash
npm install
npm run dev
```

*Note: For testing the auth flow, any email + a password >= 4 characters will work.*
