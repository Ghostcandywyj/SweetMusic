<?php
	$user = 0;
	if(isset($_SESSION['USERID'])){
		$user = 1;
	}
	else if(isset($_SESSION['VISITORID'])){
		$user = 2;
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<meta http-equiv="content-type" content="text/html;charset=utf-8">
	<title>SweetMusic</title>
	
	<link rel="icon" href="./img/sweetmusic.ico" type="image/x-icon" /> 
	<link rel="shortcut icon" href="./img/sweetmusic.ico" type="image/x-icon" />
	
	<link rel="stylesheet" href="./dist/css/bootstrap.min.css" />
	<link rel="stylesheet" href="./css/index.css" />
	<script type="text/javascript" src="./js/jquery.js"></script>
	<script type="text/javascript" src="./dist/js/bootstrap.js"></script>
	<script type="text/javascript" src="./js/index.js"></script>

<?php if($user == 1) echo '
<script>
	$(document).ready(function(){
		userid = "'.$_SESSION["USERID"].'";
		getuserinfo();
		playmode(1);
		usertype = 1;
	});
</script>
'; 
else if($user == 2) echo'
<script>
	$(document).ready(function(){
		userid = "Visitor"+"'.$_SESSION["VISITORID"].'";
		getuserinfo();
		playmode(2);
		usertype = 2;
	});
</script>
';
?>


</head>
<body>
	<div class="topcover">
		<p class="triT">
			<?php if($user == 1) echo "您好 <a href='javascript:triT();'>".$_SESSION['USERID']."</a> <a href='./handle/logout.php'>退出</a>";
				else if($user == 2)
					echo "您好 Visitor<a href='javascript:triT();'>".$_SESSION['VISITORID']."</a> <a href='./handle/logout.php'>退出</a>";
				else
					echo '<a href="javascript:triT();">登录</a>';
			?>
		</p>
		<div id="topmsg">
			<p id="msgshow">test</p>
		</div>
	</div>
	<div id="login-panel">
		<div id="login" <?php if($user == 1 || $user == 2) echo 'style="display:none;opacity:0"'; ?> >
			<p><h3>登陆</h3></p>
			<p>用户名</p>
			<p><input type="text" id="loginid" /></p>
			<p>密码<a href="./forget.php">(忘记密码?)</a></p>
			<p><input type="password" id="loginpasswd" /></p>
			<p id="loginerror"></p>
			<p>
				<button class="loginbtn" onclick="login()">登录</button>
				<button class="loginbtn" onclick="gotoR()">注册</button>
			</p>
			<p><a href="javascript:playmode(0)">随便听听</a></p>
		</div>
		<div id="register" style="display:none">
			<p><h3>新用户注册</h3></p>
			<p>用户名</p>
			<p><input type="text" id="Rid"/></p>
			<p>密码</p>
			<p><input type="password" id="Rpasswd"/></p>
			<p>确认密码</p>
			<p><input type="password" id="Rconfirm"/></p>
			<p id="registererror"></p>
			<p>
				<button class="loginbtn glyphicon glyphicon-arrow-left" onclick="backlogin()"> </button>
				<button class="registerbtn" onclick="register()">注册并登录</button>
			</p>
		</div>
		<div id="user" <?php if($user == 0) echo 'style="display:none;opacity:0"'; ?> >
			<p><h3 id="user-id"></h3></p>
			<p><button class="loginbtn" onclick="window.location='./handle/logout.php'">登出</button></p>
			<div class="recommenditem" id="recommendbox">
				<div class="recommendbox">
					<div class="musicbox" onclick="playthis()"></div>
					<div class="musictitle"></div>	
				</div>
				<div class="musicleft" onclick="showVisitor(1)"></div>
				<div class="musicright" onclick="showVisitor(2)"></div>
			</div>
			<div class="musictags">
				<p>当前歌曲：<span id="tagid"></span></p>
				<p id="newtags">
				
				</p>
				<p><label><input type="text" id="tags" /><button class="btnright" onclick="addtags()">OK</button></label></p>
				
				<p><label class="addtags">
				<button class="btnleft" onclick="cleartags()">清除</button>
				<button class="btnright">我要打TAG</button>
				</label></p>
				<p id="oldtags">
				
				</p>
			</div>
			<p><a href="javascript:playmode(4)">继续收听</a></p>
		</div>
	</div>
	
	<div class="Sweet_button">
		<div class="Sweet_pp">
			<div class="Sweet_pp_x" id="pp_button" onclick="play_pause()"></div>
		</div>
		<div class="Sweet_next" onclick="recommendation()"></div>
		<div class="Sweet_love" onclick="like()"></div>
		<div class="Sweet_trash" onclick="hate()"></div>
		<div class="progress-line">
			<div id="progress-inline"></div>
		</div>
		<div id="time_left">0:00</div>
		<div id="time_right">-0:00</div>
		<div class="music_ico">
			<img id="music_img" height="80px"/>
			<div id="img_cover">
				<div class="music_sound">
					<img id="sound_ico" src="./img/sound24.png" width="24px" onclick="volume_0_1()"/>
					<div class="sound_under">
						<div id="sound_length"></div>
						<div class="length_cover" onclick="change_volume(this)"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="music_info">	
			<div class="music_title"><span id="title1"></span></div>
			<div class="music_title">发行日期：<span id="title2"></span></div>
			<div class="music_title">评分：<span id="title3"></span></div>
			<div class="music_title">出版商：<span id="title4"></span></div>
		</div>
	</div>

	<div class="footer">
		<span>Powered by 王瑶菁<br> @Ghost妖精_甜甜的音乐SweetMusic<br>All Rights Reserved.</span>
	</div>
	
</body>
</html>
