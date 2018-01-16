/*var importJs=document.createElement('script');
importJs.setAttribute("type","text/javascript");
importJs.setAttribute("src", 'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js');
document.getElementsByTagName("head")[0].appendChild(importJs);
console.log(document.getElementsByTagName("head")[0]);*/

//var $=jQuery;
$("table a").each(function(){
    if($(this).attr("href") == "#" && typeof ThunderNetwork_SetHref === "function"){
        ThunderNetwork_SetHref(this);
    } });
