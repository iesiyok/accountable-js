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
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e":"activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e","activate-btc-ledger~add-ledger~refund-swap-ledger~sign-btc-transaction-ledger~sign-transaction-ledge~bf179231":"activate-btc-ledger~add-ledger~refund-swap-ledger~sign-btc-transaction-ledger~sign-transaction-ledge~bf179231","activate-btc-ledger":"activate-btc-ledger","add-account~add-ledger~rename":"add-account~add-ledger~rename","add-account~add-ledger":"add-account~add-ledger","add-ledger":"add-ledger","activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566":"activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566","activate-btc":"activate-btc","sign-btc-transaction-ledger":"sign-btc-transaction-ledger","choose-address":"choose-address","sign-btc-transaction":"sign-btc-transaction","add-account":"add-account","rename":"rename","add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7":"add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7","checkout~sign-transaction-ledger":"checkout~sign-transaction-ledger","sign-transaction-ledger":"sign-transaction-ledger","refund-swap-ledger~swap-ledger":"refund-swap-ledger~swap-ledger","refund-swap-ledger":"refund-swap-ledger","swap~swap-ledger":"swap~swap-ledger","swap-ledger":"swap-ledger","swap":"swap","add-vesting-contract":"add-vesting-contract","cashlink":"cashlink","checkout":"checkout","migrate":"migrate","common":"common","export":"export","logout":"logout","logout-ledger":"logout-ledger","onboarding":"onboarding","request-error":"request-error","sign-message":"sign-message","unsupported-ledger":"unsupported-ledger","sign-transaction":"sign-transaction","change-password":"change-password","cookie-decoder":"cookie-decoder","electrum-client":"electrum-client","lang-de-po":"lang-de-po","lang-en-po":"lang-en-po","lang-es-po":"lang-es-po","lang-fr-po":"lang-fr-po","lang-nl-po":"lang-nl-po","lang-ru-po":"lang-ru-po","lang-uk-po":"lang-uk-po","lang-zh-po":"lang-zh-po"}[chunkId]||chunkId) + "-legacy.js"
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
/******/ 	deferredModules.push([0,"chunk-vendors","chunk-common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=ts&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./router */ "./src/router.ts");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _nimiq_style_nimiq_style_min_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nimiq/style/nimiq-style.min.css */ "./node_modules/@nimiq/style/nimiq-style.min.css");
/* harmony import */ var _nimiq_style_nimiq_style_min_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nimiq_style_nimiq_style_min_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _nimiq_vue_components_dist_NimiqVueComponents_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nimiq/vue-components/dist/NimiqVueComponents.css */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.css");
/* harmony import */ var _nimiq_vue_components_dist_NimiqVueComponents_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components_dist_NimiqVueComponents_css__WEBPACK_IMPORTED_MODULE_6__);







let App = class App extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    async created() {
        await this.$store.dispatch('initWallets');
        this.$rpc.start();
    }
    get isLoaded() {
        return this.isRequestLoaded
            || this.$route.name === _router__WEBPACK_IMPORTED_MODULE_3__["REQUEST_ERROR"];
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vuex_class__WEBPACK_IMPORTED_MODULE_2__["State"])('isRequestLoaded')
], App.prototype, "isRequestLoaded", void 0);
App = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { LoadingSpinner: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_4__["LoadingSpinner"] } })
], App);
/* harmony default export */ __webpack_exports__["default"] = (App);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    { attrs: { id: "app" } },
    [
      _vm._m(0),
      !_vm.isLoaded || _vm.$root.loading
        ? _c("div", { staticClass: "loading" }, [_c("LoadingSpinner")], 1)
        : _c("router-view")
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("header", { staticClass: "logo" }, [
      _c("span", { staticClass: "nq-icon nimiq-logo" }),
      _c("span", { staticClass: "logo-wordmark" }, [_vm._v("Nimiq")]),
      _c("span", { staticClass: "logo-subtitle" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n#app > .container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: 100%;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n#app > .container.pad-bottom {\n    margin-bottom: 9.5rem; /* Same height as the header (2 * 3rem + 3.5rem) */\n}\n\n/* transition-fade */\n.transition-fade-enter,\n.transition-fade-leave-to {\n    opacity: 0;\n}\n\n/* transition-flip: Note that position: relative and a perspective needs to be applied to the parent */\n.transition-flip-enter-active,\n.transition-flip-leave-active {\n    --safari-rotate-fix: translateZ(1px);\n    -webkit-transition: -webkit-transform .6s;\n    transition: -webkit-transform .6s;\n    transition: transform .6s;\n    transition: transform .6s, -webkit-transform .6s;\n    -webkit-transform-style: preserve-3d;\n            transform-style: preserve-3d;\n    -webkit-backface-visibility: hidden;\n            backface-visibility: hidden;\n}\n.transition-flip-leave-active {\n    position: absolute !important;\n    top: 0;\n    left: 0;\n}\n.transition-flip-enter-to,\n.transition-flip-leave {\n    -webkit-transform: rotateY(0) var(--safari-rotate-fix);\n            transform: rotateY(0) var(--safari-rotate-fix);\n}\n.transition-flip-enter.flip-primary,\n.transition-flip-leave-to.flip-primary {\n    -webkit-transform: rotateY(-180deg) var(--safari-rotate-fix);\n            transform: rotateY(-180deg) var(--safari-rotate-fix);\n}\n.transition-flip-enter.flip-secondary,\n.transition-flip-leave-to.flip-secondary {\n    -webkit-transform: rotateY(180deg) var(--safari-rotate-fix);\n            transform: rotateY(180deg) var(--safari-rotate-fix);\n}\n.nq-button {\n    height: 6.5rem;\n}\n@media (max-width: 450px) {\n#app > .container {\n        margin-bottom: 0 !important;\n        -webkit-box-pack: end;\n            -ms-flex-pack: end;\n                justify-content: flex-end;\n}\n.nq-card {\n        margin: 0;\n        border-bottom-left-radius: 0;\n        border-bottom-right-radius: 0;\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("fa1ef42a", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ "./src/App.vue?vue&type=template&id=7ba5bd90&");
/* harmony import */ var _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=ts& */ "./src/App.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ "./src/App.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__["render"],
  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=ts&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=ts& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/ts-loader??ref--12-1!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/App.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************!*\
  !*** ./src/App.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader??ref--6-oneOf-1-0!../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/lib/RequestParser.ts":
/*!**********************************!*\
  !*** ./src/lib/RequestParser.ts ***!
  \**********************************/
/*! exports provided: RequestParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestParser", function() { return RequestParser; });
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helpers */ "./src/lib/Helpers.ts");
/* harmony import */ var _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _paymentOptions_NimiqPaymentOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./paymentOptions/NimiqPaymentOptions */ "./src/lib/paymentOptions/NimiqPaymentOptions.ts");
/* harmony import */ var _paymentOptions_EtherPaymentOptions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./paymentOptions/EtherPaymentOptions */ "./src/lib/paymentOptions/EtherPaymentOptions.ts");
/* harmony import */ var _paymentOptions_BitcoinPaymentOptions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./paymentOptions/BitcoinPaymentOptions */ "./src/lib/paymentOptions/BitcoinPaymentOptions.ts");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nimiq/fastspot-api */ "./node_modules/@nimiq/fastspot-api/dist/index.js");








