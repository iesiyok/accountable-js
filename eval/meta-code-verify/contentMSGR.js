(function () {
  'use strict';

  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  const ICON_STATE = {
    DEFAULT: { badge: 'icon-badge.svg', popup: 'popup.html?state=loading' },
    INVALID_HARD: {
      // badge: 'error-badge.svg',
      badge: {
        32: 'failure_32.png',
      },
      popup: 'popup.html?state=error',
    },
    INVALID_SOFT: {
      // badge: 'error-badge.svg',
      badge: {
        32: 'failure_32.png',
      },
      popup: 'popup.html?state=error',
    },
    PROCESSING: {
      // badge: 'icon-badge.svg',
      badge: {
        32: 'default_32.png',
      },
      popup: 'popup.html?state=loading',
    },
    VALID: {
      // badge: 'validated-badge.svg',
      badge: {
        32: 'validated_32.png',
      },
      popup: 'popup.html?state=valid',
    },
    WARNING_RISK: {
      // badge: 'warning-badge.svg',
      badge: {
        32: 'risk_32.png',
      },
      popup: 'popup.html?state=warning_risk',
    },
    WARNING_TIMEOUT: {
      // badge: 'warning-badge.svg',
      badge: {
        32: 'risk_32.png',
      },
      popup: 'popup.html?state=warning_timeout',
    },
  };

  const KNOWN_EXTENSION_HASHES = [
    '', // Chrome - Dynamic: StopAll Ads
    '727bfede71f473991faeb7f4b65632c93e7f7d17189f1b3d952cd990cd150808', // Chrome and Edge: Avast Online Security & Privacy v21.0.101
    'c09a2e7b2fa97705c9afe890498e1f620ede4bd2968cfef7421080a8f9f0d8f9', // Chrome: Privacy Badger v2021.11.23.1
    '04c354b90b330f4cac2678ccd311e5d2a6e8b57815510b176ddbed8d52595726', // Chrome: LastPass v4.88.0
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // Chrome: AdLock - adblocker & privacy protection v0.1.30
    '', // Chrome - Dynamic: AdBlocker Ultimate v3.7.15
    '', // Chrome - Dynamic: DuckDuckGo Privacy Essentials v2022.2.22
    '', // Chrome - Dynamic: Crystal Ad block v1.3.9
    '', // Chrome - Dynamic: AdBlock — best ad blocker v4.43.0
    '4ae6b4dcefb37952cef704c39fe3e8d675bd32c54302984e747ba6768541862a', // Chrome: Vue.js devtools v6.0.12
    '91fecf0ca4c2260f8a18d1c371d717e656e98a0015f0206379afe662746d6009', // Chrome: Vue.js devtools v6.0.12
    'e64b3a9472f559611158a628da06e770ce8cc3d0f8395849072a0199bae705f9', // FF: Total Adblock-Ad Blocker v2.10.0 *and* FF/Edge BitGuard v1.0
    'c924b9ed122066e5420b125a1accb787c3856c4a422fe9bde47d1f40660271a6', // FF: Smart Blocker v1.0.2
    '', // FF: Popup Blocker(strict)
    '', // FF - Dynamic: Privacy Tweaks
    '', // FF: Privacy Possum
    '', // FF - Dynamic: Adblocker X v2.0.5
    '', // FF - Dynamic: AdBlocker Ultimate v3.7.15
    '', // FF - Dynamic: Cloudopt AdBlocker v2.3.0
    '', // Edge - Dynamic: Epsilon Ad blocker v1.4.6
    '7a69d1fb29471a9962307f7882adade784141d02617e233eb366ae5f63fd9dd8', // Edge and FF: Minimal Consent v1.0.9
    'd768396bbfda57a3defb0aeba5d9b9aefef562d8204520668f9e275c68455a0c', // Edge: Writer from Writer.com v1.63.2
    '', // Edge - Dynamic: AdBlock --- best ad blocker v4.43.0
    '855e2fd1368fc12a14159e26ed3132e6567e8443f8b75081265b93845b865103', // Edge and FF: AdGuard AdBlocker v3.6.17
    'deda33bced5f2014562e03f8c82a2a16df074a2bc6be6eceba78274056e41372', // Edge: Netcraft Extension v1.16.8
    '', // Edge - Dynamic: Hola ad remover v1.194.444
    '', // Edge - Dynamic: Tau adblock v1.4.1
  ];

  const MESSAGE_TYPE = {
    DEBUG: 'DEBUG',
    GET_DEBUG: 'GET_DEBUG',
    JS_WITH_SRC: 'JS_WITH_SRC',
    LOAD_MANIFEST: 'LOAD_MANIFEST',
    POPUP_STATE: 'POPUP_STATE',
    RAW_JS: 'RAW_JS',
    UPDATE_ICON: 'UPDATE_ICON',
  };

  const ORIGIN_TYPE = {
    FACEBOOK: 'FACEBOOK',
    WHATSAPP: 'WHATSAPP',
    MESSENGER: 'MESSENGER',
  };

  // Firefox and Safari currently do not support CompressionStream
  const DOWNLOAD_JS_ENABLED = 'CompressionStream' in window;

  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  const DOM_EVENTS = [
    'onabort',
    'onactivate',
    'onattribute',
    'onafterprint',
    'onafterscriptexecute',
    'onafterupdate',
    'onanimationcancel',
    'onanimationend',
    'onanimationiteration',
    'onanimationstart',
    'onappinstalled',
    'onariarequest',
    'onautocomplete',
    'onautocompleteerror',
    'onauxclick',
    'onbeforeactivate',
    'onbeforecopy',
    'onbeforecut',
    'onbeforedeactivate',
    'onbeforeeditfocus',
    'onbeforeinstallprompt',
    'onbeforepaste',
    'onbeforeprint',
    'onbeforescriptexecute',
    'onbeforeunload',
    'onbeforeupdate',
    'onbeforexrselect',
    'onbegin',
    'onblur',
    'onbounce',
    'oncancel',
    'oncanplay',
    'oncanplaythrough',
    'oncellchange',
    'onchange',
    'onclick',
    'onclose',
    'oncommand',
    'oncompassneedscalibration',
    'oncontextmenu',
    'oncontrolselect',
    'oncopy',
    'oncuechange',
    'oncut',
    'ondataavailable',
    'ondatasetchanged',
    'ondatasetcomplete',
    'ondblclick',
    'ondeactivate',
    'ondevicelight',
    'ondevicemotion',
    'ondeviceorientation',
    'ondeviceorientationabsolute',
    'ondeviceproximity',
    'ondrag',
    'ondragdrop',
    'ondragend',
    'ondragenter',
    'ondragleave',
    'ondragover',
    'ondragstart',
    'ondrop',
    'ondurationchange',
    'onemptied',
    'onend',
    'onended',
    'onerror',
    'onerrorupdate',
    'onexit',
    'onfilterchange',
    'onfinish',
    'onfocus',
    'onfocusin',
    'onfocusout',
    'onformchange',
    'onformdata',
    'onforminput',
    'onfullscreenchange',
    'onfullscreenerror',
    'ongotpointercapture',
    'onhashchange',
    'onhelp',
    'oninput',
    'oninvalid',
    'onkeydown',
    'onkeypress',
    'onkeyup',
    'onlanguagechange',
    'onlayoutcomplete',
    'onload',
    'onloadeddata',
    'onloadedmetadata',
    'onloadend',
    'onloadstart',
    'onlosecapture',
    'onlostpointercapture',
    'onmediacomplete',
    'onmediaerror',
    'onmessage',
    'onmessageerror',
    'onmousedown',
    'onmouseenter',
    'onmouseleave',
    'onmousemove',
    'onmouseout',
    'onmouseover',
    'onmouseup',
    'onmousewheel',
    'onmove',
    'onmoveend',
    'onmovestart',
    'onmozfullscreenchange',
    'onmozfullscreenerror',
    'onmozpointerlockchange',
    'onmozpointerlockerror',
    'onmscontentzoom',
    'onmsfullscreenchange',
    'onmsfullscreenerror',
    'onmsgesturechange',
    'onmsgesturedoubletap',
    'onmsgestureend',
    'onmsgesturehold',
    'onmsgesturestart',
    'onmsgesturetap',
    'onmsgotpointercapture',
    'onmsinertiastart',
    'onmslostpointercapture',
    'onmsmanipulationstatechanged',
    'onmspointercancel',
    'onmspointerdown',
    'onmspointerenter',
    'onmspointerleave',
    'onmspointermove',
    'onmspointerout',
    'onmspointerover',
    'onmspointerup',
    'onmssitemodejumplistitemremoved',
    'onmsthumbnailclick',
    'onoffline',
    'ononline',
    'onoutofsync',
    'onpage',
    'onpagehide',
    'onpageshow',
    'onpaste',
    'onpause',
    'onplay',
    'onplaying',
    'onpointercancel',
    'onpointerdown',
    'onpointerenter',
    'onpointerleave',
    'onpointerlockchange',
    'onpointerlockerror',
    'onpointermove',
    'onpointerout',
    'onpointerover',
    'onpointerrawupdate',
    'onpointerup',
    'onpopstate',
    'onprogress',
    'onpropertychange',
    'onratechange',
    'onreadystatechange',
    'onreceived',
    'onrejectionhandled',
    'onrepeat',
    'onreset',
    'onresize',
    'onresizeend',
    'onresizestart',
    'onresume',
    'onreverse',
    'onrowdelete',
    'onrowenter',
    'onrowexit',
    'onrowinserted',
    'onrowsdelete',
    'onrowsenter',
    'onrowsexit',
    'onrowsinserted',
    'onscroll',
    'onsearch',
    'onsecuritypolicyviolation',
    'onseek',
    'onseeked',
    'onseeking',
    'onselect',
    'onselectionchange',
    'onselectstart',
    'onslotchange',
    'onstalled',
    'onstorage',
    'onstoragecommit',
    'onstart',
    'onstop',
    'onshow',
    'onsyncrestored',
    'onsubmit',
    'onsuspend',
    'onsynchrestored',
    'ontimeerror',
    'ontimeupdate',
    'ontoggle',
    'ontouchend',
    'ontouchmove',
    'ontouchstart',
    'ontrackchange',
    'ontransitioncancel',
    'ontransitionend',
    'ontransitionrun',
    'ontransitionstart',
    'onunhandledrejection',
    'onunload',
    'onurlflip',
    'onuserproximity',
    'onvolumechange',
    'onwaiting',
    'onwebkitanimationend',
    'onwebkitanimationiteration',
    'onwebkitanimationstart',
    'onwebkitfullscreenchange',
    'onwebkitfullscreenerror',
    'onwebkittransitionend',
    'onwheel',
  ];

  const sourceScripts = new Map();
  const inlineScripts = [];
  const foundScripts = new Map();
  foundScripts.set('', []);
  let currentState = ICON_STATE.VALID;
  let currentOrigin = '';
  let currentFilterType = '';
  let manifestTimeoutID = '';

  function updateIcon(newState) {
    currentState = newState;
    chrome.runtime.sendMessage({
      type: MESSAGE_TYPE.UPDATE_ICON,
      icon: newState,
    });
  }

  function updateCurrentState(newState) {
    if (
      newState === ICON_STATE.VALID &&
      (currentState === ICON_STATE.VALID ||
        currentState === ICON_STATE.PROCESSING)
    ) {
      updateIcon(newState);
    } else if (
      newState === ICON_STATE.PROCESSING &&
      currentState === ICON_STATE.VALID
    ) {
      updateIcon(newState);
    } else if (
      newState === ICON_STATE.WARNING_RISK ||
      newState === ICON_STATE.WARNING_TIMEOUT
    ) {
      if (
        currentState === ICON_STATE.VALID ||
        currentState === ICON_STATE.PROCESSING
      ) {
        updateIcon(newState);
      }
    } else if (newState === ICON_STATE.INVALID_SOFT) {
      updateIcon(newState);
    }
  }

  function storeFoundJS(scriptNodeMaybe, scriptList) {
    if (window != window.top) {
      // this means that content utils is running in an iframe - disable timer and call processFoundJS on manifest processed in top level frame
      clearTimeout(manifestTimeoutID);
      manifestTimeoutID = '';
      window.setTimeout(
        () => processFoundJS(currentOrigin, foundScripts.keys().next().value),
        0
      );
    }
    // check if it's the manifest node
    if (
      window == window.top &&
      (scriptNodeMaybe.id === 'binary-transparency-manifest' ||
        scriptNodeMaybe.getAttribute('name') === 'binary-transparency-manifest')
    ) {
      let rawManifest = '';
      try {
        rawManifest = JSON.parse(scriptNodeMaybe.textContent);
      } catch (manifestParseError) {
        setTimeout(
          () => parseFailedJson({ node: scriptNodeMaybe, retry: 5000 }),
          20
        );
        return;
      }

      let leaves = rawManifest.leaves;
      let otherHashes = '';
      let otherType = '';
      let roothash = rawManifest.root;
      let version = rawManifest.version;

      if ([ORIGIN_TYPE.FACEBOOK, ORIGIN_TYPE.MESSENGER].includes(currentOrigin)) {
        leaves = rawManifest.manifest;
        otherHashes = rawManifest.manifest_hashes;
        otherType = scriptNodeMaybe.getAttribute('data-manifest-type');
        roothash = otherHashes.combined_hash;
        version = scriptNodeMaybe.getAttribute('data-manifest-rev');

        if (currentFilterType != '') {
          currentFilterType = 'BOTH';
        }
        if (currentFilterType === '') {
          currentFilterType = otherType;
        }
      }
      // for whatsapp
      else {
        currentFilterType = 'BOTH';
      }
      // now that we know the actual version of the scripts, transfer the ones we know about.
      if (foundScripts.has('')) {
        foundScripts.set(version, foundScripts.get(''));
        foundScripts.delete('');
      }

      chrome.runtime.sendMessage(
        {
          type: MESSAGE_TYPE.LOAD_MANIFEST,
          leaves: leaves,
          origin: currentOrigin,
          otherHashes: otherHashes,
          otherType: otherType,
          rootHash: roothash,
          workaround: scriptNodeMaybe.innerHTML,
          version: version,
        },
        response => {
          chrome.runtime.sendMessage({
            type: MESSAGE_TYPE.DEBUG,
            log:
              'manifest load response is ' + response
                ? JSON.stringify(response).substring(0, 500)
                : '',
          });
          // then start processing of it's JS
          if (response.valid) {
            if (manifestTimeoutID !== '') {
              clearTimeout(manifestTimeoutID);
              manifestTimeoutID = '';
            }
            window.setTimeout(() => processFoundJS(currentOrigin, version), 0);
          } else {
            if (
              ['ENDPOINT_FAILURE', 'UNKNOWN_ENDPOINT_ISSUE'].includes(
                response.reason
              )
            ) {
              updateCurrentState(ICON_STATE.WARNING_TIMEOUT);
              return;
            }
            updateCurrentState(ICON_STATE.INVALID_SOFT);
          }
        }
      );
    }

    if (scriptNodeMaybe.getAttribute('type') === 'application/json') {
      try {
        JSON.parse(scriptNodeMaybe.textContent);
      } catch (parseError) {
        setTimeout(
          () => parseFailedJson({ node: scriptNodeMaybe, retry: 1500 }),
          20
        );
      }
      return;
    }
    if (
      scriptNodeMaybe.src != null &&
      scriptNodeMaybe.src !== '' &&
      scriptNodeMaybe.src.indexOf('blob:') === 0
    ) {
      // TODO: try to process the blob. For now, flag as warning.
      updateCurrentState(ICON_STATE.INVALID_SOFT);
      return;
    }

    const dataBtManifest = scriptNodeMaybe.getAttribute('data-btmanifest');
    const otherType = dataBtManifest == null ? '' : dataBtManifest.split('_')[1];
    // need to get the src of the JS
    if (scriptNodeMaybe.src != null && scriptNodeMaybe.src !== '') {
      if (scriptList.size === 1) {
        scriptList.get(scriptList.keys().next().value).push({
          type: MESSAGE_TYPE.JS_WITH_SRC,
          src: scriptNodeMaybe.src,
          otherType: otherType, // TODO: read from DOM when available
        });
      }
    } else {
      // no src, access innerHTML for the code
      const hashLookupAttribute =
        scriptNodeMaybe.attributes['data-binary-transparency-hash-key'];
      const hashLookupKey = hashLookupAttribute && hashLookupAttribute.value;
      if (scriptList.size === 1) {
        scriptList.get(scriptList.keys().next().value).push({
          type: MESSAGE_TYPE.RAW_JS,
          rawjs: scriptNodeMaybe.innerHTML,
          lookupKey: hashLookupKey,
          otherType: otherType, // TODO: read from DOM when available
        });
      }
    }
    updateCurrentState(ICON_STATE.PROCESSING);
  }

  function getAttributeValue(
    nodeName,
    checkNode,
    htmlElement,
    attributeName,
    currentAttributeValue
  ) {
    if (
      nodeName.toLowerCase() === checkNode &&
      htmlElement.hasAttribute(attributeName)
    ) {
      return htmlElement.getAttribute(attributeName).toLowerCase();
    }
    return currentAttributeValue;
  }

  const AttributeCheckPairs = [
    { nodeName: 'a', attributeName: 'href' },
    { nodeName: 'iframe', attributeName: 'src' },
    { nodeName: 'iframe', attributeName: 'srcdoc' },
    { nodeName: 'form', attributeName: 'action' },
    { nodeName: 'input', attributeName: 'formaction' },
    { nodeName: 'button', attributeName: 'formaction' },
    { nodeName: 'a', attributeName: 'xlink:href' },
    { nodeName: 'ncc', attributeName: 'href' },
    { nodeName: 'embed', attributeName: 'src' },
    { nodeName: 'object', attributeName: 'data' },
    { nodeName: 'animate', attributeName: 'xlink:href' },
    { nodeName: 'script', attributeName: 'xlink:href' },
  ];

  function hasViolatingJavaScriptURI(htmlElement) {
    let checkURL = '';
    const lowerCaseNodeName = htmlElement.nodeName.toLowerCase();
    AttributeCheckPairs.forEach(checkPair => {
      checkURL = getAttributeValue(
        lowerCaseNodeName,
        checkPair.nodeName,
        htmlElement,
        checkPair.attributeName,
        checkURL
      );
    });
    if (checkURL !== '') {
      // make sure anchor tags and object tags don't have javascript urls
      if (checkURL.indexOf('javascript') >= 0) {
        chrome.runtime.sendMessage({
          type: MESSAGE_TYPE.DEBUG,
          log: 'violating attribute: javascript url',
        });
        updateCurrentState(ICON_STATE.INVALID_SOFT);
      }
    }

    if (typeof htmlElement.childNodes !== 'undefined') {
      htmlElement.childNodes.forEach(element => {
        hasViolatingJavaScriptURI(element);
      });
    }
  }

  function hasInvalidAttributes(htmlElement) {
    if (
      typeof htmlElement.attributes === 'object' &&
      Object.keys(htmlElement.attributes).length >= 1
    ) {
      Array.from(htmlElement.attributes).forEach(elementAttribute => {
        // check first for violating attributes
        if (DOM_EVENTS.indexOf(elementAttribute.localName) >= 0) {
          chrome.runtime.sendMessage({
            type: MESSAGE_TYPE.DEBUG,
            log:
              'violating attribute ' +
              elementAttribute.localName +
              ' from element ' +
              htmlElement.outerHTML,
          });
          updateCurrentState(ICON_STATE.INVALID_SOFT);
        }
      });
    }
    // check child nodes as well, since a malicious attacker could try to inject an invalid attribute via an image node in a svg tag
    if (htmlElement.childNodes.length > 0) {
      htmlElement.childNodes.forEach(childNode => {
        if (childNode.nodeType === 1) {
          hasInvalidAttributes(childNode);
        }
      });
    }
  }

  function checkNodesForViolations(element) {
    hasViolatingJavaScriptURI(element);
    hasInvalidAttributes(element);
  }

  function hasInvalidScripts(scriptNodeMaybe, scriptList) {
    // if not an HTMLElement ignore it!
    if (scriptNodeMaybe.nodeType !== 1) {
      return false;
    }
    checkNodesForViolations(scriptNodeMaybe);

    if (scriptNodeMaybe.nodeName.toLowerCase() === 'script') {
      return storeFoundJS(scriptNodeMaybe, scriptList);
    } else if (scriptNodeMaybe.childNodes.length > 0) {
      scriptNodeMaybe.childNodes.forEach(childNode => {
        // if not an HTMLElement ignore it!
        if (childNode.nodeType !== 1) {
          return;
        }
        checkNodesForViolations(childNode);
        if (childNode.nodeName.toLowerCase() === 'script') {
          storeFoundJS(childNode, scriptList);
          return;
        }

        Array.from(childNode.getElementsByTagName('script')).forEach(
          childScript => {
            storeFoundJS(childScript, scriptList);
          }
        );
      });
    }

    return;
  }

  const scanForScripts = () => {
    const allElements = document.getElementsByTagName('*');

    Array.from(allElements).forEach(allElement => {
      checkNodesForViolations(allElement);
      // next check for existing script elements and if they're violating
      if (allElement.nodeName.toLowerCase() === 'script') {
        storeFoundJS(allElement, foundScripts);
      }
    });

    try {
      // track any new scripts that get loaded in
      const scriptMutationObserver = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
          if (mutation.type === 'childList') {
            Array.from(mutation.addedNodes).forEach(checkScript => {
              hasInvalidScripts(checkScript, foundScripts);
            });
          } else if (mutation.type === 'attributes') {
            updateCurrentState(ICON_STATE.INVALID_SOFT);
            chrome.runtime.sendMessage({
              type: MESSAGE_TYPE.DEBUG,
              log:
                'Processed DOM mutation and invalid attribute added or changed ' +
                mutation.target,
            });
          }
        });
      });

      scriptMutationObserver.observe(document, {
        attributeFilter: DOM_EVENTS,
        childList: true,
        subtree: true,
      });
    } catch (_UnknownError) {
      updateCurrentState(ICON_STATE.INVALID_SOFT);
    }
  };

  async function processJSWithSrc(script, origin, version) {
    // fetch the script from page context, not the extension context.
    try {
      const sourceResponse = await fetch(script.src, { method: 'GET' });
      // we want to clone the stream before reading it
      const sourceResponseClone = sourceResponse.clone();
      const fileNameArr = script.src.split('/');
      const fileName = fileNameArr[fileNameArr.length - 1].split('?')[0];
      let sourceText = await sourceResponse.text();
      if (DOWNLOAD_JS_ENABLED) {
        sourceScripts.set(
          fileName,
          sourceResponseClone.body.pipeThrough(
            new window.CompressionStream('gzip')
          )
        );
      }
      const sourceURLIndex = sourceText.indexOf('//# sourceURL');
      // if //# sourceURL is at the beginning of the response, sourceText should be empty, otherwise slicing indices will be (0, -1) and sourceText will be unchanged
      if (sourceURLIndex == 0) {
        sourceText = '';
      } else if (sourceURLIndex > 0) {
        // doing minus 1 because there's usually either a space or new line
        sourceText = sourceText.slice(0, sourceURLIndex - 1);
      }
      // split package up if necessary
      const packages = sourceText.split('/*FB_PKG_DELIM*/\n');
      const packagePromises = packages.map(jsPackage => {
        return new Promise((resolve, reject) => {
          chrome.runtime.sendMessage(
            {
              type: MESSAGE_TYPE.RAW_JS,
              rawjs: jsPackage.trimStart(),
              origin: origin,
              version: version,
            },
            response => {
              if (response.valid) {
                resolve();
              } else {
                reject(response.type);
              }
            }
          );
        });
      });
      await Promise.all(packagePromises);
      return {
        valid: true,
      };
    } catch (scriptProcessingError) {
      return {
        valid: false,
        type: scriptProcessingError,
      };
    }
  }

  const processFoundJS = async (origin, version) => {
    // foundScripts
    const fullscripts = foundScripts.get(version).splice(0);
    const scripts = fullscripts.filter(script => {
      if (
        script.otherType === currentFilterType ||
        ['BOTH', ''].includes(currentFilterType)
      ) {
        return true;
      } else {
        foundScripts.get(version).push(script);
      }
    });
    let pendingScriptCount = scripts.length;
    for (const script of scripts) {
      if (script.src) {
        await processJSWithSrc(script, origin, version).then(response => {
          pendingScriptCount--;
          if (response.valid) {
            if (pendingScriptCount == 0) {
              updateCurrentState(ICON_STATE.VALID);
            }
          } else {
            if (response.type === 'EXTENSION') {
              updateCurrentState(ICON_STATE.WARNING_RISK);
            } else {
              updateCurrentState(ICON_STATE.INVALID_SOFT);
            }
          }
          chrome.runtime.sendMessage({
            type: MESSAGE_TYPE.DEBUG,
            log:
              'processed JS with SRC, ' +
              script.src +
              ',response is ' +
              JSON.stringify(response).substring(0, 500),
          });
        });
      } else {
        chrome.runtime.sendMessage(
          {
            type: script.type,
            rawjs: script.rawjs.trimStart(),
            lookupKey: script.lookupKey,
            origin: origin,
            version: version,
          },
          response => {
            pendingScriptCount--;
            let inlineScriptMap = new Map();
            if (response.valid) {
              inlineScriptMap.set(response.hash, script.rawjs);
              inlineScripts.push(inlineScriptMap);
              if (pendingScriptCount == 0) {
                updateCurrentState(ICON_STATE.VALID);
              }
            } else {
              // using an array of maps, as we're using the same key for inline scripts - this will eventually be removed, once inline scripts are removed from the page load
              inlineScriptMap.set('hash not in manifest', script.rawjs);
              inlineScripts.push(inlineScriptMap);
              if (KNOWN_EXTENSION_HASHES.includes(response.hash)) {
                updateCurrentState(ICON_STATE.WARNING_RISK);
              } else {
                updateCurrentState(ICON_STATE.INVALID_SOFT);
              }
            }
            chrome.runtime.sendMessage({
              type: MESSAGE_TYPE.DEBUG,
              log:
                'processed the RAW_JS, response is ' +
                response.hash +
                ' ' +
                JSON.stringify(response).substring(0, 500),
            });
          }
        );
      }
    }
    window.setTimeout(() => processFoundJS(origin, version), 3000);
  };

  async function downloadJSToZip() {
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: 'meta_source_files.gz',
    });

    const writableStream = await fileHandle.createWritable();
    // delimiter between files
    const delimPrefix = '\n********** new file: ';
    const delimSuffix = ' **********\n';
    const enc = new TextEncoder();

    for (const [fileName, compressedStream] of sourceScripts.entries()) {
      let delim = delimPrefix + fileName + delimSuffix;
      let encodedDelim = enc.encode(delim);
      let delimStream = new window.CompressionStream('gzip');
      let writer = delimStream.writable.getWriter();
      writer.write(encodedDelim);
      writer.close();
      await delimStream.readable.pipeTo(writableStream, { preventClose: true });
      await compressedStream.pipeTo(writableStream, { preventClose: true });
    }

    for (const inlineSrcMap of inlineScripts) {
      let inlineHash = inlineSrcMap.keys().next().value;
      let inlineSrc = inlineSrcMap.values().next().value;
      let delim = delimPrefix + 'Inline Script ' + inlineHash + delimSuffix;
      let encodedDelim = enc.encode(delim);
      let delimStream = new window.CompressionStream('gzip');
      let delimWriter = delimStream.writable.getWriter();
      delimWriter.write(encodedDelim);
      delimWriter.close();
      await delimStream.readable.pipeTo(writableStream, { preventClose: true });
      let inlineStream = new window.CompressionStream('gzip');
      let writer = inlineStream.writable.getWriter();
      writer.write(enc.encode(inlineSrc));
      writer.close();
      await inlineStream.readable.pipeTo(writableStream, { preventClose: true });
    }
    writableStream.close();
  }

  chrome.runtime.onMessage.addListener(function (request) {
    if (request.greeting === 'downloadSource' && DOWNLOAD_JS_ENABLED) {
      downloadJSToZip();
    } else if (request.greeting === 'nocacheHeaderFound') {
      updateCurrentState(ICON_STATE.INVALID_SOFT);
    }
  });

  function parseFailedJson(queuedJsonToParse) {
    try {
      JSON.parse(queuedJsonToParse.node.textContent);
    } catch (parseError) {
      if (queuedJsonToParse.retry > 0) {
        queuedJsonToParse.retry--;
        setTimeout(() => parseFailedJson(queuedJsonToParse), 20);
      } else {
        updateCurrentState(ICON_STATE.INVALID_SOFT);
      }
    }
  }

  function startFor(origin) {
    let isUserLoggedIn = false;
    if ([ORIGIN_TYPE.FACEBOOK, ORIGIN_TYPE.MESSENGER].includes(origin)) {
      const cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        let pair = cookie.split('=');
        // c_user contains the user id of the user logged in
        if (pair[0].indexOf('c_user') >= 0) {
          isUserLoggedIn = true;
        }
      });
    } else {
      // only doing this check for FB and MSGR
      isUserLoggedIn = true;
    }
    if (isUserLoggedIn) {
      updateCurrentState(ICON_STATE.PROCESSING);
      currentOrigin = origin;
      scanForScripts();
      // set the timeout once, in case there's an iframe and contentUtils sets another manifest timer
      if (manifestTimeoutID === '') {
        manifestTimeoutID = setTimeout(() => {
          // Manifest failed to load, flag a warning to the user.
          updateCurrentState(ICON_STATE.WARNING_TIMEOUT);
        }, 45000);
      }
    }
  }

  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  startFor(ORIGIN_TYPE.MESSENGER);

}());
