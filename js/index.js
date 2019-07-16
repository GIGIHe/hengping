// 获取页面的宽度和高度
var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
var clientHeight = document.documentElement.clientHeight|| document.body.clientHeight;
// 横向移动的距离
var maxLeft=parseInt(clientWidth)-parseInt($('.wrap').width());
// 滚动条移动的距离
var maxTop=parseInt(clientHeight)-parseInt($('.bar').height());
var nowLeft=0;
var nowTop=0;
var nowIndex=0;
// 左边
var leftMove=function(speed){
   nowIndex++;
   $('.wrap_left').removeClass('active');
   nowLeft -=speed;
   // console.log(nowLeft)
   if(nowLeft<=maxLeft){
       nowLeft=maxLeft
       $('.wrap_right').addClass('active');
   }
   nowTop=maxTop*(nowLeft/maxLeft);
   if(nowTop>=maxTop){
       nowTop=maxTop
   }
   $('.bar').stop(true,true).animate( {top:nowTop},300 )
   $('.wrap').stop(true,true).animate( {left:nowLeft},300 )
}
// 右边
var rightMove=function(speed){
   $('.wrap_right').removeClass('active');
   nowLeft +=speed;
   if(nowLeft>=0){
      nowLeft=0
      $('.wrap_left').addClass('active');
   }
   nowTop=maxTop*(nowLeft/maxLeft);
   if(nowTop<=0){
      nowTop=0;
   }
   $('.bar').stop(true,true).animate( {top:nowTop},300 )
   $('.wrap').stop(true,true).animate( {left:nowLeft},300 )
}
// 插件的作用是判断鼠标的滚动的方向，调用相应的逻辑
$('html,body').mousewheel(function(event){
  // console.log(event)
        // 判断鼠标的滚动方向
        // 向上滚动屏幕左划
        if(event.deltaY<0){
          leftMove(80)
      }else if(event.deltaY>=0 && nowLeft<=0){
        // 向下滚动屏幕右划
            rightMove(80)
     }
})
// 移动端触摸事件
var myWrap=document.getElementById('myWrap');
EventUtil.listenTouchDirection(myWrap, true,function(){
     rightMove(300)
} ,function(){
     rightMove(300)
}, function(){
     leftMove(300)
},  function(){
     leftMove(300)
})
// pc端键盘事件
$(document).keydown(function (event) {
  switch (event.keyCode) {
  case 37:
  // 左键
      rightMove(80)
      break;
  case 39:
      leftMove(80)
      break;
  case 38:
      rightMove(80)
      break;
  case 40:
      leftMove(80)
      break;
  };
  return false;
});



var oScroll=$('.bar_wrap').get(0)
var scrollBar=$('.scrollBar').get(0)
var oScroll = document.getElementById('bar_wrap');
var scrollBar = document.getElementById('bar');

scrollBar.onmousedown = function(ev){
  var ev = ev || event;
  var disy = ev.clientY - scrollBar.offsetTop;
  // console.log(ev.clientY,scrollBar.offsetTop,disy)
  if(scrollBar.setCapture){
     scrollBar.setCapture();
  }
  document.onmousemove = function(ev){
    var ev = ev || event;
    var T = ev.clientY - disy;
     console.log(T,scrollBar.offsetTop)
    $('.wrap_right').removeClass('active');
    $('.wrap_left').removeClass('active');
    if(T<0){
      T = 0;
      $('.wrap_left').addClass('active');
    }else if(T>oScroll.clientHeight - scrollBar.offsetHeight){
      T = oScroll.clientHeight - scrollBar.offsetHeight;
      $('.wrap_right').addClass('active');
    }
    var iSco = T/(oScroll.clientHeight - scrollBar.offsetHeight);
    scrollBar.style.top = T+'px';
    nowLeft=maxLeft*(T/maxTop);
    $('.wrap').stop(true,true).animate( {left:nowLeft},300 )
  }
  document.onmouseup = function(){
    document.onmousemove = document.onmouseup = null;
    if(scrollBar.releaseCapture){
      scrollBar.releaseCapture();
    }
  }
  return false;
}

// 课表切换
;(function(){
  $('.s2_list').find('li').click(function(){
      $('.s2_list').find('li').removeClass('active').eq($(this).index()).addClass('active');
      $('.s2_wrap').find('.s2_tab').hide().eq($(this).index()).show();
  })
})()





