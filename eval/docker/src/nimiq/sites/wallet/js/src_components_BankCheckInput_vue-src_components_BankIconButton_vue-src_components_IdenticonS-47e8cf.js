(self["webpackChunk_nimiq_wallet"] = self["webpackChunk_nimiq_wallet"] || []).push([["src_components_BankCheckInput_vue-src_components_BankIconButton_vue-src_components_IdenticonS-47e8cf"],{

/***/ "./node_modules/@nimiq/utils/dist/module/CurrencyInfo.js":
/*!***************************************************************!*\
  !*** ./node_modules/@nimiq/utils/dist/module/CurrencyInfo.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CurrencyInfo": function() { return /* binding */ CurrencyInfo; }
/* harmony export */ });
class CurrencyInfo {
    /**
     * @param {string} currencyCode 3-letter currency code
     * @param {number} [decimals] How many decimal positions the currency has
     * @param {string} [name] The currency's name, e.g. euros
     * @param {string} [symbol] The currency's symbol, e.g. € or CA$
     * @throws If currency code is not a well-formed currency code.
     */
    constructor(currencyCode, decimals, name, symbol) {
        const formatterOptions = {
            style: 'currency',
            currency: currencyCode,
            useGrouping: false,
        };
        this.code = currencyCode.toUpperCase();
        // Note that toLocaleString throws for not well-formatted currency codes
        // (see https://www.ecma-international.org/ecma-402/1.0/#sec-6.3.1).
        // Using regex parsing instead of NumberFormat.formatToParts which has less browser support.
        let regexMatch = (0).toLocaleString('en-US', { currencyDisplay: 'symbol', ...formatterOptions }).match(CurrencyInfo.NUMBER_FORMAT_REGEX);
        this.decimals = decimals !== undefined
            ? decimals
            : regexMatch
                ? (regexMatch[2] || '').length
                : 2;
        this.symbol = symbol !== undefined
            ? symbol
            : CurrencyInfo.EXTRA_SYMBOLS[this.code] || (regexMatch && regexMatch[1]) || this.code;
        if (name !== undefined) {
            this.name = name;
            return;
        }
        regexMatch = (0).toLocaleString('en-US', { currencyDisplay: 'name', ...formatterOptions }).match(CurrencyInfo.NUMBER_FORMAT_REGEX);
        this.name = regexMatch ? regexMatch[3] || this.code : this.code;
    }
}
CurrencyInfo.EXTRA_SYMBOLS = {
    AED: 'د.إ',
    ARS: '$',
    BDT: '৳',
    BHD: 'BD',
    BMD: '$',
    CHF: 'Fr.',
    CLP: '$',
    CZK: 'Kč',
    DKK: 'Kr.',
    HUF: 'Ft',
    IDR: 'Rp',
    KWD: 'KD',
    LKR: 'Rs',
    MMK: 'K',
    MYR: 'RM',
    NOK: 'kr',
    PHP: '₱',
    PKR: '₨',
    PLN: 'zł',
    RUB: '₽',
    SAR: 'SR',
    SEK: 'kr',
    SGD: 'S$',
    THB: '฿',
    TRY: '₺',
    UAH: '₴',
    VEF: 'Bs',
    ZAR: 'R',
};
// Regex for en-US formatted currency strings (supporting both currency symbol and currency name)
CurrencyInfo.NUMBER_FORMAT_REGEX = new RegExp('^'
    + '([^\\d\\s]+)?' // currency symbol in front of number
    + '\\s?' // Potential whitespace. en-US adds a whitespace for example in 'XYZ 1.00' but not in 'CA$1.00'
    + '\\d+' // integer part with useGrouping: false
    + '(?:\\D(\\d+))?' // fractional part, can be empty
    + '(?:\\s(.+))?' // currency name after number
    + '$');


//# sourceMappingURL=CurrencyInfo.js.map


/***/ }),

/***/ "./src/components/BankCheckInput.vue":
/*!*******************************************!*\
  !*** ./src/components/BankCheckInput.vue ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BankCheckInput_vue_vue_type_template_id_4e468e2e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BankCheckInput.vue?vue&type=template&id=4e468e2e&scoped=true& */ "./src/components/BankCheckInput.vue?vue&type=template&id=4e468e2e&scoped=true&");
/* harmony import */ var _BankCheckInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BankCheckInput.vue?vue&type=script&lang=ts& */ "./src/components/BankCheckInput.vue?vue&type=script&lang=ts&");
/* harmony import */ var _BankCheckInput_vue_vue_type_style_index_0_id_4e468e2e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BankCheckInput.vue?vue&type=style&index=0&id=4e468e2e&lang=scss&scoped=true& */ "./src/components/BankCheckInput.vue?vue&type=style&index=0&id=4e468e2e&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js */ "./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BankCheckInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BankCheckInput_vue_vue_type_template_id_4e468e2e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _BankCheckInput_vue_vue_type_template_id_4e468e2e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "4e468e2e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/BankCheckInput.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/BankIconButton.vue":
/*!*******************************************!*\
  !*** ./src/components/BankIconButton.vue ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BankIconButton_vue_vue_type_template_id_37fc9b17_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BankIconButton.vue?vue&type=template&id=37fc9b17&scoped=true& */ "./src/components/BankIconButton.vue?vue&type=template&id=37fc9b17&scoped=true&");
/* harmony import */ var _BankIconButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BankIconButton.vue?vue&type=script&lang=ts& */ "./src/components/BankIconButton.vue?vue&type=script&lang=ts&");
/* harmony import */ var _BankIconButton_vue_vue_type_style_index_0_id_37fc9b17_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BankIconButton.vue?vue&type=style&index=0&id=37fc9b17&lang=scss&scoped=true& */ "./src/components/BankIconButton.vue?vue&type=style&index=0&id=37fc9b17&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js */ "./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BankIconButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BankIconButton_vue_vue_type_template_id_37fc9b17_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _BankIconButton_vue_vue_type_template_id_37fc9b17_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "37fc9b17",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/BankIconButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/IdenticonStack.vue":
/*!*******************************************!*\
  !*** ./src/components/IdenticonStack.vue ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IdenticonStack_vue_vue_type_template_id_99caa762_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IdenticonStack.vue?vue&type=template&id=99caa762&scoped=true& */ "./src/components/IdenticonStack.vue?vue&type=template&id=99caa762&scoped=true&");
/* harmony import */ var _IdenticonStack_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IdenticonStack.vue?vue&type=script&lang=ts& */ "./src/components/IdenticonStack.vue?vue&type=script&lang=ts&");
/* harmony import */ var _IdenticonStack_vue_vue_type_style_index_0_id_99caa762_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IdenticonStack.vue?vue&type=style&index=0&id=99caa762&lang=scss&scoped=true& */ "./src/components/IdenticonStack.vue?vue&type=style&index=0&id=99caa762&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js */ "./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _IdenticonStack_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IdenticonStack_vue_vue_type_template_id_99caa762_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _IdenticonStack_vue_vue_type_template_id_99caa762_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "99caa762",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/IdenticonStack.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/InteractiveShortAddress.vue":
/*!****************************************************!*\
  !*** ./src/components/InteractiveShortAddress.vue ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InteractiveShortAddress_vue_vue_type_template_id_c96e9e4c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InteractiveShortAddress.vue?vue&type=template&id=c96e9e4c&scoped=true& */ "./src/components/InteractiveShortAddress.vue?vue&type=template&id=c96e9e4c&scoped=true&");
/* harmony import */ var _InteractiveShortAddress_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InteractiveShortAddress.vue?vue&type=script&lang=ts& */ "./src/components/InteractiveShortAddress.vue?vue&type=script&lang=ts&");
/* harmony import */ var _InteractiveShortAddress_vue_vue_type_style_index_0_id_c96e9e4c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InteractiveShortAddress.vue?vue&type=style&index=0&id=c96e9e4c&lang=scss&scoped=true& */ "./src/components/InteractiveShortAddress.vue?vue&type=style&index=0&id=c96e9e4c&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js */ "./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _InteractiveShortAddress_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _InteractiveShortAddress_vue_vue_type_template_id_c96e9e4c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _InteractiveShortAddress_vue_vue_type_template_id_c96e9e4c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "c96e9e4c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/InteractiveShortAddress.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/icons/CircledQuestionMark.vue":
/*!******************************************************!*\
  !*** ./src/components/icons/CircledQuestionMark.vue ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CircledQuestionMark_vue_vue_type_template_id_61629c12_functional_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CircledQuestionMark.vue?vue&type=template&id=61629c12&functional=true& */ "./src/components/icons/CircledQuestionMark.vue?vue&type=template&id=61629c12&functional=true&");
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js */ "./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */
;
var component = (0,_node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  script,
  _CircledQuestionMark_vue_vue_type_template_id_61629c12_functional_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _CircledQuestionMark_vue_vue_type_template_id_61629c12_functional_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  true,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/icons/CircledQuestionMark.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/icons/TriangleDownIcon.vue":
/*!***************************************************!*\
  !*** ./src/components/icons/TriangleDownIcon.vue ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TriangleDownIcon_vue_vue_type_template_id_04dc52e8_scoped_true_functional_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TriangleDownIcon.vue?vue&type=template&id=04dc52e8&scoped=true&functional=true& */ "./src/components/icons/TriangleDownIcon.vue?vue&type=template&id=04dc52e8&scoped=true&functional=true&");
/* harmony import */ var _TriangleDownIcon_vue_vue_type_style_index_0_id_04dc52e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TriangleDownIcon.vue?vue&type=style&index=0&id=04dc52e8&scoped=true&lang=css& */ "./src/components/icons/TriangleDownIcon.vue?vue&type=style&index=0&id=04dc52e8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js */ "./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js");

var script = {}
;


/* normalize component */

var component = (0,_node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  script,
  _TriangleDownIcon_vue_vue_type_template_id_04dc52e8_scoped_true_functional_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _TriangleDownIcon_vue_vue_type_template_id_04dc52e8_scoped_true_functional_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  true,
  null,
  "04dc52e8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/icons/TriangleDownIcon.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/BankCheckInput.vue?vue&type=template&id=4e468e2e&scoped=true&":
/*!**************************************************************************************!*\
  !*** ./src/components/BankCheckInput.vue?vue&type=template&id=4e468e2e&scoped=true& ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankCheckInput_vue_vue_type_template_id_4e468e2e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankCheckInput_vue_vue_type_template_id_4e468e2e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankCheckInput_vue_vue_type_template_id_4e468e2e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./BankCheckInput.vue?vue&type=template&id=4e468e2e&scoped=true& */ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankCheckInput.vue?vue&type=template&id=4e468e2e&scoped=true&");


/***/ }),

/***/ "./src/components/BankIconButton.vue?vue&type=template&id=37fc9b17&scoped=true&":
/*!**************************************************************************************!*\
  !*** ./src/components/BankIconButton.vue?vue&type=template&id=37fc9b17&scoped=true& ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankIconButton_vue_vue_type_template_id_37fc9b17_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankIconButton_vue_vue_type_template_id_37fc9b17_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankIconButton_vue_vue_type_template_id_37fc9b17_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./BankIconButton.vue?vue&type=template&id=37fc9b17&scoped=true& */ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankIconButton.vue?vue&type=template&id=37fc9b17&scoped=true&");


/***/ }),

