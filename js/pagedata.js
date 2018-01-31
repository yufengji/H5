
/***
	预约成功关闭
***/
$(".btnSure").click(function(event) {
	$(".boxAlert").hide();
});

/***
	全部游戏，热门排行，最新开服，新服预告 切换
	loadType表示当前页面四个中的那个切换类目下
	将当前的loadType传过去请求相应的数据
	0 => 全部游戏
	1 => 热门排行
	2 => 最新开服
	3 => 新服预告
***/

var loadType = 0;
var page = 1; 
$(".typeChoose>span").click(function(event) {
	var ix = $(this).index();
	loadType = ix;
	page = $(this).attr('data-page');
	$(this).addClass('on').siblings('span').removeClass('on');
	$(".typeContent>div").eq(ix).show().siblings('div').hide();
});

/***
	下拉加载数据
	判断滚动条是否在最底部
	是的话进行下拉加载
	将当前的loadType传过去请求相应的数据
	loadType => 当前在哪个切换下，即需要加载四类下的（全部游戏，热门排行，最新开服，新服预告）哪一类数据
	page => 当前页数
***/
$(window).on('scroll',scrollData);
function scrollData(event) {
	var scrollTop = $(this).scrollTop();
　　var scrollHeight = $(document).height();
　　var windowHeight = $(this).height();
　　if(scrollTop + windowHeight == scrollHeight){
　　　　//页面处于最底部，进行下拉加载操作
		dropLoad(loadType,page); 
　　}

}
function dropLoad(loadType,page){
	$.ajax({
		url: '/path/to/file',
		type: 'post',
		dataType: 'json',
		data: {'loadType':loadType,'page':page},
		beforeSend:function(){
			var p = '<p class="loading" style="text-align:center;font-size:0.32rem;color:#c7c7c7;padding-top:0.55rem;padding-bottom:0.533rem">努力加载中</p>';
			$(".loading").remove();
			$(".typeContent>div").eq(loadType).append(p);
			$(window).off('scroll', scrollData);
			
		},
		success:function(data){
			console.log(data);
			$(".loading").remove();
		},
		complete:function(){
			$(window).on('scroll', scrollData);
		}
	})
	
}

