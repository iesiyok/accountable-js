

const MainFrameInfo = require('./tab_info');

const consts = require('./consts');
const helpers = require('./eval_helpers');

const CryptoJS = require('../ext/crypto-js');


let tabMap = new Map();

let tabInfo = MainFrameInfo.sigVerMsgInstance(false, false, '', false, '', 
		            'tabCreated', 'Uncomplying', 'img/grey-16.png', false );

tabMap.set('123', tabInfo);

exports.tabMap = tabMap;

exports.setACLManL = (acL, manL, frames_info) => {
	tabInfox = tabMap.get('123');
	tabInfox.acL = acL;
	tabInfox.manL = manL;
	tabInfox.frames_info = frames_info;

	tabMap.set('123', tabInfox);

}

const print = (results) => {

	results2 = results.flat(Infinity);

	for (let i = 0; i < results2.length; i++){
		let result = results2[i];
		console.log(result);
	}
	
}


exports.returnResult = () => {


	return new Promise((resolve, reject) => {
        
        setTimeout(() => {

			tabInfo = tabMap.get('123');
			let res = tabInfo.results;
			// res = 
			// console.log("RAW::", res);
			// res = helpers.without(res, '-1');
			print( res);
			// console.log("REsult::", res);
			resolve(res);


		}, 500);
    });
	
}


exports.measurement = async ( tabId, acList, manList, degree, frames_info, topLevel) => {

	if (acList && manList) {

		let resultList = helpers.assignDefault2Results(acList.length);

		let statAcL  = 	helpers.filterStaticContent(acList);
		let statManL = 	helpers.filterStaticContent(manList);
			
		resultList = await compareStatic(tabId, statAcL, statManL, degree, frames_info, topLevel, resultList ) ;
		
		// console.log("Static:: ", resultList);
	
		let dynAcL  = 	helpers.filterDynamicContent(acList);
		
		if (dynAcL.length > 0){
			let dynManL = 	helpers.filterDynamicContent(manList);
			
				resultList = await compareDynamic(tabId, dynAcL, dynManL, degree, frames_info, topLevel, resultList ) ;
				
				return resultList;	
			
			
		}else{
			return resultList;
		}
		

	}else{

		if (acList == undefined){
			return [["Active content list is undefined."]];
		}else if (manList == undefined){
			return [["Manifest is undefined."]];
		}

	}

	
}

const compareStatic = async (tabId, statAcl, statManL, degree, frames_info, topLevel, resultList) =>{
	
	for(let i = 0; i < statAcl.length; i++){
		let ac = statAcl[i];
		let man = statManL[i];
		if (man != undefined){


			let com = await compareTypesAndLinks(ac, man);

			if (com){
				
				let evalRes = await compare(tabId, ac, man, degree, frames_info);
				resultList[ac.seq] = evalRes;
			}else{

				let msg = [`AC-${ac.seq} Either the 'type' or the 'link' does not match with the manifest`];
			
				resultList[ac.seq] = msg;
			}
			
		}else{
			let msg = [`AC-${ac.seq}. Either a static content is declared with 'dynamic' attribute in the manifest or not declared at all`];
			resultList[ac.seq] = msg;
		}
		if (topLevel){

			let tabInfo = tabMap.get(tabId);
			tabInfo.results = resultList;
			tabMap.set(tabId, tabInfo);

		}
		if (i == statAcl.length-1){
			return resultList;
		}
	}
}

const compareDynamic = async (tabId, dynAcL, dynManL, degree, frames_info, topLevel, resultList) => {

	for(let i = 0; i < dynAcL.length; i++){

		let ac = dynAcL[i];

		let manL = dynManL.filter(e => {
				if (ac.type == e.type){

					if (ac.type == 'external' || ac.type == 'local' ){
						if (ac.link == e.link ){
							return true;
						}else{
							return false;
						}
					}else if (ac.type == 'iframe'){
						if (ac.src == undefined && e.src == undefined){
							return true;
						}else{

							if (ac.src == e.src){
								return true;
							}else{
								return false;
							}
						}
					}else{
						
						return true;
					}

				}else{
					return false;

				} 
			}
		);

		if (manL.length > 0){
			let man = manL[0];
			let evalRes = await compare(tabId, ac, man, degree, frames_info);
			resultList[ac.seq] = evalRes;
			

		}else{

			let msg = [`AC-${ac.seq} Unknown dynamic content, type:: ${ac.type} `];
			resultList[ac.seq] = msg;

		}
		if (topLevel){

				let tabInfo = tabMap.get(tabId);
				tabInfo.results = resultList;
				tabMap.set(tabId, tabInfo);

		}
		if (i == dynAcL.length-1){
			return resultList;
		}
	}

}



