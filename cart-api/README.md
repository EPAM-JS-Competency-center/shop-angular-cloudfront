# nodejs-aws-cart-api

## Installation

```bash
npm install
```



## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```


## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

### Create user and get auth token

register user with `POST` http://localhost:4000/api/auth/register

Body:
```json
{
  "name": "your_github_login",
  "password": "TEST_PASSWORD"
}
```

**get token** with `POST` http://localhost:4000/api/auth/login

Body
```json
{
  "username": "your_github_login",
  "password": "TEST_PASSWORD"
}
```
Response
```json
{
  "token_type": "Basic",
  "access_token": "eW91ckdpdGh1YkxvZ2luOlRFU1RfUEFTU1dPUkQ="
}

```

**Or you can do it with bash script, make sure you have installed `curl` in your system**

Put content of env.example to .env and **update credentials**:
```bash
cat env.example > .env
```

Create user and get token
```bash
./get-token.sh
```
if command failed make script executable
```bash
chmod +x ./get-token.sh
```

