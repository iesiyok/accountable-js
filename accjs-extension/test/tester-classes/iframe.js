
function iframeexcluder(k,v){
        if( k == 'trust' || k == 'window'  ){return undefined;}else{return v;}
}

function iframeexcluderCustom(k,v){
        if(k == 'document' || k == 'target' || k == 'accessible' || k == 'frontend_id' || k == 'event_handler' ){return undefined;}else{return v;}
}

module.exports = class Iframe {

    constructor(seq, src_type, src, sandbox, crossorigin, target, frontend_id, dynamic, _window){
        this.type = "iframe";
        this.seq = seq;
        this.src_type = src_type;
        this.src = src;
        this.sandbox = sandbox;
        this.crossorigin = crossorigin;
        this.target = target;
        this.frontend_id = frontend_id;
        this.dynamic = dynamic;
        this.window = _window;
 
        
    }
    //need to remove window from the list, otherwise there is CORS error
    iframe_serial(instance){
        return new Iframe(instance.seq, instance.src_type, instance.src, 
            instance.sandbox, instance.crossorigin, instance.target, 
            instance.frontend_id, instance.dynamic, null);
    }
    serialise(instance){
        return JSON.parse(JSON.stringify(instance, iframeexcluder));
    }

    serialise_custom(instance){
        return JSON.parse(JSON.stringify(instance, iframeexcluderCustom));
    }

}