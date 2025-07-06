const express = require("express");
const router = express.Router();
const {
    addContact,
    getContacts,
    getContact
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(addContact);
router.route("/:id").get(getContact);

module.exports = router;