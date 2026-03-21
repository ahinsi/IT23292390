import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import axios from 'axios';

const Navbar = () => {
  const [adminName, setAdminName] = useState(localStorage.getItem('adminName') || 'System Admin');
  const [activeSemester, setActiveSemester] = useState('Loading...');

  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/semesters');
        const active = response.data.find(s => s.status === 'Active');
        if (active) {
          setActiveSemester(active.name);
        } else {
          setActiveSemester('No Active Semester');
        }
      } catch (error) {
        console.error('Error fetching semesters:', error);
        setActiveSemester('Semester Data Unavailable');
      }
    };
    fetchSemester();

    const handleProfileUpdate = () => {
      setAdminName(localStorage.getItem('adminName') || 'System Admin');
    };
    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, []);

  return (
    <nav style={{
      backgroundColor: 'var(--surface)',
      borderBottom: '1px solid var(--border-color)',
      padding: '1rem 2.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button style={{ background: 'var(--primary-bg)', border: 'none', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Current Term: {activeSemester}
        </button>
        <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{adminName}</p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--success)', fontWeight: 500 }}>Authenticated</p>
          </div>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontFamily: 'var(--font-header)',
            boxShadow: '0 4px 10px rgba(79,70,229,0.3)',
            textTransform: 'uppercase'
          }}>
            {adminName.substring(0, 2)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
