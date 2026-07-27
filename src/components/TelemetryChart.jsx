import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function TelemetryChart({ telemetryList }) {
  if (!telemetryList || telemetryList.length === 0) {
    return (
      <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
        Awaiting telemetry data stream...
      </div>
    );
  }

  // Format data for chart
  const chartData = [...telemetryList].reverse().map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    heartRate: item.heart_rate_bpm,
    temp: item.body_temp_c
  }));

  return (
    <div style={{ width: '100%', height: '240px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
          <YAxis yAxisId="left" stroke="#DC2626" fontSize={11} domain={[40, 180]} />
          <YAxis yAxisId="right" orientation="right" stroke="#134E35" fontSize={11} domain={[35, 42]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }}
          />
          <Legend wrapperStyle={{ fontSize: '0.75rem', paddingTop: '5px' }} />
          <Line yAxisId="left" type="monotone" dataKey="heartRate" name="Heart Rate (BPM)" stroke="#DC2626" strokeWidth={2} dot={{ r: 3 }} />
          <Line yAxisId="right" type="monotone" dataKey="temp" name="Body Temp (°C)" stroke="#134E35" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
