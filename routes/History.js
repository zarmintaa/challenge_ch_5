const express = require("express");
const router = express.Router();
const HistoryController = require("../controllers/HistoryController");

router.get("/:id", HistoryController.deleteHistory);

router.post("/add", HistoryController.addHistory);

module.exports = router;
