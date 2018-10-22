import React,{Component} from "react";
import {Route } from 'react-router-dom';
import Loadable from 'react-loadable';
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
        console.log(this.props.match.url)
    }
    render(){
        return(
            <div>
                <Route path={`${this.props.match.url}`} exact component={Balance}></Route>
                <Route path={`${this.props.match.url}historys`} exact component={Historys}></Route>
                <Route path={`${this.props.match.url}linkMan`} exact component={LinkMan}></Route>
            </div>
        )
    }
}