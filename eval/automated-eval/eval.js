const lighthouse  = require('./src/lighthouse.js');
const nimiq       = require('./src/nimiq.js');
const helper      = require('./src/helper.js');
const {URL}       = require('url');
const fs          = require('fs');

(async() => {

    await helper.greetings(process.env.EVAL || helper.DEFAULT_EVAL, process.env.EXT || helper.DEFAULT_EXT, process.env.COUNT || helper.DEFAULT_COUNT );

   const browser = await helper.generateBrowser(process.env.EVAL || helper.DEFAULT_EVAL, 
                     process.env.EXT || helper.DEFAULT_EXT, process.env.HEADLESS || helper.DEFAULT_HEADLESS );

    var page, sites;
    var individualSite = false;
    var authRequired = false;

    if (process.env.SITE){
      let indSite = process.env.SITE;
      if (indSite == 'http://localhost:8085/casedelegatetrust/index.html' ||
            indSite == 'http://localhost:8085/untrustedadsensenimiq/index.html' ){
          authRequired = true;
      }
      sites = [process.env.SITE];
      individualSite = true;
    }
    if (process.env.EVAL !== 'whatsapp' && process.env.EVAL !== 'compart'){
        

        if (authRequired){
          page = await browser.newPage();
          await nimiq.createUserData(page);
          await helper.sleep(1500);
          page.close();
        }
        
        if (!individualSite){
            sites = helper.sites;//every case studies except compartmentalisation and whatsapp
        }
        
    }else{

      page = await browser.newPage();//because currentTabId is confused in automated mode, we are creating a new tab for that
      await helper.sleep(100);
      page.close();//then closing it
      if (process.env.EVAL == 'whatsapp'){

          sites = helper.cvWebsites;//only web.whatsapp
      }else{
          
          sites = helper.compartWebsites;//only http://localhost:8081
      }
    }

    const port = (new URL(browser.wsEndpoint())).port;
    const loopTotal = process.env.COUNT || helper.DEFAULT_COUNT;
    const evalTimeStamp = Date.now();

    for (const site of sites){
      
      var fmP = 0, lcP = 0, inter = 0, tbt = 0 ; var mtd = 0;
      
      for (var i = 0 ; i < loopTotal; i++ ){
          await helper.sleep(500);

          console.log(`${i}-`);

          if (process.env.EVAL == 'visit'){

            page = await browser.newPage();
            await page.goto(site);


          }else if (process.env.EVAL == 'whatsapp'){
            page = await browser.newPage();
            await page.goto(site);
            const metrics = await page.metrics();
            mtd += metrics.TaskDuration;
            // console.log(metrics.TaskDuration);
            await helper.sleep(4000);
            page.close();

            if (i == loopTotal - 1){

              let average = mtd/loopTotal;
              console.log("Average ::", average);

              let strOutput = "---------------------------------\n";
                  strOutput += "URL :: " + site + "\n";
                  strOutput += " average task duration : " + average + "\n";
                  strOutput += "---------------------------------\n";

              fs.appendFile(`${process.env.EVAL || helper.DEFAULT_EVAL}_${process.env.EXT || helper.DEFAULT_EXT}_${evalTimeStamp}.txt`, strOutput, function (err) {
                    if (err) throw err;
                  });

              console.log(`Evaluation finished, results are appended to ${process.env.EVAL || helper.DEFAULT_EVAL}_${process.env.EXT || helper.DEFAULT_EXT}_${evalTimeStamp}.txt file in the directory`);
              await browser.close();
            }

          }else{

              // const browser = await helper.generateBrowser(process.env.EVAL || helper.DEFAULT_EVAL, 
                    // process.env.EXT || helper.DEFAULT_EXT, process.env.HEADLESS || helper.DEFAULT_HEADLESS );

              // const port = (new URL(browser.wsEndpoint())).port;

              // if (authRequired){
              //     page = await browser.newPage();
              //     await nimiq.createUserData(page);
              //     await helper.sleep(1500);
              //     page.close();
              // }

              let res = await lighthouse.report(site, port, process.env.HEADLESS || helper.DEFAULT_HEADLESS);

              fmP   += res.audits['first-contentful-paint'].numericValue;
              lcP   += res.audits['largest-contentful-paint'].numericValue;
              inter += res.audits['interactive'].numericValue;
              tbt   += res.audits['total-blocking-time'].numericValue;

              let numericOutput = `${res.audits['first-contentful-paint'].numericValue} - ${res.audits['largest-contentful-paint'].numericValue} - ${res.audits['interactive'].numericValue} - ${res.audits['total-blocking-time'].numericValue}\n`;

              fs.appendFile(`${process.env.EVAL || helper.DEFAULT_EVAL}_${process.env.NODE}_${evalTimeStamp}.txt`, numericOutput, function (err) {
                    if (err) throw err;
              });

              if (i == loopTotal - 1){
                  let strOutput = "---------------------------------\n";
                  strOutput += "URL :: " + site + "\n";
                  strOutput += " first-contentful-paint : " + fmP/loopTotal + "\n";
                  strOutput += " largest-contentful-paint : " + lcP/loopTotal + "\n";
                  strOutput += " interactive : " + inter/loopTotal + "\n";
                  strOutput += " total-blocking-time : " + tbt/loopTotal + "\n";
                  strOutput += "---------------------------------\n";

                  console.log(strOutput);

                  fs.appendFile(`${process.env.EVAL || helper.DEFAULT_EVAL}_${evalTimeStamp}.txt`, strOutput, function (err) {
                    if (err) throw err;
                  });
                  console.log(`Evaluation finished, results are appended to ${process.env.EVAL || helper.DEFAULT_EVAL}_${process.env.NODE}_${evalTimeStamp}.txt file in the directory`);
                  await browser.close();
              }
          }

      }
    }

    
    

})();

