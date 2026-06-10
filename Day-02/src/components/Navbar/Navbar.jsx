import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiChevronDown, FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', path: '/browse' },
  { label: 'TV Shows', path: '/tv-shows' },
  { label: 'Movies', path: '/movies' },
  { label: 'New & Popular', path: '/new-popular' },
  { label: 'My List', path: '/my-list' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { isAuthenticated, selectedProfile, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search', { state: { query: searchQuery.trim() } });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // If not authenticated, we might show a different nav (e.g. for landing page)
  // But here we'll assume Navbar is only used inside ProtectedRoutes, or 
  // we adapt it. For Day-02, we'll keep it simple and assume it's shown everywhere
  // but adapts.

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__left">
        {/* Logo */}
        <Link to={isAuthenticated ? "/browse" : "/"} className="navbar__logo" id="nav-logo">
          <span className="navbar__logo-text">CINEVERSE</span>
        </Link>

        {/* Desktop Nav Links (Only show if authenticated and profile selected) */}
        {isAuthenticated && selectedProfile && (
          <ul className="navbar__links" id="nav-links-desktop">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Mobile Menu Toggle */}
        {isAuthenticated && selectedProfile && (
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        )}
      </div>

      <div className="navbar__right">
        {isAuthenticated ? (
          <>
            {/* Search */}
            {selectedProfile && (
              <form
                className={`navbar__search ${searchOpen ? 'navbar__search--open' : ''}`}
                onSubmit={handleSearchSubmit}
                id="nav-search"
              >
                <button
                  type="button"
                  className="navbar__search-icon"
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label="Search"
                >
                  <FiSearch />
                </button>
                <input
                  ref={searchRef}
                  type="text"
                  className="navbar__search-input"
                  placeholder="Titles, people, genres"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => {
                    if (!searchQuery) setSearchOpen(false);
                  }}
                />
              </form>
            )}

            {/* Notifications */}
            {selectedProfile && (
              <button className="navbar__icon-btn" id="nav-notifications" aria-label="Notifications">
                <FiBell />
                <span className="navbar__notification-badge">3</span>
              </button>
            )}

            {/* Profile Dropdown */}
            {selectedProfile && (
              <div
                className="navbar__profile"
                id="nav-profile"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <div className="navbar__avatar">
                  <div className="navbar__avatar-img" style={{ backgroundColor: selectedProfile.color }}>
                    {selectedProfile.icon}
                  </div>
                  <FiChevronDown className={`navbar__caret ${profileOpen ? 'navbar__caret--open' : ''}`} />
                </div>
                {profileOpen && (
                  <div className="navbar__profile-dropdown">
                    <Link to="/profiles" className="navbar__profile-item">
                      <FiUser /> Switch Profile
                    </Link>
                    <div className="navbar__profile-divider" />
                    <button className="navbar__profile-item" onClick={handleLogout}>
                      <FiLogOut /> Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Sign Out Button (if on profile select page) */}
            {!selectedProfile && (
              <button className="navbar__btn" onClick={handleLogout}>Sign Out</button>
            )}
          </>
        ) : (
          /* Unauthenticated (Landing Page) */
          location.pathname !== '/login' && location.pathname !== '/signup' && (
            <Link to="/login" className="navbar__btn navbar__btn--primary">Sign In</Link>
          )
        )}
      </div>

      {/* Mobile Menu */}
      {isAuthenticated && selectedProfile && (
        <div className={`navbar__mobile-menu ${mobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
          <ul className="navbar__mobile-links">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`navbar__mobile-link ${location.pathname === link.path ? 'navbar__mobile-link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
