#!/bin/bash

npm i;
source ./quality-check.sh;
rm client-app.zip;
ng build --configuration $ENV_CONFIGURATION;
zip -r client-app.zip ./dist
echo Build files count "$(find ./dist/app/. | grep -c ./dist/app/./)"
