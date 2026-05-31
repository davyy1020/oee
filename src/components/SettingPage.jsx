import React, { useState } from 'react';
import { 
  Settings, Wifi, Database, Users, Calendar, Cloud, Save, 
  RefreshCw, Play, Trash2, Edit2, FileUp, FileDown, Eye, CheckCircle2,
  ChevronLeft, ChevronRight, Clock, Shield
} from 'lucide-react';

const SettingPage = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('opc');
  const [showMachineModal, setShowMachineModal] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [showLiburModal, setShowLiburModal] = useState(false);
  const [selectedLibur, setSelectedLibur] = useState(null);

  const getTabInfo = () => {
    switch(activeTab) {
      case 'system': return { title: 'Konfigurasi Sistem', desc: 'Pengaturan umum aplikasi, identitas plant, dan preferensi antarmuka' };
      case 'opc': return { title: 'Koneksi OPC UA', desc: 'Konfigurasi koneksi ke OPC UA Server untuk pengambilan data dari PLC' };
      case 'master': return { title: 'Master Mesin', desc: 'Pengaturan data induk mesin, target produksi, dan parameter OEE' };
      case 'user': return { title: 'User Management', desc: 'Kelola hak akses, peran, dan data pengguna sistem' };
      case 'shift': return { title: 'Shift & Kalender', desc: 'Pengaturan jadwal kerja, jam shift, dan hari libur operasional' };
      case 'backup': return { title: 'Backup & Restore', desc: 'Pencadangan data dan pemulihan sistem dari file backup' };
      default: return { title: 'Setting', desc: 'Pengaturan sistem' };
    }
  };
  const activeTabInfo = getTabInfo();

  const tabs = [
    { id: 'system', label: 'KONFIGURASI SISTEM' },
    { id: 'opc', label: 'KONEKSI OPC UA' },
    { id: 'master', label: 'MASTER MESIN' },
    { id: 'user', label: 'USER MANAGEMENT' },
    { id: 'shift', label: 'SHIFT & KALENDER' },
    { id: 'backup', label: 'BACKUP & RESTORE' },
  ];

  const tagData = [
    { no: 1, name: 'Total_Production', nodeId: 'ns=2;s=Line1.PLC1.Total_Production', type: 'Int32', unit: 'pcs', desc: 'Total Produksi', active: true, value: '12,450', update: '09:33:45' },
    { no: 2, name: 'Good_Counter', nodeId: 'ns=2;s=Line1.PLC1.Good_Counter', type: 'Int32', unit: 'pcs', desc: 'Produk OK', active: true, value: '12,300', update: '09:33:45' },
    { no: 3, name: 'Reject_Counter', nodeId: 'ns=2;s=Line1.PLC1.Reject_Counter', type: 'Int32', unit: 'pcs', desc: 'Produk Reject', active: true, value: '150', update: '09:33:45' },
    { no: 4, name: 'Machine_Status', nodeId: 'ns=2;s=Line1.PLC1.Machine_Status', type: 'Int16', unit: '-', desc: 'Status Mesin (0=Stop, 1=Run)', active: true, value: '1 (Run)', update: '09:33:45' },
    { no: 5, name: 'Machine_Speed', nodeId: 'ns=2;s=Line1.PLC1.Machine_Speed', type: 'Int16', unit: 'pcs/min', desc: 'Kecepatan Aktual', active: true, value: '42', update: '09:33:45' },
    { no: 6, name: 'Target_Speed', nodeId: 'ns=2;s=Line1.PLC1.Target_Speed', type: 'Int16', unit: 'pcs/min', desc: 'Kecepatan Target', active: true, value: '50', update: '09:33:45' },
    { no: 7, name: 'Downtime_Code', nodeId: 'ns=2;s=Line1.PLC1.Downtime_Code', type: 'Int16', unit: '-', desc: 'Kode Downtime Aktif', active: true, value: '0', update: '09:33:45' },
  ];

  return (
    <div className="input-operator-page">
      {/* Breadcrumb */}
      <div className="input-breadcrumb">
        <span style={{ color: '#888', cursor: 'pointer' }} onClick={onBack}>Dashboard</span>
        <span style={{ margin: '0 8px' }}>&gt;</span>
        <span style={{ color: '#888' }}>Setting</span>
        <span style={{ margin: '0 8px' }}>&gt;</span>
        <span style={{ fontWeight: 900, textTransform: 'uppercase' }}>{activeTabInfo.title}</span>
      </div>

      {/* Header Area */}
      <div className="input-header-row">
        <div>
          <h1 style={{ fontWeight: 900, fontSize: '1.8rem', textTransform: 'uppercase', lineHeight: 1 }}>{activeTabInfo.title}</h1>
          <p style={{ fontWeight: 700, color: '#555', fontSize: '0.9rem', marginTop: '4px' }}>{activeTabInfo.desc}</p>
        </div>
        <div className="input-header-actions">
          <button className="neo-btn" style={{ background: 'var(--aj-yellow)', padding: '8px 24px' }}>
            <Save size={18} /> SIMPAN PERUBAHAN
          </button>
        </div>
      </div>

      {/* Top Tab Navigation */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ 
              flex: 1, 
              padding: '12px 10px', 
              fontWeight: 900, 
              fontSize: '0.75rem',
              border: activeTab === tab.id ? '4px solid black' : '2px solid #ccc',
              background: activeTab === tab.id ? 'var(--aj-yellow)' : '#eee',
              boxShadow: activeTab === tab.id ? '4px 4px 0px black' : 'none',
              cursor: 'pointer',
              transition: 'all 0.1s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'system' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* Informasi Umum */}
            <div className="neo-box" style={{ padding: '20px' }}>
              <h3 className="block-title" style={{ fontSize: '0.95rem', border: 'none', marginBottom: '20px' }}>INFORMASI UMUM SISTEM</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>NAMA PERUSAHAAN</label>
                  <input type="text" className="neo-input" defaultValue="Company Name" style={{ padding: '8px 12px' }} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>NAMA PLANT / PABRIK</label>
                  <input type="text" className="neo-input" defaultValue="Karawang Packing Plant" style={{ padding: '8px 12px' }} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>LOKASI</label>
                  <textarea className="neo-input" style={{ padding: '8px 12px', minHeight: '80px', resize: 'none' }} defaultValue="Kawasan Industri Karawang International Industrial City (KIIC)"></textarea>
                </div>
              </div>
            </div>

            {/* Konfigurasi Aplikasi */}
            <div className="neo-box" style={{ padding: '20px' }}>
              <h3 className="block-title" style={{ fontSize: '0.95rem', border: 'none', marginBottom: '20px' }}>PREFERENSI APLIKASI</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px 30px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>ZONA WAKTU</label>
                  <select className="neo-input" style={{ padding: '8px 12px' }}>
                    <option>WIB (Asia/Jakarta)</option>
                    <option>WITA (Asia/Makassar)</option>
                    <option>WIT (Asia/Jayapura)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>BAHASA ANTARMUKA</label>
                  <select className="neo-input" style={{ padding: '8px 12px' }}>
                    <option>Bahasa Indonesia</option>
                    <option>English</option>
                    <option>日本語 (Japanese)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>FORMAT TANGGAL & WAKTU</label>
                  <select className="neo-input" style={{ padding: '8px 12px' }}>
                    <option>DD/MM/YYYY HH:mm:ss</option>
                    <option>YYYY-MM-DD HH:mm:ss</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>AUTO REFRESH DASHBOARD</label>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <input type="number" className="neo-input" defaultValue="10" style={{ padding: '8px 12px', borderRight: 'none', width: '100%', minWidth: 0 }} />
                    <div style={{ background: '#eee', padding: '0 15px', fontSize: '0.75rem', fontWeight: 900, border: '2px solid black', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                      Detik
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>RETENSI DATA HISTORI (OEE & ALARM)</label>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <input type="number" className="neo-input" defaultValue="365" style={{ padding: '8px 12px', borderRight: 'none', width: '100%', minWidth: 0 }} />
                    <div style={{ background: '#eee', padding: '0 15px', fontSize: '0.75rem', fontWeight: 900, border: '2px solid black', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                      Hari
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>BATAS KAPASITAS LOGGING</label>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <input type="number" className="neo-input" defaultValue="5000" style={{ padding: '8px 12px', borderRight: 'none', width: '100%', minWidth: 0 }} />
                    <div style={{ background: '#eee', padding: '0 15px', fontSize: '0.75rem', fontWeight: 900, border: '2px solid black', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                      MB
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '25px', padding: '15px', background: '#FFF3E0', border: '2px solid #E65100', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontWeight: 900, color: '#E65100', fontSize: '0.8rem' }}>
                  <Cloud size={18} /> BACKUP KONFIGURASI OTOMATIS
                </div>
                <div style={{ fontSize: '0.75rem', marginBottom: '15px' }}>
                  Sistem saat ini dikonfigurasi untuk melakukan pencadangan otomatis setiap hari pada pukul 00:00 WIB ke server lokal.
                </div>
                <button className="neo-btn-sm" style={{ background: '#E65100', color: 'white', border: '1px solid black', padding: '6px 12px' }}>
                  ATUR JADWAL BACKUP
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {activeTab === 'master' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="neo-box" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="block-title" style={{ fontSize: '0.95rem', border: 'none', margin: 0 }}>DATA MASTER MESIN</h3>
              <button 
                className="neo-btn" 
                style={{ background: 'var(--aj-green)', padding: '8px 16px', fontSize: '0.75rem', color: 'white' }}
                onClick={() => { setSelectedMachine(null); setShowMachineModal(true); }}
              >
                + TAMBAH MESIN BARU
              </button>
            </div>
            
            <table className="neo-table-sm" style={{ width: '100%', fontSize: '0.75rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center', width: '50px' }}>NO.</th>
                  <th style={{ textAlign: 'center', width: '100px' }}>KODE MESIN</th>
                  <th style={{ textAlign: 'left' }}>NAMA MESIN</th>
                  <th style={{ textAlign: 'left', width: '150px' }}>KATEGORI / GRUP</th>
                  <th style={{ textAlign: 'center', width: '120px' }}>TARGET IDEAL</th>
                  <th style={{ textAlign: 'center', width: '100px' }}>KONEKSI OPC</th>
                  <th style={{ textAlign: 'center', width: '100px' }}>STATUS</th>
                  <th style={{ textAlign: 'center', width: '100px' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 21 }, (_, i) => {
                  const num = i + 1;
                  const kode = `PCK${num.toString().padStart(2, '0')}`;
                  return {
                    no: num,
                    kode: kode,
                    nama: `Line Packing ${num.toString().padStart(2, '0')}`,
                    grup: 'Packer',
                    target: num % 4 === 0 ? '60 pcs/min' : (num % 3 === 0 ? '45 pcs/min' : '50 pcs/min'),
                    opc: num <= 18 ? `Line${num}.PLC1` : '-',
                    status: num <= 18
                  };
                }).map((mesin) => (
                  <tr key={mesin.no}>
                    <td style={{ textAlign: 'center', fontWeight: 900 }}>{mesin.no}</td>
                    <td style={{ textAlign: 'center', fontWeight: 900, color: 'var(--aj-blue)' }}>{mesin.kode}</td>
                    <td style={{ fontWeight: 700 }}>{mesin.nama}</td>
                    <td>{mesin.grup}</td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{mesin.target}</td>
                    <td style={{ textAlign: 'center', fontSize: '0.7rem' }}>{mesin.opc}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ 
                        width: '36px', 
                        height: '18px', 
                        background: mesin.status ? 'var(--aj-green)' : '#ccc', 
                        borderRadius: '10px', 
                        position: 'relative', 
                        margin: '0 auto', 
                        border: '1px solid black' 
                      }}>
                        <div style={{ 
                          width: '14px', 
                          height: '14px', 
                          background: 'white', 
                          borderRadius: '50%', 
                          position: 'absolute', 
                          top: '1px', 
                          right: mesin.status ? '2px' : 'auto', 
                          left: mesin.status ? 'auto' : '2px', 
                          border: '1px solid black' 
                        }}></div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                        <button 
                          className="neo-btn-sm neo-btn-white" 
                          style={{ padding: '4px' }}
                          onClick={() => { setSelectedMachine(mesin); setShowMachineModal(true); }}
                        >
                          <Edit2 size={12} />
                        </button>
                        <button className="neo-btn-sm neo-btn-white" style={{ padding: '4px' }}><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700 }}>Menampilkan 21 dari 21 Mesin</div>
            </div>
            
          </div>
        </div>
      )}

      {activeTab === 'opc' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 260px', gap: '20px' }}>
            
            {/* Konfigurasi Server */}
            <div className="neo-box" style={{ padding: '20px' }}>
              <h3 className="block-title" style={{ fontSize: '0.95rem', border: 'none', marginBottom: '20px' }}>KONFIGURASI SERVER OPC UA</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px 30px' }}>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '0.7rem' }}>ENDPOINT URL</label>
                  <input type="text" className="neo-input" defaultValue="opc.tcp://192.168.1.10:4840" style={{ padding: '8px 12px' }} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>NAMA KONEKSI</label>
                  <input type="text" className="neo-input" defaultValue="PLC Line Packing" style={{ padding: '8px 12px' }} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>USERNAME</label>
                  <input type="text" className="neo-input" defaultValue="opcua_user" style={{ padding: '8px 12px' }} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>SECURITY MODE</label>
                  <select className="neo-input" style={{ padding: '8px 12px' }}>
                    <option>Sign and Encrypt</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>PASSWORD</label>
                  <div className="neo-input-icon-wrapper">
                    <input type="password" className="neo-input has-icon-right" defaultValue="password123" style={{ padding: '8px 12px' }} />
                    <Eye className="input-icon-right" size={16} />
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>MESSAGE SECURITY MODE</label>
                  <select className="neo-input" style={{ padding: '8px 12px' }}>
                    <option>Basic256Sha256</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>CONNECTION TIMEOUT</label>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <input type="number" className="neo-input" defaultValue="5000" style={{ padding: '8px 12px', borderRight: 'none', width: '100%', minWidth: 0 }} />
                    <div style={{ background: '#eee', padding: '0 15px', fontSize: '0.75rem', fontWeight: 900, border: '2px solid black', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                      ms
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>SAMPLING INTERVAL</label>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <input type="number" className="neo-input" defaultValue="1000" style={{ padding: '8px 12px', borderRight: 'none', width: '100%', minWidth: 0 }} />
                    <div style={{ background: '#eee', padding: '0 15px', fontSize: '0.75rem', fontWeight: 900, border: '2px solid black', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                      ms
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                <button className="neo-btn" style={{ background: 'var(--aj-yellow)', padding: '8px 20px', fontSize: '0.8rem' }}>
                  <Wifi size={16} /> TEST KONEKSI
                </button>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  background: '#E8F5E9', 
                  padding: '8px 15px', 
                  border: '2px solid #2E7D32',
                  borderRadius: '4px',
                  fontWeight: 900,
                  fontSize: '0.8rem',
                  color: '#2E7D32'
                }}>
                  <CheckCircle2 size={16} /> TERHUBUNG
                </div>
              </div>
            </div>

            {/* Status Koneksi */}
            <div className="neo-box" style={{ padding: '20px' }}>
              <h3 className="block-title" style={{ fontSize: '0.95rem', border: 'none', marginBottom: '20px' }}>STATUS KONEKSI</h3>
              <div className="detail-grid" style={{ gap: '12px' }}>
                <div className="detail-row" style={{ borderBottom: 'none', padding: '4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 900 }}>
                    <Wifi size={14} /> STATUS
                  </div>
                  <span className="confirmed-badge" style={{ background: '#E8F5E9', color: '#2E7D32', border: '1px solid #2E7D32' }}>TERHUBUNG</span>
                </div>
                <div className="detail-row" style={{ borderBottom: 'none', padding: '4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 900 }}>
                    <Database size={14} /> SERVER
                  </div>
                  <strong>192.168.1.10</strong>
                </div>
                <div className="detail-row" style={{ borderBottom: 'none', padding: '4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 900 }}>
                    <Wifi size={14} /> ENDPOINT
                  </div>
                  <strong style={{ fontSize: '0.7rem' }}>opc.tcp://192.168.1.10:4840</strong>
                </div>
                <div className="detail-row" style={{ borderBottom: 'none', padding: '4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 900 }}>
                    <Shield size={14} /> SECURITY
                  </div>
                  <strong style={{ fontSize: '0.7rem' }}>Sign and Encrypt / Basic256Sha256</strong>
                </div>
                <div className="detail-row" style={{ borderBottom: 'none', padding: '4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 900 }}>
                    <Calendar size={14} /> WAKTU TERHUBUNG
                  </div>
                  <strong>05/05/2026 09:30:12</strong>
                </div>
                <div className="detail-row" style={{ borderBottom: 'none', padding: '4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 900 }}>
                    <RefreshCw size={14} /> RESPONSE TIME
                  </div>
                  <strong>12 ms</strong>
                </div>
                <div className="detail-row" style={{ borderBottom: 'none', padding: '4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 900 }}>
                    <Clock size={14} /> LAST UPDATE
                  </div>
                  <strong>05/05/2026 09:33:45</strong>
                </div>
              </div>
              <button className="neo-btn-white" style={{ 
                width: '100%', 
                marginTop: '15px', 
                padding: '10px', 
                fontWeight: 900, 
                border: '2px solid black',
                boxShadow: '2px 2px 0px black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.8rem'
              }}>
                <RefreshCw size={16} /> REFRESH STATUS
              </button>
            </div>

            {/* Aksi Cepat */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="neo-box" style={{ padding: '15px' }}>
                <h3 className="block-title" style={{ fontSize: '0.95rem', border: 'none', marginBottom: '15px' }}>AKSI CEPAT</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button className="neo-btn" style={{ background: '#E3F2FD', color: '#1565C0', border: '2px solid black', padding: '8px', fontSize: '0.75rem', justifyContent: 'center' }}>
                    <Wifi size={14} /> BROWSE NODES
                  </button>
                  <button className="neo-btn" style={{ background: '#E8F5E9', color: '#2E7D32', border: '2px solid black', padding: '8px', fontSize: '0.75rem', justifyContent: 'center' }}>
                    <FileUp size={14} /> IMPORT TAG DARI FILE
                  </button>
                  <button className="neo-btn" style={{ background: '#FFF3E0', color: '#E65100', border: '2px solid black', padding: '8px', fontSize: '0.75rem', justifyContent: 'center' }}>
                    <FileDown size={14} /> EXPORT TAG KE FILE
                  </button>
                  <button className="neo-btn" style={{ background: '#eee', color: 'black', border: '2px solid black', padding: '8px', fontSize: '0.75rem', justifyContent: 'center' }}>
                    <RefreshCw size={14} /> RESET KONEKSI
                  </button>
                  <button className="neo-btn" style={{ background: '#FFEBEE', color: '#C62828', border: '2px solid black', padding: '8px', fontSize: '0.75rem', justifyContent: 'center' }}>
                    <Trash2 size={14} /> HAPUS KONEKSI
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Daftar Tag Section */}
          <div className="neo-box" style={{ padding: '20px' }}>
            <h3 className="block-title" style={{ fontSize: '0.95rem', border: 'none', marginBottom: '20px' }}>DAFTAR TAG / VARIABLE YANG DIGUNAKAN</h3>
            <table className="neo-table-sm" style={{ width: '100%', fontSize: '0.75rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>NO.</th>
                  <th style={{ textAlign: 'left' }}>NAMA TAG</th>
                  <th style={{ textAlign: 'left' }}>NODE ID</th>
                  <th style={{ textAlign: 'center' }}>DATA TYPE</th>
                  <th style={{ textAlign: 'center' }}>UNIT</th>
                  <th style={{ textAlign: 'left' }}>DESKRIPSI</th>
                  <th style={{ textAlign: 'center' }}>AKTIF</th>
                  <th style={{ textAlign: 'center' }}>LAST VALUE</th>
                  <th style={{ textAlign: 'center' }}>LAST UPDATE</th>
                  <th style={{ textAlign: 'center' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {tagData.map((row) => (
                  <tr key={row.no}>
                    <td style={{ textAlign: 'center', fontWeight: 900 }}>{row.no}</td>
                    <td style={{ fontWeight: 700 }}>{row.name}</td>
                    <td style={{ fontSize: '0.65rem' }}>{row.nodeId}</td>
                    <td style={{ textAlign: 'center' }}>{row.type}</td>
                    <td style={{ textAlign: 'center' }}>{row.unit}</td>
                    <td>{row.desc}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ 
                        width: '36px', 
                        height: '18px', 
                        background: row.active ? 'var(--aj-green)' : '#ccc', 
                        borderRadius: '10px', 
                        position: 'relative', 
                        margin: '0 auto', 
                        border: '1px solid black' 
                      }}>
                        <div style={{ 
                          width: '14px', 
                          height: '14px', 
                          background: 'white', 
                          borderRadius: '50%', 
                          position: 'absolute', 
                          top: '1px', 
                          right: row.active ? '2px' : 'auto', 
                          left: row.active ? 'auto' : '2px', 
                          border: '1px solid black' 
                        }}></div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 900 }}>{row.value}</td>
                    <td style={{ textAlign: 'center' }}>{row.update}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                        <button className="neo-btn-sm neo-btn-white" style={{ padding: '4px' }}><Edit2 size={12} /></button>
                        <button className="neo-btn-sm neo-btn-white" style={{ padding: '4px' }}><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>

        </div>
      )}

      {activeTab === 'user' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="neo-box" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="block-title" style={{ fontSize: '0.95rem', border: 'none', margin: 0 }}>DAFTAR PENGGUNA SISTEM</h3>
              <button 
                className="neo-btn" 
                style={{ background: 'var(--aj-green)', padding: '8px 16px', fontSize: '0.75rem', color: 'white' }}
                onClick={() => { setSelectedUser(null); setShowUserModal(true); }}
              >
                + TAMBAH USER BARU
              </button>
            </div>
            
            <table className="neo-table-sm" style={{ width: '100%', fontSize: '0.75rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center', width: '50px' }}>NO.</th>
                  <th style={{ textAlign: 'left' }}>NAMA LENGKAP</th>
                  <th style={{ textAlign: 'left', width: '150px' }}>USERNAME</th>
                  <th style={{ textAlign: 'center', width: '150px' }}>PERAN / ROLE</th>
                  <th style={{ textAlign: 'center', width: '150px' }}>SHIFT KERJA</th>
                  <th style={{ textAlign: 'center', width: '100px' }}>STATUS</th>
                  <th style={{ textAlign: 'center', width: '100px' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { no: 1, nama: 'Budi Santoso', username: 'admin_budi', role: 'Administrator', shift: 'All Shift', status: true },
                  { no: 2, nama: 'Andi Pratama', username: 'spv_andi', role: 'Supervisor', shift: 'Shift 1 (Pagi)', status: true },
                  { no: 3, nama: 'Siti Nurhaliza', username: 'opr_siti', role: 'Operator', shift: 'Shift 2 (Siang)', status: true },
                  { no: 4, nama: 'Dedi Irawan', username: 'opr_dedi', role: 'Operator', shift: 'Shift 3 (Malam)', status: false },
                  { no: 5, nama: 'Joko Widodo', username: 'eng_joko', role: 'Engineer', shift: 'All Shift', status: true }
                ].map((user) => (
                  <tr key={user.no}>
                    <td style={{ textAlign: 'center', fontWeight: 900 }}>{user.no}</td>
                    <td style={{ fontWeight: 700 }}>{user.nama}</td>
                    <td style={{ color: 'var(--aj-blue)', fontWeight: 900 }}>{user.username}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ 
                        background: user.role === 'Administrator' ? 'var(--aj-red)' : (user.role === 'Supervisor' ? 'var(--aj-orange)' : (user.role === 'Engineer' ? 'var(--aj-blue)' : '#eee')),
                        color: user.role === 'Operator' ? 'black' : 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: 900,
                        fontSize: '0.65rem',
                        border: '1px solid black'
                      }}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{user.shift}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ 
                        width: '36px', 
                        height: '18px', 
                        background: user.status ? 'var(--aj-green)' : '#ccc', 
                        borderRadius: '10px', 
                        position: 'relative', 
                        margin: '0 auto', 
                        border: '1px solid black' 
                      }}>
                        <div style={{ 
                          width: '14px', 
                          height: '14px', 
                          background: 'white', 
                          borderRadius: '50%', 
                          position: 'absolute', 
                          top: '1px', 
                          right: user.status ? '2px' : 'auto', 
                          left: user.status ? 'auto' : '2px', 
                          border: '1px solid black' 
                        }}></div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                        <button 
                          className="neo-btn-sm neo-btn-white" 
                          style={{ padding: '4px' }}
                          onClick={() => { setSelectedUser(user); setShowUserModal(true); }}
                        >
                          <Edit2 size={12} />
                        </button>
                        <button className="neo-btn-sm neo-btn-white" style={{ padding: '4px' }}><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'shift' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Jadwal Shift */}
          <div className="neo-box" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="block-title" style={{ fontSize: '0.95rem', border: 'none', margin: 0 }}>JADWAL SHIFT OPERASIONAL</h3>
              <button 
                className="neo-btn" 
                style={{ background: 'var(--aj-green)', padding: '8px 16px', fontSize: '0.75rem', color: 'white' }}
                onClick={() => { setSelectedShift(null); setShowShiftModal(true); }}
              >
                + TAMBAH SHIFT
              </button>
            </div>
            
            <table className="neo-table-sm" style={{ width: '100%', fontSize: '0.75rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>NAMA SHIFT</th>
                  <th style={{ textAlign: 'center', width: '120px' }}>JAM MULAI</th>
                  <th style={{ textAlign: 'center', width: '120px' }}>JAM SELESAI</th>
                  <th style={{ textAlign: 'center', width: '120px' }}>DURASI</th>
                  <th style={{ textAlign: 'center', width: '100px' }}>STATUS</th>
                  <th style={{ textAlign: 'center', width: '100px' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nama: 'Shift 1 (Pagi)', mulai: '07:00', selesai: '15:00', durasi: '8 Jam', status: true },
                  { nama: 'Shift 2 (Siang)', mulai: '15:00', selesai: '23:00', durasi: '8 Jam', status: true },
                  { nama: 'Shift 3 (Malam)', mulai: '23:00', selesai: '07:00', durasi: '8 Jam', status: true }
                ].map((shift, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 900 }}>{shift.nama}</td>
                    <td style={{ textAlign: 'center', fontWeight: 900, color: 'var(--aj-blue)' }}>{shift.mulai}</td>
                    <td style={{ textAlign: 'center', fontWeight: 900, color: 'var(--aj-orange)' }}>{shift.selesai}</td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{shift.durasi}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ 
                        width: '36px', height: '18px', 
                        background: shift.status ? 'var(--aj-green)' : '#ccc', 
                        borderRadius: '10px', position: 'relative', margin: '0 auto', border: '1px solid black' 
                      }}>
                        <div style={{ 
                          width: '14px', height: '14px', background: 'white', borderRadius: '50%', position: 'absolute', 
                          top: '1px', right: shift.status ? '2px' : 'auto', left: shift.status ? 'auto' : '2px', border: '1px solid black' 
                        }}></div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                        <button 
                          className="neo-btn-sm neo-btn-white" 
                          style={{ padding: '4px' }}
                          onClick={() => { setSelectedShift(shift); setShowShiftModal(true); }}
                        >
                          <Edit2 size={12} />
                        </button>
                        <button className="neo-btn-sm neo-btn-white" style={{ padding: '4px' }}><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Kalender Libur */}
          <div className="neo-box" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="block-title" style={{ fontSize: '0.95rem', border: 'none', margin: 0 }}>HARI LIBUR / NON-OPERASIONAL</h3>
              <button 
                className="neo-btn" 
                style={{ background: 'var(--aj-blue)', padding: '8px 16px', fontSize: '0.75rem', color: 'white' }}
                onClick={() => { setSelectedLibur(null); setShowLiburModal(true); }}
              >
                + TAMBAH HARI LIBUR
              </button>
            </div>
            
            <table className="neo-table-sm" style={{ width: '100%', fontSize: '0.75rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center', width: '50px' }}>NO.</th>
                  <th style={{ textAlign: 'left' }}>KETERANGAN</th>
                  <th style={{ textAlign: 'center', width: '150px' }}>TANGGAL MULAI</th>
                  <th style={{ textAlign: 'center', width: '150px' }}>TANGGAL SELESAI</th>
                  <th style={{ textAlign: 'center', width: '100px' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { no: 1, nama: 'Tahun Baru Masehi', mulai: '01 Jan 2026', selesai: '01 Jan 2026' },
                  { no: 2, nama: 'Hari Raya Idul Fitri 1447 H', mulai: '19 Mar 2026', selesai: '20 Mar 2026' },
                  { no: 3, nama: 'Cuti Bersama Idul Fitri', mulai: '18 Mar 2026', selesai: '23 Mar 2026' },
                  { no: 4, nama: 'Maintenance Tahunan Plant', mulai: '25 Des 2026', selesai: '31 Des 2026' }
                ].map((libur) => (
                  <tr key={libur.no}>
                    <td style={{ textAlign: 'center', fontWeight: 900 }}>{libur.no}</td>
                    <td style={{ fontWeight: 700 }}>{libur.nama}</td>
                    <td style={{ textAlign: 'center', fontWeight: 900 }}>{libur.mulai}</td>
                    <td style={{ textAlign: 'center', fontWeight: 900 }}>{libur.selesai}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                        <button 
                          className="neo-btn-sm neo-btn-white" 
                          style={{ padding: '4px' }}
                          onClick={() => { setSelectedLibur(libur); setShowLiburModal(true); }}
                        >
                          <Edit2 size={12} />
                        </button>
                        <button className="neo-btn-sm neo-btn-white" style={{ padding: '4px' }}><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {activeTab === 'backup' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* Backup Section */}
            <div className="neo-box" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <div style={{ background: 'var(--aj-blue)', color: 'white', padding: '8px', borderRadius: '4px', border: '2px solid black' }}>
                  <Cloud size={24} />
                </div>
                <h3 className="block-title" style={{ fontSize: '1rem', border: 'none', margin: 0 }}>PENCADANGAN DATA</h3>
              </div>
              <p style={{ fontSize: '0.8rem', marginBottom: '20px', lineHeight: '1.5', fontWeight: 700 }}>
                Buat salinan data konfigurasi, master mesin, dan parameter sistem. Sangat disarankan untuk melakukan backup secara berkala.
              </p>
              
              <button className="neo-btn" style={{ background: 'var(--aj-blue)', color: 'white', width: '100%', padding: '12px', fontSize: '0.85rem', marginBottom: '20px' }}>
                <FileDown size={18} /> BUAT BACKUP SEKARANG
              </button>

              <h4 style={{ fontSize: '0.75rem', fontWeight: 900, marginBottom: '10px', textTransform: 'uppercase' }}>Riwayat Backup Terakhir</h4>
              <table className="neo-table-sm" style={{ width: '100%', fontSize: '0.7rem' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>TANGGAL / WAKTU</th>
                    <th style={{ textAlign: 'left' }}>NAMA FILE</th>
                    <th style={{ textAlign: 'center' }}>UKURAN</th>
                    <th style={{ textAlign: 'center' }}>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 900 }}>01 May 2026, 02:00</td>
                    <td>backup_auto_010526.zip</td>
                    <td style={{ textAlign: 'center' }}>2.4 MB</td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="neo-btn-sm neo-btn-white" style={{ padding: '4px' }}><FileDown size={12} /></button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 900 }}>24 Apr 2026, 02:00</td>
                    <td>backup_auto_240426.zip</td>
                    <td style={{ textAlign: 'center' }}>2.3 MB</td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="neo-btn-sm neo-btn-white" style={{ padding: '4px' }}><FileDown size={12} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Restore Section */}
            <div className="neo-box" style={{ padding: '20px', border: '3px solid var(--aj-red)', boxShadow: '4px 4px 0px var(--aj-red)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <div style={{ background: 'var(--aj-red)', color: 'white', padding: '8px', borderRadius: '4px', border: '2px solid black' }}>
                  <Database size={24} />
                </div>
                <h3 className="block-title" style={{ fontSize: '1rem', border: 'none', margin: 0, color: 'var(--aj-red)' }}>PEMULIHAN SISTEM</h3>
              </div>
              
              <div style={{ background: '#FFEBEE', border: '2px solid var(--aj-red)', padding: '10px', marginBottom: '20px', fontSize: '0.75rem', fontWeight: 700, color: '#C62828' }}>
                PERHATIAN: Melakukan restore akan menimpa seluruh data konfigurasi saat ini dengan data dari file backup.
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 900 }}>PILIH FILE BACKUP (.ZIP / .BAK)</label>
                <div style={{ 
                  border: '2px dashed black', 
                  background: '#f9f9f9', 
                  padding: '30px 20px', 
                  textAlign: 'center',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <FileUp size={32} color="#666" />
                  <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Klik untuk memilih atau tarik file ke sini</div>
                  <div style={{ fontSize: '0.65rem', color: '#666', fontWeight: 700 }}>Ukuran maksimal: 50MB</div>
                </div>
              </div>

              <button className="neo-btn" style={{ background: 'var(--aj-red)', color: 'white', width: '100%', padding: '12px', fontSize: '0.85rem' }}>
                <RefreshCw size={18} /> PROSES RESTORE DATA
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Modal Tambah/Edit Mesin */}
      {showMachineModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="neo-box" style={{ 
            background: 'white', 
            width: '100%', 
            maxWidth: '500px', 
            padding: '25px',
            position: 'relative'
          }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px', borderBottom: '4px solid black', paddingBottom: '10px' }}>
              {selectedMachine ? 'EDIT DATA MESIN' : 'TAMBAH MESIN BARU'}
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>KODE MESIN</label>
                  <input type="text" className="neo-input" defaultValue={selectedMachine ? selectedMachine.kode : ''} placeholder="Contoh: PCK22" style={{ padding: '8px 12px' }} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>NAMA MESIN</label>
                  <input type="text" className="neo-input" defaultValue={selectedMachine ? selectedMachine.nama : ''} placeholder="Contoh: Line Packing 22" style={{ padding: '8px 12px' }} />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>KATEGORI / GRUP</label>
                  <select className="neo-input" defaultValue={selectedMachine ? selectedMachine.grup : 'Packer'} style={{ padding: '8px 12px' }}>
                    <option>Packer</option>
                    <option>Carton Erector</option>
                    <option>Sealer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>TARGET IDEAL</label>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <input type="number" className="neo-input" defaultValue={selectedMachine ? selectedMachine.target.replace(/\D/g, '') : '50'} style={{ padding: '8px 12px', borderRight: 'none', width: '100%', minWidth: 0 }} />
                    <div style={{ background: '#eee', padding: '0 15px', fontSize: '0.75rem', fontWeight: 900, border: '2px solid black', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                      pcs/min
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.7rem' }}>KONEKSI OPC UA (Node ID Prefix)</label>
                <input type="text" className="neo-input" defaultValue={selectedMachine ? selectedMachine.opc : ''} placeholder="Contoh: Line22.PLC1" style={{ padding: '8px 12px' }} />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <label style={{ fontSize: '0.7rem', margin: 0 }}>STATUS MESIN:</label>
                <div style={{ 
                  width: '40px', 
                  height: '22px', 
                  background: (!selectedMachine || selectedMachine.status) ? 'var(--aj-green)' : '#ccc', 
                  borderRadius: '12px', 
                  position: 'relative', 
                  border: '2px solid black',
                  cursor: 'pointer'
                }}>
                  <div style={{ 
                    width: '14px', 
                    height: '14px', 
                    background: 'white', 
                    borderRadius: '50%', 
                    position: 'absolute', 
                    top: '2px', 
                    right: (!selectedMachine || selectedMachine.status) ? '2px' : 'auto', 
                    left: (!selectedMachine || selectedMachine.status) ? 'auto' : '2px', 
                    border: '2px solid black' 
                  }}></div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>{(!selectedMachine || selectedMachine.status) ? 'AKTIF' : 'TIDAK AKTIF'}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
              <button 
                className="neo-btn-white" 
                style={{ padding: '8px 20px', fontSize: '0.8rem' }}
                onClick={() => setShowMachineModal(false)}
              >
                BATAL
              </button>
              <button 
                className="neo-btn" 
                style={{ background: 'var(--aj-yellow)', padding: '8px 20px', fontSize: '0.8rem' }}
                onClick={() => setShowMachineModal(false)}
              >
                <Save size={16} /> SIMPAN DATA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah/Edit User */}
      {showUserModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="neo-box" style={{ 
            background: 'white', 
            width: '100%', 
            maxWidth: '500px', 
            padding: '25px',
            position: 'relative'
          }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px', borderBottom: '4px solid black', paddingBottom: '10px' }}>
              {selectedUser ? 'EDIT DATA PENGGUNA' : 'TAMBAH PENGGUNA BARU'}
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.7rem' }}>NAMA LENGKAP</label>
                <input type="text" className="neo-input" defaultValue={selectedUser ? selectedUser.nama : ''} placeholder="Contoh: Budi Santoso" style={{ padding: '8px 12px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>USERNAME</label>
                  <input type="text" className="neo-input" defaultValue={selectedUser ? selectedUser.username : ''} placeholder="Contoh: admin_budi" style={{ padding: '8px 12px' }} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>PASSWORD</label>
                  <input type="password" className="neo-input" placeholder={selectedUser ? '(Kosongkan jika tidak diubah)' : 'Masukkan password'} style={{ padding: '8px 12px' }} />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>PERAN / ROLE</label>
                  <select className="neo-input" defaultValue={selectedUser ? selectedUser.role : 'Operator'} style={{ padding: '8px 12px' }}>
                    <option>Administrator</option>
                    <option>Supervisor</option>
                    <option>Engineer</option>
                    <option>Operator</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>SHIFT KERJA</label>
                  <select className="neo-input" defaultValue={selectedUser ? selectedUser.shift : 'All Shift'} style={{ padding: '8px 12px' }}>
                    <option>All Shift</option>
                    <option>Shift 1 (Pagi)</option>
                    <option>Shift 2 (Siang)</option>
                    <option>Shift 3 (Malam)</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <label style={{ fontSize: '0.7rem', margin: 0 }}>STATUS AKUN:</label>
                <div style={{ 
                  width: '40px', 
                  height: '22px', 
                  background: (!selectedUser || selectedUser.status) ? 'var(--aj-green)' : '#ccc', 
                  borderRadius: '12px', 
                  position: 'relative', 
                  border: '2px solid black',
                  cursor: 'pointer'
                }}>
                  <div style={{ 
                    width: '14px', 
                    height: '14px', 
                    background: 'white', 
                    borderRadius: '50%', 
                    position: 'absolute', 
                    top: '2px', 
                    right: (!selectedUser || selectedUser.status) ? '2px' : 'auto', 
                    left: (!selectedUser || selectedUser.status) ? 'auto' : '2px', 
                    border: '2px solid black' 
                  }}></div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>{(!selectedUser || selectedUser.status) ? 'AKTIF' : 'TIDAK AKTIF'}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
              <button 
                className="neo-btn-white" 
                style={{ padding: '8px 20px', fontSize: '0.8rem' }}
                onClick={() => setShowUserModal(false)}
              >
                BATAL
              </button>
              <button 
                className="neo-btn" 
                style={{ background: 'var(--aj-yellow)', padding: '8px 20px', fontSize: '0.8rem' }}
                onClick={() => setShowUserModal(false)}
              >
                <Save size={16} /> SIMPAN DATA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah/Edit Shift */}
      {showShiftModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000, padding: '20px'
        }}>
          <div className="neo-box" style={{ background: 'white', width: '100%', maxWidth: '400px', padding: '25px', position: 'relative' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px', borderBottom: '4px solid black', paddingBottom: '10px' }}>
              {selectedShift ? 'EDIT JADWAL SHIFT' : 'TAMBAH SHIFT BARU'}
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.7rem' }}>NAMA SHIFT</label>
                <input type="text" className="neo-input" defaultValue={selectedShift ? selectedShift.nama : ''} placeholder="Contoh: Shift 1 (Pagi)" style={{ padding: '8px 12px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>JAM MULAI</label>
                  <input type="time" className="neo-input" defaultValue={selectedShift ? selectedShift.mulai : '07:00'} style={{ padding: '8px 12px' }} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>JAM SELESAI</label>
                  <input type="time" className="neo-input" defaultValue={selectedShift ? selectedShift.selesai : '15:00'} style={{ padding: '8px 12px' }} />
                </div>
              </div>
              
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <label style={{ fontSize: '0.7rem', margin: 0 }}>STATUS SHIFT:</label>
                <div style={{ 
                  width: '40px', height: '22px', 
                  background: (!selectedShift || selectedShift.status) ? 'var(--aj-green)' : '#ccc', 
                  borderRadius: '12px', position: 'relative', border: '2px solid black', cursor: 'pointer'
                }}>
                  <div style={{ 
                    width: '14px', height: '14px', background: 'white', borderRadius: '50%', position: 'absolute', 
                    top: '2px', right: (!selectedShift || selectedShift.status) ? '2px' : 'auto', left: (!selectedShift || selectedShift.status) ? 'auto' : '2px', border: '2px solid black' 
                  }}></div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>{(!selectedShift || selectedShift.status) ? 'AKTIF' : 'TIDAK AKTIF'}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
              <button className="neo-btn-white" style={{ padding: '8px 20px', fontSize: '0.8rem' }} onClick={() => setShowShiftModal(false)}>BATAL</button>
              <button className="neo-btn" style={{ background: 'var(--aj-yellow)', padding: '8px 20px', fontSize: '0.8rem' }} onClick={() => setShowShiftModal(false)}>
                <Save size={16} /> SIMPAN DATA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah/Edit Hari Libur */}
      {showLiburModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000, padding: '20px'
        }}>
          <div className="neo-box" style={{ background: 'white', width: '100%', maxWidth: '500px', padding: '25px', position: 'relative' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px', borderBottom: '4px solid black', paddingBottom: '10px' }}>
              {selectedLibur ? 'EDIT HARI LIBUR' : 'TAMBAH HARI LIBUR BARU'}
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.7rem' }}>KETERANGAN / NAMA LIBUR</label>
                <input type="text" className="neo-input" defaultValue={selectedLibur ? selectedLibur.nama : ''} placeholder="Contoh: Libur Nasional Idul Fitri" style={{ padding: '8px 12px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>TANGGAL MULAI</label>
                  <input type="date" className="neo-input" style={{ padding: '8px 12px' }} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.7rem' }}>TANGGAL SELESAI</label>
                  <input type="date" className="neo-input" style={{ padding: '8px 12px' }} />
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
              <button className="neo-btn-white" style={{ padding: '8px 20px', fontSize: '0.8rem' }} onClick={() => setShowLiburModal(false)}>BATAL</button>
              <button className="neo-btn" style={{ background: 'var(--aj-yellow)', padding: '8px 20px', fontSize: '0.8rem' }} onClick={() => setShowLiburModal(false)}>
                <Save size={16} /> SIMPAN DATA
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SettingPage;
