const express = require('express');
const router = express.Router();
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerController');
const { protect } = require('../middleware/auth');
const { validate, customerSchema } = require('../middleware/validation');

// All routes are protected
router.use(protect);

// Customer routes
router.route('/')
  .get(getCustomers)
  .post(validate(customerSchema), createCustomer);

router.route('/:id')
  .get(getCustomer)
  .put(validate(customerSchema), updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
