var frozenSql = {
    //查询冻结账户列表
    frozenAccount_number:"SELECT a.username,a.address,b.time,b.adminname FROM message a LEFT JOIN frozen b ON a.username = b.username WHERE a.state = 1 AND b.id IN (SELECT MAX(id) FROM frozen WHERE state = 1 GROUP BY username)",
    searchHistory:'SELECT * FROM frozen WHERE username= ? ',
    searchall:"SELECT * FROM frozen",
    search_user_state:"SELECT	*FROM	frozen WHERE	id = (SELECT MAX(id) FROM	frozen WHERE username = ?	OR address = ?)",
    // 插入历史记录
    insert_history:"INSERT INTO frozen(username,address,state,time,adminname,hash) VALUES(?,?,?,?,?,?)"
  };
module.exports = frozenSql;