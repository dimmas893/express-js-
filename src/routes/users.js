const express = require("express");
const router = express.Router();
const UserController = require("../controller/users");

// Rute untuk membuat pengguna baru - Metode POST
router.post("/", UserController.createNewUsers);

// Rute untuk mendapatkan semua pengguna - Metode GET
router.get("/", UserController.getUsers);

// Rute untuk mendapatkan file PDF dari semua pengguna - Metode GET
router.get("/pdf", UserController.getAllUsersAndGeneratePDF);

// Rute untuk memperbarui pengguna berdasarkan ID - Metode PATCH
router.patch("/:id", UserController.updateUsers);

// Rute untuk menghapus pengguna berdasarkan ID - Metode DELETE
router.delete("/:id", UserController.deleteUsers);

// Ekspor router agar dapat digunakan di file lain
module.exports = router;
