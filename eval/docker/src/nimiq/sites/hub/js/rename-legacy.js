(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["rename"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Rename.vue?vue&type=script&lang=ts&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Rename.vue?vue&type=script&lang=ts& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Input_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Input.vue */ "./src/components/Input.vue");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");









/*
    In Case some sort auf Authentication with the wallet is desireable, there are 2 options:
        1.  is to have the user enter the password at the very beginning. This would require the Hub to
            first redirect to the Keyguard. After returning and validating (sign message) this component would come
            into view.
        2.  is to have the user enter his Password as confirmation of the changes (sign message and validate). That
            would move the storeLabels function into a RenameSuccess Component where the store and return happens.
*/
let Rename = class Rename extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.wallet = null;
        this.labelsStored = false;
    }
    async mounted() {
        this.wallet = (await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_7__["WalletStore"].Instance.get(this.request.walletId));
        // Wait for the next tick to update the DOM, then focus the correct label
        vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"].nextTick(this.focusElement);
    }
    focusElement() {
        if (this.request.address) { // Account with address this.request.address was selected
            const el = this.$refs.accountList;
            el.focus(this.request.address);
        }
        else { // A wallet was selected
            if (this.wallet.type !== _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEGACY) {
                const el = this.$refs.wallet;
                el.focus();
            }
        }
    }
    get accountsAndContractsArray() {
        if (!this.wallet)
            return [];
        return [
            ...this.wallet.accounts.values(),
            ...this.wallet.contracts,
        ];
    }
    get addressesArray() {
        return this.accountsAndContractsArray.map((acc) => acc.userFriendlyAddress);
    }
    accountChanged(address, label) {
        const addressInfo = this.wallet.accounts.get(address);
        if (addressInfo) {
            addressInfo.label = label || addressInfo.defaultLabel;
            this.wallet.accounts.set(address, addressInfo);
            return;
        }
        const contractInfo = this.wallet.findContractByAddress(Nimiq.Address.fromString(address));
        if (contractInfo) {
            contractInfo.label = label || contractInfo.defaultLabel;
            this.wallet.setContract(contractInfo);
            return;
        }
        throw new Error('UNEXPECTED: Address that was changed does not exist');
    }
    onWalletLabelChange(label) {
        this.wallet.label = label || this.wallet.defaultLabel;
    }
    storeLabels() {
        _lib_WalletStore__WEBPACK_IMPORTED_MODULE_7__["WalletStore"].Instance.put(this.wallet);
        this.labelsStored = true;
        setTimeout(() => this.done(), _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].SUCCESS_REDIRECT_DELAY);
    }
    async done() {
        const result = await this.wallet.toAccountType();
        this.$rpc.resolve(result);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_8__["Static"]
], Rename.prototype, "request", void 0);
Rename = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: {
            AccountRing: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["AccountRing"],
            AccountList: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["AccountList"],
            SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"],
            PageHeader: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageHeader"],
            PageBody: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageBody"],
            PageFooter: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageFooter"],
            Input: _components_Input_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
            StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
            GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
        } })
], Rename);
/* harmony default export */ __webpack_exports__["default"] = (Rename);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Rename.vue?vue&type=template&id=5a990a10&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Rename.vue?vue&type=template&id=5a990a10&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
        { staticClass: "rename" },
        [
          _c("PageHeader", [_vm._v(_vm._s(_vm.$t('199')))]),
          _vm.wallet
            ? _c(
                "PageBody",
                [
                  _vm.wallet.type !== 1 /* LEGACY */
                    ? _c(
                        "div",
                        { staticClass: "wallet-label" },
                        [
                          _c("AccountRing", {
                            attrs: { addresses: _vm.addressesArray }
                          }),
                          _c("Input", {
                            ref: "wallet",
                            attrs: {
                              value: _vm.wallet.label,
                              placeholder: _vm.wallet.defaultLabel
                            },
                            on: { changed: _vm.onWalletLabelChange }
                          })
                        ],
                        1
                      )
                    : _vm._e(),
                  _c("AccountList", {
                    ref: "accountList",
                    attrs: {
                      walletId: _vm.wallet.id,
                      accounts: _vm.accountsAndContractsArray,
                      editable: true
                    },
                    on: { "account-changed": _vm.accountChanged }
                  })
                ],
                1
              )
            : _vm._e(),
          _c("PageFooter", [
            _c(
              "button",
              {
                staticClass: "nq-button light-blue",
                on: { click: _vm.storeLabels }
              },
              [_vm._v(_vm._s(_vm.$t('206')))]
            )
          ]),
          _vm.labelsStored
            ? _c("StatusScreen", {
                staticClass: "grow-from-bottom-button",
                attrs: { state: "success", title: _vm.$t('21') }
              })
            : _vm._e()
        ],
        1
      ),
      _c("GlobalClose", { attrs: { hidden: _vm.labelsStored } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Rename.vue?vue&type=style&index=0&id=5a990a10&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Rename.vue?vue&type=style&index=0&id=5a990a10&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.rename[data-v-5a990a10] {\n    position: relative;\n}\n.page-body[data-v-5a990a10] {\n    padding: 0;\n}\n.wallet-icon[data-v-5a990a10] {\n    width: 3rem;\n    height: 3rem;\n    margin-right: 1rem;\n}\n.wallet-label[data-v-5a990a10] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    font-size: 2.25rem;\n    line-height: 2.5rem;\n    font-weight: 500;\n    margin: 0 3rem;\n    padding: 2rem 1rem;\n}\n[data-v-5a990a10] .label-input {\n    font-weight: 600;\n}\n.wallet-label .label-input[data-v-5a990a10] {\n    font-weight: bold;\n    font-size: 2.5rem;\n}\n[data-v-5a990a10] .label-input input {\n    padding: .5rem 0 .5rem 1rem;\n}\n[data-v-5a990a10] .label-input .width-finder {\n    padding: 0 1.25rem; /* input padding + border-width */\n}\n[data-v-5a990a10] .amount {\n    display: none; /* Hide balances in list, as they may be terribly out-of-date */\n}\n.account-ring[data-v-5a990a10] {\n    margin-right: 2rem;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.status-screen[data-v-5a990a10] {\n    white-space: nowrap;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Rename.vue?vue&type=style&index=0&id=5a990a10&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Rename.vue?vue&type=style&index=0&id=5a990a10&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Rename.vue?vue&type=style&index=0&id=5a990a10&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Rename.vue?vue&type=style&index=0&id=5a990a10&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("af8ae4b4", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/views/Rename.vue":
/*!******************************!*\
  !*** ./src/views/Rename.vue ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Rename_vue_vue_type_template_id_5a990a10_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rename.vue?vue&type=template&id=5a990a10&scoped=true& */ "./src/views/Rename.vue?vue&type=template&id=5a990a10&scoped=true&");
/* harmony import */ var _Rename_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Rename.vue?vue&type=script&lang=ts& */ "./src/views/Rename.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _Rename_vue_vue_type_style_index_0_id_5a990a10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Rename.vue?vue&type=style&index=0&id=5a990a10&scoped=true&lang=css& */ "./src/views/Rename.vue?vue&type=style&index=0&id=5a990a10&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Rename_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Rename_vue_vue_type_template_id_5a990a10_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Rename_vue_vue_type_template_id_5a990a10_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5a990a10",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/Rename.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/Rename.vue?vue&type=script&lang=ts&":
/*!*******************************************************!*\
  !*** ./src/views/Rename.vue?vue&type=script&lang=ts& ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Rename_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Rename.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Rename.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Rename_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/Rename.vue?vue&type=style&index=0&id=5a990a10&scoped=true&lang=css&":
/*!***************************************************************************************!*\
  !*** ./src/views/Rename.vue?vue&type=style&index=0&id=5a990a10&scoped=true&lang=css& ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Rename_vue_vue_type_style_index_0_id_5a990a10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Rename.vue?vue&type=style&index=0&id=5a990a10&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Rename.vue?vue&type=style&index=0&id=5a990a10&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Rename_vue_vue_type_style_index_0_id_5a990a10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Rename_vue_vue_type_style_index_0_id_5a990a10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Rename_vue_vue_type_style_index_0_id_5a990a10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Rename_vue_vue_type_style_index_0_id_5a990a10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Rename_vue_vue_type_style_index_0_id_5a990a10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/Rename.vue?vue&type=template&id=5a990a10&scoped=true&":
/*!*************************************************************************!*\
  !*** ./src/views/Rename.vue?vue&type=template&id=5a990a10&scoped=true& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Rename_vue_vue_type_template_id_5a990a10_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Rename.vue?vue&type=template&id=5a990a10&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Rename.vue?vue&type=template&id=5a990a10&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Rename_vue_vue_type_template_id_5a990a10_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Rename_vue_vue_type_template_id_5a990a10_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=rename-legacy.js.map