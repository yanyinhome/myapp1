var express = require('express');
var router = express.Router();
var DBconfig=require("../db/DBconfig");
var tourial_historysql=require("../db/tourial_historysql");
var responseClient=require("../util/util");
var frozenSql = require('../db/frozenSql');
var web=require("../web3");
var web3=web.web3;
// 引入数据库
var mysql=require("mysql");
// 创建数据库客户端
const client=mysql.createConnection(DBconfig.mysql);
client.connect((err,result)=>{
  if(err){
    console.log(err);
  }else{
    console.log("eth连接数据库结果",result)
  }
});
// 返回ETH的账户信息
router.get('/ethaccount', function(req, res, next) {
    let data=req.session.user;
    if(data){
        let eth_address=data.address;
        web3.eth.getBalance(eth_address,function(err,result){
            if(err){responseClient(res,200,1,"地址错误")}
                else{
                    req.session.user.eth_number=web3.fromWei(result, 'ether')
                    let data=req.session.user;
                    responseClient(res,200,1,"ok",data);  
                }
        })       
    }else{
        responseClient(res,200,1,"ok")
    }
    
});
// 返回节点信息
router.get ('/peers',function(req,res,next){
    client.query(frozenSql.frozenAccount_number,function(err,result){
        if(err){console.log(err)}
            else{
            const data={};
            data.currentproviter="192.168";
            // data.currentproviter=web3.currentProvider.host;
            data.lasteblock=web3.eth.blockNumber;
            data.peers=web3.net.peerCount;
            data.Gas=web3.eth.gasPrice.toString(10  );
            data.accountnumber=web3.eth.accounts.length;
            data.frozenaccountnumbe=result.length;
            responseClient(res,200,1,"ok",data)               
            }
    })
    
})
// 返回以太币历史记录信息
router.get("/history",function(req,res,next){
    let data=req.session.user;
    if(data){
        client.query(tourial_historysql.search_ethall,[data.address],function(err,result){
            if(err){
                console.log(err)
            }else{
                responseClient(res,200,1,"查询成功",result)
            }
        })
    }
})
// 处理发送以太币交易
router.post("/ethsend",function(req,res,next){
    let data=req.session.user;
    let password=data.password;
    console.log(password)
    if(data){
        let eth_address=data.address;
        let eth_to=req.body.tourial_address;
        let number=parseInt(req.body.tourial_number,10);
        web3.eth.getBalance(eth_address,function(err,result){
            if(err){console.log(err)}
                else{
                    // 判断账户金额是否大于转出值
                    if(parseInt(result.c[0],10)>number){
                        web3.personal.unlockAccount(eth_address,password,15000,(err,result)=>{
                        if(err){
                          console.log(err);
                        }else{
                          web3.eth.sendTransaction({from:eth_address,to:eth_to,value:web3.toWei(number,'ether')},
                          (err,result)=>{
                            if(err){console.log(err);}
                               else{
                                let time=new Date().toString()
                                let data={
                                    hash:result,
                                    eth_address:eth_address,
                                    to_address:eth_to,
                                    number:number,
                                    time:time,
                                    type:0
                                }
                                console.log(data);
                                client.query(tourial_historysql.insert_tourial,[data.eth_address,data.number,data.to_address,data.hash,data.time,data.type],function(err,result){
                                    if(err){console.log(err)}else{
                                        console.log(result);
                                    }
                                })
                                responseClient(res,200,1,"转账成功",data);
                            }
                          })
                        }
                        })
                    }else{
                        responseClient(res,200,1,"账户余额不足")
                    }
                }
        })
    }
})

module.exports = router;