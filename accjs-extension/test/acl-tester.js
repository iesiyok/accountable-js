/***
 * TESTING CODE
 * **/

const InlineScript = require('./tester-classes/inline.js');
const ExternalScript = require('./tester-classes/external.js');
const Iframe = require('./tester-classes/iframe.js');
const EventHandler = require('./tester-classes/event-handler.js');


const createNewInlineScript = (seq, dynamic) => {
    return new InlineScript(seq, "console.log('Hello World');", 'sync', [], 'sha256-4saCEHt0PuLiuYPF+oVKJcY5vrrl+WqXYIoq3HAH4vg=', dynamic );
}

const createNewExternalScript = (seq, url, dynamic) => {
    return new ExternalScript(seq, url, `sha256-abcdefg0Rl9pC1Bt38w${seq}`, null, 'async', [], 'assert', dynamic );
}


const createNewIframe = (seq, url, sandbox, frontend_id, dynamic) => {
    return new Iframe(seq, 'link', url, sandbox, null, [], frontend_id, dynamic, null  );
}

const createNewEventHandler = (seq, dynamic) => {
    return new EventHandler(seq, "onload = helloworld();", [], `sha256-abcdwer${seq}`, dynamic );
}

const createIframeChildren = (frontend_id, listofAC, framesInfo ) => {

    let frame = {'frontend_id': frontend_id, 'acL' : []};
    for (let i = 0; i < listofAC.length; i++){
        let ac = listofAC[i];
        if (ac.type == 'inline'){
            let is = createNewInlineScript(ac.seq, ac.dynamic);
            is = is.serialise(is);
            frame.acL.push(is);
        }else if (ac.type == 'external' ){
            let es = createNewExternalScript(ac.seq, ac.url, ac.dynamic);
            es = es.serialise(es);
            frame.acL.push(es);
        }else if (ac.type == 'event_handler' ){
            let eh = createNewEventHandler(ac.seq, ac.dynamic);
            eh = eh.serialise(eh);
            frame.acL.push(eh);
        }else if (ac.type == 'iframe'){
            let ifr = createNewIframe(ac.seq, ac.url, ac.sandbox, ac.frontend_id, ac.dynamic);
            ifr = ifr.serialise(ifr);
            frame.acL.push(ifr);
            framesInfo = createIframeChildren(ac.frontend_id, ac.acL, framesInfo );
            // console.log("FR::", fr);

            // framesInfo.push(fr);
            // console.log("FramesInfo::", framesInfo);
        }

    }
    framesInfo.push(frame);
    return framesInfo;
}


exports.createACL = (listofAC, resp ) => { 

    let framesInfo = resp.framesInfo;
    let acL = resp.acL;
    for (let i = 0; i < listofAC.length; i++){
        let ac = listofAC[i];
        if (ac.type == 'inline'){
            let is = createNewInlineScript(ac.seq, ac.dynamic);
            is = is.serialise(is);
            acL.push(is);
        }else if (ac.type == 'external' ){
            let es = createNewExternalScript(ac.seq, ac.url, ac.dynamic);
            es = es.serialise(es);
            acL.push(es);
        }else if (ac.type == 'event_handler' ){
            let eh = createNewEventHandler(ac.seq, ac.dynamic);
            eh = eh.serialise(eh);
            acL.push(eh);
        }else if (ac.type == 'iframe'){
            let ifr = createNewIframe(ac.seq, ac.url, ac.sandbox, ac.frontend_id, ac.dynamic);
            ifr = ifr.serialise(ifr);
            acL.push(ifr);
            framesInfo = createIframeChildren(ac.frontend_id, ac.acL, framesInfo );

        }

    }
    resp.acL = acL;
    resp.framesInfo = framesInfo;
    return resp;


}