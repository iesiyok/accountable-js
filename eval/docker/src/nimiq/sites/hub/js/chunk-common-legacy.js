(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-common"],{

/***/ "./client/HubApi.ts":
/*!**************************!*\
  !*** ./client/HubApi.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HubApi; });
/* harmony import */ var _RequestBehavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RequestBehavior */ "./client/RequestBehavior.ts");
/* harmony import */ var _nimiq_rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/rpc */ "./client/node_modules/@nimiq/rpc/dist/rpc.es.js");
/* harmony import */ var _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _src_lib_Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/lib/Constants */ "./src/lib/Constants.ts");




class HubApi {
    constructor(endpoint = HubApi.DEFAULT_ENDPOINT, defaultBehavior) {
        this._endpoint = endpoint;
        this._defaultBehavior = defaultBehavior || new _RequestBehavior__WEBPACK_IMPORTED_MODULE_0__["PopupRequestBehavior"](`left=${window.innerWidth / 2 - 400},top=75,width=800,height=850,location=yes,dependent=yes`);
        // If no default behavior specified, use a default behavior with increased window height for checkout.
        this._checkoutDefaultBehavior = defaultBehavior || new _RequestBehavior__WEBPACK_IMPORTED_MODULE_0__["PopupRequestBehavior"](`left=${window.innerWidth / 2 - 400},top=50,width=800,height=895,location=yes,dependent=yes`);
        this._iframeBehavior = new _RequestBehavior__WEBPACK_IMPORTED_MODULE_0__["IFrameRequestBehavior"]();
        // Check for RPC results in the URL
        this._redirectClient = new _nimiq_rpc__WEBPACK_IMPORTED_MODULE_1__["RedirectRpcClient"]('', _RequestBehavior__WEBPACK_IMPORTED_MODULE_0__["RequestBehavior"].getAllowedOrigin(this._endpoint));
    }
    /** @deprecated */
    static get PaymentMethod() {
        console.warn('PaymentMethod has been renamed to PaymentType. Access via HubApi.PaymentMethod will soon '
            + 'get disabled. Use HubApi.PaymentType instead.');
        return _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["PaymentType"];
    }
    static get DEFAULT_ENDPOINT() {
        const originArray = location.origin.split('.');
        originArray.shift();
        const tld = originArray.join('.');
        switch (tld) {
            case 'nimiq.com':
                return 'https://hub.nimiq.com';
            case 'nimiq-testnet.com':
                return 'https://hub.nimiq-testnet.com';
            default:
                return 'http://localhost:8080';
        }
    }
    checkRedirectResponse() {
        return this._redirectClient.init();
    }
    on(command, resolve, reject) {
        this._redirectClient.onResponse(command, 
        // State is always an object containing at least the __command property
        (result, rpcId, state) => resolve(result, state), (error, rpcId, state) => {
            if (!reject)
                return;
            reject(error, state);
        });
    }
    /**
     * Public API
     */
    createCashlink(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CREATE_CASHLINK, [request]);
    }
    manageCashlink(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].MANAGE_CASHLINK, [request]);
    }
    checkout(request, requestBehavior = this._checkoutDefaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHECKOUT, [request]);
    }
    chooseAddress(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHOOSE_ADDRESS, [request]);
    }
    signTransaction(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_TRANSACTION, [request]);
    }
    signMessage(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_MESSAGE, [request]);
    }
    signBtcTransaction(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGN_BTC_TRANSACTION, [request]);
    }
    setupSwap(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SETUP_SWAP, [request]);
    }
    refundSwap(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].REFUND_SWAP, [request]);
    }
    /**
     * Account Management
     *
     * Only accessible from Nimiq domains.
     */
    onboard(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ONBOARD, [request]);
    }
    signup(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].SIGNUP, [request]);
    }
    login(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGIN, [request]);
    }
    logout(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LOGOUT, [request]);
    }
    export(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].EXPORT, [request]);
    }
    changePassword(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].CHANGE_PASSWORD, [request]);
    }
    addAddress(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ADD_ADDRESS, [request]);
    }
    rename(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].RENAME, [request]);
    }
    addVestingContract(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ADD_VESTING_CONTRACT, [request]);
    }
    migrate(requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].MIGRATE, [{ appName: 'Account list' }]);
    }
    activateBitcoin(request, requestBehavior = this._defaultBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ACTIVATE_BITCOIN, [request]);
    }
    /**
     * Only accessible in iframe from Nimiq domains.
     */
    list(requestBehavior = this._iframeBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LIST, []);
    }
    cashlinks(requestBehavior = this._iframeBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].LIST_CASHLINKS, []);
    }
    addBtcAddresses(request, requestBehavior = this._iframeBehavior) {
        return this._request(requestBehavior, _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"].ADD_BTC_ADDRESSES, [request]);
    }
    // END API
    /* PRIVATE METHODS */
    _request(behavior, command, args) {
        return behavior.request(this._endpoint, command, args);
    }
}
// Expose request behaviors and enum values. Not exporting them via regular exports to avoid that users of the umd
// build have to use bundle['default'] to access the default export.
// Additionally, the types of these are exported in the client's index.d.ts.
HubApi.BehaviorType = _RequestBehavior__WEBPACK_IMPORTED_MODULE_0__["BehaviorType"];
HubApi.RequestType = _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["RequestType"];
HubApi.RedirectRequestBehavior = _RequestBehavior__WEBPACK_IMPORTED_MODULE_0__["RedirectRequestBehavior"];
HubApi.PopupRequestBehavior = _RequestBehavior__WEBPACK_IMPORTED_MODULE_0__["PopupRequestBehavior"];
HubApi.AccountType = _src_lib_Constants__WEBPACK_IMPORTED_MODULE_3__["WalletType"]; // tslint:disable-line:variable-name
HubApi.CashlinkState = _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["CashlinkState"];
HubApi.CashlinkTheme = _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["CashlinkTheme"];
HubApi.Currency = _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["Currency"];
HubApi.PaymentType = _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["PaymentType"];
HubApi.PaymentState = _src_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_2__["PaymentState"];
HubApi.MSG_PREFIX = '\x16Nimiq Signed Message:\n';


/***/ }),

/***/ "./client/RequestBehavior.ts":
/*!***********************************!*\
  !*** ./client/RequestBehavior.ts ***!
  \***********************************/
/*! exports provided: RequestBehavior, BehaviorType, RedirectRequestBehavior, PopupRequestBehavior, IFrameRequestBehavior */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestBehavior", function() { return RequestBehavior; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BehaviorType", function() { return BehaviorType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedirectRequestBehavior", function() { return RedirectRequestBehavior; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupRequestBehavior", function() { return PopupRequestBehavior; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IFrameRequestBehavior", function() { return IFrameRequestBehavior; });
/* harmony import */ var _nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/rpc */ "./client/node_modules/@nimiq/rpc/dist/rpc.es.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/utils */ "./client/node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./i18n/i18n */ "./client/i18n/i18n.ts");



class RequestBehavior {
    constructor(type) {
        this._type = type;
    }
    static getAllowedOrigin(endpoint) {
        const url = new URL(endpoint);
        return url.origin;
    }
    async request(endpoint, command, args) {
        throw new Error('Not implemented');
    }
}
var BehaviorType;
(function (BehaviorType) {
    BehaviorType[BehaviorType["REDIRECT"] = 0] = "REDIRECT";
    BehaviorType[BehaviorType["POPUP"] = 1] = "POPUP";
    BehaviorType[BehaviorType["IFRAME"] = 2] = "IFRAME";
})(BehaviorType || (BehaviorType = {}));
class RedirectRequestBehavior extends RequestBehavior {
    constructor(returnUrl, localState) {
        super(BehaviorType.REDIRECT);
        const location = window.location;
        this._returnUrl = returnUrl || `${location.origin}${location.pathname}`;
        this._localState = localState || {};
        // Reject local state with reserved property.
        if (typeof this._localState.__command !== 'undefined') {
            throw new Error('Invalid localState: Property \'__command\' is reserved');
        }
    }
    static withLocalState(localState) {
        return new RedirectRequestBehavior(undefined, localState);
    }
    async request(endpoint, command, args) {
        const origin = RequestBehavior.getAllowedOrigin(endpoint);
        const client = new _nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__["RedirectRpcClient"](endpoint, origin);
        await client.init();
        const state = Object.assign({}, this._localState, { __command: command });
        client.callAndSaveLocalState(this._returnUrl, state, command, true, ...(await Promise.all(args)));
    }
}
class PopupRequestBehavior extends RequestBehavior {
    constructor(popupFeatures = PopupRequestBehavior.DEFAULT_FEATURES, options) {
        super(BehaviorType.POPUP);
        this.shouldRetryRequest = false;
        this._popupFeatures = popupFeatures;
        this._options = {
            ...PopupRequestBehavior.DEFAULT_OPTIONS,
            ...options,
        };
    }
    async request(endpoint, command, args) {
        const origin = RequestBehavior.getAllowedOrigin(endpoint);
        // Add page overlay
        const $overlay = this.appendOverlay();
        do {
            this.shouldRetryRequest = false;
            this.popup = this.createPopup(endpoint);
            this.client = new _nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__["PostMessageRpcClient"](this.popup, origin);
            try {
                await this.client.init();
                return await this.client.call(command, ...(await Promise.all(args)));
            }
            catch (e) {
                if (!this.shouldRetryRequest)
                    throw e;
            }
            finally {
                if (!this.shouldRetryRequest) {
                    // Remove page overlay
                    this.removeOverlay($overlay);
                    this.client.close();
                    this.popup.close();
                }
            }
        } while (this.shouldRetryRequest);
        // the code below should never be executed, unless unexpected things happend
        if (this.popup)
            this.popup.close();
        if (this.client)
            this.client.close();
        if ($overlay)
            this.removeOverlay($overlay);
        throw new Error('Unexpected error occurred');
    }
    createPopup(url) {
        const popup = window.open(url, 'NimiqAccounts', this._popupFeatures);
        if (!popup) {
            throw new Error('Failed to open popup');
        }
        return popup;
    }
    appendOverlay() {
        if (!this._options.overlay)
            return null;
        // Define DOM-method abstractions to allow better minification
        const createElement = document.createElement.bind(document);
        const appendChild = (node, child) => node.appendChild(child);
        // Overlay background
        const overlay = createElement('div');
        overlay.id = 'nimiq-hub-overlay';
        const overlayStyle = overlay.style;
        overlayStyle.position = 'fixed';
        overlayStyle.top = '0';
        overlayStyle.right = '0';
        overlayStyle.bottom = '0';
        overlayStyle.left = '0';
        overlayStyle.background = 'rgba(31, 35, 72, 0.8)';
        overlayStyle.display = 'flex';
        overlayStyle.flexDirection = 'column';
        overlayStyle.alignItems = 'center';
        overlayStyle.justifyContent = 'space-between';
        overlayStyle.cursor = 'pointer';
        overlayStyle.color = 'white';
        overlayStyle.textAlign = 'center';
        overlayStyle.opacity = '0';
        overlayStyle.transition = 'opacity 0.6s ease';
        overlayStyle.zIndex = '99999';
        overlay.addEventListener('click', () => {
            if (_nimiq_utils__WEBPACK_IMPORTED_MODULE_1__["BrowserDetection"].isIOS()) {
                this.shouldRetryRequest = true;
                if (this.popup)
                    this.popup.close();
                if (this.client)
                    this.client.close();
            }
            else {
                if (this.popup)
                    this.popup.focus();
            }
        });
        // Top flex spacer
        appendChild(overlay, createElement('div'));
        // Explainer text
        const text = createElement('div');
        text.textContent = Object(_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["default"])('popup-overlay');
        const textStyle = text.style;
        textStyle.padding = '20px';
        // tslint:disable-next-line max-line-length
        textStyle.fontFamily = 'Muli, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif';
        textStyle.fontSize = '24px';
        textStyle.fontWeight = '600';
        textStyle.lineHeight = '40px';
        textStyle.whiteSpace = 'pre-line';
        appendChild(overlay, text);
        // Logo
        const logo = createElement('img');
        // tslint:disable-next-line max-line-length
        logo.src = 'data:image/svg+xml,<svg width="135" height="32" viewBox="0 0 135 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35.6 14.5l-7.5-13A3 3 0 0025.5 0h-15a3 3 0 00-2.6 1.5l-7.5 13a3 3 0 000 3l7.5 13a3 3 0 002.6 1.5h15a3 3 0 002.6-1.5l7.5-13a3 3 0 000-3z" fill="url(%23hub-overlay-nimiq-logo)"/><path d="M62.25 6.5h3.26v19H63L52.75 12.25V25.5H49.5v-19H52l10.25 13.25V6.5zM72 25.5v-19h3.5v19H72zM97.75 6.5h2.75v19h-3V13.75L92.37 25.5h-2.25L85 13.75V25.5h-3v-19h2.75l6.5 14.88 6.5-14.88zM107 25.5v-19h3.5v19H107zM133.88 21.17a7.91 7.91 0 01-4.01 3.8c.16.38.94 1.44 1.52 2.05.59.6 1.2 1.23 1.98 1.86L131 30.75a15.91 15.91 0 01-4.45-5.02l-.8.02c-1.94 0-3.55-.4-4.95-1.18a7.79 7.79 0 01-3.2-3.4 11.68 11.68 0 01-1.1-5.17c0-2.03.37-3.69 1.12-5.17a7.9 7.9 0 013.2-3.4 9.8 9.8 0 014.93-1.18c1.9 0 3.55.4 4.94 1.18a7.79 7.79 0 013.2 3.4 11.23 11.23 0 011.1 5.17c0 2.03-.44 3.83-1.11 5.17zm-12.37.01a5.21 5.21 0 004.24 1.82 5.2 5.2 0 004.23-1.82c1.01-1.21 1.52-2.92 1.52-5.18 0-2.24-.5-4-1.52-5.2a5.23 5.23 0 00-4.23-1.8c-1.82 0-3.23.6-4.24 1.79-1 1.2-1.51 2.95-1.51 5.21s.5 3.97 1.51 5.18z" fill="white"/><defs><radialGradient id="hub-overlay-nimiq-logo" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-35.9969 0 0 -32 36 32)"><stop stop-color="%23EC991C"/><stop offset="1" stop-color="%23E9B213"/></radialGradient></defs></svg>';
        logo.style.marginBottom = '56px';
        appendChild(overlay, logo);
        // Close button
        const button = createElement('div');
        const buttonStyle = button.style;
        button.innerHTML = '&times;';
        buttonStyle.position = 'absolute';
        buttonStyle.top = '8px';
        buttonStyle.right = '8px';
        buttonStyle.fontSize = '24px';
        buttonStyle.lineHeight = '32px';
        buttonStyle.fontWeight = '600';
        buttonStyle.width = '32px';
        buttonStyle.height = '32px';
        buttonStyle.opacity = '0.8';
        button.addEventListener('click', (event) => {
            if (this.popup)
                this.popup.close();
            event.stopPropagation();
        });
        appendChild(overlay, button);
        // The 100ms delay is not just because the DOM element needs to be rendered before it
        // can be animated, but also because it actually feels better when there is a short
        // delay between the opening popup and the background fading.
        setTimeout(() => overlay.style.opacity = '1', 100);
        return appendChild(document.body, overlay);
    }
    removeOverlay($overlay) {
        if (!$overlay)
            return;
        $overlay.style.opacity = '0';
        setTimeout(() => document.body.removeChild($overlay), 400);
    }
}
PopupRequestBehavior.DEFAULT_FEATURES = '';
PopupRequestBehavior.DEFAULT_OPTIONS = {
    overlay: true,
};
class IFrameRequestBehavior extends RequestBehavior {
    constructor() {
        super(BehaviorType.IFRAME);
        this._iframe = null;
        this._client = null;
    }
    async request(endpoint, command, args) {
        if (this._iframe && this._iframe.src !== `${endpoint}${IFrameRequestBehavior.IFRAME_PATH_SUFFIX}`) {
            throw new Error('Hub iframe is already opened with another endpoint');
        }
        const origin = RequestBehavior.getAllowedOrigin(endpoint);
        if (!this._iframe) {
            this._iframe = await this.createIFrame(endpoint);
        }
        if (!this._iframe.contentWindow) {
            throw new Error(`IFrame contentWindow is ${typeof this._iframe.contentWindow}`);
        }
        if (!this._client) {
            this._client = new _nimiq_rpc__WEBPACK_IMPORTED_MODULE_0__["PostMessageRpcClient"](this._iframe.contentWindow, origin);
            await this._client.init();
        }
        return await this._client.call(command, ...(await Promise.all(args)));
    }
    async createIFrame(endpoint) {
        return new Promise((resolve, reject) => {
            const $iframe = document.createElement('iframe');
            $iframe.name = 'NimiqAccountsIFrame';
            $iframe.style.display = 'none';
            document.body.appendChild($iframe);
            $iframe.src = `${endpoint}${IFrameRequestBehavior.IFRAME_PATH_SUFFIX}`;
            $iframe.onload = () => resolve($iframe);
            $iframe.onerror = reject;
        });
    }
}
IFrameRequestBehavior.IFRAME_PATH_SUFFIX = '/iframe.html';


/***/ }),

/***/ "./client/i18n/de.json":
/*!*****************************!*\
  !*** ./client/i18n/de.json ***!
  \*****************************/
/*! exports provided: popup-overlay, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"popup-overlay\":\"Ein Popup hat sich geöffnet,\\nklicke hier, um zurück zum Popup zu kommen.\"}");

/***/ }),

/***/ "./client/i18n/en.json":
/*!*****************************!*\
  !*** ./client/i18n/en.json ***!
  \*****************************/
/*! exports provided: popup-overlay, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"popup-overlay\":\"A popup has been opened,\\nclick anywhere to bring it back to the front.\"}");

/***/ }),

/***/ "./client/i18n/es.json":
/*!*****************************!*\
  !*** ./client/i18n/es.json ***!
  \*****************************/
/*! exports provided: popup-overlay, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"popup-overlay\":\"Se ha abierto una ventana emergente.\\nHaga click en cualquier lugar para traer la ventana al primer plano.\"}");

/***/ }),

/***/ "./client/i18n/fil.json":
/*!******************************!*\
  !*** ./client/i18n/fil.json ***!
  \******************************/
/*! exports provided: popup-overlay, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"popup-overlay\":\"Nag-bukas ang isang pop-up.\\nMaaring i-click kahit saan para ibalik ito sa harap.\"}");

/***/ }),

/***/ "./client/i18n/fr.json":
/*!*****************************!*\
  !*** ./client/i18n/fr.json ***!
  \*****************************/
