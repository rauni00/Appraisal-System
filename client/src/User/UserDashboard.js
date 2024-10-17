import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { removeAuthToken } from '../common/authToken';
import AppraisalList from './AppraisalList';

function UserDashboard() {
  const [appraisals, setAppraisals] = useState([]);
  const [answers, setAnswers] = useState({});
  const [editingAppraisalId, setEditingAppraisalId] = useState(null);
  const currUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchAppraisals();
  }, []);

  const fetchAppraisals = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}appraisal/${currUser._id}`
      );
      setAppraisals(response.data);
    } catch (error) {
      console.error('Error fetching appraisals', error);
    }
  };

  const handleAnswerChange = (appraisalId, questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [appraisalId]: {
        ...prev[appraisalId],
        [questionId]: value,
      },
    }));
  };

  const handleSubmit = async (appraisalId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}appraisal/submit`,
        {
          appraisalId,
          answers: answers[appraisalId] || {},
        }
      );
      alert(response.data.message);
      fetchAppraisals();
      setEditingAppraisalId(null);
    } catch (error) {
      console.error('Error submitting appraisal', error);
      alert('Failed to submit appraisal.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    removeAuthToken();
    window.location.href = '/login';
  };

  return (
    <div className='container'>
      <div className='d-flex justify-content-between'>
        <h1>User Dashboard</h1>
        <button className='btn btn-danger m-2' onClick={logout}>
          Logout
        </button>
      </div>
      <p>
        Welcome! <strong>{currUser?.email}</strong> Here you can view and submit
        your appraisals.
      </p>
      <AppraisalList
        appraisals={appraisals}
        editingAppraisalId={editingAppraisalId}
        setEditingAppraisalId={setEditingAppraisalId}
        handleAnswerChange={handleAnswerChange}
        handleSubmit={handleSubmit}
        answers={answers}
      />
    </div>
  );
}

export default UserDashboard;
