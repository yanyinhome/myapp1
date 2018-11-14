import React from "react";
import {Headtitle} from "../public";
import {Layout,Table} from "element-react";
import adminServices from "../../../../../services/adminServices";
import "element-theme-default";
import {Totime} from "../../../../../fun";
export default class AdminAccounts extends React.Component {
    constructor(props){
        super(props);
        this.state={
             columns: [
          {
            label: "昵称",
            prop: "admin_name",
            align:"center",
          },
          {
            label: "角色",
            prop: "person",
            align:"center",
          },
          {
            label: "地址",
            prop: "address",
            align:"center",
          },
          {
            label: "上次登录时间",
            prop: "time",
            align:"center",
          },
        ],
        data:[]
        }
    }
    componentDidMount(){
        adminServices.admin_list().then(
            res=>{
               if(res.data){
                console.log(res);
                const data=res.data.result;
                const list=data.map(item=>{
                    return {
                      admin_name:item.username,
                      person:"管理员",
                      address:item.address,
                      time:Totime(item.lasttime),  
                    }
                })
                this.setState({data:list})
               }
            }).catch(err=>{
                console.log(err)
            })
    }
    render(){
        return(                
                <Layout.Row>
                    <Headtitle>后台用户</Headtitle>
                    <Layout.Col  span="24" style={{padding:"0 20px"}}>
                    <Table 
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    stripe={true}
                    />                        
                    </Layout.Col>
                </Layout.Row>            
        )
    }
}