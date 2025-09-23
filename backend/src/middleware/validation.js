const Joi = require('joi');

// User validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot be more than 50 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
});

// Customer validation schemas
const customerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot be more than 100 characters',
    'any.required': 'Customer name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required'
  }),
  phone: Joi.string().min(10).max(15).required().messages({
    'string.min': 'Phone number must be at least 10 characters',
    'string.max': 'Phone number cannot be more than 15 characters',
    'any.required': 'Phone number is required'
  }),
  company: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Company name must be at least 2 characters long',
    'string.max': 'Company name cannot be more than 100 characters',
    'any.required': 'Company name is required'
  })
});

// Lead validation schemas
const leadSchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Title must be at least 2 characters long',
    'string.max': 'Title cannot be more than 100 characters',
    'any.required': 'Lead title is required'
  }),
  description: Joi.string().min(10).max(500).required().messages({
    'string.min': 'Description must be at least 10 characters long',
    'string.max': 'Description cannot be more than 500 characters',
    'any.required': 'Lead description is required'
  }),
  status: Joi.string().valid('New', 'Contacted', 'Converted', 'Lost').default('New').messages({
    'any.only': 'Status must be one of: New, Contacted, Converted, Lost'
  }),
  value: Joi.number().min(0).required().messages({
    'number.min': 'Value cannot be negative',
    'any.required': 'Lead value is required'
  })
});

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorMessages
      });
    }
    
    next();
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  customerSchema,
  leadSchema,
  validate
};
