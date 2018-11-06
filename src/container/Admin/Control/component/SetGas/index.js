import React,{Component} from "react";
import {Button,Input,Form,Notification}  from "element-react";
import HjbService from "../../../../../services/HjbService";
import "element-theme-default";
import {Headtitle} from "../public"
// 设置阈值信息组件
export default class SetGAS extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
          form: {
            desc: ''
          },
          rules:{
            desc:[
              {
                required:"ture",
                message:"阈值不能为空",
                trigger:"blur"
              },{validator:(rule,value, callback) => {
                let numberonly=/^[0-9]+$/;
                if(!numberonly.test(value)){
                  callback(new Error('只能是数字'));
                }else{
                  callback()
                }
              } }
            ]
          }
        };
      }
      handleReset(e){
        e.preventDefault();
        this.setState({form:{address:""}});
        this.refs.form.resetFields();
      }     
      onSubmit(e) {
        e.preventDefault();
        HjbService.HjbSetGas(this.state.form).then(res=>{
          if(res.data.number){
            Notification.info({
              title:res.data.message,
              message:`阈值被设置为${res.data.number}`,
              duration:2000,
            })
          }
        }).catch(err=>{console.log(err)})
      }
      // onChange(key, value) {
      //   this.setState({form:Object.assign({},this.state.form,{[key]:value})});
      //   this.forceUpdate();
      // }
      onChange=(key,value)=>{
        this.setState({form:Object.assign({},this.state.form,{[key]:value})});
      }
      componentDidMount(){
       
      }
    render(){
        return(
    <div>
      <Headtitle>设置阈值信息 </Headtitle>
      <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="150" onSubmit={this.onSubmit.bind(this)}>
      <Form.Item label="请输入新的GAS阈值" prop="desc">
        <Input style={{width:300}} value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" nativeType="submit" ref="button">确定</Button>
        <Button onClick={this.handleReset.bind(this)}>取消</Button>
      </Form.Item>
    </Form>  
    </div>  
        )
    }
  }