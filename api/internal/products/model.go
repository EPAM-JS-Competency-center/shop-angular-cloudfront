package products

import (
	_ "embed"
	"encoding/json"
)

//go:embed products.json
var productsJSON []byte

type Product struct {
	ID          string  `json:"id"`
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Count       int     `json:"count"`
}

func GetProducts() ([]Product, error) {
	var products []Product
	err := json.Unmarshal(productsJSON, &products)

	if err != nil {
		return nil, err
	}

	return products, nil
}
