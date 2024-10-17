import React from 'react';

function AppraisalList({ appraisals, openModal }) {
  return (
    <div className='col-md-6'>
      <h2>Appraisals List</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Participant</th>
            <th>Evaluator</th>
            <th>Role</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {appraisals && appraisals.length > 0 ? (
            appraisals.map((appraisal) => (
              <tr key={appraisal._id}>
                <td>{appraisal.participant.email}</td>
                <td>{appraisal.evaluator.email}</td>
                <td>{appraisal.role}</td>
                <td>{appraisal.isSubmit ? 'Submitted' : 'Pending'}</td>
                <td>
                  <button
                    className='btn btn-info btn-sm'
                    onClick={() => openModal(appraisal)}
                    disabled={!appraisal.isSubmit}
                  >
                    See
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No appraisals available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppraisalList;
