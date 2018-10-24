// 请求集中处理
import axios from "axios";
import {Notification} from 'element-react';
let axiosInstance=axios.create();
axiosInstance.interceptors.request.use(config=>{
    config.withCredentials=true;
    return config
},error=>{
    return Promise.reject(error)
})
const xhr=({method="get",headers,...options})=>{
// 前提是header不存在,配置header
if(!headers){
    if(method==="get"){
        headers={"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}
    }else if(method==="post"){
        headers={"Content-Type":"application/json;charset=utf-8"}
    }
}
return axiosInstance({method,headers,...options})
    .then((response)=>{if(response.status>=200 && response.status < 300){
        return response;
    }else{handleError(response)}
})
    .then((response)=>{
        const{data}=response;
        if(data.code===0||data.code===1){
            return data;
        }else{
            handleError(response)
        }
    })
    .catch((error)=>{
        if(error.code){
            Notification.error({
                title: error.name,
                message: error.message
              });   
        }
    })
}
function handleError(response){
    const {data={},status}=response;
    const {code}=data;
    if(code===3){
        // 无权限处理
        console.log(new Error("没有权限"))
    }else{
        const error =new Error(data.message||status+"错误");
        error.response=response;
        error.message=response.data.message;
        throw error;
    }
}
export default xhr;