const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.save = (name, data) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: 'pizza-luvrs-chief',
            Key: `pizzas/${name}.png`,
            Body: Buffer.from(data, 'base64'),
            ContentEncoding: 'base64',
            ContentType: 'image/png'
        }
    })
}