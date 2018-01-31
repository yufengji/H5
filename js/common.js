$(function () {
    //顶部互动菜单
    (function () {
        $('.guide-icon-nav').click(function () {

            $('.header-aside').removeClass("on");
            var iDocuH = $(document).height();
            var bodyH = $(window).height();
            $('.mmaskbox2').height(iDocuH);
            if ($('.mmask .leftmeun').hasClass('show')) {
                $("body").css({
                    height: '100%',
                    overflow: 'auto'
                });
                $('.header-aside').removeClass("on");
                $('.mmask .leftmeun').removeClass('show');
            } else {
                $('.show-tan').find('.close').click();

                $("body").css({
                    height: bodyH + 'px',
                    overflow: 'hidden'
                });
                $('.header-aside').addClass("on");
                $('.mmask .leftmeun').addClass('show');
            }
            $('.mmaskbox2').toggle();
        });
    })();

    $('.mmaskbox2,.toplogin,.bindIcon,.side-nav').bind('click',
        function () {
            var showTan = $('.show-tan');
            if (showTan.length == 0 || showTan.css('display') == 'none') {
                $('.mmaskbox2').hide();
            }//sb
            $('.header-aside').removeClass("on");
            $('.mmask .leftmeun').removeClass('show');
            $("body").css({
                height: '100%',
                overflow: 'auto'
            });
        }
    );
    
   


    (function () {
        /***
         进度条
         ***/
        for (var i = 0; i < $(".pSchedule").length; i++) {
            var $ele = $(".pSchedule").eq(i);
            var percent = $ele.attr('data-schedule');
            if (percent <= 2) {
                $ele.find('span').addClass('end');
            }
            if (percent == 0) {
                $ele.find('span').remove();
                $ele.css({'background': '#e0e0e0', 'border': '1px solid #999999'});
                $ele.next('p').css({'color': '#999999'})
            }
            $ele.find('span').css('width', $ele.width() * ((percent) / 100) + 'px');

        }
    })()
    /***
     返回顶部
     ***/
    $(document).on('scroll', function (event) {

        var _dis = $(this).scrollTop();
        var _wH = $(window).height();

        if (_dis > 900) {
            $(".slideTop").show();

        } else {
            $(".slideTop").hide();
        }
    });
    $(".slideTop").on("click", function () {
        $('body,html').animate({scrollTop: 0}, 300);
        return false;
    });

    //一屏展示
    var _oneH = $(window).height();
    var _tH = $('.flexBar').height();
    var _fH = parseInt($(".footer").css('paddingTop')) + parseInt($(".footer").css('paddingBottom')) + parseInt($(".footer").height());
    var _cH = $(".typeChoose").height() + parseInt($(".typeChoose").css('paddingTop'));
    var _nH = $(".nH").height() + parseInt($(".nH").css('marginTop'))
    $(".myPlay,.myGift,.myReserve").css('minHeight', _oneH - _fH - _tH + 'px');
    $(".typeContent,newsCommon").css('minHeight', _oneH - _fH - _tH - _cH - 10 + 'px');
    $(".triggerCon").css('minHeight', _oneH - _fH - _nH - 75 + 'px');


});

//初始化art-template模版
function initArtTpl() {
    //替换界定符，防止smarty冲突
    var rule = template.defaults.rules[1];
    rule.test = new RegExp(rule.test.source.replace('{{', '<\\\?').replace('}}', '\\\?>'));

    /*注册模版过滤器*/

    //时间戳转换
    template.defaults.imports.datetime = function (value, format) {

        var time = new Date(value * 1000);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();

        var result = format.replace('Y', year);
        result = result.replace('m', month);
        result = result.replace('d', date);
        result = result.replace('H', hour);
        result = result.replace('i', minute);
        result = result.replace('s', second);
        return result;

    };

    //超过len隐藏，第len个字符显示'...'
    template.defaults.imports.maxLen = function (value, len) {


        var l = value.length;
        if (l>=len){
            return value = subHtml(value,len-1, false)+'...';
            //return value.substring(0, len - 1)+'...';
        }
        return value;

    };

    //剩余时间，时间戳转时分秒
    template.defaults.imports.leftTime = function (value) {
        var theTime = parseInt(value);// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        var theTime3 = 0;// 天
        var theTime4 = 0;//年
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);

                if (theTime2 > 24) {
                    theTime3 = parseInt(theTime2 / 24);
                    theTime2 = parseInt(theTime2 % 24);

                    if (theTime3 > 365) {
                        theTime4 = parseInt(theTime3 / 365);
                        theTime3 = parseInt(theTime3 % 365);
                    }

                }

            }
        }
        var result = '';
        if (theTime1 == 0) {
            result = "" + parseInt(theTime) + "秒";
        }
        if (theTime1 > 0) {
            result = "" + parseInt(theTime1) + "分钟";
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + "小时";
        }

        if (theTime3 > 0) {
            result = "" + parseInt(theTime3) + "天";
        }

        if (theTime4 > 0) {
            result = "" + parseInt(theTime4) + "年";
        }

        return result;
    };

    //简单URL生成
    template.defaults.imports.url = function (value, args) {
        return "http://"+ window.location.host + args;
    };

    //人数计算
    template.defaults.imports.formatNum = function (value) {
        if (value > 9999) {
            value = Math.round(value / 10000 * 100) / 100 + "万";
        }
        //  else if (value > 999) {
        //     value = Math.round(value / 1000 * 100) / 100 + "千";
        // } else if (value > 99) {
        //     value = Math.round(value / 100 * 100) / 100 + "百";
        // }
        return value;
    };
}

