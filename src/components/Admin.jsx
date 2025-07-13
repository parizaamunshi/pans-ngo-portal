import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Payment from './Payment';
// Example data for leaders and artisans
const initialLeaders = [
  {
    leader_id: 'L1',
    leader_name: 'Ramesh',
    artisans: [
      {
        artisian_id: 'A101',
        artisian_name: 'Sita',
        artisian_rating: 4.8,
        total_orders: 50,
        total_revenue: 25000,
        current_order: 'Rakhis',
        amount_to_be_paid: 2000,
        skills: ['Threadwork', 'Beading'],
      },
      {
        artisian_id: 'A102',
        artisian_name: 'Geeta',
        artisian_rating: 4.5,
        total_orders: 40,
        total_revenue: 20000,
        current_order: 'Toys',
        amount_to_be_paid: 1500,
        skills: ['Woodwork', 'Painting'],
      },
    ],
  },
  {
    leader_id: 'L2',
    leader_name: 'Suresh',
    artisans: [
      {
        artisian_id: 'A103',
        artisian_name: 'Radha',
        artisian_rating: 4.9,
        total_orders: 60,
        total_revenue: 30000,
        current_order: 'Toys2',
        amount_to_be_paid: 2500,
        skills: ['Sewing', 'Embroidery'],
      },
    ],
  },
];


