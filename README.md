# Shop Angular Cloudfront

Angular version: ~12.

Repo maintainers:

- [Sergey Gultyayev](https://github.com/gultyaev)

## The purpose

The repository was created to have an Angular version of e-shop for EPAM NodeJS AWS course. At the same time we strive to make this repository follows best practices so it may be used as a starter for new projects with all the necessary toolings already set up.

## NodeJS AWS course integration

All the necessary API endpoints are in the environments files `environment.ts` (for dev builds). Also it contains feature flags to enable/disable endpoints invocations from within the app so to ensure that you don't get errors for not implemented API endpoints.

## Contribution

Create an issue with the detailed description of the improvement/issue.

If you would like to help implementing some feature, you should ask the maintainers for approval so to ensure that the feature is desired in the repository and no efforts go wasted.

## Get up and running

Prerequisites: NodeJS v14

Follow the steps:

- git clone
- npm i
- ng serve


----- HOMEWORK TWO -----
Task One
S3 Bucket: https://s3.console.aws.amazon.com/s3/buckets/cilga-aws-course-spa?region=eu-central-1&tab=objects
S3 Website: https://cilga-aws-course-spa.s3.eu-central-1.amazonaws.com/index.html
Cloudfront: d147q802tvzyn4.cloudfront.net