/*! exports provided: popup-overlay, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"popup-overlay\":\"Une popup a été ouverte,\\ncliquez n'importe où pour la ramener au premier plan.\"}");

/***/ }),

/***/ "./client/i18n/i18n.ts":
/*!*****************************!*\
  !*** ./client/i18n/i18n.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return translate; });
/* harmony import */ var _de_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./de.json */ "./client/i18n/de.json");
var _de_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./de.json */ "./client/i18n/de.json", 1);
/* harmony import */ var _en_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./en.json */ "./client/i18n/en.json");
var _en_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./en.json */ "./client/i18n/en.json", 1);
/* harmony import */ var _es_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./es.json */ "./client/i18n/es.json");
var _es_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./es.json */ "./client/i18n/es.json", 1);
/* harmony import */ var _fil_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fil.json */ "./client/i18n/fil.json");
var _fil_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./fil.json */ "./client/i18n/fil.json", 1);
/* harmony import */ var _fr_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fr.json */ "./client/i18n/fr.json");
var _fr_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./fr.json */ "./client/i18n/fr.json", 1);
/* harmony import */ var _nl_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nl.json */ "./client/i18n/nl.json");
var _nl_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./nl.json */ "./client/i18n/nl.json", 1);
/* harmony import */ var _pl_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pl.json */ "./client/i18n/pl.json");
var _pl_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./pl.json */ "./client/i18n/pl.json", 1);
/* harmony import */ var _pt_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pt.json */ "./client/i18n/pt.json");
var _pt_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./pt.json */ "./client/i18n/pt.json", 1);
/* harmony import */ var _ru_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ru.json */ "./client/i18n/ru.json");
var _ru_json__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./ru.json */ "./client/i18n/ru.json", 1);
/* harmony import */ var _tr_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tr.json */ "./client/i18n/tr.json");
var _tr_json__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./tr.json */ "./client/i18n/tr.json", 1);
/* harmony import */ var _uk_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./uk.json */ "./client/i18n/uk.json");
var _uk_json__WEBPACK_IMPORTED_MODULE_10___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./uk.json */ "./client/i18n/uk.json", 1);
/* harmony import */ var _zh_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./zh.json */ "./client/i18n/zh.json");
var _zh_json__WEBPACK_IMPORTED_MODULE_11___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./zh.json */ "./client/i18n/zh.json", 1);
// Import the languages you want to support. Note that the language files are not lazy loaded on purpose, as they are
// pretty small.












const translations = { de: _de_json__WEBPACK_IMPORTED_MODULE_0__, en: _en_json__WEBPACK_IMPORTED_MODULE_1__, es: _es_json__WEBPACK_IMPORTED_MODULE_2__, fil: _fil_json__WEBPACK_IMPORTED_MODULE_3__, fr: _fr_json__WEBPACK_IMPORTED_MODULE_4__, nl: _nl_json__WEBPACK_IMPORTED_MODULE_5__, pl: _pl_json__WEBPACK_IMPORTED_MODULE_6__, pt: _pt_json__WEBPACK_IMPORTED_MODULE_7__, ru: _ru_json__WEBPACK_IMPORTED_MODULE_8__, tr: _tr_json__WEBPACK_IMPORTED_MODULE_9__, uk: _uk_json__WEBPACK_IMPORTED_MODULE_10__, zh: _zh_json__WEBPACK_IMPORTED_MODULE_11__ };
function translate(id, language) {
    if (!language) {
        // Note that third party apps won't have access to the language cookie and will use a fallback language.
        const langMatch = document.cookie.match(/(^| )lang=([^;]+)/);
        language = (langMatch && langMatch[2]) || navigator.language.split('-')[0];
    }
    return (translations[language] || _en_json__WEBPACK_IMPORTED_MODULE_1__)[id] || _en_json__WEBPACK_IMPORTED_MODULE_1__[id];
}


/***/ }),

/***/ "./client/i18n/nl.json":
/*!*****************************!*\
  !*** ./client/i18n/nl.json ***!
  \*****************************/
/*! exports provided: popup-overlay, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"popup-overlay\":\"Er is een pop-up geopend,\\nklik op het scherm om het weer naar voren te brengen.\"}");

/***/ }),

/***/ "./client/i18n/pl.json":
/*!*****************************!*\
  !*** ./client/i18n/pl.json ***!
  \*****************************/
/*! exports provided: popup-overlay, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"popup-overlay\":\"Pojawiło się wyskakujące okno.\\nAby je zobaczyć, kliknij w dowolnym miejscu.\"}");

/***/ }),

/***/ "./client/i18n/pt.json":
/*!*****************************!*\
  !*** ./client/i18n/pt.json ***!
  \*****************************/
/*! exports provided: popup-overlay, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"popup-overlay\":\"Um popup foi aberto,\\nclique em qualquer lado para o trazer para a frente.\"}");

/***/ }),

/***/ "./client/i18n/ru.json":
/*!*****************************!*\
  !*** ./client/i18n/ru.json ***!
  \*****************************/
/*! exports provided: popup-overlay, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"popup-overlay\":\"Открыто всплывающее окно.\\nНажмите где-нибудь, чтобы вернуть его на передний план.\"}");

/***/ }),

/***/ "./client/i18n/tr.json":
/*!*****************************!*\
  !*** ./client/i18n/tr.json ***!
  \*****************************/
/*! exports provided: popup-overlay, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"popup-overlay\":\"Bir popup penceresi açıldı,\\nöne çekmek için herhangi bir yere tıkla. \"}");

/***/ }),

/***/ "./client/i18n/uk.json":
/*!*****************************!*\
  !*** ./client/i18n/uk.json ***!
  \*****************************/
/*! exports provided: popup-overlay, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"popup-overlay\":\"Відкрито випадаюче вікно.\\nклацніть будь-де щоб перейти до ньго.\"}");

/***/ }),

/***/ "./client/i18n/zh.json":
/*!*****************************!*\
  !*** ./client/i18n/zh.json ***!
  \*****************************/
/*! exports provided: popup-overlay, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"popup-overlay\":\"弹出窗口已打开，\\n单击任意位置即可回到上一页\"}");

/***/ }),

/***/ "./src/config/config.local.ts":
/*!************************************!*\
  !*** ./src/config/config.local.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    keyguardEndpoint: window.location.protocol + '//' + window.location.hostname + ':8000/src',
    network: _lib_Constants__WEBPACK_IMPORTED_MODULE_0__["NETWORK_TEST"],
    networkEndpoint: 'https://network.nimiq-testnet.com',
    privilegedOrigins: ['*'],
    redirectTarget: window.location.protocol + '//' + window.location.hostname + ':8080/demos.html',
    reportToSentry: false,
    checkoutWithoutNimOrigins: ['*'],
    enableBitcoin: true,
    bitcoinNetwork: _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["BTC_NETWORK_TEST"],
    bitcoinAddressType: _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["NATIVE_SEGWIT"],
    fastspot: {
        apiEndpoint: 'https://api.test.fastspot.io/fast/v1',
        apiKey: 'd011aeea-41cf-4c05-a31d-436495bed9b7',
    },
});


/***/ }),

/***/ "./src/i18n lazy recursive ^\\.\\/.*\\.po$":
/*!*****************************************************!*\
  !*** ./src/i18n lazy ^\.\/.*\.po$ namespace object ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./de.po": [
		"./src/i18n/de.po",
		"lang-de-po"
	],
	"./en.po": [
		"./src/i18n/en.po",
		"lang-en-po"
	],
	"./es.po": [
		"./src/i18n/es.po",
		"lang-es-po"
	],
	"./fr.po": [
		"./src/i18n/fr.po",
		"lang-fr-po"
	],
	"./nl.po": [
		"./src/i18n/nl.po",
		"lang-nl-po"
	],
	"./ru.po": [
		"./src/i18n/ru.po",
		"lang-ru-po"
	],
	"./uk.po": [
		"./src/i18n/uk.po",
		"lang-uk-po"
	],
	"./zh.po": [
		"./src/i18n/zh.po",
		"lang-zh-po"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__.t(id, 7);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/i18n lazy recursive ^\\.\\/.*\\.po$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/i18n/i18n-setup.ts":
/*!********************************!*\
  !*** ./src/i18n/i18n-setup.ts ***!
  \********************************/
/*! exports provided: i18n, setLanguage, detectLanguage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i18n", function() { return i18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLanguage", function() { return setLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detectLanguage", function() { return detectLanguage; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vue_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-i18n */ "./node_modules/vue-i18n/dist/vue-i18n.esm.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");




vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_i18n__WEBPACK_IMPORTED_MODULE_1__["default"]);
const DEFAULT_LANGUAGE = 'en';
const SUPPORTED_LANGUAGES = [DEFAULT_LANGUAGE, 'de', 'es', 'fr', 'nl', 'ru', 'uk', 'zh'];
const LOADED_LANGUAGES = [];
const i18n = new vue_i18n__WEBPACK_IMPORTED_MODULE_1__["default"]({
    locale: DEFAULT_LANGUAGE,
    fallbackLocale: DEFAULT_LANGUAGE,
    silentTranslationWarn: true,
});
// Asynchronously load a translation file for a specified language
// and set this one as the active language
async function setLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang))
        lang = DEFAULT_LANGUAGE;
    _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["I18nMixin"].setLanguage(lang);
    // If the language was already loaded
    if (LOADED_LANGUAGES.includes(lang)) {
        i18n.locale = lang;
        return lang;
    }
    // If the language hasn't been loaded yet
    const messages = await __webpack_require__("./src/i18n lazy recursive ^\\.\\/.*\\.po$")(`./${lang}.po`);
    i18n.setLocaleMessage(lang, messages.default || {});
    LOADED_LANGUAGES.push(lang);
    document.documentElement.setAttribute('lang', lang);
    i18n.locale = lang;
    return lang;
}
// Return the language stored in the `lang` cookie. Fallback to the browser language
function detectLanguage() {
    const langCookie = _nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["Cookie"].getCookie('lang');
    const fallbackLang = window.navigator.language.split('-')[0];
    let lang = langCookie || fallbackLang;
    // If the language is not supported set it to the default one
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
        lang = DEFAULT_LANGUAGE;
    }
    return lang;
}
// If the user changed the language in another window/tab,
// then ask him if he wants to reload the page to update non-reactive translations
let offerReload = true;
function onTabFocus() {
    if (!LOADED_LANGUAGES.length) {
        // No language for which we'd need to update any translations has been loaded yet.
        // Also we don't have any language loaded for translating the error message itself.
        return;
    }
    const lang = detectLanguage();
    if (i18n.locale !== lang) {
        const question = i18n.t('234', { oldLang: i18n.locale, newLang: lang });
        if (offerReload && confirm(question)) {
            location.reload();
        }
        else {
            setLanguage(detectLanguage());
        }
        offerReload = false; // only offer reload once to ignore the window focus on confirm-popup close
    }
}
// Set a window/tab focus event to check if the user changed the language in another window/tab
window.addEventListener('focus', onTabFocus);


/***/ }),

/***/ "./src/lib/AccountInfo.ts":
/*!********************************!*\
  !*** ./src/lib/AccountInfo.ts ***!
  \********************************/
/*! exports provided: AccountInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountInfo", function() { return AccountInfo; });
/* harmony import */ var _AddressUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddressUtils */ "./src/lib/AddressUtils.ts");
/* harmony import */ var _LabelingMachine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LabelingMachine */ "./src/lib/LabelingMachine.ts");


class AccountInfo {
    constructor(path, label, address, balance) {
        this.path = path;
        this.label = label;
        this.address = address;
        this.balance = balance;
    }
    static fromObject(o) {
        return new AccountInfo(o.path, o.label, new Nimiq.Address(o.address), o.balance);
    }
    static objectToAddressType(o) {
        return {
            address: _AddressUtils__WEBPACK_IMPORTED_MODULE_0__["default"].toUserFriendlyAddress(o.address),
            label: o.label,
        };
    }
    get userFriendlyAddress() {
        return this.address.toUserFriendlyAddress();
    }
    get defaultLabel() {
        return Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_1__["labelAddress"])(this.userFriendlyAddress);
    }
    toObject() {
        return {
            path: this.path,
            label: this.label,
            address: new Uint8Array(this.address.serialize()),
            balance: this.balance,
        };
    }
    toAddressType() {
        return {
            address: this.userFriendlyAddress,
            label: this.label,
        };
    }
}


/***/ }),

/***/ "./src/lib/AddressUtils.ts":
/*!*********************************!*\
  !*** ./src/lib/AddressUtils.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AddressUtils; });
// tslint:disable no-bitwise
class AddressUtils {
    // The following methods are taken from @nimiq/core source,
    // namely Nimiq.Address and Nimiq.BufferUtils.
    static toUserFriendlyAddress(serializedAddress, withSpaces = true) {
        const base32 = this._toBase32(serializedAddress);
        // tslint:disable-next-line prefer-template
        const check = ('00' + (98 - this._ibanCheck(base32 + this.CCODE + '00'))).slice(-2);
        let res = this.CCODE + check + base32;
        if (withSpaces)
            res = res.replace(/.{4}/g, '$& ').trim();
        return res;
    }
    static _ibanCheck(str) {
        const num = str.split('').map((c) => {
            const code = c.toUpperCase().charCodeAt(0);
            return code >= 48 && code <= 57 ? c : (code - 55).toString();
        }).join('');
        let tmp = '';
        for (let i = 0; i < Math.ceil(num.length / 6); i++) {
            tmp = (parseInt(tmp + num.substr(i * 6, 6), 10) % 97).toString();
        }
        return parseInt(tmp, 10);
    }
    static _toBase32(buf, alphabet = this.BASE32_ALPHABET_NIMIQ) {
        let shift = 3;
        let carry = 0;
        let symbol;
        let res = '';
        for (const byte of buf) {
            symbol = carry | (byte >> shift);
            res += alphabet[symbol & 0x1f];
            if (shift > 5) {
                shift -= 5;
                symbol = byte >> shift;
                res += alphabet[symbol & 0x1f];
            }
            shift = 5 - shift;
            carry = byte << shift;
            shift = 8 - shift;
        }
        if (shift !== 3) {
            res += alphabet[carry & 0x1f];
        }
        while (res.length % 8 !== 0 && alphabet.length === 33) {
            res += alphabet[32];
        }
        return res;
    }
}
AddressUtils.CCODE = 'NQ';
AddressUtils.BASE32_ALPHABET_NIMIQ = '0123456789ABCDEFGHJKLMNPQRSTUVXY';


/***/ }),

/***/ "./src/lib/Cashlink.ts":
/*!*****************************!*\
  !*** ./src/lib/Cashlink.ts ***!
  \*****************************/
/*! exports provided: CashlinkExtraData, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CashlinkExtraData", function() { return CashlinkExtraData; });
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _nimiq_network_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/network-client */ "./node_modules/@nimiq/network-client/dist/NetworkClient.es.js");
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Helpers */ "./src/lib/Helpers.ts");
/* harmony import */ var _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");




