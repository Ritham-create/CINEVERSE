import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ListProvider } from './contexts/ListContext';
import { useAuth } from './hooks/useAuth';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ProfileSelectPage from './pages/ProfileSelectPage/ProfileSelectPage';
import HomePage from './pages/HomePage/HomePage';
import BrowsePage from './pages/BrowsePage/BrowsePage';
import TVShowsPage from './pages/TVShowsPage/TVShowsPage';
import MyListPage from './pages/MyListPage/MyListPage';
import SearchPage from './pages/SearchPage/SearchPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './App.css';

/**
 * AppContent — Inner component to access AuthContext
 */
function AppContent() {
  const { isAuthenticated, selectedProfile } = useAuth();
  
  // Determine if we should show the standard Navbar and Footer
  // We show them if the user is authenticated AND has selected a profile
  // OR if we are deliberately choosing to show a variation on public pages
  // (In this setup, Landing, Login, Signup have their own specific headers)
  const showNavFooter = isAuthenticated && selectedProfile;

  return (
    <>
      {showNavFooter && <Navbar />}
      
      <main className="app-main">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes — Require Authentication */}
          <Route element={<ProtectedRoute requireProfile={false} />}>
            <Route path="/profiles" element={<ProfileSelectPage />} />
          </Route>

          {/* Protected Routes — Require Authentication AND Profile Selection */}
          <Route element={<ProtectedRoute requireProfile={true} />}>
            <Route path="/browse" element={<HomePage />} />
            <Route path="/tv-shows" element={<TVShowsPage />} />
            <Route path="/movies" element={<BrowsePage title="Movies" filterType="movie" />} />
            <Route path="/new-popular" element={<BrowsePage title="New & Popular" />} />
            <Route path="/my-list" element={<MyListPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {showNavFooter && <Footer />}
    </>
  );
}

/**
 * App — Root component that provides contexts
 */
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ListProvider>
          <AppContent />
        </ListProvider>
      </AuthProvider>
    </Router>
  );
}
