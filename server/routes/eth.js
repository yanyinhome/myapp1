var express = require('express');
var router = express.Router();
var Web3=require("web3");
var web3;
//创建web3对象
if (typeof web3 !== 'undefined') {
   web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
   web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.124.2:8486"));
};
/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(web3.eth)
    res.send('ethadmin');
});

module.exports = router;