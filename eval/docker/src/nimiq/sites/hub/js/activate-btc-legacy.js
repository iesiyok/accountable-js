(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["activate-btc"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/NotEnoughCookieSpace.vue?vue&type=script&lang=ts&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NotEnoughCookieSpace.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");





let NotEnoughCookieSpace = class NotEnoughCookieSpace extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    onContinue() {
        this.$rpc.reject(new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_4__["ERROR_COOKIE_SPACE"]));
    }
};
NotEnoughCookieSpace = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { StatusScreen: _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"] } })
], NotEnoughCookieSpace);
/* harmony default export */ __webpack_exports__["default"] = (NotEnoughCookieSpace);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ActivateBitcoin.vue?vue&type=script&lang=ts&":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ActivateBitcoin.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _lib_CookieHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/CookieHelper */ "./src/lib/CookieHelper.ts");
/* harmony import */ var _components_NotEnoughCookieSpace_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/NotEnoughCookieSpace.vue */ "./src/components/NotEnoughCookieSpace.vue");
/* harmony import */ var _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");










let ActivateBitcoin = class ActivateBitcoin extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.notEnoughCookieSpace = false;
    }
    async created() {
        const walletInfo = this.findWallet(this.request.walletId);
        if (walletInfo.type === _lib_Constants__WEBPACK_IMPORTED_MODULE_8__["WalletType"].LEGACY) {
            throw new Error('Cannot enable Bitcoin for legacy accounts');
        }
        if (_nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["BrowserDetection"].isIOS() || _nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["BrowserDetection"].isSafari()) {
            // Dummy xpub, to test space in cookie
            const walletInfoEntry = {
                ...walletInfo.toObject(),
                btcXPub: 'xpub6H1LXWLaKsWFhvm6RVpEL9P4KfRZSW7abD2ttkWP3SSQvnyA8FSVqNTEcYFgJS2UaFcxupHiYkro49S8yGasTvXEYBVPamhGW6cFJodrTHy',
            };
            this.notEnoughCookieSpace = !(await _lib_CookieHelper__WEBPACK_IMPORTED_MODULE_5__["default"].canFitNewWallets([walletInfoEntry]));
            if (this.notEnoughCookieSpace)
                return;
        }
        this._startBtcXpubRequest(walletInfo.keyId);
    }
    _startBtcXpubRequest(keyId) {
        // note that this method gets overwritten for ActivateBitcoinLedger
        const keyguardRequest = {
            appName: this.request.appName,
            keyId,
            bitcoinXPubPath: _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_7__["BTC_ACCOUNT_KEY_PATH"][config__WEBPACK_IMPORTED_MODULE_9__["default"].bitcoinAddressType][config__WEBPACK_IMPORTED_MODULE_9__["default"].bitcoinNetwork],
        };
        const client = this.$rpc.createKeyguardClient(true);
        client.deriveBtcXPub(keyguardRequest);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__["Static"]
], ActivateBitcoin.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], ActivateBitcoin.prototype, "findWallet", void 0);
ActivateBitcoin = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { NotEnoughCookieSpace: _components_NotEnoughCookieSpace_vue__WEBPACK_IMPORTED_MODULE_6__["default"] } })
], ActivateBitcoin);
/* harmony default export */ __webpack_exports__["default"] = (ActivateBitcoin);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ActivateBitcoinSuccess.vue?vue&type=script&lang=ts&":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ActivateBitcoinSuccess.vue?vue&type=script&lang=ts& ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
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
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _lib_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinUtils */ "./src/lib/bitcoin/BitcoinUtils.ts");
/* harmony import */ var _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");
/* harmony import */ var _lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinJSLoader */ "./src/lib/bitcoin/BitcoinJSLoader.ts");













