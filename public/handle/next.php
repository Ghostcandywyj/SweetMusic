<?php	
	$_BASE_PATH="../../";
	include_once '../../sys/core/init.inc.php';
	$operation=$_POST["operation"];
	
	
	if($operation == 'GETMUSICINFO'){//获取音乐信息
		$str = '
				{
					"src":"%s.mp3",
					"douban":%s,
					"songid":%s
				}
			';
		$num = $_POST['songid'];
		$file_handle = fopen("../../music/infov2/".$num.".txt", "r");
		$line = fgets($file_handle);
		fclose($file_handle);
		$return = sprintf($str,$num,$line,$num);
		
		echo $return;
	}
	else if($operation == 'RECOMMENDATION'){
		$str = '{
			"coldstart":%d,
			"list":"%s"
		}';
		
		$music = new Music();
		$uid = $_SESSION['USERID'];
		$list = $music->getlist($uid);
		
		$cold = 0;
		if($list == ""){
			$cold = 1;
		}
		$result = "";
		/*
		$drpc = new DRPC("114.212.87.171",3772,NULL);
		$result = $drpc->execute("sweetfm","0>1>2>3");
		*/
		for($i = 0;$i<10;$i++){
			if($result == "")
				$result = rand(1,2193);
			else
				$result = $result.",".rand(1,2193);
		}
		
		$return = sprintf($str,$cold,$result);
		echo $return;
	}
	else if($operation == 'VRECOMMENDATION'){
		$str = '{
			"list":"%s"
		}';
		
		$music = new Music();
		$uid = $_SESSION['VISITORID'];
		$list = $music->getlist($uid);
		
		$result = "";
		/*
		$drpc = new DRPC("114.212.87.171",3772,NULL);
		$result = $drpc->execute("sweetfm","0>1>2>3");
		*/
		for($i = 0;$i<10;$i++){
			if($result == "")
				$result = rand(1,2193);
			else
				$result = $result.",".rand(1,2193);
		}
		
		$return = sprintf($str,$result);
		echo $return;
	}
	else if($operation == 'NEXTMUSIC'){
		$str = '
				{
					"src":"%s.mp3",
					"douban":%s,
					"songid":%s
				}
			';
		
		$num = 0;
		while(!file_exists('../../music/musicv2/' . $num . '.mp3')){
			$num = rand(1,2193);
		}
		$file_handle = fopen("../../music/infov2/".$num.".txt", "r");
		$line = fgets($file_handle);
		fclose($file_handle);
		$return = sprintf($str,$num,$line,$num);
		echo $return;
	}
	
	else if($operation == 'LIKETHIS'){//喜欢
		$str = '
			{
				"msg":"%d",
				"err":"%s"
			}
		';
		if(!isset($_SESSION['USERID'])){
			$return = sprintf($str,-1,"请先登录");
			echo $return;
			return;
		}
		$songid = $_POST['songid'];
		$userid = $_SESSION['USERID'];
		$array = $_POST['time'];
		$time = $array[0].'-'
			.($array[1]<10?'0':'').$array[1].'-'
			.($array[2]<10?'0':'').$array[2].' '
			.($array[3]<10?'0':'').$array[3].':'
			.($array[4]<10?'0':'').$array[4].':'
			.($array[5]<10?'0':'').$array[5];
		$music = new Music();
		$result = $music->addRecord($userid,$songid,$time,"like");
		$return = sprintf($str,$result,"");
		echo $return;
	}
	else if($operation == 'HATETHIS'){//不喜欢
		$str = '
			{
				"msg":"%d",
				"err":"%s"
			}
		';
		if(!isset($_SESSION['USERID'])){
			$return = sprintf($str,-1,"请先登录");
			echo $return;
			return;
		}
		$songid = $_POST['songid'];
		$userid = $_SESSION['USERID'];
		$array = $_POST['time'];
		$time = $array[0].'-'
			.($array[1]<10?'0':'').$array[1].'-'
			.($array[2]<10?'0':'').$array[2].' '
			.($array[3]<10?'0':'').$array[3].':'
			.($array[4]<10?'0':'').$array[4].':'
			.($array[5]<10?'0':'').$array[5];
		$music = new Music();
		$result = $music->addRecord($userid,$songid,$time,"hate");
		$return = sprintf($str,$result,"");
		echo $return;
	}
	
	else if($operation == "NEXT"){//保存听过的上一首歌曲
		$uid = "";
		if(!isset($_SESSION['USERID'])){
			if(isset($_SESSION['VISITORID']))
				$uid = $_SESSION['VISITORID'];
			else {
				echo -1;
				return;
			}
		}
		else
			$uid = $_SESSION['USERID'];
		$cent = $_POST['cent'];
		$sid = $_POST['songid'];
		$type = $cent>0.5?"listen":"skip";
		$array = $_POST['time'];
		$time = $array[0].'-'
			.($array[1]<10?'0':'').$array[1].'-'
			.($array[2]<10?'0':'').$array[2].' '
			.($array[3]<10?'0':'').$array[3].':'
			.($array[4]<10?'0':'').$array[4].':'
			.($array[5]<10?'0':'').$array[5];
		$music = new Music();
		$result = $music->addRecord($uid,$sid,$time,$type);
		echo 1;
	}
	
	else if($operation == "COLDSTART"){
		$str = '
			{
				"list":"%s"
			}
		';
		/*
		$drpc = new DRPC("114.212.87.171",3772,NULL);
		$result = $drpc->execute("sweetfm","!");
		*/
		$result = "";
		for($i = 0;$i<10;$i++){
			if($result == "")
				$result = rand(1,2193);
			else
				$result = $result.",".rand(1,2193);
		}
		$return = sprintf($str,$result);
		echo $return;
	}

?>
