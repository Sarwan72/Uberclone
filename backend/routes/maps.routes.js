 const express = require('express');
 const router= express.Router();
 const authMiddleware= require('../middlewares/auth.middleware')
 const mapController= require('../controllers/map.controller');
 const {query}= require('express-validator');
 const { getCoordinates } = require('../controllers/map.controller')

 router.get('/get-coordinate', 
    query('address').isString().isLength({min: 3}),
    authMiddleware.authUser, getCoordinates);


    router.get('/get-distance-time',
        query('origin').isString().isLength({min: 3}),
        query('destination').isString().isLength({min: 3}),
        authMiddleware.authUser,
        mapController.getDistanceTime
    );

    router.get('/get-suggestions'),
     query('input').isString().isLength({min: 3}),
     authMiddleware.authUser,
     mapController.getAutoCompleteSuggestions

 module.exports= router;