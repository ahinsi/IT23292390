import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimetableView from './TimetableView';
import EditSessionModal from './EditSessionModal';
import AddSessionModal from './AddSessionModal';
import { Users, Library, CheckCircle2, AlertOctagon, Plus, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [message, setMessage] = useState(null);
  const [isWarning, setIsWarning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSessions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sessions');
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleEditClick = (session) => {
    setEditingSession(session);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/sessions/${editingSession._id}`, updatedData);
      const { session, message: serverMsg, conflictWarning } = response.data;
      
      setSessions(sessions.map(s => s._id === session._id ? session : s));
      setMessage(serverMsg);
      setIsWarning(conflictWarning);
      setIsEditModalOpen(false);
      setTimeout(() => { setMessage(null); setIsWarning(false); }, 7000);
    } catch (error) {
      setMessage("Failed to update session."); setIsWarning(true);
    }
  };

  const handleAdd = async (newData) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/sessions`, newData);
      const { session, message: serverMsg, conflictWarning } = response.data;
      
      setSessions([...sessions, session]);
      setMessage(serverMsg || "Session successfully created.");
      setIsWarning(conflictWarning || false);
      setIsAddModalOpen(false);
      setTimeout(() => { setMessage(null); setIsWarning(false); }, 7000);
    } catch (error) {
      setMessage("Failed to create session."); setIsWarning(true);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure you want to permanently delete this session?')) return;
    try {
      const response = await axios.delete(`http://localhost:5000/api/sessions/${id}`);
      setSessions(sessions.filter(s => s._id !== id));
      setMessage(response.data.message || "Session deleted successfully.");
      setIsWarning(false);
      setTimeout(() => { setMessage(null); }, 7000);
    } catch (error) {
      setMessage("Failed to delete session."); setIsWarning(true);
    }
  };

  const filteredSessions = sessions.filter(s => {
    const searchLow = searchQuery.toLowerCase();
    return (
      (s.module || '').toLowerCase().includes(searchLow) || 
      (s.lecturer || '').toLowerCase().includes(searchLow) || 
      (s.hall || '').toLowerCase().includes(searchLow) ||
      (s.batch || '').toLowerCase().includes(searchLow)
    );
  });

  const statCards = [
    { title: 'Total Sessions Scheduled', count: sessions.length || 0, icon: <Library color="var(--primary)" size={26}/>, bg: 'var(--primary-bg)' },
    { title: 'Active Lecturers', count: new Set(sessions.map(s => s.lecturer)).size, icon: <Users color="var(--success)" size={26}/>, bg: 'var(--success-bg)' },
    { title: 'Halls Occupied', count: new Set(sessions.map(s => s.hall)).size, icon: <CheckCircle2 color="var(--warning)" size={26}/>, bg: 'var(--warning-bg)' },
    { title: 'Live Conflict Sync', count: 'Active', icon: <Activity color="var(--secondary)" size={26}/>, bg: 'var(--secondary-bg)' },
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Sleek Welcome Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ fontSize: '2.25rem', margin: 0, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
            Welcome back, Admin
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.25rem' }}>
            Here is what's happening with your academic schedules today.
          </p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
          <Plus size={18} /> Add New Session
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {statCards.map((stat, idx) => (
          <div key={idx} className="card" style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.5rem', border: 'none' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '1rem', backgroundColor: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.title}</p>
              <h3 style={{ fontSize: '1.75rem', marginTop: '0.15rem', color: 'var(--text-main)', fontWeight: 700 }}>{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>
      
      {message && (
        <div style={{
          padding: '1.25rem 1.75rem',
          marginBottom: '2rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: isWarning ? 'var(--warning-bg)' : 'var(--success-bg)',
          color: isWarning ? '#b45309' : '#047857', 
          borderLeft: `4px solid ${isWarning ? 'var(--warning)' : 'var(--success)'}`,
          fontWeight: 500,
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {isWarning ? <AlertOctagon size={22} color="var(--warning)" /> : <CheckCircle2 size={22} color="var(--success)" />}
          {message}
        </div>
      )}

      <div className="card" style={{ border: 'none' }}>
        <div style={{ padding: '1.75rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>Master Timetable</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Active sessions for the current semester.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search (module, hall, lecturer, batch)..." className="input-field" style={{ padding: '0.6rem 1.25rem', width: '320px', borderRadius: 'var(--radius-full)' }} />
          </div>
        </div>
        <TimetableView sessions={filteredSessions} onEdit={handleEditClick} onDelete={handleDelete} />
      </div>

      {isEditModalOpen && (
        <EditSessionModal session={editingSession} onClose={() => setIsEditModalOpen(false)} onSave={handleUpdate} />
      )}
      {isAddModalOpen && (
        <AddSessionModal onClose={() => setIsAddModalOpen(false)} onSave={handleAdd} />
      )}
    </div>
  );
};

export default AdminDashboard;
