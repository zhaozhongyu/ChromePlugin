/*var importJs=document.createElement('script');
importJs.setAttribute("type","text/javascript");
importJs.src = chrome.extension.getURL("js/jquery-3.2.1.js");
document.getElementsByTagName("head")[0].appendChild(importJs);
console.log(document.getElementsByTagName("head")[0]);*/

var chromeSender = chrome.runtime.sendMessage;
injectCustomJs("js/jquery-3.2.1.js");


function injectCustomJs(jsPath)
{
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    //console.log(temp);
    temp.onload = function() { //加载jquery完成后再加载inject
        injectCustomJsAndRemove("js/inject.js");
    };
    (document.head||document.documentElement).appendChild(temp);
}

function injectCustomJsAndRemove(jsPath)
{
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    //console.log(chrome.extension.getURL(jsPath));
    temp.onload = function()
    {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
        sendMessage();
    };
    (document.head||document.documentElement).appendChild(temp);
}

function sendMessage() {
    $("table a").each(function(){
        if($(this).attr("href").startsWith("thunder")){
            console.log($(this).attr("href"));
            chromeSender($(this).attr("href"), function(response){
                console.log(response);
            });
        } });
}