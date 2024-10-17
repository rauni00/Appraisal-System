import React, { useState } from 'react';
import axios from 'axios';
import ParticipantSelector from './ParticipantSelector';

function AppraisalForm({ evaluators, users, fetchAppraisals }) {
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [evaluatorId, setEvaluatorId] = useState('');
  const [questions, setQuestions] = useState(['']);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}appraisal`,
        {
          participants: selectedParticipants,
          evaluatorId,
          questions,
        }
      );
      setLoading(false);
      setMessage(response.data.message);
      setSelectedParticipants([]);
      setEvaluatorId('');
      setQuestions(['']);
      fetchAppraisals();
    } catch (error) {
      setLoading(false);
      console.error('Error creating appraisal:', error);
      setMessage('Error creating appraisal');
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestionField = () => {
    setQuestions([...questions, '']);
  };

  return (
    <form className='mb-4' onSubmit={handleSubmit}>
      {message && <p className='mt-3 text-success'>{message}</p>}
      <div className='form-group'>
        <label htmlFor='evaluator'>Select Evaluator:</label>
        <select
          className='form-control'
          value={evaluatorId}
          required
          onChange={(e) => setEvaluatorId(e.target.value)}
        >
          <option value=''>Select Evaluator</option>
          {evaluators.map((evaluator) => (
            <option key={evaluator._id} value={evaluator._id}>
              {evaluator.email}
            </option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='questions'>Appraisal Questions:</label>
        {questions.map((question, index) => (
          <div key={index} className='mb-2'>
            <input
              type='text'
              className='form-control'
              placeholder={`Question ${index + 1}`}
              value={question}
              required
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
          </div>
        ))}
        <button
          type='button'
          className='btn btn-secondary mt-1'
          onClick={addQuestionField}
        >
          Add Question
        </button>
      </div>

      <h2>Select Participants</h2>
      <ParticipantSelector
        users={users}
        selectedParticipants={selectedParticipants}
        setSelectedParticipants={setSelectedParticipants}
      />

      <button type='submit' disabled={loading} className='btn btn-primary mt-3'>
        {loading ? 'Loading...' : 'Create Appraisal'}
      </button>
    </form>
  );
}

export default AppraisalForm;
