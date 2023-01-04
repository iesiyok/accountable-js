(self["webpackChunk_nimiq_wallet"] = self["webpackChunk_nimiq_wallet"] || []).push([["transaction-modal"],{

/***/ "./node_modules/@nimiq/utils/dist/module/BrowserDetection.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@nimiq/utils/dist/module/BrowserDetection.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class BrowserDetection {
    static getBrowserInfo() {
        return {
            browser: BrowserDetection.detectBrowser(),
            version: BrowserDetection.detectVersion(),
            isMobile: BrowserDetection.isMobile(),
        };
    }
    /* eslint-disable max-len */
    // Also includes tablets.
    // Inspired by:
    // - https://stackoverflow.com/a/13819253
    // - https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop
    // - http://detectmobilebrowsers.com/about (tablets)
    /* eslint-enable max-len */
    static isMobile() {
        return /i?Phone|iP(ad|od)|Android|BlackBerry|Opera Mini|WPDesktop|Mobi(le)?|Silk/i.test(navigator.userAgent);
    }
    /* eslint-disable max-len */
    // Browser tests inspired by:
    // - https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Browser_Name
    // - https://stackoverflow.com/a/26358856 (order is important)
    // Note that also this approach is very interesting: https://stackoverflow.com/a/40246491
    //
    // The following page is a great overview of example user agent strings:
    // http://www.useragentstring.com/pages/useragentstring.php?name=All
    // Example user agents:
    // - Edge: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14931
    // - Opera: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36 OPR/34.0.2036.42
    // - Firefox: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0
    // - Chrome: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
    // - Safari: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A
    // - Safari iPhone: Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1
    // - Safari iPad: Mozilla/5.0 (iPad; CPU OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0 Mobile/15C202 Safari/604.1
    // - Brave: is indistinguishable from Chrome user agents
    /* eslint-enable max-len */
    static detectBrowser() {
        if (BrowserDetection._detectedBrowser) {
            return BrowserDetection._detectedBrowser;
        }
        // note that the order is important as many browsers include the names of others in the ua.
        const ua = navigator.userAgent;
        if (/Edge\//i.test(ua)) {
            BrowserDetection._detectedBrowser = BrowserDetection.Browser.EDGE;
        }
        else if (/(Opera|OPR)\//i.test(ua)) {
            BrowserDetection._detectedBrowser = BrowserDetection.Browser.OPERA;
        }
        else if (/Firefox\//i.test(ua)) {
            BrowserDetection._detectedBrowser = BrowserDetection.Browser.FIREFOX;
        }
        else if (/Chrome\//i.test(ua)) {
            // Note that Brave is indistinguishable from Chrome by user agent. The additional check is taken from
            // https://stackoverflow.com/a/53799770. Unfortunately this distinction is not possible on mobile.
            BrowserDetection._detectedBrowser = (navigator.plugins.length === 0
                && navigator.mimeTypes.length === 0
                && !BrowserDetection.isMobile())
                ? BrowserDetection.Browser.BRAVE
                : BrowserDetection.Browser.CHROME;
        }
        else if (/^((?!chrome|android).)*safari/i.test(ua)) {
            // see https://stackoverflow.com/a/23522755
            // Note that Chrome iOS is also detected as Safari, see comments in stack overflow
            BrowserDetection._detectedBrowser = BrowserDetection.Browser.SAFARI;
        }
        else {
            BrowserDetection._detectedBrowser = BrowserDetection.Browser.UNKNOWN;
        }
        return BrowserDetection._detectedBrowser;
    }
    static detectVersion() {
        if (typeof BrowserDetection._detectedVersion !== 'undefined') {
            return BrowserDetection._detectedVersion;
        }
        let regex;
        switch (BrowserDetection.detectBrowser()) {
            case BrowserDetection.Browser.EDGE:
                regex = /Edge\/(\S+)/i;
                break;
            case BrowserDetection.Browser.OPERA:
                regex = /(Opera|OPR)\/(\S+)/i;
                break;
            case BrowserDetection.Browser.FIREFOX:
                regex = /Firefox\/(\S+)/i;
                break;
            case BrowserDetection.Browser.CHROME:
                regex = /Chrome\/(\S+)/i;
                break;
            case BrowserDetection.Browser.SAFARI:
                regex = /(iP(hone|ad|od).*?OS |Version\/)(\S+)/i;
                break;
            case BrowserDetection.Browser.BRAVE: // can't tell version for Brave
            default:
                BrowserDetection._detectedVersion = null;
                return null;
        }
        const match = navigator.userAgent.match(regex);
        if (!match) {
            BrowserDetection._detectedVersion = null;
            return null;
        }
        const versionString = match[match.length - 1].replace(/_/g, '.'); // replace _ in iOS version
        const versionParts = versionString.split('.');
        const parsedVersionParts = [];
        for (let i = 0; i < 4; ++i) {
            parsedVersionParts.push(parseInt(versionParts[i], 10) || 0);
        }
        const [major, minor, build, patch] = parsedVersionParts;
        BrowserDetection._detectedVersion = { versionString, major, minor, build, patch };
        return BrowserDetection._detectedVersion;
    }
    static isChrome() {
        return BrowserDetection.detectBrowser() === BrowserDetection.Browser.CHROME;
    }
    static isFirefox() {
        return BrowserDetection.detectBrowser() === BrowserDetection.Browser.FIREFOX;
    }
    static isOpera() {
        return BrowserDetection.detectBrowser() === BrowserDetection.Browser.OPERA;
    }
    static isEdge() {
        return BrowserDetection.detectBrowser() === BrowserDetection.Browser.EDGE;
    }
    static isSafari() {
        return BrowserDetection.detectBrowser() === BrowserDetection.Browser.SAFARI;
    }
    static isBrave() {
        return BrowserDetection.detectBrowser() === BrowserDetection.Browser.BRAVE;
    }
    static isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    static isBadIOS() {
        const browserInfo = BrowserDetection.getBrowserInfo();
        // Check for iOS < 11 or 11.2 which has the WASM bug
        return browserInfo.browser === BrowserDetection.Browser.SAFARI
            && browserInfo.isMobile
            && browserInfo.version
            // eslint-disable-next-line no-mixed-operators
            && (browserInfo.version.major < 11 || browserInfo.version.major === 11 && browserInfo.version.minor === 2);
    }
    /**
     * Detect if the browser is running in Private Browsing mode
     *
     * @returns {Promise}
     */
    static isPrivateMode() {
        return new Promise((resolve) => {
            const on = () => resolve(true); // is in private mode
            const off = () => resolve(false); // not private mode
            // using browser detection by feature detection here, also see https://stackoverflow.com/a/9851769
            // These seem to be partly outdated though. Might want to consider using user agent based detection.
            const isSafari = () => /Constructor/.test(window.HTMLElement)
                || (window.safari
                    && window.safari.pushNotification
                    && window.safari.pushNotification.toString() === '[object SafariRemoteNotification]');
            // Chrome & Opera
            if (window.webkitRequestFileSystem) {
                window.webkitRequestFileSystem(0, 0, off, on);
                return;
            }
            // Firefox
            if (document.documentElement && 'MozAppearance' in document.documentElement.style) {
                // @ts-ignore
                const db = indexedDB.open(null);
                db.onerror = on;
                db.onsuccess = off;
                return;
            }
            // Safari
            if (isSafari()) {
                try {
                    window.openDatabase(null, null, null, null);
                }
                catch (_) {
                    on();
                    return;
                }
            }
            // IE10+ & Edge
            if (!window.indexedDB && (window.PointerEvent || window.MSPointerEvent)) {
                on();
                return;
            }
            // others
            off();
        });
    }
}
(function (BrowserDetection) {
    let Browser;
    (function (Browser) {
        Browser["CHROME"] = "chrome";
        Browser["FIREFOX"] = "firefox";
        Browser["OPERA"] = "opera";
        Browser["EDGE"] = "edge";
        Browser["SAFARI"] = "safari";
        Browser["BRAVE"] = "brave";
        Browser["UNKNOWN"] = "unknown";
    })(Browser = BrowserDetection.Browser || (BrowserDetection.Browser = {}));
})(BrowserDetection || (BrowserDetection = {}));
var BrowserDetection$1 = BrowserDetection;

/* harmony default export */ __webpack_exports__["default"] = (BrowserDetection$1);
//# sourceMappingURL=BrowserDetection.js.map


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

/***/ "./src/components/modals/TransactionModal.vue":
/*!****************************************************!*\
  !*** ./src/components/modals/TransactionModal.vue ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TransactionModal_vue_vue_type_template_id_8657b790_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TransactionModal.vue?vue&type=template&id=8657b790&scoped=true& */ "./src/components/modals/TransactionModal.vue?vue&type=template&id=8657b790&scoped=true&");
/* harmony import */ var _TransactionModal_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransactionModal.vue?vue&type=script&lang=ts& */ "./src/components/modals/TransactionModal.vue?vue&type=script&lang=ts&");
/* harmony import */ var _TransactionModal_vue_vue_type_style_index_0_id_8657b790_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TransactionModal.vue?vue&type=style&index=0&id=8657b790&lang=scss&scoped=true& */ "./src/components/modals/TransactionModal.vue?vue&type=style&index=0&id=8657b790&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js */ "./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_vue_loader_v15_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TransactionModal_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TransactionModal_vue_vue_type_template_id_8657b790_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _TransactionModal_vue_vue_type_template_id_8657b790_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "8657b790",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/modals/TransactionModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

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

