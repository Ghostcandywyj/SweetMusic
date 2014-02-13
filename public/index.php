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
</head>
<body>
	<div style="display:none">
		<audio controls="controls" src="" id="player">
		</audio>
	</div>
	
	
	<div class="Sweet_button">
		<div class="Sweet_pp">
			<div class="Sweet_pp_x" id="pp_button" onclick="play_pause()"></div>
		</div>
		<div class="Sweet_next" onclick="next()"></div>
		<div class="Sweet_love"></div>
		<div class="Sweet_trash"></div>
		<div class="progress-line">
			<div id="progress-inline"></div>
		</div>
		<div id="time_left">0:00</div>
		<div id="time_right">-0:00</div>
		<img id="music_img" />
		<div class="music_info">	
			<div class="music_title"><span id="title1"></span></div>
			<div class="music_title">发行日期：<span id="title2"></span></div>
			<div class="music_title">评分：<span id="title3"></span></div>
			<div class="music_title">出版商：<span id="title4"></span></div>
		</div>
	</div>

	<div class="footer">
		<span>Copyright©2014 王瑶菁 @Ghost妖精_甜甜的音乐SweetMusic All Right Reserved.</span>
	</div>
	
</body>
</html>