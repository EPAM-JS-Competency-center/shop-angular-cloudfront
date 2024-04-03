#!/bin/bash

cd ..
echo "Start linting"
linterResult=$(npm run lint);
echo "Start audit"
auditResult=$(npm audit);
echo "Start testing"
npm run nowatch-test
echo "linter: $linterResult";
echo "audit: $auditResult";
















































































"
