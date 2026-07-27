import React from 'react';

export default function MetricsCards({ latest }) {
  const {
    traveler_id = 'TravelerDevice_001',
    status = 'NORMAL',
    risk_level = 'LOW',
    heart_rate_bpm = 76,
    body_temp_c = 36.8,
    impact_g = 0.98,
    fall_detected = false,
    speed_kmh = 0.0,
    alert_message = 'All parameters nominal.'
  } = latest || {};

  return (
    <div className="donezo-metrics-grid">
      {/* 1. Highlight Solid Forest Green Card (Matching Donezo Total Projects Card) */}
      <div className="donezo-card donezo-card-highlight">
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
          <span>{heart_rate_bpm > 130 ? '⚠️ High HR Alert' : 'Normal Range (60-100 BPM)'}</span>
        </div>
      </div>

      {/* 3. Body Temperature Card */}
      <div className="donezo-card">
        <div className="card-top-row">
          <span className="card-title-text">Body Temp</span>
          <div className="card-arrow-btn">↗</div>
        </div>
        <div className="card-big-number">{body_temp_c}°C</div>
        <div className="card-foot-note">
          <span>{body_temp_c > 38.5 ? '🔥 High Fever Warning' : 'Normal (36.5°C - 37.5°C)'}</span>
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
          <span>{fall_detected ? '🚨 Fall Detected' : 'Nominal (No Impact)'}</span>
        </div>
      </div>
    </div>
  );
}
