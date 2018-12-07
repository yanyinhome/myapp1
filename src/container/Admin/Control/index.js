import React,{Component} from "react";
import {Button,Layout,Menu,Popover,Notification}  from "element-react";
import "element-theme-default";
import AdminService from "../../../services/adminServices";
import fileService from "../../../services/fileServices";
import {Route } from 'react-router-dom';
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
// 修改LOGO组件
const LogoChange=Loadable({
  loader:()=>import("./component/LogoChange"),
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
            username:"未登录",
            loadout_display:"none",
            visible:null,
            logo:'http://192.168.124.9:3005/uploads/logo.png',
      }}
      componentDidMount(){
        AdminService.getadmininfo().then(res=>{
          const {code,message,data}=res;
          if(code===0){
            Notification.info({
              title:"提示",
              message:message,
              duration: 1000,
              onClose:()=>{
                this.props.history.push('/admin')
              }
            });
          }else{
            this.setState({username:data.username})
          }
        }).catch(err=>{
          console.log(err)
        })
      //查询logo地址
          this.getLogoAddress();
      }
      //查询logo地址
    getLogoAddress=()=>{
        fileService.getLogoAddress().then(
            res=>{
                this.setState({logo:res.data.result.url})
            }
        ).catch(err=>{console.log(err)})
    }
      // loadout=()=>{
      //   this.setState({loadout_display:"block"})
      // }
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
        // console.log(key)
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
      onOut=()=>{
        this.setState({
          visible: false
        });
        AdminService.logout().then(
          res=>{
            if(res.code===1){
                this.props.history.push("/admin");
            }
          }
        ).catch(err=>{console.log(err)})
      }
      render() {
        return (
              <Layout.Row>
                  <Layout.Col span="3" style={{backgroundColor:"#324157",boxShadow:"-4px 0 6px rgba(0,0,0,.15) inset",height:"100%",position:"fixed",zIndex:"999",minWidth:"220px"}}>
                    <img src={this.state.logo} alt="logo" style={{width:"auto",height:"50px",display:"block",margin:"20px auto"}}></img>
                    <h5 style={{padding:"8px 15px",margin:"10px",background: "rgba(255,255,255,.4)",borderRadius:"4px"}}>{this.state.username}&nbsp;&nbsp;管理员 
                    <span style={{display:"inline-block",float:"right",marginRight:"20px",cursor:"pointer"}} onClick={()=>{console.log("1")}}>退出</span>
                    {/* <Popover placement="bottom" width="160" trigger="click" visible={this.state.visible}  content={(
                      <div>
                        <h3>警告</h3>
                        <p>确定要退出吗</p>
                        <div style={{textAlign: 'right', margin: 0}}>
                          <Button size="mini" type="text" onClick={this.onDismiss.bind(this)}>取消</Button>
                          <Button type="primary" size="mini" onClick={this.onOut.bind(this)}>确定</Button>
                        </div>
                      </div>
                    )}>
                    <span style={{display:"inline-block",float:"right",marginRight:"20px",cursor:"pointer"}} onClick={()=>{console.log("1")}}>退出</span>
                    </Popover> */}
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
                          <Menu.Item index="3-1">修改LOGO</Menu.Item>
                          <Menu.Item index="3-2">后台用户</Menu.Item>
                      </Menu.SubMenu>
                    </Menu>
                  </Layout.Col>
                  <Layout.Col span="21" style={{minHeight:"940px",padding:"20px 25px 200px",background:"#ddd",height:"100%",marginLeft:"220px"}}>
                    <Route path={`${this.props.match.url}`} exact component={TokenShow}></Route>
                    <Route path={`${this.props.match.url}/token1`}  component={FozenAccount}></Route>
                    <Route path={`${this.props.match.url}/token2`}  component={ SetPrice}></Route>
                    <Route path={`${this.props.match.url}/token3`}  component={ MintToken}></Route>
                    <Route path={`${this.props.match.url}/token4`}  component={ SetGAS}></Route>
                    <Route path={`${this.props.match.url}/seting1`}  component={LogoChange}></Route>
                    <Route path={`${this.props.match.url}/seting2`}  component={ AdminAccounts}></Route>
                  </Layout.Col>
              </Layout.Row>
        )
      }
      
}