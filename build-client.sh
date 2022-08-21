#!/usr/bin/env bash

readonly BUILD_FOLDER_PATH='./dist'
readonly BUILD_ARCHIVE_PATH=$BUILD_FOLDER_PATH'/client-app.zip';

BUILD_CONFIGURATION='';

POSITIONAL_ARGS=();
while [[ $# -gt 0 ]]; do
  case $1 in
    --configuration)
      BUILD_CONFIGURATION="$2";
      shift; shift;
      ;;
    -*|--*)
      echo "Unknown option $1";
      exit 1;
      ;;
    *)
      POSITIONAL_ARGS+=("$1");
      shift;
      ;;
  esac
done
set -- "${POSITIONAL_ARGS[@]}";

npm i;

if [ $BUILD_CONFIGURATION == 'production' ]; then
  npm run build-prod;
else
  npm run build;
fi

if [ -f $BUILD_ARCHIVE_PATH ]; then
    rm $BUILD_ARCHIVE_PATH
fi

zip -r $BUILD_ARCHIVE_PATH $BUILD_FOLDER_PATH;
