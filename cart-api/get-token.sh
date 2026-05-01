#!/bin/bash

if [ ! -f .env ]; then
  echo ".env file does not exist. Run command:"
  echo "cat env.example > .env"
  echo "Then update credentials in created .env file"
  exit 1
fi

source .env


REGISTER_PAYLOAD="{\"name\":\"$AUTH_USERNAME\",\"password\":\"$AUTH_PASSWORD\"}"
LOGIN_PAYLOAD="{\"username\":\"$AUTH_USERNAME\",\"password\":\"$AUTH_PASSWORD\"}"

curl -s --header "Content-Type: application/json" \
  --request POST \
  --data "$REGISTER_PAYLOAD"  "$APP_URL/api/auth/register" > /dev/null


curl -s --header "Content-Type: application/json" \
  --request POST \
  --data "$LOGIN_PAYLOAD" "$APP_URL/api/auth/login"
