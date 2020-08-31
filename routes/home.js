var express = require("express");
var router = express.Router();

router.use(function(req,res,next){
    console.log("Greetings!");
    next();
})

router.get('/',function(req,res,next){
    res.send("Got a GET request at /home.")
});

router.put('/',function(req,res,next){
    res.send("Got a PUT request at /home.")
});

module.exports = router;