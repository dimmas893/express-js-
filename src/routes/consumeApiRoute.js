const express = require("express");
const router = express.Router();
const consumeApiController = require("../controller/consumeApiController");

router.get("/search", consumeApiController.searchController);
router.post("/create", consumeApiController.createController);



// Ekspor router agar dapat digunakan di file lain
module.exports = router;
