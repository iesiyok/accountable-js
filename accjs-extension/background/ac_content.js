


const acLReceived = (request, sender) =>{


		let tabId 	= sender.tab.id;
    	let frameId = sender.frameId;
    	console.log("Frame:: ", request.frontend_id, " ACL :: ", request.data, " second ", request.second_time);
    	
		if (frameId == 0 && request.frontend_id == DEFAULT_FRONTEND_ID ){
			mainFrameACLReceived(tabId, request.data);

		}else{
			if (request.frontend_id == DEFAULT_FRONTEND_ID){

				console.log("The iframe didnt receive frontend id from its parent");
				
			}else{
				//TODO:// parent frameId

				iframeACLReceived(tabId, frameId, 'parentFrameId', request.frontend_id, request.data, request.outerHTML);
				//iframe didnt receive frontend id from its parent
				
			}
			
		}

}

const emptyIframeAcl = (request, sender) => {

		let tabId 	= sender.tab.id;

    	if (request.frontend_id == DEFAULT_FRONTEND_ID){

			console.log("The iframe didnt receive frontend id from its parent");
		}else{
			emptyIframeAclReceived(tabId, request.frontend_id, request.outerHTML );
		}
}


const measurementCall = async (tabId) => {
	let tabInfo = tabMap.get(tabId);

	let lock = acquireLock(tabId);

	lock.hold(async ()=>{

		if (tabInfo.acL && tabInfo.acL.length > 0){


			let results = await measurement( tabId, tabInfo.acL, tabInfo.manL, 0, tabInfo.frames_info, true );
			tabInfo.results = results;

			console.log(`Measurement results :: ${results}`);
			tabInfo.first_round_measured = true;

			let er = await evalResults(results);
			if (er == CORRECT_EVAL_RESULT){
		        tabInfo.site_status = sStatus.COMPLYING;
		        tabInfo.msg = '';
		        tabInfo.icon = imgPaths.OK_IMG;

		    }else if (er == EVAL_RESULT_IN_PROGRESS){
		        tabInfo.site_status = sStatus.INPROGRESS;
		        tabInfo.msg = results;
		        tabInfo.icon = imgPaths.WARN_IMG;
		        
		    }else{
		        tabInfo.site_status = sStatus.ERROR;
		        tabInfo.msg = results;
		        tabInfo.icon = imgPaths.ERR_IMG;
		        
		    }
		    
		}else {

			if (tabInfo.manL && tabInfo.manL.length > 0){
				msg = "Active content not delivered yet, so measurement will proceed later";
				console.log(msg);
				tabInfo.site_status = sStatus.INPROGRESS;
		        tabInfo.msg = msg;
		        tabInfo.icon = imgPaths.WARN_IMG;
			}else{
				msg = "Site is considered uncomplying. No active content delivered yet, and there is no manifest fetched";
				console.log(msg);
				tabInfo.site_status = sStatus.UNCOMPLYING;
		        tabInfo.msg = msg;
		        tabInfo.icon = imgPaths.GREY_IMG;
			}
			
		}
		tabMap.set(tabId, tabInfo);
	    lock.release(tabId);
	    if (tabId == currentTabId){
	        
	        chrome.action.setIcon({path: {"16" : tabInfo.icon}});
	    }
	});

}

const mainFrameACLReceived = (tabId, acL) =>{

		let tabInfo = tabMap.get(tabId);
		if (tabInfo == undefined){
			tabInfo = tabCreatedInfo();
		}
		tabInfo.acL = acL;
		tabInfo.frontend_id = DEFAULT_FRONTEND_ID;
		tabMap.set(tabId, tabInfo);

		if (tabInfo.sig_ver && tabInfo.manL && tabInfo.manL.length > 0 && !tabInfo.first_round_measured  ){
				
				measurementCall(tabId);
			
		}

}