class RequestParser {
    static parse(request, state, requestType) {
        if (!request.appName)
            throw new Error('appName is required');
        switch (requestType) {
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SIGN_TRANSACTION:
                const signTransactionRequest = request;
                if (!signTransactionRequest.value)
                    throw new Error('value is required');
                if (!signTransactionRequest.validityStartHeight)
                    throw new Error('validityStartHeight is required');
                return {
                    kind: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SIGN_TRANSACTION,
                    appName: signTransactionRequest.appName,
                    sender: Nimiq.Address.fromString(signTransactionRequest.sender),
                    recipient: Nimiq.Address.fromString(signTransactionRequest.recipient),
                    recipientType: signTransactionRequest.recipientType || Nimiq.Account.Type.BASIC,
                    recipientLabel: signTransactionRequest.recipientLabel,
                    value: signTransactionRequest.value,
                    fee: signTransactionRequest.fee || 0,
                    data: typeof signTransactionRequest.extraData === 'string'
                        ? _nimiq_utils__WEBPACK_IMPORTED_MODULE_5__["Utf8Tools"].stringToUtf8ByteArray(signTransactionRequest.extraData)
                        : signTransactionRequest.extraData || new Uint8Array(0),
                    flags: signTransactionRequest.flags || Nimiq.Transaction.Flag.NONE,
                    validityStartHeight: signTransactionRequest.validityStartHeight,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].CHECKOUT:
                const checkoutRequest = request;
                if (checkoutRequest.shopLogoUrl) {
                    let origin;
                    try {
                        origin = new URL(checkoutRequest.shopLogoUrl).origin;
                    }
                    catch (err) {
                        throw new Error(`shopLogoUrl must be a valid URL: ${err}`);
                    }
                    if (origin !== state.origin) {
                        throw new Error('shopLogoUrl must have same origin as caller website. Image at ' +
                            checkoutRequest.shopLogoUrl +
                            ' is not on caller origin ' +
                            state.origin);
                    }
                }
                const isPointOfSale = 'isPointOfSale' in checkoutRequest && !!checkoutRequest.isPointOfSale;
                let disableDisclaimer = !!checkoutRequest.disableDisclaimer;
                if (disableDisclaimer && !Object(_Helpers__WEBPACK_IMPORTED_MODULE_0__["includesOrigin"])(config__WEBPACK_IMPORTED_MODULE_6__["default"].privilegedOrigins, state.origin)) {
                    // warn and continue
                    console.warn(`Origin ${state.origin} is not authorized to request disableDisclaimer.`);
                    disableDisclaimer = false;
                }
                if (!checkoutRequest.version || checkoutRequest.version === 1) {
                    if (typeof checkoutRequest.value !== 'number' || checkoutRequest.value <= 0) {
                        throw new Error('value must be a number >0');
                    }
                    if (isPointOfSale) {
                        throw new Error('isPointOfSale is not supported for v1 checkout.');
                    }
                    return {
                        kind: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].CHECKOUT,
                        version: 1,
                        appName: checkoutRequest.appName,
                        shopLogoUrl: checkoutRequest.shopLogoUrl,
                        time: Date.now(),
                        paymentOptions: [new _paymentOptions_NimiqPaymentOptions__WEBPACK_IMPORTED_MODULE_2__["ParsedNimiqDirectPaymentOptions"]({
                                currency: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["Currency"].NIM,
                                type: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["PaymentType"].DIRECT,
                                amount: checkoutRequest.value.toString(),
                                expires: 0,
                                protocolSpecific: {
                                    extraData: checkoutRequest.extraData,
                                    recipient: checkoutRequest.recipient,
                                    recipientType: checkoutRequest.recipientType || Nimiq.Account.Type.BASIC,
                                    sender: checkoutRequest.sender,
                                    forceSender: !!checkoutRequest.forceSender,
                                    fee: checkoutRequest.fee || 0,
                                    flags: checkoutRequest.flags || Nimiq.Transaction.Flag.NONE,
                                    validityDuration: checkoutRequest.validityDuration,
                                },
                            })],
                        isPointOfSale,
                        disableDisclaimer,
                    };
                }
                if (checkoutRequest.version === 2) {
                    if ( // Check if the origin is allowed to make requests without a NIM payment option
                    !Object(_Helpers__WEBPACK_IMPORTED_MODULE_0__["includesOrigin"])(config__WEBPACK_IMPORTED_MODULE_6__["default"].checkoutWithoutNimOrigins, state.origin)
                        && !checkoutRequest.paymentOptions.some((option) => option.currency === _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["Currency"].NIM)) {
                        throw new Error('CheckoutRequest must provide a NIM paymentOption.');
                    }
                    if (!checkoutRequest.shopLogoUrl) {
                        throw new Error('shopLogoUrl: string is required'); // shop logo non optional in version 2
                    }
                    try {
                        // Test whether the browser is able to parse the currency as an ISO 4217 currency code,
                        // see https://www.ecma-international.org/ecma-402/1.0/#sec-6.3.1
                        (0).toLocaleString('en-US', {
                            style: 'currency',
                            currency: checkoutRequest.fiatCurrency,
                        });
                    }
                    catch (e) {
                        throw new Error(`Failed to parse currency ${checkoutRequest.fiatCurrency}. Is it a valid ` +
                            'ISO 4217 currency code?');
                    }
                    if (!checkoutRequest.fiatAmount
                        || typeof checkoutRequest.fiatAmount !== 'number'
                        || checkoutRequest.fiatAmount <= 0) {
                        throw new Error('fiatAmount must be a positive non-zero number');
                    }
                    if (!checkoutRequest.callbackUrl || typeof checkoutRequest.callbackUrl !== 'string') {
                        if (checkoutRequest.paymentOptions.some((option) => option.currency !== _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["Currency"].NIM)) {
                            throw new Error('A callbackUrl: string is required for currencies other than NIM to ' +
                                'monitor payments.');
                        }
                        if (!checkoutRequest.paymentOptions.every((option) => !!option.protocolSpecific.recipient)) {
                            throw new Error('A callbackUrl: string or all recipients must be provided');
                        }
                    }
                    else {
                        let origin;
                        try {
                            origin = new URL(checkoutRequest.callbackUrl).origin;
                        }
                        catch (err) {
                            throw new Error(`callbackUrl must be a valid URL: ${err}`);
                        }
                        if (origin !== state.origin
                            // Whitelist https://vendor.cryptopayment.link when the request was coming from just
                            // https://cryptopayment.link
                            && !(state.origin === 'https://cryptopayment.link'
                                && origin === 'https://vendor.cryptopayment.link')) {
                            throw new Error('callbackUrl must have the same origin as caller Website. ' +
                                checkoutRequest.callbackUrl +
                                ' is not on caller origin ' +
                                state.origin);
                        }
                        if (!checkoutRequest.csrf || typeof checkoutRequest.csrf !== 'string') {
                            throw new Error('A CSRF token must be provided alongside the callbackUrl.');
                        }
                    }
                    if (checkoutRequest.time && typeof checkoutRequest.time !== 'number') {
                        throw new Error('time: number is required');
                    }
                    const currencies = new Set();
                    return {
                        kind: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].CHECKOUT,
                        version: 2,
                        appName: checkoutRequest.appName,
                        shopLogoUrl: checkoutRequest.shopLogoUrl,
                        callbackUrl: checkoutRequest.callbackUrl,
                        csrf: checkoutRequest.csrf,
                        time: !checkoutRequest.time
                            ? Date.now()
                            : Object(_Helpers__WEBPACK_IMPORTED_MODULE_0__["isMilliseconds"])(checkoutRequest.time)
                                ? checkoutRequest.time
                                : checkoutRequest.time * 1000,
                        fiatCurrency: checkoutRequest.fiatCurrency,
                        fiatAmount: checkoutRequest.fiatAmount,
                        paymentOptions: checkoutRequest.paymentOptions.map((option) => {
                            if (currencies.has(option.currency)) {
                                throw new Error('Only one paymentOption can be provided per cryptocurrency');
                            }
                            else {
                                currencies.add(option.currency);
                            }
                            switch (option.type) {
                                case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["PaymentType"].DIRECT:
                                    switch (option.currency) {
                                        case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["Currency"].NIM:
                                            // Once extraData from MultiCurrencyCheckoutRequest is removed
                                            // the next few lines become obsolete.
                                            if (!option.protocolSpecific.extraData && checkoutRequest.extraData) {
                                                console.warn('Usage of MultiCurrencyCheckoutRequest.extraData is'
                                                    + ' deprecated. Use NimiqDirectPaymentOptions.protocolSpecific'
                                                    + '.extraData instead');
                                                option.protocolSpecific.extraData = checkoutRequest.extraData;
                                            }
                                            return new _paymentOptions_NimiqPaymentOptions__WEBPACK_IMPORTED_MODULE_2__["ParsedNimiqDirectPaymentOptions"](option, { isPointOfSale });
                                        case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["Currency"].ETH:
                                            return new _paymentOptions_EtherPaymentOptions__WEBPACK_IMPORTED_MODULE_3__["ParsedEtherDirectPaymentOptions"](option);
                                        case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["Currency"].BTC:
                                            return new _paymentOptions_BitcoinPaymentOptions__WEBPACK_IMPORTED_MODULE_4__["ParsedBitcoinDirectPaymentOptions"](option);
                                        default:
                                            throw new Error(`Currency ${option.currency} not supported`);
                                    }
                                default:
                                    throw new Error(`PaymentType ${option.type} not supported`);
                            }
                        }),
                        isPointOfSale,
                        disableDisclaimer,
                    };
                }
                throw new Error('Invalid version: must be 1 or 2');
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].ONBOARD:
                const onboardRequest = request;
                return {
                    kind: requestType,
                    appName: onboardRequest.appName,
                    disableBack: !!onboardRequest.disableBack,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].CHOOSE_ADDRESS:
                const chooseAddressRequest = request;
                return {
                    kind: requestType,
                    appName: chooseAddressRequest.appName,
                    returnBtcAddress: !!chooseAddressRequest.returnBtcAddress,
                    minBalance: Number(chooseAddressRequest.minBalance) || 0,
                    disableContracts: !!chooseAddressRequest.disableContracts,
                    disableLegacyAccounts: !!chooseAddressRequest.disableLegacyAccounts,
                    disableBip39Accounts: !!chooseAddressRequest.disableBip39Accounts,
                    disableLedgerAccounts: !!chooseAddressRequest.disableLedgerAccounts,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SIGNUP:
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].LOGIN:
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].MIGRATE:
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].ADD_VESTING_CONTRACT:
                return {
                    kind: requestType,
                    appName: request.appName,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].CHANGE_PASSWORD:
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].LOGOUT:
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].ADD_ADDRESS:
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].ACTIVATE_BITCOIN:
                const simpleRequest = request;
                if (!simpleRequest.accountId)
                    throw new Error('accountId is required');
                return {
                    kind: requestType,
                    appName: simpleRequest.appName,
                    walletId: simpleRequest.accountId,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].EXPORT:
                const exportRequest = request;
                if (!exportRequest.accountId)
                    throw new Error('accountId is required');
                return {
                    kind: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].EXPORT,
                    appName: exportRequest.appName,
                    walletId: exportRequest.accountId,
                    fileOnly: exportRequest.fileOnly,
                    wordsOnly: exportRequest.wordsOnly,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].RENAME:
                const renameRequest = request;
                if (!renameRequest.accountId)
                    throw new Error('accountId is required');
                return {
                    kind: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].RENAME,
                    appName: renameRequest.appName,
                    walletId: renameRequest.accountId,
                    address: renameRequest.address,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SIGN_MESSAGE:
                const signMessageRequest = request;
                if (typeof signMessageRequest.message !== 'string'
                    && !(signMessageRequest.message instanceof Uint8Array)) {
                    throw new Error('message must be a string or Uint8Array');
                }
                return {
                    kind: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SIGN_MESSAGE,
                    appName: signMessageRequest.appName,
                    signer: signMessageRequest.signer
                        ? Nimiq.Address.fromString(signMessageRequest.signer)
                        : undefined,
                    message: signMessageRequest.message,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].CREATE_CASHLINK:
                const createCashlinkRequest = request;
                const senderAddress = 'senderAddress' in createCashlinkRequest && !!createCashlinkRequest.senderAddress
                    ? Nimiq.Address.fromString(createCashlinkRequest.senderAddress)
                    : undefined;
                const senderBalance = 'senderBalance' in createCashlinkRequest
                    ? createCashlinkRequest.senderBalance
                    : undefined;
                if (senderBalance !== undefined && !Nimiq.NumberUtils.isUint64(senderBalance)) {
                    throw new Error('Invalid Cashlink senderBalance');
                }
                const value = createCashlinkRequest.value;
                if (value !== undefined && (!Nimiq.NumberUtils.isUint64(value) || value === 0)) {
                    throw new Error('Malformed Cashlink value');
                }
                let message = 'message' in createCashlinkRequest ? createCashlinkRequest.message : undefined;
                if (message !== undefined) {
                    if (typeof message !== 'string') {
                        throw new Error('Cashlink message must be a string');
                    }
                    const { result: truncated, didTruncate } = _nimiq_utils__WEBPACK_IMPORTED_MODULE_5__["Utf8Tools"].truncateToUtf8ByteLength(message, 255);
                    if (!('autoTruncateMessage' in createCashlinkRequest && createCashlinkRequest.autoTruncateMessage)
                        && didTruncate) {
                        throw new Error('Cashlink message must be shorter than 256 bytes or autoTruncateMessage must '
                            + 'be enabled.');
                    }
                    message = truncated;
                }
                const theme = createCashlinkRequest.theme || _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["CashlinkTheme"].UNSPECIFIED;
                if (!Object.values(_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["CashlinkTheme"]).includes(theme) || !Nimiq.NumberUtils.isUint8(theme)) {
                    // Also checking whether theme is a valid Uint8 to catch ids that are potentially to high in the
                    // CashlinkTheme enum and to filter out values that are actually the enum keys that have been added
                    // by typescript for reverse mapping.
                    throw new Error('Invalid Cashlink theme');
                }
                const returnLink = !!createCashlinkRequest.returnLink;
                if (returnLink && !Object(_Helpers__WEBPACK_IMPORTED_MODULE_0__["includesOrigin"])(config__WEBPACK_IMPORTED_MODULE_6__["default"].privilegedOrigins, state.origin)) {
                    throw new Error(`Origin ${state.origin} is not authorized to request returnLink.`);
                }
                const skipSharing = !!createCashlinkRequest.returnLink && !!createCashlinkRequest.skipSharing;
                return {
                    kind: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].CREATE_CASHLINK,
                    appName: createCashlinkRequest.appName,
                    senderAddress,
                    senderBalance,
                    value,
                    message,
                    theme,
                    fiatCurrency: createCashlinkRequest.fiatCurrency,
                    returnLink,
                    skipSharing,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].MANAGE_CASHLINK:
                const manageCashlinkRequest = request;
                return {
                    kind: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].MANAGE_CASHLINK,
                    appName: manageCashlinkRequest.appName,
                    cashlinkAddress: Nimiq.Address.fromString(manageCashlinkRequest.cashlinkAddress),
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SIGN_BTC_TRANSACTION:
                const signBtcTransactionRequest = request;
                if (!signBtcTransactionRequest.accountId)
                    throw new Error('accountId is required');
                if (!signBtcTransactionRequest.inputs || !Array.isArray(signBtcTransactionRequest.inputs)
                    || !signBtcTransactionRequest.inputs.length)
                    throw new Error('inputs must be a non-empty array');
                const inputs = signBtcTransactionRequest.inputs.map((input) => {
                    if (!input || typeof input !== 'object')
                        throw new Error('input must be an object');
                    // tslint:disable-next-line:no-shadowed-variable
                    const { address, transactionHash, outputIndex, value, sequence } = input;
                    let { outputScript, witnessScript } = input;
                    if (typeof address !== 'string')
                        throw new Error('input must contain an address of type string');
                    if (typeof transactionHash !== 'string' || transactionHash.length !== 64) {
                        throw new Error('input must contain a valid transactionHash');
                    }
                    try {
                        Nimiq.BufferUtils.fromHex(transactionHash); // throws if invalid hex
                    }
                    catch (e) {
                        throw new Error('input transactionHash must be hex');
                    }
                    if (typeof outputIndex !== 'number' || outputIndex < 0) {
                        throw new Error('input must contain a valid outputIndex');
                    }
                    try {
                        // Convert to hex. Throws if invalid hex or base64.
                        outputScript = Nimiq.BufferUtils.toHex(Nimiq.BufferUtils.fromAny(outputScript));
                    }
                    catch (e) {
                        throw new Error('input outputScript must be hex or base64');
                    }
                    if (outputScript.length !== 44 // P2WPKH
                        && outputScript.length !== 46 // P2SH
                        && outputScript.length !== 50 // P2PKH
                        && outputScript.length !== 68 // HTLC
                    )
                        throw new Error('input outputScript has invalid length');
                    if (witnessScript !== undefined) {
                        if (typeof witnessScript !== 'string')
                            throw new Error('Invalid input witnessScript');
                        try {
                            // Convert to hex. Throws if invalid hex or base64.
                            witnessScript = Nimiq.BufferUtils.toHex(Nimiq.BufferUtils.fromAny(witnessScript));
                        }
                        catch (e) {
                            throw new Error('input witnessScript must be hex or base64');
                        }
                    }
                    if (typeof value !== 'number' || value <= 0)
                        throw new Error('input must contain a positive value');
                    if (sequence !== undefined && !Nimiq.NumberUtils.isUint32(sequence)) {
                        throw new Error('Invalid input sequence');
                    }
                    // return only checked properties
                    return { address, transactionHash, outputIndex, outputScript, value, witnessScript, sequence };
                });
                if (!signBtcTransactionRequest.output || typeof signBtcTransactionRequest.output !== 'object') {
                    throw new Error('output must be an object');
                }
                const output = signBtcTransactionRequest.output;
                if (!output.value || typeof output.value !== 'number' || output.value <= 0) {
                    throw new Error('output must contain a positive value');
                }
                if (output.label && typeof output.label !== 'string') {
                    throw new Error('output label must be a string');
                }
                let changeOutput;
                if (signBtcTransactionRequest.changeOutput) {
                    if (typeof signBtcTransactionRequest.changeOutput !== 'object') {
                        throw new Error('changeOutput must be an object');
                    }
                    changeOutput = signBtcTransactionRequest.changeOutput;
                    if (!changeOutput.value || typeof changeOutput.value !== 'number' || changeOutput.value <= 0) {
                        throw new Error('changeOutput must contain a positive value');
                    }
                }
                const locktime = signBtcTransactionRequest.locktime;
                if (locktime !== undefined && !Nimiq.NumberUtils.isUint32(locktime)) {
                    throw new Error('Invalid locktime');
                }
                const parsedSignBtcTransactionRequest = {
                    kind: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SIGN_BTC_TRANSACTION,
                    walletId: signBtcTransactionRequest.accountId,
                    appName: signBtcTransactionRequest.appName,
                    inputs,
                    output,
                    changeOutput,
                    locktime,
                };
                return parsedSignBtcTransactionRequest;
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SETUP_SWAP:
                const setupSwapRequest = request;
                if (!setupSwapRequest.accountId)
                    throw new Error('accountId is required');
                // Validate and parse only what we use in the Hub
                if (!['NIM', 'BTC', 'EUR'].includes(setupSwapRequest.fund.type)) {
                    throw new Error('Funding type is not supported');
                }
                if (!['NIM', 'BTC', 'EUR'].includes(setupSwapRequest.redeem.type)) {
                    throw new Error('Redeeming type is not supported');
                }
                if (setupSwapRequest.fund.type === setupSwapRequest.redeem.type) {
                    throw new Error('Cannot swap between the same types');
                }
                if (setupSwapRequest.layout === 'slider') {
                    if (!Array.isArray(setupSwapRequest.nimiqAddresses)) {
                        throw new Error('When using the "slider" layout, `nimAddresses` must be an array');
                    }
                    if (!setupSwapRequest.bitcoinAccount) {
                        throw new Error('When using the "slider" layout, `bitcoinAccount` must be provided');
                    }
                    const nimiqAddress = setupSwapRequest.fund.type === 'NIM'
                        ? Nimiq.Address.fromAny(setupSwapRequest.fund.sender)
                        : setupSwapRequest.redeem.type === 'NIM'
                            ? Nimiq.Address.fromAny(setupSwapRequest.redeem.recipient)
                            : '';
                    if (nimiqAddress && !setupSwapRequest.nimiqAddresses.some(({ address }) => Nimiq.Address.fromAny(address).equals(nimiqAddress))) {
                        throw new Error('The address details of the NIM address doing the swap must be provided');
                    }
                }
                if (setupSwapRequest.redeem.type === 'NIM') {
                    if (!setupSwapRequest.redeem.validityStartHeight
                        || setupSwapRequest.redeem.validityStartHeight < 1) {
                        throw new Error(`Invalid validity start height: ${setupSwapRequest.redeem.validityStartHeight}`);
                    }
                }
                if (setupSwapRequest.fund.type === 'NIM') {
                    if (!setupSwapRequest.fund.validityStartHeight
                        || setupSwapRequest.fund.validityStartHeight < 1) {
                        throw new Error(`Invalid validity start height: ${setupSwapRequest.fund.validityStartHeight}`);
                    }
                }
                const parsedSetupSwapRequest = {
                    kind: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SETUP_SWAP,
                    walletId: setupSwapRequest.accountId,
                    ...setupSwapRequest,
                    fund: setupSwapRequest.fund.type === 'NIM' ? {
                        ...setupSwapRequest.fund,
                        type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_7__["SwapAsset"][setupSwapRequest.fund.type],
                        sender: Nimiq.Address.fromAny(setupSwapRequest.fund.sender),
                    } : setupSwapRequest.fund.type === 'BTC' ? {
                        ...setupSwapRequest.fund,
                        type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_7__["SwapAsset"][setupSwapRequest.fund.type],
                    } : {
                        ...setupSwapRequest.fund,
                        type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_7__["SwapAsset"][setupSwapRequest.fund.type],
                    },
                    redeem: setupSwapRequest.redeem.type === 'NIM' ? {
                        ...setupSwapRequest.redeem,
                        type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_7__["SwapAsset"][setupSwapRequest.redeem.type],
                        recipient: Nimiq.Address.fromAny(setupSwapRequest.redeem.recipient),
                        extraData: typeof setupSwapRequest.redeem.extraData === 'string'
                            ? Nimiq.BufferUtils.fromAny(setupSwapRequest.redeem.extraData)
                            : setupSwapRequest.redeem.extraData,
                    } : setupSwapRequest.redeem.type === 'BTC' ? {
                        ...setupSwapRequest.redeem,
                        type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_7__["SwapAsset"][setupSwapRequest.redeem.type],
                    } : {
                        ...setupSwapRequest.redeem,
                        type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_7__["SwapAsset"][setupSwapRequest.redeem.type],
                    },
                    layout: setupSwapRequest.layout || 'standard',
                };
                return parsedSetupSwapRequest;
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].REFUND_SWAP:
                const refundSwapRequest = request;
                // Only basic parsing and validation. Refund transaction specific data will be validated by the Keyguard
                // or subsequent Ledger transaction signing requests.
                if (!['NIM', 'BTC'].includes(refundSwapRequest.refund.type)) {
                    throw new Error('Refunding object type must be "NIM" or "BTC"');
                }
                const parsedRefundSwapRequest = {
                    kind: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].REFUND_SWAP,
                    appName: refundSwapRequest.appName,
                    walletId: refundSwapRequest.accountId,
                    refund: refundSwapRequest.refund.type === 'NIM' ? {
                        ...refundSwapRequest.refund,
                        type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_7__["SwapAsset"][refundSwapRequest.refund.type],
                        sender: Nimiq.Address.fromAny(refundSwapRequest.refund.sender),
                        recipient: Nimiq.Address.fromAny(refundSwapRequest.refund.recipient),
                        extraData: typeof refundSwapRequest.refund.extraData === 'string'
                            ? Nimiq.BufferUtils.fromAny(refundSwapRequest.refund.extraData)
                            : refundSwapRequest.refund.extraData,
                    } : {
                        ...refundSwapRequest.refund,
                        type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_7__["SwapAsset"][refundSwapRequest.refund.type],
                    },
                };
                return parsedRefundSwapRequest;
            default:
                return null;
        }
    }
    static raw(request) {
        switch (request.kind) {
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SIGN_TRANSACTION:
                const signTransactionRequest = request;
                return {
                    appName: signTransactionRequest.appName,
                    sender: signTransactionRequest.sender instanceof Nimiq.Address
                        ? signTransactionRequest.sender.toUserFriendlyAddress()
                        // Note: additional sender information is lost and does not survive reloads, see RequestTypes.ts
                        : signTransactionRequest.sender.address.toUserFriendlyAddress(),
                    recipient: signTransactionRequest.recipient.toUserFriendlyAddress(),
                    recipientType: signTransactionRequest.recipientType,
                    recipientLabel: signTransactionRequest.recipientLabel,
                    value: signTransactionRequest.value,
                    fee: signTransactionRequest.fee,
                    extraData: signTransactionRequest.data,
                    flags: signTransactionRequest.flags,
                    validityStartHeight: signTransactionRequest.validityStartHeight,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].CREATE_CASHLINK:
                const createCashlinkRequest = request;
                // Note that there is no need to export autoTruncateMessage as the message already got truncated
                return {
                    appName: createCashlinkRequest.appName,
                    senderAddress: createCashlinkRequest.senderAddress
                        ? createCashlinkRequest.senderAddress.toUserFriendlyAddress()
                        : undefined,
                    senderBalance: createCashlinkRequest.senderBalance,
                    value: createCashlinkRequest.value,
                    message: createCashlinkRequest.message,
                    theme: createCashlinkRequest.theme,
                    fiatCurrency: createCashlinkRequest.fiatCurrency,
                    returnLink: createCashlinkRequest.returnLink,
                    skipSharing: createCashlinkRequest.skipSharing,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].MANAGE_CASHLINK:
                const manageCashlinkRequest = request;
                return {
                    appName: manageCashlinkRequest.appName,
                    cashlinkAddress: manageCashlinkRequest.cashlinkAddress
                        ? manageCashlinkRequest.cashlinkAddress.toUserFriendlyAddress()
                        : undefined,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].CHECKOUT:
                const checkoutRequest = request;
                switch (checkoutRequest.version) {
                    case 1:
                        const nimiqOptions = checkoutRequest.paymentOptions[0];
                        return {
                            appName: checkoutRequest.appName,
                            version: 1,
                            shopLogoUrl: checkoutRequest.shopLogoUrl,
                            sender: nimiqOptions.protocolSpecific.sender
                                ? nimiqOptions.protocolSpecific.sender.toUserFriendlyAddress()
                                : undefined,
                            forceSender: nimiqOptions.protocolSpecific.forceSender,
                            recipient: nimiqOptions.protocolSpecific.recipient
                                ? nimiqOptions.protocolSpecific.recipient.toUserFriendlyAddress()
                                : undefined,
                            recipientType: nimiqOptions.protocolSpecific.recipientType,
                            value: nimiqOptions.amount,
                            fee: nimiqOptions.protocolSpecific.fee,
                            extraData: nimiqOptions.protocolSpecific.extraData,
                            flags: nimiqOptions.protocolSpecific.flags,
                            validityDuration: nimiqOptions.protocolSpecific.validityDuration,
                            disableDisclaimer: checkoutRequest.disableDisclaimer,
                        };
                    case 2:
                        return {
                            ...checkoutRequest,
                            paymentOptions: checkoutRequest.paymentOptions.map((option) => option.raw()),
                        };
                }
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].ONBOARD:
                const onboardRequest = request;
                return {
                    appName: onboardRequest.appName,
                    disableBack: onboardRequest.disableBack,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].CHOOSE_ADDRESS:
                const chooseAddressRequest = request;
                return {
                    ...chooseAddressRequest,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SIGNUP:
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].LOGIN:
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].MIGRATE:
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].ADD_VESTING_CONTRACT:
                return {
                    appName: request.appName,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].CHANGE_PASSWORD:
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].LOGOUT:
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].ADD_ADDRESS:
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].ACTIVATE_BITCOIN:
                const simpleRequest = request;
                return {
                    appName: simpleRequest.appName,
                    accountId: simpleRequest.walletId,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].EXPORT:
                const exportRequest = request;
                return {
                    appName: exportRequest.appName,
                    accountId: exportRequest.walletId,
                    fileOnly: exportRequest.fileOnly,
                    wordsOnly: exportRequest.wordsOnly,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].RENAME:
                const renameRequest = request;
                return {
                    appName: renameRequest.appName,
                    accountId: renameRequest.walletId,
                    address: renameRequest.address,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SIGN_MESSAGE:
                const signMessageRequest = request;
                return {
                    appName: signMessageRequest.appName,
                    signer: signMessageRequest.signer ? signMessageRequest.signer.toUserFriendlyAddress() : undefined,
                    message: signMessageRequest.message,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SIGN_BTC_TRANSACTION:
                const signBtcTransactionRequest = request;
                return {
                    appName: signBtcTransactionRequest.appName,
                    accountId: signBtcTransactionRequest.walletId,
                    // Note: input.keyPath is lost on re-parsing and does not survive reloads, see RequestTypes.ts
                    inputs: signBtcTransactionRequest.inputs,
                    output: signBtcTransactionRequest.output,
                    changeOutput: signBtcTransactionRequest.changeOutput,
                    locktime: signBtcTransactionRequest.locktime,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].SETUP_SWAP:
                const setupSwapRequest = request;
                return {
                    ...setupSwapRequest,
                    accountId: setupSwapRequest.walletId,
                    // @ts-ignore Type 'Address' is not assignable to type 'string'
                    fund: setupSwapRequest.fund.type === 'NIM' ? {
                        ...setupSwapRequest.fund,
                        sender: setupSwapRequest.fund.sender.toUserFriendlyAddress(),
                    } : setupSwapRequest.fund,
                    // @ts-ignore Type 'Address' is not assignable to type 'string'
                    redeem: setupSwapRequest.redeem.type === 'NIM' ? {
                        ...setupSwapRequest.redeem,
                        recipient: setupSwapRequest.redeem.recipient.toUserFriendlyAddress(),
                    } : setupSwapRequest.redeem,
                };
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["RequestType"].REFUND_SWAP:
                const refundSwapRequest = request;
                return {
                    ...refundSwapRequest,
                    accountId: refundSwapRequest.walletId,
                    // @ts-ignore Type 'Address' is not assignable to type 'string'
                    refund: refundSwapRequest.refund.type === 'NIM' ? {
                        ...refundSwapRequest.refund,
                        sender: refundSwapRequest.refund.sender.toUserFriendlyAddress(),
                        recipient: refundSwapRequest.refund.recipient.toUserFriendlyAddress(),
                    } : refundSwapRequest.refund,
                };
            default:
                return null;
        }
    }
}