$(window).on('scroll', scrollData);
var scrollCallBack = null;
function scrollData(event) {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    if (scrollTop + windowHeight == scrollHeight) {
        //页面处于最底部，进行下拉加载操作
        if (scrollCallBack != null) {
            scrollCallBack();
        }
    }
}
function refreshProgress() {
    for (var i = 0; i < $(".pSchedule").length; i++) {
        var $ele = $(".pSchedule").eq(i);

        if ($ele.find('span').length == 0) {
            continue;
        }

        var percent = $ele.attr('data-schedule');
        if (percent <= 2) {
            $ele.find('span').addClass('end');
        }
        if (percent == 0) {
            $ele.find('span').remove();
            $ele.css({'background': '#e0e0e0', 'border': '1px solid #999999'});
            $ele.next('p').css({'color': '#999999'})
        }
        $ele.find('span').css('width', $ele.width() * ((percent) / 100) + 'px');

    }
}

/**
 * mohyz 自己用,依赖jquery，art-tpl，服务端接口标准
 * 模版参数名record
 * @constructor
 * @param option
 * @param option.url
 * @param option.tplElem //不用jq选择器id
 * @param option.containerElem
 * @param option.startPage
 * @param option.beforeLoadingCallBack
 * @param option.renderEndCallBack
 * @param option.endLoadingCallBack
 * @param option.noMoreDataCallBack
 * @param option.tplVar //其他模版参数
 * @param option.noDataCallBack
 */
function SimplePaginate(option) {

    this.pageInfo = null;
    this.option = option;
    this.curPage = 1;
    this.initLoad = true;
    //加载第一页
    this.init = function () {

        if (option.startPage) {
            this.curPage = option.startPage;
        }
        if (!this.option.tplVar) {
            this.option.tplVar = {};
        }

        this._requestPageInfo(this.option.url, this.curPage);

    };

    /**
     * 模版渲染
     * @private
     */
    this._render = function () {

        this.option.tplVar.record = this.pageInfo.data;
        var content = template(this.option.tplElem, this.option.tplVar);

        $(option.containerElem).append(content);
        this._callback("renderEndCallBack");
    };

    /**
     * 下一页
     */
    this.nextPage = function () {
        if (this.pageInfo.next_page_url) {
            this._requestPageInfo(this.pageInfo.next_page_url);
            this._render();
        }
    };

    /**
     * 上一页
     */
    this.prePage = function () {
        if (this.pageInfo.pre_page_url) {
            this._requestPageInfo(this.pageInfo.pre_page_url);
            this._render();
        }
    };

    /**
     * 请求分页信息
     * @param url
     * @param page
     * @private
     */
    this._requestPageInfo = function (url, page) {
        var _this = this;
        var reqData = {};

        if (page) {
            reqData = {page: page};
        }

        this._callback('beforeLoadingCallBack');

        $.getJSON(option.url, reqData, function (res) {
            _this.pageInfo = res;

            _this._callback('endLoadingCallBack');

            if (_this.initLoad) {
                if (_this.pageInfo.total) {
                    _this._render();
                }
            }
            if (!_this.pageInfo.next_page_url) {
                if (_this.initLoad && !_this.pageInfo.total) {
                    _this._callback('noDataCallBack');
                } else {
                    _this._callback('noMoreDataCallBack');
                }
            }
            _this.initLoad = false;
        });
    };

    /**
     * @param name
     * @private
     */
    this._callback = function (name) {
        if (this.option[name]) {
            this.option[name]();
        }
    }
}