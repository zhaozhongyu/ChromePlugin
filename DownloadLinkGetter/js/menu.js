function genericOnClick(info, tab) {
    alert(info.linkUrl);
}

function selectionOnClick(info, tab) {
    console.log("selectionOnClick")
    console.log(tab);
    chrome.tabs.query({
        "title":"DownloadLinkGetter"
    }, function (tabarray) {
       if(tabarray.length == 0){
           chrome.tabs.create({
               url: 'output.html',
               active: false,
               pinned: false,
           }, function(tab){
           });
       } else {
           console.log(tabarray);
       }
    });


    tabId = tab.id;
    chrome.tabs.executeScript(tabId, {
        file: 'js/jquery-3.2.1.js',
        allFrames: true,
        runAt: 'document_start'
    }, function(resultArray){
    });
    chrome.tabs.executeScript(tabId, {
        file: 'js/content.js',
        allFrames: true,
        runAt: 'document_start'
    }, function(resultArray){
        console.log(resultArray);
    });
}
/*
var chromeTabSender = chrome.tabs.sendMessage;;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    chrome.tabs.query({"title":"DownloadLinkGetter"},
        function (tabarray) {
            tabId = tabarray[0].id;
        });
    chromeTabSender(tabId, message, function(response){
        sendResponse(response);
    });
});*/


//var link = chrome.contextMenus.create({"title": "链接地址","contexts":["link"],"onclick":genericOnClick});
//var selection = chrome.contextMenus.create({"title": "选中文字","contexts":["selection"],"onclick":selectionOnClick});
var normal = chrome.contextMenus.create({
    type: 'normal',
    title: '获取当前页面下载链接',
    "onclick":selectionOnClick
});

