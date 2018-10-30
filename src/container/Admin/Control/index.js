import React,{Component} from "react";
import {Button,Layout,Form,Input,Tabs,Table,Select,}  from "element-react";
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
        },
        {
          label: "代币名称",
          prop: "name",
          align:'center',
          width:100,
        },
        {
            label:'代币标志',
            prop:'symbol',
            align:'center',
            width:100,
        },
        {
          label: "发行数量",
          prop: "totalSupply",
          align:'center',
          width:200,
        },
        {
          label: "买入价格",
          prop: "buyPrice",
          align:'center',
          width:100,
        },
        {
          label: "卖出价格",
          prop: "sellPrice",
          align:'center',
          width:100,
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
    HjbService.HJBmessage().then(
      res=>{
        console.log(res)
      }
    ).catch(err=>{console.log(err);})
  }    
  render() {
    return (
      <Table
        style={{width: '100%'}}
        columns={this.state.columns}
        data={this.state.message}
        stripe={true}
        border={true}
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
          region: '',
          address: ''
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
      HjbService.HjbFroze().then(res=>{
        console.log(res)
      }).catch(err=>{console.log(err)})
    }
    
    onChange(key, value) {
      this.setState({form:Object.assign({},this.state.form,{[key]:value})})
      this.forceUpdate();
    }
    
  render(){
      return(
  <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
    <Form.Item label="请选择操作选项">
      <Select value={this.state.form.region} placeholder="请选择操作选项" onChange={this.onChange.bind(this, 'region')}>
        <Select.Option label="冻结" value="frozen" selected></Select.Option>
        <Select.Option label="解冻" value="free"></Select.Option>
        <Select.Option label="查询" value="search"></Select.Option>
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
      HjbService.HjbSetGas().then(res=>{
        console.log(res)
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
              HjbService.HjbZengfa().then(res=>{
                console.log(res)
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
          number: '',
          region: '',
        },
        rules:{
          number:[{
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
      this.setState({form:{number:"",region:""}});    
      this.refs.form.resetFields()
    }    
    onSubmit(e) {
      e.preventDefault();
      this.refs.form.validate(
        (valid)=>{
          if(valid){
            HjbService.HjbSetPrice().then(res=>{
              console.log(res)
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
        <Select.Option label="设置买入价格" value="buyprice"></Select.Option>
        <Select.Option label="设置卖出价格" value="sellprice"></Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="输入价格" prop="number">
      <Input style={{width:300}} value={this.state.form.number} onChange={this.onChange.bind(this, 'number')}></Input>
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
         
            // 
      }}
      componentDidMount(){
        // 验证，做一个判断，如果已经登录则跳转
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
              <Layout.Row >
                  <Layout.Col span="12" offset="6">
                  <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
                      <Tabs.Pane label="代币信息" name="1">
                        <TokenShow data={this.state.TokenMessage} columns={this.state.columns}/>
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