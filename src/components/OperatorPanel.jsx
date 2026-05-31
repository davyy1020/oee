import React from 'react';
import { ChevronRight } from 'lucide-react';

const OperatorPanel = () => {
  return (
    <div className="right-panel">
      <div className="neo-box" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase' }}>Notifikasi / Alarm</h3>
          <button className="neo-button" style={{ fontSize: '0.6rem', padding: '2px 8px' }}>LIHAT</button>
        </div>

        <div className="alarm-list" style={{ flex: 1, overflowY: 'auto' }}>
          {[
            { id: 'PCK04', msg: 'Mesin STOP lebih dari 10 menit', time: '09:31', color: 'var(--aj-red)', status: 'CRITICAL' },
            { id: 'PCK09', msg: 'Speed di bawah target', time: '09:28', color: 'var(--aj-red)', status: 'WARNING' },
            { id: 'PCK06', msg: 'Idle lebih dari 5 menit', time: '09:25', color: 'var(--aj-yellow)', status: 'INFO' },
            { id: 'PCK18', msg: 'Mesin STOP lebih dari 10 menit', time: '09:20', color: 'var(--aj-red)', status: 'CRITICAL' },
          ].map((alarm, idx) => (
            <div key={idx} className="alarm-item" style={{ padding: '12px 0' }}>
              <div className="alarm-dot" style={{ background: alarm.color }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 900, fontSize: '0.9rem' }}>{alarm.id} - PACKER</span>
                  <span style={{ fontWeight: 900, color: '#888', fontSize: '0.75rem' }}>{alarm.time}</span>
                </div>
                <p style={{ color: '#444', fontWeight: 700, fontSize: '0.8rem' }}>{alarm.msg}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="neo-button" style={{ width: '100%', background: 'var(--aj-red)', color: 'white', justifyContent: 'center', marginTop: '15px', fontSize: '0.75rem' }}>
          LIHAT SEMUA ALARM <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default OperatorPanel;
