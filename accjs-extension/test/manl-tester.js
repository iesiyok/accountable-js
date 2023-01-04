




const createManifestForInline = (seq, dynamic) => {
	return {
		"seq" : seq,
		"type" : 'inline',
		"load" : 'sync',
		"hash" : 'sha256-4saCEHt0PuLiuYPF+oVKJcY5vrrl+WqXYIoq3HAH4vg=',
		"dynamic" : dynamic,
		"trust" : 'assert'
	};
}


const createManifestForExternal = (seq, url, dynamic) => {
	return {
		"seq" : seq,
		"type" : 'external',
		"link" : url,
		"load" : 'async',
		"hash" : 'sha256-abcdefg0Rl9pC1Bt38w'+seq,
		"crossorigin" : null,
		"dynamic" : dynamic,
		"trust" : 'assert'
	};
}

const createManifestForEventHandler = (seq, dynamic) => {

	return {
		"seq" : seq,
		"type" : 'event_handler',
		"hash" : 'sha256-abcdwer'+seq,
		"dynamic" : dynamic,
		"trust" : 'assert'
	};
}

const createManifestForIframe = (seq, url, sandbox, dynamic, trust, manL) => {

	let manifest = this.createManL(manL);
	// console.log(manifest);
	return {
		"seq" : seq,
		"type" : 'iframe',
		"src_type" : 'link',
		"src" : url,
		"crossorigin" : null,
		"sandbox" : sandbox,
		"dynamic" : dynamic,
		"trust" : 'assert',
		"manifest" : manifest
	};
}

exports.createManL = (manL) => {
	
	let frManL = [];

	for (let i = 0; i < manL.length; i++){
		let man = manL[i];

		if (man.type == 'inline'){
			let il = createManifestForInline(man.seq, man.dynamic);
			frManL.push(il);
		}else if (man.type == 'external'){
			let ex = createManifestForExternal(man.seq, man.url, man.dynamic);
			frManL.push(ex);
		}else if (man.type == 'event_handler'){
			let eh = createManifestForEventHandler(man.seq, man.dynamic);
			frManL.push(eh);
		}else if (man.type == 'iframe'){
			let ifr = createManifestForIframe(man.seq, man.url, man.sandbox, man.dynamic, man.trust, man.acL);
			frManL.push(ifr);
		}
	}
	return frManL;
}




// let manL = createManL(manL);

// console.log("Respo::", respo);

// let respo = createManL(x);