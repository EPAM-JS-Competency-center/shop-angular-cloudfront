
GO_BUILD := GOOS=linux GOARCH=arm64 go build -tags lambda.norpc

.PHONY: install
install:
	cd client && npm install

.PHONY: build-ui
build-ui:
	cd client && npx ng build --configuration production

.PHONY: build-api
build-api:
	cd api &&  \
	$(GO_BUILD) -o ./dist/getProductsList/bootstrap ./cmd/getProductsList/main.go && \
	$(GO_BUILD) -o ./dist/getProductsById/bootstrap ./cmd/getProductsById/main.go

.PHONY: deploy
deploy: build-ui build-api
	cd infra && npx cdk deploy --all --require-approval never $(if $(PROFILE),--profile $(PROFILE),)
