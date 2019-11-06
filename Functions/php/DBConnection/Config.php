<?php
class Config {
    /**
     * path to the sqlite file
     */
	 $fn = fopen("../../Config","r");
  $result = fgets($fn);

   echo $result;
    PATH_TO_SQLITE_FILE = '/var/www/html/WarberryC2/SQLiteConnection/DBConnection/php/devices.db';
}
