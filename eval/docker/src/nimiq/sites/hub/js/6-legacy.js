(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

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
//# sourceMappingURL=6-legacy.js.map