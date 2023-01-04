
const puppeteer   = require('puppeteer');
module.exports.nimiqHub = 'http://localhost:8080/onboard/demos.html';


module.exports.sites = [
           "http://localhost:8085/casedelegatetrust/index.html",
           "http://localhost:8085/untrustedadsensenimiq/index.html",
           "http://localhost:8085/helloworld/index.html",
           "http://localhost:8085/jquerytrusted/index.html"
    ];

module.exports.cvWebsites = ["https://web.whatsapp.com"];
module.exports.compartWebsites = ["http://localhost:8081"];


module.exports.DEFAULT_COUNT = 1;
module.exports.DEFAULT_EVAL = 'baseline';
module.exports.DEFAULT_EXT = 'accjs';
module.exports.DEFAULT_HEADLESS = false;


const baselineGreetings = "Baseline evaluation on case studies: without CSP and Accjs extension. The results will be listed below ";
const withCSPGreetings = "CSP evaluation: CSP enabled for all case studies and Nimiq sites, and Accjs extension disabled. The results will be listed below ";
const whatsappGreetings = "Evaluation on https://web.whatsapp.com ";
const accjsGreetings = "Evaluation on case studies ";
const compartGreetings = "Compartmentalisation evaluation on nimiq wallet http://localhost:8081 ";


const pathToCSPDisableExtension = require('path').join(__dirname, '../csp-disable-extension');
const pathToCVExtension = require('path').join(__dirname, '../meta-code-verify');
const pathToAccjsExtension = require('path').join(__dirname, '../accjs-extension');





module.exports.greetings = async (evalType, extension, count) => {
	if (evalType === 'baseline'){
		console.log(`${baselineGreetings} for COUNT :: ${count}`);
	}else if (evalType === 'with-csp'){
		console.log(`${withCSPGreetings} for COUNT :: ${count}`);
	}else if (evalType === 'whatsapp'){
		console.log(`${whatsappGreetings} using extension :: ${extension} for COUNT :: ${count}. The results will be listed below`);
	}else if (evalType === 'accjs'){
		console.log(`${accjsGreetings} using extension :: ${extension} for COUNT :: ${count}. The results will be listed below`);
	}else if (evalType === 'compart'){
		console.log(`${compartGreetings} using extension :: ${extension} for COUNT :: ${count}. The results will be listed below.\n` 
			+ "Note that baseline vs eval configuration on compartmentalisation evaluation should be done via docker, please follow instructions in the README file\n");
	}
}

module.exports.generateBrowser = async (evalType, extension, headlessArg) => {

	var args = [];
	if (evalType === 'baseline') {
	    // args = [`--disable-extensions-except=${pathToCSPDisableExtension}`,
	    //       `--load-extension=${pathToCSPDisableExtension}`];
	    args = [];
	    
	}else if (evalType === 'with-csp' ) {
		
	}else if (evalType === 'whatsapp'){

		if (extension === 'code-verify'){
			args = [`--disable-extensions-except=${pathToCVExtension},${pathToCSPDisableExtension}`,
	          `--load-extension=${pathToCVExtension},${pathToCSPDisableExtension}`];
		}else if (extension == 'accjs'){
			args = [`--disable-extensions-except=${pathToAccjsExtension},${pathToCSPDisableExtension}`,
	          `--load-extension=${pathToAccjsExtension},${pathToCSPDisableExtension}`];
		}else if (extension == 'baseline'){
			args = [`--disable-extensions-except=${pathToCSPDisableExtension}`,
	          `--load-extension=${pathToCSPDisableExtension}`];
		}
	}else if (evalType === 'accjs'){
		// args = [`--disable-extensions-except=${pathToAccjsExtension},${pathToCSPDisableExtension}`,
	    //       `--load-extension=${pathToAccjsExtension},${pathToCSPDisableExtension}`];
		args = [`--disable-extensions-except=${pathToAccjsExtension}`,
	          `--load-extension=${pathToAccjsExtension}`];
	}else if (evalType === 'compart'){
		args = [`--disable-extensions-except=${pathToAccjsExtension},${pathToCSPDisableExtension}`,
	          `--load-extension=${pathToAccjsExtension},${pathToCSPDisableExtension}`];
	}else if (evalType === 'visit'){
		if (extension === 'accjs'){
			args = [`--disable-extensions-except=${pathToAccjsExtension}`,
	          `--load-extension=${pathToAccjsExtension}`];
		}
	}else {
		console.log('The experiment couldnt be found, EVALUATION.md file explains possible experiments. Quiting.');
		process.exit();
	}

	let headless = false;
	if (String(headlessArg).toLowerCase() == "true"){
		headless = true;
	}


	const browser = await puppeteer.launch({
	      // userDataDir: '../tmp/user-data-dir',
	      headless: headless,
	      defaultViewport: null,
	      args : args
	    });
	    return browser;
}



module.exports.sleep = async (ms) => {

	return new Promise((resolve) => {
	    setTimeout(resolve, ms);
	  });

}