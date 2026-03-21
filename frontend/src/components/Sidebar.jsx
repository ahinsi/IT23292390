import React from 'react';
import { LayoutDashboard, CalendarDays, History, BookOpen, Clock, Settings as SettingsIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const getNavStyle = ({ isActive }) => {
    const baseStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '0.875rem',
      padding: '0.875rem 1.25rem',
      color: 'var(--sidebar-text)',
      textDecoration: 'none',
      fontWeight: 500,
      borderRadius: 'var(--radius-md)',
      transition: 'all 0.2s ease',
      margin: '0.25rem 0',
      fontSize: '0.95rem'
    };

    if (isActive) {
      return {
        ...baseStyle,
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'var(--sidebar-active)',
        fontWeight: 600,
        boxShadow: 'inset 4px 0 0 0 var(--primary)'
      };
    }
    return baseStyle;
  };

  return (
    <aside style={{
      width: '280px',
      backgroundColor: 'var(--sidebar-bg)',
      padding: '2rem 1.25rem',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: '0',
      height: '100vh',
      boxShadow: '4px 0 20px rgba(0,0,0,0.1)'
    }}>
      {/* Brand area inside Sidebar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.5rem', marginBottom: '2.5rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: '4px' }}>
          <img src="/logo.png" alt="SLIIT Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.1rem', margin: 0, color: 'white', letterSpacing: '-0.02em', lineHeight: '1.2' }}>SLIIT Timetable<br/><span style={{fontWeight: 400, color: 'var(--sidebar-text)', fontSize: '0.9rem'}}>Management System</span></h1>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem', padding: '0 0.5rem' }}>
        <p style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Management</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <NavLink to="/" style={getNavStyle} end>
          <LayoutDashboard size={20} />
          Dashboard Overview
        </NavLink>
        <NavLink to="/semesters" style={getNavStyle}>
          <BookOpen size={20} />
          Semester Planning
        </NavLink>
        <NavLink to="/logs" style={getNavStyle}>
          <History size={20} />
          Audit Logs
        </NavLink>
        <NavLink to="/timetable" style={getNavStyle}>
          <CalendarDays size={20} />
          Master Schedule
        </NavLink>
        <NavLink to="/settings" style={getNavStyle}>
          <SettingsIcon size={20} />
          System Settings
        </NavLink>
      </nav>
      
    </aside>
  );
};

export default Sidebar;
