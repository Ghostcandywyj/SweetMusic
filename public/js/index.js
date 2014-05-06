var usertype = 0;

var audio;
var status = 0;
var volume = 1;
var user = "";
var song = 0;

var userid = '';

var like_hate = 0;
var iderror = false;
var passwderror = false;
var confirmerror = false;

var d = new Date();
var vYear = d.getFullYear();
var vMon = d.getMonth() + 1;
var vDay = d.getDate();
var ho = d.getHours(); 
var mi = d.getMinutes(); 
var se = d.getSeconds();

var cent = 0;

function nowDate(){
	d = new Date();
	vYear = d.getFullYear();
	vMon = d.getMonth() + 1;
	vDay = d.getDate();
	ho = d.getHours(); 
	mi = d.getMinutes(); 
	se = d.getSeconds();
}

var tags = 0;
$(document).ready(function(){
	//$('#player').attr('autoplay','true');
	//$('#player').attr('autobuffer','true');
	audio = document.createElement("audio");
	audio.addEventListener("canplaythrough",
	function() {
		//alert("7");
		audio.play();
		$("#msgshow").text("播放："+$('#title1').text());
		topmsgtoggle();
	},
	false);
	set_volume(volume);
	
	
	musicporgress();
	document.onkeydown = function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if((e && e.keyCode == 32) || (e && e.keyCode == 179)){
			play_pause();
		}
		else if(e && e.keyCode == 176){
			nextt();
		}
	}
	
	$('#tags').keydown(function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		var val = $('#tags').val();
		
		if((e && e.keyCode == 13) && val != ""){
			if(val.length > 20 || val.length == 0 || tags >= 3){
				$('#tags').val('');
				return;
			}
			$('#tags').val("");
			$('#newtags').append("<span>"+val+"</span>");
			tags++;
		}
	});
});
function cleartags(){
	$('#newtags').html('');
}
function addtags(){
	var val = $('#tags').val();
	if(val.length > 20 || val.length == 0 || tags >= 3){
		$('#tags').val('');
		return;
	}
	$('#tags').val("");
	$('#newtags').append("<span>"+val+"</span>");
	tags++;
}
function musicporgress(){
	if(audio.ended){
		cent = 1;
		recommendation();
	}
	var barlen = $('.progress-line').css('width').split('p')[0];
	var musiclen = audio.duration;
	var currentlen = audio.currentTime;
	var len = ((barlen-10)*currentlen/musiclen)+6;
	$('#progress-inline').css("width",len+'px');
	var i = parseInt(currentlen/60);
	var j = parseInt(currentlen%60);
	$('#time_left').text( i +':'+ (j<10?'0'+j:j));
	i = parseInt((musiclen-currentlen)/60);
	j = parseInt((musiclen-currentlen)%60);
	$('#time_right').text('-'+ i +':'+ (j<10?'0'+j:j));
	setTimeout("musicporgress()",1000);
	
	cent = currentlen/musiclen;
	if(cent > 0.5 && flagrecommend == true){
		flagrecommend = false;
		if(song != 0){
			$.ajax({
				type:'POST',
				url:'./handle/next.php',
				data:{
					operation:'NEXT',
					cent:cent,
					time:[vYear,vMon,vDay,ho,mi,se],
					songid:song
				},
				//dataType:'json',
				success:function(data){
					//alert(data);
					if(data == 1){
						if(userType == 1)
							getRecommendation();
						else if(userType == 1)
							getVRecommendation();			
					}
				}
			});
		}
	}
	
}
var nexttemp = 0;
function nextt(){
	var musiclen = audio.duration;
	var currentlen = audio.currentTime;
	cent = currentlen / musiclen;
	recommendation();
}

