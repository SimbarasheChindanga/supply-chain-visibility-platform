
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Analytics() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [stats, setStats] = useState({
    total: 0,
    byStatus: [],
    byRoute: [],
    topRoutes: [],
    deliveryRate: 0
  });

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/shipments`);

        if (!response.data.success || !Array.isArray(response.data.data)) {
          throw new Error('Invalid shipment data returned by the API.');
        }

        setShipments(response.data.data);
        setError('');
      } catch (err) {
        setError('Unable to load shipment analytics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  useEffect(() => {
    calculateStats(shipments);
  }, [shipments]);


  const calculateStats = (data) => {
    const shipmentList = Array.isArray(data) ? data : [];
    const total = shipmentList.length;

    const statusCount = {};
    const routeCount = {};
    let deliveredCount = 0;

    shipmentList.forEach((ship) => {
      const status = ship.status || 'Unknown';
      const route = ship.route || 'Unknown Route';

      statusCount[status] = (statusCount[status] || 0) + 1;

      if (status.toLowerCase().includes('delivered')) {
        deliveredCount++;
      }

      routeCount[route] = (routeCount[route] || 0) + 1;
    });

    const statusData = Object.entries(statusCount).map(([name, value]) => ({
      name,
      value
    }));

    const routeData = Object.entries(routeCount)
      .map(([name, value]) => ({
        name: name.length > 20 ? `${name.substring(0, 20)}...` : name,
        fullName: name,
        value
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    const deliveryRate = total > 0
      ? Math.round((deliveredCount / total) * 100)
      : 0;

    setStats({
      total,
      byStatus: statusData,
      byRoute: routeData,
      topRoutes: routeData.slice(0, 5),
      deliveryRate
    });
  };


  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading shipment analytics...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', color: '#dc2626' }}>{error}</div>;
  }



  const COLORS = ['#4ade80', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#1a1a2e', fontSize: '2rem', marginBottom: '2rem' }}>ðŸ“Š Supply Chain Analytics</h2>

      {/* Quick Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>ðŸ“¦</div>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0, fontWeight: 400 }}>Total Shipments</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a2e', margin: '0.2rem 0 0 0' }}>{stats.total}</p>
          </div>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>âœ…</div>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0, fontWeight: 400 }}>Delivery Rate</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a2e', margin: '0.2rem 0 0 0' }}>{stats.deliveryRate}%</p>
          </div>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>ðŸšš</div>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0, fontWeight: 400 }}>In Transit</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a2e', margin: '0.2rem 0 0 0' }}>
              {stats.byStatus.find(s => s.name.includes('In Transit'))?.value || 0}
            </p>
          </div>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>âš ï¸</div>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0, fontWeight: 400 }}>Delayed</h3>

<p style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a2e', margin: '0.2rem 0 0 0' }}>
  {stats.byStatus
    .filter(s => s.name.includes('Delayed'))
    .reduce((total, s) => total + s.value, 0)}
</p>

          </div>
        </div>
      </div>

      {/* Charts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontSize: '1.1rem' }}>ðŸ“ˆ Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.byStatus}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                dataKey="value"
              >
                {stats.byStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontSize: '1.1rem' }}>ðŸ“ Top Routes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={stats.byRoute}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={80} />
              <Tooltip formatter={(value, name, props) => {
                return [`${value} shipments`, props.payload.fullName || 'Route'];
              }} />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name="Shipments" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Routes List */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontSize: '1.1rem' }}>ðŸ† Top 5 Busiest Routes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
          {stats.topRoutes.map((route, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.8rem 1rem',
              background: '#f8f9fa',
              borderRadius: '8px',
              gap: '1rem'
            }}>
              <span style={{ fontWeight: 700, color: '#6b7280', fontSize: '0.9rem', minWidth: '40px' }}>#{index + 1}</span>
              <span style={{ flex: 1, fontWeight: 500, color: '#1a1a2e' }}>{route.fullName}</span>
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{route.value} shipments</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
