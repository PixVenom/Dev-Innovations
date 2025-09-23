const express = require('express');
const router = express.Router();
const {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  getLeadStats
} = require('../controllers/leadController');
const { protect } = require('../middleware/auth');
const { validate, leadSchema } = require('../middleware/validation');

// All routes are protected
router.use(protect);

// Lead statistics route
router.get('/stats', getLeadStats);

// Customer-specific lead routes (must come before /:id route)
router.route('/customers/:customerId/leads')
  .get(getLeads)
  .post(validate(leadSchema), createLead);

// Lead routes
router.route('/:id')
  .get(getLead)
  .put(validate(leadSchema), updateLead)
  .delete(deleteLead);

module.exports = router;
