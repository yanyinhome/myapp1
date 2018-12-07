var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require('fs');
var path=require("path");
var responseClient=require('../util/util');
var imagesSql=require('../db/imagesSql');
var DBconfig=require("../db/DBconfig");

// 引入数据库
var mysql=require("mysql");
// 创建数据库客户端
const client=mysql.createConnection(DBconfig.mysql);
client.connect((err,result)=>{
    if(err){
        console.log(err);
    }else{
        console.log("file连接数据库结果",result)
    }
});
var storage = multer.diskStorage({
    // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
    destination: 'public/uploads/',
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null,  file.originalname);
    }
});
var upload = multer({
    storage: storage
});
//处理文件上传
router.post('/upload',upload.single("file"),function(req,res,next){
    console.log(req.files,"1")//req.file文件的具体信息
    console.log(req.file,"3")//req.file文件的具体信息
    let name=req.file.originalname;
    let url=imagesSql.url+req.file.destination.split("/")[1]+'/'+name;
    //图片路径存入数据库
    //判断图片是否存在同名在客户端做判断
    client.query(imagesSql.insertImage,[name,url],function (err,result) {
        if(err){
            console.log(err)
            responseClient(res)
        }else {
            responseClient(res,200,1,"ok",{name:name,url:url})
        }
    })

    
})
// 修改logo
router.post("/changelogo",function(req,res){
    console.log(req.body.name)
    let name=req.body.name;
    client.query(imagesSql.ChangeLogo1,function (err, result) {
        if(err){
            console.log(err)
            responseClient(res)
        }else {
            client.query(imagesSql.ChangeLogo2,[name],function (err, result) {
                if(err){
                    console.log(err);
                    responseClient(res)
                }else {
                    responseClient(res,200,1,"更改成功")
                }
            })
        }
    })
})
// 查询图片列表
router.get("/queryimages",function (req,res,next) {
    client.query(imagesSql.selectImages,function (err,result) {
       if(err){console.log(err)}
        else {
            responseClient(res,200,1,"ok",{result})
       }
    })
})
// 删除文件
router.post('/delate',function (req,res,next) {
    let name=req.body.name;
    var fspath=path.join(__dirname+"../../public/uploads/"+name)
    fs.unlink(fspath,err => {
        if(err){
            responseClient(res)
            throw err}
        client.query(imagesSql.delateImage,[name],(err,result)=>{
            if(err){console.log(err)
            responseClient(res)
            }else {
                responseClient(res,200,1,"删除成功")
            }
        })
    })
})
//查询logo地址
router.get('/getlogoaddress',function (req,res,next) {
    client.query(imagesSql.getlogoaddress,function (err,result) {
        if(err){
            console.log(err)
        }else {
            responseClient(res,200,1,"ok",{result:result[0]})
        }
    })
})
module.exports = router;