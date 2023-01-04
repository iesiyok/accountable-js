(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sign-btc-transaction-ledger"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LabelAvatar.vue?vue&type=script&lang=ts&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LabelAvatar.vue?vue&type=script&lang=ts& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_iqons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/iqons */ "./node_modules/@nimiq/iqons/dist/iqons.min.js");


// @ts-ignore Could not find a declaration file for module '@nimiq/iqons'.

let LabelAvatar = class LabelAvatar extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    get _isUnlabeled() {
        return !this.label;
    }
    get _initial() {
        return this.label ? this.label[0] : '';
    }
    get _backgroundColor() {
        if (!this.label)
            return 'transparent';
        let color = Object(_nimiq_iqons__WEBPACK_IMPORTED_MODULE_2__["getBackgroundColorName"])(this.label).toLowerCase();
        // Convert from public to CSS names
        if (color === 'yellow')
            color = 'gold';
        else if (color === 'indigo')
            color = 'blue';
        else if (color === 'blue')
            color = 'light-blue';
        else if (color === 'teal')
            color = 'green';
        else if (color === 'green')
            color = 'light-green';
        return `nq-${color}-bg`;
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(String)
], LabelAvatar.prototype, "label", void 0);
LabelAvatar = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"]
], LabelAvatar);
/* harmony default export */ __webpack_exports__["default"] = (LabelAvatar);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransaction.vue?vue&type=script&lang=ts&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignBtcTransaction.vue?vue&type=script&lang=ts& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _BitcoinSyncBaseView_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BitcoinSyncBaseView.vue */ "./src/views/BitcoinSyncBaseView.vue");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");









let SignBtcTransaction = class SignBtcTransaction extends _BitcoinSyncBaseView_vue__WEBPACK_IMPORTED_MODULE_3__["default"] {
    async created() {
        if (this.request.kind !== _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_6__["RequestType"].SIGN_BTC_TRANSACTION) {
            if (history.length >= 3) {
                // First history entry is root, the second an original request handler invoking the transaction signing
                // and the third is this one. If there was an original request handler calling us but the intermediate
                // transaction signing request was lost on reload and instead the original request recovered from the
                // RPC state, navigate back to the original request handler.
                // TODO implementing a proper request call stack instead of the originalRouteName hack would avoid this
                history.back();
            }
            else {
                this.$rpc.reject(new Error(`Unexpected request ${this.request.kind}`));
            }
            return;
        }
        const walletInfo = this.findWallet(this.request.walletId);
        if (!walletInfo.btcXPub || !walletInfo.btcAddresses || !walletInfo.btcAddresses.external.length) {
            this.$rpc.reject(new Error(`Account does not have any Bitcoin addresses`));
            return;
        }
        const inputs = [];
        let changeOutput;
        try {
            // Note that the sync state will only be visible in the UI if the sync is not instant (if we actually sync)
            this.state = this.State.SYNCING;
            for (const input of this.request.inputs) {
                let keyPath;
                if (input.keyPath) {
                    keyPath = input.keyPath;
                }
                else {
                    const addressInfo = await walletInfo.findBtcAddressInfo(input.address);
                    if (!addressInfo) {
                        this.$rpc.reject(new Error(`Input address not found: ${input.address}`));
                        return;
                    }
                    keyPath = addressInfo.path;
                }
                inputs.push({
                    keyPath,
                    transactionHash: input.transactionHash,
                    outputIndex: input.outputIndex,
                    outputScript: input.outputScript,
                    witnessScript: input.witnessScript,
                    value: input.value,
                    sequence: input.sequence,
                });
            }
            if (this.request.changeOutput) {
                const addressInfo = await walletInfo.findBtcAddressInfo(this.request.changeOutput.address);
                if (!addressInfo) {
                    this.$rpc.reject(new Error(`Change address not found: ${this.request.changeOutput.address}`));
                    return;
                }
                changeOutput = {
                    keyPath: addressInfo.path,
                    address: addressInfo.address,
                    value: this.request.changeOutput.value,
                };
            }
            this.state = this.State.NONE;
        }
        catch (e) {
            this.state = this.State.SYNCING_FAILED;
            this.error = e.message || e;
            return;
        }
        this._signBtcTransaction({
            inputs,
            changeOutput,
            recipientOutput: this.request.output,
            locktime: this.request.locktime,
        }, walletInfo);
    }
    _signBtcTransaction(transactionInfo, walletInfo) {
        // note that this method gets overwritten for SignBtcTransactionLedger
        const request = {
            layout: 'standard',
            appName: this.request.appName,
            ...transactionInfo,
            keyId: walletInfo.keyId,
            keyLabel: walletInfo.labelForKeyguard,
        };
        // staticStore.keyguardRequest = request; // Currently not used in SignBtcTransactionSuccess
        const client = this.$rpc.createKeyguardClient(true);
        client.signBtcTransaction(request);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_7__["Static"]
], SignBtcTransaction.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_8__["Getter"]
], SignBtcTransaction.prototype, "findWallet", void 0);
SignBtcTransaction = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"], GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_5__["default"] } }) // including components used in parent class
], SignBtcTransaction);
/* harmony default export */ __webpack_exports__["default"] = (SignBtcTransaction);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransactionLedger.vue?vue&type=script&lang=ts&":
/*!********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignBtcTransactionLedger.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _SignBtcTransaction_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SignBtcTransaction.vue */ "./src/views/SignBtcTransaction.vue");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/LedgerUi.vue */ "./src/components/LedgerUi.vue");
/* harmony import */ var _components_LabelAvatar_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/LabelAvatar.vue */ "./src/components/LabelAvatar.vue");
/* harmony import */ var _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nimiq/ledger-api */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinJSLoader */ "./src/lib/bitcoin/BitcoinJSLoader.ts");
/* harmony import */ var _lib_bitcoin_BitcoinLedgerUtils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinLedgerUtils */ "./src/lib/bitcoin/BitcoinLedgerUtils.ts");













