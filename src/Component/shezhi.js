import {Head,Foot} from "./Head_Foot";
import React,{Component} from 'react';
// import app from './app1';
class RiZhi extends  Component{
    constructor(props){
        super(props);
        this.state={
            result:"0",
        }
    }
    render(){
        return(            
            <div>
                <Head/>
                <div>woshishezhi{this.state.result}</div>
                <Foot/>
            </div>
        )
    }
}
export default RiZhi;