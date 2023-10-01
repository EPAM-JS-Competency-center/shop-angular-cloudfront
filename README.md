# Shop Angular Cloudfront

Angular version: ~12.

Repo maintainers:

- [Sergey Gultyayev](https://github.com/gultyayev)

## The purpose

The repository was created to have an Angular version of e-shop for EPAM NodeJS AWS course. At the same time we strive to make this repository follows best practices so it may be used as a starter for new projects with all the necessary toolings already set up.

## NodeJS AWS course integration

All the necessary API endpoints are in the environments files `environment.ts` (for dev builds). Also it contains feature flags to enable/disable endpoints invocations from within the app so to ensure that you don't get errors for not implemented API endpoints.

## Contribution

Create an issue with the detailed description of the improvement/issue.

If you would like to help implementing some feature, you should ask the maintainers for approval so to ensure that the feature is desired in the repository and no efforts go wasted.

## Get up and running

Prerequisites: NodeJS v14.20.x and higher

Follow the steps:

- git clone
- npm i
- ng serve

## Task 2.2

MANUAL part
Deployment with serverless and serverless-finch works (npm run deploy:s3).
Invalidation done manually
Policies applied
S3 bucket is unaccessible http://ng-aws-shop7534537.s3-website-us-east-1.amazonaws.com/
CloudFront distribution https://dss0onfn4usid.cloudfront.net/

I did not destroy infrastructure but create automatic deploy to another bucket

AUTOMATIC part
S3 bucket (not available to public) http://ng-aws-shop123123-automatic.s3-website-us-east-1.amazonaws.com/
CloudFront distribution (not available to public) https://d3joqbsltlv2xt.cloudfront.net/
