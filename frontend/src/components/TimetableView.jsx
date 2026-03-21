import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const TimetableView = ({ sessions, onEdit, onDelete }) => {
  return (
    <div style={{ overflowX: 'auto', background: 'var(--surface)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ 
            backgroundColor: '#F8FAFC', 
            borderBottom: '2px solid var(--border-color)',
          }}>
            <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Course Module</th>
            <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Batch</th>
            <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lecturer</th>
            <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</th>
            <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Schedule</th>
            <th style={{ padding: '1.25rem 2rem', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
          </tr>
        </thead>
        <tbody style={{ fontFamily: 'var(--font-body)' }}>
          {sessions.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '1.5rem', background: 'var(--background)', borderRadius: '50%' }}>
                    <Edit2 size={32} color="var(--text-muted)" />
                  </div>
                  <p style={{ fontWeight: 500, fontSize: '1.1rem' }}>No active sessions found.</p>
                  <p style={{ fontSize: '0.9rem' }}>Click "Add New Session" to populate the timetable.</p>
                </div>
              </td>
            </tr>
          ) : (
            sessions.map((session, i) => (
              <tr 
                key={session._id} 
                style={{ 
                  borderBottom: '1px solid var(--border-color)',
                  transition: 'background-color 0.2s',
                  backgroundColor: 'transparent'
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--background)'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '1.5rem 2rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)', display: 'block', fontSize: '1.05rem' }}>{session.module}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem', display: 'block' }}>{session.title}</span>
                </td>
                <td style={{ padding: '1.5rem 1rem' }}>
                  <span className="badge badge-blue">
                    {session.batch}
                  </span>
                </td>
                <td style={{ padding: '1.5rem 1rem', fontWeight: 500, color: 'var(--text-main)' }}>{session.lecturer}</td>
                <td style={{ padding: '1.5rem 1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 500 }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--warning)' }}></div>
                    {session.hall}
                  </span>
                </td>
                <td style={{ padding: '1.5rem 1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{session.day}</span>
                    <span className="table-time">{session.time}</span>
                  </div>
                </td>
                <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button 
                      className="btn btn-outline"
                      onClick={() => onEdit(session)}
                      style={{
                        padding: '0.4rem 1rem',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-main)',
                        borderRadius: 'var(--radius-full)'
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.backgroundColor = 'var(--primary-bg)';
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.color = 'var(--primary)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.color = 'var(--text-main)';
                      }}
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button 
                      className="btn btn-outline"
                      onClick={() => onDelete(session._id)}
                      style={{
                        padding: '0.4rem 1rem',
                        borderColor: 'var(--border-color)',
                        color: 'var(--error)',
                        borderRadius: 'var(--radius-full)'
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.backgroundColor = 'var(--error-bg)';
                        e.currentTarget.style.borderColor = 'var(--error)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                      }}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TimetableView;
