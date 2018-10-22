import account from './img/account.png';
import block from './img/block.png';
import copy from './img/copy.png';
import log from './img/log.png';
import app from './myseltComponent/app1';

// 获取节点信息赋值给config
const nodemessage={};
nodemessage.blockNumber=app.web3.eth.blockNumber;
nodemessage.GasPrice=app.web3.eth.gasPrice.toString();
nodemessage.peers=app.web3.net.peerCount;
nodemessage.networkId=app.getNetWorkId();
nodemessage.minerStatus=app.getMinerStatus();
nodemessage.provider=app.getHttpProvider();
// 获取账户信息赋值给config
const accountsmessage=[];
app.web3.eth.getAccounts((err,result)=>{
  if(err){console.log(err)}
    else{result.forEach(
        (item,index)=>{
          const accountsmessageitem={};
          accountsmessageitem.lockd="true";
          accountsmessageitem.index=`${index+1}`;
          accountsmessageitem.number=app.web3.eth.getBalance(item).toString();
          accountsmessageitem.address=item;
          accountsmessage.push(accountsmessageitem);
      }
    )}
})
// app.getaccounts().then(accounts=>{
//   accounts.forEach((element,index) => {
//     let message={};
//     message.id=index;
//     message.accountaddress=element;
//     message.lockd="ture";
//     app.getBalance(element).then(data=>{
//       message.accountnumber=app.web3.utils.fromWei(data,"ether");
//     });    
//     accountsmessage.push(message);
// });
// })

