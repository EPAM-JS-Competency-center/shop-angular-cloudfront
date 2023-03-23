#!/bin/bash

# Check if jq is installed
pathToJq=$(which jq)
if [ -z $pathToJq ]; then
    echo "Error: jq isn't installed";
    echo "  You have to install it to make this work done"
    echo "  Debian and Ubuntu repositories. Install using 'sudo apt-get install jq'"
    echo "  MacOS: Use Homebrew to install jq 1.6 with 'brew install jq'"
    echo "  Windows: Use Chocolatey NuGet to install jq 1.5 with 'chocolatey install jq'"
    echo "  For more information please read manual instruction on https://stedolan.github.io/jq/download/"
    echo
    exit 1;
fi

filePath=$1 && shift;
# Check if filename was passed
if [ ! -f $filePath ] ; then
    echo "Error: Path to file is incorrect please try again with valid one"
    echo
    exit 1
fi

# Check if required properties exist
if [ $(jq '.pipeline' $filePath | jq 'has("version")') == false ]; then
    echo "Error: Version property is missed in file"
    exit 1
fi
if [ $(jq '.pipeline.stages[0].actions[0].configuration' $filePath | jq 'has("Branch")') == false ]; then
    echo "Error: Branch property is missed in action 'Source'"
    exit 1
fi
if [ $(jq '.pipeline.stages[0].actions[0].configuration' $filePath | jq 'has("Owner")') == false ]; then
    echo "Error: Owner property is missed in action 'Source'"
    exit 1
fi
if [ $(jq '.pipeline.stages[0].actions[0].configuration' $filePath | jq 'has("PollForSourceChanges")') == false ]; then
    echo "Error: PollForSourceChanges property is missed in action 'Source'"
    exit 1
fi

# Parse named arguments
branch="main"
isPipelineAutoStart=false
while [ $# -gt 0 ]; do
    if [[ $1 == "--branch" ]]; then
        branch=$2
        # echo "Branch is $branch"
        shift
    elif [[ $1 == "--owner" ]]; then
        # echo "Owner is $2"
        owner=$2
        shift;
    elif [[ $1 == "--poll-for-source-changes" ]]; then
        # echo "Deactivate the automatic pipeline execution is $2"
        isPipelineAutoStart=$2
        shift;
    elif [[ $1 == "--configuration" ]]; then
        # echo "Configuration is $2"
        config=$2
        shift;
    fi
    shift
done
# echo filename is $filePath

# Delete old metadata
updatedFileName=$(date -I'seconds')
result=$(jq 'del(.metadata)' $filePath);
# Update version version.;
increasedVersion=$(cat <<< $result | jq '.pipeline.version+1');
result=$(cat <<< $result | jq --arg version $increasedVersion 'setpath(["pipeline","version"]; $version)');
# Set branch 
result=$(cat <<< $result | jq --arg branch $branch '.pipeline.stages[0].actions[0].configuration.Branch=$branch');
# Set owner
if [ ! -z $owner ]; then
    result=$(cat <<< $result | jq --arg owner $owner '.pipeline.stages[0].actions[0].configuration.Owner=$owner');
fi
#  Set pipeline autostart
result=$(cat <<< $result | jq --arg isPipelineAutoStart $isPipelineAutoStart '.pipeline.stages[0].actions[0].configuration.PollForSourceChanges=$isPipelineAutoStart');
# Set EnvironmentVariables in each action TODO
if [ ! -z $config ]; then
    echo "I dont have any clue how to set production env vars"
    changedQualityGate=$(cat <<< $result | jq --arg value [{\"BUILD_CONFIGURATION\":\"$config\"}] '.pipeline.stages | map(select(.name == "QualityGate").actions[0].configuration.EnvironmentVariables=$value)');
    changedBuldAndQG=$(cat <<< $changedQualityGate | jq --arg value [{\"BUILD_CONFIGURATION\":\"$config\"}] 'map(select(.name == "Build").actions[0].configuration.EnvironmentVariables=$value)')
    result=$(cat <<< $result | jq --arg newStages "$changedBuldAndQG" '.pipeline.stages=$newStages');
fi

echo $result | jq '.pipeline.stages | fromjson' > pipeline-$updatedFileName.json

