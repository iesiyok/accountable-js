
chrome.windows.create({url: "mainpage.html", type: "normal", focused: false, state: 'minimized'});

var port;
setTimeout(function(){
				port = chrome.runtime.connect({name: "windowEvents"});


				port.onDisconnect.addListener(function(event) {
					port = chrome.runtime.connect({name: "windowEvents"});

				});

			}, 700);
 

const getCurrentTab = () => {
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
	  
	  currentTabId=tabs[0].id;
	  console.log(currentTabId);
	  
	});

}

var tabMap = new Map();
var currentTabId = 0;
getCurrentTab();


function tabsMapStartup(){
		
		tabMap.clear();
		chrome.action.setIcon({path: {
			"16" : "img/grey-16.png"
			}
		});
		
		
		chrome.tabs.query({}, function(tabs){

			if (tabs != undefined){
				tabs.forEach(tb =>{
            
					tabInfo = MainFrameInfo.sigVerMsgInstance(false, false, '', false, '', 
		            							tStatus.TAB_CREATED, sStatus.UNCOMPLYING, imgPaths.GREY_IMG, false );

					

					tabMap.set(tb.id, tabInfo);
				});
				currentTabId = tabs[tabs.length-1].id;
			}

			
			
			
		});
		return true;

}

function extensionStartup(){


		tabsMapStartup();
		
}

chrome.runtime.onInstalled.addListener(extensionStartup);
chrome.runtime.onStartup.addListener(extensionStartup);
