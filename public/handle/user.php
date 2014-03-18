<?php	
	$_BASE_PATH="../../";
	include_once '../../sys/core/init.inc.php';
	$operation=$_POST["operation"];

	if($operation == "USERLOGIN"){
		$returnJSON = '
				{
					"msg":%d,
					"err":"%s"
				}
			';
		$uid = $_POST["uid"];
		$passwd = $_POST["passwd"];
		$user = new User();
		$result = $user->login($uid,$passwd);
		$error = "";
		if($result == 0)
			$error = "用户名不存在或密码错误";
		$return = sprintf($returnJSON,$result,$error);
		echo $return;
	}
	
	else if($operation == 'REGISTERUSER'){
		$returnJSON = '
				{
					"msg":%d,
					"err":"%s"
				}
			';
		$uid = $_POST["uid"];
		$passwd = $_POST["passwd"];
		$user = new User();
		$result = $user->register($uid,$passwd);
		$error = "";
		if($result == 0)
			$error = "用户名已存在";
		$return = sprintf($returnJSON,$result,$error);
		echo $return;
	}
	
	else if($operation == "VISITORSTART"){
		$visitorid = rand(100000000,999999999);
		$_SESSION['VISITORID'] = "#".$visitorid;
		echo 1;
	}
?>
