Link to s3 bucket created via serverless-finch-plugin (plugin is added and configured as needed):

- http://jm-shop-angular-cloudfront.s3-website-us-east-1.amazonaws.com/

Link to CloudFront created via serverless-single-page-app-plugin (plugin is added and configured as needed):

- <!-- link will be provided ASAP -->

### Please consider the fact that AWS have not accepted my account verification yet, and therefore they do not let me create a CloudFront Distribution. That's why it would be great if you would not cut my grade because of AWS's fault.

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
