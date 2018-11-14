var adminSQL = {  
    insert:'INSERT INTO admin(username,password,address) VALUES(?,?,?)', 
    queryAll:'SELECT * FROM admin',
    //更新时间
    update_time:"UPDATE admin SET lasttime=? WHERE username= ? ",
    getAdminInfo:'SELECT * from admin WHERE username = ? and password = ?',
    findUser:'SELECT * FROM admin WHERE username = ?',
    updateUserName:'UPDATE admin SET username = ? WHERE username = ?',
  };
module.exports = adminSQL;