import { aws_cloudfront, aws_cloudfront_origins, aws_s3, aws_s3_deployment, CfnOutput, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";

const path = './../client/dist';

export class DeploymentService extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

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

    }
}