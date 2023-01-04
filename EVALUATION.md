

<h3>The 'eval' folder :</h3>
    *   accjs-extension : The Chrome extension that is prototyped by authors to evaluate performance and compatibility on various case studies.
    *   csp-disable-extension : This extension only works for 'web.whatsapp.com' and it removes Content-Security-Policy response headers.
    *   meta-code-verify : This extension is developed by Meta, it also only works for 'web.whatsapp.com'.
    *   docker : Includes a docker container to run the case study websites developed by authors and Nimiq websites (wallet,hub,keyguard) with specific response headers that should be configured for each evaluation. The docker container can create new websites, sign/evaluate manifest files and serve those websites on an Nginx server. 
    *   automated_eval : Includes an automated evaluation tool developed by authors to automatically evaluate websites using puppeteer and lighthouse. 



<h3>EVALUATION ENVIRONMENT</h3>

We have done the experiments on a MacBook Pro with 2 GHz Intel Quad-Core i5, 16 GB RAM and macOS Monterey 12.5.1
with Google Chrome 107.0.5304.121. We used docker version 20.10.11 and nodejs v18.12.1.

<h3>EVALUATION</h3>

The evaluation requires different configurations for running the docker containers and the automated performance analysis tool.
The instructions are given below.

<h3>REQUIREMENTS</h3>

1. Before the evaluation the signatures on the manifest files for each case study and the Nimiq apps should be renewed. 
We prepared a Makefile for this.

Run the docker with the following commands first:
```
    cd eval/docker
    CSP_ENV=no-csp NIMIQ_ENV=no-csp docker-compose up --build -d
```
Then in docker/ folder proceed to 'src' folder then run the Makefile:

```
    cd src
    make renew_sxg
```
You can run 'make' to see other options in the Makefile.
You can stop the docker container using the following command in the 'eval/docker' folder if necessary.
If you will proceed with the BASELINE experiment below, no need to stop it.
```
    cd ..
    docker-compose down
```


2. The automated evaluation tool is a nodejs application, development dependencies should be installed before using.

```
    cd eval/automated-eval
    npm install
```

3.  For web whatsapp we are required to provide hardcoded SRI tags for each script in the browser extension, because web.whatsapp doesn't deliver SRIs.
It is possible that web.whatsapp website changes their scripts, so the hardcoded SRIs and the manifest file should be updated in this case.
For testing this: 
    *   load the 'eval/accjs-extension' to your browser,
    *   make the docker container running like above,
    *   navigate to https://web.whatsapp.com website on chrome,
    *   Then observe the browser extension's behaviour, if the reaction is "green tick" icon, then no other action is needed.
    *   If the reaction is "red" icon, then the hardcoded SRIs and the manifest file should be updated.

For updating the Manifest file:
    *   Click on the extension "red" icon, then on the panel click on the "Generate Manifest" button (there is a glitch you might need to click two times)
    *   Then it will download a json file, rename it to "index.json" 
    *   and copy the "index.json" file to "eval/docker/src/sites/whatsapp" folder.
    *   then in this folder run :
            ```
            make docker_gen uri=index.html data=index.json
            ```
    *   This will create the new signature for the manifest.

For updating the hardcoded SRIs:
    *   Proceed to 'eval/accjs-extension/content'
    *   open the 'hardcoded_sri.js' file in a text editor
    *   Then copy integrity hashes and urls of only 'external' manifest sections in "eval/docker/src/sites/whatsapp/index.json" file
    *   add them to 'hardcoded_sri.js' file in the following manner
            ```
            hardcodedHashes.set("https://web.whatsapp.com/vendors...js", "sha256-eTaHrueRhsSLoFC00AJdT2uNgnmzVaXZgS8DsVkgiog=");
            ```
    *   Then, update the extension on the browser.
    *   It should show a green tick now, namely it is compatible




<h3>EXPERIMENTS</h3>

You can find our performance experiment results in 'eval/automated-eval/author_eval_results' folder.

<h4>BASELINE</h4>

