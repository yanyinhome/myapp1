import React,{Component} from "react";
import {Button,Layout,Form,Input,Notification}  from "element-react";
// import "element-theme-default";
// import userService from "../../services/userServices";
export default class Control extends Component{
    constructor(props) {
        super(props);      
        this.state = {
      }}
      componentDidMount(){
        // 验证，做一个判断，如果已经登录则跳转
      }
      
      handleReset(e) {
        e.preventDefault();
      
        this.refs.form.resetFields();
      }
      
      onChange(key, value) {
        this.setState({
          form: Object.assign({}, this.state.form, { [key]: value })
        });
      }
      
      render() {
        return (
          <div style={{marginTop:"10rem"}}>
              <Layout.Row >
                  <Layout.Col span="8" offset="8">
                    <div>
                   <div>nihao</div>
                    </div>
                </Layout.Col>
              </Layout.Row>
          </div>
        )
      }
      
}