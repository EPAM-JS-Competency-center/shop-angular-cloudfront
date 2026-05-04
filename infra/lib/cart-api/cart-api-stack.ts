import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { CartApiService } from './cart-api-service';
import { AuthStack } from '../shared/auth-stack';

export interface CartAPIStackProps extends cdk.StackProps {
  authStack: AuthStack;
}

export class CartAPIStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: CartAPIStackProps) {
    super(scope, id, props);

    const authorizer = props.authStack.createAuthorizer(this, 'authorizer');

    new CartApiService(this, 'cart-api', {
      authorizer,
    });
  }
}
