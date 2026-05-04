import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { ApiService } from './api-service';
import { ProductService } from './product-service';
import { ImportService } from './import-service';
import { AuthStack } from '../shared/auth-stack';

export interface APIStackProps extends cdk.StackProps {
  authStack: AuthStack;
}

export class APIStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: APIStackProps) {
    super(scope, id, props);

    const apiService = new ApiService(this, 'api');

    const authorizer = props.authStack.createAuthorizer(this, 'authorizer');

    const productService = new ProductService(this, 'product-api', {
      sharedApi: apiService.sharedApi,
      authorizer,
    });

    new ImportService(this, 'import', {
      sharedApi: apiService.sharedApi,
      tables: productService.tables,
      authorizer,
    });
  }
}
