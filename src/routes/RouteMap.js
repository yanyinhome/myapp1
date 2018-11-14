import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import React,{Component} from 'react';
const Loading = () => <div>Loading...</div>;
const Login=Loadable({
        loader:()=> import('../container/Login'),
        loading:Loading});   
const Regist=Loadable({
        loader:()=> import('../container/Login/Rejist'),
        loading:Loading});   
const Main=Loadable({
        loader:()=> import('../container/Main'),
        loading:Loading});      
const Admin=Loadable({
        loader:()=> import('../container/Admin'),
        loading:Loading});      
class RouteMap extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route  path="/login" component={Login}/>
                    <Route  path="/admin" component={Admin}/>
                    <Route  path="/regist" component={Regist}/>
                    <Route  path="/" component={Main}>
                    </Route>
                </Switch>
            </Router>
        )
    }
}
export default RouteMap;

