import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Leaflet marker icons with reliable CDN fallbacks
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function LiveMap({ telemetryList }) {
  const latest = (telemetryList && telemetryList.length > 0) ? telemetryList[0] : {
    latitude: 17.3850,
    longitude: 78.4867,
    traveler_id: "TravelerDevice_001",
    status: "NORMAL",
    speed_kmh: 0.0,
    timestamp: new Date().toISOString()
  };

  const centerLat = latest.latitude || 17.3850;
  const centerLon = latest.longitude || 78.4867;

  // Extract path history
  const pathPositions = (telemetryList || [])
    .filter(t => t && t.latitude && t.longitude)
    .map(t => [t.latitude, t.longitude]);

  return (
    <div style={{ height: '240px', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
      <MapContainer 
        center={[centerLat, centerLon]} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: '240px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {pathPositions.length > 1 && (
          <Polyline positions={pathPositions} color="#134E35" weight={3} opacity={0.8} dashArray="5, 8" />
        )}

        <Marker position={[centerLat, centerLon]} icon={latest.risk_level === 'HIGH' ? redIcon : greenIcon}>
          <Popup>
            <div style={{ fontSize: '0.85rem' }}>
              <strong>Traveler: {latest.traveler_id}</strong><br />
              Status: <strong>{latest.status}</strong><br />
              Speed: {latest.speed_kmh} km/h
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
