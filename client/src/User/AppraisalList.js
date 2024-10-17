import React from 'react';

function AppraisalList({
  appraisals,
  editingAppraisalId,
  setEditingAppraisalId,
  handleAnswerChange,
  handleSubmit,
  answers,
}) {
  return (
    <>
      {appraisals.length > 0 ? (
        <ul className='list-group'>
          {appraisals.map((appraisal) => (
            <li key={appraisal._id} className='list-group-item'>
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <strong>{appraisal?.evaluator?.email} appraisal:</strong>{' '}
                  {appraisal.isSubmit ? 'Filled' : 'Not filled'}
                </div>
                {!appraisal.isSubmit && (
                  <button
                    className='btn btn-info btn-sm'
                    onClick={() => setEditingAppraisalId(appraisal._id)}
                  >
                    Edit
                  </button>
                )}
              </div>

              {editingAppraisalId === appraisal._id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(appraisal._id);
                  }}
                  className='mt-2'
                >
                  <ul className='list-group'>
                    {appraisal.questions.map((question) => (
                      <li key={question._id} className='list-group-item'>
                        <strong>Question:</strong> {question.questionText}
                        <input
                          type='text'
                          className='form-control'
                          value={answers[appraisal._id]?.[question._id] || ''}
                          onChange={(e) =>
                            handleAnswerChange(
                              appraisal._id,
                              question._id,
                              e.target.value
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                  <button type='submit' className='btn btn-primary mt-2'>
                    Submit Answers
                  </button>
                  <button
                    type='button'
                    className='btn btn-secondary mt-2 ms-2 mx-3'
                    onClick={() => setEditingAppraisalId(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                appraisal.isSubmit && (
                  <div className='mt-2'>
                    <strong>Submitted Answers:</strong>
                    <ul className='list-group'>
                      {appraisal.answers.map((submittedAnswer) => {
                        // Find the corresponding question
                        const question = appraisal.questions.find(
                          (q) => q._id === submittedAnswer.question
                        );

                        return (
                          <li
                            key={submittedAnswer._id}
                            className='list-group-item'
                          >
                            <strong>Question:</strong>{' '}
                            {question?.questionText || 'Unknown Question'},{' '}
                            <strong>Answer:</strong> {submittedAnswer.answer}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appraisals available.</p>
      )}
    </>
  );
}

export default AppraisalList;
