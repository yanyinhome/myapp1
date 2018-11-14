import React,{Component} from "react";
import { Tabs,Layout,Input,Button,Tag,Collapse, Form} from 'element-react';
import HjbService from "../../services/HjbService";
// 历史记录显示组件
export class History extends Component{
    render(){
        let historylist=this.props.result.map((item)=><p key={item.hash}>{this.props.type}<Tag type="primary">{item.number}</Tag>以太币于<Tag type="gray">{item.time}</Tag>成功<br/>
        交易hash：<Tag type="warning">{item.hash}</Tag></p>)
        return(
            <div className="grid-content bg-purple-light">
            {historylist}
            </div>
        )
    }
}
const TabPane = Tabs.Pane;
export default class Token extends Component{
    constructor(props){
        super(props);
        this.state={
            buyprice:"暂未获得",
            sellprice:"暂未获得",
            max_buynumber:"0",
            hjb_number:0,
            total_number:0,
            form:{
                state:"1",
                buynumber:"",
                sellnumber:"",
            },
            buyresult:[],
            sellresult:[],
            rules:{
                buynumber:[{ required:true,message:'内容不能为空',trigger:'blur'},],
                sellnumber:[{ required:true,message:'内容不能为空',trigger:'blur'},],
            }
        }
    }
    // 根据input内容调整state
    onChange(key, value) {
        this.setState({
          form: Object.assign(this.state.form, { [key]: value })
        });
      }
    // 买入提交
    handsubmit_buy=()=>{
        HjbService.HjbBuy({
            value:this.state.form.buynumber
         }).then(
             data=>{
                 let resultdata=data.data
                 this.setState(function(prevState) { 
                  //    prevState.result.push(resultdata)         
                  return {
                      buyresult:[resultdata]
                  };
                });
             }
         ).catch(err=>{
             console.log("失败",err)
         })
    }
    // 卖出提交
    handsubmit_sell=()=>{
        HjbService.HjbSell({
            value:this.state.form.sellnumber
         }).then(
             data=>{
                 let resultdata=data.data
                 this.setState(function(prevState) {         
                  return {
                      sellresult:[resultdata]
                  };
                });
             }
         ).catch(err=>{
             console.log("失败",err)
         })
    }
    // 回车事件
    keydown=(e)=>{
        e.preventDefault();
            if(this.state.form.state==="1"){
                this.handsubmit_buy()
            }else{
               this.handsubmit_sell() 
            }
    }
      componentWillUnmount(){
        // document.removeEventListener("keydown",this.keydown);
      }
    // 初始化状态
    componentDidMount(){
        // 绑定回车事件
        // document.addEventListener("keydown",this.keydown);
                // 获取账户的地址，汇金币最大买入数量和汇金币最大卖出数量
                const self=this;
                HjbService.HjbAccounts().then(
                    res=>{
                        console.log(res)
                        if(res){
                            if(Object.keys(res.data).length!==0){
                                let eth=res.data.eth_number;
                                let price=res.data.hjb_buyprice;
                                self.setState({
                                    hjb_number:res.data.hjb_number?res.data.hjb_number:0,
                                    buyprice:price,
                                    sellprice:res.data.hjb_sellprice,
                                })
                                if(eth&&price!==0){
                                    let max_number=parseFloat(eth)*1000000000000000000/price;
                                   self.setState({max_buynumber:max_number});
                                }                             
                            } 
                        }
                           
                    }
                )
    }
    changestate=(key,e)=>{        
        this.setState({form: Object.assign(this.state.form, {[key]: e.props.name})})
    }
    render(){
        return(
            <Layout.Row>
                <Layout.Col lg="12" offset="6">
                <Tabs activeName="1"  onTabClick={this.changestate.bind(this,"state")}>
                    <TabPane label="买入汇金币" name="1">
                        <Layout.Row>
                            <Layout.Col span="12" style={{paddingLeft:"1rem"}}>
                                <Form labelPosition="top" rules={this.state.rules} model={this.state.form} onSubmit={this.keydown.bind(this)}>
                                    <Form.Item label="买入数量" prop="buynumber">
                                    <Input value={this.state.form.buynumber} onChange={this.onChange.bind(this, 'buynumber')} type="text" style={{width:"20rem",marginRight:"2rem"}}/>
                                    <Button onClick={this.handsubmit_buy} type="primary">提交</Button>
                                    </Form.Item>             
                                    <Form.Item style={{width:"20rem"}}>
                                    <Collapse>
                                        <Collapse.Item title={"账户信息"} >
                                        <h5 style={{fontWeight:500}}>当前买入价格：{this.state.buyprice}<br/>持有汇金币：{this.state.hjb_number}<br/>可以购买汇金币最大值：{this.state.max_buynumber}</h5>
                                        </Collapse.Item>
                                    </Collapse>
                                    </Form.Item>
                                </Form>
                            </Layout.Col>
                            <Layout.Col span="12">
                            <History result={this.state.buyresult} type="买入"/>  
                            </Layout.Col>
                        </Layout.Row>     
                    </TabPane>
                    <TabPane label="卖出汇金币" name="2">
                        <Layout.Row>
                            <Layout.Col span="12" style={{paddingLeft:"1rem"}}>
                                <Form labelPosition="top" rules={this.state.rules} model={this.state.form} onSubmit={this.keydown.bind(this)}>
                                    <Form.Item label="卖出数量" prop="sellnumber">
                                    <Input value={this.state.form.sellnumber} onChange={this.onChange.bind(this, 'sellnumber')} type="text" style={{width:"20rem",marginRight:"2rem"}}/>
                                    <Button onClick={this.handsubmit_sell} type="primary">提交</Button>
                                    </Form.Item>             
                                    <Form.Item style={{width:"20rem"}}>
                                    <Collapse>
                                        <Collapse.Item title={"账户信息"} >
                                        <h5 style={{fontWeight:500}}>当前卖出价格：{this.state.sellprice}<br/>持有汇金币：{this.state.hjb_number}</h5>
                                        </Collapse.Item>
                                    </Collapse>
                                    </Form.Item>
                                </Form>
                            </Layout.Col>
                            <Layout.Col span="12">
                            <History result={this.state.sellresult} type="卖出"/>
                            </Layout.Col>
                        </Layout.Row>    
                    </TabPane>                 
                </Tabs>
                </Layout.Col>
            </Layout.Row>
        )
    }
}