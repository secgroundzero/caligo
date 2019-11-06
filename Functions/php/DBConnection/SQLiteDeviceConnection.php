<?php
/**
 * SQLite connnection
 */
class SQLiteDeviceConnection
{
    /**
     * PDO instance
     * @var type
     */
    private $pdo;
    /**
     * return in instance of the PDO object that connects to the SQLite database
     * @return \PDO
     */
    public function connect()
    {
        if ($this->pdo == null) {
            try {
		$ConfigFile = "../../Config";
                $lines = file($ConfigFile);
                $path=substr($lines[1], 9,strlen($lines[1]));
		$DBPath=str_replace('"','',$path);
		$DBPath=trim($DBPath, " \n");
		$db="sqlite:".$DBPath;
		$this->pdo= new PDO($db);
                return $this->pdo;
            } catch (\PDOException $e) {
                echo $e;
                return null;
            }
        } else {
            return $this->pdo;
        }
    }

    public function getDevicesRepo()
    {
        $stmt = $this->pdo->query('SELECT * FROM devices;');
        $devicesRepo = array();
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $dev["DeviceID"] = $row['deviceID'];
            $dev["DeviceName"] = $row["DeviceName"];
            $dev["DeviceInternalIP"] = $row["InternalIP"];
	    $dev["DeviceExternalIP"]=$row["ExternalIP"];
	    $dev["DevicePort"]=$row["PortConnection"];
            array_push($devicesRepo,$dev);
        }
	return $devicesRepo;
    }

   public function login($username, $hashPassword){
	$query="SELECT * FROM users WHERE username='$username' AND passwordHash='$hashPassword' AND latestSession='NOT_AVAILABLE'";
	$stmt=$this->pdo->query($query);
	$user=[];
	while ($row=$stmt->fetch(\PDO::FETCH_ASSOC)){
		$user["userID"]=$row["userID"];
		return $user;
	}
	return $user;
   }

   public function checkStatus($session){
	$startTime = date("Y-m-d H:i:s");
	$query="SELECT * FROM users WHERE latestSession='$session' AND expiry>'$startTime'";
	$stmt=$this->pdo->query($query);
	$session=[];
	while ($row=$stmt->fetch(\PDO::FETCH_ASSOC)){
		$sessionS=$row["latestSession"];
		array_push($session,$sessionS);
		return $session;
	}
	return $session;
   }

   public function setSession($userID, $session){
	$startTime = date("Y-m-d H:i:s");
        $expiry=date('Y-m-d H:i:s',strtotime('+2 hours',strtotime($startTime)));
	$query="UPDATE users SET latestSession='$session', expiry='$expiry' WHERE userID='$userID'";
	$stmt=$this->pdo->query($query);
	}

	public function changePassword($oldPassword, $newPassword, $confirmPassword){
			$query="SELECT * from users WHERE passwordHash='$oldPassword'";
			$stmt=$this->pdo->query($query);
			$user=[];
			while($row=$stmt->fetch(\PDO::FETCH_ASSOC)){
				array_push($user,$row);
			}
			if (count($user)>0){
				if ($newPassword==$confirmPassword){
					$query="UPDATE users SET passwordHash='$newPassword'";
					$stmt=$this->pdo->query($query);
					return  True;
				}
				else{
					return False;
				}
			}
			else{
				return False;
			}
	}

	public function logout(){
		$query="UPDATE users SET latestSession='NOT_AVAILABLE'";
		$stmt=$this->pdo->query($query);
		return True;
	}
    public function changeDeviceInfo($deviceName,$devicePort,$externaldeviceIP,$internaldeviceIP, $deviceID){
        $query="UPDATE devices SET DeviceName='$deviceName',  PortConnection='$devicePort', ExternalIP='$externaldeviceIP', InternalIP='$internaldeviceIP' WHERE deviceID='$deviceID'";
        $stmt=$this->pdo->query($query);
    }

    public function deleteDevice($deviceID){
        $query="DELETE FROM devices WHERE deviceID=".$deviceID;
        $stmt=$this->pdo->query($query);
    }

    public function registerUser($username, $password){
	$query="INSERT INTO users(username, passwordHash) VALUES ('$username', '$password')";
	$stmt=$this->pdo->query($query);
        $query="SELECT * FROM users WHERE username='$username' AND passwordHash='$password'";
	while ($row=$stmt->fetch(\PDO::FETCH_ASSOC)){
		return $row;
	}
    }

    public function addDevice($deviceName, $devicePort, $externaldeviceIP, $internaldeviceIP){
        $query= "INSERT INTO devices(DeviceName, PortConnection, ExternalIP, InternalIP) VALUES ('$deviceName','$devicePort','$externaldeviceIP', '$internaldeviceIP')";
        $stmt=$this->pdo->query($query);
        $query="SELECT * FROM devices WHERE DeviceName='$deviceName' AND PortConnection='$devicePort' AND ExternalIP='$externaldeviceIP' AND InternalIP='$internaldeviceIP'";
        $stmt=$this->pdo->query($query);
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            return $row;
        }
        //return $dev;	
    }



}
