sudo apt update
cd webssh2/app
sudo apt install nodejs
sudo apt install npm
sudo apt-get install sqlite3
cd ../../Functions
sqlite3 devices.db ".read DBCreation"
cd php
touch port.txt
touch connectedDevices.txt
