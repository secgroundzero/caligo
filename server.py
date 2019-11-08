#!/usr/bin/env python
import socket, sys              
 
if __name__=="__main__": 

	#Read from file
	f = open("Config", "r")
	lines=f.readlines()
	for l in lines:
		if (l.startswith("SOCKET_WEB_SOCKET_PORT=")):
			PORT=int(l[23:len(l)].strip().replace(" ",""))
	# next create a socket object 
	s = socket.socket()          
	s.bind(('', PORT))         
	#Socket binded to port
	while True:
		s.listen(20)   
		try:
			c, addr = s.accept()
			f=open("Functions/php/connectedDevices.txt","a")
			toWrite=c.recv(6072)+"\n"
			f.write(toWrite)
			f.close()
			c.send('Thank you for connecting') 
		except:
			print "Waiting for connection"  
