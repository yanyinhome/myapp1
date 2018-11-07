import React,{Component} from "react";
import {Button,Form,Input,Select,Notification,Layout,Table}  from "element-react";
import "element-theme-default";
import HjbService from "../../../../../services/HjbService";
import userServices from "../../../../../services/userServices"
import {Headtitle, ResultShow,Changeshow,ChildrenTitle,HistoryList} from "../public"
// 代币冻结/解冻组件
export default class FozenAccount extends Component{
    constructor(props) {
        super(props);
        this.state = {
          form: {
            region: '0',
           address:""
          },
          rules:{
            address:[{required:true,message:"地址不能为空",trigger:'blur'}]
          },
          // 冻结账户列表数据
          frozen_account_list:{
            columns: [
              {
                label: "冻结日期",
                prop: "date",
              },
              {
                label: "昵称",
                prop: "name",
              },
              {
                label: "地址",
                prop: "address",
                width:360
              }
            ],
            data:[]
          },
          // 冻结历史列表数据
          frozen_history:[],
          // 冻结结果状态数据
          resultshow:{
            children:"暂无结果",
            visible:"none",
            hash:""
          },
          // chang结果状态数据
          Changeshow:{
            children:"未查询到用户",
            visible:"none",
            state:""
          },
        };
      }
      componentDidMount(){
        // 查询已冻结的账户列表
      userServices.get_frozen_accounts().then(res=>{
        if(res.data){
          const {data}=res;
          const list=data.result.map(item=>{
            return {
              date:item.time,
              name:item.username,
              address:item.address
            }
          })
         this.setState({frozen_account_list:Object.assign({},this.state.frozen_account_list,{data:list})})
        }
      }).catch(err=>{
        console.log(err)
      })
        //查询冻结解冻操作的历史记录
       userServices.get_frozen_history().then(res=>{
         console.log(res)
         const data=res.data.result;
         const list=data.map(item=>{
           return {
             date:item.time,
            username:item.username,
            state:item.state,
            message:"成功"
           }
         })
         this.setState({frozen_history:list})
       }).catch(err=>{
         console.log(err)
       })  
      }
      handleReset(e) {
        e.preventDefault(); 
        this.setState({form:{region: '',address: ''}});   
        this.refs.form.resetFields()
      }
      onSubmit(e) {
        e.preventDefault();
        if(this.state.Changeshow.children.length!==0&&this.state.Changeshow.children.length!==6){
          HjbService.HjbFroze({region:this.state.form.region,address:this.state.Changeshow.children}).then(res=>{
            console.log(res)
            let code=res.data.state;
            switch (code){
              case 0:
              if(res.data.result===0){
                Notification.info({
                  title:"提示",
                  message:res.message,
                  duration:2000,
                })
              }else{
                Notification.success({
                  title:"提示",
                  message:res.message,
                  duration:2000,
                })
                this.setState({resultshow:Object.assign({},this.resultshow,{children:`${this.state.Changeshow.children}${res.message}`,visible:"block",hash:res.data.hash})}) 
              }
              return;
              case 1:
              if(res.data.result===0){
                Notification.info({
                  title:"提示",
                  message:res.message,
                  duration:2000,
                })
              }else{
                Notification.success({
                  title:"提示",
                  message:res.message,
                  duration:2000,
                })
              }
              return;
              case 2:
              if(res.data.result===0){
                Notification.info({
                  title:"提示",
                  message:res.message,
                  duration:2000,
                })
              }else{
                Notification.success({
                  title:res.message,
                  message:`账户汇金币数量：${res.data.result}`,
                  duration:2000,
                }) 
              }
              return;
              default:
              console.log(res)
              return;
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
      resultSelct=()=>{
        this.setState({form:Object.assign({},this.state.form,{address:this.state.Changeshow.children})})
      }
      // 输入昵称是查询函数
      onChange(key, value) {
        this.setState({form:Object.assign({},this.state.form,{[key]:value})});
        console.log(value)
        if(value===""){
          this.setState({Changeshow:Object.assign({},this.state.Changeshow,{visible:"none"})})
        }else{
          this.setState({Changeshow:Object.assign({},this.state.Changeshow,{visible:"inline-block"})})
          userServices.usersearch({username:value,address:value}).then(res=>{
           const {data}=res;
           if(res.code===1){
             if(data.state===1){
              this.setState({Changeshow:Object.assign({},this.state.Changeshow,{children:`${data.address}冻结中`,state:data.state})})
             }else{
              this.setState({Changeshow:Object.assign({},this.state.Changeshow,{children:`${data.address}未冻结`,state:data.state})})
             }
             console.log("Changeshow",this.state.Changeshow) 
           }else{
            this.setState({Changeshow:Object.assign({},this.state.Changeshow,{children:"未查询到用户"})})
           }
          }).catch(err=>{console.log(err)})
         
        }        
      }
    render(){
        return(
    <div>
      <Layout.Row>
      <Headtitle>账户冻结/解冻</Headtitle>
      <Layout.Col lg="12" sm="24">      
      <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
      <Form.Item label="请选择操作选项">
        <Select value={this.state.form.region} placeholder="请选择操作选项" onChange={this.onChange.bind(this, 'region')}>
          <Select.Option label="冻结" value="0" selected></Select.Option>
          <Select.Option label="解冻" value="1"></Select.Option>
          <Select.Option label="查询" value="2"></Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="输入地址" prop="address">
        <Input style={{width:300}} value={this.state.form.address} onChange={this.onChange.bind(this, 'address')} placeholder="输入地址或者用户名"></Input>
      </Form.Item>
      <Form.Item>
        <Changeshow onclick={this.resultSelct} visible={this.state.Changeshow.visible}>{this.state.Changeshow.children}</Changeshow>
      </Form.Item>
      <Form.Item>
        <Button type="primary" nativeType="submit">确定</Button>
        <Button onClick={this.handleReset.bind(this)}>取消</Button>
      </Form.Item>
    </Form>
    </Layout.Col>
    <Layout.Col lg="12" sm="24">
     <ResultShow visible={this.state.resultshow.visible} children={this.state.resultshow.children} hash={this.state.resultshow.hash}></ResultShow>   
    </Layout.Col>
    </Layout.Row>
    <Layout.Row>
      <Layout.Col lg="12" md="24" style={{padding:"10px"}}>
          <ChildrenTitle>已冻结账户列表</ChildrenTitle>
          <Table
           style={{width: '100%'}}
           columns={this.state.frozen_account_list.columns}
           data={this.state.frozen_account_list.data}
           stripe={true}
           border={true}
          />
      </Layout.Col>
      <Layout.Col lg="12" md="24" style={{padding:"10px"}}>
        <ChildrenTitle>历史操作记录</ChildrenTitle>
        <HistoryList data={this.state.frozen_history}></HistoryList>
      </Layout.Col>
    </Layout.Row>
    </div>
    )
    }
  }