/***/ "./src/components/IdenticonStack.vue?vue&type=template&id=99caa762&scoped=true&":
/*!**************************************************************************************!*\
  !*** ./src/components/IdenticonStack.vue?vue&type=template&id=99caa762&scoped=true& ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_IdenticonStack_vue_vue_type_template_id_99caa762_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_IdenticonStack_vue_vue_type_template_id_99caa762_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_IdenticonStack_vue_vue_type_template_id_99caa762_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./IdenticonStack.vue?vue&type=template&id=99caa762&scoped=true& */ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/IdenticonStack.vue?vue&type=template&id=99caa762&scoped=true&");


/***/ }),

/***/ "./src/components/InteractiveShortAddress.vue?vue&type=template&id=c96e9e4c&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./src/components/InteractiveShortAddress.vue?vue&type=template&id=c96e9e4c&scoped=true& ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_InteractiveShortAddress_vue_vue_type_template_id_c96e9e4c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_InteractiveShortAddress_vue_vue_type_template_id_c96e9e4c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_InteractiveShortAddress_vue_vue_type_template_id_c96e9e4c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./InteractiveShortAddress.vue?vue&type=template&id=c96e9e4c&scoped=true& */ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InteractiveShortAddress.vue?vue&type=template&id=c96e9e4c&scoped=true&");


/***/ }),

/***/ "./src/components/icons/CircledQuestionMark.vue?vue&type=template&id=61629c12&functional=true&":
/*!*****************************************************************************************************!*\
  !*** ./src/components/icons/CircledQuestionMark.vue?vue&type=template&id=61629c12&functional=true& ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_CircledQuestionMark_vue_vue_type_template_id_61629c12_functional_true___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_CircledQuestionMark_vue_vue_type_template_id_61629c12_functional_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_CircledQuestionMark_vue_vue_type_template_id_61629c12_functional_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./CircledQuestionMark.vue?vue&type=template&id=61629c12&functional=true& */ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/icons/CircledQuestionMark.vue?vue&type=template&id=61629c12&functional=true&");


/***/ }),

/***/ "./src/components/icons/TriangleDownIcon.vue?vue&type=template&id=04dc52e8&scoped=true&functional=true&":
/*!**************************************************************************************************************!*\
  !*** ./src/components/icons/TriangleDownIcon.vue?vue&type=template&id=04dc52e8&scoped=true&functional=true& ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TriangleDownIcon_vue_vue_type_template_id_04dc52e8_scoped_true_functional_true___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TriangleDownIcon_vue_vue_type_template_id_04dc52e8_scoped_true_functional_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TriangleDownIcon_vue_vue_type_template_id_04dc52e8_scoped_true_functional_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./TriangleDownIcon.vue?vue&type=template&id=04dc52e8&scoped=true&functional=true& */ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/icons/TriangleDownIcon.vue?vue&type=template&id=04dc52e8&scoped=true&functional=true&");


/***/ }),

/***/ "./src/components/BankCheckInput.vue?vue&type=script&lang=ts&":
/*!********************************************************************!*\
  !*** ./src/components/BankCheckInput.vue?vue&type=script&lang=ts& ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankCheckInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./BankCheckInput.vue?vue&type=script&lang=ts& */ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankCheckInput.vue?vue&type=script&lang=ts&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankCheckInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/BankIconButton.vue?vue&type=script&lang=ts&":
/*!********************************************************************!*\
  !*** ./src/components/BankIconButton.vue?vue&type=script&lang=ts& ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankIconButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./BankIconButton.vue?vue&type=script&lang=ts& */ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankIconButton.vue?vue&type=script&lang=ts&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankIconButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/IdenticonStack.vue?vue&type=script&lang=ts&":
/*!********************************************************************!*\
  !*** ./src/components/IdenticonStack.vue?vue&type=script&lang=ts& ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_IdenticonStack_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./IdenticonStack.vue?vue&type=script&lang=ts& */ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/IdenticonStack.vue?vue&type=script&lang=ts&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_IdenticonStack_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/InteractiveShortAddress.vue?vue&type=script&lang=ts&":
/*!*****************************************************************************!*\
  !*** ./src/components/InteractiveShortAddress.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_InteractiveShortAddress_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./InteractiveShortAddress.vue?vue&type=script&lang=ts& */ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InteractiveShortAddress.vue?vue&type=script&lang=ts&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_InteractiveShortAddress_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/icons/TriangleDownIcon.vue?vue&type=style&index=0&id=04dc52e8&scoped=true&lang=css&":
/*!************************************************************************************************************!*\
  !*** ./src/components/icons/TriangleDownIcon.vue?vue&type=style&index=0&id=04dc52e8&scoped=true&lang=css& ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TriangleDownIcon_vue_vue_type_style_index_0_id_04dc52e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./TriangleDownIcon.vue?vue&type=style&index=0&id=04dc52e8&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/icons/TriangleDownIcon.vue?vue&type=style&index=0&id=04dc52e8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TriangleDownIcon_vue_vue_type_style_index_0_id_04dc52e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TriangleDownIcon_vue_vue_type_style_index_0_id_04dc52e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TriangleDownIcon_vue_vue_type_style_index_0_id_04dc52e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TriangleDownIcon_vue_vue_type_style_index_0_id_04dc52e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


/***/ }),

/***/ "./src/components/BankCheckInput.vue?vue&type=style&index=0&id=4e468e2e&lang=scss&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./src/components/BankCheckInput.vue?vue&type=style&index=0&id=4e468e2e&lang=scss&scoped=true& ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankCheckInput_vue_vue_type_style_index_0_id_4e468e2e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!../../node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./BankCheckInput.vue?vue&type=style&index=0&id=4e468e2e&lang=scss&scoped=true& */ "./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankCheckInput.vue?vue&type=style&index=0&id=4e468e2e&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankCheckInput_vue_vue_type_style_index_0_id_4e468e2e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankCheckInput_vue_vue_type_style_index_0_id_4e468e2e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankCheckInput_vue_vue_type_style_index_0_id_4e468e2e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankCheckInput_vue_vue_type_style_index_0_id_4e468e2e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


/***/ }),

/***/ "./src/components/BankIconButton.vue?vue&type=style&index=0&id=37fc9b17&lang=scss&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./src/components/BankIconButton.vue?vue&type=style&index=0&id=37fc9b17&lang=scss&scoped=true& ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankIconButton_vue_vue_type_style_index_0_id_37fc9b17_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!../../node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./BankIconButton.vue?vue&type=style&index=0&id=37fc9b17&lang=scss&scoped=true& */ "./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankIconButton.vue?vue&type=style&index=0&id=37fc9b17&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankIconButton_vue_vue_type_style_index_0_id_37fc9b17_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankIconButton_vue_vue_type_style_index_0_id_37fc9b17_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankIconButton_vue_vue_type_style_index_0_id_37fc9b17_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_BankIconButton_vue_vue_type_style_index_0_id_37fc9b17_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


/***/ }),

/***/ "./src/components/IdenticonStack.vue?vue&type=style&index=0&id=99caa762&lang=scss&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./src/components/IdenticonStack.vue?vue&type=style&index=0&id=99caa762&lang=scss&scoped=true& ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_IdenticonStack_vue_vue_type_style_index_0_id_99caa762_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!../../node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./IdenticonStack.vue?vue&type=style&index=0&id=99caa762&lang=scss&scoped=true& */ "./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/IdenticonStack.vue?vue&type=style&index=0&id=99caa762&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_IdenticonStack_vue_vue_type_style_index_0_id_99caa762_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_IdenticonStack_vue_vue_type_style_index_0_id_99caa762_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_IdenticonStack_vue_vue_type_style_index_0_id_99caa762_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_IdenticonStack_vue_vue_type_style_index_0_id_99caa762_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


/***/ }),

/***/ "./src/components/InteractiveShortAddress.vue?vue&type=style&index=0&id=c96e9e4c&lang=scss&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./src/components/InteractiveShortAddress.vue?vue&type=style&index=0&id=c96e9e4c&lang=scss&scoped=true& ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_InteractiveShortAddress_vue_vue_type_style_index_0_id_c96e9e4c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!../../node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./InteractiveShortAddress.vue?vue&type=style&index=0&id=c96e9e4c&lang=scss&scoped=true& */ "./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InteractiveShortAddress.vue?vue&type=style&index=0&id=c96e9e4c&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_InteractiveShortAddress_vue_vue_type_style_index_0_id_c96e9e4c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_InteractiveShortAddress_vue_vue_type_style_index_0_id_c96e9e4c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_InteractiveShortAddress_vue_vue_type_style_index_0_id_c96e9e4c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_InteractiveShortAddress_vue_vue_type_style_index_0_id_c96e9e4c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


/***/ }),

