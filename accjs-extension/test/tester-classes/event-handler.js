
function ehexcluder(k,v){
        if(k == 'target' ){return undefined;}else{return v;}
}

function ehexcluderCustom(k,v){
        if(k == 'target' ){return undefined;}else{return v;}
}

module.exports = class EventHandler {
    constructor(seq, script, target, hash, dynamic){
        this.seq = seq;
        this.type = "event_handler";
        this.script = script;
        this.target = target;
        this.hash = hash;
        this.dynamic = dynamic;
    }
    serialise(instance){
        return JSON.parse(JSON.stringify(instance, ehexcluder));
    }
    serialise_custom(instance){
        return JSON.parse(JSON.stringify(instance, ehexcluderCustom));
    }
}