import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'history', label: 'Telemetry Log' },
    { id: 'alerts', label: 'Emergency Alerts' },
    { id: 'architecture', label: 'AWS Architecture' }
  ];

  return (
    <aside className="donezo-sidebar">
      {/* Brand Logo */}
      <div className="donezo-logo">
        <div className="logo-icon">T</div>
        <span>Traveler</span>
      </div>

      {/* Menu Section */}
      <div className="nav-group-label">MENU</div>
      <ul className="donezo-nav-list">
        {menuItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <li 
              key={item.id} 
              className={`donezo-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>

      {/* Donezo Bottom Card */}
      <div className="donezo-sidebar-card">
        <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.25rem' }}>AWS Cloud Active</div>
        <div style={{ opacity: 0.8, fontSize: '0.775rem' }}>Region: ap-south-1 (Mumbai)</div>
        <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: '#A3E635' }}>
          ● Live Stream 4s
        </div>
      </div>
    </aside>
  );
}