let ActivateBitcoinSuccess = class ActivateBitcoinSuccess extends _BitcoinSyncBaseView_vue__WEBPACK_IMPORTED_MODULE_4__["default"] {
    get State() {
        return {
            ...super.State,
            TRANSITION_SYNCING: 'transition-syncing',
            FINISHED: 'finished',
        };
    }
    async created() {
        const walletInfo = this.findWallet(this.request.walletId);
        if (!walletInfo) {
            throw new Error(`UNEXPECTED: accountId not found anymore in ActivateBitcoinSuccess (${this.request.walletId})`);
        }
        this.state = walletInfo.type === _lib_Constants__WEBPACK_IMPORTED_MODULE_5__["WalletType"].LEDGER
            ? this.State.TRANSITION_SYNCING // set ui state from which to transition to SYNCING state
            : this.State.SYNCING;
        this.useDarkSyncStatusScreen = walletInfo.type === _lib_Constants__WEBPACK_IMPORTED_MODULE_5__["WalletType"].LEDGER;
        await Object(_lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_12__["loadBitcoinJS"])();
        const btcAddresses = {
            external: Object(_lib_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_10__["deriveAddressesFromXPub"])(this.keyguardResult.bitcoinXPub, [_lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__["EXTERNAL_INDEX"]], 0, _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__["BTC_ACCOUNT_MAX_ALLOWED_ADDRESS_GAP"]),
            internal: Object(_lib_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_10__["deriveAddressesFromXPub"])(this.keyguardResult.bitcoinXPub, [_lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__["INTERNAL_INDEX"]], 0, _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__["BTC_ACCOUNT_MAX_ALLOWED_ADDRESS_GAP"]),
        };
        walletInfo.btcXPub = this.keyguardResult.bitcoinXPub;
        walletInfo.btcAddresses = btcAddresses;
        _lib_WalletStore__WEBPACK_IMPORTED_MODULE_6__["WalletStore"].Instance.put(walletInfo);
        const result = await walletInfo.toAccountType();
        this.state = this.State.FINISHED;
        setTimeout(() => { this.$rpc.resolve(result); }, _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].SUCCESS_REDIRECT_DELAY);
    }
    mounted() {
        if (this.state !== this.State.TRANSITION_SYNCING)
            return;
        // For Ledger transition UI after first rendering a state that replicates ActivateBitcoinLedger for a smooth
        // transition between the two views.
        requestAnimationFrame(() => this.state = this.State.SYNCING);
    }
    get statusScreenState() {
        if (this.state === this.State.FINISHED)
            return _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.SUCCESS;
        return super.statusScreenState;
    }
    get statusScreenTitle() {
        switch (this.state) {
            case this.State.TRANSITION_SYNCING:
                return this.$t('124');
            case this.State.FINISHED:
                return this.$t('45');
            default:
                return super.statusScreenTitle;
        }
    }
    get isGlobalCloseShown() {
        return this.state === this.State.TRANSITION_SYNCING || super.isGlobalCloseShown;
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_7__["Static"]
], ActivateBitcoinSuccess.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["State"]
], ActivateBitcoinSuccess.prototype, "keyguardResult", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], ActivateBitcoinSuccess.prototype, "findWallet", void 0);
ActivateBitcoinSuccess = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["SmallPage"], GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_9__["default"] } }) // including components used in parent class
], ActivateBitcoinSuccess);
/* harmony default export */ __webpack_exports__["default"] = (ActivateBitcoinSuccess);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2& ***!
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
  return _c(
    "div",
    { staticClass: "container" },
    [
      _c(
        "SmallPage",
        [
          _c("StatusScreen", {
            attrs: {
              state: "error",
              title: _vm.$t('11'),
              message: _vm.$t(
                '253'
              ),
              mainAction: _vm.$t('97')
            },
            on: { "main-action": _vm.onContinue }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ActivateBitcoin.vue?vue&type=template&id=6eeac3e1&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ActivateBitcoin.vue?vue&type=template&id=6eeac3e1& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.notEnoughCookieSpace ? _c("NotEnoughCookieSpace") : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/components/NotEnoughCookieSpace.vue":
/*!*************************************************!*\
  !*** ./src/components/NotEnoughCookieSpace.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotEnoughCookieSpace_vue_vue_type_template_id_04d2d0e2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2& */ "./src/components/NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2&");
/* harmony import */ var _NotEnoughCookieSpace_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotEnoughCookieSpace.vue?vue&type=script&lang=ts& */ "./src/components/NotEnoughCookieSpace.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NotEnoughCookieSpace_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotEnoughCookieSpace_vue_vue_type_template_id_04d2d0e2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NotEnoughCookieSpace_vue_vue_type_template_id_04d2d0e2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/NotEnoughCookieSpace.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/NotEnoughCookieSpace.vue?vue&type=script&lang=ts&":
/*!**************************************************************************!*\
  !*** ./src/components/NotEnoughCookieSpace.vue?vue&type=script&lang=ts& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotEnoughCookieSpace_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./NotEnoughCookieSpace.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/NotEnoughCookieSpace.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotEnoughCookieSpace_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2&":
/*!********************************************************************************!*\
  !*** ./src/components/NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotEnoughCookieSpace_vue_vue_type_template_id_04d2d0e2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotEnoughCookieSpace_vue_vue_type_template_id_04d2d0e2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotEnoughCookieSpace_vue_vue_type_template_id_04d2d0e2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/lib/CookieHelper.ts":
/*!*********************************!*\
  !*** ./src/lib/CookieHelper.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CookieHelper; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _CookieJar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CookieJar */ "./src/lib/CookieJar.ts");
/* harmony import */ var _WalletStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WalletStore */ "./src/lib/WalletStore.ts");
// tslint:disable no-bitwise no-shadowed-variable



class CookieHelper {
    static async canFitNewWallets(wallets) {
        const [canHubCookieFitNewWallets, canKeyguardCookieFitNewWallets] = await Promise.all([
            _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].canFitNewWallets(wallets),
            CookieHelper._canKeyguardCookieFitNewKey(),
        ]);
        return canHubCookieFitNewWallets && canKeyguardCookieFitNewWallets;
    }
    static async _canKeyguardCookieFitNewKey() {
        const wallets = await _WalletStore__WEBPACK_IMPORTED_MODULE_2__["WalletStore"].Instance.list();
        const nonLedgerWallets = wallets.filter((wallet) => wallet.type !== _Constants__WEBPACK_IMPORTED_MODULE_0__["WalletType"].LEDGER);
        const cookieSize = (nonLedgerWallets.length + 1) * this.KEYGUARD_COOKIE_KEY_SIZE;
        return cookieSize <= this.MAX_COOKIE_SIZE_KEYGUARD;
    }
}
CookieHelper.MAX_COOKIE_SIZE_KEYGUARD = 4000; // byte
CookieHelper.KEYGUARD_COOKIE_KEY_SIZE = 47; // 1 char for type, 1 for hasPin, 44 for id, 1 for separator


/***/ }),

