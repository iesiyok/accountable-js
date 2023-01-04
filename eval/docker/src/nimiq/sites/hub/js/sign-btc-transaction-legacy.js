(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sign-btc-transaction"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransaction.vue?vue&type=script&lang=ts&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignBtcTransaction.vue?vue&type=script&lang=ts& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _BitcoinSyncBaseView_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BitcoinSyncBaseView.vue */ "./src/views/BitcoinSyncBaseView.vue");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");









let SignBtcTransaction = class SignBtcTransaction extends _BitcoinSyncBaseView_vue__WEBPACK_IMPORTED_MODULE_3__["default"] {
    async created() {
        if (this.request.kind !== _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_6__["RequestType"].SIGN_BTC_TRANSACTION) {
            if (history.length >= 3) {
                // First history entry is root, the second an original request handler invoking the transaction signing
                // and the third is this one. If there was an original request handler calling us but the intermediate
                // transaction signing request was lost on reload and instead the original request recovered from the
                // RPC state, navigate back to the original request handler.
                // TODO implementing a proper request call stack instead of the originalRouteName hack would avoid this
                history.back();
            }
            else {
                this.$rpc.reject(new Error(`Unexpected request ${this.request.kind}`));
            }
            return;
        }
        const walletInfo = this.findWallet(this.request.walletId);
        if (!walletInfo.btcXPub || !walletInfo.btcAddresses || !walletInfo.btcAddresses.external.length) {
            this.$rpc.reject(new Error(`Account does not have any Bitcoin addresses`));
            return;
        }
        const inputs = [];
        let changeOutput;
        try {
            // Note that the sync state will only be visible in the UI if the sync is not instant (if we actually sync)
            this.state = this.State.SYNCING;
            for (const input of this.request.inputs) {
                let keyPath;
                if (input.keyPath) {
                    keyPath = input.keyPath;
                }
                else {
                    const addressInfo = await walletInfo.findBtcAddressInfo(input.address);
                    if (!addressInfo) {
                        this.$rpc.reject(new Error(`Input address not found: ${input.address}`));
                        return;
                    }
                    keyPath = addressInfo.path;
                }
                inputs.push({
                    keyPath,
                    transactionHash: input.transactionHash,
                    outputIndex: input.outputIndex,
                    outputScript: input.outputScript,
                    witnessScript: input.witnessScript,
                    value: input.value,
                    sequence: input.sequence,
                });
            }
            if (this.request.changeOutput) {
                const addressInfo = await walletInfo.findBtcAddressInfo(this.request.changeOutput.address);
                if (!addressInfo) {
                    this.$rpc.reject(new Error(`Change address not found: ${this.request.changeOutput.address}`));
                    return;
                }
                changeOutput = {
                    keyPath: addressInfo.path,
                    address: addressInfo.address,
                    value: this.request.changeOutput.value,
                };
            }
            this.state = this.State.NONE;
        }
        catch (e) {
            this.state = this.State.SYNCING_FAILED;
            this.error = e.message || e;
            return;
        }
        this._signBtcTransaction({
            inputs,
            changeOutput,
            recipientOutput: this.request.output,
            locktime: this.request.locktime,
        }, walletInfo);
    }
    _signBtcTransaction(transactionInfo, walletInfo) {
        // note that this method gets overwritten for SignBtcTransactionLedger
        const request = {
            layout: 'standard',
            appName: this.request.appName,
            ...transactionInfo,
            keyId: walletInfo.keyId,
            keyLabel: walletInfo.labelForKeyguard,
        };
        // staticStore.keyguardRequest = request; // Currently not used in SignBtcTransactionSuccess
        const client = this.$rpc.createKeyguardClient(true);
        client.signBtcTransaction(request);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_7__["Static"]
], SignBtcTransaction.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_8__["Getter"]
], SignBtcTransaction.prototype, "findWallet", void 0);
SignBtcTransaction = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"], GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_5__["default"] } }) // including components used in parent class
], SignBtcTransaction);
/* harmony default export */ __webpack_exports__["default"] = (SignBtcTransaction);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransactionSuccess.vue?vue&type=script&lang=ts&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignBtcTransactionSuccess.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");



let SignBtcTransactionSuccess = class SignBtcTransactionSuccess extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    async mounted() {
        const result = {
            serializedTx: this.keyguardResult.raw,
            hash: this.keyguardResult.transactionHash,
        };
        this.$rpc.resolve(result);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["State"]
], SignBtcTransactionSuccess.prototype, "keyguardResult", void 0);
SignBtcTransactionSuccess = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"]
], SignBtcTransactionSuccess);
/* harmony default export */ __webpack_exports__["default"] = (SignBtcTransactionSuccess);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransactionSuccess.vue?vue&type=template&id=8c8a0f22&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignBtcTransactionSuccess.vue?vue&type=template&id=8c8a0f22& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/views/SignBtcTransaction.vue":
/*!******************************************!*\
  !*** ./src/views/SignBtcTransaction.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SignBtcTransaction_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignBtcTransaction.vue?vue&type=script&lang=ts& */ "./src/views/SignBtcTransaction.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _SignBtcTransaction_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/SignBtcTransaction.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/SignBtcTransaction.vue?vue&type=script&lang=ts&":
/*!*******************************************************************!*\
  !*** ./src/views/SignBtcTransaction.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransaction_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignBtcTransaction.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransaction.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransaction_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/SignBtcTransactionSuccess.vue":
/*!*************************************************!*\
  !*** ./src/views/SignBtcTransactionSuccess.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SignBtcTransactionSuccess_vue_vue_type_template_id_8c8a0f22___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignBtcTransactionSuccess.vue?vue&type=template&id=8c8a0f22& */ "./src/views/SignBtcTransactionSuccess.vue?vue&type=template&id=8c8a0f22&");
/* harmony import */ var _SignBtcTransactionSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SignBtcTransactionSuccess.vue?vue&type=script&lang=ts& */ "./src/views/SignBtcTransactionSuccess.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SignBtcTransactionSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SignBtcTransactionSuccess_vue_vue_type_template_id_8c8a0f22___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SignBtcTransactionSuccess_vue_vue_type_template_id_8c8a0f22___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/SignBtcTransactionSuccess.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/SignBtcTransactionSuccess.vue?vue&type=script&lang=ts&":
/*!**************************************************************************!*\
  !*** ./src/views/SignBtcTransactionSuccess.vue?vue&type=script&lang=ts& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignBtcTransactionSuccess.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransactionSuccess.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/SignBtcTransactionSuccess.vue?vue&type=template&id=8c8a0f22&":
/*!********************************************************************************!*\
  !*** ./src/views/SignBtcTransactionSuccess.vue?vue&type=template&id=8c8a0f22& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionSuccess_vue_vue_type_template_id_8c8a0f22___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignBtcTransactionSuccess.vue?vue&type=template&id=8c8a0f22& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransactionSuccess.vue?vue&type=template&id=8c8a0f22&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionSuccess_vue_vue_type_template_id_8c8a0f22___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionSuccess_vue_vue_type_template_id_8c8a0f22___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=sign-btc-transaction-legacy.js.map