/***/ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankCheckInput.vue?vue&type=template&id=4e468e2e&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankCheckInput.vue?vue&type=template&id=4e468e2e&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "bank-check-input",
      class: { disabled: _vm.disabled },
      on: { keydown: _vm.onKeyDown }
    },
    [
      _c(
        "LabelInput",
        _vm._g(
          _vm._b(
            {
              ref: "$bankSearchInput",
              attrs: { disabled: _vm.disabled },
              model: {
                value: _vm.localValue,
                callback: function($$v) {
                  _vm.localValue = $$v
                },
                expression: "localValue"
              }
            },
            "LabelInput",
            _vm.$attrs,
            false
          ),
          _vm.$listeners
        )
      ),
      _c(
        "CountrySelector",
        {
          ref: "countrySelect",
          attrs: { countryCodes: _vm.SEPA_COUNTRY_CODES, includeAllOption: "" },
          on: {
            open: function($event) {
              _vm.countryDropdownOpened = true
            },
            close: function($event) {
              _vm.countryDropdownOpened = false
            },
            select: _vm.selectCountry
          }
        },
        [
          _c(
            "li",
            { staticClass: "info", attrs: { slot: "info" }, slot: "info" },
            [
              _vm._v(
                _vm._s(
                  _vm.$t('258')
                )
              )
            ]
          )
        ]
      ),
      _vm.matchingBanks &&
      _vm.matchingBanks.length > 0 &&
      _vm.localValue.length >= 2 &&
      !_vm.countryDropdownOpened
        ? _c(
            "ul",
            {
              ref: "$bankAutocomplete",
              staticClass: "bank-autocomplete",
              class: { scroll: _vm.isScrollable }
            },
            [
              _vm._l(_vm.visibleBanks, function(bank, index) {
                return _c(
                  "li",
                  {
                    key: index,
                    staticClass: "bank",
                    class: {
                      selected:
                        _vm.bankToConfirm || _vm.selectedBankIndex === index
                    },
                    attrs: {
                      disabled:
                        _vm.getBankSupport(bank) ===
                        _vm.SEPA_INSTANT_SUPPORT.NONE,
                      title: bank.name
                    },
                    on: {
                      mouseenter: function($event) {
                        _vm.selectedBankIndex = index
                        bank.tooltip &&
                          !bank.tooltip.isShown &&
                          bank.tooltip.show()
                      },
                      focusin: function($event) {
                        _vm.selectedBankIndex = index
                        bank.tooltip &&
                          !bank.tooltip.isShown &&
                          bank.tooltip.show()
                      },
                      mouseleave: function($event) {
                        bank.tooltip &&
                          bank.tooltip.isShown &&
                          bank.tooltip.hide()
                      },
                      focusout: function($event) {
                        bank.tooltip &&
                          bank.tooltip.isShown &&
                          bank.tooltip.hide()
                      },
                      click: function($event) {
                        return _vm.selectBank(bank)
                      },
                      mousedown: function($event) {
                        $event.preventDefault()
                      }
                    }
                  },
                  [
                    _vm.getBankSupport(bank) !== _vm.SEPA_INSTANT_SUPPORT.NONE
                      ? _c("BankIcon")
                      : _c("ForbiddenIcon"),
                    _c("div", { staticClass: "flex-column" }, [
                      _vm.shouldHighlightMatch(bank.name)
                        ? _c("span", [
                            _vm._v(_vm._s(_vm.getMatchPrefix(bank.name))),
                            _c("strong", [
                              _vm._v(_vm._s(_vm.getMatch(bank.name)))
                            ]),
                            _vm._v(_vm._s(_vm.getMatchSuffix(bank.name)))
                          ])
                        : _c("span", [_vm._v(_vm._s(bank.name))]),
                      _c("div", { staticClass: "bic" }, [
                        _vm._v(_vm._s(bank.BIC))
                      ])
                    ]),
                    _vm.bankToConfirm
                      ? _c(
                          "button",
                          {
                            staticClass: "reset cancel-bank",
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                                _vm.bankToConfirm = null
                              }
                            }
                          },
                          [_c("CrossIcon")],
                          1
                        )
                      : _vm.checkBankSupport(
                          bank,
                          _vm.SEPA_INSTANT_SUPPORT.FULL
                        )
                      ? _c("CaretRightSmallIcon", {
                          staticClass: "caret-right-small-icon"
                        })
                      : _vm.checkBankSupport(
                          bank,
                          _vm.SEPA_INSTANT_SUPPORT.PARTIAL
                        ) ||
                        _vm.checkBankSupport(
                          bank,
                          _vm.SEPA_INSTANT_SUPPORT.UNKNOWN
                        )
                      ? _c(
                          "Tooltip",
                          {
                            staticClass: "circled-question-mark",
                            attrs: {
                              preferredPosition: "bottom left",
                              theme: "inverse",
                              container: _vm.$bankAutocomplete && {
                                $el: _vm.$bankAutocomplete
                              },
                              styles: {
                                transform:
                                  "translate3d(" +
                                  (_vm.isScrollable ? -1 : 5) +
                                  "%, 2rem, 1px)"
                              }
                            }
                          },
                          [
                            _c("CircledQuestionMarkIcon", {
                              attrs: { slot: "trigger" },
                              on: {
                                click: function($event) {
                                  $event.stopPropagation()
                                }
                              },
                              slot: "trigger"
                            }),
                            _c("p", [
                              _vm._v(
                                _vm._s(
                                  _vm.$t(
                                    '276'
                                  )
                                )
                              )
                            ]),
                            _c("p", [
                              _vm._v(
                                _vm._s(
                                  _vm.$t(
                                    '130'
                                  )
                                )
                              )
                            ])
                          ],
                          1
                        )
                      : _vm.checkBankSupport(
                          bank,
                          _vm.SEPA_INSTANT_SUPPORT.FULL_OR_SHARED
                        )
                      ? _c(
                          "Tooltip",
                          {
                            ref: "$tooltips",
                            refInFor: true,
                            staticClass: "alert-triangle-icon",
                            attrs: {
                              preferredPosition: "bottom left",
                              theme: "inverse",
                              container: _vm.$bankAutocomplete && {
                                $el: _vm.$bankAutocomplete
                              },
                              styles: {
                                transform:
                                  "translate3d(" +
                                  (_vm.isScrollable ? -1 : 5) +
                                  "%, 2rem, 1px)"
                              }
                            }
                          },
                          [
                            _c("AlertTriangleIcon", {
                              attrs: { slot: "trigger" },
                              on: {
                                click: function($event) {
                                  $event.stopPropagation()
                                }
                              },
                              slot: "trigger"
                            }),
                            _vm.direction == "outbound"
                              ? [
                                  _c("p", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t(
                                          '473'
                                        )
                                      )
                                    )
                                  ]),
                                  _c("p", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t(
                                          '5',
                                          { bankName: bank.name }
                                        )
                                      )
                                    )
                                  ]),
                                  _c("p", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t(
                                          '221'
                                        )
                                      )
                                    )
                                  ])
                                ]
                              : [
                                  _c("p", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t('156')
                                      )
                                    )
                                  ]),
                                  _c("p", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t(
                                          '5',
                                          { bankName: bank.name }
                                        )
                                      )
                                    )
                                  ]),
                                  _c("p", { staticClass: "nq-orange" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t(
                                          '350'
                                        )
                                      )
                                    )
                                  ])
                                ]
                          ],
                          2
                        )
                      : _vm._e()
                  ],
                  1
                )
              }),
              !_vm.bankToConfirm &&
              _vm.matchingBanks.length > _vm.visibleBanks.length
                ? _c("li", { staticClass: "more-count" }, [
                    _c(
                      "a",
                      {
                        on: {
                          click: function($event) {
                            _vm.isScrollable = true
                          }
                        }
                      },
                      [
                        _vm._v(
                          " " +
                            _vm._s(
                              _vm.$tc(
                                '17',
                                _vm.matchingBanks.length -
                                  _vm.visibleBanks.length
                              )
                            ) +
                            " "
                        )
                      ]
                    )
                  ])
                : _vm._e(),
              _vm.bankToConfirm
                ? _c(
                    "li",
                    { staticClass: "confirm-bank" },
                    [
                      _c("i18n", {
                        attrs: {
                          path:
                            '212',
                          tag: "p"
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "sepaInstantLink",
                              fn: function() {
                                return [
                                  _c("strong", [
                                    _vm._v(
                                      _vm._s(_vm.$t('368'))
                                    )
                                  ])
                                ]
                              },
                              proxy: true
                            }
                          ],
                          null,
                          false,
                          4065014305
                        )
                      }),
                      _c(
                        "button",
                        {
                          staticClass: "nq-button-pill light-blue",
                          on: {
                            click: _vm.confirmBank,
                            mousedown: function($event) {
                              $event.preventDefault()
                            }
                          }
                        },
                        [_vm._v(" " + _vm._s(_vm.$t('202')) + " ")]
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            2
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankIconButton.vue?vue&type=template&id=37fc9b17&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankIconButton.vue?vue&type=template&id=37fc9b17&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    _vm._g(
      { staticClass: "reset bank-icon-button flex-column" },
      _vm.$listeners
    ),
    [
      _c("BankIcon"),
      _c("TriangleDownIcon"),
      _c("label", [_vm._v(_vm._s(_vm.bankName || ""))])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/IdenticonStack.vue?vue&type=template&id=99caa762&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/IdenticonStack.vue?vue&type=template&id=99caa762&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    _vm._g(
      {
        staticClass: "reset identicon-stack flex-column",
        class: {
          interactive: _vm.interactive,
          "triangle-indented":
            (!_vm.hasBitcoinAddresses &&
              _vm.backgroundAddresses.length === 1) ||
            (_vm.hasBitcoinAddresses && _vm.backgroundAddresses.length === 0) ||
            (_vm.activeCurrency === _vm.CryptoCurrency.BTC &&
              _vm.backgroundAddresses.length === 1)
        }
      },
      _vm.$listeners
    ),
    [
      _vm.backgroundAddresses[0]
        ? _c("Identicon", {
            staticClass: "secondary",
            attrs: { address: _vm.backgroundAddresses[0] }
          })
        : _vm._e(),
      _vm.hasBitcoinAddresses &&
      _vm.$config.enableBitcoin &&
      _vm.activeCurrency !== _vm.CryptoCurrency.BTC
        ? _c("BitcoinIcon", { staticClass: "secondary" })
        : _vm.backgroundAddresses[1]
        ? _c("Identicon", {
            staticClass: "secondary",
            attrs: { address: _vm.backgroundAddresses[1] }
          })
        : _vm._e(),
      _vm.activeCurrency === _vm.CryptoCurrency.NIM
        ? _c("Identicon", {
            staticClass: "primary",
            attrs: { address: _vm.activeAddressInfo.address }
          })
        : _vm.activeCurrency === _vm.CryptoCurrency.BTC
        ? _c("BitcoinIcon", { staticClass: "primary" })
        : _vm._e(),
      _vm.backgroundAddresses.length || _vm.hasBitcoinAddresses
        ? _c("TriangleDownIcon")
        : _vm._e(),
      _c("label", [
        _vm._v(
          " " +
            _vm._s(
              _vm.activeCurrency === _vm.CryptoCurrency.BTC
                ? "Bitcoin"
                : _vm.activeAddressInfo.label
            ) +
            " "
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InteractiveShortAddress.vue?vue&type=template&id=c96e9e4c&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InteractiveShortAddress.vue?vue&type=template&id=c96e9e4c&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Tooltip",
    {
      staticClass: "interactive-short-address",
      class: _vm.tooltipPosition,
      attrs: { preferredPosition: "bottom " + _vm.tooltipPosition }
    },
    [
      _c("ShortAddress", {
        attrs: { slot: "trigger", address: _vm.address },
        slot: "trigger"
      }),
      _vm._v(" " + _vm._s(_vm.address) + " ")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/icons/CircledQuestionMark.vue?vue&type=template&id=61629c12&functional=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/icons/CircledQuestionMark.vue?vue&type=template&id=61629c12&functional=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function(_h, _vm) {
  var _c = _vm._c
  return _c(
    "svg",
    {
      staticClass: "nq-icon circled-question-mark-icon",
      attrs: {
        viewBox: "0 0 18 18",
        xmlns: "http://www.w3.org/2000/svg",
        stroke: "currentColor",
        fill: "none",
        "stroke-linecap": "round",
        "stroke-width": "1.5"
      }
    },
    [
      _c("circle", {
        attrs: { cx: "9", cy: "9", r: "7.75", "stroke-linejoin": "round" }
      }),
      _c("path", {
        attrs: {
          d:
            "M7.25 6.75a2 2 0 012-2 2 2 0 012 2A1.87 1.87 0 0110 8.5a1.3 1.3 0 00-.75 1.25v.5"
        }
      }),
      _c("path", {
        attrs: {
          stroke: "none",
          fill: "currentColor",
          d:
            "M9.25 12a1 1 0 00-.56.17.94.94 0 00-.36.45 1 1 0 00-.06.58 1 1 0 00.78.78 1 1 0 00.58-.06.94.94 0 00.45-.36A1 1 0 009.25 12z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/icons/TriangleDownIcon.vue?vue&type=template&id=04dc52e8&scoped=true&functional=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/icons/TriangleDownIcon.vue?vue&type=template&id=04dc52e8&scoped=true&functional=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function(_h, _vm) {
  var _c = _vm._c
  return _c(
    "svg",
    {
      staticClass: "triangle-down-icon",
      attrs: {
        width: "10",
        height: "8",
        viewBox: "0 0 10 8",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg"
      }
    },
    [
      _c("path", {
        attrs: {
          d:
            "M8.56 0a.8.8 0 0 1 .67 1.22l-3.55 5.7a.8.8 0 0 1-1.36 0L.76 1.21A.8.8 0 0 1 1.44 0h7.12Z"
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankCheckInput.vue?vue&type=script&lang=ts&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankCheckInput.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.module.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/oasis-bank-list */ "./node_modules/@nimiq/oasis-bank-list/src/index.ts");
/* harmony import */ var _icons_BankIcon_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons/BankIcon.vue */ "./src/components/icons/BankIcon.vue");
/* harmony import */ var _icons_CircledQuestionMark_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons/CircledQuestionMark.vue */ "./src/components/icons/CircledQuestionMark.vue");
/* harmony import */ var _icons_ForbiddenIcon_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons/ForbiddenIcon.vue */ "./src/components/icons/ForbiddenIcon.vue");
/* harmony import */ var _CountrySelector_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CountrySelector.vue */ "./src/components/CountrySelector.vue");
/* harmony import */ var _lib_Countries__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/Countries */ "./src/lib/Countries.ts");









function unicodeNormalize(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/* harmony default export */ __webpack_exports__["default"] = ((0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.defineComponent)({
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      required: true
    }
  },

  setup(props, context) {
    // Nested v-model pattern
    // https://zaengle.com/blog/using-v-model-on-nested-vue-components
    // https://vue-composition-api-rfc.netlify.app/api.html#computed
    const localValue = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.computed)({
      get: () => props.value,

      set(value) {
        context.emit('input', value);
      }

    });
    const normalizedLocalValue = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.computed)(() => unicodeNormalize(localValue.value.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')));
    const $bankSearchInput = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.ref)(null);
    const $bankAutocomplete = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.ref)(null);
    const $tooltips = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.ref)([]);
    const selectedBankIndex = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.ref)(0);
    const currentCountry = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.ref)(null);
    const countryDropdownOpened = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.ref)(false);
    const isScrollable = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.ref)(false);
    const intlCollator = new Intl.Collator(undefined, {
      sensitivity: 'base'
    });
    const bankToConfirm = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.ref)(null);
    /* Lazy-load the complete bank lists */

    const banks = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.ref)([]);
    (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.onMounted)(() => {
      (0,_nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.loadBankList)().then(BANKS => banks.value = BANKS);
    });
    /* List of available banks in the currently selected country */

    const availableBanks = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.computed)(() => {
      if (!currentCountry.value || currentCountry.value.code === 'all') return banks.value;
      const {
        code
      } = currentCountry.value;
      return banks.value.filter(bank => bank.country === code);
    });
    /* List of banks matching the BIC or Name search */

    const matchingBanks = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.computed)(() => {
      if (!localValue.value) return [];
      const rgx = RegExp(normalizedLocalValue.value, 'i');
      return Object.values(availableBanks.value).filter(bank => {
        const normalizedBankName = unicodeNormalize(bank.name);
        const matchName = normalizedBankName && rgx.test(normalizedBankName);
        const matchBIC = bank.BIC && rgx.test(bank.BIC);

        if (bank.BIC && bank.BIC.length === 8) {
          const rgxBankBIC = RegExp(`${bank.BIC}[\\w]{0,3}`, 'i');
          const partiallyMatchBIC = rgxBankBIC.test(normalizedLocalValue.value);
          return matchName || matchBIC || partiallyMatchBIC;
        }

        return matchName || matchBIC;
      }).sort((a, b) => {
        const aStartWithSearchTerm = unicodeNormalize(a.name).toLowerCase().startsWith(normalizedLocalValue.value.toLowerCase());
        const bStartWithSearchTerm = unicodeNormalize(b.name).toLowerCase().startsWith(normalizedLocalValue.value.toLowerCase());
        if (aStartWithSearchTerm && !bStartWithSearchTerm) return -1;
        if (!aStartWithSearchTerm && bStartWithSearchTerm) return 1;
        if (a.name.length < b.name.length) return -1;
        if (b.name.length < a.name.length) return 1;
        return intlCollator.compare(a.name, b.name);
      });
    });
    /* List of banks displayed to the user. */

    const visibleBanks = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.computed)(() => {
      if (bankToConfirm.value) return [bankToConfirm.value];
      const b = [...(isScrollable.value ? matchingBanks.value : matchingBanks.value.slice(0, 3))];
      if ($tooltips.value.length === 0) return b;

      for (let i = 0, tIndex = 0; i < b.length; i++) {
        if (checkBankSupport(b[i], _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.SEPA_INSTANT_SUPPORT.FULL_OR_SHARED)) {
          b[i].tooltip = $tooltips.value[tIndex];
          tIndex++;
        }
      }

      return b;
    });
    /* Show warning if any visible bank is not fully supporting SEPA instant */

    const showWarning = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.computed)(() => matchingBanks.value.some(bank => !checkBankSupport(bank, _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.SEPA_INSTANT_SUPPORT.FULL)));
    /* Reset the selectedBankIndex to 0 on text input */

    (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.watch)(localValue, () => {
      selectedBankIndex.value = 0;
      bankToConfirm.value = null;
    });
    /* Show bank tooltip when a bank is selected and if the tooltip is accessible */

    (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.watch)(selectedBankIndex, () => {
      var _visibleBanks$value$s, _visibleBanks$value$s2;

      if ((_visibleBanks$value$s = visibleBanks.value[selectedBankIndex.value]) !== null && _visibleBanks$value$s !== void 0 && (_visibleBanks$value$s2 = _visibleBanks$value$s.tooltip) !== null && _visibleBanks$value$s2 !== void 0 && _visibleBanks$value$s2.isShown) return;
      visibleBanks.value.forEach((bank, index) => {
        if (index !== selectedBankIndex.value && bank.tooltip && bank.tooltip.isShown) bank.tooltip.hide();
        if (index === selectedBankIndex.value && bank.tooltip && !bank.tooltip.isShown) bank.tooltip.show();
      });
    });
    /* Country dropdown watch: onOpen -> focus input | onClose -> clear input & focus bank search */

    (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.watch)(countryDropdownOpened, (newBool, oldBool) => {
      if (!newBool && oldBool) {
        // onClose
        if ($bankSearchInput.value) {
          $bankSearchInput.value.focus();
        }
      }
    });
    (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__.watch)([localValue, countryDropdownOpened], () => isScrollable.value = false);
    /* Keyboard navigation */

    function onKeyDown(event) {
      if ((!matchingBanks || !$bankAutocomplete.value) && !countryDropdownOpened.value) return;
      const oldBankIndex = selectedBankIndex.value;

      if (countryDropdownOpened.value) {// country list
        // Ignore
      } else {
        // bank list
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            selectedBankIndex.value = Math.max(0, Math.min(visibleBanks.value.length - 1, selectedBankIndex.value + 1));
            break;

          case 'ArrowUp':
            event.preventDefault();
            selectedBankIndex.value = Math.max(0, Math.min(visibleBanks.value.length - 1, selectedBankIndex.value - 1));
            break;

          case 'Enter':
            selectBank(visibleBanks.value[selectedBankIndex.value]);
            break;

          default:
            break;
        }

        if (selectedBankIndex.value !== oldBankIndex && $bankAutocomplete.value) {
          $bankAutocomplete.value.children[selectedBankIndex.value].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    }

    function selectBank(bank) {
      var _bankToConfirm$value;

      if (((_bankToConfirm$value = bankToConfirm.value) === null || _bankToConfirm$value === void 0 ? void 0 : _bankToConfirm$value.BIC) === bank.BIC) return; // Only continue if the selected bank supports the wanted direction

      if (getBankSupport(bank) === _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.SEPA_INSTANT_SUPPORT.NONE) {
        if ($bankSearchInput.value) $bankSearchInput.value.focus();
        return;
      }

      if (bank.tooltip && bank.tooltip.isShown) bank.tooltip.hide();

      if (props.direction === 'outbound') {
        // Trigger an extra confirmation step when user has to send fiat
        bankToConfirm.value = { ...bank,
          tooltip: undefined
        }; // Remove reference to unmounted tooltip
      } else {
        setBank(bank);
      }
    }

    function confirmBank() {
      if (!bankToConfirm.value) return;
      setBank(bankToConfirm.value);
    }

    function setBank(bank) {
      localValue.value = bank.name;
      context.emit('bank-selected', { ...bank,
        tooltip: undefined
      });
    }
    /**
     * Return `true` if one of the bank network match the `instantSupportType` arg.
     * For example: if a bank fully supports TIPS (`FULL`) but does not support RT1 (`NONE`),
     * it will return `true` for `FULL` and `NONE` support.
     * To check for the higher support capability please use the `getBankSupport` function.
     */


    function checkBankSupport(bank, instantSupportType) {
      return Object.values(_nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.BANK_NETWORK).some(network => bank.support[network] && bank.support[network][props.direction] === instantSupportType);
    }
    /**
     * Return the higher support capability of the bank, no matter the network.
     * For example: if a bank supports TIPS (`FULL`) but does not support RT1 (`NONE`),
     * it will still return `FULL` since at least one network is fully supported.
     */


    function getBankSupport(bank) {
      if (checkBankSupport(bank, _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.SEPA_INSTANT_SUPPORT.FULL)) return _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.SEPA_INSTANT_SUPPORT.FULL;
      if (checkBankSupport(bank, _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.SEPA_INSTANT_SUPPORT.FULL_OR_SHARED)) return _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.SEPA_INSTANT_SUPPORT.FULL_OR_SHARED;
      if (checkBankSupport(bank, _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.SEPA_INSTANT_SUPPORT.PARTIAL)) return _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.SEPA_INSTANT_SUPPORT.PARTIAL;
      if (checkBankSupport(bank, _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.SEPA_INSTANT_SUPPORT.UNKNOWN)) return _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.SEPA_INSTANT_SUPPORT.UNKNOWN;
      return _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.SEPA_INSTANT_SUPPORT.NONE;
    }
    /* set a country as the currently selected one */


    function selectCountry(country) {
      currentCountry.value = country;
    }
    /* Those 3 functions are used to highlight the matched string in the bank autocomplete list */


    function getMatchPrefix(s) {
      const normalizedStr = unicodeNormalize(s);
      const rgx = new RegExp(`^(.*?)${normalizedLocalValue.value}`, 'i');
      const match = normalizedStr.match(rgx);
      if (!match) return '';
      return s.substr(0, match[1].length);
    }

    function getMatch(s) {
      const normalizedStr = unicodeNormalize(s);
      const rgx = new RegExp(normalizedLocalValue.value, 'i');
      const match = normalizedStr.match(rgx);
      const maxlen = 23;
      let i = 2;
      if (!match) return '';
      const originalMatch = s.substr(normalizedStr.indexOf(match[0]), match[0].length);
      if (originalMatch.length <= 4 || s.length < maxlen) return originalMatch;

      if (s.length - (originalMatch.length - 4) <= maxlen) {
        i = 2 + (maxlen - (s.length - (originalMatch.length - 4)));
      }

      return `${originalMatch.substr(0, 2)}...${originalMatch.substr(originalMatch.length - i, i)}`;
    }

    function getMatchSuffix(s) {
      const normalizedStr = unicodeNormalize(s);
      const rgx = new RegExp(`${normalizedLocalValue.value}(.*?)$`, 'i');
      const match = normalizedStr.match(rgx);
      if (!match) return '';
      const tmp = s.substr(normalizedStr.lastIndexOf(match[1]));
      return tmp;
    }
    /* if the search match the bank name: return true. Otherwise it's probaly a BIC search: return false */


    function shouldHighlightMatch(bankName) {
      const rgx = new RegExp(normalizedLocalValue.value, 'i');
      return rgx.test(unicodeNormalize(bankName));
    }

    return {
      SEPA_INSTANT_SUPPORT: _nimiq_oasis_bank_list__WEBPACK_IMPORTED_MODULE_1__.SEPA_INSTANT_SUPPORT,
      $bankSearchInput,
      $bankAutocomplete,
      $tooltips,
      localValue,
      matchingBanks,
      visibleBanks,
      selectedBankIndex,
      onKeyDown,
      selectBank,
      bankToConfirm,
      confirmBank,
      checkBankSupport,
      getBankSupport,
      showWarning,
      getMatchPrefix,
      getMatch,
      getMatchSuffix,
      shouldHighlightMatch,
      SEPA_COUNTRY_CODES: _lib_Countries__WEBPACK_IMPORTED_MODULE_6__.SEPA_COUNTRY_CODES,
      countryDropdownOpened,
      selectCountry,
      isScrollable
    };
  },

  methods: {
    focus() {
      this.$refs.$bankSearchInput.focus();
    }

  },
  components: {
    LabelInput: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__.LabelInput,
    CaretRightSmallIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__.CaretRightSmallIcon,
    BankIcon: _icons_BankIcon_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    CircledQuestionMarkIcon: _icons_CircledQuestionMark_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    ForbiddenIcon: _icons_ForbiddenIcon_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    Tooltip: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__.Tooltip,
    CountrySelector: _CountrySelector_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    AlertTriangleIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__.AlertTriangleIcon,
    CrossIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__.CrossIcon
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankIconButton.vue?vue&type=script&lang=ts&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankIconButton.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.module.js");
/* harmony import */ var _icons_BankIcon_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons/BankIcon.vue */ "./src/components/icons/BankIcon.vue");
/* harmony import */ var _icons_TriangleDownIcon_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons/TriangleDownIcon.vue */ "./src/components/icons/TriangleDownIcon.vue");



/* harmony default export */ __webpack_exports__["default"] = ((0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  props: {
    bankName: String
  },
  components: {
    BankIcon: _icons_BankIcon_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    TriangleDownIcon: _icons_TriangleDownIcon_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/IdenticonStack.vue?vue&type=script&lang=ts&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/IdenticonStack.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.module.js");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _stores_Account__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stores/Account */ "./src/stores/Account.ts");
/* harmony import */ var _stores_Address__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stores/Address */ "./src/stores/Address.ts");
/* harmony import */ var _icons_BitcoinIcon_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons/BitcoinIcon.vue */ "./src/components/icons/BitcoinIcon.vue");
/* harmony import */ var _icons_TriangleDownIcon_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons/TriangleDownIcon.vue */ "./src/components/icons/TriangleDownIcon.vue");







/* harmony default export */ __webpack_exports__["default"] = ((0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__.defineComponent)({
  props: {
    interactive: {
      type: Boolean,
      default: true
    }
  },

  setup() {
    const {
      activeCurrency,
      hasBitcoinAddresses
    } = (0,_stores_Account__WEBPACK_IMPORTED_MODULE_2__.useAccountStore)();
    const {
      addressInfos,
      activeAddressInfo
    } = (0,_stores_Address__WEBPACK_IMPORTED_MODULE_3__.useAddressStore)();
    const backgroundAddresses = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__.computed)(() => addressInfos.value.slice(0, 3).filter(addressInfo => activeCurrency.value !== _lib_Constants__WEBPACK_IMPORTED_MODULE_1__.CryptoCurrency.NIM || addressInfo.address !== activeAddressInfo.value.address).slice(0, 2).map(addressInfo => addressInfo.address));
    return {
      backgroundAddresses,
      hasBitcoinAddresses,
      activeCurrency,
      CryptoCurrency: _lib_Constants__WEBPACK_IMPORTED_MODULE_1__.CryptoCurrency,
      activeAddressInfo
    };
  },

  components: {
    Identicon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__.Identicon,
    BitcoinIcon: _icons_BitcoinIcon_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    TriangleDownIcon: _icons_TriangleDownIcon_vue__WEBPACK_IMPORTED_MODULE_5__["default"]
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InteractiveShortAddress.vue?vue&type=script&lang=ts&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InteractiveShortAddress.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.module.js");
/* harmony import */ var _ShortAddress_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortAddress.vue */ "./src/components/ShortAddress.vue");



/* harmony default export */ __webpack_exports__["default"] = ((0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  props: {
    address: {
      type: String,
      required: true
    },
    tooltipPosition: {
      type: String,
      default: 'right',
      validator: val => ['right', 'left'].includes(val)
    }
  },
  components: {
    ShortAddress: _ShortAddress_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    Tooltip: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_0__.Tooltip
  }
}));

/***/ }),

