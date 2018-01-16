chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    $("p").append("<br />"+message);
    console.log(message);
    sendResponse("background get the message");
});
/*chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    $("p").append("<br />"+message);
    sendResponse("getit");
});*/