import React,{Component} from 'react';
import './bodycontent.css';
import{Head,Foot} from "./Head_Foot";
import{Button,Tabs,Form,Input} from "element-react";
import "element-theme-default";
import axios from "axios";
import { usercontext } from './context';
axios.defaults.withCredentials = true;
// 注册组件
class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            tabid:1,
            form:{
                telnumber:"",
                pass:"",
                check:"",
                emailaddress:""
            },
            rules:{
                telnumber:[{
                    required:"ture",
                    message:"手机号不能为空",
                },{
                    validator:(rule, value, callback)=>{
                        let number=/^13[0-9]{9}$/;
                        if(!number.test(value)){
                            callback(new Error("请输入正确格式的电话号码"))
                        }else{
                            callback()
                        }
                        callback()
                }
                }],
                emailaddress:[{
                    required:"ture",
                    message:"邮箱不能为空",
                    trigger:"blur",
                },{
                    validator:(rule, value, callback)=>{
                        let email=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                        if(!email.test(value)){
                            callback(new Error("请输入正确格式的电话号码"))
                        }else{
                            callback()
                        }
                        callback();
                }
                }],
                pass:[{
                    required:"ture",
                    message:"密码不能为空",
                    trigger:"blur",
                },{
                    validator:(rule, value, callback)=>{
                        let number=/^[0-9]{8}$/;
                        if(!number.test(value)){
                            callback(new Error("密码为8位数字"))
                        }else{
                            callback()
                            // if (this.state.form.check !== '') {
                            //     console.log(this.state.tabid)
                            //     // this.refs.form_tel.validateField('check');
                            //     // this.refs.form_mail.validateField('check');
                            //   }
                        }
                        callback();
                },trigger:"blur"
                }],
                check:[{
                    required:"ture",
                    message:"密码不能为空",
                    trigger:"blur",
                },{
                    validator: (rule, value, callback) => {
                        if (value === '') {
                          callback(new Error('请输入密码'));
                        } else if (value !== this.state.form.pass) {
                          callback(new Error('两次输入密码不一致!'));
                        } else {
                          callback();
                        }
                      },trigger:"blur"
                }],
            }
        }
    }
    // axiospost 函数
    axiospost=(option)=>{
        const self=this; 
        axios.post(option.url,option.data).then(function(response) {
            if(response){
                if(response.data==="ture"){
                    alert("注册成功"); 
                    self.props.history.push("/");                
                } else{
                    console.log(response)
                }               
                
            }
        }).catch(error => console.error('Error:', error));
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const option={
            url:"http://localhost:3005/users/children",
            data:this.state.form,
        }
        this.axiospost(option);
        // this.axiospost(option1);
    }
    handleReset=(e)=>{
        e.preventDefault();
        const form =this.state.form;
        for(let item in form){
            form[item]=""
        }
        this.setState(form)
        this.refs.form_tel.resetFields();
        this.refs.form_mail.resetFields();
    }
    onChange(key,value){
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
          });
    }
    render(){
        return(
            <div className="container register">
                <h2>欢迎注册</h2>
                <Tabs activeName="1" onTabClick={ (tab) => {this.setState({tabid:tab.props.name})}} {...this.props}>
                    <Tabs.Pane label="手机注册" name="1">
                        <Form ref="form_tel" rules={this.state.rules} labelPosition="top" model={this.state.form} labelWidth="80" >
                        <Form.Item label="手机号码" prop="telnumber">
                        <Input value={this.state.form.telnumber} onChange={this.onChange.bind(this,'telnumber')} autoComplete="off" placeholder="请输入11位电话号码" />
                        </Form.Item>
                        <Form.Item label="登录密码" prop="pass"> 
                        <Input type="password" value={this.state.form.pass} onChange={this.onChange.bind(this,'pass')} autoComplete="off" placeholder="请输入8位数字密码" />
                        </Form.Item>
                        <Form.Item label="确认密码" prop="check">
                        <Input type="password" value={this.state.form.check} onChange={this.onChange.bind(this,'check')} autoComplete="off" placeholder="请再次输入密码"/>
                        </Form.Item>
                        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                        <Button  onClick={this.handleReset}>重置</Button>
                        </Form>
                    </Tabs.Pane>
                    <Tabs.Pane label="邮箱注册" name="2">
                    <Form ref="form_mail" rules={this.state.rules} model={this.state.form} labelPosition="top" labelWidth="80" >
                        <Form.Item label="邮箱地址" prop="emailaddress">
                        <Input value={this.state.form.emailaddress} onChange={this.onChange.bind(this,'emailaddress')} autoComplete="off" placeholder="请输入正确的邮箱地址"/>
                        </Form.Item>
                        <Form.Item label="登录密码" prop="pass"> 
                        <Input type="password" value={this.state.form.pass} onChange={this.onChange.bind(this,'pass')} autoComplete="off" placeholder="请输入8位数字密码"/>
                        </Form.Item>
                        <Form.Item label="确认密码" prop="check">
                        <Input type="password" value={this.state.form.check} onChange={this.onChange.bind(this,'check')} autoComplete="off" placeholder="请再次输入密码"/>
                        </Form.Item>
                        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                        <Button  onClick={this.handleReset}>重置</Button>
                        </Form>
                    </Tabs.Pane>
                </Tabs>                
            </div>
        )
    }
}
// withRouter(Register);
// 注册导出组件
class RegisterExport extends Component {
    changeroute(){
        console.log(this)
        this.props.history.push("/qukuai");
    }
    render(){
        console.log(document.cookie)
        return(
            <div>
                <usercontext.Consumer>
                    {data=><Head loadstate={data.username}/>}
                </usercontext.Consumer>
                <Register changeroute={this.changeroute} history={this.props.history}/>
                <Foot/>
            </div>
        )
    }
}
export default RegisterExport;
// export default withRouter(RegisterExport);