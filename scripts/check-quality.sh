 echo "Start linting"
 linterResult=$(yarn lint);
 echo "Start audit"
 auditResult=$(yarn check-deps);
 echo "Start testing"
 yarn unit-test
 yarn sonarqube
 echo "linter: $linterResult";
 echo "audit: $auditResult";