var tourial_historysql = {  
    insert_tourial:'INSERT INTO tourial_history (address,number,toaddress,hash,data,type) VALUES(?,?,?,?,?,?)', 
    search_ethall:"SELECT * FROM tourial_history WHERE address = ? and type = 0",
    search_hjball:"SELECT * FROM tourial_history WHERE address = ? and type = 1"
  };
module.exports = tourial_historysql;