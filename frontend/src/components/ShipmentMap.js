// ============================================
// SHIPMENT MAP COMPONENT
// Displays shipment location on Zimbabwe map
// With detailed current location info
// ============================================

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// City coordinates for routes
const cityCoordinates = {
  'Harare': [-17.8252, 31.0335],
  'Bulawayo': [-20.1486, 28.5877],
  'Mutare': [-18.9758, 32.6707],
  'Beitbridge': [-22.2150, 30.0000],
  'Victoria Falls': [-17.9328, 25.8307],
  'Chirundu': [-16.0283, 28.8550],
  'Gweru': [-19.4550, 29.8100],
  'Masvingo': [-20.0625, 30.8300],
  'Kariba': [-16.5167, 28.8000],
  'Nyamapanda': [-16.9300, 32.5000],
  'Plumtree': [-20.4800, 27.8200],
  'Kwekwe': [-18.9200, 29.8100],
  'Gokwe': [-18.2100, 28.9300],
  'Mvuma': [-19.2800, 30.5300],
  'Chiredzi': [-21.0500, 31.6700],
  'Chinhoyi': [-17.3500, 30.2000],
  'Kadoma': [-18.3333, 29.9167],
  'Chegutu': [-18.1333, 30.1500],
  'Chimanimani': [-19.8000, 32.8667],
};

function ShipmentMap({ shipment }) {
  // If no shipment, show placeholder
  if (!shipment) {
    return (
      <div className="map-placeholder">
        <p>📍 Enter a shipment ID to view location on map</p>
      </div>
    );
  }

  // Get coordinates for origin and destination
  const originCoords = getCityCoordinates(shipment.origin);
  const destCoords = getCityCoordinates(shipment.destination);
  
  // Default center: Harare if no location
  const centerCoords = shipment.location 
    ? [shipment.location.lat, shipment.location.lng] 
    : [-17.8252, 31.0335];

  // Create route line between origin and destination
  const routeLine = originCoords && destCoords 
    ? [originCoords, destCoords] 
    : [];

  // Create custom green marker for current location
  const greenIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color:#4ade80;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  return (
    <div className="map-container">
      <MapContainer
        center={centerCoords}
        zoom={7}
        style={{ height: '400px', width: '100%', borderRadius: '12px' }}
        scrollWheelZoom={true}
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Origin Marker */}
        {originCoords && (
          <Marker position={originCoords}>
            <Popup>
              <strong>📍 Origin</strong><br />
              {shipment.origin}
            </Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {destCoords && (
          <Marker position={destCoords}>
            <Popup>
              <strong>🏁 Destination</strong><br />
              {shipment.destination}
            </Popup>
          </Marker>
        )}

        {/* Current Location Marker (green dot) with detailed info */}
        {shipment.location && (
          <Marker 
            position={[shipment.location.lat, shipment.location.lng]}
            icon={greenIcon}
          >
            <Popup>
              <div style={{ minWidth: '220px' }}>
                <strong style={{ fontSize: '14px' }}>🚚 Current Location</strong>
                <hr style={{ margin: '6px 0' }} />
                <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  <strong>📍 Area:</strong> {shipment.currentArea || 'Unknown'}<br />
                  <strong>🛣️ Road:</strong> {shipment.currentRoad || 'Unknown'}<br />
                  <strong>🏢 Landmark:</strong> {shipment.currentLandmark || 'Unknown'}<br />
                  <strong>🎯 Next Stop:</strong> {shipment.nextStop || 'N/A'}<br />
                  <strong>📏 Distance:</strong> {shipment.distanceToNextStop || 'N/A'}<br />
                  <strong>📊 Status:</strong> {shipment.status}
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Route Line */}
        {routeLine.length === 2 && (
          <Polyline 
            positions={routeLine} 
            color="#2563eb" 
            weight={3}
            opacity={0.7}
            dashArray="10, 10"
          />
        )}
      </MapContainer>

      {/* Shipment Info Overlay */}
      <div className="map-info">
        <div className="map-info-item">
          <span className="map-info-label">Route:</span>
          <span className="map-info-value">{shipment.route}</span>
        </div>
        <div className="map-info-item">
          <span className="map-info-label">📍 Current Area:</span>
          <span className="map-info-value" style={{ color: '#22c55e' }}>
            {shipment.currentArea || 'Unknown'}
          </span>
        </div>
        <div className="map-info-item">
          <span className="map-info-label">🛣️ Road:</span>
          <span className="map-info-value">{shipment.currentRoad || 'Unknown'}</span>
        </div>
        <div className="map-info-item">
          <span className="map-info-label">🏢 Landmark:</span>
          <span className="map-info-value">{shipment.currentLandmark || 'Unknown'}</span>
        </div>
        <div className="map-info-item">
          <span className="map-info-label">🎯 Next Stop:</span>
          <span className="map-info-value">{shipment.nextStop || 'N/A'}</span>
        </div>
        <div className="map-info-item">
          <span className="map-info-label">📏 Distance:</span>
          <span className="map-info-value">{shipment.distanceToNextStop || 'N/A'}</span>
        </div>
        <div className="map-info-item">
          <span className="map-info-label">📊 Status:</span>
          <span className="map-info-value" style={{ color: getStatusColor(shipment.status) }}>
            {shipment.status}
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper function to get city coordinates
function getCityCoordinates(cityString) {
  if (!cityString) return null;
  const cityName = cityString.split(',')[0].trim();
  return cityCoordinates[cityName] || null;
}

// Helper function for status colors
function getStatusColor(status) {
  if (!status) return '#3b82f6';
  if (status.includes('Delivered')) return '#22c55e';
  if (status.includes('Delayed') || status.includes('Delay')) return '#ef4444';
  if (status.includes('Border') || status.includes('Clearance')) return '#f59e0b';
  if (status.includes('Pending')) return '#94a3b8';
  return '#3b82f6';
}

export default ShipmentMap;