





const linkDispatch = async (wind_w, element, scrList) => {

	if ( element instanceof wind_w.HTMLElement && element.nodeName === "LINK") {

		if(scrList.includes(element.href)){
			return ACTIVE_ELEMENT_NOT_FOUND;
		}else{

			if ((element.as == 'script' ) ||  ((element.rel == 'prefetch' || element.rel == 'preload') 
				&& element.href.substr(element.href.length - 3) == '.js' )) {

				let _type = "external"; 
				let hash = DEFAULT_HASH_VALUE;

				if (element.integrity){
					hash = element.integrity;
				}

				return JSON.parse(JSON.stringify({"seq": -1, "type": _type, "name": "", "version": "", "link": element.href, "hash": hash, "dynamic": true, "trust": "assert" } ));

				


			}else{
				return '-1';
			}

		}

	}else{
		return '-1';
	}

}


const links2List = async (wind_w, element, list, scrList) =>{






	    let res = await linkDispatch(wind_w,  element, scrList);

		if (res != ACTIVE_ELEMENT_NOT_FOUND){
			list.push(res);
            
		}

		let chNodes = element.children;
		if (chNodes.length > 0 ){
			for (var item of chNodes){
				
				list = await links2List(wind_w, item, list, scrList);
			}
			return list;
				
		}
		else{
			return list;
		}

}



chrome.runtime.onMessage.addListener(async (request, sender, sendResponse)=>{

    if(request.action == "getLinks" /*&& request.frontend_id == frontend_id*/ ){

    	
			scrList = request.data;
    		doc = document.cloneNode(true);
        	links = await links2List(window, doc, [], scrList );
        	sendResponse({data: links/*, frontend_id: frontend_id*/});


    	
    }

});