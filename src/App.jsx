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








function Login() {
  const [role, setRole] = useState('admin');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
      background: 'linear-gradient(120deg, #1976d2 0%, #42a5f5 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: 0,
    }}>
      <div style={{
        width: 400,
        background: 'white',
        borderRadius: 18,
        boxShadow: '0 6px 32px #1976d233',
        padding: '2.5rem 2.5rem 2rem 2.5rem',
        textAlign: 'center',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ marginBottom: '2rem', width: '100%' }}>
          <h2 style={{ color: '#1976d2', fontWeight: 700, fontSize: '2.3rem', margin: 0, letterSpacing: 1 }}>Welcome</h2>
          <p style={{ color: '#555', fontSize: '1.1rem', margin: '0.5rem 0 0 0' }}>Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
            <label style={{ fontSize: '1.15rem', color: '#1976d2', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, border: role === 'admin' ? '2px solid #1976d2' : '2px solid #e3e3e3', borderRadius: 8, padding: '0.5rem 1.2rem', background: role === 'admin' ? '#e3f2fd' : '#f7fafd', transition: 'all 0.2s' }}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
                style={{ marginRight: 8 }}
              />
              Admin
            </label>
            <label style={{ fontSize: '1.15rem', color: '#1976d2', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, border: role === 'leader' ? '2px solid #1976d2' : '2px solid #e3e3e3', borderRadius: 8, padding: '0.5rem 1.2rem', background: role === 'leader' ? '#e3f2fd' : '#f7fafd', transition: 'all 0.2s' }}>
              <input
                type="radio"
                name="role"
                value="leader"
                checked={role === 'leader'}
                onChange={() => setRole('leader')}
                style={{ marginRight: 8 }}
              />
              Leader
            </label>
          </div>
          <button type="submit" style={{ width: '100%', padding: '1rem 0', fontSize: '1.2rem', background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, boxShadow: '0 2px 8px #1976d233', cursor: 'pointer', letterSpacing: 1, marginBottom: '0.5rem', transition: 'background 0.2s' }}>Login</button>
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
              <Barcode   />
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
