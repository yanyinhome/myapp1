import url from "../consts/Url"
import xhr from "../utils/xhr";
class userServices {
    constructor(){
        this.url=url.development
    }
    //登录验证
    Login(data){
        return xhr({
            method:"post",
            url:"http://192.168.124.2:3005/users/login",
            data:{
                ...data
            }
        })
    }
    // 注册提交
    register(data){
        return xhr({
            method:"post",
            url:"http://192.168.124.2:3005/users/register",
            data:{
                ...data
            }
        })
    }
    // 昵称修改
    nameChange(data){
        return xhr({
            method:"post",
            url:"http://192.168.124.2:3005/users/nameChange",
            data:{
                ...data
            }
        })
    }
    // 用户信息获取
    userInfo(data){
        return xhr({
            method:"get",
            url:"http://192.168.124.2:3005/users/userInfo"
        })
    }
    // 注销登录
    logout(data){
        return xhr({
            method:"get",
            url:"http://192.168.124.2:3005/users/logout"
        })
    }
}
export default new userServices();