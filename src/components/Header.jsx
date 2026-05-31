import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const Header = () => {
  return (
    <header className="neo-header">
      <div>
        <h1>OEE MONITORING SYSTEM</h1>
        <p>AJINOMOTO INDONESIA</p>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div className="neo-box" style={{ padding: '10px 20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Calendar size={20} />
          <span style={{ fontWeight: 900 }}>5 MAY 2026</span>
        </div>x
        <div className="neo-box" style={{ padding: '10px 20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Clock size={20} />
          <span style={{ fontWeight: 900 }}>09:33:45</span>
        </div>
        <div className="neo-box" style={{ padding: '10px 20px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 900 }}>SHIFT AKTIF</div>
          <select className="neo-select" style={{ border: 'none', padding: 0, background: 'transparent', width: 'auto', fontSize: '1rem' }}>
            <option>PAGI</option>
            <option>SIANG</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
