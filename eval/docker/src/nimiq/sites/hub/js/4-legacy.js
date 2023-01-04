(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-nimiq.es.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request-nimiq.es.js ***!
  \*******************************************************************************************/
/*! exports provided: R, a, l */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return RequestNimiq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loadNimiqCryptography; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return loadNimiqCore; });
/* harmony import */ var _lazy_chunk_request_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-request.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request.es.js");
/* harmony import */ var _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ledger-api.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");



// Use jsdelivr instead of nimiq cdn to avoid getting blocked by ad blockers.
const coreBasePath = 'https://cdn.jsdelivr.net/npm/@nimiq/core-web/';
let nimiqCorePromise = null;
let nimiqCryptographyPromise = null;
/**
 * Lazy-load the Nimiq core api from the cdn server if it's not loaded yet.
 */
async function loadNimiqCore(coreVariant = 'web-offline') {
    // @ts-ignore Return global Nimiq if already loaded.
    if (window.Nimiq)
        return window.Nimiq;
    nimiqCorePromise = nimiqCorePromise || new Promise((resolve, reject) => {
        const $head = document.getElementsByTagName('head')[0];
        const $script = document.createElement('script');
        $script.type = 'text/javascript';
        $script.onload = () => {
            $script.parentNode.removeChild($script);
            resolve();
        };
        $script.onerror = (e) => {
            $script.parentNode.removeChild($script);
            reject(e);
        };
        $script.src = `${coreBasePath}${coreVariant}.js`;
        $head.appendChild($script);
    }).then(() => {
        // @ts-ignore Nimiq is global but to discourage usage as global var we did not declare a global type.
        const { Nimiq } = window;
        return Nimiq;
    }, (e) => {
        nimiqCorePromise = null;
        return Promise.reject(e);
    });
    return nimiqCorePromise;
}
/**
 * Load the WebAssembly and module for cryptographic functions. You will have to do this before calculating hashes,
 * deriving keys or addresses, signing transactions or messages, etc.
 */
async function loadNimiqCryptography() {
    nimiqCryptographyPromise = nimiqCryptographyPromise || (async () => {
        try {
            // preload wasm in parallel
            preloadAsset(`${coreBasePath}worker-wasm.wasm`, 'fetch', true);
            preloadAsset(`${coreBasePath}worker-wasm.js`, 'script');
            const Nimiq = await loadNimiqCore();
            await Nimiq.WasmHelper.doImport();
        }
        catch (e) {
            nimiqCryptographyPromise = null;
            throw e;
        }
    })();
    return nimiqCryptographyPromise;
}
function preloadAsset(asset, as, crossOrigin) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = asset;
    link.onload = link.onerror = () => document.head.removeChild(link); // eslint-disable-line no-multi-assign
    if (crossOrigin)
        link.crossOrigin = '';
    document.head.appendChild(link);
}
//# sourceMappingURL=load-nimiq.js.map

