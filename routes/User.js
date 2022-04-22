const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/detail/:id", UserController.getSingleUser);

// router.delete("/:id", UserController.deleteUser);

router.get("/add", UserController.addUserPage);
router.post("/add", UserController.addUser);
router.get("/delete/:id", UserController.deleteUser);
router.get("/edit/:id", UserController.editUserPage);
router.post("/edit/:id", UserController.editUser);

module.exports = router;
