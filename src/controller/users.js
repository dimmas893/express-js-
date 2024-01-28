const userModel = require("../model/users");
const paginateHelper = require("../helpers/paginate");
const errorHelper = require("../helpers/error");
const getUsers = async (req, res) => {
  try {
    const { searchTerm, page, pageSize, startIndex, endIndex } =
      paginateHelper.getPaginationDetails(req);

    const [data] = await userModel.getAllUsers(searchTerm);
    const paginatedData = paginateHelper.paginateResults(
      data,
      startIndex,
      endIndex
    );
    res.json({
      message: "get all users",
      data: paginatedData,
      totalPages: Math.ceil(data.length / pageSize),
      currentPage: page,
    });
  } catch (error) {
    errorHelper.handleServerError(res, error);
  }
};

const createNewUsers = async (req, res) => {
  const { body } = req;
  try {
    await userModel.createNewUser(body);
    res.json({
      message: "create new users success",
      data: body,
    });
  } catch (error) {
    errorHelper.handleServerError(res, error);
  }
};

const updateUsers = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    // Panggil fungsi update pada model
    const updateResult = await userModel.updateUserById(id, body);
    res.json({
      message: "update user success",
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    errorHelper.handleServerError(res, error);
  }
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;
  try {
    // Panggil fungsi delete pada model
    const deleteResult = await userModel.deleteUserById(id);
    if (deleteResult[0].affectedRows > 0) {
      res.json({
        message: "delete user success",
        data: {
          id: id,
          nama: "delete nama",
          email: "delete email",
        },
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    errorHelper.handleServerError(res, error);
  }
};

const getAllUsersAndGeneratePDF = async (req, res) => {
  const pdf = await userModel.generatePDF(req);
  try {
    res.json({
      message: "generate pdf berhasil",
      data: {
        link: pdf,
      },
    });
  } catch (error) {
    errorHelper.handleServerError(res, error);
  }
};

module.exports = {
  getUsers,
  createNewUsers,
  updateUsers,
  deleteUsers,
  getAllUsersAndGeneratePDF,
};
