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
export {Totime}