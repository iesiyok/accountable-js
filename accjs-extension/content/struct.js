
function scriptexcluder(k,v){
        if(k == 'trust' || k == 'event_handler' ){return undefined;}else{return v;}
}

function scriptexcluderInline(k,v){
        if(k == 'hash' ){return undefined;}else{return v;}
}


const InlineScript = class{
    constructor(seq, script, load, target, hash, dynamic){
        this.seq = seq;
        this.type = "inline";
        this.script = script;
        this.load = load;
        this.target = target;
        this.hash = hash;
        this.dynamic = dynamic;
    }
    async serialise(instance){
        return JSON.parse(JSON.stringify(instance, scriptexcluder));
    }
    async serialise_custom(instance){
        return JSON.parse(JSON.stringify(instance, scriptexcluderCustom));
    }
}



const LocalScript = class{
    constructor(seq, link, hash, load, target, trust, dynamic){
        this.seq = seq;
        this.type = "local";
        this.name = "";
        this.version = "";
        this.link = link;
        this.hash = hash;
        this.load = load;
        this.target = target;
        this.trust = trust;
        this.dynamic = dynamic;
    }
    async serialise(instance){
        return JSON.parse(JSON.stringify(instance, scriptexcluder));
    }
    async serialise_custom(instance){
        return JSON.parse(JSON.stringify(instance, scriptexcluderCustom));
    }
}



const ExternalScript = class{
    constructor(seq, link, hash, crossorigin, load, target, trust, dynamic){
        this.seq = seq;
        this.type = "external";
        this.name = "";
        this.version = "";
        this.link = link;
        this.hash = hash;
        this.crossorigin = crossorigin;
        this.trust = trust;
        this.load = load;
        this.target = target;
        this.dynamic = dynamic;
    }
    async serialise(instance){
        return JSON.parse(JSON.stringify(instance, scriptexcluder));
    }
    async serialise_custom(instance){
        return JSON.parse(JSON.stringify(instance, scriptexcluderCustom));
    }
}

const ScriptErr = class{
    constructor(seq, link, error, target, dynamic){
        this.seq = seq;
        this.type = "script";
        this.link = link;
        this.error = true;
        this.msg = error;
        this.target = target;
        this.dynamic = dynamic;
    }
    async serialise(instance){
        return JSON.parse(JSON.stringify(instance));
    }
    async serialise_custom(instance){
        return JSON.parse(JSON.stringify(instance));
    }
}

function iframeexcluder(k,v){
        if( k == 'trust' || k == 'window'  ){return undefined;}else{return v;}
}

function iframeexcluderCustom(k,v){
        if(k == 'document' || k == 'target' || k == 'accessible' || k == 'frontend_id' || k == 'event_handler' ){return undefined;}else{return v;}
}

const Iframe = class{

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
    async iframe_serial(instance){
        return new Iframe(instance.seq, instance.src_type, instance.src, 
            instance.sandbox, instance.crossorigin, instance.target, 
            instance.frontend_id, instance.dynamic, null);
    }
    async serialise(instance){
        return JSON.parse(JSON.stringify(instance, iframeexcluder));
    }

    async serialise_custom(instance){
        return JSON.parse(JSON.stringify(instance, iframeexcluderCustom));
    }

}

const IframeErr = class{

    constructor(seq, src, error, target, dynamic){
        this.seq = seq;
        this.type = "iframe";
        this.src = src;
        this.error = true;
        this.msg = error;
        this.target = target;
        this.dynamic = dynamic;
        
    }
    async serialise(instance){
        return JSON.parse(JSON.stringify(instance));
    }
    async serialise_custom(instance){
        return JSON.parse(JSON.stringify(instance));
    }

}

function ehexcluder(k,v){
        if(k == 'target' ){return undefined;}else{return v;}
}

function ehexcluderCustom(k,v){
        if(k == 'target' ){return undefined;}else{return v;}
}

const EventHandler = class{
    constructor(seq, script, target, hash, dynamic){
        this.seq = seq;
        this.type = "event_handler";
        this.script = script;
        this.target = target;
        this.hash = hash;
        this.dynamic = dynamic;
    }
    async serialise(instance){
        return JSON.parse(JSON.stringify(instance, ehexcluder));
    }
    async serialise_custom(instance){
        return JSON.parse(JSON.stringify(instance, ehexcluderCustom));
    }
}

const EventHandlerErr = class{
    constructor(seq, error, target, dynamic){
        this.seq = seq;
        this.type = "event_handler";
        this.error = true;
        this.msg = error;
        this.target = target;
        this.dynamic = dynamic;
    }
    async serialise(instance){
        return JSON.parse(JSON.stringify(instance));
    }
    async serialise_custom(instance){
        return JSON.parse(JSON.stringify(instance));
    }
}














