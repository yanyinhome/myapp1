import React,{Component} from "react";
import {Layout,Table}  from "element-react";
import HjbService from "../../../../../services/HjbService";
import "element-theme-default";
import {Headtitle,ChildrenTitle,ChildrenDiv} from "../public";
import EthServices from "../../../../../services/EthServices";
// 代币信息列表
export default class TokenShow extends Component{ 
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
        peermessage:{
          accountnumber:50,
          frozenaccountnumber:1,
          lasteblock:10788,
          Gas:"8000000",
          currentproviter:"192.168.124.2:8486",
          peers:0
        }
      }
    } 
    componentDidMount(){
      const self = this;
      HjbService.HJBmessage().then(
        res=>{
          if(res.code){
            if(res.code===0){
              return
            }else{
              EthServices.EthPeers().then(
                res=>{
                  self.setState({peermessage:res.data})
                }
              ).catch(err=>{console.log(err)})
              self.setState({TokenMessage:[res.data]})
            }
          }
        }
      ).catch(err=>{console.log(err);});
    }    
    render() {
      return (
        <div>
          <Headtitle>控制面板</Headtitle>
          <ChildrenTitle>代币信息</ChildrenTitle>
          <Table
          style={{width: '100%'}}
          columns={this.state.columns}
          data={this.state.TokenMessage}
          stripe={true}
          border={true}
          history={this.props.history}
        />
        <Layout.Row>
          <ChildrenTitle>节点信息</ChildrenTitle>
          <Layout.Col lg="8" md="12" sm="24">
            <ChildrenDiv>总账户数:{this.state.peermessage.accountnumber}</ChildrenDiv>
          </Layout.Col>
          <Layout.Col lg="8" md="12" sm="24">
          <ChildrenDiv>冻结账户数:{this.state.peermessage.frozenaccountnumbe}</ChildrenDiv>
          </Layout.Col>
          <Layout.Col lg="8" md="12" sm="24">
          <ChildrenDiv>最新区块数:{this.state.peermessage.lasteblock}</ChildrenDiv>
          </Layout.Col>
          <Layout.Col lg="8" md="12" sm="24">
          <ChildrenDiv>GAS值:{this.state.peermessage.Gas}</ChildrenDiv>
          </Layout.Col>
          <Layout.Col lg="8" md="12" sm="24">
          <ChildrenDiv>当前监听节点地址:{this.state.peermessage.currentproviter}</ChildrenDiv>
          </Layout.Col>
          <Layout.Col lg="8" md="12" sm="24">
          <ChildrenDiv>已连接兄弟节点:{this.state.peermessage.peers}</ChildrenDiv>
          </Layout.Col>
        </Layout.Row>
        </div>
      )
    }  
  }