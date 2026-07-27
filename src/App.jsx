import React, { useState, useEffect } from 'react';
import { fetchTelemetryData } from './services/api';
import Sidebar from './components/Sidebar';
import MetricsCards from './components/MetricsCards';
import LiveMap from './components/LiveMap';
import TelemetryChart from './components/TelemetryChart';
import HistoryTable from './components/HistoryTable';

export default function App() {
  const [telemetryList, setTelemetryList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const loadData = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const data = await fetchTelemetryData();
      if (Array.isArray(data)) {
        setTelemetryList(data);
      }
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Telemetry fetch error:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => loadData(), 4000);
    return () => clearInterval(interval);
  }, []);

  const latestRecord = telemetryList.length > 0 ? telemetryList[0] : null;

  return (
    <div className="donezo-app-container">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace */}
      <div className="donezo-main">
        {/* Top Header Bar */}
        <div className="donezo-top-bar">
          <div className="search-input-wrapper">
            <span>🔍</span>
            <input type="text" placeholder="Search traveler telemetry..." />
            <span style={{ fontSize: '0.7rem', color: '#9CA3AF', background: '#F3F4F6', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>⌘F</span>
          </div>

          <div className="top-bar-right">
            <button className="btn-donezo-green" onClick={() => loadData(true)} disabled={isRefreshing}>
              {isRefreshing ? 'Syncing...' : '+ Sync Telemetry'}
            </button>

            <div className="user-profile-chip">
              <div className="avatar-circle">TM</div>
              <div style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>
                <div style={{ fontWeight: 800 }}>Totok Michael</div>
                <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>tmichael20@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="donezo-page-header">
          <h1>
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'history' && 'Telemetry Log'}
            {activeTab === 'alerts' && 'Emergency Alerts'}
            {activeTab === 'architecture' && 'AWS Architecture'}
          </h1>
          <p>Real-time event-driven traveler safety monitoring console.</p>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <>
            {/* Donezo Top Metrics Cards */}
            <MetricsCards latest={latestRecord} />

            {/* Donezo Split View (Map & Vitals Chart) */}
            <div className="donezo-split">
              {/* Geolocation Map Panel */}
              <div className="donezo-panel">
                <div className="panel-header-donezo">
                  <h3>Geolocation Tracking</h3>
                  <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                    Updated: {lastUpdated.toLocaleTimeString()}
                  </span>
                </div>
                <div className="donezo-map-wrapper">
                  <LiveMap telemetryList={telemetryList} />
                </div>
              </div>

              {/* Telemetry Sensor Trends Panel */}
              <div className="donezo-panel">
                <div className="panel-header-donezo">
                  <h3>Telemetry Trends</h3>
                </div>
                <TelemetryChart telemetryList={telemetryList} />
              </div>
            </div>

            {/* Recent Telemetry Table */}
            <HistoryTable telemetryList={telemetryList.slice(0, 5)} />
          </>
        )}

        {/* TAB 2: HISTORY */}
        {activeTab === 'history' && (
          <HistoryTable telemetryList={telemetryList} />
        )}

        {/* TAB 3: ALERTS */}
        {activeTab === 'alerts' && (
          <div className="donezo-panel">
            <div className="panel-header-donezo">
              <h3>Emergency Incidents Audit Trail</h3>
              <span className="pill-badge pill-red">High Risk</span>
            </div>
            <div className="donezo-table-container">
              <table className="donezo-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Traveler ID</th>
                    <th>Status Trigger</th>
                    <th>Impact G</th>
                    <th>Heart Rate</th>
                    <th>Notification Action</th>
                  </tr>
                </thead>
                <tbody>
                  {telemetryList.filter(t => t.risk_level === 'HIGH' || t.risk_level === 'MEDIUM').map((alert, idx) => (
                    <tr key={idx}>
                      <td>{new Date(alert.timestamp).toLocaleString()}</td>
                      <td style={{ fontWeight: 700 }}>{alert.traveler_id}</td>
                      <td>
                        <span className={`pill-badge pill-${alert.risk_level === 'HIGH' ? 'red' : 'yellow'}`}>
                          {alert.status}
                        </span>
                      </td>
                      <td>{alert.impact_g} G</td>
                      <td>{alert.heart_rate_bpm} BPM</td>
                      <td style={{ color: '#166534', fontWeight: 700 }}>
                        AWS SNS Emergency Alert Sent
                      </td>
                    </tr>
                  ))}
                  {telemetryList.filter(t => t.risk_level === 'HIGH' || t.risk_level === 'MEDIUM').length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', color: '#9CA3AF', padding: '2rem' }}>
                        No emergency alerts logged. All traveler metrics nominal.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="donezo-panel">
            <div className="panel-header-donezo">
              <h3>AWS Event-Driven System Architecture</h3>
            </div>
            <div style={{ background: '#134E35', color: '#FFFFFF', padding: '1.5rem', borderRadius: '12px' }}>
              <pre style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: '1.6', overflowX: 'auto' }}>
{`[Python IoT Device Simulator / ESP32]
      │  (MQTT over TLS 1.2 on Port 8883)
      ▼
[AWS IoT Core Engine] ──(IoT Rule: SELECT * FROM 'traveler/telemetry')──► Event Trigger
      │
      ▼
[AWS Lambda: TelemetryProcessor]
      │  (Evaluates Safety Rules: Impact G, Heart Rate, Body Temp)
      ▼
[AWS DynamoDB: TravelerTelemetry]  ◄─── (REST API query via Lambda) ─── [AWS API Gateway]
      │                                                                        ▲
      ▼ (DynamoDB Streams)                                                     │
[AWS Lambda: AlertNotifier]                                             [React Dashboard]
      │                                                                 (Hosted on EC2)
      ▼
[AWS SNS: TravelerAlerts] ──► (Emergency Email & SMS Alerts)`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
