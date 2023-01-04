
const filterStaticContent = (list) => {
		return list.filter(function(e){
				return e.hasOwnProperty('dynamic') && !e.dynamic
		});
}
const filterDynamicContent = (list) => {
		return list.filter(function(e){
				return e.hasOwnProperty('dynamic') && e.dynamic
		});
}


const assignDefault2Results = (len) => {
	let list = [];
	for(let i = 0; i < len; i++ ){
		list[i] = DEFAULT_EVAL_RESULT;
	}
	return list;
}

//refresh parallel content result, recursively
const recDelegatedContentRes = async (results, ds, newmsg, oldmsg) => {


	let ds_0 = parseInt(ds[0]);
	ds.shift();
	
	if (ds.length > 0){
			results[ds_0] = await recDelegatedContentRes(results[ds_0], ds, newmsg, oldmsg);
			return results;
		
	}else{


		if (results[ds_0]){
			
			results[ds_0] = newmsg;
			return results;
		}else{
			results = newmsg;
			
			return results;
		}
		
			
	}

	
}

//refresh parallel content result
const delegatedContentRes = async (results, degree, newmsg, oldmsg) => {

	let res = degree.substring(0, 2);

	if (res == '-2'){

		res = degree.substring(3, degree.length);
		let ds = res.split('-');
		
		let x = await recDelegatedContentRes(results, ds, newmsg, oldmsg );
		
		return x;

	}else{
		console.log('This shouldnt have happened #delegatedContentRes');
	}

}




const delegatedResult = async (tabId, degree, newmsg ) => {

	lock = acquireLock(tabId);

	lock.hold(async ()=>{
		tabInfo = tabMap.get(tabId);
		
		let res = await delegatedContentRes(tabInfo.results, degree, newmsg, degree);

		tabInfo.results = res;
		tabMap.set(tabId, tabInfo);
		
		console.log(`Final results:: ${res}`);
		applyResults2Browser(tabId, res);	
		lock.release(tabId);
		
	});
}


const acquireLock = (tabId) => {
		tabInfo = tabMap.get(tabId);
		if (tabInfo != undefined){


			if (tabInfo.results_label == null || tabInfo.results_label == false){
				
				let lock = new Lock(tabId, 1);

				tabInfo.results_buffer = lock;
				tabInfo.results_label = true;

				tabMap.set(tabId, tabInfo);
				return lock;

			}else{
				let lock = tabInfo.results_buffer;
				return lock;
			}

		}else{
			console.error(`TabID :: ${tabId} tabInfo is undefined..`);
		}

}

//eval result for the parallel measurement
self.addEventListener(evLabels.PARALLEL_EVAL_RESULT, async (e) => {

	
		degree = e.detail.degree;
		newmsg = e.detail.data;
		
		delegatedResult(e.detail.tab, degree, newmsg);

});


//compare sandbox attributes of iframe
const compareSandbox = async (acSb, manSb) => {

	if (acSb != undefined  && manSb != undefined){

		let acL = acSb.split(' ');
		let manL = manSb.split(' ');
		acL.sort();manL.sort();
		return await arraysEqual(acL, manL);

	}else{
		if (acSb == null && manSb == null){
			return true;
		}else{
			return false;
		}
	}
}

//compare sandbox attributes for the delegated iframe 
const compareSandboxedDelegate = (manSb) =>{

	//mustSandboxedDelegate
	let manL = manSb.split(' ');

	for (let i = 0; i < manL.length; i++){
		if (!mustSandboxedDelegate.includes(manL[i])){
			return false;
		}else{
			if(i == manL.length-1){
				return true;
			}
		}
	}

}

const compareSandboxAttr = async (seq, trust, ac_sbx, man_sbx) => {
	
	let eq = await compareSandbox(ac_sbx, man_sbx);

	if (!eq){
        return `AC - ${seq} content sandbox attribute doesn't match with the manifest ${trust} ac_sbx=${ac_sbx} .. man_sbx=${man_sbx}`;
    }else{
    	if (trust == 'sandboxed-delegate' ){

    		let eq2 = await compareSandboxedDelegate(man_sbx);

    		if (!eq2){
    			return [`AC - ${seq} sandboxed delegated content, sandbox attribute must be the strictest version possible : it can only include allow-scripts and allow-forms`];
    		}else{
    			return [CORRECT_EVAL_RESULT];
    		}
    	}else{
    		return [CORRECT_EVAL_RESULT];
    	}
    }
}




