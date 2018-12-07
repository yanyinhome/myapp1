import React,{Component} from "react";
import {Route,Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import './index.css';
const Loading = () => <div>Loading...</div>;
const Control=Loadable({
    loader:()=>import("./Control"),
    loading:Loading});     
const Login=Loadable({
    loader:()=>import("./Login"),
    loading:Loading}); 
    export default class Admin extends Component{
        render(){
            return(
                <div>
                    <Switch>
                    <Route path={`${this.props.match.url}/control`}  component={Control}></Route>
                    <Route exact path={`${this.props.match.url}`} component={Login}></Route>
                    </Switch>
                </div>
            )
        }
    }