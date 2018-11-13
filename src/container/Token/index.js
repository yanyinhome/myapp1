import React,{Component} from "react";
import {Tabs,Input,Button,Layout,Tag,Form,Collapse} from 'element-react';
import EthService from "../../services/EthServices";
import HjbService from "../../services/HjbService";
import {Showlist} from "../../Component/publicConponent";
import {bindenter,DimSearch} from "../../fun"
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
            // 昵称模糊查询显示数据
            checkresult:{
                data:[]
            },
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
        bindenter.bindenter(this.keydown)
        // 获取账户的地址，以太币数量和汇金币数量
        const self=this;
        EthService.EthAccounts().then(
            res=>{
                if(res){
                    if(Object.keys(res.data).length!==0){
                        self.setState({eth_number:res.data.eth_number?res.data.eth_number:0})
                        
                    } 
                }
                   
            }
        )
        HjbService.HjbAccounts().then(
            res=>{
                if(res){
                    if(Object.keys(res.data).length!==0){
                        self.setState({hjb_number:res.data.hjb_number?res.data.hjb_number:0})
                       
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
        if(bindenter.ifenter(e)){
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
// 昵称模糊查询
checkusername=(value)=>{
    const self=this;
    DimSearch(value,function(res){
        self.setState({checkresult:Object.assign({},self.state.checkresult.data,{data:res.data.result})}) 
    })
    // if(value.length!==0){
    //     userServices.usersearch({username:value,address:value}).then(res=>{
    //         this.setState({checkresult:Object.assign({},this.state.checkresult.data,{data:res.data.result})})
    //     }).catch(err=>{console.log(err)})
    // }
}
// 添加昵称模糊查询的input change事件
    change(key,value){
        this.onChange(key,value);
        this.checkusername(value);
    }
// 模糊查询显示结果点击事件
    result_click=(e)=>{
        console.log("e",e.target.id)
        this.setState({form:Object.assign({},this.state.form,{eth_acceptaddrtss:this.state.checkresult.data[e.target.id].address,hjb_acceptaddrtss:this.state.checkresult.data[e.target.id].address}),checkresult:Object.assign({},this.state.checkresult,{data:[]})})
    }
    // 解除绑定的回车事件
    componentWillUnmount(){
        bindenter.removebindenter(this.keydown)
      }
    // tabs状态改变事件
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
                                            <Input value={this.state.form.eth_acceptaddrtss} onChange={this.change.bind(this, 'eth_acceptaddrtss')} type="text" style={{width:"20rem",marginRight:"2rem"}} />
                                            <Showlist data={this.state.checkresult.data} click={this.result_click}></Showlist>
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
                                                    <Input value={this.state.form.hjb_acceptaddrtss} onChange={this.change.bind(this, 'hjb_acceptaddrtss')} type="text" style={{width:"20rem",marginRight:"2rem"}}/>
                                                    <Showlist data={this.state.checkresult.data} click={this.result_click}></Showlist>
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