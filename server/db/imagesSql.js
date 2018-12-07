var imageSql={
    url:"http://192.168.124.9:3005/",
    // 查询可用图片
    selectImages:'SELECT * FROM images WHERE state >=1',
    //查询图片是否重复
    SelectImage:"SELECT * FROM images WHERE `name`= ?",
    // 查询当前logo地址
    getlogoaddress:"SELECT * FROM images WHERE state=2",
    //修改logo图片路径
    ChangeLogo1:"UPDATE images SET state=1 WHERE state=2",
    ChangeLogo2:"UPDATE images SET state=2 WHERE `name`= ?",
    // 插入图片
    insertImage:'INSERT INTO images(NAME,url,state) VALUES (?,?,1)',
    // 删除图片
    delateImage:'DELETE FROM images WHERE NAME=?'
}
module.exports=imageSql;
