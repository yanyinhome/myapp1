import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import "element-theme-default";
// 头部的菜单列表组件
    // 单个列表组件
class Item extends Component{
    render(){
        return(
            <li><img src={this.props.img} alt=""></img><Link to={this.props.link}>{this.props.title}</Link></li>
        )
    }
}
    // 整个列表组件
class Itemlist extends Component{
    render(){
        let itemlist=this.props.imgarry.map((item)=><Item title={item.value} key={item.id} img={item.img} link={item.link}/>);
        return(
                <ul>{itemlist}</ul>            
        )
    }
}
// 列表组件
export {Itemlist};