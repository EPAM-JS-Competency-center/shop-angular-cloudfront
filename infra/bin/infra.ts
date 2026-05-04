#!/usr/bin/env node
import 'dotenv/config';
import * as cdk from 'aws-cdk-lib/core';
import { ClientStack } from '../lib/client/client-stack';
import { DomainStack } from '../lib/shared/domain-stack';
import { DOMAIN_NAME } from '../lib/shared/config';
import { APIStack } from '../lib/api/api-stack';
import { CartAPIStack } from '../lib/cart-api/cart-api-stack';
import { AuthStack } from '../lib/shared/auth-stack';

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


new ClientStack(app, 'ClientStack', { env });

const authStack = new AuthStack(app, 'AuthStack', { env });

new APIStack(app, 'APIStack', { env, authStack });
new CartAPIStack(app, 'CartAPIStack', { env, authStack });
