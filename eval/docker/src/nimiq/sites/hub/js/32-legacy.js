(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-get-extended-public-key-bitcoin.es.js":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-get-extended-public-key-bitcoin.es.js ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-polyfill-node:buffer.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-polyfill-node:buffer.es.js");
/* harmony import */ var _lazy_chunk_request_bitcoin_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lazy-chunk-request-bitcoin.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-bitcoin.es.js");
/* harmony import */ var _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ledger-api.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var _lazy_chunk_request_es_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lazy-chunk-request.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request.es.js");





// TODO if in the future the interchangeability of bitcoin-lib with the Nimiq hub's BitcoinJS is not needed anymore,
//  this can move directly into the lazy loaded bitcoin-lib and then also be lazy loaded.
async function getNetworkInfo(network, addressType) {
    // async because bitcoin-lib is lazy loaded
    const { networks } = await [Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./lazy-chunk-polyfill-node:buffer.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-polyfill-node:buffer.es.js")), __webpack_require__.e(/*! import() */ 21).then(__webpack_require__.bind(null, /*! ./lazy-chunk-sha256.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-sha256.es.js")), Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(8), __webpack_require__.e(20)]).then(__webpack_require__.bind(null, /*! ./lazy-chunk-index.es4.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es4.js")), __webpack_require__.e(/*! import() */ 7).then(__webpack_require__.bind(null, /*! ./lazy-chunk-_commonjsHelpers.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-_commonjsHelpers.es.js")), __webpack_require__.e(/*! import() */ 29).then(__webpack_require__.bind(null, /*! ./lazy-chunk-polyfill-node:process.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-polyfill-node:process.es.js")), __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./lazy-chunk-events.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-events.es.js")), Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(8), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, /*! ./lazy-chunk-bitcoin-lib.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-bitcoin-lib.es.js"))][6];
    const result = {
        [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["Network"].MAINNET]: networks.bitcoin,
        [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["Network"].TESTNET]: networks.testnet,
    }[network];
    if (!result)
        throw new Error(`Unsupported network ${network}`);
    // Bip32 version bytes for different address types which are not all defined by the bip32 lib,
    // see https://github.com/satoshilabs/slips/blob/master/slip-0132.md#registered-hd-version-bytes
    const versionBytes = {
        [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["AddressTypeBitcoin"].LEGACY]: {
            [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["Network"].MAINNET]: networks.bitcoin.bip32,
            [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["Network"].TESTNET]: networks.testnet.bip32,
        },
        [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["AddressTypeBitcoin"].P2SH_SEGWIT]: {
            [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["Network"].MAINNET]: {
                public: 0x049d7cb2,
                private: 0x049d7878,
            },
            [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["Network"].TESTNET]: {
                public: 0x044a5262,
                private: 0x044a4e28,
            },
        },
        [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["AddressTypeBitcoin"].NATIVE_SEGWIT]: {
            [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["Network"].MAINNET]: {
                public: 0x04b24746,
                private: 0x04b2430c,
            },
            [_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["Network"].TESTNET]: {
                public: 0x045f1cf6,
                private: 0x045f18bc,
            },
        },
    }[addressType][network]; // TODO should be using optional chaining here once we update rollup
    if (!versionBytes)
        throw new Error(`Unknown version bytes for network ${network}, address type ${addressType}`);
    return {
        ...result,
        bip32: versionBytes,
    };
}
// Taken from https://github.com/LedgerHQ/ledger-wallet-webtool/blob/master/src/PathFinderUtils.js#L31
// Also see https://github.com/LedgerHQ/ledgerjs/blob/master/packages/hw-app-btc/src/compressPublicKey.js for a version
// operating on buffers. However, usage requires then loading the Buffer polyfill.
function compressPublicKey(publicKey) {
    let compressedKeyIndex;
    if (publicKey.substring(0, 2) !== '04') {
        throw new Error('Invalid public key format');
    }
    if (parseInt(publicKey.substring(128, 130), 16) % 2 !== 0) {
        compressedKeyIndex = '03';
    }
    else {
        compressedKeyIndex = '02';
    }
    return compressedKeyIndex + publicKey.substring(2, 66);
}
//# sourceMappingURL=bitcoin-utils.js.map

const KEY_PATH_REGEX = new RegExp('^'
    + '(?:m/)?' // optional m/ prefix
    + '(44|49|84)\'' // purpose id; BIP44 (BTC legacy) / BIP49 (BTC nested SegWit) / BIP84 (BTC native SegWit)
    + '/(0|1)\'' // coin type; 0 for Bitcoin Mainnet, 1 for Bitcoin Testnet
    + '/\\d+\'' // account index; allow only xpubs for specific accounts
    + '(?:/\\d+\'?)*' // sub paths; No constraints as they can be circumvented anyway by deriving from higher level xpub
    + '$');
class RequestGetExtendedPublicKeyBitcoin extends _lazy_chunk_request_bitcoin_es_js__WEBPACK_IMPORTED_MODULE_1__["R"] {
    constructor(keyPath, expectedWalletId) {
        super(expectedWalletId);
        this.type = _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["RequestTypeBitcoin"].GET_EXTENDED_PUBLIC_KEY;
        this.keyPath = keyPath;
        // Check for keyPath validity. Not using parseBip32Path from bip32-utils as we allow exporting xpubs at
        // arbitrary levels. Further restrictions could be circumvented anyways by deriving from higher level xpub.
        const keyPathMatch = keyPath.match(KEY_PATH_REGEX);
        if (!keyPathMatch) {
            throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["ErrorType"].REQUEST_ASSERTION_FAILED, `Invalid keyPath ${keyPath}. Paths must follow bip44 and at least specify the purpose id`
                + ' (allowed are 44\', 49\', 84\'), coin type (allowed are 0\', 1\') and account index (hardened).', this);
        }
        const [, purposeId, networkId] = keyPathMatch;
        this._addressType = {
            44: _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["AddressTypeBitcoin"].LEGACY,
            49: _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["AddressTypeBitcoin"].P2SH_SEGWIT,
            84: _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["AddressTypeBitcoin"].NATIVE_SEGWIT,
        }[purposeId];
        this.network = {
            0: _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["Network"].MAINNET,
            1: _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["Network"].TESTNET,
        }[networkId];
        // Preload bitcoin lib. Ledger Bitcoin api is already preloaded by parent class. Ignore errors.
        this._loadBitcoinLib().catch(() => { });
    }
    async call(transport) {
        // Build xpub as specified in bip32
        // (https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#serialization-format)
        const verificationPath = '0/0';
        // Note: We make api calls outside of the try...catch block to let the exceptions fall through such that
        // _callLedger can decide how to behave depending on the api error. Load errors are converted to
        // LOADING_DEPENDENCIES_FAILED error states by _getLowLevelApi and _LoadBitcoinLib. All other errors
        // are converted to REQUEST_ASSERTION_FAILED errors which stop the execution of the request.
        const [{ bip32 }, [parentPubKey, parentChainCode, pubKey, chainCode, verificationPubKey, verificationChainCode],] = await Promise.all([
            this._loadBitcoinLib(),
            (async () => {
                // Fetch the data from Ledger required for xpub calculation
                // TODO Requesting the public key causes a confirmation screen to be displayed on the Ledger for u2f and
                //  WebAuthn for every request if the user has this privacy feature enabled in the Bitcoin app.
                //  Subsequent requests can provide a permission token in _getLowLevelApi to avoid this screen (see
                //  https://github.com/LedgerHQ/app-bitcoin/blob/master/doc/btc.asc#get-wallet-public-key). This token
                //  is however not supported in @ledgerhq/hw-app-btc and therefore has to be implemented by ourselves.
                const api = await this._getLowLevelApi(transport); // throws LOADING_DEPENDENCIES_FAILED
                const parentPath = this.keyPath.substring(0, this.keyPath.lastIndexOf('/'));
                // ledger requests have to be sent sequentially as ledger can only perform one request at a time
                const { publicKey: parentPubKeyHex, chainCode: parentChainCodeHex, } = await api.getWalletPublicKey(parentPath);
                const { publicKey: pubKeyHex, chainCode: chainCodeHex, } = await api.getWalletPublicKey(this.keyPath);
                const { publicKey: verificationPubKeyHex, chainCode: verificationChainCodeHex, } = await api.getWalletPublicKey(`${this.keyPath}/${verificationPath}`);
                return [
                    _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(compressPublicKey(parentPubKeyHex), 'hex'),
                    _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(parentChainCodeHex, 'hex'),
                    _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(compressPublicKey(pubKeyHex), 'hex'),
                    _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(chainCodeHex, 'hex'),
                    _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(compressPublicKey(verificationPubKeyHex), 'hex'),
                    _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(verificationChainCodeHex, 'hex'),
                ];
            })(),
        ]);
        try {
            // Note getNetworkInfo is only async because it lazy loads the bitcoin lib, which is already loaded at this
            // point. Therefore putting it into the Promise.all has no further upside and errors within the call should
            // become REQUEST_ASSERTION_FAILED exceptions.
            const networkInfo = await getNetworkInfo(this.network, this._addressType);
            const parent = bip32.fromPublicKey(parentPubKey, parentChainCode, networkInfo);
            const parentFingerprint = parent.fingerprint.readUInt32BE(0); // this is calculated from the pub key only
            const keyPathParts = this.keyPath.split('/');
            const depth = keyPathParts.length;
            const index = Number.parseInt(keyPathParts[depth - 1], 10)
                + (this.keyPath.endsWith('\'') ? 0x80000000 : 0); // set index for hardened paths according to bip32
            // Create the xpub from the data we collected. Unfortunately, the bip32 lib does not expose the generic
            // constructor, such that we have to set some private properties manually. But we try to do it in a future
            // proof and minification safe manner.
            // TODO make this less hacky
            /* eslint-disable dot-notation */
            /* eslint-disable @typescript-eslint/dot-notation */
            const extendedPubKey = bip32.fromPublicKey(pubKey, chainCode, networkInfo);
            if (extendedPubKey.__DEPTH === 0) {
                extendedPubKey.__DEPTH = depth;
            }
            else if (extendedPubKey['__DEPTH'] === 0) {
                extendedPubKey['__DEPTH'] = depth;
            }
            else {
                throw new Error('Failed to construct xpub, couldn\'t set __DEPTH.');
            }
            if (extendedPubKey.__INDEX === 0) {
                extendedPubKey.__INDEX = index;
            }
            else if (extendedPubKey['__INDEX'] === 0) {
                extendedPubKey['__INDEX'] = index;
            }
            else {
                throw new Error('Failed to construct xpub, couldn\'t set __INDEX.');
            }
            if (extendedPubKey.__PARENT_FINGERPRINT === 0) {
                extendedPubKey.__PARENT_FINGERPRINT = parentFingerprint;
            }
            else if (extendedPubKey['__PARENT_FINGERPRINT'] === 0) {
                extendedPubKey['__PARENT_FINGERPRINT'] = parentFingerprint;
            }
            else {
                throw new Error('Failed to construct xpub, couldn\'t set __PARENT_FINGERPRINT.');
            }
            /* eslint-enable dot-notation */
            /* eslint-enable @typescript-eslint/dot-notation */
            // Verify that the generated xpub is correct by deriving an example child and comparing it to the result
            // calculated by the Ledger device. Do not verify the Ledger generated address as it is derived from the
            // pub key anyways.
            const verificationDerivation = extendedPubKey.derivePath(verificationPath);
            if (!verificationDerivation.publicKey.equals(verificationPubKey)
                || !verificationDerivation.chainCode.equals(verificationChainCode)) {
                throw new Error('Failed to verify the constructed xpub.');
            }
            return extendedPubKey.toBase58();
        }
        catch (e) {
            throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_2__["ErrorType"].REQUEST_ASSERTION_FAILED, e, this);
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (RequestGetExtendedPublicKeyBitcoin);
//# sourceMappingURL=lazy-chunk-request-get-extended-public-key-bitcoin.es.js.map


/***/ })

}]);
//# sourceMappingURL=32-legacy.js.map