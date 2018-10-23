import React,{Component} from "react";
import { Tabs,Input,Button,Layout } from 'element-react';
const TabPane = Tabs.Pane;
export default class Token extends Component{
    render(){
        return(
            <div>
                <Tabs activeName="1" onTabClick={key=>console.log(key.props)} className="container">
                    <TabPane label="ETH转账" name="1">
                        <Layout.Row>
                            <Layout.Col span="12" style={{paddingLeft:"1rem"}}>
                                <h3 style={{marginBottom:"5px"}}>接收方</h3>
                                <Input type="text" style={{width:"20rem",marginRight:"2rem"}}/>
                                <Button type="primary">提交</Button>
                            </Layout.Col>
                            <Layout.Col span="12">
                                <div className="grid-content bg-purple-light">
                                已有x个区块确认交易
                                </div>
                            </Layout.Col>
                        </Layout.Row>            
                    </TabPane>
                    <TabPane label="HJB转账" name="2">
                            <Layout.Row>
                                <Layout.Col span="12" style={{paddingLeft:"1rem"}}>
                                    <h3 style={{marginBottom:"5px"}}>接收方</h3>
                                    <Input type="text" style={{width:"20rem",marginRight:"2rem"}}/>
                                    <Button type="primary">提交</Button>
                                </Layout.Col>
                                <Layout.Col span="12">
                                    <div className="grid-content bg-purple-light">
                                    已有x个区块确认交易
                                    </div>
                                </Layout.Col>
                            </Layout.Row>     
                    </TabPane>                 
                </Tabs>
            </div>
        )
    }
}