const compareInBackground  = async (tabId, ac, frame, man, d, index) => {

		if (man.trust == 'assert'){
			//Method-1 : checking from the manifest of the iframe 
			if (man.manifest != undefined && man.manifest.length > 0){
				//the acL inside the iframe will be checked against the manifest attribute of the man

				if (frame.acL != undefined && frame.acL.length > 0){

					compareInBackgroundWManifest(tabId, ac, frame, man.manifest, d, index, man/*, true, ''*/);
					

				}else{
					

					let newFrameInfoEventHandler = (e) => {

			              compareInBackgroundWManifest(tabId, ac, e.detail.frame, man.manifest, d, index, man/*, true, ''*/);

			              self.removeEventListener(`${evLabels.NEW_FRAME_INFO_ARRIVED}_${tabId}_${ac.frontend_id}`, newFrameInfoEventHandler, false);
			        }

			        self.addEventListener(`${evLabels.NEW_FRAME_INFO_ARRIVED}_${tabId}_${ac.frontend_id}`, newFrameInfoEventHandler);

				}
				return d;

				
			}else{
				//Method-2 : checking from the hash of the iframe 
				//entire outerHTML will be checked
				if (man.hash != undefined) {

					compareInBackgroundWHash(tabId, ac, frame, man, d, index);
					return d;

				}else{
					return await mismatchStrIframe(ac.seq, ac.src, "Manifest error: either a manifest or a hash attribute must be given for iframe, if trust is assert"); 
				}
			}
		}else{
			//man.trust == 'delegate' || man.trust == 'sandboxed-delegate'

			if (frame.sig_ver == null || frame.sig_ver == false){

							
				

							let newSxgAssignedEventHandler = (e) => {

								
								let manifest = e.manifest;
								if (manifest && manifest.response ){
									compareInBackgroundWManifest(tabId, ac, frame, manifest.manifest, d, index, man/*, false, frame.sxg_link*/);
								}else{
									// let msg = await mismatchStrIframe(ac.seq, ac.src, man );	
									let msg = `AC-${ac.seq}. ${ac.src} manifest signature not verified`;
									var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : d } });
									self.dispatchEvent(event);
								}
								//document.removeEventListener(`${evLabels.SXG_ASSIGNED}_${rnd}`, newSxgAssignedEventHandler);
							}

							if (frame.sxg_link && frame.sxg_link != '' ){

								
								let manifestProm = verifySXGSignature(frame.sxgLink);

								manifestProm.then(async (x) => {
									newSxgAssignedEventHandler(x.manifest);
								});
								

							

							}else{

								self.addEventListener(`${evLabels.FRAME_SXG_LINK_ASSIGNED}_${tabId}_${ac.frontend_id}`, async (e) => {

										
										let manifestProm = verifySXGSignature(frame.sxgLink);

										manifestProm.then(async (x) => {
											newSxgAssignedEventHandler(x.manifest);
										});

										
								});

							}

				let msg = `AC-${ac.seq}. ${ac.src} manifest signature not verified`;
					var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : d } });
					self.dispatchEvent(event);

				
			}else{

				if (frame.sig_ver ){
					compareInBackgroundWManifest(tabId, ac, frame, frame.manL, d, index, man);
				}else{
					
					let msg = `AC-${ac.seq}. ${ac.src} manifest signature not verified`;
					var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : d } });
					self.dispatchEvent(event);
				}

			}
			return d;
		}
}





const compareScriptInBackground = async (tabId, ac, man, delIndex, degree) => {

	let lock = acquireLock(tabId);

	lock.hold(async () => {

		let tabInfo = tabMap.get(tabId);
		let delScr = tabInfo.delegated_script_manifests[delIndex];

		let h1 = delScr[ac.hash.substring(0,6).toLowerCase()];

		let h = ac.hash.substring(0,6).toLowerCase() + h1.substring(6, h1.length);//replace uppercase SHA256 with lowercase sha256

		if (ac.hash == h){
			var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': '-1', 'degree' : degree } });
			lock.release(tabId);
			self.dispatchEvent(event);

		}else{
			let msg = `AC-${ac.seq}. Delegated script ${ac.src} - hash mismatch`;
			var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : degree } });
			lock.release(tabId);
			self.dispatchEvent(event);
		}

	});
}

