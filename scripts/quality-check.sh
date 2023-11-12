#!/bin/bash

error_color="\033[38;5;196m"
green_color="\033[38;5;46m"
reset_color="\033[0m"

echo "Quality check ...!"

run_command() {
  $1
  case $? in
    0)
      echo -e "$green_color $2 passed. No issues found.$reset_color";;
    *)
      echo -e "$error_color $2 failed. Please review the output for issues.$reset_color"
      exit 1;;
  esac
}

run_command "ng lint" "Linting"
run_command "ng test --watch=false" "Unit tests"
run_command "npm audit" "Npm Audit"