var recommendindex = 0;
var recommendlist;
var flagrecommend = true;
function getRecommendation(){//获取推荐歌曲列表-[1,2,3,4,5,6,7,8,9,10]
	recommendindex = 0;
	$.ajax({
		type:'POST',
		url:'./handle/next.php',
		data:{
			operation:'RECOMMENDATION'
		},
		dataType:'json',
		success:function(data){
			//alert(data);
			recommendlist = data.list.split(',');
			if(status == 0){
				recommendation();
			}
		}
	});
}
function getVRecommendation(){//获取推荐歌曲列表-[1,2,3,4,5,6,7,8,9,10]
	recommendindex = 0;
	$.ajax({
		type:'POST',
		url:'./handle/next.php',
		data:{
			operation:'VRECOMMENDATION'
		},
		dataType:'json',
		success:function(data){
			//alert(data);
			recommendlist = data.list.split(',');
			if(status == 0){
				recommendation();
			}
		}
	});
}
function recommendation(){//使用推荐列表中的歌曲进行推荐
	if(nexttemp == 1){
		return;
	}
	if(recommendindex > 9){
		status = 0;
		if(usertype == 1)
			getRecommendation();
		else if(usertype == 2)
			getVRecommendation();
		return;
	}
	nexttemp = 1;
	like_hate = 0;
	nowDate();
	
	$.ajax({
		type:'POST',
		url:'./handle/next.php',
		data:{
			operation:'GETMUSICINFO',
			songid:recommendlist[recommendindex]
		},
		dataType:'json',
		success:function(data){
			audio.pause();
			var info = data.douban;

			audio.src = './music/musicv2/'+data.src;
			audio.load();
			
			
			song = data.songid;
			var singer = '';
			for(var i=0;i<info.attrs.singer.length;i++)
				singer += info.attrs.singer[i] + ' ';
			$('#title1').text(info.title+'-'+singer);
			$('#tagid').text(info.title+'-'+singer);
			$('#title2').text(info.attrs.pubdate[0]);
			$('#title3').text(info.rating.average);
			$('#title4').text(info.attrs.publisher);
			$('#music_img').attr("src",info.image);
			status = 1;
			$('#pp_button').css('background-image','url(./img/pause.png)');
			$('#progress-inline').css('width','6px');
			
			flagrecommend = true;
			recommendindex++;
		}
	});
	nexttemp = 0;
}

