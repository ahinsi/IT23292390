import React, { useState, useEffect } from 'react';
import { X, Clock, MapPin, UserIcon } from 'lucide-react';

const EditSessionModal = ({ session, onClose, onSave }) => {
  const [formData, setFormData] = useState({ hall: '', time: '', lecturer: '' });

  useEffect(() => {
    if (session) {
      setFormData({ hall: session.hall, time: session.time, lecturer: session.lecturer });
    }
  }, [session]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(17, 24, 39, 0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem'
    }}>
      <div className="card" style={{
        width: '100%', maxWidth: '450px',
        animation: 'modalSlideUp 0.3s ease-out'
      }}>
        <div style={{
          padding: '1.5rem', borderBottom: '1px solid var(--border-color)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          backgroundColor: 'var(--background-light)'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>Modify Session</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {session?.module} - {session?.day}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'var(--neutral-light)', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseOver={e=>e.currentTarget.style.backgroundColor='var(--border-color)'} onMouseOut={e=>e.currentTarget.style.backgroundColor='var(--neutral-light)'}>
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Lecturer Input */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                <UserIcon size={16} color="var(--primary-blue)" /> Assign Lecturer
              </label>
              <input type="text" name="lecturer" className="input-field" value={formData.lecturer} onChange={handleChange} required placeholder="e.g. Dr. Adam Smith" />
            </div>

            {/* Hall Input */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                <MapPin size={16} color="var(--warning-orange)" /> Select Hall
              </label>
              <input type="text" name="hall" className="input-field" value={formData.hall} onChange={handleChange} required placeholder="e.g. Hall A" />
            </div>

            {/* Time Input */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                <Clock size={16} color="var(--success-green)" /> Session Time
              </label>
              <input type="text" name="time" className="input-field table-time" value={formData.time} onChange={handleChange} required placeholder="e.g. 08:00 AM - 10:00 AM" />
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="button" className="btn btn-outline" onClick={onClose} style={{ fontWeight: 600 }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ fontWeight: 600, padding: '0.5rem 1.5rem' }}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSessionModal;
