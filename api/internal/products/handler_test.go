package products

import (
	"context"
	"encoding/json"
	"net/http"
	"testing"

	"github.com/aws/aws-lambda-go/events"
)

func TestGetProductList(t *testing.T) {
	ctx := context.Background()
	request := events.APIGatewayProxyRequest{}

	response, err := GetProductList(ctx, request)

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if response.StatusCode != http.StatusOK {
		t.Errorf("expected status 200, got %d", response.StatusCode)
	}

	var products []Product
	err = json.Unmarshal([]byte(response.Body), &products)
	if err != nil {
		t.Fatalf("failed to unmarshal response body: %v", err)
	}

	if len(products) == 0 {
		t.Error("expected non-empty product list")
	}
}

func TestGetProductById_Success(t *testing.T) {
	ctx := context.Background()
	productId := "7567ec4b-b10c-48c5-9345-fc73c48a80aa" // ProductOne from products.json
	request := events.APIGatewayProxyRequest{
		PathParameters: map[string]string{
			"productId": productId,
		},
	}

	response, err := GetProductById(ctx, request)

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if response.StatusCode != http.StatusOK {
		t.Errorf("expected status 200, got %d", response.StatusCode)
	}

	var product Product
	err = json.Unmarshal([]byte(response.Body), &product)
	if err != nil {
		t.Fatalf("failed to unmarshal response body: %v", err)
	}

	if product.ID != productId {
		t.Errorf("expected product ID %s, got %s", productId, product.ID)
	}

	if product.Title != "ProductOne" {
		t.Errorf("expected product title 'ProductOne', got '%s'", product.Title)
	}
}

func TestGetProductById_NotFound(t *testing.T) {
	ctx := context.Background()
	productId := "non-existent-id"
	request := events.APIGatewayProxyRequest{
		PathParameters: map[string]string{
			"productId": productId,
		},
	}

	response, err := GetProductById(ctx, request)

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if response.StatusCode != http.StatusNotFound {
		t.Errorf("expected status 404, got %d", response.StatusCode)
	}

	expectedBody := `{"error":"not found"}`
	if response.Body != expectedBody {
		t.Errorf("expected body %s, got %s", expectedBody, response.Body)
	}
}
