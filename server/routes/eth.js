var express = require('express');
var router = express.Router();
var Web3=require("web3");
// var DBconfig=require("../db/DBconfig");
// var MessageSQL=require("../db/messagesql");
var responseClient=require("../util/util");
var web3;
//创建web3对象
if (typeof web3 !== 'undefined') {
   web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
   web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.124.2:8486"));
};
// 返回ETH的账户信息
router.get('/ethaccount', function(req, res, next) {
    let data=req.session.user;
    if(data){
        let eth_address=data.address;
        web3.eth.getBalance(eth_address,function(err,result){
            if(err){responseClient(res,200,1,"地址错误")}
                else{
                    req.session.user.eth_number=result;
                    let data=req.session.user;
                    responseClient(res,200,1,"ok",data);  
                }
        })       
    }else{
        responseClient(res,200,1,"ok")
    }
    
});

module.exports = router;