The baseline evaluation is an experiment that excludes Content-Security-Policy, Code-Verify and Accountable Js extensions.
For baseline evaluation the docker has to run with the following configurations, 
if you have already done the actions in REQUIREMENTS section and you didn't stop the docker container, 
you can skip the first command in the following and proceed with the automated eval tool.

```
    cd eval/docker
    CSP_ENV=no-csp NIMIQ_ENV=no-csp docker-compose up --build -d
```

This will run the case study websites on http://localhost:8085/case-study-name/index.html.
Case study website names : 
    *   untrustedadsensenimiq
    *   helloworld
    *   casedelegatetrust
    *   jquerytrusted
Also, the Nimiq websites will run on:
    *   Hub : localhost:8080
    *   Keyguard : localhost:8000
    *   Wallet : localhost:8081 

Then proceed with the automated-eval tool. 
The EVAL argument takes the experiment name and it should be 'baseline' in this case.
The evaluation tool can run headless with HEADLESS=true option, the default is false.
We recommend to run it on headful mode to test for compatibility (to see the "green tick" reaction on websites) for Accountable JS experiments.
For performance evaluation, we recommend to run in headless mode, the browser will not intervene your actions on your computer in this way.
For observing the chrome extension's reaction, it should be manually pinned to the toolbar on the top-right of the browser.
Automated pinning cannot be configured on Google Chrome.
The evaluation takes the number of times the experiment should run for each case study using the COUNT argument, the default is 1. The tool will visit the each case study website COUNT times, evaluate performance with lighthouse and find the average of them. We have run the experiments 200 times for each case study.
The automated eval tool firstly creates an account on Nimiq Hub automatically, then proceeds with the case studies.

```
    cd eval/automated-eval
    EVAL=baseline HEADLESS=false COUNT=2 node eval.js 
```

Alternatively, you can run the automated_eval tool for any individual site and evaluation type, using the site URL as below.
```
    cd eval/automated-eval
    EVAL=baseline SITE=http://localhost:8085/helloworld/index.html HEADLESS=false COUNT=2 node eval.js 
```

The site names are as the following:
*   Hello World application : http://localhost:8085/helloworld/index.html
*   Trusted Third Party : http://localhost:8085/jquerytrusted/index.html
*   Delegate Trust to Third Party (Nimiq A) : http://localhost:8085/casedelegatetrust/index.html
*   Untrusted Third Parties (Nimiq B + AdSense) http://localhost:8085/untrustedadsensenimiq/index.html
*   For Nimiq Wallet (used in compartmentalisation) : http://localhost:8081


<h4>CSP Evaluation</h4>

This is the performance evaluation for Content-Security-Policy. So, we have defined Content-Security-Policy response headers as detailed as the Accountable JS manifest files and evaluated the performance results. We didn't change the Content-Security-Policy on web.whatsapp.
For this, stop the docker container first if it is running and then run the proceeding docker command:

```
    cd eval/docker
    docker-compose down
    CSP_ENV=with-csp NIMIQ_ENV=with-csp docker-compose up --build -d
```
Then proceed with the automated-eval tool.

```
    cd eval/automated-eval
    EVAL=with-csp HEADLESS=false COUNT=2 node eval.js 
```

<h4>Baseline on Whatsapp</h4>
This is the baseline performance evaluation on web.whatsapp. It only works for web.whatsapp, so we only experiment on that site.
For this, stop the docker container first if it is running and then run the proceeding docker command:

```
    cd eval/docker
    docker-compose down
    CSP_ENV=no-csp NIMIQ_ENV=no-csp docker-compose up --build -d
```

Then proceed with the automated-eval tool. 
EXT argument choses the extension to be used. It is baseline in this case, the other options are "accjs" and "code-verify". The default is "accjs" and it is meaningful only when EVAL=whatsapp.

```
    cd eval/automated-eval
    EVAL=whatsapp EXT=baseline HEADLESS=false COUNT=2 node eval.js 
```

<h4>Code Verify on Whatsapp</h4>

This is the performance evaluation of Code Verify browser extension. It only works for web.whatsapp, so we only experiment on that site.
For this, stop the docker container first if it is running and then run the proceeding docker command:

