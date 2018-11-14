import React,{Component} from "react";
import EthService from "../../../services/EthServices";
import HjbService from "../../../services/HjbService";
import {Table,Tabs} from "element-react";
import {Totime} from "../../../fun"
export default class History extends Component{
    constructor(props){
        super(props);
        this.state={
            columns: [
                {
                  label: "时间",
                  prop: "data",
                  width: 200,
                  align:"center"
                },
                {
                  label: "数量",
                  prop: "number",
                  width: 70,
                  align:"center"
                },
                {
                  label: "哈希地址",
                  prop: "hash",
                  align:"center"
                },
                {
                  label: "接收方",
                  prop: "toaddress",
                  align:"center",
                  width:360
                }
              ],
            HjbBuy_Sellcolumns: [
                {
                  label: "时间",
                  prop: "data",
                  width: 195,
                  align:"center"
                },
                {
                  label: "数量",
                  prop: "number",
                  width: 100,
                  align:"center",
                 
                },
                {
                  label: "哈希地址",
                  prop: "hash",
                  align:"center",
                  width:600
                },
                {
                  label: "买入/卖出",
                  prop: "type",
                  align:"center",
                 
                }
              ],
            ETHhistory:[],
            HJBhistorydata:[],
            HJBBuy_Sellhistory:[],            
        }
    }
    componentDidMount(){
        // 以太币转账记录    
        EthService.ETHhistory().then(data=>{
            let timearray=data.data.map(item=>{return {
                data:Totime(item.data),
                number:item.number,
                hash:item.hash,
                type:item.type,
                toaddress:item.toaddress
            }})
            this.setState({ETHhistory:timearray})
        })
        // 汇金币转账记录
        HjbService.HJBhistory().then(data=>{
            let timearray=data.data.map(item=>{return {
                data:Totime(item.data),
                number:item.number,
                hash:item.hash,
                type:item.type,
                toaddress:item.toaddress
            }})
            this.setState({HJBhistorydata:timearray})
        })
        // 汇金币买卖记录
        HjbService.HJBBuy_Sellhistory().then(data=>{
            console.log(data)
            let timearray=data.data.map(item=>{return {
                data:Totime(item.time),
                number:item.number,
                hash:item.hash,
                type:item.type===1?"买入":"卖出",
                toaddress:item.toaddress
            }})
            this.setState({HJBBuy_Sellhistory:timearray})
        })
    }
    render(){
        // let itemlist=this.state.history.map(item=>(<p key={item.hash}><span>{item.toaddress}</span><span>{item.number}</span><span>{item.hash}</span><span>{item.data.split("(")[0]}</span></p>))
        return(
            <div>
                 <Tabs  onTabClick={ (tab) => console.log(tab.props.name) }>
                    <Tabs.Pane label="以太币转账" name="1">
                            <Table
                            style={{width: '100%'}}
                            columns={this.state.columns}
                            data={this.state.ETHhistory}
                            border={true}
                            height={600}
                            highlightCurrentRow={true}
                            onCurrentChange={item=>{console.log(item)}}
                            stripe={true}
                        />
                    </Tabs.Pane>
                    <Tabs.Pane label="汇金币转账" name="2">
                        <Table
                            style={{width: '100%'}}
                            columns={this.state.columns}
                            data={this.state.HJBhistorydata}
                            border={true}
                            height={600}
                            highlightCurrentRow={true}
                            onCurrentChange={item=>{console.log(item)}}
                            stripe={true}
                        />
                    </Tabs.Pane>
                    <Tabs.Pane label="汇金币买卖" name="3">
                        <Table
                            style={{width: '100%'}}
                            columns={this.state.HjbBuy_Sellcolumns}
                            data={this.state.HJBBuy_Sellhistory}
                            border={true}
                            height={600}
                            highlightCurrentRow={true}
                            onCurrentChange={item=>{console.log(item)}}
                            stripe={true}
                        />
                    </Tabs.Pane>
                </Tabs>
                
            </div>
        )
    }
}