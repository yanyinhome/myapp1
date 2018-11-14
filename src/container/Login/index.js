import React,{Component} from "react";
import {Button,Layout,Form,Input,Notification}  from "element-react";
import "element-theme-default";
import userService from "../../services/userServices";
import "../Login/Rejist/index.css"
export default class Login extends Component{
    constructor(props) {
        super(props);      
        this.state = {
        userstate:{
            username:"登录",
            load:"false",
        },
          form: {
            username: '',
            pass: ''
          },
          rules: {
            pass: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入密码'));
                } else {
                    let number=/[0-9a-z]/;
                    if(!number.test(value)){
                        callback(new Error("请输入正确的密码"))
                    }
                  callback();
                }
              } }
            ],
            username: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
            ]
          }
        };
      }
      componentDidMount(){
        // 验证，做一个判断，如果已经登录则跳转
      }
      handleSubmit(e) {
        e.preventDefault();
      
        this.refs.form.validate((valid) => {
          if (valid) {
            userService.Login({
              username:this.state.form.username,
              password:this.state.form.pass,
          }).then((data)=>{
            if(data){
              Notification.success({
                title:"提示",
                message:data.message,
                duration: 1000,
                onClose:()=>{
                  this.props.history.push('/')
                }
              });
              
            }else{
              Notification.error({title:"提示",message:"用户名或者密码错误",duration: 2000});
            }                 
          }).catch((err)=>{
              console.log("登录失败res",err)
          })
          } else {
            console.log('error submit!!');
            return false ;
          }
        });
      }
      toregist=()=>{
        this.props.history.push("/regist")
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
      
      render() {
        return (
             <div>
                <div className="wrapper"><header><h1 className="top"> 欢迎来到HJB Token，会员专属钱包</h1></header></div>
                <Layout.Row >
                  <Layout.Col span="24">
                 <div style={{width:"20%",margin:"0 auto"}}>
                 <h1 style={{textAlign:"center",padding:"0 30px",margin: "10px 0 0px 0",fontSize:"28px",fontWeight:"normal"}}>登录</h1>   
                    <Form ref="form"  model={this.state.form} rules={this.state.rules} labelWidth="100" labelPosition="top">
                        <Form.Item prop="username" label="昵称">
                        <Input  size="large" value={this.state.form.username} onChange={this.onChange.bind(this, 'username')} autoComplete="off" placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item  prop="pass" label="密码">
                        <Input size="large" type="password" value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} placeholder="请输入密码"></Input>
                        </Form.Item>
                        <Form.Item>
                        <Layout.Row>
                            <Layout.Col span="8" offset="8">                                
                                <Button style={{width:"100%",height:"50px",fontSize:"18px"}} type="primary" onClick={this.handleSubmit.bind(this)}>登录</Button>                                
                            </Layout.Col>
                        </Layout.Row>
                        </Form.Item>
                    </Form>
                 </div>
                </Layout.Col>
              </Layout.Row>
              <div className="Tologin"><span>第一次登录?</span><a onClick={this.toregist}>注册</a></div>
             </div>
        )
      }
      
}