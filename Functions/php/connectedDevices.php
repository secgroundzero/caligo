<?php
require('DBConnection/SQLiteDeviceConnection.php');
header('Content-type: application/json');
$latestLine=$_GET["afterLine"];
$lines = file("connectedDevices.txt");
$linesCount=count($lines);
$ip_server = $_SERVER['SERVER_ADDR']; 
if ($linesCount>$latestLine){
		$split=explode("|",$lines[$latestLine]);
		$deviceName=explode(":",$split[0])[1];
		$internaldeviceIP=explode(":",$split[3])[1];
		$externaldeviceIP=explode(":",$split[2])[1];
		$devicePort=intval(explode(":",$split[1])[1]);
		$username=explode(":",$split[4])[1];
		$new["DeviceName"]=$deviceName;
		$new["DeviceInternalIP"]=$internaldeviceIP;
		$new["DeviceExternalIP"]=$externaldeviceIP;
		$new["DevicePort"]=$devicePort;
		$new["username"]=$username;
		$last=$latestLine+1;
		$sqlite = new SQLiteDeviceConnection();
    		$pdo = $sqlite->connect();
		if ($pdo != null) {
			$newDev = $sqlite->addDevice($deviceName, $devicePort, $externaldeviceIP, $internaldeviceIP,$username);
			$new["DeviceID"]=$newDev["deviceID"];
			$portFile="port.txt";
			$portFileH=fopen($portFile,'w') or die ("can't open file 2");
			fwrite($portFileH,$devicePort);
			fclose($portFileH);
			$userFile="user.txt";
			$userFileH=fopen($userFile,'w') or die ("can't  open file 3");
			fwrite($userFileH, $username);
			fclose($userFileH);
			sleep(3);
		}
		else{
		}
	$response=array(
		"status" => "success",
		"serverIP" => $ip_server,
		"newconnection" =>1,
		"connection"=> $new,
		"lastLine" => $last
	);

}
else{
	$response=array(
	"status" => "success",
	"newconnection" => 0,
	"lastLine" => $latestLine
);
}
echo json_encode($response);
?>

