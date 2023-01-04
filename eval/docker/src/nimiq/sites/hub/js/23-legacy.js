(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-get-public-key-nimiq.es.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-get-public-key-nimiq.es.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_chunk_request_with_key_path_nimiq_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-request-with-key-path-nimiq.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-with-key-path-nimiq.es.js");
/* harmony import */ var _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ledger-api.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var _lazy_chunk_request_nimiq_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-chunk-request-nimiq.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-nimiq.es.js");
/* harmony import */ var _lazy_chunk_request_es_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lazy-chunk-request.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request.es.js");





class RequestGetPublicKeyNimiq extends _lazy_chunk_request_with_key_path_nimiq_es_js__WEBPACK_IMPORTED_MODULE_0__["R"] {
    constructor(keyPath, expectedWalletId) {
        const type = _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["RequestTypeNimiq"].GET_PUBLIC_KEY;
        super(keyPath, expectedWalletId, { type });
        this.type = type;
        // Preload Nimiq lib. Ledger Nimiq api is already preloaded by parent class. Ignore errors.
        this._loadNimiq().catch(() => { });
    }
    async call(transport) {
        const api = await this._getLowLevelApi(transport); // throws LOADING_DEPENDENCIES_FAILED on failure
        const { publicKey } = await api.getPublicKey(this.keyPath, true, // validate
        false);
        const Nimiq = await this._loadNimiq(); // throws LOADING_DEPENDENCIES_FAILED on failure
        return new Nimiq.PublicKey(publicKey);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (RequestGetPublicKeyNimiq);
//# sourceMappingURL=lazy-chunk-request-get-public-key-nimiq.es.js.map


/***/ }),

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-with-key-path-nimiq.es.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-with-key-path-nimiq.es.js ***!
  \*********************************************************************************************************/
/*! exports provided: R */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return RequestWithKeyPathNimiq; });
/* harmony import */ var _lazy_chunk_request_nimiq_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-request-nimiq.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-nimiq.es.js");
/* harmony import */ var _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ledger-api.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");



class RequestWithKeyPathNimiq extends _lazy_chunk_request_nimiq_es_js__WEBPACK_IMPORTED_MODULE_0__["R"] {
    constructor(keyPath, expectedWalletId, childClassProperties = {}) {
        super(expectedWalletId);
        this.keyPath = keyPath;
        try {
            if (Object(_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["parseBip32Path"])(keyPath).coin !== _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["Coin"].NIMIQ)
                throw new Error('Not a Nimiq bip32 path');
        }
        catch (e) {
            // Set properties of child class such that these are present on the request in the thrown error state.
            for (const [key, value] of Object.entries(childClassProperties)) {
                this[key] = value;
            }
            throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorType"].REQUEST_ASSERTION_FAILED, `Invalid keyPath ${keyPath}: ${e.message || e}`, this);
        }
    }
}


//# sourceMappingURL=lazy-chunk-request-with-key-path-nimiq.es.js.map


/***/ })

}]);
//# sourceMappingURL=23-legacy.js.map