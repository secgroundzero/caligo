systemctl start apache2
python server.py &
python Functions/createPath.py
cd webssh2/app
npm install
npm start 
