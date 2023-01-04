<h3>Overview</h3>

This is a prototype implementation of Accountable-js protocol, which is described in the research paper. The general idea of the Accountable-js 
protocol is to create an accountable code distribution mechanism for web applications.

This implementation is a browser extension and currently only developed for Google Chrome browsers. The extension is not preventive. It evaluates visited websites based on measurement protocol metrics and informs the user whether a website is opt-in the protocol and whether it fully adheres to it. 

<h3>Using the Extension</h3>

The extension changes icon based on the evaluation result of the current active tab. Hence, the icon might change moving through the tabs. The evalution mechanism runs only when a new 'webrequest' is sent to a website. If there are open tabs when the extension is imported the first time or reactivated, those tabs won't be evaluated until they are refreshed. They will be marked as 'Uncomplying' by default.

<ul>Evaluation Results = Site Status:
	<li>Complying: [Green] the website is opt in and fully adheres to the protocol,</li>
	<li>Error: [Red] the website is opt in, but there are mismatches,</li>
	<li>Uncomplying: [Grey] the website is not opt in.</li>
</ul>

<h3>Applications opt-in Accountable-js protocol</h3>

A web application that wants to opt in the protocol should provide a manifest file describing metadata about the list of executable content for its URL and publish it in a public log (hence the transparency). In the current version, the transparency part is not integrated yet. The manifest file should be signed with Signed Http Exhanges (SXG) protocol and the signature should be served at a public server. The SXG protocol details and a command line tool for creating SXG keys and signatures is available at https://github.com/WICG/webpackage/tree/master/go/signedexchange. A web application that has opted in the protocol should provide a signature of the manifest for its URL. 

The extension distinguishes whether a URL has opted in or not by a special response header or a <meta> tag in HTML showing the URL to the public server that provides the signature. The special response header key is "x-acc-js-link". It can also be configured with a <meta> tag pointing to the same URL. The extension is designed to take the configuration from both items, but the response header has the priority. If the values don't match, a warning is shown to the user when they click on the extension icon. 

e.g. <meta charset="utf-8" name="x-acc-js-link" content="url=http://localhost/example/index.html,sxg=http://localhost/example/index.sxg">


<h3>Design Overview</h3>

The browser extension has control over all tabs with background script. The background script maintains a key-value map for each tabId and its status. The background script is under 'background' folder. The SXG verification component given above is currently built in the extension using web assembly and the background script uses this component for signature verification. 

The extension runs content script on start of each web request. The content script examines the Document Object Model(DOM) with Mutation Observer and sorts out the active content that can be inline script, external script, event handler or iframe. The content scripts can work both on the top level window and iframe contexts and send their active content list to the background script seperately.

The background script is also responsible for measuring the manifest file and comparing it with the active content delivered via content scripts and preparing a status information for each tab.

The popup script is used to interact with the end users. The end users can see the status of the webpage (e.g. opt-in status or manifest comparison results or warnings) and if the web page is not opt-in the protocol they can generate a new manifest.json file for the current URL. Moreover, the end users can download the manifest.json file declared by the developer if the webpage is opt-in. Hence, the 'generate manifest' button is enabled only if the webpage is not opt-in and the 'download manifest' button is enabled only if the webpage is opt-in.


<h3>The browser-extension folders and files are organised in the following way:</h3>

+background				
	+sxg
		+go
			sxg_lib.go  : [Implementation of SXG library, implemented with Go ]
		lib.wasm 		: [Required for web assembly execution]
		sxg_setup.js    : [SXG library startup]
		wasm_exec.js    : [Required for web assembly execution]
	ac_content.js 		: [Active content operations]	
	consts.js 			: [Global variables and constants]
	eval.js 			: [Evaluation of manifest file and comparing it with HTML content]
	eval_helpers.js 	: [Evaluation helpers]
	gen_manifest.js 	: [Manifest generation operations]
	helpers.js 			: [Global helper methods]
	main.js 			: [Managing webrequests and message passing with content and popup scripts]
	manifest.js 		: [Manifest operations]
	mutex.js 			: [Mutual exclusion for inserting evaluation results]
	tab_info			: [Tab info collection]
	tabs.js  			: [Managing active tabs]

+content 				
	active.js 			: [Declaring the active content and serialising methods]
	content.js 			: [Content script for taking active elements from front-end]
	down_manifest.js 	: [Download generated manifest file]
	helper.js 			: [Global helper methods]
	links_info.js 		: [For Progressive web applications, collecting script links, currently inactive]
	struct.js 			: [Data structures for each type active content]

+ext
	External libraries (i.e. async, crypto and jquery)

+img
	Icons (i.e. ok, error and uncomplying)

+lib
	gen_helper.js 		: [Global cryptographic methods]

+popup 					
	index.html 			: [Popup window page]
	index.js 			: [Popup window script]





<h3>The docker image has the following structure:</h3>


+conf 					: [Configuration files for running nginx and docker ]
	Dockerfile 			: [Creates nginx docker image for serving testing web applications]
	localhost.conf 		: [Nginx configurations, currently port number is 85]
	manifest_docker		: [Docker image for SXG. It makes SXG functionalities available in Makefiles in each web application folder]
	mime.types 			: [Mime types for Nginx, new types are related to SXG]
	nginx.conf 			: [General Nginx configurations]

docker_compose.yml		: [Multi container for nginx, SXG and advertisement services]

run.sh 					: [Runs the docker-compose]
stop.sh 				: [Stops the docker-compose]

+logs
	error.log 			: [Error log file for nginx errors]


+src
	Makefile 			: [Just type make; the available functionalities will be printed. ]
		make new project={project_name} : Creates a new project in /src/sites/{project_name}
		make new : Creates a new project with {project_name}=test or test_1 or test_2 etc.
		make sxg_keys : For creating SXG keys and certificates. Created sxg keys and certificates are placed in /src/keys/ folder.
	
	+ad_supplier 		: [Adsense imitation program, that supplies adverts for applications]
	
	+case-studies 		: [The case studies applications that we evaluated in the research paper, with the manifest files and signatures ]

	+examples 			: [Simple web applications that we used for testing the browser extension and manifest files]

	+lib 				: [Collection of most used codes, some currently unused ]

	+sites 				: [The web applications created via Makefile are automatically placed under this folder]

	+tmp				: [Templates for Makefiles that will be copied to every new web application under sites folder]



<h3>The Nimiq Code</h3>

We copied the Nimiq's Wallet, Hub and Keyguard applications. They can be run with the docker-compose file under the /nimiq-code folder.


