import {
    aws_apigateway,
    aws_lambda,
    aws_lambda_nodejs,
    aws_route53,
    aws_route53_targets,
    aws_ec2,
    aws_rds,
    CfnOutput,
    RemovalPolicy,
    Duration,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import { CART_API_DOMAIN_NAME, DOMAIN_NAME } from "../shared/config";
import { createDomainResources } from "../shared/domain";

const cartApiDistEntry = './../cart-api/dist/lambda.js';

export interface CartApiServiceProps {
    authorizer: aws_apigateway.IAuthorizer;
}

export class CartApiService extends Construct {
    constructor(scope: Construct, id: string, props: CartApiServiceProps) {
        super(scope, id);

        const vpc = this.createVpc();
        const db = this.createRds(vpc);

        // Create API Gateway
        const api = this.createApi()

        this.createCartLambda(api, vpc, db, props.authorizer);

        this.addOutputs(api, db);
    }

    private createVpc() {
        const vpc = new aws_ec2.Vpc(this, 'CartVpc', {
            maxAzs: 2,
            natGateways: 0,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'public',
                    subnetType: aws_ec2.SubnetType.PUBLIC,
                },
                {
                    cidrMask: 24,
                    name: 'private',
                    subnetType: aws_ec2.SubnetType.PRIVATE_ISOLATED,
                },
            ],
        });

        vpc.addInterfaceEndpoint('SecretsManagerEndpoint', {
            service: aws_ec2.InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
        });

        return vpc;
    }

    private createRds(vpc: aws_ec2.Vpc) {
        return new aws_rds.DatabaseInstance(this, 'CartDb', {
            engine: aws_rds.DatabaseInstanceEngine.postgres({
                version: aws_rds.PostgresEngineVersion.VER_18,
            }),
            instanceType: aws_ec2.InstanceType.of(
                aws_ec2.InstanceClass.T3,
                aws_ec2.InstanceSize.MICRO,
            ),
            vpc,
            vpcSubnets: {
                subnetType: aws_ec2.SubnetType.PRIVATE_ISOLATED,
            },
            databaseName: 'cart',
            removalPolicy: RemovalPolicy.DESTROY,
            deletionProtection: false,
        });
    }

    private createApi() {
        // Check if local context is set
        // in this case we don't need to create domain resources
        // and we can use localstack url
        const isLocal = this.node.tryGetContext('local') === 'true';

        let domainProps = {};
        let hostedZone: aws_route53.IHostedZone | null = null;

        if (!isLocal) {
            // Create domain resources
            const domainResources = createDomainResources(this, {
                domainName: CART_API_DOMAIN_NAME,
            });

            hostedZone = domainResources.hostedZone;
            domainProps = {
                domainName: {
                    domainName: CART_API_DOMAIN_NAME,
                    certificate: domainResources.certificate,
                },
            };
        }

        // Create API Gateway
        const api = new aws_apigateway.RestApi(this, "cart-api", {
            restApiName: "Cart API Gateway",
            description: "This service serves a Cart API.",

            // Custom domain name
            ...domainProps,

            // CORS configuration
            defaultCorsPreflightOptions: {
                allowOrigins: ['http://localhost:4200', `https://${DOMAIN_NAME}`],
                allowMethods: aws_apigateway.Cors.ALL_METHODS,
                allowHeaders: aws_apigateway.Cors.DEFAULT_HEADERS,
            },
        });

        if (!isLocal && hostedZone) {
            // DNS A record for api subdomain -> API Gateway
            new aws_route53.ARecord(this, 'CartApiAliasRecord', {
                zone: hostedZone,
                recordName: 'cart',
                target: aws_route53.RecordTarget.fromAlias(
                    new aws_route53_targets.ApiGateway(api),
                ),
            });
        }

        return api;
    }

    private createCartLambda(
        api: aws_apigateway.RestApi,
        vpc: aws_ec2.IVpc,
        db: aws_rds.DatabaseInstance,
        authorizer: aws_apigateway.IAuthorizer,
    ) {
        const lambdaFunction = new aws_lambda_nodejs.NodejsFunction(this, 'LambdaFunction', {
            runtime: aws_lambda.Runtime.NODEJS_20_X,
            entry: cartApiDistEntry,
            vpc,
            vpcSubnets: {
                subnetType: aws_ec2.SubnetType.PRIVATE_ISOLATED,
            },
            environment: {
                DB_HOST: db.dbInstanceEndpointAddress,
                DB_PORT: db.dbInstanceEndpointPort,
                DB_NAME: 'cart',
                // The secret will contain 'username', 'password', 'host', 'port', 'dbname'
                DB_SECRET_ARN: db.secret?.secretArn || '',
                USE_COGNITO: process.env.USE_COGNITO ?? 'false',
            },
            timeout: Duration.seconds(60),
            memorySize: 1024,
            bundling: {
                externalModules: [
                    "@nestjs/websockets",
                    "@nestjs/microservices",
                    "class-validator",
                    "class-transformer",
                    "nats",
                    "kafkajs",
                    "mqtt",
                    "amqplib",
                    "amqp-connection-manager",
                    "ioredis",
                    "redis",
                    "cache-manager",
                    "pg-native",
                ],
            },
        });

        if (db.secret) {
            db.secret.grantRead(lambdaFunction);
        }

        db.connections.allowDefaultPortFrom(lambdaFunction);

        const lambdaIntegration = new aws_apigateway.LambdaIntegration(lambdaFunction);

        const lambdaProxyResource = api.root.addResource('{proxy+}');

        api.root.addMethod('GET', lambdaIntegration, { authorizer });
        lambdaProxyResource.addMethod('ANY', lambdaIntegration, { authorizer });
    }

    private addOutputs(api: aws_apigateway.RestApi, db: aws_rds.DatabaseInstance) {
        new CfnOutput(this, 'ApiEndpoint', {
            value: api.url,
        });

        new CfnOutput(this, 'ApiCustomDomain', {
            value: `https://${CART_API_DOMAIN_NAME}`,
            description: 'The custom API domain URL',
        });

        new CfnOutput(this, 'DbEndpoint', {
            value: db.dbInstanceEndpointAddress,
        });

        if (db.secret) {
            new CfnOutput(this, 'DbSecretArn', {
                value: db.secret.secretArn,
            });
        }
    }

}
