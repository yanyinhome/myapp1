import React,{Component} from "react";
import {Button,Form,Input,Select,Notification}  from "element-react";
import "element-theme-default";
import HjbService from "../../../../../services/HjbService";
import {Headtitle} from "../public"
// 代币冻结/解冻组件
export default class FozenAccount extends Component{
    constructor(props) {
        super(props);
        this.state = {
          form: {
            region: '0',
           address:""
          },
          rules:{
            address:[{required:true,message:"地址不能为空",trigger:'blur'}]
          }
        };
      }
      handleReset(e) {
        e.preventDefault(); 
        this.setState({form:{region: '',address: ''}});   
        this.refs.form.resetFields()
      }
      onSubmit(e) {
        e.preventDefault();
        // console.log(this.state.form)
        HjbService.HjbFroze(this.state.form).then(res=>{
          console.log(res)
          let code=res.data.state;
          switch (code){
            case 0:
            if(res.data.result===0){
              Notification.info({
                title:"提示",
                message:res.message,
                duration:2000,
              })
            }else{
              Notification.success({
                title:"提示",
                message:res.message,
                duration:2000,
              }) 
            }
            return;
            case 1:
            if(res.data.result===0){
              Notification.info({
                title:"提示",
                message:res.message,
                duration:2000,
              })
            }else{
              Notification.success({
                title:"提示",
                message:res.message,
                duration:2000,
              })
            }
            return;
            case 2:
            if(res.data.result===0){
              Notification.info({
                title:"提示",
                message:res.message,
                duration:2000,
              })
            }else{
              Notification.success({
                title:res.message,
                message:`账户汇金币数量：${res.data.result}`,
                duration:2000,
              }) 
            }
            return;
            default:
            console.log(res)
            return;
          }
        }).catch(err=>{console.log(err)})
      }
      
      onChange(key, value) {
        this.setState({form:Object.assign({},this.state.form,{[key]:value})})
        
      }
      
    render(){
        return(
    <div>
      <Headtitle>账户冻结/解冻</Headtitle>
      <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
      <Form.Item label="请选择操作选项">
        <Select value={this.state.form.region} placeholder="请选择操作选项" onChange={this.onChange.bind(this, 'region')}>
          <Select.Option label="冻结" value="0" selected></Select.Option>
          <Select.Option label="解冻" value="1"></Select.Option>
          <Select.Option label="查询" value="2"></Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="输入地址" prop="address">
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