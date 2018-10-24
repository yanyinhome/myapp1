import React,{Component} from "react";
import {Route,Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import userService from "../../services/userServices";
const Loading = () => <div>Loading...</div>;
const Head=Loadable({
    loader:()=> import("../Head"),
    loading:Loading});
const Token=Loadable({
    loader:()=> import('../Token'),
    loading:Loading});
const Account=Loadable({
    loader:()=> import('../Account'),
    loading:Loading}); 
const Transaction=Loadable({
        loader:()=> import('../Transaction'),
        loading:Loading}); 
const Seting=Loadable({
        loader:()=> import('../Seting'),
        loading:Loading});
const Show=Loadable({
        loader:()=>import("../Show"),
        loading:Loading});     
export default class Main extends Component{
    componentDidMount(){
       
    }
    render(){
        return(
            <div>
                <Head/>
                <Switch>
                <Route path={`${this.props.match.url}token`}  component={Token}></Route>
                <Route path={`${this.props.match.url}account`}  component={Account}></Route>
                <Route path={`${this.props.match.url}transaction`}  component={Transaction}></Route>
                <Route path={`${this.props.match.url}seting`}  component={Seting}></Route>
                <Route path={`${this.props.match.url}`} component={Show}></Route>
                </Switch>
            </div>
        )
    }
}