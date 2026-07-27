const express = require("express");
const router = express.Router();

const { createLead, getLeads, getLeadById, updateLead, deleteLead, getLeadStats, getRecentLeads, getUpcomingFollowUps, importLeads } = require("../controllers/leadController");
const authMiddleware = require("../middleware/authMiddleware");
// const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");


router.get("/", authMiddleware, getLeads);

router.get("/stats", authMiddleware, getLeadStats);

router.get("/recent", authMiddleware,  getRecentLeads);

router.get("/followups", authMiddleware,  getUpcomingFollowUps);

router.post("/import",  authMiddleware, upload.single("file"), importLeads);

router.get("/:id", authMiddleware, getLeadById);

router.post("/", authMiddleware, createLead);

router.put("/:id", authMiddleware, updateLead);

router.delete("/:id", authMiddleware, deleteLead);


module.exports = router;