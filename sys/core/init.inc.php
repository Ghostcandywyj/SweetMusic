<?php

if( !isset($_BASE_PATH) ) $_BASE_PATH = "../";
require_once( $_BASE_PATH.'sys/config/safe_guard.php');

include $_BASE_PATH.'sys/config/db.inc.php';

foreach( $Const as $name => $val ){
	define( $name, $val );
}

function __autoload($class_name){
	$filename = "c:/xampp/htdocs/IMSIS/IMSIS/sys/class/class.".$class_name.".inc.php";
	if( file_exists($filename) ){
		include_once( $filename );
	}
}

spl_autoload_register("__autoload");

?>