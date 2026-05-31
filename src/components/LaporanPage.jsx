import React, { useState } from 'react';
import { 
  FileSpreadsheet, FileIcon, Printer, Calendar, Search, RefreshCw, 
  Package, XCircle, Clock, ChevronRight 
} from 'lucide-react';
import NeoDropdown from './NeoDropdown';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const trendData = [
  { name: '01/05', oee: 68 },
  { name: '02/05', oee: 71 },
  { name: '03/05', oee: 75 },
  { name: '04/05', oee: 74 },
  { name: '05/05', oee: 72 },
  { name: '06/05', oee: 76 },
  { name: '07/05', oee: 74 },
];

const downtimeData = [
  { name: 'Changeover', value: 30, time: '06:35:20', color: '#FF9F43' },
  { name: 'Filling Jam', value: 24, time: '05:21:15', color: '#4DABF7' },
  { name: 'No Material', value: 21, time: '04:30:10', color: '#FFD43B' },
  { name: 'Sensor Error', value: 15, time: '03:15:30', color: '#FA5252' },
  { name: 'Others', value: 10, time: '02:03:15', color: '#CED4DA' },
];

const tableData = [
  { no: 1, id: 'PCK01 - PACKER 01', prod: '124,450', oee: 72, avail: 85, perf: 80, qual: 95, reject: '1,250', dt: '04:10:30' },
  { no: 2, id: 'PCK02 - PACKER 02', prod: '98,230', oee: 65, avail: 78, perf: 75, qual: 94, reject: '980', dt: '05:20:10' },
  { no: 3, id: 'PCK03 - PACKER 03', prod: '103,450', oee: 74, avail: 88, perf: 82, qual: 96, reject: '890', dt: '03:45:15' },
  { no: 4, id: 'PCK04 - PACKER 04', prod: '80,120', oee: 58, avail: 70, perf: 65, qual: 92, reject: '1,150', dt: '06:30:45' },
  { no: 5, id: 'PCK05 - PACKER 05', prod: '96,100', oee: 69, avail: 83, perf: 77, qual: 95, reject: '920', dt: '03:58:40' },
];

const top5Data = [
  { no: 1, id: 'PCK04 - PACKER 04', oee: 58, color: 'var(--aj-red)' },
  { no: 2, id: 'PCK02 - PACKER 02', oee: 65, color: 'var(--aj-red)' },
  { no: 3, id: 'PCK05 - PACKER 05', oee: 69, color: 'var(--aj-orange)' },
  { no: 4, id: 'PCK01 - PACKER 01', oee: 72, color: 'var(--aj-yellow)' },
  { no: 5, id: 'PCK03 - PACKER 03', oee: 74, color: 'var(--aj-green)' },
];

const machineOptions = [
  { value: 'SEMUA MESIN', label: 'SEMUA MESIN' },
  ...Array.from({ length: 21 }, (_, i) => {
    const id = `PCK${(i + 1).toString().padStart(2, '0')}`;
    return { value: id, label: `${id} - PACKER ${(i + 1).toString().padStart(2, '0')}` };
  })
];

const shiftOptions = [
  { value: 'SEMUA SHIFT', label: 'SEMUA SHIFT' },
  { value: 'SHIFT 1', label: 'SHIFT 1 (06:00 - 14:00)' },
  { value: 'SHIFT 2', label: 'SHIFT 2 (14:00 - 22:00)' },
  { value: 'SHIFT 3', label: 'SHIFT 3 (22:00 - 06:00)' },
];

const groupOptions = [
  { value: 'SEMUA', label: 'SEMUA GROUP' },
  { value: 'GROUP A', label: 'GROUP A' },
  { value: 'GROUP B', label: 'GROUP B' },
  { value: 'GROUP C', label: 'GROUP C' },
];

