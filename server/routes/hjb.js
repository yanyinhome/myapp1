var express = require('express');
var router = express.Router();
var Web3=require("web3");
var DBconfig=require("../db/DBconfig");
var responseClient=require("../util/util");
var hj_contractSQL=require('../db/hj_contractSql');
var tourial_historysql=require("../db/tourial_historysql");
var buy_sell_history=require("../db/buy_sellSql");
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
                let hjb_number=hjb_contract.balanceOf.call(user_address);
                req.session.user.hjb_number=hjb_number.toString(10);
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
// 处理汇金币转账交易信息
router.post("/hjbsend",function(req,res,next){
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
                let to_address=req.body.to_address;
                let value=parseInt(req.body.value,10);
                const hjb_contract=web3.eth.contract(hjbabi).at(contract_address);
                // bignumber尚未解决
                // console.log(hjb_contract.balanceOf.call(user_address));
                let hjb_number=parseInt(hjb_contract.balanceOf.call(user_address).c[0],10)
                req.session.user.hjb_number=hjb_number;
                if(hjb_number>value){
                  web3.personal.unlockAccount(user_address,req.session.user.password,1500,(err,result)=>{
                    if(err){console.log(err)
                      responseClient(res,200,1,"密码错误")}
                      else{
                        hjb_contract.transfer.sendTransaction(to_address,value,{from:user_address},function(err,result){
                          if(err){console.log(err)
                            responseClient(res,200,1,"转账失败")}
                            else{
                              let time=new Date().toString()
                              const data={
                                hash:result,
                                eth_address:user_address,
                                to_address:to_address,
                                number:value,
                                time:time,
                                type:1
                              }
                              client.query(tourial_historysql.insert_tourial,[data.eth_address,data.number,data.to_address,data.hash,data.time,data.type],function(err,result){
                                if(err){console.log(err)}else{
                                    console.log(result);
                                }
                            })
                              responseClient(res,200,1,"转账成功",data)
                            }
                        })
                      }
                  })

                }
            }
          }
      })
    }
  
})
// 汇金币买入交易处理
router.post("/hjbbuy",function(req,res,next){
  if(req.session.user){
    client.query(hj_contractSQL.findapi,[1],function(err,result){
      if(err){console.log(err)}
        else{
          if(result.length===0){
            responseClient(res,200,2,"无结果")
          }else{
            // 获取abi
              let hjbabi=JSON.parse(result[0].contract_abi).abi;
              // 获取合约地址
              let contract_address=result[0].contract_address;
              // 获取用户地址
              let user_address=req.session.user.address;
              let value=parseInt(req.body.value,10);
              // 在合约地址上实例化合约
              const hjb_contract=web3.eth.contract(hjbabi).at(contract_address);
              // bignumber尚未解决
              // console.log(hjb_contract.balanceOf.call(user_address));
              // 把获得的账户汇金币数量bignumber类型转换一下
              let hjb_number=parseInt(hjb_contract.balanceOf.call(user_address).c[0],10)
              req.session.user.hjb_number=hjb_number;
              if(hjb_number>value){
                // 解锁账户
                web3.personal.unlockAccount(user_address,req.session.user.password,1500,(err,result)=>{
                  if(err){console.log(err)
                    responseClient(res,200,1,"密码错误")}
                    else{
                      hjb_contract.buy({from:user_address,value:value},function(err,result){
                        if(err){console.log(err)
                          responseClient(res,200,1,"买入失败")}
                          else{
                            let time=new Date().toString()
                            const data={
                              hash:result,
                              number:value,
                              time:time,
                              type:1
                            }
                            // 插入数据库
                            console.log(buy_sell_history.insert_history)
                            client.query(buy_sell_history.insert_history,[data.number,data.hash,data.time,data.type],function(err,result){
                              if(err){console.log(err)}else{
                                  console.log(result);
                              }
                          })
                          // 返回结果给客户端
                            responseClient(res,200,1,"买入成功",data)
                          }
                      })
                    }
                })

              }
          }
        }
    })
  }
})
// 汇金币卖出交易处理
router.post("/hjbsell",function(req,res,next){
  console.log("req",req.body)
  if(req.session.user){
    client.query(hj_contractSQL.findapi,[1],function(err,result){
      if(err){console.log(err)}
        else{
          if(result.length===0){
            responseClient(res,200,2,"无结果")
          }else{
            // 获取abi
              let hjbabi=JSON.parse(result[0].contract_abi).abi;
              // 获取合约地址
              let contract_address=result[0].contract_address;
              // 获取用户地址
              let user_address=req.session.user.address;
              let value=parseInt(req.body.value,10);
              // 在合约地址上实例化合约
              const hjb_contract=web3.eth.contract(hjbabi).at(contract_address);
              // bignumber尚未解决
              // console.log(hjb_contract.balanceOf.call(user_address));
              // 把获得的账户汇金币数量bignumber类型转换一下
              let hjb_number=parseInt(hjb_contract.balanceOf.call(user_address).c[0],10)
              req.session.user.hjb_number=hjb_number;
              if(hjb_number>value){
                // 解锁账户
                web3.personal.unlockAccount(user_address,req.session.user.password,1500,(err,result)=>{
                  if(err){console.log(err)
                    responseClient(res,200,1,"密码错误")}
                    else{
                      console.log(1)
                      hjb_contract.sell.sendTransaction(value,{from:user_address},function(err,result){
                        if(err){console.log(err)
                          responseClient(res,200,1,"购买失败")}
                          else{
                            let time=new Date().toString()
                            const data={
                              hash:result,
                              number:value,
                              time:time,
                              type:0
                            }
                            // 插入数据库
                            client.query(buy_sell_history.insert_history,[data.number,data.hash,data.time,data.type],function(err,result){
                              if(err){console.log(err)}else{
                                  console.log(result);
                              }
                          })
                          // 返回结果给客户端
                            responseClient(res,200,1,"卖出成功",data)
                          }
                      })
                    }
                })

              }
          }
        }
    })
  }
})
module.exports = router;
