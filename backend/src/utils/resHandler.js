export const resHandler = (res, statusCode, msg, payload = null, key = 'data') =>{
    if(!res){
        console.log("Response is not provided");
        return;
    }
    const success = statusCode < 400;
    return res.status(statusCode).json({
        success,
        statusCode,
        message: msg,
        [key]:payload
    })
}