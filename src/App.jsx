import React, { useState } from 'react'
import { LogOut } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import KPICard from './components/KPICard'
import ChartsSection from './components/ChartsSection'
import MachineGrid from './components/MachineGrid'
import OperatorPanel from './components/OperatorPanel'
import MesinPage from './components/MesinPage'
import InputOperatorPage from './components/InputOperatorPage'
import LaporanPage from './components/LaporanPage'
import AlarmPage from './components/AlarmPage'
import SettingPage from './components/SettingPage'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleNavigate = (page) => {
    if (page === 'logout') {
      setShowLogoutModal(true);
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      
      <div className="sidebar-column">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
        {(currentPage === 'dashboard' || currentPage === 'mesin' || currentPage === 'input' || currentPage === 'laporan' || currentPage === 'alarm' || currentPage === 'setting') && <OperatorPanel />}
      </div>
      
      <main>
        {currentPage === 'dashboard' && (
          <>
            <div className="kpi-grid">
              <KPICard title="OEE Total" value="72" target="85" color="var(--aj-yellow)" />
              <KPICard title="Availability" value="85" target="90" color="var(--aj-blue)" />
              <KPICard title="Performance" value="80" target="90" color="var(--aj-green)" />
              <KPICard title="Quality" value="95" target="95" color="var(--aj-orange)" />
            </div>

            <div className="charts-main-grid">
              <ChartsSection />
            </div>

            <MachineGrid onMachineClick={() => setCurrentPage('mesin')} />
          </>
        )}

        {currentPage === 'mesin' && (
          <MesinPage onBack={() => setCurrentPage('dashboard')} />
        )}

        {currentPage === 'input' && (
          <InputOperatorPage onBack={() => setCurrentPage('dashboard')} />
        )}

        {currentPage === 'laporan' && (
          <LaporanPage onBack={() => setCurrentPage('dashboard')} />
        )}
        
        {currentPage === 'alarm' && (
          <AlarmPage onBack={() => setCurrentPage('dashboard')} />
        )}

        {currentPage === 'setting' && (
          <SettingPage onBack={() => setCurrentPage('dashboard')} />
        )}
      </main>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999, padding: '20px'
        }}>
          <div className="neo-box" style={{ background: 'var(--aj-yellow)', width: '100%', maxWidth: '400px', padding: '30px', position: 'relative', textAlign: 'center', border: '4px solid black', boxShadow: '8px 8px 0px black' }}>
            <div style={{ width: '60px', height: '60px', background: 'var(--aj-red)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid black', boxShadow: '4px 4px 0px black' }}>
              <LogOut size={30} color="white" style={{ marginLeft: '4px' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '10px' }}>
              KONFIRMASI LOGOUT
            </h2>
            <p style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '30px' }}>
              Apakah Anda yakin ingin keluar dari sistem Monitoring OEE?
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <button 
                className="neo-btn-white" 
                style={{ padding: '12px', fontSize: '0.9rem' }} 
                onClick={() => setShowLogoutModal(false)}
              >
                BATAL
              </button>
              <button 
                className="neo-btn" 
                style={{ background: 'var(--aj-red)', color: 'white', padding: '12px', fontSize: '0.9rem' }} 
                onClick={() => {
                  setShowLogoutModal(false);
                  setCurrentPage('dashboard');
                  // In a real app, you would clear tokens here and redirect to /login
                }}
              >
                YA, KELUAR
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default App
