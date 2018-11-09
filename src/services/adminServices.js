import url from "../consts/Url"
import Xhr from "../utils/xhr"
// 以太币通过服务端转账函数
 class adminService{
    constructor(){
        this.url=url.development.url
    }
    //登录验证
    Login(data){
        console.log(this.url)
        return Xhr({
            method:"post",
            url:`${this.url}/users/admin/login`,
            data:{
                ...data
            }
        })
    }
    // 状态验证
    getadmininfo(data){
        return Xhr({
            method:"get",
            url:`${this.url}/users/admin/admininfo`
        })
    }
    // 注销登录
    logout(data){
        return Xhr({
            method:"get",
            url:`${this.url}/users/admin/logout`
        })
    }
    // 获取管理员列表
    admin_list(data){
        return Xhr({
            method:"get",
            url:`${this.url}/users/admin/admin_list`
        })
    }
}
export default new adminService();