function next(){
	if(nexttemp == 1){
		return;
	}
	
	nexttemp = 1;
	like_hate = 0;
	nowDate();
	
	$.ajax({
		type:'POST',
		url:'./handle/nextv2.php',
		data:{
			operation:'NEXTMUSIC',
		},
		dataType:'json',
		success:function(data){
			//alert(data.list);
			if(song != 0){
				$.ajax({
					type:'POST',
					url:'./handle/next.php',
					data:{
						operation:'NEXT',
						cent:cent,
						time:[vYear,vMon,vDay,ho,mi,se],
						songid:song
					},
					//dataType:'json',
					success:function(data2){
						if(data2 == 1){
							
						}
					}
				});
			}
			audio.pause();
			var info = data.douban;

			audio.src = './music/musicv2/'+data.src;
			audio.load();
			
			song = data.songid;
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
	nexttemp = 0;
}

function play_pause(){
	if(status == 1){
		audio.pause();
		status = 2;
		$('#pp_button').css('background-image','url(./img/play.png)');
	}
	else if(status == 2){
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
	$('#sound_length').css("width",(6+current_volume)+'px');
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
var visitorlist;
var visitorindex = 0;
function playmode(no){
	if(status == 0){
		if(no == 0){//游客登录
			$.ajax({
				type:'POST',
				url:'./handle/user.php',
				data:{
					operation:'VISITORSTART'
				},
				success:function(data){
					if(data == 1){
						window.location="./index.php";
					}
					else
						alert(data);
				}
			});
		}
		else if(no == 1){//普通用户登录
			$('#recommendbox').hide();
			getRecommendation();
			toggleup();
		}
		else if(no == 2){//游客选择歌曲
			$.ajax({
				type:"POST",
				url:"./handle/next.php",
				data:{
					operation:"COLDSTART"
				},
				dataType:"json",
				success:function(data){
					visitorlist = data.list.split(',');
					showVisitor(0);
				}
			});
		}
	}
	else if(status == 2){
		play_pause();
		toggleup();
	}
	else{
		toggleup();
	}
	
}
var dbinfo;
var dbid;
var showtemp = 0;
function showVisitor(no){
	if(showtemp == 1){
		return;
	}
	showtemp = 1;
	
	if(no == 1){
		if(visitorindex == 0)
			visitorindex = visitorlist.length - 1;
		else
			visitorindex--;
	}
	else if(no == 2){
		if(visitorindex == (visitorlist.length - 1))
			visitorindex = 0;
		else
			visitorindex++;
	}
	$.ajax({
		type:'POST',
		url:'./handle/next.php',
		data:{
			operation:'GETMUSICINFO',
			songid:visitorlist[visitorindex]
		},
		dataType:'json',
		success:function(data){
			dbinfo = data.douban;
			dbid = data.songid;
			//alert(dbid);
			$('.recommendbox').animate({opacity:'0'},300);
			setTimeout("showinfo()",300);
		}
	});
	showtemp = 0;
}
function showinfo(){
	$('.musicbox').css('background','url('+dbinfo.image+')');
	$('.musictitle').text(dbinfo.title);
	setTimeout("$('.recommendbox').animate({opacity:'1'},300);",100);
}
function playthis(){
	audio.pause();
	var info = dbinfo;

	audio.src = './music/musicv2/'+dbid+'.mp3';
	audio.load();
	
	song = dbid;
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
	toggleup();
	getVRecommendation();
}

function triT(){
	$('#login-panel').animate({top:'0px'},500);
	$('.triT').animate({top:'-25px'},500);
}
function toggleup(){
	$('#login-panel').animate({top:"-600px"},500);
	$('.triT').animate({top:'0px'},500);
}
function gotoR(){
	$('#login').animate({opacity:0},500);
	setTimeout("$('#login').hide();$('#register').show();$('#register').animate({opacity:1},500)",500);
}
function backlogin(){
	$('#register').animate({opacity:0},500);
	setTimeout("$('#register').hide();$('#login').show();$('#login').animate({opacity:1},500)",500);
}

function login(){
	var id = $('#loginid').val();
	var passwd = $('#loginpasswd').val();
	$.ajax({
		type:'POST',
		url:'./handle/user.php',
		data:{
			operation:'USERLOGIN',
			uid:id,
			passwd:passwd
		},
		dataType:'json',
		success:function(data){
			if(data.msg == 1){
				window.location="index.php";
			}
			else{
				$('#loginerror').text(data.err);
			}
		}
	});
}
function register(){
	if(!iderror && !passwderror && !confirmerror){
		var id = $('#Rid').val();
		var passwd = $('#Rpasswd').val();
		$.ajax({
			type:'POST',
			url:'./handle/user.php',
			data:{
				operation:'REGISTERUSER',
				uid:id,
				passwd:passwd
			},
			dataType:'json',
			success:function(data){
				//alert(data);
				if(data.msg == 1){
					$.ajax({
						type:'POST',
						url:'./handle/user.php',
						data:{
							operation:'USERLOGIN',
							uid:id,
							passwd:passwd
						},
						dataType:'json',
						success:function(data){
							if(data.msg == 1){
								window.location="index.php";
							}
							else{
								$('#loginerror').text('登陆失败，请重新登陆');
							}
						}
					});
				}
				else{
					$('#registererror').text(data.err);
				}
			}
		});
	}
}
var like_hate_temp = 0;
function like(){
	if(like_hate == 1){
		return;
	}
	like_hate = 1;
	if(like_hate_temp == 1){
		return;
	}
	like_hate_temp = 1;
	nowDate();
	$.ajax({
		type:'POST',
		url:'./handle/next.php',
		data:{
			operation:'LIKETHIS',
			songid:song,
			time:[vYear,vMon,vDay,ho,mi,se]
		},
		dataType:'json',
		success:function(data){
			//alert(data);
			if(data.msg == 1){
				$('#msgshow').text('喜欢：'+$('#title1').text());
				topmsgtoggle();
			}
			else if(data.msg == -1){
				$('#msgshow').text(data.err);
				topmsgtoggle();
			}
		}
	});
	like_hate_temp = 0;
}
function hate(){
	if(like_hate == 2){
		return;
	}
	if(like_hate_temp == 1)
		return;
	like_hate_temp = 1;
	like_hate = 2;
	nowDate();
	$.ajax({
		type:'POST',
		url:'./handle/next.php',
		data:{
			operation:'HATETHIS',
			songid:song,
			time:[vYear,vMon,vDay,ho,mi,se]
		},
		dataType:'json',
		success:function(data){
			//alert(data);
			if(data.msg == 1){
				$('#msgshow').text('不喜欢：'+$('#title1').text());
				topmsgtoggle();
			}
			else if(data.msg == -1){
				$('#msgshow').text(data.err);
				topmsgtoggle();
			}
		}
	});
	like_hate_temp = 0;
}
function getuserinfo(){
	$('#user-id').text(userid);
}
function userinfo(no){
	getuserinfo();
	if(no == 1){
		$('#login').animate({opacity:0},500);
		setTimeout("$('#login').hide();$('#user').show();$('#user').animate({opacity:1},500)",500);
	}
	else if(no == 2){
		$('#register').animate({opacity:0},500);
		setTimeout("$('#register').hide();$('#user').show();$('#user').animate({opacity:1},500)",500);
	}
}
var toptemp = 0;
function topmsgtoggle(){
	if(toptemp == 1)
		return;
	toptemp = 1;
	$('#topmsg').animate({height:'25px'},500);
	setTimeout("$('#topmsg').animate({height:'0px'},500);",2500);
	setTimeout("toptemp = 0",3000);
}
