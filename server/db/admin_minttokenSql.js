var admin_minttokenSQL={
    // 插入设置增发代币的历史记录
   insert_history: "INSERT INTO admin_minttoken (admin_name,number,username,mint_address,time) VALUES (?,?,?,?,?)",
    // 查询增发代币的历史记录
    get_history:"SELECT * FROM admin_minttoken"    
}
module.exports = admin_minttokenSQL;