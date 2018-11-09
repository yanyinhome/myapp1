import React,{Component} from "react";
import {Button,Form,Input,Notification,Layout}  from "element-react";
import "element-theme-default";
import HjbService from "../../../../../services/HjbService";
import userServices from "../../../../../services/userServices"
import {Headtitle,Changeshow,ChildrenTitle,HistoryList} from "../public"
// 代币增发组件
export default class MintToken extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
          form: {
            number: '',
            address: '',
          },
          rules:{
            number:[{
              required:true,
              message:"数量不能为空",
              trigger:"blur",
            },{
              validator:(rule,value,callback)=>{
                let numberonly=/^[0-9]+$/;
                if(!numberonly.test(value)){
                  callback(new Error('只能是数字'));
                }else{
                  callback()
                }
              }
            }],
            address:[
              {
              required:true,
              message:"地址不能为空",
              trigger:"blur",
              },
             ]
          },
          // 现已发行代币数
          tokennumeber:"未查询到结果",
          // 冻结历史列表数据
          minttoken_history:[],
          // chang结果状态数据
          Changeshow:{
            children:"未查询到用户",
            username:"",
            visible:"none",
            state:"",
            action:""
          },
        };
      }
      componentDidMount(){
        HjbService.HJBmessage().then(
          res=>{
              const{data}=res;
              console.log(data)
              this.setState({tokennumeber:data.totalSupply})
          }
        );
        HjbService.HjbZengfa_history().then(
          res=>{
            if(res.data){
              const data=res.data.result;
              const list=data.map(item=>{
                return {
                  date:item.time,
                  username:item.number,
                  user:item.admin_name,
                  action:"增发代币",
                  message:"成功"
                }
              })
             this.setState({minttoken_history:list})
          }}
        ).catch(err=>{
          console.log(err)
        })
      }
      handleReset(e) {
        e.preventDefault(); 
        this.setState({form:{number:"",address:""}});    
        this.refs.form.resetFields()
      }    
      onSubmit(e) {
        e.preventDefault();
        this.refs.form.validate(
          (valid)=>{
              if(valid){
                if(this.state.Changeshow.children.length!==0&&this.state.Changeshow.children.length!==6){
                  HjbService.HjbZengfa({number:this.state.form.number,address:this.state.Changeshow.children,username:this.state.Changeshow.username}).then(res=>{
                    if(res.data.number){
                      Notification.info({
                        title:res.data.message,
                        message:`增发${res.data.number}以太币`,
                        duration:2000,
                      })
                    }
                  }).catch(err=>{console.log(err)}) 
                }else{
                  Notification.info({
                    title:"错误",
                    message:"地址格式不正确",
                    duration:2000,
                  })
                }  
              }
          }  
        )
      } 
      onChange(key, value) {
        this.setState({form:Object.assign({},this.state.form,{[key]:value})});
        if(value===""){
          this.setState({Changeshow:Object.assign({},this.state.Changeshow,{visible:"none"})})
        }else{
          this.setState({Changeshow:Object.assign({},this.state.Changeshow,{visible:"inline-block"})})
          userServices.usersearch({username:value,address:value}).then(res=>{
           const {data}=res;
           if(res.code===1){
              this.setState({Changeshow:Object.assign({},this.state.Changeshow,{children:`${data.address}`,state:data.state,username:data.username})})
           }else{
            this.setState({Changeshow:Object.assign({},this.state.Changeshow,{children:"未查询到用户"})})
           }
          }).catch(err=>{console.log(err)})
         
        }      
      }
      // 点击查询结果添加到输入框
      resultSelct=()=>{
        this.setState({form:Object.assign({},this.state.form,{address:this.state.Changeshow.children})})
      }
    render(){
        return(
           <div>
             <Layout.Row>
               <Layout.Col lg="12" sm="24">
                <Headtitle>代币增发</Headtitle>
                  <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                    <Form.Item label="增发数量" prop="number">
                      <Input style={{width:300}} value={this.state.form.number} onChange={this.onChange.bind(this, 'number')} placeholder="请输入要增发的数量"></Input>
                    </Form.Item>
                    <Form.Item label="增发地址" prop="address">
                      <Input style={{width:300}} value={this.state.form.address} onChange={this.onChange.bind(this, 'address')} placeholder="请输入要增发的账户昵称或地址"></Input>
                    </Form.Item>
                    <Form.Item>
                    <Changeshow onclick={this.resultSelct} visible={this.state.Changeshow.visible}>{this.state.Changeshow.children}{this.state.Changeshow.action}</Changeshow>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" nativeType="submit">确定</Button>
                      <Button onClick={this.handleReset.bind(this)}>取消</Button>
                    </Form.Item>
                  </Form>  
               </Layout.Col>
             </Layout.Row>
             <hr/>
             <Layout.Row>
               <Layout.Col lg="12" mg="24" style={{padding:"15px"}}>
                 <ChildrenTitle>现已发行代币数</ChildrenTitle>
                 <h3>现已发行代币：{this.state.tokennumeber}</h3>
                 <p>
                   注释:<br/>
                   输入地址或者用户名即可给对方增发汇金币
                 </p>
               </Layout.Col>
               <Layout.Col lg="12" mg="24">
                 <ChildrenTitle>增发历史记录</ChildrenTitle>
                 <HistoryList data={this.state.minttoken_history}></HistoryList>
               </Layout.Col>
             </Layout.Row>
           
           </div>
        )
    }
  }