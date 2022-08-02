#!/bin/bash

# cli usage as follows
#./s3-cloudfront-deployment.sh shop-app-proprod-website-bkt-1q2ew3er E2MHPCDFO2O655
# or with profile:
#./s3-cloudfront-deployment.sh shop-app-proprod-website-bkt-1q2ew3er E2MHPCDFO2O655 personalAccount

S3_BUCKET_NAME=${1:-""}
DISTRIBUTION_ID=${2:-""}
AWS_PROFILE=${3:-"default"}

if [ -z "${S3_BUCKET_NAME}" ]; then
    echo "S3_BUCKET name is not provided. Please, provide it to continue!"
    exit 1
fi

if [ -z "${DISTRIBUTION_ID}" ]; then
    echo "DISTRIBUTION_ID name is not provided. Please, provide it to continue!"
    exit 1
fi

APP_DIST_PATH="./dist/app"

# Build the app:
#npm run build
npm run build -- --configuration=production

# enable CloudFront cli:
aws configure set preview.cloudfront true --profile "${AWS_PROFILE}"

# To keep a good user experience you can show to your users a maintenance page:
# Copy the maintenance page to the S3 bucket:
#aws s3 cp maintenance/index.html s3://${S3_BUCKET}/index.html
# Invalidate the distribution's cache:
#aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths "/index.html"

# clean up the bucket:
aws s3 rm "s3://${S3_BUCKET_NAME}" --recursive --exclude "index.html" --profile "${AWS_PROFILE}"

# Copy the app's files to the bucket:
aws s3 cp "${APP_DIST_PATH}" "s3://${S3_BUCKET_NAME}" --recursive --profile "${AWS_PROFILE}"

# Create CloudFront invalidation (which actually clears/invalidates the cache):
aws cloudfront create-invalidation --distribution-id "${DISTRIBUTION_ID}" --paths "/*" --profile "${AWS_PROFILE}"
