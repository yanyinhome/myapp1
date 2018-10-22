import {Head,Foot} from "./Head_Foot";
import React,{Component} from 'react';
import './bodycontent.css';
import {BodyTitle} from './home';
import config from '../config';
import './jiaoyi.css';
import app from './app1';
import "element-theme-default";
import {myconstract} from "./qukuai";
import{Button,Tag,Form,Input,Select,Switch} from "element-react";
// HEAD组件
console.log(myconstract)

// // 合并的交易组件
// class JiaoYiContent extends Component{
//     constructor(props){
//         super(props);
//         this.state={config:config};
//     }
//     // 交易函数
//     transfer=(e)=>{ 
//         e.preventDefault();
//         let fromaddress=document.getElementById('addressfrom').value;
//         let toaddress=document.getElementById("addressto").value;
//         let val=document.getElementById("transferAmount").value;
//         app.transfer(fromaddress,toaddress,val,"queren")
        
//     }
//     //取消函数
//     cancel=(e)=>{
//         e.preventDefault();
//         document.getElementById('addressfrom').value="";
//         document.getElementById("addressto").value="";
//         document.getElementById("transferAmount").value="";
//     }
//     //查询函数
//     Searchclick=(e)=>{
//         e.preventDefault();
//         let addressChaxun=document.getElementById("addressChaxun");
//         let searchResult=document.getElementById('searchResult');
//         let address=addressChaxun.value;
//         if(!address){ alert("地址不能为空")}
//             else{
//                 app.getBalance(address,function(err,result){
//                     if(err){console.log(err)}
//                         else{searchResult.innerHTML=app.web3.fromWei(result,'ether')
//                             }
//                 })
//         }               
//     }    
//     render(){
//         return(
//             <div className="container translantion" id="accountlist">
//                 <Welcome/>
//                 <Accountlist accounts={this.state.config.accounts}/>
//                 <Transaction transfer={this.transfer} cancel={this.cancel}/>
//                 <Search Searchclick={this.Searchclick}/>
//                 <TransactionRecord/>
//             </div>
//         )
//     }
// }
// 币币交易函数
// 以太买汇金
class Ethhjb extends Component{
    constructor(props) {
        super(props);      
        this.state = {
          form: {
            address: '',
            number: '',
            password:'',
            switch:'',
            type:null,
            region:"",
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
          },
        };
      }
      
      onSubmit(e) {
        e.preventDefault();
        this.refs.form.validate(
            (valid)=>{
                if(valid){
                    let val=this.state.form.number;
                    let address=this.state.form.address?this.state.form.address:app.web3.eth.accounts[0];
                    let password=this.state.form.password;
                    let num=parseInt(app.web3.toWei(val,"ether"),10);//换算成wei，输入值为ether
                    // 对输入框内容进行判断
                    app.web3.personal.unlockAccount(address,password,3000);
                    let region=this.state.form.region;
        // 判读是否选中类型及选择类型值
                    switch(region){
                        case "eth-hjb":
                        console.log(1);
                        myconstract.buy({from:address,value:num},(err,result)=>{
                            if(err){console.log(err)}
                                else{console.log(result)}
                            })
                        return;
                        case "hjb-eth":
                        console.log(2);
                        myconstract.sell.sendTransaction(num,{from:address},(err,result)=>{
                            if(err){console.log(err)}
                                else{console.log(result)}
                            })
                        return;
                        default:
                        alert("请选择交易类型");
                        return  
                    }
                }else{
                console.log('error submit!!');
                return false;}
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
                以太币当前价格
                </Tag>                
            </Form.Item>
            <Form.Item label="购买/出售">
              <Select size="small" value={this.state.form.region} placeholder="请选择交易类型" onChange={this.onChange.bind(this, 'region')}>
                <Select.Option label="汇金币转以太币" value="hjb-eth" ></Select.Option>
                <Select.Option label="以太币转汇金币" value="eth-hjb"></Select.Option>
              </Select>
              </Form.Item>
              <Form.Item label="地址">
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
              <Input  type={this.state.form.type} size="small" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')}></Input>
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
              <Button size="small" type="primary" nativeType="submit">确定</Button>
              <Button size="small" onClick={this.handleReset.bind(this)}>取消</Button>
            </Form.Item>
          </Form>
        )
      }
}
// 输出的交易页面
class JiaoYi extends  Component{
    render(){
        return(
            <div>
                <Head/>
                <BodyTitle titlearry={config.BodyTitle_arry}/>
                {/* <JiaoYiContent/> */}
                <div className="container">
                <Ethhjb/>
                </div>
                <Foot/>
            </div>
        )
    }
}
export default JiaoYi;