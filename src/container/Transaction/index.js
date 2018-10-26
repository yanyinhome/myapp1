import React,{Component} from "react";
import { Tabs,Layout,Input,Button,Tag} from 'element-react';
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
            hjb_number:0,
            total_number:0,
            form:{
                buynumber:"",
                sellnumber:"",
            },
            buyresult:[],
            sellresult:[],
        }
    }
    // 根据input内容调整state
    onChange(key, value) {
        this.setState({
          form: Object.assign(this.state.form, { [key]: value })
        });
        console.log(this.state.form)
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
                console.log(data)
             }
         ).catch(err=>{
             console.log("失败",err)
         })
    }
    // 卖出提交
    handsubmit_sell=()=>{
        console.log(2)
        HjbService.HjbSell({
            value:this.state.form.sellnumber
         }).then(
             data=>{
                 let resultdata=data.data
                 this.setState(function(prevState) { 
                  //    prevState.result.push(resultdata)         
                  return {
                      sellresult:[resultdata]
                  };
                });
             }
         ).catch(err=>{
             console.log("失败",err)
         })
    }
    // 初始化状态
    componentDidMount(){
                // 获取账户的地址，汇金币最大买入数量和汇金币最大卖出数量
                const self=this;
                HjbService.HjbAccounts().then(
                    res=>{
                        if(res){
                            if(Object.keys(res.data).length!==0){
                                self.setState({hjb_number:res.data.hjb_number?res.data.hjb_number:0})
                                console.log(this.state)
                            } 
                        }
                           
                    }
                )
    }
    render(){
        return(
            <div>
                <Tabs activeName="1" onTabClick={key=>console.log(key.props)} className="container">
                    <TabPane label="买入" name="1">
                        <Layout.Row>
                            <Layout.Col span="12" style={{paddingLeft:"1rem"}}>
                                <h3 style={{marginBottom:"5px"}}>买入数量</h3>
                                <Input value={this.state.form.buynumber} onChange={this.onChange.bind(this, 'buynumber')} type="text" style={{width:"20rem",marginRight:"2rem"}}/>
                                <Button onClick={this.handsubmit_buy} type="primary">提交</Button>
                            </Layout.Col>
                            <Layout.Col span="12">
                            <History result={this.state.buyresult} type="买入"/>  
                            </Layout.Col>
                        </Layout.Row>     
                    </TabPane>
                    <TabPane label="卖出" name="2">
                        <Layout.Row>
                            <Layout.Col span="12" style={{paddingLeft:"1rem"}}>
                                <h3 style={{marginBottom:"5px"}}>卖出数量</h3>
                                <Input value={this.state.form.sellnumber} onChange={this.onChange.bind(this, 'sellnumber')} type="text" style={{width:"20rem",marginRight:"2rem"}}/>
                                <Button onClick={this.handsubmit_sell} type="primary">提交</Button>
                            </Layout.Col>
                            <Layout.Col span="12">
                            <History result={this.state.sellresult} type="卖出"/>
                            </Layout.Col>
                        </Layout.Row>    
                    </TabPane>                 
                </Tabs>
            </div>
        )
    }
}