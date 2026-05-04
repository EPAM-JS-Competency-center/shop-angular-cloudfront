GO_BUILD := CGO_ENABLED=0  GOOS=linux GOARCH=arm64 go build -tags lambda.norpc -ldflags="-s -w"

.PHONY: build-ui
build-ui:
	cd client && npm ci && npx ng build --configuration production

.PHONY: build-cart-ui
build-cart-ui:
	cd cart-api && npm ci && npm run build

.PHONY: build-api
build-api:
	cd api &&  \
	$(GO_BUILD) -o ./dist/getProductsList/bootstrap ./cmd/getProductsList/main.go && \
	$(GO_BUILD) -o ./dist/getProductsById/bootstrap ./cmd/getProductsById/main.go && \
	$(GO_BUILD) -o ./dist/createProduct/bootstrap ./cmd/createProduct/main.go && \
	$(GO_BUILD) -o ./dist/updateProduct/bootstrap ./cmd/updateProduct/main.go && \
	$(GO_BUILD) -o ./dist/deleteProduct/bootstrap ./cmd/deleteProduct/main.go && \
	$(GO_BUILD) -o ./dist/importProductsFile/bootstrap ./cmd/importProductsFile/main.go && \
	$(GO_BUILD) -o ./dist/importFileParser/bootstrap ./cmd/importFileParser/main.go && \
	$(GO_BUILD) -o ./dist/catalogBatchProcess/bootstrap ./cmd/catalogBatchProcess/main.go && \
	$(GO_BUILD) -o ./dist/basicAuthorizer/bootstrap ./cmd/basicAuthorizer/main.go

.PHONY: deploy
deploy: build-ui build-cart-ui build-api
	cd infra && npx cdk deploy --all --require-approval never $(if $(PROFILE),--profile $(PROFILE),)

.PHONY: seed
seed:
	cd api && go run cmd/seed/main.go

.PHONY: seed-local
seed-local:
	cd api && LOCALSTACK_ENDPOINT=http://localhost:4566 go run cmd/seed/main.go

.PHONY: deploy-local
deploy-local:
	cd infra && npx cdklocal bootstrap && npx cdklocal deploy APIStack --require-approval never --context local=true

.PHONY: compose-up
compose-up:
	cd infra && docker compose up -d

.PHONY: compose-down
compose-down: 
	cd infra && docker compose down

.PHONY: local-up
local-up: compose-up deploy-local seed-local

.PHONY: local-down
local-down: compose-down
