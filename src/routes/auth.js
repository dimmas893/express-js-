const express = require("express");
const router = express.Router();
const UserController = require("../controller/users");

router.post("/login", UserController.login);

// Terapkan middleware authenticateToken ke rute-rute yang memerlukan autentikasi
router.use(UserController.authController);

// Ekspor router agar dapat digunakan di file lain
module.exports = router;
