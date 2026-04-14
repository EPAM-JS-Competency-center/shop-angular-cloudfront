package products

import (
	"aws-practitioner-for-js/internal/response"
	"context"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
)

func GetProductList(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	products, err := GetProducts()
	if err != nil {
		return response.ErrInternalServer(), err
	}
	return response.JSON(http.StatusOK, products)
}

func GetProductById(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	productId := request.PathParameters["productId"]

	products, err := GetProducts()
	if err != nil {
		return response.ErrInternalServer(), err
	}

	for _, p := range products {
		if p.ID == productId {
			return response.JSON(http.StatusOK, p)
		}
	}

	return response.ErrNotFound(), nil
}
