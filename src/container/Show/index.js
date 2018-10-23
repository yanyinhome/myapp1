import React,{Component} from "react";
import {Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Tabs } from 'element-react';
const TabPane = Tabs.Pane;
const Loading = () => <div>Loading...</div>;
const Balance=Loadable({
    loader:()=>import("./Balance"),
    loading:Loading}); 
const Historys=Loadable({
    loader:()=>import("./History"),
    loading:Loading}); 
const LinkMan=Loadable({
    loader:()=>import("./LinkMan"),
    loading:Loading}); 
export default class Show extends Component{
    componentDidMount(){
    }
    ChangeShow=(key,e)=>{
        const self=this;
        console.log(key.props.name)
        switch (key.props.name) {
            case "1":
            this.props.history.push(`${self.props.match.url}`)
                break;
            case "2":
            this.props.history.push(`${self.props.match.url}historys`)
                break;
            case "3":
            this.props.history.push(`${self.props.match.url}linkMan`)
                break;        
            default:
                break;
        }
    }
    render(){
        return(
            <div >
                <Tabs activeName="1" onTabClick={this.ChangeShow} className="container">
                    <TabPane label="余额" name="1"></TabPane>
                    <TabPane label="历史" name="2"></TabPane>
                    <TabPane label="联系人" name="3"></TabPane>                   
                </Tabs>
                <div className="container">
                <Route path={`${this.props.match.url}`} exact component={Balance}></Route>
                <Route path={`${this.props.match.url}historys`} exact component={Historys}></Route>
                <Route path={`${this.props.match.url}linkMan`} exact component={LinkMan}></Route>
                </div>
            </div>
        )
    }
}