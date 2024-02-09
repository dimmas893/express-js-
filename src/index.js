// Import modul Express.js
const express = require("express");

// Membuat aplikasi Express
const app = express();

const bodyParser = require("body-parser");
// Memuat variabel lingkungan dari file .env
require("dotenv").config();
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USERNAME);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_NAME);
// Mengimpor rute pengguna
const usersRoute = require("./routes/users");
const authRouter = require("./routes/auth");
const consumeApiRouter = require("./routes/consumeApiRoute");

// Tentukan port server, menggunakan variabel lingkungan PORT jika ada, atau default ke 4000
const PORT = process.env.PORT || 4000;

// Mengimpor middleware logs
const logMiddleware = require("./middleware/logs");

// Menyajikan file statis dari direktori "public"
app.use(express.static("public"));

// Menggunakan middleware logs untuk semua rute
app.use(logMiddleware);

// Mendapatkan data JSON dari permintaan yang masuk
app.use(express.json());
app.use(bodyParser.json());
// Menggunakan awalan "/users" untuk rute terkait pengguna
app.use("/auth", authRouter);
app.use("/users", usersRoute);
app.use("/consumeApi", consumeApiRouter);

// Memulai server dan mendengarkan pada port yang ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
