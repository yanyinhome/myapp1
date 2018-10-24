function responseClient(res,httpCode = 500, code = 3,message='服务端异常',data={}) {
    let responseData = {};
    responseData.code = code;
    responseData.message = message;
    responseData.data = data;
    res.status(httpCode).json(responseData)
}
module.exports = responseClient;