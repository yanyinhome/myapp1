import React from "react";
import {Tag} from "element-react";
// 标题组件
const Headtitle=({children="标题"})=><h3 style={{borderLeft:"5px solid #000",fontWeight:"500",padding:"1px 5px",fontSize:"20px",margin:"10px 0"}}>{children}</h3>
// 子标题组件
const ChildrenTitle=({children="子标题"})=><h3 style={{fontWeight:"400",fontSize:"14px",margin:"10px 0",padding:"1px"}}>{children}</h3>
// 列表子组件
const ChildrenDiv=({children="次级列表"})=><div style={{color:"#333",backgroundColor:"#f5f5f5",borderColor:"#ddd",padding:"10px",borderBottom:"1px solid transparent",borderTopRightRadius:"3px",borderTopLeftRadius:"3px",margin:"5px"}}>{children}</div>
// 显示结果组件
const ResultShow=({children="暂无结果",visible="block",hash=""})=>{return(
    <div style={{height:"150px",display:visible}}>                                                   
    <Tag type="primary">{children}</Tag><br></br><Tag type="gray">交易哈希：{hash}</Tag>
     </div>
)}
// 查询结果显示组件
const Changeshow=({children="结果",visible="block",onclick})=><span onClick={onclick}><Tag style={{display:visible,cursor:"pointer"}}>{children}</Tag> </span>                                
// 历史记录列表
const HistoryList=({message={message1:"冻结",message2:"解冻"},data=[{date:"",username:"",state:"",message:"暂无结果"}]})=>{
    const lilist=data.map((item,index)=>{
        if(item.state===1){
            return <li key={index}>{item.date}<Tag style={{marginLeft:"10px"}} type="gray"> {message.message1} </Tag><Tag style={{margin:"0 10px"}} type="primary">{item.username}</Tag>{item.message}</li>
        }else{
            return <li key={index}>{item.date}<Tag style={{marginLeft:"10px"}} type="danger"> {message.message2} </Tag><Tag style={{margin:"0 10px"}} type="primary">{item.username}</Tag>{item.message}</li>
        }
    })
    return <ul>{lilist}</ul>
}
export {Headtitle,ChildrenTitle,ChildrenDiv,ResultShow,Changeshow,HistoryList}