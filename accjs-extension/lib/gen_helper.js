


async function without (array, what){
    // console.log('array::', array);
    return array.filter(function(element){ 
        return element != what;
    });

}


function sha256(data){
    return new Promise((resolve, reject) => {
        let hash = CryptoJS.SHA256(data);
        let x = "sha256-" +  hash.toString(CryptoJS.enc.Base64);
        resolve(x);
    });
    
}


function sha384(data){
    return new Promise((resolve, reject) => {
        let hash = CryptoJS.SHA384(data);
        let x = "sha384-" +  hash.toString(CryptoJS.enc.Base64);
        resolve(x);
    });
    
}

function sha512(data){
    return new Promise((resolve, reject) => {
        let hash = CryptoJS.SHA512(data);
        let x = "sha512-" +  hash.toString(CryptoJS.enc.Base64);
        resolve(x);
    });
    
}



function getData(url) {
  return new Promise(function(resolve, reject) {


        fetch(url,{ method: 'GET' })
          .then(response => {
            resolve(response.clone().text());
          })
          .catch(response => {
            reject(response.error);
          });

  });
}


//only sha256, sha384, sha512
function sriHTML(f, link){

    return new Promise((resolve, reject) => {
        let js_data_promise = getData(link);
        // console.log("LINK::", link);
        js_data_promise.then( (js_data) => {
            
            hsh_pr = sha256(js_data);
            hsh_pr.then((hsh)=>{
                resolve(hsh);
            });

        }, (error) =>{
            console.log("SRI function error::", error);
            reject(error);
        });

    });
}


function sameOrigin(a, b) {
    const urlA = new URL(a);
    const urlB = new URL(b);
    return urlA.hostname == urlB.hostname &&
           urlA.port == urlB.port &&
           urlA.protocol == urlB.protocol;
}



const evalResultsArray = async (results) => {

    let control = CORRECT_EVAL_RESULT;
    for (let i =0; i < results.length; i++){
        let r = results[i];
        if (Array.isArray(r)){
            control = await evalResultsArray(r);
            if(i == results.length - 1 ){
                return control;
            }
        }else{
            if (r == CORRECT_EVAL_RESULT){

                if(i == results.length - 1 ){
                    return control;
                }

            }else{
                if (r.substring(0,2) == '-2' ){
                    return EVAL_RESULT_IN_PROGRESS;
                }else{
                    // control = '1';
                    if(i == results.length - 1 ){
                        return EVAL_RESULT_ERROR;
                    }
                }
            }
            

            
        }
        
    }
    
}



const evalResults = async (results) => {
    let control = CORRECT_EVAL_RESULT;
    if (results.length > 0){
        for (let i=0; i < results.length; i++){
            let r = results[i];
            if (Array.isArray(r)){
                ctrl = await evalResultsArray(r);
                if (ctrl == EVAL_RESULT_IN_PROGRESS){
                    return ctrl;
                }else{
                    if (ctrl == CORRECT_EVAL_RESULT){
                        if (i == results.length - 1){
                            return control;
                        }
                    }else{
                        return ctrl;
                    }
                }
            }else{
                if (r == CORRECT_EVAL_RESULT){
                    if(i == results.length - 1 ){
                        return control;
                    }

                }else{
                    if (r.substring(0,2) == '-2' ){
                        return EVAL_RESULT_IN_PROGRESS;
                    }else{
                        
                         return EVAL_RESULT_ERROR;
                        
                    }
                }
            }
        }
    }
}

const applyResults2Browser = async (tabId) => {

    tabInfo = tabMap.get(tabId);
    results = tabInfo.results;

    console.log("Results::", results);

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
       
    tabMap.set(tabId, tabInfo);
    
    if (tabId == currentTabId){

        chrome.action.setIcon({path: {"16" : tabInfo.icon}});
    }
    
}



function scriptexcluderCustom(k,v){
        if(k == 'script' || k == 'target' ){return undefined;}else{return v;}
}
function ehexcluderCustom(k,v){
        if(k == 'script' || k == 'target' ){return undefined;}else{return v;}
}

function iframeexcluderCustom(k,v){
        if(k == 'document' || k == 'target' || k == 'accessible' || k == 'frontend_id' ){return undefined;}else{return v;}
}
