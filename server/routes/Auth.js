const { sendOtp, signUpUser, login, logout } = require("../controller/User");
const isAuth = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post('/send-otp', sendOtp);
router.post('/signup', signUpUser);
router.post('/login', login);
router.get('/logout', isAuth, logout);


module.exports = router;