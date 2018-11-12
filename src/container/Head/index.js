import React,{Component} from "react";
import './Head_Foot.css';
import {Link} from 'react-router-dom';
import logo from '../../../static/img/logo.png';
import set from '../../../static/img/set.png';
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
// 已登录组件
class  Isload extends Component{
    render(){
        return(
            <ul>
                <li className="register" style={{position:"relative"}}>
                    <a onClick={this.props.toggle}>{this.props.loadstate}</a>
                    <a  style={{position:"absolute",top:"65px",height:"40px",lineHeight:"40px",fontSize:" 16px",color:"#346aa9",width: "50px",left:"0px",margin:"0",zIndex:"100",background:"#f3f3f3",textAlign:"center",display:this.props.display}}
                       onClick={this.props.logout}>注销</a>
                </li>
                <li><Link to={Config.routerconfig.pathconfig.shezhi.url}><img src={set} alt=""></img></Link></li>
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
    // 点击显示注销按钮
    toggle=()=>{
        this.setState((prevState) => ({
            toggle_display:prevState.toggle_display?false:true,
            display:prevState.toggle_display?"block":"none"
          }))        
    }
    // 注销登录函数
    logout=()=>{
        userService.logout().then(data=>{console.log(data)})
        // this.props.history.push('/login')
        this.setState({isloaded:false});
    }
    componentDidMount(){
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
    render(){
        let loadshow=null;
        if(this.state.isloaded){
            loadshow = <Isload loadstate={this.state.loadstate} toggle={this.toggle} display={this.state.display} logout={this.logout}/>;
        }else{
            loadshow = <Unload loadstate={this.state.loadstate}/>;
        }
        return(
            <div className="top">
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