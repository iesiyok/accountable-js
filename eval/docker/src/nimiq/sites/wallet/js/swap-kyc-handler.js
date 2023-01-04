/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/swap-kyc-handler.ts":
/*!*********************************!*\
  !*** ./src/swap-kyc-handler.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nimiq_hub_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/hub-api */ "./node_modules/@nimiq/hub-api/dist/HubApi.es.js");
/* harmony import */ var _nimiq_ten31_pass_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nimiq/ten31-pass-api */ "./node_modules/@nimiq/ten31-pass-api/dist/index.es.js");
/* harmony import */ var _nimiq_rpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/rpc */ "./node_modules/@nimiq/rpc/dist/rpc.es.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/FormattableNumber.js");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _stores_Kyc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stores/Kyc */ "./src/stores/Kyc.ts");
/* harmony import */ var _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./i18n/i18n-setup */ "./src/i18n/i18n-setup.ts");

// Swap kyc handler that handles TEN31 Pass KYC and forwards the result to hub create-swap request.
// We invoke TEN31 Pass and the Nimiq Hub via redirects in this single wallet popup to avoid having to open separate
// popups for TEN31 Pass and the Hub.
// As sessionStorage is sand-boxed for separate windows, we use it here for storing the request and intermediary results
// to still be available on reloads and after returning from redirects, without affecting the Wallet main window and
// potential other Wallet windows or swaps. However, for the case that the wallet is configured to use redirects, we
// still clear the swap kyc handler storage after requests.







const SWAP_KYC_HANDLER_STORAGE_KEY = 'wallet-swap-kyc-handler';

function readSwapKycHandlerStorage() {
  try {
    const swapKycHandlerStorageJson = sessionStorage[SWAP_KYC_HANDLER_STORAGE_KEY] || '{}';
    const swapKycHandlerStorage = JSON.parse(swapKycHandlerStorageJson);
    return [swapKycHandlerStorage.rpcServerState ? _nimiq_rpc__WEBPACK_IMPORTED_MODULE_2__.State.fromJSON(swapKycHandlerStorage.rpcServerState) : undefined, swapKycHandlerStorage.request, swapKycHandlerStorage.kycUser, swapKycHandlerStorage.kycResponse];
  } catch (e) {
    return [];
  }
}

function writeSwapKycHandlerStorage(rpcServerState, request, kycUser, kycResponse) {
  const swapKycHandlerStorage = {
    rpcServerState: rpcServerState ? rpcServerState.toJSON() : undefined,
    request,
    kycUser,
    kycResponse
  };
  sessionStorage[SWAP_KYC_HANDLER_STORAGE_KEY] = JSON.stringify(swapKycHandlerStorage);
}

function clearSwapKycHandlerStorage() {
  sessionStorage.removeItem(SWAP_KYC_HANDLER_STORAGE_KEY);
}

function toDecimalString(amount, decimals) {
  // Convert to decimal string without the risk of potential floating division imprecision occurring
  return new _nimiq_utils__WEBPACK_IMPORTED_MODULE_6__.FormattableNumber(amount).moveDecimalSeparator(-1 * decimals).toString();
} // For translating error messages which get displayed in the UI.
// Translate on a best effort basis; if language file has not been loaded yet, return a fallback. The method is called
// $t such that source strings in calls to it get detected by our webpack-i18n-tools extractor. It's essentially the
// same as VueI18n's $t but extended by the fallback string which will be returned if the language file has not been
// loaded yet. Note that we're not just using the key as fallback because, webpack-i18n-tools optimizes these away to be
// just simple index numbers.


(0,_i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_5__.loadLanguage)((0,_i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_5__.detectLanguage)());

_i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_5__.i18n.missing = () => ''; // don't return index numbers before language loaded; same as set in i18n-setup for production


function $t(key, valuesOrFallback, fallback) {
  return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_5__.i18n.t(key, typeof valuesOrFallback !== 'string' ? valuesOrFallback : undefined) // The translation was missing and i18n.t returned an empty string as configured by i18n.missing
  || (typeof valuesOrFallback === 'string' ? valuesOrFallback : fallback);
}

