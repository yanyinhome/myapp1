var MessageSQL = {  
    insert:'INSERT INTO message(username,password,address) VALUES(?,?,?)', 
    queryAll:'SELECT * FROM message',  
    getUserByInfo:'SELECT * from message WHERE username = ? and password = ?',
    findUser:'SELECT * FROM message WHERE username = ?',
    updateUserName:'UPDATE message SET username = ? WHERE username = ?',
  };
module.exports = MessageSQL;