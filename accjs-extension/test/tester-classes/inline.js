function scriptexcluder(k,v){
        if(k == 'trust' || k == 'event_handler' ){return undefined;}else{return v;}
}

function scriptexcluderInline(k,v){
        if(k == 'hash' ){return undefined;}else{return v;}
}


module.exports = class InlineScript {
    constructor(seq, script, load, target, hash, dynamic){
        this.seq = seq;
        this.type = "inline";
        this.script = script;
        this.load = load;
        this.target = target;
        this.hash = hash;
        this.dynamic = dynamic;
    }
    serialise(instance){
        return JSON.parse(JSON.stringify(instance, scriptexcluder));
    }
    serialise_custom(instance){
        return JSON.parse(JSON.stringify(instance, scriptexcluderCustom));
    }
}