let SignBtcTransactionLedger = class SignBtcTransactionLedger extends _SignBtcTransaction_vue__WEBPACK_IMPORTED_MODULE_3__["default"] {
    constructor() {
        super(...arguments);
        // different than in parent class we always have to sync for fetching trusted inputs
        this.state = this.State.SYNCING;
        this._isDestroyed = false;
    }
    get State() {
        return {
            ...super.State,
            READY: 'ready',
            FINISHED: 'finished',
        };
    }
    async created() {
        if (this.request.kind !== _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_9__["RequestType"].SIGN_BTC_TRANSACTION)
            return; // see parent class
        // preload BitcoinJS
        Object(_lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_11__["loadBitcoinJS"])();
        // Note that vue-class-component transforms the inheritance into a merge of vue mixins where each class retains
        // its lifecycle hooks, therefore we don't need to call super.created() here.
        const { inputs, output, changeOutput } = this.request;
        const inputAmount = inputs.reduce((sum, { value }) => sum + value, 0);
        const outputAmount = output.value + (changeOutput ? changeOutput.value : 0);
        this.fee = inputAmount - outputAmount;
    }
    destroyed() {
        this._isDestroyed = true;
        _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_8__["default"].disconnect(
        /* cancelRequest */ true, 
        /* requestTypeToDisconnect */ _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_8__["RequestTypeBitcoin"].SIGN_TRANSACTION);
    }
    get statusScreenState() {
        if (this.state === this.State.FINISHED)
            return _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].State.SUCCESS;
        return super.statusScreenState;
    }
    get statusScreenTitle() {
        switch (this.state) {
            case this.State.FINISHED: return this.$t('251');
            case this.State.SYNCING_FAILED: return this.$t('226');
            default: return ''; // also for SYNCING don't display a title in small ui, different to parent class
        }
    }
    async _signBtcTransaction(transactionInfo, walletInfo) {
        // If user left this view in the mean time, don't continue signing the transaction
        if (this._isDestroyed)
            return;
        let ledgerTransactionInfo;
        try {
            this.state = this.State.SYNCING;
            ledgerTransactionInfo = await Object(_lib_bitcoin_BitcoinLedgerUtils__WEBPACK_IMPORTED_MODULE_12__["prepareBitcoinTransactionForLedgerSigning"])(transactionInfo);
        }
        catch (e) {
            this.state = this.State.SYNCING_FAILED;
            this.error = e.message || e;
            return;
        }
        // If user left this view in the mean time, don't continue signing the transaction
        if (this._isDestroyed)
            return;
        // Set the state change slightly delayed to give the Ledger api time to load dependencies and the Ledger time to
        // process the request
        setTimeout(() => this.state = this.State.READY, 300);
        let signedTransactionHex;
        try {
            signedTransactionHex = await _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_8__["default"].Bitcoin.signTransaction(ledgerTransactionInfo);
        }
        catch (e) {
            if (this._isDestroyed)
                return; // user is not on this view anymore
            // If cancelled, handle the exception. Otherwise just keep the ledger ui / error message displayed.
            if (e.message.toLowerCase().indexOf('cancelled') !== -1) {
                this.$rpc.reject(new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_10__["ERROR_CANCELED"]));
            }
            return;
        }
        // If user left this view in the mean time, don't resolve
        if (this._isDestroyed)
            return;
        await Object(_lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_11__["loadBitcoinJS"])();
        const signedTransaction = BitcoinJS.Transaction.fromHex(signedTransactionHex);
        const result = {
            serializedTx: signedTransactionHex,
            hash: signedTransaction.getId(),
        };
        this.state = this.State.FINISHED;
        await new Promise((resolve) => setTimeout(resolve, _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].SUCCESS_REDIRECT_DELAY));
        this.$rpc.resolve(result);
    }
};
SignBtcTransactionLedger = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"], PageHeader: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageHeader"], Amount: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["Amount"], GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_5__["default"], LedgerUi: _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_6__["default"], LabelAvatar: _components_LabelAvatar_vue__WEBPACK_IMPORTED_MODULE_7__["default"] } })
], SignBtcTransactionLedger);
/* harmony default export */ __webpack_exports__["default"] = (SignBtcTransactionLedger);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LabelAvatar.vue?vue&type=template&id=13443626&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LabelAvatar.vue?vue&type=template&id=13443626&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "label-avatar",
      class: [{ initial: !_vm._isUnlabeled }, _vm._backgroundColor]
    },
    [
      _vm._isUnlabeled
        ? _c(
            "svg",
            {
              attrs: {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 63 63"
              }
            },
            [
              _c("path", {
                attrs: {
                  opacity: ".25",
                  fill: "#1F2348",
                  d:
                    "M17,47.9a20.59,20.59,0,0,0-2.86,3.49,1,1,0,0,1-1.51.22,27.49,27.49,0,1,1,37.74,0,1,1,0,0,1-1.51-.23A20.82,20.82,0,0,0,17,47.9ZM31.5,63A31.5,31.5,0,1,0,0,31.5,31.5,31.5,0,0,0,31.5,63Zm0-25.41a12,12,0,1,0-12-12A12,12,0,0,0,31.5,37.59Z"
                }
              })
            ]
          )
        : _c("span", { staticClass: "initial" }, [_vm._v(_vm._s(_vm._initial))])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransactionLedger.vue?vue&type=template&id=4934eca6&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignBtcTransactionLedger.vue?vue&type=template&id=4934eca6&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.request.kind === "sign-btc-transaction"
    ? _c(
        "div",
        { staticClass: "container" },
        [
          _c(
            "SmallPage",
            [
              _c("PageHeader", [_vm._v(_vm._s(_vm.$t('83')))]),
              _c("div", { staticClass: "recipient" }, [
                _c(
                  "div",
                  { staticClass: "label-line" },
                  [
                    _c("LabelAvatar", {
                      attrs: { label: _vm.request.output.label }
                    }),
                    _c(
                      "div",
                      { class: { italic: !_vm.request.output.label } },
                      [
                        _vm._v(
                          _vm._s(
                            _vm.request.output.label || _vm.$t('255')
                          )
                        )
                      ]
                    )
                  ],
                  1
                ),
                _c("div", { staticClass: "address" }, [
                  _vm._v(_vm._s(_vm.request.output.address))
                ])
              ]),
              _c("Amount", {
                staticClass: "value nq-light-blue",
                attrs: {
                  currency: "btc",
                  amount: _vm.request.output.value,
                  currencyDecimals: 8,
                  minDecimals: 2,
                  maxDecimals: 8
                }
              }),
              _c(
                "div",
                { staticClass: "fee nq-text-s" },
                [
                  _vm._v(" + "),
                  _c("Amount", {
                    attrs: {
                      currency: "btc",
                      amount: _vm.fee,
                      currencyDecimals: 8,
                      minDecimals: 2,
                      maxDecimals: 8
                    }
                  }),
                  _vm._v(" " + _vm._s(_vm.$t('118')) + " ")
                ],
                1
              ),
              _c(
                "div",
                {
                  staticClass: "bottom-container",
                  class: {
                    "full-height":
                      _vm.state === _vm.State.FINISHED ||
                      _vm.state === _vm.State.SYNCING_FAILED
                  }
                },
                [
                  _c("LedgerUi", { attrs: { small: "" } }),
                  _c(
                    "transition",
                    { attrs: { name: "transition-fade" } },
                    [
                      _vm.state !== _vm.State.READY
                        ? _c("StatusScreen", {
                            attrs: {
                              state: _vm.statusScreenState,
                              title: _vm.statusScreenTitle,
                              status: _vm.statusScreenStatus,
                              message: _vm.statusScreenMessage,
                              mainAction: _vm.statusScreenAction,
                              small: _vm.state === _vm.State.SYNCING
                            },
                            on: {
                              "main-action": _vm._statusScreenActionHandler
                            }
                          })
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _c("GlobalClose", {
            attrs: { hidden: _vm.state === _vm.State.FINISHED }
          })
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LabelAvatar.vue?vue&type=style&index=0&id=13443626&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LabelAvatar.vue?vue&type=style&index=0&id=13443626&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.label-avatar[data-v-13443626] {\n    width: 5.25rem;\n    height: 5.25rem;\n    font-size: 2.5rem;\n}\n.initial[data-v-13443626] {\n    text-transform: uppercase;\n    font-weight: bold;\n    line-height: 2;\n    border-radius: 50%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    color: white;\n}\nsvg[data-v-13443626] {\n    width: 100%;\n    height: auto;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransactionLedger.vue?vue&type=style&index=0&id=4934eca6&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignBtcTransactionLedger.vue?vue&type=style&index=0&id=4934eca6&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.small-page[data-v-4934eca6] {\n    position: relative;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    padding-bottom: 26rem; /* for bottom container + additional padding */\n}\n.recipient[data-v-4934eca6] {\n    padding: 1.5rem;\n    margin-top: .5rem;\n    -webkit-box-shadow: inset 0 0 0 1.5px rgba(31, 35, 72, 0.1);\n            box-shadow: inset 0 0 0 1.5px rgba(31, 35, 72, 0.1);\n    border-radius: 0.625rem;\n}\n.label-line[data-v-4934eca6] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    margin-bottom: 1.5rem;\n    font-size: 2rem;\n}\n.label-avatar[data-v-4934eca6] {\n    width: 3rem;\n    height: 3rem;\n    margin-right: 1rem;\n}\n.italic[data-v-4934eca6] {\n    font-style: italic;\n}\n.address[data-v-4934eca6] {\n    font-family: 'Fira Mono', monospace;\n    font-size: 1.75rem;\n}\n.value[data-v-4934eca6] {\n    font-size: 6rem;\n    margin-top: 6.25rem;\n}\n.value[data-v-4934eca6] .btc {\n    margin-left: -.75rem;\n    font-size: 3rem;\n    font-weight: 700;\n    letter-spacing: .1rem;\n}\n.fee[data-v-4934eca6] {\n    opacity: .5;\n    font-size: 2rem;\n}\n.bottom-container[data-v-4934eca6] {\n    position: absolute;\n    width: 100%;\n    height: 23rem;\n    bottom: 0;\n    -webkit-transition: height .4s;\n    transition: height .4s;\n}\n.bottom-container.full-height[data-v-4934eca6] {\n    height: 100%;\n}\n.bottom-container > *[data-v-4934eca6] {\n    position: absolute;\n    top: 0;\n}\n.status-screen[data-v-4934eca6] {\n    -webkit-transition: opacity .4s;\n    transition: opacity .4s;\n    overflow: hidden;\n}\n.ledger-ui[data-v-4934eca6] .loading-spinner {\n    margin-top: -1.25rem; /* position at same position as StatusScreen's loading spinner */\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LabelAvatar.vue?vue&type=style&index=0&id=13443626&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LabelAvatar.vue?vue&type=style&index=0&id=13443626&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./LabelAvatar.vue?vue&type=style&index=0&id=13443626&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LabelAvatar.vue?vue&type=style&index=0&id=13443626&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("354e7dca", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransactionLedger.vue?vue&type=style&index=0&id=4934eca6&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignBtcTransactionLedger.vue?vue&type=style&index=0&id=4934eca6&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignBtcTransactionLedger.vue?vue&type=style&index=0&id=4934eca6&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransactionLedger.vue?vue&type=style&index=0&id=4934eca6&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("47f49433", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/LabelAvatar.vue":
/*!****************************************!*\
  !*** ./src/components/LabelAvatar.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LabelAvatar_vue_vue_type_template_id_13443626_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LabelAvatar.vue?vue&type=template&id=13443626&scoped=true& */ "./src/components/LabelAvatar.vue?vue&type=template&id=13443626&scoped=true&");
/* harmony import */ var _LabelAvatar_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LabelAvatar.vue?vue&type=script&lang=ts& */ "./src/components/LabelAvatar.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _LabelAvatar_vue_vue_type_style_index_0_id_13443626_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LabelAvatar.vue?vue&type=style&index=0&id=13443626&scoped=true&lang=css& */ "./src/components/LabelAvatar.vue?vue&type=style&index=0&id=13443626&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _LabelAvatar_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LabelAvatar_vue_vue_type_template_id_13443626_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LabelAvatar_vue_vue_type_template_id_13443626_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "13443626",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/LabelAvatar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/LabelAvatar.vue?vue&type=script&lang=ts&":
/*!*****************************************************************!*\
  !*** ./src/components/LabelAvatar.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelAvatar_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./LabelAvatar.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LabelAvatar.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelAvatar_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/LabelAvatar.vue?vue&type=style&index=0&id=13443626&scoped=true&lang=css&":
/*!*************************************************************************************************!*\
  !*** ./src/components/LabelAvatar.vue?vue&type=style&index=0&id=13443626&scoped=true&lang=css& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelAvatar_vue_vue_type_style_index_0_id_13443626_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./LabelAvatar.vue?vue&type=style&index=0&id=13443626&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LabelAvatar.vue?vue&type=style&index=0&id=13443626&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelAvatar_vue_vue_type_style_index_0_id_13443626_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelAvatar_vue_vue_type_style_index_0_id_13443626_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelAvatar_vue_vue_type_style_index_0_id_13443626_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelAvatar_vue_vue_type_style_index_0_id_13443626_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelAvatar_vue_vue_type_style_index_0_id_13443626_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/LabelAvatar.vue?vue&type=template&id=13443626&scoped=true&":
/*!***********************************************************************************!*\
  !*** ./src/components/LabelAvatar.vue?vue&type=template&id=13443626&scoped=true& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelAvatar_vue_vue_type_template_id_13443626_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./LabelAvatar.vue?vue&type=template&id=13443626&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LabelAvatar.vue?vue&type=template&id=13443626&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelAvatar_vue_vue_type_template_id_13443626_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelAvatar_vue_vue_type_template_id_13443626_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/lib/bitcoin/BitcoinLedgerUtils.ts":
/*!***********************************************!*\
  !*** ./src/lib/bitcoin/BitcoinLedgerUtils.ts ***!
  \***********************************************/
/*! exports provided: prepareBitcoinTransactionForLedgerSigning */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prepareBitcoinTransactionForLedgerSigning", function() { return prepareBitcoinTransactionForLedgerSigning; });
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");
/* harmony import */ var _ElectrumClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ElectrumClient */ "./src/lib/bitcoin/ElectrumClient.ts");
/* harmony import */ var _BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BitcoinJSLoader */ "./src/lib/bitcoin/BitcoinJSLoader.ts");




/**
 * Prepare a bitcoin transaction for signing via the Ledger api by enriching it with complete input transactions and
 * output scripts. This is a costly operation as it involves loading BitcoinJS and the electrum api and fetching
 * transactions from the network.
 * @param transactionInfo - Bitcoin transaction info with required input details reduced to transactionHash,
 *   outputIndex, keyPath and optionally witnessScript and sequence.
 * @returns Enriched transaction info that can be passed to LedgerApi.Bitcoin.signTransaction.
 */
async function prepareBitcoinTransactionForLedgerSigning(transactionInfo) {
    const bitcoinJsPromise = Object(_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_3__["loadBitcoinJS"])();
    // Fetch whole input transactions for computation of Ledger's trusted inputs.
    // Fetch them in batches of 10 to avoid too many network requests at once.
    const inputTransactions = [];
    for (let i = 0; i < transactionInfo.inputs.length; i += 10) {
        const batch = transactionInfo.inputs.slice(i, i + 10);
        inputTransactions.push(...await Promise.all(batch.map((input) => Object(_ElectrumClient__WEBPACK_IMPORTED_MODULE_2__["fetchTransaction"])(input.transactionHash))));
    }
    const inputs = transactionInfo.inputs.map((input, i) => ({
        transaction: inputTransactions[i],
        index: input.outputIndex,
        keyPath: input.keyPath,
        customScript: input.witnessScript,
        sequence: input.sequence,
    }));
    // Prepare outputs and pre-calculate output scripts
    await bitcoinJsPromise;
    const network = config__WEBPACK_IMPORTED_MODULE_0__["default"].bitcoinNetwork === _BitcoinConstants__WEBPACK_IMPORTED_MODULE_1__["BTC_NETWORK_TEST"]
        ? BitcoinJS.networks.testnet
        : BitcoinJS.networks.bitcoin;
    const outputs = [{
            amount: transactionInfo.recipientOutput.value,
            outputScript: BitcoinJS.address.toOutputScript(transactionInfo.recipientOutput.address, network).toString('hex'),
        }];
    let changePath;
    if (transactionInfo.changeOutput) {
        changePath = transactionInfo.changeOutput.keyPath;
        outputs.push({
            amount: transactionInfo.changeOutput.value,
            outputScript: BitcoinJS.address.toOutputScript(transactionInfo.changeOutput.address, network).toString('hex'),
        });
    }
    return { inputs, outputs, changePath, locktime: transactionInfo.locktime };
}


/***/ }),

/***/ "./src/views/SignBtcTransaction.vue":
/*!******************************************!*\
  !*** ./src/views/SignBtcTransaction.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SignBtcTransaction_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignBtcTransaction.vue?vue&type=script&lang=ts& */ "./src/views/SignBtcTransaction.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _SignBtcTransaction_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/SignBtcTransaction.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/SignBtcTransaction.vue?vue&type=script&lang=ts&":
/*!*******************************************************************!*\
  !*** ./src/views/SignBtcTransaction.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransaction_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignBtcTransaction.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransaction.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransaction_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/SignBtcTransactionLedger.vue":
/*!************************************************!*\
  !*** ./src/views/SignBtcTransactionLedger.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SignBtcTransactionLedger_vue_vue_type_template_id_4934eca6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignBtcTransactionLedger.vue?vue&type=template&id=4934eca6&scoped=true& */ "./src/views/SignBtcTransactionLedger.vue?vue&type=template&id=4934eca6&scoped=true&");
/* harmony import */ var _SignBtcTransactionLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SignBtcTransactionLedger.vue?vue&type=script&lang=ts& */ "./src/views/SignBtcTransactionLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _SignBtcTransactionLedger_vue_vue_type_style_index_0_id_4934eca6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SignBtcTransactionLedger.vue?vue&type=style&index=0&id=4934eca6&scoped=true&lang=css& */ "./src/views/SignBtcTransactionLedger.vue?vue&type=style&index=0&id=4934eca6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SignBtcTransactionLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SignBtcTransactionLedger_vue_vue_type_template_id_4934eca6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SignBtcTransactionLedger_vue_vue_type_template_id_4934eca6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4934eca6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/SignBtcTransactionLedger.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/SignBtcTransactionLedger.vue?vue&type=script&lang=ts&":
/*!*************************************************************************!*\
  !*** ./src/views/SignBtcTransactionLedger.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignBtcTransactionLedger.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransactionLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/SignBtcTransactionLedger.vue?vue&type=style&index=0&id=4934eca6&scoped=true&lang=css&":
/*!*********************************************************************************************************!*\
  !*** ./src/views/SignBtcTransactionLedger.vue?vue&type=style&index=0&id=4934eca6&scoped=true&lang=css& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionLedger_vue_vue_type_style_index_0_id_4934eca6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignBtcTransactionLedger.vue?vue&type=style&index=0&id=4934eca6&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransactionLedger.vue?vue&type=style&index=0&id=4934eca6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionLedger_vue_vue_type_style_index_0_id_4934eca6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionLedger_vue_vue_type_style_index_0_id_4934eca6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionLedger_vue_vue_type_style_index_0_id_4934eca6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionLedger_vue_vue_type_style_index_0_id_4934eca6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionLedger_vue_vue_type_style_index_0_id_4934eca6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/SignBtcTransactionLedger.vue?vue&type=template&id=4934eca6&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./src/views/SignBtcTransactionLedger.vue?vue&type=template&id=4934eca6&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionLedger_vue_vue_type_template_id_4934eca6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignBtcTransactionLedger.vue?vue&type=template&id=4934eca6&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignBtcTransactionLedger.vue?vue&type=template&id=4934eca6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionLedger_vue_vue_type_template_id_4934eca6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignBtcTransactionLedger_vue_vue_type_template_id_4934eca6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=sign-btc-transaction-ledger-legacy.js.map