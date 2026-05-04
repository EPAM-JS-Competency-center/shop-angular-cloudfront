import {
    aws_apigateway,
    aws_dynamodb,
    aws_lambda,
    aws_route53,
    aws_route53_targets,
    CfnOutput,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import { API_DOMAIN_NAME, DOMAIN_NAME } from "../shared/config";
import { createDomainResources } from "../shared/domain";

export class ApiService extends Construct {

    public readonly sharedApi: aws_apigateway.RestApi;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        // Create API Gateway
        const api = this.createApi()

        this.addOutputs(api);

        this.sharedApi = api;
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
                domainName: API_DOMAIN_NAME,
            });

            hostedZone = domainResources.hostedZone;
            domainProps = {
                domainName: {
                    domainName: API_DOMAIN_NAME,
                    certificate: domainResources.certificate,
                },
            };
        }

        // Create API Gateway
        const api = new aws_apigateway.RestApi(this, "product-api", {
            restApiName: "Product API Gateway",
            description: "This service serves a Product API.",

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
            new aws_route53.ARecord(this, 'ApiAliasRecord', {
                zone: hostedZone,
                recordName: 'api',
                target: aws_route53.RecordTarget.fromAlias(
                    new aws_route53_targets.ApiGateway(api),
                ),
            });
        }

        return api;
    }

    private addOutputs(api: aws_apigateway.RestApi) {
        new CfnOutput(this, 'ApiEndpoint', {
            value: api.url,
        });

        new CfnOutput(this, 'ApiCustomDomain', {
            value: `https://${API_DOMAIN_NAME}`,
            description: 'The custom API domain URL',
        });
    }

}
