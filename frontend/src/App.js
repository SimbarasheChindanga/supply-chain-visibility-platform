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

function App() {
  const { isAuthenticated, loading, user, logout } = useAuth();
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [shipmentId, setShipmentId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loadingShipment, setLoadingShipment] = useState(false);

  // Request notification permission when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      requestNotificationPermission();
    }
  }, [isAuthenticated]);

  // Zimbabwe Routes Database - 50 Shipments
  const zimbabweRoutes = {
    // HARARE ROUTES
    'SHIP-001': {
      origin: 'Harare, Zimbabwe',
      destination: 'Bulawayo, Zimbabwe',
      route: 'Harare → Bulawayo',
      distance: '440 km',
      eta: '2026-08-07 16:30',
      status: 'In Transit',
      location: { lat: -19.0154, lng: 29.1549 }
    },
    'SHIP-002': {
      origin: 'Harare, Zimbabwe',
      destination: 'Mutare, Zimbabwe',
      route: 'Harare → Mutare',
      distance: '263 km',
      eta: '2026-08-07 12:00',
      status: 'Delivered',
      location: { lat: -18.9758, lng: 32.6707 }
    },
    'SHIP-003': {
      origin: 'Harare, Zimbabwe',
      destination: 'Beitbridge, Zimbabwe',
      route: 'Harare → Beitbridge (Border)',
      distance: '580 km',
      eta: '2026-08-08 09:00',
      status: 'In Transit',
      location: { lat: -20.1325, lng: 28.6265 }
    },
    'SHIP-004': {
      origin: 'Harare, Zimbabwe',
      destination: 'Victoria Falls, Zimbabwe',
      route: 'Harare → Victoria Falls',
      distance: '750 km',
      eta: '2026-08-09 14:00',
      status: 'In Transit',
      location: { lat: -17.9328, lng: 25.8307 }
    },
    'SHIP-005': {
      origin: 'Harare, Zimbabwe',
      destination: 'Chirundu, Zimbabwe',
      route: 'Harare → Chirundu (Zambia Border)',
      distance: '370 km',
      eta: '2026-08-07 14:00',
      status: 'At Border - Clearance',
      location: { lat: -16.0283, lng: 28.8550 }
    },
    'SHIP-006': {
      origin: 'Harare, Zimbabwe',
      destination: 'Gweru, Zimbabwe',
      route: 'Harare → Gweru',
      distance: '275 km',
      eta: '2026-08-07 11:30',
      status: 'In Transit',
      location: { lat: -19.4550, lng: 29.8100 }
    },
    'SHIP-007': {
      origin: 'Harare, Zimbabwe',
      destination: 'Masvingo, Zimbabwe',
      route: 'Harare → Masvingo',
      distance: '295 km',
      eta: '2026-08-08 08:00',
      status: 'Pending',
      location: { lat: -20.0625, lng: 30.8300 }
    },
    'SHIP-008': {
      origin: 'Harare, Zimbabwe',
      destination: 'Kariba, Zimbabwe',
      route: 'Harare → Kariba',
      distance: '370 km',
      eta: '2026-08-08 14:00',
      status: 'In Transit',
      location: { lat: -16.5167, lng: 28.8000 }
    },
    'SHIP-009': {
      origin: 'Harare, Zimbabwe',
      destination: 'Nyamapanda, Zimbabwe',
      route: 'Harare → Nyamapanda (Mozambique Border)',
      distance: '320 km',
      eta: '2026-08-08 09:00',
      status: 'In Transit',
      location: { lat: -16.9300, lng: 32.5000 }
    },
    'SHIP-010': {
      origin: 'Harare, Zimbabwe',
      destination: 'Plumtree, Zimbabwe',
      route: 'Harare → Plumtree (Botswana Border)',
      distance: '480 km',
      eta: '2026-08-08 13:00',
      status: 'At Border - Clearance',
      location: { lat: -20.4800, lng: 27.8200 }
    },
    'SHIP-011': {
      origin: 'Harare, Zimbabwe',
      destination: 'Gokwe, Zimbabwe',
      route: 'Harare → Gokwe',
      distance: '380 km',
      eta: '2026-08-09 15:00',
      status: 'In Transit',
      location: { lat: -18.2100, lng: 28.9300 }
    },
    'SHIP-012': {
      origin: 'Harare, Zimbabwe',
      destination: 'Mvuma, Zimbabwe',
      route: 'Harare → Mvuma',
      distance: '190 km',
      eta: '2026-08-07 09:30',
      status: 'Delivered',
      location: { lat: -19.2800, lng: 30.5300 }
    },
    'SHIP-013': {
      origin: 'Harare, Zimbabwe',
      destination: 'Chinhoyi, Zimbabwe',
      route: 'Harare → Chinhoyi',
      distance: '130 km',
      eta: '2026-08-07 08:30',
      status: 'Delivered',
      location: { lat: -17.3500, lng: 30.2000 }
    },
    'SHIP-014': {
      origin: 'Harare, Zimbabwe',
      destination: 'Kadoma, Zimbabwe',
      route: 'Harare → Kadoma',
      distance: '140 km',
      eta: '2026-08-07 09:00',
      status: 'In Transit',
      location: { lat: -18.3333, lng: 29.9167 }
    },
    'SHIP-015': {
      origin: 'Harare, Zimbabwe',
      destination: 'Chegutu, Zimbabwe',
      route: 'Harare → Chegutu',
      distance: '110 km',
      eta: '2026-08-07 08:00',
      status: 'Delivered',
      location: { lat: -18.1333, lng: 30.1500 }
    },
    // BULAWAYO ROUTES
    'SHIP-016': {
      origin: 'Bulawayo, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Bulawayo → Harare',
      distance: '440 km',
      eta: '2026-08-08 10:00',
      status: 'In Transit',
      location: { lat: -19.0154, lng: 29.1549 }
    },
    'SHIP-017': {
      origin: 'Bulawayo, Zimbabwe',
      destination: 'Victoria Falls, Zimbabwe',
      route: 'Bulawayo → Victoria Falls',
      distance: '440 km',
      eta: '2026-08-08 16:30',
      status: 'Delayed - Weather',
      location: { lat: -18.9104, lng: 27.4850 }
    },
    'SHIP-018': {
      origin: 'Bulawayo, Zimbabwe',
      destination: 'Beitbridge, Zimbabwe',
      route: 'Bulawayo → Beitbridge (Border)',
      distance: '290 km',
      eta: '2026-08-08 11:00',
      status: 'In Transit',
      location: { lat: -21.0200, lng: 29.5000 }
    },
    'SHIP-019': {
      origin: 'Bulawayo, Zimbabwe',
      destination: 'Gweru, Zimbabwe',
      route: 'Bulawayo → Gweru',
      distance: '165 km',
      eta: '2026-08-07 13:00',
      status: 'Delivered',
      location: { lat: -19.4550, lng: 29.8100 }
    },
    'SHIP-020': {
      origin: 'Bulawayo, Zimbabwe',
      destination: 'Plumtree, Zimbabwe',
      route: 'Bulawayo → Plumtree (Botswana Border)',
      distance: '110 km',
      eta: '2026-08-07 10:30',
      status: 'At Border - Clearance',
      location: { lat: -20.4800, lng: 27.8200 }
    },
    // MUTARE ROUTES
    'SHIP-021': {
      origin: 'Mutare, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Mutare → Harare',
      distance: '263 km',
      eta: '2026-08-07 15:00',
      status: 'Delivered',
      location: { lat: -17.8252, lng: 31.0335 }
    },
    'SHIP-022': {
      origin: 'Mutare, Zimbabwe',
      destination: 'Nyamapanda, Zimbabwe',
      route: 'Mutare → Nyamapanda (Mozambique Border)',
      distance: '180 km',
      eta: '2026-08-08 12:00',
      status: 'In Transit',
      location: { lat: -18.4000, lng: 32.2000 }
    },
    'SHIP-023': {
      origin: 'Mutare, Zimbabwe',
      destination: 'Masvingo, Zimbabwe',
      route: 'Mutare → Masvingo',
      distance: '280 km',
      eta: '2026-08-09 09:00',
      status: 'Pending',
      location: { lat: -19.5000, lng: 31.5000 }
    },
    'SHIP-024': {
      origin: 'Mutare, Zimbabwe',
      destination: 'Chimanimani, Zimbabwe',
      route: 'Mutare → Chimanimani',
      distance: '120 km',
      eta: '2026-08-07 11:00',
      status: 'Delayed - Road Conditions',
      location: { lat: -19.8000, lng: 32.8667 }
    },
    // BEITBRIDGE ROUTES
    'SHIP-025': {
      origin: 'Beitbridge, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Beitbridge → Harare',
      distance: '580 km',
      eta: '2026-08-09 12:00',
      status: 'At Border - Clearance',
      location: { lat: -22.2150, lng: 30.0000 }
    },
    'SHIP-026': {
      origin: 'Beitbridge, Zimbabwe',
      destination: 'Bulawayo, Zimbabwe',
      route: 'Beitbridge → Bulawayo',
      distance: '290 km',
      eta: '2026-08-08 14:00',
      status: 'In Transit',
      location: { lat: -21.5000, lng: 29.5000 }
    },
    'SHIP-027': {
      origin: 'Beitbridge, Zimbabwe',
      destination: 'Masvingo, Zimbabwe',
      route: 'Beitbridge → Masvingo',
      distance: '285 km',
      eta: '2026-08-07 17:00',
      status: 'Delayed - Border Congestion',
      location: { lat: -21.0200, lng: 30.0000 }
    },
    // VICTORIA FALLS ROUTES
    'SHIP-028': {
      origin: 'Victoria Falls, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Victoria Falls → Harare',
      distance: '750 km',
      eta: '2026-08-10 10:00',
      status: 'In Transit',
      location: { lat: -18.5000, lng: 27.5000 }
    },
    'SHIP-029': {
      origin: 'Victoria Falls, Zimbabwe',
      destination: 'Bulawayo, Zimbabwe',
      route: 'Victoria Falls → Bulawayo',
      distance: '440 km',
      eta: '2026-08-08 16:30',
      status: 'Delayed - Weather',
      location: { lat: -18.9104, lng: 27.4850 }
    },
    'SHIP-030': {
      origin: 'Victoria Falls, Zimbabwe',
      destination: 'Kariba, Zimbabwe',
      route: 'Victoria Falls → Kariba',
      distance: '360 km',
      eta: '2026-08-09 13:00',
      status: 'Pending',
      location: { lat: -17.5000, lng: 27.5000 }
    },
    // GWERU ROUTES
    'SHIP-031': {
      origin: 'Gweru, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Gweru → Harare',
      distance: '275 km',
      eta: '2026-08-07 14:00',
      status: 'In Transit',
      location: { lat: -18.5000, lng: 30.0000 }
    },
    'SHIP-032': {
      origin: 'Gweru, Zimbabwe',
      destination: 'Bulawayo, Zimbabwe',
      route: 'Gweru → Bulawayo',
      distance: '165 km',
      eta: '2026-08-07 13:00',
      status: 'Delivered',
      location: { lat: -20.1500, lng: 28.5800 }
    },
    'SHIP-033': {
      origin: 'Gweru, Zimbabwe',
      destination: 'Kwekwe, Zimbabwe',
      route: 'Gweru → Kwekwe',
      distance: '90 km',
      eta: '2026-08-07 10:00',
      status: 'Delivered',
      location: { lat: -18.9200, lng: 29.8100 }
    },
    // MASVINGO ROUTES
    'SHIP-034': {
      origin: 'Masvingo, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Masvingo → Harare',
      distance: '295 km',
      eta: '2026-08-08 08:00',
      status: 'Pending',
      location: { lat: -19.5000, lng: 30.5000 }
    },
    'SHIP-035': {
      origin: 'Masvingo, Zimbabwe',
      destination: 'Beitbridge, Zimbabwe',
      route: 'Masvingo → Beitbridge',
      distance: '285 km',
      eta: '2026-08-07 17:00',
      status: 'Delayed - Border Congestion',
      location: { lat: -21.0200, lng: 30.0000 }
    },
    'SHIP-036': {
      origin: 'Masvingo, Zimbabwe',
      destination: 'Chiredzi, Zimbabwe',
      route: 'Masvingo → Chiredzi',
      distance: '160 km',
      eta: '2026-08-08 12:00',
      status: 'In Transit',
      location: { lat: -20.5000, lng: 31.5000 }
    },
    // CHIREDZI ROUTES
    'SHIP-037': {
      origin: 'Chiredzi, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Chiredzi → Harare',
      distance: '400 km',
      eta: '2026-08-09 11:00',
      status: 'Pending',
      location: { lat: -21.0500, lng: 31.6700 }
    },
    'SHIP-038': {
      origin: 'Chiredzi, Zimbabwe',
      destination: 'Masvingo, Zimbabwe',
      route: 'Chiredzi → Masvingo',
      distance: '160 km',
      eta: '2026-08-08 09:00',
      status: 'In Transit',
      location: { lat: -20.5000, lng: 31.0000 }
    },
    // KWEKWE ROUTES
    'SHIP-039': {
      origin: 'Kwekwe, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Kwekwe → Harare',
      distance: '220 km',
      eta: '2026-08-07 10:00',
      status: 'Delivered',
      location: { lat: -18.9200, lng: 29.8100 }
    },
    'SHIP-040': {
      origin: 'Kwekwe, Zimbabwe',
      destination: 'Gweru, Zimbabwe',
      route: 'Kwekwe → Gweru',
      distance: '90 km',
      eta: '2026-08-07 08:30',
      status: 'Delivered',
      location: { lat: -19.2000, lng: 29.9000 }
    },
    // CHINHOYI ROUTES
    'SHIP-041': {
      origin: 'Chinhoyi, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Chinhoyi → Harare',
      distance: '130 km',
      eta: '2026-08-07 08:30',
      status: 'Delivered',
      location: { lat: -17.3500, lng: 30.2000 }
    },
    'SHIP-042': {
      origin: 'Chinhoyi, Zimbabwe',
      destination: 'Kariba, Zimbabwe',
      route: 'Chinhoyi → Kariba',
      distance: '240 km',
      eta: '2026-08-08 14:00',
      status: 'In Transit',
      location: { lat: -16.9000, lng: 29.0000 }
    },
    // KARIBA ROUTES
    'SHIP-043': {
      origin: 'Kariba, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Kariba → Harare',
      distance: '370 km',
      eta: '2026-08-08 14:00',
      status: 'In Transit',
      location: { lat: -17.0000, lng: 29.5000 }
    },
    'SHIP-044': {
      origin: 'Kariba, Zimbabwe',
      destination: 'Chirundu, Zimbabwe',
      route: 'Kariba → Chirundu (Zambia Border)',
      distance: '90 km',
      eta: '2026-08-07 16:00',
      status: 'At Border - Clearance',
      location: { lat: -16.0283, lng: 28.8550 }
    },
    // PLUMTREE ROUTES
    'SHIP-045': {
      origin: 'Plumtree, Zimbabwe',
      destination: 'Bulawayo, Zimbabwe',
      route: 'Plumtree → Bulawayo',
      distance: '110 km',
      eta: '2026-08-07 10:30',
      status: 'At Border - Clearance',
      location: { lat: -20.4800, lng: 27.8200 }
    },
    'SHIP-046': {
      origin: 'Plumtree, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Plumtree → Harare',
      distance: '480 km',
      eta: '2026-08-09 09:00',
      status: 'Pending',
      location: { lat: -19.5000, lng: 28.5000 }
    },
    // NYAMAPANDA ROUTES
    'SHIP-047': {
      origin: 'Nyamapanda, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Nyamapanda → Harare',
      distance: '320 km',
      eta: '2026-08-08 09:00',
      status: 'In Transit',
      location: { lat: -17.5000, lng: 32.0000 }
    },
    'SHIP-048': {
      origin: 'Nyamapanda, Zimbabwe',
      destination: 'Mutare, Zimbabwe',
      route: 'Nyamapanda → Mutare',
      distance: '180 km',
      eta: '2026-08-08 12:00',
      status: 'At Border - Clearance',
      location: { lat: -18.4000, lng: 32.2000 }
    },
    // ADDITIONAL ROUTES
    'SHIP-049': {
      origin: 'Kadoma, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Kadoma → Harare',
      distance: '140 km',
      eta: '2026-08-07 09:00',
      status: 'In Transit',
      location: { lat: -18.3333, lng: 29.9167 }
    },
    'SHIP-050': {
      origin: 'Chegutu, Zimbabwe',
      destination: 'Harare, Zimbabwe',
      route: 'Chegutu → Harare',
      distance: '110 km',
      eta: '2026-08-07 08:00',
      status: 'Delivered',
      location: { lat: -18.1333, lng: 30.1500 }
    }
  };

  // Check backend connection on load
  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/test');
      if (response.data.success) {
        setApiStatus('✅ Connected to Backend');
      }
    } catch (error) {
      setApiStatus('❌ Backend Not Connected');
      console.error('Backend connection error:', error);
    }
  };

  // Track Shipment - Case Insensitive with Notifications
  const trackShipment = async (e) => {
    e.preventDefault();
    if (!shipmentId.trim()) return;

    setLoadingShipment(true);
    try {
      const searchId = shipmentId.trim().toUpperCase();
      const shipment = zimbabweRoutes[searchId];
      
      if (shipment) {
        const shipmentData = {
          id: searchId,
          ...shipment,
          lastUpdate: new Date().toISOString(),
        };
        setTrackingData(shipmentData);
        
        // Send browser notification
        sendShipmentNotification(shipmentData);
        
      } else {
        alert('Shipment not found. Try SHIP-001 to SHIP-050');
        setTrackingData(null);
      }
    } catch (error) {
      console.error('Error tracking shipment:', error);
    }
    setLoadingShipment(false);
  };

  // If still loading auth
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  // Dashboard Component (main content)
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
                <button 
                  onClick={() => testNotification()} 
                  className="test-notification-btn"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '0.4rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'background 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.25)'}
                  onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
                >
                  🔔 Test
                </button>
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
              placeholder="Enter Shipment ID (e.g., SHIP-001)"
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
              <div className="detail-item">
                <span className="detail-label">Shipment ID:</span>
                <span className="detail-value">{trackingData.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value status">{trackingData.status}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Route:</span>
                <span className="detail-value">{trackingData.route}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Origin:</span>
                <span className="detail-value">{trackingData.origin}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Destination:</span>
                <span className="detail-value">{trackingData.destination}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Distance:</span>
                <span className="detail-value">{trackingData.distance}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Estimated Arrival:</span>
                <span className="detail-value">{trackingData.eta}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Update:</span>
                <span className="detail-value">{new Date(trackingData.lastUpdate).toLocaleString()}</span>
              </div>
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
        <Route path="/analytics" element={isAuthenticated ? <Analytics shipments={zimbabweRoutes} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;