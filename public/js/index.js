var audio;
var status = 0;
var volume = 1;
$(document).ready(function(){
	$('#player').attr('autoplay','true');
	//$('#player').attr('autobuffer','true');
	audio = document.createElement("audio");
	audio.addEventListener("canplaythrough",
	function() {
		//alert("7");
		audio.play();
	},
	false);
	set_volume(volume);
	
	next();
	musicporgress();
	document.onkeydown = function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if((e && e.keyCode == 32) || (e && e.keyCode == 179)){
			play_pause();
		}
		else if(e && e.keyCode == 176){
			next();
		}
	}
});

function musicporgress(){
	if(audio.ended){
		next();
	}
	var barlen = $('.progress-line').css('width').split('p')[0];
	var musiclen = audio.duration;
	var currentlen = audio.currentTime;
	var len = ((barlen-10)*currentlen/musiclen)+6;
	$('#progress-inline').animate({width:len+'px'});
	var i = parseInt(currentlen/60);
	var j = parseInt(currentlen%60);
	$('#time_left').text( i +':'+ (j<10?'0'+j:j));
	i = parseInt((musiclen-currentlen)/60);
	j = parseInt((musiclen-currentlen)%60);
	$('#time_right').text('-'+ i +':'+ (j<10?'0'+j:j));
	setTimeout("musicporgress()",1000);
}

function next(){

	var d = new Date();
	var vYear = d.getFullYear();
	var vMon = d.getMonth() + 1;
	var vDay = d.getDate();
	var h = d.getHours(); 
	var m = d.getMinutes(); 
	var se = d.getSeconds();
	
	$.ajax({
		type:'POST',
		url:'./handle/next.php',
		data:{
			operation:'NEXTMUSIC',
			time:[vYear,vMon,vDay,h,m,se]
		},
		success:function(str){
			//alert(str);
			var data = $.parseJSON(str);
			audio.pause();
			var info = data.douban;
			//audio.src = info.music_url;
			audio.src = '../music/musicv2/'+data.src;
			//audio.src = 'http://mr3.douban.com/201402201817/35e69d396695db6f15c4538cf7a26036/view/song/small/p583476.mp3';
			audio.load();
			//window.open(audio.src);
			//alert(info.music_url);
			var singer = '';
			for(var i=0;i<info.attrs.singer.length;i++)
				singer += info.attrs.singer[i] + ' ';
			$('#title1').text(info.title+'-'+singer);
			$('#title2').text(info.attrs.pubdate[0]);
			$('#title3').text(info.rating.average);
			$('#title4').text(info.attrs.publisher);
			$('#music_img').attr("src",info.image);
			status = 1;
			$('#pp_button').css('background-image','url(./img/pause.png)');
			$('#progress-inline').css('width','6px');
			
			//alert("networkstate:"+audio.networkState+" "+audio.error);
		}
	});
}

function play_pause(){
	if(status == 1){
		audio.pause();
		status = 0;
		$('#pp_button').css('background-image','url(./img/play.png)');
	}
	else{
		audio.play();
		status = 1;
		$('#pp_button').css('background-image','url(./img/pause.png)');
	}
}
function set_volume(no){
	if(no < 0) no = 0;
	if(no > 1) no = 1;
	audio.volume = no;
	volume = no;
	var max = 140;
	var current_volume = max * no;
	$('#sound_ico').attr('src','./img/sound24.png');
	$('#sound_length').animate({width:(6+current_volume)+'px'});
}
function volume_0_1(){
	if(volume > 0){
		var temp = volume;
		set_volume(0);
		volume = -temp;
		$('#sound_ico').attr('src','./img/sound24-no.png');
	}
	else{
		volume = -volume;
		set_volume(volume);
		$('#sound_ico').attr('src','./img/sound24.png');
	}
}

function change_volume(t){
	var mouse_x = window.event.x;
	var div_x = t.offsetLeft;
	while(t.offsetParent){
		t = t.offsetParent;
		div_x += t.offsetLeft;
	}
	var offset = mouse_x - div_x;
	
	var max = 146;
	set_volume(offset/max);
}