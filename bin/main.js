var callb = function() {
	if (localStorage['user']) {
		var extension = new Codeivate.Extension(localStorage['user']);
		extension.stop();
		extension.update();
		extension.start();
	} else {
		chrome.browserAction.setBadgeText({
			text: "!"
		});
		chrome.browserAction.setBadgeBackgroundColor({
			color: [255,95,95,255]
		});
	}
};
chrome.runtime.onStartup.addListener(callb);

chrome.runtime.onInstalled.addListener(function() {
	if (!localStorage['user']) {
		chrome.tabs.create({ url: "options/index.html" });
	}
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.action == "restart") {
            callb();
            sendResponse({farewell: "goodbye"});
        }
});

//chrome.runtime.onUpdateAvailable.addListener(function(details) {
//    console.log("updating to version " + details.version);
//    chrome.runtime.reload();
//});
//
//chrome.runtime.requestUpdateCheck(function(status) {
//    if (status == "update_available") {
//        console.log("update pending...");
//    } else if (status == "no_update") {
//        console.log("no update found");
//    } else if (status == "throttled") {
//        console.log("Oops, I'm asking too frequently - I need to back off.");
//    }
//});
//
//chrome.runtime.onMessage.addListener(
//    function(request, sender, sendResponse) {
//        console.log(sender.tab ?
//            "from a content script:" + sender.tab.url :
//            "from the extension");
//        if (request.greeting == "hello")
//            sendResponse({farewell: "goodbye"});
//    });
callb();

