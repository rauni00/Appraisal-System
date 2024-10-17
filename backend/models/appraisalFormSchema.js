const mongoose = require('mongoose');

const appraisalSchema = new mongoose.Schema({
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  evaluator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  questions: [{ questionText: String }],
  answers: [{ question: String, answer: String }],
  isSubmit: { type: Boolean, default: false },
});

module.exports = mongoose.model('Appraisal', appraisalSchema);
