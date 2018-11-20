import React,{Component} from "react";
import {Input,Button,Form,Layout,Notification} from "element-react";
import './index.css'
import "element-theme-default";
import userServices from "../../../services/userServices";
import {bindenter,CheckNickName} from "../../../fun"
export default class Regist extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
          checkresult:{
            buttonvasible:true,
            message:"",
            type:""
          },         
          form: {
            nickname: '',
            pass: '',
            checkPass: '',           
          },
          rules: {
            pass: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入密码'));
                } else {
                  if (this.state.form.checkPass !== '') {
                    this.refs.form.validateField('checkPass');
                  }
                  callback();
                }
              } }
            ],
            checkPass: [
              { required: true, message: '请再次输入密码', trigger: 'blur' },
              { validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'));
                } else if (value !== this.state.form.pass) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
              } }
            ],
            nickname: [
              { required: true, message: '请填写昵称', trigger: 'blur' },
            ]
          }
        };
      }
      // 绑定回车事件
      componentDidMount(){
        bindenter.bindenter(this.keydown)
      }
      // 解除回车事件
      componentWillMount(){
        bindenter.removebindenter(this.keydown);
      }
      // 回车事件
      keydown=(e)=>{        
        if(bindenter.ifenter(e)){
          this.handleSubmit(e)
       }    
      }
      // 转入登录页面
      tologin=()=>{
          this.props.history.push("/login")
      }
      // 提交
      handleSubmit(e) {
        e.preventDefault();    
        this.refs.form.validate((valid) => {
          if (valid) {
            userServices.register(
                {nickname:this.state.form.nickname,
                password:this.state.form.pass}
            ).then(
                result=>{
                    if(result.code===1){
                        Notification({
                            title: '注册成功',
                            message: result.message,
                            type: 'success',
                            duration:2500,
                            onClose:()=>{
                                this.props.history.push("/login")    
                            }
                          })
                    }else{
                        Notification.error({
                            title: '错误',
                            message: result.message,
                          });
                    }
                }
            ).catch(err=>{
                console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }     
      // form表单更改函数
      onChange(key, value) {
        this.setState({
          form: Object.assign({}, this.state.form, { [key]: value })
        });
      };
        //昵称检验
      checkNickName=(value)=>{
        if(value.length!==0){
          CheckNickName(value).then(
            res=>{if(res.data.result.length===0){
              this.setState({checkresult:Object.assign({},this.state.checkresult,{message:"昵称可以使用",buttonvasible:false,type:"blue"})})
            }else{
              this.setState({checkresult:Object.assign({},this.state.checkresult,{message:"昵称已经被占用",buttonvasible:true,type:"red"})})
            }
          }
          ).catch(err=>{
            console.log(err)
          })
        }       
      }
      // 昵称change函数
      Change(key,value){
        this.onChange(key,value);
        this.checkNickName(value);
      }
    render(){
        return(
            <div>
                <div className="wrapper"><header><h1 className="top"> 欢迎来到HJB Token，会员专属钱包</h1></header></div>
                <Layout.Row style={{width:"20%",margin:"0 auto 10px",backgroundColor:"#f3f3f3",padding:"20px 30px",border:"1px solid #ccc"}}>
                    <Layout.Col span="24"><div>
                        <h1 style={{textAlign:"center",padding:" 0 0 10px",margin: "10px 0 0px 0",fontSize:"28px",fontWeight:"normal"}}>注册</h1>   
                        <hr style={{marginBottom:"20px"}}/>
                        <Form  ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm" labelPosition="top">
                            <Form.Item label="昵称" prop="nickname">
                                <Input size="large" value={this.state.form.nickname} onChange={this.Change.bind(this, 'nickname')}></Input>
                                <span style={{color:this.state.checkresult.type}}>{this.state.checkresult.message}</span>
                            </Form.Item>
                            <Form.Item label="密码" prop="pass">
                                <Input size="large" type="password" value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} autoComplete="off" />
                            </Form.Item>
                            <Form.Item label="确认密码" prop="checkPass">
                                <Input size="large" type="password" value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} autoComplete="off"/>
                            </Form.Item>
                            <Form.Item>
                                <Layout.Row>
                                    <Layout.Col span="8" offset="8">
                                        <div>
                                        <Button disabled={this.state.checkresult.buttonvasible} style={{width:"100%",height:"50px",fontSize:"18px"}} type="primary" onClick={this.handleSubmit.bind(this)}>注册</Button>
                                        </div>
                                    </Layout.Col>
                                </Layout.Row>
                            </Form.Item>
                        </Form>
                        </div>  
                    </Layout.Col>
                </Layout.Row>
                <div className="Tologin"><span>已有账户?</span><a onClick={this.tologin}>登陆</a></div>
            </div>
        )
    }
}