const AWS = require('aws-sdk');

module.exports = async function sms(hora, nome, telefone, dia, medico, especialidade) {
    const credentials = {
        id: process.env.AMAZON_ID,
        secret: process.env.AMAZON_SECRET
    }
    
    // Set region
    AWS.config.update({
        region: 'sa-east-1',
        accessKeyId: credentials.id,
        secretAccessKey: credentials.secret
    });

    let params = {
        Message: `Olá ${nome} confirmando sua consulta marcada na Free Life Saúde para o dia: ${dia} as: ${hora}`, /* required */
        PhoneNumber: `+55${telefone}`,
    };

    function sendSMS(params) {
        var publishTextPromise = new AWS.SNS().publish(params).promise();
        // Handle promise's fulfilled/rejected states
        publishTextPromise.then(function (data) {
            console.log("MessageID is " + data.MessageId);
        }).catch(function (err) {
            console.error(err, err.stack);
        });
    }
    
    await sendSMS(params);
}