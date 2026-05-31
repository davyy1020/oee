import React from 'react';
import { LayoutDashboard, Factory, UserCog, FileBarChart, Bell, Settings, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';

const Sidebar = ({ currentPage = 'dashboard', onNavigate = () => {} }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', page: 'dashboard' },
    { icon: <Factory size={20} />, label: 'Mesin', page: 'mesin' },
    { icon: <UserCog size={20} />, label: 'Input Operator', page: 'input' },
    { icon: <FileBarChart size={20} />, label: 'Laporan', page: 'laporan' },
    { icon: <Bell size={20} />, label: 'Alarm', page: 'alarm', badge: 4 },
    { icon: <Settings size={20} />, label: 'Setting', page: 'setting' },
    { icon: <LogOut size={20} />, label: 'Logout', page: 'logout' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" style={{ height: '70px', objectFit: 'contain' }} />
      </div>
      
      {menuItems.map((item, idx) => (
        <div 
          key={idx} 
          className={`nav-item ${currentPage === item.page ? 'active' : ''}`}
          onClick={() => onNavigate(item.page)}
        >
          {item.icon}
          <span>{item.label}</span>
          {item.badge && (
            <span style={{ 
              marginLeft: 'auto', 
              background: 'var(--aj-red)', 
              color: 'white', 
              borderRadius: '50%', 
              width: '22px', 
              height: '22px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 900
            }}>
              {item.badge}
            </span>
          )}
        </div>
      ))}

      <div className="plant-status">
        <p>PLANT</p>
        <p>KARAWANG PACKING PLANT</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00FF00', border: '2px solid black' }}></div>
          <span style={{ fontSize: '0.8rem', fontWeight: 900 }}>CONNECTED</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
