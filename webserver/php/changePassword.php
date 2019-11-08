<?php
require('DBConnection/SQLiteDeviceConnection.php');
header('Content-type: application/json');
$session=$_POST["session"];
$oldPassword=$_POST["oldPassword"];
$newPassword=$_POST["newPassword"];
$confirmPassword=$_POST["confirmPassword"];
$sqlite = new SQLiteDeviceConnection();
$pdo = $sqlite->connect();
if ($pdo!=null){
	$response=$sqlite->checkStatus($session);
	if (count($response)>0){
		$sqlite= new SQLiteDeviceConnection();
		$pdo=$sqlite->connect();
		$response=$sqlite->changePassword($oldPassword, $newPassword, $confirmPassword);
		if ($response){
			$response=array(
		"status"=>"success",
		"change"=>1
		);
	}
	else{
	   $response=array(
                "status"=>"success",
                "change"=>0
                );

	}
	}
	else{
		$response=array(
			"status"=>"success",
			"change"=>0
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
