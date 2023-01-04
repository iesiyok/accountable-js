
const x_acc_header = "x-acc-js-link";
const pattern= "*://*/*";
const filter = {
	urls: [ pattern],
	types: ["main_frame"]
	// types: ["main_frame", "sub_frame"]
};

const iframeFilter = {
	urls: [pattern],
	types: ["sub_frame"]
};

const scriptFilter = {
	urls: [pattern],
	types: ["script"]
}

const tStatus = {
    TAB_CREATED: 'tabCreated',
    NEW_REQ: 'newRequest',
    HEADERS_REC: 'headersReceived',
    COMPLETED: 'completed'
}

const sStatus = {
	UNDEFINED: 'N/A',
	UNCOMPLYING: 'Uncomplying',
	COMPLYING: 'Complying',
	ERROR: 'Error',
	WARNING: 'Warning',
	INPROGRESS: 'In progress',
	NOACTIVE_CONTENT : 'No active content available and no manifest given'
}

const eMsg = {
	NEW_REQ: 'New request has been sent. \n\n',
	NEW_TAB: 'Waiting for a website ... \n\n',
	NO_HEADER: 'x-acc-js-link not found in headers or <meta>, the site is not complying .. \n\n',
	EXT_STARTUP: 'The extension has just started, refresh the tab for the update on status .. \n\n',
	MANIFEST_FETCH_ERROR: 'The manifest file couldn\'t be fetched ... \n\n ',
	EMPTY_TABINFO: 'No information about this tab has been defined yet. \n\n',
	ACTIVE_CONT_NULL: 'Active content list from HTML has returned null. \n\n',
	REQ_COMPLETED: 'Request completed. \n\n',
	DELEGATED_IN_PROGRESS: 'Delegated content evaluation is in progress. \n\n',
	MANIFEST_NOT_FOUND_ERROR: 'New active contents added, but the manifest couldn\'t be found ... \n\n '

}

const evLabels = {
	CONT_LIST: 'activeContList',
	NEW_CONTENT: 'newActiveCont',
	SXG_ASSIGNED: 'sxgAssigned',
	NEW_CONTENT_ADDED: 'newActiveContentAdded',
	GENERATE_MANIFEST: 'generateManifest',
	SET_EXTENSION_RESPONSE: 'setExtensionResponse',
	DOWNLOAD_MANIFEST: 'downloadManifest',
	ACCJS_LINK_META: 'x-acc-js-link-meta',
	FRAME_ACCJS_LINK_META: 'x-acc-js-frame-link-meta',
	ACCJS_LINK_RECEIVED: 'metaTagReceived',
	IFRAME_ACCJS_LINK_RECEIVED: 'iframeSxgHeaderReceived',
	PARALLEL_EVAL_RESULT: 'parallelEvalResultReceived',
	NEW_FRAME_INFO_ARRIVED: 'newFrameInfoArrived',
	NEW_SCRIPT_INFO_ARRIVED: 'newScriptInfoArrived',
	FRAME_SXG_LINK_ASSIGNED: 'frameSxgLinkAssigned',
	GENERATED_MANIFEST_ASSIGNED: 'generatedManifestAssigned',
	MANIFEST_GENERATED: 'manifestGenerated',
	ACTIVE_CONT_REMOVED: 'activeContentRemoved',
	LOCATION_HREF_CHANGED: 'locationHrefChanged',
	EMPTY_IFRAME_ACTIVE_CONT_LIST: 'emptyIframeActiveContList',
	SITE_REFRESH: 'siteRefresh',
	FRONT_END_ID_NOT_ASSIGNED: 'frontEndIdNotAssigned',
	FRONT_END_ID_ASSIGNED: 'frontendIdAssigned'

}

const msgLabels = {
	ACCJS_FROM_PARENT: 'accjsFromParent',
	ACCJS_FROM_LEAF_RESPONSE : 'accjsFromLeafResponse',
	ACCJS_FROM_LEAF: 'accjsFromLeaf',
	IFRAME_HELLO_RECEIVED: 'iframeHelloReceived',
	IFRAME_RESPONSE_RECEIVED: 'iframeResponseReceived',
	NEW_IFRAME_ADDED: 'newIframeAdded'
}

const imgPaths = {
	GREY_IMG: 'img/grey-16.png',
	ERR_IMG: 'img/error.png',
	OK_IMG: 'img/ok-16.png',
	WARN_IMG: 'img/yellow.png'
}


const mustSandboxedDelegate = ["allow-forms", "allow-scripts"];



const DEFAULT_FRONTEND_ID = '-1';
const DEFAULT_EVAL_RESULT = '-5';
const CORRECT_EVAL_RESULT = '-1';
const EVAL_RESULT_IN_PROGRESS = '0';
const EVAL_RESULT_ERROR = '1';
const DEFAULT_HASH_VALUE = '-1';
const EVENT_HANDLER_NOT_FOUND = '-1';
const ACTIVE_ELEMENT_NOT_FOUND = '-1';
const EVAL_RESULT = '-1';
const TARGET_NOT_FOUND = '-1';