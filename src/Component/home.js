import {Head,Foot} from "./Head_Foot";
import React,{Component} from 'react';
import './bodycontent.css';
import './home.css';
import config from "../config";
import{Button,Tag,Table,Tabs,Pagination,Form,Input,Select,Switch} from "element-react";
import "element-theme-default";
import app from './app1';
// import "element-them-default";
// 账户列表的标题，显示节点信息
class BodyTitle extends Component{
    render(){
        let itemlist=this.props.titlearry.map(
            (item)=>(<li key={item.id} id={item.id}>
            <p className="item_title">{item.value}</p>
            <p className="item-content">{item.content}</p>
            </li>
            ))
        return(
            <div className="body_title">
               <div className="container">
               <ul style={{marginBottom:0}}>
                {itemlist}
                </ul>
               </div>
            </div> 
        )
    }
}
// 欢迎语组件
class Welcome extends Component{
    render(){
        return(
            <div className="info">欢迎进入汇金币智能代币系统</div>
        )
    }
}
// elementui table组件
class TableList extends Component{      
    render() {
      return (
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
// 以太币交易组件
// 购买以太币
class ETHbuy extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
          form: {
            name: '',
            region: '',
            date1: null,
            date2: null,
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          }
        };
      }
      
      onSubmit(e) {
        e.preventDefault();
      }
      
      onChange(key, value) {
        this.setState({form:{key:value}});
        // this.state.form[key] = value;
        this.forceUpdate();
      }
      
      render() {
        return (
          <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
            <Form.Item>
                <Tag type="primary">
                以太币当前价格
                </Tag>                
            </Form.Item>
            <Form.Item label="购买/出售">
              <Select size="small" value={this.state.form.region} placeholder="请选择交易类型">
                <Select.Option label="购买" value="shanghai" ></Select.Option>
                <Select.Option label="出售" value="beijing"></Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="数量">
              <div style={{width:"300px"}}>
              <Input size="small" value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
              </div>
            </Form.Item>
            <Form.Item label="支付金额">
              <div style={{width:"300px"}}>
              <Input size="small" value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
              </div>
            </Form.Item>
            <Form.Item label="支付方式">
              <Select size="small" value={this.state.form.region} placeholder="请选择支付方式">
                <Select.Option label="微信" value="shanghai"></Select.Option>
                <Select.Option label="支付宝" value="beijing"></Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="显示密码">
                <Switch
                value={false}
                onColor="#ff4949"
                offColor="#20A0FF">
            </Switch>
            </Form.Item>
            <Form.Item>
              <Button size="small" type="primary" nativeType="submit">立即购买</Button>
              <Button size="small">取消</Button>
            </Form.Item>
          </Form>
        )
      }
      
}
// element tabs组件
class Tabslist extends Component{
    render() {
        return (
          <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
            <Tabs.Pane label="查看账户" name="1">
            <TableList data={this.props.data} columns={this.props.columns}/>
            </Tabs.Pane>
            <Tabs.Pane label="查看区块" name="2">
            <TableList data={this.props.data_qukuai} columns={this.props.columns_qukuai} height={550}/>
            <Fenye/>
            </Tabs.Pane>
            <Tabs.Pane label="以太币交易" name="3">
            <ETHbuy/>
            </Tabs.Pane>
          </Tabs>
        )
      }
}
// element 分页组件
class Fenye extends Component{
    render() {
        return (
          <div className="last" style={{float:"right",marginTop:10}}>
            <div className="block ">
              <Pagination layout="prev, pager, next, jumper" total={4000} pageSize={50} currentPage={1} onCurrentChange={size=>console.log(size)}/>
            </div>
          </div>
        )
      }
}
//账户列表头部
class BodyContent extends Component{
    render(){
        return(
            <div className="container">
                <Welcome/>
                <div> 
                    <Tabslist data={this.props.data} columns={this.props.columns} data_qukuai={this.props.data_qukuai} columns_qukuai={this.props.columns_qukuai}/>  
                </div>
            </div>
        )
    }
}
// 账户列表底部，接收父组件从数据库获得的信息并显示
// class BodyFoot extends Component{
//     render(){
//         let itemlist=this.props.accountarry.map(item=>(<tr key={item.id}><td>{item.accountaddress}</td><td>{item.accountnumber}</td><td>{item.lockd.toString()}</td></tr>))
//         return(
//             <div className="accounts">
//                 <table>
//                     <thead>
//                         <tr><th>账户地址</th><th>代币数</th><th>解锁</th></tr>
//                     </thead>
//                     <tbody>
//                         {itemlist}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }

// 组件叠放，对外输出，从数据库获取信息并传递给子组件
class Homebody extends Component{
    constructor(props){
        super(props);
        this.state={
            titlearry:config.BodyTitle_arry,
            columns_qukuai:[
                {
                    label:"区块号",
                    prop:"qukuainumber",
                    className:"index",
                    width:"100rem",
                    align:"center",
                    
                },
                    {
                      label: "矿主",
                      prop: "qukuaiower",
                      width: "570rem",
                      align:"center",
                    
                    },
                    {
                      label: "已用GAS",
                      prop: "gasused",
                      width: "300rem",
                      align:"center",
                     
                    },
                    {
                      label: "交易数",
                      prop: "trancenumber",
                      minwidth: "200rem",
                      align:"center",
                     
                    },
            ],
            data_qukuai:config.qukuailist,
            columns: [{
                label:"账户",
                prop:"index",
                className:"index",
                width:"70rem",
                align:"center",
                
            },
                {
                  label: "账户地址",
                  prop: "address",
                  width: "470rem",
                  align:"center",
                
                },
                {
                  label: "以太币",
                  prop: "number",
                  width: "400rem",
                  align:"center",
                    render:function(data){
                        return(
                            <span>
                            <Tag type="primary">{data.number}</Tag>
                            </span>
                        )
                    }
                },
                {
                  label: "锁定/解锁",
                  prop: "locked",
                  align:"center",
                  minwidth:"80rem",
                  render: function(){
                    return (
                      <span>
                       <Button plain={true} type="info" size="small">锁定</Button>
                       <Button type="warning" size="small">解锁</Button>
                      </span>
                    )
                  }
                }
              ],
            data:config.accounts,
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
                  accountsmessageitem.number=app.web3.eth.getBalance(item).toString();
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
                <BodyTitle titlearry={this.state.titlearry}/>
                <BodyContent accountarry={this.state.accountarry} data={this.state.data} columns={this.state.columns} data_qukuai={this.state.data_qukuai} columns_qukuai={this.state.columns_qukuai}/>
            </div>
        )
    }
}
class Home extends  Component{
    render(){
        return(
            <div>
                <Head/>
                <Homebody/>
                <Foot/>
            </div>
        )
    }
}
export default Home;
export {BodyTitle,Welcome};