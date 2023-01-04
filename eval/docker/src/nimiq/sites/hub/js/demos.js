/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"demos": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"electrum-client":"electrum-client","lang-de-po":"lang-de-po","lang-en-po":"lang-en-po","lang-es-po":"lang-es-po","lang-fr-po":"lang-fr-po","lang-nl-po":"lang-nl-po","lang-ru-po":"lang-ru-po","lang-uk-po":"lang-uk-po","lang-zh-po":"lang-zh-po"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/ 				if (script.src.indexOf(window.location.origin + '/') !== 0) {
/******/ 					script.crossOrigin = "anonymous";
/******/ 				}
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([4,"chunk-vendors","chunk-common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demos/Demo.ts":
/*!***********************!*\
  !*** ./demos/Demo.ts ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/rpc */ "./node_modules/@nimiq/rpc/dist/rpc.es.js");
/* harmony import */ var _client_HubApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../client/HubApi */ "./client/HubApi.ts");
/* harmony import */ var _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _client_RequestBehavior__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../client/RequestBehavior */ "./client/RequestBehavior.ts");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _src_lib_Constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _src_lib_WalletStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/lib/WalletStore */ "./src/lib/WalletStore.ts");







class Demo {
    constructor(keyguardBaseUrl) {
        this._iframeClient = null;
        this._keyguardBaseUrl = keyguardBaseUrl;
    }
    static run() {
        const keyguardOrigin = location.origin === 'https://hub.nimiq-testnet.com'
            ? 'https://keyguard.nimiq-testnet.com'
            : `${location.protocol}//${location.hostname}:8000`;
        const demo = new Demo(keyguardOrigin);
        // @ts-ignore (Property 'demo' does not exist on type 'Window')
        window.demo = demo;
        [
            _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ADD_ADDRESS,
            _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHANGE_PASSWORD,
            _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHECKOUT,
            _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHOOSE_ADDRESS,
            _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].EXPORT,
            _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGIN,
            _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGOUT,
            _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].MIGRATE,
            _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ONBOARD,
            _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].RENAME,
            _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGNUP,
            _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_MESSAGE,
            _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_TRANSACTION,
        ].forEach((requestType) => {
            demo.client.on(requestType, (result, state) => {
                console.log('Hub result', result);
                console.log('State', state);
                document.querySelector('#result').textContent = JSON.stringify(result);
            }, (error, state) => {
                console.error('Hub error', error);
                console.log('State', state);
                document.querySelector('#result').textContent = `Error: ${error.message || error}`;
            });
        });
        demo.client.checkRedirectResponse();
        document.querySelectorAll('input[name="popup-vs-redirect"]').forEach((input) => {
            input.addEventListener('change', (event) => {
                const value = event.target.value;
                demo.setClientBehavior(value);
            });
        });
        demo.setClientBehavior(document.querySelector('input[name="popup-vs-redirect"]:checked').value);
        document.querySelector('button#checkout').addEventListener('click', async () => {
            await checkout(await generateCheckoutRequest());
        });
        document.querySelector('button#multi-checkout').addEventListener('click', async () => {
            await checkout(await generateCheckoutRequest(/* multiCheckout */ true));
        });
        const $returnLinkCheckbox = document.querySelector('#cashlink-return-link');
        $returnLinkCheckbox.addEventListener('change', () => {
            document.querySelector('#cashlink-skip-sharing-container').style.display =
                $returnLinkCheckbox.checked ? 'block' : 'none';
        });
        const themeSelector = document.querySelector('#cashlink-theme');
        Object.entries(_src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["CashlinkTheme"]).forEach(([themeName, themeId]) => {
            // filter out entries added by typescript for reverse mapping
            if (typeof themeId !== 'number')
                return;
            const option = document.createElement('option');
            option.text = themeName;
            option.value = themeId.toString();
            themeSelector.add(option);
        });
        document.querySelector('button#create-cashlink').addEventListener('click', async () => {
            try {
                let value = parseInt(document.querySelector('#cashlink-value').value);
                value = !Number.isNaN(value) ? value : undefined;
                let message = document.querySelector('#cashlink-message').value;
                message = !!message ? message : undefined;
                const autoTruncateMessage = document.querySelector('#cashlink-auto-truncate-message').checked;
                let theme = Number.parseInt(themeSelector.value);
                theme = !Number.isNaN(theme) ? theme : undefined;
                let request = {
                    appName: 'Hub Demos',
                    value,
                    message,
                    autoTruncateMessage,
                    theme,
                };
                const useSelectedAddress = document.querySelector('#cashlink-use-selected-address').checked;
                if (useSelectedAddress) {
                    const $addressRadio = document.querySelector('input[name="address"]:checked');
                    if (!$addressRadio) {
                        alert('You have no account to send a cashlink from, create an account first (signup)');
                        throw new Error('No account found');
                    }
                    request = {
                        ...request,
                        senderAddress: $addressRadio.dataset.address,
                        senderBalance: 5e5,
                    };
                }
                const returnLink = $returnLinkCheckbox.checked;
                if (returnLink) {
                    const skipSharing = document.querySelector('#cashlink-skip-sharing').checked;
                    request = {
                        ...request,
                        returnLink,
                        skipSharing,
                    };
                }
                const result = await demo.client.createCashlink(request, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = `Cashlink created${result.link
                    ? `: ${result.link}`
                    : ''}`;
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#choose-address').addEventListener('click', async () => {
            try {
                const result = await demo.client.chooseAddress({ appName: 'Hub Demos' }, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = `Address was chosen: ${result ? result.address : '-'}`;
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#choose-address-and-btc').addEventListener('click', async () => {
            try {
                const result = await demo.client.chooseAddress({ appName: 'Hub Demos', returnBtcAddress: true }, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = `Address was chosen: ${result ? result.address : '-'}`;
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#sign-transaction').addEventListener('click', async () => {
            const txRequest = generateSignTransactionRequest();
            try {
                const result = await demo.client.signTransaction(new Promise((resolve) => {
                    window.setTimeout(() => resolve(txRequest), 2000);
                }), demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = 'TX signed';
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#onboard').addEventListener('click', async () => {
            try {
                const result = await demo.client.onboard({ appName: 'Hub Demos' }, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = 'Onboarding completed!';
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#create').addEventListener('click', async () => {
            try {
                const result = await demo.client.signup({ appName: 'Hub Demos' }, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = 'New account & address created';
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#login').addEventListener('click', async () => {
            try {
                const result = await demo.client.login({ appName: 'Hub Demos' }, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = 'Account imported';
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        function generateSignTransactionRequest() {
            const $radio = document.querySelector('input[name="address"]:checked');
            if (!$radio) {
                alert('You have no account to send a tx from, create an account first (signup)');
                throw new Error('No account found');
            }
            const sender = $radio.dataset.address;
            const value = parseInt(document.querySelector('#value').value, 10) || 1337;
            const fee = parseInt(document.querySelector('#fee').value, 10) || 0;
            const txData = document.querySelector('#data').value || '';
            const validityStartHeight = document.querySelector('#validitystartheight').value
                || '1234';
            return {
                appName: 'Hub Demos',
                sender,
                recipient: 'NQ63 U7XG 1YYE D6FA SXGG 3F5H X403 NBKN JLDU',
                value,
                fee,
                extraData: _nimiq_utils__WEBPACK_IMPORTED_MODULE_4__["Utf8Tools"].stringToUtf8ByteArray(txData),
                validityStartHeight: parseInt(validityStartHeight, 10),
            };
        }
        async function generateCheckoutRequest(multiCheckout) {
            const nimTxValue = parseInt(document.querySelector('#value').value, 10) || 1337;
            const nimTxFee = parseInt(document.querySelector('#fee').value, 10) || 0;
            const nimTxData = document.querySelector('#data').value || '';
            let sender;
            const useSelectedAddress = document.getElementById('checkout-use-selected-address').checked;
            if (useSelectedAddress) {
                const $addressRadio = document.querySelector('input[name="address"]:checked');
                if (!$addressRadio) {
                    alert('You have no account to checkout with, create an account first (signup)');
                    throw new Error('No account found');
                }
                sender = $addressRadio.dataset.address;
            }
            const forceSender = document.getElementById('checkout-force-sender').checked;
            const isPointOfSale = document.getElementById('checkout-is-point-of-sale').checked;
            if (!multiCheckout) {
                // v1 checkout: nim only
                return {
                    appName: 'Hub Demos',
                    shopLogoUrl: `${location.origin}/nimiq.png`,
                    sender,
                    forceSender,
                    recipient: 'NQ63 U7XG 1YYE D6FA SXGG 3F5H X403 NBKN JLDU',
                    value: nimTxValue,
                    fee: nimTxFee,
                    extraData: _nimiq_utils__WEBPACK_IMPORTED_MODULE_4__["Utf8Tools"].stringToUtf8ByteArray(nimTxData),
                    isPointOfSale,
                };
            }
            else {
                const now = Date.now();
                return {
                    version: 2,
                    appName: 'Hub Demos',
                    shopLogoUrl: `${location.origin}/nimiq.png`,
                    callbackUrl: `${location.origin}/callback.html`,
                    csrf: 'dummy-csrf-token',
                    time: now,
                    fiatCurrency: 'EUR',
                    fiatAmount: 24.99,
                    isPointOfSale,
                    paymentOptions: [
                        {
                            currency: _client_HubApi__WEBPACK_IMPORTED_MODULE_1__["default"].Currency.BTC,
                            type: _client_HubApi__WEBPACK_IMPORTED_MODULE_1__["default"].PaymentType.DIRECT,
                            amount: '.00029e8',
                            vendorMarkup: .01,
                            expires: now + 3 * 60000,
                            protocolSpecific: {
                                feePerByte: 2,
                                recipient: '17w6ar5SqXFGr786WjGHB8xyu48eujHaBe',
                            },
                        },
                        {
                            currency: _client_HubApi__WEBPACK_IMPORTED_MODULE_1__["default"].Currency.NIM,
                            type: _client_HubApi__WEBPACK_IMPORTED_MODULE_1__["default"].PaymentType.DIRECT,
                            amount: nimTxValue.toString(),
                            vendorMarkup: 0,
                            expires: now + 3 * 60000,
                            protocolSpecific: {
                                sender,
                                forceSender,
                                fee: nimTxFee,
                                extraData: nimTxData,
                            },
                        },
                        {
                            currency: _client_HubApi__WEBPACK_IMPORTED_MODULE_1__["default"].Currency.ETH,
                            type: _client_HubApi__WEBPACK_IMPORTED_MODULE_1__["default"].PaymentType.DIRECT,
                            amount: '.0091e18',
                            expires: now + 3 * 60000,
                            protocolSpecific: {
                                gasLimit: 21000,
                                gasPrice: '2e9',
                                recipient: '0xa4725d6477644286b354288b51122a808389be83',
                            },
                        },
                    ],
                };
            }
        }
        async function checkout(txRequest) {
            try {
                const result = await demo.client.checkout(txRequest, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = 'TX signed';
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        }
        document.querySelector('button#sign-message').addEventListener('click', async () => {
            const request = {
                appName: 'Hub Demos',
                // signer: 'NQ63 U7XG 1YYE D6FA SXGG 3F5H X403 NBKN JLDU',
                message: document.querySelector('#message').value || undefined,
            };
            try {
                const result = await demo.client.signMessage(request, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = 'MSG signed: ' + request.message;
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#sign-message-with-account').addEventListener('click', async () => {
            const $radio = document.querySelector('input[name="address"]:checked');
            if (!$radio) {
                alert('You have no account to sign a message by, create an account first (signup)');
                throw new Error('No account found');
            }
            const signer = $radio.dataset.address;
            const request = {
                appName: 'Hub Demos',
                signer,
                message: document.querySelector('#message').value || undefined,
            };
            try {
                const result = await demo.client.signMessage(request, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = 'MSG signed: ' + request.message;
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#sign-message-with-tabs').addEventListener('click', async () => {
            const $radio = document.querySelector('input[name="address"]:checked');
            const signer = $radio && $radio.dataset.address || undefined;
            const request = {
                appName: 'Hub Demos',
                signer,
                message: `This is a\n\tmessage\n\twith tabs.\n\n\t\tTouble tab!`,
            };
            try {
                const result = await demo.client.signMessage(request, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = 'MSG signed: ' + request.message;
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#migrate').addEventListener('click', async () => {
            try {
                const result = await demo.client.migrate(demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = 'Migrated';
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#activate-btc').addEventListener('click', async () => {
            const $radio = document.querySelector('input[name="address"]:checked');
            if (!$radio) {
                alert('You have no account to activate BTC for, create an account first (signup)');
                throw new Error('No account found');
            }
            const accountId = $radio.closest('ul').closest('li').querySelector('button').dataset.walletId;
            const wallet = await _src_lib_WalletStore__WEBPACK_IMPORTED_MODULE_6__["WalletStore"].Instance.get(accountId);
            if (!wallet)
                throw new Error('Account not found');
            if (wallet.btcXPub || wallet.btcAddresses.external.length || wallet.btcAddresses.internal.length) {
                if (!confirm('Btc support is already activated for the selected account. Do you want to clear the '
                    + 'account\'s Bitcoin metadata and re-activate BTC support?')) {
                    document.querySelector('#result').textContent = 'Activation cancelled';
                    return;
                }
                wallet.btcXPub = undefined;
                wallet.btcAddresses = { external: [], internal: [] };
                await _src_lib_WalletStore__WEBPACK_IMPORTED_MODULE_6__["WalletStore"].Instance.put(wallet);
            }
            try {
                const result = await demo.client.activateBitcoin({
                    appName: 'Hub Demos',
                    accountId,
                }, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = 'Activated account: ' + JSON.stringify(result);
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#sign-btc-transaction').addEventListener('click', async () => {
            const $radio = document.querySelector('input[name="address"]:checked');
            if (!$radio) {
                alert('You have no account to send a tx from, create an account first (signup)');
                throw new Error('No account found');
            }
            const accountId = $radio.closest('ul').closest('li').querySelector('button').dataset.walletId;
            const account = (await demo.list()).find((wallet) => wallet.accountId === accountId);
            if (account.type === _src_lib_Constants__WEBPACK_IMPORTED_MODULE_5__["WalletType"].LEGACY) {
                alert('Cannot sign BTC transactions with a legacy account');
                throw new Error('Cannot use legacy account');
            }
            const senderAddress = account.btcAddresses ? account.btcAddresses.external[0] : null;
            if (!senderAddress) {
                alert('No BTC address found in account, activate Bitcoin for this account first');
                throw new Error('No BTC address found');
            }
            const txRequest = {
                appName: 'Hub Demos',
                accountId,
                inputs: [{
                        address: senderAddress,
                        transactionHash: 'ef4aaf6087d0cc48ff09355d715c257078467ca4d9dd75a20824e70a78fb43cc',
                        outputIndex: 0,
                        outputScript: BitcoinJS.address.toOutputScript(senderAddress, BitcoinJS.networks.testnet).toString('hex'),
                        value: Math.round(0.010 * 1e8),
                    }],
                output: {
                    address: 'tb1qegge25w53hyv4lyye4w3ntsj9gg5j2l7fej0ze',
                    value: Math.round(0.009 * 1e8),
                    label: 'Paul McCartney',
                },
            };
            try {
                const result = await demo.client.signBtcTransaction(txRequest, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').textContent = 'Signed: ' + result.serializedTx;
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#setup-swap.nim-to-btc').addEventListener('click', async () => {
            // const $radio = document.querySelector('input[name="address"]:checked');
            // if (!$radio) {
            //     alert('You have no account to send a tx from, create an account first (signup)');
            //     throw new Error('No account found');
            // }
            // const accountId = $radio.closest('ul').closest('li').querySelector('button').dataset.walletId;
            const accountId = '44012bb58ff5';
            const account = (await demo.list()).find((wallet) => wallet.accountId === accountId);
            if (!account) {
                alert('Account for the demo swap not found. Currently only Sören has this account.');
                throw new Error('Account not found');
            }
            if (account.type === _src_lib_Constants__WEBPACK_IMPORTED_MODULE_5__["WalletType"].LEGACY) {
                alert('Cannot sign BTC transactions with a legacy account');
                throw new Error('Cannot use legacy account');
            }
            const redeemAddress = account.btcAddresses ? account.btcAddresses.external[0] : null;
            if (!redeemAddress) {
                alert('No BTC address found in account, activate Bitcoin for this account first');
                throw new Error('No BTC address found');
            }
            const request = {
                appName: 'Hub Demos',
                fund: {
                    type: 'NIM',
                    sender: account.addresses[0].address,
                    value: 2709.79904 * 1e5,
                    fee: 0,
                    extraData: 'anlssPDlYuJ5R8hvRtmP3EVjywhona4vd7BI3MCOFNcxBOoUIitb4QMZNYm9TPJr6LpTyq2WJSLYwtBr6jaor6LrJjgvNFcr4gEAEWWF',
                    validityStartHeight: 1140000,
                },
                redeem: {
                    type: 'BTC',
                    input: {
                        transactionHash: 'ef4aaf6087d0cc48ff09355d715c257078467ca4d9dd75a20824e70a78fb43cc',
                        outputIndex: 0,
                        outputScript: BitcoinJS.address.toOutputScript('tb1q0hzaqgespv4a67wrc843gkjd5s668l6arm820utp32m9nss90ejq83klw7', BitcoinJS.networks.testnet).toString('hex'),
                        witnessScript: '6382012088a820193589bd4cf26be8ba53caad962522d8c2d06bea36a8afa2eb26382f34572be28876a91484eb9bcbd90ce7d3360992259e4b9b818215a96088ac67044934565fb17576a91457f4babc23d2369572394cf80f28daeb9c3b58f188ac68',
                        value: Math.round(0.001004 * 1e8),
                    },
                    output: {
                        address: redeemAddress,
                        value: 0.001 * 1e8,
                    },
                },
                fiatCurrency: 'eur',
                nimFiatRate: 0.00267,
                btcFiatRate: 8662.93,
                serviceNetworkFee: 10.73171 * 1e5,
                serviceExchangeFee: 5.40878 * 1e5,
                nimiqAddresses: account.addresses.map((address) => ({
                    address: address.address,
                    balance: Math.round(Math.random() * 10000 + 3000) * 1e5,
                })),
                bitcoinAccount: {
                    balance: Math.round((Math.random() * 0.001 + 0.001) * 1e8),
                },
            };
            try {
                const result = await demo.client.setupSwap(request, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').innerHTML = `Signed successfully!<br>NIM:&nbsp;${result.nim.serializedTx}<br>BTC:&nbsp;${result.btc.serializedTx}`;
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#setup-swap.btc-to-nim').addEventListener('click', async () => {
            // const $radio = document.querySelector('input[name="address"]:checked');
            // if (!$radio) {
            //     alert('You have no account to send a tx from, create an account first (signup)');
            //     throw new Error('No account found');
            // }
            // const accountId = $radio.closest('ul').closest('li').querySelector('button').dataset.walletId;
            const accountId = '44012bb58ff5';
            const account = (await demo.list()).find((wallet) => wallet.accountId === accountId);
            if (!account) {
                alert('Account for the demo swap not found. Currently only Sören has this account.');
                throw new Error('Account not found');
            }
            if (account.type === _src_lib_Constants__WEBPACK_IMPORTED_MODULE_5__["WalletType"].LEGACY) {
                alert('Cannot sign BTC transactions with a legacy account');
                throw new Error('Cannot use legacy account');
            }
            const refundAddress = account.btcAddresses ? account.btcAddresses.external[0] : null;
            if (!refundAddress) {
                alert('No BTC address found in account, activate Bitcoin for this account first');
                throw new Error('No BTC address found');
            }
            const request = {
                appName: 'Hub Demos',
                fund: {
                    type: 'BTC',
                    inputs: [{
                            address: refundAddress,
                            transactionHash: 'ef4aaf6087d0cc48ff09355d715c257078467ca4d9dd75a20824e70a78fb43cc',
                            outputIndex: 0,
                            outputScript: BitcoinJS.address.toOutputScript(refundAddress, BitcoinJS.networks.testnet).toString('hex'),
                            value: 0.00076136 * 1e8,
                        }],
                    output: {
                        address: 'tb1qkg69q2pmq8yncjusk2h77vru99rk8n6pcxdxzzzseupaqc2x64ts4uhrj8',
                        value: 0.00075736 * 1e8,
                    },
                    refundAddress: refundAddress,
                    htlcScript: '6382012088a8204b268b25df99a2edb5d9fb59d4ad56402f429a47c751069918a9790743c16b788876a9146ec1c15aa31a3fe4da55ed81fc264a56bae75c7888ac6704cb53565fb17576a91484eb9bcbd90ce7d3360992259e4b9b818215a96088ac68',
                },
                redeem: {
                    type: 'NIM',
                    sender: 'NQ32 71G4 AQ88 RVA4 4XYC CH39 V2AG HTAM S0YL',
                    recipient: account.addresses[0].address,
                    value: 2000 * 1e5,
                    fee: 0,
                    validityStartHeight: 1140135,
                    htlcData: 'aJ2uL3ewSNzAjhTXMQTqFCIrW+FqeWyw8OVi4nlHyG9G2Y/cRWPLCANLJosl35mi7bXZ+1nUrVZAL0KaR8dRBpkYqXkHQ8FreAEAEWYf',
                },
                fiatCurrency: 'eur',
                nimFiatRate: 0.00267,
                btcFiatRate: 8662.93,
                serviceNetworkFee: 0.000004 * 1e8,
                serviceExchangeFee: Math.round(0.00000151168 * 1e8),
                nimiqAddresses: account.addresses.map((address) => ({
                    address: address.address,
                    balance: Math.round(Math.random() * 5000) * 1e5,
                })),
                bitcoinAccount: {
                    balance: Math.round((Math.random() * 0.001 + 0.001) * 1e8),
                },
            };
            try {
                const result = await demo.client.setupSwap(request, demo._defaultBehavior);
                console.log('Result', result);
                document.querySelector('#result').innerHTML = `Signed successfully!<br>NIM:&nbsp;${result.nim.serializedTx}<br>BTC:&nbsp;${result.btc.serializedTx}`;
            }
            catch (e) {
                console.error(e);
                document.querySelector('#result').textContent = `Error: ${e.message || e}`;
            }
        });
        document.querySelector('button#list-keyguard-keys').addEventListener('click', () => demo.listKeyguard());
        document.querySelector('button#setup-legacy-accounts').addEventListener('click', () => demo.setupLegacyAccounts());
        document.querySelector('button#list-accounts').addEventListener('click', async () => demo.updateAccounts());
        document.querySelectorAll('button').forEach((button) => button.disabled = false);
        document.querySelector('button#list-accounts').click();
    } // run
    static async _createIframe(baseUrl) {
        return new Promise((resolve, reject) => {
            const $iframe = document.createElement('iframe');
            $iframe.name = 'Nimiq Keyguard Setup IFrame';
            $iframe.style.display = 'none';
            document.body.appendChild($iframe);
            $iframe.src = `${baseUrl}/demos/setup.html`;
            $iframe.onload = () => resolve($iframe);
            $iframe.onerror = reject;
        });
    }
    async changePassword(accountId) {
        try {
            const result = await this.client.changePassword(this._createChangePasswordRequest(accountId), this._defaultBehavior);
            console.log('Result', result);
            document.querySelector('#result').textContent = 'Successfully changed Password';
        }
        catch (e) {
            console.error(e);
            document.querySelector('#result').textContent = `Error: ${e.message || e}`;
        }
    }
    _createChangePasswordRequest(accountId) {
        return {
            appName: 'Hub Demos',
            accountId,
        };
    }
    async addAccount(accountId) {
        try {
            const result = await this.client.addAddress(this._createAddAccountRequest(accountId), this._defaultBehavior);
            console.log('Result', result);
            document.querySelector('#result').textContent = 'Account added';
        }
        catch (e) {
            console.error(e);
            document.querySelector('#result').textContent = `Error: ${e.message || e}`;
        }
    }
    _createAddAccountRequest(accountId) {
        return {
            appName: 'Hub Demos',
            accountId,
        };
    }
    async rename(accountId, account) {
        try {
            const result = await this.client.rename(this._createRenameRequest(accountId, account), this._defaultBehavior);
            console.log('Result', result);
            document.querySelector('#result').textContent = 'Done renaming account';
        }
        catch (e) {
            console.error(e);
            document.querySelector('#result').textContent = `Error: ${e.message || e}`;
        }
    }
    _createRenameRequest(accountId, address) {
        return {
            appName: 'Hub Demos',
            accountId,
            address,
        };
    }
    async updateAccounts() {
        const cashlinks = await this.cashlinks();
        let $ul = document.querySelector('#cashlinks');
        let cashlinksHtml = '';
        cashlinks.forEach((cashlink) => {
            cashlinksHtml += `
            <li>
                ${cashlink.address}
                <button class="cashlink-manage" data-cashlink-address="${cashlink.address}">manage</button>
            </li>`;
        });
        $ul.innerHTML = cashlinksHtml;
        document.querySelectorAll('button.cashlink-manage').forEach((element) => {
            element.addEventListener('click', () => this.client.manageCashlink({
                appName: 'Hub Demos',
                cashlinkAddress: element.dataset.cashlinkAddress,
            }));
        });
        const wallets = await this.list();
        console.log('Accounts in Manager:', wallets);
        $ul = document.querySelector('#accounts');
        let html = '';
        wallets.forEach((wallet) => {
            html += `<li>${wallet.label}<br>
                        <button class="export" data-wallet-id="${wallet.accountId}">Export</button>
                        <button class="export-file" data-wallet-id="${wallet.accountId}">File</button>
                        <button class="export-words" data-wallet-id="${wallet.accountId}">Words</button>
                        <button class="change-password" data-wallet-id="${wallet.accountId}">Ch. Pass.</button>
                        ${wallet.type !== 0
                ? `<button class="add-account" data-wallet-id="${wallet.accountId}">+ Addr</button>`
                : ''}
                        <button class="rename" data-wallet-id="${wallet.accountId}">Rename</button>
                        <button class="logout" data-wallet-id="${wallet.accountId}">Logout</button>
                        <ul>`;
            wallet.addresses.forEach((acc) => {
                html += `
                    <li>
                        <label>
                            <input type="radio"
                                name="address"
                                data-address="${acc.address}"
                                data-wallet-id="${wallet.accountId}">
                            ${acc.label}
                            <button class="rename" data-wallet-id="${wallet.accountId}" data-address="${acc.address}">
                                Rename
                            </button>
                        </label>
                    </li>
                `;
            });
            wallet.contracts.forEach((con) => {
                html += `
                    <li>
                        <label>
                            <input type="radio"
                                name="address"
                                data-address="${con.address}"
                                data-wallet-id="${wallet.accountId}">
                            <strong>Contract</strong> ${con.label}
                            <button class="rename" data-wallet-id="${wallet.accountId}" data-address="${con.address}">
                                Rename
                            </button>
                        </label>
                    </li>
                `;
            });
            html += '</ul></li>';
        });
        $ul.innerHTML = html;
        if (document.querySelector('input[name="address"]')) {
            document.querySelector('input[name="address"]').checked = true;
        }
        document.querySelectorAll('button.export').forEach((element) => {
            element.addEventListener('click', async () => this.export(element.dataset.walletId));
        });
        document.querySelectorAll('button.export-file').forEach((element) => {
            element.addEventListener('click', async () => this.exportFile(element.dataset.walletId));
        });
        document.querySelectorAll('button.export-words').forEach((element) => {
            element.addEventListener('click', async () => this.exportWords(element.dataset.walletId));
        });
        document.querySelectorAll('button.change-password').forEach((element) => {
            element.addEventListener('click', async () => this.changePassword(element.dataset.walletId));
        });
        document.querySelectorAll('button.rename').forEach((element) => {
            element.addEventListener('click', async () => this.rename(element.dataset.walletId, element.dataset.address));
        });
        document.querySelectorAll('button.add-account').forEach((element) => {
            element.addEventListener('click', async () => this.addAccount(element.dataset.walletId));
        });
        document.querySelectorAll('button.logout').forEach((element) => {
            element.addEventListener('click', async () => this.logout(element.dataset.walletId));
        });
    }
    setClientBehavior(behavior) {
        if (behavior === 'popup') {
            this._defaultBehavior = undefined; // use the clients default behavior which is popup
        }
        else if (behavior === 'redirect') {
            this._defaultBehavior = new _client_RequestBehavior__WEBPACK_IMPORTED_MODULE_3__["RedirectRequestBehavior"]();
        }
    }
    async startIframeClient(baseUrl) {
        if (this._iframeClient)
            return this._iframeClient;
        const $iframe = await Demo._createIframe(baseUrl);
        if (!$iframe.contentWindow)
            throw new Error(`IFrame contentWindow is ${typeof $iframe.contentWindow}`);
        this._iframeClient = new _nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__["PostMessageRpcClient"]($iframe.contentWindow, '*');
        await this._iframeClient.init();
        return this._iframeClient;
    }
    async startPopupClient(url, windowName) {
        const $popup = window.open(url, windowName);
        const popupClient = new _nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__["PostMessageRpcClient"]($popup, '*');
        await popupClient.init();
        return popupClient;
    }
    async listKeyguard() {
        const client = await this.startIframeClient(this._keyguardBaseUrl);
        const keys = await client.call('list');
        console.log('Keys in Keyguard:', keys);
        document.querySelector('#result').textContent = 'Keys listed in console';
        return keys;
    }
    async setupLegacyAccounts() {
        const client = await this.startPopupClient(`${this._keyguardBaseUrl}/demos/setup.html`, 'Nimiq Keyguard Setup Popup');
        const result = await client.call('setUpLegacyAccounts');
        client.close();
        // @ts-ignore Property '_target' is private and only accessible within class 'PostMessageRpcClient'.
        client._target.close();
        console.log('Legacy Account setup:', result);
        document.querySelector('#result').textContent = 'Legacy account stored';
    }
    async list() {
        return await this.client.list();
    }
    async cashlinks() {
        return await this.client.cashlinks();
    }
    async logout(accountId) {
        try {
            const result = await this.client.logout(this._createLogoutRequest(accountId), this._defaultBehavior);
            console.log('Result', result);
            document.querySelector('#result').textContent = 'Account removed';
            return result;
        }
        catch (e) {
            console.error(e);
            document.querySelector('#result').textContent = `Error: ${e.message || e}`;
        }
    }
    _createLogoutRequest(accountId) {
        return {
            appName: 'Hub Demos',
            accountId,
        };
    }
    export(accountId) {
        this._export({
            appName: 'Hub Demos',
            accountId,
        });
    }
    exportFile(accountId) {
        this._export({
            appName: 'Hub Demos',
            accountId,
            fileOnly: true,
        });
    }
    exportWords(accountId) {
        this._export({
            appName: 'Hub Demos',
            accountId,
            wordsOnly: true,
        });
    }
    async _export(request) {
        try {
            const result = await this.client.export(request, this._defaultBehavior);
            console.log('Result', result);
            if (result.fileExported) {
                document.querySelector('#result').textContent = result.wordsExported
                    ? 'Export sucessful'
                    : 'File exported';
            }
            else {
                document.querySelector('#result').textContent = result.wordsExported
                    ? 'Words exported'
                    : 'nothing exported';
            }
        }
        catch (e) {
            console.error(e);
            document.querySelector('#result').textContent = `Error: ${e.message || e}`;
        }
    }
    get client() {
        return this._hubApi || (this._hubApi = new _client_HubApi__WEBPACK_IMPORTED_MODULE_1__["default"](location.origin));
    }
} // class Demo
Demo.run();


/***/ }),

/***/ 4:
/*!*****************************!*\
  !*** multi ./demos/Demo.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/iesiyok/projects/acc-js/development/nimiq2/hub/demos/Demo.ts */"./demos/Demo.ts");


/***/ }),

/***/ "buffer":
/*!****************************!*\
  !*** external "BitcoinJS" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = BitcoinJS;

/***/ })

/******/ });
//# sourceMappingURL=demos.js.map