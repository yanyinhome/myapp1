import React,{Component} from "react";
import{Collapse} from "element-react";
import EthService from "../../../services/EthServices";
import HjbService from "../../../services/HjbService";
import "element-theme-default";
export default class Balance extends Component{
    constructor(props){
        super(props);
        this.state={
            address:"暂无",
            froze:"flase",
            ETH:{
                number:"0"
            },
            HJB:{
                number:"0"
            },
        }
    }
    componentDidMount(){
        const self=this;
        EthService.EthAccounts().then(
            res=>{
                if(res){
                    if(Object.keys(res.data).length!==0){
                        self.setState({address:res.data.address,ETH:{number:res.data.eth_number}})
                    } 
                }
                   
            }
        )
        HjbService.HjbAccounts().then(
            res=>{
                if(res){
                    if(Object.keys(res.data).length!==0){
                        console.log(res.data)
                        self.setState({address:res.data.address,HJB:{number:res.data.hjb_number?res.data.hjb_number:0}})
                    } 
                }
                   
            }
        )
    }
    render(){
        return(
            <Collapse>
                <Collapse.Item title={<div style={{display:"inline"}}><span>ETH  <i className="header-icon el-icon-information"></i></span><span style={{float:"right",marginRight:"10rem"}}>{this.state.ETH.total_number}</span></div>}>
                    <div>现有以太币数量：{this.state.ETH.number}</div>
                    <div>账户地址：{this.state.address}</div>
                </Collapse.Item>
                <Collapse.Item title={<span>HJB  <i className="header-icon el-icon-information"></i></span>}>
                    <div>现有汇金币数量：{this.state.HJB.number}</div>
                    <div>账户地址：{this.state.address}</div>
                </Collapse.Item>
            </Collapse>
        )
    }
}