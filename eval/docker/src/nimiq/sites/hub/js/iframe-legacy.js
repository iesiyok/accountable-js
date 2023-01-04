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
/******/ 		"iframe": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"cookie-decoder":"cookie-decoder","electrum-client":"electrum-client","lang-de-po":"lang-de-po","lang-en-po":"lang-en-po","lang-es-po":"lang-es-po","lang-fr-po":"lang-fr-po","lang-nl-po":"lang-nl-po","lang-ru-po":"lang-ru-po","lang-uk-po":"lang-uk-po","lang-zh-po":"lang-zh-po"}[chunkId]||chunkId) + "-legacy.js"
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
/******/ 	deferredModules.push([1,"chunk-vendors","chunk-common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/iframe.ts":
/*!***********************!*\
  !*** ./src/iframe.ts ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/rpc */ "./node_modules/@nimiq/rpc/dist/rpc.es.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/WalletInfo */ "./src/lib/WalletInfo.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_CookieJar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/CookieJar */ "./src/lib/CookieJar.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_Cashlink__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/Cashlink */ "./src/lib/Cashlink.ts");
/* harmony import */ var _lib_CashlinkStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/CashlinkStore */ "./src/lib/CashlinkStore.ts");
/* harmony import */ var _lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/bitcoin/BitcoinJSLoader */ "./src/lib/bitcoin/BitcoinJSLoader.ts");
/* harmony import */ var _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lib/bitcoin/BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");
/* harmony import */ var _lib_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lib/bitcoin/BitcoinUtils */ "./src/lib/bitcoin/BitcoinUtils.ts");
/* harmony import */ var _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./i18n/i18n-setup */ "./src/i18n/i18n-setup.ts");














class IFrameApi {
    static run() {
        const rpcServer = new _nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__["RpcServer"](config__WEBPACK_IMPORTED_MODULE_6__["default"].privilegedOrigins);
        // Register handlers
        rpcServer.onRequest(_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["RequestType"].LIST, IFrameApi.list);
        rpcServer.onRequest(_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["RequestType"].LIST_CASHLINKS, IFrameApi.cashlinks);
        rpcServer.onRequest(_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["RequestType"].ADD_BTC_ADDRESSES, IFrameApi.addBitcoinAddresses);
        rpcServer.init();
    }
    static async list() {
        let wallets;
        if (_nimiq_utils__WEBPACK_IMPORTED_MODULE_1__["BrowserDetection"].isIOS() || _nimiq_utils__WEBPACK_IMPORTED_MODULE_1__["BrowserDetection"].isSafari()) {
            /*
            ** We need to load the language before the Cookie decoding
            ** since it'll use functions from the LabelingMachine that require the language to be loaded.
            ** Otherwise the label will show up as a number. (translation string index)
            */
            await Object(_i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_13__["setLanguage"])(Object(_i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_13__["detectLanguage"])());
            wallets = await _lib_CookieJar__WEBPACK_IMPORTED_MODULE_5__["default"].eat();
        }
        else {
            wallets = await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_2__["WalletStore"].Instance.list();
        }
        if (wallets.length > 0) {
            return Promise.all(wallets
                .filter((wallet) => !wallet.keyMissing)
                .map((wallet) => _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_3__["WalletInfo"].objectToAccountType(wallet)));
        }
        // If no wallets exist, see if the Keyguard has keys
        const client = new (await Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! @nimiq/keyguard-client */ "./node_modules/@nimiq/keyguard-client/dist/KeyguardClient.es.js"))).KeyguardClient(config__WEBPACK_IMPORTED_MODULE_6__["default"].keyguardEndpoint);
        const hasKeys = await client.hasKeys();
        if (hasKeys.success) {
            throw new Error('ACCOUNTS_LOST');
        }
        // If no keys exist, check for legacy accounts
        const hasLegacyAccounts = await client.hasLegacyAccounts();
        if (hasLegacyAccounts.success) {
            throw new Error('MIGRATION_REQUIRED');
        }
        return [];
    }
    static async cashlinks() {
        // Cashlinks are not stored in cookies on iOS/Safari, because they would take up too much space.
        // TODO: Use Storage Access API on iOS/Safari to access IndexedDB in the iframe.
        if (_nimiq_utils__WEBPACK_IMPORTED_MODULE_1__["BrowserDetection"].isIOS() || _nimiq_utils__WEBPACK_IMPORTED_MODULE_1__["BrowserDetection"].isSafari())
            return [];
        const cashlinksEntries = await _lib_CashlinkStore__WEBPACK_IMPORTED_MODULE_9__["CashlinkStore"].Instance.list();
        return cashlinksEntries.map((cashlink) => ({
            address: cashlink.address,
            message: cashlink.message,
            value: cashlink.value,
            status: cashlink.state,
            theme: cashlink.theme || _lib_Cashlink__WEBPACK_IMPORTED_MODULE_8__["default"].DEFAULT_THEME,
        }));
    }
    static async addBitcoinAddresses(state, request) {
        // Validate chain
        const chain = request.chain;
        if (!chain || (chain !== 'internal' && chain !== 'external')) {
            throw new Error('Invalid chain');
        }
        // Validate firstIndex
        const firstIndex = request.firstIndex;
        if (typeof firstIndex !== 'number' || firstIndex < 0 || Math.round(firstIndex) !== firstIndex) {
            throw new Error('firstIndex must be a positive integer');
        }
        // Validate accountId
        if (!request.accountId || typeof request.accountId !== 'string') {
            throw new Error('accountId must be a string');
        }
        // Fetch WalletInfo
        let wallets;
        if (_nimiq_utils__WEBPACK_IMPORTED_MODULE_1__["BrowserDetection"].isIOS() || _nimiq_utils__WEBPACK_IMPORTED_MODULE_1__["BrowserDetection"].isSafari()) {
            wallets = await _lib_CookieJar__WEBPACK_IMPORTED_MODULE_5__["default"].eat();
        }
        else {
            wallets = await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_2__["WalletStore"].Instance.list();
        }
        const wallet = wallets.find((entry) => entry.id === request.accountId);
        if (!wallet) {
            throw new Error('Account not found');
        }
        if (wallet.type === _lib_Constants__WEBPACK_IMPORTED_MODULE_4__["WalletType"].LEGACY) {
            throw new Error('Cannot add Bitcoin addresses to a legacy account');
        }
        if (!wallet.btcXPub) {
            throw new Error(_lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__["ERROR_NO_XPUB"]);
        }
        await Object(_lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_10__["loadBitcoinJS"])();
        const xPubType = ['ypub', 'upub'].includes(wallet.btcXPub.substr(0, 4)) ? _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__["NESTED_SEGWIT"] : _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__["NATIVE_SEGWIT"];
        const addresses = Object(_lib_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_12__["deriveAddressesFromXPub"])(wallet.btcXPub, [chain === 'external' ? _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__["EXTERNAL_INDEX"] : _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__["INTERNAL_INDEX"]], firstIndex, _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__["BTC_ACCOUNT_MAX_ALLOWED_ADDRESS_GAP"], xPubType).map((addressInfo) => addressInfo.address);
        return {
            addresses,
        };
    }
}
IFrameApi.run();


/***/ }),

/***/ 1:
/*!*****************************!*\
  !*** multi ./src/iframe.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/iesiyok/projects/acc-js/development/nimiq2/hub/src/iframe.ts */"./src/iframe.ts");


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
//# sourceMappingURL=iframe-legacy.js.map