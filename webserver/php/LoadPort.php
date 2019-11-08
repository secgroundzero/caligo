<?php
$ConfigFile = "../Config";
$Configlines = file($ConfigFile);
$Portpath=substr($Configlines[3], 11,strlen($Configlines[3]));
$PPath=str_replace('"','',$Portpath);
$portFile=trim($PPath, " \n");
$devicePort=$_GET["devicePort"];
			$portFileH=fopen($portFile,'w') or die ("can't open file 2");
			fwrite($portFileH,$devicePort);
			fclose($portFileH);
			sleep(3);
?>
