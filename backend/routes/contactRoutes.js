const express = require("express");
const router = express.Router();
const {
    addContact,
    getContacts,
    getContact
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// Apply authentication middleware to all routes
router.use(validateToken);

// Routes
router.route("/").get(getContacts).post(addContact);

router.route("/:id").get(getContact);

module.exports = router;