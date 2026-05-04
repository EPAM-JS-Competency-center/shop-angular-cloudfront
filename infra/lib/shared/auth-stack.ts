import * as cdk from 'aws-cdk-lib/core';
import { aws_apigateway, aws_cognito, aws_lambda, CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DOMAIN_NAME, LambdaDefaultConfig } from './config';

const path = './../api/dist';

type AuthBackend =
    | { mode: 'cognito'; userPool: aws_cognito.IUserPool }
    | { mode: 'basic'; handler: aws_lambda.IFunction };

export class AuthStack extends cdk.Stack {
    private readonly backend: AuthBackend;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.backend = process.env.USE_COGNITO === 'true'
            ? { mode: 'cognito', userPool: this.createUserPool() }
            : { mode: 'basic', handler: this.createBasicAuthHandler() };
    }

    public createAuthorizer(scope: Construct, id: string): aws_apigateway.IAuthorizer {
        if (this.backend.mode === 'cognito') {
            return new aws_apigateway.CognitoUserPoolsAuthorizer(scope, id, {
                authorizerName: id,
                cognitoUserPools: [this.backend.userPool],
            });
        }

        return new aws_apigateway.TokenAuthorizer(scope, id, {
            handler: this.backend.handler,
        });
    }

    private createUserPool(): aws_cognito.IUserPool {
        const userPool = new aws_cognito.UserPool(this, 'my-user-pool', {
            signInAliases: {
                email: true,
            },
            autoVerify: {
                email: true,
            },
            customAttributes: {
                createdAt: new aws_cognito.DateTimeAttribute(),
            },
            passwordPolicy: {
                minLength: 8,
                requireLowercase: true,
                requireUppercase: false,
                requireDigits: true,
                requireSymbols: false,
            },
            removalPolicy: RemovalPolicy.DESTROY,
        });

        const domainPrefix = `shop-angular-cloudfront`;
        userPool.addDomain('ShopUserPoolDomain', {
            cognitoDomain: {
                domainPrefix,
            },
        });

        const clientCallbackUrls = [
            'http://localhost:4200',
            'http://localhost:4200/',
            `https://${DOMAIN_NAME}`,
            `https://${DOMAIN_NAME}/`,
        ];

        const userPoolClient = userPool.addClient('ShopUserPoolClient', {
            userPoolClientName: 'shop-angular-client',
            generateSecret: false,
            oAuth: {
                flows: {
                    implicitCodeGrant: true,
                },
                scopes: [
                    aws_cognito.OAuthScope.OPENID,
                    aws_cognito.OAuthScope.EMAIL,
                    aws_cognito.OAuthScope.PROFILE,
                ],
                callbackUrls: clientCallbackUrls,
                logoutUrls: clientCallbackUrls,
            },
        });

        new CfnOutput(this, 'CognitoLoginUrl', {
            value: `https://${domainPrefix}.auth.us-east-1.amazoncognito.com/login?client_id=${userPoolClient.userPoolClientId}&response_type=token&scope=email+openid+profile&redirect_uri=http://localhost:4200`,
            description: 'Cognito Hosted UI Login URL (for local dev)',
        });

        return userPool;
    }

    private createBasicAuthHandler(): aws_lambda.IFunction {
        return new aws_lambda.Function(this, 'basic-authorizer-lambda', {
            code: aws_lambda.Code.fromAsset(`${path}/basicAuthorizer`),
            ...LambdaDefaultConfig,
            environment: {
                BASIC_USER: process.env.BASIC_USER || '',
                BASIC_PASSWORD: process.env.BASIC_PASSWORD || '',
            },
        });
    }
}
