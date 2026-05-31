import React from 'react';

const KPICard = ({ title, value, target, color }) => {
  return (
    <div className="neo-box kpi-card" style={{ background: color }}>
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value}%</div>
      <div className="kpi-target">TARGET: {target}%</div>
    </div>
  );
};

export default KPICard;
