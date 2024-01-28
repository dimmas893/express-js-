const pull = require("../config/database");
const errorHelper = require("../helpers/error");
const pdfGenerator = require("../helpers/pdfGenerator");
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

const createNewUser = (body) => {
  //cara ini rentan sql injegtion
  //   const sqlQuery = `INSERT INTO users (nama, email) VALUES ('${body.nama}' , '${body.email}')`;
  //   return pull.execute(sqlQuery);

  //ini cara yang lebih efektif dan aman
  const sqlQuery = "INSERT INTO users (nama, email) VALUES (?, ?)";
  const values = [body.nama, body.email];

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
};
