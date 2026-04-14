#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { DeployWebAppStack } from '../lib/client/deploy-web-app-stack';
import { DeployAPIStack } from '../lib/api/deploy-api-stack';
import { DomainStack } from '../lib/shared/domain-stack';
import { DOMAIN_NAME } from '../lib/shared/config';

const app = new cdk.App();

// fromLookup() needs an explicit region
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
};

// Creates the Route 53 hosted zone.
new DomainStack(app, 'DomainStack', {
    env,
    domainName: DOMAIN_NAME,
});


new DeployWebAppStack(app, 'DeployWebAppStack', { env });

new DeployAPIStack(app, 'DeployAPIStack', { env });
