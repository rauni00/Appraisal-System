import React from 'react';

function ParticipantSelector({
  users,
  selectedParticipants,
  setSelectedParticipants,
}) {
  const toggleParticipant = (userId) => {
    setSelectedParticipants((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className='row'>
      {users.map((user) => (
        <div key={user._id} className='col-md-6 mb-3'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>{user.email}</h5>
              <button
                type='button'
                className={`btn ${
                  selectedParticipants?.includes(user._id)
                    ? 'btn-success'
                    : 'btn-outline-primary'
                }`}
                onClick={() => toggleParticipant(user._id)}
              >
                {selectedParticipants?.includes(user._id)
                  ? 'Selected'
                  : 'Select'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ParticipantSelector;
