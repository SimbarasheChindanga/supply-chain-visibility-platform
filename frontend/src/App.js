import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './Map.css';
import axios from 'axios';
import ShipmentMap from './components/ShipmentMap';
import Login from './pages/Login';
import Register from './pages/Register';
import Analytics from './pages/Analytics';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import { requestNotificationPermission, sendShipmentNotification, testNotification } from './utils/notifications';

// ✅ BACKEND API URL
const API_URL = 'https://supply-chain-api-gbnr.onrender.com';

function App() {
  const { isAuthenticated, loading, user, logout } = useAuth();
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [shipmentId, setShipmentId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loadingShipment, setLoadingShipment] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      requestNotificationPermission();
    }
  }, [isAuthenticated]);

  // Just a sample shipment for testing
  const sampleShipment = {
    origin: 'Harare, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Harare → Bulawayo',
    distance: '440 km',
    eta: '2026-08-07 16:30',
    status: 'In Transit',
    location: { lat: -19.0154, lng: 29.1549 }
  };

  const checkBackend = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/test`);
      if (response.data.success) {
        setApiStatus('✅ Connected to Backend');
      }
    } catch (error) {
      setApiStatus('❌ Backend Not Connected');
      console.error('Backend connection error:', error);
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  const trackShipment = async (e) => {
    e.preventDefault();
    if (!shipmentId.trim()) return;

    setLoadingShipment(true);
    try {
      const searchId = shipmentId.trim().toUpperCase();
      // For testing, always use the sample shipment
      if (searchId.includes('SHIP')) {
        const shipmentData = {
          id: searchId,
          ...sampleShipment,
          lastUpdate: new Date().toISOString(),
        };
        setTrackingData(shipmentData);
        sendShipmentNotification(shipmentData);
      } else {
        alert('Enter a shipment ID like SHIP-001');
        setTrackingData(null);
      }
    } catch (error) {
      console.error('Error tracking shipment:', error);
    }
    setLoadingShipment(false);
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  const Dashboard = () => (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <div className="header-content">
          <h1>🚚 Supply Chain Visibility Platform</h1>
          <div className="header-right">
            <span className="status-badge">{apiStatus}</span>
            {user && (
              <div className="user-menu">
                <span className="user-name">👋 {user.fullName || user.username}</span>
                <button onClick={() => testNotification()} className="test-notification-btn" style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '0.4rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}>🔔 Test</button>
                <button onClick={logout} className="logout-btn">Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="App-main">
        <section className="tracking-section">
          <h2>Track Your Shipment</h2>
          <form onSubmit={trackShipment} className="tracking-form">
            <input
              type="text"
              placeholder="Enter Shipment ID"
              value={shipmentId}
              onChange={(e) => setShipmentId(e.target.value)}
              className="tracking-input"
              autoFocus
            />
            <button type="submit" className="tracking-button" disabled={loadingShipment}>
              {loadingShipment ? 'Tracking...' : 'Track Shipment'}
            </button>
          </form>
        </section>

        {trackingData && (
          <section className="shipment-details">
            <h3>Shipment Details</h3>
            <div className="details-grid">
              <div className="detail-item"><span className="detail-label">Shipment ID:</span><span className="detail-value">{trackingData.id}</span></div>
              <div className="detail-item"><span className="detail-label">Status:</span><span className="detail-value status">{trackingData.status}</span></div>
              <div className="detail-item"><span className="detail-label">Route:</span><span className="detail-value">{trackingData.route}</span></div>
              <div className="detail-item"><span className="detail-label">Origin:</span><span className="detail-value">{trackingData.origin}</span></div>
              <div className="detail-item"><span className="detail-label">Destination:</span><span className="detail-value">{trackingData.destination}</span></div>
              <div className="detail-item"><span className="detail-label">Distance:</span><span className="detail-value">{trackingData.distance}</span></div>
              <div className="detail-item"><span className="detail-label">ETA:</span><span className="detail-value">{trackingData.eta}</span></div>
            </div>
            <ShipmentMap shipment={trackingData} />
          </section>
        )}
      </main>

      <footer className="App-footer">
        <p>© 2026 Supply Chain Visibility Platform | Built with React | Zimbabwe 🇿🇼</p>
      </footer>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/analytics" element={isAuthenticated ? <Analytics shipments={{}} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;