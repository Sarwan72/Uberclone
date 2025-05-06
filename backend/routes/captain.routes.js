const express  =require('express');
const router= express.Router();
const captainController= require('../controllers/captain.controller')
const authMiddleware= require('../middlewares/auth.middleware')

const {body}= require("express-validator");


router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 character'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 character'),
        body('vehicle.plate').isLength().withMessage('plate must be at least 3 character'),
        body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be a positive integer'),
        body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type is required'),
    ],
    captainController.registerCaptain
    
);
 router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('password')

  ],
    captainController.loginCaptain
)


router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)


module.exports= router;