import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Analytics({ shipments }) {
  const [stats, setStats] = useState({
    total: 0,
    byStatus: [],
    byRoute: [],
    topRoutes: [],
    deliveryRate: 0
  });

  useEffect(() => {
    if (shipments && Object.keys(shipments).length > 0) {
      calculateStats(shipments);
    }
  }, [shipments]);

  const calculateStats = (data) => {
    const shipmentList = Object.values(data);
    const total = shipmentList.length;
    
    const statusCount = {};
    const routeCount = {};
    let deliveredCount = 0;

    shipmentList.forEach(ship => {
      const status = ship.status;
      statusCount[status] = (statusCount[status] || 0) + 1;
      if (status.includes('Delivered')) deliveredCount++;
      
      const route = ship.route;
      routeCount[route] = (routeCount[route] || 0) + 1;
    });

    const statusData = Object.keys(statusCount).map(key => ({
      name: key,
      value: statusCount[key]
    }));

    const routeData = Object.keys(routeCount)
      .map(key => ({
        name: key.length > 20 ? key.substring(0, 20) + '...' : key,
        fullName: key,
        value: routeCount[key]
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    const deliveryRate = total > 0 ? Math.round((deliveredCount / total) * 100) : 0;

    setStats({
      total,
      byStatus: statusData,
      byRoute: routeData,
      topRoutes: routeData.slice(0, 5),
      deliveryRate
    });
  };

  const COLORS = ['#4ade80', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#1a1a2e', fontSize: '2rem', marginBottom: '2rem' }}>📊 Supply Chain Analytics</h2>
      
      {/* Quick Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>📦</div>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0, fontWeight: 400 }}>Total Shipments</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a2e', margin: '0.2rem 0 0 0' }}>{stats.total}</p>
          </div>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>✅</div>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0, fontWeight: 400 }}>Delivery Rate</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a2e', margin: '0.2rem 0 0 0' }}>{stats.deliveryRate}%</p>
          </div>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🚚</div>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0, fontWeight: 400 }}>In Transit</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a2e', margin: '0.2rem 0 0 0' }}>
              {stats.byStatus.find(s => s.name.includes('In Transit'))?.value || 0}
            </p>
          </div>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>⚠️</div>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0, fontWeight: 400 }}>Delayed</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a2e', margin: '0.2rem 0 0 0' }}>
              {stats.byStatus.find(s => s.name.includes('Delayed'))?.value || 0}
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
          <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontSize: '1.1rem' }}>📈 Status Distribution</h3>
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
          <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontSize: '1.1rem' }}>📍 Top Routes</h3>
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
        <h3 style={{ color: '#1a1a2e', marginBottom: '1rem', fontSize: '1.1rem' }}>🏆 Top 5 Busiest Routes</h3>
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