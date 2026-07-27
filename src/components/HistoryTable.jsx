import React, { useState } from 'react';

export default function HistoryTable({ telemetryList }) {
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  if (!telemetryList || telemetryList.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF' }}>
        No telemetry records found.
      </div>
    );
  }

  const filtered = telemetryList.filter(item => {
    const matchesRisk = filterRisk === 'ALL' || item.risk_level === filterRisk;
    const matchesSearch = (item.traveler_id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.status || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  return (
    <div className="donezo-panel">
      <div className="panel-header-donezo">
        <h3>Telemetry Data Log (DynamoDB Table)</h3>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            placeholder="Search traveler ID / status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.45rem 0.85rem',
              border: '1px solid #E2E8F0',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          />
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            style={{
              padding: '0.45rem 0.85rem',
              border: '1px solid #E2E8F0',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              outline: 'none',
              backgroundColor: '#FFFFFF',
              color: '#111827',
              fontWeight: 700
            }}
          >
            <option value="ALL">All Risk Levels</option>
            <option value="HIGH">HIGH (Emergency)</option>
            <option value="MEDIUM">MEDIUM (Warning)</option>
            <option value="LOW">LOW (Normal)</option>
          </select>
        </div>
      </div>

      <div className="donezo-table-container">
        <table className="donezo-table">
          <thead>
            <tr>
              <th>Timestamp (UTC)</th>
              <th>Traveler ID</th>
              <th>Status</th>
              <th>Risk Level</th>
              <th>Heart Rate</th>
              <th>Body Temp</th>
              <th>Impact</th>
              <th>Coordinates</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={idx}>
                <td>{new Date(row.timestamp).toLocaleString()}</td>
                <td style={{ fontWeight: 700 }}>{row.traveler_id}</td>
                <td>
                  <span className={`pill-badge pill-${row.risk_level === 'HIGH' ? 'red' : row.risk_level === 'MEDIUM' ? 'yellow' : 'green'}`}>
                    {row.status}
                  </span>
                </td>
                <td style={{ fontWeight: 700, color: row.risk_level === 'HIGH' ? '#991B1B' : row.risk_level === 'MEDIUM' ? '#92400E' : '#166534' }}>
                  {row.risk_level}
                </td>
                <td>{row.heart_rate_bpm} BPM</td>
                <td>{row.body_temp_c} °C</td>
                <td>{row.impact_g} G</td>
                <td style={{ color: '#6B7280' }}>
                  {row.latitude?.toFixed(4)}, {row.longitude?.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
