import React, { useState } from 'react';
import { 
  Save, RefreshCw, Calendar, Clock, Edit3, AlertCircle, 
  CheckCircle2, BarChart2, ClipboardList, Timer, CheckSquare, 
  Square, Info, ChevronRight, FileText
} from 'lucide-react';

const InputOperatorPage = ({ onBack }) => {
  const [selectedMachine, setSelectedMachine] = useState('PCK01');
  const [selectedShift, setSelectedShift] = useState('pagi');
  const [rejectReason, setRejectReason] = useState('Film Sobek');
  
  const historyData = [
    { time: '09:15:20', machine: 'PCK01', type: 'Produksi & Reject', user: 'Operator 1', typeColor: 'var(--aj-green)' },
    { time: '08:30:45', machine: 'PCK01', type: 'Downtime', user: 'Operator 1', typeColor: 'var(--aj-red)' },
    { time: '08:00:10', machine: 'PCK02', type: 'Produksi & Reject', user: 'Operator 2', typeColor: 'var(--aj-green)' },
    { time: '07:30:05', machine: 'PCK03', type: 'Downtime', user: 'Operator 3', typeColor: 'var(--aj-red)' },
    { time: '07:00:12', machine: 'PCK01', type: 'Produksi & Reject', user: 'Operator 1', typeColor: 'var(--aj-green)' },
  ];

  return (
    <div className="input-operator-page">
      {/* Breadcrumb & Header Area */}
      <div className="input-breadcrumb">
        <span style={{ color: '#888', cursor: 'pointer' }} onClick={onBack}>Dashboard</span>
        <span style={{ margin: '0 8px' }}>&gt;</span>
        <span style={{ fontWeight: 900 }}>Input Operator</span>
      </div>

      <div className="input-header-row">
        <div>
          <h1 style={{ fontWeight: 900, fontSize: '1.8rem', textTransform: 'uppercase', lineHeight: 1 }}>Input Operator</h1>
          <p style={{ fontWeight: 700, color: '#555', fontSize: '0.9rem', marginTop: '4px' }}>Masukkan data produksi, reject, dan availability secara manual</p>
        </div>
        <div className="input-header-actions">
          <button className="neo-btn neo-btn-green">
            <Save size={16} /> SIMPAN DATA
          </button>
          <button className="neo-btn neo-btn-white">
            <RefreshCw size={16} /> RESET FORM
          </button>
        </div>
      </div>

      <div className="input-main-layout">
        {/* Left Column: Form Areas */}
        <div className="input-form-col">
          
          <div className="form-top-grid">
            {/* Block 1: Pilih Mesin & Shift */}
            <div className="neo-box form-block">
              <div className="block-title">
                <span className="step-badge">1</span> PILIH MESIN DAN SHIFT
              </div>
              
              <div className="form-group">
                <label>PILIH MESIN</label>
                <select className="neo-input" value={selectedMachine} onChange={(e) => setSelectedMachine(e.target.value)}>
                  <option value="PCK01">PCK01 - PACKER 01</option>
                  <option value="PCK02">PCK02 - PACKER 02</option>
                  <option value="PCK03">PCK03 - PACKER 03</option>
                </select>
              </div>

              <div className="form-group">
                <label>PILIH SHIFT</label>
                <select className="neo-input" value={selectedShift} onChange={(e) => setSelectedShift(e.target.value)}>
                  <option value="pagi">PAGI (06:00 - 14:00)</option>
                  <option value="sore">SORE (14:00 - 22:00)</option>
                  <option value="malam">MALAM (22:00 - 06:00)</option>
                </select>
              </div>

              <div className="form-group">
                <label>TANGGAL</label>
                <div className="neo-input-icon-wrapper">
                  <Calendar size={16} className="input-icon" />
                  <input type="text" className="neo-input has-icon" value="05/05/2026" readOnly />
                </div>
              </div>

              <div className="shift-info-box">
                <div className="shift-info-header">INFORMASI SHIFT</div>
                <div className="shift-info-body">
                  <div className="info-row"><span>MULAI SHIFT</span><strong>06:00</strong></div>
                  <div className="info-row"><span>SELESAI SHIFT</span><strong>14:00</strong></div>
                  <div className="info-row"><span>DURASI SHIFT</span><strong>8 Jam</strong></div>
                  <div className="info-row"><span>WAKTU SAAT INI</span><strong>09:33:45</strong></div>
                </div>
              </div>
            </div>

            {/* Block 2: Input Produksi & Reject */}
            <div className="neo-box form-block">
              <div className="block-title">
                <span className="step-badge" style={{background: 'var(--aj-yellow)'}}>2</span> INPUT PRODUKSI DAN REJECT
              </div>

              <div className="input-row-2">
                <div className="form-group">
                  <label>TOTAL PRODUKSI (PCS)</label>
                  <div className="neo-input-addon">
                    <input type="number" className="neo-input" defaultValue="12450" />
                    <span className="addon">pcs</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>TARGET PRODUKSI (PCS)</label>
                  <div className="neo-input-addon">
                    <input type="number" className="neo-input" defaultValue="17200" readOnly />
                    <span className="addon">pcs</span>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ width: '50%', paddingRight: '10px' }}>
                <label>REJECT (PCS)</label>
                <div className="neo-input-addon">
                  <input type="number" className="neo-input" defaultValue="150" />
                  <span className="addon">pcs</span>
                </div>
              </div>

              <div className="form-group">
                <label>ALASAN REJECT <span style={{color: '#888', fontWeight: 700}}>(PILIH SALAH SATU)</span></label>
                <div className="reject-reason-grid">
                  {['Film Sobek', 'Seal Tidak Sempurna', 'Produk Bocor', 'Lainnya'].map(reason => (
                    <div 
                      key={reason} 
                      className={`reject-btn ${rejectReason === reason ? 'active' : ''}`}
                      onClick={() => setRejectReason(reason)}
                    >
                      {rejectReason === reason ? <CheckSquare size={16} /> : <Square size={16} />}
                      {reason}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>KETERANGAN <span style={{color: '#888', fontWeight: 700}}>(OPSIONAL)</span></label>
                <textarea className="neo-input" rows="2" placeholder="Contoh: Film sobek karena tekanan kurang stabil"></textarea>
              </div>
            </div>
          </div>

          {/* Block 3: Input Availability Time (Downtime) */}
          <div className="neo-box form-block">
            <div className="block-title">
              <span className="step-badge" style={{background: 'var(--aj-yellow)'}}>3</span> INPUT AVAILABILITY TIME (DOWNTIME)
            </div>
            
            <div className="input-row-2">
              <div className="form-group">
                <label>DOWNTIME (MENIT)</label>
                <div className="neo-input-addon">
                  <input type="number" className="neo-input" defaultValue="20" />
                  <span className="addon">menit</span>
                </div>
              </div>
              <div className="form-group">
                <label>TIPE DOWNTIME</label>
                <select className="neo-input">
                  <option>Filling Jam</option>
                  <option>Changeover</option>
                  <option>No Material</option>
                  <option>Lainnya</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>DESKRIPSI DOWNTIME</label>
              <textarea className="neo-input" rows="2" defaultValue="Material tidak mengalir akibat filling area tersumbat"></textarea>
            </div>

            <div className="input-row-2" style={{ marginTop: '10px' }}>
              <div className="form-group row-align">
                <label style={{ marginRight: '10px', marginBottom: 0, width: '180px' }}>WAKTU MULAI DOWNTIME</label>
                <div className="neo-input-icon-wrapper" style={{ flex: 1 }}>
                  <input type="text" className="neo-input has-icon-right" defaultValue="09:10" />
                  <Clock size={16} className="input-icon-right" />
                </div>
              </div>
              <div className="form-group row-align">
                <label style={{ marginRight: '10px', marginBottom: 0, width: '180px' }}>WAKTU SELESAI DOWNTIME</label>
                <div className="neo-input-icon-wrapper" style={{ flex: 1 }}>
                  <input type="text" className="neo-input has-icon-right" defaultValue="09:30" />
                  <Clock size={16} className="input-icon-right" />
                </div>
              </div>
            </div>
          </div>

          {/* Block 4: Catatan Tambahan */}
          <div className="neo-box form-block">
            <div className="block-title">
              <span className="step-badge" style={{background: 'var(--aj-yellow)'}}>4</span> CATATAN TAMBAHAN (OPSIONAL)
            </div>
            <textarea className="neo-input" rows="3" placeholder="Masukkan catatan tambahan jika diperlukan..."></textarea>
          </div>

        </div>

        {/* Right Column: Info & History */}
        <div className="input-info-col">
          
          {/* Panduan Input */}
          <div className="neo-box info-box">
            <div className="block-title" style={{ fontSize: '1rem', borderBottom: 'none', paddingBottom: 0, marginBottom: '15px' }}>
              PANDUAN INPUT
            </div>
            <div className="guide-list">
              <div className="guide-item">
                <div className="guide-icon" style={{ background: 'var(--aj-yellow)' }}><Info size={14} /></div>
                <p>Input data produksi minimal setiap 1 jam atau saat terjadi downtime.</p>
              </div>
              <div className="guide-item">
                <div className="guide-icon" style={{ background: 'var(--aj-blue)', color: 'white' }}><FileText size={14} /></div>
                <p>Pastikan data reject dan downtime diisi dengan benar.</p>
              </div>
              <div className="guide-item">
                <div className="guide-icon" style={{ background: 'var(--aj-green)' }}><CheckCircle2 size={14} /></div>
                <p>Data yang sudah disimpan akan langsung terupdate ke sistem.</p>
              </div>
            </div>
          </div>

          {/* Riwayat Input Terbaru */}
          <div className="neo-box info-box" style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div className="block-title" style={{ fontSize: '1rem', borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                RIWAYAT INPUT TERBARU
              </div>
              <button className="neo-btn-sm neo-btn-white" style={{ fontSize: '0.7rem' }}>LIHAT SEMUA</button>
            </div>
            
            <table className="neo-table-sm" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>WAKTU INPUT</th>
                  <th>MESIN</th>
                  <th>JENIS INPUT</th>
                  <th>OLEH</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.time}</td>
                    <td>{row.machine}</td>
                    <td style={{ color: row.typeColor, fontWeight: 900 }}>{row.type}</td>
                    <td style={{ color: 'var(--aj-green)' }}>{row.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ringkasan Input Hari Ini */}
          <div className="neo-box info-box">
            <div className="block-title" style={{ fontSize: '0.9rem', borderBottom: 'none', paddingBottom: 0, marginBottom: '15px' }}>
              RINGKASAN INPUT HARI INI (5 MAY 2026)
            </div>
            
            <div className="summary-cards-grid">
              <div className="summary-card">
                <div className="icon-circle" style={{ background: 'var(--aj-blue)', color: 'white' }}><BarChart2 size={16} /></div>
                <div className="summary-label">TOTAL PRODUKSI</div>
                <div className="summary-value" style={{ color: 'var(--aj-blue)' }}>128,450</div>
                <div className="summary-unit">pcs</div>
              </div>
              
              <div className="summary-card">
                <div className="icon-circle" style={{ background: 'var(--aj-green)', color: 'white' }}><CheckCircle2 size={16} /></div>
                <div className="summary-label">TOTAL REJECT</div>
                <div className="summary-value" style={{ color: 'var(--aj-green)' }}>1,250</div>
                <div className="summary-unit">pcs</div>
              </div>
              
              <div className="summary-card">
                <div className="icon-circle" style={{ background: 'var(--aj-orange)', color: 'white' }}><Timer size={16} /></div>
                <div className="summary-label">TOTAL DOWNTIME</div>
                <div className="summary-value" style={{ color: 'var(--aj-red)' }}>420</div>
                <div className="summary-unit">menit</div>
              </div>
              
              <div className="summary-card">
                <div className="icon-circle" style={{ background: '#845EF7', color: 'white' }}><ClipboardList size={16} /></div>
                <div className="summary-label">TOTAL INPUT</div>
                <div className="summary-value" style={{ color: '#845EF7' }}>18</div>
                <div className="summary-unit">kali</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InputOperatorPage;
