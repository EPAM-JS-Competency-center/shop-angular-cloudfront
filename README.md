URL on frontend: https://shop-angular-cloudfront.tech

URL on backend: https://api.shop-angular-cloudfront.tech

user: admin@test.com
pass: q1234567890

# Available Commands

The project uses a `Makefile` to automate common tasks.

## Deployment & Build

- `make build-ui`: Build the Angular frontend for production.
- `make build-api`: Build the Go Lambda functions for the API (targeting Linux/ARM64).
- `make deploy`: Build both frontend and backend, then deploy all infrastructure stacks to AWS via CDK.
- `make seed`: Seed the remote DynamoDB table with initial product data.

## Local Development (LocalStack)

- `make deploy-local`: Bootstrap and deploy the API stack to LocalStack using `cdklocal`.
- `make seed-local`: Seed the local DynamoDB table in LocalStack.
- `make local-up`: Start the local environment (starts Docker Compose, deploys stacks, and seeds data).
- `make local-down`: Spin down the local environment and cleanup.
