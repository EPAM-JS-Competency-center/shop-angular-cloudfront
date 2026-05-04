import { aws_lambda, Duration } from "aws-cdk-lib";

export const DOMAIN_NAME = 'shop-angular-cloudfront.tech';
export const API_DOMAIN_NAME = `api.${DOMAIN_NAME}`;
export const CART_API_DOMAIN_NAME = `cart.${DOMAIN_NAME}`;

// Lambda default configuration
export const LambdaDefaultConfig = {
    runtime: aws_lambda.Runtime.PROVIDED_AL2023,
    architecture: aws_lambda.Architecture.ARM_64,
    memorySize: 1024,
    timeout: Duration.seconds(5),
    handler: 'bootstrap',
}