// 获取区块信息并赋值给config
const qukuaiarry=[];
let nowblock=app.web3.eth.blockNumber;
for(let i=nowblock;i>nowblock-50;i--){
    let qukuaimessage={};
    let qukuai=app.web3.eth.getBlock(i);
    qukuaimessage.qukuainumber=qukuai.number;
    qukuaimessage.qukuaiower=qukuai.miner;
    qukuaimessage.gasused=qukuai.gasUsed.toString();
    qukuaimessage.trancenumber=qukuai.transactions.length.toString();
    qukuaiarry.push(qukuaimessage);
}
// 配置信息
const Config={
    // 菜单列表及显示图片
    imgarry:[
        {id:1,value:"以太币",img:account,link:"./"},
        {id:2,value:"汇金币",img:block,link:"./qukuai"},
        {id:3,value:"币币交易",img:copy,link:"./jiaoyi"},
        {id:4,value:"日志",img:log,link:"./rizhi"},
        // {id:5,value:"代币",img:log,link:"./token"},
        ],
        // head下内容显示列表
    BodyTitle_arry:[
        {id:'item1',value:"区块数",content:nodemessage.blockNumber?nodemessage.blockNumber:0,},
        {id:'item2',value:"GAS价格",content:nodemessage.GasPrice?nodemessage.GasPrice:"0",},
        {id:'item3',value:"节点",content:nodemessage.peers?nodemessage.peers:"0",},
        {id:'item4',value:"区块链ID",content:nodemessage.networkId?nodemessage.networkId:"0",},
        {id:'item5',value:"RPC服务器",content:nodemessage.provider?nodemessage.provider:"0",},
        {id:'item6',value:"矿主地址",content:nodemessage.minerStatus?nodemessage.minerStatus:"0",},
    ], 
    // 路由配置列表
    routerconfig:{
        // loadable loading属性配置
        Loading:'',
        // path路径 及对应的组件地址（该路径是虚拟的，地址是真实的）
        pathconfig:{
            home:{path:"/",url:"./home"},
            jiaoyi:{path:"/jiaoyi",url:"./jiaoyi"},
            rizhi:{path:"/rizhi",url:"./rizhi"},
            qukuai:{path:"/qukuai",url:"./qukuai"},//可以添加正则
            admin:{path:"/admin",url:"./admin"},
            shezhi:{path:"/shezhi",url:"./shezhi"},
            register:{path:"/register",url:"./register"},
            load:{path:"/load",url:"./load"}
        },
    },
    // 账户列表
    accounts:accountsmessage.length===0?accountsmessage:[{
        id:1,
        accountaddress:"0",
        accountnumber:"0",
        lockd:true,
    },], 
    // 区块列表信息
    qukuailist:qukuaiarry||[{
       qukuainumber:"0",
       qukuaiower:"none",
       gasused:"",
       trancenumber:"" 
    }],
    // 代币信息数组
    Tokenlist:[],
    // 合约信息,存数据库
    contracts:[
        {   name:null,
            abi:[
                {
                  "anonymous": false,
                  "inputs": [
                    {
                      "indexed": false,
                      "name": "a",
                      "type": "uint256"
                    },
                    {
                      "indexed": false,
                      "name": "b",
                      "type": "uint256"
                    },
                    {
                      "indexed": false,
                      "name": "c",
                      "type": "uint256"
                    }
                  ],
                  "name": "consolelog",
                  "type": "event"
                },
                {
                  "constant": false,
                  "inputs": [],
                  "name": "buy",
                  "outputs": [
                    {
                      "name": "amount",
                      "type": "uint256"
                    }
                  ],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "function"
                },
                {
                  "anonymous": false,
                  "inputs": [
                    {
                      "indexed": false,
                      "name": "target",
                      "type": "address"
                    },
                    {
                      "indexed": false,
                      "name": "frozen",
                      "type": "bool"
                    }
                  ],
                  "name": "FrozenFunds",
                  "type": "event"
                },
                {
                  "anonymous": false,
                  "inputs": [
                    {
                      "indexed": true,
                      "name": "from",
                      "type": "address"
                    },
                    {
                      "indexed": true,
                      "name": "to",
                      "type": "address"
                    },
                    {
                      "indexed": false,
                      "name": "value",
                      "type": "uint256"
                    }
                  ],
                  "name": "Transfer",
                  "type": "event"
                },
                {
                  "constant": false,
                  "inputs": [],
                  "name": "collect",
                  "outputs": [],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "function"
                },
                {
                  "constant": false,
                  "inputs": [
                    {
                      "name": "target",
                      "type": "address"
                    },
                    {
                      "name": "freeze",
                      "type": "bool"
                    }
                  ],
                  "name": "freezeAccount",
                  "outputs": [],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "constant": false,
                  "inputs": [
                    {
                      "name": "target",
                      "type": "address"
                    },
                    {
                      "name": "mintedAmount",
                      "type": "uint256"
                    }
                  ],
                  "name": "mintToken",
                  "outputs": [],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "constant": false,
                  "inputs": [
                    {
                      "name": "amount",
                      "type": "uint256"
                    }
                  ],
                  "name": "sell",
                  "outputs": [
                    {
                      "name": "revenue",
                      "type": "uint256"
                    }
                  ],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "function"
                },
                {
                  "constant": false,
                  "inputs": [
                    {
                      "name": "minimumBalanceInFinney",
                      "type": "uint256"
                    }
                  ],
                  "name": "setMinBalance",
                  "outputs": [],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "constant": false,
                  "inputs": [
                    {
                      "name": "newSellPrice",
                      "type": "uint256"
                    },
                    {
                      "name": "newBuyPrice",
                      "type": "uint256"
                    }
                  ],
                  "name": "setPrices",
                  "outputs": [],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "constant": false,
                  "inputs": [
                    {
                      "name": "_to",
                      "type": "address"
                    },
                    {
                      "name": "_value",
                      "type": "uint256"
                    }
                  ],
                  "name": "transfer",
                  "outputs": [],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "function"
                },
                {
                  "constant": false,
                  "inputs": [
                    {
                      "name": "newOwner",
                      "type": "address"
                    }
                  ],
                  "name": "transferOwnership",
                  "outputs": [],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "name": "initialSupply",
                      "type": "uint256"
                    },
                    {
                      "name": "tokenName",
                      "type": "string"
                    },
                    {
                      "name": "tokenSymbol",
                      "type": "string"
                    },
                    {
                      "name": "decimalsunit",
                      "type": "uint256"
                    },
                    {
                      "name": "centralMinter",
                      "type": "address"
                    }
                  ],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "constructor"
                },
                {
                  "constant": true,
                  "inputs": [
                    {
                      "name": "",
                      "type": "address"
                    }
                  ],
                  "name": "balanceOf",
                  "outputs": [
                    {
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [],
                  "name": "buyPrice",
                  "outputs": [
                    {
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [],
                  "name": "decimals",
                  "outputs": [
                    {
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [
                    {
                      "name": "",
                      "type": "address"
                    }
                  ],
                  "name": "frozenAccount",
                  "outputs": [
                    {
                      "name": "",
                      "type": "bool"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [],
                  "name": "name",
                  "outputs": [
                    {
                      "name": "",
                      "type": "string"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [],
                  "name": "owner",
                  "outputs": [
                    {
                      "name": "",
                      "type": "address"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [],
                  "name": "sellPrice",
                  "outputs": [
                    {
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [],
                  "name": "standard",
                  "outputs": [
                    {
                      "name": "",
                      "type": "string"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [],
                  "name": "symbol",
                  "outputs": [
                    {
                      "name": "",
                      "type": "string"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [],
                  "name": "totalSupply",
                  "outputs": [
                    {
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                }
              ],
            data:"0x60806040526040805190810160405280600981526020017f546f6b656e20302e3100000000000000000000000000000000000000000000008152506001908051906020019062000051929190620001e9565b50620f4240600455611f4060065561271060075560405162001c1c38038062001c1c8339810180604052810190808051906020019092919080518201929190602001805182019291906020018051906020019092919080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008173ffffffffffffffffffffffffffffffffffffffff161415156200015657336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b816004819055506004548502600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550846005819055508360029080519060200190620001c4929190620001e9565b508260039080519060200190620001dd929190620001e9565b50505050505062000298565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200022c57805160ff19168380011785556200025d565b828001600101855582156200025d579182015b828111156200025c5782518255916020019190600101906200023f565b5b5090506200026c919062000270565b5090565b6200029591905b808211156200029157600081600090555060010162000277565b5090565b90565b61197480620002a86000396000f300608060405260043610610107576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305fefda71461010c57806306fdde031461014357806318160ddd146101d3578063313ce567146101fe5780634b750334146102295780635a3b7e421461025457806370a08231146102e457806379c650681461033b5780638620410b146103885780638da5cb5b146103b357806395d89b411461040a578063a6f2ae3a1461049a578063a9059cbb146104b8578063b414d4b6146104f8578063c91d956c14610553578063e4849b3214610580578063e5225381146105b4578063e724529c146105be578063f2fde38b1461060d575b600080fd5b34801561011857600080fd5b506101416004803603810190808035906020019092919080359060200190929190505050610650565b005b34801561014f57600080fd5b50610158610726565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561019857808201518184015260208101905061017d565b50505050905090810190601f1680156101c55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101df57600080fd5b506101e86107c4565b6040518082815260200191505060405180910390f35b34801561020a57600080fd5b506102136107ca565b6040518082815260200191505060405180910390f35b34801561023557600080fd5b5061023e6107d0565b6040518082815260200191505060405180910390f35b34801561026057600080fd5b506102696107d6565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102a957808201518184015260208101905061028e565b50505050905090810190601f1680156102d65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156102f057600080fd5b50610325600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610874565b6040518082815260200191505060405180910390f35b34801561034757600080fd5b50610386600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061088c565b005b34801561039457600080fd5b5061039d610aac565b6040518082815260200191505060405180910390f35b3480156103bf57600080fd5b506103c8610ab2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561041657600080fd5b5061041f610ad7565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561045f578082015181840152602081019050610444565b50505050905090810190601f16801561048c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6104a2610b75565b6040518082815260200191505060405180910390f35b6104f6600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610d8b565b005b34801561050457600080fd5b50610539600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506111e6565b604051808215151515815260200191505060405180910390f35b34801561055f57600080fd5b5061057e60048036038101908080359060200190929190505050611206565b005b61059e600480360381019080803590602001909291905050506112dd565b6040518082815260200191505060405180910390f35b6105bc6114e9565b005b3480156105ca57600080fd5b5061060b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035151590602001909291905050506116b3565b005b34801561061957600080fd5b5061064e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611841565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610714576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f6e6f746175746f7200000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b81600681905550806007819055505050565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107bc5780601f10610791576101008083540402835291602001916107bc565b820191906000526020600020905b81548152906001019060200180831161079f57829003601f168201915b505050505081565b60055481565b60045481565b60065481565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561086c5780601f106108415761010080835404028352916020019161086c565b820191906000526020600020905b81548152906001019060200180831161084f57829003601f168201915b505050505081565b60096020528060005260406000206000915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610950576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f6e6f746175746f7200000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b6004548102600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550806005600082825401925050819055506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a38173ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b60075481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b6d5780601f10610b4257610100808354040283529160200191610b6d565b820191906000526020600020905b815481529060010190602001808311610b5057829003601f168201915b505050505081565b60007f636bec270259a277a2629505db8a6bb82194237ab14a39ed61e70098536ecd5a34600754600060405180848152602001838152602001828152602001935050505060405180910390a160075434811515610bce57fe5b04905080600960003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610c86576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f6e6f656e6f75676800000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b80600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555080600960003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a380905090565b600a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615610e4b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260068152602001807f66726f7a656e000000000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b80600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610f00576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f6e6f656e6f75676500000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481600960008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054011015610ff6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260098152602001807f6f766572666c6f7773000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b6008543373ffffffffffffffffffffffffffffffffffffffff1631101561104a576110486006543373ffffffffffffffffffffffffffffffffffffffff16316008540381151561104257fe5b046112dd565b505b6008548273ffffffffffffffffffffffffffffffffffffffff163110156110e3578173ffffffffffffffffffffffffffffffffffffffff166108fc6110b66006548573ffffffffffffffffffffffffffffffffffffffff1631600854038115156110b057fe5b046112dd565b9081150290604051600060405180830381858888f193505050501580156110e1573d6000803e3d6000fd5b505b80600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555080600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b600a6020528060005260406000206000915054906101000a900460ff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156112ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f6e6f746175746f7200000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b66038d7ea4c68000810260088190555050565b600081600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015611394576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f6e6f656e6f75676800000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b81600960003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555081600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550600654820290503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561147b573d6000803e3d6000fd5b503073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3809050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156115ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f6e6f746175746f7200000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b60003073ffffffffffffffffffffffffffffffffffffffff16311115156115d357600080fd5b7f636bec270259a277a2629505db8a6bb82194237ab14a39ed61e70098536ecd5a3073ffffffffffffffffffffffffffffffffffffffff163160008060405180848152602001838152602001828152602001935050505060405180910390a16000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f193505050501580156116b0573d6000803e3d6000fd5b50565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611777576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f6e6f746175746f7200000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b80600a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055507f48335238b4855f35377ed80f164e8c6f3c366e54ac00b96a6402d4a9814a03a58282604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001821515151581526020019250505060405180910390a15050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611905576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f6e6f746175746f7200000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a72305820e483f73bbcae6ef183dec8a8de09685f1d4151c7b4b61d2a91ad2889e4f082180029",
            address:"0x5d634737c3e2571284bd60ffdad941a341ae1b17",
            deployed:true,
        },
    ]
}
// 实例化代币合约并导出
let contract1=Config.contracts[0].abi;
let address1=Config.contracts[0].address;
// 实例化代币合约，后期改数组
const myconstract=app.web3.eth.contract(contract1).at(address1);
// 初始化代币数据的函数
const accountsmessageToken=[];
app.web3.eth.getAccounts((err,result)=>{
    if(err){console.log(err)}
      else{result.forEach(
          (item,index)=>{
            const accountsmessageitem={};
            accountsmessageitem.lockd="true";
            accountsmessageitem.index=`${index+1}`;
            accountsmessageitem.number=myconstract.balanceOf.call(item).toString();
            accountsmessageitem.address=item;
            accountsmessageToken.push(accountsmessageitem);
        }
      )}
      Config.Tokenlist=accountsmessageToken;
  })
export default Config;