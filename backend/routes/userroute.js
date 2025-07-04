const express = require("express");
const jwt = require("jsonwebtoken");
const {registerUser, loginUser, getAllUsers, getCurrentUser, updateUsername, updateEmail, changePassword} = require("../controllers/usercontroller"); 
const router = express.Router();
const verifyToken = require("../middleware/validateTokenHandler");

router.post("/register", registerUser);
router.post("/login", loginUser); 

router.get("/current", verifyToken, getCurrentUser);
router.put("/update-username", verifyToken, updateUsername);
router.put("/update-email", verifyToken, updateEmail);
router.put("/change-password", verifyToken, changePassword);

router.post("/refresh", (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  });
});


router.post("/logout", (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/user/refresh"
    });
    
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
});

router.get("/all", getAllUsers);

module.exports = router;