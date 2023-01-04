<h3>1. Introduction</h3>

We implemented a browser extension that applies our Accountable Javascript protocol for Google Chrome and it runs in non-debug mode. It can control every browser tabs, collects tab infos and notifies the user by changing the icon on the extension bar. One can see more detailed information about the website on the current tab by clicking on the extension icon. 


* A red icon means there is an error on the page regarding the protocol.

* A grey icon means either the webpage is in-compliant with the protocol or the signature verification on the signed-manifest was unsuccessful.

* A yellow icon means either the evaluation is still in progress or there is a warning from the extension (the warning functionality is not implemented yet)

* A green icon means the website is fully compliant with the protocol.


<h3>2. Browser Extension Website Evaluation Process</h3>

The browser extension has control over the entire lifespan of the browser tab from tabCreate event till the tabClose event. When a new tab is created in the browser, the extension simply assigns the ‘in-compliant’ status and the icon will be grey on this tab. When the user puts a link to the address bar and the browser initiates to retrieve the website, then the browser extension starts to listen for responseHeaders for “x-acc-js-link” directive which points to a URL that includes a signed manifest. The browser extension will retrieve the signed manifest from this URL and verify its signature. If the signature cannot be verified then the website is labeled as in-compliant with the protocol at this stage, if it is verified then the measurement below will be applied.

In parallel, the browser extension also injects content scripts to the webpage which observe the Document Object Model and sort out the “active content” to a list. An active content can be an inline javascript, an event handler, an external javascript (from a cross-origin resource), a local javascript (from a same-origin resource) or an iframe (which has its own document and may contain other active contents inside). An active content that is inserted to the webpage after window.load event are considered “dynamic” and they must be declared with a specific directive in the website manifest.

The content scripts send the active_content_list to the background script that will measure if the information inside the manifest is consistent what has been delivered to the browser. If everything is consistent with the manifest, then the icon will be green and the website will be labeled as ‘compliant’, if there are inconsistencies in between then the icon will be red and the inconsistencies will be listed in the browser extension window. The browser extension icon turns into the yellow icon during the measurement to show the it is ‘in progress’, however the icon change is instant and invisible for most of the websites.

</h3>3. Automatically Generating a Manifest for a Website</h3>

One can automatically generate a manifest for any website using the browser extension. The “Generate Manifest” button will generate a manifest in “JSON” format and download it to the computer. The file name can be changed and signed by the developer, and placed in a Webserver or a CDN for quick access.

The “Generate Manifest” assumes the trust level is “assert” for all elements, but since the generated manifest is in human-readable JSON format, the developer can update the information on the manifest file using a text editor.  

In the Accountable javascript protocol, we enable the developers to decide trust levels for their elements. The declared trust level also indicates the measurement method to the browser extension. There are four trust levels that can be declared in the manifest: 
* If the developer is confident about an active element will not change in the future or she approves to generate a new manifest for any future changes in the content, then she can “assert” it by providing a cryptographic hash of this delivered element in the manifest. The hash computation must be in SRI format.
* If the developer is not sure about the element, she can “delegate” this element to its developer in which the browser extension will retrieve another manifest for this element.
* If the developer approves every possible changes on an active element, then she can “blind-trust” to this element. We anticipated that the developers might import active elements that cannot be asserted or delegated yet.  One of our objectives is to reduce the usage of “blind-trust” option with pervasive developer support on our protocol and remove it in the future. This option requires the URL given in the manifest matches the URL of the element (except the query part in the URL).
* There is also a “sandboxed-delegate” option that is available for iframe elements only. The delivered iframe element must be sandboxed. The sandbox attribute of the iframe can either be empty(all restrictions apply) or it can only include “allow-forms” and “allow-scripts” values.  This option commonly applies to security critical websites that want to protect data from “cross-origin” active elements. Using this option the developer can provide accountability that the critical content is protected. The browser extension will also retrieve another manifest for the iframe element (the “delegate” and “sandboxed-delegate” trust levels require the developer knows that the delegated element is compliant with the protocol a-priori). 


<h3>4. Signing a Manifest file</h3>

We use Signed Http Exchanges (SXG) protocol [2] for signing the generated manifest file. With SXG website publishers can make their content portable while still preserving its integrity and authenticity. Hence, a website can be published from different origins e.g., a CDN.

In order to create an SXG, one needs a certificate and a private key pair. The SXG certificate is basically a TLS certificate with “CanSignHttpExchanges” extension, but it cannot be used in TLS handshake. As of today, Digicert [3] is the only Certificate Authority that sells this certificate.

The SXG developers provide some examples in [4] and they provide three command line tools for web application developers:
gen-certurl : for converting X.509 certificate to an SXG certificate,
gen-signedexchange : for generating signed exchanges from a content using command line arguments (e.g., a manifest.json file),
dump-signedexchange : for verifying an SXG against a given certificate.

For demonstration purposes, we created a docker image that includes a Webserver that can publish contents in localhost and the command line tools above are also available in the docker image. For convenience, we created Makefiles that can guide the developers for: creating websites, generating SXG certificates and private keys, and generating and verifying SXG signatures. The usage of the docker image is demonstrated in the Evaluation Section below.


<h3>References</h3>

1. Using Subresource Integrity, https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity#using_subresource_integrity 
2. Yasskin J, April 2021, Signed Http Exchanges, Internet Draft, https://wicg.github.io/webpackage/draft-yasskin-http-origin-signed-responses.html 
3. Get your Signed Http Exchanges Certificate, https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/
4. Signed Http Exchanges Github page, https://github.com/WICG/webpackage/tree/main/go/signedexchange
