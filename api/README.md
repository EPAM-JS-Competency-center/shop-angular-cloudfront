Build:

```
GOOS=linux GOARCH=arm64 go build -tags lambda.norpc -o ./dist/getProductsList/bootstrap ./cmd/getProductsList/main.go
GOOS=linux GOARCH=arm64 go build -tags lambda.norpc -o ./dist/getProductsById/bootstrap ./cmd/getProductsById/main.go

```

Deploy:

```
cdk deploy DeployAPIStack
```