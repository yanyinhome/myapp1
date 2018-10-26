var buy_sell_history = {  
    insert_history:'INSERT INTO buy_sell_history (number,hash,time,type) VALUES (?,?,?,?)', 
    search_sell:"SELECT * FROM buy_sell_history WHERE address = ? and type = 0",
    search_buy:"SELECT * FROM buy_sell_history WHERE address = ? and type = 1"
  };
module.exports = buy_sell_history;