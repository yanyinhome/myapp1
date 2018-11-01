import React,{Component} from "react";
import {Button,Layout,Form,Input,Tabs,Table,Select,Notification}  from "element-react";
import "element-theme-default";
import HjbService from "../../../services/HjbService";
// 代币信息列表
class TokenShow extends Component{ 
  constructor(props){
    super(props)
    this.state={
       // 代币信息表单表头数组
       columns: [
        {
          label:'管理者账户',
          prop:"adminAccount",
          align:'center',
          width:360
        },
        {
          label: "代币名称",
          prop: "name",
          align:'center',
          // width:100,
        },
        {
            label:'代币标志',
            prop:'symbol',
            align:'center',
            // width:100,
        },
        {
          label: "发行数量",
          prop: "totalSupply",
          align:'center',
          width:210,
        },
        {
          label: "买入价格",
          prop: "buyPrice",
          align:'center',
          // width:100,
        },
        {
          label: "卖出价格",
          prop: "sellPrice",
          align:'center',
          // width:100,
        },
      ],
      // 代币信息展示state
      TokenMessage: [{
        adminAccount:"无",
        name: '汇金币',
        totalSupply: '100',
        buyPrice: '0',
        sellPrice:"0",
        symbol:'0',
        decimals:'0',
      },],
    }
  } 
  componentDidMount(){
    // console.log(this.props)
    const self = this;
    HjbService.HJBmessage().then(
      res=>{
        if(res.code===0){
          Notification.info({
            title:"提示",
            message:res.message,
            onClose:function(){
              self.props.history.push('/admin')
            },
            duration:2000,
          }) 
        }else{
          // console.log(res);
          self.setState({TokenMessage:[res.data]})
        }
      }
    ).catch(err=>{console.log(err);})
  }    
  render() {
    return (
      <Table
        style={{width: '100%'}}
        columns={this.state.columns}
        data={this.state.TokenMessage}
        stripe={true}
        border={true}
        history={this.props.history}
      />
    )
  }  
}
// 代币冻结/解冻组件
class FozenAccount extends Component{
  constructor(props) {
      super(props);
      this.state = {
        form: {
          region: '0',
         address:""
        },
        rules:{
          address:[{required:true,message:"地址不能为空",trigger:'blur'}]
        }
      };
    }
    handleReset(e) {
      e.preventDefault(); 
      this.setState({form:{region: '',address: ''}});   
      this.refs.form.resetFields()
    }
    onSubmit(e) {
      e.preventDefault();
      // console.log(this.state.form)
      HjbService.HjbFroze(this.state.form).then(res=>{
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
    }
    
    onChange(key, value) {
      this.setState({form:Object.assign({},this.state.form,{[key]:value})})
      
    }
    
  render(){
      return(
  <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
    <Form.Item label="请选择操作选项">
      <Select value={this.state.form.region} placeholder="请选择操作选项" onChange={this.onChange.bind(this, 'region')}>
        <Select.Option label="冻结" value="0" selected></Select.Option>
        <Select.Option label="解冻" value="1"></Select.Option>
        <Select.Option label="查询" value="2"></Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="输入地址" prop="address">
      <Input style={{width:300}} value={this.state.form.address} onChange={this.onChange.bind(this, 'address')}></Input>
    </Form.Item>
    <Form.Item>
      <Button type="primary" nativeType="submit">确定</Button>
      <Button onClick={this.handleReset.bind(this)}>取消</Button>
    </Form.Item>
  </Form>
  )
  }
}
// 设置阈值信息组件
class SetGAS extends Component{
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
        }
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
          Notification.info({
            title:res.data.message,
            message:`阈值被设置为${res.data.number}`,
            duration:2000,
          })
        }
      }).catch(err=>{console.log(err)})
    }
    onChange(key, value) {
      this.setState({form:Object.assign({},this.state.form,{[key]:value})});
      this.forceUpdate();
    }
  render(){
      return(
  <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="150" onSubmit={this.onSubmit.bind(this)}>
    <Form.Item label="请输入新的GAS阈值" prop="desc">
      <Input style={{width:300}} value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
    </Form.Item>
    <Form.Item>
      <Button type="primary" nativeType="submit">确定</Button>
      <Button onClick={this.handleReset.bind(this)}>取消</Button>
    </Form.Item>
  </Form>    
      )
  }
}
// 代币增发组件
class MintToken extends Component{
  constructor(props) {
      super(props);
    
      this.state = {
        form: {
          number: '',
          address: '',
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
        }
      };
    }
    handleReset(e) {
      e.preventDefault(); 
      this.setState({form:{number:"",address:""}});    
      this.refs.form.resetFields()
    }    
    onSubmit(e) {
      e.preventDefault();
      this.refs.form.validate(
        (valid)=>{
            if(valid){
              HjbService.HjbZengfa(this.state.form).then(res=>{
                if(res.data.number){
                  Notification.info({
                    title:res.data.message,
                    message:`增发${res.data.number}以太币`,
                    duration:2000,
                  })
                }
              }).catch(err=>{console.log(err)})   
            }
        }  
      )
    } 
    onChange(key, value) {
      this.setState({form:Object.assign({},this.state.form,{[key]:value})});
      this.forceUpdate();
    }
  render(){
      return(
          <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
          <Form.Item label="增发数量" prop="number">
            <Input style={{width:300}} value={this.state.form.number} onChange={this.onChange.bind(this, 'number')}></Input>
          </Form.Item>
          <Form.Item label="增发地址" prop="address">
            <Input style={{width:300}} value={this.state.form.address} onChange={this.onChange.bind(this, 'address')}></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" nativeType="submit">确定</Button>
            <Button onClick={this.handleReset.bind(this)}>取消</Button>
          </Form.Item>
        </Form>  
      )
  }
}
// 设置买卖价格组件
class SetPrice extends Component{
  constructor(props) {
      super(props);      
      this.state = {
        form: {
          price: '',
          region: '0',
        },
        rules:{
          price:[{
              required:true,message:'内容不能为空',trigger:'blur'
          },{validator:(rule,value, callback) => {
              let numberonly=/^[0-9]+$/;
              if(!numberonly.test(value)){
                callback(new Error('只能是数字'));
              }else{
                callback()
              }
            } }]
        }
      };
    } 
    handleReset(e) {
      e.preventDefault(); 
      this.setState({form:{price:"",region:""}});    
      this.refs.form.resetFields()
    }    
    onSubmit(e) {
      e.preventDefault();
      this.refs.form.validate(
        (valid)=>{
          if(valid){
            HjbService.HjbSetPrice(this.state.form).then(res=>{
              let state=res.data.state;
              switch (state){
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
                default:
                return;
              }
            }).catch(err=>{console.log(err)})
          }
        }
      )
    }
    
