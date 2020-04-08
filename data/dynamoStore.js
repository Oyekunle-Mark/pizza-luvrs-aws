const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-3' });

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function putItem(table, item) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: table,
      Item: item,
    };

    dynamodb.put(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function getAllItem(table) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: table,
    };

    dynamodb.scan(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.items);
      }
    });
  });
}
