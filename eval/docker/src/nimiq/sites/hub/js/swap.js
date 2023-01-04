(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["swap"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwap.vue?vue&type=script&lang=ts&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/RefundSwap.vue?vue&type=script&lang=ts& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _BitcoinSyncBaseView_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BitcoinSyncBaseView.vue */ "./src/views/BitcoinSyncBaseView.vue");
/* harmony import */ var _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nimiq/keyguard-client */ "./node_modules/@nimiq/keyguard-client/dist/KeyguardClient.es.js");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @nimiq/fastspot-api */ "./node_modules/@nimiq/fastspot-api/dist/index.js");











let RefundSwap = class RefundSwap extends _BitcoinSyncBaseView_vue__WEBPACK_IMPORTED_MODULE_4__["default"] {
    async created() {
        if (this.request.kind !== _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_8__["RequestType"].REFUND_SWAP) {
            // can happen for RefundSwapLedger and is handled there
            return;
        }
        const request = this.request;
        const refundInfo = request.refund;
        const account = this.findWallet(request.walletId); // existence checked in RpcApi
        if (refundInfo.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_10__["SwapAsset"].NIM) {
            const { sender, recipient, value, fee, extraData: data, validityStartHeight } = refundInfo;
            const signer = account.findSignerForAddress(recipient);
            if (!signer) {
                this.$rpc.reject(new Error(`Unknown recipient ${refundInfo.recipient}`));
                return;
            }
            const signRequest = {
                appName: request.appName,
                keyId: account.keyId,
                keyLabel: account.labelForKeyguard,
                keyPath: signer.path,
                sender: sender.serialize(),
                senderType: Nimiq.Account.Type.HTLC,
                senderLabel: 'Swap HTLC',
                // My address, must be refund address of HTLC. Send to signer as recipient might be a contract.
                recipient: signer.address.serialize(),
                recipientLabel: signer.label,
                value,
                fee,
                data,
                validityStartHeight,
            };
            this._signTransaction(signRequest);
        }
        if (refundInfo.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_10__["SwapAsset"].BTC) {
            let signerKeyPath;
            try {
                // Note that the sync state will only be visible in UI if the sync is not instant (if we actually sync)
                this.state = this.State.SYNCING;
                let didDeriveAddresses = false;
                let addressInfo = account.findBtcAddressInfo(refundInfo.refundAddress);
                if (addressInfo instanceof Promise) {
                    didDeriveAddresses = true;
                    addressInfo = await addressInfo;
                }
                if (!addressInfo) {
                    this.$rpc.reject(new Error(`Refund address not found: ${refundInfo.refundAddress}`));
                    return;
                }
                signerKeyPath = addressInfo.path;
                if (!await account.findBtcAddressInfo(refundInfo.output.address, !didDeriveAddresses)) {
                    this.$rpc.reject(new Error(`Output address not found: ${refundInfo.output.address}`));
                    return;
                }
                this.state = this.State.NONE;
            }
            catch (e) {
                this.state = this.State.SYNCING_FAILED;
                this.error = e.message || e;
                return;
            }
            const signRequest = {
                appName: request.appName,
                keyId: account.keyId,
                keyLabel: account.labelForKeyguard,
                inputs: [{
                        ...refundInfo.input,
                        keyPath: signerKeyPath,
                        type: _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_5__["BitcoinTransactionInputType"].HTLC_REFUND,
                    }],
                recipientOutput: {
                    ...refundInfo.output,
                    label: account.label,
                },
            };
            this._signTransaction(signRequest);
        }
    }
    _signTransaction(request) {
        // Note that this method gets overwritten in RefundSwapLedger
        const client = this.$rpc.createKeyguardClient(true);
        if ('sender' in request) {
            // Nimiq request
            client.signTransaction(request);
        }
        else {
            // Bitcoin request
            client.signBtcTransaction(request);
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_9__["Static"]
], RefundSwap.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], RefundSwap.prototype, "findWallet", void 0);
RefundSwap = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["SmallPage"], GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_7__["default"] } }) // including components used in parent class
], RefundSwap);
/* harmony default export */ __webpack_exports__["default"] = (RefundSwap);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwapSuccess.vue?vue&type=script&lang=ts&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/RefundSwapSuccess.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/fastspot-api */ "./node_modules/@nimiq/fastspot-api/dist/index.js");
/* harmony import */ var _components_Network_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Network.vue */ "./src/components/Network.vue");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _lib_MerkleTreePatch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/MerkleTreePatch */ "./src/lib/MerkleTreePatch.ts");







