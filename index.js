const TelesignSDK = require('telesignenterprisesdk');
const customerId =  "31B130CB-F3C9-4FAA-AB04-ED16A3575B44";
const apiKey = "34p4PQhrtGaQmSTPSGb0/PHE7RcWpEU45TJ/IjJZYRQrQ+MKIUToxmRKBReUwOjPppxUNz++lGS6A8j9g/qc+Q==";
const phoneNumber = 254715565383;
const verifyCode = Math.floor(Math.random() * 99999).toString();
const params = {
    verify_code: verifyCode
};
const client = new TelesignSDK(customerId, apiKey);
function smsCallback(error, responseBody) {
    if (error === null) {
        console.log("\nResponse body:\n" + JSON.stringify(responseBody));
    } else {
        console.error("Unable to send message. " + error);
    }
    prompt('\nPlease enter the verification code you were sent:\n', verify);
}
function prompt(question, callback) {
    const stdin = process.stdin, stdout = process.stdout;
    stdin.resume();
    stdout.write(question);
    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}
function verify(input) {
    if (input === params['verify_code']) {
        console.log('\nYour code is correct.');
    } else {
        console.log('\nYour code is incorrect.');
    }
    process.exit();
}
client.verify.sms(smsCallback, phoneNumber, params);