 
 # prepeare frontend
yarn unit-test && yarn check-deps && yarn lint;
if [ $? -eq 1 ]; then # if script succeeded
    echo "\n---== Code quality check failed ==---\n";
else
    echo "code is = "
    echo $?
    cd /Users/Mikhail_Proshin/work/shop-react-redux-cloudfront/
    rm -rf ./dist;
    npm run build;
    # clear data
    ssh ubuntu@13.53.61.166 'sudo rm -rf /var/www/html/*'
    # transfer data
    scp -r /Users/Mikhail_Proshin/work/shop-react-redux-cloudfront/dist ubuntu@13.53.61.166:/var/www/html
    # run new version
    ssh ubuntu@13.53.61.166 'pm2 start ./nestjs-rest-api/dist/main.js; sudo systemctl restart nginx;'
fi