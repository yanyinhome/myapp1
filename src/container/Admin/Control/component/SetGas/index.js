import React,{Component} from "react";
import {Button,Input,Form,Notification,Layout,Table,Tabs}  from "element-react";
import HjbService from "../../../../../services/HjbService";
import EthServices from "../../../../../services/EthServices";
import "element-theme-default";
import {Headtitle} from "../public";
import { Totime,} from "../../../../../fun";
import {Showlist,HistoryList} from "../../../../../Component/publicConponent";
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
                //获取阈值
                this.SearchGasYuZhi();
                // 获取gasprice
                this.SearchGasPrice();
                // 获取设置阈值的历史信息
                this.SearchGasSetHistory();
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
        //获取阈值
        this.SearchGasYuZhi();
        // 获取gasprice
        this.SearchGasPrice();
        // 获取设置阈值的历史信息
        this.SearchGasSetHistory();
    }
    // 获取gasprice
    SearchGasPrice=()=>{
        EthServices.EthPeers().then(
            res=>{
                this.setState({GasPrice:res.data.Gas})
            }
        ).catch(err=>{
            console.log(err)
        })
    }
    // 阈值没有设为公共变量，暂时无法获取
    SearchGasYuZhi=()=>{
        HjbService.HJBmessage().then(
            res=>{
                const{data}=res;
                console.log(data)
// this.setState({tokennumeber:data.totalSupply})
            }
        );
    }
    // 获取设置阈值的历史信息
    SearchGasSetHistory=()=>{
        HjbService.HjbSetGas_history().then(res=>{
            if(res.data){
                const data=res.data.result;
                console.log(data)
                const list=data.map(item=>{
                    return {
                        title:<span>{`${Totime(item.time)}管理员`}<strong>{item.adminname}</strong>设置阈值为<strong>{item.gas}</strong>成功</span>,
                        text:<p style={{ paddingLeft: 24 }}>
                            交易hash：{item.hash}<br/>
                        </p>
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
                    <Layout.Col lg="24" md="24" style={{padding:"10px"}}>
                        <Tabs onTabClick={ (tab) => console.log(tab.props.name) } style={{marginLeft:"1rem"}}>
                            <Tabs.Pane label="当前阈值及GAS价格" name="1">
                                <h3>阈值：{this.state.SetGas}</h3>
                                <h3>GASPRICE：{this.state.GasPrice}</h3>
                                <p>
                                    注释:<br/>
                                    阈值是账户最少的以太币数量（finney单位），主要用于交易时的GAS消耗。<br/>可以根据当前的当前GASPRICE设置，以保证交易
                                </p>
                            </Tabs.Pane>
                            <Tabs.Pane label="阈值设置历史记录  " name="2">
                                {/* <ChildrenTitle>历史操作记录</ChildrenTitle> */}
                                {/* <HistoryList data={this.state.frozen_history}></HistoryList> */}
                                <Layout.Row>
                                    <Layout.Col lg="12" md="24">
                                        <div style={{marginLeft:"1rem"}}>
                                            <HistoryList data={this.state.SetGas_history}></HistoryList>
                                        </div>
                                    </Layout.Col>
                                </Layout.Row>
                            </Tabs.Pane>
                        </Tabs>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }
}