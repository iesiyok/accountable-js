



const _hashAlg = 'sha256';
const ActiveContent = class {

        constructor( index, content, type, target, dynamic) {

            this.index = index;//the indice of the content in HTML order
            this.content = content;//html element
            this.type = type;//script, iframe or others
            this.target = target;
            this.dynamic = dynamic;
            this.persistent = true;
        }

        async serialise_script(instance){

            let j = "";

            let _index = instance.index;
            let _content = instance.content;
            let _src = _content.src;
            let _integrity = _content.integrity;
            let _crossorigin = _content.crossOrigin;
            let _target = instance.target;
            let trust = "assert";
            let dynamic = instance.dynamic;

            let integrity = "";

            if (await validityCheck(_integrity) ){//integrity given
                integrity = _integrity;
            }else{

                    if (_content.textContent == ""){
                        // integrity = '-1';
                        integrity = hardcodedHashes.get(_src) || DEFAULT_HASH_VALUE;
                        // integrity = blogs.get(_src);
                    }else{
                        integrity = await window[_hashAlg](_content.textContent);
                    }

                
            }

            try{
                let load = await loadCheck(_content);
                
                if (await validityCheck(_src) ){

                    
                    return new ExternalScript(_index, _src, integrity, _crossorigin, load, _target, trust, dynamic);

                    
                }else{

                    return new InlineScript(_index, _content.textContent, load, _target, integrity, dynamic);
                    
                }

                
            }catch(e){
                let src = '??';
                if (await validityCheck(_src) ){
                    src = _src;
                }
                return new ScriptErr(_index, src, e, _target, true);
                
            }

            
        }

        async serialise_iframe(instance){

            let j = "";
            let _index = instance.index;
            let _content = instance.content;
            let _src = _content.src;
            if (_src == ""){
                _src = _content.dataset.src;
            }
            let _sandbox = _content.sandbox.toString();
            let _crossorigin = _content.crossOrigin;
            let sandbox = undefined;
            let _target = instance.target;
            let dynamic = instance.dynamic;
            // console.log("crossorigin::", _crossorigin);
            try{

                
                if ( validityCheck(_sandbox) ){
                    sandbox = _sandbox;
                }
                let crossorigin = "";
                    
                if ( validityCheck(_crossorigin)){
                    crossorigin = _crossorigin;
                }

                let win = _content.contentWindow;
                

                if ( isValidUrl(_src)){

                    return new Iframe(_index, 'link', _src, sandbox, crossorigin, _target, "",/*front_id,*/ dynamic, win );

                    
                }else{
                    
                    if ( javascriptUrl(_src)){

                        return new Iframe(_index, 'script', _src, sandbox, crossorigin, _target, "",/*front_id,*/ dynamic, win );
 
                        
                    }else{

                        return new IframeErr(_index, _src, "unknown", _target, dynamic );
                    }
                    
                }

            }catch(e){

                console.log("Iframe Error:::", e);
                
                return new IframeErr(_index, _src, e, _target, dynamic );
            }

            
        }
        async serialise_others(instance){
            let j = "";
            let _index = instance.index;
            let _content = instance.content;
            let _target = instance.target;
            let dynamic = instance.dynamic;
            try{
                // let h = await window[_hashAlg](_content);
                return new EventHandler(_index, _content, _target, DEFAULT_HASH_VALUE, dynamic);
                
            }catch(e){
                return new EventHandlerErr(_index, e, _target, dynamic);
                
            }
            
            
            
        }
};

const event_handler = async (content) => {

            return handlers.reduce((seq, n) => {
                return seq.catch(() => {
                    if(content[n] !== undefined && content[n] !== null ) { // an event handler found
                        return new Promise((resolve, reject) => resolve(true));
                    } else { // all other values are not working
                        return new Promise((resolve, reject) => reject());
                    }
                });
            }, Promise.reject());

}


const evaluate = async (ac, handler) => {

    if (!handler){

            if (ac.content.nodeName === "SCRIPT"){

                ac.content = ac.content;
                ac.type = "script";

                return ac.serialise_script(ac);

            }else{
                if (ac.content.nodeName === "IFRAME"){

                        ac.type = "iframe";
                        return ac.serialise_iframe(ac);

                }else{
                    var clone = ac.content.cloneNode(true);
                    clone.innerHTML = "";
                    var definition = clone.outerHTML;
                    ac.content = definition;
                    ac.type = 'event_handler';

                    return ac.serialise_others(ac);
                    
                }
                
            }

    }else{
        var clone = ac.content.cloneNode(true);
        clone.innerHTML = "";
        var definition = clone.outerHTML;
        ac.content = definition;
        ac.type = 'event_handler';

        return ac.serialise_others(ac);
    }

};
//temporary solution for including this method; there is a copy in mainpage.js
const getRandomArray = async () =>{

    var s = '';
    var typedArray = new Uint8Array(3);
    window.crypto.getRandomValues(typedArray);
    //CryptoJS.getRandomValues(typedArray);
    //var s = typedArray[0].toString() + typedArray[1].toString();
    for (var i = 0; i < typedArray.length; i++) {
      s += typedArray[i].toString();
    }
    return s;
}

