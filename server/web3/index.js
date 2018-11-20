var DBconfig=require("../db/DBconfig");
var hj_contractSQL=require('../db/hj_contractSql');
var Web3=require("web3");
var web3;
//创建web3对象
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
   // set the provider you want from Web3.providers
    // web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.124.9:8486"));
    web3 = new Web3(new Web3.providers.HttpProvider("http://47.105.162.107:8486"));
  };
  module.exports.web3=web3;
  // 引入数据库
  var mysql=require("mysql");
  // 创建数据库客户端
  const client=mysql.createConnection(DBconfig.mysql);
  client.connect((err,result)=>{
    if(err){
      console.log(err);
    }else{
      console.log("web3连接数据库结果：",result)
    }
  });
  var hjb_contract;
  client.query(hj_contractSQL.findapi,[1],function(err,result){
    if(err){console.log(err)}
      else{
        if(result.length===0){
          console.log("查找合约无结果")
        }else{
          // 获取abi
            let hjbabi=JSON.parse(result[0].contract_abi).abi;
            // 获取合约地址
            let contract_address=result[0].contract_address;
            // 在合约地址上实例化合约
            hjb_contract=web3.eth.contract(hjbabi).at(contract_address);
            
            module.exports.hjb_contract=hjb_contract;
            
        }
      }
  })