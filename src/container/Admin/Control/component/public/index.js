import React from "react";
// 标题组件
const Headtitle=({children="标题"})=><h3 style={{borderLeft:"5px solid #000",fontWeight:"500",padding:"1px 5px",fontSize:"20px",margin:"10px 0"}}>{children}</h3>
// 子标题组件
const ChildrenTitle=({children="子标题"})=><h3 style={{fontWeight:"400",fontSize:"14px",margin:"10px 0",padding:"1px"}}>{children}</h3>
// 列表子组件
const ChildrenDiv=({children="次级列表"})=><div style={{color:"#333",backgroundColor:"#f5f5f5",borderColor:"#ddd",padding:"10px",borderBottom:"1px solid transparent",borderTopRightRadius:"3px",borderTopLeftRadius:"3px",margin:"5px"}}>{children}</div>
export {Headtitle,ChildrenTitle,ChildrenDiv}