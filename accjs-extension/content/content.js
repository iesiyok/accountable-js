
let frontend_id = DEFAULT_FRONTEND_ID;

let iframeSrcList = [];
let respondedIframeList = [];
let frontIdList = [];

let possibleRedirectIframe = [];


window.onmessage = (e) => {

      if (e.data.from == msgLabels.ACCJS_FROM_PARENT && e.source == window.parent){
            frontend_id = e.data.frontend_id;
            
            e.source.postMessage({"from": msgLabels.ACCJS_FROM_LEAF_RESPONSE, 
            				"front_id" : frontend_id, "acclist" : active_cont_list, 
            				"outerHTML": document.documentElement.outerHTML }, "*");
            //sending the acclist and outerhtml to the parent, just in case the frame redirected
            
            // var event = new CustomEvent("frontend_id_assigned", {});
		    // self.dispatchEvent(event);
      }
      if (e.data.from == msgLabels.ACCJS_FROM_LEAF){
      	
      		iframeSrcList.push(e.data.src);
      		let event = new CustomEvent(msgLabels.IFRAME_HELLO_RECEIVED, {detail: {src: e.data.src }});
		    self.dispatchEvent(event);
      }
      if (e.data.from == msgLabels.ACCJS_FROM_LEAF_RESPONSE){
      		respondedIframeList.push(e.data.front_id);
      		
      		ind_x = frontIdList.indexOf(e.data.front_id);
      		frontIdList.splice(ind_x, 1);
      		
      		var event = new CustomEvent(`${msgLabels.IFRAME_RESPONSE_RECEIVED}_${e.data.front_id}`, {detail: {acclist: e.data.acclist, outerHTML: e.data.outerHTML }});
		    self.dispatchEvent(event);
      }

	      
}

if (window != top){
	
	try{

		if (window.location.href != '' && window.location.href != 'about:blank' ){

				window.parent.postMessage(
					{ "from" : msgLabels.ACCJS_FROM_LEAF, 
					  "src" : window.location.href
                        }, "*" );
		}

	}catch(e){
		console.log("message couldnt be sent to the parent iframe ::", e);
	}
}



let page_loaded = false;
var active_cont_list = [];
let timer = 12;
let time;
let sent2Background = false;
let lastUrl = window.location.href.split('?')[0].replace(/\/$/, ''); 
let urlChanged = false;
let metaMap = new Map();

let fResponseTimer = 12;
let fResponseTime;
let frameAddedFlag = false;

let dynamicContentFlag = false;


let linkSend2Extension = false;

