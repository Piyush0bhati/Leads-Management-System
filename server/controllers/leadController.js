const Lead = require("../models/Lead");
const XLSX = require("xlsx");

// Create Lead
const createLead = async (req, res) => {
  try {
    const { name, email, phone, company, status, notes, followUpDate } = req.body;

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      status,
      notes,
      followUpDate,
      owner: req.user.id,
    });

    res.status(201).json({
      message: "Lead Created Successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


          


// Get All Leads with Search, Filter, Pagination & Sorting
const getLeads = async (req, res) => {
  try {
    const {
      search,
      status,
      page = 1,
      limit = 5,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    // Query object
    const query = {
      owner: req.user.id,
    };

    // Search by name, email or company
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    const leads = await Lead.find(query)
      .sort({
        [sort]: order === "asc" ? 1 : -1,
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      leads,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Lead
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json(lead);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Lead Updated Successfully",
      lead,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteLead = async (req, res) => {
  try {

    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message: "Lead Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Dashboard Statistics
const getLeadStats = async (req, res) => {
  try {
    const owner = req.user.id;

    const totalLeads = await Lead.countDocuments({ owner });

    const newLeads = await Lead.countDocuments({
      owner,
      status: "New",
    });

    const contactedLeads = await Lead.countDocuments({
      owner,
      status: "Contacted",
    });

    const qualifiedLeads = await Lead.countDocuments({
      owner,
      status: "Qualified",
    });

    const lostLeads = await Lead.countDocuments({
      owner,
      status: "Lost",
    });

    const convertedLeads = await Lead.countDocuments({
      owner,
      status: "Converted",
    });

    res.status(200).json({
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      lostLeads,
      convertedLeads,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getRecentLeads = async (req, res) => {
  try {
    const owner = req.user.id;

    const leads = await Lead.find({ owner })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUpcomingFollowUps = async (req, res) => {
  try {
    const owner = req.user.id;

    const today = new Date();

    const leads = await Lead.find({
      owner,
      followUpDate: { $gte: today },
    })
      .sort({ followUpDate: 1 })
      .limit(5);

    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const importLeads = async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, {
      type: "buffer",
    });

    const sheetName = workbook.SheetNames[0];

    const data = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    const owner = req.user.id;

    const leads = data.map((lead) => ({
      name: lead.Name,
      email: lead.Email,
      phone: lead.Phone,
      company: lead.Company,
      status: lead.Status || "New",
      owner,
    }));

    await Lead.insertMany(leads);

    res.json({
      message: `${leads.length} Leads Imported Successfully`,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadStats,
  getRecentLeads,
  getUpcomingFollowUps,
  importLeads
};