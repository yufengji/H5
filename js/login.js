// JavaScript Document

function CommandJs () {
	this.init();
}
CommandJs.prototype = {
	init : function  () {
		this.winW = document.documentElement.clientWidth;
		this.winH = document.documentElement.clientHeight;
		this.url = typeof(baseurl) != "undefined" ? baseurl : '';
		this.audioCtr = true,
		this.count = 0,
		this.bgNum=0,
		this.device = (/Android|webOS|iPad|playbook|iPhone|iPod|BlackBerry/i.test(navigator.userAgent));
		this.canclick=true,
		this.nowPic=0;
		this.iFocus();
		this.prolScroll();
		this.regScroll();
		this.regScroll2();
	},
	regScroll : function(){
			if($("#regScroll").length)
			{				
				var regScrolls;
				regScrolls = new IScroll('#regScroll',{vScrollbar:true});	
			}
		},
	regScroll2 : function(){
			if($("#regScroll2").length)
			{				
				var regScrolls2;
				regScrolls2 = new IScroll('#regScroll2',{vScrollbar:true});	
			}
		},
	prolScroll : function(){
			if($("#prolScroll").length)
			{				
				var prolScrolls;
				prolScrolls = new IScroll('#prolScroll',{vScrollbar:true});			
			}
		},
	iFocus : function(){

		var _self=this;


		$("input.i").focus(function(){
			$(this).parent().addClass("pOn");
		}).blur(function(){
			$(this).parent().removeClass("pOn");
		});

		$(".safeDiv p a").tap(function(){
			if($(this).parent().hasClass("pOn"))
			{
				$(this).parent().removeClass("pOn");
				$(".drapDiv").hide();
			}
			else{
				$(this).parent().addClass("pOn");
				$(".drapDiv").show();
			}
		});

		$(".bandDiv dt a").tap(function(){
			if($(this).hasClass("aOn"))
			{
				$(this).removeClass("aOn");
			}
			else
			{
				$(this).addClass("aOn");
			}
		});

		$(".head h4 a").tap(function(){
			$("#alpha").css({"zIndex":99}).animate({"opacity":1});
			$(".tan").addClass("tAct");
		});

		$("a.btn2").tap(function(){
			$("#alpha").animate({"opacity":0},function(){$(this).css({"zIndex":-1})});
			$(".tan").removeClass("tAct");
		});

		//注册
		$(".regTab a").on('click',function(){
			var idx=$(this).index();
			if($(this).hasClass("aOn"))
			{
				return false;	
			}
			else
			{
				$(this).addClass("aOn").siblings().removeClass("aOn");
				if(idx==1)
				{
					$(".regBox").addClass("regAct");
					if(_self.canclick)
					{
						$(".regDiv").css({"-webkit-transition":"all 0.8s ease-out"});
						_self.regScroll();
						_self.regScroll2();
						_self.canclick=false;
					}
				}
				else
				{
					$(".regBox").removeClass("regAct")
				}	
			}
			return false;
		});

		$("a.aX").tap(function(){
			$(".protocol").addClass("proAct");

		});

		$("a.proClose").tap(function(){
			$(".protocol").removeClass("proAct");
		});

		$("a.aFor").tap(function(){
			$(".forget").addClass("forAct");
		});

		$(".getDiv .pA a").tap(function(){
			$(".forget").removeClass("forAct");
		});
		
	}


}

$(function(){
	
	new CommandJs();

})

//判断页面加载
	 document.onreadystatechange = subSomething;//当页面加载状态改变的时候执行这个方法.
	 function subSomething() {
	  if(document.readyState=="complete"){	 
	  }
	 }