/***/ "./src/lib/swap/utils/CommonUtils.ts":
/*!*******************************************!*\
  !*** ./src/lib/swap/utils/CommonUtils.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "estimate": function() { return /* binding */ estimate; },
/* harmony export */   "assets": function() { return /* binding */ assets; },
/* harmony export */   "selectedFiatCurrency": function() { return /* binding */ selectedFiatCurrency; },
/* harmony export */   "useCurrentLimitFiat": function() { return /* binding */ useCurrentLimitFiat; },
/* harmony export */   "useCurrentLimitCrypto": function() { return /* binding */ useCurrentLimitCrypto; },
/* harmony export */   "fiatCurrencyInfo": function() { return /* binding */ fiatCurrencyInfo; },
/* harmony export */   "eurPerNim": function() { return /* binding */ eurPerNim; },
/* harmony export */   "eurPerBtc": function() { return /* binding */ eurPerBtc; },
/* harmony export */   "nimFeePerUnit": function() { return /* binding */ nimFeePerUnit; },
/* harmony export */   "btcFeePerUnit": function() { return /* binding */ btcFeePerUnit; },
/* harmony export */   "fiatFees": function() { return /* binding */ fiatFees; },
/* harmony export */   "fetchAssets": function() { return /* binding */ fetchAssets; },
/* harmony export */   "capDecimals": function() { return /* binding */ capDecimals; },
/* harmony export */   "calculateFees": function() { return /* binding */ calculateFees; },
/* harmony export */   "getFiatSwapParameters": function() { return /* binding */ getFiatSwapParameters; },
/* harmony export */   "useSwapEstimate": function() { return /* binding */ useSwapEstimate; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/fastspot-api */ "./node_modules/@nimiq/fastspot-api/dist/index.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/CurrencyInfo.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.module.js");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _stores_Account__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../stores/Account */ "./src/stores/Account.ts");
/* harmony import */ var _stores_Fiat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../stores/Fiat */ "./src/stores/Fiat.ts");
/* harmony import */ var _stores_Settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../stores/Settings */ "./src/stores/Settings.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _NumberFormatting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../NumberFormatting */ "./src/lib/NumberFormatting.ts");
/* harmony import */ var _BitcoinTransactionUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../BitcoinTransactionUtils */ "./src/lib/BitcoinTransactionUtils.ts");
/* harmony import */ var _stores_BtcAddress__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../stores/BtcAddress */ "./src/stores/BtcAddress.ts");
/* harmony import */ var _SellUtils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SellUtils */ "./src/lib/swap/utils/SellUtils.ts");
/* harmony import */ var _Functions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Functions */ "./src/lib/swap/utils/Functions.ts");
/* harmony import */ var _stores_Kyc__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../stores/Kyc */ "./src/stores/Kyc.ts");















