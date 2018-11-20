import React from "react";
import {Headtitle} from "../public";
import {Upload,Button} from "element-react";
import "element-theme-default";
import FileService from "../../../../../services/fileServices";
// 图片上传到数据库
class UpImg extends React.Component{
    constructor(props){
        super(props);
        this.state={
            file:[
                {name: 'food.jpeg', url: ''},
            ]
        }
    }
    render() {
        console.log(FileService)
        return (
          <Upload
            className="upload-demo"
            ref="upload"
            action={`${FileService.url}/imgupload`}
            onPreview={file => this.handlePreview(file)}
            onRemove={(file, fileList) => this.handleRemove(file, fileList)}
            fileList={this.state.file}
            listType="picture"
            autoUpload={false}
            tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
          >
            <Button size="small" type="primary">点击上传</Button>
            <Button style={{ marginLeft: '10px'}} size="small" type="success" onClick={() => this.submitUpload()}>上传到服务器</Button>
            </Upload>
            
        )
      }
          //提交
      submitUpload(){
        this.refs.upload.submit();
      }
      handleRemove(file, fileList) {
        console.log(file, fileList);
      }
      
      handlePreview(file) {
        console.log(file);
      }
      
      
}
export default class LogoChange extends React.Component {
    render(){
        return(
            <div>
                <Headtitle>修改LOGO</Headtitle>
                <UpImg/>
            </div>
        )
    }
}