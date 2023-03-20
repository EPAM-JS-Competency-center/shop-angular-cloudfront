#!/bin/bash
echo "update json"
result=$(jq 'del(.metadata)' ./pipeline.json);
echo $result;
echo $result > pipeline-$(date -Ins).json

