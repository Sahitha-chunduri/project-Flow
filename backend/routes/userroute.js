const express = require("express");
const jwt = require("jsonwebtoken");
const {registerUser, loginUser, getAllUsers} = require("../controllers/usercontroller"); // FIXED: Added missing imports
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser); // FIXED: Added missing login route

router.post("/refresh", (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", { path: "/user/refresh" });
  res.sendStatus(204);
});

router.get("/all", getAllUsers);

module.exports = router;