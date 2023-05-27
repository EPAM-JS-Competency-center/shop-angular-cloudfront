#!/bin/bash

echo "Start getting modules";
npm install;
echo "Start build process";
if [ -z $1 ]
then
	npm run build --configuration
else 
	npm rum configuration production
fi
echo "Check if previous version archive exist"
archive_name=app.zip;
cd ../dist;
if [ -f "./$archive_name" ]
then
	echo "Delete previous version"
	rm "./$archive_name";
fi
echo "Create new archive"
zip -rm $archive_name app;
