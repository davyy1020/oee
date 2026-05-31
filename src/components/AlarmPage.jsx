import React, { useState } from 'react';
import { 
  Bell, BellOff, Info, AlertTriangle, Activity, 
  RefreshCw, History, Calendar, Search, 
  ChevronRight, ArrowRight, Filter, X
} from 'lucide-react';
import NeoDropdown from './NeoDropdown';

const activeAlarmsData = [
  { waktu: '09:31:20', tingkat: 'ALARM', mesin: 'PCK04 - PACKER 04', tipe: 'Stop Machine', pesan: 'Mesin STOP lebih dari 10 menit', durasi: '00:12:25', status: 'UNACK' },
  { waktu: '09:28:45', tingkat: 'ALARM', mesin: 'PCK09 - PACKER 09', tipe: 'Speed Low', pesan: 'Speed di bawah target', durasi: '00:15:00', status: 'UNACK' },
  { waktu: '09:20:10', tingkat: 'ALARM', mesin: 'PCK18 - PACKER 18', tipe: 'Stop Machine', pesan: 'Mesin STOP lebih dari 10 menit', durasi: '00:23:35', status: 'UNACK' },
  { waktu: '09:15:30', tingkat: 'WARNING', mesin: 'PCK06 - PACKER 06', tipe: 'Idle Time', pesan: 'Idle lebih dari 5 menit', durasi: '00:08:05', status: 'UNACK' },
];

const lastAlarmsData = [
  { waktu: '08:55:05', tingkat: 'ALARM', mesin: 'PCK11 - PACKER 11', tipe: 'Sensor Error', pesan: 'Photocell tidak mendeteksi', durasi: '00:03:45', status: 'ACK', oleh: 'Operator 2' },
  { waktu: '08:40:12', tingkat: 'WARNING', mesin: 'PCK02 - PACKER 02', tipe: 'Speed Low', pesan: 'Speed mendekati batas bawah', durasi: '00:05:20', status: 'ACK', oleh: 'Operator 1' },
  { waktu: '08:15:30', tingkat: 'INFO', mesin: 'PCK01 - PACKER 01', tipe: 'Start Machine', pesan: 'Mesin RUN', durasi: '-', status: 'ACK', oleh: 'System' },
  { waktu: '07:50:10', tingkat: 'WARNING', mesin: 'PCK15 - PACKER 15', tipe: 'No Material', pesan: 'Material di hopper menipis', durasi: '00:04:12', status: 'ACK', oleh: 'Operator 3' },
  { waktu: '07:32:45', tingkat: 'ALARM', mesin: 'PCK07 - PACKER 07', tipe: 'Stop Machine', pesan: 'Emergency Stop ditekan', durasi: '00:01:55', status: 'ACK', oleh: 'Operator 1' },
];


const machineAlarmsData = [
  { mesin: 'PCK04 - PACKER 04', alarm: 1, warning: 0, total: 1 },
  { mesin: 'PCK09 - PACKER 09', alarm: 1, warning: 0, total: 1 },
  { mesin: 'PCK18 - PACKER 18', alarm: 1, warning: 0, total: 1 },
  { mesin: 'PCK06 - PACKER 06', alarm: 0, warning: 1, total: 1 },
];

const machineOptions = [
  { value: 'SEMUA MESIN', label: 'Semua Mesin' },
  ...Array.from({ length: 21 }, (_, i) => {
    const id = `PCK${(i + 1).toString().padStart(2, '0')}`;
    return { value: id, label: `${id} - PACKER ${(i + 1).toString().padStart(2, '0')}` };
  })
];

const statusOptions = [
  { value: 'SEMUA', label: 'Semua Status' },
  { value: 'UNACK', label: 'Unacknowledged' },
  { value: 'ACK', label: 'Acknowledged' },
];

const severityOptions = [
  { value: 'SEMUA', label: 'Semua Tingkat' },
  { value: 'ALARM', label: 'Alarm' },
  { value: 'WARNING', label: 'Warning' },
  { value: 'INFO', label: 'Info' },
];

const typeOptions = [
  { value: 'SEMUA', label: 'Semua Tipe' },
  { value: 'STOP', label: 'Stop Machine' },
  { value: 'SPEED', label: 'Speed Low' },
  { value: 'IDLE', label: 'Idle Time' },
];

