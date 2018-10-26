import React,{Component} from "react";
import{Layout} from "element-react";
import "element-theme-default";
import userService from '../../services/userServices'
import './Setting.css';
export default class Seting extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"暂无",
            address:"address",
        }
    }
    componentDidMount(){
        const self=this;
        // 从服务器调用是否登录的验证并更改状态
        userService.userInfo().then(
            res=>{
               if(res){
                if(Object.keys(res.data).length!==0){
                    self.setState({username:res.data.username,address:res.data.address})
                }     
               }         
            })
    }
    render(){
        return(
            <div style={{width:"1200px",margin:"auto",marginTop:"30px"}}>
            <Layout.Row>
                <Layout.Col span="6" style={{paddingLeft:"1rem",paddingRight:"1rem"}}>
                    <div><a className="Vertical-tag">个人信息</a></div>
                    {/* <div><a className="Vertical-tag">1信息</a></div>
                    <div><a className="Vertical-tag">2信息</a></div>
                    <div><a className="Vertical-tag">3信息</a></div>  */}
                </Layout.Col>
                <Layout.Col span="18" style={{paddingLeft:"1rem",paddingRight:"1rem"}}>
                    <div className="grid-content bg-purple-light">
                        <h4>账户设置</h4>
                        <div className="section">
                            <div className="name">用户名</div>
                            <div className="user">
                                <div className="user-name">{this.state.username}</div>
                                <div className="user-compile"><a className="compile">编辑</a></div>
                                <div style={{clear:"both"}}></div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="name">地址</div>
                            <div className="user-name">{this.state.address}</div>
                        </div>
                    </div>
                    
                </Layout.Col>
            </Layout.Row>            
           </div>
        )
    }
}