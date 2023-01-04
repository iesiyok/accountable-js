

class FrameInfo {

	constructor(type, is_complying, src, frame_id, parent_frame_id, 
		acL, manL, sig_ver, sig_msg, status, msg, frontend_id, 
		sxg_link, first_round_measured, preload_scripts){
			
			this.type 	= type; //main or iframe
			this.is_complying = is_complying;
            this.src 	= src; //link of the window
            this.frame_id = frame_id; //frame id
            this.parent_frame_id = parent_frame_id; //parent frame id
            this.acL 	= acL; //active content list coming from frontend
            this.manL 	= manL; //manifest list 
            this.sig_ver = sig_ver; //signature verification result true/false
            this.sig_msg = sig_msg; //result message from signature verification
            this.status = status;
            this.msg = msg;
            this.frontend_id = frontend_id;
            this.sxg_link = sxg_link;
            this.first_round_measured = first_round_measured;
            this.preload_scripts = preload_scripts;
            //this.document = _document;
	}

	static simpleIframeInfo(){
		return new FrameInfo("iframe", false, null, null, null, null, 
			null, null, null, null, null, null, null, false, null );
	}
}

class DelegatedScriptInfo {
	constructor(src, frame_id, parent_frame_id, sig_ver, sig_msg, sha256, sha384, sha512){
		this.src = src;
		this.frame_id = frame_id;
		this.parent_frame_id = parent_frame_id;
		this.sig_ver = sig_ver;
		this.sig_msg = sig_msg;
		this.sha256 = sha256;
		this.sha384 = sha384;
		this.sha512 = sha512;
	}
}

module.exports = class MainFrameInfo extends FrameInfo {


	constructor(is_complying, src, frame_id, parent_frame_id, acL, manL, sig_ver, sig_msg, 
		status, msg, frontend_id, sxg_link, first_round_measured, preload_scripts, tab_status, 
		site_status, icon, frames_info, results, gen_man, ext_counter, links_counter, 
		links_counter_total, gm_status, headers_exist, results_label, 
		results_buffer, delegated_script_manifests, generate_label, generate_buffer){
		
		super("main", is_complying, src, frame_id, parent_frame_id, acL, 
			manL, sig_ver, sig_msg, status, msg, frontend_id, sxg_link, 
			first_round_measured, preload_scripts);
		
		this.tab_status = tab_status;
		this.site_status = site_status;
        this.icon = icon; //icon of the tab
        this.frames_info = frames_info;
        this.results = results;
        this.gen_man = gen_man;
        this.ext_counter = ext_counter;
        this.links_counter = links_counter;
        this.links_counter_total = links_counter_total;
        this.gm_status = gm_status;
        this.headers_exist = headers_exist;
        this.results_label = results_label;
        this.results_buffer = results_buffer;
        this.delegated_script_manifests = delegated_script_manifests;
        this.generate_label = generate_label;
        this.generate_buffer = generate_buffer;

	}

	static simpleFrameInfoInstance(tab_status){
		return new MainFrameInfo(false, null, null, null, null, 
			null, null, null, null, null, null, null, false, null, 
			tab_status, null, imgPaths.GREY_IMG, null, null, 
			null, 0, 0, 0, null, null, null, null, null, null, null);
	}


	static sigVerMsgInstance(is_complying, sig_ver, sig_msg, status, 
		msg, tab_status, site_status, icon, first_round_measured){
		return new MainFrameInfo(is_complying, null, null, null, 
			null, null, sig_ver, sig_msg, status, msg, null, null, 
			first_round_measured, null, tab_status, site_status, 
			icon, null, [], null, 0, 0, 0, null, null, null, null, null, null, null);
	}
	async serialise(instance){
        return JSON.parse(JSON.stringify(instance));
    }
}


