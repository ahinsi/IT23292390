import React, { useState } from 'react';
import { X, Clock, MapPin, UserIcon, Book, Calendar as CalendarIcon, Hash } from 'lucide-react';

const AddSessionModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({ 
    module: '', title: '', batch: '', 
    lecturer: '', hall: '', day: 'Monday', time: '' 
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem'
    }}>
      <div className="card" style={{
        width: '100%', maxWidth: '600px',
        animation: 'modalSlideUp 0.3s ease-out',
        maxHeight: '90vh', overflowY: 'auto'
      }}>
        <div style={{
          padding: '1.5rem', borderBottom: '1px solid var(--border-color)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          backgroundColor: 'var(--background-light)'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>Create New Session</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Add a new timetable entry into the database.
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'var(--neutral-light)', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseOver={e=>e.currentTarget.style.backgroundColor='var(--border-color)'} onMouseOut={e=>e.currentTarget.style.backgroundColor='var(--neutral-light)'}>
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                <Book size={16} color="var(--primary-blue)" /> Module Name & Title
              </label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                 <input type="text" name="module" className="input-field" value={formData.module} onChange={handleChange} required placeholder="e.g. SE101" style={{ width: '30%' }} />
                 <input type="text" name="title" className="input-field" value={formData.title} onChange={handleChange} required placeholder="e.g. Software Engineering" style={{ flex: 1 }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                <Hash size={16} color="var(--neutral-gray)" /> Batch
              </label>
              <input type="text" name="batch" className="input-field" value={formData.batch} onChange={handleChange} required placeholder="e.g. Y2S1" />
            </div>

            <div>
              <label style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                <UserIcon size={16} color="var(--primary-blue)" /> Lecturer
              </label>
              <input type="text" name="lecturer" className="input-field" value={formData.lecturer} onChange={handleChange} required placeholder="e.g. Dr. Adam Smith" />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                <MapPin size={16} color="var(--warning-orange)" /> Hall
              </label>
              <input type="text" name="hall" className="input-field" value={formData.hall} onChange={handleChange} required placeholder="e.g. Hall A" />
            </div>

            <div>
              <label style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                <CalendarIcon size={16} color="var(--neutral-gray)" /> Day
              </label>
              <select name="day" className="input-field" value={formData.day} onChange={handleChange}>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                <Clock size={16} color="var(--success-green)" /> Time Schedule
              </label>
              <input type="text" name="time" className="input-field table-time" value={formData.time} onChange={handleChange} required placeholder="e.g. 08:00 AM - 10:00 AM" />
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="button" className="btn btn-outline" onClick={onClose} style={{ fontWeight: 600 }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ fontWeight: 600, padding: '0.5rem 1.5rem' }}>Add Session</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSessionModal;
