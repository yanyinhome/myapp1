import Web3  from "web3";
// 无法引入配置文件，会形成相互调用
var web3;
//创建web3对象
if (typeof web3 !== 'undefined') {
   web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
   web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.124.2:8486"));
};
// var web3 = new web3();
// 连接到以太坊节点
// web3.setProvider(new web3.providers.HttpProvider("http://192.168.124.2:8486"));
let version=web3.version;
const app={
  web3:web3,
  version:version,
  // myconstract:myconstract,
  // 生成合约实例数组函数
  contractarry:(arry)=>{return arry.map((item)=>{return app.contractAtAddress(item.abi,item.address)})},
  // 显示内容，便于测试
  show:something=>{console.log(something)},
  // 获得区块数的函数
  getblockNumber:()=>{return app.web3.eth.getBlockNumber((err,result)=>{if(err){console.log(err)}})},
  // 获得GAS价格的函数
  getGasPrice:()=>{return app.web3.eth.getGasPrice((err,result)=>{if(err){console.log(result)}})},
  // 获得同步节点的函数
  getPeers:()=>{return app.web3.eth.net.peerCount;},
  // 获得节点ID的函数
  getNetWorkId:()=>{return "1"},
  // 获得默认账户的函数
  getMinerStatus:()=>{return app.web3.eth.coinbase},
  // 获得节点监听ip的函数
  getHttpProvider:()=>{return app.web3.currentProvider.host},
  // 获得账户列表数组的函数
  getaccounts:()=>{return app.web3.eth.getAccounts((err)=>{if(err){console.log(err)}})},
  // 获得账户以太币信息的函数
  getBalance:(element,callback)=>{return app.web3.eth.getBalance(element,callback)},
  // 获得区块信息的函数
  getblock:(number)=>{return app.web3.eth.getBlock(number)},
  // 以太币交易函数
  transfer:(fromaddress,toaddress,val,id)=>{
    app.web3.eth.getAccounts((err,accounts)=>{
      if(err){
          console.log(err)
        };
      if(!fromaddress){
        fromaddress=accounts[0]
      };
      if(!toaddress){alert("请输入对方地址")}
        else{
          let password=prompt("请输入密码");
          app.web3.personal.unlockAccount(fromaddress,password,15000,(err,result)=>{
          if (!password){return}
          if(err){
            alert('密码不正确')
          }else{
            console.log(result);
            console.log(app.web3.toWei(val,"ether"))
            app.web3.eth.sendTransaction({from:fromaddress,to:toaddress,value:app.web3.toWei(val,'ether')},
            (err,result)=>{
              if(err){console.log(err)}
                 else{console.log(result,`转账给${toaddress}成功`)
                    app.process(id)}
            })
          }
          })
      }       
    })
  },
  // 显示交易进度的函数
  process:(id)=>{
    document.getElementById(id).innerHTML="nihao";
  },
  // 根据合约api及address获得已部署合约的实例的函数
  contractAtAddress:(abi,address)=>{
    return  app.web3.eth.Contract(abi).at(address);
  },
  // 根据合约api及data部署新合约的函数 
  contractdeploy:(abi,data,fromaccount,gas,...parameters)=>{
    return app.web3.eth.Contract(abi).new(parameters,{data:data,from:fromaccount,gas:gas},function(e, contract){
      console.log(e,contract);
      if (typeof contract.address !== 'undefined') {
        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
   }
    })
  },
  // 编译合约的函数，暂缺
};
export default app;