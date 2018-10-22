import {Head,Foot} from "./Head_Foot";
import React,{Component} from 'react';
import './bodycontent.css';
import {BodyTitle} from './home';
import './qukuai.css';
import config from '../config';
import app from "./app1";
import "element-theme-default";
import{Button,Tag,Table,Tabs,Form,Input,Switch} from "element-react";
// 实例化代币合约并导出
let contract1=config.contracts[0].abi;
let address1=config.contracts[0].address;
// 实例化代币合约，后期改数组
const myconstract=app.web3.eth.contract(contract1).at(address1);
// 交易Tabs组件
class TokenTransaction extends Component{
    render() {
        return (
          <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
            <Tabs.Pane label="账户列表" name="1">
            <TableList data={this.props.data} columns={this.props.columns}/>
            </Tabs.Pane>
            <Tabs.Pane label="购买汇金币" name="2">
            <HuijinBuy/>
            </Tabs.Pane>
            <Tabs.Pane label="出售汇金币" name="3">
            <HuijinSell/>
            </Tabs.Pane>
            <Tabs.Pane label="汇金币转账" name="4">
            <HuijinTransction/>
            </Tabs.Pane>
          </Tabs>
        )
      }
}
// 账户列表组件与home。js内的相同，没有再引入，后期改到公共组件
class TableList extends Component{
    render(){
        return(
            <Table
            style={{width: '100%'}}
            columns={this.props.columns}
            data={this.props.data}
            border={true}
            height={this.props.height}
            highlightCurrentRow={true}
            onCurrentChange={item=>{console.log(item)}}
            stripe={true}
          />
        )
    }
}
// 汇金币购买函数
class HuijinBuy extends Component{
    constructor(props) {
        super(props);      
        this.state = {
          form: {
            address: '',
            number: '',
            password:'',
            switch:'',
            type:null,
          },
          rules:{
            number: [
              {type:"string",required:true,message:'请输入出售数量',trigger:'change'},
              {validator:(rule,value, callback) => {
                let numberonly=/^[0-9]+$/;
                if(!numberonly.test(value)){
                  callback(new Error('只能是数字'));
                }else{
                  callback()
                }
              } }
            ],
            password: [
              {required:"true",message:'密码不能为空',trigger:'change' }
            ],
          }
        };
      }  
      onSubmit(e) {
        e.preventDefault();
        this.refs.form.validate(
          (valid)=>{
            if (valid) { 
              let val=this.state.form.number;
              let address=this.state.form.address?this.state.form.address:app.web3.eth.accounts[0];
              let password=this.state.form.password;
              let num=parseInt(app.web3.toWei(val,"ether"),10);//换算成wei，输入值为ether
              app.web3.personal.unlockAccount(address,password,3000)
              myconstract.buy({from:address,value:num},(err,result)=>{
                if(err){console.log(err)}
                  else{console.log(result)}
              })		
            } else {
              console.log('error submit!!');
              return false;
            }
          }
        )    
      }
      handleReset(e) {
        e.preventDefault();      
        let switchstate=this.state.form.switch?this.state.form.switch:false;
        const qingkong={form:{ number: "",password:"",address:"",switch:switchstate}};
        this.setState(qingkong);
        this.refs.form.resetFields()
      }
      onChange(key, value) {
        let data=this.state.form;
        if(key==="switch"&&value===true){
          data.type="text";
        }else{
          data.type="password";
        }
        this.setState({form: Object.assign({}, this.state.form, { [key]: value })});
      } 
      render() {
        return (
          <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="100" onSubmit={this.onSubmit.bind(this)}>
            <Form.Item>
                <Tag type="primary">
                汇金币当前购买价格
                </Tag>                
            </Form.Item>
            {/* <Form.Item label="购买/出售">
              <Select size="small" value={this.state.form.region} placeholder="请选择交易类型">
                <Select.Option label="购买" value="shanghai" ></Select.Option>
                <Select.Option label="出售" value="beijing"></Select.Option>
              </Select>
            </Form.Item> */}
              <Form.Item label="购买地址">
              <div style={{width:"300px"}}>
              <Input size="small" value={this.state.form.address} onChange={this.onChange.bind(this, 'address')} placeholder="默认为第一个账户"></Input>
              </div>
            </Form.Item>
            <Form.Item label="数量" prop="number">
              <div style={{width:"300px"}}>
              <Input size="small" value={this.state.form.number} onChange={this.onChange.bind(this, 'number')}></Input>
              </div>
            </Form.Item>
            <Form.Item label="请输入密码" prop="password">
              <div style={{width:"300px"}}>
              <Input type={this.state.form.type} size="small" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')}></Input>
              </div>
            </Form.Item>
            <Form.Item label="显示密码">
              <Switch
                onColor="#ff4949"
                offColor="#20A0FF"
                value={this.state.form.switch}
                onChange={this.onChange.bind(this,"switch")}
              />
            </Form.Item>
            <Form.Item>
              <Button size="small" type="primary" nativeType="submit">立即购买</Button>
              <Button size="small" onClick={this.handleReset.bind(this)}>取消</Button>
            </Form.Item>
          </Form>
        )
      }
}
// 汇金币出售函数
class HuijinSell extends Component{
  constructor(props) {
      super(props);      
      this.state = {
        form: {
          address:'',
          number:'',
          password:'',
          switch:'',
          type:null,
        },
        rules:{
          number: [
            {required:true,message:'请输入出售数量',trigger:'change'},
            {validator:(rule,value, callback) => {
              let numberonly=/^[0-9]+$/;
              if(!numberonly.test(value)){
                callback(new Error('只能是数字'));
              }else{
                callback()
              }
            } }
          ],
          password: [
            {required:"true",message:'密码不能为空',trigger:'change' }
          ],
        }
      }
    }
    