const AlarmPage = ({ onBack }) => {
  const [selectedStatus, setSelectedStatus] = useState('SEMUA');
  const [selectedSeverity, setSelectedSeverity] = useState('SEMUA');
  const [selectedMachine, setSelectedMachine] = useState('SEMUA MESIN');
  const [selectedType, setSelectedType] = useState('SEMUA');

  return (
    <div className="input-operator-page">
      {/* Breadcrumb */}
      <div className="input-breadcrumb">
        <span style={{ color: '#888', cursor: 'pointer' }} onClick={onBack}>Dashboard</span>
        <span style={{ margin: '0 8px' }}>&gt;</span>
        <span style={{ fontWeight: 900 }}>Alarm</span>
      </div>

      {/* Header Area */}
      <div className="input-header-row">
        <div>
          <h1 style={{ fontWeight: 900, fontSize: '1.8rem', textTransform: 'uppercase', lineHeight: 1 }}>Alarm & Notifikasi</h1>
          <p style={{ fontWeight: 700, color: '#555', fontSize: '0.9rem', marginTop: '4px' }}>Monitor semua alarm dan notifikasi dari mesin</p>
        </div>
        <div className="input-header-actions">
          <button className="neo-btn neo-btn-white" style={{ padding: '8px 16px' }}>
            <RefreshCw size={16} /> REFRESH
          </button>
          <button className="neo-btn neo-btn-white" style={{ padding: '8px 16px' }}>
            <History size={16} /> HISTORY ALARM
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="laporan-kpi-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
        <div className="neo-box kpi-box-white" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ 
              background: 'var(--aj-red)', 
              color: 'white', 
              width: '45px', 
              height: '45px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px solid black'
            }}>
              <Bell size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#555' }}>ALARM AKTIF</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>4</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700 }}>Perlu perhatian</div>
            </div>
          </div>
        </div>

        <div className="neo-box kpi-box-white">
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ 
              background: 'var(--aj-orange)', 
              color: 'white', 
              width: '45px', 
              height: '45px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px solid black'
            }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#555' }}>PERINGATAN</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>6</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700 }}>Waspada</div>
            </div>
          </div>
        </div>

        <div className="neo-box kpi-box-white">
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ 
              background: 'var(--aj-blue)', 
              color: 'white', 
              width: '45px', 
              height: '45px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px solid black'
            }}>
              <Info size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#555' }}>INFORMASI</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>12</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700 }}>Informasi</div>
            </div>
          </div>
        </div>

        <div className="neo-box kpi-box-white">
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ 
              background: 'var(--aj-green)', 
              color: 'white', 
              width: '45px', 
              height: '45px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px solid black'
            }}>
              <Activity size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#555' }}>TOTAL HARI INI</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>22</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700 }}>Semua event</div>
            </div>
          </div>
        </div>

        <div className="neo-box kpi-box-white">
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ 
              background: '#555', 
              color: 'white', 
              width: '45px', 
              height: '45px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px solid black'
            }}>
              <BellOff size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#555' }}>ALARM TIDAK DI-ACK</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>4</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700 }}>Menunggu ack</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="laporan-main-grid" style={{ gridTemplateColumns: '1fr 320px' }}>
        
        {/* Tables Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Active Alarms Table */}
          <div className="neo-box" style={{ padding: '15px' }}>
            <h3 className="block-title" style={{ border: 'none', padding: 0, margin: 0, fontSize: '1rem', marginBottom: '15px' }}>DAFTAR ALARM AKTIF</h3>
            <table className="neo-table-sm" style={{ width: '100%', textAlign: 'center' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>WAKTU</th>
                  <th style={{ textAlign: 'center' }}>TINGKAT</th>
                  <th style={{ textAlign: 'center' }}>MESIN</th>
                  <th style={{ textAlign: 'center' }}>TIPE ALARM</th>
                  <th style={{ textAlign: 'left' }}>PESAN</th>
                  <th style={{ textAlign: 'center' }}>DURASI</th>
                  <th style={{ textAlign: 'center' }}>STATUS</th>
                  <th style={{ textAlign: 'center' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {activeAlarmsData.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700 }}>{row.waktu}</td>
                    <td>
                      <span style={{ 
                        background: row.tingkat === 'ALARM' ? 'var(--aj-red)' : 'var(--aj-orange)', 
                        color: 'white', 
                        padding: '2px 8px', 
                        fontSize: '0.65rem', 
                        fontWeight: 900,
                        border: '1px solid black'
                      }}>
                        {row.tingkat}
                      </span>
                    </td>
                    <td style={{ fontWeight: 900 }}>{row.mesin}</td>
                    <td style={{ fontWeight: 700 }}>{row.tipe}</td>
                    <td style={{ textAlign: 'left', fontSize: '0.75rem' }}>{row.pesan}</td>
                    <td style={{ fontWeight: 900, color: 'var(--aj-red)' }}>{row.durasi}</td>
                    <td>
                      <span style={{ color: 'var(--aj-red)', fontWeight: 900, border: '1px solid var(--aj-red)', padding: '2px 6px', fontSize: '0.65rem' }}>
                        {row.status}
                      </span>
                    </td>
                    <td>
                      <button className="neo-btn-sm" style={{ background: 'var(--aj-yellow)', fontSize: '0.65rem', padding: '2px 10px' }}>ACK</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Last Alarms Table */}
          <div className="neo-box" style={{ padding: '15px' }}>
            <h3 className="block-title" style={{ border: 'none', padding: 0, margin: 0, fontSize: '1rem', marginBottom: '15px' }}>ALARM TERAKHIR <span style={{fontSize: '0.7rem', color: '#666'}}>(TERAKHIR 24 JAM)</span></h3>
            <table className="neo-table-sm" style={{ width: '100%', textAlign: 'center' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>WAKTU</th>
                  <th style={{ textAlign: 'center' }}>TINGKAT</th>
                  <th style={{ textAlign: 'center' }}>MESIN</th>
                  <th style={{ textAlign: 'center' }}>TIPE ALARM</th>
                  <th style={{ textAlign: 'left' }}>PESAN</th>
                  <th style={{ textAlign: 'center' }}>DURASI</th>
                  <th style={{ textAlign: 'center' }}>STATUS</th>
                  <th style={{ textAlign: 'center' }}>OLEH</th>
                </tr>
              </thead>
              <tbody>
                {lastAlarmsData.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700 }}>{row.waktu}</td>
                    <td>
                      <span style={{ 
                        background: row.tingkat === 'ALARM' ? 'var(--aj-red)' : row.tingkat === 'WARNING' ? 'var(--aj-orange)' : 'var(--aj-blue)', 
                        color: 'white', 
                        padding: '2px 8px', 
                        fontSize: '0.65rem', 
                        fontWeight: 900,
                        border: '1px solid black'
                      }}>
                        {row.tingkat}
                      </span>
                    </td>
                    <td style={{ fontWeight: 900 }}>{row.mesin}</td>
                    <td style={{ fontWeight: 700 }}>{row.tipe}</td>
                    <td style={{ textAlign: 'left', fontSize: '0.75rem' }}>{row.pesan}</td>
                    <td style={{ fontWeight: 700 }}>{row.durasi}</td>
                    <td>
                      <span style={{ color: 'var(--aj-green)', fontWeight: 900, border: '1px solid var(--aj-green)', padding: '2px 6px', fontSize: '0.65rem' }}>
                        {row.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.7rem', fontWeight: 700 }}>{row.oleh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <button className="neo-btn-sm neo-btn-white" style={{ padding: '6px 16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                LIHAT SEMUA HISTORY ALARM <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* Sidebar Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Filter Box */}
          <div className="neo-box" style={{ padding: '15px' }}>
            <div className="block-title" style={{ fontSize: '0.9rem', marginBottom: '15px', paddingBottom: '8px' }}>
              FILTER ALARM
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.65rem' }}>STATUS</label>
                <NeoDropdown options={statusOptions} value={selectedStatus} onChange={setSelectedStatus} width="100%" />
              </div>
              
              <div className="form-group">
                <label style={{ fontSize: '0.65rem' }}>TINGKAT</label>
                <NeoDropdown options={severityOptions} value={selectedSeverity} onChange={setSelectedSeverity} width="100%" />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.65rem' }}>MESIN</label>
                <NeoDropdown options={machineOptions} value={selectedMachine} onChange={setSelectedMachine} width="100%" />
              </div>
              
              <div className="form-group">
                <label style={{ fontSize: '0.65rem' }}>TIPE ALARM</label>
                <NeoDropdown options={typeOptions} value={selectedType} onChange={setSelectedType} width="100%" />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.65rem' }}>PERIODE</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '5px' }}>
                  <input type="date" className="neo-input" style={{ padding: '4px 4px', fontSize: '0.7rem' }} defaultValue="2026-05-05" />
                  <span style={{ fontWeight: 900, fontSize: '0.7rem' }}>s/d</span>
                  <input type="date" className="neo-input" style={{ padding: '4px 4px', fontSize: '0.7rem' }} defaultValue="2026-05-05" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '5px' }}>
                <button className="neo-btn" style={{ background: 'var(--aj-yellow)', padding: '6px', fontSize: '0.75rem', justifyContent: 'center' }}>
                  <Search size={14} /> TAMPILKAN
                </button>
                <button className="neo-btn neo-btn-white" style={{ padding: '6px', fontSize: '0.75rem', justifyContent: 'center' }}>
                  <RefreshCw size={14} /> RESET
                </button>
              </div>
            </div>
          </div>


          {/* Machine Summary */}
          <div className="neo-box" style={{ padding: '15px' }}>
            <div className="block-title" style={{ fontSize: '0.9rem', marginBottom: '10px', paddingBottom: '8px' }}>
              ALARM PER MESIN <span style={{fontSize: '0.7rem', color: '#666'}}>(AKTIF)</span>
            </div>
            <table className="neo-table-sm" style={{ width: '100%', fontSize: '0.7rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>MESIN</th>
                  <th style={{ textAlign: 'center' }}>ALARM</th>
                  <th style={{ textAlign: 'center' }}>WARNING</th>
                  <th style={{ textAlign: 'center' }}>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {machineAlarmsData.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 900 }}>{row.mesin.split(' - ')[0]}</td>
                    <td style={{ textAlign: 'center', fontWeight: 900, color: 'var(--aj-red)' }}>{row.alarm}</td>
                    <td style={{ textAlign: 'center', fontWeight: 900, color: 'var(--aj-orange)' }}>{row.warning}</td>
                    <td style={{ textAlign: 'center', fontWeight: 900 }}>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <button className="neo-btn-sm neo-btn-white" style={{ padding: '4px 10px', fontSize: '0.65rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                LIHAT SEMUA ALARM PER MESIN <ArrowRight size={12} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AlarmPage;
