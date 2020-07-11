//routes for homepage,any user can visit home page.no authentication is required for home page.

const express = require("express");

const router = express.Router();

// router.get("/", homeController.allProduct);
// router.delete("/:id/delete", homeController.deleteProduct);

//redirect to user
router.use("/user", require("./user"));

// //redirect to cart
 router.use("/instructor", require("./instructor"));

module.exports = router;
