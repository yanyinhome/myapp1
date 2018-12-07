import React from "react";
import {Headtitle,ChildrenTitle} from "../public";
import {Upload, Icon, Modal , Row , Col , message} from "antd";
import FileService from "../../../../../services/fileServices";
import { Button } from "element-react";
import "element-theme-default";
// 图片上传
class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewFile:null,
        fileList: [
        ],
    };
    componentDidMount() {
        // 获取文件列表
        this.getImageList();
    }
    //获取图片列表
    getImageList=()=>{
        FileService.QueryImages().then(
            result=>{
                var {data}=result;
                console.log(data)
                var imageListArry=data.result.map(
                    (item,index)=>{
                        return {
                            uid:"-"+index,
                            name:item.name,
                            url:item.url,
                            status:"done",
                        }
                    }
                )
                this.setState({fileList:imageListArry})
            }
        ).catch(err=>{
            console.log(err)
        })
    }
    //取消按钮函数
    handleCancel = () => this.setState({ previewVisible: false })
    //确定按钮函数
    handleOk=(e)=>{
        console.log(this.state.previewFile);
        //提交更改
        FileService.ChangeLogo({name:this.state.previewFile.name})
            .then(
                res=>{console.log(res,"2")}
            ).catch(
            err=>{
                console.log(err)
            }
        );
        // 关闭窗口
        this.handleCancel();
    }
    // 预览函数
    handlePreview = (file) => {
        this.setState({
            previewFile:file,
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    onRemove=(file)=>{
       /* const {fileList}=this.state;
        console.log(file)
        let index=this.state.fileList.indexOf(file)
        fileList.splice(index,1)
        this.setState({fileList});*/
       console.log(file.name)
        FileService.DelateImage({name:file.name}).then(
            res=>{console.log(res)}
        ).catch(err=>{console.log(err)})

    }
    handleChange = ({ fileList }) => this.setState({ fileList })
    render() {

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-uploads-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="http://192.168.124.9:3005/file/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.onRemove}
                >
                    {fileList.length >= 20? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    footer={[<Button key="back" onClick={this.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>确定</Button>,]}
                    onCancel={this.handleCancel}
                    title={"点击确定更换LOGO"}
                    onOk={this.handleOk}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
//图片选择和预览
class Demo extends React.Component {
    state = {
        url:"",
        fileList: [],
        fileUpload:null,
        uploading: false,
    }

    handleUpload = () => {
        const { fileUpload } = this.state;
        //新建formData实例
        const formData = new FormData(); 
        //把file添加到formData中     
        formData.append("file",fileUpload);
        this.setState({
            uploading: true,
        });
        // You can use any AJAX library you like
/*         let config = {
            headers:{'Content-Type':'multipart/form-data'}
        }; */ 
/*         axios.post('http://192.168.124.9:3005/file/upload',formData,config)
                    .then(function(response) {
                        console.log(response)
                    }); */
        FileService.UploadImage(formData).then(
            res=>{
            if(res.code===1){
                console.log(res,"1")
                FileService.ChangeLogo({name:res.data.name})
                .then(
                    res=>{console.log(res,"2")}
                ).catch(
                    err=>{
                        console.log(err)
                    }
                )
                this.setState({
                    fileUpload:null,
                    url:"",
                    uploading: false})
                }else{
                    console.log("上传失败")
                }
            }           
        ).catch(err=>{
            console.log(err)
        })
    }

    render() {
        const { uploading, fileList ,fileUpload} = this.state;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                const self=this;
                var reader = new FileReader();
                //使用该对象读取file文件
                reader.readAsDataURL(file);
                //读取文件成功后执行的方法函数
                reader.onload=function(e){
                    //读取成功后返回的一个参数e，整个的一个进度事件
                    console.log(e.target);
                    //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
                    //的base64编码格式的地址
                    self.setState({fileUpload:file,url:e.target.result});
                }                
                return false;
            },
            fileList,
        };

        return (
            <div style={{width:"180px"}}>
            <Upload {...props} >
                <div style={{width:"180px",height:"70px",border:"1px solid #ccc",padding:"10px"}}>
                <img id="imgshow" src={this.state.url} alt="" style={{height:"50px",maxWidth:"160px"}}/>
                </div>
                <Button type="primary" style={{ marginTop: 16,width:"100%"}}>
                <Icon type="upload" /> 选择文件
                </Button>
            </Upload> 
            <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={fileUpload === null}
                loading={uploading}
                style={{ marginTop: 16,width:"100%"}}
                >
          {uploading ? '上传中' : '提交更改' }
        </Button>
            </div>          
        );
    }
}
export default class LogoChange extends React.Component {
    render(){
        return(
            <div>
                <Headtitle>修改LOGO</Headtitle>
                <Row>
                    <Col span={24}>
                        <ChildrenTitle>本地上传更改</ChildrenTitle>
                        <Demo/>
                    </Col>
                    <Col span={24}>
                        <ChildrenTitle>从图片库选择</ChildrenTitle>
                        <PicturesWall/>
                    </Col>
                </Row>
            </div>
        )
    }
}