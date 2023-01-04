const EventEmitter = require('events');

class CustomEmitter extends EventEmitter {};

const parallelEvalResultReceived = new CustomEmitter();

const evl = require('./eval');

const Lock = require('./mutex');


exports.filterStaticContent = (list) => {
		return list.filter(function(e){
				return e.hasOwnProperty('dynamic') && !e.dynamic
		});
}
exports.filterDynamicContent = (list) => {
		return list.filter(function(e){
				return e.hasOwnProperty('dynamic') && e.dynamic
		});
}


exports.assignDefault2Results = (len) => {
	let list = [];
	for(let i = 0; i < len; i++ ){
		list[i] = '-5';
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

// const print = (r) => {
// 	for (let i = 0; i < r.length; i++){
// 			if (Array.isArray(r)){
// 				print(r);
// 			}else{
// 				console.log(r);
// 			}
// 	}
// }


const delegatedResult = async (tabId, degree, newmsg ) => {

	lock = acquireLock(tabId);

	lock.hold(async ()=>{
		tabInfo = evl.tabMap.get(tabId);

		// console.log("tabInfo.results::", tabInfo.results);

		// console.log("degree:", degree);

		// console.log("newmsg::", newmsg);
		
		let res = await delegatedContentRes(tabInfo.results, degree, newmsg, degree);


		// for (let i = 0; i < res.length; i++){
		// 	let r = res[i];
		// 	console.log(r);
		// 	// if (Array.isArray(r)){
		// 	// 	print(r);
		// 	// }else{
		// 	// 	console.log(r);
		// 	// }
		// }

		tabInfo.results = res;
		evl.tabMap.set(tabId, tabInfo);
		
		// console.log(`Final results:: ${res}`);
		// applyResults2Browser(tabId, res);	
		lock.release(tabId);
		
	});
}


const acquireLock = (tabId) => {
		tabInfo = evl.tabMap.get(tabId);
		if (tabInfo != undefined){


			if (tabInfo.results_label == null || tabInfo.results_label == false){
				
				let lock = new Lock(tabId, 1);

				tabInfo.results_buffer = lock;
				tabInfo.results_label = true;

				evl.tabMap.set(tabId, tabInfo);
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
// this.addEventListener('parallelEvalResultReceived', async (e) => {

	
// 		degree = e.detail.degree;
// 		newmsg = e.detail.data;
		
// 		delegatedResult(e.detail.tab, degree, newmsg);

// });

parallelEvalResultReceived.on('parallelEvalResultReceived', (e) => {
  		degree = e.detail.degree;
		newmsg = e.detail.data;
		
		delegatedResult(e.detail.tab, degree, newmsg);
});

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

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
    			return ['-1'];
    		}
    	}else{
    		return ['-1'];
    	}
    }
}




exports.compareInBackground  = async (tabId, ac, frame, man, d, index) => {

		if (man.trust == 'assert'){
			//Method-1 : checking from the manifest of the iframe 
			if (man.manifest != undefined && man.manifest.length > 0){
				//the acL inside the iframe will be checked against the manifest attribute of the man

				if (frame.acL != undefined && frame.acL.length > 0){

					compareInBackgroundWManifest(tabId, ac, frame, man.manifest, d, index, man/*, true, ''*/);
					

				}else{
					

					let newFrameInfoEventHandler = (e) => {

			              compareInBackgroundWManifest(tabId, ac, e.detail.frame, man.manifest, d, index/*, true, ''*/);

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
					return await this.mismatchStrIframe(ac.seq, ac.src, "Manifest error: either a manifest or a hash attribute must be given for iframe, if trust is assert"); 
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
									// var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : d } });
									// self.dispatchEvent(event);

									parallelEvalResultReceived.emit('parallelEvalResultReceived', { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : d } } );
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
					// var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : d } });
					// self.dispatchEvent(event);
					parallelEvalResultReceived.emit('parallelEvalResultReceived', { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : d } } );

				
			}else{

				if (frame.sig_ver ){
					compareInBackgroundWManifest(tabId, ac, frame, frame.manL, d, index, man);
				}else{
					
					let msg = `AC-${ac.seq}. ${ac.src} manifest signature not verified`;
					// var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : d } });
					// self.dispatchEvent(event);

					parallelEvalResultReceived.emit('parallelEvalResultReceived', { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : d } } );
				}

			}
			return d;
		}
}





const compareScriptInBackground = async (tabId, ac, man, delIndex, degree) => {

	let lock = acquireLock(tabId);

	lock.hold(async () => {

		let tabInfo = evl.tabMap.get(tabId);
		let delScr = tabInfo.delegated_script_manifests[delIndex];

		let h1 = delScr[ac.hash.substring(0,6).toLowerCase()];

		let h = ac.hash.substring(0,6).toLowerCase() + h1.substring(6, h1.length);//replace uppercase SHA256 with lowercase sha256

		if (ac.hash == h){
			// var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': '-1', 'degree' : degree } });
			lock.release(tabId);
			// self.dispatchEvent(event);

			parallelEvalResultReceived.emit('parallelEvalResultReceived', { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': '-1', 'degree' : degree } } );

		}else{
			let msg = `AC-${ac.seq}. Delegated script ${ac.src} - hash mismatch`;
			// var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : degree } });
			lock.release(tabId);
			// self.dispatchEvent(event);

			parallelEvalResultReceived.emit('parallelEvalResultReceived', { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : degree } } );
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
				

				// var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': sbxres, 'degree' : degree } });
				lock.release(tabId);
				// self.dispatchEvent(event);
				parallelEvalResultReceived.emit('parallelEvalResultReceived', { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': sbxres, 'degree' : degree } } );
			}else{
				
				let msg = `AC-${ac.seq}. Iframe ${ac.src} - document hash mismatch`;
				// var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : degree } });
				lock.release(tabId);
				// self.dispatchEvent(event);

				parallelEvalResultReceived.emit('parallelEvalResultReceived', { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : degree } } );
			}

		}else{
			//we dont wait for an event like above; because there is no way the document will be delivered later
			 
			let msg = `${ac.src} - document was missing in ACL`;
			// var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : degree } });
			lock.release(tabId);
			// self.dispatchEvent(event);

			parallelEvalResultReceived.emit('parallelEvalResultReceived', { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : degree } } );
		}
		

	});
}

