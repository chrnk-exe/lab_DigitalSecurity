rm -rf server
mkdir -p server
git clone -b server https://github.com/chrnk-exe/lab_DigitalSecurity.git ./server
cd server
npm install
npm run mundo
npm run migrate
npm run startpm2
