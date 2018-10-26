import React,{Component} from "react";
import EthService from "../../../services/EthServices";
import {Table} from "element-react";
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
            data:[],
        }
    }
    componentDidMount(){
        EthService.ETHhistory().then(data=>{
            let timearray=[];
            data.data.map(item=>{return timearray.push(Object.assign(item,{data:item.data.split("G")[0]}))})
            this.setState({data:timearray})
        })
    }
    render(){
        // let itemlist=this.state.history.map(item=>(<p key={item.hash}><span>{item.toaddress}</span><span>{item.number}</span><span>{item.hash}</span><span>{item.data.split("(")[0]}</span></p>))
        return(
            <div>
                {/* {itemlist} */}
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    border={true}
                    height={600}
                    highlightCurrentRow={true}
                    onCurrentChange={item=>{console.log(item)}}
                    stripe={true}
                />
            </div>
        )
    }
}