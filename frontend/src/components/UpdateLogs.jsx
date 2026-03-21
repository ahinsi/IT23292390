import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { History, Clock, FileWarning } from 'lucide-react';

const UpdateLogs = () => {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('All');

  const fetchLogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/logs');
      setLogs(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); 
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      (log.module || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.message || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.lecturer || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.hall || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesAction = true;
    if (actionFilter === 'Warning') matchesAction = log.message && log.message.includes('WARNING');
    else if (actionFilter === 'Semester') matchesAction = log.action.toLowerCase().includes('semester');
    else if (actionFilter !== 'All') matchesAction = log.action.includes(actionFilter);
      
    return matchesSearch && matchesAction;
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', margin: 0 }}>System Log Matrix</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Real-time monitoring of session edits, conflicts, and state changes.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--success-green)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success-green)', animation: 'pulse 2s infinite' }}></div>
          Live Sync Active
        </div>
      </div>

      {/* Filters Section */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--surface)' }}>
        <input 
          type="text" 
          placeholder="Search logs by module, lecturer, or message..." 
          className="input-field" 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ flex: 1, borderRadius: 'var(--radius-full)', padding: '0.6rem 1.25rem' }} 
        />
        <select 
          className="input-field" 
          value={actionFilter} 
          onChange={e => setActionFilter(e.target.value)} 
          style={{ width: '220px', borderRadius: 'var(--radius-full)', padding: '0.6rem 1.25rem', appearance: 'none' }}
        >
          <option value="All">All Actions</option>
          <option value="Created">Created Events</option>
          <option value="Updated">Updated Events</option>
          <option value="Deleted">Deleted Events</option>
          <option value="Semester">Semester Workflows</option>
          <option value="Warning">Conflicts & Warnings</option>
        </select>
      </div>

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--background-light)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', width: '20%' }}>Timestamp</th>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', width: '15%' }}>Action</th>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', width: '25%' }}>Context Source</th>
              <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Event Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (<tr><td colSpan="4" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>No audit logs found matching your filters.</td></tr>) : filteredLogs.map(log => {
              const warning = log.message && log.message.includes('WARNING');
              const actionType = log.action.toLowerCase().includes('semester') ? 'badge-blue' : 'badge-green';

              return (
              <tr key={log._id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.backgroundColor='var(--background-light)'} onMouseOut={e=>e.currentTarget.style.backgroundColor='transparent'}>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <Clock size={14} />
                    <span className="table-time" style={{ background: 'transparent' }}>{new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--neutral-gray)', marginTop: '0.25rem', marginLeft: '1.3rem' }}>
                    {new Date(log.timestamp).toLocaleDateString()}
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span className={`badge ${actionType}`}>{log.action}</span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  {log.module ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{log.module}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{log.hall} • {log.lecturer}</span>
                    </div>
                  ) : <span style={{ color: 'var(--neutral-gray)', fontStyle: 'italic', fontSize: '0.9rem' }}>System Root</span>}
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ 
                    padding: '0.75rem 1rem', 
                    borderRadius: 'var(--radius-md)', 
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    background: warning ? 'var(--warning-bg)' : 'var(--background-light)', 
                    color: warning ? '#92400E' : 'var(--text-main)', 
                    fontSize: '0.9rem', 
                    fontWeight: 500,
                    border: warning ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent'
                  }}>
                    {warning ? <FileWarning size={18} color="var(--warning-orange)" style={{ flexShrink: 0, marginTop: '2px' }} /> : <History size={18} color="var(--neutral-gray)" style={{ flexShrink: 0, marginTop: '2px' }} />}
                    <span style={{ lineHeight: '1.4' }}>{log.message}</span>
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UpdateLogs;