const CashlinkExtraData = {
    FUNDING: new Uint8Array([0, 130, 128, 146, 135]),
    CLAIMING: new Uint8Array([0, 139, 136, 141, 138]),
};
class Cashlink {
    constructor(keyPair, address, value, fee, message, state = _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].UNCHARGED, theme, timestamp = Math.floor(Date.now() / 1000), contactName) {
        this.keyPair = keyPair;
        this.address = address;
        this.timestamp = timestamp;
        this.contactName = contactName;
        /**
         * Cashlink balance in luna
         */
        this.balance = null;
        this._eventListeners = {};
        this._messageBytes = new Uint8Array(0);
        this._value = null;
        this._fee = null;
        this._theme = _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkTheme"].UNSPECIFIED; // note that UNSPECIFIED equals to 0 and is thus falsy
        this._knownTransactions = [];
        const networkPromise = new Promise((resolve) => {
            // Safe resolver function for when the network client gets assigned
            this._networkClientResolver = resolve;
        });
        this._getNetwork = () => networkPromise;
        if (value)
            this.value = value;
        if (fee)
            this.fee = fee;
        if (message)
            this.message = message;
        if (theme)
            this.theme = theme;
        this.state = state;
        this._immutable = !!(value || message || theme);
        this._getNetwork().then((network) => {
            const userFriendlyAddress = this.address.toUserFriendlyAddress();
            // When not yet established, the balance will be updated by the nano-api as soon
            // as we have consensus, because subscribing (below) triggers a balance check.
            if (network.consensusState === 'established') {
                network.getBalance(userFriendlyAddress).then(this._onBalancesChanged.bind(this));
            }
            // Only listen for 'received' and 'mined' events, because 'relayed' events trigger a
            // balance change in the nano-api, too, which triggers the state detection already.
            network.on(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_1__["NetworkClient"].Events.TRANSACTION_PENDING, this._onTransactionReceivedOrMined.bind(this));
            network.on(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_1__["NetworkClient"].Events.TRANSACTION_MINED, this._onTransactionReceivedOrMined.bind(this));
            network.on(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_1__["NetworkClient"].Events.BALANCES_CHANGED, this._onBalancesChanged.bind(this));
            // Triggers a BALANCES_CHANGED event if this is the first time this address is subscribed
            network.subscribe(userFriendlyAddress);
        });
        // Run initial state detection (awaits consensus in detectState())
        this.detectState();
    }
    get value() {
        return this._value || 0;
    }
    set value(value) {
        if (this._value && (this._immutable || this.state !== _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].UNCHARGED)) {
            throw new Error('Cannot set value, Cashlink is immutable');
        }
        if (!Nimiq.NumberUtils.isUint64(value) || value === 0)
            throw new Error('Malformed Cashlink value');
        this._value = value;
    }
    set fee(fee) {
        if (this.state === _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].CLAIMED) {
            console.warn('Setting a fee will typically have no effect anymore as Cashlink is already claimed');
        }
        this._fee = fee;
    }
    get fee() {
        return this._fee || 0;
    }
    get message() {
        return _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["Utf8Tools"].utf8ByteArrayToString(this._messageBytes);
    }
    set message(message) {
        if (this._messageBytes.byteLength && (this._immutable || this.state !== _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].UNCHARGED)) {
            throw new Error('Cannot set message, Cashlink is immutable');
        }
        const messageBytes = _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["Utf8Tools"].stringToUtf8ByteArray(message);
        if (!Nimiq.NumberUtils.isUint8(messageBytes.byteLength))
            throw new Error('Cashlink message is too long');
        this._messageBytes = messageBytes;
    }
    get theme() {
        return this._theme || Cashlink.DEFAULT_THEME;
    }
    set theme(theme) {
        if (this._theme && (this._immutable || this.state !== _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].UNCHARGED)) {
            throw new Error('Cannot set theme, Cashlink is immutable');
        }
        if (!Nimiq.NumberUtils.isUint8(theme)) {
            throw new Error('Invalid Cashlink theme');
        }
        this._theme = !Object.values(_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkTheme"]).includes(theme)
            ? _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkTheme"].UNSPECIFIED // lenient fallback
            : theme;
    }
    get hasEncodedTheme() {
        return !!this._theme;
    }
    set networkClient(client) {
        this._networkClientResolver(client);
    }
    static async create() {
        await Object(_Helpers__WEBPACK_IMPORTED_MODULE_2__["loadNimiq"])();
        const keyPair = Nimiq.KeyPair.derive(Nimiq.PrivateKey.generate());
        return new Cashlink(keyPair, keyPair.publicKey.toAddress());
    }
    static async parse(str) {
        if (!str)
            return null;
        try {
            str = str.replace(/~/g, '').replace(/=*$/, (match) => new Array(match.length).fill('.').join(''));
            const buf = Nimiq.BufferUtils.fromBase64Url(str);
            await Object(_Helpers__WEBPACK_IMPORTED_MODULE_2__["loadNimiq"])();
            const keyPair = Nimiq.KeyPair.derive(Nimiq.PrivateKey.unserialize(buf));
            const value = buf.readUint64();
            let message;
            if (buf.readPos === buf.byteLength) {
                message = '';
            }
            else {
                const messageLength = buf.readUint8();
                const messageBytes = buf.read(messageLength);
                message = _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["Utf8Tools"].utf8ByteArrayToString(messageBytes);
            }
            let theme;
            if (buf.readPos < buf.byteLength) {
                theme = buf.readUint8();
            }
            return new Cashlink(keyPair, keyPair.publicKey.toAddress(), value, undefined, // fee
            message, _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].UNKNOWN, theme);
        }
        catch (e) {
            console.error('Error parsing Cashlink:', e);
            return null;
        }
    }
    static fromObject(object) {
        return new Cashlink(Nimiq.KeyPair.unserialize(new Nimiq.SerialBuffer(object.keyPair)), Nimiq.Address.fromString(object.address), object.value, object.fee, object.message, object.state, object.theme, 
        // @ts-ignore `timestamp` was called `date` before and was live in the mainnet.
        object.timestamp || object.date, object.contactName);
    }
    async detectState() {
        await this._awaitConsensus();
        const balance = await this._awaitBalance();
        const pendingTransactions = [
            ...(await this._getNetwork()).pendingTransactions,
            ...(await this._getNetwork()).relayedTransactions,
        ];
        const address = this.address.toUserFriendlyAddress();
        const pendingFundingTx = pendingTransactions.find((tx) => tx.recipient === address);
        const pendingClaimingTx = pendingTransactions.find((tx) => tx.sender === address);
        // Only exit if the cashlink is CLAIMED and not currently funded or being funded.
        if (this.state === _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].CLAIMED && !balance && !pendingFundingTx)
            return;
        const knownTransactionReceipts = new Map(this._knownTransactions.map((tx) => [tx.hash, tx.blockHash]));
        const transactionHistory = await (await this._getNetwork()).requestTransactionHistory(address, knownTransactionReceipts);
        this._knownTransactions = this._knownTransactions.concat(transactionHistory.newTransactions);
        let newState = this.state;
        const knownFundingTx = this._knownTransactions.find((tx) => tx.recipient === address);
        const knownClaimingTx = this._knownTransactions.find((tx) => tx.sender === address);
        switch (this.state) {
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].UNKNOWN:
                if (!pendingFundingTx && !knownFundingTx) {
                    newState = _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].UNCHARGED;
                    break;
                }
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].UNCHARGED:
                if (pendingFundingTx) {
                    newState = _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].CHARGING;
                }
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].CHARGING:
                if (!balance && !pendingFundingTx) {
                    // Handle expired/replaced funding tx
                    newState = _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].UNCHARGED;
                    // Not break;ing here, because we need to see if the cashlink is already CLAIMED.
                }
                if (knownFundingTx) {
                    newState = _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].UNCLAIMED;
                }
                else
                    break; // If no known transactions are found, no further checks are necessary
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].UNCLAIMED:
                if (pendingClaimingTx) {
                    newState = _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].CLAIMING;
                }
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].CLAIMING:
                if (balance) {
                    // Handle recharged/reused cashlink
                    if (!pendingClaimingTx)
                        newState = _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].UNCLAIMED;
                    break; // If a balance is detected on the cashlink, it cannot be in CLAIMED state.
                }
                if (knownClaimingTx) {
                    newState = _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].CLAIMED;
                }
            case _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].CLAIMED:
                // Detect cashlink re-use and chain rebranches
                if (pendingFundingTx)
                    newState = _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].CHARGING;
                if (balance)
                    newState = _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].UNCLAIMED;
                if (pendingClaimingTx)
                    newState = _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].CLAIMING;
        }
        if (newState !== this.state)
            this._updateState(newState);
    }
    toObject(includeOptional = true) {
        const result = {
            keyPair: new Uint8Array(this.keyPair.serialize()),
            address: this.address.toUserFriendlyAddress(),
            value: this.value,
            message: this.message,
            state: this.state,
            theme: this._theme,
            timestamp: this.timestamp,
        };
        if (includeOptional) {
            result.fee = this.fee;
            result.contactName = this.contactName;
        }
        return result;
    }
    render() {
        const buf = new Nimiq.SerialBuffer(
        /*key*/ this.keyPair.privateKey.serializedSize +
            /*value*/ 8 +
            /*message length*/ (this._messageBytes.byteLength || this._theme ? 1 : 0) +
            /*message*/ this._messageBytes.byteLength +
            /*theme*/ (this._theme ? 1 : 0));
        this.keyPair.privateKey.serialize(buf);
        buf.writeUint64(this.value);
        if (this._messageBytes.byteLength || this._theme) {
            buf.writeUint8(this._messageBytes.byteLength);
            buf.write(this._messageBytes);
        }
        if (this._theme) {
            buf.writeUint8(this._theme);
        }
        let result = Nimiq.BufferUtils.toBase64Url(buf);
        // replace trailing . by = because of URL parsing issues on iPhone.
        result = result.replace(/\./g, '=');
        // iPhone also has a problem to parse long words with more then 300 chars in a URL in WhatsApp
        // (and possibly others). Therefore we break the words by adding a ~ every 256 characters in long words.
        result = result.replace(/[A-Za-z0-9_]{257,}/g, (match) => match.replace(/.{256}/g, '$&~'));
        return result;
    }
    getFundingDetails() {
        return {
            layout: 'cashlink',
            recipient: this.address,
            value: this.value,
            fee: this.fee,
            data: CashlinkExtraData.FUNDING,
            cashlinkMessage: this.message,
        };
    }
    async claim(recipientAddress, recipientType = Nimiq.Account.Type.BASIC, fee = this.fee) {
        if (this.state >= _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkState"].CLAIMING) {
            throw new Error('Cannot claim, Cashlink has already been claimed');
        }
        await Object(_Helpers__WEBPACK_IMPORTED_MODULE_2__["loadNimiq"])();
        // Only claim the amount specified in the cashlink (or the cashlink balance, if smaller)
        const balance = Math.min(this.value, await this._awaitBalance());
        if (!balance) {
            throw new Error('Cannot claim, there is no balance in this link');
        }
        const recipient = Nimiq.Address.fromString(recipientAddress);
        const transaction = new Nimiq.ExtendedTransaction(this.address, Nimiq.Account.Type.BASIC, recipient, recipientType, balance - fee, fee, await this._getBlockchainHeight(), Nimiq.Transaction.Flag.NONE, CashlinkExtraData.CLAIMING);
        const keyPair = this.keyPair;
        const signature = Nimiq.Signature.create(keyPair.privateKey, keyPair.publicKey, transaction.serializeContent());
        const proof = Nimiq.SignatureProof.singleSig(keyPair.publicKey, signature).serialize();
        transaction.proof = proof;
        return this._sendTransaction(transaction);
    }
    on(type, callback) {
        if (!(type in this._eventListeners)) {
            this._eventListeners[type] = [];
        }
        this._eventListeners[type].push(callback);
    }
    off(type, callback) {
        if (!(type in this._eventListeners)) {
            return;
        }
        const index = this._eventListeners[type].indexOf(callback);
        if (index === -1) {
            return;
        }
        this._eventListeners[type].splice(index, 1);
    }
    fire(type, arg) {
        if (!(type in this._eventListeners)) {
            return;
        }
        this._eventListeners[type].forEach((callback) => callback(arg));
    }
    async _awaitConsensus() {
        if ((await this._getNetwork()).consensusState === 'established')
            return;
        return new Promise(async (resolve) => {
            const handler = async () => {
                (await this._getNetwork()).off(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_1__["NetworkClient"].Events.CONSENSUS_ESTABLISHED, handler);
                resolve();
            };
            (await this._getNetwork()).on(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_1__["NetworkClient"].Events.CONSENSUS_ESTABLISHED, handler);
        });
    }
    async _awaitBalance() {
        if (this.balance !== null)
            return this.balance;
        return new Promise(async (resolve) => {
            const handler = async (balance) => {
                this.off(Cashlink.Events.BALANCE_CHANGE, handler);
                resolve(balance);
            };
            this.on(Cashlink.Events.BALANCE_CHANGE, handler);
        });
    }
    async _sendTransaction(transaction) {
        await this._awaitConsensus();
        try {
            const proof = Nimiq.SignatureProof.unserialize(new Nimiq.SerialBuffer(transaction.proof));
            await (await this._getNetwork()).relayTransaction({
                sender: transaction.sender.toUserFriendlyAddress(),
                senderPubKey: proof.publicKey.serialize(),
                recipient: transaction.recipient.toUserFriendlyAddress(),
                value: Nimiq.Policy.lunasToCoins(transaction.value),
                fee: Nimiq.Policy.lunasToCoins(transaction.fee),
                validityStartHeight: transaction.validityStartHeight,
                signature: proof.signature.serialize(),
                extraData: transaction.data,
            });
        }
        catch (e) {
            console.error(e);
            throw new Error('Failed to forward transaction to the network');
        }
    }
    async _getBlockchainHeight() {
        await this._awaitConsensus();
        return (await this._getNetwork()).headInfo.height;
    }
    async _onTransactionReceivedOrMined(transaction) {
        if (transaction.recipient === this.address.toUserFriendlyAddress()
            || transaction.sender === this.address.toUserFriendlyAddress()) {
            // Always run state detection when a transaction comes in
            // or an incoming or outgoing transaction was mined, as those
            // events likely signal a state change of the cashlink.
            this.detectState();
        }
    }
    _onBalancesChanged(balances) {
        const address = this.address.toUserFriendlyAddress();
        if (!balances.has(address))
            return;
        this.balance = Nimiq.Policy.coinsToLunas(balances.get(address));
        this.fire(Cashlink.Events.BALANCE_CHANGE, this.balance);
        // Always run state detection when the balance changes,
        // to catch state changes even when the transaction events
        // have not been recognized (can happen when an incoming
        // transaction gets mined before it's pending state is
        // broadcasted to this client).
        this.detectState();
    }
    _updateState(state) {
        this.state = state;
        this.fire(Cashlink.Events.STATE_CHANGE, this.state);
    }
}
(function (Cashlink) {
    let Events;
    (function (Events) {
        Events["BALANCE_CHANGE"] = "balance-change";
        Events["STATE_CHANGE"] = "state-change";
    })(Events = Cashlink.Events || (Cashlink.Events = {}));
    // To be updated with the seasons.
    Cashlink.DEFAULT_THEME = Date.now() < new Date('Tue, 13 Apr 2020 23:59:00 GMT-12').valueOf()
        ? _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkTheme"].EASTER
        : _PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["CashlinkTheme"].STANDARD;
})(Cashlink || (Cashlink = {}));
/* harmony default export */ __webpack_exports__["default"] = (Cashlink);


/***/ }),

/***/ "./src/lib/CashlinkStore.ts":
/*!**********************************!*\
  !*** ./src/lib/CashlinkStore.ts ***!
  \**********************************/
/*! exports provided: CashlinkStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CashlinkStore", function() { return CashlinkStore; });
/* harmony import */ var _lib_Cashlink__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/Cashlink */ "./src/lib/Cashlink.ts");
/* harmony import */ var _lib_Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/Store */ "./src/lib/Store.ts");


class CashlinkStore extends _lib_Store__WEBPACK_IMPORTED_MODULE_1__["Store"] {
    get DB_NAME() {
        return 'nimiq-cashlinks';
    }
    get DB_STORE_NAME() {
        return 'cashlinks';
    }
    get DB_VERSION() {
        return 1;
    }
    static get Instance() {
        if (!CashlinkStore.instance)
            CashlinkStore.instance = new CashlinkStore();
        return CashlinkStore.instance;
    }
    upgrade(request, event) {
        const db = request.result;
        if (event.oldVersion < 1) {
            // Version 1 is the first version of the database.
            db.createObjectStore(this.DB_STORE_NAME, { keyPath: 'address' });
        }
    }
    toEntry(cashlink) {
        // Exclude contactName and fee when writing to store to save some data. contactName is currently unused and fee
        // can be safely omitted as it is only used at Cashlink creation time which is also when the entry gets stored.
        return cashlink.toObject(/*includeOptional*/ false);
    }
    fromEntry(cashlinkEntry) {
        return _lib_Cashlink__WEBPACK_IMPORTED_MODULE_0__["default"].fromObject(cashlinkEntry);
    }
}
CashlinkStore.instance = null;


/***/ }),

/***/ "./src/lib/Constants.ts":
/*!******************************!*\
  !*** ./src/lib/Constants.ts ***!
  \******************************/
/*! exports provided: WalletType, DEFAULT_KEY_PATH, TX_MIN_VALIDITY_DURATION, TX_VALIDITY_WINDOW, CASHLINK_FUNDING_DATA, LABEL_MAX_LENGTH, ACCOUNT_BIP32_BASE_PATH_KEYGUARD, ACCOUNT_MAX_ALLOWED_ADDRESS_GAP, LEGACY_GROUPING_ACCOUNT_ID, NETWORK_TEST, NETWORK_MAIN, NETWORK_DEV, ERROR_CANCELED, ERROR_INVALID_NETWORK, ERROR_TRANSACTION_RECEIPTS, ERROR_COOKIE_SPACE, ERROR_REQUEST_TIMED_OUT, MOBILE_MAX_WIDTH, HISTORY_KEY_SELECTED_CURRENCY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletType", function() { return WalletType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_KEY_PATH", function() { return DEFAULT_KEY_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TX_MIN_VALIDITY_DURATION", function() { return TX_MIN_VALIDITY_DURATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TX_VALIDITY_WINDOW", function() { return TX_VALIDITY_WINDOW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASHLINK_FUNDING_DATA", function() { return CASHLINK_FUNDING_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LABEL_MAX_LENGTH", function() { return LABEL_MAX_LENGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACCOUNT_BIP32_BASE_PATH_KEYGUARD", function() { return ACCOUNT_BIP32_BASE_PATH_KEYGUARD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACCOUNT_MAX_ALLOWED_ADDRESS_GAP", function() { return ACCOUNT_MAX_ALLOWED_ADDRESS_GAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEGACY_GROUPING_ACCOUNT_ID", function() { return LEGACY_GROUPING_ACCOUNT_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NETWORK_TEST", function() { return NETWORK_TEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NETWORK_MAIN", function() { return NETWORK_MAIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NETWORK_DEV", function() { return NETWORK_DEV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_CANCELED", function() { return ERROR_CANCELED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_INVALID_NETWORK", function() { return ERROR_INVALID_NETWORK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_TRANSACTION_RECEIPTS", function() { return ERROR_TRANSACTION_RECEIPTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_COOKIE_SPACE", function() { return ERROR_COOKIE_SPACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_REQUEST_TIMED_OUT", function() { return ERROR_REQUEST_TIMED_OUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOBILE_MAX_WIDTH", function() { return MOBILE_MAX_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HISTORY_KEY_SELECTED_CURRENCY", function() { return HISTORY_KEY_SELECTED_CURRENCY; });
/**
 * Sorted by context and alphabetically
 */
var WalletType;
(function (WalletType) {
    WalletType[WalletType["LEGACY"] = 1] = "LEGACY";
    WalletType[WalletType["BIP39"] = 2] = "BIP39";
    WalletType[WalletType["LEDGER"] = 3] = "LEDGER";
})(WalletType || (WalletType = {}));
// Addresses
const DEFAULT_KEY_PATH = `m/44'/242'/0'/0'`;
// Transactions
const TX_MIN_VALIDITY_DURATION = 10;
const TX_VALIDITY_WINDOW = 120;
const CASHLINK_FUNDING_DATA = new Uint8Array([0, 130, 128, 146, 135]);
// Labels
const LABEL_MAX_LENGTH = 63; // in bytes
// Accounts
const ACCOUNT_BIP32_BASE_PATH_KEYGUARD = `m/44'/242'/0'/`;
const ACCOUNT_MAX_ALLOWED_ADDRESS_GAP = 20;
// Compatibility
const LEGACY_GROUPING_ACCOUNT_ID = 'LEGACY';
const NETWORK_TEST = 'test';
const NETWORK_MAIN = 'main';
const NETWORK_DEV = 'dev';
// Errors
const ERROR_CANCELED = 'CANCELED';
const ERROR_INVALID_NETWORK = 'Invalid network name';
const ERROR_TRANSACTION_RECEIPTS = 'Failed to retrieve transaction receipts for';
const ERROR_COOKIE_SPACE = 'Not enough cookie space';
const ERROR_REQUEST_TIMED_OUT = 'REQUEST_TIMED_OUT';
// Input
const MOBILE_MAX_WIDTH = 600; // px
// History state
const HISTORY_KEY_SELECTED_CURRENCY = 'selected-currency';


/***/ }),

/***/ "./src/lib/ContractInfo.ts":
/*!*********************************!*\
  !*** ./src/lib/ContractInfo.ts ***!
  \*********************************/
/*! exports provided: ContractInfoHelper, VestingContractInfo, HashedTimeLockedContractInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractInfoHelper", function() { return ContractInfoHelper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VestingContractInfo", function() { return VestingContractInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HashedTimeLockedContractInfo", function() { return HashedTimeLockedContractInfo; });
/* harmony import */ var _AddressUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddressUtils */ "./src/lib/AddressUtils.ts");
/* harmony import */ var _LabelingMachine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LabelingMachine */ "./src/lib/LabelingMachine.ts");


