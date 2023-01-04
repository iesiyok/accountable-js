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
/******/ 		"cashlink-app": 0
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
/******/ 	deferredModules.push([2,"chunk-vendors","chunk-common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/CashlinkApp.vue?vue&type=script&lang=ts&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/CashlinkApp.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _views_CashlinkReceive_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/CashlinkReceive.vue */ "./src/views/CashlinkReceive.vue");
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/Helpers */ "./src/lib/Helpers.ts");
/* harmony import */ var _nimiq_style_nimiq_style_min_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nimiq/style/nimiq-style.min.css */ "./node_modules/@nimiq/style/nimiq-style.min.css");
/* harmony import */ var _nimiq_style_nimiq_style_min_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nimiq_style_nimiq_style_min_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _nimiq_vue_components_dist_NimiqVueComponents_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nimiq/vue-components/dist/NimiqVueComponents.css */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.css");
/* harmony import */ var _nimiq_vue_components_dist_NimiqVueComponents_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components_dist_NimiqVueComponents_css__WEBPACK_IMPORTED_MODULE_6__);







let CashlinkApp = class CashlinkApp extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.loading = true;
        this.isDarkTheme = false;
    }
    async created() {
        await Promise.all([
            this.$store.dispatch('initWallets'),
            Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_4__["loadNimiq"])(),
        ]);
        this.loading = false;
    }
    _onThemeChange(theme, isDarkTheme) {
        this.isDarkTheme = isDarkTheme;
    }
};
CashlinkApp = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { LoadingSpinner: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["LoadingSpinner"], CashlinkReceive: _views_CashlinkReceive_vue__WEBPACK_IMPORTED_MODULE_3__["default"] } })
], CashlinkApp);
/* harmony default export */ __webpack_exports__["default"] = (CashlinkApp);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CashlinkSparkle.vue?vue&type=script&lang=ts&":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CashlinkSparkle.vue?vue&type=script&lang=ts& ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        CashlinkIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__["CashlinkIcon"],
    },
});


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=script&lang=ts&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StatusScreen.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
var StatusScreen_1;



/**
 * **Nimiq StatusScreen Component**
 *
 * Props:
 *
 * **title** {string} The current title, dynamic for both loading and result states
 *
 * **status** {string} [optional] Currently doing this
 *
 * **state** {'loading'|'success'|'warning'|'error'} [optional, default 'loading']
 *
 * **lightBlue** {boolean} [optional, default false] Show light blue loading screen
 *
 * **message** {string} [optional] Message displayed for warning and error states
 *
 * **mainAction** {string} [optional] Text of main action button (button is hidden otherwise)
 *
 * **alternativeAction** {string} [optional] Text of alternative action link (link is hidden otherwise)
 *
 * **small** {boolean} [optional] Toggle to a smaller layout
 *
 * Events:
 *
 * **@main-action**
 *
 * **@alternative-action**
 *
 * The `state` is available as `StatusScreen.State.LOADING`, `StatusScreen.State.SUCCESS`,
 * `StatusScreen.State.WARNING` and `StatusScreen.State.ERROR`.
 *
 * The events are available as `StatusScreen.Events.MAIN_ACTION` and `StatusScreen.Events.ALTERNATIVE_ACTION`.
 */
let StatusScreen = StatusScreen_1 = class StatusScreen extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.currentStatus = '';
        this.nextStatus = '';
        this.isTransitioningStatus = false;
        /**
         * To enable a smooth transition of the non-transitionable background-image
         * property, we instead place the new background above the old one and
         * animate the top element's opacity. But because the color area has rounded
         * corners, and the browser creates transparent pixels in the corner
         * because of anti-aliasing, the blue background partly shines through the
         * transparent corner pixels of the foreground. Thus we remove the background
         * color after the transition is complete.
         */
        this.showLoadingBackground = true;
        this.loadingTitle = '';
        this.hideLoadingBackgroundTimeout = -1;
        this.statusUpdateTimeout = -1;
    }
    updateLoadingTitle(newTitle) {
        // only change the _loadingTitle, if we're still in the loading state (and not changing the state right after
        // setting the title) to avoid it being changed on the loading screen when we actually want to set it for the
        // success/error/warning screen.
        this.$nextTick(() => {
            if (this.state !== StatusScreen_1.State.LOADING)
                return;
            this.loadingTitle = newTitle;
        });
    }
    updateState(newState, oldState) {
        if (newState === StatusScreen_1.State.LOADING) {
            // Starting in or changing to LOADING
            if (this.hideLoadingBackgroundTimeout !== -1) {
                clearTimeout(this.hideLoadingBackgroundTimeout);
                this.hideLoadingBackgroundTimeout = -1;
            }
            this.showLoadingBackground = true;
        }
        else {
            // other state than LOADING
            if (oldState === StatusScreen_1.State.LOADING) {
                if (this.hideLoadingBackgroundTimeout === -1) {
                    this.hideLoadingBackgroundTimeout = window.setTimeout(() => {
                        this.showLoadingBackground = false;
                        this.hideLoadingBackgroundTimeout = -1;
                    }, 1000);
                }
            }
            else {
                this.showLoadingBackground = false;
            }
        }
    }
    async updateStatus(newStatus) {
        if (this.statusUpdateTimeout !== -1) {
            clearTimeout(this.statusUpdateTimeout);
            // reset transitioning state for new change
            this.isTransitioningStatus = false;
            await this.$nextTick();
            await new Promise((resolve) => requestAnimationFrame(resolve)); // await style update
            this.currentStatus = this.nextStatus;
        }
        this.nextStatus = newStatus;
        this.isTransitioningStatus = true;
        this.statusUpdateTimeout = window.setTimeout(() => {
            this.statusUpdateTimeout = -1;
            this.currentStatus = newStatus;
            this.isTransitioningStatus = false;
        }, 500);
    }
    onMainAction() {
        this.$emit(StatusScreen_1.Events.MAIN_ACTION);
    }
    onAlternativeAction() {
        this.$emit(StatusScreen_1.Events.ALTERNATIVE_ACTION);
    }
};
// TODO: Move to CONSTANTS
StatusScreen.SUCCESS_REDIRECT_DELAY = 2000; // 1s of transition + 1s of display
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])({ type: String })
], StatusScreen.prototype, "title", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])({ default: 'loading' })
], StatusScreen.prototype, "state", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(Boolean)
], StatusScreen.prototype, "lightBlue", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(String)
], StatusScreen.prototype, "status", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(String)
], StatusScreen.prototype, "message", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(String)
], StatusScreen.prototype, "mainAction", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(String)
], StatusScreen.prototype, "alternativeAction", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(Boolean)
], StatusScreen.prototype, "small", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('title', { immediate: true })
], StatusScreen.prototype, "updateLoadingTitle", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('state', { immediate: true })
], StatusScreen.prototype, "updateState", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('status', { immediate: true })
], StatusScreen.prototype, "updateStatus", null);
StatusScreen = StatusScreen_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { LoadingSpinner: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["LoadingSpinner"], CheckmarkIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["CheckmarkIcon"], FaceNeutralIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["FaceNeutralIcon"], FaceSadIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["FaceSadIcon"] } })
], StatusScreen);
(function (StatusScreen) {
    let State;
    (function (State) {
        State["LOADING"] = "loading";
        State["SUCCESS"] = "success";
        State["WARNING"] = "warning";
        State["ERROR"] = "error";
    })(State = StatusScreen.State || (StatusScreen.State = {}));
    let Events;
    (function (Events) {
        Events["MAIN_ACTION"] = "main-action";
        Events["ALTERNATIVE_ACTION"] = "alternative-action";
    })(Events = StatusScreen.Events || (StatusScreen.Events = {}));
})(StatusScreen || (StatusScreen = {}));
/* harmony default export */ __webpack_exports__["default"] = (StatusScreen);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkReceive.vue?vue&type=script&lang=ts&":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CashlinkReceive.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_CashlinkSparkle_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/CashlinkSparkle.vue */ "./src/components/CashlinkSparkle.vue");
/* harmony import */ var _components_CircleSpinner_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/CircleSpinner.vue */ "./src/components/CircleSpinner.vue");
/* harmony import */ var _lib_Cashlink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/Cashlink */ "./src/lib/Cashlink.ts");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nimiq/network-client */ "./node_modules/@nimiq/network-client/dist/NetworkClient.es.js");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _lib_CashlinkStore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/CashlinkStore */ "./src/lib/CashlinkStore.ts");
/* harmony import */ var _client_HubApi__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../client/HubApi */ "./client/HubApi.ts");
var CashlinkReceive_1;













