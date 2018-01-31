/***
	顶部轮播
***/
var swiper = new Swiper('.topSlider .swiper-container',{
    loop:true,
        initialSlide :1,
        effect : 'coverflow',
        slidesPerView: 3,
        centeredSlides: true,
        autoplay : 2000,
        pagination : '.swiper-pagination',
        coverflow: {
                    rotate: 30,
                    stretch: 15,
                    depth: 60,
                    modifier: 2,
                    slideShadows : false
                }

});
var mySwiper = new Swiper('.rList .swiper-container',{
	slidesPerView : 'auto'

})
/***
	专题推荐轮播
***/
var mySwiper = new Swiper('.toPic .swiper-container',{
	slidesPerView : 'auto'
})

/***
	每日推荐下拉按钮
***/
var sFlag = true;
var _h = 0;
$(".showAll").tap(function(event) {
	
	if(sFlag){
		_h = $(".rMenu ul").height();
		sFlag = false;
		$(this).css({'transform':'rotate(180deg)','-webkit-transform':'rotate(180deg)'});
	}else{
		_h = _h/2;
		
		sFlag = true;
		$(this).css({'transform':'rotate(0deg)','-webkit-transform':'rotate(0deg)'});
	}
	$(".rMenu").css("height",_h+"px");
	return false;
});
/***
	每日推荐点击跳到对应模块
***/
$(".rMenu").on('tap', 'li', function(event) {
	var _topBarH = $(".flexBar").height();
	var _class = $(this).attr('data-offset-top');
	var _top = $("."+_class).offset().top;
	$('body,html').animate({scrollTop:(_top-_topBarH)+"px"},500);
	return false;
});

/***
	新服新游，新服预告切换
***/
$(".ngTop>span").on('tap',function(){
	var ix = $(this).index();
	$(this).addClass('on').siblings('span').removeClass('on');
	$(".ngContent>div").eq(ix).show().siblings('div').hide();
	return false;
})






  