/***/ "./src/views/ActivateBitcoin.vue":
/*!***************************************!*\
  !*** ./src/views/ActivateBitcoin.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ActivateBitcoin_vue_vue_type_template_id_6eeac3e1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActivateBitcoin.vue?vue&type=template&id=6eeac3e1& */ "./src/views/ActivateBitcoin.vue?vue&type=template&id=6eeac3e1&");
/* harmony import */ var _ActivateBitcoin_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActivateBitcoin.vue?vue&type=script&lang=ts& */ "./src/views/ActivateBitcoin.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ActivateBitcoin_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActivateBitcoin_vue_vue_type_template_id_6eeac3e1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ActivateBitcoin_vue_vue_type_template_id_6eeac3e1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/ActivateBitcoin.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/ActivateBitcoin.vue?vue&type=script&lang=ts&":
/*!****************************************************************!*\
  !*** ./src/views/ActivateBitcoin.vue?vue&type=script&lang=ts& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivateBitcoin_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./ActivateBitcoin.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ActivateBitcoin.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivateBitcoin_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/ActivateBitcoin.vue?vue&type=template&id=6eeac3e1&":
/*!**********************************************************************!*\
  !*** ./src/views/ActivateBitcoin.vue?vue&type=template&id=6eeac3e1& ***!
  \**********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivateBitcoin_vue_vue_type_template_id_6eeac3e1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./ActivateBitcoin.vue?vue&type=template&id=6eeac3e1& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ActivateBitcoin.vue?vue&type=template&id=6eeac3e1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivateBitcoin_vue_vue_type_template_id_6eeac3e1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivateBitcoin_vue_vue_type_template_id_6eeac3e1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/views/ActivateBitcoinSuccess.vue":
/*!**********************************************!*\
  !*** ./src/views/ActivateBitcoinSuccess.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ActivateBitcoinSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActivateBitcoinSuccess.vue?vue&type=script&lang=ts& */ "./src/views/ActivateBitcoinSuccess.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _ActivateBitcoinSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/ActivateBitcoinSuccess.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/ActivateBitcoinSuccess.vue?vue&type=script&lang=ts&":
/*!***********************************************************************!*\
  !*** ./src/views/ActivateBitcoinSuccess.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivateBitcoinSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./ActivateBitcoinSuccess.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ActivateBitcoinSuccess.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivateBitcoinSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ })

}]);
//# sourceMappingURL=activate-btc-legacy.js.map