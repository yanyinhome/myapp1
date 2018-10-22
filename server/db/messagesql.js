var MessageSQL = {  
    insert:'INSERT INTO message(username,password,address) VALUES(?,?,?,?)', 
    queryAll:'SELECT * FROM message',  
    getUserByInfo:'SELECT * FROM message WHERE username = ? AND password = ? ',
    findUser:'SELECT * FROM message WHERE address = ?',
    updateUserName:'UPDATE message SET username = ? WHERE address = ?',
  };
module.exports = UserSQL;