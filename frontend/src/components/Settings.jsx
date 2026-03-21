import React, { useState, useEffect } from 'react';
import { Moon, Sun, User, Mail, Save, Shield } from 'lucide-react';

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [profile, setProfile] = useState({
    name: localStorage.getItem('adminName') || 'System Admin',
    email: localStorage.getItem('adminEmail') || 'admin@sliit.lk'
  });
  const [saveMsg, setSaveMsg] = useState('');

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    localStorage.setItem('adminName', profile.name);
    localStorage.setItem('adminEmail', profile.email);
    setSaveMsg('Profile updated successfully.');
    setTimeout(() => setSaveMsg(''), 4000);
    // Dispatch an event to notify the Navbar to update the name
    window.dispatchEvent(new Event('profileUpdated'));
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', margin: 0, color: 'var(--text-main)' }}>System Settings</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Configure your dashboard appearance and personal administrative details.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* Theme Module */}
        <div className="card" style={{ padding: '2rem', border: 'none' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sun size={20} color="var(--warning)" /> Appearance & Theme
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Switch between Light and Dark modes to reduce eye strain.</p>
          
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button 
              onClick={() => toggleTheme('light')}
              style={{
                flex: 1, padding: '1.5rem', borderRadius: 'var(--radius-md)', border: theme === 'light' ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                background: 'var(--surface)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', transition: 'all 0.2s'
              }}
            >
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sun size={28} color="#F59E0B" />
              </div>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Light Mode</span>
            </button>

            <button 
              onClick={() => toggleTheme('dark')}
              style={{
                flex: 1, padding: '1.5rem', borderRadius: 'var(--radius-md)', border: theme === 'dark' ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                background: theme === 'dark' ? 'var(--primary-bg)' : 'var(--surface)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', transition: 'all 0.2s'
              }}
            >
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Moon size={28} color="#94A3B8" />
              </div>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* Profile Module */}
        <div className="card" style={{ padding: '2rem', border: 'none' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={20} color="var(--success)" /> Administrator Details
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Update your operational contact info across the system.</p>
          
          <form onSubmit={handleProfileSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <User size={16} color="var(--primary)" /> Display Name
                </label>
                <input type="text" className="input-field" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} required />
              </div>
              <div>
                <label style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <Mail size={16} color="var(--primary)" /> Contact Email
                </label>
                <input type="email" className="input-field" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} required />
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {saveMsg ? (
                <span style={{ color: 'var(--success)', fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✓ {saveMsg}</span>
              ) : <span></span>}
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                <Save size={18} /> Save Changes
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Settings;
