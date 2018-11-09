var express = require('express');
var router = express.Router();
var DBconfig=require("../db/DBconfig");
var responseClient=require("../util/util");
var tourial_historysql=require("../db/tourial_historysql");
var buy_sell_history=require("../db/buy_sellSql");
var admin_setpriceSql=require("../db/admin_setpriceSql");
var frozenSQL = require('../db/frozenSql');
var admin_minttokenSQL =require('../db/admin_minttokenSql');
var admin_gasSQL =require('../db/admin_gasSQL');
// 引入实例化过后的web
var web=require("../web3")
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
        let user_address=req.session.user.address;
        let hjb_number=web.hjb_contract.balanceOf.call(user_address);
        req.session.user.hjb_number=hjb_number.toString(10);
        let data=req.session.user;
        responseClient(res,200,1,"ok",data);
      }else{
        responseClient(res,200,1,"无结果")
      }
    }
});
// 处理汇金币转账交易信息
router.post("/hjbsend",function(req,res,next){
    if(req.session.user){
        let user_address=req.session.user.address;
        let to_address=req.body.to_address;
        let value=parseInt(req.body.value,10);
        // bignumber尚未解决
        // console.log(hjb_contract.balanceOf.call(user_address));
        let hjb_number=parseInt(web.hjb_contract.balanceOf.call(user_address).c[0],10)
        req.session.user.hjb_number=hjb_number;
        if(hjb_number>value){
          web.web3.personal.unlockAccount(user_address,req.session.user.password,1500,(err,result)=>{
            if(err){console.log(err)
              responseClient(res,200,1,"密码错误")}
              else{
                web.hjb_contract.transfer.sendTransaction(to_address,value,{from:user_address},function(err,result){
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
          })}
    }
  
})
// 汇金币买入交易处理
router.post("/hjbbuy",function(req,res,next){
  if(req.session.user){
    // 获取用户地址
    let user_address=req.session.user.address;
    let value=parseInt(req.body.value,10);
    // bignumber尚未解决
    // console.log(hjb_contract.balanceOf.call(user_address));
    // 把获得的账户汇金币数量bignumber类型转换一下
    let hjb_number=parseInt(web.hjb_contract.balanceOf.call(user_address).c[0],10)
    req.session.user.hjb_number=hjb_number;
    if(hjb_number>value){
      // 解锁账户
      web.web3.personal.unlockAccount(user_address,req.session.user.password,1500,(err,result)=>{
        if(err){console.log(err)
          responseClient(res,200,1,"密码错误")}
          else{
            web.hjb_contract.buy({from:user_address,value:value},function(err,result){
              if(err){console.log(err)
                responseClient(res,200,1,"买入失败")}
                else{
                  let time=new Date().toString()
                  const data={
                    hash:result,
                    number:value,
                    time:time,
                    type:1,
                    address:user_address
                  }
                  // 插入数据库
                  console.log(buy_sell_history.insert_history)
                  client.query(buy_sell_history.insert_history,[data.number,data.hash,data.time,data.type,data.user_address],function(err,result){
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
})
// 汇金币卖出交易处理
router.post("/hjbsell",function(req,res,next){
  console.log("req",req.body)
  if(req.session.user){
     // 获取用户地址
     let user_address=req.session.user.address;
     let value=parseInt(req.body.value,10);
        // bignumber尚未解决
    // console.log(hjb_contract.balanceOf.call(user_address));
    // 把获得的账户汇金币数量bignumber类型转换一下
    let hjb_number=parseInt(web.hjb_contract.balanceOf.call(user_address).c[0],10)
    req.session.user.hjb_number=hjb_number;
    if(hjb_number>value){
      // 解锁账户
      web.web3.personal.unlockAccount(user_address,req.session.user.password,1500,(err,result)=>{
        if(err){console.log(err)
          responseClient(res,200,1,"密码错误")}
          else{
            console.log(1)
            web.hjb_contract.sell.sendTransaction(value,{from:user_address},function(err,result){
              if(err){console.log(err)
                responseClient(res,200,1,"购买失败")}
                else{
                  let time=new Date().toString()
                  const data={
                    hash:result,
                    number:value,
                    time:time,
                    type:0,
                    address:user_address,
                  }
                  // 插入数据库
                  client.query(buy_sell_history.insert_history,[data.number,data.hash,data.time,data.type,data.user_address],function(err,result){
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
})
// 汇金币转账历史记录查询
router.get('/history',function(req,res,next){
  // 从session中获取用户信息
  let data=req.session.user;
  if(data){
    // 如果存在，进行查询
    client.query(tourial_historysql.search_hjball,[data.address],function(err,result){
      if(err){console.log(err)}
        else{
          responseClient(res,200,1,"查询成功",result)
        }
    })
  }
})
// 汇金币买卖历史信息获取
router.get('/buy_sellhistory',function(req,res,next){
  // 从seeion中获取用户信息
  let data=req.session.user;
  if(data){
    // 如果存在，进行查询
    client.query(buy_sell_history.search_all,[data.address],function(err,result){
      if(err){
        console.log(err)
      }else{
        responseClient(res,200,1,"查询成功",result)
      }
    })
  }
})
// 汇金币信息获取
router.get('/hjbmessage',function(req,res,next){
  if(req.session.admin){
      // 定义储存代币信息的数组
      const data={};
      //获取管理者信息,如果存在就返回，不存在则返回空
      data.adminAccount=req.session.admin.address?req.session.admin.address:"";
      // 获取代币的名称
      data.name=web.hjb_contract.name.call();
      // 获取代币的发行总量
      data.totalSupply=web.hjb_contract.totalSupply.call();
      // 获取代币标志
      data.symbol=web.hjb_contract.symbol.call();
      // 获取代币的买入价格
      data.buyPrice=web.hjb_contract.buyPrice.call().toString();
      // 获取代币卖出价格
      data.sellPrice=web.hjb_contract.sellPrice.call().toString();
      // 阈值暂时无法获取
      req.session.admin.data=data;
      responseClient(res,200,1,"查询成功",data)
  }else{
    responseClient(res,200,0,"您未登录，请先登录")
  }  
})
// 代币账户冻结/解冻
router.post('/hjb_frozen',function(req,res,next){
  if(req.session.admin){
    let adminaddress=req.session.admin.address;
    let pass=req.session.admin.password;
    let state=req.body.region;
    let address=req.body.address;
    console.log(req.body)
    switch(state){
      case "0":
      web.web3.personal.unlockAccount(adminaddress,pass,3000,(err,result)=>{
        if(err){
          console.log(err)
        }else{
          web.hjb_contract.freezeAccount(address,true,{from:adminaddress},(err,result)=>{
            if(err){
              console.log(err)
              responseClient(res,200,1,"冻结失败",{state:0,result:0})
            }else{
              client.query(frozenSQL.insert_history,[req.body.username,req.body.address,1],function(err,result){
                if(err){console.log(err)}
                  else{
                    console.log(result)
                  }
              })     
              responseClient(res,200,1,"冻结成功",{state:0,result:1,hash:result})
            }
          });               
        }
      });       
      return;
      case "1":
      web.web3.personal.unlockAccount(adminaddress,pass,3000,(err,result)=>{
        if(err){
          console.log(err)
        }else{
          web.hjb_contract.freezeAccount(address,false,{from:adminaddress},(err,result)=>{
            if(err){
              console.log(err);
              responseClient(res,200,1,"解冻失败",{state:1,result:0,})
            }else{
              client.query(frozenSQL.insert_history,[req.body.username,req.body.address,0],function(err,result){
                if(err){console.log(err)}
                  else{
                    console.log(result)
                  }
              })     
              responseClient(res,200,1,"解冻成功",{state:1,result:1,hash:result})
            }
          });    
        }
      });     
      return;
      case "2":
      let number=web.hjb_contract.balanceOf.call(address).toString(10);
      if(number){
        const data={
          state:2,
          result:number,
        }
        responseClient(res,200,1,"查询成功",data)        
      }else{
        console.log(2)
        responseClient(res,200,1,"查询失败",{state:2,result:0})
      }      
      return;
      default:
      console.log(3)
      responseClient(res,200,1,"服务器错误")
      return  
    }
  }
 
})
// 代币设置买入卖出价格
router.post('/setprice',function(req,res,next){
  if(req.session.admin){
    let adminaddress=req.session.admin.address;
    let pass=req.session.admin.password;
    let state=req.body.region;
    let price=parseInt(req.body.price,10);
    let buyPrice=req.session.admin.data.buyPrice;
    let sellPrice=req.session.admin.data.sellPrice;
    if(state==="0"){
      web.web3.personal.unlockAccount(adminaddress,pass,3000,(err,result)=>{
        if(err){
          console.log(err)
        }else{
          web.hjb_contract.setPrices(price,sellPrice,{from:adminaddress},(err,result)=>{
            if(err){
              console.log(err)
              responseClient(res,200,1,"设置买入价格失败",{state:0,result:0})
            }else{
              const params=req.session.admin;
              client.query(admin_setpriceSql.insert_history,[params.username,1,price],function(err,result){
                if(err){
                  console.log(err);
                }else{
                  console.log(result);
                }
              })
              responseClient(res,200,1,"设置买入价格成功",{state:0,result:1})
            }
          });               
        }
      }); 
    }else{
      web.web3.personal.unlockAccount(adminaddress,pass,3000,(err,result)=>{
        if(err){
          console.log(err)
        }else{
          web.hjb_contract.setPrices(buyPrice,price,{from:adminaddress},(err,result)=>{
            if(err){
              console.log(err)
              responseClient(res,200,1,"设置卖出价格失败",{state:1,result:0})
            }else{
              const params=req.session.admin;
              client.query(admin_setpriceSql.insert_history,[params.username,2,price],function(err,result){
                if(err){
                  console.log(err);
                }else{
                  console.log(result);
                }
              })
              responseClient(res,200,1,"设置卖出价格成功",{state:1,result:1})
            }
          });               
        }
      });
    }
  }
 }
)
// 代币设置历史记录查询
router.get('/setprice_history',function(req,res,next){
  let promisequery=new Promise(function(resolve,reject){
    client.query(admin_setpriceSql.search_history,function(err,res){
      if(err){reject(err)}
        else{resolve(res)}
    })
  })
  promisequery.then(result=>{
    responseClient(res,200,1,"ok",{result})
  })
})
// 代币增发
router.post('/add',function(req,res,next){
  if(req.session.admin){
    let adminaddress=req.session.admin.address;
    let admin_name=req.session.admin.username;
    let pass=req.session.admin.password;
    let number=parseInt(req.body.number,10);
    let address=req.body.address;
    let username=req.body.username;
    web.web3.personal.unlockAccount(adminaddress,pass,3000,(err,result)=>{
      if(err){
        console.log(err)
      }else{
        web.hjb_contract.mintToken(address,number,{from:adminaddress},(err,result)=>{
          if(err){
            console.log(err)
            responseClient(res,200,1,"增发失败")
          }else{
            console.log(req.body)
            client.query(admin_minttokenSQL.insert_history,[admin_name,number,username,address],function(err,result){
              if(err){
                console.log(err)
              }else{
                console.log(result)
              }
            })
            responseClient(res,200,1,"增发成功",{address:address,number:number,hash:result})
          }
        });               
      }
    }); 
  }
})
// 代币增发历史记录获取
router.get('/add_history',function(req,res){
  client.query(admin_minttokenSQL.get_history,function(err,result){
    if(err){console.log(err)}
      else{
        responseClient(res,200,1,"ok",{result})
      }
  })
})
// 代币设置GAS
router.post('/setgas',function(req,res,next){
  console.log(req.body)
  if(req.session.admin){
    let admin_name=req.session.admin.username;
    let adminaddress=req.session.admin.address;
    let pass=req.session.admin.password;
    let number=parseInt(req.body.desc,10);
    web.web3.personal.unlockAccount(adminaddress,pass,3000,(err,result)=>{
      if(err){
        console.log(err)
      }else{
        web.hjb_contract.setMinBalance(number,{from:adminaddress},(err,result)=>{
          if(err){
            console.log(err)
            responseClient(res,200,1,"修改阈值失败")
          }else{
            client.query(admin_gasSQL.inserthistory,[admin_name,number],function(err,result){
              if(err){
                console.log(err)
              }else{
                console.log(result)
              }
            })
            responseClient(res,200,1,"修改阈值成功",{number:number,hash:result})
          }
        });               
      }
    }); 
  }
})
// 代币设置GAS历史记录查询
router.get('/setgas_history',function(req,res,next){
  client.query(admin_gasSQL.gethistory,function(err,result){
    if(err){
      responseClient(res,200,1,"err",{err})
    }else{
      responseClient(res,200,1,"ok",{result})
    }
  })
  
})
module.exports = router;
