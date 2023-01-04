(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-get-address-and-public-key-bitcoin.es.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-get-address-and-public-key-bitcoin.es.js ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_chunk_request_bitcoin_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-request-bitcoin.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-bitcoin.es.js");
/* harmony import */ var _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ledger-api.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var _lazy_chunk_request_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-chunk-request.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request.es.js");




class RequestGetAddressAndPublicKeyBitcoin extends _lazy_chunk_request_bitcoin_es_js__WEBPACK_IMPORTED_MODULE_0__["R"] {
    constructor(keyPath, display, expectedAddress, expectedWalletId) {
        super(expectedWalletId);
        this.type = _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["RequestTypeBitcoin"].GET_ADDRESS_AND_PUBLIC_KEY;
        this.keyPath = keyPath;
        this.display = display;
        this.expectedAddress = expectedAddress;
        try {
            const parsedKeyPath = Object(_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["parseBip32Path"])(keyPath);
            if (parsedKeyPath.coin !== _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["Coin"].BITCOIN)
                throw new Error('Not a Bitcoin bip32 path following bip44');
            this.network = parsedKeyPath.network;
            this._addressType = parsedKeyPath.addressType;
        }
        catch (e) {
            throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorType"].REQUEST_ASSERTION_FAILED, `Invalid keyPath ${keyPath}: ${e.message || e}`, this);
        }
    }
    async call(transport) {
        const api = await this._getLowLevelApi(transport); // throws LOADING_DEPENDENCIES_FAILED on failure
        const format = {
            [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["AddressTypeBitcoin"].LEGACY]: 'legacy',
            [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["AddressTypeBitcoin"].P2SH_SEGWIT]: 'p2sh',
            [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["AddressTypeBitcoin"].NATIVE_SEGWIT]: 'bech32',
        }[this._addressType] || 'bech32';
        // TODO Requesting the pubic key causes a confirmation screen to be displayed on the Ledger for u2f and WebAuthn
        //  if the user has this privacy feature enabled. Subsequent requests can provide a permission token to avoid
        //  this screen (see https://github.com/LedgerHQ/app-bitcoin/blob/master/doc/btc.asc#get-wallet-public-key).
        //  This token is however not supported in @ledgerhq/hw-app-btc lib and therefore has to be implemented by
        //  ourselves.
        const { bitcoinAddress: address, publicKey, chainCode } = await api.getWalletPublicKey(this.keyPath, {
            verify: this.display,
            format,
        });
        if (this.expectedAddress && this.expectedAddress !== address) {
            throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorType"].REQUEST_ASSERTION_FAILED, 'Address mismatch', this);
        }
        return { address, publicKey, chainCode };
    }
}

/* harmony default export */ __webpack_exports__["default"] = (RequestGetAddressAndPublicKeyBitcoin);
//# sourceMappingURL=lazy-chunk-request-get-address-and-public-key-bitcoin.es.js.map


/***/ })

}]);
//# sourceMappingURL=31.js.map