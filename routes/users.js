const express= require("express");
//  atuhAdmin bright(משלים)!!!!!!!!!!!!!!
const {auth,authAdmin} = require("../middlewares/auth")
const { userCtrl } = require("../controllers/userControll");
const router = express.Router();
// get all users
router.get("/" , userCtrl.allUsers);
// show user info
router.get("myInfo",auth,userCtrl.accountInfo)
// register user
router.post("/",userCtrl.register )
// login user and send token
router.post("login",userCtrl.login)
//admin can change other user as admin
router.put("/editAdmin/:idEdit", auth, userCtrl.editAdmin)
router.put("/:idEdit",auth,userCtrl.edit)
// delete user and all his books 
router.delete("/:idDel", auth, userCtrl.delete)


module.exports = router;