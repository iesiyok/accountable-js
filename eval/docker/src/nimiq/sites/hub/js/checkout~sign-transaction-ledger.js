(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["checkout~sign-transaction-ledger"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=script&lang=ts&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GlobalClose.vue?vue&type=script&lang=ts& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");





let GlobalClose = class GlobalClose extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    get effectiveButtonLabel() {
        if (this.buttonLabel)
            return this.buttonLabel;
        // Special handling for some specific known app names to be able to adapt translations depending on the app,
        // for example to adapt to an app's gender in a language (e.g. German: "Zurück zur Wallet", "Zurück zum Miner").
        // Note that the app names that should not be translated are specified as a slot.
        const appName = this.request.appName;
        switch (appName) {
            case 'Accounts': return this.$t('37'); // Nimiq Safe
            case 'Wallet': return this.$t('31', { Wallet: appName });
            case 'Nimiq Miner': return this.$t('30', { 'Nimiq Miner': appName });
            case 'Nimiq Faucet': return this.$t('29', { 'Nimiq Faucet': appName });
            case 'Donation Button Creator': return this.$t('36');
            case 'Nimiq Gift Card': return this.$t('38');
            case 'Nimiq Vote': return this.$t('39');
            case 'CryptoPayment.link': return this.$t('35');
            default: return this.$t('28', { appName });
        }
    }
    get effectiveCloseHandler() {
        return !this.hidden
            ? this.onClose || (() => this.$rpc.reject(new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_3__["ERROR_CANCELED"])))
            : () => void 0;
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(String)
], GlobalClose.prototype, "buttonLabel", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(Function)
], GlobalClose.prototype, "onClose", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(Boolean)
], GlobalClose.prototype, "hidden", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__["Static"]
], GlobalClose.prototype, "request", void 0);
GlobalClose = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { ArrowLeftSmallIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["ArrowLeftSmallIcon"] } })
], GlobalClose);
/* harmony default export */ __webpack_exports__["default"] = (GlobalClose);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    "button",
    {
      staticClass: "global-close nq-button-s",
      class: { hidden: _vm.hidden },
      on: { click: _vm.effectiveCloseHandler }
    },
    [
      _c("ArrowLeftSmallIcon"),
      _vm._v(" " + _vm._s(_vm.effectiveButtonLabel) + " ")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.global-close[data-v-d78638d6] {\n    margin-top: 8rem;\n    margin-bottom: 3rem;\n    background: transparent !important;\n    opacity: 0.4;\n    font-size: 2rem;\n    -webkit-transition: color .3s var(--nimiq-ease), opacity .3s var(--nimiq-ease), visibility .3s;\n    transition: color .3s var(--nimiq-ease), opacity .3s var(--nimiq-ease), visibility .3s;\n}\n.global-close[data-v-d78638d6]:hover,\n.global-close[data-v-d78638d6]:focus {\n    color: var(--nimiq-light-blue);\n    opacity: 1;\n}\n.global-close.hidden[data-v-d78638d6] {\n    visibility: hidden;\n    pointer-events: none;\n    opacity: 0;\n}\n.nq-icon[data-v-d78638d6] {\n    vertical-align: top;\n    width: 1.375rem;\n    height: 1.125rem;\n    margin-right: 0.25rem;\n    margin-top: 1.125rem;\n    -webkit-transition: -webkit-transform .3s var(--nimiq-ease);\n    transition: -webkit-transform .3s var(--nimiq-ease);\n    transition: transform .3s var(--nimiq-ease);\n    transition: transform .3s var(--nimiq-ease), -webkit-transform .3s var(--nimiq-ease);\n}\n.global-close:hover .nq-icon[data-v-d78638d6],\n.global-close:focus .nq-icon[data-v-d78638d6] {\n    -webkit-transform: translate3D(-0.25rem, 0, 0);\n            transform: translate3D(-0.25rem, 0, 0);\n}\n@media (max-width: 450px) {\n.global-close[data-v-d78638d6] {\n        position: absolute;\n        right: 1rem;\n        top: 2.4rem;\n        margin: 0;\n}\n.global-close[data-v-d78638d6]::before {\n        /* avoid that the button overflows the page, causing vertical scrolling on mobile */\n        right: -1rem;\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("71f0508c", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/GlobalClose.vue":
/*!****************************************!*\
  !*** ./src/components/GlobalClose.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GlobalClose_vue_vue_type_template_id_d78638d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true& */ "./src/components/GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true&");
/* harmony import */ var _GlobalClose_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GlobalClose.vue?vue&type=script&lang=ts& */ "./src/components/GlobalClose.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css& */ "./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _GlobalClose_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GlobalClose_vue_vue_type_template_id_d78638d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GlobalClose_vue_vue_type_template_id_d78638d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d78638d6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/GlobalClose.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/GlobalClose.vue?vue&type=script&lang=ts&":
/*!*****************************************************************!*\
  !*** ./src/components/GlobalClose.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./GlobalClose.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css&":
/*!*************************************************************************************************!*\
  !*** ./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true&":
/*!***********************************************************************************!*\
  !*** ./src/components/GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_template_id_d78638d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_template_id_d78638d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_template_id_d78638d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/lib/CheckoutServerApi.ts":
/*!**************************************!*\
  !*** ./src/lib/CheckoutServerApi.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CheckoutServerApi; });
/* harmony import */ var _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Helpers */ "./src/lib/Helpers.ts");


class CheckoutServerApi {
    static async fetchTime(endPoint, csrfToken) {
        const value = await CheckoutServerApi.getState(endPoint, csrfToken);
        return value.time;
    }
    static async fetchPaymentOption(endPoint, currency, type, csrfToken) {
        let fetchedData;
        if (history.state[currency]) {
            // Retrieve the data from state if already fetched
            fetchedData = history.state[currency];
        }
        else {
            const requestData = new URLSearchParams();
            requestData.append('currency', currency);
            requestData.append('command', 'set_currency');
            fetchedData = await CheckoutServerApi._fetchData(endPoint, requestData, csrfToken);
            // Store in state in case this fetch gets repeated (also after reload and history.back)
            history.replaceState({
                ...history.state,
                [currency]: fetchedData,
            }, '');
        }
        if (currency !== fetchedData.currency || type !== fetchedData.type) {
            throw new Error('Unexpected: fetch did not return the correct currency/type combination');
        }
        return fetchedData;
    }
    static async getState(endPoint, csrfToken) {
        if (CheckoutServerApi._getStatePromise)
            return CheckoutServerApi._getStatePromise;
        const data = new URLSearchParams();
        data.append('command', 'get_state');
        CheckoutServerApi._getStatePromise = CheckoutServerApi._fetchData(endPoint, data, csrfToken).then((value) => {
            // Clear cached request after 3 seconds
            window.setTimeout(() => CheckoutServerApi._getStatePromise = null, 3000);
            value.time = Object(_Helpers__WEBPACK_IMPORTED_MODULE_1__["isMilliseconds"])(value.time) ? value.time : value.time * 1000;
            return value;
        }, (e) => {
            CheckoutServerApi._getStatePromise = null;
            return Promise.reject(e);
        });
        return CheckoutServerApi._getStatePromise;
    }
    static async _fetchData(endPoint, requestData, csrfToken) {
        requestData.append('csrf', csrfToken);
        const headers = new Headers();
        const init = {
            method: 'POST',
            headers,
            body: requestData,
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
        };
        let fetchResponse;
        try {
            // First we try to send the request with 'credentials: include', which includes cookies
            // and auth headers in cross-origin requests, but in turn requires the server to set
            // the 'Access-Control-Allow-Credentials: true' header.
            const fetchRequest = new Request(endPoint, init);
            fetchResponse = await fetch(fetchRequest);
        }
        catch (err) {
            // If the previous request with included credentials fails, we try again with the
            // credentials omitted (default for cross-origin requests). Some implementations might
            // not have the header set, because they don't require cookies or auth headers for
            // authenticating the webhook.
            delete init.credentials;
            const fetchRequest = new Request(endPoint, init);
            fetchResponse = await fetch(fetchRequest);
        }
        if (!fetchResponse.ok) {
            if ( false
                || document.referrer === 'https://hub.nimiq-testnet.com/demos.html') {
                // Use fake data in local development or deployed testnet hub demo page if we have no checkout server
                console.warn('Using dummy data instead of actual checkout server.');
                return this._generateDummyData(requestData);
            }
            let errorMsg = '';
            try {
                errorMsg = (await fetchResponse.json()).error;
            }
            catch (error) {
                // Ignore
            }
            throw new Error(`Callback Error: ${fetchResponse.status} - ${errorMsg || fetchResponse.statusText}`);
        }
        const fetchedData = await fetchResponse.json();
        if (fetchedData.error) {
            throw new Error(fetchedData.error);
        }
        return fetchedData;
    }
    static _generateDummyData(requestData) {
        if (requestData.get('command') === 'get_state') {
            return {
                time: Date.now(),
                // Change these to true and PAID for simulating a successfull payment
                payment_accepted: false,
                payment_state: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_0__["PaymentState"].NOT_FOUND,
            };
        }
        else if (requestData.get('command') === 'set_currency') {
            const now = Date.now();
            const options = [
                {
                    currency: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_0__["Currency"].BTC,
                    type: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_0__["PaymentType"].DIRECT,
                    amount: '.0002e8',
                    vendorMarkup: -.05,
                    expires: now + 15 * 60000,
                    protocolSpecific: {
                        feePerByte: 2,
                        recipient: '17w6ar5SqXFGr786WjGHB8xyu48eujHaBe',
                    },
                },
                {
                    currency: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_0__["Currency"].NIM,
                    type: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_0__["PaymentType"].DIRECT,
                    amount: '1e5',
                    expires: now + 15 * 60000,
                    protocolSpecific: {
                        fee: 50000,
                        recipient: 'NQ09 VF5Y 1PKV MRM4 5LE1 55KV P6R2 GXYJ XYQF',
                    },
                },
                {
                    currency: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_0__["Currency"].ETH,
                    type: _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_0__["PaymentType"].DIRECT,
                    amount: '.0023e18',
                    vendorMarkup: .03,
                    expires: now + 15 * 60000,
                    protocolSpecific: {
                        gasLimit: 21000,
                        gasPrice: '3e9',
                        recipient: '0xa4725d6477644286b354288b51122a808389be83',
                    },
                },
            ];
            const requestedOption = options.find((option) => option.currency === requestData.get('currency'));
            return {
                time: now,
                ...requestedOption,
            };
        }
    }
}
CheckoutServerApi._getStatePromise = null;


/***/ })

}]);
//# sourceMappingURL=checkout~sign-transaction-ledger.js.map