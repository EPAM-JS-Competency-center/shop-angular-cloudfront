# authorization_token example

`localStorage.setItem('authorization_token', 'bHVja3lkZXZpbDEzOlRFU1RfUEFTU1dPUkQ==')`

# Pixel Shop - Angular Cloudfront

Angular version: ~12.

## CloudFront URL and S3-website

https://d2ee84u7135hoo.cloudfront.net/

http://my-app-node.s3-website-eu-west-1.amazonaws.com/

## The purpose

The repository was created to have an Angular version of e-shop for EPAM NodeJS AWS course. At the same time we strive to make this repository follows best practices so it may be used as a starter for new projects with all the necessary toolings already set up.

## NodeJS AWS course integration

All the necessary API endpoints are in the environments files `environment.ts` (for dev builds). Also it contains feature flags to enable/disable endpoints invocations from within the app so to ensure that you don't get errors for not implemented API endpoints.

## Get up and running

Prerequisites: NodeJS v14

Follow the steps:

- git clone
- npm i
- ng serve
