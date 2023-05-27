 echo "Start linting"
 linterResult=$(yarn lint);
 echo "Start audit"
 auditResult=$(yarn check-deps);
 echo "Start testing"
 testResult=$(yarn unit-test);
 sonarResult=$(yarn sonarqube)
 echo "linter: $linterResult";
 echo "audit: $auditResult";
 echo "test: $testResult";
 echo "sonarqube: $sonarResult"
 