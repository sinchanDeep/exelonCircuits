const express = require("express");
const router = express.Router();
const {addNewProduct,getProducts,deleteAproduct,updateAproduct} = require("../controller/controller");

router.route("/addNewProduct").post(addNewProduct);
router.route("/getProducts").get(getProducts);
router.route("/deleteAproduct").get(deleteAproduct);
router.route("/updateAproduct").post(updateAproduct);

module.exports = router;