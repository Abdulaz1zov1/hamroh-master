const express = require("express");
const router = express.Router();
// const { protect, authorize } = require('../middleware/auth');

const {
  register,
  login,
  getMe,
  deleteAuth,
  editAuth,
  getAdminAll,
  getUserAll,
  getLockedUserAll,
  logout,
} = require("../controllers/userController");

router.post("/create", register); 
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", getMe);
router.put("/update/:id", editAuth);
router.delete("/:id", deleteAuth);

router.get("/user/all", getUserAll);
router.get("/admin/all", getAdminAll);

router.get("/lock/user", getLockedUserAll);

module.exports = router;