const compareTypesAndLinks =  (ac, man) =>{

	if(ac.error){
		return false;
	}else{
		if (man.type == ac.type ){
			switch(man.type){
				case 'external': 
					if (man.link == ac.link){
						return true;
					}else{
						return false;
					}
				case 'local':
					if (man.link == ac.link){
						return true;
					}else{
						return false;
					}
				case 'iframe':
					
						if (man.src == ac.src){
							return true;
						}else{
							return false;
						}
					
				default:
					return true;
					
			}
		}else {
			return false;
		}
	}

}


const compare = async (tabId, ac, man, degree, frames_info) =>{

	if (ac && man){

		if (man.type == 'event_handler' || man.type == 'inline'){

			return [await compareInline(ac, man)];

		}else if (man.type == 'local' || man.type == 'external' ){

			return [await compareExternal(tabId, ac, man, degree)];
			
		}else if (man.type == 'iframe'){
			
			return [await compareIframe(tabId, ac, man, degree, frames_info)];

		}else{
			if(man.hasOwnProperty('seq')){
				return [`AC-${ac.seq}. Unknown declaration, type:: ${man.type} `];
			}else{
				return [`AC-{}. Unknown declaration.`];
			}
			
		}			
	}else{

		if (ac){
			return [`AC-{}. Undeclared item, type :: ${ac.type}`];
		}else{
			return [`AC-{}. Undeclared item.`];
		}
	}

}

function sha256(data){
    return new Promise((resolve, reject) => {
        let hash = CryptoJS.SHA256(data);
        let x = "sha256-" +  hash.toString(CryptoJS.enc.Base64);
        resolve(x);
    });
    
}

const compareInline = async (ac, man) => {
		if (ac.error ){
			return await helpers.mismatchStrInline(ac.seq, "Error occurred while reading the script from HTML");
		}else{

			if (ac.script && man.hash){

				//if (man.hash == await window[man.hash.substring(0,6).toLowerCase()](ac.script)){
					//couldnt find a way to call function from string in service workers.
				let h = await sha256(ac.script);
				// console.log('hash:' , h );
				if (man.hash == await sha256(ac.script)){


			
					return '-1';
				}else{
					
	                return await helpers.mismatchStrInline(ac.seq, "Hash values mismatch.");
				}

			}else{
				return await helpers.mismatchStrInline(ac.seq, "Wrong declaration of inline script, an item is missing.");
			}

		}	

}

const compareExternal = async (tabId, ac, man, degree) => {

	if (ac.error){
		return await helpers.mismatchStrExternal(ac.seq, ac.link, "Error occurred while reading the script from HTML");
	}else{

		if(man.trust == 'blindtrust'){
			//sameorigin test
			if (sameOrigin(man.link, ac.link)){
				return '-1';
			}else{
				// return 'The source of the script in HTML is not in the same origin with whitelisted link';
				return await helpers.mismatchStrExternal(ac.seq, ac.link, "The source of the script in HTML is not in the same origin with whitelisted link" );
			}
			
		}else if(man.trust == 'assert' ){

			if (ac.hash == "-1"){

				return await helpers.mismatchStrExternal(ac.seq, ac.link, "Integrity(hash) attribute not found for this script.");
				
			}else{


				if (ac.link && man.link && ac.hash && man.hash){



					if (ac.link == man.link && ac.hash == man.hash ){
							//we cannot download and check the SRI for ourselves, because content-security-policy doesn't allow us to download it online
							return '-1';

					}else{
						//return mismatchStr(ac, man);
						return await helpers.mismatchStrExternal(ac.seq, ac.link, "Hash values mismatch.");
					}


				}else{
					//return mismatchStr(ac, man);
					return await helpers.mismatchStrExternal(ac.seq, ac.link, "Wrong declaration of trust value 'assert' in manifest, one of the items missing" );
				}
			}

		}else if (man.trust == 'delegate'){

			let tabInfo = tabMap.get(tabId);
			let delScrManL = tabInfo.delegated_script_manifests;

			let d = '';
			if (degree == '0'){
				d = `-2-${ac.seq}`;
			}else{
				d = `${degree}-${ac.seq}`;
			}

			let eventFired = false;

			let newScrInfoEventHandler = (e) => {
				eventFired = true;
				compareScriptInBackground(tabId, ac, man, e.detail.index, d);
				self.removeEventListener(`${evLabels.NEW_SCRIPT_INFO_ARRIVED}_${tabId}_${ac.link}`, newScrInfoEventHandler);
			}
			
			if (delScrManL != null){

				ds = delScrManL.filter(function(e){
					return e.src == ac.link
				});
				if(ds.length > 0){

					let delScr = ds[0];
					// let index = delScrManL.indexOf(delScr);

					if (delScr.sig_ver){

						let h = delScr[ac.hash.substring(0,6).toLowerCase()];
					
						if (ac.hash == h){
							return '-1';
						}else{
							return await helpers.mismatchStrExternal(ac.seq, ac.link, "Hash values mismatch.");
						}

					}else{
						return await helpers.mismatchStrExternal(ac.seq, ac.link, "Signature not verified.");
					}

				}else{

					if (ac.persistent !=undefined && ac.persistent == false){

						setTimeout(()=>{

							if (!eventFired){

								let lock = acquireLock(tabId);

								lock.hold(async () => {

									let msg = `AC-${ac.seq}. Non-persistent content was delegated but it is removed before Acc-js evaluation. Hint either assert it or wait for evaluation before removing the content from DOM.`;
									var event = new CustomEvent(evLabels.PARALLEL_EVAL_RESULT, { "detail": {'tab': tabId, 'seq' : ac.seq, 'data': msg, 'degree' : d } });
									lock.release(tabId);
									self.dispatchEvent(event);
									self.removeEventListener(`${evLabels.NEW_SCRIPT_INFO_ARRIVED}_${tabId}_${ac.link}`, newScrInfoEventHandler);
								});

							}
							
						}, 1500);
						
					}
					// else{
					self.addEventListener(`${evLabels.NEW_SCRIPT_INFO_ARRIVED}_${tabId}_${ac.link}`, newScrInfoEventHandler);
					return d;
					
				}

			}else{
				self.addEventListener(`${evLabels.NEW_SCRIPT_INFO_ARRIVED}_${tabId}_${ac.link}`, newScrInfoEventHandler);
				return d;

			}


		}else{
			//return 'Unknown trust value in : ' + JSON.stringify(man);
			return await helpers.mismatchStrExternal(ac.seq, ac.link, "Unknown trust value declared in manifest");
		}

	}

}

