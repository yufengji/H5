function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
function myBrowser(){
    var userAgent = navigator.userAgent; 
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
     }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");  
        reIE.test(userAgent);  
        var fIEVersion = parseFloat(RegExp["$1"]);  
        if(fIEVersion == 10){ 
            return "IE";
        }
    }; //判断是否IE浏览器
    if(isIE11){
        return "IE";
    }
}
//设置cookie
var cookieUtil = {
    set:function(name,val,domain,path){
        var text = "";
        text += encodeURIComponent(name) + "=" + encodeURIComponent(val);
        
        if(domain){
            text += "; domain=" + domain;
        }
        if(path){
            text += "; path=" + path;
        }
        document.cookie = text;
    },
    get:function (name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = "";
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf (";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue; 
    }
}
var mb = myBrowser();

if(IsPC()){
    
    if ( mb != "FF" && mb != "Chrome" && mb != "Safari" && mb != "IE") {
       
        if(!cookieUtil.get('isAlert')){
            var _div = document.createElement('div');
            _div.id = 'pcTestTips';
            _div.style.fontSize = '14px';
            _div.style.width = '520px';
            _div.style.height = '121px';
            _div.style.position = 'fixed';
            _div.style.top = '0px';
            _div.style.left = '50%';
            _div.style.borderRadius = '15px';
            _div.style.webKitBorderRadius = '15px';
            _div.style.MozBorderRadius = '15px';
            _div.style.marginLeft = '-260px';
            _div.style.background = "url(http://h5.g2.cn/images/pcTip.png)";
            _div.style.zIndex = '99999';
            var _a = document.createElement('a');

            _a.href = "javascript:;";
            _a.id = 'closeTip';
            _a.style.display = "block";
            _a.style.width = '10px';
            _a.style.height = '11px';
            _a.style.background = 'url(http://h5.g2.cn/images/close3.png)';
           
            _a.style.marginLeft = '490px';
            _a.style.marginTop = '20px';
            _div.appendChild(_a);
            var _p = document.createElement('p');
            _p.style.clear = 'both';
            _p.style.width = '355px';
            _p.style.marginLeft = '128px';
            _p.style.paddingTop = '10px';
            _p.innerText = '您当前使用的浏览器可能出现浏览异常，建议您使用新版谷歌浏览器。'
            _div.appendChild(_p);
            var _down = document.createElement('a');
            _down.style.color = "#ff6608";
            _down.href = 'http://rj.baidu.com/soft/detail/14744.html';
            _down.innerText = '立即下载';
            _p.appendChild(_down);
            //console.log(_div);
            document.getElementsByTagName('html')[0].appendChild(_div);

            //var html = "<div style='width:500px;height:100px;position:fixed;top:0;left:0;border-radius:15px;-webkit-border-radius:15px;-moz-border-radius:15px;z-index:99999'>fsdfs</div>";
            //$(body).append(html);
            document.getElementById('closeTip').onclick = function(){
                var _body = document.getElementsByTagName('html')[0];
                var _div1 = document.getElementById('pcTestTips');
                _body.removeChild(_div1);
            }
            cookieUtil.set('isAlert','yes');
        }  
    }


}
    


