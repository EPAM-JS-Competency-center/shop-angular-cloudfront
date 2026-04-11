
.PHONY: install
install:
	cd client && npm install

.PHONY: build
build:
	cd client && npx ng build

.PHONY: build-prod
build-prod:
	cd client && npx ng build --configuration production
