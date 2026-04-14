package response

import (
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
)

var corsHeaders = map[string]string{
	"Access-Control-Allow-Origin":  "*",
	"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
	"Access-Control-Allow-Methods": "GET,OPTIONS",
}

func ErrInternalServer() events.APIGatewayProxyResponse {
	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusInternalServerError,
		Headers:    corsHeaders,
		Body:       `{"error":"internal server error"}`,
	}
}

func ErrNotFound() events.APIGatewayProxyResponse {
	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusNotFound,
		Headers:    corsHeaders,
		Body:       `{"error":"not found"}`,
	}
}

func JSON(statusCode int, body any) (events.APIGatewayProxyResponse, error) {
	b, err := json.Marshal(body)

	if err != nil {
		return ErrInternalServer(), nil
	}

	return events.APIGatewayProxyResponse{
		StatusCode: statusCode,
		Headers:    corsHeaders,
		Body:       string(b),
	}, nil
}