    onChange(key, value) {
      this.setState({form:Object.assign({},this.state.form,{[key]:value})})
      this.forceUpdate();
    }
    
  render(){
      return(
  <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="150" onSubmit={this.onSubmit.bind(this)}>
    <Form.Item label="设置买入/卖出价格">
      <Select value={this.state.form.region} placeholder="请选择操作选项" onChange={this.onChange.bind(this, 'region')}>
        <Select.Option label="设置买入价格" selected value="0"></Select.Option>
        <Select.Option label="设置卖出价格" value="1"></Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="输入价格" prop="price">
      <Input style={{width:300}} value={this.state.form.price} onChange={this.onChange.bind(this, 'price')}></Input>
    </Form.Item>
    <Form.Item>
      <Button type="primary" nativeType="submit">确定</Button>
      <Button>取消</Button>
    </Form.Item>
  </Form>
  )
  }
}
// 代币管理TABS组件
export default class Control extends Component{
    constructor(props) {
        super(props);      
        this.state={
            username:"admin",
            loadout_display:"none"
            // 
      }}
      componentDidMount(){
        // 验证，做一个判断，如果已经登录则跳转
        // console.log(this.props)
      }
      loadout=()=>{
        this.setState({loadout_display:"block"})
      }
      handleReset(e) {
        e.preventDefault();
      
        this.refs.form.resetFields();
      }
      
      onChange(key, value) {
        this.setState({
          form: Object.assign({}, this.state.form, { [key]: value })
        });
      }
      
      render() {
        return (
          <div>
              <h1 style={{background:"#346aa9",color:"#fff",textAlign:"center",height:"100px",lineHeight:"100px",fontSize:"26px",fontWeight:300,marginBottom:"10pX"}}>欢迎来到 HJB 管理系统</h1>
              {/* <div style={{position:"relative"}}>
              <a style={{color:"#999",fontSize:"14px",display:"inline-block",float:"right",marginRight:"10rem"}} onClick={this.loadout}>{this.state.username}</a>
                <div>注销</div>
              </div> */}
              <Layout.Row >
                  <Layout.Col span="14" offset="5">
                  <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
                      <Tabs.Pane label="代币信息" name="1">
                        <TokenShow history={this.props.history} />
                      </Tabs.Pane>
                      <Tabs.Pane label="账户冻结/解冻" name="2">
                        <FozenAccount/>
                      </Tabs.Pane>
                      <Tabs.Pane label="设置买入/卖出价格" name="3">
                        <SetPrice/>
                      </Tabs.Pane>
                      <Tabs.Pane label="代币增发" name="4">
                        <MintToken/>
                      </Tabs.Pane>
                      {/* <Tabs.Pane label="转移管理者权限" name="5">
                      <AdminChange/>
                      </Tabs.Pane> */}
                      <Tabs.Pane label="设置GAS阈值信息" name="5">
                        <SetGAS/>
                      </Tabs.Pane>
                  </Tabs>   
                </Layout.Col>
              </Layout.Row>
             
          </div>
        )
      }
      
}