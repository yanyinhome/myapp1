import React,{Component} from "react";
import {Button,Form,Input,Notification,Select}  from "element-react";
import "element-theme-default";
import HjbService from "../../../../../services/HjbService";
import {Headtitle} from "../public"
// 设置买卖价格组件
export default class SetPrice extends Component{
  constructor(props) {
      super(props);      
      this.state = {
        form: {
          price: '',
          region: '0',
        },
        rules:{
          price:[{
              required:true,message:'内容不能为空',trigger:'blur'
          },{validator:(rule,value, callback) => {
              let numberonly=/^[0-9]+$/;
              if(!numberonly.test(value)){
                callback(new Error('只能是数字'));
              }else{
                callback()
              }
            } }]
        }
      };
    } 
    handleReset(e) {
      e.preventDefault(); 
      this.setState({form:{price:"",region:""}});    
      this.refs.form.resetFields()
    }    
    onSubmit(e) {
      e.preventDefault();
      this.refs.form.validate(
        (valid)=>{
          if(valid){
            HjbService.HjbSetPrice(this.state.form).then(res=>{
              let state=res.data.state;
              switch (state){
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
                default:
                return;
              }
            }).catch(err=>{console.log(err)})
          }
        }
      )
    }
    
    onChange(key, value) {
      this.setState({form:Object.assign({},this.state.form,{[key]:value})})
      this.forceUpdate();
    }
    
  render(){
      return(
  <div>
    <Headtitle>设置买入/卖出价格</Headtitle>
    <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="150" onSubmit={this.onSubmit.bind(this)}>
    <Form.Item label="设置买入/卖出价格">
      <Select value={this.state.form.region} placeholder="请选择操作选项" onChange={this.onChange.bind(this, 'region')}>
        <Select.Option label="设置买入价格" selected value="0"></Select.Option>
        <Select.Option label="设置卖出价格" value="1"></Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="输入价格" prop="price">
      <Input style={{width:300}} value={this.state.form.price} onChange={this.onChange.bind(this, 'price')}></Input>
    </Form.Item>
    <Form.Item>
      <Button type="primary" nativeType="submit">确定</Button>
      <Button>取消</Button>
    </Form.Item>
  </Form>
  </div>
  )
  }
}