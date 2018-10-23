import React,{Component} from "react";
import{Collapse,Tooltip} from "element-react";
import "element-theme-default";
export default class Balance extends Component{
    constructor(props){
        super(props);
        this.state={
            ETH:{
                total_number:"30",
                free_number:"10",
                froze_number:"20",
            },
            HJB:{
                address:"null",
                number:"100"
            },
        }
    }
    componentDidMount(){
        // 从服务器获取数据并渲染
    }
    render(){
        return(
            <Collapse>
                <Collapse.Item title={<div style={{display:"inline"}}><span>ETH  <i className="header-icon el-icon-information"></i></span><span style={{float:"right",marginRight:"10rem"}}>{this.state.ETH.total_number}</span></div>}>
                    <div>现有</div>
                    <div>冻结</div>
                </Collapse.Item>
                <Collapse.Item title={<span>HJB  <i className="header-icon el-icon-information"></i></span>}>
                    <div>address:0</div>
                </Collapse.Item>
            </Collapse>
        )
    }
}