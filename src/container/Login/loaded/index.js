import React,{Component} from "react";
import { Layout} from 'element-react';
import "element-theme-default";
// 已经登录后点击登录的界面
export default class Loaded extends Component{
    render(){
        return(
           <div className="container">
            <Layout.Row>
                <Layout.Col span="6" style={{paddingLeft:"1rem"}}>
                   <a>个人信息</a>
                </Layout.Col>
                <Layout.Col span="18">
                    <div className="grid-content bg-purple-light">
                        <h3>账户设置</h3>
                        <hr/>
                        <label>HJ名称</label>
                        <p>nihao <a>编辑</a></p>
                        <hr/>
                        <label>账户地址</label>
                        <p>地址</p>
                    </div>
                </Layout.Col>
            </Layout.Row>     
           </div>
        )
    }
}