/***/ }),

/***/ "./src/lib/RpcApi.ts":
/*!***************************!*\
  !*** ./src/lib/RpcApi.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RpcApi; });
/* harmony import */ var _nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/rpc */ "./node_modules/@nimiq/rpc/dist/rpc.es.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _RequestParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RequestParser */ "./src/lib/RequestParser.ts");
/* harmony import */ var _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nimiq/keyguard-client */ "./node_modules/@nimiq/keyguard-client/dist/KeyguardClient.es.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/router */ "./src/router.ts");
/* harmony import */ var _WalletStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _lib_Cashlink__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/lib/Cashlink */ "./src/lib/Cashlink.ts");
/* harmony import */ var _lib_CookieJar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/lib/CookieJar */ "./src/lib/CookieJar.ts");
/* harmony import */ var _sentry_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sentry/browser */ "./node_modules/@sentry/browser/esm/index.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/lib/Helpers */ "./src/lib/Helpers.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");














class RpcApi {
    constructor(store, staticStore, router) {
        this._3rdPartyRequestWhitelist = [
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].CHECKOUT,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].SIGN_TRANSACTION,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].SIGN_MESSAGE,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].CHOOSE_ADDRESS,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].CREATE_CASHLINK,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].MANAGE_CASHLINK,
        ];
        this._store = store;
        this._staticStore = staticStore;
        this._router = router;
        this._server = new _nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__["RpcServer"]('*');
        this._keyguardClient = new _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["KeyguardClient"](config__WEBPACK_IMPORTED_MODULE_12__["default"].keyguardEndpoint);
        // On reload recover any state exported to the current history entry. Note that if we came back from the
        // Keyguard by history back navigation and rejectOnBack was enabled for the request, the state provided to
        // _keyguardErrorHandler will overwrite the state here.
        if (Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_11__["getHistoryStorage"])(RpcApi.HISTORY_KEY_RPC_STATE)) {
            this._recoverState(Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_11__["getHistoryStorage"])(RpcApi.HISTORY_KEY_RPC_STATE));
        }
        this._registerHubApis([
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].SIGN_TRANSACTION,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].CREATE_CASHLINK,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].MANAGE_CASHLINK,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].CHECKOUT,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].ONBOARD,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].SIGNUP,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].LOGIN,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].EXPORT,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].CHANGE_PASSWORD,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].LOGOUT,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].ADD_ADDRESS,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].RENAME,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].ADD_VESTING_CONTRACT,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].SIGN_MESSAGE,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].MIGRATE,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].CHOOSE_ADDRESS,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].SIGN_BTC_TRANSACTION,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].ACTIVATE_BITCOIN,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].SETUP_SWAP,
            _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].REFUND_SWAP,
        ]);
        this._registerKeyguardApis([
            _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["KeyguardCommand"].SIGN_TRANSACTION,
            _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["KeyguardCommand"].CREATE,
            _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["KeyguardCommand"].IMPORT,
            _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["KeyguardCommand"].EXPORT,
            _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["KeyguardCommand"].CHANGE_PASSWORD,
            _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["KeyguardCommand"].REMOVE,
            _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["KeyguardCommand"].DERIVE_ADDRESS,
            _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["KeyguardCommand"].SIGN_MESSAGE,
            _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["KeyguardCommand"].SIGN_BTC_TRANSACTION,
            _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["KeyguardCommand"].DERIVE_BTC_XPUB,
            _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["KeyguardCommand"].SIGN_SWAP,
        ]);
        this._router.beforeEach((to, from, next) => {
            // There is an intial redirect from '/' to '/' which does not need to be handled at all.
            if (to.name === _router__WEBPACK_IMPORTED_MODULE_5__["REQUEST_ERROR"] || (to.path === '/' && from.path === '/')) {
                next();
                return;
            }
            // If the navigation call already contains an rpcId, do not replace it.
            if (to.query.rpcId) {
                next();
                return;
            }
            const rpcId = from.query.rpcId || this._parseUrlParams(window.location.search).rpcId;
            // In case no rpcId can be found, the request is not functional and needs to be rejected.
            if (!rpcId) {
                this.reject(new Error('UNEXPECTED: RpcId not present'));
                next(false);
                return;
            }
            next({
                ...to,
                query: {
                    ...to.query,
                    rpcId,
                },
            });
        });
        this._router.afterEach((to, from) => {
            // There is an intial redirect from '/' to '/' which does not need to be handled at all.
            if (to.path === '/' && from.path === '/') {
                return;
            }
            // If we have an rpcState, export the entire state to the newly pushed history entry
            // to be available on reload.
            // This is potentially redundand to the above condition but added as a precaution,
            // especially considering the no-request case a few lines down within RpcApi.start().
            if (this._staticStore.rpcState) {
                // A small timeout is needed, since Vue does push the new history state only after the afterEach
                // hooks are executed, thus overwriting any state set in these hooks.
                window.setTimeout(() => Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_11__["setHistoryStorage"])(RpcApi.HISTORY_KEY_RPC_STATE, this._exportState()), 10);
            }
        });
    }
    static get HISTORY_KEY_RPC_STATE() {
        return 'rpc-api-exported-state';
    }
    start() {
        this._keyguardClient.init().catch(console.error); // TODO: Provide better error handling here
        if (this._store.state.keyguardResult)
            return;
        // If there is no request:
        // If no opener is set and there is a previous history entry and there is no data passed in the URL,
        // redirect to Safe. Otherwise, show error page.
        const onClientTimeout = () => {
            if (window.opener === null && window.history.length > 1 && !window.location.hash) {
                location.href = config__WEBPACK_IMPORTED_MODULE_12__["default"].redirectTarget;
            }
            else {
                this._router.replace({ name: _router__WEBPACK_IMPORTED_MODULE_5__["REQUEST_ERROR"] });
            }
        };
        this._server.init(onClientTimeout);
    }
    createKeyguardClient(handleHistoryBack) {
        const localState = this._exportState();
        const client = new _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["KeyguardClient"](config__WEBPACK_IMPORTED_MODULE_12__["default"].keyguardEndpoint, window.location.origin, localState, undefined, // preserveRequests: keep default behavior, which is true for redirects but false for postMessage
        handleHistoryBack);
        if (!handleHistoryBack) {
            // The Keyguard client rejects on history back only if handleHistoryBack is activated. If the Keyguard does
            // not reject it also does not provide us the localState to recover. For this case, we encode it manually in
            // the history, to retrieve it from there.
            Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_11__["setHistoryStorage"])(RpcApi.HISTORY_KEY_RPC_STATE, this._exportState());
        }
        return client;
    }
    resolve(result) {
        this._reply(_nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__["ResponseStatus"].OK, result);
    }
    reject(error) {
        const ignoredErrorTypes = [_nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["Errors"].Types.INVALID_REQUEST.toString()];
        const ignoredErrors = [_Constants__WEBPACK_IMPORTED_MODULE_10__["ERROR_CANCELED"], 'Request aborted', 'WalletId not found', 'Address not found'];
        if (ignoredErrorTypes.indexOf(error.name) < 0 && ignoredErrors.indexOf(error.message) < 0) {
            if (config__WEBPACK_IMPORTED_MODULE_12__["default"].reportToSentry) {
                console.debug('Request:', JSON.stringify(this._staticStore.request));
                Object(_sentry_browser__WEBPACK_IMPORTED_MODULE_9__["captureException"])(error);
            }
        }
        this._reply(_nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__["ResponseStatus"].ERROR, error);
    }
    get keyguardClient() {
        return this._keyguardClient;
    }
    async _reply(status, result) {
        // Update cookies for iOS
        if (_nimiq_utils__WEBPACK_IMPORTED_MODULE_1__["BrowserDetection"].isIOS() || _nimiq_utils__WEBPACK_IMPORTED_MODULE_1__["BrowserDetection"].isSafari()) {
            const wallets = await _WalletStore__WEBPACK_IMPORTED_MODULE_6__["WalletStore"].Instance.list();
            _lib_CookieJar__WEBPACK_IMPORTED_MODULE_8__["default"].fill(wallets);
        }
        // Check for originalRouteName in StaticStore and route there
        const originalRoute = this._staticStore.originalRouteName;
        if (originalRoute && (!(result instanceof Error) || result.message !== _Constants__WEBPACK_IMPORTED_MODULE_10__["ERROR_CANCELED"])) {
            this._staticStore.sideResult = result;
            this._store.commit('setKeyguardResult', null);
            // Recreate original URL with original query parameters
            const rpcState = this._staticStore.rpcState;
            const query = { rpcId: rpcState.id.toString() };
            delete this._staticStore.originalRouteName;
            this._router.push({ name: originalRoute, query });
            return;
        }
        this._staticStore.rpcState.reply(status, result);
    }
    _exportState() {
        return {
            rpcState: this._staticStore.rpcState.toJSON(),
            request: this._staticStore.request ? _RequestParser__WEBPACK_IMPORTED_MODULE_2__["RequestParser"].raw(this._staticStore.request) : undefined,
            kind: this._staticStore.request ? this._staticStore.request.kind : undefined,
            keyguardRequest: this._staticStore.keyguardRequest,
            originalRouteName: this._staticStore.originalRouteName,
            cashlink: this._staticStore.cashlink ? this._staticStore.cashlink.toObject() : undefined,
        };
    }
    _registerHubApis(requestTypes) {
        for (const requestType of requestTypes) {
            // Server listener
            this._server.onRequest(requestType, (state, arg) => this._hubApiHandler(requestType, state, arg));
        }
    }
    async _hubApiHandler(requestType, state, arg) {
        let request;
        if ( // Check that a non-whitelisted request comes from a privileged origin
        !this._3rdPartyRequestWhitelist.includes(requestType)
            && !Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_11__["includesOrigin"])(config__WEBPACK_IMPORTED_MODULE_12__["default"].privilegedOrigins, state.origin)) {
            state.reply(_nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__["ResponseStatus"].ERROR, new Error(`${state.origin} is unauthorized to call ${requestType}`));
            return;
        }
        this._staticStore.rpcState = state;
        try {
            request = _RequestParser__WEBPACK_IMPORTED_MODULE_2__["RequestParser"].parse(arg, state, requestType) || undefined;
            this._staticStore.request = request;
        }
        catch (error) {
            this.reject(error);
            return;
        }
        const wallets = await _WalletStore__WEBPACK_IMPORTED_MODULE_6__["WalletStore"].Instance.list();
        if (!wallets.length) {
            const hasLegacyAccounts = (await this._keyguardClient.hasLegacyAccounts()).success;
            if (hasLegacyAccounts) {
                // Keyguard has legacy accounts, redirect to migration
                if (requestType !== _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].MIGRATE) {
                    this._staticStore.originalRouteName = requestType;
                }
                this._router.replace({ name: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].MIGRATE });
                this._startRoute();
                return;
            }
        }
        let account;
        // Simply testing if the property exists (with `'walletId' in request`) is not enough,
        // as `undefined` also counts as existing.
        if (request) {
            let accountRequired;
            let errorMsg = 'Address not found'; // Error message for all cases but the first
            // Note that we don't check for btc addresses here. Instead, btc request handlers check whether the address
            // can be derived.
            if (request.walletId) {
                accountRequired = true;
                account = await _WalletStore__WEBPACK_IMPORTED_MODULE_6__["WalletStore"].Instance.get(request.walletId);
                errorMsg = 'AccountId not found';
            }
            else if (requestType === _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].SIGN_TRANSACTION) {
                accountRequired = true;
                const parsedSignTransactionRequest = request;
                const address = parsedSignTransactionRequest.sender instanceof Nimiq.Address
                    ? parsedSignTransactionRequest.sender
                    : parsedSignTransactionRequest.sender.address;
                account = this._store.getters.findWalletByAddress(address.toUserFriendlyAddress(), true);
            }
            else if (requestType === _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].SIGN_MESSAGE) {
                accountRequired = false; // Sign message allows user to select an account
                const address = request.signer;
                if (address) {
                    account = this._store.getters.findWalletByAddress(address.toUserFriendlyAddress(), false);
                }
            }
            else if (requestType === _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].CHECKOUT) {
                const checkoutRequest = request;
                // forceSender only applies to NIM-only checkouts.
                if (checkoutRequest.paymentOptions.length === 1
                    && checkoutRequest.paymentOptions[0].currency === _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["Currency"].NIM) {
                    /**
                     * Later on can potentially be ParsedNimiqOasisPaymentOptions.
                     * If it will contain the forceSender flag as well it should not be an issue.
                     */
                    const protocolSpecific = checkoutRequest.paymentOptions[0].protocolSpecific;
                    accountRequired = protocolSpecific.forceSender;
                    if (protocolSpecific.sender) {
                        account = this._store.getters.findWalletByAddress(protocolSpecific.sender.toUserFriendlyAddress(), true);
                    }
                }
            }
            if (accountRequired && !account) {
                this.reject(new Error(errorMsg));
                return;
            }
        }
        this._startRoute();
        if (location.pathname !== '/') {
            // Don't jump back to request's initial view on reload when navigated to a subsequent view.
            // E.g. if the user switches from Checkout to Import, don't jump back to Checkout on reload.
            return;
        }
        if (account && account.type === _Constants__WEBPACK_IMPORTED_MODULE_10__["WalletType"].LEDGER
            && this._router.getMatchedComponents({ name: `${requestType}-ledger` }).length > 0) {
            this._router.replace({ name: `${requestType}-ledger` });
        }
        else {
            this._router.replace({ name: requestType });
        }
    }
    _parseUrlParams(query) {
        const params = {};
        if (!query)
            return params;
        const keyValues = query.substr(1).replace(/\+/g, ' ').split('&')
            .map((keyValueString) => keyValueString.split('='));
        for (const keyValue of keyValues) {
            // @ts-ignore Property 'decodeURIComponent' does not exist on type 'Window'
            params[keyValue[0]] = window.decodeURIComponent(keyValue[1]);
        }
        return params;
    }
    _recoverState(storedState) {
        const rpcState = _nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__["State"].fromJSON(storedState.rpcState);
        const request = _RequestParser__WEBPACK_IMPORTED_MODULE_2__["RequestParser"].parse(storedState.request, rpcState, storedState.kind);
        const keyguardRequest = storedState.keyguardRequest;
        const originalRouteName = storedState.originalRouteName;
        const cashlink = storedState.cashlink ? _lib_Cashlink__WEBPACK_IMPORTED_MODULE_7__["default"].fromObject(storedState.cashlink) : undefined;
        this._staticStore.rpcState = rpcState;
        this._staticStore.request = request || undefined;
        this._staticStore.keyguardRequest = keyguardRequest;
        this._staticStore.originalRouteName = originalRouteName;
        this._staticStore.cashlink = cashlink;
    }
    _registerKeyguardApis(commands) {
        for (const command of commands) {
            // Server listener
            this._keyguardClient.on(command, (result, state) => this._keyguardSuccessHandler(command, result, state), (error, state) => this._keyguardErrorHandler(command, error, state));
        }
    }
    _keyguardSuccessHandler(command, result, state) {
        // Recover state
        this._recoverState(state);
        // Set result
        this._store.commit('setKeyguardResult', result);
        // To enable the keyguardResponseRouter to decide correctly to which route it should direct
        // when returning from the Keyguard's sign-transaction request, the original request kind that
        // was given to the Hub is passed here and the keyguardResponseRouter is turned
        // from an object into a function instead.
        this._router.replace({ name: Object(_router__WEBPACK_IMPORTED_MODULE_5__["keyguardResponseRouter"])(command, this._staticStore.request.kind).resolve });
        this._startRoute();
    }
    _keyguardErrorHandler(command, error, state) {
        // Recover state
        this._recoverState(state);
        // Set result
        this._store.commit('setKeyguardResult', error);
        if (error.message === _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["Errors"].Messages.CANCELED) {
            this.reject(error);
            return;
        }
        if (error.message === 'Request aborted') {
            /*
             * In case the window is a popup and the recovered state is the one with which the popup was
             * initialized (has a source), then reject it. The popup will be closed as a result.
             * If not, there was another history entry in between, where a history.back() will navigate to,
             * not closing the popup in the process.
             */
            if (this._staticStore.rpcState.source && window.opener) {
                this.reject(error);
            }
            else {
                window.history.back();
            }
            return;
        }
        this._startRoute();
        if (error.message === _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_4__["Errors"].Messages.EXPIRED) {
            // Don't reject but navigate to checkout to display the expiration warning there.
            this._router.replace({ name: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["RequestType"].CHECKOUT });
            return;
        }
        this._router.replace({ name: Object(_router__WEBPACK_IMPORTED_MODULE_5__["keyguardResponseRouter"])(command, this._staticStore.request.kind).reject });
    }
    _startRoute() {
        this._store.commit('setRequestLoaded', !!(this._staticStore.rpcState && this._staticStore.request));
    }
}


