import React from 'react';

const MachineCard = ({ id, status, percentage, onClick }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'RUN': return 'var(--aj-green)';
      case 'STOP': return 'var(--aj-red)';
      case 'IDLE': return 'var(--aj-yellow)';
      default: return 'var(--aj-white)';
    }
  };

  return (
    <div className="neo-box machine-card" style={{ background: getStatusColor(), cursor: 'pointer' }} onClick={onClick}>
      <div className="machine-id">{id}</div>
      <div className="status-indicator">
        <div className="dot" style={{ background: 'black' }}></div>
        <span>{status}</span>
      </div>
      <div className="percentage">{percentage}%</div>
    </div>
  );
};

const MachineGrid = ({ onMachineClick }) => {
  const machines = Array.from({ length: 21 }, (_, i) => ({
    id: `PCK${(i + 1).toString().padStart(2, '0')}`,
    status: ['RUN', 'RUN', 'STOP', 'IDLE', 'RUN'][Math.floor(Math.random() * 5)],
    percentage: Math.floor(Math.random() * 40) + 50
  }));

  return (
    <section className="neo-box machine-status-section">
      <div className="machine-grid-header">
        <h2>STATUS MESIN (21 MESIN)</h2>
        <button className="neo-button" style={{ fontSize: '0.7rem' }} onClick={onMachineClick}>Lihat Semua Mesin &rarr;</button>
      </div>
      <div className="machine-grid">
        {machines.map((m) => (
          <MachineCard key={m.id} {...m} onClick={onMachineClick} />
        ))}
      </div>
    </section>
  );
};

export default MachineGrid;
