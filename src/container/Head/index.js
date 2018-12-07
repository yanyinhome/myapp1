import React,{Component} from "react";
import './Head_Foot.css';
import {Link} from 'react-router-dom';
import logo from '../../../static/img/logo.png';
import set from '../../../static/img/set.png';
import user from '../../../static/img/profile.png';
import setting from '../../../static/img/settings.png';
import logout from '../../../static/img/logout.png';
import {Itemlist} from "../../Component/publicConponent";
import{Input,Button} from "element-react";
import "element-theme-default";
import Config from '../../APP/config';
import userService from "../../services/userServices";
// 搜索框
class SearchInput extends Component{
    render() {
        return (
          <div className="left" style={{marginRight:"40px"}}>
            <Input placeholder="请输入内容" size="small"  append={<Button type="primary" icon="search">搜索</Button>} />
          </div>
        )
      }      
}
//未登录组件
class  Unload extends Component{
    render(){
        return(
            <ul>
                <li className="register"><Link to={Config.routerconfig.pathconfig.load.url}>{this.props.loadstate}</Link></li>
                <li className="register"><Link to={Config.routerconfig.pathconfig.register.url}>注册</Link></li>
            </ul>
        )
    }
}
// 注销组件
class LoadOut extends Component{
    render(){
        return(
            <ul id="loadout" style={{display:this.props.display}}>
            <li><Link to={Config.routerconfig.pathconfig.shezhi.url}><img src={user} alt=""></img>账户</Link></li>
            <li><Link id="link2" to={Config.routerconfig.pathconfig.shezhi.url}><img src={setting} alt=""></img>设置</Link></li>
            <li><a onClick={this.props.logout} id="link3" ><img src={logout} alt=""></img>注销</a></li>
          </ul>
        )
    }
}
// 已登录组件
class  Isload extends Component{
    render(){
        return(
            <ul>
                <li className="register">
                <Link style={{cursor:"pointer"}} to={Config.routerconfig.pathconfig.shezhi.url}>{this.props.loadstate}</Link>
                </li>
                <li style={{position:"relative"}}>
                    <img id="setting" onClick={this.props.loadoutshow} src={set} alt="" style={{width:"18px",height:"18px",cursor:"pointer"}}></img>
                    <LoadOut display={this.props.display} logout={this.props.logout}></LoadOut>
                </li>
            </ul>
        )
    }
}
// 头部输出
export default class Head extends  Component{
    constructor(props){
        super(props);
        this.state={
            imgarry:Config.imgarry,
            loadstate:"登录",
            isloaded:false,
            address:"",
            toggle_display:true,
            display:"none",
        }
    }
    // 注销登录函数
    logout=()=>{
        userService.logout().then(data=>{console.log(data)})
        this.props.history.push('/login')
        this.setState({isloaded:false});
    }
    // 注销界面隐藏
    loadouthide=(e)=>{
        if(e.target.id!=="setting"){
            this.setState({display:"none"})
        }
    }
    // 注销界面显示
    loadoutshow=()=>{
        console.log(1)
        this.setState({display:"block"})
    }
    componentDidMount(){
        document.addEventListener("click",this.loadouthide)
        const self=this;
        // 从服务器调用是否登录的验证并更改状态
        userService.userInfo().then(
            res=>{
               if(res){
                if(res.code===1){
                    self.setState({loadstate:res.data.username,isloaded:true,address:res.data.address})
                }else{
                    this.props.history.push("/login")
                }    
               }         
            })
    }
    componentWillMount(){
        document.removeEventListener("click",this.loadouthide)
    }
    render(){
        let loadshow=null;
        if(this.state.isloaded){
            loadshow = <Isload loadstate={this.state.loadstate} display={this.state.display} logout={this.logout} loadoutshow={this.loadoutshow} />;
        }else{
            loadshow = <Unload loadstate={this.state.loadstate}/>;
        }
        return(
            <div className="top" style={{zIndex:999}}>
                <div className='container'>
                <div className="fr">
                {loadshow}
                </div>
                <div className="title"><img src={logo} alt=""></img></div>
                <div>
                    <div className='left'>
                        <Itemlist imgarry={this.state.imgarry}/>
                    </div>
                    <div className='right'>
                        {/* <SearchInput/> */}
                    </div>
                </div>
                </div>
            </div>
        );
    }
}