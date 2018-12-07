import userServices from "../services/userServices";
// 时间戳转标准时间函数
const Totime =(time)=>{
    var dt = new Date(parseInt(time,10));
            var year = dt.getFullYear();
             var month = dt.getMonth()+1 < 10 ? '0'+(dt.getMonth()+1) : dt.getMonth()+1;
            var date = dt.getDate();
            var hour = dt.getHours();
            var minute = dt.getMinutes();
            var second = dt.getSeconds()+1<10? '0'+dt.getSeconds():dt.getSeconds();
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
//单击事件
class  BindClick {
    //添加绑定
    bindclick(fun){
        document.addEventListener(("click"),fun);
    }
    //解除绑定
    removebindclick(fun){
        document.addEventListener(("click"),fun);
    }
}
// 回车事件
class BindEnter{
    // 添加绑定
    bindenter(fun){
        document.addEventListener("keydown",fun);
    }
    // 解除绑定
    removebindenter(fun){
        document.removeEventListener("keydown",fun);
    }
    // 判断是否是回车事件
    ifenter(e){
        if(e.keyCode!==13){return false}
        else{return true}
          
    }
}
// 模糊查询函数
const DimSearch=(value,next)=>{
        userServices.usersearch({username:value,address:value}).then(res=>{
           next(res)
        }).catch(err=>{console.log(err)})
}
// 昵称验证函数
const CheckNickName=(value)=>{
    return userServices.checkNickName({nickname:value}).catch(err=>{
        console.log(err)
    })
}
const bindenter=new BindEnter();
const bindclick=new BindClick();
export {Totime,bindenter,DimSearch,CheckNickName,bindclick}