    onSubmit(e) {
      e.preventDefault();
      this.refs.form.validate(
        (valid)=>{
          if (valid) { 
            let val=this.state.form.number;
            let address=this.state.form.address?this.state.form.address:app.web3.eth.accounts[0];
            let password=this.state.form.password;
            let num=parseInt(val,10);//换算成wei，输入值为ether
            app.web3.personal.unlockAccount(address,password,3000)
            myconstract.sell.sendTransaction(num,{from:address},(err,result)=>{
              if(err){console.log(err)}
                else{console.log(result)}
            })	
          } else {
            console.log('error submit!!');
            return false;
          }
        }
      )    
    }
    handleReset(e) {
      e.preventDefault();      
      let switchstate=this.state.form.switch?this.state.form.switch:false;
      const qingkong={form:{ number: "",password:"",address:"",switch:switchstate}};
      this.setState(qingkong);
      this.refs.form.resetFields()
    }
    onChange(key, value) {
      let data=this.state.form;
      if(key==="switch"&&value===true){
        data.type="text";
      }else{
        data.type="password";
      }
      this.setState({form: Object.assign({}, this.state.form, { [key]: value })});
    }      
    render() {
      return (
        <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" onSubmit={this.onSubmit.bind(this)} className="demo-ruleForm">
          <Form.Item>
              <Tag type="primary">
              汇金币当前出售价格
              </Tag>                
          </Form.Item>
          {/* <Form.Item label="购买/出售">
            <Select size="small" value={this.state.form.region} placeholder="请选择交易类型">
              <Select.Option label="购买" value="shanghai" ></Select.Option>
              <Select.Option label="出售" value="beijing"></Select.Option>
            </Select>
          </Form.Item> */}
            <Form.Item label="出售地址">
            <div style={{width:"300px"}}>
            <Input size="small" value={this.state.form.address} onChange={this.onChange.bind(this, 'address')} placeholder="默认为当前账户第一个地址"></Input>
            </div>
          </Form.Item>
          <Form.Item label="数量" prop="number">
            <div style={{width:"300px"}}>
            <Input size="small" value={this.state.form.number} onChange={this.onChange.bind(this, 'number')}></Input>
            </div>
          </Form.Item>
          <Form.Item label="请输入密码" prop="password">
            <div style={{width:"300px"}}>
            <Input type={this.state.form.type} size="small" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')}></Input>
            </div>
          </Form.Item>
          <Form.Item label="显示密码">
            <Switch
              onColor="#ff4949"
              offColor="#20A0FF"
              value={this.state.form.switch}
              onChange={this.onChange.bind(this,"switch")}
            />
          </Form.Item>
          <Form.Item>
            <Button size="small" type="primary" nativeType="submit">立即出售</Button>
            <Button size="small" onClick={this.handleReset.bind(this)}>取消</Button>
          </Form.Item>
        </Form>
      )
    }
}
// 汇金币转账函数
class HuijinTransction extends Component{
  constructor(props) {
      super(props);      
      this.state = {
        form: {
          addressOut: '',
          addressIn:'',
          number: '',
          password:'',
          switch:'',
          type:null,
        },
        rules:{
          addressIn:[{required:"true",message:'转入地址不能为空',trigger:'change' },],
          number: [
            {required:true,message:'请输入出售数量',trigger:'change'},
            {validator:(rule,value, callback) => {
              let numberonly=/^[0-9]+$/;
              if(!numberonly.test(value)){
                callback(new Error('只能是数字'));
              }else{
                callback()
              }
            } }
          ],
          password:[{required:"true",message:'密码不能为空',trigger:'change' },]
        }
      };
    } 
    onSubmit(e) {
      e.preventDefault();
      this.refs.form.validate(
        (valid)=>{
          if (valid) { 
            let val=this.state.form.number;
            let addressIn=this.state.addressIn;
            let addressOut=this.state.form.addressOut?this.state.form.addressOut:app.web3.eth.accounts[0];
            let password=this.state.form.password;
            let num=parseInt(val,10);//换算成wei，输入值为ether
            if(app.web3.personal.unlockAccount(addressOut,password,3000)){
              myconstract.transfer.sendTransaction(addressIn,num,{from:addressOut},(err,result)=>{
                if(err){console.log(err)}
                  else{console.log(result)}
              })
            }else{
              alert("密码不正确")
            } 
          } else {
            console.log('error submit!!');
            return false;
          }
        }
      ) 
    }
    handleReset(e) {
      e.preventDefault();      
      let switchstate=this.state.form.switch?this.state.form.switch:false;
      const qingkong={form:{ number: "",password:"",address:"",switch:switchstate}};
      this.setState(qingkong);
      this.refs.form.resetFields()
    }
    onChange(key, value) {
      let data=this.state.form;
      if(key==="switch"&&value===true){
        data.type="text";
      }else{
        data.type="password";
      }
      this.setState({form: Object.assign({}, this.state.form, { [key]: value })});
    }     
    render() {
      return (
        <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="100" onSubmit={this.onSubmit.bind(this)}>
            <Form.Item label="转出地址">
            <div style={{width:"300px"}}>
            <Input size="small" value={this.state.form.addressOut} onChange={this.onChange.bind(this, 'addressOut')} placeholder="默认为第一个账户"></Input>
            </div>
          </Form.Item>
          <Form.Item label="转入地址" prop="addrdssIn">
            <div style={{width:"300px"}}>
            <Input size="small" value={this.state.form.addressIn} onChange={this.onChange.bind(this, 'addressIn')}></Input>
            </div>
          </Form.Item>
          <Form.Item label="数量" prop="number">
            <div style={{width:"300px"}}>
            <Input size="small" value={this.state.form.number} onChange={this.onChange.bind(this, 'number')}></Input>
            </div>
          </Form.Item>
          <Form.Item label="请输入密码" prop="password">
            <div style={{width:"300px"}}>
            <Input type={this.state.form.type} size="small" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')}></Input>
            </div>
          </Form.Item>
          <Form.Item label="显示密码">
            <Switch
              onColor="#ff4949"
              offColor="#20A0FF"
              value={this.state.form.switch}
              onChange={this.onChange.bind(this,"switch")}
            />
          </Form.Item>
          <Form.Item>
            <Button size="small" type="primary" nativeType="submit">转账</Button>
            <Button size="small" onClick={this.handleReset.bind(this)}>取消</Button>
          </Form.Item>
        </Form>
      )
    }
}
class QuKuai extends  Component{
    constructor(props){
        super(props);
        this.state={
            titlearry:config.BodyTitle_arry,
            columns:[{
                label:"账户",
                prop:"index",
                className:"index",
                width:"70rem",
                align:"center",
                
            },
                {
                  label: "账户地址",
                  prop: "address",
                  align:"center",
                
                },
                {
                  label: "汇金币",
                  prop: "number",
                  align:"center",
                    render:function(data){
                        return(
                            <span>
                            <Tag color="Light Blue">{data.number}</Tag>
                            </span>
                        )
                    }
                },],
                data:config.Tokenlist,
                highlightCurrentRow:"ture",
        }
    }
    tick(){
        const accountsmessage=[];
        app.web3.eth.getAccounts((err,result)=>{
            if(err){console.log(err)}
              else{result.forEach(
                  (item,index)=>{
                    const accountsmessageitem={};
                    accountsmessageitem.lockd="true";
                    accountsmessageitem.index=`${index+1}`;
                    accountsmessageitem.number=myconstract.balanceOf.call(item).toString();
                    accountsmessageitem.address=item;
                    accountsmessage.push(accountsmessageitem);
                }
              )}
              this.setState({data:accountsmessage})
          })
    }
    componentDidMount(){
        this.timer=setInterval(
            ()=>this.tick(),30000
        )
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render(){
        return(
            <div>
                <Head/>
                <BodyTitle titlearry={this.state.titlearry}/>
                <div className="container">
                <TokenTransaction columns={this.state.columns} data={this.state.data}/>
                </div>
                <Foot/>
            </div>
        )
    }
}
export default QuKuai;
export {myconstract};