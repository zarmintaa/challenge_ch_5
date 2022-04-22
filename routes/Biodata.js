const express = require("express");
const router = express.Router();
const BiodataController = require("../controllers/BiodataController");

router.get("/:id", BiodataController.getFormBiodata);

router.post("/add", BiodataController.addBiodata);

router.get("/edit/:id", BiodataController.getEditBiodata);

router.post("/edit/:id", BiodataController.editBiodata);

module.exports = router;
