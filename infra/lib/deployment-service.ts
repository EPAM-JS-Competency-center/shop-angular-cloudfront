import {
  aws_s3,
  aws_cloudfront,
  aws_cloudfront_origins,
  aws_s3_deployment,
  CfnOutput,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

const path = './resources/build/browser';

export class DeploymentService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // creating the S3 bucket to host the frontend application
    const hostingBucket = new aws_s3.Bucket(this, 'FrontendBucket', {
      blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
    });

    // creating the CloudFront distribution to serve the frontend application
    const distribution = new aws_cloudfront.Distribution(
      this,
      'CloudfrontDistribution',
      {
        defaultBehavior: {
          origin:
            aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
              hostingBucket,
            ),
          viewerProtocolPolicy:
            aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: 'index.html',
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
          },
        ],
      },
    );

    // Deploying the frontend application to the S3 bucket
    new aws_s3_deployment.BucketDeployment(this, 'BucketDeployment', {
      sources: [aws_s3_deployment.Source.asset(path)],
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    // Output the CloudFront distribution URL and S3 bucket name
    new CfnOutput(this, 'CloudFrontURL', {
      value: distribution.domainName,
      description: 'The distribution URL',
      exportName: 'CloudfrontURL',
    });

    new CfnOutput(this, 'BucketName', {
      value: hostingBucket.bucketName,
      description: 'The name of the S3 bucket',
      exportName: 'BucketName',
    });
  }
}
