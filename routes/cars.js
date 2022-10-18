
const express= require("express");
const {carCtrl} = require("../controllers/carControll")
const { auth } = require("../middlewares/auth");
// const {CarModel,validateCar} = require("../models/carModel")
const router = express.Router();

//get all the cars 
router.get("/", carCtrl.getAll)
// smart search url/search?s=""
router.get("/search", carCtrl.search)
// search by category
router.get("/category/:catname", carCtrl.searchC)
// url/price?min=160000&max=1000000
router.get("/price", carCtrl.price)
// post car with token
router.post("/", auth, carCtrl.post)
// edit car with token
router.put("/:editId ", auth, carCtrl.edit)

// delete car with token
router.delete("/:delId", auth, carCtrl.delete)


module.exports = router;