class ContractInfoHelper {
    static fromObject(o) {
        switch (o.type) {
            case Nimiq.Account.Type.VESTING:
                return VestingContractInfo.fromObject(o);
            case Nimiq.Account.Type.HTLC:
                return HashedTimeLockedContractInfo.fromObject(o);
            // @ts-ignore Property 'type' does not exist on type 'never'.
            default: throw new Error('Unknown contract type: ' + o.type);
        }
    }
    // Used in iframe
    static objectToContractType(o) {
        switch (o.type) {
            case 1 /* Nimiq.Account.Type.VESTING */:
                return VestingContractInfo.objectToContractType(o);
            case 2 /* Nimiq.Account.Type.HTLC */:
                return HashedTimeLockedContractInfo.objectToContractType(o);
            // @ts-ignore Property 'type' does not exist on type 'never'.
            default: throw new Error('Unknown contract type: ' + o.type);
        }
    }
}
class VestingContractInfo {
    constructor(label, address, owner, start, stepAmount, stepBlocks, totalAmount, balance) {
        this.label = label;
        this.address = address;
        this.owner = owner;
        this.start = start;
        this.stepAmount = stepAmount;
        this.stepBlocks = stepBlocks;
        this.totalAmount = totalAmount;
        this.balance = balance;
        this.type = Nimiq.Account.Type.VESTING;
    }
    static fromObject(o) {
        return new VestingContractInfo(o.label, new Nimiq.Address(o.address), new Nimiq.Address(o.owner), o.start, o.stepAmount, o.stepBlocks, o.totalAmount, o.balance);
    }
    // Used in iframe
    static objectToContractType(o) {
        return {
            type: 1 /* Nimiq.Account.Type.VESTING */,
            label: o.label,
            address: _AddressUtils__WEBPACK_IMPORTED_MODULE_0__["default"].toUserFriendlyAddress(o.address),
            owner: _AddressUtils__WEBPACK_IMPORTED_MODULE_0__["default"].toUserFriendlyAddress(o.owner),
            start: o.start,
            stepAmount: o.stepAmount,
            stepBlocks: o.stepBlocks,
            totalAmount: o.totalAmount,
        };
    }
    get userFriendlyAddress() {
        return this.address.toUserFriendlyAddress();
    }
    get defaultLabel() {
        return Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_1__["labelAddress"])(this.userFriendlyAddress);
    }
    toObject() {
        return {
            type: this.type,
            label: this.label,
            address: new Uint8Array(this.address.serialize()),
            owner: new Uint8Array(this.owner.serialize()),
            start: this.start,
            stepAmount: this.stepAmount,
            stepBlocks: this.stepBlocks,
            totalAmount: this.totalAmount,
            balance: this.balance,
        };
    }
    toContractType() {
        return {
            type: this.type,
            label: this.label,
            address: this.userFriendlyAddress,
            owner: this.owner.toUserFriendlyAddress(),
            start: this.start,
            stepAmount: this.stepAmount,
            stepBlocks: this.stepBlocks,
            totalAmount: this.totalAmount,
        };
    }
    /**
     * Calculates the available amount of a vesting contract for a given blockchain height
     *
     * First, an explanation of the parameters of a vesting contract:
     * totalAmount: The total value of a vesting contract (fixed during creation, cannot be changed).
     * stepAmount: How much value is released at every vesting step. The total amount does not have
     *             to devide evenly through this amount. The last vesting step amount can be smaller
     *             then the previous steps.
     * stepBlocks: The number of blocks between step amount releases.
     * start: The block height at which the first step starts to count.
     *
     * To calculate the amount available, we start by dividing the number of blocks passed since
     * the contract's start height through its stepBlocks, to determine how many vesting steps have
     * passed. The floored number of steps gets muliplied by the stepAmount to calculate all so far
     * released value:
     *      Math.floor((height - this.start) / this.stepBlocks)) * this.stepAmount
     *
     * Because the vested amount cannot be negative (in case start block height is higher than the
     * blockchain height), the above calculation is set to at least 0:
     *      Math.max(0, <previous result>)
     *
     * Because the last step of a vesting contract is always the remainder and can be smaller than
     * stepAmount, we safeguard the maximum possible released value by taking the smaller of
     * the above calculated released amount and the contract's totalAmount:
     *      Math.min(this.totalAmount, <previous result>)
     *
     * Finally, the available amount needs to account for already withrawn funds. (The balance
     * reported by the network represents the balance of the contract, including not-yet-released
     * funds.) The amount already withdrawn is the difference between the totalAmount (inital balance)
     * and currentBalance. The withdrawn amount is simply subtracted from the released amount:
     *      <previous result> - (this.totalAmount - currentBalance)
     */
    calculateAvailableAmount(height, currentBalance = this.totalAmount) {
        return Math.min(this.totalAmount, Math.max(0, Math.floor((height - this.start) / this.stepBlocks)) * this.stepAmount) - (this.totalAmount - currentBalance);
    }
}
class HashedTimeLockedContractInfo {
    constructor(label, address, sender, recipient, hashRoot, hashCount, timeout, totalAmount, balance) {
        this.label = label;
        this.address = address;
        this.sender = sender;
        this.recipient = recipient;
        this.hashRoot = hashRoot;
        this.hashCount = hashCount;
        this.timeout = timeout;
        this.totalAmount = totalAmount;
        this.balance = balance;
        this.type = Nimiq.Account.Type.HTLC;
    }
    static fromObject(o) {
        return new HashedTimeLockedContractInfo(o.label, new Nimiq.Address(o.address), new Nimiq.Address(o.sender), new Nimiq.Address(o.recipient), new Nimiq.Hash(o.hashRoot), o.hashCount, o.timeout, o.totalAmount, o.balance);
    }
    // Used in iframe
    static objectToContractType(o) {
        return {
            type: 2 /* Nimiq.Account.Type.HTLC */,
            label: o.label,
            address: _AddressUtils__WEBPACK_IMPORTED_MODULE_0__["default"].toUserFriendlyAddress(o.address),
            sender: _AddressUtils__WEBPACK_IMPORTED_MODULE_0__["default"].toUserFriendlyAddress(o.sender),
            recipient: _AddressUtils__WEBPACK_IMPORTED_MODULE_0__["default"].toUserFriendlyAddress(o.recipient),
            hashRoot: Array.from(o.hashRoot).map((byte) => {
                const hex = byte.toString(16);
                return `${hex.length < 2 ? '0' : ''}${hex}`;
            }).join(''),
            hashCount: o.hashCount,
            timeout: o.timeout,
            totalAmount: o.totalAmount,
        };
    }
    get userFriendlyAddress() {
        return this.address.toUserFriendlyAddress();
    }
    get defaultLabel() {
        return Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_1__["labelAddress"])(this.userFriendlyAddress);
    }
    toObject() {
        return {
            type: this.type,
            label: this.label,
            address: new Uint8Array(this.address.serialize()),
            sender: new Uint8Array(this.sender.serialize()),
            recipient: new Uint8Array(this.recipient.serialize()),
            hashRoot: new Uint8Array(this.hashRoot.serialize()),
            hashCount: this.hashCount,
            timeout: this.timeout,
            totalAmount: this.totalAmount,
            balance: this.balance,
        };
    }
    toContractType() {
        return {
            type: Nimiq.Account.Type.HTLC,
            label: this.label,
            address: this.userFriendlyAddress,
            sender: this.sender.toUserFriendlyAddress(),
            recipient: this.recipient.toUserFriendlyAddress(),
            hashRoot: this.hashRoot.toHex(),
            hashCount: this.hashCount,
            timeout: this.timeout,
            totalAmount: this.totalAmount,
        };
    }
}


/***/ }),

/***/ "./src/lib/CookieJar.ts":
/*!******************************!*\
  !*** ./src/lib/CookieJar.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _LabelingMachine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LabelingMachine */ "./src/lib/LabelingMachine.ts");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _bitcoin_Base58__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bitcoin/Base58 */ "./src/lib/bitcoin/Base58.ts");
// tslint:disable no-bitwise no-shadowed-variable




class CookieJar {
    static fill(wallets) {
        const maxAge = 60 * 60 * 24 * 365; // 1 year
        const encodedWallets = this.encodeCookie(wallets);
        // Add 'Secure;' if we are not in a test environment
        const secure = location.protocol === 'https:' ? 'Secure;' : '';
        document.cookie = `w=${encodedWallets};max-age=${maxAge.toString()};${secure}SameSite=strict`;
        const storedValue = this.getCookieContents();
        if (encodedWallets !== storedValue) {
            console.warn('Cookie could not be updated.');
        }
    }
    static async eat() {
        const encodedWallets = this.getCookieContents();
        return encodedWallets ? this.decodeCookie(encodedWallets) : [];
    }
    static encodeCookie(wallets) {
        const bytes = [];
        // Cookie version
        bytes.push(CookieJar.VERSION);
        for (const wallet of wallets) {
            bytes.push.apply(bytes, this.encodeWallet(wallet));
        }
        return Nimiq.BufferUtils.toBase64(new Uint8Array(bytes));
    }
    static async decodeCookie(str) {
        const module = await __webpack_require__.e(/*! import() | cookie-decoder */ "cookie-decoder").then(__webpack_require__.bind(null, /*! ./CookieDecoder */ "./src/lib/CookieDecoder.ts"));
        return module.CookieDecoder.decode(str);
    }
    static canFitNewAccount() {
        return (this.MAX_COOKIE_SIZE - this.getCookieSize()) >= this.ENCODED_ACCOUNT_SIZE;
    }
    static async canFitNewWallets(wallets) {
        let sizeNeeded = 0;
        if (!wallets) {
            const dummyAddressHumanReadable = 'NQ86 6D3H 6MVD 2JV4 N77V FNA5 M9BL 2QSP 1P64';
            const dummyAddressSerialized = new Uint8Array([51, 71, 19, 87, 173, 20, 186, 75, 28, 253, 125,
                148, 90, 165, 116, 22, 53, 112, 220, 196]);
            const dummyWallet = {
                id: '0fe6067b138f',
                keyId: 'D+YGexOP0yDjr3Uf6WwO9a2/WjhNbZFLrRwdLfuvz9c=',
                label: 'Some long label 2 represent a long label, I would say max length',
                accounts: new Map([
                    [
                        dummyAddressHumanReadable,
                        {
                            path: 'm/44\'/242\'/0\'/0\'',
                            label: 'MyAddress1',
                            address: dummyAddressSerialized,
                        },
                    ],
                ]),
                contracts: [],
                type: _lib_Constants__WEBPACK_IMPORTED_MODULE_0__["WalletType"].BIP39,
                keyMissing: true,
                fileExported: false,
                wordsExported: false,
                btcXPub: 'xpub6H1LXWLaKsWFhvm6RVpEL9P4KfRZSW7abD2ttkWP3SSQvnyA8FSVqNTEcYFgJS2UaFcxupHiYkro49S8yGasTvXEYBVPamhGW6cFJodrTHy',
                btcAddresses: { internal: [], external: [] },
            };
            sizeNeeded += this.encodeWallet(dummyWallet).length;
        }
        else {
            const existingWallets = await this.eat();
            for (const wallet of wallets) {
                const existingWallet = existingWallets.find((w) => w.id === wallet.id);
                // new wallet might be larger or even smaller, for example if labels became shorter
                const currentSize = existingWallet ? this.encodeWallet(existingWallet).length : 0;
                const newSize = this.encodeWallet(wallet).length;
                sizeNeeded += newSize - currentSize;
            }
        }
        return (this.MAX_COOKIE_SIZE - this.getCookieSize()) >= sizeNeeded;
    }
    static encodeAndCutLabel(label) {
        const labelBytes = _nimiq_utils__WEBPACK_IMPORTED_MODULE_2__["Utf8Tools"].stringToUtf8ByteArray(label);
        const { result, didTruncate } = _nimiq_utils__WEBPACK_IMPORTED_MODULE_2__["Utf8Tools"].truncateToUtf8ByteLength(labelBytes, _lib_Constants__WEBPACK_IMPORTED_MODULE_0__["LABEL_MAX_LENGTH"]);
        if (didTruncate && typeof global === 'undefined') {
            // Warn when not running in NodeJS environment (running tests)
            console.warn('Label was shortened for cookie:', label);
        }
        return result;
    }
    static checkWalletDefaultLabel(firstAddress, label, type) {
        if (type === _lib_Constants__WEBPACK_IMPORTED_MODULE_0__["WalletType"].LEDGER) {
            if (label === Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_1__["labelLedgerAccount"])())
                return '';
            return label;
        }
        const userFriendlyAddress = new Nimiq.Address(firstAddress).toUserFriendlyAddress();
        const defaultLabel = Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_1__["labelKeyguardAccount"])(userFriendlyAddress);
        if (label === defaultLabel)
            return '';
        return label;
    }
    static checkAccountDefaultLabel(address, label) {
        const userFriendlyAddress = new Nimiq.Address(address).toUserFriendlyAddress();
        const defaultLabel = Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_1__["labelAddress"])(userFriendlyAddress);
        if (label === defaultLabel)
            return '';
        return label;
    }
    static checkContractDefaultLabel(type, label) {
        switch (type) {
            case Nimiq.Account.Type.VESTING: return label === Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_1__["labelVestingContract"])() ? '' : label;
            case Nimiq.Account.Type.HTLC: return label === Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_1__["labelHashedTimeLockedContract"])() ? '' : label;
            default: return label;
        }
    }
    static encodeWallet(wallet) {
        const bytes = [];
        // The check<Account|Wallet>DefaultLabel functions omit the label when it's the default label
        const firstAccount = wallet.accounts.values().next().value;
        const label = wallet.type === _lib_Constants__WEBPACK_IMPORTED_MODULE_0__["WalletType"].LEGACY
            ? this.checkAccountDefaultLabel(firstAccount.address, firstAccount.label)
            : this.checkWalletDefaultLabel(firstAccount.address, wallet.label, wallet.type);
        const labelBytes = this.encodeAndCutLabel(label);
        // Combined label length & wallet type
        bytes.push((labelBytes.length << 2) | wallet.type);
        // Status
        let statusByte = 0;
        statusByte = statusByte
            | (wallet.keyMissing ? CookieJar.StatusFlags.KEY_MISSING : CookieJar.StatusFlags.NONE)
            | (wallet.fileExported ? CookieJar.StatusFlags.FILE_EXPORTED : CookieJar.StatusFlags.NONE)
            | (wallet.wordsExported ? CookieJar.StatusFlags.WORDS_EXPORTED : CookieJar.StatusFlags.NONE)
            | (wallet.contracts.length ? CookieJar.StatusFlags.HAS_CONTRACTS : CookieJar.StatusFlags.NONE)
            | (wallet.btcXPub ? CookieJar.StatusFlags.HAS_XPUB : CookieJar.StatusFlags.NONE);
        bytes.push(statusByte);
        // Wallet ID
        const walletIdChunks = wallet.id.match(/.{2}/g);
        for (const chunk of walletIdChunks) {
            bytes.push(parseInt(chunk, 16));
        }
        // Label
        bytes.push.apply(bytes, Array.from(labelBytes));
        // Legacy account information
        if (wallet.type === _lib_Constants__WEBPACK_IMPORTED_MODULE_0__["WalletType"].LEGACY) {
            const account = wallet.accounts.values().next().value;
            // Account address
            bytes.push.apply(bytes, Array.from(account.address));
            this.encodeContracts(wallet.contracts, bytes);
            return bytes;
        }
        // Regular label and account information
        // Wallet number of accounts
        bytes.push(wallet.accounts.size);
        // Wallet accounts
        const accounts = Array.from(wallet.accounts.values());
        for (const account of accounts) {
            const label = this.checkAccountDefaultLabel(account.address, account.label);
            const labelBytes = this.encodeAndCutLabel(label);
            // Account label length
            bytes.push(labelBytes.length);
            // Account label
            bytes.push.apply(bytes, Array.from(labelBytes));
            // Account address
            bytes.push.apply(bytes, Array.from(account.address));
        }
        this.encodeContracts(wallet.contracts, bytes);
        this.encodeXPub(wallet.btcXPub, bytes);
        return bytes;
    }
    static encodeContracts(contracts, bytes) {
        if (!contracts.length)
            return;
        bytes.push(contracts.length);
        for (const contract of contracts) {
            const label = this.checkContractDefaultLabel(contract.type, contract.label);
            const labelBytes = this.encodeAndCutLabel(label);
            // Combined contract label length and type
            bytes.push((labelBytes.length << 2) | contract.type);
            // Contract label
            bytes.push.apply(bytes, Array.from(labelBytes));
            // Contract address
            bytes.push.apply(bytes, Array.from(contract.address));
            switch (contract.type) {
                case Nimiq.Account.Type.VESTING:
                    const data = contract;
                    bytes.push.apply(bytes, Array.from(data.owner));
                    bytes.push.apply(bytes, this.toBase256(data.start, 4)); // Uint32
                    bytes.push.apply(bytes, this.toBase256(data.stepAmount, 8)); // Uint64
                    bytes.push.apply(bytes, this.toBase256(data.stepBlocks, 4)); // Uint32
                    bytes.push.apply(bytes, this.toBase256(data.totalAmount, 8)); // Uint64
                    break;
                case Nimiq.Account.Type.HTLC:
                    throw new Error('HTLC encoding is not yet implemented');
                default:
                    // @ts-ignore Property 'type' does not exist on type 'never'.
                    throw new Error('Unknown contract type: ' + contract.type);
            }
        }
        return bytes;
    }
    static encodeXPub(xpub, bytes) {
        if (!xpub)
            return;
        const xpubBytes = Object(_bitcoin_Base58__WEBPACK_IMPORTED_MODULE_3__["decodeBase58"])(xpub);
        const xpubType = CookieJar.XPUB_TYPES.indexOf(Nimiq.BufferUtils.toHex(new Uint8Array(xpubBytes.slice(0, 4))));
        const xpubBody = xpubBytes.slice(4);
        bytes.push(xpubType);
        bytes.push.apply(bytes, xpubBody);
        return bytes;
    }
    static getCookieContents() {
        const match = document.cookie.match(new RegExp('w=([^;]+)'));
        return match && match[1];
    }
    static getCookieSize() {
        const encodedWallets = this.getCookieContents() || '';
        return Nimiq.BufferUtils.fromBase64(encodedWallets).length;
    }
    static toBase256(value, padToBytes) {
        let bits = value.toString(2);
        if (padToBytes) {
            bits = bits.padStart(padToBytes * 8, '0');
        }
        // Reverse so we can split into 8s from the end
        const reverseBits = bits.split('').reverse().join('');
        // Split into chunks of 8 bits
        const reverseBytes = reverseBits.match(/.{1,8}/g);
        // Reverse chunks, parse as base2 int, reverse array
        const bytes = reverseBytes.map((revByte) => parseInt(revByte.split('').reverse().join(''), 2)).reverse();
        return bytes;
    }
}
CookieJar.VERSION = 3;
CookieJar.MAX_COOKIE_SIZE = 3000; // byte, 4*(n/3)=4000 is space taken after base64 encoding
CookieJar.ENCODED_ACCOUNT_SIZE = 1 // account type + label length
    + 1 // status byte
    + 6 // account id
    + 63 // account label (not included if default label, but not checked during renaming)
    + 1 // number of addresses
    + 1 // address label length
    + 63 // address label (not included if default label, but not checked during renaming)
    + 20 // address
    + 1 // xpub type
    + 78 // xpub length
