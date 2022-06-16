// Import all functions from get-product-by-id.js
const lambda = require('../../../src/handlers/get-product-by-id');
const mockEvent = require('../../../events/event-get-product-by-id.json');

// Import dynamodb from aws-sdk
// const dynamodb = require('aws-sdk/clients/dynamodb');

// This includes all tests for getByIdHandler()
describe('Test getByIdHandler', () => {
    // let getSpy;

    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
    // beforeAll(() => {
    //     // Mock dynamodb get and put methods
    //     // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
    //     getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get');
    // });

    // Clean up mocks
    // afterAll(() => {
    //     getSpy.mockRestore();
    // });

    // This test invokes getByIdHandler() and compare the result
    it('should get item by id', async () => {
        const item = {
          count: 1,
          description: "A very rare product for true lovers",
          id: "7567ec4b-b43c-48c5-9345-fc73c48a8023",
          price: 99999999.0,
          title: "Time machine"
        };

        // Return the specified value whenever the spied get function is called
        // getSpy.mockReturnValue({
        //     promise: () => Promise.resolve({ Item: item })
        // });

        // Invoke getByIdHandler()
        const result = await lambda.getByIdHandler(mockEvent);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(item)
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});
