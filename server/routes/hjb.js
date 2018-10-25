var express = require('express');
var router = express.Router();
var Web3=require("web3");
var DBconfig=require("../db/DBconfig");
var responseClient=require("../util/util");
var hj_contractSQL=require('../db/hj_contractSql');
var web3;
//创建web3对象
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
 // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.124.2:8486"));
};
// 引入数据库
var mysql=require("mysql");
// 创建数据库客户端
const client=mysql.createConnection(DBconfig.mysql);
client.connect((err,result)=>{
  if(err){
    console.log(err);
  }else{
    console.log("hjb连接数据库结果：",result)
  }
});
/* GET users listing. */
// 返回Hjb账户信息
router.get('/hjbaccount', function(req, res, next) {
    if(req.session.user.hjb_number){
      let data=req.session.user;
      responseClient(res,200,1,"ok",data);
    }else{
      if(req.session.user){
        client.query(hj_contractSQL.findapi,[1],function(err,result){
          if(err){console.log(err)}
            else{
              if(result.length===0){
                responseClient(res,200,2,"无结果")
              }else{
                let hjbabi=JSON.parse(result[0].contract_abi).abi;
                let contract_address=result[0].contract_address;
                let user_address=req.session.user.address;
                const hjb_contract=web3.eth.contract(hjbabi).at(contract_address);
                let hjb_number=hjb_contract.balanceOf.call(user_address).toString();
                req.session.user.hjb_number=hjb_number;
                let data=req.session.user;
                responseClient(res,200,1,"ok",data);
              }
            }
        })
      }else{
        responseClient(res,200,1,"无结果")
      }
    }
});

module.exports = router;
