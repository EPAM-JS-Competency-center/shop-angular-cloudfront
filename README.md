# Shop Angular Cloudfront

Angular version: ~12.

Repo maintainers:

- [Katsiaryna Sacvhko](https://github.com/katrin2404)

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

## Deployment Links

The project is deployed on AWS, utilizing services like S3 for static website hosting and CloudFront for content delivery and caching.

### [AWS S3 Bucket](http://my-first-aws-application.s3-website-eu-west-1.amazonaws.com/)

- The S3 bucket hosts the static assets of the application. S3-website shows 403 Access Denied error because of changes in bucket's policy. Navigates to site by CloudFront URL

### [AWS CloudFront Distribution](https://d2dnq0tvhz4gqe.cloudfront.net/)

- The CloudFront distribution is the recommended way to access the application. It serves the content stored in the S3 bucket but with the added benefits of caching, content delivery optimization, and possibly added security configurations, making the user experience more robust and responsive.