const compareIframe = async (tabId, ac, man, degree, frames_info) => {

	if (ac.error){
		return await mismatchStrIframe(ac.seq, ac.src, "Error occurred while reading the iframe from HTML");

	}else{

		if (man.trust == 'blindtrust'){
				if (sameOrigin(man.src, ac.src)){

					let eq = await compareSandbox(ac.sandbox, man.sandbox || undefined);
					if (eq){
						
						return '-1';
					}else{
						//return 'The sandbox attribute of whitelisted iframe dont match with manifest';
						return await mismatchStrIframe(ac.seq, ac.src, "The sandbox attribute of whitelisted iframe dont match with manifest");
					}
				}else{
					return 'The source of the iframe in HTML is not in the same origin with whitelisted link';
				}
		}else if (man.trust == 'assert' || man.trust == 'delegate' || man.trust == 'sandboxed-delegate' ){

			if(man.src_type == undefined || man.src_type == 'link'){


							if (ac.src == man.src){

								let tabInfo = tabMap.get(tabId);
								let frames_info = tabInfo.frames_info;

								let d = '';
								if (degree == '0'){
									d = `-2-${ac.seq}`;
								}else{
									d = `${degree}-${ac.seq}`;
								}

								let newFrameInfoEventHandler = (e) => {
									
									helpers.compareInBackground(tabId, ac, e.detail.frame, man, d, e.detail.index);
									self.removeEventListener(`${evLabels.NEW_FRAME_INFO_ARRIVED}_${tabId}_${ac.frontend_id}`, newFrameInfoEventHandler);
								}

								if (frames_info != undefined && frames_info != null){

								
									fs = frames_info.filter(function(e){
										return e.frontend_id == ac.frontend_id
									});
									if(fs.length > 0){

										let frame = fs[0];
										let index = frames_info.indexOf(frame);
										return helpers.compareInBackground(tabId, ac, frame, man, d, index);

									}else{
										//frame is not found in the frames_info
										self.addEventListener(`${evLabels.NEW_FRAME_INFO_ARRIVED}_${tabId}_${ac.frontend_id}`, newFrameInfoEventHandler);
										return d;

									}

								}else{
										//frames_info was not set yet
										self.addEventListener(`${evLabels.NEW_FRAME_INFO_ARRIVED}_${tabId}_${ac.frontend_id}`, newFrameInfoEventHandler);
										return d;

								}
								

							}else{
								return await mismatchStrIframe(ac.seq, ac.src, "Iframe links mismatch.");
							}

					

			}

			


		}else{
				//return "AC-" + man.seq + ". Iframe src='" + ac.src + ". Unknown trust value in : " + JSON.stringify(man);
				return await mismatchStrIframe(ac.seq, ac.src, "Unknown trust value declared for this iframe in the manifest");
		}

	}

}