;
CookieJar.XPUB_TYPES = [
    '0488b21e',
    '043587cf',
    '049d7cb2',
    '044a5262',
    '04b24746',
    '045f1cf6',
];
(function (CookieJar) {
    let StatusFlags;
    (function (StatusFlags) {
        StatusFlags[StatusFlags["NONE"] = 0] = "NONE";
        StatusFlags[StatusFlags["KEY_MISSING"] = 1] = "KEY_MISSING";
        StatusFlags[StatusFlags["FILE_EXPORTED"] = 2] = "FILE_EXPORTED";
        StatusFlags[StatusFlags["WORDS_EXPORTED"] = 4] = "WORDS_EXPORTED";
        StatusFlags[StatusFlags["HAS_CONTRACTS"] = 8] = "HAS_CONTRACTS";
        StatusFlags[StatusFlags["HAS_XPUB"] = 16] = "HAS_XPUB";
    })(StatusFlags = CookieJar.StatusFlags || (CookieJar.StatusFlags = {}));
})(CookieJar || (CookieJar = {}));
/* harmony default export */ __webpack_exports__["default"] = (CookieJar);


/***/ }),

/***/ "./src/lib/Helpers.ts":
/*!****************************!*\
  !*** ./src/lib/Helpers.ts ***!
  \****************************/
/*! exports provided: setHistoryStorage, getHistoryStorage, loadNimiq, includesOrigin, isDesktop, isMilliseconds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setHistoryStorage", function() { return setHistoryStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHistoryStorage", function() { return getHistoryStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadNimiq", function() { return loadNimiq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "includesOrigin", function() { return includesOrigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDesktop", function() { return isDesktop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMilliseconds", function() { return isMilliseconds; });
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./src/lib/Constants.ts");


function setHistoryStorage(key, data) {
    // Note that data can be anything that can be structurally cloned:
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
    history.replaceState({
        ...history.state,
        [key]: data,
    }, '');
}
function getHistoryStorage(key) {
    return history.state ? history.state[key] : undefined;
}
const loadNimiq = async () => {
    await Nimiq.WasmHelper.doImport();
    let genesisConfigInitialized = true;
    try {
        Nimiq.GenesisConfig.NETWORK_ID; // tslint:disable-line:no-unused-expression
    }
    catch (e) {
        genesisConfigInitialized = false;
    }
    if (!genesisConfigInitialized) {
        switch (config__WEBPACK_IMPORTED_MODULE_0__["default"].network) {
            case _Constants__WEBPACK_IMPORTED_MODULE_1__["NETWORK_TEST"]:
                Nimiq.GenesisConfig.test();
                break;
            case _Constants__WEBPACK_IMPORTED_MODULE_1__["NETWORK_MAIN"]:
                Nimiq.GenesisConfig.main();
                break;
            case _Constants__WEBPACK_IMPORTED_MODULE_1__["NETWORK_DEV"]:
                Nimiq.GenesisConfig.dev();
                break;
            default:
                throw new Error(_Constants__WEBPACK_IMPORTED_MODULE_1__["ERROR_INVALID_NETWORK"]);
        }
    }
};
function includesOrigin(list, origin) {
    return list.includes(origin) || list.includes('*');
}
function isDesktop() {
    return (window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth) > _Constants__WEBPACK_IMPORTED_MODULE_1__["MOBILE_MAX_WIDTH"];
}
function isMilliseconds(time) {
    /*
     * 1568577148 = timestamp at time of writing
     * 100000000000 ~ 11/16/5138
     */
    return time > 100000000000;
}


/***/ }),

/***/ "./src/lib/LabelingMachine.ts":
/*!************************************!*\
  !*** ./src/lib/LabelingMachine.ts ***!
  \************************************/
/*! exports provided: labelAddress, labelKeyguardAccount, labelLedgerAccount, labelLegacyAccount, labelVestingContract, labelHashedTimeLockedContract, labelLegacyAccountGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "labelAddress", function() { return labelAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "labelKeyguardAccount", function() { return labelKeyguardAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "labelLedgerAccount", function() { return labelLedgerAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "labelLegacyAccount", function() { return labelLegacyAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "labelVestingContract", function() { return labelVestingContract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "labelHashedTimeLockedContract", function() { return labelHashedTimeLockedContract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "labelLegacyAccountGroup", function() { return labelLegacyAccountGroup; });
/* harmony import */ var _nimiq_iqons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/iqons */ "./node_modules/@nimiq/iqons/dist/iqons.min.js");
/* harmony import */ var _nimiq_iqons_dist_iqons_name_min_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/iqons/dist/iqons-name.min.js */ "./node_modules/@nimiq/iqons/dist/iqons-name.min.js");
/* harmony import */ var _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../i18n/i18n-setup */ "./src/i18n/i18n-setup.ts");
// @ts-ignore Could not find a declaration file for module '@nimiq/iqons'.

// @ts-ignore Could not find a declaration file for module '@nimiq/iqons/dist/iqons-name.min.js'.


function labelAddress(address) {
    return Object(_nimiq_iqons_dist_iqons_name_min_js__WEBPACK_IMPORTED_MODULE_1__["name"])(address);
}
function labelKeyguardAccount(firstAddress) {
    const color = translateColor(Object(_nimiq_iqons__WEBPACK_IMPORTED_MODULE_0__["getBackgroundColorName"])(firstAddress));
    return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('1', { color });
}
function labelLedgerAccount() {
    return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('144');
}
function labelLegacyAccount() {
    return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('147');
}
function labelVestingContract() {
    return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('264');
}
function labelHashedTimeLockedContract() {
    return 'HTLC';
}
function labelLegacyAccountGroup() {
    return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('214');
}
function translateColor(color) {
    switch (color) {
        // Specifically list all colors for the i18n:extract script
        case 'Orange': return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('175');
        case 'Red': return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('195');
        case 'Yellow': return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('270');
        case 'Indigo': return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('140');
        case 'Blue': return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('47');
        case 'Purple': return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('193');
        case 'Teal': return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('232');
        case 'Pink': return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('184');
        case 'Green': return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('132');
        case 'Brown': return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_2__["i18n"].t('48');
        default: throw new Error(`Missing translation for color: ${color}`);
    }
}


/***/ }),

/***/ "./src/lib/PublicRequestTypes.ts":
/*!***************************************!*\
  !*** ./src/lib/PublicRequestTypes.ts ***!
  \***************************************/
/*! exports provided: RequestType, PaymentType, Currency, PaymentState, CashlinkState, CashlinkTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestType", function() { return RequestType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentType", function() { return PaymentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Currency", function() { return Currency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentState", function() { return PaymentState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CashlinkState", function() { return CashlinkState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CashlinkTheme", function() { return CashlinkTheme; });
var RequestType;
(function (RequestType) {
    RequestType["LIST"] = "list";
    RequestType["LIST_CASHLINKS"] = "list-cashlinks";
    RequestType["MIGRATE"] = "migrate";
    RequestType["CHECKOUT"] = "checkout";
    RequestType["SIGN_MESSAGE"] = "sign-message";
    RequestType["SIGN_TRANSACTION"] = "sign-transaction";
    RequestType["ONBOARD"] = "onboard";
    RequestType["SIGNUP"] = "signup";
    RequestType["LOGIN"] = "login";
    RequestType["EXPORT"] = "export";
    RequestType["CHANGE_PASSWORD"] = "change-password";
    RequestType["LOGOUT"] = "logout";
    RequestType["ADD_ADDRESS"] = "add-address";
    RequestType["RENAME"] = "rename";
    RequestType["ADD_VESTING_CONTRACT"] = "add-vesting-contract";
    RequestType["CHOOSE_ADDRESS"] = "choose-address";
    RequestType["CREATE_CASHLINK"] = "create-cashlink";
    RequestType["MANAGE_CASHLINK"] = "manage-cashlink";
    RequestType["SIGN_BTC_TRANSACTION"] = "sign-btc-transaction";
    RequestType["ADD_BTC_ADDRESSES"] = "add-btc-addresses";
    RequestType["ACTIVATE_BITCOIN"] = "activate-bitcoin";
    RequestType["SETUP_SWAP"] = "setup-swap";
    RequestType["REFUND_SWAP"] = "refund-swap";
})(RequestType || (RequestType = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType[PaymentType["DIRECT"] = 0] = "DIRECT";
    PaymentType[PaymentType["OASIS"] = 1] = "OASIS";
})(PaymentType || (PaymentType = {}));
var Currency;
(function (Currency) {
    Currency["NIM"] = "nim";
    Currency["BTC"] = "btc";
    Currency["ETH"] = "eth";
})(Currency || (Currency = {}));
var PaymentState;
(function (PaymentState) {
    PaymentState["NOT_FOUND"] = "NOT_FOUND";
    PaymentState["PAID"] = "PAID";
    PaymentState["UNDERPAID"] = "UNDERPAID";
    PaymentState["OVERPAID"] = "OVERPAID";
})(PaymentState || (PaymentState = {}));
var CashlinkState;
(function (CashlinkState) {
    CashlinkState[CashlinkState["UNKNOWN"] = -1] = "UNKNOWN";
    CashlinkState[CashlinkState["UNCHARGED"] = 0] = "UNCHARGED";
    CashlinkState[CashlinkState["CHARGING"] = 1] = "CHARGING";
    CashlinkState[CashlinkState["UNCLAIMED"] = 2] = "UNCLAIMED";
    CashlinkState[CashlinkState["CLAIMING"] = 3] = "CLAIMING";
    CashlinkState[CashlinkState["CLAIMED"] = 4] = "CLAIMED";
})(CashlinkState || (CashlinkState = {}));
var CashlinkTheme;
(function (CashlinkTheme) {
    CashlinkTheme[CashlinkTheme["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    CashlinkTheme[CashlinkTheme["STANDARD"] = 1] = "STANDARD";
    CashlinkTheme[CashlinkTheme["CHRISTMAS"] = 2] = "CHRISTMAS";
    CashlinkTheme[CashlinkTheme["LUNAR_NEW_YEAR"] = 3] = "LUNAR_NEW_YEAR";
    CashlinkTheme[CashlinkTheme["EASTER"] = 4] = "EASTER";
    CashlinkTheme[CashlinkTheme["GENERIC"] = 5] = "GENERIC";
    CashlinkTheme[CashlinkTheme["BIRTHDAY"] = 6] = "BIRTHDAY";
    // Temporary themes that might be retracted in the future should be listed counting down from 255
})(CashlinkTheme || (CashlinkTheme = {}));


/***/ }),

/***/ "./src/lib/Sentry.ts":
/*!***************************!*\
  !*** ./src/lib/Sentry.ts ***!
  \***************************/
/*! exports provided: startSentry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startSentry", function() { return startSentry; });
/* harmony import */ var _sentry_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/vue */ "./node_modules/@sentry/vue/esm/index.js");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");


function startSentry(Vue) {
    if (config__WEBPACK_IMPORTED_MODULE_1__["default"].reportToSentry) {
        Object(_sentry_vue__WEBPACK_IMPORTED_MODULE_0__["init"])({
            dsn: 'https://92f2289fc2ac4c809dfa685911f865c2@o208918.ingest.sentry.io/1330855',
            Vue,
            environment: config__WEBPACK_IMPORTED_MODULE_1__["default"].network,
            attachProps: true,
        });
        Vue.prototype.$captureException = _sentry_vue__WEBPACK_IMPORTED_MODULE_0__["captureException"];
    }
}


/***/ }),

/***/ "./src/lib/Store.ts":
/*!**************************!*\
  !*** ./src/lib/Store.ts ***!
  \**************************/
/*! exports provided: Store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
class Store {
    constructor() {
        this._dbPromise = null;
        this._indexedDB = Store.INDEXEDDB_IMPLEMENTATION;
    }
    async get(id) {
        const db = await this.connect();
        const transaction = db.transaction(this.DB_STORE_NAME, 'readonly');
        const request = transaction.objectStore(this.DB_STORE_NAME).get(id);
        const result = await this._requestAsPromise(request, transaction);
        return result ? this.fromEntry(result) : result;
    }
    async put(value) {
        const db = await this.connect();
        const transaction = db.transaction(this.DB_STORE_NAME, 'readwrite');
        const request = transaction.objectStore(this.DB_STORE_NAME).put(this.toEntry(value));
        return this._requestAsPromise(request, transaction);
    }
    async remove(id) {
        const db = await this.connect();
        const transaction = db.transaction(this.DB_STORE_NAME, 'readwrite');
        const request = transaction.objectStore(this.DB_STORE_NAME).delete(id);
        return this._requestAsPromise(request, transaction);
    }
    async list() {
        const db = await this.connect();
        const request = db.transaction(this.DB_STORE_NAME, 'readonly')
            .objectStore(this.DB_STORE_NAME)
            .openCursor();
        return this._readAllFromCursor(request);
    }
    async close() {
        if (!this._dbPromise) {
            return;
        }
        // If failed to open database (i.e. dbPromise rejects) we don't need to close the db
        const db = await this._dbPromise.catch(() => null);
        this._dbPromise = null;
        if (db) {
            db.close();
        }
    }
    async connect() {
        if (this._dbPromise) {
            return this._dbPromise;
        }
        this._dbPromise = new Promise((resolve, reject) => {
            const request = this._indexedDB.open(this.DB_NAME, this.DB_VERSION);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
            request.onupgradeneeded = (event) => this.upgrade(request, event);
        });
        return this._dbPromise;
    }
    async _requestAsPromise(request, transaction) {
        return Promise.all([
            new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            }),
            new Promise((resolve, reject) => {
                transaction.oncomplete = () => resolve();
                transaction.onabort = () => reject(transaction.error);
                transaction.onerror = () => reject(transaction.error);
            }),
        ])
            // Promise.all returns an array of resolved promises, but we are only
            // interested in the request.result, which is the first item.
            .then((result) => result[0]);
    }
    _readAllFromCursor(request) {
        return new Promise((resolve, reject) => {
            const results = [];
            request.onsuccess = () => {
                const cursor = request.result;
                if (cursor) {
                    results.push(cursor.value);
                    cursor.continue();
                }
                else {
                    resolve(results);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }
}
Store.INDEXEDDB_IMPLEMENTATION = window.indexedDB;


/***/ }),

/***/ "./src/lib/Uid.ts":
/*!************************!*\
  !*** ./src/lib/Uid.ts ***!
  \************************/
/*! exports provided: makeUid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeUid", function() { return makeUid; });
/**
 * The UID is used for the purpose of tracking Fastspot swap limits per user. It is generated from
 * two deterministic values. The keyId of an account and its first NIM address, wich are always the same.
 *
 * The `keyId` is never passed to outside the Hub, so can be seen as a secret value. This way
 * it is impossible for anyone who gets access to the UID alone to determine the user's address.
 */
async function makeUid(keyId, firstAddress) {
    return toHex(await sha256(fromAscii(`Nimiq UID: ${keyId} ${firstAddress}`)));
}
/**
 * This method uses only browser-native APIs to avoid loading the Nimiq or Bitcoin library, as this
 * method is also used in the iframe.
 */
async function sha256(buffer) {
    return new Uint8Array(await window.crypto.subtle.digest('SHA-256', buffer));
}
/**
 * Conversion functions taken from Nimiq.BufferUtils.
 */
function fromAscii(ascii) {
    const buf = new Uint8Array(ascii.length);
    for (let i = 0; i < ascii.length; ++i) { // tslint:disable-line:prefer-for-of
        buf[i] = ascii.charCodeAt(i);
    }
    return buf;
}
function toHex(buffer) {
    const HEX_ALPHABET = '0123456789abcdef';
    let hex = '';
    for (let i = 0; i < buffer.length; i++) { // tslint:disable-line:prefer-for-of
        const code = buffer[i];
        hex += HEX_ALPHABET[code >>> 4]; // tslint:disable-line:no-bitwise
        hex += HEX_ALPHABET[code & 0x0F]; // tslint:disable-line:no-bitwise
    }
    return hex;
}


/***/ }),

/***/ "./src/lib/WalletInfo.ts":
/*!*******************************!*\
  !*** ./src/lib/WalletInfo.ts ***!
  \*******************************/
/*! exports provided: WalletInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletInfo", function() { return WalletInfo; });
/* harmony import */ var _AccountInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AccountInfo */ "./src/lib/AccountInfo.ts");
/* harmony import */ var _bitcoin_BtcAddressInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bitcoin/BtcAddressInfo */ "./src/lib/bitcoin/BtcAddressInfo.ts");
/* harmony import */ var _ContractInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ContractInfo */ "./src/lib/ContractInfo.ts");
/* harmony import */ var _LabelingMachine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LabelingMachine */ "./src/lib/LabelingMachine.ts");
/* harmony import */ var _WalletInfoCollector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WalletInfoCollector */ "./src/lib/WalletInfoCollector.ts");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _Uid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Uid */ "./src/lib/Uid.ts");
/* harmony import */ var _AddressUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AddressUtils */ "./src/lib/AddressUtils.ts");