/***/ "./src/components/modals/TransactionModal.vue?vue&type=template&id=8657b790&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./src/components/modals/TransactionModal.vue?vue&type=template&id=8657b790&scoped=true& ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TransactionModal_vue_vue_type_template_id_8657b790_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TransactionModal_vue_vue_type_template_id_8657b790_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_vue_loader_v15_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TransactionModal_vue_vue_type_template_id_8657b790_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./TransactionModal.vue?vue&type=template&id=8657b790&scoped=true& */ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/modals/TransactionModal.vue?vue&type=template&id=8657b790&scoped=true&");


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

/***/ "./src/components/modals/TransactionModal.vue?vue&type=script&lang=ts&":
/*!*****************************************************************************!*\
  !*** ./src/components/modals/TransactionModal.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TransactionModal_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!../../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./TransactionModal.vue?vue&type=script&lang=ts& */ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/modals/TransactionModal.vue?vue&type=script&lang=ts&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TransactionModal_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

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

/***/ "./src/components/modals/TransactionModal.vue?vue&type=style&index=0&id=8657b790&lang=scss&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./src/components/modals/TransactionModal.vue?vue&type=style&index=0&id=8657b790&lang=scss&scoped=true& ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TransactionModal_vue_vue_type_style_index_0_id_8657b790_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!../../../node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!../../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./TransactionModal.vue?vue&type=style&index=0&id=8657b790&lang=scss&scoped=true& */ "./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/modals/TransactionModal.vue?vue&type=style&index=0&id=8657b790&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TransactionModal_vue_vue_type_style_index_0_id_8657b790_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TransactionModal_vue_vue_type_style_index_0_id_8657b790_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TransactionModal_vue_vue_type_style_index_0_id_8657b790_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_1_node_modules_vue_vue_loader_v15_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_0_rules_0_use_3_node_modules_vue_vue_loader_v15_lib_index_js_vue_loader_options_TransactionModal_vue_vue_type_style_index_0_id_8657b790_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


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

