import React,{Component} from "react";
import { Tabs,Input,Button,Layout,Tag} from 'element-react';
import EthService from "../../services/EthServices";
import HjbService from "../../services/HjbService";
const TabPane = Tabs.Pane;
// 历史记录显示组件
export class History extends Component{
    render(){
        let historylist=this.props.result.map((item)=><p key={item.hash}>向<Tag type="primary">{item.to_address}</Tag>转账<Tag type="primary">{item.number}</Tag>以太币于<Tag type="gray">{item.time}</Tag>成功<br/>
        交易hash：<Tag type="warning">{item.hash}</Tag></p>)
        return(
            <div className="grid-content bg-purple-light">
            {historylist}
            </div>
        )
    }
}
// 默认导出组件
export default class Token extends Component{
    constructor(props){
        super(props);
        this.state={
            eth_number:'',
            hjb_number:'',
            form:{
                eth_acceptaddrtss:"",
                eth_acceptnumber:"",
                hjb_acceptaddrtss:"",
                hjb_acceptnumber:"",
            },
            ethresult:[],
            hjbresult:[]
        }
    }
    componentDidMount(){
        // 获取账户的地址，以太币数量和汇金币数量
        const self=this;
        EthService.EthAccounts().then(
            res=>{
                if(res){
                    if(Object.keys(res.data).length!==0){
                        self.setState({eth_number:res.data.eth_number?res.data.eth_number:0})
                        console.log(this.state)
                    } 
                }
                   
            }
        )
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
    onChange(key, value) {
        this.setState({
          form: Object.assign(this.state.form, { [key]: value })
        });
      }
    handsubmit_eth=()=>{
        EthService.EthSend({
            tourial_address:this.state.form.eth_acceptaddrtss,
            tourial_number:this.state.form.eth_acceptnumber
        }).then(data=>{
            let resultdata=data.data
           this.setState(function(prevState) { 
            //    prevState.result.push(resultdata)         
            return {
                ethresult:[resultdata]
            };
          });
        }).catch(err=>{
            console.log("失败",err)
        })
    }
    handsubmit_hjb=()=>{
        HjbService.HjbSend({
           to_address:this.state.form.hjb_acceptaddrtss,
           value:this.state.form.hjb_acceptnumber 
        }).then(
            data=>{
                let resultdata=data.data
                this.setState(function(prevState) { 
                 //    prevState.result.push(resultdata)         
                 return {
                     hjbresult:[resultdata]
                 };
               });
            }
        ).catch(err=>{
            console.log("失败",err)
        })
    }
    render(){
        return(
            <div>
                <Tabs activeName="1" onTabClick={key=>console.log(key.props)} className="container">
                    <TabPane label="ETH转账" name="1">
                        <Layout.Row>
                            <Layout.Col span="12" style={{paddingLeft:"1rem"}}>
                                <h3 style={{marginBottom:"5px"}}>接收方</h3>
                                <Input value={this.state.form.eth_acceptaddrtss} onChange={this.onChange.bind(this, 'eth_acceptaddrtss')} type="text" style={{width:"20rem",marginRight:"2rem"}}/>
                                <h3 style={{marginBottom:"5px"}}>数量</h3>
                                <Input value={this.state.form.eth_acceptnumber} onChange={this.onChange.bind(this, 'eth_acceptnumber')} type="text"  style={{width:"20rem",marginRight:"2rem"}}/>
                                <Button type="primary" onClick={this.handsubmit_eth}>提交</Button>
                            </Layout.Col>
                            <Layout.Col span="12">                 
                            <History result={this.state.ethresult}/>                               
                            </Layout.Col>
                        </Layout.Row>            
                    </TabPane>
                    <TabPane label="HJB转账" name="2">
                            <Layout.Row>
                                <Layout.Col span="12" style={{paddingLeft:"1rem"}}>
                                    <h3 style={{marginBottom:"5px"}}>接收方</h3>
                                    <Input value={this.state.form.hjb_acceptaddrtss} onChange={this.onChange.bind(this, 'hjb_acceptaddrtss')} type="text" style={{width:"20rem",marginRight:"2rem"}}/>
                                    <h3 style={{marginBottom:"5px"}}>数量</h3>
                                    <Input value={this.state.form.hjb_acceptnumber} onChange={this.onChange.bind(this, 'hjb_acceptnumber')} type="text" style={{width:"20rem",marginRight:"2rem"}}/>
                                    <Button type="primary" onClick={this.handsubmit_hjb}>提交</Button>
                                </Layout.Col>
                                <Layout.Col span="12">
                                <History result={this.state.hjbresult}/> 
                                </Layout.Col>
                            </Layout.Row>     
                    </TabPane>                 
                </Tabs>
            </div>
        )
    }
}