var tourial_historysql = {  
    insert_tourial:'INSERT INTO tourial_history (address,number,toaddress,hash,data) VALUES(?,?,?,?,?)', 
    search_all:"SELECT * FROM tourial_history WHERE address = ? "
  };
module.exports = tourial_historysql;