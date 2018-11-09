var admin_gasSQL={
    // 插入设置阈值的历史记录
    inserthistory:"INSERT INTO admin_gas (adminname,gas) VALUES (?,?)",
    // 查询设置阈值的历史记录
    gethistory:"SELECT * FROM admin_gas"
}
module.exports=admin_gasSQL;