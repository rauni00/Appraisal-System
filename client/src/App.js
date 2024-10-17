import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ProtectedRoute from './common/ProtectedRoute';
import AdminDashboard from './Admin/AdminDashboard';
import Login from './components/Login';
import UserDashboard from './User/UserDashboard';
import { setAuthToken } from './common/authToken';

function App() {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/admin-dashboard'
          element={
            <ProtectedRoute roleRequired='Admin'>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/user-dashboard'
          element={
            <ProtectedRoute roleRequired={['Supervisor', 'Peer', 'Junior']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </Router>
  );
}

export default App;
