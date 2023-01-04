
function scriptexcluder(k,v){
        if(k == 'trust' || k == 'event_handler' ){return undefined;}else{return v;}
}

function scriptexcluderInline(k,v){
        if(k == 'hash' ){return undefined;}else{return v;}
}

module.exports = class ExternalScript {
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
    serialise(instance){
        return JSON.parse(JSON.stringify(instance, scriptexcluder));
    }
    serialise_custom(instance){
        return JSON.parse(JSON.stringify(instance, scriptexcluderCustom));
    }
}