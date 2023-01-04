
The folder includes :
	*	accjs-extension : The Chrome extension that is prototyped by authors to evaluate performance and compatibility on various case studies.
	* eval : Everything needed for evaluation (performance and compatibility). Docker containers, chrome browser extensions and an automated evaluation tool. 
	* tamarin-protocol : Tamarin Prover model files for Accountable JS and Code Verify protocols.
	* MANIFEST_MANUAL.md : elaborates on manifest directives used in manifest files
	* accjs-full.pdf : the full version of the research paper
	* EVALUATION.md : Shows the evaluation procedures for the case studies.
	* Browser_extension.md : Shows a full list of operations which the developer can follow to produce a manifest file automatically using chrome extension


The 'eval' folder includes:
	*	csp-disable-extension : This extension only works for 'web.whatsapp.com' and it removes Content-Security-Policy response headers.
	*	meta-code-verify : This extension is developed by Meta, it also only works for 'web.whatsapp.com'.
	*	docker : Includes a docker container to run the case study websites developed by authors and Nimiq websites (wallet,hub,keyguard) with specific response headers that should be configured for each evaluation. The docker container can create new websites, sign/evaluate manifest files and serve those websites on an Nginx server. More information is in EVALUATION.md file.
	*	automated_eval : Includes an automated evaluation tool developed by authors to automatically evaluate websites using puppeteer, lighthouse and puppeteer page.metrics. 


The browser extensions can also be directly inserted to Chrome browsers by navigating chrome://extensions/ URL, switching on the 'Developer mode' then chosing 'Load unpacked'. For compatibility analysis of case studies one can use this method.

For the folder that includes docker image: 
there is a ’src’ directory and in this directory where there is a Makefile that you can manage to create new web apps and manifest files with a template. Type ‘make’ to see the options in that directory.
“make new project=test” will create a new folder ’test' in ’src/sites’ directory; and index.html, index.json and a Makefile in this folder. Then you can modify them.
Then provide a x-acc-js-link response header in 'docker/src/conf/(no-csp || with-csp)/localhost.conf'

The template also creates a new Makefile under the new app directory, with that you can generate the .sxg file from the manifest. It requires go/signedexchange tool, that is available with: go get -u github.com/WICG/webpackage/go/signedexchange/cmd/...
more info available here : https://github.com/WICG/webpackage/tree/master/go/signedexchange
However, the docker container includes a copy of the signedexchange tool, the instructions are available in the created Makefile.

Running the docker will make your site accessible from the browser: e.g. http://localhost:8085/(test)/index.html

If you want to collaborate with new ideas or you want to improve the browser extension implementation or you found a bug please contact me from ilkan.esiyok@cispa.de 

