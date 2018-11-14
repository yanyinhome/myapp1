import url from "../consts/Url"
import Xhr from "../utils/xhr"
import xhr from "../utils/xhr";
// 汇金币通过服务端获取信息函数
class HjbService{
    constructor(){
        this.url=url.development.url
    }
    // 账户信息获取
    HjbAccounts(data){
        return Xhr({
            method:"get",
            url:`${this.url}/hjb/hjbaccount`,
            data:{
                ...data
            }
        })
    }
    // 汇金币转账
    HjbSend(data){
        return Xhr({
            method:"post",
            url:`${this.url}/hjb/hjbsend`,
            data:{
                ...data
            }
        })
    }
    // Hjb买入
    HjbBuy(data){
        return xhr({
            method:"post",
            url:`${this.url}/hjb/hjbbuy`,
            data:{
                ...data
            }
        })
    }
    // Hjb卖出
    HjbSell(data){
        return xhr({
            method:"post",
            url:`${this.url}/hjb/hjbsell`,
            data:{
                ...data
            }
        })
    }
    // Hjb增发
    HjbZengfa(data){
        return xhr({
            method:"post",
            url:`${this.url}/hjb/add`,
            data:{
                ...data
            }
        })
    }
    // 汇金币增发历史查询
    HjbZengfa_history(data){
        return xhr({
            method:"get",
            url:`${this.url}/hjb/add_history`,
            data:{
                ...data
            }
        })
    }
    // Hjb设置买入/卖出价格
    HjbSetPrice(data){
        return xhr({
            method:"post",
            url:`${this.url}/hjb/setprice`,
            data:{
                ...data
            }
        })
    }
    // 汇金币设置买卖价格历史记录查询
    setprice_history(data){
        return xhr({
            method:"get",
            url:`${this.url}/hjb/setprice_history`,
            data:{
                ...data 
            }
        })
    }
    // Hjb冻结/解冻账户
    HjbFroze(data){
        return xhr({
            method:"post",
            url:`${this.url}/hjb/hjb_frozen`,
            data:{
                ...data
            }
        })
    }
    // Hjb设置GAS
    HjbSetGas(data){
        return xhr({
            method:"post",
            url:`${this.url}/hjb/setgas`,
            data:{
                ...data
            }
        })
    }
    // 汇金币设置gas历史记录查询
    HjbSetGas_history(data){
        return xhr({
            method:"get",
            url:`${this.url}/hjb/setgas_history`,
            data:{
                ...data
            }
        })
    }
    // 汇金币转账历史信息获取
    HJBhistory(data){
        return xhr({
            method:"get",
            url:`${this.url}/hjb/history`,
            data:{
                ...data
            }
        })
    }
    // 汇金币买卖历史信息获取
    HJBBuy_Sellhistory(data){
        return xhr({
            method:"get",
            url:`${this.url}/hjb/buy_sellhistory`,
            data:{
                ...data
            }
        })
    }
    // 汇金币信息获取
    HJBmessage(data){
        return xhr({
            method:"get",
            url:`${this.url}/hjb/hjbmessage`,
            data:{
                ...data
            }  
        })
    }
}
    
   
export default new HjbService();