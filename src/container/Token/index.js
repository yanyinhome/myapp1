import React,{Component} from "react";
import {Tabs,Input,Button,Layout,Tag,Form,Collapse} from 'element-react';
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
                state:"1",
                eth_acceptaddrtss:"",
                eth_acceptnumber:"",
                hjb_acceptaddrtss:"",
                hjb_acceptnumber:"",
            },
            ethresult:[],
            hjbresult:[],
            rules:{
                eth_acceptnumber:[{ required:true,message:'内容不能为空',trigger:'blur'},],
                eth_acceptaddrtss:[{ required:true,message:'内容不能为空',trigger:'blur'},],
                hjb_acceptaddrtss:[{ required:true,message:'内容不能为空',trigger:'blur'},],
                hjb_acceptnumber:[{ required:true,message:'内容不能为空',trigger:'blur'},],
            }
        }
    }
    componentDidMount(){
        // 绑定回车事件
        document.addEventListener("keydown",this.keydown);
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
    // 回车事件
    keydown=(e)=>{
        if(e.keyCode!==13){return}
            else{
                if(this.state.form.state==="1"){
                    this.handsubmit_eth()
                }else{
                    this.handsubmit_hjb() 
                }
            }           
    }  
    handsubmit_eth=()=>{
        EthService.EthSend({
            tourial_address:this.state.form.eth_acceptaddrtss,
            tourial_number:this.state.form.eth_acceptnumber
        }).then(data=>{
            let resultdata=data.data
           this.setState(function(prevState) {       
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
                 return {
                     hjbresult:[resultdata]
                 };
               });
            }
        ).catch(err=>{
            console.log("失败",err)
        })
    }
    // 解除绑定的回车事件
    componentWillUnmount(){
        document.removeEventListener("keydown",this.keydown);
      }
    // tabs状态该表事件
    changestate=(key,e)=>{
        console.log(this.state.form)      
        this.setState({form: Object.assign(this.state.form, {[key]: e.props.name})})
    }
    render(){
        return(
                <Layout.Row>
                    <Layout.Col lg="12" offset="6">
                        <Tabs activeName="1" onTabClick={this.changestate.bind(this,"state")}>
                            <TabPane label="ETH转账" name="1">
                                <Layout.Row>
                                    <Layout.Col span="12" style={{paddingLeft:"1rem"}}>
                                        <Form labelPosition="top" rules={this.state.rules} model={this.state.form}>
                                            <Form.Item label="接收方" prop="eth_acceptaddrtss">
                                            <Input value={this.state.form.eth_acceptaddrtss} onChange={this.onChange.bind(this, 'eth_acceptaddrtss')} type="text" style={{width:"20rem",marginRight:"2rem"}}/>
                                            </Form.Item>
                                            <Form.Item label="数量" prop="eth_acceptnumber">
                                            <Input value={this.state.form.eth_acceptnumber} onChange={this.onChange.bind(this, 'eth_acceptnumber')} type="text"  style={{width:"20rem",marginRight:"2rem"}}/>
                                            <Button type="primary" onClick={this.handsubmit_eth}>提交</Button>
                                            </Form.Item>
                                            <Form.Item style={{width:"20rem"}}>
                                                <Collapse>
                                                    <Collapse.Item title={"账户信息"} >
                                                    <h5 style={{fontWeight:500}}>持有以太币：{this.state.eth_number}</h5>
                                                    </Collapse.Item>
                                                </Collapse>
                                            </Form.Item>
                                        </Form>                                        
                                    </Layout.Col>
                                    <Layout.Col span="12">                 
                                        <History result={this.state.ethresult}/>                               
                                    </Layout.Col>
                                </Layout.Row>            
                            </TabPane>
                            <TabPane label="HJB转账" name="2">
                                    <Layout.Row>
                                        <Layout.Col span="12" style={{paddingLeft:"1rem"}}>
                                            <Form labelPosition="top" rules={this.state.rules} model={this.state.form}>
                                                <Form.Item label="接收方" prop="hjb_acceptaddrtss">
                                                    <Input value={this.state.form.hjb_acceptaddrtss} onChange={this.onChange.bind(this, 'hjb_acceptaddrtss')} type="text" style={{width:"20rem",marginRight:"2rem"}}/>
                                                </Form.Item>
                                                <Form.Item label="数量" prop="hjb_acceptnumber">
                                                    <Input value={this.state.form.hjb_acceptnumber} onChange={this.onChange.bind(this, 'hjb_acceptnumber')} type="text" style={{width:"20rem",marginRight:"2rem"}}/>
                                                    <Button type="primary" onClick={this.handsubmit_hjb}>提交</Button>
                                                </Form.Item>
                                                <Form.Item style={{width:"20rem"}}>
                                                    <Collapse>
                                                        <Collapse.Item title={"账户信息"} >
                                                        <h5 style={{fontWeight:500}}>持有汇金币币：{this.state.hjb_number}</h5>
                                                        </Collapse.Item>
                                                    </Collapse>
                                                </Form.Item>
                                            </Form>                                           
                                        </Layout.Col>
                                        <Layout.Col span="12">
                                        <History result={this.state.hjbresult}/> 
                                        </Layout.Col>
                                    </Layout.Row>     
                            </TabPane>                 
                        </Tabs>
                    </Layout.Col> 
                </Layout.Row>
               

        )
    }
}