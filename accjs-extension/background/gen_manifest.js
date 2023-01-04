const callGenerateManifest = (tabId, acL, frames_info, tabInfo) => {

	let acLProm = generateManifest(tabId, acL, 'A', true, 0, frames_info, DEFAULT_FRONTEND_ID, true );
	acLProm.then((acLx) => {

		lock = acquireLock4GenManifest(tabId);

		lock.hold(async ()=>{

			tabInfo.gen_man = acLx;
			tabInfo.gm_status = evLabels.GENERATED_MANIFEST_ASSIGNED;
	    	tabMap.set(tabId, tabInfo);

			if (tabInfo.ext_counter == 0){

				extCounterZero(tabId);	

			}else{
				var event = new CustomEvent(`${evLabels.GENERATED_MANIFEST_ASSIGNED}-${tabId}`, { });
				self.dispatchEvent(event);
			}
			lock.release(tabId);
			
		});	
	    	
	});



}

const generateManifest4EachElement = (tabId, isMainFrame, acL, indexStr, index, frames_info) =>{


	return new Promise( (resolve, reject) => {

		let prom = new Promise ((res, rej) => {

			if (isMainFrame){
				lock = acquireLock4GenManifest(tabId);
				lock.hold(async ()=>{
					tabInfo = tabMap.get(tabId);
					tabInfo.gen_man = acL;
					tabMap.set(tabId, tabInfo);
					lock.release(tabId);
					res();
				});
				
			}else{
				res();
			}

		});

		prom.then(()=>{

			procProm = acL.map((ac) => genManifest(tabId, ac, indexStr, index++, frames_info ) );
			Promise.all(procProm).then((processed)=>{
				
				resolve(processed);

			});

		});

		
		

	});
}


const generateManifest = (tabId, acL, indexStr, isMainFrame, index, frames_info, frontend_id, persistent) =>{

	return new Promise( (resolve, reject) => {

		let scrL;
		if (acL.length > 0){

				scrL = acL.filter(function(e) {
					//TODO remove local here
					  return ((e.type == 'local' || e.type == 'external') && e.link != undefined)
				});
				
		}else{
				scrL = [];
		}

		let linksProm;
		let procProm;
		let j = 0;
		let frameId = DEFAULT_FRONTEND_ID;

		if (persistent){

			if (!isMainFrame){
				
				if(frames_info.length > 0){
					fls = frames_info.filter(function(e){
						return e.frontend_id == frontend_id 

					});
					if (fls.length > 0){

						frameId = fls[0].frame_id;
					}else{
						console.log("Frame info not found");
					}
				}else{
					console.log("Frame info not found");
				}
			}else{
				frameId = 0;
			}
		}

		if (!isMainFrame){
				indexStr += `-${index}`;
		}

		let linksListProm = sendMessage2FrontForLinks(tabId, frameId, scrL);
		
		linksListProm.then((linkList) => {
			if (linkList.length > 0){
				
				acL = append2List(acL, linkList);

			}
			processedProm = generateManifest4EachElement(tabId, isMainFrame, acL, indexStr, j, frames_info);
			processedProm.then((processed) => {
					resolve(processed);
			});
			
		});
		
		
	});
}

const extCounterZero  = (tabId) => {

	tabInfo = tabMap.get(tabId);
	tabInfo.gm_status = evLabels.MANIFEST_GENERATED;
	tabMap.set(tabId, tabInfo);

	console.log("Manifest generated completely::", tabInfo.gen_man );


	chrome.scripting.executeScript({
	    target: {tabId: tabId},
	    files: ['content/down_manifest.js']
	    //parameter : 'var gn_manifest = ' + JSON.stringify(tabInfo.gen_man)
	});

	//chrome.tabs.sendMessage(tabId, {link: sxgLink});

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabId, {action: 'gn_manifest', gn_manifest : tabInfo.gen_man }, function(r) {
	    //console.log(r)
	  });
	});

}

const acquireLock4GenManifest = (tabId) => {
		tabInfo = tabMap.get(tabId);
		if (tabInfo.generate_label == null || tabInfo.generate_label == false){
			
			let lock = new GenManLock(tabId, 1);

			tabInfo.generate_buffer = lock;
			tabInfo.generate_label = true;

			tabMap.set(tabId, tabInfo);
			return lock;

		}else{
			let lock = tabInfo.generate_buffer;
			return lock;
		}	

}

const generatedAclHash = (tabId, indexStr, index, hash) =>{

	
	
		let genMan = tabInfo.gen_man;

		if (tabInfo.gm_status == evLabels.GENERATED_MANIFEST_ASSIGNED){
			lock = acquireLock4GenManifest(tabId);
			lock.hold(async ()=>{

				tabInfo = tabMap.get(tabId);
				pr = assignHashValue(tabId, indexStr, index, hash);
				pr.then(()=>{

					if (tabInfo.ext_counter == 0){
						extCounterZero(tabId);
					}
					lock.release(tabId);

				});
			});
		}else{

			self.addEventListener(`${evLabels.GENERATED_MANIFEST_ASSIGNED}-${tabId}`, () => {

				generatedAclHash(tabId, indexStr, index, hash);
			});
			//lock.release(tabId);

		}

	
}

