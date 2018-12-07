import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Collapse } from 'antd';
const Panel = Collapse.Panel;
// import "element-theme-default";
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
        const itemlist=this.props.imgarry.map((item)=><Item title={item.value} key={item.id} img={item.img} link={item.link}/>);
        return(
            <ul>{itemlist}</ul>
        )
    }
}
// 历史记录手风琴式显示
const HistoryList=({data=[]})=>{
    const style={
        backgroundColor: '#ddd',
        border:"0px",
        borderLeft:"5px solid #41a447",
        marginBottom:"5px",
        overflow: 'hidden',
        cursor:"pointer",
        fontSize:"16px",
        lineHeight:"1.2em",
        color:"#1e1e1e",
        fontFamily:"sans-serif"
    }
    const itemlist=data.map((item,index)=>{
        const header=item.title;
        return(
            <Panel header={header} key={index} style={style}>
                {item.text}
            </Panel>
        )
    })
    return(
        <div>
        <div style={{borderBottom:"1px solid rgb(124, 121, 121)",backgroundColor:"rgb(221, 221, 221)",paddingBottom:"10px"}}>
            <span ><span style={{marginLeft:"80px"}}>日期</span><span style={{marginLeft:"200px"}}>描述</span></span>
        </div> 
        <Collapse accordion style={{paddingTop:"5px"}} className="history">
            {itemlist}
        </Collapse>
        </div>
    )}
// 模糊搜索结果展示组件
const Showlist=({data=[],click=(e)=>{console.log(e.target.id)},over=(e)=>{e.target.style.color="red"},leave=(e)=>{e.target.style.color=""},display="none"})=>{
    let lists=data.map((item,index)=><li style={{cursor:"pointer"}} key={index}><span id={index}  onClick={click} onMouseOver={over} onMouseLeave={leave}>{item.username}</span><span style={{display:"inlineblock",marginLeft:"30px",color:"#97a8be"}}>{item.message}</span></li>)
    return (
        <ul style={{maxHeight:"150px",overflow:"auto",position:"absolute",zIndex:"99",width:"300px" ,background:'#ddd',display:display}}>
            {lists}
        </ul>
    )
}
export {Itemlist,Showlist,HistoryList};