class WalletInfo {
    constructor(id, keyId, label, accounts, contracts, type, keyMissing = false, fileExported = false, wordsExported = false, btcXPub, btcAddresses = {
        internal: [],
        external: [],
    }) {
        this.id = id;
        this.keyId = keyId;
        this.label = label;
        this.accounts = accounts;
        this.contracts = contracts;
        this.type = type;
        this.keyMissing = keyMissing;
        this.fileExported = fileExported;
        this.wordsExported = wordsExported;
        this.btcXPub = btcXPub;
        this.btcAddresses = btcAddresses;
    }
    static fromObject(o) {
        const accounts = new Map();
        o.accounts.forEach((accountInfoEntry, userFriendlyAddress) => {
            accounts.set(userFriendlyAddress, _AccountInfo__WEBPACK_IMPORTED_MODULE_0__["AccountInfo"].fromObject(accountInfoEntry));
        });
        const contracts = o.contracts.map((contract) => _ContractInfo__WEBPACK_IMPORTED_MODULE_2__["ContractInfoHelper"].fromObject(contract));
        // Polyfill BTC address lists for pre-BTC wallets
        if (!o.btcAddresses)
            o.btcAddresses = { internal: [], external: [] };
        const btcAddresses = {
            internal: o.btcAddresses.internal
                .map((btcAddressInfoEntry) => _bitcoin_BtcAddressInfo__WEBPACK_IMPORTED_MODULE_1__["BtcAddressInfo"].fromObject(btcAddressInfoEntry)),
            external: o.btcAddresses.external
                .map((btcAddressInfoEntry) => _bitcoin_BtcAddressInfo__WEBPACK_IMPORTED_MODULE_1__["BtcAddressInfo"].fromObject(btcAddressInfoEntry)),
        };
        return new WalletInfo(o.id, o.keyId, o.label, accounts, contracts, o.type, o.keyMissing, o.fileExported, o.wordsExported, o.btcXPub, btcAddresses);
    }
    static async objectToAccountType(o) {
        // Polyfill BTC address lists for pre-BTC wallets
        if (!o.btcAddresses)
            o.btcAddresses = { internal: [], external: [] };
        const accountInfoEntries = Array.from(o.accounts.values());
        return {
            accountId: o.id,
            label: o.label,
            type: o.type,
            fileExported: o.fileExported,
            wordsExported: o.wordsExported,
            addresses: accountInfoEntries.map((entry) => _AccountInfo__WEBPACK_IMPORTED_MODULE_0__["AccountInfo"].objectToAddressType(entry)),
            contracts: o.contracts.map((contract) => _ContractInfo__WEBPACK_IMPORTED_MODULE_2__["ContractInfoHelper"].objectToContractType(contract)),
            btcAddresses: {
                internal: o.btcAddresses.internal.map((entry) => _bitcoin_BtcAddressInfo__WEBPACK_IMPORTED_MODULE_1__["BtcAddressInfo"].objectToBtcAddressType(entry)),
                external: o.btcAddresses.external.map((entry) => _bitcoin_BtcAddressInfo__WEBPACK_IMPORTED_MODULE_1__["BtcAddressInfo"].objectToBtcAddressType(entry)),
            },
            uid: o.keyId
                ? await Object(_Uid__WEBPACK_IMPORTED_MODULE_7__["makeUid"])(o.keyId, _AddressUtils__WEBPACK_IMPORTED_MODULE_8__["default"].toUserFriendlyAddress(accountInfoEntries[0].address))
                : '',
        };
    }
    get defaultLabel() {
        return Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_3__["labelKeyguardAccount"])(this.accounts.keys().next().value);
    }
    get labelForKeyguard() {
        return this.type !== _Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEGACY ? this.label : undefined;
    }
    findContractByAddress(address) {
        return this.contracts.find((contract) => contract.address.equals(address));
    }
    findContractsByOwner(address) {
        return this.contracts.filter((contract) => {
            switch (contract.type) {
                case Nimiq.Account.Type.VESTING: return contract.owner.equals(address);
                case Nimiq.Account.Type.HTLC:
                    return contract.sender.equals(address)
                        || contract.recipient.equals(address);
                default: return false;
            }
        });
    }
    findSignerForAddress(address) {
        const addressInfo = this.accounts.get(address.toUserFriendlyAddress());
        if (addressInfo)
            return addressInfo; // regular address
        // address belongs to a contract
        const contract = this.findContractByAddress(address);
        if (!contract)
            return null;
        if (contract.type !== Nimiq.Account.Type.VESTING) {
            throw new Error('Currently only Vesting contracts are supported');
        }
        return this.accounts.get(contract.owner.toUserFriendlyAddress()) || null;
    }
    findBtcAddressInfo(address, deriveIfNotFound = true) {
        const addressInfo = this.btcAddresses.internal.find((ai) => ai.address === address)
            || this.btcAddresses.external.find((ai) => ai.address === address)
            || null;
        if (addressInfo || !deriveIfNotFound)
            return addressInfo;
        return new Promise(async (resolve, reject) => {
            try {
                // Derive new addresses starting from the last used index
                let index = Math.min(this.btcAddresses.external.length, this.btcAddresses.internal.length) - 1;
                let lastExternalUsed = 0;
                let lastInternalUsed = 0;
                for (; index >= 0; index--) {
                    if (!lastExternalUsed && this.btcAddresses.external[index].used)
                        lastExternalUsed = index;
                    if (!lastInternalUsed && this.btcAddresses.internal[index].used)
                        lastInternalUsed = index;
                    if (lastExternalUsed && lastInternalUsed)
                        break;
                }
                index = Math.min(lastExternalUsed, lastInternalUsed);
                const newAddresses = await _WalletInfoCollector__WEBPACK_IMPORTED_MODULE_4__["default"].detectBitcoinAddresses(this.btcXPub, index + 1);
                let i = index + 1;
                for (const external of newAddresses.external) {
                    this.btcAddresses.external[i] = external;
                    i += 1;
                }
                i = index + 1;
                for (const internal of newAddresses.internal) {
                    this.btcAddresses.internal[i] = internal;
                    i += 1;
                }
                await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_5__["WalletStore"].Instance.put(this);
                resolve(this.findBtcAddressInfo(address, false));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    setContract(updatedContract) {
        const index = this.contracts.findIndex((contract) => contract.address.equals(updatedContract.address));
        if (index < 0) {
            // Is new contract
            this.contracts.push(updatedContract);
            return;
        }
        this.contracts.splice(index, 1, updatedContract);
    }
    toObject() {
        const accountEntries = new Map();
        this.accounts.forEach((accountInfo, userFriendlyAddress) => {
            accountEntries.set(userFriendlyAddress, accountInfo.toObject());
        });
        const contractEntries = this.contracts.map((contract) => contract.toObject());
        return {
            id: this.id,
            keyId: this.keyId,
            label: this.label,
            accounts: accountEntries,
            contracts: contractEntries,
            type: this.type,
            keyMissing: this.keyMissing,
            fileExported: this.fileExported,
            wordsExported: this.wordsExported,
            btcXPub: this.btcXPub,
            btcAddresses: {
                internal: this.btcAddresses.internal.map((btcAddressInfo) => btcAddressInfo.toObject()),
                external: this.btcAddresses.external.map((btcAddressInfo) => btcAddressInfo.toObject()),
            },
        };
    }
    async toAccountType() {
        return {
            accountId: this.id,
            label: this.label,
            type: this.type,
            fileExported: this.fileExported,
            wordsExported: this.wordsExported,
            addresses: Array.from(this.accounts.values()).map((address) => address.toAddressType()),
            contracts: this.contracts.map((contract) => contract.toContractType()),
            btcAddresses: {
                internal: this.btcAddresses.internal.map((btcAddressInfo) => btcAddressInfo.toBtcAddressType()),
                external: this.btcAddresses.external.map((btcAddressInfo) => btcAddressInfo.toBtcAddressType()),
            },
            uid: await this.getUid(),
        };
    }
    async getUid() {
        return this._uid
            || (this._uid = await Object(_Uid__WEBPACK_IMPORTED_MODULE_7__["makeUid"])(this.keyId, Array.from(this.accounts.values())[0].userFriendlyAddress));
    }
}


/***/ }),

/***/ "./src/lib/WalletInfoCollector.ts":
/*!****************************************!*\
  !*** ./src/lib/WalletInfoCollector.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WalletInfoCollector; });
/* harmony import */ var _nimiq_network_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/network-client */ "./node_modules/@nimiq/network-client/dist/NetworkClient.es.js");
/* harmony import */ var _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nimiq/keyguard-client */ "./node_modules/@nimiq/keyguard-client/dist/KeyguardClient.es.js");
/* harmony import */ var _lib_AccountInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/AccountInfo */ "./src/lib/AccountInfo.ts");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/WalletInfo */ "./src/lib/WalletInfo.ts");
/* harmony import */ var _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nimiq/ledger-api */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _LabelingMachine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LabelingMachine */ "./src/lib/LabelingMachine.ts");
/* harmony import */ var _ContractInfo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ContractInfo */ "./src/lib/ContractInfo.ts");
/* harmony import */ var _bitcoin_BtcAddressInfo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./bitcoin/BtcAddressInfo */ "./src/lib/bitcoin/BtcAddressInfo.ts");
/* harmony import */ var _bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./bitcoin/BitcoinJSLoader */ "./src/lib/bitcoin/BitcoinJSLoader.ts");
/* harmony import */ var _bitcoin_ElectrumClient__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./bitcoin/ElectrumClient */ "./src/lib/bitcoin/ElectrumClient.ts");
/* harmony import */ var _bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./bitcoin/BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");
/* harmony import */ var _bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./bitcoin/BitcoinUtils */ "./src/lib/bitcoin/BitcoinUtils.ts");





// TODO import only when needed











const TEMPORARY_ACCOUNT_LABEL_KEYGUARD = '~~~TEMP~~~';
class WalletInfoCollector {
    static async collectBip39WalletInfo(keyId, initialAccounts, 
    // tslint:disable-next-line:no-empty
    onUpdate = () => { }, skipActivityCheck = false, bitcoinXPub) {
        return WalletInfoCollector._collectLedgerOrBip39WalletInfo(_lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].BIP39, initialAccounts, onUpdate, skipActivityCheck, keyId, bitcoinXPub);
    }
    static async collectLedgerWalletInfo(initialAccounts, 
    // tslint:disable-next-line:no-empty
    onUpdate = () => { }, skipActivityCheck = false) {
        return WalletInfoCollector._collectLedgerOrBip39WalletInfo(_lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEDGER, initialAccounts, onUpdate, skipActivityCheck);
    }
    static async collectLegacyWalletInfo(keyId, singleAccount, 
    // tslint:disable-next-line:no-empty
    onUpdate = () => { }, skipActivityCheck = false) {
        // Kick off loading dependencies
        WalletInfoCollector._initializeDependencies(_lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEGACY);
        // Get or create the walletInfo instance
        const walletInfo = await WalletInfoCollector._getWalletInfoInstance(_lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEGACY, keyId);
        const singleAccountAsArray = [singleAccount];
        WalletInfoCollector._addAccounts(walletInfo, singleAccountAsArray);
        onUpdate(walletInfo, singleAccountAsArray);
        const contracts = await WalletInfoCollector._addVestingContracts(walletInfo, singleAccount, onUpdate);
        let hasActivity = contracts.length > 0;
        if (!skipActivityCheck && !hasActivity) {
            const balances = await WalletInfoCollector._getBalances([singleAccount]);
            WalletInfoCollector._addAccounts(walletInfo, singleAccountAsArray, balances);
            onUpdate(walletInfo, []);
            hasActivity = balances.get(singleAccount.address) > 0
                || (await WalletInfoCollector._networkInitializationPromise
                    .then(() => _nimiq_network_client__WEBPACK_IMPORTED_MODULE_0__["NetworkClient"].Instance.requestTransactionReceipts(singleAccount.address, 1)))
                    .length > 0;
        }
        return {
            walletInfo,
            hasActivity,
            releaseKey: async (removeKey) => {
                if (!WalletInfoCollector._keyguardClient) {
                    if (removeKey) {
                        // make sure to create a keyguardClient to be able to remove the key
                        WalletInfoCollector._initializeKeyguardClient();
                    }
                    else {
                        // Simply return as legacy keys don't neccessarily need to be released.
                        // Only a temporary flag in the keyguard session storage is left over by not releasing.
                        return;
                    }
                }
                return WalletInfoCollector._keyguardClient.releaseKey(keyId, removeKey);
            },
        };
    }
    static async detectBitcoinAddresses(xpub, startIndex = 0) {
        const [electrum] = await Promise.all([
            Object(_bitcoin_ElectrumClient__WEBPACK_IMPORTED_MODULE_12__["getElectrumClient"])(),
            Object(_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_11__["loadBitcoinJS"])(),
        ]);
        const xPubType = ['ypub', 'upub'].includes(xpub.substr(0, 4)) ? _bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["NESTED_SEGWIT"] : _bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["NATIVE_SEGWIT"];
        const network = Object(_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_14__["getBtcNetwork"])(xPubType);
        const extendedKey = BitcoinJS.bip32.fromBase58(xpub, network);
        /**
         * According to https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#account-discovery
         * wallets should only scan external addresses for activity, as internal addresses can only receive
         * transactions from external addresses of the same wallet anyway and will thus be discovered when
         * parsing the external tx history. Since we only check for receipts in this address detection step,
         * we cannot find out which internal addresses specifically have been used yet.
         * At the end of the detection, we will simply return the same number of internal addresses as we
         * return external ones, and the wallet can then find out which of those have been used by checking
         * the actual transactions against the internal addresses. The wallet can then derive additional
         * internal addresses via the iframe request if necessary.
         */
        const addresses = [[], []];
        for (const INDEX of [_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["EXTERNAL_INDEX"], _bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["INTERNAL_INDEX"]]) {
            const baseKey = extendedKey.derive(INDEX);
            const basePath = `${_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["BTC_ACCOUNT_KEY_PATH"][xPubType][config__WEBPACK_IMPORTED_MODULE_7__["default"].bitcoinNetwork]}/${INDEX}`;
            let gap = 0;
            let i = startIndex;
            while (gap < _bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["BTC_ACCOUNT_MAX_ALLOWED_ADDRESS_GAP"]) {
                const pubKey = baseKey.derive(i).publicKey;
                const address = Object(_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_14__["publicKeyToPayment"])(pubKey, xPubType).address;
                if (!address)
                    throw new Error(`Cannot create external address for ${xpub} index ${i}`);
                // Check address balance
                const balances = await electrum.getBalance(address);
                const balance = balances.confirmed + balances.unconfirmed;
                // If no balance, then check tx activity
                const receipts = !balance
                    ? await electrum.getTransactionReceiptsByAddress(address)
                    : [];
                const used = balance > 0 || receipts.length > 0;
                addresses[INDEX].push(new _bitcoin_BtcAddressInfo__WEBPACK_IMPORTED_MODULE_10__["BtcAddressInfo"](`${basePath}/${i}`, address, used, balance));
                if (used) {
                    gap = 0;
                }
                else {
                    gap += 1;
                }
                i += 1;
            }
        }
        return {
            internal: addresses[_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["INTERNAL_INDEX"]],
            external: addresses[_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["EXTERNAL_INDEX"]],
        };
    }
    static async _collectLedgerOrBip39WalletInfo(walletType, initialAccounts = [], 
    // tslint:disable-next-line:no-empty
    onUpdate, skipActivityCheck, keyId, bitcoinXPub) {
        if (walletType !== _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEDGER && walletType !== _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].BIP39) {
            throw new Error('Unsupported wallet type');
        }
        // Kick off loading dependencies
        WalletInfoCollector._initializeDependencies(walletType);
        if (!keyId && walletType === _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEDGER) {
            keyId = await _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_5__["default"].Nimiq.getWalletId();
        }
        // Kick off first round of account derivation
        let startIndex = 0;
        let derivedAccountsPromise = WalletInfoCollector._deriveAccounts(startIndex, _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["ACCOUNT_MAX_ALLOWED_ADDRESS_GAP"], walletType, keyId);
        try {
            await Object(_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_11__["loadBitcoinJS"])();
            // Start BTC address detection
            const bitcoinAddresses = bitcoinXPub ? {
                external: Object(_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_14__["deriveAddressesFromXPub"])(bitcoinXPub, [_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["EXTERNAL_INDEX"]], 0, _bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["BTC_ACCOUNT_MAX_ALLOWED_ADDRESS_GAP"]),
                internal: Object(_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_14__["deriveAddressesFromXPub"])(bitcoinXPub, [_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["INTERNAL_INDEX"]], 0, _bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["BTC_ACCOUNT_MAX_ALLOWED_ADDRESS_GAP"]),
            } : {
                external: [],
                internal: [],
            };
            // Get or create the walletInfo instance and derive the first set of derived accounts
            const [walletInfo, firstSetOfDerivedAccounts] = await Promise.all([
                WalletInfoCollector._getWalletInfoInstance(walletType, keyId),
                derivedAccountsPromise,
            ]);
            // Add initial accounts to the walletInfo
            if (initialAccounts.length > 0) {
                WalletInfoCollector._addAccounts(walletInfo, initialAccounts);
            }
            onUpdate(walletInfo, firstSetOfDerivedAccounts);
            // This path is only called for LEDGER or BIP39 accounts, but
            // BIP39 accounts cannot have vesting contracts because they
            // did not exist at mainnet launch.
            const contracts = walletType === _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEDGER
                ? await WalletInfoCollector._addVestingContracts(walletInfo, firstSetOfDerivedAccounts[0], onUpdate)
                : [];
            let hasActivity = contracts.length > 0;
            // Label Keyguard BIP39 accounts according to their first identicon background color
            if (walletType === _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].BIP39 && walletInfo.label === TEMPORARY_ACCOUNT_LABEL_KEYGUARD) {
                walletInfo.label = Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_8__["labelKeyguardAccount"])(firstSetOfDerivedAccounts[0].address);
            }
            let foundAccounts;
            let receiptsError;
            do {
                const derivedAccounts = await derivedAccountsPromise;
                // already start deriving next accounts
                // By always advancing in groups of MAX_ALLOWED_GAP addresses per round, it often happens that more
                // addresses are derived and checked for activity than the BIP44 address gap limit
                // (https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#address-gap-limit) stipulates,
                // because whenever an active address in a group of addresses is found, the next full group is also
                // derived. Thus the actual gap limit of this implementation is up to (2 x MAX_ALLOWED_GAP) - 1.
                // We argue that this is good UX for users, as potentially more of their active addresses are found,
                // even if they haven't strictly followed to the standard - at only a relatively small cost to the
                // network. For example, if the user adds the accounts derived with indices 0, 19, 39 to his wallet but
                // then only ends up using accounts 0 and 39, the account at index 19 will not be found anymore on
                // reimport. With the current implementation however, at least the account 39 would be found, while an
                // implementation strictly following the specification would stop the search at index 19.
                startIndex += _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["ACCOUNT_MAX_ALLOWED_ADDRESS_GAP"];
                derivedAccountsPromise = WalletInfoCollector._deriveAccounts(startIndex, _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["ACCOUNT_MAX_ALLOWED_ADDRESS_GAP"], walletType, keyId);
                // Already add addresses that are in the initialAccounts
                foundAccounts = derivedAccounts.filter((derived) => initialAccounts.some((initial) => initial.address === derived.address));
                let accountsToCheck = skipActivityCheck || hasActivity
                    ? derivedAccounts.filter((derived) => !initialAccounts.some((initial) => initial.address === derived.address))
                    : derivedAccounts;
                const balances = await WalletInfoCollector._getBalances(accountsToCheck);
                for (const account of accountsToCheck) {
                    const balance = balances.get(account.address);
                    if (balance !== undefined && balance !== 0) {
                        foundAccounts.push(account);
                        hasActivity = true;
                    }
                }
                // for accounts with balance 0 check if there are transactions
                accountsToCheck = skipActivityCheck || hasActivity
                    ? accountsToCheck.filter((account) => !foundAccounts.some((foundAccount) => foundAccount.address === account.address))
                    : accountsToCheck; // did not find any activity, have to check all accounts
                await Promise.all(accountsToCheck.map(async (account) => {
                    try {
                        await WalletInfoCollector._networkInitializationPromise;
                        const receipts = await _nimiq_network_client__WEBPACK_IMPORTED_MODULE_0__["NetworkClient"].Instance
                            .requestTransactionReceipts(account.address, 1);
                        if (receipts.length > 0) {
                            foundAccounts.push(account);
                            hasActivity = true;
                        }
                    }
                    catch (error) {
                        if (!error.message.startsWith(_lib_Constants__WEBPACK_IMPORTED_MODULE_6__["ERROR_TRANSACTION_RECEIPTS"])) {
                            throw error;
                        }
                        receiptsError = error;
                        console.debug(error);
                    }
                }));
                if (foundAccounts.length > 0) {
                    WalletInfoCollector._addAccounts(walletInfo, foundAccounts, balances);
                    onUpdate(walletInfo, await derivedAccountsPromise);
                }
            } while (foundAccounts.length > 0);
            const releaseKey = walletType === _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].BIP39
                ? (removeKey) => WalletInfoCollector._keyguardClient.releaseKey(keyId, removeKey)
                : undefined;
            // Note that for Bitcoin we don't catch sync errors as receiptErrors which are only to be handled optionally
            // but throw instead as for Bitcoin it is important to complete a full sync to avoid address re-use.
            walletInfo.btcXPub = bitcoinXPub;
            walletInfo.btcAddresses = bitcoinAddresses;
            hasActivity = hasActivity || bitcoinAddresses.external.some((btcAddressInfo) => btcAddressInfo.used);
            return {
                walletInfo,
                receiptsError,
                releaseKey,
                hasActivity,
            };
        }
        finally {
            // cancel derivation of addresses that we don't need anymore if we're finished or an exception occurred
            if (walletType === _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEDGER) {
                derivedAccountsPromise.catch(() => undefined); // to avoid uncaught promise rejection on cancel
                _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_5__["default"].disconnect(
                /* cancelRequest */ true, 
                /* requestTypesToDisconnect */ [
                    _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_5__["RequestTypeNimiq"].GET_WALLET_ID,
                    _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_5__["RequestTypeNimiq"].DERIVE_ADDRESSES,
                ]);
            }
        }
    }
    static _initializeDependencies(walletType) {
        WalletInfoCollector._networkInitializationPromise = WalletInfoCollector._networkInitializationPromise
            || (_nimiq_network_client__WEBPACK_IMPORTED_MODULE_0__["NetworkClient"].hasInstance()
                ? _nimiq_network_client__WEBPACK_IMPORTED_MODULE_0__["NetworkClient"].Instance.init() // initialize in case it's not initialized yet
                : _nimiq_network_client__WEBPACK_IMPORTED_MODULE_0__["NetworkClient"].createInstance(config__WEBPACK_IMPORTED_MODULE_7__["default"].networkEndpoint).init());
        WalletInfoCollector._networkInitializationPromise
            .catch(() => delete WalletInfoCollector._networkInitializationPromise);
        if (walletType === _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].BIP39)
            this._initializeKeyguardClient();
    }
    static _initializeKeyguardClient() {
        WalletInfoCollector._keyguardClient = WalletInfoCollector._keyguardClient
            || new _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_1__["KeyguardClient"](config__WEBPACK_IMPORTED_MODULE_7__["default"].keyguardEndpoint);
    }
    static async _getWalletInfoInstance(walletType, keyId) {
        const walletId = await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_3__["WalletStore"].Instance.deriveId(keyId);
        const existingWalletInfo = await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_3__["WalletStore"].Instance.get(walletId);
        if (existingWalletInfo) {
            existingWalletInfo.keyMissing = false;
            return existingWalletInfo;
        }
        const label = walletType === _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEGACY
            ? Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_8__["labelLegacyAccount"])()
            : walletType === _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].BIP39
                ? TEMPORARY_ACCOUNT_LABEL_KEYGUARD
                : Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_8__["labelLedgerAccount"])();
        return new _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_4__["WalletInfo"](walletId, keyId, label, new Map(), [], walletType, false);
    }
    static async _deriveAccounts(startIndex, count, walletType, keyId) {
        switch (walletType) {
            case _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEGACY:
                throw new Error('Legacy Wallets can not derive accounts.');
            case _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].BIP39:
                if (!keyId)
                    throw new Error('keyId required for Keyguard account derivation.');
                return WalletInfoCollector._deriveKeyguardAccounts(startIndex, count, keyId);
            case _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEDGER:
                return WalletInfoCollector._deriveLedgerAccounts(startIndex, count);
            default:
                throw new Error('Unsupported walletType.');
        }
    }
    static async _deriveKeyguardAccounts(startIndex, count, keyId) {
        const pathsToDerive = [];
        for (let index = startIndex; index < startIndex + count; ++index) {
            pathsToDerive.push(`${_lib_Constants__WEBPACK_IMPORTED_MODULE_6__["ACCOUNT_BIP32_BASE_PATH_KEYGUARD"]}${index}'`);
        }
        const derivedAddresses = await WalletInfoCollector._keyguardClient.deriveAddresses(keyId, pathsToDerive);
        const userFriendlyAddresses = derivedAddresses.map((derivedAddress) => new Nimiq.Address(derivedAddress.address).toUserFriendlyAddress());
        const accounts = [];
        for (let i = 0; i < pathsToDerive.length; ++i) {
            accounts.push({
                path: pathsToDerive[i],
                address: userFriendlyAddresses[i],
            });
        }
        return accounts;
    }
    static async _deriveLedgerAccounts(startIndex, count) {
        const pathsToDerive = [];
        for (let index = startIndex; index < startIndex + count; ++index) {
            pathsToDerive.push(Object(_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_5__["getBip32Path"])({
                coin: _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_5__["Coin"].NIMIQ,
                addressIndex: index,
            }));
        }
        return (await _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_5__["default"].Nimiq.deriveAddresses(pathsToDerive)).map((address) => ({
            path: address.keyPath,
            address: address.address,
        }));
    }
    static async _getBalances(accounts) {
        const userFriendlyAddresses = accounts.map((account) => account.address);
        await WalletInfoCollector._networkInitializationPromise;
        const balances = await _nimiq_network_client__WEBPACK_IMPORTED_MODULE_0__["NetworkClient"].Instance.getBalance(userFriendlyAddresses);
        for (const [address, balance] of balances) {
            balances.set(address, Nimiq.Policy.coinsToSatoshis(balance));
        }
        return balances;
    }
    static _addAccounts(walletInfo, newAccounts, balances) {
        for (const newAccount of newAccounts) {
            const existingAccountInfo = walletInfo.accounts.get(newAccount.address);
            const balance = balances ? balances.get(newAccount.address) : undefined;
            const accountInfo = existingAccountInfo || new _lib_AccountInfo__WEBPACK_IMPORTED_MODULE_2__["AccountInfo"](newAccount.path, Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_8__["labelAddress"])(newAccount.address), Nimiq.Address.fromString(newAccount.address));
            if (balance !== undefined)
                accountInfo.balance = balance;
            walletInfo.accounts.set(newAccount.address, accountInfo);
        }
    }
    static async _addVestingContracts(walletInfo, potentialOwner, onUpdate) {
        if (walletInfo.type !== _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEGACY && walletInfo.type !== _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["WalletType"].LEDGER) {
            // Only legacy or a first Ledger addresses can be owners of genesis vesting contracts
            return [];
        }
        await WalletInfoCollector._networkInitializationPromise;
        const genesisVestingContracts = (await _nimiq_network_client__WEBPACK_IMPORTED_MODULE_0__["NetworkClient"].Instance.getGenesisVestingContracts())
            .map((contract) => new _ContractInfo__WEBPACK_IMPORTED_MODULE_9__["VestingContractInfo"](Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_8__["labelVestingContract"])(), Nimiq.Address.fromString(contract.address), Nimiq.Address.fromString(contract.owner), contract.start, Nimiq.Policy.coinsToSatoshis(contract.stepAmount), contract.stepBlocks, Nimiq.Policy.coinsToSatoshis(contract.totalAmount)));
        const potentialVestingOwnerAddress = Nimiq.Address.fromString(potentialOwner.address);
        const contracts = genesisVestingContracts
            .filter((contract) => contract.owner.equals(potentialVestingOwnerAddress));
        for (const newContract of contracts) {
            const existingContract = walletInfo.findContractByAddress(newContract.address);
            if (!existingContract) {
                walletInfo.contracts.push(newContract);
            }
        }
        if (contracts.length > 0) {
            // make sure the vesting owner is added to the account too
            WalletInfoCollector._addAccounts(walletInfo, [potentialOwner]);
            onUpdate(walletInfo, []);
        }
        return contracts;
    }
}


