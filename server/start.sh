trap "exit" INT TERM ERR
trap "kill 0" EXIT
systemctl start apache2
cp Config /var/www/html/caligo/
python server.py &
python Functions/createPath.py
cd webssh2/app
npm install
npm start 
