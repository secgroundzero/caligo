# Caligo

Caligo is a simple C2 for hostile "dropbox" devices management used in physical security assessments. We have been using drop devices for a long time now but we never had an easy way to manage them especially when running multiple engagements at the same time with multiple devices for each. Caligo solves this problem by providing a client and server setup script which allows the user to control all of the devices from a web application. 


#### Communication

Communication between the devices and the Caligo server works via reverse SSH and authentication to the device via SSH public keys. In practise, the device should have a method for communicating with the server such as 3G or the target network depending on the egress rules.


#### Architecture

Caligo consists of the following:

1. client.py - Executed on the device
2. config - Client configuration file
3. setup.sh - Initial server setup script
4. npm webssh - Customized npm ssh module for interacting with the devices
5. server.py - Accept connections from devices


#### Setup

**1. Server setup** 
 
1.1 Run *setup.sh* which will look for the dependencies, install if missing and start the server module.

1.2 Edit the *config* file

* DB_PATH - Absolute path of the DB location from the cloned folder
* PORT_FILE - Absolute path of the ports.txt file. Default should be in the cloned folder
* SOCKET_WEB_SOCKET_PORT - Must match the *config* on the client side
* USER_FILE - Absolute path of the user.txt file. Default should be in the cloned folder

**2. Device setup**

2.1 Run *setup.sh* 

2.2 Edit the parameters in the *config* file:

* SERVER_IP - C2 server IP. Must be internet facing
* SOCKET_PORT - Can keep as default. If you make changes here you also need to edit *SOCKET_WEB_SOCKET_PORT* parameter in the config file on the server. 
* DEVICE_NAME - Name of your device that will appear on the C2 panel
* SSH_PORT_SERVER - Change this if your C2 server's listening SSH port is other than 22

2.3 SSH public key

* ssh-keygen -t rsa -b 2048 - Create SSH key on device

Copy *id_rsa.pub* to the C2 server *~/.ssh/authorized_keys*  

#### Execution

1. Run *start.sh* on the server
2. Create the crontab which will run the script. Ex. **5 * * * * /bin/bash/[CALIGO DIR]/start.sh**. This will check every 5 minutes if the SSH process if running and restart it if not.

If everything goes well with the installation when you visit  [http://<SERVER_IP>/caligo/login.html](http://<SERVER_IP>/caligo/login.html) you should be greeted with this

![alt tag](https://github.com/secgroundzero/caligo/blob/master/caligo_login.png)


#### CREDENTIALS

root/root

The credentials can and **SHOULD** be changed.

#### Logging

The terminal keeps a full transcription logs which can be downloaded locally.

![alt tag](https://github.com/secgroundzero/caligo/blob/master/caligo_logging.png)


### Device Management

Connections history is kept in a local sqlite database. At each run, the tool which check to see any of those connections are still alive. If not they will be displayed in grey color until removed from the GUI. 

Incoming connections are checked every 5 minutes by default or by clicking the refresh button.
