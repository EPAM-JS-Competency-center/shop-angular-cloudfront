## Task 2 ##

1. What was done?

Manually Website was deployed on S3 bucket & Cloudfront:
Static website url - http://akshay-js-shop-angular.s3-website-ap-northeast-1.amazonaws.com
Cloudfront url - https://d3d3akg9zundeq.cloudfront.net

serverless and serverless-finch plugins are added and  configured 


2. Link to FE PR (YOUR OWN REPOSITORY : 

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
- npm run cloudfront:update:build:deploy (make sure to change bucket name in serverless.yml file)



### `client:deploy`, `client:deploy:nc`

Deploy the project build from `dist` folder to configured in `serverless.yml` AWS S3 bucket with or without confirmation.

### `client:build:deploy`, `client:build:deploy:nc`

Combination of `build` and `client:deploy` commands with or without confirmation.

### `cloudfront:setup`

Deploy configured in `serverless.yml` stack via CloudFormation.

### `cloudfront:domainInfo`

Display cloudfront domain information in console.

### `cloudfront:invalidateCache`

Invalidate cloudfront cache.

### `cloudfront:build:deploy`, `cloudfront:build:deploy:nc`

Combination of `client:build:deploy` and `cloudfront:invalidateCache` commands with or without confirmation.

### `cloudfront:update:build:deploy`, `cloudfront:update:build:deploy:nc`

Combination of `cloudfront:setup` and `cloudfront:build:deploy` commands with or without confirmation.

### `serverless:remove`

Remove an entire stack configured in `serverless.yml` via CloudFormation.


## Task 2 ##

1. What was done?

Manually Website was deployed on S3 bucket & Cloudfront:
Static website url - http://akshay-js-shop-angular.s3-website-ap-northeast-1.amazonaws.com
Cloudfront url - https://d3d3akg9zundeq.cloudfront.net

serverless and serverless-finch plugins are added and  configured 


2. Link to FE PR (YOUR OWN REPOSITORY : 

2.1 - Static website url - http://akshay-js-shop-angular.s3-website-ap-northeast-1.amazonaws.com
2.2 - Cloudfront url - https://d3d3akg9zundeq.cloudfront.net
2.3 https://d1nmo40ewl07lt.cloudfront.net

