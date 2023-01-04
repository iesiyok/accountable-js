chrome.webRequest.onHeadersReceived.addListener((details) => {

  	headersReceived(details.tabId, details.responseHeaders, details.url);

  }, filter, [  "responseHeaders"]);


chrome.webRequest.onHeadersReceived.addListener((details) => {
  	
  	iframeHeadersReceived(details.tabId, details.frameId, details.parentFrameId, details.responseHeaders);

  }, iframeFilter, [  "responseHeaders"]);




const headersReceived = (tabId, responseHeaders, url) => {

			let sxgLink = findAccjsHeader(responseHeaders);
			tabInfo = tabMap.get(tabId);
			tabInfo.headers_exist = true;

			if(sxgLink == '' ){
				//TODO:// raise an event, so that we can complete the picture at some point
				//we can compare with the metaTags

				if (url == 'https://web.whatsapp.com/' ){
					tabMap.set(tabId, tabInfo);
					assignManifest2Tab(tabId, "http://localhost:8085/whatsapp/index.sxg");
				}else{
					tabInfo.is_complying = false;
					tabMap.set(tabId, tabInfo);
				}
				
				
			}else{
				
				tabMap.set(tabId, tabInfo);
				assignManifest2Tab(tabId, sxgLink);
				
				
			}

}


const iframeHeadersReceived = async (tabId, frameId, parentFrameId, responseHeaders ) => {

			let sxgLink = findAccjsHeader(responseHeaders);

			if (sxgLink  != '' ){
			
				tabInfo = tabMap.get(tabId);

				if (tabInfo){

					
					assignManifest2Frame(tabId, '-1', frameId, parentFrameId, sxgLink);

				}else{
					console.log("IframeHeadersReceived.. TabInfo not found..")
				}

			}
}



const assignManifest2Frame = async (tabId, frontend_id, frameId, parentFrameId, sxgLink) => {


		let tabInfo = tabMap.get(tabId);

		let frame = FrameInfo.simpleIframeInfo();
		
		frame.frame_id = frameId;
		frame.parent_frame_id = parentFrameId;
		let frames_info = tabInfo.frames_info;

		frame.frame_id = frameId;
		frame.parent_frame_id = parentFrameId;
		if (frontend_id != DEFAULT_FRONTEND_ID){
			frame.frontend_id = frontend_id;
		}
		if (!frames_info){
			frames_info = [];
		}
		
		frame.sxg_link = sxgLink;
		frame.is_complying = true;
		frame.first_round_measured = false;
		frames_info.push(frame);
		tabInfo.frames_info = frames_info;
		tabMap.set(tabId, tabInfo);

		let manifestPr = verifySXGSignature(sxgLink);
		manifestPr.then(manifest => {

								tabInfo = tabMap.get(tabId);
								frames_info = tabInfo.frames_info;

								if (frames_info != undefined ){

									fs = frames_info.filter(function(e){
											return e.frame_id == frameId
									});
									if(fs.length > 0){

											let frame = fs[0];
											let index = frames_info.indexOf(frame);


											if (manifest.error == '' ){
												frame.sig_ver = true;
												frame.manL = manifest.manifest.contents;
											}else{
												frame.sig_ver = false;
												frame.sig_msg = manifest.error;
												
											}
											frames_info[index] = frame;
											tabInfo.frames_info = frames_info;
											tabMap.set(tabId, tabInfo);
									}else{
										console.log("This shouldnt have happened");
									}
								}else{
									console.log("This shouldnt have happened");
								}

		

		});



}



const mainWindowLocationHrefChanged = (tabId) => {

		tabInfo = tabMap.get(tabId);
		tabInfo.sig_ver = false;
		tabInfo.sig_msg = '';
		tabInfo.manL = [];
		tabInfo.first_round_measured = false;
		tabInfo.is_complying = true;
		tabInfo.icon = imgPaths.GREY_IMG;
		tabInfo.results = '';
		tabInfo.msg = '';
		tabInfo.site_status = sStatus.UNCOMPLYING;
		
		tabMap.set(tabId, tabInfo);

		chrome.action.setIcon({path: {
			"16" : imgPaths.GREY_IMG
			}
		});


}



const frameLocationHrefChanged = (tabId, frontend_id) => {

		tabInfo = tabMap.get(tabId);
		let frames_info = tabInfo.frames_info;
		if (frames_info != undefined && frames_info != null){

			fs = frames_info.filter(function(e){
				return e.frontend_id == ac.frontend_id
			});
			if(fs.length > 0){

				let frame = fs[0];
				let index = frames_info.indexOf(frame);

				console.log(`Tab ${tabId} ${frame.src} dont know what to do about this`);

			}



		}else{
			console.log(`Tab ${tabId} url changed but frame info not found `);
		}
}

const verifySXGSignature = (sxgLink) => {

		return new Promise((resolve) => {
			
				let rnd;
				if (!port){
					port = chrome.runtime.connect({name: "windowEvents"});
				}
				port.postMessage({action : 'randomArray', link : sxgLink});

				let sxgInfoEventHandler = (msg) => {

						if (msg.action === 'randomArray' && msg.link === sxgLink  ){
								rnd = msg.rnd;
								port.postMessage({action : 'sxgRequest', link: sxgLink, rnd : rnd});
						}else if (msg.action === 'sxgResult'  && rnd === msg.rnd ){
								port.onMessage.removeListener(sxgInfoEventHandler, false);
								resolve(msg.manifest);

						}
				}

				port.onMessage.addListener(sxgInfoEventHandler);

		});
}

const assignManifest2Tab = async (tabId, sxgLink) => {

				
	let manifestPr = verifySXGSignature(sxgLink);
	manifestPr.then(manifest => {

			let lock = acquireLock(tabId);
			lock.hold(async ()=>{

					tabInfo = tabMap.get(tabId);
			 		tabInfo.sxg_link = sxgLink;
					tabInfo.tab_status = tStatus.HEADERS_REC;
					tabInfo.is_complying = true;

					if (manifest.error == ''){
																
									tabInfo.sig_ver = true;
									tabInfo.manL = manifest.manifest.contents;
									tabMap.set(tabId, tabInfo);
									lock.release(tabId);
									if (tabInfo.acL && !tabInfo.first_round_measured){
													measurementCall(tabId);
									}
							

					}else{

									tabInfo.sig_ver = false;
									tabInfo.sig_msg = "manifest.error";

										tabInfo.icon = imgPaths.ERR_IMG;
										tabInfo.site_status = sStatus.ERROR;
										tabInfo.results = ["Manifest signature verification error"];
										

										chrome.action.setIcon({path: {"16" : imgPaths.ERR_IMG}});

									tabMap.set(tabId, tabInfo);
									lock.release(tabId);

					}
			});
	});


}
