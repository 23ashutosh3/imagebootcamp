const express = require("express");

const router = express.Router();
const insController = require("../../../controllers/api/v1/instructor.js");
const passport = require('passport');

router.post("/register", insController.register);


router.post("/login", insController.login);

router.post("/upload", passport.authenticate("jwt", { session: false }),  insController.upload);

router.post("/:id/marks", passport.authenticate("jwt", { session: false }), insController.marks);
 

router.get("/", passport.authenticate("jwt", { session: false }), insController.getAll);

router.get("/all", passport.authenticate("jwt", { session: false }), insController.getAllEdited);

module.exports = router;
