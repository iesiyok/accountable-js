

function tabCreatedInfo(){
	return MainFrameInfo.simpleFrameInfoInstance(tStatus.TAB_CREATED);
}

function newRequestSentInfo(){
	return MainFrameInfo.simpleFrameInfoInstance(tStatus.NEW_REQ);
}


function tabCreated(tabId){

	chrome.action.setIcon({path: {"16" : imgPaths.GREY_IMG}});
	currentTabId = tabId;
	console.log(currentTabId);

	let t = tabCreatedInfo();
	tabMap.set(tabId, t);

}

function tabActivated(tabId){
	
	var tabInfo = tabMap.get(tabId);
	currentTabId = tabId;
	console.log(currentTabId);

	if(tabInfo != undefined){
		
		chrome.action.setIcon({path: {"16" : tabInfo.icon}});
	
	}else{

		let t = tabCreatedInfo();
		tabMap.set(tabId, t);
		
		chrome.action.setIcon({path: {"16" : imgPaths.GREY_IMG}});
	}
}

function beforeRequest(tabId){
		let t = newRequestSentInfo();
		tabMap.set(tabId, t);
		chrome.action.setIcon({path: {"16" : imgPaths.GREY_IMG}});
		
}

function tabRemoved(tabId){
	tabMap.delete(tabId);
}


chrome.tabs.onCreated.addListener(function(tabId){
	tabCreated(tabId);
});

chrome.tabs.onActivated.addListener(function(details) {
	tabActivated(details.tabId);
});

chrome.webRequest.onBeforeRequest.addListener(
	function(details){
		beforeRequest(details.tabId);
}, {
	urls: [ "<all_urls>"],
	types: ["main_frame"]
}, [ ]);

chrome.tabs.onRemoved.addListener(function(tabId){
	tabRemoved(tabId);
});

