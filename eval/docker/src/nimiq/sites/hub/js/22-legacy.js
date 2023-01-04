(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-get-address-nimiq.es.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-get-address-nimiq.es.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_chunk_request_with_key_path_nimiq_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-request-with-key-path-nimiq.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-with-key-path-nimiq.es.js");
/* harmony import */ var _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ledger-api.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var _lazy_chunk_request_nimiq_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-chunk-request-nimiq.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-nimiq.es.js");
/* harmony import */ var _lazy_chunk_request_es_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lazy-chunk-request.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request.es.js");





class RequestGetAddressNimiq extends _lazy_chunk_request_with_key_path_nimiq_es_js__WEBPACK_IMPORTED_MODULE_0__["R"] {
    constructor(keyPath, display, expectedAddress, expectedWalletId) {
        const type = _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["RequestTypeNimiq"].GET_ADDRESS;
        super(keyPath, expectedWalletId, { type, display, expectedAddress });
        this.type = type;
        this.display = display;
        this.expectedAddress = expectedAddress;
    }
    async call(transport) {
        const api = await this._getLowLevelApi(transport); // throws LOADING_DEPENDENCIES_FAILED on failure
        const { address } = await api.getAddress(this.keyPath, true, // validate
        !!this.display);
        if (this.expectedAddress
            && this.expectedAddress.replace(/ /g, '').toUpperCase()
                !== address.replace(/ /g, '').toUpperCase()) {
            throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorType"].REQUEST_ASSERTION_FAILED, 'Address mismatch', this);
        }
        return address;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (RequestGetAddressNimiq);
//# sourceMappingURL=lazy-chunk-request-get-address-nimiq.es.js.map


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
//# sourceMappingURL=22-legacy.js.map