#!/usr/bin/env bash

#Avoid Angular cli asking for collecting analytics
export NG_CLI_ANALYTICS="false"

declare distDir='dist'
declare zipFile='client-app.zip'

if ! [ -x "$(command -v zip)" ]
then
    echo "Error: The app cannot be built, zip is not installed"
    echo 'Please install zip and try again.'
    exit 1
fi

echo "Installing app dependencies"
npm install

if [ -f "$distDir/$zipFile" ]
then
    echo "Removing existing zip file"
    rm -f $distDir/$zipFile
fi

echo "Building app"
export ENV_CONFIGURATION=""
npm run build -- --configuration=$ENV_CONFIGURATION

cd $distDir
echo "Compressing dist app"
zip -qr "$zipFile" *

echo "App built succesfully"