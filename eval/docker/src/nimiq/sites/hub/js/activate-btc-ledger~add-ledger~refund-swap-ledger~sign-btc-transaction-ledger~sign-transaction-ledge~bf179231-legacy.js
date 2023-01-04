(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["activate-btc-ledger~add-ledger~refund-swap-ledger~sign-btc-transaction-ledger~sign-transaction-ledge~bf179231"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LedgerUi.vue?vue&type=script&lang=ts&":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LedgerUi.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/ledger-api */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
var LedgerUi_1;





let LedgerUi = LedgerUi_1 = class LedgerUi extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.state = _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].currentState;
        this.instructionsTitle = '';
        this.instructionsText = '';
        this.showConnectButton = false;
        this.wrongAppConnected = false;
        this.connectAnimationStep = -1;
        this.connectAnimationInterval = -1;
        this.connectTimer = -1;
        this.loadingFailed = false;
    }
    created() {
        this._onStateChange = this._onStateChange.bind(this);
        _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].on(_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["EventType"].STATE_CHANGE, this._onStateChange);
        this._onStateChange(_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].currentState);
    }
    destroyed() {
        _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].off(_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["EventType"].STATE_CHANGE, this._onStateChange);
        clearTimeout(this.connectTimer);
        clearInterval(this.connectAnimationInterval);
    }
    _connect() {
        const { currentRequest } = _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"];
        if (!currentRequest)
            return;
        // Manual connection in the context of a user gesture.
        if (currentRequest.coin === _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["Coin"].NIMIQ) {
            _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].connect(currentRequest.coin);
        }
        else {
            _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].connect(currentRequest.coin, currentRequest.network);
        }
    }
    get illustration() {
        switch (this.state.type) {
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].LOADING:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].IDLE: // interpret IDLE as "waiting for request"
                return LedgerUi_1.Illustrations.LOADING;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].CONNECTING:
                return LedgerUi_1.Illustrations.CONNECTING;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].REQUEST_PROCESSING:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].REQUEST_CANCELLING:
                return this._getIllustrationForRequest(this.state.request);
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].ERROR:
                return this._getIllustrationForErrorState(this.state);
        }
    }
    _getIllustrationForRequest(request) {
        switch (request.type) {
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].GET_WALLET_ID:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].GET_PUBLIC_KEY:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].DERIVE_ADDRESSES:
            // TODO instructions for u2f/WebAuthn confirmation on Ledger for fetching BTC public keys / addresses.
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeBitcoin"].GET_WALLET_ID:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeBitcoin"].GET_EXTENDED_PUBLIC_KEY:
                return LedgerUi_1.Illustrations.LOADING;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].GET_ADDRESS:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeBitcoin"].GET_ADDRESS_AND_PUBLIC_KEY:
                return request.display ? LedgerUi_1.Illustrations.CONFIRM_ADDRESS : LedgerUi_1.Illustrations.LOADING;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].SIGN_TRANSACTION:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeBitcoin"].SIGN_TRANSACTION:
                return LedgerUi_1.Illustrations.CONFIRM_TRANSACTION;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeBitcoin"].SIGN_MESSAGE:
                return LedgerUi_1.Illustrations.CONFIRM_MESSAGE;
        }
    }
    _getIllustrationForErrorState(errorState) {
        switch (errorState.errorType) {
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].LOADING_DEPENDENCIES_FAILED:
                return LedgerUi_1.Illustrations.LOADING;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].WRONG_APP:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].USER_INTERACTION_REQUIRED: // keep animation running and ask user to use the connect button
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].CONNECTION_ABORTED: // keep animation running and ask user to use the connect button
                return LedgerUi_1.Illustrations.CONNECTING;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].REQUEST_ASSERTION_FAILED:
                return this._getIllustrationForRequest(errorState.request);
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].LEDGER_BUSY:
                // show the illustration for already running request
                return this._getIllustrationForRequest(_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].currentRequest);
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].BROWSER_UNSUPPORTED:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].APP_OUTDATED:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].WRONG_WALLET:
                return LedgerUi_1.Illustrations.IDLE;
        }
    }
    _onStateChange(state) {
        if (state.type === _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].CONNECTING) {
            this.loadingFailed = false;
            // If connecting, only switch to connecting state if the Ledger is not attached yet. Determining this is a
            // bit faster for WebUSB, WebHID and WebBLE than for WebAuthn and U2F.
            const delay = _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].transportType === _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["TransportType"].WEB_AUTHN
                || _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].transportType === _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["TransportType"].U2F
                ? 1050
                : 700;
            this.connectTimer = window.setTimeout(() => {
                if (_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].currentState.type !== _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].CONNECTING)
                    return;
                this.state = _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].currentState;
            }, delay);
            return;
        }
        clearTimeout(this.connectTimer);
        this.state = state;
        switch (state.type) {
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].IDLE:
                this._showInstructions(null);
                break;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].LOADING:
                this._onStateLoading();
                break;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].REQUEST_PROCESSING:
                this._onRequest(state.request);
                break;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].REQUEST_CANCELLING:
                this._showInstructions('', this.$t('186'));
                break;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].ERROR:
                this._onError(state);
                break;
            default:
                throw new Error(`Unhandled state: ${state.type}`);
        }
    }
    _onStateLoading() {
        const retryMessage = this.loadingFailed ? this.$t('148') : '';
        this._showInstructions('', retryMessage);
    }
    _onRequest(request) {
        switch (request.type) {
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].GET_WALLET_ID:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].GET_PUBLIC_KEY:
            // TODO instructions for u2f/WebAuthn confirmation on Ledger for fetching BTC public keys / addresses.
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeBitcoin"].GET_WALLET_ID:
                // no instructions needed as not interactive
                this._showInstructions(null);
                break;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].GET_ADDRESS:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeBitcoin"].GET_ADDRESS_AND_PUBLIC_KEY:
                if (request.display) {
                    this._showInstructions(this.$t('78'), !request.expectedAddress
                        ? this.$t('82')
                        : this.$t('81', { addressToConfirm: request.expectedAddress }));
                }
                else {
                    // no instructions needed as not interactive
                    this._showInstructions(null);
                }
                break;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].DERIVE_ADDRESSES:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeBitcoin"].GET_EXTENDED_PUBLIC_KEY:
                // not interactive, but takes some seconds
                this._showInstructions(this.$t('124'));
                break;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].SIGN_TRANSACTION:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeBitcoin"].SIGN_TRANSACTION:
                this._showInstructions(this.$t('83'), this.$t('84'));
                break;
            default:
                // @ts-ignore request has type never here as this case should never actually happen
                throw new Error(`Unhandled request: ${request.type}`);
        }
    }
    _onError(errorState) {
        switch (errorState.errorType) {
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].LEDGER_BUSY:
                this._showInstructions('', this.$t('185'));
                break;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].LOADING_DEPENDENCIES_FAILED:
                this.loadingFailed = true;
                this._onStateLoading(); // show as still loading / retrying
                break;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].USER_INTERACTION_REQUIRED:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].CONNECTION_ABORTED:
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].WRONG_APP:
                // No instructions to set here. The state change triggers the connection animation and instruction loop.
                // Set showConnectButton and wrongAppConnected as flags and not have them as a getters depending on the
                // state such that the connect animation loop continues to adapt accordingly, for consistency even when
                // the error is resolved and the api switches to the connecting state.
                this.showConnectButton = errorState.errorType !== _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].WRONG_APP; // reset even if wrong app
                this.wrongAppConnected = this.wrongAppConnected || errorState.errorType === _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].WRONG_APP;
                break;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].BROWSER_UNSUPPORTED:
                this._showInstructions('', this.$t('146'));
                break;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].APP_OUTDATED:
                const request = errorState.request;
                this._showInstructions('', this.$t('276', { app: request.requiredApp }));
                break;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].WRONG_WALLET:
                this._showInstructions('', this.$t('233'));
                break;
            case _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["ErrorType"].REQUEST_ASSERTION_FAILED:
                this._showInstructions(this.$t('200'), `${this.small ? this.$t('201') : ''}${errorState.message}`);
                break;
            default:
                throw new Error(`Unhandled error: ${errorState.type} - ${errorState.message}`);
        }
    }
    _cycleConnectInstructions() {
        const app = _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].currentRequest ? _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].currentRequest.requiredApp : 'Nimiq';
        let instructions = !this.wrongAppConnected
            ? [
                this.$t('90'),
                this.$t('115'),
            ] : [];
        instructions.push(this.$t('173', { app }));
        if (this.showConnectButton) {
            instructions.push(this.$t('73'));
        }
        if (instructions.length > 1) {
            // show step numbers
            instructions = instructions.map((instruction, i) => `${i + 1}. ${instruction}`);
        }
        const oldInstructionIndex = instructions.indexOf(this.instructionsText);
        const instructionIndex = (oldInstructionIndex + 1) % instructions.length;
        this._showInstructions(this.$t('89'), instructions[instructionIndex]);
        // Set animation step which starts counting at 1. If first instruction steps were skipped, also skip them in
        // the animation.
        this.connectAnimationStep = (this.wrongAppConnected ? 2 : 0) + instructionIndex + 1;
    }
    _onIllustrationChange(illustration) {
        if (illustration === LedgerUi_1.Illustrations.CONNECTING) {
            this._cycleConnectInstructions();
            this.connectAnimationInterval =
                window.setInterval(() => this._cycleConnectInstructions(), LedgerUi_1.CONNECT_ANIMATION_STEP_DURATION);
        }
        else {
            clearInterval(this.connectAnimationInterval);
            this.connectAnimationStep = -1;
            this.showConnectButton = false;
            this.wrongAppConnected = false;
        }
    }
    _showInstructions(title, text) {
        this.$emit(!title && !text ? LedgerUi_1.Events.NO_INFORMATION_SHOWN : LedgerUi_1.Events.INFORMATION_SHOWN);
        if (this.small) {
            // On small layout don't show a title but only the message, or if not available use the title as message
            this.instructionsTitle = '';
            this.instructionsText = text || title || '';
        }
        else {
            this.instructionsTitle = title || '';
            this.instructionsText = text || '';
        }
    }
};
LedgerUi.CONNECT_ANIMATION_STEP_DURATION = 9000 / 3;
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(Boolean)
], LedgerUi.prototype, "small", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('illustration', { immediate: true })
], LedgerUi.prototype, "_onIllustrationChange", null);
LedgerUi = LedgerUi_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"], LoadingSpinner: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["LoadingSpinner"] } })
], LedgerUi);
(function (LedgerUi) {
    let Events;
    (function (Events) {
        Events["NO_INFORMATION_SHOWN"] = "no-information-shown";
        Events["INFORMATION_SHOWN"] = "information-shown";
    })(Events = LedgerUi.Events || (LedgerUi.Events = {}));
    let Illustrations;
    (function (Illustrations) {
        Illustrations["IDLE"] = "idle";
        Illustrations["LOADING"] = "loading";
        Illustrations["CONNECTING"] = "connecting";
        Illustrations["CONFIRM_ADDRESS"] = "confirm-address";
        Illustrations["CONFIRM_TRANSACTION"] = "confirm-transaction";
        Illustrations["CONFIRM_MESSAGE"] = "confirm-message";
    })(Illustrations = LedgerUi.Illustrations || (LedgerUi.Illustrations = {}));
})(LedgerUi || (LedgerUi = {}));
/* harmony default export */ __webpack_exports__["default"] = (LedgerUi);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LedgerUi.vue?vue&type=template&id=5a8deb8d&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LedgerUi.vue?vue&type=template&id=5a8deb8d&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "ledger-ui",
      class: {
        small: _vm.small,
        "has-connect-button": _vm.showConnectButton,
        "is-wrong-app-connected": _vm.wrongAppConnected
      }
    },
    [
      _c(
        "StatusScreen",
        {
          attrs: {
            state: "loading",
            title: _vm.instructionsTitle,
            status: _vm.instructionsText,
            small: _vm.small
          }
        },
        [
          _c(
            "template",
            { slot: "loading" },
            [
              _c(
                "transition",
                { attrs: { name: "transition-fade" } },
                [
                  _vm.illustration === _vm.constructor.Illustrations.LOADING
                    ? _c("LoadingSpinner")
                    : _c(
                        "div",
                        {
                          staticClass: "ledger-device-container",
                          class:
                            _vm.state.request &&
                            _vm.state.request.coin.toLowerCase(),
                          attrs: {
                            illustration: _vm.illustration,
                            "connect-animation-step": _vm.connectAnimationStep
                          }
                        },
                        [
                          _c("div", {
                            staticClass:
                              "ledger-screen-confirm-address ledger-screen"
                          }),
                          _c("div", {
                            staticClass:
                              "ledger-screen-confirm-transaction ledger-screen"
                          }),
                          _c("div", {
                            staticClass:
                              "ledger-screen-confirm-message ledger-screen"
                          }),
                          _c("div", {
                            staticClass: "ledger-screen-app ledger-screen"
                          }),
                          _c("div", {
                            staticClass: "ledger-screen-dashboard ledger-screen"
                          }),
                          _c(
                            "div",
                            { staticClass: "ledger-screen-pin ledger-screen" },
                            [
                              _c("div", { staticClass: "ledger-pin-dot" }),
                              _c("div", { staticClass: "ledger-pin-dot" }),
                              _c("div", { staticClass: "ledger-pin-dot" }),
                              _c("div", { staticClass: "ledger-pin-dot" }),
                              _c("div", { staticClass: "ledger-pin-dot" }),
                              _c("div", { staticClass: "ledger-pin-dot" }),
                              _c("div", { staticClass: "ledger-pin-dot" }),
                              _c("div", { staticClass: "ledger-pin-dot" })
                            ]
                          ),
                          _c(
                            "div",
                            { staticClass: "ledger-opacity-container" },
                            [
                              _c("div", { staticClass: "ledger-cable" }),
                              _c("div", { staticClass: "ledger-device" })
                            ]
                          )
                        ]
                      )
                ],
                1
              ),
              _c("transition", { attrs: { name: "transition-fade" } }, [
                _vm.showConnectButton
                  ? _c(
                      "button",
                      {
                        staticClass: "nq-button-s inverse connect-button",
                        class: { pulsate: _vm.connectAnimationStep === 4 },
                        on: { click: _vm._connect }
                      },
                      [_vm._v(" " + _vm._s(_vm.$t('88')) + " ")]
                    )
                  : _vm._e()
              ])
            ],
            1
          )
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LedgerUi.vue?vue&type=style&index=0&id=5a8deb8d&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LedgerUi.vue?vue&type=style&index=0&id=5a8deb8d&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.ledger-ui[data-v-5a8deb8d] {\n    width: 100%;\n    height: 100%;\n    text-align: center;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n\n    --ledger-connect-animation-step-duration: 3s;\n    --ledger-container-width: 52%;\n    --ledger-scale-factor: 1.62;\n    --ledger-y-offset: 0rem; /* unit can't be omitted here */\n    --ledger-opacity: .3;\n}\n.ledger-ui.small[data-v-5a8deb8d] {\n    --ledger-container-width: 48%;\n    --ledger-scale-factor: 1.5;\n    --ledger-y-offset: -2rem;\n}\n.ledger-ui.has-connect-button.small[data-v-5a8deb8d] {\n    --ledger-container-width: 44%;\n    --ledger-y-offset: -3.5rem;\n}\n.status-screen[data-v-5a8deb8d] {\n    overflow: hidden;\n}\n.status-screen[data-v-5a8deb8d] .status-row {\n    -webkit-transition: margin-bottom .4s;\n    transition: margin-bottom .4s;\n}\n.ledger-ui.has-connect-button .status-screen[data-v-5a8deb8d] .status-row {\n    margin-bottom: 7rem;\n    pointer-events: none;\n}\n.ledger-ui.has-connect-button.small .status-screen[data-v-5a8deb8d] .status-row {\n    margin-bottom: 5.5rem;\n}\n.connect-button[data-v-5a8deb8d] {\n    position: absolute;\n    left: 50%;\n    bottom: 2rem;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n    -webkit-transition: opacity .4s;\n    transition: opacity .4s;\n}\n.connect-button.pulsate[data-v-5a8deb8d]:not(:hover):not(:focus) {\n    -webkit-animation: connect-button-pulsate-data-v-5a8deb8d calc(var(--ledger-connect-animation-step-duration) / 4) alternate infinite;\n            animation: connect-button-pulsate-data-v-5a8deb8d calc(var(--ledger-connect-animation-step-duration) / 4) alternate infinite;\n}\n.ledger-ui.small .connect-button[data-v-5a8deb8d] {\n    bottom: 1rem;\n}\n.loading-spinner[data-v-5a8deb8d],\n.ledger-device-container[data-v-5a8deb8d] {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    -webkit-transition: opacity .4s;\n    transition: opacity .4s;\n}\n.ledger-device-container[data-v-5a8deb8d] {\n    width: var(--ledger-container-width);\n    -webkit-transform: translate(-50%, calc(-50% + var(--ledger-y-offset)));\n            transform: translate(-50%, calc(-50% + var(--ledger-y-offset)));\n    -webkit-transition: opacity .4s, width .4s, -webkit-transform .4s;\n    transition: opacity .4s, width .4s, -webkit-transform .4s;\n    transition: opacity .4s, transform .4s, width .4s;\n    transition: opacity .4s, transform .4s, width .4s, -webkit-transform .4s;\n}\n.ledger-device-container[data-v-5a8deb8d]::before {\n    /* fixed aspect ratio */\n    content: \"\";\n    display: block;\n    padding-top: 21%;\n}\n.ledger-device-container *[data-v-5a8deb8d] {\n    position: absolute;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: contain;\n}\n.ledger-opacity-container[data-v-5a8deb8d] {\n    /* the ledger-device-container size and screen sizes were initially chosen such that the opacity container has\n    exactly the size of the the ledger-device-container at scale factor 2. For other factors adapt size. */\n    top: calc(50% * (1 - 2 / var(--ledger-scale-factor)));\n    left: calc(50% * (1 - 2 / var(--ledger-scale-factor)));\n    width: calc(100% * (2 / var(--ledger-scale-factor)));\n    height: calc(100% * (2 / var(--ledger-scale-factor)));\n}\n.ledger-device[data-v-5a8deb8d],\n.ledger-cable[data-v-5a8deb8d] {\n    top: 0;\n    width: 100%;\n    height: 100%;\n}\n.ledger-opacity-container[data-v-5a8deb8d] {\n    -webkit-transform: scale(var(--ledger-scale-factor)) translateX(27.3%);\n            transform: scale(var(--ledger-scale-factor)) translateX(27.3%);\n    opacity: var(--ledger-opacity);\n}\n.ledger-device[data-v-5a8deb8d] {\n    background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 290 61\" fill=\"white\"><path d=\"M145.5 46C137 46 130 39 130 30.5S137 15 145.5 15 161 22 161 30.5 154 46 145.5 46zm0-29c-7.4 0-13.5 6.1-13.5 13.5S138.1 44 145.5 44 159 37.9 159 30.5 152.9 17 145.5 17z\"/><path d=\"M285.5 3H107V2a2 2 0 0 0-2-2H89a2 2 0 0 0-2 2v1H41V2a2 2 0 0 0-2-2H23a2 2 0 0 0-2 2v1H4C1.8 3 0 4.8 0 7v47c0 2.2 1.8 4 4 4h281.5c2.5 0 4.5-2 4.5-4.5v-46c0-2.5-2-4.5-4.5-4.5zM102 40.9c0 1.1-.9 2.1-2 2.1H28c-1.1 0-2-.9-2-2.1V20.1c0-1.1.9-2.1 2-2.1h72c1.1 0 2 .9 2 2.1v20.8zm186 12.6c0 1.4-1.1 2.5-2.5 2.5h-140C131.4 56 120 44.6 120 30.5S131.4 5 145.5 5h140c1.4 0 2.5 1.1 2.5 2.5v46z\"/></svg>');\n}\n.ledger-cable[data-v-5a8deb8d] {\n    right: 94.2%;\n    background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 290 61\"><path fill=\"white\" d=\"M289.3 38.5c0 1.4-1 2.5-2 2.5h-18c-1.2 0-2-1.1-2-2.5v-16c0-1.4.8-2.5 2-2.5h18c1 0 2 1.1 2 2.5z\" opacity=\".7\"/><path fill=\"%231f2348\" d=\"M284.3 27h-8c-.7 0-1-.4-1-1s.3-1 1-1h8c.5 0 1 .4 1 1s-.5 1-1 1zM284.3 36h-8c-.7 0-1-.4-1-1s.3-1 1-1h8c.5 0 1 .4 1 1s-.5 1-1 1z\" opacity=\".5\"/><path fill=\"white\" d=\"M269.3 18h-27c-2.9 0-5 2.4-5 5.4V29H1.3v3h236v5.6c0 3 2.1 5.4 5 5.4h27c1 0 2-1 2-2.2V20.2c0-1.2-1-2.2-2-2.2z\"/></svg>');\n}\n.ledger-screen[data-v-5a8deb8d] {\n    top: 10%;\n    left: 24.25%;\n    width: 51%;\n    height: 77%;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    display: none;\n}\n.ledger-screen-pin[data-v-5a8deb8d] {\n    background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 114 37.5\"><path stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M12.2 17.5l-2.7 2.7-2.8-2.7M101.8 20.2l2.7-2.7 2.8 2.7\"/><text fill=\"white\" font-family=\"sans-serif\" font-size=\"10\" transform=\"translate(36.4 13.5)\">PIN code</text></svg>');\n}\n.ledger-pin-dot[data-v-5a8deb8d] {\n    position: unset;\n    margin: 1%;\n    margin-top: 13%;\n    width: 5%;\n    height: 15.7%;\n}\n.nimiq .ledger-screen-dashboard[data-v-5a8deb8d] {\n    background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"white\" viewBox=\"0 0 114 37.5\"><path fill=\"none\" stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M103.5 16.2l2.7 2.7-2.7 2.8m-93 .1L7.8 19l2.7-2.8M40.2 14.5h3.6m26.4 0h3.6\"/><text font-family=\"sans-serif\" font-size=\"11.2\" transform=\"translate(41.3 32.3)\">Nimiq</text><path d=\"M27.3 14.8h-.6v1.9h.2c.7 0 2.2 0 2.2-.9 0-.8-1-1-1.8-1zm1.4-1.7c0-.8-.9-.9-1.5-.9h-.5V14h.1c.7 0 1.9 0 1.9-.9z\"/><path d=\"M27.5 7.5a7 7 0 0 0-7 7c0 3.9 3.1 7 7 7s7-3.1 7-7a7 7 0 0 0-7-7zm3.3 8.4c-.1 1.4-1.2 1.7-2.6 1.9v1.4h-.9v-1.4h-.7v1.4h-.8v-1.4h-1.7l.2-1h.7c.3 0 .3-.2.3-.3v-3.8c0-.2-.2-.4-.5-.4h-.6v-.9H26V9.9h.8v1.5h.7V9.9h.9v1.4c1.1.1 2 .4 2.1 1.4 0 .8-.3 1.2-.8 1.5.7.2 1.2.6 1.1 1.7zm33.5-2l-3.1-5.3c-.2-.4-.6-.6-1.1-.6h-6.3c-.4 0-.9.2-1.1.6l-3.1 5.3c-.2.4-.2.8 0 1.2l3.1 5.3c.2.4.6.6 1.1.6h6.3c.4 0 .9-.2 1.1-.6l3.1-5.3c.3-.4.3-.8 0-1.2zm22.2-6.4a7 7 0 0 0-7 7c0 3.9 3.1 7 7 7s7-3.1 7-7a7 7 0 0 0-7-7zm0 11.5l-3-4 3 1.8 3-1.8-3 4zm0-2.8l-3-1.7 3-4.5 3 4.5-3 1.7z\"/></svg>');\n}\n.bitcoin .ledger-screen-dashboard[data-v-5a8deb8d] {\n    background-image: url('data:image/svg+xml,<svg fill=\"white\" viewBox=\"0 0 114 37.5\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M35 13.9l-3.1-5.3c-.2-.4-.6-.6-1.1-.6h-6.3c-.4 0-1 .2-1.1.6l-3.1 5.3c-.2.4-.2.8 0 1.2l3 5.3c.3.4.7.6 1.2.6h6.3c.4 0 .9-.2 1-.6l3.2-5.3c.3-.4.3-.8 0-1.2z\"/><path d=\"M103.5 16.2l2.7 2.7-2.7 2.8m-93 .1L7.8 19l2.7-2.8m29.7-1.7h3.6m26.4 0h3.6\" fill=\"none\" stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"/><text x=\"40.2\" y=\"32.3\" font-family=\"sans-serif\" font-size=\"11.2\">Bitcoin</text><path d=\"M57 7.5a7 7 0 00-7 7c0 3.9 3 7 7 7s7-3.1 7-7a7 7 0 00-7-7zm-1.6 2.4h.8v1.5h.7V9.9h1v1.4c1 .1 2 .4 2 1.4 0 .8-.3 1.2-.8 1.5.7.2 1.2.6 1.1 1.7 0 1.4-1.2 1.7-2.6 1.9v1.4h-.9v-1.4H56v1.4h-.8v-1.4h-1.7l.2-1h.7c.3 0 .3-.2.3-.3v-3.8c0-.2-.2-.4-.5-.4h-.6v-.9h1.8zm.7 2.3V14h.1c.7 0 2 0 2-.9 0-.8-1-.9-1.6-.9zm0 2.6v1.9h.2c.7 0 2.2 0 2.2-.9 0-.8-1-1-1.8-1zM86.5 7.5a7 7 0 00-7 7c0 3.9 3.1 7 7 7s7-3.1 7-7a7 7 0 00-7-7zm0 2.5l3 4.5-3 1.7-3-1.7 3-4.5zm-3 5l3 1.8 3-1.8-3 4-3-4z\"/></svg>');\n}\n.nimiq .ledger-screen-app[data-v-5a8deb8d] {\n    background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 114 37.5\"><g fill=\"white\" stroke-width=\".4\"><path d=\"M34.2 17.7l-5.4-9.3a2.1 2.1 0 0 0-1.9-1.1H16.2a2.1 2.1 0 0 0-1.9 1L9 17.8a2.1 2.1 0 0 0 0 2.1l5.3 9.3a2.1 2.1 0 0 0 1.9 1.1h10.7a2.1 2.1 0 0 0 1.9-1l5.4-9.4a2.1 2.1 0 0 0 0-2.1zM53.2 12h2.4v13.5h-1.8l-7.4-9.4v9.4h-2.3V12H46l7.3 9.5zM60.2 25.6V12h2.5v13.6zM78.7 12h2v13.5h-2.2v-8.4l-3.7 8.4h-1.6l-3.7-8.4v8.4h-2.1V12h2L74 22.6zM85.3 25.6V12h2.5v13.6zM104.5 22.4a5.7 5.7 0 0 1-2.9 2.8 7.5 7.5 0 0 0 1.1 1.4 13.6 13.6 0 0 0 1.5 1.4l-1.8 1.3a10.4 10.4 0 0 1-1.7-1.6 11.4 11.4 0 0 1-1.4-2h-.6a7 7 0 0 1-3.5-.8 5.6 5.6 0 0 1-2.3-2.5 8.4 8.4 0 0 1-.8-3.7 8 8 0 0 1 .8-3.7 5.7 5.7 0 0 1 2.3-2.4 7.8 7.8 0 0 1 7 0 5.6 5.6 0 0 1 2.3 2.4 8 8 0 0 1 .8 3.7 8.3 8.3 0 0 1-.8 3.7zm-8.8 0a4.2 4.2 0 0 0 6 0c.7-.8 1.1-2 1.1-3.7s-.4-2.8-1-3.7a4.2 4.2 0 0 0-6.1 0c-.8.9-1.1 2.1-1.1 3.7s.3 2.9 1 3.8z\"/></g></svg>');\n}\n.bitcoin .ledger-screen-app[data-v-5a8deb8d] {\n    background-image: url('data:image/svg+xml,<svg viewBox=\"0 0 114 37.5\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M21.6 7.3A11.5 11.5 0 0010 18.8c0 6.4 5 11.4 11.5 11.4 6.4 0 11.4-5 11.4-11.4A11.5 11.5 0 0021.6 7.3zm-2.5 4h1.3v2.4h1.2v-2.5H23v2.3c1.8.2 3.2.7 3.4 2.3 0 1.3-.5 2-1.3 2.5 1.1.3 2 1 1.8 2.8-.2 2.3-2 2.7-4.3 3v2.4h-1.5v-2.3h-1.1v2.3h-1.3v-2.3H16l.3-1.7h1.2c.5 0 .5-.3.5-.5v-6.2c0-.3-.4-.6-.8-.6h-1v-1.5h3zm1.2 3.7v3h.1c1.2 0 3.1 0 3.1-1.5 0-1.3-1.4-1.5-2.4-1.5zm0 4.3v3h.3c1.1 0 3.6 0 3.6-1.4 0-1.3-1.6-1.6-3-1.6zm73.3 6.2v-6.7-1.4l-.1-1.3h2.2l.2 1.9h-.2q.4-1 1.3-1.6.9-.5 2-.5 3.4 0 3.4 3.9v5.7h-2.3V20q0-1.1-.5-1.7-.4-.5-1.3-.5-1 0-1.7.7t-.7 1.8v5.3zm-4.8 0v-9.4H91v9.4zm-.2-13.7h2.6v2.3h-2.6zM82 25.7q-1.5 0-2.6-.6-1-.6-1.6-1.7-.6-1.1-.6-2.6t.6-2.6q.6-1.1 1.6-1.7 1.1-.6 2.6-.6 1.4 0 2.5.6 1 .6 1.7 1.7.6 1 .6 2.6 0 1.5-.6 2.6-.6 1-1.7 1.7-1 .6-2.5.6zm0-1.8q1.2 0 1.8-.8.6-.8.6-2.3 0-1.5-.6-2.3-.6-.8-1.8-.8-1.2 0-1.8.8-.7.8-.7 2.3 0 1.5.7 2.3.6.8 1.8.8zm-9.4 1.8q-1.5 0-2.6-.6-1-.6-1.6-1.7-.6-1-.6-2.6 0-1.5.6-2.6t1.7-1.7q1.1-.6 2.6-.6 1 0 2 .3.9.3 1.5.9l-.7 1.6q-.6-.5-1.3-.7-.7-.3-1.3-.3-1.3 0-2 .8t-.7 2.3q0 1.5.7 2.3.7.8 2 .8.6 0 1.3-.3.7-.2 1.3-.7l.7 1.6q-.7.6-1.6.9-1 .3-2 .3zM60 17.9V16h6.6V18zm6.6 5.7v1.9l-.7.1h-.8q-1.6 0-2.5-.8-.8-1-.8-2.6v-8.4l2.3-.8v9q0 .7.2 1.1.2.4.6.5.3.2.7.2h.5l.5-.2zm-10.3 2V16h2.3v9.4zm-.1-13.8h2.6v2.3h-2.6zM43.7 25.5V12.3h5.8q2 0 3.3.9 1.1.9 1.1 2.5 0 1.1-.6 2t-1.7 1q1.3.2 2 1 .7 1 .7 2.2 0 1.7-1.2 2.7-1.2 1-3.4 1zm2.4-1.8h3.4q1.3 0 1.9-.5.6-.5.6-1.5t-.6-1.5-2-.5h-3.3zm0-5.8h3q1.3 0 2-.5.6-.5.6-1.4 0-1-.7-1.4-.6-.5-1.9-.5h-3z\" fill=\"white\" stroke-width=\".4\"/></svg>');\n}\n.ledger-screen-confirm-address[data-v-5a8deb8d] {\n    background-image: url('data:image/svg+xml,svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"white\" viewBox=\"0 0 114 37.5\"><text font-family=\"sans-serif\" font-size=\"11\" transform=\"translate(36.5 16.5)\"><tspan x=\"0\" y=\"0\">Confirm </tspan><tspan x=\"-.9\" y=\"12\">Address</tspan></text><path fill=\"none\" stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M13.2 21.2l-5.5-5.5m5.5.1l-5.5 5.5m98.5-5.5l-5.5 5.5-2.5-2.5\"/></svg>');\n}\n.ledger-device-container[illustration=\"confirm-address\"] .ledger-screen-confirm-address[data-v-5a8deb8d] {\n    display: block;\n}\n.ledger-screen-confirm-transaction[data-v-5a8deb8d] {\n    background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"white\" viewBox=\"0 0 114 37.5\"><text font-family=\"sans-serif\" font-size=\"11\" transform=\"translate(36.5 16.5)\"><tspan x=\"0\" y=\"0\">Confirm </tspan><tspan x=\"-10.2\" y=\"12\">Transaction</tspan></text><path fill=\"none\" stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M13.2 21.2l-5.5-5.5m5.5.1l-5.5 5.5m98.5-5.5l-5.5 5.5-2.5-2.5\"/></svg>');\n}\n.ledger-device-container[illustration=\"confirm-transaction\"] .ledger-screen-confirm-transaction[data-v-5a8deb8d] {\n    display: block;\n}\n.ledger-screen-confirm-message[data-v-5a8deb8d] {\n    background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"white\" viewBox=\"0 0 114 37.5\"><text font-family=\"sans-serif\" font-size=\"11\" transform=\"translate(36.5 16.5)\"><tspan x=\"0\" y=\"0\">Confirm </tspan><tspan x=\"-3\" y=\"12\">Message</tspan></text><path fill=\"none\" stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M13.2 21.2l-5.5-5.5m5.5.1l-5.5 5.5m98.5-5.5l-5.5 5.5-2.5-2.5\"/></svg>');\n}\n.ledger-device-container[illustration=\"confirm-message\"] .ledger-screen-confirm-message[data-v-5a8deb8d] {\n    display: block;\n}\n\n/* Connect Animation */\n.ledger-device-container[illustration=\"connecting\"][connect-animation-step=\"1\"] .ledger-opacity-container[data-v-5a8deb8d] {\n    -webkit-animation: ledger-fade-in-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n            animation: ledger-fade-in-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n}\n.ledger-device-container[illustration=\"connecting\"][connect-animation-step=\"1\"] .ledger-cable[data-v-5a8deb8d] {\n    -webkit-animation: ledger-connect-cable-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n            animation: ledger-connect-cable-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n}\n.ledger-device-container[illustration=\"connecting\"][connect-animation-step=\"2\"] .ledger-opacity-container[data-v-5a8deb8d] {\n    -webkit-animation: ledger-scale-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n            animation: ledger-scale-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n}\n.ledger-device-container[illustration=\"connecting\"][connect-animation-step=\"2\"] .ledger-screen-pin[data-v-5a8deb8d] {\n    -webkit-animation: ledger-show-screen-pin-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n            animation: ledger-show-screen-pin-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.ledger-device-container[illustration=\"connecting\"][connect-animation-step=\"2\"] .ledger-pin-dot[data-v-5a8deb8d] {\n    -webkit-animation: ledger-show-pin-dot-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n            animation: ledger-show-pin-dot-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n}\n.ledger-device-container[illustration=\"connecting\"][connect-animation-step=\"3\"] .ledger-opacity-container[data-v-5a8deb8d] {\n    -webkit-animation: ledger-fade-out-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n            animation: ledger-fade-out-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n}\n.ledger-device-container[illustration=\"connecting\"][connect-animation-step=\"3\"] .ledger-screen-dashboard[data-v-5a8deb8d],\n.ledger-device-container[illustration=\"connecting\"][connect-animation-step=\"4\"] .ledger-screen-dashboard[data-v-5a8deb8d] {\n    /* The dashboard animation duration spans two steps (but can be cut after the first step), see below */\n    -webkit-animation: ledger-show-screen-dashboard-data-v-5a8deb8d calc(2 * var(--ledger-connect-animation-step-duration)) both;\n            animation: ledger-show-screen-dashboard-data-v-5a8deb8d calc(2 * var(--ledger-connect-animation-step-duration)) both;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.ledger-device-container[illustration=\"connecting\"][connect-animation-step=\"3\"] .ledger-screen-app[data-v-5a8deb8d] {\n    -webkit-animation: ledger-show-screen-app-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n            animation: ledger-show-screen-app-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) both;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.has-connect-button [illustration=\"connecting\"][connect-animation-step=\"3\"] .ledger-opacity-container[data-v-5a8deb8d],\n.has-connect-button [illustration=\"connecting\"][connect-animation-step=\"4\"] .ledger-opacity-container[data-v-5a8deb8d] {\n    /* Span animation over two animation steps via animation delay */\n    -webkit-animation: ledger-fade-out-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) var(--ledger-connect-animation-step-duration) both;\n            animation: ledger-fade-out-data-v-5a8deb8d var(--ledger-connect-animation-step-duration) var(--ledger-connect-animation-step-duration) both;\n}\n.has-connect-button [illustration=\"connecting\"][connect-animation-step=\"3\"] .ledger-screen-app[data-v-5a8deb8d],\n.has-connect-button [illustration=\"connecting\"][connect-animation-step=\"4\"] .ledger-screen-app[data-v-5a8deb8d] {\n    /* Use animation with double the duration to span over two animation steps */\n    -webkit-animation: ledger-show-screen-app-double-duration-data-v-5a8deb8d calc(2 * var(--ledger-connect-animation-step-duration)) both;\n            animation: ledger-show-screen-app-double-duration-data-v-5a8deb8d calc(2 * var(--ledger-connect-animation-step-duration)) both;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.is-wrong-app-connected [illustration=\"connecting\"][connect-animation-step=\"3\"] .ledger-opacity-container[data-v-5a8deb8d],\n.is-wrong-app-connected [illustration=\"connecting\"][connect-animation-step=\"4\"] .ledger-opacity-container[data-v-5a8deb8d] {\n    /* Keep the device displayed without animating it */\n    -webkit-animation: none;\n            animation: none;\n}\n.is-wrong-app-connected [illustration=\"connecting\"][connect-animation-step=\"3\"] .ledger-screen-app[data-v-5a8deb8d],\n.is-wrong-app-connected [illustration=\"connecting\"][connect-animation-step=\"4\"] .ledger-screen-app[data-v-5a8deb8d] {\n    /* Use animation with double the duration even if there is only a single animation step, to avoid too quick back\n    and forth switching between the dashboard and the app screen. Note that the dashboard animation is also designed\n    to span two animation steps to run in sync with the app animation. */\n    -webkit-animation: ledger-show-screen-app-double-duration-data-v-5a8deb8d calc(2 * var(--ledger-connect-animation-step-duration)) both;\n            animation: ledger-show-screen-app-double-duration-data-v-5a8deb8d calc(2 * var(--ledger-connect-animation-step-duration)) both;\n    /* Keep the animation running */\n    -webkit-animation-iteration-count: infinite;\n            animation-iteration-count: infinite;\n}\n.is-wrong-app-connected [illustration=\"connecting\"][connect-animation-step=\"3\"] .ledger-screen-dashboard[data-v-5a8deb8d],\n.is-wrong-app-connected [illustration=\"connecting\"][connect-animation-step=\"4\"] .ledger-screen-dashboard[data-v-5a8deb8d] {\n    /* Keep the animation running */\n    -webkit-animation-iteration-count: infinite;\n            animation-iteration-count: infinite;\n}\n@-webkit-keyframes ledger-connect-cable-data-v-5a8deb8d {\n0% {\n        -webkit-transform: translateX(-50%);\n                transform: translateX(-50%);\n}\n75%, 100% {\n        -webkit-transform: translateX(0);\n                transform: translateX(0);\n}\n}\n@keyframes ledger-connect-cable-data-v-5a8deb8d {\n0% {\n        -webkit-transform: translateX(-50%);\n                transform: translateX(-50%);\n}\n75%, 100% {\n        -webkit-transform: translateX(0);\n                transform: translateX(0);\n}\n}\n@-webkit-keyframes ledger-fade-in-data-v-5a8deb8d {\n0% {\n        opacity: 0;\n        -webkit-transform: scale(1);\n                transform: scale(1);\n}\n10%, 100% {\n        opacity: 1;\n        -webkit-transform: scale(1);\n                transform: scale(1);\n}\n}\n@keyframes ledger-fade-in-data-v-5a8deb8d {\n0% {\n        opacity: 0;\n        -webkit-transform: scale(1);\n                transform: scale(1);\n}\n10%, 100% {\n        opacity: 1;\n        -webkit-transform: scale(1);\n                transform: scale(1);\n}\n}\n@-webkit-keyframes ledger-scale-data-v-5a8deb8d {\n0% {\n        opacity: 1;\n        -webkit-transform: scale(1);\n                transform: scale(1);\n}\n25%, 100% {\n        opacity: var(--ledger-opacity);\n        -webkit-transform: scale(var(--ledger-scale-factor)) translateX(27.3%);\n                transform: scale(var(--ledger-scale-factor)) translateX(27.3%);\n}\n}\n@keyframes ledger-scale-data-v-5a8deb8d {\n0% {\n        opacity: 1;\n        -webkit-transform: scale(1);\n                transform: scale(1);\n}\n25%, 100% {\n        opacity: var(--ledger-opacity);\n        -webkit-transform: scale(var(--ledger-scale-factor)) translateX(27.3%);\n                transform: scale(var(--ledger-scale-factor)) translateX(27.3%);\n}\n}\n@-webkit-keyframes ledger-fade-out-data-v-5a8deb8d {\n0%, 95% {\n        opacity: var(--ledger-opacity);\n}\n100% {\n        opacity: 0;\n}\n}\n@keyframes ledger-fade-out-data-v-5a8deb8d {\n0%, 95% {\n        opacity: var(--ledger-opacity);\n}\n100% {\n        opacity: 0;\n}\n}\n@-webkit-keyframes ledger-show-screen-pin-data-v-5a8deb8d {\n0% {\n        opacity: 0;\n        -webkit-transform: scale(calc(1 / var(--ledger-scale-factor))) translateX(-105%);\n                transform: scale(calc(1 / var(--ledger-scale-factor))) translateX(-105%);\n}\n5% {\n        opacity: 1;\n}\n25% {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n}\n95% {\n        opacity: 1;\n}\n100% {\n        opacity: 0;\n}\n}\n@keyframes ledger-show-screen-pin-data-v-5a8deb8d {\n0% {\n        opacity: 0;\n        -webkit-transform: scale(calc(1 / var(--ledger-scale-factor))) translateX(-105%);\n                transform: scale(calc(1 / var(--ledger-scale-factor))) translateX(-105%);\n}\n5% {\n        opacity: 1;\n}\n25% {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n}\n95% {\n        opacity: 1;\n}\n100% {\n        opacity: 0;\n}\n}\n@-webkit-keyframes ledger-show-pin-dot-data-v-5a8deb8d {\n0%, 12% {\n        background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><rect width=\"30\" height=\"3\" x=\"1\" y=\"28\" fill=\"white\" ry=\"1.5\"/></svg>');\n}\n17%, 100% {\n        background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><circle cx=\"16\" cy=\"16\" r=\"15\" fill=\"white\"/></svg>');\n}\n}\n@keyframes ledger-show-pin-dot-data-v-5a8deb8d {\n0%, 12% {\n        background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><rect width=\"30\" height=\"3\" x=\"1\" y=\"28\" fill=\"white\" ry=\"1.5\"/></svg>');\n}\n17%, 100% {\n        background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><circle cx=\"16\" cy=\"16\" r=\"15\" fill=\"white\"/></svg>');\n}\n}\n\n/* This animation is designed for a duration of two animation steps to run in sync with the app animation if it runs\nover 2 steps but the actual animation happens within the first animation step and the second animation step is just\ntransparency such that the animation can also be cut after the first step. */\n@-webkit-keyframes ledger-show-screen-dashboard-data-v-5a8deb8d {\n0% {\n        opacity: 0;\n}\n2.5%, 25% {\n        opacity: 1;\n}\n27.5%, 100% {\n        opacity: 0;\n}\n}\n@keyframes ledger-show-screen-dashboard-data-v-5a8deb8d {\n0% {\n        opacity: 0;\n}\n2.5%, 25% {\n        opacity: 1;\n}\n27.5%, 100% {\n        opacity: 0;\n}\n}\n@-webkit-keyframes ledger-show-screen-app-data-v-5a8deb8d {\n0%, 55% {\n        opacity: 0;\n}\n60%, 95% {\n        opacity: 1;\n}\n100% {\n        opacity: 0;\n}\n}\n@keyframes ledger-show-screen-app-data-v-5a8deb8d {\n0%, 55% {\n        opacity: 0;\n}\n60%, 95% {\n        opacity: 1;\n}\n100% {\n        opacity: 0;\n}\n}\n@-webkit-keyframes ledger-show-screen-app-double-duration-data-v-5a8deb8d {\n0%, 27.5% {\n        opacity: 0;\n}\n30%, 97.5% {\n        opacity: 1;\n}\n100% {\n        opacity: 0;\n}\n}\n@keyframes ledger-show-screen-app-double-duration-data-v-5a8deb8d {\n0%, 27.5% {\n        opacity: 0;\n}\n30%, 97.5% {\n        opacity: 1;\n}\n100% {\n        opacity: 0;\n}\n}\n@-webkit-keyframes connect-button-pulsate-data-v-5a8deb8d {\n100% {\n        background-color: rgba(255, 255, 255, var(--ledger-opacity));\n}\n}\n@keyframes connect-button-pulsate-data-v-5a8deb8d {\n100% {\n        background-color: rgba(255, 255, 255, var(--ledger-opacity));\n}\n}\n.ledger-ui .ledger-pin-dot[data-v-5a8deb8d]:nth-child(2) {\n    -webkit-animation-delay: calc(1 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n            animation-delay: calc(1 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n}\n.ledger-ui .ledger-pin-dot[data-v-5a8deb8d]:nth-child(3) {\n    -webkit-animation-delay: calc(2 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n            animation-delay: calc(2 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n}\n.ledger-ui .ledger-pin-dot[data-v-5a8deb8d]:nth-child(4) {\n    -webkit-animation-delay: calc(3 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n            animation-delay: calc(3 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n}\n.ledger-ui .ledger-pin-dot[data-v-5a8deb8d]:nth-child(5) {\n    -webkit-animation-delay: calc(4 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n            animation-delay: calc(4 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n}\n.ledger-ui .ledger-pin-dot[data-v-5a8deb8d]:nth-child(6) {\n    -webkit-animation-delay: calc(5 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n            animation-delay: calc(5 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n}\n.ledger-ui .ledger-pin-dot[data-v-5a8deb8d]:nth-child(7) {\n    -webkit-animation-delay: calc(6 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n            animation-delay: calc(6 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n}\n.ledger-ui .ledger-pin-dot[data-v-5a8deb8d]:nth-child(8) {\n    -webkit-animation-delay: calc(7 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n            animation-delay: calc(7 * var(--ledger-connect-animation-step-duration) / 1.15 / 8) !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LedgerUi.vue?vue&type=style&index=0&id=5a8deb8d&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LedgerUi.vue?vue&type=style&index=0&id=5a8deb8d&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./LedgerUi.vue?vue&type=style&index=0&id=5a8deb8d&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LedgerUi.vue?vue&type=style&index=0&id=5a8deb8d&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("74bd3336", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/LedgerUi.vue":
/*!*************************************!*\
  !*** ./src/components/LedgerUi.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LedgerUi_vue_vue_type_template_id_5a8deb8d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LedgerUi.vue?vue&type=template&id=5a8deb8d&scoped=true& */ "./src/components/LedgerUi.vue?vue&type=template&id=5a8deb8d&scoped=true&");
/* harmony import */ var _LedgerUi_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LedgerUi.vue?vue&type=script&lang=ts& */ "./src/components/LedgerUi.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _LedgerUi_vue_vue_type_style_index_0_id_5a8deb8d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LedgerUi.vue?vue&type=style&index=0&id=5a8deb8d&scoped=true&lang=css& */ "./src/components/LedgerUi.vue?vue&type=style&index=0&id=5a8deb8d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _LedgerUi_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LedgerUi_vue_vue_type_template_id_5a8deb8d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LedgerUi_vue_vue_type_template_id_5a8deb8d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5a8deb8d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/LedgerUi.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/LedgerUi.vue?vue&type=script&lang=ts&":
/*!**************************************************************!*\
  !*** ./src/components/LedgerUi.vue?vue&type=script&lang=ts& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LedgerUi_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./LedgerUi.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LedgerUi.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LedgerUi_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/LedgerUi.vue?vue&type=style&index=0&id=5a8deb8d&scoped=true&lang=css&":
/*!**********************************************************************************************!*\
  !*** ./src/components/LedgerUi.vue?vue&type=style&index=0&id=5a8deb8d&scoped=true&lang=css& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LedgerUi_vue_vue_type_style_index_0_id_5a8deb8d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./LedgerUi.vue?vue&type=style&index=0&id=5a8deb8d&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LedgerUi.vue?vue&type=style&index=0&id=5a8deb8d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LedgerUi_vue_vue_type_style_index_0_id_5a8deb8d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LedgerUi_vue_vue_type_style_index_0_id_5a8deb8d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LedgerUi_vue_vue_type_style_index_0_id_5a8deb8d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LedgerUi_vue_vue_type_style_index_0_id_5a8deb8d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LedgerUi_vue_vue_type_style_index_0_id_5a8deb8d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/LedgerUi.vue?vue&type=template&id=5a8deb8d&scoped=true&":
/*!********************************************************************************!*\
  !*** ./src/components/LedgerUi.vue?vue&type=template&id=5a8deb8d&scoped=true& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LedgerUi_vue_vue_type_template_id_5a8deb8d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./LedgerUi.vue?vue&type=template&id=5a8deb8d&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LedgerUi.vue?vue&type=template&id=5a8deb8d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LedgerUi_vue_vue_type_template_id_5a8deb8d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LedgerUi_vue_vue_type_template_id_5a8deb8d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=activate-btc-ledger~add-ledger~refund-swap-ledger~sign-btc-transaction-ledger~sign-transaction-ledge~bf179231-legacy.js.map