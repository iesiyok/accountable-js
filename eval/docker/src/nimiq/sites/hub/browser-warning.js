(function(){function h(){var b=!0===window.navigator.standalone,a=window.matchMedia("(display-mode: standalone)").matches;if(b||a)return!1;b=navigator.userAgent;if(!("undefined"!==typeof navigator.mediaDevices&&"undefined"!==typeof navigator.mediaDevices.getUserMedia||"https:"!==location.protocol&&"localhost"!==location.hostname||/CriOS/i.test(b)||g()))return!0;a=["FB_IAB","Instagram"];for(var c=0;c<a.length;c++)if(-1<b.indexOf(a[c]))return!0;return!1}function g(){if("undefined"===typeof Symbol)return!0;
try{eval("class Foo {}"),eval("var bar = async (x) => x+1")}catch(b){return!0}return k()||-1!==navigator.userAgent.indexOf("Edge")}function k(){if(!/iP(hone|od|ad)/.test(navigator.platform))return!1;var b=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);b=[parseInt(b[1],10),parseInt(b[2],10),parseInt(b[3]||0,10)];return 11>b[0]||11===b[0]&&2>=b[1]}function l(){var b;(b=/Constructor/.test(window.HTMLElement))||(b=window.safari,b="[object SafariRemoteNotification]"===(!b||b.pushNotification).toString());
return b}function m(){return new Promise(function(b){var a=function(){b(!0)},c=function(){b(!1)};if(window.webkitRequestFileSystem)return void window.webkitRequestFileSystem(0,0,c,a);if("MozAppearance"in document.documentElement.style){var e=indexedDB.open(null);e.onerror=a;e.onsuccess=c}else{if(l())try{window.openDatabase(null,null,null,null)}catch(d){return a()}return window.indexedDB||!window.PointerEvent&&!window.MSPointerEvent?c():a()}})}function n(){try{var b=window.localStorage;b.setItem("__storage_test__",
"__storage_test__");b.removeItem("__storage_test__");return!0}catch(a){return a instanceof DOMException&&(22===a.code||1014===a.code||"QuotaExceededError"===a.name||"NS_ERROR_DOM_QUOTA_REACHED"===a.name)&&0!==b.length}}function f(b){var a=document.getElementById("browser-warning-container"),c=document.createElement("div");c.id="browser-warning-container";c.innerHTML=a.textContent;a.insertAdjacentElement("beforebegin",c);a.parentNode.removeChild(a);a={hasShareButton:!0,useNativeShare:!!navigator.share,
shareUrl:location.href};c=!1;var e="Chrome, Firefox, Safari or another browser";"web-view"===b?(a.headline="Please open the page in your browser",a.message="You're currently in a so-called in-app browser. They have restricted functionality."):"no-local-storage"===b||"private-mode"===b?(a.headline="no-local-storage"===b?"Local storage not available":"Incompatible private browsing mode",a.message="no-local-storage"===b?"Local storage is not available. You might be in private browsing mode.":"This browser does not support opening this page in private browsing mode.",
a.useNativeShare=!1,e="a normal tab"):(a.headline="Unsupported browser",a.message="Your browser is not able to run Nimiq. Please update your browser.",c=!0);a.shareInstructions=(c?"Alternatively, ":"Please ")+(a.useNativeShare?"use the button below and choose to open in ":"copy the link and open it in ")+e+".";if(window.onBrowserWarning&&(c=window.onBrowserWarning(b,a)))for(var d in c)a[d]=c[d];document.getElementById("browser-warning-headline").textContent=a.headline;d=document.getElementById("browser-warning-message");
d.textContent=(a.message?a.message:"")+" "+(a.hasShareButton&&a.shareInstructions?a.shareInstructions:"");a.hasShareButton&&d.appendChild(p(a.shareUrl,a.useNativeShare));document.body.setAttribute("data-browser-warning",b);window.hasBrowserWarning=!0}function p(b,a){a=a&&!!navigator.share;var c=document.createElement("button");c.className="nq-button";c.style.display="block";c.style.margin="5rem auto 2rem";c.textContent=a?"Open in browser":"Copy link";c.onclick=function(){a?navigator.share({url:b}):
(c.className="nq-button green",setTimeout(function(){c.className="nq-button"},1500),q(b)||alert("Copy failed. "+(b===location.href?"Please copy this page's URL manually from the address bar.":"Please input the following manually in another browser: "+b)))};return c}function q(b){var a=document.createElement("textarea");a.value=b;a.setAttribute("readonly","");a.style.contain="strict";a.style.position="absolute";a.style.left="-9999px";a.style.fontSize="12pt";document.body.appendChild(a);a.select();
a.selectionStart=0;a.selectionEnd=b.length;b=!1;try{b=document.execCommand("copy")}catch(c){}a.parentNode.removeChild(a);return b}g()?f("browser-outdated"):h()?f("web-view"):n()?m().then(function(b){!b||-1<navigator.userAgent.toLowerCase().indexOf("chrome")||f("private-mode")}):f("no-local-storage")})();
//# sourceMappingURL=browser-warning.js.map
