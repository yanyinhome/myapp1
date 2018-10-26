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
            url:"http://192.168.124.2:3005/hjb/admin/zengfa",
            data:{
                ...data
            }
        })
    }
    // Hjb设置买入价格
    HjbSetbuyprice(data){
        return xhr({
            method:"post",
            url:"http://192.168.124.2:3005/hjb/admin/setbuyprice",
            data:{
                ...data
            }
        })
    }
    // Hjb设置卖出价格
    HjbSetsellprice(data){
        return xhr({
            method:"post",
            url:"http://192.168.124.2:3005/hjb/admin/setsellprice",
            data:{
                ...data
            }
        })
    }
    // Hjb冻结/解冻账户
    HjbFroze(data){
        return xhr({
            method:"post",
            url:"http://192.168.124.2:3005/hjb/admin/hjbsell",
            data:{
                ...data
            }
        })
    }
}

// 汇金币通过服务端管理代币函数
export default new HjbService();