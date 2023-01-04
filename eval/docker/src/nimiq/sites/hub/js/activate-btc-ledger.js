(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["activate-btc-ledger"],{

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

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ActivateBitcoinLedger.vue?vue&type=script&lang=ts&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ActivateBitcoinLedger.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ActivateBitcoin_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ActivateBitcoin.vue */ "./src/views/ActivateBitcoin.vue");
/* harmony import */ var _components_NotEnoughCookieSpace_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/NotEnoughCookieSpace.vue */ "./src/components/NotEnoughCookieSpace.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/LedgerUi.vue */ "./src/components/LedgerUi.vue");
/* harmony import */ var _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nimiq/ledger-api */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../store */ "./src/store.ts");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");












let ActivateBitcoinLedger = class ActivateBitcoinLedger extends _ActivateBitcoin_vue__WEBPACK_IMPORTED_MODULE_3__["default"] {
    async _startBtcXpubRequest() {
        const bitcoinXPub = await _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_7__["default"].Bitcoin.getExtendedPublicKey(_lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_11__["BTC_ACCOUNT_KEY_PATH"][config__WEBPACK_IMPORTED_MODULE_8__["default"].bitcoinAddressType][config__WEBPACK_IMPORTED_MODULE_8__["default"].bitcoinNetwork]);
        // Mimic a keyguardResult to be able to reuse ActivateBitcoinSuccess
        const result = { bitcoinXPub };
        _store__WEBPACK_IMPORTED_MODULE_9__["default"].commit('setKeyguardResult', result);
        this.$router.replace({ name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].ACTIVATE_BITCOIN}-success` });
    }
};
ActivateBitcoinLedger = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"], GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_5__["default"], LedgerUi: _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_6__["default"], NotEnoughCookieSpace: _components_NotEnoughCookieSpace_vue__WEBPACK_IMPORTED_MODULE_4__["default"] } })
], ActivateBitcoinLedger);
/* harmony default export */ __webpack_exports__["default"] = (ActivateBitcoinLedger);


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

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ActivateBitcoinLedger.vue?vue&type=template&id=18f4d3ac&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ActivateBitcoinLedger.vue?vue&type=template&id=18f4d3ac& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.notEnoughCookieSpace
    ? _c("NotEnoughCookieSpace")
    : _c(
        "div",
        { staticClass: "container" },
        [_c("SmallPage", [_c("LedgerUi")], 1), _c("GlobalClose")],
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

/***/ "./src/views/ActivateBitcoinLedger.vue":
/*!*********************************************!*\
  !*** ./src/views/ActivateBitcoinLedger.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ActivateBitcoinLedger_vue_vue_type_template_id_18f4d3ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActivateBitcoinLedger.vue?vue&type=template&id=18f4d3ac& */ "./src/views/ActivateBitcoinLedger.vue?vue&type=template&id=18f4d3ac&");
/* harmony import */ var _ActivateBitcoinLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActivateBitcoinLedger.vue?vue&type=script&lang=ts& */ "./src/views/ActivateBitcoinLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ActivateBitcoinLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActivateBitcoinLedger_vue_vue_type_template_id_18f4d3ac___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ActivateBitcoinLedger_vue_vue_type_template_id_18f4d3ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/ActivateBitcoinLedger.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/ActivateBitcoinLedger.vue?vue&type=script&lang=ts&":
/*!**********************************************************************!*\
  !*** ./src/views/ActivateBitcoinLedger.vue?vue&type=script&lang=ts& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivateBitcoinLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./ActivateBitcoinLedger.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ActivateBitcoinLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivateBitcoinLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/ActivateBitcoinLedger.vue?vue&type=template&id=18f4d3ac&":
/*!****************************************************************************!*\
  !*** ./src/views/ActivateBitcoinLedger.vue?vue&type=template&id=18f4d3ac& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivateBitcoinLedger_vue_vue_type_template_id_18f4d3ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./ActivateBitcoinLedger.vue?vue&type=template&id=18f4d3ac& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ActivateBitcoinLedger.vue?vue&type=template&id=18f4d3ac&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivateBitcoinLedger_vue_vue_type_template_id_18f4d3ac___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivateBitcoinLedger_vue_vue_type_template_id_18f4d3ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=activate-btc-ledger.js.map