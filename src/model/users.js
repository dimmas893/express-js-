const pull = require("../config/database");
const errorHelper = require("../helpers/error");
const pdfGenerator = require("../helpers/pdfGenerator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../helpers/auth");

const getAllUsers = (searchTerm) => {
  try {
    let sqlQuery = "SELECT * FROM users";
    const values = [];

    if (searchTerm) {
      sqlQuery += " WHERE nama LIKE ? OR email LIKE ?";
      values.push(`%${searchTerm}%`, `%${searchTerm}%`);
    }

    return pull.execute(sqlQuery, values);
  } catch (error) {
    // console.error("Error in getAllUsers:", error);
    errorHelper.handleServerError(res, error);
  }
};

const authModel = (req, res, next) => {
  try {
    return auth.authenticateToken(req, res, next);
  } catch (error) {
    // console.error("Error in getAllUsers:", error);
    errorHelper.handleServerError(res, error);
  }
};

async function getUserByEmail(email) {
  try {
    // Menjalankan query untuk mendapatkan pengguna berdasarkan email
    const sqlQuery = "SELECT * FROM users WHERE email = ?";

    const values = [email];

    return pull.execute(sqlQuery, values);
  } catch (error) {
    console.error("Error querying database:", error);
    throw error; // Melemparkan error ke level yang lebih tinggi
  }
}
const login = async (body) => {
  const { email, password } = body;

  try {
    const [userData] = await getUserByEmail(email);

    if (!userData || !userData.length) {
      return { error: "Email tidak ditemukan" };
    }

    const user = userData[0]; // Assuming user data is an array and we're interested in the first entry

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { error: "Password salah" };
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "secretkey", {
      expiresIn: "1h",
    });

    return { token };
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

const createNewUser = async (body) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(body.password, 10); // Ganti '10' dengan tingkat salt yang diinginkan

  // Persiapkan query untuk menyimpan data pengguna baru
  const sqlQuery = "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)";
  const values = [body.nama, body.email, hashedPassword]; // Gunakan hashedPassword

  // Eksekusi query
  return pull.execute(sqlQuery, values);
};

const updateUserById = (id, updatedData) => {
  try {
    // Buat SQL query untuk update user berdasarkan ID
    const sqlQuery = "UPDATE users SET nama = ?, email = ? WHERE id = ?";
    const values = [updatedData.nama, updatedData.email, id];

    // Eksekusi query
    return pull.execute(sqlQuery, values);
  } catch (error) {
    console.error("Error in updateUserById:", error);
    throw error; // Rethrow the error to be handled by the calling code
  }
};

const deleteUserById = async (id) => {
  try {
    const sqlQuery = "DELETE FROM users WHERE id = ?";
    const values = [id];

    // Eksekusi query untuk menghapus user berdasarkan ID
    return pull.execute(sqlQuery, values);
  } catch (error) {
    console.error("Error in deleteUserById:", error);
    throw error;
  }
};

const generatePDF = async (req) => {
  try {
    const [userData] = await getAllUsers();
    const pdfRelativePath = pdfGenerator.generateUserPDF(userData);
    const link = `${req.protocol}://${req.get("host")}/${pdfRelativePath}`;
    return link;
  } catch (error) {
    console.error("Error in generatePDF:", error);
    throw error; // Rethrow the error to be handled by the calling code
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUserById,
  deleteUserById,
  generatePDF,
  login,
  authModel,
};
