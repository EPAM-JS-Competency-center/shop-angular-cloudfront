const siteBucket = new s3.Bucket(this, 'SiteBucket', {
  websiteIndexDocument: 'index.html',
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, // Keep it private!
});

const distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
  defaultBehavior: { origin: new origins.S3Origin(siteBucket) },
  defaultRootObject: 'index.html',
});

new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
  sources: [s3deploy.Source.asset('../dist')],
  destinationBucket: siteBucket,
  distribution, // This automatically triggers the invalidation
  distributionPaths: ['/*'],
});
