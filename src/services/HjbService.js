import url from "../consts/Url"
import Xhr from "../utils/xhr"
import xhr from "../utils/xhr";
// 汇金币通过服务端获取信息函数
class HjbService{
    constructor(){
        this.url=url.development
    }
    // 账户信息获取
    HjbAccounts(data){
        return Xhr({
            method:"get",
            url:"http://192.168.124.2:3005/hjb/hjbaccount",
            data:{
                ...data
            }
        })
    }
    // 汇金币转账
    HjbSend(data){
        return Xhr({
            method:"post",
            url:"http://192.168.124.2:3005/hjb/hjbsend",
            data:{
                ...data
            }
        })
    }
    // Hjb买入
    HjbBuy(data){
        return xhr({
            method:"post",
            url:"http://192.168.124.2:3005/hjb/hjbbuy",
            data:{
                ...data
            }
        })
    }
    // Hjb卖出
    HjbSell(data){
        return xhr({
            method:"post",
            url:"http://192.168.124.2:3005/hjb/hjbsell",
            data:{
                ...data
            }
        })
    }
    // Hjb增发
    HjbZengfa(data){
        return xhr({
            method:"post",
            url:"http://192.168.124.2:3005/hjb/add",
            data:{
                ...data
            }
        })
    }
    // Hjb设置买入/卖出价格
    HjbSetPrice(data){
        return xhr({
            method:"post",
            url:"http://192.168.124.2:3005/hjb/setprice",
            data:{
                ...data
            }
        })
    }
    // Hjb冻结/解冻账户
    HjbFroze(data){
        return xhr({
            method:"post",
            url:"http://192.168.124.2:3005/hjb/hjb_frozen",
            data:{
                ...data
            }
        })
    }
    // Hjb设置GAS
    HjbSetGas(data){
        return xhr({
            method:"post",
            url:"http://192.168.124.2:3005/hjb/setgas",
            data:{
                ...data
            }
        })
    }
    // 汇金币转账历史信息获取
    HJBhistory(data){
        return xhr({
            method:"get",
            url:"http://192.168.124.2:3005/hjb/history",
            data:{
                ...data
            }
        })
    }
    // 汇金币买卖历史信息获取
    HJBBuy_Sellhistory(data){
        return xhr({
            method:"get",
            url:"http://192.168.124.2:3005/hjb/buy_sellhistory",
            data:{
                ...data
            }
        })
    }
    // 汇金币信息获取
    HJBmessage(data){
        return xhr({
            method:"get",
            url:"http://192.168.124.2:3005/hjb/hjbmessage",
            data:{
                ...data
            }  
        })
    }
}
    
   
export default new HjbService();