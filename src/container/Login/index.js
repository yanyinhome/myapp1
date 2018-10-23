import React,{Component} from "react";
import {Button,Layout,Form,Input}  from "element-react";
import "element-theme-default";
export default class Login extends Component{
    constructor(props) {
        super(props);      
        this.state = {
        userstate:{
            username:"登录",
            load:"false",
        },
          form: {
            pass: '',
            username: ''
          },
          rules: {
            pass: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入密码'));
                } else {
                    let number=/^[0-9]{8}$/;
                    if(!number.test(value)){
                        callback(new Error("请输入正确的密码"))
                    }
                  callback();
                }
              } }
            ],
            username: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { validator: (rule, value, callback) => {
                let number=/^13[0-9]{9}$/;
                let email=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                if(number.test(value)||email.test(value)){
                    callback()
                }else{
                    callback("用户名格式不正确")
                }
              }, trigger: 'change' }
            ]
          }
        };
      }
      
      handleSubmit(e) {
        e.preventDefault();
      
        this.refs.form.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
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
                        <Input value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} placeholder="请输入密码" style={{width:"15rem"}}></Input>
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)} style={{width:"15rem"}}>登录</Button>
                        </Form.Item>
                    </Form>
                    </div>
                </Layout.Col>
              </Layout.Row>
          </div>
        )
      }
      
}