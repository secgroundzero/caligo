sudo apt update
cd webssh2/app
sudo apt install nodejs
sudo apt install npm
sudo apt-get install sqlite3
cd ../../Functions
sqlite3 devices.db ".read DBCreation"
chown www-data devices.db
chmod +x 
cd php
touch port.txt
chown www-data port.txt
touch connectedDevices.txt
chown www-data connectedDevices.txt
cd ../..
chown www-data Functions

