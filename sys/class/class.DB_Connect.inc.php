<?php



class DB_Connect {
	protected $root_conn;

	protected function __construct(){
		$this->root_conn = mysql_pconnect(DB_HOST, DB_USER, DB_PASS) or trigger_error(mysql_error(),E_USER_ERROR); 
		mysql_select_db(DB_NAME, $this->root_conn);
		mysql_query("set names utf8");
	}

}

?>