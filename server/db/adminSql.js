var adminSQL = {  
    insert:'INSERT INTO admin(username,password,address) VALUES(?,?,?)', 
    queryAll:'SELECT * FROM admin',  
    getAdminInfo:'SELECT * from admin WHERE username = ? and password = ?',
    findUser:'SELECT * FROM admin WHERE username = ?',
    updateUserName:'UPDATE admin SET username = ? WHERE username = ?',
  };
module.exports = adminSQL;