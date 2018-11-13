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
// 模糊搜索结果展示组件
const Showlist=({data=[],click=(e)=>{console.log(e.target.id)},over=(e)=>{e.target.style.color="red"},leave=(e)=>{e.target.style.color=""}})=>{
    let lists=data.map((item,index)=><li style={{cursor:"pointer"}} key={index} id={index} onClick={click} onMouseOver={over} onMouseLeave={leave}>{item.username}</li>)
    return (
            <ul>
            {lists}
            </ul>
    )
}
export {Itemlist,Showlist};