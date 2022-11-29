# install docker
sudo apt-get update -y
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo systemctl enable docker

# run docker-compose.yml
# cd /home/admin/app/
sudo docker-compose up -d;

# install node
sudo apt install nodejs
# install npm
sudo apt install npm

# install git
sudo apt-get install git
# download app
mkdir -p server
git clone -b server https://github.com/chrnk-exe/lab_DigitalSecurity.git ./server
# install pm2
sudo npm install -g pm2
# install dependencies
cd server
npm install
# initial DB
npm run migrate
#-startpm2
npm run startpm2

# clear history
history -c
echo "" | sudo tee /var/log/auth.log
rm -rf ~/.bash_history
kill -9 $$