const genManifest = (tabId, ac, indexStr, index, frames_info ) => {



		if (ac.hash == DEFAULT_HASH_VALUE){
			lock = acquireLock4GenManifest(tabId);
			lock.hold(async ()=>{

				let tabInfo = tabMap.get(tabId);

				tabInfo.ext_counter++;
				tabMap.set(tabId, tabInfo);
				lock.release(tabId);
				
			});
		}else{
			// res();
		}

		return new Promise( (resolve, reject) => {
			
			if (ac.type == 'iframe' ){


					if (frames_info && frames_info.length >0){

					}else{
						frames_info = [];
					}


					let frames = frames_info.filter(function(e) {
					  return e.frontend_id == ac.frontend_id;
					});
					if (frames.length > 0){
						let frame = frames[0];

						hsh_pr = sha256(frame.document);
						hsh_pr.then((hsh)=>{
							ac.hash = hsh;
						});
						let persistent = true;

						if (ac.persistent != undefined && ac.persistent == false){
							persistent = false;
						}

						let procProm = generateManifest(tabId, frame.acL, indexStr, false, index, frames_info, ac.frontend_id, persistent);
						procProm.then((processed) => {

							ac.trust = "assert";

							if (processed.length > 0){
								ac.manifest = processed;
								
							}else{
								// ac.hash = undefined;
							}

							resolve(JSON.parse(JSON.stringify(ac, iframeexcluderCustom)));

						});

					}else{
						resolve(JSON.parse(JSON.stringify({"type": "iframe",   "data" : "** Missing **"})));
					}

			}else{
					if (ac.type == 'inline' || ac.type == 'local' || ac.type == 'external' ){
						ac.trust = "assert";

						if (ac.hash == DEFAULT_HASH_VALUE){

							if (ac.type == 'inline'){

								hsh_pr = sha256(ac.script);
								hsh_pr.then((hsh)=>{
									
									generatedAclHash(tabId, indexStr, index, hsh);
								});

								resolve(JSON.parse(JSON.stringify(ac, scriptexcluderCustom)));

							}else{

								let h_prom = sriHTML('sha256', ac.link);
								h_prom.then((h) => {
									
									
									generatedAclHash(tabId, indexStr, index, h);

								}, (err)=>{
									
									console.log(err);
									generatedAclHash(tabId, indexStr, index, "<-- Provide resource integrity here. -->");
								});
								resolve(JSON.parse(JSON.stringify(ac, scriptexcluderCustom)));
							}


						}else{
							resolve(JSON.parse(JSON.stringify(ac, scriptexcluderCustom)));
						}
						
					}else if (ac.type = 'event_handler' ){
						ac.trust = "assert";
						hsh_pr = sha256(ac.script);
						hsh_pr.then((hsh)=>{

							if (index == 56){
								console.log("aa");
							}
							
							generatedAclHash(tabId, indexStr, index, hsh);
						});
						
						// ac.hash = "-1";
						resolve(JSON.parse(JSON.stringify(ac, ehexcluderCustom)));
					}else{
						resolve(JSON.parse(JSON.stringify({"type": "unknown",   "data" : "** Missing **"})));
					}
			}

		});
	// });
}



const replaceHashGM = async (manifest, spIndexStr, hsh) => {

	return new Promise((resolve, reject)=>{

			if (spIndexStr.length > 0){
				if (spIndexStr.length == 1){

					manifest[spIndexStr].hash = hsh;
					manifest[spIndexStr].seq = parseInt(spIndexStr[0]);
					resolve(manifest);

				}else{
					let manProm = replaceHashGM(manifest[spIndexStr[0]].manifest, spIndexStr.slice(1), hsh );
					manProm.then((man)=>{


						if (man.length > 0){
							manifest[spIndexStr[0]].manifest = man;
							delete manifest[spIndexStr[0]].hash;

						}else{
							delete manifest[spIndexStr[0]].manifest;
						}
						 
						resolve(manifest);
					});
					
				}
				
				
			}else{
				resolve(manifest);
			}

	});

}

const assignHashValue = async (tabId, indexStr, index, hash) => {

	return new Promise((resolve, reject)=>{


	
			let tabInfo = tabMap.get(tabId);
			let genMan = tabInfo.gen_man;

			
			if (indexStr == 'A'){
				genMan[index].hash = hash;
				genMan[index].seq = index;
				tabInfo.gen_man = genMan;
				tabInfo.ext_counter--;
				tabMap.set(tabId, tabInfo);
				resolve();
			}else{
				indexStr += `-${index}`;
				let spIndexStr = indexStr.split("-");
				
				if (spIndexStr[0] == 'A'){
					spIndexStr = spIndexStr.slice(1);
				}
				let manProm = replaceHashGM(genMan[spIndexStr[0]].manifest, spIndexStr.slice(1), hash);
				manProm.then((man)=>{

				
						genMan[spIndexStr[0]].manifest = man;
						tabInfo.gen_man = genMan;
						tabInfo.ext_counter--;
						tabMap.set(tabId, tabInfo);
						resolve();
				});
			}

	});

		

}





const appendLinks2IframeMan = async (manifest, spIndexStr, links) => {


	if (spIndexStr.length > 0){
		let man;
		if(spIndexStr.length == 1){

			man = manifest[spIndexStr[0]].manifest;
			man = append2List(man, links);
			

		}else{
			man = await appendLinks2IframeMan(manifest[spIndexStr[0]].manifest, spIndexStr.slice(1), links );
		}
		if (man.length > 0) {
			manifest[spIndexStr[0]].manifest = man;
			delete manifest[spIndexStr[0]].hash;
		}else{
			delete manifest[spIndexStr[0]].manifest;
		}
		return manifest;
		
	}else{
		return manifest;
	}

}

	


const sendMessage2FrontForLinks = (tabId, frameId, scrL) => {

	return new Promise((resolve, reject)=>{

		if (frameId == DEFAULT_FRONTEND_ID){
			resolve([]);
		}else{

			if (frameId != ''){

			

				chrome.tabs.sendMessage(tabId, {action: "getLinks", /*frameId: frameId,*/ /*frontend_id: frontend_id,*/ data: scrL  }, {frameId: frameId}, (response) => {

							resolve(response.data);


				});
			}else{
				resolve([]);
			}
		}

	});



}


