#!/bin/bash

FE_LOCAL_DIR=$(pwd)
FE_REMOTE_DIR=/var/www/shop
SSH_ALIAS=ubuntu-sshuser

#Run code quality tools
echo "Running code quality tools"
sh quality-check.sh
echo "Code quality tools finished"

#Run code quality tools
echo "Running buiding app process"
sh build-client.sh
echo "Build finished"


if ssh $SSH_ALIAS "[ ! -d $FE_REMOTE_DIR ]"; then
    echo "Creating dir $FE_REMOTE_DIR"
    ssh -t $SSH_ALIAS "sudo bash -c 'mkdir -p $FE_REMOTE_DIR && chown -R sshuser:sshuser $FE_REMOTE_DIR'"
else
    echo "Removing previous app"
    ssh $SSH_ALIAS "sudo -S rm -r $FE_REMOTE_DIR/*"
fi

echo "Building and Deploying app"
scp -Cr client-app.zip certs nginx.conf $SSH_ALIAS:$FE_REMOTE_DIR
ssh $SSH_ALIAS "sudo -S unzip $FE_REMOTE_DIR/client-app.zip"
echo "App built and deployed"