#!/bin/bash

date=$(date +"%m-%d-%y")
branch="main"
pollForSourceChanges=false

if ! command -v jq &> /dev/null
then
  echo "jq is not installed. To install run: "
  case "$OSTYPE" in
    linux*)   echo "
      Ubuntu: sudo apt-get install jq
      Fedora: sudo dnf install jq
      OpenSUSE: sudo zypper install jq
      Arch: sudo pacman -S jq

      Other: https://stedolan.github.io/jq/download/
    " ;;
    darwin*)  echo "
      brew install jq
    " ;;
    msys*)    echo "
      chocolatey install jq
      https://stedolan.github.io/jq/download/
    " ;;
  esac
  exit 1
fi

if [[ -f $1 ]]; then
  filePath=$1
else
  echo "json file input is not valid. use ./update-pipeline-definition.sh ./pipeline.json"
  exit 1
fi

while [ $# -gt 0 ] ; do
  case $1 in
    --branch) branch="$2" ;;
    --owner) owner="$2" ;;
    --repo) repo="$2" ;;
    --poll-for-source-changes) pollForSourceChanges="$2" ;;
    --configuration) configuration="$2" ;;
  esac
  shift
done

input=`cat $filePath`
output=`jq 'del(.metadata)' <<< "$input"`
output=`jq '.pipeline.version |= . + 1' <<< "$output"`

if [ -n "$branch" ]; then
  output=`jq '(.pipeline.stages[] | select(.name=="Source") | .actions[0]) .configuration.Branch = '\"$branch\"'' <<< "$output"`
fi

if [ -n "$owner" ]; then
  output=`jq '(.pipeline.stages[] | select(.name=="Source") | .actions[0]) .configuration.Owner = '\"$owner\"'' <<< "$output"`
fi

if [ -n "$repo" ]; then
  output=`jq '(.pipeline.stages[] | select(.name=="Source") | .actions[0]) .configuration.Repo = '\"$repo\"'' <<< "$output"`
fi

if [ -n "$pollForSourceChanges" ]; then
  output=`jq '(.pipeline.stages[] | select(.name=="Source") | .actions[0]) .configuration.PollForSourceChanges = '$pollForSourceChanges'' <<< "$output"`
fi

if [ -n "$configuration" ]; then
  output=`jq '(.pipeline.stages[] | .actions[] | .configuration.EnvironmentVariables | strings) |= sub("{{BUILD_CONFIGURATION value}}"; "'$configuration'")' <<< "$output"`
fi

echo $(jq . <<< ''$output'' >  pipeline-''$date''.json)

# echo $(
#   cat ./pipeline.json \
#   | jq 'del(.metadata)' \
#   | jq '.pipeline.version |= . + 1' \
#   | jq '(.pipeline.stages[] | select(.name=="Source") | .actions[0]) .configuration.Branch = '\"$branch\"'' \
#   | jq '(.pipeline.stages[] | select(.name=="Source") | .actions[0]) .configuration.Owner = '\"$owner\"'' \
#   | jq '(.pipeline.stages[] | select(.name=="Source") | .actions[0]) .configuration.Repo = '\"$repo\"'' \
#   | jq '(.pipeline.stages[] | select(.name=="Source") | .actions[0]) .configuration.PollForSourceChanges = '$pollForSourceChanges'' \
#   | jq '(.pipeline.stages[] | .actions[] | .configuration.EnvironmentVariables | strings) |= sub("{{BUILD_CONFIGURATION value}}"; "'$configuration'")' \
#   > pipeline-''$date''.json
# )