/***/ }),

/***/ "./src/lib/StaticStore.ts":
/*!********************************!*\
  !*** ./src/lib/StaticStore.ts ***!
  \********************************/
/*! exports provided: StaticStore, Static, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticStore", function() { return StaticStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Static", function() { return Static; });
/* harmony import */ var vue_class_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-class-component */ "./node_modules/vue-class-component/dist/vue-class-component.esm.js");

class StaticStore {
    static get Instance() {
        if (!this.instance)
            this.instance = new StaticStore();
        return this.instance;
    }
}
// Decorator is capitalized to be consistent with vuex decorators
// tslint:disable-next-line variable-name
const Static = (target, keyName) => {
    return Object(vue_class_component__WEBPACK_IMPORTED_MODULE_0__["createDecorator"])((componentOptions, key) => {
        if (!componentOptions.computed) {
            componentOptions.computed = {};
        }
        componentOptions.computed[key] = () => {
            // @ts-ignore
            return StaticStore.Instance[key];
        };
    })(target, keyName);
};
/* harmony default export */ __webpack_exports__["default"] = (StaticStore.Instance);


/***/ }),

/***/ "./src/lib/paymentOptions/BitcoinPaymentOptions.ts":
/*!*********************************************************!*\
  !*** ./src/lib/paymentOptions/BitcoinPaymentOptions.ts ***!
  \*********************************************************/
