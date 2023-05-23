#!/bin/bash

FE_LOCAL_DIR=$(pwd)
FE_REMOTE_DIR=/var/www/shop
SSH_ALIAS=ubuntu-sshuser

if ssh $SSH_ALIAS "[ ! -d $FE_REMOTE_DIR ]"; then
    echo "Creating dir $FE_REMOTE_DIR"
    ssh -t $SSH_ALIAS "sudo bash -c 'mkdir -p $FE_REMOTE_DIR && chown -R sshuser:sshuser $FE_REMOTE_DIR'"
else
    echo "Removing previous app"
    ssh $SSH_ALIAS "sudo -S rm -r $FE_REMOTE_DIR/*"
fi

echo "Building and Deploying app"
npm run build -- --configuration=production
scp -Cr dist/* certs nginx.conf $SSH_ALIAS:$FE_REMOTE_DIR
echo "App built and deployed"
