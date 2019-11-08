<?php
$myfile = fopen("connectedDevices.txt", "r") or die("Unable to open file!");
echo fread($myfile,filesize("connectedDevices.txt"));
fclose($myfile);
?>

