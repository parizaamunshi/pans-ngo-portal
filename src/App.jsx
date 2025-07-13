import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Admin from './components/Admin';
import Leader from './components/Leader';
import Barcode from './components/Barcode';
import TrackOrder from './components/TrackOrder';
import OrderDetails from './components/OrderDetails';
import Addleader from './components/addleader';
import HomeLeader from './components/home_leader'
import Feedback from './components/feedback';
import Timeline from './components/TrackOrder';
import Village1 from './components/villages/village1';
import Village2 from './components/villages/village2';
import Village3 from './components/villages/village3';
import Village4 from './components/villages/village4';
import Village5 from './components/villages/village5';

import Dashboard from './components/Dashboard';







function Login() {
  const [role, setRole] = useState('admin');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("event", e);

    e.preventDefault();

    // Navigate based on role
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'leader') {
      navigate('/leader');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: 0,
    }}>
      <div style={{
        width: '100vw',
        maxWidth: '100vw',
        background: 'white',
        borderRadius: 0,
        boxShadow: 'none',
        padding: '3rem 0',
        textAlign: 'center',
        margin: 0,
      }}>
        <h2 style={{ color: '#1976d2', marginBottom: '2rem', fontSize: '2.2rem' }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
            <label style={{ fontSize: '1.3rem', color: '#333' }}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
                style={{ marginRight: 10 }}
              />
              Admin
            </label>
            <label style={{ fontSize: '1.3rem', color: '#333' }}>
              <input
                type="radio"
                name="role"
                value="leader"
                checked={role === 'leader'}
                onChange={() => setRole('leader')}
                style={{ marginRight: 10 }}
              />
              Leader
            </label>
          </div>
          <button type="submit" style={{ padding: '1rem 4rem', fontSize: '1.3rem', background: '#1976d2', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, boxShadow: '0 1px 4px #1976d233', cursor: 'pointer', letterSpacing: 1 }}>Login</button>
        </form>
      </div>
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard() {
  return (
    <div>
      <AddProducts />
    </div>
  );
}

// Leader Dashboard Component
function LeaderDashboard() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Leader Dashboard</h1>
      <p>Welcome to the Leader Dashboard!</p>
      {/* Add leader-specific components here */}
    </div>
  );
}

// Main App Component with Routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/leader" element={<Leader />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/barcode" element={<Barcode />} />
        <Route path="/trackorder" element={<TrackOrder />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/orderdetails" element={<OrderDetails />} />

        <Route
          path="/"
          element={
            <div>
              <HomeLeader />
              <div style={{ marginTop: "4rem" }}>
                <h2 style={{ textAlign: "center" }}>Feedback</h2>
                <Feedback />
              </div>
              <div style={{ marginTop: "4rem" }}>
                <h2 style={{ textAlign: "center" }}>Order Timeline</h2>

                <Timeline />
              </div>
            </div>
          }
        />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/village1" element={<Village1 />} />
        <Route path="/village2" element={<Village2 />} />
        <Route path="/village3" element={<Village3 />} />
        <Route path="/village4" element={<Village4 />} />
        <Route path="/village5" element={<Village5 />} />
        <Route path="/trackorder" element={<Timeline />} />
        <Route
          path="/barcode"
          element={
            <>
              <h3 style={{ textAlign: "center", marginTop: "20px" }}>
                Product Approval
              </h3>
              <Barcode />
              {/* <ToastContainer position="top-right" autoClose={2000} /> */}
            </>
          }
        />
        <Route path="/admin/addleader" element={<Addleader />} />


      </Routes>
    </Router>
  );
}

export default App;
