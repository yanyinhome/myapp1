var express = require('express');
var router = express.Router();
var responseClient=require("../util/util");
var web= require("../web3");
router.get("/test",function(req,res,next){
    let number=web.hjb_contract.totalSupply.call();
    let blocknumber=web.web3.eth.blockNumber;
    // console.log(web.hjb_contract)
    const data={
        number:number,
        blocknumber:blocknumber,
    }
    // console.log(web.web3.eth)
    responseClient(res,200,10,"ok",data)
  })
router.post("/test",function(req,res,next){
    let number=web.hjb_contract.totalSupply.call();
    let blocknumber=web.web3.eth.blockNumber;
    // console.log(web.hjb_contract)
    const data={
        number:number,
        blocknumber:blocknumber,
    }
    // console.log(web.web3.eth)
    responseClient(res,200,10,"ok",data)
  })
  module.exports = router;