const express = require('express');
const {
  createAppraisal,
  getAppraisalsByParticipant,
  getAppraisal,
  getAllUsers,
  getEvaluators,
  submitAppraisal,
} = require('../controller/appraisalController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware(['Admin']), getAppraisal);
router.get('/users', authMiddleware(['Admin']), getAllUsers);
router.get('/evaluators', authMiddleware(['Admin']), getEvaluators);
router.post('/', authMiddleware(['Admin']), createAppraisal);

router.get(
  '/:participantId',
  authMiddleware(['Admin', 'Supervisor', 'Peer', 'Junior']),
  getAppraisalsByParticipant
);

router.post(
  '/submit',
  authMiddleware(['Supervisor', 'Peer', 'Junior']),
  submitAppraisal
);

module.exports = router;