class RequestNimiq extends _lazy_chunk_request_es_js__WEBPACK_IMPORTED_MODULE_0__["R"] {
    constructor(expectedWalletId) {
        super(expectedWalletId);
        this.coin = _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["Coin"].NIMIQ;
        this.requiredApp = 'Nimiq';
        this.minRequiredAppVersion = '1.4.2'; // first version supporting web usb
        // Preload dependencies. Nimiq lib is preloaded individually by request child classes that need it.
        // Ignore errors.
        Promise.all([
            this._loadLowLevelApi(),
            this._isWalletIdDerivationRequired ? this._loadNimiq() : null,
        ]).catch(() => { });
    }
    async checkCoinAppConnection(transport) {
        const coinAppConnection = await super.checkCoinAppConnection(transport, 'w0w');
        if (!this._isWalletIdDerivationRequired)
            return coinAppConnection; // skip wallet id derivation
        // Note that api and Nimiq are preloaded in the constructor, therefore we don't need to optimize for load order
        // or execution order here.
        const api = await this._getLowLevelApi(transport); // throws LOADING_DEPENDENCIES_FAILED on failure
        // Set validate to false as otherwise the call is much slower. For U2F this can also unfreeze the ledger app,
        // see transport-comparison.md. However, not sure whether this is still true today and as it's less relevant now
        // with WebUsb being used by default, we ignore this side effect for !this._isWalletIdDerivationRequired case.
        const { publicKey: firstAddressPubKeyBytes } = await api.getPublicKey(Object(_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["getBip32Path"])({ coin: _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["Coin"].NIMIQ, addressIndex: 0 }), false, // validate
        false);
        const Nimiq = await this._loadNimiq(); // throws LOADING_DEPENDENCIES_FAILED on failure
        // Compute wallet id. Use sha256 as blake2b yields the nimiq address
        const walletId = Nimiq.Hash.sha256(firstAddressPubKeyBytes).toBase64();
        this._checkExpectedWalletId(walletId);
        coinAppConnection.walletId = walletId;
        return coinAppConnection;
    }
    async _getLowLevelApi(transport) {
        if (!RequestNimiq._lowLevelApiPromise || transport !== (await RequestNimiq._lowLevelApiPromise).transport) {
            // no low level api instantiated yet or transport / transport type changed in the meantime
            RequestNimiq._lowLevelApiPromise = this._loadLowLevelApi()
                .then((LowLevelApi) => new LowLevelApi(transport), (e) => {
                RequestNimiq._lowLevelApiPromise = null;
                return Promise.reject(e);
            });
        }
        return RequestNimiq._lowLevelApiPromise;
    }
    async _loadLowLevelApi() {
        try {
            // build the low-level-api from source instead of taking it from dist to create optimized chunks and to
            // avoid double bundling of dependencies like buffer.
            return (await [__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./lazy-chunk-polyfill-node:buffer.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-polyfill-node:buffer.es.js")), Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./lazy-chunk-request.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request.es.js")), Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./ledger-api.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js")), Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(28)]).then(__webpack_require__.bind(null, /*! ./lazy-chunk-low-level-api.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-low-level-api.es.js"))][3]).default;
        }
        catch (e) {
            throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorType"].LOADING_DEPENDENCIES_FAILED, `Failed loading dependencies: ${e.message || e}`, this);
        }
    }
    async _loadNimiq() {
        try {
            // Note that we don't need to cache a promise as loadNimiqCore and loadNimiqCryptography already do that.
            const [Nimiq] = await Promise.all([
                loadNimiqCore(),
                // needed for wallet id hashing and pub key to address derivation in SignatureProof and BasicTransaction
                loadNimiqCryptography(),
            ]);
            return Nimiq;
        }
        catch (e) {
            throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_1__["ErrorType"].LOADING_DEPENDENCIES_FAILED, `Failed loading dependencies: ${e.message || e}`, this);
        }
    }
}
RequestNimiq._lowLevelApiPromise = null;


//# sourceMappingURL=lazy-chunk-request-nimiq.es.js.map


/***/ }),

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request.es.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-request.es.js ***!
  \*************************************************************************************/
/*! exports provided: R, g */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getAppNameAndVersion; });
/* harmony import */ var _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ledger-api.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");


