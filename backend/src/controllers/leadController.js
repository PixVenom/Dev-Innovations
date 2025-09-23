const Lead = require('../models/Lead');
const Customer = require('../models/Customer');

// @desc    Get all leads for a customer
// @route   GET /api/customers/:customerId/leads
// @access  Private
const getLeads = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { status } = req.query;

    // Verify customer belongs to user
    const customer = await Customer.findOne({
      _id: customerId,
      owner: req.user.id
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Build query
    let query = { customer: customerId, owner: req.user.id };
    if (status) {
      query.status = status;
    }

    const leads = await Lead.find(query)
      .populate('customer', 'name email company')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leads'
    });
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
const getLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      owner: req.user.id
    }).populate('customer', 'name email company');

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching lead'
    });
  }
};

// @desc    Create new lead
// @route   POST /api/customers/:customerId/leads
// @access  Private
const createLead = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Verify customer belongs to user
    const customer = await Customer.findOne({
      _id: customerId,
      owner: req.user.id
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Add customer and owner to request body
    req.body.customer = customerId;
    req.body.owner = req.user.id;

    const lead = await Lead.create(req.body);

    // Populate customer data
    await lead.populate('customer', 'name email company');

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead
    });
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating lead'
    });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
const updateLead = async (req, res) => {
  try {
    let lead = await Lead.findOne({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('customer', 'name email company');

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: lead
    });
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating lead'
    });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting lead'
    });
  }
};

// @desc    Get leads statistics
// @route   GET /api/leads/stats
// @access  Private
const getLeadStats = async (req, res) => {
  try {
    const stats = await Lead.aggregate([
      { $match: { owner: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalValue: { $sum: '$value' }
        }
      }
    ]);

    const totalLeads = await Lead.countDocuments({ owner: req.user._id });
    const totalValue = await Lead.aggregate([
      { $match: { owner: req.user._id } },
      { $group: { _id: null, total: { $sum: '$value' } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        totalValue: totalValue[0]?.total || 0,
        statusBreakdown: stats
      }
    });
  } catch (error) {
    console.error('Get lead stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching lead statistics'
    });
  }
};

module.exports = {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  getLeadStats
};
