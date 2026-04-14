import {
    aws_cloudfront,
    aws_cloudfront_origins,
    aws_route53,
    aws_route53_targets,
    aws_s3,
    aws_s3_deployment,
    CfnOutput,
    RemovalPolicy,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import { DOMAIN_NAME } from "../shared/config";
import { createDomainResources } from "../shared/domain";

const path = './../client/dist';

export class DeploymentService extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const { hostedZone, certificate } = createDomainResources(this, {
            domainName: DOMAIN_NAME,
            // subjectAlternativeNames: [WWW_DOMAIN_NAME],
        });

        const hostingBucket = new aws_s3.Bucket(this, "FrontendBucket", {
            // Block all public access to the bucket
            blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,

            // Remove bucket and all contents when stack is deleted
            removalPolicy: RemovalPolicy.DESTROY,

            // Automatically delete all objects in the bucket when the stack is deleted
            autoDeleteObjects: true,
        });

        const distribution = new aws_cloudfront.Distribution(
            this,
            'CloudfrontDistribution',
            {
                defaultBehavior: {
                    // Use S3BucketOrigin with OriginAccessControl to restrict access to the bucket
                    origin: aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
                        hostingBucket
                    ),
                    // Redirect all HTTP requests to HTTPS
                    viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                },

                // Custom domain and SSL certificate
                domainNames: [DOMAIN_NAME],
                certificate,

                // Set the default root object to index.html
                defaultRootObject: 'index.html',

                // Handle 404 errors by returning index.html
                errorResponses: [
                    {
                        httpStatus: 404,
                        responseHttpStatus: 200,
                        responsePagePath: '/index.html',
                    },
                ],
            }
        );

        // DNS A record for root domain -> CloudFront
        new aws_route53.ARecord(this, 'AliasRecord', {
            zone: hostedZone,
            target: aws_route53.RecordTarget.fromAlias(
                new aws_route53_targets.CloudFrontTarget(distribution),
            ),
        });

        // // DNS A record for www -> CloudFront
        // new aws_route53.ARecord(this, 'WwwAliasRecord', {
        //     zone: hostedZone,
        //     recordName: 'www',
        //     target: aws_route53.RecordTarget.fromAlias(
        //         new aws_route53_targets.CloudFrontTarget(distribution),
        //     ),
        // });

        new aws_s3_deployment.BucketDeployment(this, 'BucketDeployment', {
            // Deploy the contents of the 'path' directory to the S3 bucket
            sources: [aws_s3_deployment.Source.asset(path)],

            // Specify the S3 bucket to deploy to
            destinationBucket: hostingBucket,

            // Specify the CloudFront distribution to invalidate
            distribution,

            // Invalidate all paths in the distribution
            distributionPaths: ['/*'],
        });

        // Output the CloudFront URL
        new CfnOutput(this, 'CloudFrontURL', {
            value: distribution.domainName,
            description: 'The distribution URL',
            exportName: 'CloudfrontURL',
        });

        // Output the S3 bucket name
        new CfnOutput(this, 'BucketName', {
            value: hostingBucket.bucketName,
            description: 'The name of the S3 bucket',
            exportName: 'BucketName',
        });

        // Output the custom domain
        new CfnOutput(this, 'DomainName', {
            value: `https://${DOMAIN_NAME}`,
            description: 'The custom domain URL',
        });
    }
}
