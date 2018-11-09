import account from '../../static/img/account.png';
import block from '../../static/img/block.png';
import copy from '../../static/img/copy.png';
// import log from '../../static/img/log.png';
// 配置信息
const Config={
    // 菜单列表及显示图片
    imgarry:[
        {id:1,value:"概况",img:account,link:"/"},
        {id:2,value:"发送",img:block,link:"/token"},
        {id:3,value:"交易",img:copy,link:"/transaction"},
        // {id:4,value:"日志",img:log,link:"./rizhi"},
        // {id:5,value:"代币",img:log,link:"./token"},
        ],
    // 路由配置列表
    routerconfig:{
        // loadable loading属性配置
        Loading:'',
        // path路径 及对应的组件地址（该路径是虚拟的，地址是真实的）
        pathconfig:{
            show:{path:"/",url:"/"},
            token:{path:"/token",url:"/token"},//可以添加正则
            account:{path:"/account",url:"/account"},
            shezhi:{path:"/seting",url:"/seting"},
            register:{path:"/regist",url:"/regist"},
            load:{path:"/login",url:"/login"}
        },
    },
}
export default Config;