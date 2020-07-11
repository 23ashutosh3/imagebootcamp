
const express = require("express");

const router = express.Router();
const userController = require("../../../controllers/api/v1/user.js");

router.post("/userRegister", userController.userRegister);

router.get("/:id/download", userController.download);

router.post("/Editedupload", userController.Editedupload);

router.get("/:id/getmarks", userController.marksById);

router.get("/getmarks", userController.getmarks);

module.exports = router;
