import url from "../consts/Url"
import Xhr from "../utils/xhr"
// 以太币通过服务端转账函数
 class EthService{
    constructor(){
        this.url=url.development
    }
    // 账户信息获取
    EthAccounts(data){
        return Xhr({
            method:"get",
            url:"http://192.168.124.2:3005/eth/ethaccount",
            data:{
                ...data
            }
        })
    }
    // 以太币转账
    EthSend(data){
        return Xhr({
            method:"post",
            url:"http://192.168.124.2:3005/eth/ethsend",
            data:{
                ...data
            }
        })
    }
}
export default new EthService();