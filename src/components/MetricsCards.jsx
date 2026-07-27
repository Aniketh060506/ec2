import React from 'react';

export default function MetricsCards({ latest }) {
  if (!latest || !latest.timestamp) {
    return (
      <div className="donezo-metrics-grid">
        <div className="donezo-card donezo-card-highlight">
          <div className="card-top-row">
            <span className="card-title-text">Safety Status</span>
            <div className="card-arrow-btn card-arrow-btn-light">↗</div>
          </div>
          <div className="card-big-number">--</div>
          <div className="card-foot-note" style={{ color: '#A3E635' }}>
            <span>● Awaiting Python MQTT telemetry...</span>
          </div>
        </div>

        <div className="donezo-card">
          <div className="card-top-row">
            <span className="card-title-text">Heart Rate</span>
            <div className="card-arrow-btn">↗</div>
          </div>
          <div className="card-big-number">-- <span style={{ fontSize: '1rem', fontWeight: 500, color: '#6B7280' }}>BPM</span></div>
          <div className="card-foot-note">
            <span>No data received</span>
          </div>
        </div>

        <div className="donezo-card">
          <div className="card-top-row">
            <span className="card-title-text">Body Temp</span>
            <div className="card-arrow-btn">↗</div>
          </div>
          <div className="card-big-number">-- °C</div>
          <div className="card-foot-note">
            <span>No data received</span>
          </div>
        </div>

        <div className="donezo-card">
          <div className="card-top-row">
            <span className="card-title-text">Impact Force</span>
            <div className="card-arrow-btn">↗</div>
          </div>
          <div className="card-big-number">-- <span style={{ fontSize: '1rem', fontWeight: 500, color: '#6B7280' }}>G</span></div>
          <div className="card-foot-note">
            <span>No data received</span>
          </div>
        </div>
      </div>
    );
  }

  const {
    traveler_id = 'TravelerDevice_001',
    status = 'NORMAL',
    risk_level = 'LOW',
    heart_rate_bpm = '--',
    body_temp_c = '--',
    impact_g = '--',
    fall_detected = false,
    speed_kmh = 0,
    alert_message = 'Live telemetry pings active.'
  } = latest;

  return (
    <div className="donezo-metrics-grid">
      {/* 1. Highlight Solid Forest Green Card */}
      <div className={`donezo-card ${risk_level === 'HIGH' ? 'donezo-card-danger' : 'donezo-card-highlight'}`} style={{ backgroundColor: risk_level === 'HIGH' ? '#DC2626' : '#134E35' }}>
        <div className="card-top-row">
          <span className="card-title-text">Safety Status</span>
          <div className="card-arrow-btn card-arrow-btn-light">↗</div>
        </div>
        <div className="card-big-number">{status}</div>
        <div className="card-foot-note" style={{ color: '#A3E635' }}>
          <span>● {alert_message}</span>
        </div>
      </div>

      {/* 2. Heart Rate Card */}
      <div className="donezo-card">
        <div className="card-top-row">
          <span className="card-title-text">Heart Rate</span>
          <div className="card-arrow-btn">↗</div>
        </div>
        <div className="card-big-number">{heart_rate_bpm} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#6B7280' }}>BPM</span></div>
        <div className="card-foot-note">
          <span>{heart_rate_bpm > 130 ? '⚠️ High HR Alert' : 'Live Data Stream'}</span>
        </div>
      </div>

      {/* 3. Body Temp Card */}
      <div className="donezo-card">
        <div className="card-top-row">
          <span className="card-title-text">Body Temp</span>
          <div className="card-arrow-btn">↗</div>
        </div>
        <div className="card-big-number">{body_temp_c}°C</div>
        <div className="card-foot-note">
          <span>{body_temp_c > 38.5 ? '🔥 Fever Warning' : 'Live Data Stream'}</span>
        </div>
      </div>

      {/* 4. Impact Force Card */}
      <div className="donezo-card">
        <div className="card-top-row">
          <span className="card-title-text">Impact Force</span>
          <div className="card-arrow-btn">↗</div>
        </div>
        <div className="card-big-number">{impact_g} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#6B7280' }}>G</span></div>
        <div className="card-foot-note">
          <span>{fall_detected ? '🚨 Fall Detected' : 'Live Data Stream'}</span>
        </div>
      </div>
    </div>
  );
}
