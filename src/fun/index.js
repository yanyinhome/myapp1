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
    if(value.length!==0){
        userServices.usersearch({username:value,address:value}).then(res=>{
           next(res)
        }).catch(err=>{console.log(err)})
    }
}
const bindenter=new BindEnter();
export {Totime,bindenter,DimSearch}