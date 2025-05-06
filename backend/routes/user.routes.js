const express= require('express');

const router= express.Router();
const {body}= require("express-validator");
const userController= require('../controllers/user.controller');
const authMiddleware= require('../middlewares/auth.middleware');



router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('Firstname must contain atleast 3 letters'),

    body('password').isLength({min: 6}).withMessage('Password must contain 6 character')
],
   userController.registerUser
  )

  router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('password must be at least 6 character')

  ],
    userController.loginUser
)


router.get('/profile',authMiddleware.authUser, userController.getUserProfile)
router.get('/logout', authMiddleware.authUser, userController.logoutUser)
// router.get('/profile', authMiddleware.authUser, (req, res) => {
//   try {
//       const user = req.user; // Assuming `authMiddleware.authUser` adds user info to `req.user`
//       res.json({ success: true, user });
//   } catch (error) {
//       res.status(500).json({ success: false, message: "Server error" });
//   }
// },userController.getUserProfile);



// router.get('/logout', authMiddleware.authUser, (req, res) => {
//   try {
//       res.clearCookie('token'); // Clear authentication token (if using cookies)
//       res.json({ success: true, message: "Logged out successfully" });
//   } catch (error) {
//       res.status(500).json({ success: false, message: "Server error" });
//   }
// },  userController.logoutUser);




module.exports= router;