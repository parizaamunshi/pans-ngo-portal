import React, { useState } from 'react';

function Login({ onLogin }) {
  const [role, setRole] = useState('admin');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin(role);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#1e90ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: '2rem',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        padding: '3rem',
        textAlign: 'center',
      }}>
        <h2 style={{ 
          color: '#1e90ff', 
          marginBottom: '2.5rem', 
          fontSize: '2rem',
          fontWeight: '600',
          margin: '0 0 2.5rem 0'
        }}>
          Login
        </h2>
        
        <form onSubmit={handleSubmit} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2rem' 
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem',
            marginBottom: '1rem'
          }}>
            <label style={{ 
              fontSize: '1.1rem', 
              color: '#333',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
                style={{ 
                  width: '18px',
                  height: '18px',
                  accentColor: '#1e90ff'
                }}
              />
              Admin
            </label>
            
            <label style={{ 
              fontSize: '1.1rem', 
              color: '#333',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <input
                type="radio"
                name="role"
                value="leader"
                checked={role === 'leader'}
                onChange={() => setRole('leader')}
                style={{ 
                  width: '18px',
                  height: '18px',
                  accentColor: '#1e90ff'
                }}
              />
              Leader
            </label>
          </div>
          
          <button 
            type="submit" 
            style={{ 
              padding: '1rem 2rem', 
              fontSize: '1.1rem', 
              backgroundColor: '#1e90ff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1c7ed6'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1e90ff'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
