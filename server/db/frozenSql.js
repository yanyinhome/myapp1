var frozenSql = {   
    frozenAccount_number:"SELECT * FROM frozen WHERE id in (SELECT MAX(id) 	FROM frozen	WHERE state = 1	GROUP BY username)",
    searchHistory:'SELECT * FROM frozen WHERE username= ? ',
    searchall:"SELECT * FROM frozen",
    search_user_state:"SELECT	*FROM	frozen WHERE	id = (SELECT MAX(id) FROM	frozen WHERE username = ?	OR address = ?)"
  };
module.exports = frozenSql;