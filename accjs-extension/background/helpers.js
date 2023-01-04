/**
 * Creates a listener for the sxgAssigned event
 */

function fetchActiveContentList(tabId){

    console.log('fetch ac tabId:',tabId);

    return new Promise((resolve) => {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if( request.event === evLabels.CONT_LIST 
                    && sender.tab.id === tabId )
                {
                        resolve(request.data);
                        
                }
        });

        setTimeout(function() {
            resolve(null);
        }, 5000);

    });
}


const retrieveManifestBySeq = async (manList, seq) => {

    for (let i = 0; i < manList.length; i++){
        let m = manList[i];
        if (m.seq == seq){
            return i;
        }else{
            if (i == manList.length - 1){
                return -1;
            }
        }
    }


}


function fetchSXGResponse(sxgUrl, rnd){
	return new Promise((resolve) => {


        let sxgAssignedEventHandler = (e) => {
              if (e.detail.sxgUrl && e.detail.sxgUrl == sxgUrl){
                resolve(e.detail);
              }

              self.removeEventListener(`${evLabels.SXG_ASSIGNED}_${rnd}`, sxgAssignedEventHandler, false);
          }

          self.addEventListener(`${evLabels.SXG_ASSIGNED}_${rnd}`, sxgAssignedEventHandler);


		setTimeout(function() {
            self.removeEventListener(`${evLabels.SXG_ASSIGNED}_${rnd}`, sxgAssignedEventHandler, false);
			resolve(null);
		}, 2980);

	});
}




/*** Looks for the 'x_acc_header'*/
function findAccjsHeader(headers){

    // return 'http://localhost:85/whatsapp/index.sxg';
    for(var i = 0; i < headers.length; i++){
        if(headers[i].name == x_acc_header ){
            return headers[i].value;
        }else{
            if (i == headers.length - 1){
                return '';
            }
        }
    }
    //return '';   
}

const getLinkArray = async(tabId)=>{

    let info = linkMap.get(tabId);
    if (info == undefined){return [];}
    else return info;

}

const addLink2Array = async (array, url, sxgLink) =>{

    if (array.length > 0){

        for(let i =0; i < array.length; i++){
            let info = array[i];
            if (url == info.url) {//update no matter what
                array.splice(i, 1);
                info = {'url': url, 'sxgLink' : sxgLink };
                array.push(info); 
                return array;
            }
            else {
                if (i == array.length-1){
                    info = {'url': url, 'sxgLink' : sxgLink };
                    array.push(info); 
                    return array;
                }
            }
        }

    }else{
        info = {'url': url, 'sxgLink' : sxgLink };
        array.push(info); 
        return array;
    }
    
    
}

const add2LinkMap = async (tabId, url, sxgLink ) =>{

    let array = await getLinkArray(tabId);
    array = await addLink2Array(array, url, sxgLink);

    linkMap.set(tabId, array);

}

const linkMapContainsUrl = async (tabId, url) => {

    let array = await getLinkArray(tabId);
    if (array.length > 0){

        for(let i =0; i < array.length; i++){
            let info = array[i];
            if (url == info.url) {
                return info.sxgLink;
            }else {
                if (i == array.length-1){
                    return null;
                }
            }
        }

    }else{
        return null;
    }
}


function fetchIframeSxgLink(tabId, url){


    return new Promise(async (resolve) => {
        
        let res = await linkMapContainsUrl(tabId, url);

        if (res == null){

            self.addEventListener(evLabels.IFRAME_ACCJS_LINK_RECEIVED, async (e) => {

                if (e.detail.tab == tabId){
                    resolve(e.detail.data);
                }

            });

        }else{
            resolve(res);
        }

        setTimeout(function() {
            resolve(null);
        }, 5000);

    });
}


function waitForEvents(eventTarget, eventNames) {

    eventTarget = eventTarget || document;
    eventNames = (!Array.isArray(eventNames)) ? String(eventNames).split(',') : eventNames;

    // clean event names
    eventNames = eventNames.map(function(item) {
        return String(item).trim();
    })
    .filter(function(item) {
        return item !== '';
    });

    var items = [];

    // create a promise to wait for each event
    var listeners = eventNames.map(function(eventName) {
        return new Promise(function(resolve) {
            eventTarget.addEventListener(eventName, function(e) {
                items.push(e);
                resolve();
            }, false);
        });
    });

    // resolve once all events have fired
    return Promise.all(listeners).then(function() {
        return Promise.resolve(items);
    });
}

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}



const append2List = (a, b) => {
    let st = a.length;

    for(let i=0; i < b.length; i++){
        let v = b[i];
        v.seq = st;
        a.push(v);
        st++;
        if (i == b.length - 1){
            return a;
        }
    }
}