const {
  exchangeRates
} = (0,_stores_Fiat__WEBPACK_IMPORTED_MODULE_4__.useFiatStore)();
const {
  activeCurrency
} = (0,_stores_Account__WEBPACK_IMPORTED_MODULE_3__.useAccountStore)();
const {
  btcUnit
} = (0,_stores_Settings__WEBPACK_IMPORTED_MODULE_5__.useSettingsStore)();
const {
  accountUtxos
} = (0,_stores_BtcAddress__WEBPACK_IMPORTED_MODULE_9__.useBtcAddressStore)();
const {
  connectedUser: kycUser
} = (0,_stores_Kyc__WEBPACK_IMPORTED_MODULE_12__.useKycStore)();
/**
 * Common - everything common to Buy and Sell crypto
 *  - Refs
 *  - Computeds
 *  - Functions
 */

/**
 * Common - Refs
 */

const estimate = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_13__.ref)(null);
const assets = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_13__.ref)(null); // Currently there is only EUR available to swap, but it may change in the future.

const selectedFiatCurrency = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_13__.ref)(_Constants__WEBPACK_IMPORTED_MODULE_6__.FiatCurrency.EUR);
/**
 * Common - Computeds
 */

function useCurrentLimitFiat(limits) {
  return (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_13__.computed)(() => {
    if (!limits.value) return null;
    const nimRate = exchangeRates.value[_Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.NIM][selectedFiatCurrency.value];
    if (!nimRate) return null;
    const regularLimitFiat = Math.min(Math.floor(limits.value.current.luna / 1e5 * nimRate), kycUser.value ? config__WEBPACK_IMPORTED_MODULE_2__["default"].oasis.maxKycAmount : config__WEBPACK_IMPORTED_MODULE_2__["default"].oasis.maxFreeAmount);

    if (selectedFiatCurrency.value === _Constants__WEBPACK_IMPORTED_MODULE_6__.FiatCurrency.EUR && limits.value.current.eur < Infinity) {
      return Math.min(regularLimitFiat, limits.value.current.eur);
    }

    return regularLimitFiat;
  });
}
function useCurrentLimitCrypto(currentLimitFiat) {
  return (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_13__.computed)(() => {
    if (!currentLimitFiat.value) return null;
    const rate = exchangeRates.value[activeCurrency.value][selectedFiatCurrency.value];
    if (!rate) return null;
    return capDecimals(currentLimitFiat.value / rate * (activeCurrency.value === _Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.NIM ? 1e5 : 1e8), activeCurrency.value.toUpperCase());
  });
}
const fiatCurrencyInfo = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_13__.computed)(() => new _nimiq_utils__WEBPACK_IMPORTED_MODULE_14__.CurrencyInfo(selectedFiatCurrency.value));
const eurPerNim = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_13__.computed)(() => {
  const _estimate = estimate.value;

  if (!_estimate || ![_estimate.from.asset, _estimate.to.asset].includes(_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.NIM)) {
    return exchangeRates.value[_Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.NIM][selectedFiatCurrency.value];
  }

  return (0,_Functions__WEBPACK_IMPORTED_MODULE_11__.getEurPerCrypto)(_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.NIM, _estimate);
});
const eurPerBtc = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_13__.computed)(() => {
  const _estimate = estimate.value;

  if (!_estimate || ![_estimate.from.asset, _estimate.to.asset].includes(_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.BTC)) {
    return exchangeRates.value[_Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.BTC][selectedFiatCurrency.value];
  }

  return (0,_Functions__WEBPACK_IMPORTED_MODULE_11__.getEurPerCrypto)(_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.BTC, _estimate);
});
const nimFeePerUnit = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_13__.computed)(() => (0,_Functions__WEBPACK_IMPORTED_MODULE_11__.getFeePerUnit)(_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.NIM, estimate.value, assets.value));
const btcFeePerUnit = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_13__.computed)(() => (0,_Functions__WEBPACK_IMPORTED_MODULE_11__.getFeePerUnit)(_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.BTC, estimate.value, assets.value));
const fiatFees = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_13__.computed)(() => (0,_Functions__WEBPACK_IMPORTED_MODULE_11__.getFiatFees)(estimate.value, activeCurrency.value, {
  [_Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.NIM]: {
    [selectedFiatCurrency.value]: eurPerNim.value
  },
  [_Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.BTC]: {
    [selectedFiatCurrency.value]: eurPerBtc.value
  }
}, selectedFiatCurrency.value, assets.value));
/**
 * Common - Functions
 */