const emptyIframeAclReceived = async (tabId, frontend_id, outerHTML) => {
		let tabInfo = tabMap.get(tabId);
		let frames_info = tabInfo.frames_info;

		let frame = await createNewFrameInfo('', 'parentFrameId', [], frontend_id, outerHTML);

		let index;

		if (frames_info != undefined){
			index = frames_info.length;
		}else{
			frames_info = [];
			index = 0;
		}

		frames_info.push(frame);
		tabInfo.frames_info = frames_info;
		tabMap.set(tabId, tabInfo);
		let event = new CustomEvent(`${evLabels.NEW_FRAME_INFO_ARRIVED}_${tabId}_${frontend_id}`, { "detail": {'tab': tabId, 
	    					'frontend_id': frontend_id, 'frame' : frame, 'index': index } });
		self.dispatchEvent(event);
}



const iframeACLReceived = (tabId, frameId, parentFrameId, frontendId, acL, outerHTML) =>{

		let tabInfo = tabMap.get(tabId);
		let frames_info = tabInfo.frames_info;

		if (frames_info != undefined){

			 	fs = frames_info.filter(function(e){
						return ( e.frame_id == frameId || e.frontend_id == frontendId )
				});
				if(fs.length > 0){
					let frame = fs[0];
					let i = frames_info.indexOf(frame);
					frame.acL = acL;
					frame.document = outerHTML;
					frame.frontend_id = frontendId;
					frame.frame_id = frameId;
					frames_info[i] = frame;
					tabInfo.frames_info = frames_info;
					tabMap.set(tabId, tabInfo);
					
					let event = new CustomEvent(`${evLabels.NEW_FRAME_INFO_ARRIVED}_${tabId}_${frontendId}`, { "detail": {'tab': tabId, 
	    					'frontend_id': frontendId, 'frame' : frame, 'index': i } });
					self.dispatchEvent(event);
				}else{

					callNewFrameInfo(tabId, frameId, parentFrameId, acL, frontendId, outerHTML);
				}
				

		}else{

			callNewFrameInfo(tabId, frameId, parentFrameId, acL, frontendId, outerHTML);

		}
}

const callNewFrameInfo = async (tabId, frameId, parentFrameId, acL, frontendId, outerHTML) => {

		let tabInfo = tabMap.get(tabId);
		let frames_info = tabInfo.frames_info;
		let index;
		if (!frames_info ){
			frames_info = [];
			index = 0;
		}else{
			index = frames_info.length;
		}
		let frame = await createNewFrameInfo(frameId, parentFrameId, acL, frontendId, outerHTML);
		frames_info.push(frame);
		tabInfo.frames_info = frames_info;
		tabMap.set(tabId, tabInfo);
		let event = new CustomEvent(`${evLabels.NEW_FRAME_INFO_ARRIVED}_${tabId}_${frontendId}`, { "detail": {'tab': tabId, 
	    					'frontend_id': frontendId, 'frame' : frame, 'index': index } });
		self.dispatchEvent(event);
}

const createNewFrameInfo = (frameId, parentFrameId, acL, frontendId, outerHTML ) => {
			let frame = FrameInfo.simpleIframeInfo();
			frame.frame_id = frameId;
			frame.parent_frame_id = parentFrameId;
			//TODO check parentFrameId
			frame.acL = acL;
			frame.frontend_id = frontendId;
			frame.document = outerHTML;
			return frame;
}

