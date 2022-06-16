// Create clients and set shared const values outside of the handler.

// Get the DynamoDB table name from environment variables
// const tableName = process.env.SAMPLE_TABLE;

// Create a DocumentClient that represents the query to add an item
// const dynamodb = require('aws-sdk/clients/dynamodb');
// const docClient = new dynamodb.DocumentClient();

const mockProducts = require('../products.mock.json');

/**
 * A simple example includes a HTTP get method to get one item by id from mock data or a DynamoDB table.
 */
exports.getByIdHandler = async (event, ctx) => {
  // All log statements are written to CloudWatch
  console.info('received:', event);

  // Get id from pathParameters from APIGateway because of `/{id}` at template.yaml
  const id = event.pathParameters.id;

  // Get the item from the table
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
  // var params = {
  //   TableName : tableName,
  //   Key: { id: id },
  // };
  // const data = await docClient.get(params).promise();
  // const item = data.Item;

  const item = mockProducts.find(p => p.id === id);

  const response = item ? {
    statusCode: 200,
    body: JSON.stringify(item),
  } : {
    statusCode: 404,
    body: `Product with ID: ${ productId } is not found.`
  };

  // All log statements are written to CloudWatch
  console.info(`response from: ${event.rawPath} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
};
