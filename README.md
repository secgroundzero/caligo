# Caligo

Caligo is a simple C2 for hostile "dropbox" devices management used in physical security assessments. We have been using drop devices for a long time now but we never had an easy way to manage them especially when running multiple engagements at the same time with multiple devices for each. Caligo solves this problem by providing a client and server setup script which allows the user to control all of the devices from a web application. 


#### Communication

Communication between the devices and the Caligo server works via reverse SSH sp that the devices will always call back to the server eliminating the need of knowing the external IP of each device. In practise, the device should have a method for communicating with the server such as 3G or the target network depending on the egress rules.


#### Architecture

Caligo consists of the following:

1. client.py - Executed on the device
2. config - Client configuration file
3. setup.sh - Initial server setup script
4. npm webssh - Customized npm ssh module for interacting with the devices
5. server.py - Accept connections from devices

#### Prerequisites

You will need to have Apache installed and the move the folder webserver from the cloned project under **/var/www/html/**

#### Setup

**1. Server setup** 
 
1.1 Run *setup.sh* which will look for the dependencies, install if missing and start the server module.

1.2 Edit the *Config* file

* DB_PATH - Absolute path of the DB location from the cloned folder
* PORT_FILE - Absolute path of the ports.txt file. Default should be in the cloned folder
* USER_FILE - Absolute path of the user.txt file. Default should be in the cloned folder
* SOCKET_WEB_SOCKET_PORT - Must match the *config* on the client side

**2. Device setup**

2.1 Run *device/setup.sh* 

2.2 Edit the parameters in the *device/Config* file:

* SERVER_IP - C2 server IP. Must be internet facing
* SOCKET_PORT - Can keep as default. If you make changes here you also need to edit *SOCKET_WEB_SOCKET_PORT* parameter in the config file on the server. 
* DEVICE_NAME - Name of your device that will appear on the C2 panel
* SSH_PORT_SERVER - Change this if your C2 server's listening SSH port is other than 22
* PASSWORD_USE - True/False depending if you want to authenticate to the server using a password or certificate
* SERVER_USER - The user to authenticate as on the server

2.3 SSH public key

* ssh-keygen -t rsa -b 2048 - Create SSH key on device  - **IMPORTANT** Name your certificate as id_rsa otherwise it will not work. Working on a fix.

Copy *id_rsa.pub* to the C2 server *~/.ssh/authorized_keys*  

2.4 Edit *device/start.sh* to include the full path of *device/client.py*. Ex start.sh ```python /home/pi/caligo/device/client.py``` 

#### Execution

1. Run *start.sh* on the server
2. Create the crontab or .bashrc entry which will run the script. 
Ex. **/5 * * * * /bin/bash/[CALIGO DIR]/start.sh**. This will check every 5 minutes if the SSH process if running and restart it if not.

If everything goes well with the installation when you visit  [http://<SERVER_IP>/caligo/login.html](http://<SERVER_IP>/caligo/login.html) you should be greeted with this

![alt tag](https://github.com/secgroundzero/caligo/blob/master/caligo_login.png)

3. Reboot for the crontab to execute

*As soon as the device attempts to SSH to the server it will ask for the password. The same will happen on the server side when a new connection comes in.* 


#### CREDENTIALS

root/root

The credentials can and **SHOULD** be changed.

#### Logging

The terminal keeps full transcription logs which can be downloaded locally.

![alt tag](https://github.com/secgroundzero/caligo/blob/master/caligo_logging.png)


### Device Management

Connections history is kept in a local sqlite database. At each run, the tool which check to see any of those connections are still alive. If not they will be displayed in grey color until removed from the GUI. 

Incoming connections are checked every 5 minutes by default or by clicking the refresh button.

If you want to keep the same setup and reuse the device for another engagement you can run *device/refresh.sh* that will remove the previous connection settings.



