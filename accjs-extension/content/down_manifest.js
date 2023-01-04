



( () => {



	chrome.runtime.onMessage.addListener(async (request, sender, sendResponse)=>{

	    if(request.action == "gn_manifest" /*&& request.frontend_id == frontend_id*/ ){

	    
	    	chrome.runtime.sendMessage({action: 'generated_manifest_content', data: request.gn_manifest}, response => {
				if(chrome.runtime.lastError) {}; 
			});

	    	
	    }

	});


	
})();