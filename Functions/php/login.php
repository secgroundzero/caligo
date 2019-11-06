<?php
require('DBConnection/SQLiteDeviceConnection.php');
header('Content-type: application/json');
$username=$_POST["username"];
$passwordHash=$_POST["passwordHash"];
$sqlite = new SQLiteDeviceConnection();
$pdo = $sqlite->connect();
if ($pdo!=null){
	$response=$sqlite->login($username, $passwordHash);
	$countUser=count($response);
	if ($countUser>0){
		$userID=$response["userID"];
		$user["UserID"]=$response["userID"];	
		$response=array(
		"status" => "success",
		"count" =>  count($user),
		"userID" => $user
		);
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    		$charactersLength = strlen($characters);
    		$randomString = '';
    		for ($i = 0; $i < 256; $i++) {
        		$randomString .= $characters[rand(0, $charactersLength - 1)];
   		}
		$sqlite=new SQLiteDeviceConnection();
		$pdo=$sqlite->connect();
		if ($pdo!=null){
			$rep=$sqlite->setSession($userID,$randomString);
			$response=array(
                "status" => "success",
                "count" =>  count($user),
                "userID" => $user,
                "session"=> $randomString
                );
		}
		else{
			$response=array(
                "status" => "success",
                "connection" => "Connection could not be established"
);
}		$response=array(
                "status" => "success",
                "count" =>  count($user),
                "userID" => $user,
		"session"=> $randomString
                );
	}
	else{
		$user=[];
		$response=array(
		"status"=> "success",
		"count"=>count($user)
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