/*! exports provided: ParsedBitcoinDirectPaymentOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParsedBitcoinDirectPaymentOptions", function() { return ParsedBitcoinDirectPaymentOptions; });
/* harmony import */ var _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _ParsedPaymentOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParsedPaymentOptions */ "./src/lib/paymentOptions/ParsedPaymentOptions.ts");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../i18n/i18n-setup */ "./src/i18n/i18n-setup.ts");




class ParsedBitcoinDirectPaymentOptions extends _ParsedPaymentOptions__WEBPACK_IMPORTED_MODULE_1__["ParsedPaymentOptions"] {
    constructor(options, parserFlags = {}) {
        super(options, parserFlags);
        this.amount = parseInt(Object(_nimiq_utils__WEBPACK_IMPORTED_MODULE_2__["toNonScientificNumberString"])(options.amount), 10);
        let feePerByte;
        if (options.protocolSpecific.feePerByte !== undefined) {
            try {
                feePerByte = parseFloat(Object(_nimiq_utils__WEBPACK_IMPORTED_MODULE_2__["toNonScientificNumberString"])(options.protocolSpecific.feePerByte));
            }
            catch (e) {
                throw new Error('If provided, feePerByte must be a valid number');
            }
        }
        let fee;
        if (options.protocolSpecific.fee !== undefined) {
            if (!this.isNonNegativeInteger(options.protocolSpecific.fee)) {
                throw new Error('If provided, fee must be a non-negative integer');
            }
            fee = parseInt(Object(_nimiq_utils__WEBPACK_IMPORTED_MODULE_2__["toNonScientificNumberString"])(options.protocolSpecific.fee), 10);
        }
        if (feePerByte === undefined && fee !== undefined) {
            throw new Error('If fee is provided, feePerByte must be provided too. The reasoning behind this is that ' +
                'the actual transaction speed depends on feePerByte rather than on fee. Therefore the feePerByte' +
                'that the fee was calculated from should be provided.');
        }
        else if (feePerByte !== undefined && fee === undefined) {
            // estimate the fee from feePerByte
            fee = feePerByte * 250; // 250 is the estimated size for a standard tx with two inputs and one output
        }
        if (options.protocolSpecific.recipient && typeof options.protocolSpecific.recipient !== 'string') {
            // TODO add btc address validation here?
            throw new Error('If a recipient is provided it must be a string');
        }
        this.protocolSpecific = {
            fee,
            feePerByte,
            recipient: options.protocolSpecific.recipient,
        };
    }
    get currency() {
        return _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_0__["Currency"].BTC;
    }
    get type() {
        return _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_0__["PaymentType"].DIRECT;
    }
    get decimals() {
        return 8;
    }
    get total() {
        return (this.amount + this.fee);
    }
    get fee() {
        return this.protocolSpecific.fee || 0;
    }
    get feeString() {
        if (this.protocolSpecific.feePerByte) {
            const fee = Math.ceil((this.protocolSpecific.feePerByte) * 100) / 100;
            return fee !== 0 ? _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_3__["i18n"].t('25', { fee }) : '';
        }
        return '';
    }
    fiatFee(fiatAmount) {
        if (!this.amount || !fiatAmount) {
            throw new Error('amount and fiatAmount must be provided');
        }
        if (!this.fee) {
            return 0;
        }
        return this.fee * fiatAmount / this.amount;
    }
    raw() {
        return {
            currency: this.currency,
            type: this.type,
            expires: this.expires,
            amount: this.amount.toString(),
            vendorMarkup: this.vendorMarkup,
            protocolSpecific: this.protocolSpecific,
        };
    }
}


/***/ }),

/***/ "./src/lib/paymentOptions/EtherPaymentOptions.ts":
/*!*******************************************************!*\
  !*** ./src/lib/paymentOptions/EtherPaymentOptions.ts ***!
  \*******************************************************/
/*! exports provided: ParsedEtherDirectPaymentOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParsedEtherDirectPaymentOptions", function() { return ParsedEtherDirectPaymentOptions; });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _ParsedPaymentOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParsedPaymentOptions */ "./src/lib/paymentOptions/ParsedPaymentOptions.ts");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../i18n/i18n-setup */ "./src/i18n/i18n-setup.ts");





