// ============================================
// SHIPMENT MAP COMPONENT
// With Curved Route Waypoints & Zoom Fix
// ============================================

import React, { useEffect, useState } from 'react';
//import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
  useMap
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// City coordinates for fallback routes
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
  'Chimanimani': [-19.8000, 32.8667]
};


// Fetch a road-following route from the public OSRM demo service.
// Falls back to the supplied points when routing is unavailable.
function RoadRouteLayer({ originCoords, destCoords, waypoints }) {
  const [route, setRoute] = useState(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const points = [
      ...(originCoords ? [originCoords] : []),
      ...(Array.isArray(waypoints)
        ? waypoints
            .filter(wp => Number.isFinite(wp.lat) && Number.isFinite(wp.lng))
            .map(wp => [wp.lat, wp.lng])
        : []),
      ...(destCoords ? [destCoords] : [])
    ];

    const uniquePoints = points.filter((point, index) =>
      index === 0 ||
      point[0] !== points[index - 1][0] ||
      point[1] !== points[index - 1][1]
    );

    setRoute(null);
    setFallback(false);

    if (uniquePoints.length < 2) {
      setRoute(uniquePoints);
      return () => { cancelled = true; };
    }

    const fallbackRoute = uniquePoints;

    async function loadRoute() {
      try {
        const coordinates = uniquePoints
          .map(([lat, lng]) => `${lng},${lat}`)
          .join(';');

        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`
        );

        if (!response.ok) {
          throw new Error(`Routing service returned HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.code !== 'Ok' || !data.routes?.[0]?.geometry?.coordinates) {
          throw new Error('No road route was returned');
        }

        const roadCoordinates = data.routes[0].geometry.coordinates
          .map(([lng, lat]) => [lat, lng]);

        if (!cancelled) {
          setRoute(roadCoordinates);
          setFallback(false);
        }
      } catch (error) {
        console.warn('Road routing unavailable; showing fallback line.', error);

        if (!cancelled) {
          setRoute(fallbackRoute);
          setFallback(true);
        }
      }
    }

    loadRoute();

    return () => { cancelled = true; };
  }, [originCoords, destCoords, waypoints]);

  if (!route || route.length < 2) return null;

  return (
    <Polyline
      positions={route}
      color={fallback ? '#f59e0b' : '#2563eb'}
      weight={fallback ? 3 : 5}
      opacity={0.9}
      dashArray={fallback ? '8, 8' : undefined}
    />
  );
}

// =====================================================
// FIT SHIPMENT ROUTE TO MAP VIEWPORT
// Automatically adjusts map center and zoom to display
// the origin, destination, waypoints, and truck location.
// Validates coordinates and adds padding around the route.
// =====================================================
function FitShipmentRoute({ positions, truckPosition, viewMode }) {
  const map = useMap();

  React.useEffect(() => {
    // Keep only valid latitude and longitude coordinates
    const validPositions = positions.filter(
      (position) =>
        Array.isArray(position) &&
        position.length === 2 &&
        Number.isFinite(position[0]) &&
        Number.isFinite(position[1])
    );

    // Stop if there are no valid coordinates
    if (validPositions.length === 0) return;

    
    // Focus closely when only one coordinate is available
if (viewMode === 'truck' && truckPosition) {
  map.setView(truckPosition, 17, { animate: true });
  return;
}

    // Fit the map around all route coordinates
    map.fitBounds(validPositions, {
      padding: [35, 35],
      maxZoom: 13,
      animate: true,
    });
  },  [map, positions, truckPosition, viewMode]);

  return null;
}

