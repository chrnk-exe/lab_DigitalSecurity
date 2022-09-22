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
# install pm2
sudo npm install -g pm2
# install git
sudo apt-get install git
# install python
sudo apt-get install python
sudo apt install python3-venv
sudo apt install pip

# install chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install -y ./google-chrome-stable_current_amd64.deb
rm ./google-chrome-stable_current_amd64.deb

# install chrome driver
wget https://chromedriver.storage.googleapis.com/2.41/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
sudo mv chromedriver /usr/bin/chromedriver
sudo chown root:root /usr/bin/chromedriver
sudo chmod +x /usr/bin/chromedriver

# download app
mkdir -p App
git clone https://github.com/chrnk-exe/lab_DigitalSecurity.git ./App
cd App
# start bot
cd bot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pm2 start bot.py
cd ..
# install dependencies
cd src/server
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