class ParsedEtherDirectPaymentOptions extends _ParsedPaymentOptions__WEBPACK_IMPORTED_MODULE_2__["ParsedPaymentOptions"] {
    constructor(options, parserFlags = {}) {
        super(options, parserFlags);
        this.amount = big_integer__WEBPACK_IMPORTED_MODULE_0___default()(options.amount); // note that bigInt resolves scientific notation like 2e3 automatically
        let gasLimit;
        if (options.protocolSpecific.gasLimit !== undefined) {
            if (!this.isNonNegativeInteger(options.protocolSpecific.gasLimit)) {
                throw new Error('If provided, gasLimit must be a non-negative integer');
            }
            gasLimit = parseInt(Object(_nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["toNonScientificNumberString"])(options.protocolSpecific.gasLimit), 10);
        }
        let gasPrice;
        if (options.protocolSpecific.gasPrice !== undefined) {
            if (!this.isNonNegativeInteger(options.protocolSpecific.gasPrice)) {
                throw new Error('If provided, gasPrice must be a non-negative integer');
            }
            gasPrice = big_integer__WEBPACK_IMPORTED_MODULE_0___default()(options.protocolSpecific.gasPrice);
        }
        if (options.protocolSpecific.recipient && typeof options.protocolSpecific.recipient !== 'string') {
            // TODO add eth address validation here?
            throw new Error('If a recipient is provided it must be of type string');
        }
        this.protocolSpecific = {
            gasLimit,
            gasPrice,
            recipient: options.protocolSpecific.recipient,
        };
    }
    get currency() {
        return _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["Currency"].ETH;
    }
    get type() {
        return _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["PaymentType"].DIRECT;
    }
    get decimals() {
        return 18;
    }
    get total() {
        return this.amount.add(this.fee);
    }
    get fee() {
        return this.protocolSpecific.gasPrice.times(this.protocolSpecific.gasLimit) || big_integer__WEBPACK_IMPORTED_MODULE_0___default()(0);
    }
    get feeString() {
        if (this.protocolSpecific.gasPrice) {
            const fee = new _nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["FormattableNumber"](this.protocolSpecific.gasPrice)
                .moveDecimalSeparator(-9).toString({ maxDecimals: 2 });
            return fee !== '0' ? _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_4__["i18n"].t('24', { fee }) : '';
        }
        return '';
    }
    fiatFee(fiatAmount) {
        if (this.fee.isZero()) {
            return 0;
        }
        if (!this.amount || !fiatAmount) {
            throw new Error('amount and fiatAmount must be provided');
        }
        const decimalMatch = Object(_nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["toNonScientificNumberString"])(fiatAmount).match(/(?:\D)(\d+)$/);
        const decimalCount = decimalMatch ? decimalMatch[1].length : 0;
        const conversionFactor = 10 ** decimalCount; // convert amount to smallest unit for bigint calculations
        return this.fee
            .times(big_integer__WEBPACK_IMPORTED_MODULE_0___default()(Math.round(fiatAmount * conversionFactor)))
            .divide(this.amount) // integer division loss of precision here.
            .valueOf() / conversionFactor;
    }
    raw() {
        return {
            currency: this.currency,
            type: this.type,
            expires: this.expires,
            amount: this.amount.toString(),
            vendorMarkup: this.vendorMarkup,
            protocolSpecific: {
                gasLimit: this.protocolSpecific.gasLimit,
                gasPrice: this.protocolSpecific.gasPrice
                    ? this.protocolSpecific.gasPrice.toString()
                    : undefined,
                recipient: this.protocolSpecific.recipient,
            },
        };
    }
}


/***/ }),

/***/ "./src/lib/paymentOptions/NimiqPaymentOptions.ts":
/*!*******************************************************!*\
  !*** ./src/lib/paymentOptions/NimiqPaymentOptions.ts ***!
  \*******************************************************/
/*! exports provided: ParsedNimiqDirectPaymentOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParsedNimiqDirectPaymentOptions", function() { return ParsedNimiqDirectPaymentOptions; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _ParsedPaymentOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParsedPaymentOptions */ "./src/lib/paymentOptions/ParsedPaymentOptions.ts");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");




class ParsedNimiqDirectPaymentOptions extends _ParsedPaymentOptions__WEBPACK_IMPORTED_MODULE_2__["ParsedPaymentOptions"] {
    constructor(options, parserFlags = {}) {
        super(options, parserFlags);
        this.amount = parseInt(Object(_nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["toNonScientificNumberString"])(options.amount), 10);
        if (options.protocolSpecific.extraData !== undefined && typeof options.protocolSpecific.extraData !== 'string'
            && !(options.protocolSpecific.extraData instanceof Uint8Array)) {
            throw new Error('extraData must be a string or Uint8Array');
        }
        const extraData = typeof options.protocolSpecific.extraData === 'string'
            ? _nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["Utf8Tools"].stringToUtf8ByteArray(options.protocolSpecific.extraData)
            : options.protocolSpecific.extraData;
        let sender;
        if (options.protocolSpecific.sender !== undefined) {
            try {
                sender = Nimiq.Address.fromString(options.protocolSpecific.sender);
            }
            catch (err) {
                throw new Error('If provided, sender must be a valid user friendly address string');
            }
        }
        let recipient;
        if (options.protocolSpecific.recipient !== undefined) {
            try {
                recipient = Nimiq.Address.fromString(options.protocolSpecific.recipient);
            }
            catch (err) {
                throw new Error('If provided, recipient must be a valid user friendly address string');
            }
        }
        let recipientType;
        if (options.protocolSpecific.recipientType !== undefined) {
            if (!Object.values(Nimiq.Account.Type).includes(options.protocolSpecific.recipientType)) {
                throw new Error('If provided, recipientType must be a valid Nimiq account type');
            }
            recipientType = options.protocolSpecific.recipientType;
        }
        const flags = options.protocolSpecific.flags;
        if (flags !== undefined && typeof flags !== 'number') {
            throw new Error('If provided, flags must be a number.');
        }
        let feePerByte;
        if (options.protocolSpecific.feePerByte !== undefined) {
            try {
                feePerByte = parseFloat(Object(_nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["toNonScientificNumberString"])(options.protocolSpecific.feePerByte));
            }
            catch (e) {
                throw new Error('If provided, feePerByte must be a valid number');
            }
        }
        let fee;
        if (options.protocolSpecific.fee !== undefined) {
            if (!this.isNonNegativeInteger(options.protocolSpecific.fee)) {
                throw new Error('If provided, fee must be a non-negative integer');
            }
            fee = parseInt(Object(_nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["toNonScientificNumberString"])(options.protocolSpecific.fee), 10);
        }
        const requiresExtendedTransaction = extraData && extraData.byteLength > 0
            || (recipientType !== undefined && recipientType !== Nimiq.Account.Type.BASIC)
            || (flags !== undefined && flags !== Nimiq.Transaction.Flag.NONE);
        // Note that the transaction size can be bigger than this, for example if the sender type the user wants
        // to use requires an extended transaction or if an extended transaction includes a multi signature proof.
        // The size is therefore just an estimate. In the majority of cases the estimate will be accurate though
        // and a fee that is slightly off will generally not be a problem.
        const estimatedTransactionSize = requiresExtendedTransaction
            ? 166 + (extraData ? extraData.byteLength : 0)
            : 138;
        // feePerByte takes precedence over fee as it is the more meaningful value for the transaction and its speed.
        if (feePerByte === undefined) {
            if (fee === undefined) {
                if (!this.parserFlags.isUpdate) {
                    // Do not enforce default fees on update which would overwrite our previous fee.
                    feePerByte = 0;
                    fee = 0;
                }
            }
            else {
                feePerByte = fee / estimatedTransactionSize;
            }
        }
        else {
            fee = Math.ceil(feePerByte * estimatedTransactionSize);
        }
        if (options.protocolSpecific.validityDuration !== undefined
            && options.protocolSpecific.validityDuration <= 0) {
            throw new Error('If provided, validityDuration must be a positive integer.');
        }
        // Check for required requested transaction properties which we can not guarantee for external payments. On
        // properties which do not strictly need to be fulfilled like exact fee, validityDuration or sender without
        // forceSender we are more lenient.
        if (this.parserFlags.isPointOfSale && (options.protocolSpecific.forceSender
            || (recipientType !== undefined && recipientType !== Nimiq.Account.Type.BASIC)
            || (flags !== undefined && flags !== Nimiq.Transaction.Flag.NONE)
            || (extraData && !_nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["Utf8Tools"].isValidUtf8(extraData)) // only allow string data
        )) {
            throw new Error('isPointOfSale was set but requested sender, recipientType, flags or extraData can not '
                + 'be guaranteed for an external payment.');
        }
        this.protocolSpecific = {
            sender,
            forceSender: !!options.protocolSpecific.forceSender,
            fee,
            feePerByte,
            extraData,
            flags: flags || Nimiq.Transaction.Flag.NONE,
            recipient,
            recipientType,
            validityDuration: !options.protocolSpecific.validityDuration
                ? _Constants__WEBPACK_IMPORTED_MODULE_0__["TX_VALIDITY_WINDOW"]
                : Math.min(_Constants__WEBPACK_IMPORTED_MODULE_0__["TX_VALIDITY_WINDOW"], Math.max(_Constants__WEBPACK_IMPORTED_MODULE_0__["TX_MIN_VALIDITY_DURATION"], options.protocolSpecific.validityDuration)),
        };
    }
    get currency() {
        return _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["Currency"].NIM;
    }
    get type() {
        return _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_1__["PaymentType"].DIRECT;
    }
    get decimals() {
        return 5;
    }
    get total() {
        return this.amount + this.fee;
    }
    get fee() {
        return this.protocolSpecific.fee || 0;
    }
    fiatFee(fiatAmount) {
        if (!this.fee) {
            return 0;
        }
        if (!this.amount || !fiatAmount) {
            throw new Error('amount and fiatAmount must be provided');
        }
        return this.fee * fiatAmount / this.amount;
    }
    raw() {
        return {
            currency: this.currency,
            type: this.type,
            expires: this.expires,
            amount: this.amount.toString(),
            vendorMarkup: this.vendorMarkup,
            protocolSpecific: {
                recipient: this.protocolSpecific.recipient
                    ? this.protocolSpecific.recipient.toUserFriendlyAddress()
                    : undefined,
                fee: this.protocolSpecific.fee,
                feePerByte: this.protocolSpecific.feePerByte,
                extraData: this.protocolSpecific.extraData,
                validityDuration: this.protocolSpecific.validityDuration,
                sender: this.protocolSpecific.sender
                    ? this.protocolSpecific.sender.toUserFriendlyAddress()
                    : undefined,
                flags: this.protocolSpecific.flags,
                recipientType: this.protocolSpecific.recipientType,
                forceSender: !!this.protocolSpecific.forceSender,
            },
        };
    }
}


/***/ }),

/***/ "./src/lib/paymentOptions/ParsedPaymentOptions.ts":
/*!********************************************************!*\
  !*** ./src/lib/paymentOptions/ParsedPaymentOptions.ts ***!
  \********************************************************/
/*! exports provided: ParsedPaymentOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParsedPaymentOptions", function() { return ParsedPaymentOptions; });
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Helpers */ "./src/lib/Helpers.ts");


