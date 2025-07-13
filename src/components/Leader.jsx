




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import OrderDetails from './OrderDetails';
import ArtisanDetails from './ArtisanDetails';
import AllArtisans from './AllArtisans';

function Leader() {
  const navigate = useNavigate();
  const clusterId = 1; // You can make this dynamic later
  
  // State management
  const [clusterData, setClusterData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderIdx, setSelectedOrderIdx] = useState(null);
  const [selectedArtisanIdx, setSelectedArtisanIdx] = useState(null);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showArtisans, setShowArtisans] = useState(false);

  // Fetch cluster data and orders on component mount
  useEffect(() => {
    fetchClusterData();
    fetchOrders();
  }, []);

  const fetchClusterData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/clusters/${clusterId}`);
      setClusterData(response.data);
      console.log("Cluster Data:", response.data);
    } catch (error) {
      console.error("Error fetching cluster data:", error);
      setError("Failed to fetch cluster data");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/orderDetails');
      // Filter orders assigned to this cluster
      const clusterOrders = response.data.filter(order => order.assignedTo === clusterId);
      setOrders(clusterOrders);
      console.log("Orders Data:", clusterOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Calculate stats
  const getStats = () => {
    if (!clusterData || !clusterData.artisans) {
      return { totalArtisans: 0, avgRating: 0, totalOrders: 0, pendingOrders: 0 };
    }

    const totalArtisans = clusterData.artisans.length;
    const avgRating = totalArtisans > 0 
      ? (clusterData.artisans.reduce((sum, artisan) => sum + (artisan.artisan_rating || 0), 0) / totalArtisans).toFixed(1)
      : 0;
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'Pending').length;

    return { totalArtisans, avgRating, totalOrders, pendingOrders };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', border: '4px solid #e2e8f0', borderTop: '4px solid #3182ce', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', textAlign: 'center', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
        <div style={{ background: '#fed7d7', color: '#c53030', padding: '1rem', borderRadius: '8px', border: '1px solid #feb2b2' }}>
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ background: '#c53030', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', width: '95vw', margin: '0 auto', fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Navigation Bar */}
      <nav style={{
        background: '#ffffff',
        padding: '1rem 2rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '0 0 12px 12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ margin: 0, color: '#2d3748', fontSize: '1.5rem', fontWeight: '600' }}>Leader Dashboard</h2>
        <div style={{ display: 'flex', gap: '2rem', marginLeft: 'auto' }}>
          <button
            style={{ background: 'transparent', border: 'none', color: '#3182ce', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = '#ebf8ff'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
            onClick={() => setShowAllOrders(!showAllOrders)}
          >
            View Orders
          </button>
          <button
            style={{ background: 'transparent', border: 'none', color: '#3182ce', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = '#ebf8ff'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
            onClick={() => navigate('/barcode')}
          >
            Update Status
          </button>
          <button
            style={{ background: 'transparent', border: 'none', color: '#3182ce', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = '#ebf8ff'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
            onClick={() => navigate('/trackorder')}
          >
            Track Orders
          </button>
          <button
            style={{ background: 'transparent', border: 'none', color: '#3182ce', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = '#ebf8ff'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
            onClick={() => navigate('/feedback')}
          >
            View Feedback
          </button>
        </div>
      </nav>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem', padding: '0 1rem' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#4a5568', fontSize: '0.9rem', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Total Orders</h3>
          <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: '800', color: '#3182ce', margin: 0 }}>{stats.totalOrders}</span>
        </div>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#4a5568', fontSize: '0.9rem', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Pending Orders</h3>
          <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: '800', color: '#e53e3e', margin: 0 }}>{stats.pendingOrders}</span>
        </div>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#4a5568', fontSize: '0.9rem', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Total Artisans</h3>
          <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: '800', color: '#38a169', margin: 0 }}>{stats.totalArtisans}</span>
        </div>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#4a5568', fontSize: '0.9rem', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Avg Rating</h3>
          <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: '800', color: '#d69e2e', margin: 0 }}>{stats.avgRating}/5</span>
        </div>
      </div>

      {/* Cluster Information */}
      {clusterData && (
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', padding: '2rem', marginBottom: '2rem', margin: '0 1rem 2rem', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#2d3748', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '600' }}>Cluster Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <strong style={{ color: '#4a5568' }}>Cluster ID:</strong>
              <span style={{ marginLeft: '0.5rem', color: '#2d3748' }}>{clusterData.cluster_id}</span>
            </div>
            <div>
              <strong style={{ color: '#4a5568' }}>Leader ID:</strong>
              <span style={{ marginLeft: '0.5rem', color: '#2d3748' }}>{clusterData.leader_id}</span>
            </div>
            <div>
              <strong style={{ color: '#4a5568' }}>Cluster Rating:</strong>
              <span style={{ marginLeft: '0.5rem', color: '#d69e2e', fontWeight: '600' }}>{clusterData.cluster_rating}/5</span>
            </div>
            <div>
              <strong style={{ color: '#4a5568' }}>Leader Rating:</strong>
              <span style={{ marginLeft: '0.5rem', color: '#d69e2e', fontWeight: '600' }}>{clusterData.leader_rating}/5</span>
            </div>
          </div>
        </div>
      )}

      {/* Artisans Section */}
      {clusterData && clusterData.artisans && (
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', padding: '2rem', marginBottom: '2rem', margin: '0 1rem 2rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#2d3748', margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Artisans Management</h2>
            <button 
              onClick={() => setShowArtisans(!showArtisans)}
              style={{ background: '#38a169', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', transition: 'background 0.2s' }}
              onMouseEnter={(e) => e.target.style.background = '#2f855a'}
              onMouseLeave={(e) => e.target.style.background = '#38a169'}
            >
              {showArtisans ? 'Hide Artisans' : 'Show Artisans'}
            </button>
          </div>
          
          {showArtisans && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {clusterData.artisans.map((artisan, idx) => (
                <div 
                  key={artisan.artisan_id} 
                  style={{ 
                    background: '#f7fafc', 
                    padding: '1.5rem', 
                    borderRadius: '8px', 
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                  onClick={() => setSelectedArtisanIdx(selectedArtisanIdx === idx ? null : idx)}
                >
                  <h4 style={{ color: '#2d3748', margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '600' }}>
                    {artisan.artisan_name}
                  </h4>
                  <p style={{ color: '#718096', margin: '0 0 1rem 0', fontSize: '0.9rem' }}>
                    ID: {artisan.artisan_id}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ background: '#fef5e7', color: '#c05621', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                      Rating: {artisan.artisan_rating}/5
                    </span>
                    <span style={{ background: '#ebf8ff', color: '#2b6cb0', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                      Orders: {artisan.total_orders}
                    </span>
                  </div>
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#4a5568' }}>
                      <strong>Revenue:</strong> ₹{artisan.total_revenue?.toLocaleString() || 0}
                    </p>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#4a5568' }}>
                      <strong>Pending Payment:</strong> ₹{artisan.amount_to_be_paid?.toLocaleString() || 0}
                    </p>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#4a5568' }}>
                      <strong>Skills:</strong> {artisan.skills?.join(', ') || 'Not specified'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Orders Section */}
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', padding: '2rem', margin: '0 1rem 2rem', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#2d3748', margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Orders Management</h2>
          <button 
            onClick={() => setShowAllOrders(!showAllOrders)}
            style={{ background: '#3182ce', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = '#2c5aa0'}
            onMouseLeave={(e) => e.target.style.background = '#3182ce'}
          >
            {showAllOrders ? 'Hide Orders' : 'Show Orders'}
          </button>
        </div>

        {showAllOrders && (
          <div>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#718096' }}>
                <h3 style={{ color: '#4a5568' }}>No orders assigned to this cluster yet</h3>
                <p>Orders will appear here once they are assigned to your cluster.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#f7fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Order ID</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Product</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Customer</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Quantity</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Cost</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Delivery Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, idx) => (
                      <tr key={order._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '1rem', color: '#2d3748' }}>{order._id?.slice(-8) || `ORD-${idx + 1}`}</td>
                        <td style={{ padding: '1rem', color: '#2d3748' }}>{order.typeOfProduct}</td>
                        <td style={{ padding: '1rem', color: '#2d3748' }}>{order.customerName}</td>
                        <td style={{ padding: '1rem', color: '#2d3748' }}>{order.orderQuantity}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ 
                            background: order.status === 'Pending' ? '#fef5e7' : order.status === 'In Progress' ? '#ebf8ff' : '#f0fff4',
                            color: order.status === 'Pending' ? '#c05621' : order.status === 'In Progress' ? '#2b6cb0' : '#25855a',
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '6px', 
                            fontSize: '0.8rem', 
                            fontWeight: '600' 
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', color: '#2d3748', fontWeight: '600' }}>₹{order.productCost?.toLocaleString()}</td>
                        <td style={{ padding: '1rem', color: '#2d3748' }}>{new Date(order.estimatedDeliveryDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Artisan Details */}
      {selectedArtisanIdx !== null && clusterData?.artisans?.[selectedArtisanIdx] && (
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', padding: '2rem', margin: '0 1rem 2rem', border: '1px solid #e2e8f0' }}>
          <ArtisanDetails artisan={clusterData.artisans[selectedArtisanIdx]} />
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Leader;