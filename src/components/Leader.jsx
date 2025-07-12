



import React, { useState } from 'react';

import OrderDetails from './OrderDetails';
import ArtisanDetails from './ArtisanDetails';
import AllArtisans from './AllArtisans';


function Leader() {
  // Example order data with new fields
  const order1 = {
    OrderQuantity: 10,
    orderDate: '2025-07-10',
    TypeofProd: 'Rakhis',
    customerName: 'Amit',
    deliverAddress: 'Bangalore',
    estimatedDeliveryDate: '2025-07-15',
    Specifications: 'Color: Blue, Size: Medium',
    status: 'Pending',
    productcost: 500,
  };
  const order2 = {
    OrderQuantity: 100,
    orderDate: '2025-05-10',
    TypeofProd: 'Toys',
    customerName: 'Priya',
    deliverAddress: 'Bangalore',
    estimatedDeliveryDate: '2025-05-15',
    Specifications: 'Color: Blue, Size: Large',
    status: 'Delivered',
    productcost: 8000,
  };
  const order3 = {
    OrderQuantity: 130,
    orderDate: '2025-07-01',
    TypeofProd: 'Toys2',
    customerName: 'Rahul',
    deliverAddress: 'Raipur',
    estimatedDeliveryDate: '2025-07-15',
    Specifications: 'Color: Green, Size: Medium',
    status: 'In Progress',
    productcost: 12000,
  };
  const orders = [order1, order2, order3];
  const totalProducts = orders.reduce((sum, order) => sum + order.OrderQuantity, 0);

  // Example artisans data
  const artisans = [
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
  ];
  const artisansUnder = artisans.length;
  const avgArtisansRating = (artisans.reduce((sum, a) => sum + a.artisian_rating, 0) / artisans.length).toFixed(2);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOrderIdx, setSelectedOrderIdx] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [artisanDropdownOpen, setArtisanDropdownOpen] = useState(false);
  const [selectedArtisanIdx, setSelectedArtisanIdx] = useState(null);

  const handleDropdown = () => {
    setDropdownOpen((prev) => {
      if (!prev) setShowAll(false); // If opening dropdown, close showAll
      return !prev;
    });
    setSelectedOrderIdx(null);
    setSelectedArtisanIdx(null);
  };
  const handleSelect = (idx) => {
    setSelectedOrderIdx(idx);
    setDropdownOpen(false);
    setShowAll(false);
    setSelectedArtisanIdx(null);
  };
  const handleShowAll = () => {
    setShowAll((prev) => {
      if (!prev) setDropdownOpen(false); // If opening showAll, close dropdown
      return !prev;
    });
    setSelectedOrderIdx(null);
    setSelectedArtisanIdx(null);
  };
  const handleArtisanDropdown = () => setArtisanDropdownOpen(!artisanDropdownOpen);
  const handleSelectArtisan = (idx) => {
    setSelectedArtisanIdx(idx);
    setArtisanDropdownOpen(false);
    setSelectedOrderIdx(null);
    setShowAll(false);
  };

  return (
    <div className="leader" style={{ maxWidth: '1400px', width: '95vw', margin: '0 auto', textAlign: 'center', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Navbar */}
      <nav style={{
        position: 'relative',
        left: 0,
        top: 0,
        width: '100vw',
        minWidth: '100vw',
        background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
        padding: '1.2rem 0 1.2rem 0',
        marginBottom: '2.5rem',
        boxShadow: '0 2px 8px #1976d233',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '3rem',
        fontSize: '1.2rem',
        fontWeight: 500,
        borderRadius: '0 0 12px 12px',
        zIndex: 10,
      }}>
        <span
          style={{ color: 'white', cursor: 'pointer', letterSpacing: 1 }}
          onClick={() => {
            setShowAll(true);
            setDropdownOpen(false);
            setSelectedOrderIdx(null);
            setSelectedArtisanIdx(null);
          }}
        >
          View Orders
        </span>
        <span style={{ color: 'white', cursor: 'pointer', letterSpacing: 1 }}>Update Status</span>
        <span style={{ color: 'white', cursor: 'pointer', letterSpacing: 1 }}>Track Orders</span>
        <span style={{ color: 'white', cursor: 'pointer', letterSpacing: 1 }}>View Feedback</span>
      </nav>
      <div style={{ background: 'linear-gradient(90deg, #388e3c 0%, #1976d2 100%)', color: 'white', borderRadius: 10, padding: '2.5rem', marginBottom: '2.5rem', boxShadow: '0 2px 8px #0001', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ margin: 0 }}>Total Products Received: <span style={{ color: '#fbc02d' }}>{totalProducts}</span></h2>
      </div>
      <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: '2.5rem', marginBottom: '2.5rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <button onClick={handleDropdown} style={{ padding: '0.5rem 1.2rem', fontSize: '1rem', background: '#1976d2', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>
            {dropdownOpen ? 'Hide Products' : 'Show Products'}
          </button>
          <button onClick={handleShowAll} style={{ padding: '0.5rem 1.2rem', fontSize: '1rem', background: '#388e3c', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>
            {showAll ? 'Hide All Products' : 'Show All Products'}
          </button>
          {/* Artisan Details Button - currently links to empty page */}
          <a href="" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '0.5rem 1.2rem', fontSize: '1rem', background: '#fbc02d', color: '#333', border: 'none', borderRadius: 6, fontWeight: 500, cursor: 'pointer' }}>
              Artisan Details
            </button>
          </a>
        </div>
        {dropdownOpen && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', border: '1px solid #ccc', borderRadius: 6, background: '#f7fafd', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 1px 4px #1976d233' }}>
            {orders.map((order, idx) => (
              <li key={idx} style={{ padding: '0.7rem', cursor: 'pointer', borderBottom: idx !== orders.length - 1 ? '1px solid #eee' : 'none', fontWeight: 500, color: '#1976d2' }}
                  onClick={() => handleSelect(idx)}>
                {idx + 1}. {order.TypeofProd}
              </li>
            ))}
          </ul>
        )}
        {selectedOrderIdx !== null && (
          <div style={{ marginTop: '2rem' }}>
            <OrderDetails order={orders[selectedOrderIdx]} />
          </div>
        )}
        {showAll && (
          <div style={{ marginTop: '2rem' }}>
            {orders.map((order, idx) => (
              <OrderDetails key={idx} order={order} />
            ))}
          </div>
        )}
      </div>

      {/* Artisans Section */}
      <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: '2.5rem', marginBottom: '2.5rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ color: '#388e3c' }}>Artisans Under Leader: <span>{artisansUnder}</span></h2>
        <h3 style={{ color: '#fbc02d' }}>Average Artisan Rating: <span>{avgArtisansRating}</span></h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <button onClick={handleArtisanDropdown} style={{ padding: '0.5rem 1.2rem', fontSize: '1rem', background: '#388e3c', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>
            {artisanDropdownOpen ? 'Hide Artisans' : 'Show Artisans'}
          </button>
        </div>
        {artisanDropdownOpen && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', border: '1px solid #ccc', borderRadius: 6, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto', background: '#f7fafd', boxShadow: '0 1px 4px #388e3c22' }}>
            {artisans.map((artisan, idx) => (
              <li key={idx} style={{ padding: '0.7rem', cursor: 'pointer', borderBottom: idx !== artisans.length - 1 ? '1px solid #eee' : 'none', fontWeight: 500, color: '#388e3c' }}
                  onClick={() => handleSelectArtisan(idx)}>
                {idx + 1}. {artisan.artisian_name} (ID: {artisan.artisian_id})
              </li>
            ))}
          </ul>
        )}
        {selectedArtisanIdx !== null && (
          <div style={{ marginTop: '2rem' }}>
            <ArtisanDetails artisan={artisans[selectedArtisanIdx]} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Leader;