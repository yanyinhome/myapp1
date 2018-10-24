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
// 登录组件
class  Loadroute extends Component{
    render(){
        return(
            <li className="register"><Link to={Config.routerconfig.pathconfig.load.url}>{this.props.loadstate}</Link></li>
        )
    }
}
// 注册组件
class  Loginroute extends Component{
    render(){
        return(
            <li className="register"><Link to={Config.routerconfig.pathconfig.register.url}>注册</Link></li>
        )
    }
}
// 头部输出
export default class Head extends  Component{
    constructor(props){
        super(props);
        this.state={
            imgarry:Config.imgarry,
            loadstate:"登录"
        }
    }
    componentDidMount(){
        const self=this;
        // 从服务器调用是否登录的验证并更改状态
        userService.userInfo().then(
            res=>{
                console.log(res.data);
               self.setState({loadstate:res.data.username})
                
            })
    }
    render(){
        return(
            <div className="top">
                <div className='container'>
                <div className="fr">
               <ul>
               <Loadroute loadstate={this.state.loadstate}/>
                <Loginroute/>
                <li>
                <Link to={Config.routerconfig.pathconfig.shezhi.url}><img src={set} alt=""></img></Link>
                </li>
               </ul>
                </div>
                <div className="title"><img src={logo} alt=""></img></div>
                <div>
                    <div className='left'>
                        <Itemlist imgarry={this.state.imgarry}/>
                    </div>
                    <div className='right'>
                        <SearchInput/>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}