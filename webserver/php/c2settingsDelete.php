<?php

require('DBConnection/SQLiteDeviceConnection.php');
header('Content-type: application/json');

    $devID=$_POST["devID"];
	$session=$_POST["session"];
	  $sqlite = new SQLiteDeviceConnection();
    $pdo = $sqlite->connect();

    if ($pdo!=null){
        //Delete the device
	$resp=$sqlite->checkStatus($session);
	if(count($resp)>0){
		 $sqlite = new SQLiteDeviceConnection();
		 $pdo = $sqlite->connect();
       		 $sqlite->deleteDevice($devID);
        	$response=array(
            		"status" => "success",
           		 "message"=> "Device Deleted successfully"
        	);
	}
	else{
		$response=array("status" => "fail",
		"message"=>"Not authorized");
	}
    }
    else{
        $response=array(
            "status" => "fail",
            "message"=>"Not able to establish a connection"
        );
    }
    echo json_encode($response);



