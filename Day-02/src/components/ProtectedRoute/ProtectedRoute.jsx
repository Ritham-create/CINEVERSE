import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * ProtectedRoute — Navigation layer component
 * 
 * Prevents unauthenticated users from accessing protected routes
 * (like Browse, Profile Selection, My List). Redirects to Landing Page or Login.
 */
export default function ProtectedRoute({ requireProfile = false }) {
  const { isAuthenticated, hasProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="loading-spinner__ring" />
      </div>
    );
  }

  // Not logged in -> redirect to Landing Page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Logged in but needs a profile selected (and isn't currently selecting one)
  if (requireProfile && !hasProfile) {
    return <Navigate to="/profiles" replace />;
  }

  // Authorized -> render child routes
  return <Outlet />;
}
