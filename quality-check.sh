#!/usr/bin/env bash
# eslint, testing, dependencies check, static code analysis.
#Avoid Angular cli asking for collecting analytics
export NG_CLI_ANALYTICS="false"

#Run eslint
echo "Runining ESlint check..."
npm run lint
echo "Lint check finished"

#Run testing
echo "Runing tests ..."
npm run test:coverage
echo "Test check finished"

#Run dependencies check
echo "Running dependencies check ..."
npm audit
echo "Dependencies check finished"

#Run static code analysis
echo "Runing static code analysis ..."
sonar-scanner
echo "Static code analysis finished"
