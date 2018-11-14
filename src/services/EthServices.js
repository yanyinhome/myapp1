import url from "../consts/Url"
import Xhr from "../utils/xhr"
// 以太币通过服务端转账函数
 class EthService{
    constructor(){
        this.url=url.development.url
    }
    // 账户信息获取
    EthAccounts(data){
        return Xhr({
            method:"get",
            url:`${this.url}/eth/ethaccount`,
            data:{
                ...data
            }
        })
    }
    // 节点信息获取
    EthPeers(data){
        return Xhr({
            method:"get",
            url:`${this.url}/eth/peers`,
            data:{
                ...data
            }
        })
    }
    // 以太币转账
    EthSend(data){
        return Xhr({
            method:"post",
            url:`${this.url}/eth/ethsend`,
            data:{
                ...data
            }
        })
    }
    // 以太币历史记录获取
    ETHhistory(data){
        return Xhr({
            method:"get",
            url:`${this.url}/eth/history`,
            data:{
                ...data
            }
        })
    }
}
export default new EthService();