const compareInBackgroundWHash = async (tabId, ac, frame, man, degree, index) => {


	let lock = acquireLock(tabId);

	lock.hold(async () => {

		if (frame.document != undefined){

			//compare hashes
			let h = await sha256(frame.document);

			if (man.hash == h){
				let sbxres = await compareSandboxAttr(ac.seq, man.trust, ac.sandbox, man.sandbox);
				

				var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': sbxres, 'degree' : degree } });
				lock.release(tabId);
				self.dispatchEvent(event);
			}else{
				
				let msg = `AC-${ac.seq}. Iframe ${ac.src} - document hash mismatch`;
				var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : degree } });
				lock.release(tabId);
				self.dispatchEvent(event);
			}

		}else{
			//we dont wait for an event like above; because there is no way the document will be delivered later
			 
			let msg = `${ac.src} - document was missing in ACL`;
			var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : degree } });
			lock.release(tabId);
			self.dispatchEvent(event);
		}
		

	});
}

const evalResult = (results, what) => {

	results2 = results.flat(Infinity);

	for (let i = 0; i < results2.length; i++){
		let result = results2[i];
		if (result == CORRECT_EVAL_RESULT){
			continue;
		}else{
			return false;
		}
	}
	return true;
}

//delegated content : compare in parallel
const compareInBackgroundWManifest = async (tabId, ac, frame, manL, degree, index, man/*, trustAssert, sxgLink*/) =>{

		tabInfo = tabMap.get(tabId);
		frames_info = tabInfo.frames_info;

		let lock = acquireLock(tabId);

		lock.hold(async () => {
		
			let results = await measurement( tabId, frame.acL, manL, degree, frames_info, false );
			frame.first_round_measured = true;
			frames_info[index] = frame;
			tabInfo.frames_info = frames_info;
			tabMap.set(tabId, tabInfo);

			if (!evalResult(results, [CORRECT_EVAL_RESULT])){

				if (man.sandbox != undefined && ac.sandbox != undefined){
					let sbxres = await compareSandboxAttr(ac.seq, man.trust, ac.sandbox, man.sandbox);
					
					if (sbxres.toString() != [CORRECT_EVAL_RESULT].toString()){
						
						results.push([sbxres]);
					}
					
				}

				

				var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': results, 'degree' : degree } });
				self.dispatchEvent(event);

			}else{

			
				let sbxres = [CORRECT_EVAL_RESULT];
				if (man.sandbox!=undefined && ac.sandbox!=undefined){
					sbxres = await compareSandboxAttr(ac.seq, man.trust, ac.sandbox, man.sandbox);
					
				}
				
				var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': sbxres, 'degree' : degree } });
				self.dispatchEvent(event);

				
			}
			lock.release(tabId);
		});

		
}



//Mismatch messages

const mismatchStrInline = (seq, msg) => {

	return `AC-${seq}. Inline script. ${msg}`;
}

const mismatchStrExternal = (seq, src, msg) =>{
	if(src != null && src != undefined){
		return `AC-${seq}. External script src='${src}'. ${msg}`;
	}else{
		return `AC-${seq}. External script. ${msg}`;
	}
}

const mismatchStrIframe = (seq, src, msg) =>{
	if(src != null && src != undefined){
		return `AC-${seq}. Iframe src='${src}'. ${msg}`;
	}else{
		return `AC-${seq}. Iframe. ${msg}`;
	}
}

const mismatchStrIframeContent = (seq, src, results) => {

		//let resStrList = `Delegated iframe, AC-${seq}, src: ${src} <->\n\n`;
		let resStrList = [];
		for(let i = 0; i < results.length; i++){

			let resStr = `* ${results[i]} \n`;
			//resStrList += resStr;
			resStrList.push(resStr);
			if (i == results.length-1){
				return resStrList;
			}
		}
}



