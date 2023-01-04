(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-derive-addresses-nimiq.es.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-derive-addresses-nimiq.es.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_chunk_request_nimiq_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-request-nimiq.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-nimiq.es.js");
/* harmony import */ var _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ledger-api.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var _lazy_chunk_request_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-chunk-request.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request.es.js");




class RequestDeriveAddressesNimiq extends _lazy_chunk_request_nimiq_es_js__WEBPACK_IMPORTED_MODULE_0__["R"] {
    constructor(pathsToDerive, expectedWalletId) {
        super(expectedWalletId);
        this.type = _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["RequestTypeNimiq"].DERIVE_ADDRESSES;
        this.pathsToDerive = pathsToDerive;
        for (const keyPath of pathsToDerive) {
            try {
                if (Object(_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["parseBip32Path"])(keyPath).coin !== _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["Coin"].NIMIQ)
                    throw new Error('Not a Nimiq bip32 path');
            }
            catch (e) {
                throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorType"].REQUEST_ASSERTION_FAILED, `Invalid keyPath ${keyPath}: ${e.message || e}`, this);
            }
        }
    }
    async call(transport) {
        const api = await this._getLowLevelApi(transport); // throws LOADING_DEPENDENCIES_FAILED on failure
        const addressRecords = [];
        for (const keyPath of this.pathsToDerive) {
            if (this.cancelled)
                return addressRecords;
            // eslint-disable-next-line no-await-in-loop
            const { address } = await api.getAddress(keyPath, true, // validate
            false);
            addressRecords.push({ address, keyPath });
        }
        return addressRecords;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (RequestDeriveAddressesNimiq);
//# sourceMappingURL=lazy-chunk-request-derive-addresses-nimiq.es.js.map


/***/ })

}]);
//# sourceMappingURL=30-legacy.js.map