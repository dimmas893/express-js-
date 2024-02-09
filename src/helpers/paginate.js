// helpers.js
const getPaginationDetails = (req) => {
  const searchTerm = req.query.searchTerm;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  return { searchTerm, page, pageSize, startIndex, endIndex };
};
const paginateResults = (data, startIndex, endIndex) => {
  return data.slice(startIndex, endIndex);
};

module.exports = {
  getPaginationDetails,
  paginateResults,
};
