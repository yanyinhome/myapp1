var express = require('express');
var router = express.Router();
var fs = require('fs');
var responseClient=require('../util/util');
router.post('/imgupload',function(req,res,next){
    console.log(req.body)
    responseClient(res,200,1,"ok")
})
module.exports = router;