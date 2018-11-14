import React, { Component } from 'react';
import "element-theme-default";
export default class Foot extends Component{
    render(){
        return(
            <div className="tail container">
                <div className="tail-left">
                    <a>版本：QK-1.1.0</a>
                </div>
                <div className="tail-fight">
                    <a>使用条款</a>
                    <a>English</a>
                    <a>简体中文</a>
                    <a>更多...</a>
                </div>
            </div>    
        )
    }
}