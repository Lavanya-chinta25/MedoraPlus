const router = require("express").Router();
const {signup,login, getUserDetails,sendmsg,getmessages} = require('../Controllers/AuthController.js');
const {signupValidation,loginValidation,verifyToken} = require('../Middlewares/AuthValidation.js');

router.post("/signup",signupValidation,signup
);
router.post("/login",loginValidation,login
);

router.get("/profile",verifyToken, getUserDetails);
// router.get("/messages",getmessages);
router.post("/sendmsg",sendmsg);

module.exports = router;