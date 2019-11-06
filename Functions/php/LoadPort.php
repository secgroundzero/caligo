<?php
$portFile="port.txt";
$devicePort=$_GET["devicePort"];
			$portFileH=fopen($portFile,'w') or die ("can't open file 2");
			fwrite($portFileH,$devicePort);
			fclose($portFileH);
			sleep(3);
?>
