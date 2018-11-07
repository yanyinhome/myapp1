import url from "../consts/Url"
import Xhr from "../utils/xhr"
// 以太币通过服务端转账函数
 class adminService{
    constructor(){
        this.url=url.development
    }
    //登录验证
    Login(data){
        return Xhr({
            method:"post",
            url:"http://192.168.124.2:3005/users/admin/login",
            data:{
                ...data
            }
        })
    }
    // 状态验证
    getadmininfo(data){
        return Xhr({
            method:"get",
            url:"http://192.168.124.2:3005/users/admin/admininfo"
        })
    }
    // 注销登录
    logout(data){
        return Xhr({
            method:"get",
            url:"http://192.168.124.2:3005/users/admin/logout"
        })
    }
}
export default new adminService();