const findEventHandler = async (element, cIndex, dynamic, handler) => {

                if (element.attributes.length > 0){

                    let res = 0;
                    await event_handler(element.attributes).then(
                    
                        async (eh) => {

                            let target = await find_target(element);
                            target = await reverse_target(target.reverse());
                            // let ac = new ActiveContent(wind_w, cIndex, element, "", target.reverse(), winIsTop);
                            let ac = new ActiveContent( cIndex, element, "", target, dynamic);
                            res = await evaluate(ac, handler);
                            
                        },
                        async () => {res = EVENT_HANDLER_NOT_FOUND;}
                      
                    );
                    return res;

                }else{

                    return EVENT_HANDLER_NOT_FOUND;

                }
}

function handler(src){
    console.log("-----------------------LOADED ", src, " in ", window.location.href);
}


const dispatchExistingAC = async (cIndex, element) => {
        let ac = active_cont_list[cIndex];
        if (ac.type == 'inline'){

                ac.script = element.textContent;
                ac.hash = await window[_hashAlg](element.textContent);
                active_cont_list[cIndex] = ac;
                console.log('Inline script textContent updated');

        }else{
            console.log('Text content change on an element type=', ac.type);
        }
}

const dispatch = async (wind_w, cIndex, element, dynamic) => {
    
        if ( element instanceof wind_w.HTMLElement ) {
            
            if ( element.nodeName === "SCRIPT" || element.nodeName === "IFRAME"){

                let front_id = '';

                if (element.nodeName === "IFRAME"){
                    // let xxx = 0;
                    front_id = await getRandomArray();
                    
                    if (element.src && (element.src != '' || element.src != 'about:blank') ){
                        
                        frontIdList.push(front_id);
                       // element.addEventListener('load', onIframeLoad(front_id, element.contentWindow), true);
                    }else{
                        

                        if (element && element.contentWindow){
                            element.src = element.contentWindow.location.href;
                        }

                        
                        
                    }

                    
                    
                    
                }

                let target = await find_target(element);
                // console.log("targetx::", target);
                target = await reverse_target(target.reverse());
                // let ac = new ActiveContent(wind_w, cIndex, element, "", target.reverse(), winIsTop);
                let ac = new ActiveContent( cIndex, element, "", target, dynamic);
                let res = await evaluate(ac, false);
                if (element.nodeName === "IFRAME"){
                    res.frontend_id = front_id;
                }

                let eh = await findEventHandler(element, cIndex++, dynamic, true);

                res.event_handler = eh;
                
                return res;
                
            }else{
                let eh = await findEventHandler(element, cIndex, dynamic, false);

                return eh;
              
                
            }
        
        }else{
            
            return ACTIVE_ELEMENT_NOT_FOUND;
        } 

};




const removedContent = async (wind_w, element, removedElList) => {

    
        if ( element instanceof wind_w.HTMLElement ) {
            
            if ( element.nodeName === "SCRIPT" || element.nodeName === "IFRAME"){



                let ac = new ActiveContent( "", element, "", "", "");
                let res = await evaluate(ac, false);
                
                return [res];
                
            }else{


                    if (element.attributes.length > 0){

                        let res = 0;
                        await event_handler(element.attributes).then(
                        
                            async (eh) => {

                                let ac = new ActiveContent( "", element, "", "", "");
                                res = await evaluate(ac, false);
                                
                            },
                            async () => {res = EVENT_HANDLER_NOT_FOUND;}
                          
                        );
                        
                        if (res != EVENT_HANDLER_NOT_FOUND){
                            removedElList.push(res);
                        }
                    }
                    
                    let cn = element.childNodes;
                    if (cn && cn.length > 0){

                        for (let i = 0; i < cn.length; i++){
                            let el = cn[i];
                            let r = await removedContent(wind_w, el, []);
                            if (r != ACTIVE_ELEMENT_NOT_FOUND && r != [] ){
                                removedElList.push.apply(removedElList, r);
                            }
                            if (i == cn.length - 1){
                                return removedElList;
                            }

                        }

                    }else{
                        return removedElList;
                    }
                    
                    

                
                
            }
        
        }else{
           
            return ACTIVE_ELEMENT_NOT_FOUND;
        } 

};

