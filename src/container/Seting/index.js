import React,{Component} from "react";
import{Layout,Input,Button,Form,Notification} from "element-react";
import "element-theme-default";
import userService from '../../services/userServices';
import {bindenter,CheckNickName} from "../../fun";
export default class Seting extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"暂无",
            address:"address",
            write_display:"inline-block",
            nick_input_display:"none",
            form:{
                nickname:"",
                pass:""
            },
            // 昵称验证结果
            checkresult:{
                buttonvasible:true,
                message:"",
                type:""
              }, 
            // 提交按钮状态
            show:{
                disable:true,
                color:"#f1f1f1"
               },
        }
    }
    // 修改用户名
    write_username=()=>{
        this.setState({
            write_display:"none",
            nick_input_display:"block"
        })
    }
    // 提交更改
    handlesubmit=(e)=>{
        e.preventDefault();
        const self=this;
        userService.nameChange(this.state.form).then(
            res=>{
                console.log("res",res)
                if(res.data.result){
                 Notification.success({
                     title:"提示",
                     message:res.message,
                     duration:2000,
                     onClose:()=>{
                        self.setState({
                            write_display:"inline-block",
                            nick_input_display:"none",
                            username:this.state.form.nickname
                        }) 
                     }
                 }) 
                }else{
                    Notification.info({
                        title:"提示",
                        message:res.message,
                        duration:2000,
                    })
                }
            }
        ).catch(err=>{console.log(err)})

    }
    // 取消设置
    handlhide=()=>{
        console.log(this.state)
        this.setState({
            write_display:"inline-block",
            nick_input_display:"none",
            username:this.state.username
        })
    }
    // 更新form状态
    onChange(key, value) {
        this.setState({form:Object.assign({},this.state.form,{[key]:value})})
      }
    // 修改昵称时判断是否符合要求
    changenickname(key,value){
        this.setState({form:Object.assign({},this.state.form,{[key]:value})},()=>{
            CheckNickName(this.state.form.nickname).then(
                res=>{if(res.data.result.length===0){
                    this.setState({checkresult:Object.assign({},this.state.checkresult,{message:"昵称可以使用",buttonvasible:false,type:"blue"})})
                    if(this.state.form.nickname.length!==0&&this.state.form.pass.length!==0){
                        this.setState({show:{disable:false,color:"rgb(52, 106, 169)"}})
                    }else{
                        this.setState({show:{disable:true,color:"#f1f1f1"}})  
                    }
                  }else{
                    this.setState({checkresult:Object.assign({},this.state.checkresult,{message:"昵称已经被占用",buttonvasible:true,type:"red"})})
                  }
                }
            )
        })       
    }
    componentDidMount(){
        // 绑定回车事件
        bindenter.bindenter(this.keydown)
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
    // 回车事件
    keydown=(e)=>{        
    if(bindenter.ifenter(e)){
        this.handlesubmit(e)
    }  
    } 
    // 解除回车绑定
    componentWillMount(){
    bindenter.removebindenter(this.keydown);
    }
    render(){
        return(
        <div style={{width:"1200px",margin:"auto",marginTop:"30px"}}>
            <Layout.Row>
                <Layout.Col span="6" style={{paddingLeft:"1rem",paddingRight:"1rem"}}>
                    <div style={{background:"#346aa9",color:"#f3f3f3",display:"block",borderRadius:"2px",padding:"10px",margin:"8px 0 3px"}}>个人信息</div>
                    {/* <div><a className="Vertical-tag">1信息</a></div>
                    <div><a className="Vertical-tag">2信息</a></div>
                    <div><a className="Vertical-tag">3信息</a></div>  */}
                </Layout.Col>
                <Layout.Col span="18" style={{paddingLeft:"1rem",paddingRight:"1rem"}}> 
                   <div style={{color:"#1e1e1e"}}>
                   <h3 style={{fontSize:"18px",padding:"10px 0",fontWeight:"500",borderBottom:"1px solid #ccccca"}}>账户设置</h3>
                        <h4 style={{color:"#888",margin:"0 0 20px",paddingTop:"20px"}}>用户名</h4>
                        <p style={{paddingBottom:"30px",color:"#1e1e1e"}}>{this.state.username}<a style={{color:"#428bca",display:this.state.write_display,marginLeft:"30px"}} onClick={this.write_username}>编辑</a></p>
                        <Layout.Row>
                        <Layout.Col span="12">
                            <Form  model={this.state.form} labelWidth="120" onSubmit={this.handlesubmit} labelPosition="top" style={{display:this.state.nick_input_display}}>
                                <Form.Item label="输入新昵称" >
                                    <Input type="text" value={this.state.form.nickname} onChange={this.changenickname.bind(this,"nickname")}></Input>
                                    <span style={{color:this.state.checkresult.type}}>{this.state.checkresult.message}</span>
                                </Form.Item>
                                <Form.Item label="输入密码">
                                    <Input type="password" value={this.state.form.pass} onChange={this.changenickname.bind(this,"pass")}></Input>
                                </Form.Item>
                                <Form.Item>
                                    <Button disabled={this.state.show.disable} style={{width:"30%",background:this.state.show.color,color:"#fff"}}  onClick={this.handlesubmit}>提交</Button>
                                    <Button style={{width:"30%",background:"rgb(52, 106, 169)"}}  onClick={this.handlhide}>取消</Button>
                                </Form.Item>
                            </Form>         
                        </Layout.Col>
                    </Layout.Row>      
                        <hr/>
                        <h4 style={{color:"#888",margin:"0 0 20px",paddingTop:"20px"}}>地址</h4>
                        <p style={{paddingBottom:"30px",color:"#1e1e1e"}}>{this.state.address}</p>
                   </div>           
                              
                </Layout.Col>
            </Layout.Row>            
        </div>
       
        )
    }
}