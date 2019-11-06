<?php
require('DBConnection/SQLiteDeviceConnection.php');
header('Content-type: application/json');
$session=$_POST["session"];
$sqlite = new SQLiteDeviceConnection();
$pdo = $sqlite->connect();
if ($pdo!=null){
	$response=$sqlite->checkStatus($session);
	$count=count($response);
	if ($count>0){
		$response=array(
		"status"=>"success",
		"access"=>1
	);
	}
	else{
		$response=array(
		"status"=>"success",
		"access"=>0
		);
	}
}
else{
	$response=array(
		"status" => "success",
		"connection" => "Connection could not be established"
	);
}	
echo json_encode($response);
?>
