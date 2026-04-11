#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { DeployWebAppStack } from '../lib/client/deploy-web-app-stack';

const app = new cdk.App();
new DeployWebAppStack(app, 'DeployWebAppStack');