async function fetchAssets() {
  assets.value = await (0,_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.getAssets)();
}
function capDecimals(amount, asset) {
  if (!amount) return 0;
  const numberSign = amount / Math.abs(amount); // 1 or -1

  amount = Math.abs(amount);
  const currencyDecimals = asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.NIM ? 5 : btcUnit.value.decimals;
  const displayDecimals = (0,_NumberFormatting__WEBPACK_IMPORTED_MODULE_7__.calculateDisplayedDecimals)(amount, asset.toLowerCase());
  const roundingFactor = 10 ** (currencyDecimals - displayDecimals);
  return Math.floor(amount / roundingFactor) * roundingFactor * numberSign;
}
function calculateFees({
  to,
  from
}, amount, feesPerUnit = {
  eur: 0,
  nim: 0,
  btc: 0
}) {
  let fundingFee = null;
  let settlementFee = null;

  if (to === _Constants__WEBPACK_IMPORTED_MODULE_6__.FiatCurrency.EUR) {
    if ((from || activeCurrency.value) === _Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.NIM) {
      fundingFee = (feesPerUnit.nim || nimFeePerUnit.value) * 244; // 244 = NIM HTLC funding tx size
    }

    if ((from || activeCurrency.value) === _Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.BTC) {
      const btcAmount = Math.min(amount || 1, _SellUtils__WEBPACK_IMPORTED_MODULE_10__.btcMaxSendableAmount.value);
      const selected = (0,_BitcoinTransactionUtils__WEBPACK_IMPORTED_MODULE_8__.selectOutputs)(accountUtxos.value, btcAmount, feesPerUnit.btc || btcFeePerUnit.value, 48);
      fundingFee = selected.utxos.reduce((sum, utxo) => sum + utxo.witness.value, 0) - btcAmount - selected.changeAmount;
    }

    settlementFee = feesPerUnit.eur || estimate.value && estimate.value.to.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.EUR && estimate.value.to.fee || 0;
  } else {
    // from EUR
    fundingFee = feesPerUnit.eur || estimate.value && estimate.value.from.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.EUR && estimate.value.from.fee || 0;

    if ((to || activeCurrency.value) === _Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.NIM) {
      const perFee = feesPerUnit.nim || estimate.value && estimate.value.to.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.NIM && estimate.value.to.feePerUnit || assets.value && assets.value[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.NIM].feePerUnit || 0; // 233 = NIM HTLC settlement tx size

      settlementFee = perFee * 233;
    }

    if ((to || activeCurrency.value) === _Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.BTC) {
      const perFee = feesPerUnit.btc || estimate.value && estimate.value.to.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.BTC && estimate.value.to.feePerUnit || assets.value && assets.value[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.BTC].feePerUnit || 1; // 135 extra weight units for BTC HTLC settlement tx

      settlementFee = (0,_BitcoinTransactionUtils__WEBPACK_IMPORTED_MODULE_8__.estimateFees)(1, 1, perFee, 135);
    }
  }

  if (fundingFee === null || settlementFee === null) throw new Error('Invalid swap direction');
  return {
    fundingFee,
    settlementFee
  };
}
function getFiatSwapParameters({
  from,
  to
}) {
  if (!to && !from) return {
    to: null,
    from: null
  };

  if (to && !('asset' in to) && to.amount || from && 'asset' in from && from.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.EUR && from.amount) {
    // Buy
    const fees = calculateFees({
      from: _Constants__WEBPACK_IMPORTED_MODULE_6__.FiatCurrency.EUR
    });
    const toSwapAsset = activeCurrency.value === _Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.BTC ? _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.BTC : _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.NIM;

    if (from && 'asset' in from && from.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.EUR && from.amount) {
      return {
        from: {
          [_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.EUR]: (from.amount - fees.fundingFee) / 100
        },
        to: toSwapAsset
      };
    }

    return {
      from: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.EUR,
      to: {
        [toSwapAsset]: (to.amount + fees.settlementFee) / (toSwapAsset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.BTC ? 1e8 : 1e5)
      }
    };
  }

  if (from && !('asset' in from) && from.amount || to && 'asset' in to && to.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.EUR && to.amount) {
    // Sell
    const fees = calculateFees({
      to: _Constants__WEBPACK_IMPORTED_MODULE_6__.FiatCurrency.EUR
    }, to === null || to === void 0 ? void 0 : to.amount);
    const fromSwapAsset = activeCurrency.value === _Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.BTC ? _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.BTC : _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.NIM;

    if (from && !('asset' in from) && from.amount) {
      return {
        from: {
          [fromSwapAsset]: (from.amount - fees.fundingFee) / (fromSwapAsset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.BTC ? 1e8 : 1e5)
        },
        to: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.EUR
      };
    }

    return {
      from: fromSwapAsset,
      to: {
        [_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.EUR]: (to.amount + fees.settlementFee) / 100
      }
    };
  }

  return {
    from: null,
    to: null
  };
}
function useSwapEstimate() {
  if ((0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_13__.getCurrentInstance)()) {
    (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_13__.onUnmounted)(() => estimate.value = null);
  }

  return {
    estimate
  };
}

/***/ }),

/***/ "./src/lib/swap/utils/SellUtils.ts":
/*!*****************************************!*\
  !*** ./src/lib/swap/utils/SellUtils.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "oasisSellLimitExceeded": function() { return /* binding */ oasisSellLimitExceeded; },
/* harmony export */   "nimFeePerUnit": function() { return /* binding */ nimFeePerUnit; },
/* harmony export */   "btcFeePerUnit": function() { return /* binding */ btcFeePerUnit; },
/* harmony export */   "btcFeeForSendingAll": function() { return /* binding */ btcFeeForSendingAll; },
/* harmony export */   "btcMaxSendableAmount": function() { return /* binding */ btcMaxSendableAmount; },
/* harmony export */   "updateSellEstimate": function() { return /* binding */ updateSellEstimate; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/fastspot-api */ "./node_modules/@nimiq/fastspot-api/dist/index.js");
/* harmony import */ var _nimiq_oasis_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/oasis-api */ "./node_modules/@nimiq/oasis-api/dist/OasisApi.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.module.js");
/* harmony import */ var _stores_Account__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../stores/Account */ "./src/stores/Account.ts");
/* harmony import */ var _stores_Fiat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../stores/Fiat */ "./src/stores/Fiat.ts");
/* harmony import */ var _stores_Swaps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../stores/Swaps */ "./src/stores/Swaps.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _BitcoinTransactionUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../BitcoinTransactionUtils */ "./src/lib/BitcoinTransactionUtils.ts");
/* harmony import */ var _stores_BtcAddress__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../stores/BtcAddress */ "./src/stores/BtcAddress.ts");
/* harmony import */ var _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../i18n/i18n-setup */ "./src/i18n/i18n-setup.ts");
/* harmony import */ var _CommonUtils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CommonUtils */ "./src/lib/swap/utils/CommonUtils.ts");
/* harmony import */ var _Functions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Functions */ "./src/lib/swap/utils/Functions.ts");













const {
  activeSwap: swap
} = (0,_stores_Swaps__WEBPACK_IMPORTED_MODULE_5__.useSwapsStore)();
const {
  exchangeRates
} = (0,_stores_Fiat__WEBPACK_IMPORTED_MODULE_4__.useFiatStore)();
const {
  activeCurrency
} = (0,_stores_Account__WEBPACK_IMPORTED_MODULE_3__.useAccountStore)();
const {
  accountBalance: accountBtcBalance,
  accountUtxos
} = (0,_stores_BtcAddress__WEBPACK_IMPORTED_MODULE_8__.useBtcAddressStore)();
/**
 * Sell - Sell crypto related things
 *  - Computeds
 *  - Functions
 */

/**
 * Sell - Computeds
 */

const oasisSellLimitExceeded = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_12__.computed)(() => {
  if (!swap.value) return false;
  if (!swap.value.settlementTx) return false;
  const htlc = swap.value.settlementTx;
  if (htlc.status !== _nimiq_oasis_api__WEBPACK_IMPORTED_MODULE_2__.HtlcStatus.SETTLED) return false;
  const settledHtlc = htlc;
  if (settledHtlc.settlement.status !== _nimiq_oasis_api__WEBPACK_IMPORTED_MODULE_2__.SettlementStatus.DENIED) return false;
  const deniedSettlementInfo = settledHtlc.settlement;
  return deniedSettlementInfo.detail.reason === _nimiq_oasis_api__WEBPACK_IMPORTED_MODULE_2__.DeniedReason.LIMIT_EXCEEDED;
});
const nimFeePerUnit = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_12__.computed)(() => {
  const {
    estimate
  } = (0,_CommonUtils__WEBPACK_IMPORTED_MODULE_10__.useSwapEstimate)();
  return (0,_Functions__WEBPACK_IMPORTED_MODULE_11__.getFeePerUnit)(_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.NIM, estimate.value, _CommonUtils__WEBPACK_IMPORTED_MODULE_10__.assets.value);
});
const btcFeePerUnit = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_12__.computed)(() => {
  const {
    estimate
  } = (0,_CommonUtils__WEBPACK_IMPORTED_MODULE_10__.useSwapEstimate)();
  return (0,_Functions__WEBPACK_IMPORTED_MODULE_11__.getFeePerUnit)(_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.BTC, estimate.value, _CommonUtils__WEBPACK_IMPORTED_MODULE_10__.assets.value);
}); // 48 extra weight units for BTC HTLC funding tx

const btcFeeForSendingAll = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_12__.computed)(() => (0,_BitcoinTransactionUtils__WEBPACK_IMPORTED_MODULE_7__.estimateFees)(accountUtxos.value.length, 1, btcFeePerUnit.value, 48));
const btcMaxSendableAmount = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_12__.computed)(() => Math.max(accountBtcBalance.value - btcFeeForSendingAll.value, 0));
/**
 * Sell - Functions
 */

async function updateSellEstimate({
  fiatAmount,
  cryptoAmount
}) {
  const {
    from,
    to
  } = (0,_CommonUtils__WEBPACK_IMPORTED_MODULE_10__.getFiatSwapParameters)(fiatAmount ? {
    to: {
      asset: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.EUR,
      amount: fiatAmount
    }
  } : {
    from: {
      amount: cryptoAmount
    }
  });
  const newEstimate = await (0,_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.getEstimate)( // Need to force one of the function signatures
  from, to);

  if (!newEstimate.from || !newEstimate.to) {
    throw new Error('UNEXPECTED: EUR or crypto price not present in estimate');
  } // Update local fees with latest feePerUnit values


  const {
    fundingFee
  } = (0,_CommonUtils__WEBPACK_IMPORTED_MODULE_10__.calculateFees)({
    to: _Constants__WEBPACK_IMPORTED_MODULE_6__.FiatCurrency.EUR
  }, newEstimate.from.amount, {
    eur: newEstimate.to.fee || 0,
    nim: activeCurrency.value === _Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.NIM ? newEstimate.from.feePerUnit : 0,
    btc: activeCurrency.value === _Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.BTC ? newEstimate.from.feePerUnit : 0
  });
  newEstimate.from.fee = fundingFee;
  newEstimate.to.fee = 0; // OASIS' SEPA Instant fees are already included
  // Check against minimums

  if (!newEstimate.from.amount || newEstimate.to.amount - newEstimate.to.fee <= 0) {
    // If one of the two amounts is 0 or less, that means the fees are higher than the swap amount
    if (newEstimate.from.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_1__.SwapAsset.BTC) {
      // Note: This currently only checks BTC fees!
      const btcPrice = newEstimate.from;
      const toCoinsFactor = 1e8;
      const minimumFiat = (btcPrice.fee + btcPrice.serviceNetworkFee) / toCoinsFactor * exchangeRates.value[_Constants__WEBPACK_IMPORTED_MODULE_6__.CryptoCurrency.BTC][_CommonUtils__WEBPACK_IMPORTED_MODULE_10__.selectedFiatCurrency.value];
      throw new Error(_i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_9__.i18n.t('410', {
        amount: `${_CommonUtils__WEBPACK_IMPORTED_MODULE_10__.selectedFiatCurrency.value.toUpperCase()} ${minimumFiat.toFixed(2)}`
      }));
    } else {
      throw new Error(_i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_9__.i18n.t('411'));
    }
  } // eslint-disable-line brace-style


  const {
    estimate
  } = (0,_CommonUtils__WEBPACK_IMPORTED_MODULE_10__.useSwapEstimate)();
  estimate.value = newEstimate;
}

