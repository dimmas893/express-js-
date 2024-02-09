const errorHelper = require("../helpers/error");
const axios = require("axios");

const createNewUser = async (body) => {
  const dataToSend = {
    email: body.email,
    nama: body.nama,
  };

  try {
    const response = await axios.post(
      "https://anandadimmas.com/belajarNode/users",
      dataToSend
    );
    console.log("Respon dari server:", response.data);
    return response.data; // Mengembalikan data respons dari server
  } catch (error) {
    console.error("Kesalahan:", error);
    throw new Error(error); // Melempar error agar bisa ditangani di luar fungsi
  }
};
const searchModel = async (body) => {
    // console.log(body);
    try {
        const response = await axios.get(
            `https://anandadimmas.com/belajarNode/users?searchTerm=${body.searchTerm}&page=${body.page}&pageSize=${body.pageSize}`
        );
        //   console.log("Respon dari server:", response.data);
        return response.data; // Mengembalikan data respons dari server
    } catch (error) {
        console.error("Kesalahan:", error);
        throw new Error(error); // Melempar error agar bisa ditangani di luar fungsi
    }
};

module.exports = {
  createNewUser,
  searchModel,
};
