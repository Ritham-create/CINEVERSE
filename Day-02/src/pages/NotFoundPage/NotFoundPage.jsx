import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: 'var(--cv-bg)',
      backgroundImage: 'radial-gradient(circle at center, #2a0808 0%, #141414 100%)'
    }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 900, marginBottom: '20px', textShadow: '0 4px 20px rgba(229, 9, 20, 0.4)' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Lost your way?</h2>
      <p style={{ fontSize: '1.2rem', color: 'var(--cv-text-secondary)', marginBottom: '40px', maxWidth: '500px' }}>
        Sorry, we can't find that page. You'll find lots to explore on the home page.
      </p>
      <Link 
        to="/" 
        style={{ 
          backgroundColor: 'white', 
          color: 'black', 
          padding: '12px 24px', 
          borderRadius: '4px', 
          fontWeight: 600,
          fontSize: '1.1rem' 
        }}
      >
        Cineverse Home
      </Link>
    </div>
  );
}
