(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-sign-transaction-nimiq.es.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-sign-transaction-nimiq.es.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_chunk_request_with_key_path_nimiq_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-request-with-key-path-nimiq.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-with-key-path-nimiq.es.js");
/* harmony import */ var _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ledger-api.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var _lazy_chunk_request_nimiq_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-chunk-request-nimiq.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-nimiq.es.js");
/* harmony import */ var _lazy_chunk_request_es_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lazy-chunk-request.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request.es.js");





class RequestSignTransactionNimiq extends _lazy_chunk_request_with_key_path_nimiq_es_js__WEBPACK_IMPORTED_MODULE_0__["R"] {
    constructor(keyPath, transaction, expectedWalletId) {
        const type = _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["RequestTypeNimiq"].SIGN_TRANSACTION;
        super(keyPath, expectedWalletId, { type });
        this.type = type;
        this.transaction = transaction;
        // Preload Nimiq lib. Ledger Nimiq api is already preloaded by parent class. Ignore errors.
        this._loadNimiq().catch(() => { });
    }
    async call(transport) {
        const api = await this._getLowLevelApi(transport); // throws LOADING_DEPENDENCIES_FAILED on failure
        // Note: We make api calls outside of try...catch blocks to let the exceptions fall through such that
        // _callLedger can decide how to behave depending on the api error. All other errors are converted to
        // REQUEST_ASSERTION_FAILED errors which stop the execution of the request.
        const { publicKey: signerPubKeyBytes } = await api.getPublicKey(this.keyPath, true, // validate
        false);
        const Nimiq = await this._loadNimiq(); // throws LOADING_DEPENDENCIES_FAILED on failure
        let nimiqTx;
        let signerPubKey;
        try {
            const tx = this.transaction;
            signerPubKey = new Nimiq.PublicKey(signerPubKeyBytes);
            const senderType = tx.senderType !== undefined && tx.senderType !== null
                ? tx.senderType
                : Nimiq.Account.Type.BASIC;
            const recipientType = tx.recipientType !== undefined && tx.recipientType !== null
                ? tx.recipientType
                : Nimiq.Account.Type.BASIC;
            let { network } = tx;
            if (!network) {
                try {
                    network = Nimiq.GenesisConfig.NETWORK_NAME;
                }
                catch (e) {
                    // Genesis config not initialized
                    network = 'main';
                }
            }
            const genesisConfig = Nimiq.GenesisConfig.CONFIGS[network];
            const networkId = genesisConfig.NETWORK_ID;
            const flags = tx.flags !== undefined && tx.flags !== null
                ? tx.flags
                : Nimiq.Transaction.Flag.NONE;
            const fee = tx.fee || 0;
            if ((tx.extraData && tx.extraData.length !== 0)
                || senderType !== Nimiq.Account.Type.BASIC
                || recipientType !== Nimiq.Account.Type.BASIC
                || flags !== Nimiq.Transaction.Flag.NONE) {
                const extraData = tx.extraData ? tx.extraData : new Uint8Array(0);
                nimiqTx = new Nimiq.ExtendedTransaction(tx.sender, senderType, tx.recipient, recipientType, tx.value, fee, tx.validityStartHeight, flags, extraData, 
                /* proof */ undefined, networkId);
            }
            else {
                nimiqTx = new Nimiq.BasicTransaction(signerPubKey, tx.recipient, tx.value, fee, tx.validityStartHeight, /* signature */ undefined, networkId);
            }
        }
        catch (e) {
            throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorType"].REQUEST_ASSERTION_FAILED, e, this);
        }
        const { signature: signatureBytes } = await api.signTransaction(this.keyPath, nimiqTx.serializeContent());
        try {
            const signature = new Nimiq.Signature(signatureBytes);
            if (nimiqTx instanceof Nimiq.BasicTransaction) {
                nimiqTx.signature = signature;
            }
            else {
                nimiqTx.proof = Nimiq.SignatureProof.singleSig(signerPubKey, signature).serialize();
            }
        }
        catch (e) {
            throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorType"].REQUEST_ASSERTION_FAILED, e, this);
        }
        return nimiqTx;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (RequestSignTransactionNimiq);
//# sourceMappingURL=lazy-chunk-request-sign-transaction-nimiq.es.js.map


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
//# sourceMappingURL=24.js.map