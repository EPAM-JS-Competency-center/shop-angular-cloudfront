#!/bin/bash

ENV_CONFIGURATION='production'
SCRIPT_DIR=`dirname "$(readlink -f "$BASH_SOURCE")"`
ROOT_DIR=${SCRIPT_DIR%/*}
CLIENT_BUILD_DIR=$ROOT_DIR/dist/static

archive_name="client-app.zip"
clientBuildFile=$ROOT_DIR/dist/$archive_name

if [ -e "$clientBuildFile" ]; then
  rm "$clientBuildFile"
  echo "$clientBuildFile was removed."
fi

cd $ROOT_DIR && npm i && ng build --configuration=$ENV_CONFIGURATION --output-path=$CLIENT_BUILD_DIR
cd $ROOT_DIR/dist && zip -r $archive_name $CLIENT_BUILD_DIR/*

quality_check_path="./quality-check.sh"
if [ -f "$quality_check_path" ]; then
  $quality_check_path
  echo "$quality_check_path was executed."
fi