function ShipmentMap({ shipment }) {
  const [viewMode, setViewMode] = useState('truck');
const truckPosition = shipment?.location
  ? [shipment.location.lat, shipment.location.lng]
  : null;
  if (!shipment) {
    return (
      <div className="map-placeholder">
        <p>Enter a shipment ID to view location on map</p>
      </div>
    );
  }

  const originCoords = getCityCoordinates(shipment.origin);
  const destCoords = getCityCoordinates(shipment.destination);
  


  const centerCoords = shipment.location
    ? [shipment.location.lat, shipment.location.lng]
    : [-17.8252, 31.0335];

  // Custom Truck Icon (makes the current location pop out)
  const truckIcon = L.divIcon({
    className: 'custom-truck-icon',
    html: `<div style="background-color:#22c55e;width:32px;height:32px;border-radius:50%;border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;font-size:16px;z-index:999;"></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });


  return (
    <div className="map-container">
    <div className="map-view-controls">
  <button
    type="button"
    onClick={() => setViewMode('truck')}
    disabled={!truckPosition}
  >
    Focus Truck
  </button>

  <button
    type="button"
    onClick={() => setViewMode('route')}
  >
    Show Full Route
  </button>
</div>
      <MapContainer
        center={centerCoords}
        zoom={8}
        style={{ height: '400px', width: '100%', borderRadius: '12px' }}
        scrollWheelZoom={true}
        maxZoom={20} /* Increased max zoom */
      >
      <FitShipmentRoute
  positions={[
    ...(originCoords ? [originCoords] : []),
    ...(shipment.waypoints || []).map(wp => [wp.lat, wp.lng]),
    ...(destCoords ? [destCoords] : []),
    ...(truckPosition ? [truckPosition] : [])
  ]}
  truckPosition={truckPosition}
  viewMode={viewMode}
/>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          subdomains={['a', 'b', 'c']}
          maxZoom={20} /* Increased max zoom */
        />

        {/* Origin Marker */}
        {originCoords && (
          <Marker position={originCoords}>
            <Popup>
              <strong>Origin</strong><br />
              {shipment.origin}
            </Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {destCoords && (
          <Marker position={destCoords}>
            <Popup>
              <strong>Destination</strong><br />
              {shipment.destination}
            </Popup>
          </Marker>
        )}

        {/* Waypoint Markers */}
        {shipment.waypoints && shipment.waypoints.map((wp, index) => (
          <CircleMarker 
            key={index} 
            center={[wp.lat, wp.lng]} 
            radius={5} 
            pathOptions={{ color: 'white', fillColor: '#6b7280', fillOpacity: 1, weight: 2 }}
          >
            <Popup>
              <strong>Waypoint</strong><br />
              {wp.name}
            </Popup>
          </CircleMarker>
        ))}

                {/* Current truck marker and visible location label */}
                

        {shipment.location && (
          <Marker
            position={[shipment.location.lat, shipment.location.lng]}
            icon={truckIcon}
          > 

            



            <Popup>
              <strong>Current Location</strong><br />
              Area: {shipment.currentArea || 'Unknown'}<br />
              Road: {shipment.currentRoad || 'Unknown'}<br />
              Landmark: {shipment.currentLandmark || 'Unknown'}<br />
              Next Stop: {shipment.nextStop || 'N/A'}<br />
              Distance: {shipment.distanceToNextStop || 'N/A'}<br />
              Status: {shipment.status}
            </Popup>
          </Marker>
        )}

        {/* Road-following route; falls back to a dashed line if routing fails */}
        <RoadRouteLayer
          originCoords={originCoords}
          destCoords={destCoords}
          waypoints={shipment.waypoints}
        />
      </MapContainer>

      {/* Info Panel */}
      <div className="map-info">
        <div className="map-info-item">
          <span className="map-info-label">Route:</span>
          <span className="map-info-value">{shipment.route}</span>
        </div>
        <div className="map-info-item">
          <span className="map-info-label">Current Area:</span>
          <span className="map-info-value" style={{ color: '#22c55e', fontWeight: 'bold' }}>
            {shipment.currentArea || 'Unknown'}
          </span>
        </div>
        <div className="map-info-item">
          <span className="map-info-label">Road:</span>
          <span className="map-info-value">{shipment.currentRoad || 'Unknown'}</span>
        </div>
        <div className="map-info-item">
          <span className="map-info-label">Landmark:</span>
          <span className="map-info-value">{shipment.currentLandmark || 'Unknown'}</span>
        </div>
        <div className="map-info-item">
          <span className="map-info-label">Next Stop:</span>
          <span className="map-info-value">{shipment.nextStop || 'N/A'}</span>
        </div>
        <div className="map-info-item">
          <span className="map-info-label">Status:</span>
          <span className="map-info-value" style={{ color: getStatusColor(shipment.status) }}>
            {shipment.status}
          </span>
        </div>
      </div>
    </div>
  );
}

function getCityCoordinates(cityString) {
  if (!cityString) return null;
  const cityName = cityString.split(',')[0].trim();
  return cityCoordinates[cityName] || null;
}

function getStatusColor(status) {
  if (!status) return '#3b82f6';
  if (status.includes('Delivered')) return '#22c55e';
  if (status.includes('Delayed') || status.includes('Delay')) return '#ef4444';
  if (status.includes('Border') || status.includes('Clearance')) return '#f59e0b';
  if (status.includes('Pending')) return '#94a3b8';
  return '#3b82f6';
}

export default ShipmentMap;

