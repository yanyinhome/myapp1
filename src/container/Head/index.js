import React,{Component} from "react";
import './Head_Foot.css';
import {Link} from 'react-router-dom';
import logo from '../../../static/img/logo.png';
import set from '../../../static/img/set.png';
import {Itemlist} from "../../Component/publicConponent";
import{Input,Button} from "element-react";
import "element-theme-default";
import Config from '../../APP/config';
// 搜索框
class SearchInput extends Component{
    render() {
        return (
          <div className="left">
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
        }
    }
    showvalue(e){console.log(e.target.value)}
    render(){
        return(
            <div className="top">
                <div className="fr">
               <ul>
               <Loadroute loadstate={this.props.loadstate}/>
                <Loginroute/>
                <li>
                <Link to={Config.routerconfig.pathconfig.shezhi.url}><img src={set} alt=""></img></Link>
                </li>
               </ul>
                </div>
                <div className="title"><img src={logo} alt=""></img></div>
                <div className='container'>
                    <div className='left'>
                        <Itemlist imgarry={this.state.imgarry}/>
                    </div>
                    <div className='right'>
                        <SearchInput/>
                    </div>
                </div>
            </div>
        );
    }
}