var admin_setpriceSQL={
    // 插入设置价格的历史记录
    insert_history:"INSERT INTO admin_setprice(adminname,state,price) VALUES(?,?,?)",
    // 查询设置价格的历史记录
    search_history:"SELECT * FROM admin_setprice"
}
module.exports = admin_setpriceSQL;