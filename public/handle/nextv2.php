<?php	
	$_BASE_PATH="../../";
	include_once '../../sys/core/init.inc.php';
	$operation=$_POST["operation"];
	include '../dist/drpc/DRPC.php';
	
	if($operation == 'NEXTMUSIC'){
		$str = '
				{
					"src":"%s.mp3",
					"douban":%s,
					"songid":%s,
					"list":"%s"
				}
			';
		$music = new Music();
		$uid = $_SESSION['USERID'];
		$list = $music->getlist($uid);
		
		$drpc = new DRPC("114.212.87.171",3772,NULL);
		$result = $drpc->execute("exclamation",$list);
		
		/*origin*/
		$num = 0;
		while(!file_exists('../music/infov2/' . $num . '.txt')){
			$num = rand(1,2193);
		}
		$file_handle = fopen("../music/infov2/".$num.".txt", "r");
		$line = fgets($file_handle);
		fclose($file_handle);
		$return = sprintf($str,$num,$line,$num,$result);
		
		echo $return;
	}
?>