/***/ }),

/***/ "./src/lib/WalletStore.ts":
/*!********************************!*\
  !*** ./src/lib/WalletStore.ts ***!
  \********************************/
/*! exports provided: WalletStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletStore", function() { return WalletStore; });
/* harmony import */ var _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/WalletInfo */ "./src/lib/WalletInfo.ts");
/* harmony import */ var _lib_Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/Store */ "./src/lib/Store.ts");


/**
 * With two ObjectStores sharing the same Database, types inside the Store are not well defined.
 * To the outside however, that is completely transparent.
 */
class WalletStore extends _lib_Store__WEBPACK_IMPORTED_MODULE_1__["Store"] {
    constructor() {
        super(...arguments);
        this._storeName = WalletStore.DB_ACCOUNTS_STORE_NAME;
    }
    get DB_NAME() {
        return 'nimiq-hub';
    }
    get DB_STORE_NAME() {
        return this._storeName;
    }
    get DB_VERSION() {
        return 1;
    }
    static get Instance() {
        if (!WalletStore.instance)
            WalletStore.instance = new WalletStore();
        return WalletStore.instance;
    }
    async deriveId(keyId) {
        const wallets = await this.list();
        const existingWallet = wallets.find((wallet) => wallet.keyId === keyId);
        if (existingWallet)
            return existingWallet.id;
        const existingIds = wallets.map((wallet) => wallet.id);
        const keyIdBytes = Nimiq.BufferUtils.fromBase64(keyId);
        // Hashing with a random salt that does not leave the hub to avoid that an external app can derive wallet id's
        // from public keys (Legacy and Ledger accounts) or get a hint for private key guessing / brute forcing (for
        // BIP39) as hashing the private key is cheaper than deriving the public key.
        const salt = await this._getSalt();
        const saltedKeyIdBytes = new Uint8Array(keyIdBytes.length + salt.length);
        saltedKeyIdBytes.set(keyIdBytes, 0);
        saltedKeyIdBytes.set(salt, keyIdBytes.length);
        await Nimiq.WasmHelper.doImport();
        const keyIdHash = Nimiq.Hash.computeBlake2b(saltedKeyIdBytes);
        for (let i = 0; i <= (keyIdHash.length - WalletStore.WALLET_ID_LENGTH); i++) {
            const id = Nimiq.BufferUtils.toHex(keyIdHash.subarray(i, i + WalletStore.WALLET_ID_LENGTH));
            if (existingIds.indexOf(id) === -1)
                return id;
        }
        // Could not find an available wallet ID in the searched space.
        // Recurse with the hashed value.
        return this.deriveId(Nimiq.BufferUtils.toBase64(keyIdHash));
    }
    async get(id) {
        this._storeName = WalletStore.DB_ACCOUNTS_STORE_NAME;
        const result = await super.get(id);
        return result ? _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_0__["WalletInfo"].fromObject(result) : result;
    }
    async put(walletInfo) {
        this._storeName = WalletStore.DB_ACCOUNTS_STORE_NAME;
        return super.put(walletInfo.toObject());
    }
    async remove(id) {
        this._storeName = WalletStore.DB_ACCOUNTS_STORE_NAME;
        return super.remove(id);
    }
    async list() {
        this._storeName = WalletStore.DB_ACCOUNTS_STORE_NAME;
        return super.list();
    }
    upgrade(request, event) {
        const db = request.result;
        if (event.oldVersion < 1) {
            // Version 1 is the first version of the database.
            db.createObjectStore(WalletStore.DB_ACCOUNTS_STORE_NAME, { keyPath: 'id' });
            db.createObjectStore(WalletStore.DB_META_DATA_STORE_NAME, { keyPath: 'name' });
        }
    }
    toEntry(walletInfoOrMetaData) {
        return walletInfoOrMetaData;
    }
    fromEntry(walletEntryOrMetaDataEntry) {
        return walletEntryOrMetaDataEntry;
    }
    async _getMetaData(name) {
        this._storeName = WalletStore.DB_META_DATA_STORE_NAME;
        const result = await super.get(name);
        return result ? result.value : null;
    }
    async _putMetaData(name, value) {
        this._storeName = WalletStore.DB_META_DATA_STORE_NAME;
        return super.put({ value, name });
    }
    async _getSalt() {
        let salt = await this._getMetaData('salt');
        if (salt)
            return salt;
        salt = new Uint8Array(WalletStore.SALT_LENGTH);
        window.crypto.getRandomValues(salt);
        await this._putMetaData('salt', salt);
        return salt;
    }
}
WalletStore.DB_ACCOUNTS_STORE_NAME = 'accounts';
WalletStore.DB_META_DATA_STORE_NAME = 'meta-data';
WalletStore.WALLET_ID_LENGTH = 6;
WalletStore.SALT_LENGTH = 16;
WalletStore.instance = null;


/***/ }),

/***/ "./src/lib/bitcoin/Base58.ts":
/*!***********************************!*\
  !*** ./src/lib/bitcoin/Base58.ts ***!
  \***********************************/
/*! exports provided: encodeBase58, decodeBase58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeBase58", function() { return encodeBase58; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeBase58", function() { return decodeBase58; });
/* tslint:disable:no-bitwise */
// Adapted from https://github.com/45678/Base58
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
function encodeBase58(bytes) {
    if (bytes.length === 0) {
        return '';
    }
    const digits = [0];
    let i = 0;
    while (i < bytes.length) {
        let j = 0;
        while (j < digits.length) {
            digits[j] <<= 8;
            j++;
        }
        digits[0] += bytes[i];
        let carry = 0;
        j = 0;
        while (j < digits.length) {
            digits[j] += carry;
            carry = (digits[j] / 58) | 0;
            digits[j] %= 58;
            ++j;
        }
        while (carry) {
            digits.push(carry % 58);
            carry = (carry / 58) | 0;
        }
        i++;
    }
    i = 0;
    while (bytes[i] === 0 && i < bytes.length - 1) {
        digits.push(0);
        i++;
    }
    return digits.reverse().map((digit) => ALPHABET[digit]).join('');
}
function decodeBase58(text) {
    const ALPHABET_MAP = {};
    for (let n = 0; n < ALPHABET.length; n++) {
        ALPHABET_MAP[ALPHABET.charAt(n)] = n;
    }
    if (text.length === 0) {
        return [];
    }
    const bytes = [0];
    let i = 0;
    while (i < text.length) {
        const c = text[i];
        if (!(c in ALPHABET_MAP)) {
            throw new Error('Base58.decode received unacceptable input. Character \'' + c + '\' is not in the Base58 alphabet.');
        }
        let j = 0;
        while (j < bytes.length) {
            bytes[j] *= 58;
            j++;
        }
        bytes[0] += ALPHABET_MAP[c];
        let carry = 0;
        j = 0;
        while (j < bytes.length) {
            bytes[j] += carry;
            carry = bytes[j] >> 8;
            bytes[j] &= 0xff;
            ++j;
        }
        while (carry) {
            bytes.push(carry & 0xff);
            carry >>= 8;
        }
        i++;
    }
    i = 0;
    while (text[i] === '1' && i < text.length - 1) {
        bytes.push(0);
        i++;
    }
    return bytes.reverse();
}


/***/ }),

/***/ "./src/lib/bitcoin/BitcoinConstants.ts":
/*!*********************************************!*\
  !*** ./src/lib/bitcoin/BitcoinConstants.ts ***!
  \*********************************************/
