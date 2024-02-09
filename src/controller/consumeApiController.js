const consumeApiModel = require("../model/consumeApiModel");

const createController = async (req, res) => {
  const { body } = req;
  try {
    // Panggil model untuk membuat permintaan API
    const data = await consumeApiModel.createNewUser(body);

    // Mengirimkan respons kembali ke klien dengan data yang diterima dari model
    res.status(200).json({ message: "Data berhasil dibuat", data });
  } catch (error) {
    // Mengirimkan respons kembali ke klien dengan pesan kesalahan
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat membuat permintaan" });
  }
};

const searchController = async (req, res) => {
  const { body } = req;
  console.log(body)
  try {

    // Panggil model untuk membuat permintaan API
    const data = await consumeApiModel.searchModel(body);
    // Mengirimkan respons kembali ke klien dengan data yang diterima dari model
    res.status(200).json({ message: "Data berhasil dibuat", data });
  } catch (error) {
    // Mengirimkan respons kembali ke klien dengan pesan kesalahan
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat membuat permintaan" });
  }
};


module.exports = {
  createController,
  searchController,
};
