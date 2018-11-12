var express = require('express');
var router = express.Router();
var MessageSQL=require('../db/messagesql');
var adminSQL=require('../db/adminSql');
var DBconfig=require('../db/DBconfig');
var frozenSql=require('../db/frozenSql');
var responseClient=require("../util/util");
var Web3=require("web3");
var web3;
//创建web3对象
if (typeof web3 !== 'undefined') {
   web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
   web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.124.9:8486"));
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
// 注册验证处理
router.post("/usertest",function(req,res,next){
  let name=req.body.nickname;
  console.log(name)
  const rejistTest=new Promise(function(resolve,reject){
    client.query(MessageSQL.findUsername,[name],function(err,result){
      if(err){reject(err)}
        else{
          resolve(result)
        }
    })
  })
  rejistTest.then(result=>{responseClient(res,200,1,"ok",{result})}).catch(err=>{
    console.log(err)
  })
})
// 注册提交处理
router.post('/register',function(req,res,next){
  let name=req.body.nickname;
  let password=req.body.password;
  web3.personal.newAccount(password,function(err,result){
    if(err){
      console.log(err)
      responseClient(res,200,2,"节点创建新用户失败")
    }else{
      client.query(MessageSQL.insert,[name,password,result],function(err,result){
      if(err){console.log(err)
      responseClient(res,200,3,"存入数据库失败")}
        else{
          responseClient(res,200,1,"注册成功,即将跳转到登录界面")
        }
    })
    }
  });  
})
// 昵称修改处理
router.post("/nameChange",function(req,res,next){
  let newnickname=req.body.nickname;
  let username=req.session.user.username;
  console.log(newnickname,username)
  if(req.session.user.password===req.body.pass){
    client.query(MessageSQL.updateUserName,[newnickname,username],function(err,result){
      if(err){
        console.log(err);
        responseClient(res,200,1,"修改失败，数据存入错误")
      }else{
       if(result.length===0){
         responseClient(res,200,1,"修改失败，数据库查询错误")
       }else{
        req.session.user.username=newnickname;
        responseClient(res,200,1,"修改成功",{result:true})
       }
      }
    })
  }
})
// 用户信息获取处理
router.get('/userInfo', function(req, res, next) {
  let data=req.session.user;
  if(data){
    responseClient(res, 200, 1, '登录成功',data)
  }else{
    responseClient(res,200,0,"未登录")
  } 
});
// 查询已冻结用户列表
router.get('/frozen_accounts',function(req,res,next){
  client.query(frozenSql.frozenAccount_number,function(err,result){
    if(err){
      console.log(err)
    }else{
      responseClient(res,200,1,"ok",{result})
    }
  })
 
})
// 查询冻结解冻操作的历史记录
router.get('/frozen_history',function(req,res,next){
  client.query(frozenSql.searchall,function(err,result){
    if(err){
      console.log(err)
    }else{
      console.log(req.session.admin)
      let admin_name=req.session.admin.username;
      responseClient(res,200,1,"ok",{result:result,admin_name:admin_name})
    }
  })
 
})
// 用户查询
router.post('/usersearch', function(req, res, next) {
  if(req.body){
    const {username,address}=req.body;
    client.query(frozenSql.search_user_state,[username,address],function(err,result){
      if(err){console.log(err)}
        else{
          if(result.length===0){responseClient(res,200,0,"ok")}
            else{
              responseClient(res,200,1,"ok",result[0])
            }
        }
    })
  }  
});

// 注销登录
router.get('/logout',function(req,res,next){
  delete req.session.user;//退出时删除保存的user
  res.clearCookie(req.sessionID);//退出系统时清空cookie
  responseClient(res,200,1,"已注销")
})
// 管理页面登录
router.post('/admin/login', function(req, res, next) {
  if(req.session.admin&&req.cookies.admin){   
    responseClient(res, 200, 1, '登录成功',{username:req.body.username})
  }else{
    let params=req.body;
    client.query(adminSQL.getAdminInfo,[params.username,params.password],function(err,result){
      if(err){
        console.log(err)
      }else{
        if(result.length===0){          
          responseClient(res, 200, 2, '用户名或密码错误')
        }else{
          if (result[0].username === params.username && result[0].password === params.password) {
            // res.end(JSON.stringify({status:'100',msg:'登录成功'}));
            let admin = {
                _id:result[0].id,
                username:result[0].username,
                address:result[0].address,
                password:result[0].pass,
            }
            // 添加seesion和cookie验证
            req.session.admin=admin;
            res.cookie('user', admin, { expires: new Date(Date.now() + 900000), httpOnly: true });
            let times=new Date().getTime();
            client.query(adminSQL.update_time,[times,admin.username],function(err,result){
              if(err){
                console.log(err)
              }else{
                console.log(result)
              }
            })
            responseClient(res, 200, 1, '登录成功')
        }
        }
      }
    })
  }
});
// 管理员页面登录验证
router.get('/admin/admininfo',function(req,res,next){
  let data=req.session.admin;
  if(data){
    responseClient(res, 200, 1, '已登录',data)
  }else{
    responseClient(res,200,0,"您未登录,请登录")
  }
})
// 查询管理员列表
router.get('/admin/admin_list',function(req,res,next){
  client.query(adminSQL.queryAll,function(err,result){
    if(err){
      responseClient(res,200,0,"数据库连接失败")
    }else{
      responseClient(res,200,1,"ok",{result})
    }
  })
  
})
// 管理页面注销登录
router.get('/admin/logout',function(req,res,next){
  delete req.session.admin;//退出时删除保存的user
  res.clearCookie(req.sessionID);//退出系统时清空cookie
  responseClient(res,200,1,"已注销")
})

module.exports = router;