let SignBtcTransactionSuccess = class SignBtcTransactionSuccess extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    async mounted() {
        if ('signature' in this.keyguardResult && this.request.refund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_3__["SwapAsset"].NIM) {
            const tx = await this.$refs.network.createTx(Object.assign({
                signerPubKey: this.keyguardResult.publicKey,
            }, this.keyguardResult, this.request.refund, {
                senderType: Nimiq.Account.Type.HTLC,
            }));
            const proof = new Nimiq.SerialBuffer(1 + tx.proof.length);
            proof.writeUint8(Nimiq.HashedTimeLockedContract.ProofType.TIMEOUT_RESOLVE);
            proof.write(new Nimiq.SerialBuffer(tx.proof)); // Current tx.proof is a regular SignatureProof
            tx.proof = proof;
            // Validate that the transaction is valid
            Object(_lib_MerkleTreePatch__WEBPACK_IMPORTED_MODULE_6__["default"])();
            if (!tx.verify()) {
                this.$rpc.reject(new Error('NIM transaction is invalid'));
                return;
            }
            const result = await this.$refs.network.makeSignTransactionResult(tx);
            this.$rpc.resolve(result);
        }
        if ('transactionHash' in this.keyguardResult) {
            const result = {
                serializedTx: this.keyguardResult.raw,
                hash: this.keyguardResult.transactionHash,
            };
            this.$rpc.resolve(result);
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_5__["Static"]
], SignBtcTransactionSuccess.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["State"]
], SignBtcTransactionSuccess.prototype, "keyguardResult", void 0);
SignBtcTransactionSuccess = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { Network: _components_Network_vue__WEBPACK_IMPORTED_MODULE_4__["default"] } })
], SignBtcTransactionSuccess);
/* harmony default export */ __webpack_exports__["default"] = (SignBtcTransactionSuccess);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwapSuccess.vue?vue&type=template&id=9b8e94e4&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/RefundSwapSuccess.vue?vue&type=template&id=9b8e94e4& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("Network", { ref: "network", attrs: { visible: false } })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/views/RefundSwap.vue":
/*!**********************************!*\
  !*** ./src/views/RefundSwap.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RefundSwap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RefundSwap.vue?vue&type=script&lang=ts& */ "./src/views/RefundSwap.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _RefundSwap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/RefundSwap.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/RefundSwap.vue?vue&type=script&lang=ts&":
/*!***********************************************************!*\
  !*** ./src/views/RefundSwap.vue?vue&type=script&lang=ts& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RefundSwap.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwap.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/RefundSwapSuccess.vue":
/*!*****************************************!*\
  !*** ./src/views/RefundSwapSuccess.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RefundSwapSuccess_vue_vue_type_template_id_9b8e94e4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RefundSwapSuccess.vue?vue&type=template&id=9b8e94e4& */ "./src/views/RefundSwapSuccess.vue?vue&type=template&id=9b8e94e4&");
/* harmony import */ var _RefundSwapSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RefundSwapSuccess.vue?vue&type=script&lang=ts& */ "./src/views/RefundSwapSuccess.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RefundSwapSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RefundSwapSuccess_vue_vue_type_template_id_9b8e94e4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RefundSwapSuccess_vue_vue_type_template_id_9b8e94e4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/RefundSwapSuccess.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/RefundSwapSuccess.vue?vue&type=script&lang=ts&":
/*!******************************************************************!*\
  !*** ./src/views/RefundSwapSuccess.vue?vue&type=script&lang=ts& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RefundSwapSuccess.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwapSuccess.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/RefundSwapSuccess.vue?vue&type=template&id=9b8e94e4&":
/*!************************************************************************!*\
  !*** ./src/views/RefundSwapSuccess.vue?vue&type=template&id=9b8e94e4& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapSuccess_vue_vue_type_template_id_9b8e94e4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RefundSwapSuccess.vue?vue&type=template&id=9b8e94e4& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwapSuccess.vue?vue&type=template&id=9b8e94e4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapSuccess_vue_vue_type_template_id_9b8e94e4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapSuccess_vue_vue_type_template_id_9b8e94e4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=swap.js.map