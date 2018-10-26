var express = require('express');
var router = express.Router();
var MessageSQL=require('../db/messagesql');
var DBconfig=require('../db/DBconfig');
var responseClient=require("../util/util");
var Web3=require("web3");
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
    console.log("use连接数据库结果",result)
  }
});
// client.query('SELECT * from message WHERE username = ? and password = ?',["xyz","12345678"],function(err,result){
//   console.log(result,0)
// })
// 登录验证处理
router.post('/login', function(req, res, next) {
  if(req.session.user&&req.cookies.user){   
    responseClient(res, 200, 1, '登录成功',{username:req.body.username})
  }else{
    let params=req.body;
    client.query(MessageSQL.getUserByInfo,[params.username,params.password],function(err,result){
      if(err){
        console.log(err)
      }else{
        if(result.length===0){          
          responseClient(res, 200, 2, '用户名或密码错误')
        }else{
          if (result[0].username === params.username && result[0].password === params.password) {
            // res.end(JSON.stringify({status:'100',msg:'登录成功'}));
            let user = {
                _id:result[0].id,
                username:result[0].username,
                address:result[0].address,
                password:result[0].password,
            }
            // 添加seesion和cookie验证
            req.session.user=user;
            res.cookie('user', user, { expires: new Date(Date.now() + 900000), httpOnly: true });
            responseClient(res, 200, 1, '登录成功')
        }
        }
      }
    })
  }
});
// 注册提交处理
router.post('/register',function(req,res,next){
      // let result=web3.personal.newAccount("123456");
})
// 昵称修改处理
router.post("/nameChange",function(req,res,next){

})
// 用户信息获取处理
router.get('/userInfo', function(req, res, next) {
  let data=req.session.user;
  if(data){
    responseClient(res, 200, 1, '登录成功',data)
  }else{
    responseClient(res,200,1,"未登录")
  }
  
});
// 注销登录
router.get('/logout',function(req,res,next){
  delete req.session.user;//退出时删除保存的user
  res.clearCookie(req.sessionID);//退出系统时清空cookie
  responseClient(res,200,1,"已注销")
})

module.exports = router;