let CashlinkReceive = CashlinkReceive_1 = class CashlinkReceive extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.cashlink = null;
        this.selectedAddress = null;
        this.isAccountSelectorOpened = false;
        this.isClaiming = false;
        this.isMobile = false;
        this.statusState = false;
        this.statusTitle = '';
        this.statusStatus = '';
        this.statusMessage = '';
    }
    created() {
        const handler = (result, storedData) => {
            if (storedData.url) {
                window.history.replaceState(window.history.state, '', storedData.url);
            }
        };
        const hubApi = new _client_HubApi__WEBPACK_IMPORTED_MODULE_12__["default"]();
        hubApi.on(_client_HubApi__WEBPACK_IMPORTED_MODULE_12__["default"].RequestType.SIGNUP, handler, handler);
        hubApi.on(_client_HubApi__WEBPACK_IMPORTED_MODULE_12__["default"].RequestType.LOGIN, handler, handler);
        hubApi.on(_client_HubApi__WEBPACK_IMPORTED_MODULE_12__["default"].RequestType.ONBOARD, handler, handler);
        hubApi.checkRedirectResponse();
        this._onResize = this._onResize.bind(this);
        window.addEventListener('resize', this._onResize);
        this._onResize();
    }
    async mounted() {
        // Load Cashlink from URL
        this.cashlink = await _lib_Cashlink__WEBPACK_IMPORTED_MODULE_6__["default"].parse(window.location.hash.substring(1));
        // Fail if no Cashlink was found
        if (!this.cashlink) {
            this.statusState = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"].State.WARNING;
            this.statusTitle = this.$t('6');
            this.statusMessage = this.$t('239');
            return;
        }
        if (this.cashlink.theme) {
            this.$emit(CashlinkReceive_1.Events.THEME_CHANGED, this.cashlink.theme, this.isDarkTheme);
        }
        // When user has no wallets, skip Cashlink init because user needs to signup/login first
        // which requires this page to be reloaded anyway.
        if (!this.hasWallets)
            return;
        // Start network to check Cashlink status
        if (!_nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__["NetworkClient"].hasInstance()) {
            _nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__["NetworkClient"].createInstance(config__WEBPACK_IMPORTED_MODULE_10__["default"].networkEndpoint);
        }
        await _nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__["NetworkClient"].Instance.init();
        // Assign network to Cashlink
        this.cashlink.networkClient = _nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__["NetworkClient"].Instance;
    }
    destroyed() {
        window.removeEventListener('resize', this._onResize);
    }
    async claim() {
        // Start loading screen
        this.statusState = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"].State.LOADING;
        this.statusTitle = this.$t('72');
        this.statusStatus = this.$t('94');
        this.isClaiming = true;
        this.cashlink.claim(this.activeAccount.userFriendlyAddress);
        // Set up transaction-relayed listener, so we know when the tx has been sent
        await new Promise((resolve, reject) => {
            _nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__["NetworkClient"].Instance.on(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__["NetworkClient"].Events.TRANSACTION_RELAYED, (tx) => {
                if (tx.sender === this.cashlink.address.toUserFriendlyAddress())
                    resolve();
            });
        });
        try {
            await _lib_CashlinkStore__WEBPACK_IMPORTED_MODULE_11__["CashlinkStore"].Instance.put(this.cashlink);
        }
        catch (err) {
            // Ignore, because cashlink has been claimed sucessfully and will show up in the Safe
        }
        // Show success screen and redirect to Safe
        this.statusState = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"].State.SUCCESS;
        this.statusTitle = this.$t('53');
        window.setTimeout(() => this.redirectToWallet(), _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"].SUCCESS_REDIRECT_DELAY);
    }
    accountSelected(walletId, userFriendlyAddress) {
        this.$setActiveAccount({ walletId, userFriendlyAddress });
        this.isAccountSelectorOpened = false;
    }
    callHub(method) {
        const request = {
            appName: 'Cashlink',
        };
        const redirectBehavior = new _client_HubApi__WEBPACK_IMPORTED_MODULE_12__["default"].RedirectRequestBehavior(undefined, { url: window.location.href });
        const hubApi = new _client_HubApi__WEBPACK_IMPORTED_MODULE_12__["default"](undefined, redirectBehavior);
        switch (method) {
            case 'signup':
                hubApi.signup(request);
                break;
            case 'login':
                hubApi.login(request);
                break;
            case 'onboard':
                hubApi.onboard(request);
                break;
        }
    }
    redirectToWallet() {
        window.location.href = config__WEBPACK_IMPORTED_MODULE_10__["default"].redirectTarget;
    }
    get isCashlinkStateKnown() {
        return this.cashlink.state !== _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkState"].UNKNOWN;
    }
    get canCashlinkBeClaimed() {
        return this.cashlink.state === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkState"].UNCLAIMED;
    }
    get buttonText() {
        if (!this.isCashlinkStateKnown)
            return this.$t('62');
        else if (this.canCashlinkBeClaimed)
            return this.$t('70');
        else if (this.cashlink.state === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkState"].UNCHARGED)
            return this.$t('59');
        else if (this.cashlink.state === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkState"].CHARGING)
            return this.$t('57');
        else {
            if (!this.isClaiming) {
                this.statusState = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"].State.WARNING;
                this.statusTitle = this.$t('58');
                this.statusMessage = this.$t('238');
            }
            return this.$t('56');
        }
    }
    get isButtonLoading() {
        return !this.isCashlinkStateKnown || this.cashlink.state === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkState"].CHARGING;
    }
    get themeBackground() {
        return this.cashlink && this.cashlink.theme !== _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].STANDARD
            ? `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"][this.cashlink.theme].toLowerCase().replace(/_/g, '-')}`
            : null;
    }
    get isDarkTheme() {
        return !!this.cashlink && this.cashlink.theme === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].LUNAR_NEW_YEAR;
    }
    get hasMobileTheme() {
        const theme = this.cashlink ? this.cashlink.theme : _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].STANDARD;
        switch (theme) {
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].STANDARD:
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].EASTER:
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].BIRTHDAY:
                return false;
            default:
                return true;
        }
    }
    get welcomeHeadline() {
        const theme = this.cashlink ? this.cashlink.theme : _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].STANDARD;
        switch (theme) {
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].GENERIC:
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].CHRISTMAS:
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].LUNAR_NEW_YEAR:
                return this.$t('272');
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].EASTER:
                return this.$t('134');
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].BIRTHDAY:
                return this.$t('133');
            default: return this.$t('71');
        }
    }
    get welcomeText() {
        if (this.cashlink && this.cashlink.hasEncodedTheme) {
            return this.$t('87');
        }
        else {
            const theme = this.cashlink ? this.cashlink.theme : _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].STANDARD;
            return theme === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["CashlinkTheme"].STANDARD
                ? this.$t('86')
                : this.$t('85');
        }
    }
    _onResize() {
        this.isMobile = window.innerWidth <= CashlinkReceive_1.MOBILE_BREAKPOINT;
    }
};
CashlinkReceive.MOBILE_BREAKPOINT = 450;
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_8__["Getter"]
], CashlinkReceive.prototype, "addressCount", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_8__["Getter"]
], CashlinkReceive.prototype, "hasWallets", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_8__["Getter"]
], CashlinkReceive.prototype, "activeAccount", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_8__["Getter"]
], CashlinkReceive.prototype, "processedWallets", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vuex_class__WEBPACK_IMPORTED_MODULE_8__["Mutation"])('setActiveAccount')
], CashlinkReceive.prototype, "$setActiveAccount", void 0);
CashlinkReceive = CashlinkReceive_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: {
            SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"],
            StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
            CashlinkSparkle: _components_CashlinkSparkle_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
            CircleSpinner: _components_CircleSpinner_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
            PageHeader: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageHeader"],
            PageBody: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageBody"],
            PageFooter: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageFooter"],
            ArrowRightIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["ArrowRightIcon"],
            CaretRightSmallIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["CaretRightSmallIcon"],
            CloseButton: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["CloseButton"],
            Account: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["Account"],
            Amount: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["Amount"],
            AccountSelector: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["AccountSelector"],
        } })
], CashlinkReceive);
(function (CashlinkReceive) {
    let Events;
    (function (Events) {
        Events["THEME_CHANGED"] = "theme-change";
    })(Events = CashlinkReceive.Events || (CashlinkReceive.Events = {}));
})(CashlinkReceive || (CashlinkReceive = {}));
/* harmony default export */ __webpack_exports__["default"] = (CashlinkReceive);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/CashlinkApp.vue?vue&type=template&id=18ef23cb&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/CashlinkApp.vue?vue&type=template&id=18ef23cb& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { class: { "dark-theme": _vm.isDarkTheme }, attrs: { id: "app" } },
    [
      _c("header", { staticClass: "logo" }, [
        _c("span", { staticClass: "nq-icon nimiq-logo" }),
        _c("span", { staticClass: "logo-wordmark" }, [_vm._v("Nimiq")]),
        _c("span", { staticClass: "logo-subtitle" }, [_vm._v("Cashlink")]),
        _c("div", { staticClass: "flex-grow" }),
        _c(
          "a",
          {
            staticClass: "nq-button-s",
            class: { inverse: _vm.isDarkTheme },
            attrs: { href: "https://nimiq.com", target: "_blank" }
          },
          [_vm._v(" " + _vm._s(_vm.$t('268')) + " ")]
        )
      ]),
      _vm.loading
        ? _c("div", { staticClass: "loading" }, [_c("LoadingSpinner")], 1)
        : _c("CashlinkReceive", { on: { "theme-change": _vm._onThemeChange } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CashlinkSparkle.vue?vue&type=template&id=e97607ae&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CashlinkSparkle.vue?vue&type=template&id=e97607ae&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "cashlink-sparkle" }, [
    _c(
      "svg",
      {
        staticClass: "desktop",
        attrs: {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 252 240",
          width: "100%",
          height: "100%"
        }
      },
      [
        _c(
          "defs",
          [
            _c(
              "radialGradient",
              {
                attrs: {
                  id: "drg-1",
                  cx: "56.82",
                  cy: "150.3",
                  r: "5.17",
                  gradientUnits: "userSpaceOnUse"
                }
              },
              [
                _c("stop", { attrs: { offset: "0", "stop-color": "#265dd7" } }),
                _c("stop", { attrs: { offset: "1", "stop-color": "#0582ca" } })
              ],
              1
            ),
            _c("radialGradient", {
              attrs: {
                id: "drg-2",
                cx: "170.32",
                cy: "200.8",
                r: "5.17",
                "xlink:href": "#drg-1"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "drg-3",
                cx: "234.82",
                cy: "89.3",
                r: "5.17",
                "xlink:href": "#drg-1"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "drg-4",
                cx: "166.82",
                cy: "21.3",
                r: "5.17",
                "xlink:href": "#drg-1"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "drg-5",
                cx: "62.32",
                cy: "47.3",
                r: "5.17",
                "xlink:href": "#drg-1"
              }
            }),
            _c(
              "radialGradient",
              {
                attrs: {
                  id: "drg-6",
                  cx: "58.82",
                  cy: "206.3",
                  r: "5.17",
                  gradientUnits: "userSpaceOnUse"
                }
              },
              [
                _c("stop", { attrs: { offset: "0", "stop-color": "#41a38e" } }),
                _c("stop", { attrs: { offset: "1", "stop-color": "#21bca5" } })
              ],
              1
            ),
            _c("radialGradient", {
              attrs: {
                id: "drg-7",
                cx: "167.32",
                cy: "235.3",
                r: "5.17",
                "xlink:href": "#drg-6"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "drg-8",
                cx: "203.32",
                cy: "164.3",
                r: "5.17",
                "xlink:href": "#drg-6"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "drg-9",
                cx: "251.32",
                cy: "123.3",
                r: "5.17",
                "xlink:href": "#drg-6"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "drg-10",
                cx: "192.82",
                cy: "92.8",
                r: "5.17",
                "xlink:href": "#drg-6"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "drg-11",
                cx: "183.82",
                cy: "52.8",
                r: "5.17",
                "xlink:href": "#drg-6"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "drg-12",
                cx: "137.82",
                cy: "34.8",
                r: "5.17",
                "xlink:href": "#drg-6"
              }
            }),
            _c(
              "radialGradient",
              {
                attrs: {
                  id: "drg-13",
                  cx: "196.82",
                  cy: "206.3",
                  r: "5.17",
                  gradientUnits: "userSpaceOnUse"
                }
              },
              [
                _c("stop", { attrs: { offset: "0", "stop-color": "#ec991c" } }),
                _c("stop", { attrs: { offset: "1", "stop-color": "#e9b213" } })
              ],
              1
            ),
            _c("radialGradient", {
              attrs: {
                id: "drg-14",
                cx: "112.82",
                cy: "210.8",
                r: "5.17",
                "xlink:href": "#drg-13"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "drg-15",
                cx: "31.82",
                cy: "206.8",
                r: "5.17",
                "xlink:href": "#drg-13"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "drg-16",
                cx: "4.32",
                cy: "143.3",
                r: "5.17",
                "xlink:href": "#drg-13"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "drg-17",
                cx: "107.82",
                cy: "46.8",
                r: "5.17",
                "xlink:href": "#drg-13"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "drg-18",
                cx: "165.32",
                cy: "64.8",
                r: "5.17",
                "xlink:href": "#drg-13"
              }
            })
          ],
          1
        ),
        _c("g", { attrs: { id: "sparkle" } }, [
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "13.5", cy: "107", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "6.5", cy: "92", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "18.5", cy: "87.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "27", cy: "94.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "35.5", cy: "99.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "22", cy: "124", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "22", cy: "134", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "32", cy: "129", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "42.5", cy: "114", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "52", cy: "129", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "53", cy: "139", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "28.5", cy: "163.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "41.5", cy: "168", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "22.5", cy: "175", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "37.5", cy: "181.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "46", cy: "176.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "60.5", cy: "179.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "63.5", cy: "166.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "69.5", cy: "174.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "67.5", cy: "187", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "92.5", cy: "192.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "82", cy: "221", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "101", cy: "217", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "101.5", cy: "207", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "121", cy: "200.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "131", cy: "210.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "140.5", cy: "199", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "150.5", cy: "217", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "159.5", cy: "192.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "178.5", cy: "216", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "187", cy: "210.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "184.5", cy: "186.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "182.5", cy: "174", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "200", cy: "184.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "206.5", cy: "207", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "208.5", cy: "189.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "213", cy: "199.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "222", cy: "205", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "219.5", cy: "192", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "210.5", cy: "167.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "197", cy: "171.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "188", cy: "166.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "223", cy: "163.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "229", cy: "174.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "238", cy: "179.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "241.5", cy: "170.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "226.5", cy: "154", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "217", cy: "148.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "208", cy: "143.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "209.5", cy: "134", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "199.5", cy: "129", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "229.5", cy: "124", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "240", cy: "126.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "218", cy: "109", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "207", cy: "104.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "236", cy: "97", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "245", cy: "92", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "203.5", cy: "95", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "208", cy: "81", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "194", cy: "77.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "185.5", cy: "82.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "187.5", cy: "70", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "198", cy: "109.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "193", cy: "192", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "167.5", cy: "187.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "169.5", cy: "210", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "32.5", cy: "192", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "45.5", cy: "207", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "66", cy: "199", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "75", cy: "193.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "74", cy: "205", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "10", cy: "170.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "172.5", cy: "57", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "164", cy: "51.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "164.5", cy: "41", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "145.5", cy: "55", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "145.5", cy: "34.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "165", cy: "30", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "174", cy: "23", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "183", cy: "28", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "200.5", cy: "27.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "208", cy: "33.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "155.5", cy: "27", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "174.5", cy: "12.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "145.5", cy: "14", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "145.5", cy: "24.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "115.5", cy: "43", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "115.5", cy: "33", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "125.5", cy: "22.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "125.5", cy: "2.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "145.5", cy: "4", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "96", cy: "27", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "86.5", cy: "41", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "97", cy: "58.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "78.5", cy: "57", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "69.5", cy: "51", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "62", cy: "57.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "53", cy: "52", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "80", cy: "68.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "63.5", cy: "70", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "55", cy: "64.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "66", cy: "82.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "52", cy: "86", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "48", cy: "95", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-8",
            attrs: { cx: "56.5", cy: "100", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "53.5", cy: "109.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "35", cy: "76", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-8",
            attrs: { cx: "27", cy: "69.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "13.5", cy: "73.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "32.5", cy: "61", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "23.5", cy: "56", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "77.5", cy: "34.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "77.5", cy: "23", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "68.5", cy: "28", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "68", cy: "17", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "86.5", cy: "19.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "135.5", cy: "43", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "191", cy: "45.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "205.5", cy: "59.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "183", cy: "39.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "87.5", cy: "212", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "69", cy: "225", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "51.5", cy: "225.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "44", cy: "219.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "87", cy: "233.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "106.5", cy: "228.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "136.5", cy: "220", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "126.5", cy: "230.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "174.5", cy: "230", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "184", cy: "236", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "46.5", cy: "193.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "69", cy: "213.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-9",
            attrs: { cx: "55", cy: "148.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-10",
            attrs: { cx: "168.5", cy: "199", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-11",
            attrs: { cx: "233", cy: "87.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-12",
            attrs: { cx: "165", cy: "19.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-13",
            attrs: { cx: "60.5", cy: "45.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-14",
            attrs: { cx: "57", cy: "204.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-15",
            attrs: { cx: "165.5", cy: "233.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-16",
            attrs: { cx: "201.5", cy: "162.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-17",
            attrs: { cx: "249.5", cy: "121.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-18",
            attrs: { cx: "191", cy: "91", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-19",
            attrs: { cx: "182", cy: "51", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-20",
            attrs: { cx: "136", cy: "33", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-21",
            attrs: { cx: "195", cy: "204.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-22",
            attrs: { cx: "111", cy: "209", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-23",
            attrs: { cx: "30", cy: "205", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-24",
            attrs: { cx: "2.5", cy: "141.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-25",
            attrs: { cx: "106", cy: "45", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-26",
            attrs: { cx: "163.5", cy: "63", r: "2.5" }
          })
        ])
      ]
    ),
    _c(
      "svg",
      {
        staticClass: "mobile",
        attrs: {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 375 84",
          width: "100%",
          height: "100%"
        }
      },
      [
        _c(
          "defs",
          [
            _c(
              "radialGradient",
              {
                attrs: {
                  id: "radial-gradient",
                  cx: "24.32",
                  cy: "15.3",
                  r: "5.17",
                  gradientUnits: "userSpaceOnUse"
                }
              },
              [
                _c("stop", { attrs: { offset: "0", "stop-color": "#ec991c" } }),
                _c("stop", { attrs: { offset: "1", "stop-color": "#e9b213" } })
              ],
              1
            ),
            _c("radialGradient", {
              attrs: {
                id: "mrg-2",
                cx: "354.82",
                cy: "10.3",
                r: "5.17",
                "xlink:href": "#radial-gradient"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "mrg-3",
                cx: "148.82",
                cy: "22.8",
                r: "5.17",
                "xlink:href": "#radial-gradient"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "mrg-4",
                cx: "290.32",
                cy: "14.3",
                r: "5.17",
                "xlink:href": "#radial-gradient"
              }
            }),
            _c(
              "radialGradient",
              {
                attrs: {
                  id: "mrg-5",
                  cx: "63.32",
                  cy: "12.8",
                  r: "5.17",
                  gradientUnits: "userSpaceOnUse"
                }
              },
              [
                _c("stop", { attrs: { offset: "0", "stop-color": "#41a38e" } }),
                _c("stop", { attrs: { offset: "1", "stop-color": "#21bca5" } })
              ],
              1
            ),
            _c("radialGradient", {
              attrs: {
                id: "mrg-6",
                cx: "207.82",
                cy: "27.8",
                r: "5.17",
                "xlink:href": "#mrg-5"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "mrg-7",
                cx: "335.82",
                cy: "16.3",
                r: "5.17",
                "xlink:href": "#mrg-5"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "mrg-8",
                cx: "363.32",
                cy: "51.3",
                r: "5.17",
                "xlink:href": "#mrg-5"
              }
            }),
            _c(
              "radialGradient",
              {
                attrs: {
                  id: "mrg-9",
                  cx: "124.32",
                  cy: "15.3",
                  r: "5.17",
                  gradientUnits: "userSpaceOnUse"
                }
              },
              [
                _c("stop", { attrs: { offset: "0", "stop-color": "#265dd7" } }),
                _c("stop", { attrs: { offset: "1", "stop-color": "#0582ca" } })
              ],
              1
            ),
            _c("radialGradient", {
              attrs: {
                id: "mrg-10",
                cx: "29.82",
                cy: "52.3",
                r: "5.17",
                "xlink:href": "#mrg-9"
              }
            }),
            _c("radialGradient", {
              attrs: {
                id: "mrg-11",
                cx: "255.32",
                cy: "21.8",
                r: "5.17",
                "xlink:href": "#mrg-9"
              }
            })
          ],
          1
        ),
        _c("g", { attrs: { id: "sparkle" } }, [
          _c("circle", {
            staticClass: "cls-1",
            attrs: { cx: "10.5", cy: "39", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "8.5", cy: "27.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-1",
            attrs: { cx: "25", cy: "26", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-3",
            attrs: { cx: "22.5", cy: "13.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "36.5", cy: "8.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-1",
            attrs: { cx: "53.5", cy: "20", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "65", cy: "40", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "92", cy: "18", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "75", cy: "22.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-1",
            attrs: { cx: "84.5", cy: "12", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "109.5", cy: "17.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "127.5", cy: "26", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "141.5", cy: "10", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "167", cy: "23", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "177", cy: "12.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "191", cy: "10", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "215", cy: "22.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "218.93", cy: "8.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "236.5", cy: "27", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "249.5", cy: "10", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "264.5", cy: "26", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "278.5", cy: "23", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "299.5", cy: "13", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "303", cy: "22", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-1",
            attrs: { cx: "320", cy: "8.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "324", cy: "20.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "346.5", cy: "19.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "341", cy: "28.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-6",
            attrs: { cx: "353", cy: "8.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-2",
            attrs: { cx: "364.5", cy: "25.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-1",
            attrs: { cx: "366.5", cy: "41", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "354", cy: "43.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "349", cy: "52", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "366.5", cy: "64", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "355.5", cy: "81.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "19", cy: "45", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "26.5", cy: "38.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "33.5", cy: "31.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "35.5", cy: "44", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "8.5", cy: "61.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-4",
            attrs: { cx: "20", cy: "68", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-5",
            attrs: { cx: "8.5", cy: "73", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-7",
            attrs: { cx: "147", cy: "21", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-8",
            attrs: { cx: "288.5", cy: "12.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-9",
            attrs: { cx: "61.5", cy: "11", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-10",
            attrs: { cx: "206", cy: "26", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-11",
            attrs: { cx: "334", cy: "14.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-12",
            attrs: { cx: "361.5", cy: "49.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-13",
            attrs: { cx: "122.5", cy: "13.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-14",
            attrs: { cx: "28", cy: "50.5", r: "2.5" }
          }),
          _c("circle", {
            staticClass: "cls-15",
            attrs: { cx: "253.5", cy: "20", r: "2.5" }
          })
        ])
      ]
    ),
    _c(
      "div",
      { staticClass: "icon nq-blue-bg desktop" },
      [_c("CashlinkIcon")],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CircleSpinner.vue?vue&type=template&id=6275caa9&scoped=true&functional=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CircleSpinner.vue?vue&type=template&id=6275caa9&scoped=true&functional=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function(_h, _vm) {
  var _c = _vm._c
  return _c(
    "svg",
    {
      staticClass: "circle-spinner",
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 18 18",
        width: "18",
        height: "18",
        fill: "none",
        "stroke-width": "2",
        "stroke-linecap": "round"
      }
    },
    [
      _c("path", { attrs: { stroke: "#0582CA", d: "M9,1c4.42,0,8,3.58,8,8" } }),
      _c("path", {
        attrs: {
          stroke: "#1F2348",
          opacity: ".3",
          d:
            "M4.27,2.56C2.29,4.01,1,6.35,1,9c0,4.42,3.58,8,8,8c2.65,0,4.99-1.29,6.44-3.27"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "status-screen",
      class: {
        "nq-blue-bg": _vm.showLoadingBackground && !_vm.lightBlue,
        "nq-light-blue-bg": _vm.showLoadingBackground && _vm.lightBlue,
        "exit-transition": _vm.state === "success",
        small: _vm.small
      }
    },
    [
      _c("transition", { attrs: { name: "fade-loading" } }, [
        _vm.state === "loading"
          ? _c("div", { staticClass: "wrapper" }, [
              _c("h1", { staticClass: "title nq-h1" }, [
                _vm._v(_vm._s(_vm.loadingTitle))
              ]),
              _c(
                "div",
                { staticClass: "icon-row" },
                [_vm._t("loading", [_c("LoadingSpinner")])],
                2
              ),
              _c(
                "div",
                {
                  staticClass: "status-row",
                  class: { transition: _vm.isTransitioningStatus }
                },
                [
                  _c("div", { staticClass: "status current nq-h2" }, [
                    _vm._v(_vm._s(_vm.currentStatus))
                  ]),
                  _c("div", { staticClass: "status next nq-h2" }, [
                    _vm._v(_vm._s(_vm.nextStatus))
                  ])
                ]
              )
            ])
          : _vm._e()
      ]),
      _c("transition", { attrs: { name: "fade-result" } }, [
        _vm.state === "success"
          ? _c("div", { staticClass: "wrapper success nq-green-bg" }, [
              _c("div", { staticClass: "spacer" }),
              _c(
                "div",
                { staticClass: "icon-row" },
                [
                  _vm._t("success", [
                    _c("CheckmarkIcon"),
                    _c("h1", { staticClass: "title nq-h1" }, [
                      _vm._v(_vm._s(_vm.title))
                    ])
                  ])
                ],
                2
              ),
              _c("div", { staticClass: "spacer" })
            ])
          : _vm._e()
      ]),
      _c("transition", { attrs: { name: "fade-result" } }, [
        _vm.state === "warning"
          ? _c("div", { staticClass: "wrapper warning nq-orange-bg" }, [
              _c("div", {
                staticClass: "spacer",
                class: {
                  "with-main-action": !!_vm.mainAction,
                  "with-alternative-action": !!_vm.alternativeAction
                }
              }),
              _c(
                "div",
                { staticClass: "icon-row" },
                [
                  _vm._t("warning", [
                    _c("FaceNeutralIcon"),
                    _c("h1", { staticClass: "title nq-h1" }, [
                      _vm._v(_vm._s(_vm.title))
                    ]),
                    _vm.message
                      ? _c("p", { staticClass: "message nq-text" }, [
                          _vm._v(_vm._s(_vm.message))
                        ])
                      : _vm._e()
                  ])
                ],
                2
              ),
              _c("div", { staticClass: "action-row" }, [
                _vm.mainAction
                  ? _c(
                      "button",
                      {
                        staticClass: "nq-button orange inverse",
                        on: { click: _vm.onMainAction }
                      },
                      [_vm._v(_vm._s(_vm.mainAction))]
                    )
                  : _vm._e(),
                _vm.alternativeAction
                  ? _c(
                      "a",
                      {
                        staticClass: "alternative-action nq-link",
                        attrs: { href: "javascript:void(0)" },
                        on: { click: _vm.onAlternativeAction }
                      },
                      [_vm._v(_vm._s(_vm.alternativeAction))]
                    )
                  : _vm._e()
              ])
            ])
          : _vm._e()
      ]),
      _c("transition", { attrs: { name: "fade-result" } }, [
        _vm.state === "error"
          ? _c("div", { staticClass: "wrapper error nq-red-bg" }, [
              _c("div", {
                staticClass: "spacer",
                class: {
                  "with-main-action": !!_vm.mainAction,
                  "with-alternative-action": !!_vm.alternativeAction
                }
              }),
              _c(
                "div",
                { staticClass: "icon-row" },
                [
                  _vm._t("error", [
                    _c("FaceSadIcon"),
                    _c("h1", { staticClass: "title nq-h1" }, [
                      _vm._v(_vm._s(_vm.title))
                    ]),
                    _vm.message
                      ? _c("p", { staticClass: "message nq-text" }, [
                          _vm._v(_vm._s(_vm.message))
                        ])
                      : _vm._e()
                  ])
                ],
                2
              ),
              _c("div", { staticClass: "action-row" }, [
                _vm.mainAction
                  ? _c(
                      "button",
                      {
                        staticClass: "main-action nq-button red inverse",
                        on: { click: _vm.onMainAction }
                      },
                      [_vm._v(_vm._s(_vm.mainAction))]
                    )
                  : _vm._e(),
                _vm.alternativeAction
                  ? _c(
                      "a",
                      {
                        staticClass: "alternative-action nq-link",
                        attrs: { href: "javascript:void(0)" },
                        on: { click: _vm.onAlternativeAction }
                      },
                      [_vm._v(_vm._s(_vm.alternativeAction))]
                    )
                  : _vm._e()
              ])
            ])
          : _vm._e()
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkReceive.vue?vue&type=template&id=8209dba8&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CashlinkReceive.vue?vue&type=template&id=8209dba8&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "container pad-bottom",
      class: { themed: _vm.themeBackground, "dark-theme": _vm.isDarkTheme }
    },
    [
      _vm.themeBackground && !_vm.isMobile
        ? _c("img", {
            staticClass: "theme-background theme-background-desktop",
            class: _vm.themeBackground,
            attrs: {
              src: "/img/cashlink-themes/" + _vm.themeBackground + ".svg"
            },
            on: {
              load: function($event) {
                $event.target.style.opacity = 1
              }
            }
          })
        : _vm._e(),
      _vm.cashlink || _vm.statusState
        ? _c(
            "SmallPage",
            [
              _c(
                "transition",
                { attrs: { name: "transition-fade" } },
                [
                  _vm.statusState
                    ? _c("StatusScreen", {
                        attrs: {
                          state: _vm.statusState,
                          title: _vm.statusTitle,
                          status: _vm.statusStatus,
                          message: _vm.statusMessage,
                          mainAction: _vm.$t('131')
                        },
                        on: { "main-action": _vm.redirectToWallet }
                      })
                    : _vm._e()
                ],
                1
              ),
              _vm.cashlink && _vm.hasWallets
                ? _c(
                    "div",
                    {
                      staticClass: "card-content has-account",
                      class: {
                        "account-selector-shown": !!_vm.isAccountSelectorOpened
                      }
                    },
                    [
                      _c("PageHeader", { staticClass: "blur-target" }, [
                        _vm._v(_vm._s(_vm.$t('273')))
                      ]),
                      _c("PageBody", [
                        _c(
                          "div",
                          {
                            staticClass: "accounts",
                            class: { "single-address": _vm.addressCount === 1 }
                          },
                          [
                            _c("Account", {
                              staticClass: "cashlink-account blur-target",
                              attrs: {
                                layout: "column",
                                displayAsCashlink: true,
                                label: "Cashlink"
                              }
                            }),
                            _c("ArrowRightIcon", {
                              staticClass: "arrow-right blur-target"
                            }),
                            _vm.addressCount > 1
                              ? _c(
                                  "div",
                                  {
                                    staticClass: "recipient-button blur-target"
                                  },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass: "nq-button-s",
                                        on: {
                                          click: function($event) {
                                            _vm.isAccountSelectorOpened = true
                                          }
                                        }
                                      },
                                      [_vm._v(_vm._s(_vm.$t('60')))]
                                    ),
                                    _c("Account", {
                                      attrs: {
                                        layout: "column",
                                        address:
                                          _vm.activeAccount.userFriendlyAddress,
                                        label: _vm.activeAccount.label
                                      }
                                    })
                                  ],
                                  1
                                )
                              : _c("Account", {
                                  attrs: {
                                    layout: "column",
                                    address:
                                      _vm.activeAccount.userFriendlyAddress,
                                    label: _vm.activeAccount.label
                                  }
                                })
                          ],
                          1
                        ),
                        _c("hr", { staticClass: "blur-target" }),
                        _c(
                          "div",
                          [
                            _c("Amount", {
                              staticClass: "value nq-light-blue blur-target",
                              attrs: {
                                amount: _vm.cashlink.value,
                                minDecimals: 0,
                                maxDecimals: 5
                              }
                            }),
                            _vm.cashlink.message
                              ? _c(
                                  "div",
                                  { staticClass: "data nq-text blur-target" },
                                  [
                                    _vm._v(
                                      " " + _vm._s(_vm.cashlink.message) + " "
                                    )
                                  ]
                                )
                              : _vm._e()
                          ],
                          1
                        ),
                        _c("div")
                      ]),
                      _c("PageFooter", [
                        _c(
                          "button",
                          {
                            staticClass: "nq-button light-blue blur-target",
                            attrs: { disabled: !_vm.canCashlinkBeClaimed },
                            on: { click: _vm.claim }
                          },
                          [
                            _vm.isButtonLoading
                              ? _c("CircleSpinner")
                              : _vm._e(),
                            _vm._v(_vm._s(_vm.buttonText))
                          ],
                          1
                        )
                      ]),
                      _c("transition", { attrs: { name: "transition-fade" } }, [
                        _vm.isAccountSelectorOpened
                          ? _c(
                              "div",
                              { staticClass: "overlay" },
                              [
                                _c("CloseButton", {
                                  staticClass: "top-right",
                                  on: {
                                    click: function($event) {
                                      _vm.isAccountSelectorOpened = false
                                    }
                                  }
                                }),
                                _c("PageHeader", [
                                  _vm._v(_vm._s(_vm.$t('64')))
                                ]),
                                _c("AccountSelector", {
                                  attrs: {
                                    wallets: _vm.processedWallets,
                                    disableContracts: true
                                  },
                                  on: {
                                    "account-selected": _vm.accountSelected,
                                    login: function($event) {
                                      return _vm.callHub("login")
                                    }
                                  }
                                })
                              ],
                              1
                            )
                          : _vm._e()
                      ])
                    ],
                    1
                  )
                : _vm._e(),
              _vm.cashlink && !_vm.hasWallets
                ? _c(
                    "div",
                    { staticClass: "card-content no-account" },
                    [
                      _c("div", { staticClass: "top-spacer" }),
                      _c("CashlinkSparkle"),
                      _c(
                        "div",
                        [
                          _c("Amount", {
                            staticClass: "value nq-light-blue",
                            attrs: {
                              amount: _vm.cashlink.value,
                              minDecimals: 0,
                              maxDecimals: 5
                            }
                          }),
                          _vm.cashlink.message
                            ? _c("div", { staticClass: "data nq-text" }, [
                                _vm._v(" " + _vm._s(_vm.cashlink.message) + " ")
                              ])
                            : _vm._e()
                        ],
                        1
                      ),
                      _c("PageFooter", [
                        _c(
                          "button",
                          {
                            staticClass: "nq-button light-blue",
                            on: {
                              click: function($event) {
                                return _vm.callHub("signup")
                              }
                            }
                          },
                          [_vm._v(_vm._s(_vm.$t('101')))]
                        ),
                        _c(
                          "a",
                          {
                            staticClass: "nq-link skip",
                            attrs: { href: "javascript:void(0)" },
                            on: {
                              click: function($event) {
                                return _vm.callHub("onboard")
                              }
                            }
                          },
                          [
                            _vm._v(
                              " " +
                                _vm._s(_vm.$t('153')) +
                                " "
                            ),
                            _c("CaretRightSmallIcon")
                          ],
                          1
                        )
                      ])
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
        : _vm._e(),
      (_vm.cashlink && !_vm.hasWallets) || _vm.isMobile
        ? _c("div", { staticClass: "outside-container" }, [
            _vm.themeBackground && _vm.isMobile
              ? _c("img", {
                  staticClass: "theme-background theme-background-mobile",
                  class: _vm.themeBackground,
                  attrs: {
                    src:
                      "/img/cashlink-themes/" +
                      _vm.themeBackground +
                      (_vm.hasMobileTheme ? "-mobile" : "") +
                      ".svg"
                  },
                  on: {
                    load: function($event) {
                      $event.target.style.opacity = 1
                    }
                  }
                })
              : _vm._e(),
            _vm.cashlink && !_vm.hasWallets
              ? _c("div", { staticClass: "welcome-text" }, [
                  _c("h1", { staticClass: "nq-h1" }, [
                    _vm._v(_vm._s(_vm.welcomeHeadline))
                  ]),
                  _c("p", { staticClass: "nq-text" }, [
                    _vm._v(
                      " " +
                        _vm._s(_vm.welcomeText) +
                        " " +
                        _vm._s(
                          _vm.$t('103')
                        ) +
                        " "
                    ),
                    _c("span", { staticClass: "secondary-text" }, [
                      _vm._v(
                        _vm._s(
                          _vm.$t(
                            '5'
                          )
                        )
                      )
                    ])
                  ])
                ])
              : _vm._e()
          ])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/CashlinkApp.vue?vue&type=style&index=0&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/CashlinkApp.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\nheader .nq-button-s {\n    line-height: 3.375rem;\n}\nheader {\n    -webkit-transition: color .3s var(--nimiq-ease);\n    transition: color .3s var(--nimiq-ease);\n}\n.dark-theme header {\n    color: white;\n}\n#app > .container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: 100%;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n#app > .container.pad-bottom {\n    margin-bottom: 9.5rem; /* Same height as the header (2 * 3rem + 3.5rem) */\n}\n.transition-fade-enter,\n.transition-fade-leave-to {\n    opacity: 0;\n}\n\n/* Mobile Layout */\n@media (max-width: 450px) {\n#app > .container {\n        margin-bottom: 0 !important;\n        -webkit-box-pack: end;\n            -ms-flex-pack: end;\n                justify-content: flex-end;\n}\n.nq-card {\n        margin: 0;\n        border-bottom-left-radius: 0;\n        border-bottom-right-radius: 0;\n}\n}\n@media (max-width: 374px) {\n.logo-subtitle {\n        display: none;\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CashlinkSparkle.vue?vue&type=style&index=0&id=e97607ae&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CashlinkSparkle.vue?vue&type=style&index=0&id=e97607ae&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.cashlink-sparkle[data-v-e97607ae] {\n    position: relative;\n    width: 31.5rem; /* 252px */\n    height: 30rem; /* 240px */\n}\n.icon[data-v-e97607ae] {\n    position: absolute;\n    left: 7.875rem;\n    top: 7.75rem;\n    width: 16rem;\n    height: 16rem;\n    border-radius: 8rem;\n}\n.icon svg[data-v-e97607ae] {\n    width: 100%;\n    height: 100%;\n}\n.desktop .cls-2[data-v-e97607ae],\n.desktop .cls-3[data-v-e97607ae],\n.desktop .cls-4[data-v-e97607ae],\n.desktop .cls-5[data-v-e97607ae],\n.desktop .cls-6[data-v-e97607ae],\n.desktop .cls-7[data-v-e97607ae]  { fill: var(--nimiq-blue);\n}\n.desktop .cls-2[data-v-e97607ae]  { opacity: 0.12;\n}\n.desktop .cls-3[data-v-e97607ae]  { opacity: 0.1;\n}\n.desktop .cls-4[data-v-e97607ae]  { opacity: 0.14;\n}\n.desktop .cls-5[data-v-e97607ae]  { opacity: 0.16;\n}\n.desktop .cls-6[data-v-e97607ae]  { opacity: 0.18;\n}\n.desktop .cls-7[data-v-e97607ae]  { opacity: 0.2;\n}\n.desktop .cls-8[data-v-e97607ae]  { fill: var(--nimiq-green);\n}\n.desktop .cls-9[data-v-e97607ae]  { fill: url(#drg-1);\n}\n.desktop .cls-10[data-v-e97607ae] { fill: url(#drg-2);\n}\n.desktop .cls-11[data-v-e97607ae] { fill: url(#drg-3);\n}\n.desktop .cls-12[data-v-e97607ae] { fill: url(#drg-4);\n}\n.desktop .cls-13[data-v-e97607ae] { fill: url(#drg-5);\n}\n.desktop .cls-14[data-v-e97607ae] { fill: url(#drg-6);\n}\n.desktop .cls-15[data-v-e97607ae] { fill: url(#drg-7);\n}\n.desktop .cls-16[data-v-e97607ae] { fill: url(#drg-8);\n}\n.desktop .cls-17[data-v-e97607ae] { fill: url(#drg-9);\n}\n.desktop .cls-18[data-v-e97607ae] { fill: url(#drg-10);\n}\n.desktop .cls-19[data-v-e97607ae] { fill: url(#drg-11);\n}\n.desktop .cls-20[data-v-e97607ae] { fill: url(#drg-12);\n}\n.desktop .cls-21[data-v-e97607ae] { fill: url(#drg-13);\n}\n.desktop .cls-22[data-v-e97607ae] { fill: url(#drg-14);\n}\n.desktop .cls-23[data-v-e97607ae] { fill: url(#drg-15);\n}\n.desktop .cls-24[data-v-e97607ae] { fill: url(#drg-16);\n}\n.desktop .cls-25[data-v-e97607ae] { fill: url(#drg-17);\n}\n.desktop .cls-26[data-v-e97607ae] { fill: url(#drg-18);\n}\n.mobile .cls-1[data-v-e97607ae],\n.mobile .cls-2[data-v-e97607ae],\n.mobile .cls-4[data-v-e97607ae],\n.mobile .cls-5[data-v-e97607ae] { fill: var(--nimiq-blue);\n}\n.mobile .cls-1[data-v-e97607ae] { opacity : 0.14;\n}\n.mobile .cls-2[data-v-e97607ae] { opacity : 0.18;\n}\n.mobile .cls-3[data-v-e97607ae] { fill : url(#radial-gradient);\n}\n.mobile .cls-4[data-v-e97607ae] { opacity : 0.1;\n}\n.mobile .cls-5[data-v-e97607ae] { opacity : 0.12;\n}\n.mobile .cls-6[data-v-e97607ae] { fill : url(#mrg-2);\n}\n.mobile .cls-7[data-v-e97607ae] { fill : url(#mrg-3);\n}\n.mobile .cls-8[data-v-e97607ae] { fill : url(#mrg-4);\n}\n.mobile .cls-9[data-v-e97607ae] { fill : url(#mrg-5);\n}\n.mobile .cls-10[data-v-e97607ae]{ fill : url(#mrg-6);\n}\n.mobile .cls-11[data-v-e97607ae]{ fill : url(#mrg-7);\n}\n.mobile .cls-12[data-v-e97607ae]{ fill : url(#mrg-8);\n}\n.mobile .cls-13[data-v-e97607ae]{ fill : url(#mrg-9);\n}\n.mobile .cls-14[data-v-e97607ae]{ fill : url(#mrg-10);\n}\n.mobile .cls-15[data-v-e97607ae]{ fill : url(#mrg-11);\n}\n@media (min-width: 700px) {\n.mobile[data-v-e97607ae] {\n        display: none;\n}\n}\n@media (max-width: 699px) {\n.desktop[data-v-e97607ae] {\n        display: none;\n}\n.cashlink-sparkle[data-v-e97607ae] {\n        width: 100%;\n        height: auto;\n        margin-bottom: -10%;\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CircleSpinner.vue?vue&type=style&index=0&id=6275caa9&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CircleSpinner.vue?vue&type=style&index=0&id=6275caa9&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.circle-spinner[data-v-6275caa9] {\n    -webkit-animation: circle-spinner-spin-data-v-6275caa9 1s linear infinite;\n            animation: circle-spinner-spin-data-v-6275caa9 1s linear infinite;\n}\n@-webkit-keyframes circle-spinner-spin-data-v-6275caa9 {\nfrom { -webkit-transform: rotate(0deg); transform: rotate(0deg);\n}\nto   { -webkit-transform: rotate(360deg); transform: rotate(360deg);\n}\n}\n@keyframes circle-spinner-spin-data-v-6275caa9 {\nfrom { -webkit-transform: rotate(0deg); transform: rotate(0deg);\n}\nto   { -webkit-transform: rotate(360deg); transform: rotate(360deg);\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.status-screen[data-v-5e2db7a4] {\n    --status-screen-margin: .75rem;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    border-radius: 0.625rem;\n    width: calc(100% - 2 * var(--status-screen-margin));\n    height: calc(100% - 2 * var(--status-screen-margin));\n    margin: var(--status-screen-margin);\n    z-index: 1000;\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n.wrapper[data-v-5e2db7a4] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    border-radius: 0.625rem;\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n}\n.icon-row[data-v-5e2db7a4],\n.status-row[data-v-5e2db7a4],\n.action-row[data-v-5e2db7a4] {\n    width: 100%;\n    text-align: center;\n}\n.success .icon-row[data-v-5e2db7a4] {\n    margin-top: 2rem;\n}\n.status-row[data-v-5e2db7a4] {\n    --status-font-size: 2.5rem;\n    margin-top: 2rem; /* Same as title margin-bottom, to equalize spacing to center icon */\n    margin-bottom: 5rem;\n    height: var(--status-font-size); /* 1 line of status text. For multiple lines, the text overflows to the top */\n    position: relative;\n}\n.status-screen.small .status-row[data-v-5e2db7a4] {\n    margin-bottom: 2.5rem;\n}\n.status[data-v-5e2db7a4] {\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    margin: 0;\n    padding: 0 2rem;\n    font-size: var(--status-font-size);\n    font-weight: normal;\n    line-height: 1.2;\n    opacity: 1;\n}\n.status-screen.small .status[data-v-5e2db7a4] {\n    /* on small layout center multiple lines vertically instead of overflowing to the top */\n    -webkit-transform: translateY(calc(50% - var(--status-font-size) / 2));\n            transform: translateY(calc(50% - var(--status-font-size) / 2));\n}\n.status-row.transition .status[data-v-5e2db7a4] {\n    -webkit-transition: opacity 500ms, -webkit-transform 500ms;\n    transition: opacity 500ms, -webkit-transform 500ms;\n    transition: transform 500ms, opacity 500ms;\n    transition: transform 500ms, opacity 500ms, -webkit-transform 500ms;\n}\n.status-row.transition .status.current[data-v-5e2db7a4] {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%);\n    opacity: 0;\n}\n.status-screen.small .status-row.transition .status.current[data-v-5e2db7a4] {\n    /* on small layout move message less to avoid that it flies over half the screen */\n    -webkit-transform: translateY(calc(-1 * var(--status-font-size)));\n            transform: translateY(calc(-1 * var(--status-font-size)));\n}\n.status-row:not(.transition) .status.next[data-v-5e2db7a4] {\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%);\n    opacity: 0;\n}\n.spacer[data-v-5e2db7a4] {\n    padding-top: 2rem;\n}\n.success .spacer[data-v-5e2db7a4] {\n    padding-top: 6rem;\n}\n.spacer.with-main-action[data-v-5e2db7a4] {\n    padding-bottom: 8rem;\n}\n.spacer.with-alternative-action[data-v-5e2db7a4] {\n    margin-bottom: 2rem;\n}\n.action-row[data-v-5e2db7a4] {\n    padding-bottom: 2rem;\n}\n.action-row .nq-link[data-v-5e2db7a4] {\n    color: white;\n    font-size: 2rem;\n}\n\n/* FADE transitions */\n.fade-loading-leave-active[data-v-5e2db7a4],\n.fade-result-leave-active[data-v-5e2db7a4] {\n    -webkit-transition: opacity 300ms;\n    transition: opacity 300ms;\n}\n.fade-loading-enter-active[data-v-5e2db7a4],\n.fade-result-enter-active[data-v-5e2db7a4] {\n    -webkit-transition: opacity 700ms 300ms;\n    transition: opacity 700ms 300ms;\n}\n.fade-loading-enter[data-v-5e2db7a4],\n.fade-loading-leave-to[data-v-5e2db7a4],\n.fade-result-enter[data-v-5e2db7a4],\n.fade-result-leave-to[data-v-5e2db7a4] {\n    opacity: 0;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.status-screen .title {\n    line-height: 1;\n    margin-top: 4rem;\n    white-space: pre-line;\n}\n.status-screen.small .title {\n    margin-top: 3rem;\n    margin-bottom: 2rem;\n    font-size: 2.5rem;\n}\n.status-screen .icon-row .nq-icon {\n    margin: auto;\n}\n.status-screen .success .nq-icon {\n    font-size: 9rem;\n}\n.status-screen .warning .nq-icon {\n    font-size: 10rem;\n}\n.status-screen .error .nq-icon {\n    font-size: 12rem;\n}\n.status-screen .icon-row .title,\n.status-screen .icon-row .message {\n    margin-left: auto;\n    margin-right: auto;\n}\n.status-screen .icon-row .title {\n    max-width: 80%;\n    line-height: 1.4;\n}\n.status-screen .message {\n    max-width: 70%;\n    opacity: 1;\n}\n.status-screen.exit-transition {\n    /* animation: exit-transition 600ms 1s; */\n}\n@-webkit-keyframes exit-transition {\nfrom { -webkit-transform: scale(1); transform: scale(1); opacity: 1;\n}\n80%  { opacity: 0;\n}\nto   { -webkit-transform: scale(0); transform: scale(0); opacity: 0;\n}\n}\n@keyframes exit-transition {\nfrom { -webkit-transform: scale(1); transform: scale(1); opacity: 1;\n}\n80%  { opacity: 0;\n}\nto   { -webkit-transform: scale(0); transform: scale(0); opacity: 0;\n}\n}\n.status-screen.exit-transition .success .icon-row {\n    -webkit-animation: success-title-slide 1s;\n            animation: success-title-slide 1s;\n}\n@-webkit-keyframes success-title-slide {\nfrom { -webkit-transform: translateY(8rem); transform: translateY(8rem);\n}\nto   { -webkit-transform: translateY(0); transform: translateY(0);\n}\n}\n@keyframes success-title-slide {\nfrom { -webkit-transform: translateY(8rem); transform: translateY(8rem);\n}\nto   { -webkit-transform: translateY(0); transform: translateY(0);\n}\n}\n\n/* Optional entry animation that components can apply on the status-screen */\n.status-screen.grow-from-bottom-button {\n    position: absolute;\n    -webkit-animation: status-screen-grow-from-bottom-button .6s forwards cubic-bezier(0.25, 0, 0, 1);\n            animation: status-screen-grow-from-bottom-button .6s forwards cubic-bezier(0.25, 0, 0, 1);\n    overflow: hidden;\n}\n@-webkit-keyframes status-screen-grow-from-bottom-button {\n0%,\n    20% {\n        max-width: calc(100% - 12rem);\n        max-height: 7.5rem;\n        bottom: calc(4.25rem - var(--status-screen-margin));\n        left: calc(6rem - var(--status-screen-margin));\n        border-radius: 4rem;\n}\n0% {\n        opacity: 0;\n}\n25% {\n        opacity: 1;\n}\n100% {\n        max-width: calc(100% - 2 * var(--status-screen-margin));\n        max-height: calc(100% - 2 * var(--status-screen-margin));\n        bottom: 0;\n        left: 0;\n        border-radius: 0.5rem;\n}\n}\n@keyframes status-screen-grow-from-bottom-button {\n0%,\n    20% {\n        max-width: calc(100% - 12rem);\n        max-height: 7.5rem;\n        bottom: calc(4.25rem - var(--status-screen-margin));\n        left: calc(6rem - var(--status-screen-margin));\n        border-radius: 4rem;\n}\n0% {\n        opacity: 0;\n}\n25% {\n        opacity: 1;\n}\n100% {\n        max-width: calc(100% - 2 * var(--status-screen-margin));\n        max-height: calc(100% - 2 * var(--status-screen-margin));\n        bottom: 0;\n        left: 0;\n        border-radius: 0.5rem;\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkReceive.vue?vue&type=style&index=0&id=8209dba8&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CashlinkReceive.vue?vue&type=style&index=0&id=8209dba8&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.container[data-v-8209dba8] {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important;\n    padding: 0 5rem; /* Side padding for smaller screens */\n}\n.theme-background[data-v-8209dba8] {\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    -o-object-fit: cover;\n       object-fit: cover;\n    -webkit-transition: opacity 1s var(--nimiq-ease);\n    transition: opacity 1s var(--nimiq-ease);\n    opacity: 0;\n    z-index: -1; /* put behind header */\n}\n.theme-background-desktop[data-v-8209dba8] {\n    position: fixed;\n}\n.theme-background-mobile[data-v-8209dba8] {\n    position: absolute;\n    top: -7.5rem; /* header height */\n    height: calc(100% + 7.5rem + 1rem); /* + header height + SmallPage border radius */\n}\n.theme-background.generic[data-v-8209dba8] {\n    -o-object-position: center bottom;\n       object-position: center bottom;\n}\n.theme-background.christmas[data-v-8209dba8],\n.theme-background.lunar-new-year[data-v-8209dba8] {\n    -o-object-position: right bottom;\n       object-position: right bottom;\n}\n.theme-background.easter[data-v-8209dba8] {\n    -o-object-position: center 60%;\n       object-position: center 60%;\n}\n.theme-background.birthday[data-v-8209dba8] {\n    -o-object-position: 70% bottom;\n       object-position: 70% bottom;\n}\n.card-content[data-v-8209dba8] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n.card-content.no-account[data-v-8209dba8] {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.outside-container[data-v-8209dba8] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    position: relative;\n}\n.welcome-text[data-v-8209dba8] {\n    max-width: 514px;\n    margin-left: 8.75rem; /* nq-card already has 1.25rem margin */\n}\n.dark-theme .welcome-text[data-v-8209dba8] {\n    color: white;\n}\n.welcome-text .nq-h1[data-v-8209dba8] {\n    font-size: 8rem;\n    margin-top: 0;\n    margin-bottom: 4rem;\n}\n.welcome-text .nq-text[data-v-8209dba8] {\n    font-size: 4rem;\n    color: inherit;\n}\n.welcome-text .secondary-text[data-v-8209dba8] {\n    color: rgba(31, 35, 72, 0.5);\n}\n.dark-theme .welcome-text .secondary-text[data-v-8209dba8] {\n    color: rgba(255, 255, 255, .65);\n}\n.small-page[data-v-8209dba8] {\n    position: relative;\n    overflow: hidden; /* avoid overflow of blurred elements */\n    -webkit-transition: opacity .8s;\n    transition: opacity .8s;\n}\n.page-header[data-v-8209dba8] {\n    padding: 0;\n    margin: 4rem; /* use margin instead of padding to reduce area on which to apply expensive blur */\n}\n.page-body[data-v-8209dba8] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    padding-bottom: 0;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.page-footer[data-v-8209dba8] {\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    text-align: center;\n}\n.accounts[data-v-8209dba8] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n}\n.cashlink-account[data-v-8209dba8] {\n    margin-top: 3rem;\n}\n.cashlink-account[data-v-8209dba8],\n.recipient-button[data-v-8209dba8] {\n    width: calc(50% - 1.5rem - 2.75rem); /* minus half arrow width */\n}\n.cashlink-icon[data-v-8209dba8] {\n    width: 8rem;\n    height: 8rem;\n    border-radius: 4rem;\n    margin: 0.5rem;\n    margin-bottom: 1.75rem; /* 1.25rem like the Identicon, + 0.5rem from own margin */\n}\n.cashlink-icon svg[data-v-8209dba8] {\n    width: 100%;\n    height: 100%;\n}\n.recipient-button .account[data-v-8209dba8] .identicon {\n    height: 9rem;\n}\n.cashlink-label[data-v-8209dba8] {\n    line-height: 1.5;\n}\n.accounts .arrow-right[data-v-8209dba8] {\n    font-size: 3rem;\n    margin: 8.125rem 2.75rem 0;\n    color: var(--nimiq-light-blue);\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.recipient-button[data-v-8209dba8] {\n    border: .25rem solid rgba(31, 35, 72, 0.1);\n    border-radius: 0.5rem;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    position: relative;\n    padding-top: 3rem;\n}\n.recipient-button button[data-v-8209dba8] {\n    position: absolute;\n    right: 0.75rem;\n    top: 0.75rem;\n    font-size: 1.5rem;\n    line-height: 2.75rem;\n    height: 2.75rem;\n    padding: 0 1.125rem;\n}\n.recipient-button .account[data-v-8209dba8] {\n    padding-left: 0;\n    padding-right: 0;\n}\n.accounts.single-address .cashlink-account[data-v-8209dba8] {\n    margin-top: 0;\n    width: calc(50% - 2rem);\n}\n.accounts.single-address .arrow-right[data-v-8209dba8] {\n    margin: 5.125rem 0 0 auto;\n}\nhr[data-v-8209dba8] {\n    width: 100%;\n    height: 1px;\n    margin: 2rem 0;\n    border: none;\n    background: #1F2348;\n    opacity: .1;\n}\n.value[data-v-8209dba8] {\n    display: block;\n    text-align: center;\n    font-size: 5rem;\n}\n.no-account .value[data-v-8209dba8] {\n    font-size: 8rem;\n}\n.value[data-v-8209dba8] .nim {\n    margin-left: -.25rem;\n    font-size: 0.45em;\n    font-weight: 700;\n}\n.data[data-v-8209dba8] {\n    margin: 0.5rem 0 0;\n    font-size: 2.5rem;\n    color: var(--nimiq-blue);\n    text-align: center;\n    max-height: 9.75rem; /* three lines */\n    overflow-wrap: break-word;\n}\n.no-account .data[data-v-8209dba8] {\n    margin-top: 1rem;\n}\n.nq-button[data-v-8209dba8] .circle-spinner {\n    margin-right: 1.5rem;\n    margin-bottom: -0.375rem;\n}\n.skip[data-v-8209dba8] {\n    font-size: 1.75rem;\n    font-weight: 600;\n    line-height: 2;\n    color: inherit;\n    margin: -1.5rem auto 1rem;\n    padding: 0 2rem;\n    opacity: 0.7;\n    -webkit-transition: opacity .3s var(--nimiq-ease);\n    transition: opacity .3s var(--nimiq-ease);\n}\n.skip .nq-icon[data-v-8209dba8]  {\n    height: 1.125rem;\n    width: 1.125rem;\n    -webkit-transition: -webkit-transform .3s var(--nimiq-ease);\n    transition: -webkit-transform .3s var(--nimiq-ease);\n    transition: transform .3s var(--nimiq-ease);\n    transition: transform .3s var(--nimiq-ease), -webkit-transform .3s var(--nimiq-ease);\n    vertical-align: middle;\n}\n.skip[data-v-8209dba8]:hover,\n.skip[data-v-8209dba8]:focus {\n    outline: none;\n    opacity: 1;\n    text-decoration: none;\n}\n.skip:hover .nq-icon[data-v-8209dba8],\n.skip:focus .nq-icon[data-v-8209dba8] {\n    -webkit-transform: translate3D(-0.25rem, 0, 0);\n            transform: translate3D(-0.25rem, 0, 0);\n}\n.status-screen[data-v-8209dba8] {\n    position: absolute;\n    -webkit-transition: opacity .4s;\n    transition: opacity .4s;\n    z-index: 2;\n}\n.overlay[data-v-8209dba8] {\n    position: absolute;\n    top: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    width: 100%;\n    height: 100%;\n    -webkit-transition: opacity .4s;\n    transition: opacity .4s;\n    background: rgba(255, 255, 255, .875); /* equivalent to keyguard: .5 on blurred and .75 on account details */\n}\n.account-selector[data-v-8209dba8] {\n    margin-top: -3rem;\n}\n.account-selector[data-v-8209dba8] .amount {\n    display: none !important;\n}\n.blur-target[data-v-8209dba8] {\n    -webkit-transition: -webkit-filter .4s;\n    transition: -webkit-filter .4s;\n    transition: filter .4s;\n    transition: filter .4s, -webkit-filter .4s;\n}\n.account-selector-shown .blur-target[data-v-8209dba8] {\n    -webkit-filter: blur(20px);\n            filter: blur(20px);\n}\n.account-selector-shown .page-footer[data-v-8209dba8] {\n    -webkit-filter: blur(35px);\n            filter: blur(35px);\n}\n@media (max-width: 939px) {\n.container[data-v-8209dba8] {\n        padding: 0 4rem;\n}\n.welcome-text[data-v-8209dba8] {\n        margin-left: 5.75rem;\n}\n.welcome-text .nq-h1[data-v-8209dba8] {\n        font-size: 5.5rem;\n        margin-bottom: 3rem;\n}\n.welcome-text .nq-text[data-v-8209dba8] {\n        font-size: 3rem;\n}\n}\n@media (max-width: 799px) {\n.container[data-v-8209dba8] {\n        padding: 0 2.5rem;\n}\n.welcome-text[data-v-8209dba8] {\n        margin-left: 3.75rem;\n}\n.welcome-text .nq-h1[data-v-8209dba8] {\n        font-size: 4rem;\n        margin-bottom: 1.75rem;\n}\n.welcome-text .nq-text[data-v-8209dba8] {\n        margin-top: 1.75rem;\n        font-size: 2.5rem;\n}\n}\n@media (max-width: 699px) {\n.container[data-v-8209dba8] {\n        -webkit-box-orient: vertical !important;\n        -webkit-box-direction: reverse !important;\n            -ms-flex-direction: column-reverse !important;\n                flex-direction: column-reverse !important;\n        padding: 0;\n}\n.small-page[data-v-8209dba8] {\n        height: auto !important;\n}\n.top-spacer[data-v-8209dba8] {\n        display: none;\n}\n.no-account .value[data-v-8209dba8] {\n        font-size: 6rem;\n}\n.no-account .data[data-v-8209dba8] {\n        font-size: 2rem;\n}\n.welcome-text[data-v-8209dba8] {\n        max-width: 420px;\n        text-align: center;\n        margin: 3rem 0 4rem;\n        padding: 0 2rem;\n}\n}\n@media (max-width: 450px) {\n.welcome-text[data-v-8209dba8] {\n        font-weight: 600;\n}\n.welcome-text .nq-h1[data-v-8209dba8] {\n        font-size: 3.5rem;\n}\n.welcome-text .nq-text[data-v-8209dba8] {\n        font-size: 1.875rem;\n        line-height: 1.4;\n}\n.themed .outside-container[data-v-8209dba8] {\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n}\n.container:not(.themed) .small-page[data-v-8209dba8] {\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n}\n.theme-background.easter[data-v-8209dba8] {\n        -o-object-position: 60% center;\n           object-position: 60% center;\n}\n.small-page[data-v-8209dba8] {\n        max-width: unset !important;\n}\n.account-selector-shown .blur-target[data-v-8209dba8] {\n        -webkit-filter: blur(10px);\n                filter: blur(10px);\n}\n.account-selector-shown .page-footer[data-v-8209dba8] {\n        -webkit-filter: blur(25px);\n                filter: blur(25px);\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/CashlinkApp.vue?vue&type=style&index=0&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/CashlinkApp.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./CashlinkApp.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/CashlinkApp.vue?vue&type=style&index=0&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("1d13dc0b", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CashlinkSparkle.vue?vue&type=style&index=0&id=e97607ae&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CashlinkSparkle.vue?vue&type=style&index=0&id=e97607ae&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkSparkle.vue?vue&type=style&index=0&id=e97607ae&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CashlinkSparkle.vue?vue&type=style&index=0&id=e97607ae&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("50f7653e", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CircleSpinner.vue?vue&type=style&index=0&id=6275caa9&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CircleSpinner.vue?vue&type=style&index=0&id=6275caa9&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CircleSpinner.vue?vue&type=style&index=0&id=6275caa9&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CircleSpinner.vue?vue&type=style&index=0&id=6275caa9&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("ffafa568", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("00195264", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./StatusScreen.vue?vue&type=style&index=1&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("75340254", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkReceive.vue?vue&type=style&index=0&id=8209dba8&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CashlinkReceive.vue?vue&type=style&index=0&id=8209dba8&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkReceive.vue?vue&type=style&index=0&id=8209dba8&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkReceive.vue?vue&type=style&index=0&id=8209dba8&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("5aca5004", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/CashlinkApp.vue":
/*!*****************************!*\
  !*** ./src/CashlinkApp.vue ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CashlinkApp_vue_vue_type_template_id_18ef23cb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CashlinkApp.vue?vue&type=template&id=18ef23cb& */ "./src/CashlinkApp.vue?vue&type=template&id=18ef23cb&");
/* harmony import */ var _CashlinkApp_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CashlinkApp.vue?vue&type=script&lang=ts& */ "./src/CashlinkApp.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _CashlinkApp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CashlinkApp.vue?vue&type=style&index=0&lang=css& */ "./src/CashlinkApp.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CashlinkApp_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CashlinkApp_vue_vue_type_template_id_18ef23cb___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CashlinkApp_vue_vue_type_template_id_18ef23cb___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/CashlinkApp.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/CashlinkApp.vue?vue&type=script&lang=ts&":
/*!******************************************************!*\
  !*** ./src/CashlinkApp.vue?vue&type=script&lang=ts& ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkApp_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/ts-loader??ref--12-1!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./CashlinkApp.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/CashlinkApp.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkApp_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/CashlinkApp.vue?vue&type=style&index=0&lang=css&":
/*!**************************************************************!*\
  !*** ./src/CashlinkApp.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkApp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader??ref--6-oneOf-1-0!../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./CashlinkApp.vue?vue&type=style&index=0&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/CashlinkApp.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkApp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkApp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkApp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkApp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkApp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/CashlinkApp.vue?vue&type=template&id=18ef23cb&":
/*!************************************************************!*\
  !*** ./src/CashlinkApp.vue?vue&type=template&id=18ef23cb& ***!
  \************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkApp_vue_vue_type_template_id_18ef23cb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./CashlinkApp.vue?vue&type=template&id=18ef23cb& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/CashlinkApp.vue?vue&type=template&id=18ef23cb&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkApp_vue_vue_type_template_id_18ef23cb___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkApp_vue_vue_type_template_id_18ef23cb___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/cashlink.ts":
/*!*************************!*\
  !*** ./src/cashlink.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CashlinkApp_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CashlinkApp.vue */ "./src/CashlinkApp.vue");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ "./src/store.ts");
/* harmony import */ var _lib_Sentry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/Sentry */ "./src/lib/Sentry.ts");
/* harmony import */ var _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./i18n/i18n-setup */ "./src/i18n/i18n-setup.ts");







if (window.hasBrowserWarning) {
    throw new Error('Execution aborted due to browser warning');
}
if ((_nimiq_utils__WEBPACK_IMPORTED_MODULE_1__["BrowserDetection"].isIOS() || _nimiq_utils__WEBPACK_IMPORTED_MODULE_1__["BrowserDetection"].isSafari()) && 'serviceWorker' in navigator) {
    // Register service worker to strip cookie from requests
    navigator.serviceWorker.register('/ServiceWorker.js', {
        scope: '/',
    }).then((reg) => {
        console.debug(`Service worker has been registered for scope: ${reg.scope}`);
    }).catch((error) => {
        console.error(`Service worker installation failed`);
        throw error;
    });
}
vue__WEBPACK_IMPORTED_MODULE_0__["default"].config.productionTip = false;
// Set asset path relative to the public path defined in vue.config.json,
// see https://cli.vuejs.org/guide/mode-and-env.html#using-env-variables-in-client-side-code
Object(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["setAssetPublicPath"])(`${"/"}js/`, `${"/"}img/`);
Object(_lib_Sentry__WEBPACK_IMPORTED_MODULE_5__["startSentry"])(vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
Object(_i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_6__["setLanguage"])(Object(_i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_6__["detectLanguage"])()).then(() => {
    const app = new vue__WEBPACK_IMPORTED_MODULE_0__["default"]({
        store: _store__WEBPACK_IMPORTED_MODULE_4__["default"],
        i18n: _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_6__["i18n"],
        render: (h) => h(_CashlinkApp_vue__WEBPACK_IMPORTED_MODULE_3__["default"]),
    }).$mount('#app');
});


/***/ }),

/***/ "./src/components/CashlinkSparkle.vue":
/*!********************************************!*\
  !*** ./src/components/CashlinkSparkle.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CashlinkSparkle_vue_vue_type_template_id_e97607ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CashlinkSparkle.vue?vue&type=template&id=e97607ae&scoped=true& */ "./src/components/CashlinkSparkle.vue?vue&type=template&id=e97607ae&scoped=true&");
/* harmony import */ var _CashlinkSparkle_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CashlinkSparkle.vue?vue&type=script&lang=ts& */ "./src/components/CashlinkSparkle.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _CashlinkSparkle_vue_vue_type_style_index_0_id_e97607ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CashlinkSparkle.vue?vue&type=style&index=0&id=e97607ae&scoped=true&lang=css& */ "./src/components/CashlinkSparkle.vue?vue&type=style&index=0&id=e97607ae&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CashlinkSparkle_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CashlinkSparkle_vue_vue_type_template_id_e97607ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CashlinkSparkle_vue_vue_type_template_id_e97607ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "e97607ae",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CashlinkSparkle.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/CashlinkSparkle.vue?vue&type=script&lang=ts&":
/*!*********************************************************************!*\
  !*** ./src/components/CashlinkSparkle.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkSparkle_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkSparkle.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CashlinkSparkle.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkSparkle_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/CashlinkSparkle.vue?vue&type=style&index=0&id=e97607ae&scoped=true&lang=css&":
/*!*****************************************************************************************************!*\
  !*** ./src/components/CashlinkSparkle.vue?vue&type=style&index=0&id=e97607ae&scoped=true&lang=css& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkSparkle_vue_vue_type_style_index_0_id_e97607ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkSparkle.vue?vue&type=style&index=0&id=e97607ae&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CashlinkSparkle.vue?vue&type=style&index=0&id=e97607ae&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkSparkle_vue_vue_type_style_index_0_id_e97607ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkSparkle_vue_vue_type_style_index_0_id_e97607ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkSparkle_vue_vue_type_style_index_0_id_e97607ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkSparkle_vue_vue_type_style_index_0_id_e97607ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkSparkle_vue_vue_type_style_index_0_id_e97607ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/CashlinkSparkle.vue?vue&type=template&id=e97607ae&scoped=true&":
/*!***************************************************************************************!*\
  !*** ./src/components/CashlinkSparkle.vue?vue&type=template&id=e97607ae&scoped=true& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkSparkle_vue_vue_type_template_id_e97607ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkSparkle.vue?vue&type=template&id=e97607ae&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CashlinkSparkle.vue?vue&type=template&id=e97607ae&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkSparkle_vue_vue_type_template_id_e97607ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkSparkle_vue_vue_type_template_id_e97607ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/CircleSpinner.vue":
/*!******************************************!*\
  !*** ./src/components/CircleSpinner.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CircleSpinner_vue_vue_type_template_id_6275caa9_scoped_true_functional_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CircleSpinner.vue?vue&type=template&id=6275caa9&scoped=true&functional=true& */ "./src/components/CircleSpinner.vue?vue&type=template&id=6275caa9&scoped=true&functional=true&");
/* harmony import */ var _CircleSpinner_vue_vue_type_style_index_0_id_6275caa9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CircleSpinner.vue?vue&type=style&index=0&id=6275caa9&scoped=true&lang=css& */ "./src/components/CircleSpinner.vue?vue&type=style&index=0&id=6275caa9&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}



/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  script,
  _CircleSpinner_vue_vue_type_template_id_6275caa9_scoped_true_functional_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CircleSpinner_vue_vue_type_template_id_6275caa9_scoped_true_functional_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  true,
  null,
  "6275caa9",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CircleSpinner.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/CircleSpinner.vue?vue&type=style&index=0&id=6275caa9&scoped=true&lang=css&":
/*!***************************************************************************************************!*\
  !*** ./src/components/CircleSpinner.vue?vue&type=style&index=0&id=6275caa9&scoped=true&lang=css& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CircleSpinner_vue_vue_type_style_index_0_id_6275caa9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CircleSpinner.vue?vue&type=style&index=0&id=6275caa9&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CircleSpinner.vue?vue&type=style&index=0&id=6275caa9&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CircleSpinner_vue_vue_type_style_index_0_id_6275caa9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CircleSpinner_vue_vue_type_style_index_0_id_6275caa9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CircleSpinner_vue_vue_type_style_index_0_id_6275caa9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CircleSpinner_vue_vue_type_style_index_0_id_6275caa9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CircleSpinner_vue_vue_type_style_index_0_id_6275caa9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/CircleSpinner.vue?vue&type=template&id=6275caa9&scoped=true&functional=true&":
/*!*****************************************************************************************************!*\
  !*** ./src/components/CircleSpinner.vue?vue&type=template&id=6275caa9&scoped=true&functional=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CircleSpinner_vue_vue_type_template_id_6275caa9_scoped_true_functional_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CircleSpinner.vue?vue&type=template&id=6275caa9&scoped=true&functional=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CircleSpinner.vue?vue&type=template&id=6275caa9&scoped=true&functional=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CircleSpinner_vue_vue_type_template_id_6275caa9_scoped_true_functional_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CircleSpinner_vue_vue_type_template_id_6275caa9_scoped_true_functional_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/StatusScreen.vue":
/*!*****************************************!*\
  !*** ./src/components/StatusScreen.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StatusScreen_vue_vue_type_template_id_5e2db7a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true& */ "./src/components/StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true&");
/* harmony import */ var _StatusScreen_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StatusScreen.vue?vue&type=script&lang=ts& */ "./src/components/StatusScreen.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css& */ "./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css&");
/* harmony import */ var _StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StatusScreen.vue?vue&type=style&index=1&lang=css& */ "./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _StatusScreen_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StatusScreen_vue_vue_type_template_id_5e2db7a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StatusScreen_vue_vue_type_template_id_5e2db7a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5e2db7a4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/StatusScreen.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/StatusScreen.vue?vue&type=script&lang=ts&":
/*!******************************************************************!*\
  !*** ./src/components/StatusScreen.vue?vue&type=script&lang=ts& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./StatusScreen.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css&":
/*!**************************************************************************************************!*\
  !*** ./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css&":
/*!**************************************************************************!*\
  !*** ./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css& ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./StatusScreen.vue?vue&type=style&index=1&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true&":
/*!************************************************************************************!*\
  !*** ./src/components/StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_template_id_5e2db7a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_template_id_5e2db7a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_template_id_5e2db7a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/views/CashlinkReceive.vue":
/*!***************************************!*\
  !*** ./src/views/CashlinkReceive.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CashlinkReceive_vue_vue_type_template_id_8209dba8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CashlinkReceive.vue?vue&type=template&id=8209dba8&scoped=true& */ "./src/views/CashlinkReceive.vue?vue&type=template&id=8209dba8&scoped=true&");
/* harmony import */ var _CashlinkReceive_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CashlinkReceive.vue?vue&type=script&lang=ts& */ "./src/views/CashlinkReceive.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _CashlinkReceive_vue_vue_type_style_index_0_id_8209dba8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CashlinkReceive.vue?vue&type=style&index=0&id=8209dba8&scoped=true&lang=css& */ "./src/views/CashlinkReceive.vue?vue&type=style&index=0&id=8209dba8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CashlinkReceive_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CashlinkReceive_vue_vue_type_template_id_8209dba8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CashlinkReceive_vue_vue_type_template_id_8209dba8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "8209dba8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/CashlinkReceive.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/CashlinkReceive.vue?vue&type=script&lang=ts&":
/*!****************************************************************!*\
  !*** ./src/views/CashlinkReceive.vue?vue&type=script&lang=ts& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkReceive_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkReceive.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkReceive.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkReceive_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/CashlinkReceive.vue?vue&type=style&index=0&id=8209dba8&scoped=true&lang=css&":
/*!************************************************************************************************!*\
  !*** ./src/views/CashlinkReceive.vue?vue&type=style&index=0&id=8209dba8&scoped=true&lang=css& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkReceive_vue_vue_type_style_index_0_id_8209dba8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkReceive.vue?vue&type=style&index=0&id=8209dba8&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkReceive.vue?vue&type=style&index=0&id=8209dba8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkReceive_vue_vue_type_style_index_0_id_8209dba8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkReceive_vue_vue_type_style_index_0_id_8209dba8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkReceive_vue_vue_type_style_index_0_id_8209dba8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkReceive_vue_vue_type_style_index_0_id_8209dba8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkReceive_vue_vue_type_style_index_0_id_8209dba8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/CashlinkReceive.vue?vue&type=template&id=8209dba8&scoped=true&":
/*!**********************************************************************************!*\
  !*** ./src/views/CashlinkReceive.vue?vue&type=template&id=8209dba8&scoped=true& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkReceive_vue_vue_type_template_id_8209dba8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkReceive.vue?vue&type=template&id=8209dba8&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkReceive.vue?vue&type=template&id=8209dba8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkReceive_vue_vue_type_template_id_8209dba8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkReceive_vue_vue_type_template_id_8209dba8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 2:
/*!*******************************!*\
  !*** multi ./src/cashlink.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/iesiyok/projects/acc-js/development/nimiq2/hub/src/cashlink.ts */"./src/cashlink.ts");


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
//# sourceMappingURL=cashlink-app.js.map