/***/ "./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/modals/TransactionModal.vue?vue&type=template&id=8657b790&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/modals/TransactionModal.vue?vue&type=template&id=8657b790&scoped=true& ***!
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
    "Modal",
    {
      staticClass: "transaction-modal",
      class: { "value-masked": _vm.amountsHidden }
    },
    [
      _c(
        "PageHeader",
        {
          class: {
            "inline-header":
              !_vm.peerLabel && !(_vm.isSwapProxy && !_vm.swapData)
          }
        },
        [
          _vm.isCancelledSwap
            ? [_vm._v(_vm._s(_vm.$t('100')))]
            : _vm.isSwapProxy && !_vm.swapData
            ? [_vm._v(_vm._s(_vm.$t('393')))]
            : _vm.swapData && _vm.isIncoming
            ? _c("i18n", {
                attrs: { path: '395', tag: false },
                scopedSlots: _vm._u(
                  [
                    _vm.swapData.asset === _vm.SwapAsset.BTC
                      ? {
                          key: "address",
                          fn: function() {
                            return [
                              _c("label", [
                                _vm._v(
                                  _vm._s(
                                    _vm.peerLabel ||
                                      _vm.peerAddress.substring(0, 9)
                                  )
                                )
                              ])
                            ]
                          },
                          proxy: true
                        }
                      : _vm.swapData.asset === _vm.SwapAsset.EUR
                      ? {
                          key: "address",
                          fn: function() {
                            return [
                              _c("label", [_vm._v(_vm._s(_vm.$t('174')))])
                            ]
                          },
                          proxy: true
                        }
                      : {
                          key: "address",
                          fn: function() {
                            return [
                              _vm._v(_vm._s(_vm.swapData.asset.toUpperCase()))
                            ]
                          },
                          proxy: true
                        }
                  ],
                  null,
                  true
                )
              })
            : _vm.swapData
            ? _c("i18n", {
                attrs: { path: '401', tag: false },
                scopedSlots: _vm._u(
                  [
                    _vm.swapData.asset === _vm.SwapAsset.BTC
                      ? {
                          key: "address",
                          fn: function() {
                            return [
                              _c("label", [
                                _vm._v(
                                  _vm._s(
                                    _vm.peerLabel ||
                                      _vm.peerAddress.substring(0, 9)
                                  )
                                )
                              ])
                            ]
                          },
                          proxy: true
                        }
                      : _vm.swapData.asset === _vm.SwapAsset.EUR
                      ? {
                          key: "address",
                          fn: function() {
                            return [
                              _c("label", [_vm._v(_vm._s(_vm.$t('174')))])
                            ]
                          },
                          proxy: true
                        }
                      : {
                          key: "address",
                          fn: function() {
                            return [
                              _vm._v(_vm._s(_vm.swapData.asset.toUpperCase()))
                            ]
                          },
                          proxy: true
                        }
                  ],
                  null,
                  true
                )
              })
            : _vm.peerAddress === _vm.constants.CASHLINK_ADDRESS
            ? [
                _c("label", [
                  _vm._v(
                    _vm._s(_vm.peerLabel || _vm.peerAddress.substring(0, 9))
                  )
                ])
              ]
            : _vm.isCashlink && _vm.isIncoming
            ? _c("i18n", {
                attrs: { path: '103', tag: false },
                scopedSlots: _vm._u([
                  {
                    key: "address",
                    fn: function() {
                      return [
                        _c("label", [
                          _vm._v(
                            _vm._s(
                              _vm.peerLabel || _vm.peerAddress.substring(0, 9)
                            )
                          )
                        ])
                      ]
                    },
                    proxy: true
                  }
                ])
              })
            : _vm.isCashlink && !_vm.isIncoming
            ? _c("i18n", {
                attrs: { path: '104', tag: false },
                scopedSlots: _vm._u([
                  {
                    key: "address",
                    fn: function() {
                      return [
                        _c("label", [
                          _vm._v(
                            _vm._s(
                              _vm.peerLabel || _vm.peerAddress.substring(0, 9)
                            )
                          )
                        ])
                      ]
                    },
                    proxy: true
                  }
                ])
              })
            : !_vm.isCashlink && _vm.isIncoming
            ? _c("i18n", {
                attrs: { path: '442', tag: false },
                scopedSlots: _vm._u([
                  {
                    key: "address",
                    fn: function() {
                      return [
                        _c("label", [
                          _vm._v(
                            _vm._s(
                              _vm.peerLabel || _vm.peerAddress.substring(0, 9)
                            )
                          )
                        ])
                      ]
                    },
                    proxy: true
                  }
                ])
              })
            : !_vm.isCashlink && !_vm.isIncoming
            ? _c("i18n", {
                attrs: { path: '443', tag: false },
                scopedSlots: _vm._u([
                  {
                    key: "address",
                    fn: function() {
                      return [
                        _c("label", [
                          _vm._v(
                            _vm._s(
                              _vm.peerLabel || _vm.peerAddress.substring(0, 9)
                            )
                          )
                        ])
                      ]
                    },
                    proxy: true
                  }
                ])
              })
            : _vm._e(),
          _vm.swapData &&
          _vm.swapData.asset === _vm.SwapAsset.EUR &&
          _vm.swapData.htlc &&
          _vm.swapData.htlc.settlement &&
          _vm.swapData.htlc.settlement.status !== _vm.SettlementStatus.CONFIRMED
            ? _c("TransactionDetailOasisPayoutStatus", {
                attrs: { slot: "more", data: _vm.swapData },
                slot: "more"
              })
            : _vm.state === _vm.TransactionState.NEW ||
              _vm.state === _vm.TransactionState.PENDING
            ? _c(
                "span",
                {
                  staticClass: "nq-light-blue flex-row",
                  attrs: { slot: "more" },
                  slot: "more"
                },
                [
                  _c("CircleSpinner"),
                  _vm._v(" " + _vm._s(_vm.$t('294')) + " ")
                ],
                1
              )
            : _vm.state === _vm.TransactionState.EXPIRED ||
              _vm.state === _vm.TransactionState.INVALIDATED
            ? _c(
                "span",
                {
                  staticClass: "nq-red failed flex-row",
                  attrs: { slot: "more" },
                  slot: "more"
                },
                [
                  _c("CrossIcon"),
                  _vm._v(
                    " " +
                      _vm._s(
                        _vm.state === _vm.TransactionState.EXPIRED
                          ? _vm.$t('176')
                          : _vm.$t('178')
                      ) +
                      " "
                  )
                ],
                1
              )
            : _c(
                "span",
                {
                  staticClass: "date",
                  class: _vm.isIncoming ? "nq-green" : "opacity-60",
                  attrs: { slot: "more" },
                  slot: "more"
                },
                [
                  _vm.isIncoming
                    ? _c("i18n", {
                        attrs: {
                          path: '317',
                          tag: false
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "dateAndTime",
                              fn: function() {
                                return [
                                  _vm._v(" " + _vm._s(_vm.datum) + " "),
                                  _c("strong", [_vm._v("·")]),
                                  _vm._v(" " + _vm._s(_vm.time) + " ")
                                ]
                              },
                              proxy: true
                            }
                          ],
                          null,
                          false,
                          723411224
                        )
                      })
                    : _c("i18n", {
                        attrs: { path: '365', tag: false },
                        scopedSlots: _vm._u([
                          {
                            key: "dateAndTime",
                            fn: function() {
                              return [
                                _vm._v(" " + _vm._s(_vm.datum) + " "),
                                _c("strong", [_vm._v("·")]),
                                _vm._v(" " + _vm._s(_vm.time) + " ")
                              ]
                            },
                            proxy: true
                          }
                        ])
                      })
                ],
                1
              )
        ],
        2
      ),
      _c(
        "PageBody",
        { staticClass: "flex-column", class: _vm.state },
        [
          _vm.isIncoming
            ? _c(
                "div",
                { staticClass: "flex-row sender-recipient" },
                [
                  _c(
                    "div",
                    { staticClass: "address-info flex-column" },
                    [
                      _c(
                        "div",
                        { staticClass: "identicon" },
                        [
                          _vm.swapData &&
                          _vm.swapData.asset === _vm.SwapAsset.BTC
                            ? _c("BitcoinIcon")
                            : _vm.swapData &&
                              _vm.swapData.asset === _vm.SwapAsset.EUR
                            ? _c("BankIcon")
                            : _c("Identicon", {
                                attrs: { address: _vm.peerAddress }
                              }),
                          _vm.isCashlink
                            ? _c(
                                "div",
                                { staticClass: "cashlink-or-swap" },
                                [_c("CashlinkSmallIcon")],
                                1
                              )
                            : _vm._e(),
                          _vm.swapInfo || _vm.isSwapProxy
                            ? _c(
                                "div",
                                { staticClass: "cashlink-or-swap" },
                                [_c("SwapMediumIcon")],
                                1
                              )
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm.peerAddress && (_vm.peerIsContact || !_vm.peerLabel)
                        ? _c("input", {
                            staticClass: "nq-input-s vanishing",
                            attrs: {
                              type: "text",
                              placeholder: _vm.$t('41')
                            },
                            domProps: { value: _vm.peerLabel || "" },
                            on: {
                              input: function($event) {
                                return _vm.setContact(
                                  _vm.peerAddress,
                                  $event.target.value
                                )
                              }
                            }
                          })
                        : _c("span", { staticClass: "label" }, [
                            _vm._v(_vm._s(_vm.peerLabel))
                          ]),
                      _vm.swapData && _vm.peerAddress
                        ? _c("InteractiveShortAddress", {
                            attrs: {
                              address: _vm.peerAddress,
                              tooltipPosition: "right"
                            }
                          })
                        : _vm.peerAddress &&
                          _vm.peerAddress !== _vm.constants.CASHLINK_ADDRESS
                        ? _c(
                            "Copyable",
                            { attrs: { text: _vm.peerAddress } },
                            [
                              _c("AddressDisplay", {
                                attrs: { address: _vm.peerAddress }
                              })
                            ],
                            1
                          )
                        : _vm._e()
                    ],
                    1
                  ),
                  _c("ArrowRightIcon", { staticClass: "arrow" }),
                  _c(
                    "div",
                    { staticClass: "address-info flex-column" },
                    [
                      _c("Identicon", {
                        attrs: { address: _vm.transaction.recipient }
                      }),
                      _c("span", { staticClass: "label" }, [
                        _vm._v(_vm._s(_vm.myLabel))
                      ]),
                      _vm.swapData
                        ? _c("InteractiveShortAddress", {
                            attrs: {
                              address: _vm.transaction.recipient,
                              tooltipPosition: "left"
                            }
                          })
                        : _c(
                            "Copyable",
                            { attrs: { text: _vm.transaction.recipient } },
                            [
                              _c("AddressDisplay", {
                                attrs: { address: _vm.transaction.recipient }
                              })
                            ],
                            1
                          )
                    ],
                    1
                  )
                ],
                1
              )
            : _c(
                "div",
                { staticClass: "flex-row sender-recipient" },
                [
                  _c(
                    "div",
                    { staticClass: "address-info flex-column" },
                    [
                      _c("Identicon", {
                        attrs: { address: _vm.transaction.sender }
                      }),
                      _c("span", { staticClass: "label" }, [
                        _vm._v(_vm._s(_vm.myLabel))
                      ]),
                      _vm.swapData
                        ? _c("InteractiveShortAddress", {
                            attrs: {
                              address: _vm.transaction.sender,
                              tooltipPosition: "right"
                            }
                          })
                        : _c(
                            "Copyable",
                            { attrs: { text: _vm.transaction.sender } },
                            [
                              _c("AddressDisplay", {
                                attrs: { address: _vm.transaction.sender }
                              })
                            ],
                            1
                          )
                    ],
                    1
                  ),
                  _c("ArrowRightIcon", { staticClass: "arrow" }),
                  _c(
                    "div",
                    { staticClass: "address-info flex-column" },
                    [
                      _c(
                        "div",
                        { staticClass: "identicon" },
                        [
                          _vm.peerAddress === _vm.constants.CASHLINK_ADDRESS
                            ? _c("UnclaimedCashlinkIcon")
                            : _vm.swapData &&
                              _vm.swapData.asset === _vm.SwapAsset.BTC
                            ? _c("BitcoinIcon")
                            : _vm.swapData &&
                              _vm.swapData.asset === _vm.SwapAsset.EUR
                            ? _c("BankIcon")
                            : _c("Identicon", {
                                attrs: { address: _vm.peerAddress }
                              }),
                          _vm.isCashlink
                            ? _c(
                                "div",
                                { staticClass: "cashlink-or-swap" },
                                [_c("CashlinkSmallIcon")],
                                1
                              )
                            : _vm._e(),
                          _vm.swapInfo || _vm.isSwapProxy
                            ? _c(
                                "div",
                                { staticClass: "cashlink-or-swap" },
                                [_c("SwapMediumIcon")],
                                1
                              )
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm.peerAddress && (_vm.peerIsContact || !_vm.peerLabel)
                        ? _c("input", {
                            staticClass: "nq-input-s vanishing",
                            attrs: {
                              type: "text",
                              placeholder: _vm.$t('41')
                            },
                            domProps: { value: _vm.peerLabel || "" },
                            on: {
                              input: function($event) {
                                return _vm.setContact(
                                  _vm.peerAddress,
                                  $event.target.value
                                )
                              }
                            }
                          })
                        : _c("span", { staticClass: "label" }, [
                            _vm._v(_vm._s(_vm.peerLabel))
                          ]),
                      _vm.swapData && _vm.peerAddress
                        ? _c("InteractiveShortAddress", {
                            attrs: {
                              address: _vm.peerAddress,
                              tooltipPosition: "left"
                            }
                          })
                        : _vm.peerAddress &&
                          _vm.peerAddress !== _vm.constants.CASHLINK_ADDRESS
                        ? _c(
                            "Copyable",
                            { attrs: { text: _vm.peerAddress } },
                            [
                              _c("AddressDisplay", {
                                attrs: { address: _vm.peerAddress }
                              })
                            ],
                            1
                          )
                        : _vm.hubCashlink && _vm.hubCashlink.value
                        ? _c(
                            "button",
                            {
                              staticClass: "nq-button-s manage-cashlink",
                              on: {
                                click: function($event) {
                                  return _vm.manageCashlink(
                                    _vm.hubCashlink.address
                                  )
                                },
                                mousedown: function($event) {
                                  $event.preventDefault()
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.$t('381')))]
                          )
                        : _vm.isCashlink
                        ? _c(
                            "small",
                            {
                              staticClass: "cashlink-not-available flex-column"
                            },
                            [
                              _vm._v(
                                " " +
                                  _vm._s(
                                    _vm.$t('244')
                                  ) +
                                  " "
                              )
                            ]
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              ),
          _c(
            "div",
            { staticClass: "amount-and-message flex-column" },
            [
              _c("Amount", {
                staticClass: "transaction-value",
                class: {
                  isIncoming: _vm.isIncoming,
                  "nq-light-blue":
                    _vm.state === _vm.TransactionState.NEW ||
                    _vm.state === _vm.TransactionState.PENDING,
                  "nq-green":
                    (_vm.state === _vm.TransactionState.MINED ||
                      _vm.state === _vm.TransactionState.CONFIRMED) &&
                    _vm.isIncoming
                },
                attrs: { amount: _vm.transaction.value, "value-mask": "" }
              }),
              _c(
                "div",
                { staticClass: "flex-row" },
                [
                  _vm.swapData &&
                  _vm.swapData.asset === _vm.SwapAsset.EUR &&
                  _vm.swapInfo &&
                  _vm.swapInfo.fees &&
                  _vm.swapInfo.fees.totalFee
                    ? _c(
                        "div",
                        { staticClass: "fiat-amount" },
                        [
                          _c(
                            "Tooltip",
                            [
                              _c(
                                "template",
                                { slot: "trigger" },
                                [
                                  _c("FiatAmount", {
                                    attrs: {
                                      amount:
                                        _vm.swapData.amount / 100 -
                                        ((_vm.swapInfo &&
                                          _vm.swapInfo.fees &&
                                          _vm.swapInfo.fees.totalFee) ||
                                          0) *
                                          (_vm.isIncoming ? 1 : -1),
                                      currency: _vm.swapData.asset.toLowerCase()
                                    }
                                  })
                                ],
                                1
                              ),
                              _c("span", [
                                _vm._v(_vm._s(_vm.$t('206')))
                              ]),
                              _c("p", { staticClass: "explainer" }, [
                                _vm._v(
                                  " " +
                                    _vm._s(
                                      _vm.$t(
                                        '423'
                                      )
                                    ) +
                                    " "
                                )
                              ])
                            ],
                            2
                          )
                        ],
                        1
                      )
                    : !_vm.swapData || _vm.swapData.asset !== _vm.SwapAsset.EUR
                    ? _c(
                        "transition",
                        { attrs: { name: "fade" } },
                        [
                          _vm.state === _vm.TransactionState.PENDING
                            ? _c("FiatConvertedAmount", {
                                attrs: {
                                  amount: _vm.transaction.value,
                                  "value-mask": ""
                                }
                              })
                            : _vm.fiatValue === undefined
                            ? _c("div", { staticClass: "fiat-amount" }, [
                                _vm._v(" ")
                              ])
                            : _vm.fiatValue ===
                              _vm.constants.FIAT_PRICE_UNAVAILABLE
                            ? _c("div", { staticClass: "fiat-amount" }, [
                                _vm._v(
                                  " " +
                                    _vm._s(_vm.$t('187')) +
                                    " "
                                )
                              ])
                            : _c(
                                "div",
                                { staticClass: "fiat-amount" },
                                [
                                  _c(
                                    "Tooltip",
                                    [
                                      _c(
                                        "template",
                                        { slot: "trigger" },
                                        [
                                          _c("FiatAmount", {
                                            attrs: {
                                              amount: _vm.fiatValue,
                                              currency: _vm.fiatCurrency,
                                              "value-mask": ""
                                            }
                                          })
                                        ],
                                        1
                                      ),
                                      _c("span", [
                                        _vm._v(_vm._s(_vm.$t('206')))
                                      ]),
                                      _c("p", { staticClass: "explainer" }, [
                                        _vm._v(
                                          " " +
                                            _vm._s(
                                              _vm.$t(
                                                '423'
                                              )
                                            ) +
                                            " "
                                        )
                                      ])
                                    ],
                                    2
                                  )
                                ],
                                1
                              )
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm.swapData &&
                  (_vm.swapTransaction ||
                    _vm.swapData.asset === _vm.SwapAsset.EUR)
                    ? [
                        _vm.swapData.asset !== _vm.SwapAsset.EUR ||
                        (_vm.swapInfo &&
                          _vm.swapInfo.fees &&
                          _vm.swapInfo.fees.totalFee)
                          ? _c(
                              "svg",
                              {
                                staticClass: "dot",
                                attrs: {
                                  viewBox: "0 0 3 3",
                                  width: "3",
                                  height: "3",
                                  xmlns: "http://www.w3.org/2000/svg"
                                }
                              },
                              [
                                _c("circle", {
                                  attrs: {
                                    cx: "1.5",
                                    cy: "1.5",
                                    r: "1.5",
                                    fill: "currentColor"
                                  }
                                })
                              ]
                            )
                          : _vm._e(),
                        _vm.swapData.asset === _vm.SwapAsset.BTC &&
                        _vm.swapTransaction
                          ? _c(
                              "button",
                              {
                                staticClass: "swap-other-side reset flex-row",
                                class: { incoming: !_vm.isIncoming },
                                on: {
                                  click: function($event) {
                                    return _vm.$router.replace(
                                      "/btc-transaction/" +
                                        _vm.swapTransaction.transactionHash
                                    )
                                  }
                                }
                              },
                              [
                                _c(
                                  "div",
                                  { staticClass: "icon" },
                                  [
                                    _vm.isIncoming
                                      ? _c("GroundedArrowUpIcon")
                                      : _c("GroundedArrowDownIcon")
                                  ],
                                  1
                                ),
                                _c("Amount", {
                                  staticClass: "swapped-amount",
                                  attrs: {
                                    amount:
                                      _vm.swapTransaction.outputs[0].value,
                                    currency: _vm.swapData.asset.toLowerCase(),
                                    "value-mask": ""
                                  }
                                })
                              ],
                              1
                            )
                          : _vm.swapData.asset === _vm.SwapAsset.EUR
                          ? _c(
                              "div",
                              {
                                staticClass: "swap-other-side flex-row",
                                class: { incoming: !_vm.isIncoming }
                              },
                              [
                                _c(
                                  "div",
                                  { staticClass: "icon" },
                                  [
                                    _vm.isIncoming
                                      ? _c("GroundedArrowUpIcon")
                                      : _c("GroundedArrowDownIcon")
                                  ],
                                  1
                                ),
                                _c("FiatAmount", {
                                  staticClass: "swapped-amount",
                                  attrs: {
                                    amount: _vm.swapData.amount / 100,
                                    currency: _vm.swapData.asset.toLowerCase(),
                                    "value-mask": ""
                                  }
                                })
                              ],
                              1
                            )
                          : _vm._e()
                      ]
                    : _vm._e()
                ],
                2
              ),
              _vm.data
                ? _c("div", { staticClass: "message" }, [
                    _vm._v(_vm._s(_vm.data))
                  ])
                : _vm._e()
            ],
            1
          ),
          _vm.showRefundButton
            ? _c(
                "button",
                {
                  staticClass: "nq-button-s",
                  on: {
                    click: _vm.refundHtlc,
                    mousedown: function($event) {
                      $event.preventDefault()
                    }
                  }
                },
                [_vm._v(" " + _vm._s(_vm.$t('327')) + " ")]
              )
            : _c("div", { staticClass: "flex-spacer" }),
          _c(
            "Tooltip",
            {
              staticClass: "info-tooltip",
              attrs: { preferredPosition: "bottom right" }
            },
            [
              _c("InfoCircleSmallIcon", {
                attrs: { slot: "trigger" },
                slot: "trigger"
              }),
              _vm.transaction.blockHeight
                ? _c("span", { staticClass: "block" }, [
                    _vm._v(
                      " " +
                        _vm._s(
                          _vm.$t('77', {
                            height: _vm.transaction.blockHeight
                          })
                        ) +
                        " "
                    )
                  ])
                : _vm._e(),
              _c("span", { staticClass: "confirmations" }, [
                _vm._v(
                  " " +
                    _vm._s(
                      _vm.$tc(
                        '6',
                        _vm.confirmations
                      )
                    ) +
                    " "
                )
              ]),
              _vm.transaction.fee
                ? _c("i18n", {
                    staticClass: "fee",
                    attrs: { tag: "span", path: '13' },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "fee",
                          fn: function() {
                            return [
                              _c("Amount", {
                                attrs: { amount: _vm.transaction.fee }
                              })
                            ]
                          },
                          proxy: true
                        }
                      ],
                      null,
                      false,
                      1307764750
                    )
                  })
                : _vm._e(),
              _c(
                "BlueLink",
                {
                  attrs: {
                    href: _vm.explorerTxLink(
                      "NIM",
                      _vm.transaction.transactionHash
                    ),
                    target: "_blank",
                    rel: "noopener"
                  }
                },
                [_vm._v(" " + _vm._s(_vm.$t('78')) + " ")]
              )
            ],
            1
          )
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

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/modals/TransactionModal.vue?vue&type=script&lang=ts&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/modals/TransactionModal.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.module.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/BrowserDetection.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/AddressBook.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/fastspot-api */ "./node_modules/@nimiq/fastspot-api/dist/index.js");
/* harmony import */ var _nimiq_oasis_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/oasis-api */ "./node_modules/@nimiq/oasis-api/dist/OasisApi.js");
/* harmony import */ var _Amount_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Amount.vue */ "./src/components/Amount.vue");
/* harmony import */ var _FiatConvertedAmount_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../FiatConvertedAmount.vue */ "./src/components/FiatConvertedAmount.vue");
/* harmony import */ var _Modal_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Modal.vue */ "./src/components/modals/Modal.vue");
/* harmony import */ var _icons_UnclaimedCashlinkIcon_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../icons/UnclaimedCashlinkIcon.vue */ "./src/components/icons/UnclaimedCashlinkIcon.vue");
/* harmony import */ var _BlueLink_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../BlueLink.vue */ "./src/components/BlueLink.vue");
/* harmony import */ var _icons_BitcoinIcon_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../icons/BitcoinIcon.vue */ "./src/components/icons/BitcoinIcon.vue");
/* harmony import */ var _icons_BankIcon_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../icons/BankIcon.vue */ "./src/components/icons/BankIcon.vue");
/* harmony import */ var _icons_GroundedArrowUpIcon_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../icons/GroundedArrowUpIcon.vue */ "./src/components/icons/GroundedArrowUpIcon.vue");
/* harmony import */ var _icons_GroundedArrowDownIcon_vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../icons/GroundedArrowDownIcon.vue */ "./src/components/icons/GroundedArrowDownIcon.vue");
/* harmony import */ var _icons_SwapMediumIcon_vue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../icons/SwapMediumIcon.vue */ "./src/components/icons/SwapMediumIcon.vue");
/* harmony import */ var _stores_Transactions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../stores/Transactions */ "./src/stores/Transactions.ts");
/* harmony import */ var _stores_Address__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../stores/Address */ "./src/stores/Address.ts");
/* harmony import */ var _stores_Contacts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../stores/Contacts */ "./src/stores/Contacts.ts");
/* harmony import */ var _stores_Fiat__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../stores/Fiat */ "./src/stores/Fiat.ts");
/* harmony import */ var _stores_Settings__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../stores/Settings */ "./src/stores/Settings.ts");
/* harmony import */ var _stores_Network__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../stores/Network */ "./src/stores/Network.ts");
/* harmony import */ var _lib_NumberFormatting__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../lib/NumberFormatting */ "./src/lib/NumberFormatting.ts");
/* harmony import */ var _lib_DataFormatting__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../lib/DataFormatting */ "./src/lib/DataFormatting.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_ProxyDetection__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../lib/ProxyDetection */ "./src/lib/ProxyDetection.ts");
/* harmony import */ var _stores_Proxy__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../stores/Proxy */ "./src/stores/Proxy.ts");
/* harmony import */ var _hub__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../hub */ "./src/hub.ts");
/* harmony import */ var _stores_Swaps__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../stores/Swaps */ "./src/stores/Swaps.ts");
/* harmony import */ var _stores_BtcTransactions__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../stores/BtcTransactions */ "./src/stores/BtcTransactions.ts");
/* harmony import */ var _network__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../network */ "./src/network.ts");
/* harmony import */ var _stores_Account__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../stores/Account */ "./src/stores/Account.ts");
/* harmony import */ var _lib_ExplorerUtils__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../lib/ExplorerUtils */ "./src/lib/ExplorerUtils.ts");
/* harmony import */ var _InteractiveShortAddress_vue__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../InteractiveShortAddress.vue */ "./src/components/InteractiveShortAddress.vue");
/* harmony import */ var _TransactionDetailOasisPayoutStatus_vue__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../TransactionDetailOasisPayoutStatus.vue */ "./src/components/TransactionDetailOasisPayoutStatus.vue");









 // import HistoricValueIcon from '../icons/HistoricValueIcon.vue';


























