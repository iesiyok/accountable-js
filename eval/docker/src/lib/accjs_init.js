/**
** Taken and with updates from:-> https://github.com/jspenguin2017/Snippets/blob/master/onbeforescriptexecute.html
**/


window.postMessage({ type: "FIRST_FROM_PAGE", text: "SCRIPT_LISTENER_AVAILABLE" }, "*");
console.log("This is a message from accjs-init.js: Your scripts are blocked!")
var page_loaded = false;

        (() => {


            "use strict";
            const Event = class {
                constructor(script, target) {
                    this.script = script;
                    this.target = target;
                    this._cancel = false;
                    this._replace = null;
                    this._stop = false;
                }
                preventDefault() {
                    this._cancel = true;
                }
                stopPropagation() {
                    this._stop = true;
                }
                replacePayload(payload) {
                    this._replace = payload;
                }
            };
            let callbacks = [];
            window.addBeforeScriptExecuteListener = (f) => {
                if (typeof f !== "function") {
                    throw new Error("Event handler must be a function.");
                }
                callbacks.push(f);
            };
            window.removeBeforeScriptExecuteListener = (f) => {
                let i = callbacks.length;
                while (i--) {
                    if (callbacks[i] === f) {
                        callbacks.splice(i, 1);
                    }
                }
            };


            //the event handler list may not be complete
            var handlers = ['onabort', 'oncancel', 'oncanplay', 'oncanplaythrough', 'onchange',
            'onclick', 'oncuechange', 'ondblclick', 'ondurationchange', 'onemptied', 'onended',
            'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onloadeddata',
            'onloadedmetadata', 'onloadstart', 'onloadstart', 'onmouseenter', 'onmouseleave',
            'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onpause',
            'onplay', 'onplaying', 'onprogress', 'onratechange', 'onreset', 'onseeked', 'onseeking',
            'onselect', 'onsubmit', 'onsuspend', 'ontimeupdate',
            'ontoggle', 'onvolumechange', 'onwaiting'];

            function eval_handler(script){
                if(script != undefined){
                    for(let i=0; i < handlers.length; i++ ){
                        if(script[handlers[i]] !== undefined && script[handlers[i]] !== null ){
                            return true;
                        }
                    }
                    return false;
                }else{
                    return false;
                }
            }

            const dispatch = (script, target) => {
                if (script.tagName !== "SCRIPT" && !eval_handler(script)) {
                    return;
                }
                const e = new Event(script, target);
                if (typeof window.onbeforescriptexecute === "function") {
                    try {
                        window.onbeforescriptexecute(e);
                    } catch (err) {
                        console.error(err);
                    }
                }
                for (const func of callbacks) {
                    if (e._stop) {
                        break;
                    }
                    try {
                        func(e);
                    } catch (err) {
                        console.error(err);
                    }
                }
                if (e._cancel) {
                    script.textContent = "";
                    script.remove();
                } else if (typeof e._replace === "string") {
                    script.textContent = e._replace;
                }
            };
            const observer = new MutationObserver((mutations) => {
                for (const m of mutations) {
                    for (const n of m.addedNodes) {
                        dispatch(n, m.target);
                    }
                }
            });
            observer.observe(document, {
                childList: true,
                subtree: true
            });
        })();

        (() => {
            "use strict";
            
            window.onbeforescriptexecute = (e) => {

                if(!page_loaded){
                    
                    if (e.script.tagName === "SCRIPT"){
                        e.preventDefault();
                        let j = JSON.stringify({script: e.script.outerHTML, target: e.target.tagName, type: 'exec' });
                        window.postMessage({ type: "FROM_PAGE", text: j }, "*");
                    }else{
                        let j = JSON.stringify({script: e.script.outerHTML, target: e.target.tagName, type: 'non-exec' });
                        window.postMessage({ type: "FROM_PAGE", text: j }, "*");
                    }
                    

                    

                }
            };
        })();
        window.onload = function(){
            page_loaded = true;
            window.postMessage({ type: "FROM_PAGE", text: "SCRIPTS_ENDED" }, "*");
        }
