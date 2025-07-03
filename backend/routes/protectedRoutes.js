const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);

router.get("/dashboard", (req, res) => {
    res.json({
        message: "Welcome to dashboard!",
        user: req.user
    });
});

router.get("/profile", (req, res) => {
    res.json({
        message: "User profile data",
        userId: req.user.id,
        email: req.user.email
    });
});



module.exports = router;