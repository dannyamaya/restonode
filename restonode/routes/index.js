var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController');

router.all('/order', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


router.post('/order', apiController.generate_order);
router.get('/order', apiController.get_order);


module.exports = router;
