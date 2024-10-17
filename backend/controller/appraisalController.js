const Appraisal = require('../models/appraisalFormSchema');
const userSchema = require('../models/userSchema');

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    if (req.role !== 'Admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const users = await userSchema.find({ role: { $ne: 'Admin' } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all appraisals (Admin only)
exports.getAppraisal = async (req, res) => {
  try {
    if (req.role !== 'Admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const appraisals = await Appraisal.find({}).populate(
      'participant evaluator'
    );
    res.status(200).json(appraisals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get evaluators (Admin only)
exports.getEvaluators = async (req, res) => {
  try {
    const evaluators = await userSchema.find({
      role: { $in: ['Supervisor', 'Peer', 'Junior'] },
    });
    res.status(200).json(evaluators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAppraisal = async (req, res) => {
  try {
    const { participants, evaluatorId, questions } = req.body;

    if (req.role !== 'Admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const appraisals = participants.map((participantId) => ({
      participant: participantId,
      evaluator: evaluatorId,
      role: evaluatorId === participantId ? 'Self' : 'Other',
      questions: questions.map((questionText) => ({ questionText })),
      isSubmit: false,
    }));

    await Appraisal.insertMany(appraisals);

    res.status(201).json({
      message:
        'Appraisals created successfully for multiple participants and evaluators',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAppraisalsByParticipant = async (req, res) => {
  try {
    const { participantId } = req.params;
    const { userId, role } = req;

    let appraisals;

    if (role === 'Admin') {
      appraisals = await Appraisal.find({
        participant: participantId,
      }).populate('evaluator');
    } else {
      appraisals = await Appraisal.find({
        $or: [
          { participant: participantId },
          { participant: userId, role: 'Self' },
          { participant: participantId, role: 'Self', evaluator: userId },
        ],
      }).populate('evaluator');
    }

    return res.json(appraisals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitAppraisal = async (req, res) => {
  try {
    const { appraisalId, answers } = req.body;
    const appraisal = await Appraisal.findById(appraisalId);

    if (!appraisal) {
      return res.status(404).json({ message: 'Appraisal not found' });
    }

    if (appraisal.isSubmit) {
      return res.status(400).json({ message: 'Appraisal already submitted' });
    }
    appraisal.answers = Object.entries(answers).map(([questionId, answer]) => ({
      question: questionId,
      answer,
    }));
    appraisal.isSubmit = true;

    await appraisal.save();

    return res.json({ message: 'Appraisal submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting appraisal.' });
  }
};
