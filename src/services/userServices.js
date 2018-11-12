import url from "../consts/Url"
import xhr from "../utils/xhr";
class userServices {
    constructor(){
        this.url=url.development.url
    }
    //登录验证
    Login(data){
        return xhr({
            method:"post",
            url:`${this.url}/users/login`,
            data:{
                ...data
            }
        })
    }
    // 注册提交
    register(data){
        return xhr({
            method:"post",
            url:`${this.url}/users/register`,
            data:{
                ...data
            }
        })
    }
    // 昵称修改
    nameChange(data){
        return xhr({
            method:"post",
            url:`${this.url}/users/nameChange`,
            data:{
                ...data
            }
        })
    }
    // 昵称验证
    checkNickName(data){
        return xhr({
            method:"post",
            url:`${this.url}/users/usertest`,
            data:{...data}
        })
    }
    // 用户信息获取
    userInfo(data){
        return xhr({
            method:"get",
            url:`${this.url}/users/userInfo`
        })
    }
    // 注销登录
    logout(data){
        return xhr({
            method:"get",
            url:`${this.url}/users/logout`
        })
    }
    // 查询已冻结用户列表
    get_frozen_accounts(data){
        return xhr({
            method:"get",
            url:`${this.url}/users/frozen_accounts`
        })
    }
    // 查询冻结解冻操作的历史记录
    get_frozen_history(data){
        return xhr({
            method:"get",
            url:`${this.url}/users/frozen_history`
        })
    }
    // 用户查询
    usersearch(data){
        return xhr({
            method:"post",
            url:`${this.url}/users/usersearch`,
            data:{
                ...data
            }
        })
    }
}
export default new userServices();