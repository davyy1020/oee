import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { ArrowLeft, Clock, Target, Package, AlertTriangle, Activity, Timer, RefreshCw, ChevronRight } from 'lucide-react';
import NeoDropdown from './NeoDropdown';

// Generate OEE historical data (24 hours)
const generateHistorical = () => {
  const data = [];
  for (let h = 0; h < 24; h++) {
    data.push({
      time: `${h.toString().padStart(2, '0')}:00`,
      value: Math.floor(Math.random() * 35) + 50
    });
  }
  return data;
};

const downtimeData = [
  { name: 'Changeover', value: 31, duration: '00:25:10', color: '#FF6B6B' },
  { name: 'Filling Jam', value: 25, duration: '00:20:15', color: '#FFA94D' },
  { name: 'No Material', value: 19, duration: '00:15:30', color: '#51CF66' },
  { name: 'Sensor Error', value: 13, duration: '00:10:20', color: '#339AF0' },
  { name: 'Others', value: 12, duration: '00:09:15', color: '#845EF7' },
];

const stopHistory = [
  { no: 1, start: '08:15:10', end: '08:40:20', duration: '00:25:10', type: 'Changeover', desc: 'Pergantian roll kemasan', status: 'CONFIRMED' },
  { no: 2, start: '10:05:30', end: '10:25:45', duration: '00:20:15', type: 'Filling Jam', desc: 'Produk menumpuk di filling area', status: 'CONFIRMED' },
  { no: 3, start: '11:30:00', end: '11:45:30', duration: '00:15:30', type: 'No Material', desc: 'Material film habis', status: 'CONFIRMED' },
  { no: 4, start: '12:40:10', end: '12:50:30', duration: '00:10:20', type: 'Sensor Error', desc: 'Photocell tidak mendeteksi', status: 'CONFIRMED' },
  { no: 5, start: '13:20:00', end: '13:29:15', duration: '00:09:15', type: 'Others', desc: 'Operator adjustment', status: 'CONFIRMED' },
];

const alarmEvents = [
  { msg: 'Mesin STOP lebih dari 10 menit', time: '09:31:20', color: 'var(--aj-red)' },
  { msg: 'Speed di bawah target', time: '09:28:45', color: 'var(--aj-red)' },
  { msg: 'Idle lebih dari 5 menit', time: '09:25:10', color: 'var(--aj-yellow)' },
  { msg: 'Photocell tidak mendeteksi', time: '09:00:05', color: 'var(--aj-red)' },
  { msg: 'Mesin RUN', time: '09:15:30', color: 'var(--aj-blue)' },
];

const machineOptions = Array.from({ length: 21 }, (_, i) => {
  const id = `PCK${(i + 1).toString().padStart(2, '0')}`;
  return { value: id, label: `${id} - PACKER ${(i + 1).toString().padStart(2, '0')}` };
});

