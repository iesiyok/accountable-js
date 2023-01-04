


chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse)=> {
         
	     contentScrMsgReceived(request, sender, sendResponse);

   
   });



function contentScrMsgReceived(request, sender, sendResponse){

	let action = request.action;

	if ( action === evLabels.SET_EXTENSION_RESPONSE ){
            
            
            let tabInfo = tabMap.get(currentTabId);
	    	var msg = accExtensionResponse(tabInfo);
	        sendResponse(msg);  

    }
    else if ( action === evLabels.NEW_CONTENT  )
			 		// && sender.tab.id === currentTabId )
	{
	    	console.log("New content:", request.data);
	    	newContentAdded(request, sender);

 			
	}
	else if ( action === evLabels.ACTIVE_CONT_REMOVED  ){
		let tabId = sender.tab.id;
		tabInfo = tabMap.get(tabId);

		front_id = request.frontend_id;
		ind 	 = request.data;

		if (front_id == '-1'){
			acL = tabInfo.acL;

			if (acL[ind] != undefined){

				acL[ind].persistent = false;
				tabInfo.acL = acL;
				tabMap.set(tabId, tabInfo);
			}else{
				console.log(`tab: ${tabId}, indice ${ind} has been removed but couldnt be found in the ACL`);
			}
		}else{
			frames_info = tabInfo.frames_info;
			if (frames_info != undefined && frames_info != null){
				fs = frames_info.filter(function(e){
					return e.frontend_id == front_id
				});
				if(fs.length > 0){
					let frame = fs[0];
					
					acL = frame.acL;
					
					acL[ind].persistent = false;
					frame.acL = acL;
					let index = frames_info.indexOf(frame);
					frames_info[index] = frame;
					tabInfo.frames_info = frames_info;
					tabMap.set(tabId, tabInfo);
				}
			}
			
		}


	}

    else if ( action === evLabels.GENERATE_MANIFEST ){

    	let tabInfo = tabMap.get(currentTabId);

    	if (tabInfo){
    		let acL = Object.assign([], tabInfo.acL);  

	    	if (acL){

	    		let frames_info = tabInfo.frames_info;

	    		tabInfo.gen_man = [];
				tabInfo.ext_counter = 0;
				tabInfo.links_counter = 0;
				tabInfo.links_counter_total = 0;
				tabInfo.gm_status = "";
				tabInfo.preload_scripts = [];

				callGenerateManifest(currentTabId, acL, frames_info, tabInfo);

	    	}else{

	    		console.log("ACL is not ready yet for generating a manifest for this website, either wait until the window fully loads or refresh the page");

	    	}
    	}else{
    		console.log("Tabinfo is not ready yet for generating a manifest for this website, either wait until the window fully loads or refresh the page");
    	}

    	


    }
    else if ( action === evLabels.DOWNLOAD_MANIFEST ){

    		let tabInfo = tabMap.get(currentTabId);

	        sendResponse(tabInfo.manL);

    }

    else if ( action === evLabels.ACCJS_LINK_META ){

    		

            assignManifest2Tab(sender.tab.id, request.data);

    }
    else if ( action === evLabels.FRAME_ACCJS_LINK_META ){

    	

            assignManifest2Frame(sender.tab.id, request.frontend_id, sender.frameId, sender.parentFrameId, request.data);

    }
    else if (action === evLabels.LOCATION_HREF_CHANGED ){

    	let tabId 	= sender.tab.id;
    	let frameId = sender.frameId;
    	let tabInfo = tabMap.get(tabId);

    	if (request.frontend_id == DEFAULT_FRONTEND_ID && frameId == 0 ){

    		// beforeRequest(tabId);
    		//we shouldnt delete the ACL here, otherwise we wont have the iframe infos as they wont send again
    		tabInfo.is_complying = false;
    		tabInfo.tab_status = tStatus.NEW_REQ;
    		tabInfo.site_status = sStatus.UNCOMPLYING;
    		tabInfo.sig_ver = null;
    		tabInfo.sig_msg = null;
    		tabInfo.results = null;
    		tabInfo.msg = null;
    		tabInfo.manL = null;
    		tabInfo.sxg_link = null;
    		tabInfo.first_round_measured = false;
    		tabInfo.icon = imgPaths.GREY_IMG;

    		chrome.action.setIcon({path: {"16" : tabInfo.icon}});
			tabMap.set(tabId, tabInfo);

    	}else{
    		if (request.frontend_id == DEFAULT_FRONTEND_ID){

    			console.log(`Tab ${tabId} url changed but frontend_id was wrong `);

    		}else{

    			console.log(`Tab ${tabId} url changed for iframe front_id: ${request.frontend_id}`);

    		}
    	}

    }
    else if ( action === evLabels.CONT_LIST ){

    	acLReceived(request, sender);
    		
    }
    else if (action === evLabels.EMPTY_IFRAME_ACTIVE_CONT_LIST ){

    	emptyIframeAcl(request, sender);

    }
    else if ( action === evLabels.SITE_REFRESH ){

    	let tabId 	= sender.tab.id;

    	tabInfo = tabMap.get(tabId);

    	if (tabInfo.headers_exist == true ){

    	}else{
    		    		
    		let t = newRequestSentInfo();

  

        	chrome.action.setIcon({path: {
				"16" : t.icon
				}
			});

			tabMap.set(tabId, t);
    	}
    	
    		

    }else if (action === evLabels.FRONT_END_ID_NOT_ASSIGNED ){
    	let tabId 	= sender.tab.id;

    	tabInfo = tabMap.get(tabId);

    	let acl = tabInfo.acL;
    	for (let i = 0; i < acl.length; i++){
    		let ac = acl[i];
    		if (ac.src == request.src){

    		}
    	}
    }


}




function accExtensionResponse(tabInfo){

	if(tabInfo == undefined){

	    chrome.action.setIcon({path: {
			"16" : imgPaths.GREY_IMG
			}
		});
		return {status: sStatus.UNDEFINED, msg: eMsg.EMPTY_TABINFO, warnings: null };
	}else{

		let is_complying = tabInfo.is_complying;
		if (is_complying){
			chrome.action.setIcon({path: {"16" : tabInfo.icon}});
			let sig_ver = tabInfo.sig_ver;
			if (sig_ver){

				return {status: tabInfo.site_status, msg: tabInfo.msg, warnings: tabInfo.warnings };

			}else{
				return {status: tabInfo.sig_msg, msg: tabInfo.msg, warnings: tabInfo.warnings };
			}


		}else{
			return {status: sStatus.UNCOMPLYING, msg: eMsg.NO_HEADER, warnings: null };

			chrome.action.setIcon({path: {
				"16" : imgPaths.GREY_IMG
				}
			});
		}
		
		

		
	}

}
           