const LaporanPage = ({ onBack }) => {
  const [selectedMachine, setSelectedMachine] = useState('SEMUA MESIN');
  const [selectedShift, setSelectedShift] = useState('SEMUA SHIFT');
  const [selectedGroup, setSelectedGroup] = useState('SEMUA');
  const [startDate, setStartDate] = useState('2026-05-01');
  const [endDate, setEndDate] = useState('2026-05-05');

  return (
    <div className="input-operator-page">
      {/* Breadcrumb & Header Area */}
      <div className="input-breadcrumb">
        <span style={{ color: '#888', cursor: 'pointer' }} onClick={onBack}>Dashboard</span>
        <span style={{ margin: '0 8px' }}>&gt;</span>
        <span style={{ fontWeight: 900 }}>Laporan</span>
      </div>

      <div className="input-header-row">
        <div>
          <h1 style={{ fontWeight: 900, fontSize: '1.8rem', textTransform: 'uppercase', lineHeight: 1 }}>Laporan OEE</h1>
          <p style={{ fontWeight: 700, color: '#555', fontSize: '0.9rem', marginTop: '4px' }}>Pilih periode dan filter untuk melihat laporan OEE</p>
        </div>
        <div className="input-header-actions">
          <button className="neo-btn neo-btn-green" style={{ padding: '8px 16px' }}>
            <FileSpreadsheet size={16} /> EXPORT EXCEL
          </button>
          <button className="neo-btn" style={{ background: 'var(--aj-red)', color: 'white', padding: '8px 16px' }}>
            <FileIcon size={16} /> EXPORT PDF
          </button>
          <button className="neo-btn neo-btn-white" style={{ padding: '8px 16px' }}>
            <Printer size={16} /> CETAK
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="neo-box filter-bar-box">
        <div className="filter-group-wrap" style={{ flex: 1.5 }}>
          <label>PERIODE</label>
          <div className="filter-date-range">
            <input 
              type="date" 
              className="neo-input" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onClick={(e) => { try { e.target.showPicker() } catch(err) {} }}
              style={{ width: '145px', cursor: 'pointer' }} 
            />
            <span style={{ fontWeight: 900, margin: '0 10px' }}>s/d</span>
            <input 
              type="date" 
              className="neo-input" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              onClick={(e) => { try { e.target.showPicker() } catch(err) {} }}
              style={{ width: '145px', cursor: 'pointer' }} 
            />
          </div>
        </div>
        
        <div className="filter-group-wrap" style={{ flex: 1, position: 'relative', zIndex: 10 }}>
          <label>MESIN</label>
          <NeoDropdown options={machineOptions} value={selectedMachine} onChange={setSelectedMachine} width="100%" />
        </div>
        
        <div className="filter-group-wrap" style={{ flex: 1, position: 'relative', zIndex: 9 }}>
          <label>SHIFT</label>
          <NeoDropdown options={shiftOptions} value={selectedShift} onChange={setSelectedShift} width="100%" />
        </div>
        
        <div className="filter-group-wrap" style={{ flex: 1, position: 'relative', zIndex: 8 }}>
          <label>GROUP MESIN</label>
          <NeoDropdown options={groupOptions} value={selectedGroup} onChange={setSelectedGroup} width="100%" />
        </div>
        
        <div className="filter-actions">
          <button className="neo-btn" style={{ background: 'var(--aj-yellow)', padding: '5px 15px', fontSize: '0.8rem' }}>
            <Search size={14} /> TAMPILKAN
          </button>
          <button className="neo-btn neo-btn-white" style={{ padding: '5px 15px', fontSize: '0.8rem' }}>
            <RefreshCw size={14} /> RESET
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="laporan-kpi-grid">
        <div className="neo-box kpi-box" style={{ background: 'var(--aj-yellow)' }}>
          <div className="kpi-label">RATA-RATA OEE</div>
          <div className="kpi-val">72%</div>
          <div className="kpi-tgt">Target : 85%</div>
        </div>
        <div className="neo-box kpi-box" style={{ background: 'var(--aj-blue)' }}>
          <div className="kpi-label">RATA-RATA AVAILABILITY</div>
          <div className="kpi-val">85%</div>
          <div className="kpi-tgt">Target : 90%</div>
        </div>
        <div className="neo-box kpi-box" style={{ background: 'var(--aj-green)' }}>
          <div className="kpi-label">RATA-RATA PERFORMANCE</div>
          <div className="kpi-val">80%</div>
          <div className="kpi-tgt">Target : 90%</div>
        </div>
        <div className="neo-box kpi-box" style={{ background: 'var(--aj-orange)' }}>
          <div className="kpi-label">RATA-RATA QUALITY</div>
          <div className="kpi-val">95%</div>
          <div className="kpi-tgt">Target : 95%</div>
        </div>
        
        <div className="neo-box kpi-box-white">
          <div className="kpi-label-top">TOTAL PRODUKSI</div>
          <div className="kpi-val-row">
            <Package size={28} />
            <div className="kpi-num">642,350 <span className="unit">pcs</span></div>
          </div>
        </div>
        <div className="neo-box kpi-box-white">
          <div className="kpi-label-top">TOTAL REJECT</div>
          <div className="kpi-val-row">
            <XCircle size={28} color="var(--aj-red)" />
            <div className="kpi-num">6,430 <span className="unit">pcs</span></div>
          </div>
        </div>
        <div className="neo-box kpi-box-white">
          <div className="kpi-label-top">TOTAL DOWNTIME</div>
          <div className="kpi-val-row">
            <Clock size={28} />
            <div className="kpi-num">21:45:30 <span className="unit">jam</span></div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="laporan-main-grid">
        {/* Left Column */}
        <div className="laporan-left-col">
          
          <div className="laporan-chart-row">
            <div className="neo-box" style={{ flex: 1.2, padding: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <h3 className="block-title" style={{ border: 'none', padding: 0, margin: 0, fontSize: '1rem' }}>TREND OEE</h3>
                <select className="neo-input" style={{ width: 'auto', padding: '4px 10px', fontSize: '0.8rem' }}><option>HARIAN</option></select>
              </div>
              <div style={{ height: '220px', width: '100%' }}>
                <ResponsiveContainer>
                  <LineChart data={trendData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(val) => `${val}%`} />
                    <Line type="monotone" dataKey="oee" stroke="var(--aj-red)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'var(--aj-red)' }} label={{ position: 'top', fill: '#333', fontSize: 10, fontWeight: 900, formatter: (val) => `${val}%` }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="neo-box" style={{ flex: 1, padding: '15px' }}>
              <h3 className="block-title" style={{ border: 'none', padding: 0, margin: 0, fontSize: '1rem', marginBottom: '10px' }}>DISTRIBUSI DOWNTIME</h3>
              <div style={{ display: 'flex', alignItems: 'center', height: '220px' }}>
                <div style={{ width: '40%', height: '100%', position: 'relative' }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={downtimeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={55}
                        stroke="var(--aj-black)"
                        strokeWidth={2}
                        dataKey="value"
                      >
                        {downtimeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.6rem', fontWeight: 900 }}>Total</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 900 }}>21:45:30</div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 700 }}>jam</div>
                  </div>
                </div>
                <div style={{ width: '60%', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '5px' }}>
                  {downtimeData.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: d.color, border: '1px solid black', flexShrink: 0 }}></div>
                      <div style={{ fontSize: '0.65rem', lineHeight: '1.2' }}>
                        <div style={{ fontWeight: 900 }}>{d.name}</div>
                        <div style={{ fontWeight: 700, color: '#666' }}>{d.time} ({d.value}%)</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="neo-box" style={{ padding: '15px' }}>
            <h3 className="block-title" style={{ border: 'none', padding: 0, margin: 0, fontSize: '1rem', marginBottom: '15px' }}>OEE PER MESIN</h3>
            <table className="neo-table-sm" style={{ width: '100%', textAlign: 'center' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>NO.</th>
                  <th style={{ textAlign: 'left' }}>MESIN</th>
                  <th style={{ textAlign: 'center' }}>TOTAL PRODUKSI (PCS)</th>
                  <th style={{ textAlign: 'center' }}>OEE (%)</th>
                  <th style={{ textAlign: 'center' }}>AVAILABILITY (%)</th>
                  <th style={{ textAlign: 'center' }}>PERFORMANCE (%)</th>
                  <th style={{ textAlign: 'center' }}>QUALITY (%)</th>
                  <th style={{ textAlign: 'center' }}>REJECT (PCS)</th>
                  <th style={{ textAlign: 'center' }}>DOWNTIME (JAM)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.no}>
                    <td style={{ fontWeight: 900 }}>{row.no}</td>
                    <td style={{ textAlign: 'left', fontWeight: 900 }}>{row.id}</td>
                    <td>{row.prod}</td>
                    <td>{row.oee}</td>
                    <td>{row.avail}</td>
                    <td>{row.perf}</td>
                    <td>{row.qual}</td>
                    <td>{row.reject}</td>
                    <td>{row.dt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <button className="neo-btn-sm neo-btn-white" style={{ padding: '6px 16px' }}>LIHAT SEMUA MESIN &rarr;</button>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="laporan-right-col">
          
          <div className="neo-box info-box" style={{ padding: '15px' }}>
            <div className="block-title" style={{ fontSize: '0.9rem', marginBottom: '10px', paddingBottom: '8px' }}>
              RINGKASAN PERIODE
            </div>
            <div className="summary-list">
              <div className="sum-row"><span>Periode</span><strong>: 01/05/2026 s/d 05/05/2026</strong></div>
              <div className="sum-row"><span>Shift</span><strong>: Semua Shift</strong></div>
              <div className="sum-row"><span>Jumlah Mesin</span><strong>: 21 Mesin</strong></div>
              <div className="sum-row"><span>Total Produksi</span><strong>: 642,350 pcs</strong></div>
              <div className="sum-row"><span>Total Reject</span><strong>: 6,430 pcs</strong></div>
              <div className="sum-row"><span>Total Downtime</span><strong>: 21:45:30 jam</strong></div>
              <div className="sum-row"><span>Rata-rata OEE</span><strong>: 72%</strong></div>
            </div>
          </div>

          <div className="neo-box info-box" style={{ padding: '15px' }}>
            <div className="block-title" style={{ fontSize: '0.9rem', marginBottom: '10px', paddingBottom: '8px' }}>
              PERBANDINGAN OEE <span style={{fontSize: '0.7rem', color: '#666'}}>(PERIODE SEBELUMNYA)</span>
            </div>
            <div className="summary-list">
              <div className="sum-row"><span>Periode Sebelumnya</span><strong>: 26/04/2026 s/d 30/04/2026</strong></div>
              <div className="sum-row"><span>Rata-rata OEE Sebelumnya</span><strong>: 70%</strong></div>
              <div className="sum-row"><span>Rata-rata OEE Sekarang</span><strong>: 72%</strong></div>
              <div className="sum-row"><span>Perubahan</span><strong style={{ color: 'var(--aj-green)' }}>+ 2%</strong></div>
            </div>
          </div>

          <div className="neo-box info-box" style={{ padding: '15px', flex: 1 }}>
            <div className="block-title" style={{ fontSize: '0.9rem', marginBottom: '15px', paddingBottom: '8px' }}>
              TOP 5 MESIN - OEE TERENDAH
            </div>
            <div className="top5-list">
              {top5Data.map(m => (
                <div key={m.no} className="top5-item">
                  <div className="top5-header">
                    <span style={{ fontWeight: 900, fontSize: '0.8rem' }}>{m.no} &nbsp;&nbsp; {m.id}</span>
                    <span style={{ fontWeight: 900, fontSize: '0.8rem' }}>{m.oee}%</span>
                  </div>
                  <div className="top5-bar-bg">
                    <div className="top5-bar-fill" style={{ width: `${m.oee}%`, background: m.color }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '20px' }}>
              <button className="neo-btn-sm neo-btn-white" style={{ padding: '6px 16px' }}>LIHAT SEMUA ANALISIS &rarr;</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LaporanPage;