const MesinPage = ({ onBack }) => {
  const [selectedMachine, setSelectedMachine] = useState('PCK01');
  const machineNum = selectedMachine.replace('PCK', '');
  const historicalData = generateHistorical();

  const statuses = ['RUN', 'RUN', 'STOP', 'IDLE', 'RUN'];
  const currentStatus = statuses[parseInt(machineNum) % statuses.length];
  const statusColor = currentStatus === 'RUN' ? 'var(--aj-green)' : currentStatus === 'STOP' ? 'var(--aj-red)' : 'var(--aj-yellow)';

  return (
    <div className="mesin-page">
      {/* Breadcrumb */}
      <div className="mesin-breadcrumb">
        <span style={{ color: '#888' }}>Dashboard</span>
        <span style={{ margin: '0 8px' }}>&gt;</span>
        <span style={{ color: '#888' }}>Detail Mesin</span>
        <span style={{ margin: '0 8px' }}>&gt;</span>
        <span style={{ fontWeight: 900 }}>{selectedMachine} - PACKER {machineNum}</span>
        <button className="neo-button" style={{ marginLeft: 'auto', fontSize: '0.7rem', padding: '4px 12px' }} onClick={onBack}>
          <ArrowLeft size={14} /> KEMBALI KE DASHBOARD
        </button>
      </div>

      {/* Machine Selector Bar */}
      <div className="neo-box" style={{ padding: '8px 24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <h2 style={{ fontWeight: 900, fontSize: '1.2rem', margin: 0 }}>{selectedMachine} - PACKER {machineNum}</h2>
        <NeoDropdown options={machineOptions} value={selectedMachine} onChange={setSelectedMachine} width="260px" />
        <span className="status-badge" style={{ background: statusColor, border: '3px solid black', padding: '4px 16px', fontWeight: 900, fontSize: '0.8rem' }}>
          {currentStatus === 'RUN' ? 'RUNNING' : currentStatus}
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>STATUS SAAT INI</span>
          <span style={{ fontWeight: 900, fontSize: '1.1rem', color: currentStatus === 'RUN' ? '#0a0' : currentStatus === 'STOP' ? '#c00' : '#cc0' }}>● {currentStatus}</span>
        </div>
      </div>

      {/* KPI Cards + Production Stats */}
      <div className="mesin-kpi-row">
        {[
          { title: 'OEE', value: '72', target: '85', color: 'var(--aj-yellow)' },
          { title: 'Availability', value: '85', target: '90', color: 'var(--aj-blue)' },
          { title: 'Performance', value: '80', target: '90', color: 'var(--aj-green)' },
          { title: 'Quality', value: '95', target: '95', color: 'var(--aj-orange)' },
        ].map((kpi, idx) => (
          <div key={idx} className="neo-box kpi-card" style={{ background: kpi.color }}>
            <div className="kpi-title">{kpi.title.toUpperCase()}</div>
            <div className="kpi-value">{kpi.value}%</div>
            <div className="kpi-target">TARGET: {kpi.target}%</div>
          </div>
        ))}

        {/* Production Stats */}
        <div className="neo-box mesin-prod-stats">
          <div className="prod-stat"><Package size={14} /> <span>TOTAL PRODUKSI</span> <strong>12,450 pcs</strong></div>
          <div className="prod-stat"><Target size={14} /> <span>TARGET PRODUKSI</span> <strong>17,200 pcs</strong></div>
          <div className="prod-stat"><AlertTriangle size={14} /> <span>REJECT (PCS)</span> <strong>150 pcs</strong></div>
          <div className="prod-stat"><Clock size={14} /> <span>AVAILABILITY TIME</span> <strong>420 menit</strong></div>
          <div className="prod-stat"><Timer size={14} /> <span>DOWNTIME</span> <strong>01:20:30 jam</strong></div>
          <div className="prod-stat"><RefreshCw size={14} /> <span>LAST UPDATE</span> <strong>09:33:20</strong></div>
        </div>
      </div>

      {/* Middle Section: Charts + Detail Panel */}
      <div className="mesin-middle-grid">
        {/* OEE Historical Chart */}
        <div className="neo-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontWeight: 900, fontSize: '0.9rem' }}>OEE HISTORICAL (5 MAY 2026)</h3>
            <NeoDropdown
              options={[{ value: 'harian', label: 'HARIAN' }, { value: 'mingguan', label: 'MINGGUAN' }, { value: 'bulanan', label: 'BULANAN' }]}
              value="harian"
              onChange={() => {}}
              width="150px"
            />
          </div>
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 8, fontWeight: 700 }} interval={1} />
                <YAxis tick={{ fontSize: 10, fontWeight: 700 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ border: '3px solid black', fontWeight: 900 }} />
                <Line type="monotone" dataKey="value" stroke="var(--aj-red)" strokeWidth={3} dot={{ r: 4, fill: 'var(--aj-red)', stroke: 'black', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Downtime Pie Chart */}
        <div className="neo-box">
          <h3 style={{ fontWeight: 900, fontSize: '0.9rem', marginBottom: '10px' }}>DOWNTIME (HARI INI)</h3>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={downtimeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  dataKey="value"
                  stroke="black"
                  strokeWidth={2}
                  labelLine={false}
                >
                  {downtimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ border: '3px solid black', fontWeight: 900 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend below chart */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', justifyContent: 'center', marginTop: '4px' }}>
            {downtimeData.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', background: d.color, border: '1px solid black' }}></div>
                <span style={{ fontSize: '0.65rem', fontWeight: 700 }}>{d.name} {d.duration}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <span style={{ fontWeight: 900, fontSize: '0.8rem' }}>Total: </span>
            <span style={{ fontWeight: 900, fontSize: '1.2rem' }}>01:20:30</span>
          </div>
        </div>

        {/* Detail Mesin Real Time */}
        <div className="neo-box" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontWeight: 900, fontSize: '0.9rem', marginBottom: '16px', borderBottom: '3px solid black', paddingBottom: '8px' }}>DETAIL MESIN - REAL TIME</h3>

          <div className="detail-grid">
            <div className="detail-row"><span>STATUS</span><strong style={{ color: statusColor === 'var(--aj-green)' ? '#0a0' : '#c00' }}>{currentStatus}</strong></div>
            <div className="detail-row"><span>SPEED ACTUAL</span><strong>42 pcs/min</strong></div>
            <div className="detail-row"><span>SPEED TARGET</span><strong>50 pcs/min</strong></div>
            <div className="detail-row"><span>COUNTER PRODUKSI</span><strong>12,450 pcs</strong></div>
            <div className="detail-row"><span>COUNTER REJECT</span><strong>150 pcs</strong></div>
            <div className="detail-row"><span>OEE SAAT INI</span><strong style={{ color: 'var(--aj-green)', fontSize: '1.2rem' }}>72%</strong></div>
            <div className="detail-row"><span>AVAILABILITY TIME</span><strong>420 menit</strong></div>
            <div className="detail-row"><span>DOWNTIME SAAT INI</span><strong>00:00:00</strong></div>
          </div>

          <button className="neo-button" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center', background: 'var(--aj-yellow)', fontSize: '0.75rem' }}>
            LIHAT TREND DETAIL →
          </button>
        </div>
      </div>

      {/* Bottom Section: Event Table + Alarm */}
      <div className="mesin-bottom-grid">
        {/* Event / Stop History Table */}
        <div className="neo-box">
          <h3 style={{ fontWeight: 900, fontSize: '0.9rem', marginBottom: '16px' }}>EVENT / STOP HISTORY (5 MAY 2026)</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="neo-table">
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>START</th>
                  <th>END</th>
                  <th>DURASI</th>
                  <th>DOWNTIME TYPE</th>
                  <th>DESKRIPSI</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {stopHistory.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.start}</td>
                    <td>{row.end}</td>
                    <td>{row.duration}</td>
                    <td>{row.type}</td>
                    <td>{row.desc}</td>
                    <td><span className="confirmed-badge">{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button className="neo-button" style={{ margin: '0 auto', fontSize: '0.7rem' }}>Lihat Semua History →</button>
          </div>
        </div>

        {/* Event / Alarm Mesin moved to Sidebar */}
      </div>
    </div>
  );
};

export default MesinPage;
