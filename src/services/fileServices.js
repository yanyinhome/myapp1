import url from "../consts/Url"
import Xhr from "../utils/xhr"
 class FileService{
    constructor(){
        this.url=url.development.url
    }
    // 上传文件
    UploadImage(data){
        return Xhr({
            method:"post",
            headers:{'Content-Type':'multipart/form-data,charset=utf-8'},
            url:`${this.url}/file/upload`,
            data:data            
        })
    }
    // 修改logo
    ChangeLogo(data){
        return Xhr({
            method:"post",
            url:`${this.url}/file/changelogo`,
            data:{
                ...data
            }
        })
    }
    //获取文件列表
    QueryImages(data){
        return Xhr({
            method:"get",
            url:`${this.url}/file/queryimages`,
            data:{
                ...data
            }
        })
    }
    // 删除图片
     DelateImage(data){
        return Xhr({
            method:"post",
            url:`${this.url}/file/delate`,
            data:{
                ...data
            }
        })
     }
     // 获取logo地址
     getLogoAddress(){
         return Xhr({
             method:'get',
             url:`${this.url}/file/getlogoaddress`
         })
     }
}
export default new FileService();