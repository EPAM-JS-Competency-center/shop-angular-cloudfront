# Shop Angular Cloudfront ( Forked version by Angel Mena)

Angular version: ~12.

## AWS Deployment links

S3: https://myownjuicestorebucket.s3.amazonaws.com/index.html
CloudFront: https://d3i49zqf7hu5b1.cloudfront.net/

## Changelog

1.0.0 initial version

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
