<?php

require('DBConnection/SQLiteDeviceConnection.php');
header('Content-type: application/json');
$session=$_POST["session"];
$sqlite = new SQLiteDeviceConnection();
$pdo = $sqlite->connect();
$ip_server = $_SERVER['SERVER_ADDR']; 
if ($pdo != null) {
	$resp=$sqlite->checkStatus($session);
	if (count($resp)>0){
		$sqlite = new SQLiteDeviceConnection();
    		$pdo = $sqlite->connect();
        	$devRepo = $sqlite->getDevicesRepo();
        	if (count($devRepo) <= 0) {
            	$response = array(
                	"status" => "success",
                	"count" => 0,
                	"result" => "0 Devices Found"
            	);
        	} else {
            		$devRepoCount = count($devRepo);
	    		$onlineDevices=array();
	    		$offlineDevices=array();
	    		for ($i=0; $i<$devRepoCount; $i++){
				$resultNetstat=array();
				$checkPort=$devRepo[$i]["DevicePort"];
           			$execCommand='netstat -an | grep '.$checkPort. "| grep -w 'tcp' | awk '{print $5}'";
            			exec($execCommand, $resultNetstat);
              			if (count($resultNetstat)>0){
					array_push($onlineDevices,$devRepo[$i]);
				}
				else{
					array_push($offlineDevices, $devRepo[$i]);
				}
	    		}
			$response=array(
 				"serverip" => $ip_server,
       				"status" => "success",
                		"online" => count($onlineDevices),
                		"onlineDevices" => $onlineDevices,
				"offline" =>  count($offlineDevices),
				"offlineDevices" => $offlineDevices
           		 );
 		}
    	}
	else{
		$response=array(
			"status"=> "fail",
			"message" =>"Not authorized"
		);
	}
}   
 else{
        $response=array(
          "status" => "fail", 
            "message"=>"Not able to establish a connection"
        );
    }
	
echo json_encode($response);
