const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;