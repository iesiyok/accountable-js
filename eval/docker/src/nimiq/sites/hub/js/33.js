(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-get-wallet-id-bitcoin.es.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-get-wallet-id-bitcoin.es.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_chunk_request_bitcoin_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-request-bitcoin.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-bitcoin.es.js");
/* harmony import */ var _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ledger-api.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var _lazy_chunk_request_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-chunk-request.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request.es.js");




class RequestGetWalletIdBitcoin extends _lazy_chunk_request_bitcoin_es_js__WEBPACK_IMPORTED_MODULE_0__["R"] {
    constructor(network) {
        super();
        this.type = _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["RequestTypeBitcoin"].GET_WALLET_ID;
        this._coinAppConnection = null;
        this.network = network;
    }
    async call(transport) {
        this._coinAppConnection = this._coinAppConnection || await this.checkCoinAppConnection(transport);
        return this._coinAppConnection.walletId;
    }
    async checkCoinAppConnection(transport) {
        this._coinAppConnection = await super.checkCoinAppConnection(transport);
        return this._coinAppConnection;
    }
    canReuseCoinAppConnection(coinAppConnection) {
        const canReuseCoinAppConnection = super.canReuseCoinAppConnection(coinAppConnection)
            && !!coinAppConnection.walletId;
        if (canReuseCoinAppConnection) {
            // Use the provided coin app connection which includes the wallet id such that checkCoinAppConnection
            // doesn't have to be called anymore to determine the wallet id.
            this._coinAppConnection = coinAppConnection;
        }
        return canReuseCoinAppConnection;
    }
    get _isWalletIdDerivationRequired() {
        return true;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (RequestGetWalletIdBitcoin);
//# sourceMappingURL=lazy-chunk-request-get-wallet-id-bitcoin.es.js.map


/***/ })

}]);
//# sourceMappingURL=33.js.map