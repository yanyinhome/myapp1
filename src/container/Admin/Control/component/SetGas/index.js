import React,{Component} from "react";
import {Button,Input,Form,Notification,Layout}  from "element-react";
import HjbService from "../../../../../services/HjbService";
import EthServices from "../../../../../services/EthServices";
import "element-theme-default";
import {Headtitle,ChildrenTitle,HistoryList} from "../public"
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
          },
          // setgas的历史记录
          SetGas_history:[],
          // 当前GAS价格
          GasPrice:"未更新",
          // 当前阈值
          SetGas:"暂时无法获取",
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
        // 阈值没有设为公共变量，暂时无法获取
        HjbService.HJBmessage().then(
          res=>{
              const{data}=res;
              console.log(data)
              // this.setState({tokennumeber:data.totalSupply})
          }
        );
        // 获取gasprice
        EthServices.EthPeers().then(
          res=>{
            this.setState({GasPrice:res.data.Gas})
          }
        ).catch(err=>{
          console.log(err)
        })
        // 获取设置阈值的历史信息
        HjbService.HjbSetGas_history().then(res=>{
          if(res.data){
            const data=res.data.result;
            console.log(data)
            const list=data.map(item=>{
              return {
                date:item.time,
                username:item.gas,
                user:item.adminname,
                action:"设置阈值为",
                message:"成功"
              }
            });
            this.setState({SetGas_history:list})
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    render(){
        return(
    <div>
       <Layout.Row>
               <Layout.Col lg="12" sm="24">
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
               </Layout.Col>
             </Layout.Row>
             <hr/>
             <Layout.Row>
               <Layout.Col lg="12" mg="24" style={{padding:"15px"}}>
                 <ChildrenTitle>当前阈值及GAS价格</ChildrenTitle>
                 <h3>阈值：{this.state.SetGas}</h3>
                 <h3>GASPRICE：{this.state.GasPrice}</h3>
                 <p>
                   注释:<br/>
                   阈值是账户最少的以太币数量（finney单位），主要用于交易时的GAS消耗。<br/>可以根据当前的当前GASPRICE设置，以保证交易
                 </p>
               </Layout.Col>
               <Layout.Col lg="12" mg="24">
                 <ChildrenTitle>阈值设置历史记录</ChildrenTitle>
                 <HistoryList data={this.state.SetGas_history}></HistoryList>
               </Layout.Col>
             </Layout.Row>
      
      
    </div>  
        )
    }
  }