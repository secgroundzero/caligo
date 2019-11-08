sudo apt-get update
sudo apt-get upgrade -y 
sudo apt install apache2
sudo apt install -y php7.2 php7.2-cli php7.2-common
systemctl restart apache2
sudo apt-get install php-sqlite3
systemctl restart apache2
cd webssh2/app
sudo apt install nodejs
sudo apt install npm
sudo apt-get install php-sqlite3
sudo apt-get install sqlite3
cd ../../Functions/
sqlite3 devices.db ".read DBCreation"
cd php/
touch port.txt
touch connectedDevices.txt
touch user.txt
cd ../../../../
chown -R www-data caligo
chmod 770 caligo
