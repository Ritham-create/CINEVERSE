import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './AuthPages.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/profiles');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Background" />
        <div className="auth-gradient" />
      </div>

      <header className="auth-header">
        <Link to="/" className="auth-logo">CINEVERSE</Link>
      </header>

      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="auth-title">Sign In</h1>
          
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-input-group">
            <input
              type="email"
              className="auth-input"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-input-group">
            <input
              type="password"
              className="auth-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-submit" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="auth-actions">
            <label className="auth-checkbox">
              <input type="checkbox" defaultChecked /> Remember me
            </label>
            <a href="#" className="auth-help">Need help?</a>
          </div>

          <div className="auth-footer">
            <p>
              <span className="auth-muted">New to Cineverse? </span>
              <Link to="/signup" className="auth-link">Sign up now.</Link>
            </p>
            <p className="auth-recaptcha">
              This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#">Learn more.</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