/*! exports provided: SATOSHIS_PER_COIN, BIP49, BIP84, NESTED_SEGWIT, NATIVE_SEGWIT, BTC_NETWORK_TEST, BTC_NETWORK_MAIN, BTC_ACCOUNT_KEY_PATH, BTC_ACCOUNT_MAX_ALLOWED_ADDRESS_GAP, EXTERNAL_INDEX, INTERNAL_INDEX, EXTENDED_KEY_PREFIXES, BIP49_ADDRESS_VERSIONS, BIP84_ADDRESS_PREFIX, ERROR_NO_XPUB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SATOSHIS_PER_COIN", function() { return SATOSHIS_PER_COIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIP49", function() { return BIP49; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIP84", function() { return BIP84; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NESTED_SEGWIT", function() { return NESTED_SEGWIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NATIVE_SEGWIT", function() { return NATIVE_SEGWIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BTC_NETWORK_TEST", function() { return BTC_NETWORK_TEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BTC_NETWORK_MAIN", function() { return BTC_NETWORK_MAIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BTC_ACCOUNT_KEY_PATH", function() { return BTC_ACCOUNT_KEY_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BTC_ACCOUNT_MAX_ALLOWED_ADDRESS_GAP", function() { return BTC_ACCOUNT_MAX_ALLOWED_ADDRESS_GAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXTERNAL_INDEX", function() { return EXTERNAL_INDEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTERNAL_INDEX", function() { return INTERNAL_INDEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXTENDED_KEY_PREFIXES", function() { return EXTENDED_KEY_PREFIXES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIP49_ADDRESS_VERSIONS", function() { return BIP49_ADDRESS_VERSIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIP84_ADDRESS_PREFIX", function() { return BIP84_ADDRESS_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_NO_XPUB", function() { return ERROR_NO_XPUB; });
const SATOSHIS_PER_COIN = 1e8;
const BIP49 = 'BIP49'; // Nested SegWit
const BIP84 = 'BIP84'; // Native SegWit
const NESTED_SEGWIT = BIP49;
const NATIVE_SEGWIT = BIP84;
const BTC_NETWORK_TEST = 'TEST';
const BTC_NETWORK_MAIN = 'MAIN';
const BTC_ACCOUNT_KEY_PATH = {
    BIP49: {
        MAIN: `m/49'/0'/0'`,
        TEST: `m/49'/1'/0'`,
    },
    BIP84: {
        MAIN: `m/84'/0'/0'`,
        TEST: `m/84'/1'/0'`,
    },
};
const BTC_ACCOUNT_MAX_ALLOWED_ADDRESS_GAP = 10; // FIXME: Set to the standard 20 after testing
// https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#change
const EXTERNAL_INDEX = 0;
const INTERNAL_INDEX = 1;
const EXTENDED_KEY_PREFIXES = {
    // See https://github.com/satoshilabs/slips/blob/master/slip-0132.md#registered-hd-version-bytes
    BIP49: {
        MAIN: {
            public: 0x049d7cb2,
            private: 0x049d7878,
        },
        TEST: {
            public: 0x044a5262,
            private: 0x044a4e28,
        },
    },
    BIP84: {
        MAIN: {
            public: 0x04b24746,
            private: 0x04b2430c,
        },
        TEST: {
            public: 0x045f1cf6,
            private: 0x045f18bc,
        },
    },
};
const BIP49_ADDRESS_VERSIONS = {
    // See https://en.bitcoin.it/wiki/List_of_address_prefixes
    MAIN: [0, 5],
    TEST: [111, 196],
};
const BIP84_ADDRESS_PREFIX = {
    // See https://en.bitcoin.it/wiki/List_of_address_prefixes
    MAIN: 'bc',
    TEST: 'tb',
};
const ERROR_NO_XPUB = 'NO_XPUB';


/***/ }),

/***/ "./src/lib/bitcoin/BitcoinJSLoader.ts":
/*!********************************************!*\
  !*** ./src/lib/bitcoin/BitcoinJSLoader.ts ***!
  \********************************************/
/*! exports provided: loadBitcoinJS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadBitcoinJS", function() { return loadBitcoinJS; });
let bitcoinJsPromise = null;
async function loadBitcoinJS() {
    return bitcoinJsPromise || (bitcoinJsPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.addEventListener('load', async () => {
            // Wait for script to be parsed: check if global 'BitcoinJS' variable is available yet
            while (typeof BitcoinJS === 'undefined') {
                await new Promise((res) => setTimeout(res, 100));
            }
            resolve(true);
        });
        script.addEventListener('error', reject);
        script.integrity = "sha256-mpf6ijUmU2bYEaXt5uB8NAR0fD/eaaX6YtyAPJuX7CY="; // defined in vue.config.js
        script.crossOrigin = 'anonymous';
        script.src = '/bitcoin/BitcoinJS.min.js';
        document.body.appendChild(script);
    }));
}


/***/ }),

/***/ "./src/lib/bitcoin/BitcoinUtils.ts":
/*!*****************************************!*\
  !*** ./src/lib/bitcoin/BitcoinUtils.ts ***!
  \*****************************************/
/*! exports provided: getBtcNetwork, publicKeyToPayment, parseBipFromDerivationPath, validateAddress, coinsToSatoshis, satoshisToCoins, deriveAddressesFromXPub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBtcNetwork", function() { return getBtcNetwork; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publicKeyToPayment", function() { return publicKeyToPayment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBipFromDerivationPath", function() { return parseBipFromDerivationPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateAddress", function() { return validateAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coinsToSatoshis", function() { return coinsToSatoshis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "satoshisToCoins", function() { return satoshisToCoins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deriveAddressesFromXPub", function() { return deriveAddressesFromXPub; });
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");
/* harmony import */ var _BtcAddressInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BtcAddressInfo */ "./src/lib/bitcoin/BtcAddressInfo.ts");



function getBtcNetwork(addressType = config__WEBPACK_IMPORTED_MODULE_0__["default"].bitcoinAddressType) {
    let network;
    switch (config__WEBPACK_IMPORTED_MODULE_0__["default"].bitcoinNetwork) {
        case _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["BTC_NETWORK_MAIN"]:
            network = BitcoinJS.networks.bitcoin;
            break;
        case _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["BTC_NETWORK_TEST"]:
            network = BitcoinJS.networks.testnet;
            break;
        default:
            throw new Error('Invalid bitcoinNetwork configuration');
    }
    return {
        ...network,
        // Adjust the first bytes of xpubs to the respective BIP we are using, to ensure correct xpub parsing
        bip32: _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["EXTENDED_KEY_PREFIXES"][addressType][config__WEBPACK_IMPORTED_MODULE_0__["default"].bitcoinNetwork],
    };
}
function publicKeyToPayment(publicKey, addressType = config__WEBPACK_IMPORTED_MODULE_0__["default"].bitcoinAddressType) {
    switch (addressType) {
        case _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["NESTED_SEGWIT"]:
            return BitcoinJS.payments.p2sh({
                redeem: BitcoinJS.payments.p2wpkh({
                    pubkey: publicKey,
                    network: getBtcNetwork(),
                }),
            });
        case _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["NATIVE_SEGWIT"]:
            return BitcoinJS.payments.p2wpkh({
                pubkey: publicKey,
                network: getBtcNetwork(),
            });
        default:
            throw new Error('Invalid address type');
    }
}
function parseBipFromDerivationPath(path) {
    if (path.startsWith('m/49\'/'))
        return _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["NESTED_SEGWIT"];
    if (path.startsWith('m/84\'/'))
        return _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["NATIVE_SEGWIT"];
    throw new Error(`Could not parse BIP from derivation path: ${path}`);
}
function validateAddress(address) {
    try {
        const parsedAddress = BitcoinJS.address.fromBase58Check(address);
        return _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["BIP49_ADDRESS_VERSIONS"][config__WEBPACK_IMPORTED_MODULE_0__["default"].bitcoinNetwork].includes(parsedAddress.version);
    }
    catch (error) {
        // Ignore, try Bech32 format below
    }
    try {
        const parsedAddress = BitcoinJS.address.fromBech32(address);
        return _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["BIP84_ADDRESS_PREFIX"][config__WEBPACK_IMPORTED_MODULE_0__["default"].bitcoinNetwork] === parsedAddress.prefix;
    }
    catch (error) {
        return false;
    }
}
function coinsToSatoshis(coins) {
    return Math.round(coins * _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["SATOSHIS_PER_COIN"]);
}
function satoshisToCoins(satoshis) {
    return satoshis / _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["SATOSHIS_PER_COIN"];
}
function deriveAddressesFromXPub(xpub, derivationPath, startIndex = 0, count = _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["BTC_ACCOUNT_MAX_ALLOWED_ADDRESS_GAP"], addressType = config__WEBPACK_IMPORTED_MODULE_0__["default"].bitcoinAddressType) {
    let extendedKey;
    if (typeof xpub === 'string') {
        const network = getBtcNetwork(addressType);
        extendedKey = BitcoinJS.bip32.fromBase58(xpub, network);
    }
    else {
        extendedKey = xpub;
    }
    let baseKey = extendedKey;
    for (const index of derivationPath) {
        baseKey = baseKey.derive(index);
    }
    const path = _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["BTC_ACCOUNT_KEY_PATH"][addressType][config__WEBPACK_IMPORTED_MODULE_0__["default"].bitcoinNetwork]
        + (derivationPath.length > 0 ? '/' : '')
        + derivationPath.join('/');
    const addresses = [];
    for (let i = startIndex; i < startIndex + count; i++) {
        const pubKey = baseKey.derive(i).publicKey;
        const address = publicKeyToPayment(pubKey, addressType).address;
        if (!address)
            throw new Error(`Cannot create external address for ${extendedKey.toBase58()} index ${i}`);
        addresses.push(new _BtcAddressInfo__WEBPACK_IMPORTED_MODULE_2__["BtcAddressInfo"](`${path}/${i}`, address, false));
    }
    return addresses;
}


/***/ }),

/***/ "./src/lib/bitcoin/BtcAddressInfo.ts":
/*!*******************************************!*\
  !*** ./src/lib/bitcoin/BtcAddressInfo.ts ***!
  \*******************************************/
/*! exports provided: BtcAddressInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BtcAddressInfo", function() { return BtcAddressInfo; });
class BtcAddressInfo {
    constructor(path, address, used, balance) {
        this.path = path;
        this.address = address;
        this.used = used;
        this.balance = balance;
    }
    static fromObject(o) {
        return new BtcAddressInfo(o.path, o.address, o.used, o.balance);
    }
    static objectToBtcAddressType(o) {
        return o.address;
    }
    toObject() {
        return {
            path: this.path,
            address: this.address,
            used: this.used,
            balance: this.balance,
        };
    }
    toBtcAddressType() {
        return this.address;
    }
}


/***/ }),

/***/ "./src/lib/bitcoin/ElectrumClient.ts":
/*!*******************************************!*\
  !*** ./src/lib/bitcoin/ElectrumClient.ts ***!
  \*******************************************/
/*! exports provided: getElectrumClient, fetchTransaction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElectrumClient", function() { return getElectrumClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTransaction", function() { return fetchTransaction; });
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");
/* harmony import */ var _BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BitcoinJSLoader */ "./src/lib/bitcoin/BitcoinJSLoader.ts");



let electrumClientPromise = null;
/**
 * Get a singleton Electrum client. This singleton should be used throughout the whole app, such that consensus has
 * only to be established once. The Electrum client library is lazy-loaded on demand. Optionally wait for consensus.
 */
async function getElectrumClient(waitForConsensus = true) {
    electrumClientPromise = electrumClientPromise || (async () => {
        // @nimiq/electrum-client already depends on a globally available BitcoinJS,
        // so we need to load it first.
        // TODO (pre)load electrum client in parallel
        await Object(_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_2__["loadBitcoinJS"])();
        const { GenesisConfig, Network, ElectrumClient: Client } = await __webpack_require__.e(/*! import() | electrum-client */ "electrum-client").then(__webpack_require__.bind(null, /*! @nimiq/electrum-client */ "./node_modules/@nimiq/electrum-client/dist/index.js"));
        try {
            GenesisConfig[config__WEBPACK_IMPORTED_MODULE_0__["default"].bitcoinNetwork === _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["BTC_NETWORK_MAIN"] ? 'main' : 'test']();
        }
        catch (e) {
            // GenesisConfig already initialized. Check whether it's for the correct network.
            if ((config__WEBPACK_IMPORTED_MODULE_0__["default"].bitcoinNetwork === _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["BTC_NETWORK_MAIN"]) !== (GenesisConfig.NETWORK_NAME === Network.MAIN)) {
                throw new Error('Wrong Electrum client GenesisConfig initialized.');
            }
        }
        const options = config__WEBPACK_IMPORTED_MODULE_0__["default"].bitcoinNetwork === _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["BTC_NETWORK_MAIN"] ? {
            extraSeedPeers: [{
                    host: 'electrumx.nimiq.com',
                    wssPath: 'electrumx',
                    ports: { wss: 443, ssl: 50002, tcp: 50001 },
                    ip: '',
                    version: '',
                    highPriority: true,
                }, {
                    host: 'btccore-main.bdnodes.net',
                    ports: { wss: null, ssl: 50002, tcp: null },
                    ip: '',
                    version: '',
                }],
            websocketProxy: {
                tcp: 'wss://electrum.nimiq.com:50001',
                ssl: 'wss://electrum.nimiq.com:50002',
            },
        } : {};
        return new Client(options);
    })();
    let client;
    try {
        client = await electrumClientPromise;
    }
    catch (e) {
        electrumClientPromise = null;
        throw e;
    }
    if (waitForConsensus) {
        await client.waitForConsensusEstablished();
        console.log('BTC Consensus established');
    }
    return client;
}
async function fetchTransaction(transactionHash) {
    const [electrum, transactionFromPlain] = await Promise.all([
        getElectrumClient(),
        __webpack_require__.e(/*! import() | electrum-client */ "electrum-client").then(__webpack_require__.bind(null, /*! @nimiq/electrum-client */ "./node_modules/@nimiq/electrum-client/dist/index.js"))
            .then((module) => module.transactionFromPlain),
    ]);
    const fetchedTransaction = await electrum.getTransaction(transactionHash);
    return transactionFromPlain(fetchedTransaction);
}


/***/ }),

/***/ "./src/store.ts":
/*!**********************!*\
  !*** ./src/store.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/WalletInfo */ "./src/lib/WalletInfo.ts");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _lib_LabelingMachine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/LabelingMachine */ "./src/lib/LabelingMachine.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/Constants */ "./src/lib/Constants.ts");






vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);
const store = {
    state: {
        isRequestLoaded: false,
        wallets: [],
        keyguardResult: null,
        chosenWalletLabel: null,
        activeWalletId: null,
        activeUserFriendlyAddress: null,
    },
    mutations: {
        setRequestLoaded(state, payload) {
            state.isRequestLoaded = payload;
        },
        initWallets(state, wallets) {
            state.wallets = wallets;
        },
        addWallet(state, walletInfo) {
            const existingWallet = state.wallets.find((wallet) => wallet.id === walletInfo.id);
            if (!existingWallet) {
                state.wallets.push(walletInfo);
                return;
            }
            const index = state.wallets.indexOf(existingWallet);
            state.wallets.splice(index, 1, walletInfo);
        },
        setKeyguardResult(state, payload) {
            state.keyguardResult = payload;
        },
        setActiveAccount(state, payload) {
            state.activeWalletId = payload.walletId;
            state.activeUserFriendlyAddress = payload.userFriendlyAddress;
            // Store as recent account for next requests
            localStorage.setItem('_recentAccount', JSON.stringify(payload));
        },
        setWalletLabel(state, label) {
            state.chosenWalletLabel = label;
        },
    },
    actions: {
        initWallets({ state, commit }) {
            // Fetch data from store
            return _lib_WalletStore__WEBPACK_IMPORTED_MODULE_3__["WalletStore"].Instance.list().then((walletInfoEntries) => {
                const wallets = walletInfoEntries.map((walletInfoEntry) => _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_2__["WalletInfo"].fromObject(walletInfoEntry));
                commit('initWallets', wallets);
                if (wallets.length === 0)
                    return;
                // Try loading active
                let activeWallet;
                let activeUserFriendlyAddress = null;
                const storedRecentAccount = localStorage.getItem('_recentAccount');
                if (storedRecentAccount) {
                    try {
                        const recentAccount = JSON.parse(storedRecentAccount);
                        activeWallet = state.wallets.find((x) => x.id === recentAccount.walletId);
                        activeUserFriendlyAddress = recentAccount.userFriendlyAddress;
                    }
                    catch (err) {
                        // Do nothing
                    }
                }
                if (!activeWallet) {
                    // If none found, pre-select the first available
                    activeWallet = state.wallets[0];
                }
                // Validate that the address exists on the active wallet
                if (activeUserFriendlyAddress) {
                    const activeAccount = activeWallet.accounts.get(activeUserFriendlyAddress);
                    if (!activeAccount)
                        activeUserFriendlyAddress = null;
                }
                if (!activeUserFriendlyAddress) {
                    // If none found, pre-select the first available
                    const account = activeWallet.accounts.values().next().value;
                    if (!account)
                        return; // No addresses on this wallet
                    activeUserFriendlyAddress = account.userFriendlyAddress;
                }
                commit('setActiveAccount', {
                    walletId: activeWallet.id,
                    userFriendlyAddress: activeUserFriendlyAddress,
                });
            });
        },
        addWalletAndSetActive({ commit }, walletInfo) {
            commit('addWallet', walletInfo);
            commit('setActiveAccount', {
                walletId: walletInfo.id,
                userFriendlyAddress: walletInfo.accounts.values().next().value.userFriendlyAddress,
            });
        },
    },
    getters: {
        findWallet: (state) => (id) => {
            return state.wallets.find((wallet) => wallet.id === id);
        },
        findWalletByAddress: (state) => (address, includeContracts) => {
            const foundWallet = state.wallets.find((wallet) => wallet.accounts.has(address));
            if (foundWallet || !includeContracts)
                return foundWallet;
            return state.wallets.find((wallet) => wallet.contracts.some((contract) => {
                return contract.address.toUserFriendlyAddress() === address;
            }));
        },
        findWalletByKeyId: (state) => (keyId) => {
            return state.wallets.find((wallet) => wallet.keyId === keyId);
        },
        activeWallet: (state, getters) => {
            if (!state.activeWalletId)
                return undefined;
            return getters.findWallet(state.activeWalletId);
        },
        activeAccount: (state, getters) => {
            if (!state.activeUserFriendlyAddress)
                return undefined;
            const wallet = getters.activeWallet;
            if (!wallet)
                return undefined;
            return wallet.accounts.get(state.activeUserFriendlyAddress);
        },
        hasWallets: (state) => {
            return state.wallets.length > 0;
        },
        processedWallets: (state) => {
            const singleAccounts = new Map();
            const singleContracts = [];
            const processedWallets = state.wallets.filter((wallet) => {
                if (wallet.keyMissing)
                    return false;
                if (wallet.type !== _lib_Constants__WEBPACK_IMPORTED_MODULE_5__["WalletType"].LEGACY)
                    return true;
                const [singleAccountAddress, singleAccountInfo] = Array.from(wallet.accounts.entries())[0];
                singleAccountInfo.walletId = wallet.id;
                singleAccounts.set(singleAccountAddress, singleAccountInfo);
                for (const contract of wallet.contracts) {
                    contract.walletId = wallet.id;
                    singleContracts.push(contract);
                }
                return false;
            });
            if (singleAccounts.size > 0) {
                processedWallets.push(new _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_2__["WalletInfo"](_lib_Constants__WEBPACK_IMPORTED_MODULE_5__["LEGACY_GROUPING_ACCOUNT_ID"], 
                /* keyId */ '', Object(_lib_LabelingMachine__WEBPACK_IMPORTED_MODULE_4__["labelLegacyAccountGroup"])(), singleAccounts, singleContracts, _lib_Constants__WEBPACK_IMPORTED_MODULE_5__["WalletType"].LEGACY));
            }
            return processedWallets;
        },
        addressCount: (state) => {
            return state.wallets.reduce((count, wallet) => count + wallet.accounts.size + wallet.contracts.length, 0);
        },
    },
};
/* harmony default export */ __webpack_exports__["default"] = (new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store(store));


/***/ })

}]);
//# sourceMappingURL=chunk-common-legacy.js.map