import {Head,Foot} from "./Head_Foot";
import React,{Component} from 'react';
import {BodyTitle} from './home';
import config from "../config";
import  "./admin.css";
import app from "./app1";
import {Table,Button,Tabs,Input,Form,Select,MessageBox} from 'element-react';
import 'element-theme-default';
import { Object } from "core-js";
//  let contractarry=app.contractarry(config.contracts);
let contract1=config.contracts[0].abi;
let address1=config.contracts[0].address;
// 实例化代币合约，后期改数组
const myconstract=app.web3.eth.contract(contract1).at(address1);
const account1=app.web3.eth.accounts[0];
console.log( myconstract)
const myconstractfunction={
    adminAccount:address1,
    name:myconstract.name.call(),
    totalSupply:myconstract.totalSupply.call().c[0],
    symbol:myconstract.symbol.call(),
    buyPrice:myconstract.buyPrice.call().toString(),
    sellPrice:myconstract.sellPrice.call().toString(),
    getbalance:(address)=>{return myconstract.balanceOf.call(address)},
}
const tokenMessage=[];
tokenMessage.push(myconstractfunction)
//回调函数
const callback=function(error,result){
    if(error){console.log(error)}
    else{
        console.log(result)
    }
}
// 代币标题组件
class Title extends Component{
    render(){
        return(
            <h3 className="tokentitle">{this.props.TokenName}合约管理界面</h3>
        )
    }
}
// 代币详情显示组件
class TokenShow extends Component{      
      render() {
        return (
          <Table
            style={{width: '100%'}}
            columns={this.props.columns}
            data={this.props.data}
            stripe={true}
            border={true}
          />
        )
      }  
}
// 代币管理TABS组件
class AdminTabs extends Component{
    constructor(props){
        super(props);
        this.state={
            columns: [
                {
                  label:'管理者账户',
                  prop:"adminAccount",
                  align:'center',
                },
                {
                  label: "代币名称",
                  prop: "name",
                  align:'center',
                  width:100,
                },
                {
                    label:'代币标志',
                    prop:'symbol',
                    align:'center',
                    width:100,
                },
                {
                  label: "发行数量",
                  prop: "totalSupply",
                  align:'center',
                  width:200,
                },
                {
                  label: "买入价格",
                  prop: "buyPrice",
                  align:'center',
                  width:100,
                },
                {
                  label: "卖出价格",
                  prop: "sellPrice",
                  align:'center',
                  width:100,
                },
              ],
              TokenMessage: [{
                adminAccount:"无",
                name: '汇金币',
                totalSupply: '100',
                buyPrice: '0',
                sellPrice:"0",
                symbol:'0',
                decimals:'0',
              },],
            TokenName:null,
            accounttoken:null,
        }
    }
    getbalance=()=>{
        let address=document.getElementById("getBalance_address").value;
        console.log(address)
        let number=myconstractfunction.getbalance(address).toString();
        console.log(number)
        this.setState({accounttoken:number})
    }
    componentDidMount(){
        this.setState({TokenName:"汇金",TokenMessage:tokenMessage})
    }
    render(){
        return(
            <Tabs activeName="5" onTabClick={ (tab) => console.log(tab.props.name) }>
            <Tabs.Pane label="代币信息" name="1">
            <TokenShow data={this.state.TokenMessage} columns={this.state.columns}/>
            </Tabs.Pane>
            <Tabs.Pane label="账户冻结/解冻" name="2">
            <FozenAccount/>
            </Tabs.Pane>
            <Tabs.Pane label="设置买入/卖出价格" name="3">
            <SetPrice/>
            </Tabs.Pane>
            <Tabs.Pane label="代币增发" name="4">
            <MintToken/>
            </Tabs.Pane>
            {/* <Tabs.Pane label="转移管理者权限" name="5">
            <AdminChange/>
            </Tabs.Pane> */}
            <Tabs.Pane label="设置GAS阈值信息" name="6">
            <SetGAS/>
            </Tabs.Pane>
          </Tabs>   
        )
    }
}
// 代币冻结/解冻组件
class FozenAccount extends Component{
    constructor(props) {
        super(props);
        this.state = {
          form: {
            region: '',
            address: ''
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
        this.refs.form.validate(
          (valid)=>{
              if(valid){
                  let address=this.state.form.address?this.state.form.address:app.web3.eth.accounts[0];
                  let region=this.state.form.region;
                  switch(region){
                    case "frozen":
                    MessageBox.prompt('请输入密码',"提示").then(({value})=>{
                        app.web3.personal.unlockAccount(account1,value,3000);
                        myconstract.freezeAccount(address,false,{from:account1},callback);  
                    })                    
                    return;
                    case "free":
                    MessageBox.prompt('请输入密码',"提示").then(({value})=>{
                        app.web3.personal.unlockAccount(account1,value,3000);
                        myconstract.freezeAccount(address,true,{from:account1},callback);  
                    })
                    return;
                    case "search":
                    MessageBox.alert(myconstract.balanceOf(address).toString());
                    return;
                    default:
                    alert("请选择交易类型");
                    return  
                  }
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
    <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
      <Form.Item label="请选择操作选项">
        <Select value={this.state.form.region} placeholder="请选择操作选项" onChange={this.onChange.bind(this, 'region')}>
          <Select.Option label="冻结" value="frozen"></Select.Option>
          <Select.Option label="解冻" value="free"></Select.Option>
          <Select.Option label="查询" value="search"></Select.Option>
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
    )
    }
}
// 设置阈值信息组件
class SetGAS extends Component{
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
        this.refs.form.validate(
          (valid)=>{
            let gas=parseInt(this.state.form.desc,10);
            MessageBox.prompt("请输入密码","提示").then(({value})=>{
              if(app.web3.personal.unlockAccount(account1,value,3000)){
                myconstract.setMinBalance(gas,{from:account1},callback)
              }else{
                MessageBox.alert("密码不正确");
              }              
            })
          }
        )
      }
      onChange(key, value) {
        this.setState({form:Object.assign({},this.state.form,{[key]:value})});
        this.forceUpdate();
      }
    render(){
        return(
    <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="150" onSubmit={this.onSubmit.bind(this)}>
      <Form.Item label="请输入新的GAS阈值" prop="desc">
        <Input style={{width:300}} value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" nativeType="submit">确定</Button>
        <Button onClick={this.handleReset.bind(this)}>取消</Button>
      </Form.Item>
    </Form>    
        )
    }
}
// 权限转移组件
// class AdminChange extends Component{
//     constructor(props) {
//         super(props);      
//         this.state = {
//           form: {
//             address:"",
//           },
//           rules:{
//             address:[
//               {
//                 required:"ture",
//                 message:"地址不能为空",
//                 trigger:"blur"
//               }
//             ]
//           }
//         };
//       } 
//       handleReset(e){
//         e.preventDefault();
//         // this.setState({form:{address:""}});
//         console.log(this.refs.form.fields)
//         this.refs.form.resetFields();
//       }
//       onSubmit(e) {
//         e.preventDefault();
//         let address=this.state.form.address;
//         console.log(address);
//       }
      
//       onChange(key, value) {
//         this.setState({form:Object.assign({},this.state.form,{[key]:value})})
//         this.forceUpdate();
//       }
//     render(){
//         return(
//     <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
//       <Form.Item label="转移地址" prop="address">
//         <Input style={{width:300}} value={this.state.form.address} onChange={this.onChange.bind(this, 'address')}></Input>
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" nativeType="submit">确定</Button>
//         <Button onClick={this.handleReset.bind(this)}>取消</Button>
//       </Form.Item>
//     </Form>    
//         )
//     }
// }
// 代币增发组件
class MintToken extends Component{
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
                  let address=this.state.form.address;
                  let number=parseInt(this.state.form.number,10);
                  MessageBox.prompt('请输入密码',"提示").then(({value})=>{
                   if(app.web3.personal.unlockAccount(account1,value,3000)){
                    myconstract.mintToken(address,number,{from:account1},callback);
                   }else{
                     MessageBox.alert("密码不正确")
                   }                     
                })     
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
        )
    }
}
// 设置买卖价格组件
class SetPrice extends Component{
    constructor(props) {
        super(props);      
        this.state = {
          form: {
            number: '',
            region: '',
          },
          rules:{
            number:[{
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
        this.setState({form:{number:"",region:""}});    
        this.refs.form.resetFields()
      }    
      onSubmit(e) {
        e.preventDefault();
        this.refs.form.validate(
          (valid)=>{
            if(valid){
              let price=parseInt(this.state.form.number,10);
              let buyprice=parseInt(tokenMessage.buyPrice,10);
              let sellprice=parseInt(tokenMessage.sellPrice,10);
              MessageBox.prompt("请输入密码","提示").then(({value})=>{
                if(app.web3.personal.unlockAccount(account1,value,2000)){
                  switch(this.state.form.region){
                    case "buyprice":
                    myconstract.setPrices(price,sellprice,{from:account1},callback)
                    return;
                    case "sellprice":
                    myconstract.setPrices(buyprice,price,{from:account1},callback)
                    return;
                    default:
                    MessageBox.alert("请选择操作类型");
                    return;
                  }
                }else{
                  MessageBox.alert("密码不正确")
                }
              })
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
    <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="150" onSubmit={this.onSubmit.bind(this)}>
      <Form.Item label="设置买入/卖出价格">
        <Select value={this.state.form.region} placeholder="请选择操作选项" onChange={this.onChange.bind(this, 'region')}>
          <Select.Option label="设置买入价格" value="buyprice"></Select.Option>
          <Select.Option label="设置卖出价格" value="sellprice"></Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="输入价格" prop="number">
        <Input style={{width:300}} value={this.state.form.number} onChange={this.onChange.bind(this, 'number')}></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" nativeType="submit">确定</Button>
        <Button>取消</Button>
      </Form.Item>
    </Form>
    )
    }
}
// 代币信息展示组件
class Token extends Component{
    constructor(props){
        super(props);
        this.state={
            columns: [
                {
                  label:'管理者账户',
                  prop:"adminAccount",
                  align:'center',
                },
                {
                  label: "代币名称",
                  prop: "name",
                  align:'center',
                  width:100,
                },
                {
                    label:'代币标志',
                    prop:'symbol',
                    align:'center',
                    width:100,
                },
                {
                  label: "发行数量",
                  prop: "totalSupply",
                  align:'center',
                  width:200,
                },
                {
                  label: "买入价格",
                  prop: "buyPrice",
                  align:'center',
                  width:100,
                },
                {
                  label: "卖出价格",
                  prop: "sellPrice",
                  align:'center',
                  width:100,
                },
              ],
              TokenMessage: [{
                adminAccount:"无",
                name: '汇金币',
                totalSupply: '100',
                buyPrice: '0',
                sellPrice:"0",
                symbol:'0',
                decimals:'0',
              },],
            TokenName:null,
            accounttoken:null,
        }
    }
    componentDidMount(){
        this.setState({TokenName:"汇金",TokenMessage:tokenMessage})
    }
    getbalance=()=>{
        let address=document.getElementById("getBalance_address").value;
        console.log(address)
        let number=myconstractfunction.getbalance(address).toString();
        console.log(number)
        this.setState({accounttoken:number})
    }
    render(){
        return(
            <div className="container">
            <Title TokenName={this.state.TokenName?this.state.TokenName:"无名称"}/>
            <AdminTabs/>
            </div>
        )
    }
}
// 组合后导出的组件
class Admin extends  Component{
    render(){
        return(
            <div>
                <Head/>
                <BodyTitle titlearry={config.BodyTitle_arry}/>
                <Token/>
                <Foot/>
            </div>
        )
    }
}
export default Admin;