class ParsedPaymentOptions {
    constructor(options, parserFlags) {
        // @ts-ignore: Accessing abstract properties currency and type
        if (options.currency !== this.currency || options.type !== this.type) {
            throw new Error(`Cannot parse given options as ${this.constructor.name}.`);
        }
        if (!this.isNonNegativeInteger(options.amount)) {
            throw new Error('Amount must be a non-negative integer');
        }
        if (options.vendorMarkup !== undefined
            && (typeof options.vendorMarkup !== 'number'
                || !Number.isFinite(options.vendorMarkup)
                || options.vendorMarkup <= -1)) {
            throw new Error('If provided, vendorMarkup must be a finite number > -1');
        }
        this.vendorMarkup = options.vendorMarkup;
        this.expires = typeof options.expires === 'number'
            ? Object(_Helpers__WEBPACK_IMPORTED_MODULE_1__["isMilliseconds"])(options.expires)
                ? options.expires
                : options.expires * 1000
            : undefined;
        this.parserFlags = parserFlags;
    }
    get baseUnitAmount() {
        return new _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["FormattableNumber"](this.amount).moveDecimalSeparator(-this.decimals).toString();
    }
    update(options, ...additionalArgs) {
        // Parse to check validity.
        const parsedOptions = new this.constructor(options, { ...this.parserFlags, isUpdate: true });
        this.amount = parsedOptions.amount; // amount must exist on all parsed options
        this.vendorMarkup = parsedOptions.vendorMarkup !== undefined ? parsedOptions.vendorMarkup : this.vendorMarkup;
        this.expires = parsedOptions.expires || this.expires;
        for (const key of Object.keys(parsedOptions.protocolSpecific)) {
            if (parsedOptions.protocolSpecific[key] === undefined)
                continue;
            this.protocolSpecific[key] = parsedOptions.protocolSpecific[key];
        }
    }
    isNonNegativeInteger(value) {
        try {
            return /^\d+$/.test(Object(_nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["toNonScientificNumberString"])(value));
        }
        catch (e) {
            return false;
        }
    }
}


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App.vue */ "./src/App.vue");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./router */ "./src/router.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store */ "./src/store.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _lib_RpcApi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/lib/RpcApi */ "./src/lib/RpcApi.ts");
/* harmony import */ var _lib_Sentry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/Sentry */ "./src/lib/Sentry.ts");
/* harmony import */ var _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./i18n/i18n-setup */ "./src/i18n/i18n-setup.ts");










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
const rpcApi = new _lib_RpcApi__WEBPACK_IMPORTED_MODULE_7__["default"](_store__WEBPACK_IMPORTED_MODULE_5__["default"], _lib_StaticStore__WEBPACK_IMPORTED_MODULE_6__["default"], _router__WEBPACK_IMPORTED_MODULE_4__["default"]);
vue__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.$rpc = rpcApi; // rpcApi is started in App.vue->created()
Object(_lib_Sentry__WEBPACK_IMPORTED_MODULE_8__["startSentry"])(vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
// Kick off loading the language file
Object(_i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_9__["setLanguage"])(Object(_i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_9__["detectLanguage"])());
const app = new vue__WEBPACK_IMPORTED_MODULE_0__["default"]({
    data: { loading: true },
    router: _router__WEBPACK_IMPORTED_MODULE_4__["default"],
    store: _store__WEBPACK_IMPORTED_MODULE_5__["default"],
    i18n: _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_9__["i18n"],
    render: (h) => h(_App_vue__WEBPACK_IMPORTED_MODULE_3__["default"]),
}).$mount('#app');
let _loadingTimeout = -1;
_router__WEBPACK_IMPORTED_MODULE_4__["default"].beforeEach((to, from, next) => {
    if (_loadingTimeout === -1) {
        // Only show loader when lazy-loading takes longer than 500ms
        _loadingTimeout = window.setTimeout(() => app.loading = true, 500);
    }
    next();
});
// This router navigation guard is to prevent switching
// to the new route before the language file finished loading.
_router__WEBPACK_IMPORTED_MODULE_4__["default"].beforeResolve((to, from, next) => {
    if (to.path === '/') {
        // The root path doesn't require any translations, therefore we can continue right away. Also, this fixes what
        // seems to be a race condition between the beforeEach in the RpcApi and this beforeResolve, see issue #422
        next();
        return;
    }
    Object(_i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_9__["setLanguage"])(Object(_i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_9__["detectLanguage"])()).then(() => next());
});
_router__WEBPACK_IMPORTED_MODULE_4__["default"].afterEach(() => {
    window.clearTimeout(_loadingTimeout);
    _loadingTimeout = -1;
    app.loading = false;
});


/***/ }),