const newContentAdded = (request, sender) =>{
			var event = new CustomEvent(evLabels.NEW_CONTENT_ADDED, { "detail": {'tab': sender.tab.id, 
	    		'data': request.data, 'frontend_id': request.frontend_id } });
			self.dispatchEvent(event);
			
}
//TODO should be done for iframe as well
const newContentAddedProcess = async (tabId, tabInfo, ac, frames_info, seqMain) => {


			if (tabInfo.sig_ver){
				let seq = await find_item_in_manifest_by_type(tabInfo.manL, ac );
				if (seq != ACTIVE_ELEMENT_NOT_FOUND){

							let manifest = tabInfo.manL;
							let man = manifest[seq];

							lock = acquireLock(tabId);
							lock.hold(async ()=>{
								
								resultList = tabInfo.results;

								seq = tabInfo.results.length;
								
								let com = await compareTypesAndLinks(ac, man);

								if (com){
									
									let evalRes = await compare(tabId, ac, man, 0, frames_info);
									
									resultList[seq] = evalRes;
								}else{

									let msg = [`AC-${seq} Either the 'type' or the 'link' does not match with the manifest`];
									
									resultList[seq] = msg;
								}

								tabInfo.results = resultList;
								tabMap.set(tabId, tabInfo);
								lock.release(tabId);




							});	
							
							

				}else{

						let degree = await appendDegree([seqMain]) ;

						evalRes = `AC-${seqMain}. new content added, but not declared in the manifest`;

						var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : seqMain, 'data': evalRes, 'degree' : degree } });
						self.dispatchEvent(event);

					
					
					console.log("tabId:", tabId, ', ', "new content added, but either it was not declared dynamic in the manifest or its information doesnt match with the declared manifest" );
					
				}
			}else{
				console.log("tabId:", tabId, ', ', " new content added, but manifest signature was not verified for this tab. Hence, measurement has been skipped.");
				
			}

}


const newContentAddedEvalGeneric = async (tabId, ac, manifest, degree, frames_info ) => {


	let seq = await find_item_in_manifest_by_type(manifest, ac );

	if (seq != ACTIVE_ELEMENT_NOT_FOUND){
		let _man = manifest[seq];
		let evalRes = await compare(tabId, ac, _man, degree, frames_info );
		var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : seq, 'data': evalRes, 'degree' : degree } });
		self.dispatchEvent(event);
		return [EVAL_RESULT_IN_PROGRESS, ''];

	}else{
		let r = `AC-${seq} new content added, but either it was not declared dynamic in the manifest or its information doesnt match with the declared manifest`;
	
		var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : seq, 'data': r, 'degree' : degree } });
		self.dispatchEvent(event);
		return [EVAL_RESULT, r];
	}

}

const newUndeclaredContentGeneric = async (tabId, seq, degree) => {
	let r = `AC-${seq} new content added, but not declared in the manifest`;
	var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : seq, 'data': r, 'degree' : degree } });
	self.dispatchEvent(event);
	return [EVAL_RESULT, r];
}

const newContentAddedProcessFrame = async (tabId, tabInfo, ac, man, frame, frames_info, degree, seqMain) => {


			if (tabInfo.sig_ver){

				if (man != undefined){
					if (man.trust == 'assert'){


						if (man.manifest != undefined && man.manifest != null){


							return newContentAddedEvalGeneric(tabId, ac, man.manifest, degree, frames_info);


						}else{
							
							//TODO take the outerHTML to compare here
							
							return newUndeclaredContentGeneric(tabId, seqMain, degree);
						}
					}else{

						if (man.trust == 'delegate'){
							return newContentAddedEvalGeneric(tabId, ac, frame.manL, degree, frames_info);
						}
		

						
					}
				}else{
					return newUndeclaredContentGeneric(tabId, seqMain, degree);
				}

				
			}else{

				return [EVAL_RESULT, " new content added, but manifest signature was not verified for this tab. Hence, measurement has been skipped."];

			}

}

const findACLTargetRec = async (frontend_id, frames_info, topACL, res) =>{


	for (let i =0; i < topACL.length; i++){
		let frId = topACL[i];
		
			fs2 = frames_info.filter(function(e){
				return e.frontend_id == frId;
			});
			if (fs2.length > 0){
				frame = fs2[0];
				let res1 = await findACLTarget(frontend_id, frame.acL, frames_info, res );
				if (res1 != EVAL_RESULT){

				}else{
					res.push(res1);
				}

			}
	
			if (i == topACL.length - 1){
				return res;
			}
	}

}

