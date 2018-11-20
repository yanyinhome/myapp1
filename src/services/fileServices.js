import url from "../consts/Url"
import Xhr from "../utils/xhr"
 class FileService{
    constructor(){
        this.url=url.development.url
    }
    //上传文件
    UpLoad(data){
        return Xhr({
            method:"post",
            url:`${this.url}/file/uploadimg`,
            data:{
                ...data
            }
        })
    }
}
export default new FileService();