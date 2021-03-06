import React,{Component} from "react";
import {Button,Layout,Form,Input,Notification}  from "element-react";
import "element-theme-default";
import adminService from "../../../services/adminServices";
import {bindenter} from "../../../fun";
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
        //绑定回车
        bindenter.bindenter(this.keydown)
      }
      // 回车事件
      keydown=(e)=>{        
        if(bindenter.ifenter(e)){
            this.handleSubmit(e)
        }       
    }
      componentWillUnmount(){
        // 解除绑定的回车事件
        bindenter.removebindenter(this.keydown)
      }
      handleSubmit(e) {
        e.preventDefault();
       
        this.refs.form.validate((valid) => {
          if (valid) {
            adminService.Login({
              username:this.state.form.username,
              password:this.state.form.pass,
          }).then((data)=>{
            if(data){
              Notification.success({
                title:"提示",
                message:data.message,
                duration: 1000,
                onClose:()=>{
                  this.props.history.push(`${this.props.match.url}/control`)
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
          <div style={{marginTop:"10rem"}}>
              <Layout.Row >
                  <Layout.Col span="8" offset="8">
                    <div>
                    <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
                        <Form.Item prop="username" >
                        <Input value={this.state.form.username} onChange={this.onChange.bind(this, 'username')} autoComplete="off" placeholder="请输入手机或者邮箱" style={{width:"15rem"}}/>
                        </Form.Item>
                        <Form.Item prop="pass">
                        <Input type="password" value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} placeholder="请输入密码" style={{width:"15rem"}}></Input>
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)} style={{width:"15rem"}}>管理员登录</Button>
                        </Form.Item>
                    </Form>
                    </div>
                </Layout.Col>
              </Layout.Row>
          </div>
        )
      }
      
}