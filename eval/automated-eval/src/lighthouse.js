
const lighthouse = require('lighthouse');
const constants = require('lighthouse/lighthouse-core/config/constants.js');

module.exports.report = async (site, port, headless) => { 

        let chromeFlags = ['--disable-mobile-emulation'];
        // if (headless == true){
        //     chromeFlags = ['--disable-mobile-emulation, --headless'];
        // }else{
        //     chromeFlags = ['--disable-mobile-emulation'];
        // }

        const config = {
          extends: 'lighthouse:default',
          settings: {
            formFactor: 'desktop',
            throttling: constants.throttling.desktopDense4G,
            screenEmulation: constants.screenEmulationMetrics.desktop,
            emulatedUserAgent: constants.userAgents.desktop,
          },
          onlyAudits: [
              'first-contentful-paint',
              'largest-contentful-paint',
              'interactive',
              'total-blocking-time'
            ],
        };

        const results = await lighthouse(site, {
            port: port,
            output: 'json',
            logLevel: 'error',
            disableDeviceEmulation: true,
            chromeFlags: chromeFlags,
            onlyCategories: ['performance'],
            
        }, config);

        var res = JSON.parse(results.report);

        return res;
};