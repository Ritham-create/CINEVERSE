import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page" id="landing-page">
      <header className="landing-header">
        <div className="landing-nav">
          <div className="landing-logo">CINEVERSE</div>
          <Link to="/login" className="landing-btn landing-btn--signin">Sign In</Link>
        </div>
      </header>

      <main className="landing-content">
        <div className="landing-hero">
          <div className="landing-hero__bg">
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Background" />
            <div className="landing-hero__gradient" />
          </div>
          
          <div className="landing-hero__text">
            <h1 className="landing-title">Unlimited movies, TV shows, and more</h1>
            <p className="landing-subtitle">Watch anywhere. Cancel anytime.</p>
            <p className="landing-prompt">Ready to watch? Enter your email to create or restart your membership.</p>
            
            <form className="landing-form" onSubmit={(e) => { e.preventDefault(); window.location.href='/signup'; }}>
              <input type="email" placeholder="Email address" className="landing-input" required />
              <button type="submit" className="landing-btn landing-btn--getstarted">
                Get Started <FiChevronRight />
              </button>
            </form>
          </div>
        </div>

        <section className="landing-feature">
          <div className="landing-feature__text">
            <h2>Enjoy on your TV</h2>
            <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
          </div>
          <div className="landing-feature__img">
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="TV" />
          </div>
        </section>
      </main>
    </div>
  );
}
