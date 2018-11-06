import React,{Component} from "react";
import {Button,Layout,Menu,Popover}  from "element-react";
import "element-theme-default";
import HjbService from "../../../services/HjbService";
import {Route } from 'react-router-dom';
import logo from '../../../../static/img/logo.png';
import Loadable from 'react-loadable';
const Loading = () => <div>Loading...</div>;
const TokenShow=Loadable({
  loader:()=>import("./component/TokenShow"),
  loading:Loading}); 
  // 设置买卖价格组件
const SetPrice=Loadable({
  loader:()=>import("./component/SetPrice"),
  loading:Loading}); 
  // 设置阈值信息组件
const SetGAS=Loadable({
  loader:()=>import("./component/SetGas"),
  loading:Loading}); 
  // 代币增发组件
const MintToken=Loadable({
  loader:()=>import("./component/MintToken"),
  loading:Loading}); 
// 代币冻结/解冻组件
const FozenAccount=Loadable({
  loader:()=>import("./component/FrozenAccount"),
  loading:Loading}); 
// 角色权限组件
const Permission=Loadable({
  loader:()=>import("./component/Permission"),
  loading:Loading}); 
// 后台用户展示组件
const AdminAccounts=Loadable({
  loader:()=>import("./component/AdminAccounts"),
  loading:Loading}); 
// 代币管理组件
export default class Control extends Component{
    constructor(props) {
        super(props);      
        this.state={
            username:"admin",
            loadout_display:"none",
            visible:null
      }}
      componentDidMount(){
        // 验证，做一个判断，如果已经登录则跳转
        // console.log(this.props.match.url)
      }
      loadout=()=>{
        this.setState({loadout_display:"block"})
      }
      handleReset(e) {
        e.preventDefault();
      
        this.refs.form.resetFields();
      }
      
      onChange(key, value) {
        this.setState({
          form: Object.assign({}, this.state.form, { [key]: value })
        });
      }
      onOpen=()=>{

      }
      onClose=()=>{

      }
      onSelect=(key,e)=>{
        console.log(key)
          switch (key) {            
              case "1":
              this.props.history.push(`${this.props.match.url}`)
                  break;
              case "2-1":
              this.props.history.push(`${this.props.match.url}/token1`)
                  break;
              case "2-2":
              this.props.history.push(`${this.props.match.url}/token2`)
                  break;
              case "2-3":
              this.props.history.push(`${this.props.match.url}/token3`)
                  break;
              case "2-4":
              this.props.history.push(`${this.props.match.url}/token4`)
                  break;
              case "3-1":
              this.props.history.push(`${this.props.match.url}/seting1`)
                  break;        
              case "3-2":
              this.props.history.push(`${this.props.match.url}/seting2`)
                  break;        
              default:
              console.log(this)
                  break;
          }
      }
      onDismiss=()=>{
        this.setState({
          visible: false
        });
      }
      render() {
        return (
              <Layout.Row>
                  <Layout.Col span="3" style={{backgroundColor:"#324157",boxShadow:"-4px 0 6px rgba(0,0,0,.15) inset",height:"100%",position:"fixed",zIndex:"999",minWidth:"220px"}}>
                    <img src={logo} alt="logo" style={{width:"auto",height:"50px",display:"block",margin:"20px auto"}}></img>
                    <h5 style={{padding:"8px 15px",margin:"10px",background: "rgba(255,255,255,.4)",borderRadius:"4px"}}>{this.state.username}&nbsp;&nbsp;管理员 
                    <Popover placement="bottom" width="160" trigger="click" visible={this.state.visible}  content={(
                      <div>
                        <h3>警告</h3>
                        <p>确定要退出吗</p>
                        <div style={{textAlign: 'right', margin: 0}}>
                          <Button size="mini" type="text" onClick={this.onDismiss.bind(this)}>取消</Button>
                          <Button type="primary" size="mini" onClick={this.onDismiss.bind(this)}>确定</Button>
                        </div>
                      </div>
                    )}>
                    <span style={{display:"inline-block",float:"right",marginRight:"20px",cursor:"pointer"}} onClick={()=>{console.log("1")}}>退出</span>
                    </Popover>
                    </h5>
                    <Menu  className="el-menu-vertical-demo" theme="dark" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)} onSelect={this.onSelect}>
                      <Menu.Item index="1"><i className="el-icon-menu"></i>控制面板</Menu.Item>
                      <Menu.SubMenu index="2" title={<span><i className="el-icon-message"></i>代币管理</span>}>
                          <Menu.Item index="2-1">账户冻结/解冻</Menu.Item>
                          <Menu.Item index="2-2">设置买入/卖出价格</Menu.Item>
                          <Menu.Item index="2-3">代币增发</Menu.Item>
                          <Menu.Item index="2-4">设置阈值信息</Menu.Item>
                      </Menu.SubMenu>
                      <Menu.SubMenu index="3" title={<span><i className="el-icon-setting"></i>系统设置</span>}>
                          <Menu.Item index="3-1">权限角色</Menu.Item>
                          <Menu.Item index="3-2">后台用户</Menu.Item>
                      </Menu.SubMenu>
                    </Menu>
                  </Layout.Col>
                  <Layout.Col span="21" style={{position:"fixed",padding:"20px 25px 20px",background:"#ddd",height:"100%",marginLeft:"220px"}}>
                    <Route path={`${this.props.match.url}`} exact component={TokenShow}></Route>
                    <Route path={`${this.props.match.url}/token1`}  component={FozenAccount}></Route>
                    <Route path={`${this.props.match.url}/token2`}  component={ SetPrice}></Route>
                    <Route path={`${this.props.match.url}/token3`}  component={ MintToken}></Route>
                    <Route path={`${this.props.match.url}/token4`}  component={ SetGAS}></Route>
                    <Route path={`${this.props.match.url}/seting1`}  component={ Permission}></Route>
                    <Route path={`${this.props.match.url}/seting2`}  component={ AdminAccounts}></Route>
                  </Layout.Col>
              </Layout.Row>
        )
      }
      
}