async function run() {
  let rpcServerState;
  let request;
  let kycUser;
  let kycResponse;

  try {
    [rpcServerState, request, kycUser, kycResponse] = readSwapKycHandlerStorage(); // Listen for initial request if not known yet.

    if (!rpcServerState || !request || !kycUser) {
      [rpcServerState, request, kycUser] = await new Promise((resolve, reject) => {
        const rpcServer = new _nimiq_rpc__WEBPACK_IMPORTED_MODULE_2__.RpcServer(
        /* allowed origins */
        window.location.origin); // no need to parse/validate the request as we are the only allowed origin

        rpcServer.onRequest(_nimiq_hub_api__WEBPACK_IMPORTED_MODULE_1__["default"].RequestType.SETUP_SWAP, (state, req, user) => resolve([state, req, user]));
        rpcServer.init(
        /* onClientTimeout */
        () => reject(new Error($t('273', 'No request received.'))));
      });
      writeSwapKycHandlerStorage(rpcServerState, request, kycUser, kycResponse);
    } // Request TEN31 Pass grants or check for TEN31 Pass redirect response.


    if (kycUser.provider === _stores_Kyc__WEBPACK_IMPORTED_MODULE_4__.KycProvider.TEN31PASS) {
      var _ten31PassApi$getRedi, _kycResponse;

      const ten31PassApi = new _nimiq_ten31_pass_api__WEBPACK_IMPORTED_MODULE_7__["default"](config__WEBPACK_IMPORTED_MODULE_3__["default"].ten31Pass.apiEndpoint);
      const grantResponse = (_ten31PassApi$getRedi = ten31PassApi.getRedirectGrantResponse()) === null || _ten31PassApi$getRedi === void 0 ? void 0 : _ten31PassApi$getRedi.response;
      const s3ServiceId = config__WEBPACK_IMPORTED_MODULE_3__["default"].ten31Pass.services.s3.serviceId;
      const oasisServiceId = config__WEBPACK_IMPORTED_MODULE_3__["default"].ten31Pass.services.oasis.serviceId; // console.log('Swap kyc handler TEN31 Pass response referrer', document.referrer); // eslint-disable-line
      // Request grants if we didn't get them yet.

      if (!kycResponse && !grantResponse) {
        // Note that all amounts in the grants refer to the values S3 initially gave us on createSwap. As the
        // Hub partially operates on different values, we need to revert this preprocessing here that the Wallet
        // did on the original values. More specifically, we want to get the original swapSuggestion values back
        // that were modified in the hubRequest in SwapModal, BuyCryptoModal and SellCryptoModal.
        const serviceRequests = [{
          serviceId: s3ServiceId,
          usages: [{
            usageId: config__WEBPACK_IMPORTED_MODULE_3__["default"].ten31Pass.services.s3.usageIds.swap,
            parameters: {
              from_amount: (() => {
                switch (request.fund.type) {
                  case 'NIM':
                    return toDecimalString(request.fund.value, 5);

                  case 'BTC':
                    return toDecimalString(request.fund.output.value, 8);

                  case 'EUR':
                    return toDecimalString(request.fund.value + request.fund.fee, 2);

                  default:
                    throw new Error($t('453', 'Unsupported currency'));
                }
              })(),
              from_asset: request.fund.type,
              to_amount: (() => {
                switch (request.redeem.type) {
                  case 'NIM':
                    return toDecimalString(request.redeem.value + request.redeem.fee, 5);

                  case 'BTC':
                    return toDecimalString(request.redeem.input.value, 8);

                  case 'EUR':
                    return toDecimalString(request.redeem.value, 2);

                  default:
                    throw new Error($t('453', 'Unsupported currency'));
                }
              })(),
              to_asset: request.redeem.type,
              id: request.swapId
            }
          }]
        }];

        if (request.fund.type === 'EUR') {
          serviceRequests.push({
            serviceId: oasisServiceId,
            usages: [{
              usageId: config__WEBPACK_IMPORTED_MODULE_3__["default"].ten31Pass.services.oasis.usageIds.clearing,
              parameters: {
                amount: request.fund.value + request.fund.fee
              }
            }]
          });
        } else if (request.redeem.type === 'EUR') {
          serviceRequests.push({
            serviceId: oasisServiceId,
            usages: [{
              usageId: config__WEBPACK_IMPORTED_MODULE_3__["default"].ten31Pass.services.oasis.usageIds.settling,
              parameters: {
                amount: request.redeem.value
              }
            }]
          });
        } // Redirect to TEN31 Pass.


        await ten31PassApi.requestGrants(config__WEBPACK_IMPORTED_MODULE_3__["default"].ten31Pass.appId, serviceRequests,
        /* asPopup */
        false, {
          preferredResponseType: _nimiq_ten31_pass_api__WEBPACK_IMPORTED_MODULE_7__.ResponseType.IMMEDIATE_REDIRECT
        });
        return;
      } // Process and store new or changed grantResponse (for the case that the user navigated back and gave grants
      // again). If we just got the same grantResponse we already know, we don't want to process it again. We can
      // simply base the equality check on the json representation, as for same grant responses also the order of
      // object entries should be the same.


      const isChangedGrantResponse = JSON.stringify(grantResponse) !== JSON.stringify((_kycResponse = kycResponse) === null || _kycResponse === void 0 ? void 0 : _kycResponse.grantResponse);

      if (grantResponse && (!kycResponse || isChangedGrantResponse)) {
        const s3Grant = grantResponse.services[s3ServiceId];
        const oasisGrant = grantResponse.services[oasisServiceId];
        const isOasisSwap = request.fund.type === 'EUR' || request.redeem.type === 'EUR';

        if (!s3Grant || isOasisSwap && !oasisGrant) {
          throw new Error($t('406', 'TEN31 Pass didn\'t return expected grants.'));
        }

        if (grantResponse.app !== kycUser.appGrant) {
          throw new Error($t('451', {
            userName: kycUser.name
          }, `Unexpected user. This account is currently connected to the TEN31 Pass of ${kycUser.name}.`));
        }

        const [s3GrantToken, oasisGrantToken] = await Promise.all([ten31PassApi.getServiceGrantInfo(s3Grant), oasisGrant ? ten31PassApi.getServiceGrantInfo(oasisGrant) : Promise.resolve(null)].map(serviveGrantPromise => serviveGrantPromise.then(serviceGrant => serviceGrant === null || serviceGrant === void 0 ? void 0 : serviceGrant.token)));

        if (!s3GrantToken || isOasisSwap && !oasisGrantToken) {
          throw new Error($t('406', 'TEN31 Pass didn\'t return expected grants.'));
        }

        kycResponse = {
          provider: _stores_Kyc__WEBPACK_IMPORTED_MODULE_4__.KycProvider.TEN31PASS,
          grantResponse,
          s3GrantToken,
          oasisGrantToken
        };
        writeSwapKycHandlerStorage(rpcServerState, request, kycUser, kycResponse);
      } else if (!kycResponse) {
        // This can't happen based on the checks above. This is just a type guard for typescript.
        throw new Error('Unexpected');
      }
    } else {
      throw new Error($t('454', {
        provider: kycUser.provider
      }, `Unsupported KYC provider ${kycUser.provider}.`));
    } // Launch Hub swap creation flow or check for Hub redirect response.


    const hubApi = new _nimiq_hub_api__WEBPACK_IMPORTED_MODULE_1__["default"](config__WEBPACK_IMPORTED_MODULE_3__["default"].hubEndpoint);
    const setupSwapResult = await new Promise((resolve, reject) => {
      // triggered by checkRedirectResponse if there is a response
      hubApi.on(_nimiq_hub_api__WEBPACK_IMPORTED_MODULE_1__["default"].RequestType.SETUP_SWAP, resolve, reject);
      hubApi.checkRedirectResponse().then(() => resolve(undefined));
    }); // Redirect to Hub if we didn't get the hub response yet.

    if (!setupSwapResult) {
      await hubApi.setupSwap({ ...request,
        kyc: { ...kycResponse,
          userId: kycUser.id
        }
      }, new _nimiq_hub_api__WEBPACK_IMPORTED_MODULE_1__["default"].RedirectRequestBehavior());
      return;
    } // Return result


    const setupSwapWithKycResult = { ...setupSwapResult,
      kyc: kycResponse
    };
    clearSwapKycHandlerStorage();
    rpcServerState.reply(_nimiq_rpc__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus.OK, setupSwapWithKycResult);
  } catch (e) {
    clearSwapKycHandlerStorage();

    if (rpcServerState) {
      rpcServerState.reply(_nimiq_rpc__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus.ERROR, e);
    } else if (window.opener) {
      // Can't report error as we don't know the request id. Display a good old alert.
      alert($t( // eslint-disable-line no-alert
      'An error occurred: {message}', {
        message: e.message || e
      }, `An error occurred: ${e.message || e}`));
      window.close();
    } else {
      // We're in fact not a popup but were opened by hub.ts as redirect. Go back to Wallet main UI.
      window.location.assign(window.location.origin);
    }
  }
}

run();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	!function() {
/******/ 		var getProto = Object.getPrototypeOf ? function(obj) { return Object.getPrototypeOf(obj); } : function(obj) { return obj.__proto__; };
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach(function(key) { def[key] = function() { return value[key]; }; });
/******/ 			}
/******/ 			def['default'] = function() { return value; };
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "js/" + chunkId + ".js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.hmd = function(module) {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: function() {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "@nimiq/wallet:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "/";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"swap-kyc-handler": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = function(chunkId, promises) {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise(function(resolve, reject) { installedChunkData = installedChunks[chunkId] = [resolve, reject]; });
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = function(event) {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_nimiq_wallet"] = self["webpackChunk_nimiq_wallet"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["chunk-vendors","chunk-common"], function() { return __webpack_require__("./src/swap-kyc-handler.ts"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=swap-kyc-handler.js.map