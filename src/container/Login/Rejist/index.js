import React,{Component} from "react";
import {Input,Button} from "element-react";
import './index.css'
export default class Regist extends Component{
    render(){
        return(
            <div>
                <div className="wrapper"><header><h1 className="top"> 欢迎来到Qiankun Client，会员专属钱包</h1></header></div>
                <div className="Tologin"><span>已有账户?</span><a>登陆</a></div>
            </div>
        )
    }
}