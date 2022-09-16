# serverless-single-page-app-plugin

A plugin for [Serverless Framework](https://serverless.com), to simplify deploying Single Page Application using S3 and CloudFront.

Based on the [official example](https://github.com/serverless/examples/tree/master/aws-node-single-page-app-via-cloudfront/serverless-single-page-app-plugin), with some important tweaks:

- Auto-generated bucket name, to allow multiple independent deployments without name-clashes
- Packaged as its own repo, so that it can be re-used and independently versioned

## Installation

Install the package via NPM:

```bash
npm install --save-dev https://github.com/jonathanconway/serverless-single-page-app-plugin/tarball
```

Then register it in your `serverless.yml` file, as a plugin:

```
plugins:
  - serverless-single-page-app-plugin
```

And set an `s3LocalPath` custom variable:

```
custom:
  s3LocalPath: dist/
```

Finally, add appropriately-named resources (Bucket, BucketPolicy and Distribution) and Outputs:

```
resources:
  Resources:
    ## Specifying the S3 Bucket
    WebAppS3Bucket:
      Type: AWS::S3::Bucket
      Properties:
        AccessControl: PublicRead
        WebsiteConfiguration:
          IndexDocument: index.html
          ErrorDocument: index.html
    ## Specifying the policies to make sure all files inside the Bucket are avaialble to CloudFront
    WebAppS3BucketPolicy:
      Type: AWS::S3::BucketPolicy
      Properties:
        Bucket:
          Ref: WebAppS3Bucket
        PolicyDocument:
          Statement:
            - Sid: PublicReadGetObject
              Effect: Allow
              Principal: "*"
              Action:
              - s3:GetObject
              Resource:
                Fn::Join: [
                  "", [
                    "arn:aws:s3:::",
                    { "Ref": "WebAppS3Bucket" },
                    "/*"
                  ]
                ]
    ## Specifying the CloudFront Distribution to server your Web Application
    WebAppCloudFrontDistribution:
      Type: AWS::CloudFront::Distribution
      Properties:
        DistributionConfig:
          Origins:
            - DomainName:
                Fn::Join: [
                  "", [
                    { "Ref": "WebAppS3Bucket" },
                    ".s3.amazonaws.com"
                  ]
                ]
              ## An identifier for the origin which must be unique within the distribution
              Id: WebApp
              CustomOriginConfig:
                HTTPPort: 80
                HTTPSPort: 443
                OriginProtocolPolicy: https-only
              ## In case you want to restrict the bucket access use S3OriginConfig and remove CustomOriginConfig
              # S3OriginConfig:
              #   OriginAccessIdentity: origin-access-identity/cloudfront/E127EXAMPLE51Z
          Enabled: 'true'
          ## Uncomment the following section in case you are using a custom domain
          # Aliases:
          # - mysite.example.com
          DefaultRootObject: index.html
          ## Since the Single Page App is taking care of the routing we need to make sure ever path is served with index.html
          ## The only exception are files that actually exist e.h. app.js, reset.css
          CustomErrorResponses:
            - ErrorCode: 404
              ResponseCode: 200
              ResponsePagePath: /index.html
          DefaultCacheBehavior:
            AllowedMethods:
              - DELETE
              - GET
              - HEAD
              - OPTIONS
              - PATCH
              - POST
              - PUT
            ## The origin id defined above
            TargetOriginId: WebApp
            ## Defining if and how the QueryString and Cookies are forwarded to the origin which in this case is S3
            ForwardedValues:
              QueryString: 'false'
              Cookies:
                Forward: none
            ## The protocol that users can use to access the files in the origin. To allow HTTP use `allow-all`
            ViewerProtocolPolicy: redirect-to-https
          ## The certificate to use when viewers use HTTPS to request objects.
          ViewerCertificate:
            CloudFrontDefaultCertificate: 'true'
          ## Uncomment the following section in case you want to enable logging for CloudFront requests
          # Logging:
          #   IncludeCookies: 'false'
          #   Bucket: mylogs.s3.amazonaws.com
          #   Prefix: myprefix

  ## In order to print out the hosted domain via `serverless info` we need to define the DomainName output for CloudFormation
  Outputs:
    WebAppS3BucketOutput:
      Value:
        'Ref': WebAppS3Bucket
    WebAppCloudFrontDistributionOutput:
      Value:
        'Fn::GetAtt': [ WebAppCloudFrontDistribution, DomainName ]
```
