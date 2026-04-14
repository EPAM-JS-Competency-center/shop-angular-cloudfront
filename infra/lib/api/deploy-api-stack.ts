import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { DeploymentService } from './deployment-service';

export class DeployAPIStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new DeploymentService(this, 'deployment-service');
  }
}
