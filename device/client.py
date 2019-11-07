#!/usr/bin/env python3
from requests import get
import socket
import random
import os
import subprocess

#Identify Internal IP
def getInternalIP():

	internalIP=([l for l in ([ip for ip in socket.gethostbyname_ex(socket.gethostname())[2] 
	if not ip.startswith("127.")][:1], [[(s.connect(('8.8.8.8', 53)), 
	s.getsockname()[0], s.close()) for s in [socket.socket(socket.AF_INET, 
	socket.SOCK_DGRAM)]][0][1]]) if l][0][0])  

	return internalIP

#Identify External IP
def getExternalIP():
	#data=json.loads(urllib.urlopen("http://ifconfig.me/ip").read())
	externalIP = get('https://api.ipify.org').text
	#externalIP=data["ip"]
	return externalIP

def getRandomPort():
	return random.randint(40000,65535)

def checkifExists():
	if (os.path.exists("/Users/stconstantinou/.ssh/id_rsa.pub")):
		return True
	else:
		return False

def getPublicKey():
	if (checkifExists()):
		f=open("/Users/stconstantinou/.ssh/id_rsa.pub","r")
  		key=f.readline()
  		return key.strip()
  	#else:
  	#	subprocess.call("ssh-keygen -t rsa -b 2048", shell=True)
  	#	f=open("~/.ssh/id_rsa.pub","r")
  	##	key=f.readline()

def main():
	#Read Config File
	f = open("Config", "r")
	lines=f.readlines()
	for l in lines:
		if (l.startswith("SERVER_IP=")):
			SERVER_IP=l[10:len(l)].strip().replace(" ","")
		elif (l.startswith("SOCKET_PORT=")):
			SOCKET_PORT=int(l[12:len(l)].strip().replace(" ",""))
		elif(l.startswith("DEVICE_NAME=")):
			DEVICE_NAME=l[12:len(l)].strip().replace(" ","")
		elif(l.startswith("SSH_PORT_SERVER")):
			SSH_PORT_SERVER=l[16:len(l)].strip().replace(" ", "")


	internalIP=getInternalIP()
	externalIP=getExternalIP()
	SSHport=getRandomPort()
	#key=getPublicKey()
	
	info="DEVICE_NAME:"+str(DEVICE_NAME)+"|SSH_PORT:"+str(SSHport)+"|EXTERNAL_IP:"+str(externalIP)+"|INTERNAL_IP:"+str(internalIP)
	# Create a socket object 
	s = socket.socket()          	                	  
	# connect to the server 
	s.connect((SERVER_IP, SOCKET_PORT)) 
	# send info
	s.send(info)
	# close socket
	s.close()
	print info
	commandTo="ssh -N -R "+str(SSHport)+":localhost:"+str(SSH_PORT_SERVER) +" root@" + str(SERVER_IP)
	print commandTo
	subprocess.call(commandTo,shell=True)
if __name__== "__main__":
	main()

