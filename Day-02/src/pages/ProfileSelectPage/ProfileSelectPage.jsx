import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { profiles } from '../../data/movies';
import './ProfileSelectPage.css';

export default function ProfileSelectPage() {
  const { selectProfile } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = (profile) => {
    if (profile.isAdd) {
      alert('Add Profile functionality coming soon!');
      return;
    }
    
    // Set active profile in AuthContext
    selectProfile(profile);
    
    // Navigate to authenticated home
    navigate('/browse');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="profile-title">Who's watching?</h1>
        
        <div className="profile-grid">
          {profiles.map((profile) => (
            <button 
              key={profile.id} 
              className="profile-card"
              onClick={() => handleProfileClick(profile)}
            >
              <div 
                className={`profile-avatar ${profile.isAdd ? 'profile-avatar--add' : ''}`}
                style={{ backgroundColor: profile.color }}
              >
                {profile.icon}
              </div>
              <span className="profile-name">{profile.name}</span>
            </button>
          ))}
        </div>
        
        <button className="profile-manage-btn">
          Manage Profiles
        </button>
      </div>
    </div>
  );
}
