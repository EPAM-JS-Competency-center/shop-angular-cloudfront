import {
    aws_apigateway,
    aws_lambda,
    aws_route53,
    aws_route53_targets,
    CfnOutput,
    Duration,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import { API_DOMAIN_NAME, DOMAIN_NAME } from "../shared/config";
import { createDomainResources } from "../shared/domain";

const path = './../api/dist';

// Lambda default configuration
const LambdaDefaultConfig = {
    runtime: aws_lambda.Runtime.PROVIDED_AL2023,
    architecture: aws_lambda.Architecture.ARM_64,
    memorySize: 1024,
    timeout: Duration.seconds(5),
    handler: 'bootstrap',
}

export class DeploymentService extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        // Create domain resources
        const { hostedZone, certificate } = createDomainResources(this, {
            domainName: API_DOMAIN_NAME,
        });

        // Get products list Lambda function
        const lambdaGetProductsList = new aws_lambda.Function(this, 'get-products-list-lambda', {
            code: aws_lambda.Code.fromAsset(`${path}/getProductsList`),
            ...LambdaDefaultConfig
        });

        // Get product by ID Lambda function
        const lambdaGetProductsById = new aws_lambda.Function(this, 'get-products-by-id-lambda', {
            code: aws_lambda.Code.fromAsset(`${path}/getProductsById`),
            ...LambdaDefaultConfig
        });

        // Create API Gateway
        const api = new aws_apigateway.RestApi(this, "my-api", {
            restApiName: "My API Gateway",
            description: "This API serves the Lambda functions.",

            // Custom domain name
            domainName: {
                domainName: API_DOMAIN_NAME,
                certificate,
            },

            // CORS configuration
            defaultCorsPreflightOptions: {
                allowOrigins: ['http://localhost:4200', `https://${DOMAIN_NAME}`],
                allowMethods: aws_apigateway.Cors.ALL_METHODS,
                allowHeaders: aws_apigateway.Cors.DEFAULT_HEADERS,
            },
        });

        // DNS A record for api subdomain -> API Gateway
        new aws_route53.ARecord(this, 'ApiAliasRecord', {
            zone: hostedZone,
            recordName: 'api',
            target: aws_route53.RecordTarget.fromAlias(
                new aws_route53_targets.ApiGateway(api),
            ),
        });

        // Lambda integrations
        const listIntegration = new aws_apigateway.LambdaIntegration(lambdaGetProductsList);
        const getByIdIntegration = new aws_apigateway.LambdaIntegration(lambdaGetProductsById);

        // Products resource
        const productsResource = api.root.addResource("products");
        productsResource.addMethod('GET', listIntegration);

        const productIdResource = productsResource.addResource("{productId}");
        productIdResource.addMethod('GET', getByIdIntegration);

        // Outputs
        new CfnOutput(this, 'ApiEndpoint', {
            value: api.url,
        });

        new CfnOutput(this, 'ApiCustomDomain', {
            value: `https://${API_DOMAIN_NAME}`,
            description: 'The custom API domain URL',
        });
    }
}
