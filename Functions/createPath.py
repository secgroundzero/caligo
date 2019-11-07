f = open("Config", "r")
lines=f.readlines()
for l in lines:
	if (l.startswith("PORT_FILE=")):
		PORT_FILE_PATH=l[10:len(l)].strip().replace(" ","")
	if (l.startswith("USER_FILE=")):
		USER_FILE_PATH=l[10:len(l)].strip().replace(" ", "")

# with is like your try .. finally block in this case
with open('webssh2/app/server/socket.js', 'r') as file:
    # read a list of lines into data
    data = file.readlines()

# now change the 2nd line, note that you have to add a newline
data[9] = "var portFile=" + PORT_FILE_PATH+";\nvar userFile="+USER_FILE_PATH+";\n"
# and write everything back
with open('webssh2/app/server/socket.js', 'w') as file:
    file.writelines( data )
