// ============================================
// SHIPMENT MAP COMPONENT
// Displays shipment location on Zimbabwe map
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

        {/* Current Location Marker (green dot) */}
        {shipment.location && (
          <Marker 
            position={[shipment.location.lat, shipment.location.lng]}
            icon={greenIcon}
          >
            <Popup>
              <strong>🚚 Current Location</strong><br />
              {shipment.status}
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
          <span className="map-info-label">Status:</span>
          <span className="map-info-value" style={{ color: getStatusColor(shipment.status) }}>
            {shipment.status}
          </span>
        </div>
        <div className="map-info-item">
          <span className="map-info-label">Distance:</span>
          <span className="map-info-value">{shipment.distance}</span>
        </div>
      </div>
    </div>
  );
}

// Helper function to get city coordinates
function getCityCoordinates(cityString) {
  if (!cityString) return null;
  
  // Extract city name from string (e.g., "Harare, Zimbabwe" → "Harare")
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