/* harmony default export */ __webpack_exports__["default"] = ((0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.defineComponent)({
  name: 'transaction-modal',
  props: {
    hash: {
      type: String,
      required: true
    }
  },

  setup(props, context) {
    const constants = {
      FIAT_PRICE_UNAVAILABLE: _lib_Constants__WEBPACK_IMPORTED_MODULE_22__.FIAT_PRICE_UNAVAILABLE,
      CASHLINK_ADDRESS: _lib_Constants__WEBPACK_IMPORTED_MODULE_22__.CASHLINK_ADDRESS
    };
    const transaction = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => (0,_stores_Transactions__WEBPACK_IMPORTED_MODULE_14__.useTransactionsStore)().state.transactions[props.hash]);
    const {
      activeAddressInfo,
      state: addresses$
    } = (0,_stores_Address__WEBPACK_IMPORTED_MODULE_15__.useAddressStore)();
    const {
      getLabel,
      setContact
    } = (0,_stores_Contacts__WEBPACK_IMPORTED_MODULE_16__.useContactsStore)();
    const state = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => transaction.value.state);
    const isIncoming = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => {
      const haveSender = !!addresses$.addressInfos[transaction.value.sender];
      const haveRecipient = !!addresses$.addressInfos[transaction.value.recipient];
      if (haveSender && !haveRecipient) return false;
      if (!haveSender && haveRecipient) return true; // Fall back to comparing with active address

      return transaction.value.recipient === activeAddressInfo.value.address;
    });
    const myLabel = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => addresses$.addressInfos[isIncoming.value ? transaction.value.recipient : transaction.value.sender].label); // Data & Cashlink Data

    const isCashlink = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => (0,_lib_ProxyDetection__WEBPACK_IMPORTED_MODULE_23__.isProxyData)(transaction.value.data.raw, _lib_ProxyDetection__WEBPACK_IMPORTED_MODULE_23__.ProxyType.CASHLINK));
    const hubCashlink = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => {
      if (!isCashlink.value) return null;
      const {
        state: proxies$
      } = (0,_stores_Proxy__WEBPACK_IMPORTED_MODULE_24__.useProxyStore)();
      const cashlinkAddress = isIncoming.value ? transaction.value.sender : transaction.value.recipient;
      const cashlink = proxies$.hubCashlinks[cashlinkAddress];
      if (cashlink) return cashlink;
      /**
       * In all browsers in iOS and also in Safari for Mac, we are unable to access
       * stored cashlinks from the Hub, because those browsers deny access to
       * IndexedDB in iframes (and we can't store the cashlinks in cookies like we
       * do for accounts & addresses, as that would occupy valuable cookie space,
       * which is limited to 4kb).
       * What we do instead in those browsers is to always show the "Show Link" button
       * as long as we are uncertain if the Hub has this cashlink or not. Because
       * when the user clicks the button and opens the Hub, we get one of three results:
       * 1. The Hub errors, and we know that the Hub DOES NOT have the cashlink.
       *    This is handled in the hub interface (/hub.ts) in the manageCashlink() method,
       *    by storing a dummy cashlink object with a value of 0 (explained below).
       * 2. The Hub returns a cashlink object, which we can store and now know that the
       *    Hub DOES have the cashlink data.
       * 3. The user closes the popup with the window controls instead of with the "Done"
       *    button in the Hub, which gives us no info and does not change anything.
       *
       * # Why set the value to 0?
       * To identify which cashlinks are stored in the Hub and which aren't, we are
       * using the cashlink value, since for real cashlinks this cannot be 0. So when
       * the cashlink's value is 0, we know this is a not-stored cashlink.
       */

      if (_nimiq_utils__WEBPACK_IMPORTED_MODULE_34__["default"].isIOS() || _nimiq_utils__WEBPACK_IMPORTED_MODULE_34__["default"].isSafari()) {
        return {
          address: cashlinkAddress,
          message: '',
          value: 1
        };
      }

      return null;
    }); // Related Transaction

    const {
      state: transactions$
    } = (0,_stores_Transactions__WEBPACK_IMPORTED_MODULE_14__.useTransactionsStore)();
    const relatedTx = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => {
      if (!transaction.value.relatedTransactionHash) return null;
      return transactions$.transactions[transaction.value.relatedTransactionHash] || null;
    });
    const {
      getSwapByTransactionHash
    } = (0,_stores_Swaps__WEBPACK_IMPORTED_MODULE_26__.useSwapsStore)();
    const swapInfo = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => getSwapByTransactionHash.value(transaction.value.transactionHash) || (transaction.value.relatedTransactionHash ? getSwapByTransactionHash.value(transaction.value.relatedTransactionHash) : null));
    const swapData = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => {
      var _swapInfo$value, _swapInfo$value2;

      return (isIncoming.value ? (_swapInfo$value = swapInfo.value) === null || _swapInfo$value === void 0 ? void 0 : _swapInfo$value.in : (_swapInfo$value2 = swapInfo.value) === null || _swapInfo$value2 === void 0 ? void 0 : _swapInfo$value2.out) || null;
    }); // Note: the htlc proxy tx that is not funding or redeeming the htlc itself, i.e. the one we are displaying here
    // related to our address, always holds the proxy data.

    const isSwapProxy = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => (0,_lib_ProxyDetection__WEBPACK_IMPORTED_MODULE_23__.isProxyData)(transaction.value.data.raw, _lib_ProxyDetection__WEBPACK_IMPORTED_MODULE_23__.ProxyType.HTLC_PROXY));
    const isCancelledSwap = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => {
      var _swapInfo$value3, _swapInfo$value4, _relatedTx$value, _relatedTx$value2;

      return ((_swapInfo$value3 = swapInfo.value) === null || _swapInfo$value3 === void 0 ? void 0 : _swapInfo$value3.in) && ((_swapInfo$value4 = swapInfo.value) === null || _swapInfo$value4 === void 0 ? void 0 : _swapInfo$value4.out) && swapInfo.value.in.asset === swapInfo.value.out.asset // Funded proxy and then refunded without creating an actual htlc?
      || isSwapProxy.value && (isIncoming.value ? transaction.value.recipient === ((_relatedTx$value = relatedTx.value) === null || _relatedTx$value === void 0 ? void 0 : _relatedTx$value.sender) : transaction.value.sender === ((_relatedTx$value2 = relatedTx.value) === null || _relatedTx$value2 === void 0 ? void 0 : _relatedTx$value2.recipient));
    });
    const swapTransaction = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => {
      if (!swapData.value) return null;

      if (swapData.value.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_2__.SwapAsset.BTC) {
        const btcTx = (0,_stores_BtcTransactions__WEBPACK_IMPORTED_MODULE_27__.useBtcTransactionsStore)().state.transactions[swapData.value.transactionHash];
        if (!btcTx) return null;
        return { ...btcTx,
          outputs: [btcTx.outputs[swapData.value.outputIndex]]
        };
      }

      return null;
    });
    const data = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => {
      if (hubCashlink.value && hubCashlink.value.message) return hubCashlink.value.message;
      if (swapData.value && !isCancelledSwap.value) return '';

      if ('hashRoot' in transaction.value.data || relatedTx.value && 'hashRoot' in relatedTx.value.data) {
        return context.root.$t('207');
      }

      if ('hashRoot' in transaction.value.proof || relatedTx.value && 'hashRoot' in relatedTx.value.proof) {
        return context.root.$t('209');
      }

      if ('creator' in transaction.value.proof || relatedTx.value && 'creator' in relatedTx.value.proof // if we have an incoming tx from a HTLC proxy but none of the above conditions met, the tx and related
      // tx are regular transactions and we regard the tx from the proxy as refund
      || relatedTx.value && isSwapProxy.value && isIncoming.value) {
        return context.root.$t('208');
      }

      return (0,_lib_DataFormatting__WEBPACK_IMPORTED_MODULE_21__.parseData)(transaction.value.data.raw);
    }); // Peer

    const peerAddress = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => {
      if (swapData.value) {
        if (swapData.value.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_2__.SwapAsset.BTC) {
          return swapTransaction.value ? isIncoming.value ? swapTransaction.value.inputs[0].address : swapTransaction.value.outputs[0].address : ''; // we don't know the peer address
        }

        if (swapData.value.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_2__.SwapAsset.EUR) {
          return swapData.value.iban || '';
        }
      } // For Cashlinks and swap proxies


      if (relatedTx.value) {
        return isIncoming.value ? relatedTx.value.sender // This is a claiming tx, so the related tx is the funding one
        : relatedTx.value.recipient; // This is a funding tx, so the related tx is the claiming one
      }

      if (isSwapProxy.value) return ''; // avoid displaying proxy address identicon until we know related address

      if (isCashlink.value) return constants.CASHLINK_ADDRESS; // No related tx yet, show placeholder

      return isIncoming.value ? transaction.value.sender : transaction.value.recipient;
    });
    const peerLabel = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => {
      if (isSwapProxy.value && !relatedTx.value) {
        return context.root.$t('393'); // avoid displaying the proxy address until we know related peer address
      }

      if (isCancelledSwap.value) {
        return context.root.$t('100');
      }

      if (swapData.value) {
        if (swapData.value.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_2__.SwapAsset.BTC) {
          return context.root.$t('74');
        }

        if (swapData.value.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_2__.SwapAsset.EUR) {
          return swapData.value.bankLabel || context.root.$t('70');
        }

        return swapData.value.asset.toUpperCase();
      } // Label cashlinks


      if (peerAddress.value === constants.CASHLINK_ADDRESS) {
        return isIncoming.value ? context.root.$t('102') : context.root.$t('450');
      } // Search other stored addresses


      const ownedAddressInfo = addresses$.addressInfos[peerAddress.value];
      if (ownedAddressInfo) return ownedAddressInfo.label; // Search contacts

      if (getLabel.value(peerAddress.value)) return getLabel.value(peerAddress.value); // Search global address book

      const globalLabel = _nimiq_utils__WEBPACK_IMPORTED_MODULE_35__.AddressBook.getLabel(peerAddress.value);
      if (globalLabel) return globalLabel;
      return false;
    });
    const peerIsContact = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => !!peerAddress.value && !!getLabel.value(peerAddress.value)); // Date

    const date = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => transaction.value.timestamp && new Date(transaction.value.timestamp * 1000));
    const datum = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => date.value && date.value.toLocaleDateString());
    const time = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => date.value && `${(0,_lib_NumberFormatting__WEBPACK_IMPORTED_MODULE_20__.twoDigit)(date.value.getHours())}:${(0,_lib_NumberFormatting__WEBPACK_IMPORTED_MODULE_20__.twoDigit)(date.value.getMinutes())}`); // Fiat currency

    const {
      currency: fiatCurrency
    } = (0,_stores_Fiat__WEBPACK_IMPORTED_MODULE_17__.useFiatStore)();
    const fiatValue = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => transaction.value.fiatValue ? transaction.value.fiatValue[fiatCurrency.value] : undefined);
    const {
      height: blockHeight
    } = (0,_stores_Network__WEBPACK_IMPORTED_MODULE_19__.useNetworkStore)();
    const confirmations = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => transaction.value.blockHeight ? blockHeight.value - transaction.value.blockHeight + 1 : 0);
    const {
      amountsHidden
    } = (0,_stores_Settings__WEBPACK_IMPORTED_MODULE_18__.useSettingsStore)();
    const showRefundButton = (0,_vue_composition_api__WEBPACK_IMPORTED_MODULE_33__.computed)(() => {
      var _swapInfo$value5, _swapInfo$value5$in, _swapInfo$value$in$ht, _useAccountStore$acti;

      return !isIncoming.value && ( // funded but not redeemed htlc which is now expired
      ((_swapInfo$value5 = swapInfo.value) === null || _swapInfo$value5 === void 0 ? void 0 : (_swapInfo$value5$in = _swapInfo$value5.in) === null || _swapInfo$value5$in === void 0 ? void 0 : _swapInfo$value5$in.asset) === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_2__.SwapAsset.NIM && (((_swapInfo$value$in$ht = swapInfo.value.in.htlc) === null || _swapInfo$value$in$ht === void 0 ? void 0 : _swapInfo$value$in$ht.timeoutBlockHeight) || Number.POSITIVE_INFINITY) <= blockHeight.value && !swapInfo.value.out // funded but not redeemed htlc proxy (no actual htlc had been created)
      || isSwapProxy.value && !relatedTx.value && transaction.value.state === _stores_Transactions__WEBPACK_IMPORTED_MODULE_14__.TransactionState.CONFIRMED && transaction.value.blockHeight <= blockHeight.value - 15 // consider proxy "expired" after 15 blocks
      ) // Only display the refund button for Ledger accounts as the Keyguard signs automatic refund transaction.
      // Note that we only check the active account here to save us scanning through all our accounts as typically
      // the transaction modal is opened from our current account's transaction history.
      && ((_useAccountStore$acti = (0,_stores_Account__WEBPACK_IMPORTED_MODULE_29__.useAccountStore)().activeAccountInfo.value) === null || _useAccountStore$acti === void 0 ? void 0 : _useAccountStore$acti.type) === _stores_Account__WEBPACK_IMPORTED_MODULE_29__.AccountType.LEDGER;
    });

    async function refundHtlc() {
      var _swapInfo$value6, _swapInfo$value6$in;

      const htlcDetails = (_swapInfo$value6 = swapInfo.value) === null || _swapInfo$value6 === void 0 ? void 0 : (_swapInfo$value6$in = _swapInfo$value6.in) === null || _swapInfo$value6$in === void 0 ? void 0 : _swapInfo$value6$in.htlc;
      if (!htlcDetails && !isSwapProxy.value) throw new Error('Unexpected: unknown HTLC refund details'); // eslint-disable-next-line no-async-promise-executor

      const requestPromise = new Promise(async resolve => {
        var _relatedTx$value3;

        const assets = await (0,_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_2__.getAssets)();
        const {
          feePerUnit
        } = assets[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_2__.SwapAsset.NIM];
        const fee = feePerUnit * 167; // 167 = NIM HTLC refunding tx size

        const request = {
          accountId: (0,_stores_Account__WEBPACK_IMPORTED_MODULE_29__.useAccountStore)().activeAccountId.value,
          refund: {
            type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_2__.SwapAsset.NIM,
            sender: ((_relatedTx$value3 = relatedTx.value) === null || _relatedTx$value3 === void 0 ? void 0 : _relatedTx$value3.recipient) || transaction.value.recipient,
            recipient: htlcDetails && !isSwapProxy.value ? htlcDetails.refundAddress // My address, must be refund address of HTLC
            : transaction.value.sender,
            value: transaction.value.value - fee,
            fee,
            validityStartHeight: blockHeight.value
          }
        };
        resolve(request);
      });
      const tx = await (0,_hub__WEBPACK_IMPORTED_MODULE_25__.refundSwap)(requestPromise);
      if (!tx) return;
      const plainTx = await (0,_network__WEBPACK_IMPORTED_MODULE_28__.sendTransaction)(tx);
      await context.root.$nextTick();
      context.root.$router.replace(`/transaction/${plainTx.transactionHash}`);
    }

    return {
      transaction,
      constants,
      state,
      TransactionState: _stores_Transactions__WEBPACK_IMPORTED_MODULE_14__.TransactionState,
      datum,
      time,
      data,
      fiatCurrency,
      fiatValue,
      isCashlink,
      isIncoming,
      isCancelledSwap,
      isSwapProxy,
      peerAddress,
      peerLabel,
      myLabel,
      confirmations,
      peerIsContact,
      setContact,
      hubCashlink,
      manageCashlink: _hub__WEBPACK_IMPORTED_MODULE_25__.manageCashlink,
      amountsHidden,
      swapInfo,
      swapData,
      swapTransaction,
      SwapAsset: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_2__.SwapAsset,
      showRefundButton,
      refundHtlc,
      explorerTxLink: _lib_ExplorerUtils__WEBPACK_IMPORTED_MODULE_30__.explorerTxLink,
      SettlementStatus: _nimiq_oasis_api__WEBPACK_IMPORTED_MODULE_3__.SettlementStatus
    };
  },

  components: {
    Amount: _Amount_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    FiatConvertedAmount: _FiatConvertedAmount_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    ArrowRightIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__.ArrowRightIcon,
    Identicon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__.Identicon,
    PageBody: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__.PageBody,
    PageHeader: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__.PageHeader,
    Modal: _Modal_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
    Copyable: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__.Copyable,
    AddressDisplay: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__.AddressDisplay,
    FiatAmount: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__.FiatAmount,
    Tooltip: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip,
    InfoCircleSmallIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__.InfoCircleSmallIcon,
    CircleSpinner: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__.CircleSpinner,
    CrossIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__.CrossIcon,
    CashlinkSmallIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_1__.CashlinkSmallIcon,
    UnclaimedCashlinkIcon: _icons_UnclaimedCashlinkIcon_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
    // HistoricValueIcon,
    BlueLink: _BlueLink_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
    BitcoinIcon: _icons_BitcoinIcon_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
    BankIcon: _icons_BankIcon_vue__WEBPACK_IMPORTED_MODULE_10__["default"],
    GroundedArrowUpIcon: _icons_GroundedArrowUpIcon_vue__WEBPACK_IMPORTED_MODULE_11__["default"],
    GroundedArrowDownIcon: _icons_GroundedArrowDownIcon_vue__WEBPACK_IMPORTED_MODULE_12__["default"],
    SwapMediumIcon: _icons_SwapMediumIcon_vue__WEBPACK_IMPORTED_MODULE_13__["default"],
    InteractiveShortAddress: _InteractiveShortAddress_vue__WEBPACK_IMPORTED_MODULE_31__["default"],
    TransactionDetailOasisPayoutStatus: _TransactionDetailOasisPayoutStatus_vue__WEBPACK_IMPORTED_MODULE_32__["default"]
  }
}));

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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/modals/TransactionModal.vue?vue&type=style&index=0&id=8657b790&lang=scss&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/modals/TransactionModal.vue?vue&type=style&index=0&id=8657b790&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".page-header[data-v-8657b790]  .nq-h1 {\n  margin-left: 2rem;\n  margin-right: 2rem;\n  max-width: calc(100% - 4rem);\n  white-space: nowrap;\n  overflow: hidden;\n  margin-bottom: 1rem;\n  -webkit-mask: linear-gradient(90deg, white, white calc(100% - 4rem), rgba(255, 255, 255, 0));\n          mask: linear-gradient(90deg, white, white calc(100% - 4rem), rgba(255, 255, 255, 0));\n}\n.page-header span[data-v-8657b790] {\n  font-size: var(--body-size);\n  font-weight: 600;\n  align-items: center;\n  justify-content: center;\n}\n.page-header span.date[data-v-8657b790] {\n  display: block;\n}\n.page-header span[data-v-8657b790]  .circle-spinner, .page-header span.failed svg[data-v-8657b790] {\n  margin-right: 1rem;\n}\n.page-header.inline-header[data-v-8657b790] {\n  display: flex;\n  flex-direction: column;\n}\n.page-header.inline-header[data-v-8657b790]  .nq-h1 {\n  align-self: center;\n}\n.page-body[data-v-8657b790] {\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 3rem;\n}\n.page-body.expired .identicon[data-v-8657b790], .page-body.invalidated .identicon[data-v-8657b790] {\n  filter: saturate(0);\n  opacity: 0.5;\n}\n.page-body.expired .label[data-v-8657b790], .page-body.invalidated .label[data-v-8657b790] {\n  opacity: 0.5;\n}\n.page-body.expired .address-display[data-v-8657b790], .page-body.invalidated .address-display[data-v-8657b790] {\n  opacity: 0.3;\n}\n.page-body.expired .amount-and-message[data-v-8657b790], .page-body.invalidated .amount-and-message[data-v-8657b790] {\n  opacity: 0.4;\n}\n.page-body button.swap-other-side[data-v-8657b790] {\n  border-radius: 8rem;\n  padding: 0.25rem 1.5rem;\n  margin: -0.25rem -1.5rem;\n  transition: background-color var(--transition-time) var(--nimiq-ease);\n}\n.page-body button.swap-other-side[data-v-8657b790]:hover, .page-body button.swap-other-side[data-v-8657b790]:focus {\n  background-color: #F2F2F4;\n}\n.page-body button.swap-other-side.incoming[data-v-8657b790]:hover, .page-body button.swap-other-side.incoming[data-v-8657b790]:focus {\n  background-color: #EDFAF8;\n}\n.opacity-60[data-v-8657b790] {\n  opacity: 0.6;\n}\n.sender-recipient[data-v-8657b790] {\n  justify-content: space-between;\n  width: 100%;\n  padding: 0 1rem;\n}\n.sender-recipient .arrow[data-v-8657b790] {\n  font-size: 3rem;\n  margin-top: 2.5rem;\n  opacity: 0.4;\n  flex-shrink: 0;\n}\n.address-info[data-v-8657b790] {\n  align-items: center;\n  width: 19rem;\n}\n.identicon[data-v-8657b790] {\n  position: relative;\n  width: 9rem;\n  height: 9rem;\n  margin: -0.5rem 0;\n}\n.identicon > .identicon[data-v-8657b790] {\n  margin: 0;\n}\n.identicon svg[data-v-8657b790] {\n  width: 100%;\n  height: 100%;\n}\n.identicon > svg[data-v-8657b790] {\n  width: 8rem;\n  height: 8rem;\n  margin: 0.5rem;\n}\n.identicon > svg.bitcoin[data-v-8657b790] {\n  color: var(--bitcoin-orange);\n}\n.identicon img[data-v-8657b790] {\n  display: block;\n  height: 100%;\n}\n.identicon .cashlink-or-swap[data-v-8657b790] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  bottom: -0.675rem;\n  right: -0.25rem;\n  color: white;\n  background: var(--nimiq-blue-bg);\n  border: 0.375rem solid white;\n  border-radius: 3rem;\n  height: 3.75rem;\n  width: 3.75rem;\n}\n.label[data-v-8657b790],\n.nq-input-s[data-v-8657b790] {\n  font-size: var(--body-size);\n  font-weight: 600;\n  text-align: center;\n}\n.label[data-v-8657b790] {\n  margin: 2rem 0 1rem;\n  white-space: nowrap;\n  overflow: hidden;\n  width: 100%;\n  -webkit-mask: linear-gradient(90deg, white, white calc(100% - 3rem), rgba(255, 255, 255, 0));\n          mask: linear-gradient(90deg, white, white calc(100% - 3rem), rgba(255, 255, 255, 0));\n}\n.nq-input-s[data-v-8657b790] {\n  margin: 1.25rem 0 0.375rem;\n  max-width: 100%;\n}\n.nq-input-s[data-v-8657b790]:not(:focus):not(:hover) {\n  -webkit-mask: linear-gradient(90deg, white, white calc(100% - 4rem), rgba(255, 255, 255, 0) calc(100% - 1rem));\n          mask: linear-gradient(90deg, white, white calc(100% - 4rem), rgba(255, 255, 255, 0) calc(100% - 1rem));\n}\n.copyable[data-v-8657b790] {\n  padding: 0rem;\n}\n.copyable:hover .address-display[data-v-8657b790], .copyable:focus .address-display[data-v-8657b790], .copyable.copied .address-display[data-v-8657b790] {\n  opacity: 1;\n  font-weight: 500;\n}\n.address-display[data-v-8657b790] {\n  font-size: var(--body-size);\n  transition: opacity 0.3s var(--nimiq-ease);\n}\n.address-display[data-v-8657b790]  .chunk {\n  margin: 0.5rem 0;\n}\n.manage-cashlink[data-v-8657b790] {\n  margin-top: 3rem;\n}\n.cashlink-not-available[data-v-8657b790] {\n  justify-content: center;\n  font-size: var(--small-size);\n  font-weight: 600;\n  opacity: 0.5;\n  text-align: center;\n  height: 9rem;\n}\n.amount-and-message[data-v-8657b790] {\n  align-items: center;\n  margin: 4rem 0 1rem;\n}\n.amount-and-message .amount.transaction-value[data-v-8657b790] {\n  --size: 5rem;\n  font-size: var(--size);\n  line-height: 1;\n  margin-bottom: 0.5rem;\n}\n.amount-and-message .amount.transaction-value[data-v-8657b790]  .currency {\n  font-size: 0.5em;\n  font-weight: bold;\n  margin-right: -1.9em;\n}\n.amount-and-message .amount.transaction-value[data-v-8657b790]:not(.isIncoming)::before {\n  content: \"-\";\n  margin-right: -0.1em;\n  margin-left: -0.4em;\n}\n.amount-and-message .amount.transaction-value.isIncoming[data-v-8657b790]::before {\n  content: \"+\";\n  margin-right: -0.1em;\n  margin-left: -0.6em;\n}\n@media (max-width: 700px) {\n.amount-and-message .amount.transaction-value[data-v-8657b790] {\n    font-size: 4.75rem;\n}\n}\n.amount-and-message .flex-row[data-v-8657b790] {\n  align-items: center;\n}\n.amount-and-message .fiat-amount[data-v-8657b790] {\n  --size: var(--small-size);\n  font-size: var(--size);\n  font-weight: 600;\n  color: var(--text-50);\n  line-height: 1;\n}\n.amount-and-message .fiat-amount .tooltip[data-v-8657b790]  .trigger .fiat-amount {\n  transition: color 0.2s var(--nimiq-ease);\n}\n.amount-and-message .fiat-amount .tooltip[data-v-8657b790]  .trigger:hover .fiat-amount, .amount-and-message .fiat-amount .tooltip[data-v-8657b790]  .trigger:focus .fiat-amount {\n  color: var(--text-60);\n}\n.amount-and-message .fiat-amount .tooltip[data-v-8657b790]  .trigger::after {\n  top: -1.5rem;\n  background: #211B43;\n}\n.amount-and-message .fiat-amount .tooltip[data-v-8657b790]  .tooltip-box {\n  width: 28rem;\n  transform: translate(-10rem, -1.5rem);\n}\n.amount-and-message .fiat-amount .tooltip[data-v-8657b790]  [value-mask]::after {\n  margin-right: 0;\n}\n.amount-and-message .dot[data-v-8657b790] {\n  margin: 0 1rem;\n  color: var(--text-30);\n}\n.amount-and-message button[data-v-8657b790] {\n  line-height: 1;\n}\n.amount-and-message .icon[data-v-8657b790],\n.amount-and-message .swapped-amount[data-v-8657b790] {\n  color: var(--text-50);\n}\n.amount-and-message .icon[data-v-8657b790] {\n  margin-right: 0.375rem;\n}\n.amount-and-message .swapped-amount[data-v-8657b790] {\n  --size: var(--small-size);\n  font-size: var(--size);\n  font-weight: bold;\n}\n.amount-and-message .swap-other-side.incoming .icon[data-v-8657b790],\n.amount-and-message .swap-other-side.incoming .swapped-amount[data-v-8657b790] {\n  color: var(--nimiq-green);\n}\n.message[data-v-8657b790] {\n  margin: 1rem 0;\n  text-align: center;\n  font-size: var(--body-size);\n  line-height: 1.375;\n  word-break: break-word;\n}\n.info-tooltip[data-v-8657b790] {\n  position: absolute;\n  left: 2rem;\n  top: 2rem;\n  z-index: 3;\n}\n.info-tooltip[data-v-8657b790]  .trigger {\n  color: rgba(31, 35, 72, 0.25);\n  font-size: 2.25rem;\n  transition: color 0.3s var(--nimiq-ease);\n}\n.info-tooltip[data-v-8657b790]  .trigger::before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  left: -1.5rem;\n  top: -1.5rem;\n  right: -1.5rem;\n  bottom: -1.5rem;\n  border-radius: 50%;\n}\n.info-tooltip[data-v-8657b790]  .trigger:hover, .info-tooltip[data-v-8657b790]  .trigger:focus {\n  color: rgba(31, 35, 72, 0.6);\n}\n.info-tooltip[data-v-8657b790]  .tooltip-box {\n  font-size: var(--small-size);\n  white-space: nowrap;\n  line-height: 1.3;\n  font-weight: 600;\n  transform: translate(-1rem, 2rem);\n}\n.info-tooltip .confirmations[data-v-8657b790] {\n  display: block;\n  font-size: var(--small-label-size);\n  opacity: 0.6;\n}\n.info-tooltip .fee[data-v-8657b790] {\n  display: inline-block;\n  margin-top: 1.25rem;\n}\n.info-tooltip .blue-link[data-v-8657b790] {\n  color: var(--nimiq-light-blue-on-dark);\n  margin-top: 1.25rem;\n}\n.address-info .tooltip[data-v-8657b790]  .tooltip-box {\n  padding: 1rem;\n  font-size: var(--small-size);\n  line-height: 1;\n  font-family: \"Fira Mono\", monospace;\n  font-weight: normal;\n  letter-spacing: -0.02em;\n  white-space: nowrap;\n  word-spacing: -0.2em;\n}\n.address-info .tooltip[data-v-8657b790]  .trigger {\n  padding: 0.5rem 1rem;\n  border-radius: 0.5rem;\n  transition: background 300ms var(--nimiq-ease);\n  margin-bottom: 0.5rem;\n}\n.address-info .tooltip[data-v-8657b790]  .trigger:hover, .address-info .tooltip[data-v-8657b790]  .trigger:focus, .address-info .tooltip[data-v-8657b790]  .trigger:focus-within {\n  background: var(--text-6);\n}\n.address-info .tooltip[data-v-8657b790]  .trigger:hover .short-address, .address-info .tooltip[data-v-8657b790]  .trigger:focus .short-address, .address-info .tooltip[data-v-8657b790]  .trigger:focus-within .short-address {\n  opacity: 0.6;\n}\n.tooltip.left-aligned[data-v-8657b790]  .tooltip-box {\n  transform: translate(-9.25rem, 2rem);\n}\n.tooltip.right-aligned[data-v-8657b790]  .tooltip-box {\n  transform: translate(9.25rem, 2rem);\n}\n.short-address[data-v-8657b790] {\n  font-size: var(--body-size);\n  opacity: 0.5;\n  transition: opacity 0.3s var(--nimiq-ease);\n}\n@media (max-width: 700px) {\n.page-header[data-v-8657b790]  .nq-h1 {\n    -webkit-mask: linear-gradient(90deg, white, white calc(100% - 3rem), rgba(255, 255, 255, 0));\n            mask: linear-gradient(90deg, white, white calc(100% - 3rem), rgba(255, 255, 255, 0));\n}\n.page-header.inline-header[data-v-8657b790]  .nq-h1 {\n    align-self: unset;\n}\n.page-header[data-v-8657b790]:not(.inline-header)  .nq-h1 {\n    white-space: normal;\n}\n.page-header:not(.inline-header) label[data-v-8657b790] {\n    white-space: nowrap;\n}\n.address-info[data-v-8657b790] {\n    flex-shrink: 0;\n}\n.tooltip.left-aligned[data-v-8657b790]  .tooltip-box {\n    transform: translate(-7.75rem, 2rem);\n}\n.tooltip.right-aligned[data-v-8657b790]  .tooltip-box {\n    transform: translate(7.75rem, 2rem);\n}\n.tooltip[data-v-8657b790]  .tooltip-box {\n    transform: translate(1rem, 2rem);\n}\n}\n@media (max-width: 450px) {\n.page-header[data-v-8657b790]  .nq-h1 {\n    margin-left: 3rem;\n    margin-right: 3rem;\n}\n}\n@media (max-width: 400px) {\n.sender-recipient[data-v-8657b790] {\n    padding: 0;\n}\n}\n@media (max-width: 374px) {\n.page-body[data-v-8657b790] {\n    padding-left: 2rem;\n    padding-right: 2rem;\n}\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


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

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/modals/TransactionModal.vue?vue&type=style&index=0&id=8657b790&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/modals/TransactionModal.vue?vue&type=style&index=0&id=8657b790&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!../../../node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!../../../node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./TransactionModal.vue?vue&type=style&index=0&id=8657b790&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22[0].rules[0].use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/modals/TransactionModal.vue?vue&type=style&index=0&id=8657b790&lang=scss&scoped=true&");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("e9da5ae8", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ })

}]);
//# sourceMappingURL=transaction-modal.js.map