const findACLTarget = async (frontendId, acL, frames_info, res) => {


		fs = acL.filter(function(e){
			return e.frontend_id == frontendId
		});
		if(fs.length > 0){
			frame = fs[0];
			res.push(acL.indexOf(frame));
			return res;
		}else{
			let topACL = [];
			for(let i=0; i < acL.length; i++){
				if (acL[i].frontend_id){
					topACL.push(acL[i].frontend_id);
				}
			}
			if (topACL.length > 0){
				return await findACLTargetRec(frontendId, frames_info, topACL, res);
			}else{
				return TARGET_NOT_FOUND;
			}
			
		}

		return TARGET_NOT_FOUND;


}
const findManifestBySeq  = async (degrees, manL)=>{

	if (degrees.length == 1){
		return manL[degrees];
	}else{
		let j = degrees[0];
		degrees.shift();
		return await findManifestBySeq(degrees, manL[j] );
	}
}

const appendDegree = async (degrees) => {


	let degree = '-2';
	for (let i =0; i < degrees.length; i++){
		degree += `-${degrees[i]}`;
	}
	return degree;

}

self.addEventListener(evLabels.NEW_CONTENT_ADDED, async (e) => {
           

            let tabInfo = tabMap.get(e.detail.tab);

            if (e.detail.frontend_id == DEFAULT_FRONTEND_ID){
				//New content was added to the main window
				let ac = e.detail.data;
				let acL = tabInfo.acL;
				acL.push(ac);
				acL = await refresh_list(acL);
				tabInfo.acL = acL;

				if (tabInfo.first_round_measured){

				

					newContentAddedProcess(e.detail.tab, tabInfo, ac, tabInfo.frames_info, acL.length-1);
					

				}else{
					//just change the acL is enough
					tabMap.set(e.detail.tab, tabInfo);
				}
				
				
			}else{
				//New content was added to one of the iframe window
				let frames_info = tabInfo.frames_info;
				if (frames_info != undefined && frames_info != null){
					fs = frames_info.filter(function(e1){
						return e1.frontend_id == e.detail.frontend_id
					});
					if(fs.length > 0){

						let frame = fs[0];
						let index = frames_info.indexOf(frame);
						let ac = e.detail.data;
						let acL = frame.acL || [];
						acL.push(ac);
						acL = await refresh_list(acL);
						frame.acL = acL;
						frames_info[index] = frame;
						tabInfo.frames_info = frames_info;
						tabMap.set(e.detail.tab, tabInfo);

						if (frame.first_round_measured){
					

							let manTarget = await findACLTarget(frame.frontend_id, tabInfo.acL, frames_info, []);
							let man = await findManifestBySeq(manTarget, tabInfo.manL);
							let degree = await appendDegree(manTarget) ;
							let pr = await newContentAddedProcessFrame(e.detail.tab, tabInfo, ac, man, frame, frames_info, degree, frame.acL.length-1);
							if (pr && pr.length > 1 && pr[0] == '-1'){
								console.log("tabId:", e.detail.tab, ', ', pr[1] );
							}
						}

						
					}else{
						//TODO this probably should go away
						if (e.detail.data.type == 'iframe' ){

							fs = frames_info.filter(function(e1){
								return e1.frontend_id == e.detail.data.frontend_id
							});

							if(fs.length > 0){
								console.log("tabId:", e.detail.tab, ', a new iframe added but it was already in the list, ignored');
								
								let frame = fs[0];
								let index = frames_info.indexOf(frame);
								let ac = e.detail.data;
								let acL = frame.acL || [];
								acL.push(ac);
								acL = await refresh_list(acL);
								frame.acL = acL;
								frames_info[index] = frame;
								tabInfo.frames_info = frames_info;
								tabMap.set(e.detail.tab, tabInfo);
								

									let manTarget = await findACLTarget(frame.frontend_id, acL, frames_info, []);
									let man = await findManifestBySeq(manTarget, tabInfo.manL);
									let degree = await appendDegree(manTarget) ;
									let pr = await newContentAddedProcessFrame(e.detail.tab, tabInfo, ac, man, frames_info, degree);
									if (pr[0] == '-1'){
										console.log("tabId:", e.detail.tab, ', ', pr[1] )
									}

								



							}else{
								console.log("tabId:", e.detail.tab, ', a new content added to one of the iframes, but iframe info not found in the background' );
							}

						}else{
							console.log("tabId:", e.detail.tab, ', a new content added to one of the iframes, but iframe info not found in the background' );
						}
					}
				}
				
				
			}

});