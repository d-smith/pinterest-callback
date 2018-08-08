const rp = require('request-promise-native');


const getToken = async (code) => {
    let postReq = 'https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id='
    postReq = postReq + process.env.CLIENT_ID;
    postReq = postReq + '&client_secret=';
    postReq = postReq + process.env.CLIENT_SECRET;
    postReq = postReq + '&code=';
    postReq = postReq + code;

    console.log(`Request: ${postReq}`);

    let options = {
        method: 'POST',
        uri: postReq,
        json:true
    };
    
    let callResult = await rp(options);
    console.log(callResult);

    return callResult;
}

module.exports.authcode = async (event, context, callback) => {
    console.log(`event: ${JSON.stringify(event)}`);
    console.log(`context: ${JSON.stringify(context)}`);

    
    let code = event.queryStringParameters.code;
    console.log(`code is ${code}`);

    let callResults = await getToken(code);
    
    callback(null, {statusCode: 200, body: JSON.stringify(callResults)});
}