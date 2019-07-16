var disX =0,disY =0,inx = 0;
var c_width = document.documentElement.clientWidth|| document.body.clientWidth;
var c_height = document.documentElement.clientHeight|| document.body.clientHeight;
var marLeft = parseInt(c_width)-parseInt($(".cons").width())
var marTop = parseInt(c_height)-parseInt($(".bar").height())
var leaveLeft = function(speed){
	disX -=speed;
	if(disX <= marLeft){
		disX = marLeft
	}
	// disY = -inx *marTop;
	disY = marTop*(disX/marLeft)
	// disY +=3;
	if(disY >= c_height){
		disY = c_height
	}
	// console.log(disX)
	// console.log(disY)
	$(".cons").stop(true,true).animate({left:disX},300 )
	$(".bar").stop(true,true).animate({top:disY},300 )
}
var rightLeft = function(speed){
	disX +=speed;
	if(disX >=0){
		disX = 0
	}
	// disY = -inx *marTop;
	disY = marTop*(disX/marLeft)
	// disY +=3;
	if(disY <= 0){
		disY = 0
	}
	// console.log(disX)
	// console.log(disY)
	$(".cons").stop(true,true).animate({left:disX},300 )
	$(".bar").stop(true,true).animate({top:disY},300 )
}
$("html,body").mousewheel(function(event){
	if(event.deltaY < 0){
		leaveLeft(50)
	}else if (event.deltaY>=0) {
		rightLeft(50)
	}
})

//滚动条的拖拽实现滚动，滚吧，滚吧，滚吧，，，，
// var bar = $(".bar").get(0);
// bar.onmousedown = function(e){
// 	var dy = e.clientY;//鼠标按下时的纵坐标
// 	var dt = bar.offsetTop//鼠标滚动条的位置
// 	var ny, dd = 0,d =0;
// 	// console.log("点点点")
// 	document.onmousemove = function(e){
// 		 ny = e.clientY;
// 		  d = ny-dt
// 		  $(".bar").animate({top:d},300)
// 	}
// 	document.onmouseup = function(e){
// 		document.onmousemove = document.onmouseup = null;
// 	}

// 	// 阻止默认事件
// 	return false;
// }
var bar = $(".bar").get(0);
bar.onmousedown = function(event){
	var e = event || window.event
	var dy = e.clientY-bar.offsetTop//获取滚动条的距离底部的距离，获取鼠标在滚动条的位置
	document.onmousemove = function(event){
		var e = event || window.event
		var ny = e.clientY
		var t = ny-dy;//滚动条的位置
		// if(t ==c_height - bar.clientHeight){
		// 	t=c_height - bar.clientHeight
		// }
		if(t<=0){
			t=0
		}else if(t >= c_height -bar.offsetHeight){
			 t = c_height -bar.offsetHeight
		}
		var disX = marLeft*(t/marTop)
		$(".cons").stop(true,true).animate({left:disX},300 )
	    $(".bar").stop(true,true).animate({top:t},300 )
	    // console.log(t,c_height,marTop - bar.clientHeight)
	}
	document.onmouseup = function(event){
		 document.onmousemove = document.onmouseup = null;
	}
	return false
}
// 绑定键盘事件
document.onkeydown=function(event){
	var e = event || window.event
	switch(event.keyCode){
		 case 37:
  // 左键
      rightLeft(80)
      break;
  case 39:
      leaveLeft(80)
      break;
  case 38:
      rightLeft(80)
      break;
  case 40:
      leaveLeft(80)
      break;
  };
  return false;
}

// 移动端的触摸事件
var cons = $(".cons").get(0)
EventUtil.listenTouchDirection(cons,true,function(){
	leaveLeft()
},
function(){
	rightLeft()
},
function(){
	leaveLeft()
},function(){
	rightLeft()
})