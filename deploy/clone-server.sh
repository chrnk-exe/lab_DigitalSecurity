rm -rf server
git clone -b server https://github.com/chrnk-exe/lab_DigitalSecurity ./server
cd server
npm run migrate
npm run startpm2