/***/ "./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/*! exports provided: keyguardResponseRouter, REQUEST_ERROR, ERROR, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyguardResponseRouter", function() { return keyguardResponseRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_ERROR", function() { return REQUEST_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR", function() { return ERROR; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/keyguard-client */ "./node_modules/@nimiq/keyguard-client/dist/KeyguardClient.es.js");




const SignTransaction = () => Promise.all(/*! import() | sign-transaction */[__webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("sign-transaction")]).then(__webpack_require__.bind(null, /*! ./views/SignTransaction.vue */ "./src/views/SignTransaction.vue"));
const SignTransactionSuccess = () => Promise.all(/*! import() | sign-transaction */[__webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("sign-transaction")]).then(__webpack_require__.bind(null, /*! ./views/SignTransactionSuccess.vue */ "./src/views/SignTransactionSuccess.vue"));
const SignTransactionLedger = () => Promise.all(/*! import() | sign-transaction-ledger */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("activate-btc-ledger~add-ledger~refund-swap-ledger~sign-btc-transaction-ledger~sign-transaction-ledge~bf179231"), __webpack_require__.e("checkout~sign-transaction-ledger"), __webpack_require__.e("sign-transaction-ledger")]).then(__webpack_require__.bind(null, /*! ./views/SignTransactionLedger.vue */ "./src/views/SignTransactionLedger.vue"));
const CashlinkCreate = () => Promise.all(/*! import() | cashlink */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("cashlink")]).then(__webpack_require__.bind(null, /*! ./views/CashlinkCreate.vue */ "./src/views/CashlinkCreate.vue"));
const CashlinkManage = () => Promise.all(/*! import() | cashlink */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("cashlink")]).then(__webpack_require__.bind(null, /*! ./views/CashlinkManage.vue */ "./src/views/CashlinkManage.vue"));
const Checkout = () => Promise.all(/*! import() | checkout */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("checkout~sign-transaction-ledger"), __webpack_require__.e("checkout")]).then(__webpack_require__.bind(null, /*! ./views/Checkout.vue */ "./src/views/Checkout.vue"));
const CheckoutTransmission = () => Promise.all(/*! import() | checkout */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("checkout~sign-transaction-ledger"), __webpack_require__.e("checkout")]).then(__webpack_require__.bind(null, /*! ./views/CheckoutTransmission.vue */ "./src/views/CheckoutTransmission.vue"));
const ChooseAddress = () => Promise.all(/*! import() | choose-address */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566"), __webpack_require__.e("choose-address")]).then(__webpack_require__.bind(null, /*! ./views/ChooseAddress.vue */ "./src/views/ChooseAddress.vue"));
const Signup = () => Promise.all(/*! import() | onboarding */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("onboarding")]).then(__webpack_require__.bind(null, /*! ./views/Signup.vue */ "./src/views/Signup.vue"));
const SignupSuccess = () => Promise.all(/*! import() | onboarding */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("onboarding")]).then(__webpack_require__.bind(null, /*! ./views/SignupSuccess.vue */ "./src/views/SignupSuccess.vue"));
const SignupLedger = () => Promise.all(/*! import() | add-ledger */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("activate-btc-ledger~add-ledger~refund-swap-ledger~sign-btc-transaction-ledger~sign-transaction-ledge~bf179231"), __webpack_require__.e("add-account~add-ledger~rename"), __webpack_require__.e("add-account~add-ledger"), __webpack_require__.e("add-ledger")]).then(__webpack_require__.bind(null, /*! ./views/SignupLedger.vue */ "./src/views/SignupLedger.vue"));
const Login = () => Promise.all(/*! import() | onboarding */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("onboarding")]).then(__webpack_require__.bind(null, /*! ./views/Login.vue */ "./src/views/Login.vue"));
const LoginSuccess = () => Promise.all(/*! import() | onboarding */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("onboarding")]).then(__webpack_require__.bind(null, /*! ./views/LoginSuccess.vue */ "./src/views/LoginSuccess.vue"));
const Export = () => Promise.all(/*! import() | export */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("export")]).then(__webpack_require__.bind(null, /*! ./views/Export.vue */ "./src/views/Export.vue"));
const ExportSuccess = () => Promise.all(/*! import() | export */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("export")]).then(__webpack_require__.bind(null, /*! ./views/ExportSuccess.vue */ "./src/views/ExportSuccess.vue"));
const ChangePassword = () => __webpack_require__.e(/*! import() | change-password */ "change-password").then(__webpack_require__.bind(null, /*! ./views/ChangePassword.vue */ "./src/views/ChangePassword.vue"));
const Logout = () => Promise.all(/*! import() | logout */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("logout")]).then(__webpack_require__.bind(null, /*! ./views/Logout.vue */ "./src/views/Logout.vue"));
const LogoutSuccess = () => Promise.all(/*! import() | logout */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("logout")]).then(__webpack_require__.bind(null, /*! ./views/LogoutSuccess.vue */ "./src/views/LogoutSuccess.vue"));
const LogoutLedger = () => Promise.all(/*! import() | logout-ledger */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("logout-ledger")]).then(__webpack_require__.bind(null, /*! ./views/LogoutLedger.vue */ "./src/views/LogoutLedger.vue"));
const AddAccount = () => Promise.all(/*! import() | add-account */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-account~add-ledger~rename"), __webpack_require__.e("add-account~add-ledger"), __webpack_require__.e("add-account")]).then(__webpack_require__.bind(null, /*! ./views/AddAccount.vue */ "./src/views/AddAccount.vue"));
const AddAccountSelection = () => Promise.all(/*! import() | add-account */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-account~add-ledger~rename"), __webpack_require__.e("add-account~add-ledger"), __webpack_require__.e("add-account")]).then(__webpack_require__.bind(null, /*! ./views/AddAccountSelection.vue */ "./src/views/AddAccountSelection.vue"));
const AddAddressLedger = () => Promise.all(/*! import() | add-ledger */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("activate-btc-ledger~add-ledger~refund-swap-ledger~sign-btc-transaction-ledger~sign-transaction-ledge~bf179231"), __webpack_require__.e("add-account~add-ledger~rename"), __webpack_require__.e("add-account~add-ledger"), __webpack_require__.e("add-ledger")]).then(__webpack_require__.bind(null, /*! ./views/AddAddressLedger.vue */ "./src/views/AddAddressLedger.vue"));
const OnboardingSelector = () => Promise.all(/*! import() | onboarding */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("onboarding")]).then(__webpack_require__.bind(null, /*! ./views/OnboardingSelector.vue */ "./src/views/OnboardingSelector.vue"));
const Rename = () => Promise.all(/*! import() | rename */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-account~add-ledger~rename"), __webpack_require__.e("rename")]).then(__webpack_require__.bind(null, /*! ./views/Rename.vue */ "./src/views/Rename.vue"));
const AddVestingContract = () => Promise.all(/*! import() | add-vesting-contract */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("add-vesting-contract")]).then(__webpack_require__.bind(null, /*! ./views/AddVestingContract.vue */ "./src/views/AddVestingContract.vue"));
const Migrate = () => Promise.all(/*! import() | migrate */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("migrate")]).then(__webpack_require__.bind(null, /*! ./views/Migrate.vue */ "./src/views/Migrate.vue"));
const SignMessage = () => Promise.all(/*! import() | sign-message */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("sign-message")]).then(__webpack_require__.bind(null, /*! ./views/SignMessage.vue */ "./src/views/SignMessage.vue"));
const SignMessageSuccess = () => Promise.all(/*! import() | sign-message */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("sign-message")]).then(__webpack_require__.bind(null, /*! ./views/SignMessageSuccess.vue */ "./src/views/SignMessageSuccess.vue"));
const SimpleSuccess = () => Promise.all(/*! import() | common */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("common")]).then(__webpack_require__.bind(null, /*! ./views/SimpleSuccess.vue */ "./src/views/SimpleSuccess.vue"));
const ErrorHandler = () => Promise.all(/*! import() | common */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("common")]).then(__webpack_require__.bind(null, /*! ./views/ErrorHandler.vue */ "./src/views/ErrorHandler.vue"));
const RequestError = () => Promise.all(/*! import() | request-error */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("request-error")]).then(__webpack_require__.bind(null, /*! ./views/RequestError.vue */ "./src/views/RequestError.vue"));
const ErrorHandlerUnsupportedLedger = () => Promise.all(/*! import() | unsupported-ledger */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("unsupported-ledger")]).then(__webpack_require__.bind(null, /*! ./views/ErrorHandlerUnsupportedLedger.vue */ "./src/views/ErrorHandlerUnsupportedLedger.vue"));
const SignBtcTransaction = () => Promise.all(/*! import() | sign-btc-transaction */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566"), __webpack_require__.e("sign-btc-transaction")]).then(__webpack_require__.bind(null, /*! ./views/SignBtcTransaction.vue */ "./src/views/SignBtcTransaction.vue"));
const SignBtcTransactionSuccess = () => Promise.all(/*! import() | sign-btc-transaction */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566"), __webpack_require__.e("sign-btc-transaction")]).then(__webpack_require__.bind(null, /*! ./views/SignBtcTransactionSuccess.vue */ "./src/views/SignBtcTransactionSuccess.vue"));
const SignBtcTransactionLedger = () => Promise.all(/*! import() | sign-btc-transaction-ledger */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566"), __webpack_require__.e("activate-btc-ledger~add-ledger~refund-swap-ledger~sign-btc-transaction-ledger~sign-transaction-ledge~bf179231"), __webpack_require__.e("sign-btc-transaction-ledger")]).then(__webpack_require__.bind(null, /*! ./views/SignBtcTransactionLedger.vue */ "./src/views/SignBtcTransactionLedger.vue"));
const ActivateBitcoin = () => Promise.all(/*! import() | activate-btc */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566"), __webpack_require__.e("activate-btc")]).then(__webpack_require__.bind(null, /*! ./views/ActivateBitcoin.vue */ "./src/views/ActivateBitcoin.vue"));
const ActivateBitcoinSuccess = () => Promise.all(/*! import() | activate-btc */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566"), __webpack_require__.e("activate-btc")]).then(__webpack_require__.bind(null, /*! ./views/ActivateBitcoinSuccess.vue */ "./src/views/ActivateBitcoinSuccess.vue"));
const ActivateBitcoinLedger = () => Promise.all(/*! import() | activate-btc-ledger */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("activate-btc-ledger~add-ledger~refund-swap-ledger~sign-btc-transaction-ledger~sign-transaction-ledge~bf179231"), __webpack_require__.e("activate-btc-ledger")]).then(__webpack_require__.bind(null, /*! ./views/ActivateBitcoinLedger.vue */ "./src/views/ActivateBitcoinLedger.vue"));
const SetupSwap = () => Promise.all(/*! import() | swap */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566"), __webpack_require__.e("swap~swap-ledger"), __webpack_require__.e("swap")]).then(__webpack_require__.bind(null, /*! ./views/SetupSwap.vue */ "./src/views/SetupSwap.vue"));
const SetupSwapSuccess = () => Promise.all(/*! import() | swap */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566"), __webpack_require__.e("swap~swap-ledger"), __webpack_require__.e("swap")]).then(__webpack_require__.bind(null, /*! ./views/SetupSwapSuccess.vue */ "./src/views/SetupSwapSuccess.vue"));
const RefundSwap = () => Promise.all(/*! import() | swap */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566"), __webpack_require__.e("swap~swap-ledger"), __webpack_require__.e("swap")]).then(__webpack_require__.bind(null, /*! ./views/RefundSwap.vue */ "./src/views/RefundSwap.vue"));
const RefundSwapSuccess = () => Promise.all(/*! import() | swap */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566"), __webpack_require__.e("swap~swap-ledger"), __webpack_require__.e("swap")]).then(__webpack_require__.bind(null, /*! ./views/RefundSwapSuccess.vue */ "./src/views/RefundSwapSuccess.vue"));
const SetupSwapLedger = () => Promise.all(/*! import() | swap-ledger */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566"), __webpack_require__.e("activate-btc-ledger~add-ledger~refund-swap-ledger~sign-btc-transaction-ledger~sign-transaction-ledge~bf179231"), __webpack_require__.e("swap~swap-ledger"), __webpack_require__.e("refund-swap-ledger~swap-ledger"), __webpack_require__.e("swap-ledger")]).then(__webpack_require__.bind(null, /*! ./views/SetupSwapLedger.vue */ "./src/views/SetupSwapLedger.vue"));
const RefundSwapLedger = () => Promise.all(/*! import() | refund-swap-ledger */[__webpack_require__.e("activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"), __webpack_require__.e("add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"), __webpack_require__.e("activate-btc~choose-address~refund-swap-ledger~sign-btc-transaction~sign-btc-transaction-ledger~swap~5a272566"), __webpack_require__.e("activate-btc-ledger~add-ledger~refund-swap-ledger~sign-btc-transaction-ledger~sign-transaction-ledge~bf179231"), __webpack_require__.e("refund-swap-ledger~swap-ledger"), __webpack_require__.e("refund-swap-ledger")]).then(__webpack_require__.bind(null, /*! ./views/RefundSwapLedger.vue */ "./src/views/RefundSwapLedger.vue"));
vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]);
function keyguardResponseRouter(command, originalRequestType) {
    let resolve = '';
    switch (command) {
        case _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__["KeyguardCommand"].CREATE:
            resolve = `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGNUP}-success`;
            break;
        case _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__["KeyguardCommand"].IMPORT:
            resolve = `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGIN}-success`;
            break;
        case _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__["KeyguardCommand"].REMOVE:
            resolve = `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGOUT}-success`;
            break;
        case _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__["KeyguardCommand"].SIGN_TRANSACTION:
            // The SIGN_TRANSACTION Keyguard command is used by Hub's SIGN_TRANSACTION, CHECKOUT,
            // CASHLINK and REFUND_SWAP. Thus we return the user to the respective handler component
            resolve = originalRequestType === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CREATE_CASHLINK
                ? _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].MANAGE_CASHLINK
                : `${originalRequestType}-success`;
            break;
        case _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__["KeyguardCommand"].EXPORT:
            resolve = `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].EXPORT}-success`;
            break;
        case _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__["KeyguardCommand"].CHANGE_PASSWORD:
            resolve = `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHANGE_PASSWORD}-success`;
            break;
        case _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__["KeyguardCommand"].DERIVE_ADDRESS:
            resolve = `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ADD_ADDRESS}-selection`;
            break;
        case _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__["KeyguardCommand"].SIGN_MESSAGE:
            // The SIGN_MESSAGE Keyguard command is used by Hub's SIGN_MESSAGE and
            // NIMIQ_ID (future). Thus we return the user to the respective handler component
            resolve = `${originalRequestType}-success`;
            break;
        case _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__["KeyguardCommand"].SIGN_BTC_TRANSACTION:
            // The SIGN_BTC_TRANSACTION Keyguard command is used by Hub's SIGN_BTC_TRANSACTION, CHECKOUT
            // and REFUND_SWAP. Thus we return the user to the respective handler component
            resolve = `${originalRequestType}-success`;
            break;
        case _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__["KeyguardCommand"].DERIVE_BTC_XPUB:
            resolve = `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ACTIVATE_BITCOIN}-success`;
            break;
        case _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__["KeyguardCommand"].SIGN_SWAP:
            resolve = `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SETUP_SWAP}-success`;
            break;
        default:
            throw new Error(`router.keyguardResponseRouter not defined for Keyguard command: ${command}`);
    }
    return {
        resolve,
        reject: 'error',
    };
}
// Static routes names
const REQUEST_ERROR = 'request-error';
const ERROR = 'error';
/* harmony default export */ __webpack_exports__["default"] = (new vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]({
    mode: 'history',
    base: "/",
    routes: [
        {
            path: `/${ERROR}`,
            component: ErrorHandler,
            name: ERROR,
        },
        {
            path: `/${REQUEST_ERROR}`,
            component: RequestError,
            name: REQUEST_ERROR,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_TRANSACTION}`,
            component: SignTransaction,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_TRANSACTION,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_TRANSACTION}/success`,
            component: SignTransactionSuccess,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_TRANSACTION}-success`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_TRANSACTION}/ledger`,
            component: SignTransactionLedger,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_TRANSACTION}-ledger`,
        },
        {
            path: `/cashlink/create`,
            component: CashlinkCreate,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CREATE_CASHLINK,
        },
        {
            path: `/cashlink/manage`,
            component: CashlinkManage,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].MANAGE_CASHLINK,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHECKOUT}`,
            component: Checkout,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHECKOUT,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHECKOUT}/success`,
            component: CheckoutTransmission,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHECKOUT}-success`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ONBOARD}`,
            component: OnboardingSelector,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ONBOARD,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGNUP}`,
            component: Signup,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGNUP,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGNUP}/success`,
            component: SignupSuccess,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGNUP}-success`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGNUP}/ledger`,
            component: SignupLedger,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGNUP}-ledger`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGIN}`,
            component: Login,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGIN,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGIN}/success`,
            component: LoginSuccess,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGIN}-success`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].EXPORT}`,
            component: Export,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].EXPORT,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].EXPORT}/success`,
            component: ExportSuccess,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].EXPORT}-success`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].EXPORT}/ledger`,
            component: ErrorHandlerUnsupportedLedger,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].EXPORT}-ledger`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHANGE_PASSWORD}`,
            component: ChangePassword,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHANGE_PASSWORD,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHANGE_PASSWORD}/success`,
            component: SimpleSuccess,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHANGE_PASSWORD}-success`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHANGE_PASSWORD}/ledger`,
            component: ErrorHandlerUnsupportedLedger,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHANGE_PASSWORD}-ledger`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGOUT}`,
            component: Logout,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGOUT,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGOUT}/success`,
            component: LogoutSuccess,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGOUT}-success`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGOUT}/ledger`,
            component: LogoutLedger,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGOUT}-ledger`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ADD_ADDRESS}`,
            component: AddAccount,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ADD_ADDRESS,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ADD_ADDRESS}/selection`,
            component: AddAccountSelection,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ADD_ADDRESS}-selection`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ADD_ADDRESS}/ledger`,
            component: AddAddressLedger,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ADD_ADDRESS}-ledger`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].RENAME}`,
            component: Rename,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].RENAME,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ADD_VESTING_CONTRACT}`,
            component: AddVestingContract,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ADD_VESTING_CONTRACT,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].MIGRATE}`,
            component: Migrate,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].MIGRATE,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHOOSE_ADDRESS}`,
            component: ChooseAddress,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHOOSE_ADDRESS,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_MESSAGE}`,
            component: SignMessage,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_MESSAGE,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_MESSAGE}/success`,
            component: SignMessageSuccess,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_MESSAGE}-success`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_MESSAGE}/ledger`,
            component: ErrorHandlerUnsupportedLedger,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_BTC_TRANSACTION}`,
            component: SignBtcTransaction,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_BTC_TRANSACTION,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_BTC_TRANSACTION}/success`,
            component: SignBtcTransactionSuccess,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_BTC_TRANSACTION}-success`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_BTC_TRANSACTION}/ledger`,
            component: SignBtcTransactionLedger,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_BTC_TRANSACTION}-ledger`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ACTIVATE_BITCOIN}`,
            component: ActivateBitcoin,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ACTIVATE_BITCOIN,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ACTIVATE_BITCOIN}/success`,
            component: ActivateBitcoinSuccess,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ACTIVATE_BITCOIN}-success`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ACTIVATE_BITCOIN}/ledger`,
            component: ActivateBitcoinLedger,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ACTIVATE_BITCOIN}-ledger`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SETUP_SWAP}`,
            component: SetupSwap,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SETUP_SWAP,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SETUP_SWAP}/success`,
            component: SetupSwapSuccess,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SETUP_SWAP}-success`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SETUP_SWAP}/ledger`,
            component: SetupSwapLedger,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SETUP_SWAP}-ledger`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].REFUND_SWAP}`,
            component: RefundSwap,
            name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].REFUND_SWAP,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].REFUND_SWAP}/success`,
            component: RefundSwapSuccess,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].REFUND_SWAP}-success`,
        },
        {
            path: `/${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].REFUND_SWAP}/ledger`,
            component: RefundSwapLedger,
            name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].REFUND_SWAP}-ledger`,
        },
    ],
}));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/iesiyok/projects/acc-js/development/nimiq2/hub/src/main.ts */"./src/main.ts");


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
//# sourceMappingURL=index-legacy.js.map