// const withoutNested = (array, what) => {
// 	let ctrl = false;
// 	let res = what;
// 	let res2 = [];
// 	for (let i = 0; i < array.length; i++){
// 		let ar = array[i];
// 		if (ar.length > 1){
// 			ar = withoutNested(ar, what);
// 			console.log(ar);
// 			if (res2.length > 0){
// 				res2.push(ar);
// 			}else{

// 				continue;
// 			}
// 		}else{
// 			console.log(ar);
// 			if (ar == '-1'){
// 				if (!ctrl){
// 					res = ar;
// 					ctrl = true;
// 				}else{
// 					continue;
// 				}
// 			}else{
// 				// res = withoutInline(res, what);
// 				res2.push(ar);
// 			}
// 		}
		
// 	}
// 	if (res2.length > 0) {
		
// 		return res2;
// 	}else{
// 		return res;
// 	}

// }

// exports.without = (array, what) => {
// 	console.log("Array1:", array);
// 	for (let i = 0; i < array.length; i++){
// 		let ar = array[i];

		

// 		if (ar.length > 1){
// 			ar = withoutNested(ar, what);
// 			array[i] = ar;
			
// 		}else{
// 			console.log(ar);
// 		}
// 	}

// 	// return array;
// 	// console.log("Array2:", array);
// 	return array;
// }


// exports.without = (array, what) =>{
//     // console.log('array::', array);
//     return array.filter(function(element){ 

//     	if (element.length > 1){
//     		return without(element, what);
//     	}else {
//     		return element != what;
//     	}
        
//     });

// }

const evalResult = (results, what) => {

	results2 = results.flat(Infinity);

	for (let i = 0; i < results2.length; i++){
		let result = results2[i];
		if (result == '-1'){
			continue;
		}else{
			return false;
		}
	}
	return true;
}

//delegated content : compare in parallel
const compareInBackgroundWManifest = async (tabId, ac, frame, manL, degree, index, man/*, trustAssert, sxgLink*/) =>{

		tabInfo = evl.tabMap.get(tabId);
		frames_info = tabInfo.frames_info;

		let lock = acquireLock(tabId);

		lock.hold(async () => {
		
			let results = await evl.measurement( tabId, frame.acL, manL, degree, frames_info, false );
			// results = results.flat(Infinity);
			// console.log("R::", results);
			frame.first_round_measured = true;
			frames_info[index] = frame;
			tabInfo.frames_info = frames_info;
			evl.tabMap.set(tabId, tabInfo);

			// console.log("R::", results);
			// console.log("E:", evalResult(results, ['-1']));

			if (!evalResult(results, ['-1'])){

				// console.log("Here", degree);

				if (man.sandbox != undefined && ac.sandbox != undefined){
					let sbxres = await compareSandboxAttr(ac.seq, man.trust, ac.sandbox, man.sandbox);
					
					if (sbxres.toString() != ['-1'].toString()){
						
						results.push([sbxres]);
					}
					
				}

				// console.log(results);

				// var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': results, 'degree' : degree } });
				// self.dispatchEvent(event);

				// console.log("degree: ", degree, " results:", results);

				parallelEvalResultReceived.emit('parallelEvalResultReceived', { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': results, 'degree' : degree } } );

			}else{
				
			
				let sbxres = ['-1'];

				if (man.sandbox != undefined && ac.sandbox != undefined){
					// console.log("Here3");
					sbxres = await compareSandboxAttr(ac.seq, man.trust, ac.sandbox, man.sandbox);
					
				}
				// console.log(man.sandbox);
				// console.log(ac.sandbox);
				// console.log("sbxres degree: ", degree, " sbxres:", sbxres);
				
				// var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': sbxres, 'degree' : degree } });
				// self.dispatchEvent(event);

				parallelEvalResultReceived.emit('parallelEvalResultReceived', { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': sbxres, 'degree' : degree } } );

				
			}
			lock.release(tabId);
		});

		
}



//Mismatch messages

exports.mismatchStrInline = (seq, msg) => {

	return `AC-${seq}. Inline script. ${msg}`;
}

exports.mismatchStrExternal = (seq, src, msg) =>{
	if(src != null && src != undefined){
		return `AC-${seq}. External script src='${src}'. ${msg}`;
	}else{
		return `AC-${seq}. External script. ${msg}`;
	}
}

exports.mismatchStrIframe = (seq, src, msg) =>{
	if(src != null && src != undefined){
		return `AC-${seq}. Iframe src='${src}'. ${msg}`;
	}else{
		return `AC-${seq}. Iframe. ${msg}`;
	}
}

exports.mismatchStrIframeContent = (seq, src, results) => {

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



