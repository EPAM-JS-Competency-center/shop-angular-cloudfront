package main

import (
	"aws-practitioner-for-js/internal/products"

	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	lambda.Start(products.GetProductById)
}