/***/ }),

/***/ "./src/stores/Bank.ts":
/*!****************************!*\
  !*** ./src/stores/Bank.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useBankStore": function() { return /* binding */ useBankStore; }
/* harmony export */ });
/* harmony import */ var pinia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pinia */ "./node_modules/pinia/dist/pinia.esm.js");

const useBankStore = (0,pinia__WEBPACK_IMPORTED_MODULE_0__.createStore)({
  id: 'bank',
  state: () => ({
    bank: null,
    bankAccount: null
  }),
  getters: {
    bank: state => state.bank,
    bankAccount: state => state.bankAccount
  },
  actions: {
    setBank(bank) {
      var _this$state$bank;

      if (bank.BIC !== ((_this$state$bank = this.state.bank) === null || _this$state$bank === void 0 ? void 0 : _this$state$bank.BIC)) {
        this.state.bankAccount = null;
      }

      this.state.bank = bank;
    },

    setBankAccount(bankAccount) {
      this.state.bankAccount = bankAccount;
    }

  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/icons/TriangleDownIcon.vue?vue&type=style&index=0&id=04dc52e8&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/icons/TriangleDownIcon.vue?vue&type=style&index=0&id=04dc52e8&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.triangle-down-icon[data-v-04dc52e8] {\n    width: 1.25rem;\n    height: 1rem;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankCheckInput.vue?vue&type=style&index=0&id=4e468e2e&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankCheckInput.vue?vue&type=style&index=0&id=4e468e2e&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media (min-width: 426px) {\n.bank-autocomplete[data-v-4e468e2e] {\n    /* width */\n    /* Handle */\n    /* Handle on hover */\n}\n.bank-autocomplete[data-v-4e468e2e]::-webkit-scrollbar {\n    width: 6px;\n}\n.bank-autocomplete[data-v-4e468e2e]::-webkit-scrollbar-thumb {\n    --text-40: rgba(224, 220, 183, 0.4);\n    --text-50: rgba(224, 220, 183, 0.5);\n    background: var(--text-40);\n    border-radius: 6px;\n}\n.bank-autocomplete[data-v-4e468e2e]::-webkit-scrollbar-thumb:hover {\n    background: var(--text-50);\n}\n}\n.bank-check-input[data-v-4e468e2e] {\n  width: 35.5rem;\n  margin: 0 auto;\n  position: relative;\n  font-weight: 600;\n}\n.bank-check-input .label-input[data-v-4e468e2e] {\n  font-size: 3rem !important;\n}\n.bank-check-input .label-input[data-v-4e468e2e]  input {\n  width: 100% !important;\n  padding: 1.75rem 2rem;\n  padding-right: 6.5rem;\n}\n.bank-check-input .label-input[data-v-4e468e2e]  input::-moz-placeholder {\n  -moz-transition: color 200ms var(--nimiq-ease);\n  transition: color 200ms var(--nimiq-ease);\n  mask: linear-gradient(90deg, white, white calc(100% - 5rem), rgba(255, 255, 255, 0) calc(100% - 0.25rem));\n}\n.bank-check-input .label-input[data-v-4e468e2e]  input::placeholder {\n  transition: color 200ms var(--nimiq-ease);\n  -webkit-mask: linear-gradient(90deg, white, white calc(100% - 5rem), rgba(255, 255, 255, 0) calc(100% - 0.25rem));\n          mask: linear-gradient(90deg, white, white calc(100% - 5rem), rgba(255, 255, 255, 0) calc(100% - 0.25rem));\n}\n.disabled .bank-check-input .label-input[data-v-4e468e2e]  input {\n  color: var(--text-50);\n}\n.country-selector[data-v-4e468e2e] {\n  position: absolute;\n  right: 0.5rem;\n  top: 50%;\n  transform: translateY(-50%);\n}\n.country-selector[data-v-4e468e2e]  .trigger {\n  padding: 1.5rem 1rem;\n}\n.country-selector[data-v-4e468e2e]  .dropdown {\n  left: unset;\n  right: 0.25rem;\n  top: 0;\n  transform: none;\n}\n.country-selector .info[data-v-4e468e2e] {\n  font-size: var(--small-size) !important;\n  color: rgba(255, 255, 255, 0.5);\n  padding-bottom: 2.5rem !important;\n}\n.bank-autocomplete[data-v-4e468e2e] {\n  display: flex;\n  flex-direction: column;\n  overflow: visible;\n  width: 42.5rem;\n  margin: 0;\n  margin-top: -0.25rem;\n  padding: 0.5rem;\n  position: absolute;\n  z-index: 4;\n  top: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  background: var(--nimiq-blue-bg);\n  color: white;\n  border-radius: 0.5rem;\n  box-shadow: 0px 1.125rem 2.25rem rgba(0, 0, 0, 0.1);\n  list-style-type: none;\n  text-align: left;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.bank-autocomplete.scroll[data-v-4e468e2e] {\n  max-height: 37.5rem;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.bank-autocomplete li.bank[data-v-4e468e2e] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  flex-shrink: 0;\n  padding: 1rem 1.5rem;\n  border-radius: 0.25rem;\n  font-weight: 400;\n  cursor: pointer;\n  height: 7rem;\n  overflow: visible;\n  background-color: rgba(255, 255, 255, 0);\n  transition: background-color 200ms var(--nimiq-ease);\n}\n.bank-autocomplete li.bank[data-v-4e468e2e]:not(:last-child) {\n  margin-bottom: 0.5rem;\n}\n.bank-autocomplete li.bank[disabled][data-v-4e468e2e] {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.bank-autocomplete li.bank[data-v-4e468e2e]:not([disabled]):hover, .bank-autocomplete li.bank:not([disabled]).selected[data-v-4e468e2e] {\n  background-color: rgba(255, 255, 255, 0.12);\n}\n.bank-autocomplete li.bank:not([disabled]):hover .caret-right-small-icon[data-v-4e468e2e], .bank-autocomplete li.bank:not([disabled]).selected .caret-right-small-icon[data-v-4e468e2e] {\n  opacity: 1;\n}\n.bank-autocomplete li.bank > div.flex-column[data-v-4e468e2e] {\n  flex-grow: 1;\n  transform: translateY(10px);\n  white-space: nowrap;\n  overflow: hidden;\n  -webkit-mask: linear-gradient(90deg, white, white calc(100% - 5rem), rgba(255, 255, 255, 0) calc(100% - 0.5rem));\n          mask: linear-gradient(90deg, white, white calc(100% - 5rem), rgba(255, 255, 255, 0) calc(100% - 0.5rem));\n  transition: transform 200ms cubic-bezier(0.5, 0, 0.15, 1);\n}\n.bank-autocomplete li.bank > div.flex-column span[data-v-4e468e2e] {\n  font-size: 2.25rem;\n}\n.bank-autocomplete li.bank .bic[data-v-4e468e2e] {\n  opacity: 0;\n  font-weight: 500;\n  font-size: 1.625rem;\n  line-height: 110%;\n  letter-spacing: 0.0625rem;\n  margin-top: 0.5rem;\n  font-weight: 500;\n  font-family: \"Fira Mono\";\n  transition: opacity 200ms cubic-bezier(0.5, 0, 0.15, 1);\n}\n.bank-autocomplete li.bank:hover > div.flex-column[data-v-4e468e2e], .bank-autocomplete li.bank.selected > div.flex-column[data-v-4e468e2e] {\n  transform: translateY(0);\n}\n.bank-autocomplete li.bank:hover .bic[data-v-4e468e2e], .bank-autocomplete li.bank.selected .bic[data-v-4e468e2e] {\n  opacity: 0.5;\n}\n.bank-autocomplete li.bank .caret-right-small-icon[data-v-4e468e2e] {\n  opacity: 0.3;\n  transition: opacity 200ms var(--nimiq-ease);\n}\n.bank-autocomplete li.bank .circled-question-mark[data-v-4e468e2e],\n.bank-autocomplete li.bank .alert-triangle-icon[data-v-4e468e2e] {\n  flex-shrink: 0;\n  flex-grow: 0;\n}\n.bank-autocomplete li.bank .circled-question-mark.tooltip[data-v-4e468e2e]  .tooltip-box,\n.bank-autocomplete li.bank .alert-triangle-icon.tooltip[data-v-4e468e2e]  .tooltip-box {\n  width: 32rem;\n  box-shadow: 0px 18px 38px rgba(31, 35, 72, 0.14), 0px 7px 8.5px rgba(31, 35, 72, 0.08), 0px 2px 2.5px rgba(31, 35, 72, 0.04);\n}\n.bank-autocomplete li.bank .circled-question-mark svg[data-v-4e468e2e],\n.bank-autocomplete li.bank .alert-triangle-icon svg[data-v-4e468e2e] {\n  color: var(--nimiq-orange);\n}\n.bank-autocomplete li.bank .circled-question-mark p[data-v-4e468e2e],\n.bank-autocomplete li.bank .alert-triangle-icon p[data-v-4e468e2e] {\n  line-height: 130%;\n}\n.bank-autocomplete li.bank .circled-question-mark p[data-v-4e468e2e]:first-child,\n.bank-autocomplete li.bank .alert-triangle-icon p[data-v-4e468e2e]:first-child {\n  color: var(--text-100);\n  margin-bottom: 1rem;\n}\n.bank-autocomplete li.bank .circled-question-mark p[data-v-4e468e2e]:not(:first-child),\n.bank-autocomplete li.bank .alert-triangle-icon p[data-v-4e468e2e]:not(:first-child) {\n  color: var(--text-60);\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n  font-size: var(--small-size);\n}\n.bank-autocomplete li.bank .circled-question-mark p[data-v-4e468e2e]:last-child,\n.bank-autocomplete li.bank .alert-triangle-icon p[data-v-4e468e2e]:last-child {\n  margin-bottom: 0;\n}\n.bank-autocomplete .bank-icon[data-v-4e468e2e],\n.bank-autocomplete .forbidden-icon[data-v-4e468e2e] {\n  margin-right: 1rem;\n  height: 3rem;\n  width: 3rem;\n  font-size: 1.625rem;\n  letter-spacing: -0.05em;\n  flex-shrink: 0;\n}\n.bank-autocomplete .forbidden-icon[data-v-4e468e2e] {\n  height: 2.5rem;\n  width: 2.5rem;\n  margin: 0.25rem 1.25rem 0.25rem 0.25rem;\n}\n.bank-autocomplete li.more-count[data-v-4e468e2e] {\n  font-size: var(--small-size);\n  margin-left: 1.5rem;\n  margin-bottom: 1.75rem;\n}\n.bank-autocomplete li.more-count a[data-v-4e468e2e] {\n  opacity: 0.5;\n  cursor: pointer;\n}\n.bank-autocomplete li.more-count a[data-v-4e468e2e]:hover, .bank-autocomplete li.more-count a[data-v-4e468e2e]:focus {\n  opacity: 0.75;\n}\n.bank-autocomplete .cancel-bank[data-v-4e468e2e] {\n  width: 3.5rem;\n  height: 3.5rem;\n  flex-shrink: 0;\n  margin-left: -0.5rem;\n  margin-right: -0.75rem;\n  padding: 0.75rem;\n  border-radius: 50%;\n  transition: background 0.2s var(--nimiq-ease);\n}\n.bank-autocomplete .cancel-bank .nq-icon[data-v-4e468e2e] {\n  width: 100%;\n  height: 100%;\n}\n.bank-autocomplete .cancel-bank[data-v-4e468e2e]:hover, .bank-autocomplete .cancel-bank[data-v-4e468e2e]:focus {\n  background: rgba(255, 255, 255, 0.1);\n}\n.bank-autocomplete li.confirm-bank[data-v-4e468e2e] {\n  padding: 1rem;\n  font-size: var(--body-size);\n  color: rgba(255, 255, 255, 0.6);\n  white-space: pre-line;\n}\n.bank-autocomplete li.confirm-bank p[data-v-4e468e2e] {\n  margin-top: 0;\n}\n.bank-autocomplete li.confirm-bank strong[data-v-4e468e2e] {\n  color: white;\n  white-space: pre;\n}\n.bank-autocomplete li.warning[data-v-4e468e2e] {\n  font-size: var(--small-size);\n  line-height: 130%;\n  margin: 0.5rem;\n  padding: 1rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.2);\n  opacity: 0.6;\n}\n@media (max-width: 450px) {\n.bank-check-input[data-v-4e468e2e] {\n    width: 90%;\n}\n.bank-autocomplete[data-v-4e468e2e] {\n    width: 120%;\n}\n.bank-autocomplete li.bank > div.flex-column[data-v-4e468e2e] {\n    transform: translateY(0);\n}\n.bank-autocomplete li.bank .bic[data-v-4e468e2e] {\n    opacity: 0.5;\n}\n}\n@media (hover: none) {\n.bank-autocomplete li.bank > div.flex-column[data-v-4e468e2e] {\n    transform: translateY(0);\n}\n.bank-autocomplete li.bank .bic[data-v-4e468e2e] {\n    opacity: 0.5;\n}\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankIconButton.vue?vue&type=style&index=0&id=37fc9b17&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankIconButton.vue?vue&type=style&index=0&id=37fc9b17&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".bank-icon-button[data-v-37fc9b17] {\n  position: relative;\n  align-items: center;\n  width: 18rem;\n  border-radius: 0.75rem;\n  padding: 1rem;\n  transition: background var(--attr-duration) var(--nimiq-ease);\n}\n.bank-icon-button[data-v-37fc9b17]  svg.triangle-down-icon {\n  position: absolute;\n  right: 4rem;\n  top: 8rem;\n  opacity: 0.25;\n  transition: opacity var(--attr-duration) var(--nimiq-ease);\n}\n.bank-icon-button[data-v-37fc9b17]:hover, .bank-icon-button[data-v-37fc9b17]:focus {\n  background: var(--nimiq-highlight-bg);\n}\n.bank-icon-button[data-v-37fc9b17]:hover  svg.triangle-down-icon, .bank-icon-button[data-v-37fc9b17]:focus  svg.triangle-down-icon {\n  opacity: 0.4;\n}\n.bank-icon-button svg.bank-icon[data-v-37fc9b17] {\n  height: 8.25rem;\n  width: auto;\n}\n.bank-icon-button label[data-v-37fc9b17] {\n  margin-top: 1.875rem;\n  text-align: center;\n  font-weight: 600;\n  white-space: nowrap;\n  overflow: hidden;\n  width: 100%;\n  cursor: inherit;\n  -webkit-mask: linear-gradient(90deg, white, white calc(100% - 3rem), rgba(255, 255, 255, 0));\n          mask: linear-gradient(90deg, white, white calc(100% - 3rem), rgba(255, 255, 255, 0));\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/IdenticonStack.vue?vue&type=style&index=0&id=99caa762&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/IdenticonStack.vue?vue&type=style&index=0&id=99caa762&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".identicon-stack[data-v-99caa762] {\n  align-items: stretch;\n  border-radius: 0.75rem;\n  padding: 1rem;\n  position: relative;\n  width: 18rem;\n}\n.identicon-stack label[data-v-99caa762] {\n  margin-top: 1.875rem;\n  text-align: center;\n  font-weight: 600;\n  white-space: nowrap;\n  overflow: hidden;\n  width: 100%;\n  cursor: inherit;\n  -webkit-mask: linear-gradient(90deg, white, white calc(100% - 3rem), rgba(255, 255, 255, 0));\n          mask: linear-gradient(90deg, white, white calc(100% - 3rem), rgba(255, 255, 255, 0));\n}\n.identicon-stack svg.bitcoin[data-v-99caa762] {\n  color: var(--bitcoin-orange);\n  background: radial-gradient(circle at center, white 40%, transparent, transparent);\n  border-radius: 50%;\n}\n.identicon-stack .primary[data-v-99caa762] {\n  position: relative;\n  width: 9rem;\n  height: 9rem;\n  margin: -0.5rem auto 0;\n}\n.identicon-stack .secondary[data-v-99caa762] {\n  width: 7.5rem;\n  position: absolute;\n  top: 1.375rem;\n  opacity: 0.4;\n  transition: transform var(--movement-duration) var(--nimiq-ease), opacity var(--movement-duration) var(--nimiq-ease);\n}\n.identicon-stack .secondary[data-v-99caa762]:first-child {\n  left: 3rem;\n}\n.identicon-stack .secondary[data-v-99caa762]:nth-child(2) {\n  right: 3rem;\n}\n.identicon-stack .secondary:nth-child(2).bitcoin[data-v-99caa762] {\n  right: 3.25rem;\n}\n.identicon-stack .secondary.bitcoin[data-v-99caa762] {\n  height: 7rem;\n  width: 7rem;\n  margin-top: 0.25rem;\n}\n.identicon-stack[data-v-99caa762]  svg.triangle-down-icon {\n  position: absolute;\n  right: 2.5rem;\n  top: 8rem;\n  opacity: 0.25;\n  transition: opacity var(--attr-duration) var(--nimiq-ease);\n}\n.identicon-stack.triangle-indented[data-v-99caa762]  svg.triangle-down-icon {\n  right: 3.75rem;\n}\n.identicon-stack.interactive[data-v-99caa762]:hover, .identicon-stack.interactive[data-v-99caa762]:focus {\n  background: var(--nimiq-highlight-bg);\n}\n.identicon-stack.interactive:hover .secondary[data-v-99caa762]:first-child, .identicon-stack.interactive:focus .secondary[data-v-99caa762]:first-child {\n  transform: translateX(-0.375rem) scale(1.05);\n  opacity: 0.5;\n}\n.identicon-stack.interactive:hover .secondary[data-v-99caa762]:nth-child(2), .identicon-stack.interactive:focus .secondary[data-v-99caa762]:nth-child(2) {\n  transform: translateX(0.375rem) scale(1.05);\n  opacity: 0.5;\n}\n.identicon-stack.interactive[data-v-99caa762]:hover  svg.triangle-down-icon, .identicon-stack.interactive[data-v-99caa762]:focus  svg.triangle-down-icon {\n  opacity: 0.4;\n}\n.identicon-stack.interactive label[data-v-99caa762] {\n  cursor: pointer;\n}\n.identicon-stack[data-v-99caa762]:not(.interactive) {\n  cursor: default;\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InteractiveShortAddress.vue?vue&type=style&index=0&id=c96e9e4c&lang=scss&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InteractiveShortAddress.vue?vue&type=style&index=0&id=c96e9e4c&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".interactive-short-address.tooltip[data-v-c96e9e4c]  .tooltip-box {\n  padding: 1rem;\n  font-size: var(--small-size);\n  line-height: 1;\n  font-family: \"Fira Mono\", monospace;\n  font-weight: normal;\n  letter-spacing: -0.02em;\n  white-space: nowrap;\n  word-spacing: -0.2em;\n}\n.interactive-short-address.tooltip[data-v-c96e9e4c]  .trigger {\n  padding: 0.5rem 1rem;\n  border-radius: 0.5rem;\n  transition: background 300ms var(--nimiq-ease);\n  margin-bottom: 0.5rem;\n}\n.interactive-short-address.tooltip[data-v-c96e9e4c]  .trigger:hover, .interactive-short-address.tooltip[data-v-c96e9e4c]  .trigger:focus, .interactive-short-address.tooltip[data-v-c96e9e4c]  .trigger:focus-within {\n  background: var(--text-6);\n}\n.interactive-short-address.tooltip[data-v-c96e9e4c]  .trigger:hover .short-address, .interactive-short-address.tooltip[data-v-c96e9e4c]  .trigger:focus .short-address, .interactive-short-address.tooltip[data-v-c96e9e4c]  .trigger:focus-within .short-address {\n  opacity: 0.6;\n}\n.tooltip.right[data-v-c96e9e4c]  .tooltip-box {\n  transform: translate(-20%, 2rem);\n}\n.tooltip.left[data-v-c96e9e4c]  .tooltip-box {\n  transform: translate(20%, 2rem);\n}\n.short-address[data-v-c96e9e4c] {\n  font-size: var(--body-size);\n  opacity: 0.5;\n  transition: opacity 0.3s var(--nimiq-ease);\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/icons/TriangleDownIcon.vue?vue&type=style&index=0&id=04dc52e8&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/icons/TriangleDownIcon.vue?vue&type=style&index=0&id=04dc52e8&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./TriangleDownIcon.vue?vue&type=style&index=0&id=04dc52e8&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/icons/TriangleDownIcon.vue?vue&type=style&index=0&id=04dc52e8&scoped=true&lang=css&");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("c14277c2", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankCheckInput.vue?vue&type=style&index=0&id=4e468e2e&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankCheckInput.vue?vue&type=style&index=0&id=4e468e2e&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!../../node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./BankCheckInput.vue?vue&type=style&index=0&id=4e468e2e&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankCheckInput.vue?vue&type=style&index=0&id=4e468e2e&lang=scss&scoped=true&");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("78b44841", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankIconButton.vue?vue&type=style&index=0&id=37fc9b17&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankIconButton.vue?vue&type=style&index=0&id=37fc9b17&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!../../node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./BankIconButton.vue?vue&type=style&index=0&id=37fc9b17&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/BankIconButton.vue?vue&type=style&index=0&id=37fc9b17&lang=scss&scoped=true&");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("fef5a594", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/IdenticonStack.vue?vue&type=style&index=0&id=99caa762&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/IdenticonStack.vue?vue&type=style&index=0&id=99caa762&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!../../node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./IdenticonStack.vue?vue&type=style&index=0&id=99caa762&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/IdenticonStack.vue?vue&type=style&index=0&id=99caa762&lang=scss&scoped=true&");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("ca816674", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InteractiveShortAddress.vue?vue&type=style&index=0&id=c96e9e4c&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InteractiveShortAddress.vue?vue&type=style&index=0&id=c96e9e4c&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!../../node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./InteractiveShortAddress.vue?vue&type=style&index=0&id=c96e9e4c&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/InteractiveShortAddress.vue?vue&type=style&index=0&id=c96e9e4c&lang=scss&scoped=true&");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("201c04a0", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ })

}]);
//# sourceMappingURL=src_components_BankCheckInput_vue-src_components_BankIconButton_vue-src_components_IdenticonS-47e8cf.js.map