// Also see https://github.com/LedgerHQ/ledgerjs/issues/365 for other requests which might be interesting.
async function getAppNameAndVersion(transport, scrambleKey) {
    // Taken from @ledgerhq/hw-app-btc/getAppAndVersion.js. We don't import it directly from there to avoid loading its
    // unnecessary dependencies. Note that this request is common to all apps and the dashboard and is no Bitcoin app
    // specific request (it's not on https://github.com/LedgerHQ/app-bitcoin/blob/master/doc/btc.asc but rather imple-
    // mented in the Ledger Nano S and Nano X SDKs, see os_io_seproxyhal.c. Also mind the different cla). However, for
    // u2f and WebAuthn the used scramble key must match the one of the connected app for the Ledger to answer the
    // request. Therefore, decorate the api method manually to make it compatible with all apps, not only the Nimiq app.
    const getAppNameAndVersionApi = {
        async getAppNameAndVersion() {
            // Note that no u2f heartbeat is required here as the call is not interactive but answers directly.
            const response = await transport.send(0xb0, 0x01, 0x00, 0x00);
            const status = response.slice(response.length - 2).readUInt16BE(0);
            if (status !== 0x9000)
                throw new Error('getAppNameAndVersion failed'); // should not actually happen
            let offset = 0;
            const format = response[offset++];
            if (format !== 1)
                throw new Error('Unsupported format');
            const nameLength = response[offset++];
            const name = response.slice(offset, (offset += nameLength)).toString('ascii');
            const versionLength = response[offset++];
            const version = response.slice(offset, (offset += versionLength)).toString('ascii');
            return { name, version };
        },
    };
    // Takes care of setting the api lock (for ledger busy errors) and scramble key. Note that decorating the api method
    // does not modify the transport instance, therefore decorating on each invocation of getAppNameAndVersion does no
    // harm. Also note that the lock is a property of the transport, thus works correctly across multiple independently
    // decorated methods.
    transport.decorateAppAPIMethods(getAppNameAndVersionApi, ['getAppNameAndVersion'], scrambleKey);
    return getAppNameAndVersionApi.getAppNameAndVersion();
}

class Request extends _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_0__["O"] {
    constructor(expectedWalletId) {
        super();
        this._cancelled = false;
        this.expectedWalletId = expectedWalletId;
    }
    static _isAppVersionSupported(versionString, minRequiredVersion) {
        const version = versionString.split('.').map((part) => parseInt(part, 10));
        const parsedMinRequiredVersion = minRequiredVersion.split('.').map((part) => parseInt(part, 10));
        for (let i = 0; i < minRequiredVersion.length; ++i) {
            if (typeof version[i] === 'undefined' || version[i] < parsedMinRequiredVersion[i])
                return false;
            if (version[i] > parsedMinRequiredVersion[i])
                return true;
        }
        return true;
    }
    get cancelled() {
        return this._cancelled;
    }
    canReuseCoinAppConnection(coinAppConnection) {
        return coinAppConnection.coin === this.coin
            && coinAppConnection.app === this.requiredApp
            && Request._isAppVersionSupported(coinAppConnection.appVersion, this.minRequiredAppVersion)
            && (!this.expectedWalletId || coinAppConnection.walletId === this.expectedWalletId);
    }
    cancel() {
        if (this._cancelled)
            return;
        this._cancelled = true;
        this.fire(Request.EVENT_CANCEL);
    }
    on(type, callback) {
        if (type === Request.EVENT_CANCEL && this._cancelled) {
            // trigger callback directly
            callback();
        }
        super.on(type, callback);
    }
    async checkCoinAppConnection(transport, scrambleKey) {
        const { name: app, version: appVersion } = await getAppNameAndVersion(transport, scrambleKey);
        if (app !== this.requiredApp && app !== 'app') { // speculos reports 'app' as app name
            throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_0__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_0__["ErrorType"].WRONG_APP, `Wrong app connected: ${app}, required: ${this.requiredApp}`, this);
        }
        if (!Request._isAppVersionSupported(appVersion, this.minRequiredAppVersion)) {
            throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_0__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_0__["ErrorType"].APP_OUTDATED, `Ledger ${app} app is outdated: ${appVersion}, required: ${this.minRequiredAppVersion}`, this);
        }
        return { coin: this.coin, app, appVersion };
    }
    get _isWalletIdDerivationRequired() {
        return !!this.expectedWalletId;
    }
    _checkExpectedWalletId(walletId) {
        if (this.expectedWalletId === undefined || this.expectedWalletId === walletId)
            return;
        throw new _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_0__["ErrorState"](_ledger_api_es_js__WEBPACK_IMPORTED_MODULE_0__["ErrorType"].WRONG_WALLET, 'Wrong wallet or Ledger connected', this);
    }
}
Request.EVENT_CANCEL = _ledger_api_es_js__WEBPACK_IMPORTED_MODULE_0__["R"];


//# sourceMappingURL=lazy-chunk-request.es.js.map


/***/ })

}]);
//# sourceMappingURL=4-legacy.js.map