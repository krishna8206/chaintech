import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';

import Dashboard from './pages/Dashboard';

import Cart from './pages/Cart';

import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Toaster 
        position="top-center" 
        toastOptions={{ 
          duration: 3000, 
          style: { background: '#333', color: '#fff', borderRadius: '10px' },
          success: { style: { background: '#10b981' } },
          error: { style: { background: '#ef4444' } }
        }} 
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