```
    cd eval/docker
    docker-compose down
    CSP_ENV=no-csp NIMIQ_ENV=no-csp docker-compose up --build -d
```

Then proceed with the automated-eval tool. 
EXT argument choses the extension to be used. It is code-verify in this case, the other options are "accjs" and "baseline". The default is "accjs" and it is meaningful only when EVAL=whatsapp.

```
    cd eval/automated-eval
    EVAL=whatsapp EXT=code-verify HEADLESS=false COUNT=2 node eval.js 
```

<h4>Accountable JS on Whatsapp</h4>

We evaluate the Accountable JS extension only on web.whatsapp like in the previous experiment and compare the Code Verify with Accountable JS.
For this, stop the docker container first if it is running with different configuration and then run the proceeding docker command.
If you have done the previous experiment, you don't need to stop and run the docker again, proceed with the automated eval tool.

```
    cd eval/docker
    docker-compose down
    CSP_ENV=no-csp NIMIQ_ENV=no-csp docker-compose up --build -d
```
Then proceed with the automated-eval tool. EXT=accjs in this case.
```
    cd eval/automated-eval
    EVAL=whatsapp EXT=accjs HEADLESS=false COUNT=2 node eval.js 
```

<h4>Accountable JS on Case Studies</h4>

We evaluate the Accountable JS extension on all case studies : 
(HelloWorld, Trusted Third Party, Delegate Trust to Third Parties (Nimiq A) and Untrusted Third Party Code (AdSense + Nimiq B) ).
For this, stop the docker container first if it is running with different configuration and then run the proceeding docker command.
If you have done the previous experiment, you don't need to stop and run the docker again, proceed with the automated eval tool.
```
    cd eval/docker
    docker-compose down
    CSP_ENV=no-csp NIMIQ_ENV=no-csp docker-compose up --build -d
```
Then proceed with the automated-eval tool. 
```
    cd eval/automated-eval
    EVAL=accjs HEADLESS=false COUNT=2 node eval.js 
```

<h4>Compartmentalisation</h4>

The compartmentalisation is a different experiment than others, there is the baseline experiment phase and then there is evaluation phase.
The experiments are done on Nimiq Wallet, localhost:8081. 
The Nimiq Wallet website delivers Nimiq Hub in an iframe and then Nimiq Hub embeds Nimiq Keyguard in a nested iframe as well, if the user doesn't 
have an account stored in the browser yet. 
What's more, it redirects to Nimiq Hub in this case to make the user create an account.
If the user has an account stored on the browser, then the Nimiq Wallet only delivers Nimiq Hub in an iframe, and the Keyguard is not embedded.
In order to get the case study we explained in the paper, we didn't create an account for the user and we changed the part in the Nimiq code that redirects to the Nimiq Hub and we made the Nimiq Wallet stay on the same URL.
Hence, in this experiment, we don't create an account on Nimiq.

1.  In the baseline phase, Nimiq Wallet's manifest is based on assertions and it includes both Nimiq Hub and Nimiq Keyguard manifests embedded inside.
For baseline performance evaluation, stop the docker container and run with the following configurations:
```
    cd eval/docker
    docker-compose down
    CSP_ENV=no-csp NIMIQ_ENV=compart-baseline docker-compose up --build -d
```
Then proceed with the automated-eval tool. 
```
    cd eval/automated-eval
    EVAL=compart HEADLESS=false COUNT=2 node eval.js 
```

2.  In the evaluation phase, Nimiq Wallet's manifest is based on assertions and delegations. The Nimiq Keyguard's manifest is delegated to its website. 
In addition, the Nimiq Keyguard's manifest is signed with a different key.
For performance evaluation, stop the docker container and run with the following configurations:

```
    cd eval/docker
    docker-compose down
    CSP_ENV=no-csp NIMIQ_ENV=compart-eval docker-compose up --build -d
```
Then proceed with the automated-eval tool. 
```
    cd eval/automated-eval
    EVAL=compart HEADLESS=false COUNT=2 node eval.js 
```


