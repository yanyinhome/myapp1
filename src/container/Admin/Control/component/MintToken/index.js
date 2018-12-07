import React,{Component} from "react";
import {Button,Form,Input,Notification,Layout,Table, Tabs}  from "element-react";
// import "element-theme-default";
import HjbService from "../../../../../services/HjbService";
import {Headtitle} from "../public";
import {Totime,DimSearch,bindenter} from "../../../../../fun";
import {Showlist,HistoryList} from "../../../../../Component/publicConponent"
// 代币增发组件
export default class MintToken extends Component{
    constructor(props) {
        super(props);

        this.state = {
            form: {
                number: '',
                state:"",
                address: '',
                username:""
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
            },
            // 模糊查询结果暂存
            checkresult:{
                display:"none",
                data:[]
            },
            // 现已发行代币数
            tokennumeber:"未查询到结果",
            // 冻结历史列表数据
            minttoken_history:[],
            // chang结果状态数据
            Changeshow:{
                children:"未查询到用户",
                username:"",
                visible:"none",
                state:"",
                action:""
            },
        };
    }
    componentDidMount(){
        // 绑定回车事件
        bindenter.bindenter(this.keydown);
       // 查询汇金币信息
       this.SearchHjbMessage();
       //查询增发记录
       this.SearchMinTokenHistory();
    }
    // 查询汇金币信息
    SearchHjbMessage=()=>{
        HjbService.HJBmessage().then(
            res=>{
                const{data}=res;
                this.setState({tokennumeber:data.totalSupply})
            }
        );
    }
    //查询增发记录
    SearchMinTokenHistory=()=>{
        HjbService.HjbZengfa_history().then(
            res=>{
                if(res.data){
                    const data=res.data.result;
                    const list=data.map(item=>{
                        return {
                            title:<span>{`${Totime(item.time)}管理员`}<strong>{item.admin_name}</strong>对账户<strong>{item.username}</strong>增发<strong>{item.number}代币</strong>成功</span>,
                            text:<p style={{ paddingLeft: 24 }}>
                                交易hash：{item.hash}<br/>
                                账户地址：{item.mint_address}<br/>
                            </p>
                        }
                    })
                    this.setState({minttoken_history:list})
                }}
        ).catch(err=>{
            console.log(err)
        })
    }
    // 解除绑定的回车事件
    componentWillUnmount(){
        bindenter.removebindenter(this.keydown)
    }
    // 回车事件
    keydown=(e)=>{
        if(bindenter.ifenter(e)){
            this.onSubmit(e)
        }
    }
    // 重置内容
    handleReset(e) {
        e.preventDefault();
        this.setState({form:{number:"",address:""}});
        this.refs.form.resetFields()
    }
    //提交到服务器
    onSubmit(e) {
        e.preventDefault();
        this.refs.form.validate(
            (valid)=>{
                if(valid){
                    if(this.state.form.address.length===42){
                        const{form}=this.state;
                        HjbService.HjbZengfa({number:form.number,address:form.address,username:form.username}).then(res=>{
                            if(res.data.number){
                                // 查询汇金币信息
                                this.SearchHjbMessage();
                                //查询增发记录
                                this.SearchMinTokenHistory();
                                Notification.info({
                                    title:res.data.message,
                                    message:`增发${res.data.number}以太币`,
                                    duration:2000,
                                })
                            }
                        }).catch(err=>{console.log(err)})
                    }else{
                        Notification.info({
                            title:"错误",
                            message:"地址格式不正确",
                            duration:2000,
                        })
                    }
                }
            }
        )
    }
    // 添加昵称模糊查询的input的change事件
    change(key,value){
        this.onChange(key,value);
        this.checkusername(value);
    }
    // 昵称模糊查询
    checkusername=(value)=>{
        const self=this;
        if(value.length!==0){
            DimSearch(value,function(res){
                if(res.data.result){
                    let dataresult=res.data.result.map(item=>{
                        return Object.assign({},item,{message:item.state===0?"未冻结":"冻结中"})
                    })
                    self.setState({checkresult:Object.assign({},self.state.checkresult,{data:dataresult,display:"block"})})
                }
            })
        }else {
            self.setState({checkresult:Object.assign({},self.state.checkresult,{data:[]})})
        }

    }
    // onChange事件
    onChange(key, value) {
        this.setState({form:Object.assign({},this.state.form,{[key]:value})});
    }
    // 失去焦点事件
    onblur=(e)=>{
        const  self=this;
        setTimeout(function () {
            self.setState({checkresult:Object.assign({},self.state.checkresult,{display:"none"})})
        },300)
    }
    // 重新获取焦点
    onfocus=(e)=>{
        this.setState({checkresult:Object.assign({},this.state.checkresult,{display:"block"})})
    }
    // 模糊查询显示结果点击事件
    result_click=(e)=>{
        console.log(this.state)
        let index=e.target.id;
        const{form,checkresult}=this.state;
        this.setState({form:Object.assign({},form,{address:checkresult.data[index].address,state:checkresult.data[index].state,username:checkresult.data[index].username}),checkresult:Object.assign({},checkresult,{data:[]})})
    }
    render(){
        return(
            <div>
                <Layout.Row>
                    <Layout.Col lg="12" sm="24">
                        <Headtitle>代币增发</Headtitle>
                        <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                            <Form.Item label="增发数量" prop="number">
                                <Input style={{width:300}} value={this.state.form.number} onChange={this.onChange.bind(this, 'number')} placeholder="请输入要增发的数量"></Input>
                            </Form.Item>
                            <Form.Item label="增发地址" prop="address">
                                <Input style={{width:300}} value={this.state.form.address} onBlur={this.onblur.bind(this)} onFocus={this.onfocus} onChange={this.change.bind(this, 'address')} placeholder="请输入要增发的账户昵称或地址"></Input>
                            </Form.Item>
                            <Form.Item>
                                <Showlist data={this.state.checkresult.data} display={this.state.checkresult.display} click={this.result_click}></Showlist>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" nativeType="submit">确定</Button>
                                <Button onClick={this.handleReset.bind(this)}>取消</Button>
                            </Form.Item>
                        </Form>
                    </Layout.Col>
                </Layout.Row>
                <hr/>
                <Layout.Row>
                    <Layout.Col lg="24" md="24" style={{padding:"10px"}}>
                        <Tabs onTabClick={ (tab) => console.log(tab.props.name) } style={{marginLeft:"1rem"}}>
                            <Tabs.Pane label="已发行代币数" name="1">
                                <h3>现已发行代币：{this.state.tokennumeber}</h3>
                                <p>
                                    注释:<br/>
                                    输入地址或者用户名即可给对方增发汇金币<br/>
                                    冻结中的账户无法增发汇金币
                                </p>
                            </Tabs.Pane>
                            <Tabs.Pane label="增发历史记录" name="2">
                                {/* <ChildrenTitle>历史操作记录</ChildrenTitle> */}
                                {/* <HistoryList data={this.state.frozen_history}></HistoryList> */}
                                <Layout.Row>
                                    <Layout.Col lg="12" md="24">
                                        <div style={{marginLeft:"1rem"}}>
                                            <HistoryList data={this.state.minttoken_history}></HistoryList>
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