import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, CalendarPlus, CheckSquare, Trash2 } from 'lucide-react';

const SemesterManagement = () => {
  const [semesters, setSemesters] = useState([]);
  const [newSemester, setNewSemester] = useState({ name: '', startDate: '', endDate: '' });

  const fetchSemesters = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/semesters');
      setSemesters(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchSemesters(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/semesters', newSemester);
    setNewSemester({ name: '', startDate: '', endDate: '' });
    fetchSemesters();
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'archived' : 'active';
    await axios.put(`http://localhost:5000/api/semesters/${id}`, { status: newStatus });
    fetchSemesters();
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Term Management</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Create academic semesters and configure their active status across the system.</p>
      </div>

      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.5rem', background: 'var(--primary-bg)', borderRadius: '0.5rem' }}><CalendarPlus color="var(--primary-blue)" size={24} /></div>
          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Open New Semester</h3>
        </div>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 2, minWidth: '250px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Term Name</label>
            <input type="text" placeholder="e.g. 2024 Fall Semester" className="input-field" value={newSemester.name} onChange={e => setNewSemester({...newSemester, name: e.target.value})} required />
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Start Date</label>
            <input type="date" className="input-field" value={newSemester.startDate} onChange={e => setNewSemester({...newSemester, startDate: e.target.value})} required />
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>End Date</label>
            <input type="date" className="input-field" value={newSemester.endDate} onChange={e => setNewSemester({...newSemester, endDate: e.target.value})} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem', height: '42px', flexShrink: 0 }}>Create Term</button>
        </form>
      </div>

      <div className="card">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BookOpen size={20} color="var(--text-main)" /> Current Terms Ledger</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--background-light)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Semester Name</th>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Term State</th>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timeline</th>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Controls</th>
            </tr>
          </thead>
          <tbody>
            {semesters.map(s => (
              <tr key={s._id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.backgroundColor='var(--background-light)'} onMouseOut={e=>e.currentTarget.style.backgroundColor='transparent'}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>{s.name}</td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  {s.status === 'active' ? <span className="badge badge-green">● Active</span> : <span className="badge badge-gray">Archived</span>}
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {new Date(s.startDate).toLocaleDateString()} &rarr; {new Date(s.endDate).toLocaleDateString()}
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                  <button 
                    onClick={() => handleToggleStatus(s._id, s.status)} 
                    className="btn btn-outline"
                    style={{ 
                      padding: '0.4rem 0.75rem', 
                      borderColor: s.status === 'active' ? 'transparent' : 'var(--primary-blue)', 
                      color: s.status === 'active' ? 'var(--text-muted)' : 'var(--primary-blue)',
                      backgroundColor: s.status === 'active' ? 'var(--neutral-light)' : 'transparent'
                    }}
                  >
                    {s.status === 'active' ? <><Trash2 size={16}/> Archive</> : <><CheckSquare size={16} /> Activate</>}
                  </button>
                </td>
              </tr>
            ))}
            {semesters.length === 0 && (
              <tr><td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No terms registered. Start by creating a new semester.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SemesterManagement;
