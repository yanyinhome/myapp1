var hj_contractSQL = {   
    findapi:'SELECT * FROM hj_contract WHERE id = ?',
    updateUserName:'UPDATE hj_contract SET contract_abi = ? WHERE id = ?',
  };
module.exports = hj_contractSQL;