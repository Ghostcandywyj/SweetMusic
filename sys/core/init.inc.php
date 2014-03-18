<?php

if( !isset($_BASE_PATH) ) $_BASE_PATH = "../";
require_once( $_BASE_PATH.'sys/config/safe_guard.php');

include $_BASE_PATH.'sys/config/db.inc.php';

foreach( $Const as $name => $val ){
	define( $name, $val );
}

function __autoload($class_name){
	$filename = "c:/xampp/htdocs/SweetMusic/sys/class/class.".$class_name.".inc.php";
	if( file_exists($filename) ){
		include_once( $filename );
	}
	
	else{
		$filename = str_replace("\\", "/", "lib/".$class_name . ".php");
		$filename =  "c:/xampp/htdocs/SweetMusic/public/dist/drpc/".$filename;
		if(file_exists( $filename )) {	
			require_once($filename);
		}
	}
}

spl_autoload_register("__autoload");

?>
