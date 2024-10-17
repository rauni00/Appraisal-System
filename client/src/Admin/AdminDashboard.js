import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { removeAuthToken } from '../common/authToken';
import AppraisalForm from './AppraisalForm';
import AppraisalList from './AppraisalList';
import AppraisalModal from './AppraisalModal';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [evaluators, setEvaluators] = useState([]);
  const [appraisals, setAppraisals] = useState([]);
  const [selectedAppraisal, setSelectedAppraisal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchEvaluators();
    fetchAppraisals();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}appraisal/users`
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchEvaluators = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}appraisal/evaluators`
      );
      setEvaluators(response.data);
    } catch (error) {
      console.error('Error fetching evaluators:', error);
    }
  };

  const fetchAppraisals = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}appraisal`
      );
      setAppraisals(response.data);
    } catch (error) {
      console.error('Error fetching appraisals:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    removeAuthToken();
    navigate('/login');
  };

  const openModal = (appraisal) => {
    setSelectedAppraisal(appraisal);
    window.$('#appraisalModal').modal('show');
  };

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between'>
        <h1>Admin Dashboard</h1>
        <button className='btn btn-danger m-2' onClick={logout}>
          Logout
        </button>
      </div>
      <p>Manage participants and appraisals.</p>

      <div className='row'>
        <div className='col-md-6'>
          <AppraisalForm
            evaluators={evaluators}
            users={users}
            fetchAppraisals={fetchAppraisals}
          />
        </div>
        <div className='col-md-6'>
          <AppraisalList appraisals={appraisals} openModal={openModal} />
        </div>
      </div>
      <AppraisalModal selectedAppraisal={selectedAppraisal} />
    </div>
  );
}

export default AdminDashboard;
