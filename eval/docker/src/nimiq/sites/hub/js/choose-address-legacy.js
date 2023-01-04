(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["choose-address"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ChooseAddress.vue?vue&type=script&lang=ts&":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChooseAddress.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
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
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _lib_WalletInfoCollector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/WalletInfoCollector */ "./src/lib/WalletInfoCollector.ts");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/WalletStore */ "./src/lib/WalletStore.ts");











let ChooseAddress = class ChooseAddress extends _BitcoinSyncBaseView_vue__WEBPACK_IMPORTED_MODULE_4__["default"] {
    async created() {
        if (this.processedWallets.length === 0) {
            this.goToOnboarding(true);
        }
    }
    async accountSelected(walletId, address) {
        const walletInfo = this.findWallet(walletId);
        if (!walletInfo) {
            console.error('UNEXPECTED: Selected walletId not found:', walletId);
            return;
        }
        const accountOrContractInfo = walletInfo.accounts.get(address) ||
            walletInfo.findContractByAddress(Nimiq.Address.fromString(address));
        this.$setActiveAccount({
            walletId: walletInfo.id,
            userFriendlyAddress: accountOrContractInfo.userFriendlyAddress,
        });
        let btcAddress;
        if (this.request.returnBtcAddress && walletInfo.btcXPub) {
            this.state = this.State.SYNCING;
            // const startIndex = Math.max(Math.min(
            //     walletInfo.btcAddresses.external.findIndex((addressInfo) => !addressInfo.used),
            //     walletInfo.btcAddresses.internal.findIndex((addressInfo) => !addressInfo.used),
            // ), 0);
            let btcAddresses;
            try {
                btcAddresses = await _lib_WalletInfoCollector__WEBPACK_IMPORTED_MODULE_9__["default"].detectBitcoinAddresses(walletInfo.btcXPub, /* startIndex */ 0);
            }
            catch (error) {
                this.state = this.State.SYNCING_FAILED;
                this.error = error.message;
                return;
            }
            walletInfo.btcAddresses = btcAddresses;
            await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_10__["WalletStore"].Instance.put(walletInfo);
            const unusedExternalAddresses = btcAddresses.external.filter((addressInfo) => !addressInfo.used);
            if (unusedExternalAddresses.length > 0) {
                // We try to use the 2nd unused address, because the first is reserved for swaps and not displayed
                // in the wallet (cannot be validated by the user).
                btcAddress = unusedExternalAddresses[Math.min(unusedExternalAddresses.length - 1, 1)].address;
            }
        }
        const result = {
            address: accountOrContractInfo.userFriendlyAddress,
            label: accountOrContractInfo.label,
            btcAddress,
        };
        this.$rpc.resolve(result);
    }
    goToOnboarding(useReplace) {
        // Redirect to onboarding
        _lib_StaticStore__WEBPACK_IMPORTED_MODULE_8__["default"].originalRouteName = _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["RequestType"].CHOOSE_ADDRESS;
        if (useReplace) {
            this.$router.replace({ name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["RequestType"].ONBOARD });
        }
        this.$router.push({ name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_7__["RequestType"].ONBOARD });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_8__["Static"]
], ChooseAddress.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], ChooseAddress.prototype, "findWallet", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], ChooseAddress.prototype, "processedWallets", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vuex_class__WEBPACK_IMPORTED_MODULE_2__["Mutation"])('setActiveAccount')
], ChooseAddress.prototype, "$setActiveAccount", void 0);
ChooseAddress = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { AccountSelector: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["AccountSelector"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["SmallPage"], StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__["default"], GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_6__["default"] } })
], ChooseAddress);
/* harmony default export */ __webpack_exports__["default"] = (ChooseAddress);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ChooseAddress.vue?vue&type=template&id=6c741793&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChooseAddress.vue?vue&type=template&id=6c741793&scoped=true& ***!
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
          _c("h1", { staticClass: "nq-h1" }, [
            _vm._v(_vm._s(_vm.$t('64')))
          ]),
          _c("div", { staticClass: "request-info nq-text" }, [
            _vm._v(
              " " +
                _vm._s(
                  _vm.$t("0", {
                    appName: _vm.request.appName
                  })
                ) +
                " "
            )
          ]),
          _c("AccountSelector", {
            attrs: {
              wallets: _vm.processedWallets,
              minBalance: _vm.request.minBalance,
              disableContracts: _vm.request.disableContracts,
              disableLegacyAccounts: _vm.request.disableLegacyAccounts,
              disableBip39Accounts: _vm.request.disableBip39Accounts,
              disableLedgerAccounts: _vm.request.disableLedgerAccounts,
              highlightBitcoinAccounts: _vm.request.returnBtcAddress
            },
            on: {
              "account-selected": _vm.accountSelected,
              login: function() {
                return _vm.goToOnboarding(false)
              }
            }
          }),
          _vm.state !== _vm.State.NONE
            ? _c("StatusScreen", {
                attrs: {
                  state: _vm.statusScreenState,
                  title: _vm.statusScreenTitle,
                  status: _vm.statusScreenStatus,
                  message: _vm.statusScreenMessage,
                  mainAction: _vm.statusScreenAction,
                  lightBlue: !_vm.useDarkSyncStatusScreen
                },
                on: { "main-action": _vm._statusScreenActionHandler }
              })
            : _vm._e()
        ],
        1
      ),
      _c("GlobalClose")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ChooseAddress.vue?vue&type=style&index=0&id=6c741793&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChooseAddress.vue?vue&type=style&index=0&id=6c741793&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.small-page[data-v-6c741793] {\n    position: relative;\n}\n.nq-h1[data-v-6c741793] {\n    margin-top: 3.5rem;\n    margin-bottom: 1rem;\n    line-height: 1;\n    text-align: center;\n}\n.request-info[data-v-6c741793] {\n    text-align: center;\n    margin-left: 2rem;\n    margin-right: 2rem;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.status-screen[data-v-6c741793] {\n    position: absolute;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ChooseAddress.vue?vue&type=style&index=0&id=6c741793&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ChooseAddress.vue?vue&type=style&index=0&id=6c741793&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./ChooseAddress.vue?vue&type=style&index=0&id=6c741793&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ChooseAddress.vue?vue&type=style&index=0&id=6c741793&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("b724a294", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/views/ChooseAddress.vue":
/*!*************************************!*\
  !*** ./src/views/ChooseAddress.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ChooseAddress_vue_vue_type_template_id_6c741793_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChooseAddress.vue?vue&type=template&id=6c741793&scoped=true& */ "./src/views/ChooseAddress.vue?vue&type=template&id=6c741793&scoped=true&");
/* harmony import */ var _ChooseAddress_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChooseAddress.vue?vue&type=script&lang=ts& */ "./src/views/ChooseAddress.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _ChooseAddress_vue_vue_type_style_index_0_id_6c741793_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChooseAddress.vue?vue&type=style&index=0&id=6c741793&scoped=true&lang=css& */ "./src/views/ChooseAddress.vue?vue&type=style&index=0&id=6c741793&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ChooseAddress_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ChooseAddress_vue_vue_type_template_id_6c741793_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ChooseAddress_vue_vue_type_template_id_6c741793_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6c741793",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/ChooseAddress.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/ChooseAddress.vue?vue&type=script&lang=ts&":
/*!**************************************************************!*\
  !*** ./src/views/ChooseAddress.vue?vue&type=script&lang=ts& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChooseAddress_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./ChooseAddress.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ChooseAddress.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChooseAddress_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/ChooseAddress.vue?vue&type=style&index=0&id=6c741793&scoped=true&lang=css&":
/*!**********************************************************************************************!*\
  !*** ./src/views/ChooseAddress.vue?vue&type=style&index=0&id=6c741793&scoped=true&lang=css& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChooseAddress_vue_vue_type_style_index_0_id_6c741793_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./ChooseAddress.vue?vue&type=style&index=0&id=6c741793&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ChooseAddress.vue?vue&type=style&index=0&id=6c741793&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChooseAddress_vue_vue_type_style_index_0_id_6c741793_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChooseAddress_vue_vue_type_style_index_0_id_6c741793_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChooseAddress_vue_vue_type_style_index_0_id_6c741793_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChooseAddress_vue_vue_type_style_index_0_id_6c741793_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChooseAddress_vue_vue_type_style_index_0_id_6c741793_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/ChooseAddress.vue?vue&type=template&id=6c741793&scoped=true&":
/*!********************************************************************************!*\
  !*** ./src/views/ChooseAddress.vue?vue&type=template&id=6c741793&scoped=true& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChooseAddress_vue_vue_type_template_id_6c741793_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./ChooseAddress.vue?vue&type=template&id=6c741793&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/ChooseAddress.vue?vue&type=template&id=6c741793&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChooseAddress_vue_vue_type_template_id_6c741793_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChooseAddress_vue_vue_type_template_id_6c741793_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=choose-address-legacy.js.map