var MessageSQL = {  
    insert:'INSERT INTO message(username,password,address,state) VALUES(?,?,?,1)', 
    queryAll:'SELECT * FROM message',  
    getUserByInfo:'SELECT * from message WHERE username = ? and password = ?',
    // 查询用户或者地址
    findUser:"SELECT username,address,state FROM message WHERE username LIKE ? OR address = ?",
    // 注册查询昵称是否
    findUsername:"SELECT * FROM message WHERE username = ? ",
    // 根据地址查询用户名
    get_username:"SELECT * from message WHERE address = ?",
    // 修改昵称
    updateUserName:'UPDATE message SET username = ? WHERE username = ?',
    // 修改状态
    updateUserState:"UPDATE message SET state = ? WHERE address = ?",
  //  查询未冻结账户列表
    Search_accounts:"SELECT username,address,lasttime,times FROM message WHERE state=0",
  //  修改登录次数
    update_load_times:"UPDATE message SET times=times+1 WHERE username= ? ",
  };
module.exports = MessageSQL;