//Mutation observer, filters all changes and tries to find executables
try{
    const observer = new MutationObserver((mutations) => {
		let url = window.location.href.split('?')[0].replace(/\/$/, '');
		if (url !== lastUrl) {
			urlChanged = true;
			lastUrl = url;
			sent2Background = false;


			setTimeout(function(){
				locationHrefChanged(lastUrl)
			}, 700);
			
		}
        for (const m of mutations) {

			  
            for (const n of m.addedNodes) {
            	
                if (n instanceof Element ){
                        try {
                        	//we will check the current progress status before filtering the new content
                            window.onbeforedispatch(n/*, /*page_loaded, 'addedNode'*/);
                        } catch (err) {
                            console.error('MutationObserver dispatch error :: ', err);
                        }
                }else{


                	window.onbeforedispatchSubtree(n);
                	

                	
                }
            }
            for (const n of m.removedNodes) {
                if (n instanceof Element ){
                        try {

                            let resProm = removedContent(window, n, []);
                            resProm.then(async (res) =>{
								// if (res != '-1'){

								if (res != ACTIVE_ELEMENT_NOT_FOUND && res.length > 0 ){

									
									let prevEl = m.previousSibling;
									let tar = [];
									if (prevEl != null){
										tar = await find_target(prevEl);
										tar.unshift('0');
										
									}else{
										tar = await find_target(m.target);
										tar.unshift('1');
									}
									let target = await reverse_target(tar.reverse());
									if (active_cont_list != undefined && active_cont_list.length > 0){

										for(let i = 0; i < res.length; i++){
											let xres = res[i];
											let inds = await find_content_by_target(active_cont_list, xres, target);
											//console.log("ind = ", inds);
											inds = await without(inds, "-1");
											if ( inds.length > 0){



												for (let j = 0; j < inds.length; j++){

													let ind = inds[j];

													if (isNaN(ind)){
														console.log("ERROR: Content removed indice not a number: ", ind);
													}else{
														if (active_cont_list[ind] != undefined){

															console.log(`${ind} Removed content:: ${active_cont_list[ind].type} frontend_id::${active_cont_list[ind].frontend_id}`);

															if (active_cont_list[ind].type == 'iframe'){
																ind_x = frontIdList.indexOf(active_cont_list[ind].frontend_id);
					      										frontIdList.splice(ind_x, 1);
															}
															
					      									// active_cont_list.splice(ind, 1);
					      									active_cont_list[ind].persistent = false;
					      									active_cont_list[ind].dynamic = true;
					      									console.log(frontend_id + " - " + window.location.href + ", after remove ACL :", active_cont_list);
					      									if (sent2Background){

					      										chrome.runtime.sendMessage({
										                          action: evLabels.ACTIVE_CONT_REMOVED,
										                          data: ind,
										                          frontend_id: frontend_id
										                		});

					      									}
					      								}else{

					      									console.log("Some item removed but cannot be found in the acL");

					      								}

													}
												}

											}else{
												console.log("Removed content cannot be found in the ACL");
											}
										}

										

									}else{
										console.log("Active content list is empty, the content scripts might be invalidated");

									}
									
									

								}else{
									// console.log(`some item removed ${n.outerHTML}`);
								}
							});
                        } catch (err) {
                            console.error('MutationObserver dispatch error :: ', err);
                        }
                   
                }
            }


            
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });

}catch(err){
    console.log('MutationObserver error :: ', err);
}
window.onbeforedispatchSubtree = async (ac) => {



	let target = await find_target(ac);
	target = await deleteFirstElementFromTarget(target)
    target = await reverse_target(target.reverse());

    let elIndex = find_target_in_acclist(target);

    if (elIndex != undefined && elIndex != ACTIVE_ELEMENT_NOT_FOUND){

    	if (!sent2Background){
			
			dispatchExistingAC(elIndex, ac);

    	}else{
    		console.log('Some textcontent element changed after dispatch');
    	}
    	
    }

}

const find_target_in_acclist = (target) => {
	// ac = '-1';
	for (let i=0; i < active_cont_list.length; i++){
		ac = active_cont_list[i];
		if (arrayEquality(ac.target, target)){
			return i;

		}
		if (i == active_cont_list.length - 1){
			return ACTIVE_ELEMENT_NOT_FOUND;
		}

	}
}



window.onbeforedispatch = (ac /*, pl, opType*/) => {

	//if the first batch has already been sent to the background script, 
	//then the new content info will be sent to the background individually
	//actually maybe we should wait for some time, if the locationHref changed then we can send another batch

	let resProm = dispatch(window, active_cont_list.length, ac, dynamicContentFlag);
	resProm.then(async (res) =>{
		if (res != ACTIVE_ELEMENT_NOT_FOUND){
				if (res.type == 'iframe'){



		        	var event = new CustomEvent(msgLabels.NEW_IFRAME_ADDED, { detail: {"frontend_id" : res.frontend_id, "window": res.window, "src" : res.src }});
		    		self.dispatchEvent(event);
		        }

				if (res.event_handler && res.event_handler != EVENT_HANDLER_NOT_FOUND ){
		        	let eh = res.event_handler;
		        	res.event_handler = null;
					active_cont_list.push(res);
					active_cont_list.push(eh);
		        }else{
		        	active_cont_list.push(res);
		        }

				if (sent2Background){

	    			if (res.type == 'iframe' ){
	    				res = await res.iframe_serial(res);
	    			}
	    			res = await res.serialise(res);

	    			chrome.runtime.sendMessage({
                          action: evLabels.NEW_CONTENT,
                          data: res,
                          frontend_id: frontend_id
                	});


				}
				

		}
		
	});
	
}


document.onreadystatechange = function(e){



    if (document.readyState === 'complete'){



        let metaTags = document.getElementsByTagName("meta");
	   	let ml = Array.from(metaTags).filter(meta => meta.name.indexOf(x_acc_header) > -1);

	    if (ml.length > 0){
	    	for (let i = 0; i < ml.length; i++){
				let tag = ml[i].content;
				let cs = tag.split(',');
				if (cs.length > 1){
					let url = cs[0].split('=')[1].replace(/\/$/, '');
					let sxg = cs[1].split('=')[1];
					metaMap.set(url, sxg);
				}else{
					console.log("some x-acc-js-link meta tags dont comply with the protocol");
				}
			}
	    }

	   	    
    }
};




window.onload = function(){

		callProgressTimer();

}

function callProgressTimer(){
		dynamicContentFlag = true;
    	

		let sxgLink = metaMap.get(lastUrl);
		sendMetaLink(frontend_id, sxgLink);
		
		page_loaded = true;
		acLCheckProgressTimer();
}



self.addEventListener(msgLabels.NEW_IFRAME_ADDED, (e) => {

	if (e.detail.src == undefined || e.detail.src == '' || e.detail.src == 'about:blank' ){

			//these guys won't respond to messages, so we sent their dummy acl and outerhtml to the background from their parent
			//TODO:// but the problem is the frame_id and the parent_frame_id can be confused in the background
			let ohtml = "";

			if (e.detail.window){
				ohtml = e.detail.window.document.documentElement.outerHTML;
			}

			chrome.runtime.sendMessage({
                              action: evLabels.EMPTY_IFRAME_ACTIVE_CONT_LIST,
                              outerHTML: ohtml,
                              frontend_id: e.detail.frontend_id,
                              // data: []
            });
			
	}else{

		//when a new iframe added we wait for 200ms, then we send the frontend_id
		//if its accjs_from_leaf message has already arrived we don't wait

		if (respondedIframeList.includes(e.detail.frontend_id)){
			console.log("The communication was succeeded with iframe ::", e.detail.frontend_id);
		}else{


			if (e.detail.window != undefined && e.detail.window != null){

				//number of iframes increase here

				let ifIncludes = iframeSrcListIncludes(iframeSrcList, e.detail.src);

				if (/*iframeSrcList.includes(e.detail.src)*/ifIncludes ){
					sendFrontEndId(e.detail.frontend_id, e.detail.window);
				}else{

						

						  let iframeHelloInfoEventHandler = (e1) => {
				              if (compareTwoURLS(e.detail.src, e1.detail.src) /*e.detail.src == e1.detail.src*/){
								sendFrontEndId(e.detail.frontend_id, e.detail.window);
								self.removeEventListener(msgLabels.IFRAME_HELLO_RECEIVED, iframeHelloInfoEventHandler, false);
							  }

				              
				          }

				          self.addEventListener(msgLabels.IFRAME_HELLO_RECEIVED, iframeHelloInfoEventHandler);

				}

				iframeResponse(e.detail.frontend_id, e.detail.src);


			}else{
				console.log("Iframe window is null, so the frontend_id cannot be sent");
			}

		}
	

	}


});


function iframeResponse(front_id, src){

	let responded = false;

	let accList = [];
	let outerHTML = "";


	let iframeRespEventHandler = (e) => {
              responded = true;
			  accList = e.detail.acclist;
			  outerHTML = e.detail.outerHTML;

              self.removeEventListener(`${msgLabels.IFRAME_RESPONSE_RECEIVED}_${front_id}`, iframeRespEventHandler, false);
    }

    self.addEventListener(`${msgLabels.IFRAME_RESPONSE_RECEIVED}_${front_id}`, iframeRespEventHandler);


	setTimeout(()=>{

			if (!responded){
				self.removeEventListener(`${msgLabels.IFRAME_RESPONSE_RECEIVED}_${front_id}`, iframeRespEventHandler, false);
				console.log("Frame : ", front_id, " didnt respond src::", src);
			}
			else{

				

			}

	}, 800);



}


function acLCheckProgressTimer() {
    timer--;
    clearTimeout(time);
    time = setTimeout(acLCheckProgress, 200);    
}


function acLCheckProgress() {

	if (window != top){

		if (frontend_id == DEFAULT_FRONTEND_ID){
			if (timer > 0){
				acLCheckProgressTimer();
			}else{
				console.log('The top frame hasnt sent any messages for creating the frame id, ', window.location.href, " parent.top? ", window.parent == top);
				console.log("ACL :: ", active_cont_list);

			}
		}else{
			sent2Background = true;
			send2Extension();
		}

	}else{

		sent2Background = true;
		send2Extension();

	}
	
}

async function send2Extension(){
	active_cont_list = await refresh_list(active_cont_list);
	let list = await serialise_list(active_cont_list, false);
	if (window == top){
		console.log("Top Window ACL::", list);
	}else{
		console.log(window.location.href + ` Iframe_${frontend_id} ACL::`, list);
	}

	chrome.runtime.sendMessage({
                              action: evLabels.CONT_LIST,
                              outerHTML: document.documentElement.outerHTML,
                              frontend_id: frontend_id,
                              data: list
                        });
	
}

function sendFrontEndId(id, win) {

	try{

		win.postMessage({ "frontend_id" : id, 
                                "from" : msgLabels.ACCJS_FROM_PARENT
                        }, "*" );

	}catch(e){
		console.log("message couldnt be sent to the iframe ::", e);
	}

}

//this is used to undestand if the page is refreshed, especially needed for SPA sites
function observe_performance_data() {

  var entries = performance.getEntriesByType("navigation");

  if (entries[0].type == 'reload'){

  		console.log("The site is refreshed");

  		chrome.runtime.sendMessage({
                              action: "site_refresh"
                        });

  }

}

if (window == top){
	observe_performance_data();
}

function locationHrefChanged(changedUrl){


	let sxgLink = metaMap.get(lastUrl);
	
		if (sxgLink != undefined){

			sendMetaLink(frontend_id, sxgLink);

		}else{

			//this will delete all the stuff in the tabInfo in background

			chrome.runtime.sendMessage({
                          action: evLabels.LOCATION_HREF_CHANGED,
                          frontend_id: frontend_id
	            	});

		}

	sent2Background = false;


	timer = 10;

	acLCheckProgressTimer();


}

