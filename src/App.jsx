import React, { useState } from 'react';
import Leader from './components/Leader';
import Admin from './components/Admin';
import Login from './components/Login';

const App = () => {
  const [page, setPage] = useState('login');

  const handleLogin = (role) => {
    if (role === 'admin') setPage('admin');
    else setPage('leader');
  };

  return (
    <div>
      {page === 'login' && <Login onLogin={handleLogin} />}
      {page === 'admin' && <Admin />}
      {page === 'leader' && <Leader />}
    </div>
  );
};

export default App;
