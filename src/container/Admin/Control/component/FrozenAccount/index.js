import React,{Component} from "react";
import {Button,Form,Input,Select,Notification,Layout,Table}  from "element-react";
import "element-theme-default";
import HjbService from "../../../../../services/HjbService";
import userServices from "../../../../../services/userServices";
import {Headtitle, ResultShow,ChildrenTitle,HistoryList} from "../public";
import {Totime,bindenter,DimSearch} from "../../../../../fun";
import {Showlist} from "../../../../../Component/publicConponent";
// 代币冻结/解冻组件
export default class FozenAccount extends Component{
    constructor(props) {
        super(props);
        this.state = {
          form: {
            region: '0',
           address:"",
           state:"",
           username:""
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
                width:170
              },
              {
                label: "昵称",
                prop: "name",
              },
              {
                label: "地址",
                prop: "address",
                width:360
              },
              {
                label: "管理员",
                prop: "adminer",
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
            username:"",
            visible:"none",
            state:"",
            action:""
          },
          // 模糊查询结果暂存
          checkresult:{
            data:[]
          }
        };
      }
      componentDidMount(){
        // 绑定回车事件
        bindenter.bindenter(this.keydown)
        // 查询已冻结的账户列表
      userServices.get_frozen_accounts().then(res=>{
        console.log(res)
        if(res.data){
          const {data}=res;
          const list=data.result.map(item=>{
            return {
              date:Totime(item.time),
              name:item.username,
              address:item.address,
              adminer:item.adminname
            }
          })
         this.setState({frozen_account_list:Object.assign({},this.state.frozen_account_list,{data:list})})
        }
      }).catch(err=>{
        console.log(err)
      })
        //查询冻结解冻操作的历史记录
       userServices.get_frozen_history().then(res=>{
         const data=res.data.result;
         const list=data.map(item=>{
           return {
             date:Totime(item.time),
            username:item.username,
            user:res.data.admin_name,
            action:item.state===1?"冻结":"解冻",
            type:item.state===1?"danger":"gray",
            message:"成功"
           }
         })
         this.setState({frozen_history:list})
       }).catch(err=>{
         console.log(err)
       })  
      }
    // 解除绑定的回车事件
    componentWillUnmount(){
      bindenter.removebindenter(this.keydown)
    }
    // 重置函数
      handleReset(e) {
        e.preventDefault(); 
        this.setState({form:{region: '',address: ''}});   
        this.refs.form.resetFields()
      }
    // 回车事件
      keydown=(e)=>{        
        if(bindenter.ifenter(e)){
           this.onSubmit(e)
        }       
    } 
    // 提交请求
      onSubmit(e) {
        e.preventDefault();
        if(this.state.form.address.length===42){        
            const{form}=this.state;
            let code=form.region;
            switch (code){
              case "0":
              if(form.state===1){
                Notification.info({
                  title:"提示",
                  message:"已冻结，勿重复冻结",
                  duration:1000,
                })
              }else{
              //  提交请求到服务器
             this.HandleServer(form)
              }
              return;
              case "1":
              if(form.state===0){
                Notification.info({
                  title:"提示",
                  message:"账户未冻结，无须解冻",
                  duration:2000,
                })
              }else{
                // 提交请求到服务器
                this.HandleServer(form)
              }
              return;
              case "2":
            //  提交请求到服务器
            this.HandleServer(form)
              return;
              default:
              return;
            }
        }else{
          Notification.info({
            title:"错误",
            message:"地址格式不正确",
            duration:2000,
          })
        }

      }
      // 请求提交到服务器，及服务器回应处理
      HandleServer=(data)=>{
        HjbService.HjbFroze(data).then(res=>{
          let code=res.data.state;
          let result=res.data.result;
          let hash=res.data.hash
          console.log(res)
          switch (code){
            case 0:
            this.setState({resultshow:{children:result===0?"冻结失败":"冻结成功",visible:"block",hash:hash?`交易hash：${hash}`:""}})
            return;
            case 1:
            this.setState({resultshow:{children:result===0?"解冻失败":"解冻成功",visible:"block",hash:hash?`交易hash：${hash}`:""}})
            return;
            case 2:
            this.setState({resultshow:{children:`账户汇金币金额：${result}`,visible:"block",hash:"冻结后将无法交易汇金币"}})
            return;
            default:
            return
          }

        }).catch(err=>{
          console.log(err)
        })
      }
      // resultSelct=()=>{
      //   this.setState({form:Object.assign({},this.state.form,{address:this.state.Changeshow.children})})
      // }
      // 添加昵称模糊查询的input的change事件
    change(key,value){
      this.onChange(key,value);
      this.checkusername(value);
  }
  // 昵称模糊查询
checkusername=(value)=>{
  const self=this;
  DimSearch(value,function(res){
    if(res.data.result){
      let dataresult=res.data.result.map(item=>{
        return Object.assign({},item,{message:item.state===0?"未冻结":"冻结中"})
      })
      self.setState({checkresult:Object.assign({},self.state.checkresult.data,{data:dataresult})}) 
    }
  })
}
      // 模糊查询显示结果点击事件
    result_click=(e)=>{
      let index=e.target.id;
      const{form,checkresult}=this.state;
      this.setState({form:Object.assign({},form,{address:checkresult.data[index].address,state:checkresult.data[index].state,username:checkresult.data[index].username}),checkresult:Object.assign({},checkresult,{data:[]})})
  }
      // 输入昵称时查询函数
      onChange(key, value) {
        this.setState({form:Object.assign({},this.state.form,{[key]:value})});
        // if(value===""){
        //   this.setState({Changeshow:Object.assign({},this.state.Changeshow,{visible:"none"})})
        // }else{
        //   this.setState({Changeshow:Object.assign({},this.state.Changeshow,{visible:"inline-block"})})
        //   userServices.usersearch({username:value,address:value}).then(res=>{
        //    const {data}=res;
        //    if(res.code===1){
        //       this.setState({Changeshow:Object.assign({},this.state.Changeshow,{children:`${data.address}`,state:data.state,username:data.username,action:data.state===1?"冻结中":"未冻结"})})
        //    }
        //   }).catch(err=>{console.log(err)})
         
        // }        
      }
      // 显示冻结解冻状态的函数
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
        <Input style={{width:300}} value={this.state.form.address} onChange={this.change.bind(this, 'address')} placeholder="输入地址或者用户名"></Input>
      </Form.Item>
      <Form.Item>
        {/* <Changeshow onclick={this.resultSelct} visible={this.state.Changeshow.visible}>{this.state.Changeshow.children}{this.state.Changeshow.action}</Changeshow> */}
        <Showlist data={this.state.checkresult.data} click={this.result_click}></Showlist>
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
    <hr/>
    <Layout.Row>
      <Layout.Col lg="12" md="24" style={{padding:"10px"}}>
          <ChildrenTitle>已冻结账户列表</ChildrenTitle>
          <Table
           style={{width: '100%'}}
           columns={this.state.frozen_account_list.columns}
           data={this.state.frozen_account_list.data}
           maxHeight={600}
           stripe={true}
           border={true}
          />
      </Layout.Col>
      <Layout.Col lg="12" md="24" style={{padding:"10px 20px",}}>
        <ChildrenTitle>历史操作记录</ChildrenTitle>
        <HistoryList data={this.state.frozen_history}></HistoryList>
      </Layout.Col>
    </Layout.Row>
    </div>
    )
    }
  }