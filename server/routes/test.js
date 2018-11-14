var express = require('express');
var router = express.Router();
var responseClient=require("../util/util");
var web= require("../web3");
var web3=web.web3;
router.get("/web3",function(req,res){
    console.log(web3)
    responseClient(res,200,1,"ok",{web:"web.web3"})
})
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
  router.get("/transfer_event",function(req,res,next){
      let Transfer = web.hjb_contract.Transfer({}, {fromBlock: 0, toBlock: 'latest'});
      Transfer.get(function(err,result){
          if(err){console.log(err)}
            else{
                console.log(web.hjb_contract)
                responseClient(res,200,1,"ok",result)
            }
      })
    //   Transfer.stopWatching()
    // responseClient(res,200,1,"ok")
  })
  router.get("/frozen_event",function(req,res,next){
      let FrozenFunds = web.hjb_contract.FrozenFunds({some:"args"}, {fromBlock: 0, toBlock: 'latest'});
      FrozenFunds.get(function(err,result){       
          if(err){console.log(err)}
            else{
               console.log(FrozenFunds);
               responseClient(res,200,1,"ok",result)
            }
            
      })
  })
  router.get("/log_event",function(req,res,next){
    // responseClient(res,200,1,"ok")
      let consolelog = web.hjb_contract.consolelog({}, {fromBlock: 0, toBlock: 'latest'});
      consolelog.get(function(err,result){
          if(err){console.log(err)}
            else{
                console.log(result)
                responseClient(res,200,1,"ok",result)
            }
      })
  })
  router.get("/transfer",function(req,res,next){
    console.log(req.baseUrl)
    responseClient(res,200,2,"ok",)
  //   Transfer.stopWatching()
  // responseClient(res,200,1,"ok")
})
  module.exports = router;