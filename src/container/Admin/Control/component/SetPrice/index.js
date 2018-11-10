import React,{Component} from "react";
import {Button,Form,Input,Notification,Select,Layout,Table}  from "element-react";
import "element-theme-default";
import HjbService from "../../../../../services/HjbService";
import {Headtitle,ChildrenTitle,HistoryList} from "../public"
import { Totime } from "../../../../../fun";
// 设置买卖价格组件
export default class SetPrice extends Component{
  constructor(props) {
      super(props);      
      this.state = {
        form: {
          price: '',
          region: '0',
        },
        // 买卖价格表单的数据
        columns: [
          {
            label: "当前买入价格",
            prop: "buyprice",
          },
          {
            label: "当前卖出价格",
            prop: "sellprice",
          },
        ],
        price:[{buyprice:1000,sellprice:1000}],
        // 设置价格的历史记录数据
        setprice_history:[],
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
    componentDidMount(){
      HjbService.HJBmessage().then(
        res=>{
            const{data}=res;
            this.setState({price:[{sellprice:data.sellPrice,buyprice:data.buyPrice}]})
        }
      );
      HjbService.setprice_history().then(
        res=>{
          console.log(res)
         const data=res.data.result;
         const list=data.map(item=>{
           return{
             date:Totime(item.time),
             username:item.price,
             user:item.adminname,
             action:item.state===1?"设置买入价格":"设置卖出价格",
             type:item.state===1?"danger":"gray",
             message:"成功"
           }
         })
         this.setState({setprice_history:list})
        }
      ).catch(err=>{
        console.log(err)
      })

    }
    onChange(key, value) {
      this.setState({form:Object.assign({},this.state.form,{[key]:value})})
      this.forceUpdate();
    }
    
  render(){
      return(
  <div>
    <Layout.Row>
    <Headtitle>设置买入/卖出价格</Headtitle>
    <Layout.Col lg="12" sm="24">
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
    </Layout.Col>
    <Layout.Col lg="12" sm="24">
    </Layout.Col>
    </Layout.Row>
    <hr/>
    <Layout.Row>
      <Layout.Col lg="12" md="24" style={{padding:"10px"}}>
          <ChildrenTitle>当前买卖价格</ChildrenTitle>
          <Table
           style={{width: '100%'}}
           columns={this.state.columns}
           data={this.state.price}
           stripe={true}
           border={true}
          />
          <p style={{lineHeight:"1.5em",fontSize:"14px",color:"#333",padding:"10px"}}>
          注释：<br/>
          <b>sellPrice</b>出售时是1汇金币币换多少以太币（finney单位）<br/>
          <b>buyprice</b>是购买时一汇金币换多少以太币(finney单位)<br/>
          如果要获利就要buyPrice>sellprice<br/>
          举例 10000finney的以太币<br/>
          买入汇金币 10000/1000（buyprice）=10汇金币<br/>
          卖出时 10*800（sellprice）=8000finney<br/>
          中间的2000finey即合约的获利<br/>
          </p>
      </Layout.Col>
      <Layout.Col lg="12" md="24" style={{padding:"10px 20px",}}>
        <ChildrenTitle>历史操作记录</ChildrenTitle>
        <HistoryList data={this.state.setprice_history}></HistoryList>
      </Layout.Col>
    </Layout.Row>
  </div>
  )
  }
}