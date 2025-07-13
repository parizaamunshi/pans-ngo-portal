import React, { useState } from 'react';
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
  const [leaders] = useState(initialLeaders);
  const [form, setForm] = useState({
    OrderQuantity: '',
    orderDate: '',
    TypeofProd: '',
    customerName: '',
    deliverAddress: '',
    estimatedDeliveryDate: '',
    Specifications: '',
    status: '',
    productcost: '',
  });
  const [leadersOpen, setLeadersOpen] = useState(false);
  const [artisansOpen, setArtisansOpen] = useState({});
  const [priority, setPriority] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
   
   const handleSubmit = async (e) => {
    e.preventDefault();
    setOrders([...orders, form]);
    await axios.get('http://localhost:3000/api/clusters').then(response => {
      const clusters = response.data;
    
      setPriority(
        clusters.sort((a, b) => b.cluster_rating - a.cluster_rating)
      );
      console.log("Clusters fetched successfully:", priority);
    }).catch(error => {
      console.error("Error fetching clusters:", error);
    });
    await axios.post('http://localhost:3000/api/orderDetails', {
      orderQuantity: form.OrderQuantity,
      orderDate: form.orderDate,
      typeOfProduct: form.TypeofProd,
      customerName: form.customerName,
      deliveryAddress: form.deliverAddress,
      estimatedDeliveryDate: form.estimatedDeliveryDate,
      specifications: form.Specifications,
      assignedTo : priority.length > 0 ? priority[0].cluster_id : null,
      status: form.status,
      productCost: form.productcost
    }).then(respone => {
      console.log("Order added successfully:", respone.data);
    }).catch(error => {
      console.error("Error adding order:", error);
    });
    setForm({
      OrderQuantity: '', orderDate: '', TypeofProd: '', customerName: '', deliverAddress: '', estimatedDeliveryDate: '', Specifications: '', status: '', productcost: '',
    });
  };

  const toggleLeaders = () => setLeadersOpen((prev) => !prev);
  const toggleArtisans = (idx) => setArtisansOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <div style={{ maxWidth: '1400px', width: '95vw', margin: '2rem auto', textAlign: 'center', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <div style={{ background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)', color: 'white', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 2px 8px #0001' }}>
        <h2 style={{ margin: 0 }}>Admin Panel</h2>
      </div>
      <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: '2.5rem', marginBottom: '2.5rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h3 style={{ color: '#1976d2' }}>Enter Product/Order Details</h3>
        <form onSubmit={handleSubmit} style={{
          marginBottom: 0,
          border: '1px solid #e3e3e3',
          borderRadius: 8,
          padding: '2rem',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
          background: '#f7fafd'
        }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          maxWidth: '800px',
          margin: '0 auto',
          color:"black"
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="OrderQuantity">Order Quantity</label>
            <input id="OrderQuantity" name="OrderQuantity" value={form.OrderQuantity} onChange={handleChange} required style={{ margin: 4 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="orderDate">Order Date</label>
            <input id="orderDate"  name="orderDate" value={form.orderDate} onChange={handleChange} required style={{ margin: 4 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="TypeofProd">Type of Product</label>
            <input id="TypeofProd" name="TypeofProd" value={form.TypeofProd} onChange={handleChange} required style={{ margin: 4 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="customerName">Customer Name</label>
            <input id="customerName" name="customerName" value={form.customerName} onChange={handleChange} required style={{ margin: 4 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="deliverAddress">Delivery Address</label>
            <input id="deliverAddress" name="deliverAddress" value={form.deliverAddress} onChange={handleChange} required style={{ margin: 4 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="estimatedDeliveryDate">Estimated Delivery Date</label>
            <input id="estimatedDeliveryDate"  name="estimatedDeliveryDate" value={form.estimatedDeliveryDate} onChange={handleChange} required style={{ margin: 4 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="Specifications">Specifications</label>
            <input id="Specifications" name="Specifications" value={form.Specifications} onChange={handleChange} required style={{ margin: 4 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="status">Status</label>
            <input id="status" name="status" value={form.status} onChange={handleChange} required style={{ margin: 4 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="productcost">Product Cost</label>
            <input id="productcost" name="productcost" value={form.productcost} onChange={handleChange} required style={{ margin: 4 }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', gridColumn: '1 / -1' }}>
          <button type="submit" style={{ margin: 8, padding: '0.7rem 2rem', fontSize: '1.1rem', background: '#1976d2', color: 'white', border: 'none', borderRadius: 6, boxShadow: '0 1px 4px #1976d233', cursor: 'pointer', fontWeight: 500 }}>Add Product</button>
        </div>
      </form>
      </div>

      <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: '2.5rem', marginBottom: '2.5rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h3 style={{ color: '#1976d2' }}>All Products/Orders</h3>
        {orders.length === 0 ? <p style={{ color: '#888' }}>No products/orders added yet.</p> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '100%', background: 'white', fontSize: '1.1rem' }}>
              <thead style={{ background: '#e3eafc' }}>
                <tr>
                  <th>Order Quantity</th><th>Order Date</th><th>Type</th><th>Customer</th><th>Delivery Address</th><th>Est. Delivery</th><th>Specs</th><th>Status</th><th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td>{o.OrderQuantity}</td><td>{o.orderDate}</td><td>{o.TypeofProd}</td><td>{o.customerName}</td><td>{o.deliverAddress}</td><td>{o.estimatedDeliveryDate}</td><td>{o.Specifications}</td><td>{o.status}</td><td>{o.productcost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <hr style={{ margin: '2rem 0' }} />
      <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: '2.5rem', marginBottom: '2.5rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h3 style={{ color: '#1976d2' }}>Leaders Summary</h3>
        <p><strong>Number of Leaders:</strong> {leaders.length}</p>
        <button onClick={toggleLeaders} style={{ margin: '1rem', padding: '0.5rem 1.2rem', fontSize: '1rem', background: '#388e3c', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>
          {leadersOpen ? 'Hide Leaders' : 'Show Leaders'}
        </button>
        {leadersOpen && leaders.map((leader, idx) => (
          <div key={idx} style={{ border: '1px solid #e3e3e3', borderRadius: 8, padding: '1rem', margin: '1rem 0', background: '#f7fafd', boxShadow: '0 1px 4px #388e3c22' }}>
            <h4 style={{ color: '#388e3c', marginBottom: 0 }}>{leader.leader_name} (ID: {leader.leader_id})</h4>
            <p style={{ marginTop: 4 }}><strong>Number of Artisans:</strong> {leader.artisans.length}</p>
            <button onClick={() => toggleArtisans(idx)} style={{ margin: '0.5rem', padding: '0.3rem 1rem', fontSize: '1rem', background: '#fbc02d', color: '#333', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>
              {artisansOpen[idx] ? 'Hide Artisans' : 'Show Artisans'}
            </button>
            {artisansOpen[idx] && leader.artisans.map((artisan, aidx) => (
              <ul key={aidx} style={{ textAlign: 'left', margin: '0 auto', maxWidth: 400, background: 'white', borderRadius: 6, boxShadow: '0 1px 4px #8881', padding: '1rem', marginTop: '1rem' }}>
                <li><strong>Artisian ID:</strong> {artisan.artisian_id}</li>
                <li><strong>Artisian Name:</strong> {artisan.artisian_name}</li>
                <li><strong>Artisian Rating:</strong> {artisan.artisian_rating}</li>
                <li><strong>Total Orders:</strong> {artisan.total_orders}</li>
                <li><strong>Total Revenue:</strong> ₹{artisan.total_revenue}</li>
                <li><strong>Current Order:</strong> {artisan.current_order}</li>
                <li><strong>Amount to be Paid:</strong> ₹{artisan.amount_to_be_paid}</li>
                <li><strong>Skills:</strong> {artisan.skills.join(', ')}</li>
              </ul>
            ))}
          </div>
        ))}
      </div>
      <Payment />
    </div>
  );
}

export default Admin;
