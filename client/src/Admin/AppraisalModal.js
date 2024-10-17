import React from 'react';

function AppraisalModal({ selectedAppraisal }) {
  return (
    <div
      className='modal fade'
      id='appraisalModal'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='appraisalModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='appraisalModalLabel'>
              Appraisal Details
            </h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            {selectedAppraisal ? (
              <>
                <h6>Questions and Answers</h6>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAppraisal.questions.map((question, index) => {
                      const answer = selectedAppraisal.answers.find(
                        (ans) => ans.question === question._id
                      );
                      return (
                        <tr key={question._id}>
                          <td>{question.questionText}</td>
                          <td>{answer ? answer.answer : 'No Answer'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            ) : (
              <p>No appraisal selected.</p>
            )}
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-dismiss='modal'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppraisalModal;
