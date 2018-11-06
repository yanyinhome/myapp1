import React,{Component} from "react";
import {Button,Form,Input,Notification}  from "element-react";
import "element-theme-default";
import HjbService from "../../../../../services/HjbService";
import {Headtitle} from "../public"
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
          }
        };
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
                HjbService.HjbZengfa(this.state.form).then(res=>{
                  if(res.data.number){
                    Notification.info({
                      title:res.data.message,
                      message:`增发${res.data.number}以太币`,
                      duration:2000,
                    })
                  }
                }).catch(err=>{console.log(err)})   
              }
          }  
        )
      } 
      onChange(key, value) {
        this.setState({form:Object.assign({},this.state.form,{[key]:value})});
        this.forceUpdate();
      }
    render(){
        return(
           <div>
             <Headtitle>代币增发</Headtitle>
              <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
            <Form.Item label="增发数量" prop="number">
              <Input style={{width:300}} value={this.state.form.number} onChange={this.onChange.bind(this, 'number')}></Input>
            </Form.Item>
            <Form.Item label="增发地址" prop="address">
              <Input style={{width:300}} value={this.state.form.address} onChange={this.onChange.bind(this, 'address')}></Input>
            </Form.Item>
            <Form.Item>
              <Button type="primary" nativeType="submit">确定</Button>
              <Button onClick={this.handleReset.bind(this)}>取消</Button>
            </Form.Item>
          </Form>  
           </div>
        )
    }
  }