function Admin() {
  const [orders, setOrders] = useState([]);
  const [fetchedOrders, setFetchedOrders] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);
  // Default form data
  const defaultFormData = {
    OrderQuantity: '25',
    orderDate: '2025-07-13',
    TypeofProd: 'Handwoven Textiles',
    customerName: 'John Doe',
    deliverAddress: '123 MG Road, Brigade Road, Bangalore, Karnataka 560001',
    estimatedDeliveryDate: '2025-08-15',
    Specifications: 'High-quality cotton fabric with traditional block print designs. Colors: Blue and white with gold thread work. Size: 2 meters length.',
    status: 'Pending',
    productcost: '2500',
  };

  const [form, setForm] = useState(defaultFormData);
  const [leadersOpen, setLeadersOpen] = useState(false);
  const [artisansOpen, setArtisansOpen] = useState({});
  const [priority, setPriority] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    fetchOrders();
    fetchClusters();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/orderDetails');
      setFetchedOrders(response.data);
      console.log("Fetched orders:", response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchClusters = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/clusters');
      setClusters(response.data);
      console.log("Fetched clusters:", response.data);
    } catch (error) {
      console.error("Error fetching clusters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(defaultFormData);
  };
   
   const handleSubmit = async (e) => {
    e.preventDefault();
    setOrders([...orders, form]);
    
    try {
      // Fetch clusters and get the highest rated one
      const clustersResponse = await axios.get('http://localhost:3000/api/clusters');
      const clusters = clustersResponse.data;
      const sortedClusters = clusters.sort((a, b) => b.cluster_rating - a.cluster_rating);
      
      // Update state for display purposes
      setPriority(sortedClusters);
      console.log("Clusters fetched successfully:", sortedClusters);
      
      // Use the sorted data directly for the order assignment
      const assignedClusterId = sortedClusters.length > 0 ? sortedClusters[0].cluster_id : null;
      
      // Create the order with the assigned cluster
      const orderResponse = await axios.post('http://localhost:3000/api/orderDetails', {
        orderQuantity: form.OrderQuantity,
        orderDate: form.orderDate,
        typeOfProduct: form.TypeofProd,
        customerName: form.customerName,
        deliveryAddress: form.deliverAddress,
        estimatedDeliveryDate: form.estimatedDeliveryDate,
        specifications: form.Specifications,
        assignedTo: assignedClusterId,
        status: form.status,
        productCost: form.productcost
      });
      
      console.log("Order added successfully:", orderResponse.data);
      console.log("Assigned to cluster:", assignedClusterId);
      
    } catch (error) {
      console.error("Error processing order:", error);
    }
    
    setForm(defaultFormData); // Reset to default values instead of empty
  };

  const toggleLeaders = () => setLeadersOpen((prev) => !prev);
  const toggleArtisans = (idx) => setArtisansOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <div style={{ maxWidth: '1400px', width: '95vw', margin: '2rem auto', textAlign: 'center', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <div style={{ background: 'dodgerblue', borderRadius: 12, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', padding: '2.5rem', marginBottom: '2.5rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', border: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center',background:'dodgerblue', marginBottom: '2rem' }}>
          <h2 style={{ color: '#000000ff', margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: '700' }}>Admin Panel</h2>
          <p style={{ color: '#ffffffff', margin: 0, fontSize: '1.1rem' }}>Manage orders, clusters, and artisan networks</p>
        </div>
      </div>
      
      <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', padding: '3rem', marginBottom: '2.5rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', border: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h3 style={{ color: '#2d3748', margin: '0 0 0.5rem 0', fontSize: '1.75rem', fontWeight: '600' }}>Create New Order</h3>
          <p style={{ color: '#718096', margin: 0, fontSize: '1rem' }}>Fill in the details below to create a new product order</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          border: '2px solid #e2e8f0',
          borderRadius: 16,
          padding: '2.5rem',
          maxWidth: '1000px',
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background elements */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(45deg, #3182ce20, #38a16920)',
            borderRadius: '50%',
            opacity: 0.6
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(45deg, #d69e2e20, #e53e3e20)',
            borderRadius: '50%',
            opacity: 0.6
          }}></div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Order Quantity */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="OrderQuantity" style={{ 
                color: '#374151', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                letterSpacing: '0.025em'
              }}>
                Order Quantity
              </label>
              <input 
                id="OrderQuantity" 
                name="OrderQuantity" 
                type="number"
                value={form.OrderQuantity} 
                onChange={handleChange} 
                required 
                style={{ 
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  background: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  color: '#000000'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3182ce';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
                placeholder="Enter quantity"
              />
            </div>

            {/* Order Date */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="orderDate" style={{ 
                color: '#374151', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                letterSpacing: '0.025em'
              }}>
                Order Date
              </label>
              <input 
                id="orderDate" 
                name="orderDate" 
                type="date"
                value={form.orderDate} 
                onChange={handleChange} 
                required 
                style={{ 
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  background: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  color: '#000000'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3182ce';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              />
            </div>

            {/* Type of Product */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="TypeofProd" style={{ 
                color: '#374151', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                letterSpacing: '0.025em'
              }}>
                Type of Product
              </label>
              <input 
                id="TypeofProd" 
                name="TypeofProd" 
                value={form.TypeofProd} 
                onChange={handleChange} 
                required 
                style={{ 
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  background: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  color: '#000000'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3182ce';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
                placeholder="e.g., Handicrafts, Textiles"
              />
            </div>

            {/* Customer Name */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="customerName" style={{ 
                color: '#374151', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                letterSpacing: '0.025em'
              }}>
                Customer Name
              </label>
              <input 
                id="customerName" 
                name="customerName" 
                value={form.customerName} 
                onChange={handleChange} 
                required 
                style={{ 
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  background: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  color: '#000000'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3182ce';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
                placeholder="Enter customer name"
              />
            </div>

            {/* Delivery Address */}
            <div style={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}>
              <label htmlFor="deliverAddress" style={{ 
                color: '#374151', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                letterSpacing: '0.025em'
              }}>
                Delivery Address
              </label>
              <textarea 
                id="deliverAddress" 
                name="deliverAddress" 
                value={form.deliverAddress} 
                onChange={handleChange} 
                required 
                rows="3"
                style={{ 
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  background: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  color: '#000000'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3182ce';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
                placeholder="Enter complete delivery address"
              />
            </div>

            {/* Estimated Delivery Date */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="estimatedDeliveryDate" style={{ 
                color: '#374151', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                letterSpacing: '0.025em'
              }}>
                Estimated Delivery Date
              </label>
              <input 
                id="estimatedDeliveryDate" 
                name="estimatedDeliveryDate" 
                type="date"
                value={form.estimatedDeliveryDate} 
                onChange={handleChange} 
                required 
                style={{ 
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  background: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  color: '#000000'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3182ce';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              />
            </div>

            {/* Specifications */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="Specifications" style={{ 
                color: '#374151', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                letterSpacing: '0.025em'
              }}>
                Specifications
              </label>
              <textarea 
                id="Specifications" 
                name="Specifications" 
                value={form.Specifications} 
                onChange={handleChange} 
                required 
                rows="3"
                style={{ 
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  background: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  color: '#000000'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3182ce';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
                placeholder="Enter detailed specifications"
              />
            </div>

            {/* Status */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="status" style={{ 
                color: '#374151', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                letterSpacing: '0.025em'
              }}>
                Status
              </label>
              <select 
                id="status" 
                name="status" 
                value={form.status} 
                onChange={handleChange} 
                required 
                style={{ 
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  background: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  cursor: 'pointer',
                  color: '#000000'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3182ce';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Product Cost */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="productcost" style={{ 
                color: '#374151', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                letterSpacing: '0.025em'
              }}>
                Product Cost (₹)
              </label>
              <input 
                id="productcost" 
                name="productcost" 
                type="number"
                step="0.01"
                value={form.productcost} 
                onChange={handleChange} 
                required 
                style={{ 
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  background: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  color: '#000000'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3182ce';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
                placeholder="Enter cost amount"
              />
            </div>
          </div>

          {/* Submit and Reset Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem' }}>
            <button 
              type="button"
              onClick={resetForm}
              style={{ 
                background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                color: 'white', 
                border: 'none', 
                padding: '1rem 2rem', 
                fontSize: '1rem', 
                fontWeight: '600',
                borderRadius: '12px', 
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(107, 114, 128, 0.3)',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(107, 114, 128, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(107, 114, 128, 0.3)';
              }}
            >
              Reset Form
            </button>
            <button 
              type="submit" 
              style={{ 
                background: 'linear-gradient(135deg, #3182ce 0%, #2563eb 100%)',
                color: 'white', 
                border: 'none', 
                padding: '1rem 3rem', 
                fontSize: '1.1rem', 
                fontWeight: '600',
                borderRadius: '12px', 
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
              }}
            >
              Create Order
            </button>
          </div>
        </form>
      </div>

      <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', padding: '2.5rem', marginBottom: '2.5rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', border: '1px solid #e2e8f0' }}>
        <h3 style={{ color: '#2d3748', margin: '0 0 2rem 0', fontSize: '1.5rem', fontWeight: '600' }}>All Orders from Database</h3>
        {fetchedOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#718096' }}>
            <h4 style={{ color: '#4a5568' }}>No orders found in database</h4>
            <p>Orders will appear here once they are created.</p>
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
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Assigned To</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Delivery Date</th>
                </tr>
              </thead>
              <tbody>
                {fetchedOrders.map((order, idx) => (
                  <tr key={order._id || idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>
                      {order._id ? order._id.slice(-8) : `ORD-${idx + 1}`}
                    </td>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>{order.typeOfProduct || 'N/A'}</td>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>{order.customerName || 'N/A'}</td>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>{order.orderQuantity || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        background: order.status === 'Pending' ? '#fef5e7' : order.status === 'In Progress' ? '#ebf8ff' : order.status === 'Completed' ? '#f0fff4' : '#f7fafc',
                        color: order.status === 'Pending' ? '#c05621' : order.status === 'In Progress' ? '#2b6cb0' : order.status === 'Completed' ? '#25855a' : '#4a5568',
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '6px', 
                        fontSize: '0.8rem', 
                        fontWeight: '600' 
                      }}>
                        {order.status || 'Unknown'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: '#2d3748', fontWeight: '600' }}>
                      ₹{order.productCost ? order.productCost.toLocaleString() : '0'}
                    </td>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>
                      <span style={{ 
                        background: '#ebf8ff', 
                        color: '#2b6cb0', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '6px', 
                        fontSize: '0.8rem', 
                        fontWeight: '600' 
                      }}>
                        Cluster {order.assignedTo || 'Unassigned'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>
                      {order.estimatedDeliveryDate ? new Date(order.estimatedDeliveryDate).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', padding: '2.5rem', marginBottom: '2.5rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', border: '1px solid #e2e8f0' }}>
        <h3 style={{ color: '#2d3748', margin: '0 0 2rem 0', fontSize: '1.5rem', fontWeight: '600' }}>Local Orders (Form Submissions)</h3>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#718096' }}>
            <h4 style={{ color: '#4a5568' }}>No local orders added yet</h4>
            <p>Orders submitted through the form will appear here.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f7fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Order Quantity</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Order Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Type</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Customer</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Delivery Address</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Est. Delivery</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Specs</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#4a5568', fontWeight: '600' }}>Cost</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>{o.OrderQuantity}</td>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>{o.orderDate}</td>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>{o.TypeofProd}</td>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>{o.customerName}</td>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>{o.deliverAddress}</td>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>{o.estimatedDeliveryDate}</td>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>{o.Specifications}</td>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>{o.status}</td>
                    <td style={{ padding: '1rem', color: '#2d3748' }}>₹{o.productcost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', padding: '2.5rem', marginBottom: '2.5rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ color: '#2d3748', margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: '600' }}>Clusters & Leaders Management</h3>
            <p style={{ color: '#718096', margin: 0, fontSize: '0.95rem' }}>Total Clusters: <strong>{clusters.length}</strong></p>
          </div>
          <button 
            onClick={() => setLeadersOpen(!leadersOpen)} 
            style={{ 
              background: '#3182ce', 
              color: 'white', 
              border: 'none', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontSize: '1rem', 
              fontWeight: '500',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#2c5aa0'}
            onMouseLeave={(e) => e.target.style.background = '#3182ce'}
          >
            {leadersOpen ? 'Hide All Clusters' : 'Show All Clusters'}
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#718096' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '4px solid #e2e8f0', 
              borderTop: '4px solid #3182ce', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite', 
              margin: '0 auto 1rem' 
            }}></div>
            <p>Loading clusters...</p>
          </div>
        ) : clusters.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#718096' }}>
            <h4 style={{ color: '#4a5568' }}>No clusters found</h4>
            <p>Clusters will appear here once they are added to the database.</p>
          </div>
        ) : (
          leadersOpen && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
              {clusters.map((cluster, idx) => (
                <div 
                  key={cluster._id || idx} 
                  style={{ 
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                    border: '2px solid #e2e8f0', 
                    borderRadius: '16px', 
                    padding: '2rem',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.borderColor = '#3182ce';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  {/* Decorative corner element */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(45deg, #3182ce20, #38a16920)',
                    borderRadius: '0 16px 0 100%',
                    opacity: 0.3
                  }}></div>
                  
                  <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ color: '#1e40af', margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
                        Cluster {cluster.cluster_id}
                      </h4>
                      <div style={{ 
                        background: 'linear-gradient(135deg, #3182ce 0%, #2563eb 100%)', 
                        color: 'white', 
                        padding: '0.5rem 1rem', 
                        borderRadius: '20px', 
                        fontSize: '0.85rem', 
                        fontWeight: '600',
                        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                      }}>
                        {cluster.artisans?.length || 0} Artisans
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                      <div style={{ 
                        background: 'white', 
                        padding: '1rem', 
                        borderRadius: '12px', 
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}>
                        <span style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Leader ID</span>
                        <p style={{ margin: '0.5rem 0 0 0', color: '#1f2937', fontSize: '1.1rem', fontWeight: '700' }}>{cluster.leader_id}</p>
                      </div>
                      
                      <div style={{ 
                        background: 'white', 
                        padding: '1rem', 
                        borderRadius: '12px', 
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}>
                        <span style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cluster Rating</span>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                          <p style={{ margin: 0, color: '#d97706', fontSize: '1.1rem', fontWeight: '700' }}>{cluster.cluster_rating}</p>
                          <span style={{ color: '#6b7280', fontSize: '0.9rem', marginLeft: '0.25rem' }}>/5</span>
                          <div style={{ marginLeft: '0.5rem', display: 'flex' }}>
                            {[...Array(5)].map((_, i) => (
                              <span key={i} style={{ 
                                color: i < cluster.cluster_rating ? '#f59e0b' : '#d1d5db', 
                                fontSize: '1rem' 
                              }}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ 
                        background: 'white', 
                        padding: '1rem', 
                        borderRadius: '12px', 
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}>
                        <span style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Leader Rating</span>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                          <p style={{ margin: 0, color: '#d97706', fontSize: '1.1rem', fontWeight: '700' }}>{cluster.leader_rating}</p>
                          <span style={{ color: '#6b7280', fontSize: '0.9rem', marginLeft: '0.25rem' }}>/5</span>
                          <div style={{ marginLeft: '0.5rem', display: 'flex' }}>
                            {[...Array(5)].map((_, i) => (
                              <span key={i} style={{ 
                                color: i < cluster.leader_rating ? '#f59e0b' : '#d1d5db', 
                                fontSize: '1rem' 
                              }}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ 
                        background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)', 
                        padding: '1rem', 
                        borderRadius: '12px', 
                        border: '2px solid #bbf7d0',
                        boxShadow: '0 2px 8px rgba(34, 197, 94, 0.1)'
                      }}>
                        <span style={{ color: '#065f46', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Artisans</span>
                        <p style={{ margin: '0.5rem 0 0 0', color: '#047857', fontSize: '1.5rem', fontWeight: '800' }}>{cluster.artisans?.length || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h5 style={{ color: '#374151', margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>Artisan Network</h5>
                    <button 
                      onClick={() => toggleArtisans(idx)} 
                      style={{ 
                        background: artisansOpen[idx] ? 
                          'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' : 
                          'linear-gradient(135deg, #059669 0%, #047857 100%)', 
                        color: 'white', 
                        border: 'none', 
                        padding: '0.75rem 1.5rem', 
                        borderRadius: '10px', 
                        cursor: 'pointer', 
                        fontSize: '0.9rem', 
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                        boxShadow: artisansOpen[idx] ? 
                          '0 4px 15px rgba(220, 38, 38, 0.3)' : 
                          '0 4px 15px rgba(5, 150, 105, 0.3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = artisansOpen[idx] ? 
                          '0 8px 25px rgba(220, 38, 38, 0.4)' : 
                          '0 8px 25px rgba(5, 150, 105, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = artisansOpen[idx] ? 
                          '0 4px 15px rgba(220, 38, 38, 0.3)' : 
                          '0 4px 15px rgba(5, 150, 105, 0.3)';
                      }}
                    >
                      {artisansOpen[idx] ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>

                  {artisansOpen[idx] && cluster.artisans && cluster.artisans.length > 0 ? (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                      {cluster.artisans.map((artisan, aidx) => (
                        <div 
                          key={artisan._id || aidx} 
                          style={{ 
                            background: 'white', 
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px', 
                            padding: '1.5rem',
                            transition: 'all 0.2s ease',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.borderColor = '#3182ce';
                            e.target.style.transform = 'translateX(4px)';
                            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.transform = 'translateX(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          {/* Artisan rank indicator */}
                          <div style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: artisan.artisan_rating >= 4.5 ? 
                              'linear-gradient(45deg, #fbbf24, #f59e0b)' : 
                              artisan.artisan_rating >= 4 ? 
                              'linear-gradient(45deg, #10b981, #059669)' : 
                              'linear-gradient(45deg, #6b7280, #4b5563)',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '15px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            textTransform: 'uppercase'
                          }}>
                            {artisan.artisan_rating >= 4.5 ? 'Elite' : artisan.artisan_rating >= 4 ? 'Pro' : 'Standard'}
                          </div>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', paddingRight: '4rem' }}>
                            <div>
                              <h6 style={{ color: '#111827', margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '700' }}>
                                {artisan.artisan_name}
                              </h6>
                              <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>
                                ID: <span style={{ color: '#374151', fontWeight: '600' }}>{artisan.artisan_id}</span>
                              </p>
                            </div>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ 
                              background: 'linear-gradient(135deg, #ede9fe 0%, #f3f4f6 100%)', 
                              padding: '0.75rem', 
                              borderRadius: '8px',
                              border: '1px solid #d1d5db'
                            }}>
                              <span style={{ color: '#6b7280', fontSize: '0.8rem', fontWeight: '500' }}>Total Orders</span>
                              <p style={{ margin: '0.25rem 0 0 0', color: '#111827', fontSize: '1.1rem', fontWeight: '700' }}>{artisan.total_orders}</p>
                            </div>
                            <div style={{ 
                              background: 'linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%)', 
                              padding: '0.75rem', 
                              borderRadius: '8px',
                              border: '1px solid #f59e0b'
                            }}>
                              <span style={{ color: '#92400e', fontSize: '0.8rem', fontWeight: '500' }}>Revenue</span>
                              <p style={{ margin: '0.25rem 0 0 0', color: '#92400e', fontSize: '1.1rem', fontWeight: '700' }}>₹{artisan.total_revenue?.toLocaleString()}</p>
                            </div>
                            <div style={{ 
                              background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)', 
                              padding: '0.75rem', 
                              borderRadius: '8px',
                              border: '1px solid #3b82f6'
                            }}>
                              <span style={{ color: '#1e40af', fontSize: '0.8rem', fontWeight: '500' }}>Current Order</span>
                              <p style={{ margin: '0.25rem 0 0 0', color: '#1e40af', fontSize: '1rem', fontWeight: '600' }}>{artisan.current_order}</p>
                            </div>
                            <div style={{ 
                              background: artisan.amount_to_be_paid > 0 ? 
                                'linear-gradient(135deg, #fecaca 0%, #fee2e2 100%)' : 
                                'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)', 
                              padding: '0.75rem', 
                              borderRadius: '8px',
                              border: artisan.amount_to_be_paid > 0 ? '1px solid #ef4444' : '1px solid #22c55e'
                            }}>
                              <span style={{ 
                                color: artisan.amount_to_be_paid > 0 ? '#dc2626' : '#16a34a', 
                                fontSize: '0.8rem', 
                                fontWeight: '500' 
                              }}>
                                {artisan.amount_to_be_paid > 0 ? 'Pending Payment' : 'Payment Status'}
                              </span>
                              <p style={{ 
                                margin: '0.25rem 0 0 0', 
                                color: artisan.amount_to_be_paid > 0 ? '#dc2626' : '#16a34a', 
                                fontSize: '1.1rem', 
                                fontWeight: '700' 
                              }}>
                                {artisan.amount_to_be_paid > 0 ? `₹${artisan.amount_to_be_paid?.toLocaleString()}` : 'Cleared'}
                              </p>
                            </div>
                          </div>
                          
                          {artisan.skills && artisan.skills.length > 0 && (
                            <div>
                              <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', display: 'block' }}>Expertise Areas:</span>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {artisan.skills.map((skill, skillIdx) => (
                                  <span 
                                    key={skillIdx}
                                    style={{ 
                                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
                                      color: 'white', 
                                      padding: '0.4rem 0.8rem', 
                                      borderRadius: '20px', 
                                      fontSize: '0.8rem', 
                                      fontWeight: '600',
                                      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                                      textTransform: 'capitalize'
                                    }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : artisansOpen[idx] ? (
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '3rem 2rem',
                      background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                      borderRadius: '12px',
                      border: '2px dashed #d1d5db'
                    }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>👥</div>
                      <h4 style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>No Artisans Assigned</h4>
                      <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.9rem' }}>This cluster is ready for artisan assignments</p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )
        )}
      </div>
      <Payment />
      
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

export default Admin;
