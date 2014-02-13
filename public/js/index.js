
var status = 0;
$(document).ready(function(){
	$('#player').attr('autoplay','true');
	//$('#player').attr('autobuffer','true');
	next();

});

function musicporgress(){
	if(document.getElementById('player').ended){
		next();
		return;
	}
	var barlen = $('.progress-line').css('width').split('p')[0];
	var musiclen = document.getElementById('player').duration;
	var currentlen = document.getElementById('player').currentTime;
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
			document.getElementById('player').src='../music/music/'+data.src;
			var info = data.douban;
			
			var singer = '';
			for(var i=0;i<info.attrs.singer.length;i++)
				singer += info.attrs.singer[i] + ' ';
			$('#title1').text(info.title+'-'+singer);
			$('#title2').text(info.attrs.pubdate[0]);
			$('#title3').text(info.rating.average);
			$('#title4').text(info.attrs.publisher);
			$('#music_img').attr("src",info.image);
			status = 1;
			$('#progress-inline').css('width','6px');
			musicporgress();
		}
	});
}

function play_pause(){
	if(status == 1){
		document.getElementById('player').pause();
		status = 0;
		$('#pp_button').css('background-image','url(./img/play.png)');
	}
	else{
		document.getElementById('player').play();
		status = 1;
		$('#pp_button').css('background-image','url(./img/pause.png)');
	}
}