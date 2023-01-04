(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["checkout"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCard.vue?vue&type=script&lang=ts&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutCard.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CheckoutCard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _lib_CheckoutServerApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/CheckoutServerApi */ "./src/lib/CheckoutServerApi.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");







class CheckoutCard extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.optionTimeout = -1;
        this.timeOffsetPromise = Promise.resolve(0);
        this.timeoutReached = false;
        this.checkNetworkInterval = -1;
        this.paymentState = _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_6__["PaymentState"].NOT_FOUND;
        this.selected = false;
        this.showStatusScreen = false;
        this.statusScreenState = _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"].State.LOADING;
        this.statusScreenTitle = '';
        this.statusScreenStatus = '';
        this.statusScreenMessage = '';
        this.statusScreenMainActionText = '';
        this.statusScreenMainAction = () => console.warn('statusScreenMainAction not set.');
    }
    async created() {
        this.hasCurrencyInfo = this.request.paymentOptions.length > 1
            && (!history.state || !history.state[_lib_Constants__WEBPACK_IMPORTED_MODULE_5__["HISTORY_KEY_SELECTED_CURRENCY"]]);
        // First fetch current state to check whether user already paid and synchronize the time. We can only do this if
        // a callbackUrl was provided. Note that for NIM no merchant server callbackUrl is strictly required as for NIM
        // we can detect payments ourselves (see RequestParser).
        if (this.request.callbackUrl) {
            const statePromise = this.getState();
            this.timeOffsetPromise = statePromise.then((state) => state.time - Date.now());
            try {
                this.lastPaymentState = await statePromise;
            }
            catch (e) {
                this.$rpc.reject(e);
                return false;
            }
        }
        // If history.state does have an entry for this currencies previous selection, select it again
        if (window.history.state
            && window.history.state[_lib_Constants__WEBPACK_IMPORTED_MODULE_5__["HISTORY_KEY_SELECTED_CURRENCY"]] === this.paymentOptions.currency
            && !await this.selectCurrency()) {
            return false;
        }
        if (this.paymentOptions.expires) {
            this.setupTimeout();
        }
        return true;
    }
    async mounted() {
        if (this.request.callbackUrl && this.$refs.info) {
            this.$refs.info.setTime((await this.timeOffsetPromise) + Date.now());
        }
    }
    destroyed() {
        if (this.optionTimeout)
            clearTimeout(this.optionTimeout);
    }
    get manualPaymentDetails() {
        // can be extended by child classes with additional currency specific payment details
        const recipient = this.paymentOptions.protocolSpecific.recipient;
        if (!recipient)
            return [];
        return [{
                label: this.$t('18'),
                value: recipient instanceof Nimiq.Address ? recipient.toUserFriendlyAddress() : recipient,
            }];
    }
    async getState() {
        if (!this.request.callbackUrl || !this.request.csrf) {
            throw new Error('Can\'t get state without callbackUrl and csrf token');
        }
        const fetchedState = await _lib_CheckoutServerApi__WEBPACK_IMPORTED_MODULE_4__["default"].getState(this.request.callbackUrl, this.request.csrf);
        this.paymentState = fetchedState.payment_state;
        if (fetchedState.payment_accepted) {
            window.clearInterval(this.checkNetworkInterval);
            window.clearTimeout(this.optionTimeout);
            if (fetchedState.payment_state === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_6__["PaymentState"].PAID) {
                this.showSuccessScreen();
            }
            else if (fetchedState.payment_state === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_6__["PaymentState"].OVERPAID) {
                // TODO: indicate user he paid too much and needs to contact support
                // For now is an accepted payment the same way a correctly paid payment is.
                this.showSuccessScreen();
            }
            else {
                throw new Error('Incompatible combination for payment_state and payment_accepted.');
            }
            return fetchedState;
        }
        else if (fetchedState.payment_state === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_6__["PaymentState"].UNDERPAID) {
            this.showUnderpaidWarningScreen();
        }
        // else is PaymentState.NOT_FOUND which necessitates no action
        if (this.timeoutReached) {
            window.clearInterval(this.checkNetworkInterval);
            this.timedOut();
        }
        return fetchedState;
    }
    async fetchPaymentOption() {
        let fetchedData;
        this.statusScreenState = _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"].State.LOADING;
        this.statusScreenTitle = this.$t('76');
        this.statusScreenStatus = '';
        this.showStatusScreen = true;
        if (!this.request.callbackUrl || !this.request.csrf) {
            throw new Error('Can\'t fetch payment details without callbackUrl and csrf token');
        }
        fetchedData = await _lib_CheckoutServerApi__WEBPACK_IMPORTED_MODULE_4__["default"].fetchPaymentOption(this.request.callbackUrl, this.paymentOptions.currency, this.paymentOptions.type, this.request.csrf);
        // @ts-ignore: Call signatures for generic union types are not currently supported, see
        // https://github.com/microsoft/TypeScript/issues/30613 and
        // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-3.html#caveats
        this.paymentOptions.update(fetchedData);
        // update timeout in case that expiry changed
        if (fetchedData.expires) {
            this.setupTimeout();
        }
        this.showStatusScreen = this.timeoutReached;
        this.$forceUpdate();
    }
    async setupTimeout() {
        window.clearTimeout(this.optionTimeout);
        const referenceTime = Date.now() + (await this.timeOffsetPromise); // as a side effect ensures lastPaymentState
        if (!this.paymentOptions.expires || (this.lastPaymentState && this.lastPaymentState.payment_accepted))
            return;
        const timeLeft = this.paymentOptions.expires - referenceTime;
        if (timeLeft > 0) {
            this.optionTimeout = window.setTimeout(
            // if the network check is active, only set a flag to be checked after the network check to avoid that
            // the offer gets displayed as expired when the network check would detect a successful payment.
            () => this.checkNetworkInterval !== -1 ? this.timeoutReached = true : this.timedOut(), timeLeft);
        }
        else {
            this.checkNetworkInterval !== -1 ? this.timeoutReached = true : this.timedOut();
        }
    }
    timedOut() {
        this.timeoutReached = true;
        this.statusScreenTitle = this.$t('235');
        this.statusScreenMessage = this.$t('187');
        this.statusScreenMainAction = () => this.backToShop();
        this.statusScreenMainActionText = this.$t('130');
        this.statusScreenState = _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"].State.WARNING;
        this.showStatusScreen = true;
        this.$emit('expired', this.paymentOptions.currency);
    }
    backToShop() {
        this.$rpc.reject(new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_5__["ERROR_REQUEST_TIMED_OUT"]));
    }
    showSuccessScreen() {
        this.statusScreenTitle = this.$t('182');
        this.statusScreenState = _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"].State.SUCCESS;
        this.showStatusScreen = true;
        window.setTimeout(() => this.$rpc.resolve({ success: true }), _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"].SUCCESS_REDIRECT_DELAY);
    }
    showUnderpaidWarningScreen() {
        this.paymentState = _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_6__["PaymentState"].UNDERPAID;
        this.statusScreenTitle = this.$t('139');
        this.statusScreenMessage = this.$t('274');
        this.statusScreenMainAction = () => this.showStatusScreen = false;
        this.statusScreenMainActionText = this.$t('203');
        this.showStatusScreen = true;
        this.statusScreenState = _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"].State.WARNING;
    }
    async selectCurrency() {
        window.clearTimeout(this.optionTimeout);
        this.selected = true;
        this.$emit('chosen', this.paymentOptions.currency);
        if (this.request.callbackUrl) {
            try {
                await this.fetchPaymentOption();
            }
            catch (e) {
                this.$rpc.reject(e);
                return false;
            }
        }
        if (!this.paymentOptions.protocolSpecific.recipient) {
            this.$rpc.reject(new Error('Failed to fetch recipient'));
            return false;
        }
        // set the selected currency in history state to enable re-selection
        window.history.replaceState(Object.assign({}, window.history.state, { [_lib_Constants__WEBPACK_IMPORTED_MODULE_5__["HISTORY_KEY_SELECTED_CURRENCY"]]: this.paymentOptions.currency }), '');
        return true;
    }
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(Object)
], CheckoutCard.prototype, "paymentOptions", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_2__["Static"]
], CheckoutCard.prototype, "rpcState", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_2__["Static"]
], CheckoutCard.prototype, "request", void 0);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardBitcoin.vue?vue&type=script&lang=ts&":
/*!********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutCardBitcoin.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CheckoutCardBitcoin; });
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _CheckoutCardExternal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckoutCardExternal.vue */ "./src/components/CheckoutCardExternal.vue");




class CheckoutCardBitcoin extends _CheckoutCardExternal_vue__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor() {
        super(...arguments);
        this.currencyFullName = 'Bitcoin';
        this.icon = 'icon-btc.svg';
    }
    get paymentLink() {
        const paymentOptions = this.paymentOptions;
        const protocolSpecific = paymentOptions.protocolSpecific;
        if (!protocolSpecific.recipient)
            return '#';
        return Object(_nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["createBitcoinRequestLink"])(protocolSpecific.recipient, {
            amount: paymentOptions.amount,
            fee: protocolSpecific.fee,
            label: _lib_StaticStore__WEBPACK_IMPORTED_MODULE_1__["default"].request
                ? `Crypto-Checkout powered by Nimiq - ${_lib_StaticStore__WEBPACK_IMPORTED_MODULE_1__["default"].request.appName}`
                : undefined,
        });
    }
    get manualPaymentDetails() {
        const paymentOptions = this.paymentOptions;
        const protocolSpecific = paymentOptions.protocolSpecific;
        const paymentDetails = [...super.manualPaymentDetails, {
                label: this.$t('22'),
                value: {
                    BTC: paymentOptions.baseUnitAmount,
                    mBTC: new _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["FormattableNumber"](paymentOptions.amount)
                        .moveDecimalSeparator(-paymentOptions.decimals + 3).toString(),
                },
            }];
        if (protocolSpecific.feePerByte || protocolSpecific.fee) {
            const fees = {};
            if (protocolSpecific.feePerByte) {
                fees['Sat/Byte'] = Math.ceil(protocolSpecific.feePerByte * 100) / 100; // rounded
            }
            if (protocolSpecific.fee) {
                fees.BTC = new _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["FormattableNumber"](protocolSpecific.fee)
                    .moveDecimalSeparator(-paymentOptions.decimals).toString();
            }
            paymentDetails.push({
                label: this.$t('119'),
                value: fees,
            });
        }
        return paymentDetails;
    }
}


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardEthereum.vue?vue&type=script&lang=ts&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutCardEthereum.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CheckoutCardEthereum; });
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _CheckoutCardExternal_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckoutCardExternal.vue */ "./src/components/CheckoutCardExternal.vue");



class CheckoutCardEthereum extends _CheckoutCardExternal_vue__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super(...arguments);
        this.currencyFullName = 'Ethereum';
        this.icon = 'icon-eth.svg';
    }
    get paymentLink() {
        const paymentOptions = this.paymentOptions;
        const protocolSpecific = paymentOptions.protocolSpecific;
        if (!protocolSpecific.recipient)
            return '#';
        return Object(_nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["createEthereumRequestLink"])(protocolSpecific.recipient, {
            amount: paymentOptions.amount,
            gasLimit: protocolSpecific.gasLimit,
            gasPrice: protocolSpecific.gasPrice,
        });
    }
    get manualPaymentDetails() {
        const paymentOptions = this.paymentOptions;
        const protocolSpecific = paymentOptions.protocolSpecific;
        const paymentDetails = [...super.manualPaymentDetails, {
                label: this.$t('22'),
                value: {
                    ETH: paymentOptions.baseUnitAmount,
                },
            }];
        if (protocolSpecific.gasPrice) {
            paymentDetails.push({
                label: this.$t('128'),
                value: {
                    GWEI: new _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["FormattableNumber"](protocolSpecific.gasPrice)
                        .moveDecimalSeparator(-9).toString({ maxDecimals: 2 }),
                    ETH: new _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["FormattableNumber"](protocolSpecific.gasPrice)
                        .moveDecimalSeparator(-paymentOptions.decimals).toString(),
                },
            });
        }
        if (protocolSpecific.gasLimit) {
            paymentDetails.push({
                label: this.$t('127'),
                value: protocolSpecific.gasLimit,
            });
        }
        return paymentDetails;
    }
}


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardExternal.vue?vue&type=script&lang=ts&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutCardExternal.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _CheckoutCard_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CheckoutCard.vue */ "./src/components/CheckoutCard.vue");
/* harmony import */ var _CurrencyInfo_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CurrencyInfo.vue */ "./src/components/CurrencyInfo.vue");
/* harmony import */ var _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _CheckoutManualPaymentDetails_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CheckoutManualPaymentDetails.vue */ "./src/components/CheckoutManualPaymentDetails.vue");








let CheckoutCardExternal = class CheckoutCardExternal extends _CheckoutCard_vue__WEBPACK_IMPORTED_MODULE_4__["default"] {
    constructor() {
        super(...arguments);
        this.currencyFullName = ''; // to be set by child class
        this.appNotFound = false;
        this.manualPaymentDetailsOpen = false;
    }
    async created() {
        return await super.created();
    }
    async mounted() {
        super.mounted();
        if (!this.currencyFullName) {
            this.currencyFullName = this.paymentOptions.currency; // just as a fallback in case not set by child class
        }
        if (this.preSelectCurrency) {
            this.selectCurrency();
        }
    }
    destroyed() {
        if (this.checkNetworkInterval)
            clearInterval(this.checkNetworkInterval);
        super.destroyed();
    }
    get paymentLink() {
        throw new Error('CheckoutCardExternal.paymentLink() Needs to be implemented by child classes.');
    }
    async selectCurrency() {
        if (document.activeElement) {
            // prevent the “Open wallet app” button to have focus by default when clicking on the “Pay with…” button
            // (happens only on mobile devices)
            document.activeElement.blur();
        }
        if (this.request.callbackUrl) {
            this.statusScreenState = _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"].State.LOADING;
            this.showStatusScreen = true;
        }
        if (!await super.selectCurrency())
            return false;
        this.checkNetworkInterval = window.setInterval(async () => {
            this.lastPaymentState = await this.getState();
        }, 10000);
        return true;
    }
    showSuccessScreen() {
        this.manualPaymentDetailsOpen = false;
        super.showSuccessScreen();
    }
    showUnderpaidWarningScreen() {
        this.manualPaymentDetailsOpen = false;
        super.showUnderpaidWarningScreen();
    }
    checkBlur() {
        const blurTimeout = window.setTimeout(() => {
            this.appNotFound = true;
            window.onblur = null;
        }, 500);
        window.onblur = () => {
            window.clearTimeout(blurTimeout);
            window.onblur = null;
        };
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(Boolean)
], CheckoutCardExternal.prototype, "preSelectCurrency", void 0);
CheckoutCardExternal = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: {
            Account: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["Account"],
            CaretRightSmallIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["CaretRightSmallIcon"],
            CheckoutManualPaymentDetails: _CheckoutManualPaymentDetails_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
            CurrencyInfo: _CurrencyInfo_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
            PageBody: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageBody"],
            PageFooter: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageFooter"],
            PaymentInfoLine: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PaymentInfoLine"],
            QrCode: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["QrCode"],
            SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"],
            StatusScreen: _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
            StopwatchIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["StopwatchIcon"],
            UnderPaymentIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["UnderPaymentIcon"],
            Amount: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["Amount"],
            FiatAmount: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["FiatAmount"],
        } })
], CheckoutCardExternal);
(function (CheckoutCardExternal) {
    CheckoutCardExternal.PaymentState = _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["PaymentState"];
})(CheckoutCardExternal || (CheckoutCardExternal = {}));
/* harmony default export */ __webpack_exports__["default"] = (CheckoutCardExternal);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardNimiq.vue?vue&type=script&lang=ts&":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutCardNimiq.vue?vue&type=script&lang=ts& ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _Network_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Network.vue */ "./src/components/Network.vue");
/* harmony import */ var _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _CheckoutCard_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CheckoutCard.vue */ "./src/components/CheckoutCard.vue");
/* harmony import */ var _CurrencyInfo_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./CurrencyInfo.vue */ "./src/components/CurrencyInfo.vue");
var CheckoutCardNimiq_1;












let CheckoutCardNimiq = CheckoutCardNimiq_1 = class CheckoutCardNimiq extends _CheckoutCard_vue__WEBPACK_IMPORTED_MODULE_10__["default"] {
    constructor() {
        super(...arguments);
        this.onboardingLink = `https://wallet.nimiq${location.hostname.endsWith('testnet.com') ? '-testnet' : ''}.com`;
        this.updateBalancePromise = null;
        this.balancesUpdating = true;
        this.height = 0;
        this.delayedShowStatusScreen = this.showStatusScreen;
        this._delayedHideStatusScreenTimeout = -1;
    }
    async created() {
        if (this.paymentOptions.currency !== _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["Currency"].NIM) {
            throw new Error('CheckoutCardNimiq did not get a NimiqPaymentOption.');
        }
        return await super.created();
    }
    async mounted() {
        super.mounted();
        // Requires Network child component to be rendered
        this.addConsensusListeners();
        this.updateBalancePromise = this.getBalances().then((balances) => {
            this.balancesUpdating = false;
        });
        if (this.request.paymentOptions.length === 1) {
            if (this.paymentOptions.protocolSpecific.sender) {
                // Handle optional sender address included in the request
                // Check if the address exists
                const senderAddress = this.paymentOptions.protocolSpecific.sender.toUserFriendlyAddress();
                const wallet = this.findWalletByAddress(senderAddress, true);
                if (wallet) {
                    // Forward to Keyguard, skipping account selection
                    this.setAccountOrContract(wallet.id, senderAddress, true);
                }
                else if (this.paymentOptions.protocolSpecific.forceSender) {
                    this.$rpc.reject(new Error('Address not found'));
                }
            }
        }
    }
    destroyed() {
        super.destroyed();
    }
    _delayShowStatusScreen(showStatusScreen) {
        if (showStatusScreen) {
            // show status screen immediately
            clearTimeout(this._delayedHideStatusScreenTimeout);
            this.delayedShowStatusScreen = true;
        }
        else {
            // Hide status screen after a delay to avoid flickering when showStatusScreen is false just for a short
            // moment before the status screen should be shown again. This is the case in setAccountOrContract when
            // switching from the fetchPaymentOption (in selectCurrency) status screen to the balance update status
            // screen and then to the redirect loading spinner
            this._delayedHideStatusScreenTimeout = window.setTimeout(() => this.delayedShowStatusScreen = false, 100);
        }
    }
    async getBalances() {
        const cache = this.getLastBalanceUpdateHeight();
        const isRefresh = !window.performance || performance.navigation.type === 1;
        const sideResultAddedWallet = !!_lib_StaticStore__WEBPACK_IMPORTED_MODULE_6__["default"].sideResult && !!_lib_StaticStore__WEBPACK_IMPORTED_MODULE_6__["default"].sideResult.length;
        if (!sideResultAddedWallet && cache && !isRefresh) {
            this.onHeadChange(cache);
            return cache.balances;
        }
        // Copy wallets to be able to manipulate them
        const wallets = this.wallets.slice(0);
        // Generate a new array with references to the respective wallets' accounts
        const accountsAndContracts = wallets.reduce((acc, wallet) => {
            acc.push(...wallet.accounts.values());
            acc.push(...wallet.contracts);
            return acc;
        }, []);
        // Reduce userfriendly addresses from that
        const addresses = accountsAndContracts.map((accountOrContract) => accountOrContract.userFriendlyAddress);
        // Get balances through pico consensus, also triggers head-change event
        const network = this.$refs.network;
        const balances = await network.getBalances(addresses);
        // Update accounts/contracts with their balances
        // (The accounts are still references to themselves in the wallets' accounts maps)
        for (const accountOrContract of accountsAndContracts) {
            const balance = balances.get(accountOrContract.userFriendlyAddress);
            if (balance === undefined)
                continue;
            if ('type' in accountOrContract && accountOrContract.type === Nimiq.Account.Type.VESTING) {
                // Calculate available amount for vesting contract
                accountOrContract.balance = accountOrContract
                    .calculateAvailableAmount(this.height, Nimiq.Policy.coinsToSatoshis(balance));
            }
            else {
                accountOrContract.balance = Nimiq.Policy.coinsToSatoshis(balance);
            }
        }
        // Store updated wallets
        for (const wallet of wallets) {
            // Update IndexedDB
            await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_7__["WalletStore"].Instance.put(wallet);
            // Update Vuex
            this.$addWallet(wallet);
        }
        // Cache height and balances
        const cacheInput = {
            timestamp: Date.now(),
            height: this.height,
            balances: Array.from(balances.entries()),
        };
        window.sessionStorage.setItem(CheckoutCardNimiq_1.BALANCE_CHECK_STORAGE_KEY, JSON.stringify(cacheInput));
        return balances;
    }
    onHeadChange(head) {
        this.height = head.height;
    }
    addConsensusListeners() {
        const network = this.$refs.network;
        network.$on(_Network_vue__WEBPACK_IMPORTED_MODULE_8__["default"].Events.API_READY, () => this.statusScreenStatus = this.$t('95'));
        network.$on(_Network_vue__WEBPACK_IMPORTED_MODULE_8__["default"].Events.CONSENSUS_SYNCING, () => this.statusScreenStatus = this.$t('225'));
        network.$on(_Network_vue__WEBPACK_IMPORTED_MODULE_8__["default"].Events.CONSENSUS_ESTABLISHED, () => this.statusScreenStatus = this.$t('202'));
    }
    async setAccountOrContract(walletId, address, isFromRequest = false) {
        const startTime = Date.now();
        if (!await super.selectCurrency())
            return;
        // sender and recipient cannot be the same, as keyguard would reject.
        // Should only happen when force sender flag is set to true, nimiq is the sole paymentOption
        // and the addresses are identical. In that case the request is rejected.
        if (address === this.paymentOptions.protocolSpecific.recipient.toUserFriendlyAddress()) {
            if (this.request.paymentOptions.length === 1
                && this.paymentOptions.protocolSpecific.forceSender
                && this.paymentOptions.protocolSpecific.sender
                && this.paymentOptions.protocolSpecific.sender.toUserFriendlyAddress() === address) {
                this.$rpc.reject(new Error('Sender and Recipient cannot be identical.'));
            }
            else {
                // Otherwise it is unclear how this error came to be.
                // Gracefully fail by not selecting the address but returning to the address selection instead.
                console.log('request:', JSON.stringify(this.request));
                console.log('paymentOptions:', JSON.stringify(this.paymentOptions));
                if (this.$captureException) {
                    this.$captureException(new Error('UNEXPECTED Checkout: Sender and Recipient are identical.'));
                }
                return;
            }
        }
        if (this.balancesUpdating) {
            this.statusScreenState = _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_9__["default"].State.LOADING;
            this.statusScreenTitle = this.$t('257');
            this.showStatusScreen = true;
            await this.updateBalancePromise;
        }
        const nimiqAddress = Nimiq.Address.fromString(address);
        const senderAccount = this.wallets.find((wallet) => wallet.id === walletId);
        const senderContract = senderAccount.findContractByAddress(nimiqAddress);
        const signer = senderAccount.findSignerForAddress(nimiqAddress);
        if ((senderContract && senderContract.balance < this.paymentOptions.total)
            || senderAccount && senderAccount.accounts.get(address).balance < this.paymentOptions.total) {
            if (this.paymentOptions.protocolSpecific.forceSender) {
                this.$rpc.reject(new Error('Insufficient balance'));
                return;
            }
            else {
                this.showStatusScreen = false;
                return;
            }
        }
        // FIXME: Also handle active account we get from store
        this.$setActiveAccount({
            walletId: senderAccount.id,
            userFriendlyAddress: (senderContract || signer).userFriendlyAddress,
        });
        // If checkout carousel has multiple cards give it some time to run the card selection animation before
        // redirecting to Keyguard or Ledger flow.
        const waitTime = 400 - (Date.now() - startTime);
        if (waitTime > 0 && this.request.paymentOptions.length > 1) {
            // If a loading screen was shown for fetchPaymentoption (in selectCurrency) or the balance update,
            // keep it artificially open until the redirect
            this.showStatusScreen = this.showStatusScreen
                || this.statusScreenState === _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_9__["default"].State.LOADING && !!this.statusScreenTitle;
            await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
        // proceed to transaction signing
        switch (senderAccount.type) {
            case _lib_Constants__WEBPACK_IMPORTED_MODULE_4__["WalletType"].LEDGER:
                this.$router.push({ name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].SIGN_TRANSACTION}-ledger` });
                return;
            case _lib_Constants__WEBPACK_IMPORTED_MODULE_4__["WalletType"].LEGACY:
            case _lib_Constants__WEBPACK_IMPORTED_MODULE_4__["WalletType"].BIP39:
                if (!this.height)
                    return;
                // The next block is the earliest for which tx are accepted by standard miners
                const validityStartHeight = this.height + 1
                    - _lib_Constants__WEBPACK_IMPORTED_MODULE_4__["TX_VALIDITY_WINDOW"]
                    + (this.paymentOptions.protocolSpecific.validityDuration
                        ? this.paymentOptions.protocolSpecific.validityDuration
                        : _lib_Constants__WEBPACK_IMPORTED_MODULE_4__["TX_VALIDITY_WINDOW"]);
                const timeOffset = await this.timeOffsetPromise;
                const request = {
                    layout: 'checkout',
                    shopOrigin: this.rpcState.origin,
                    appName: this.request.appName,
                    shopLogoUrl: this.request.shopLogoUrl,
                    keyId: senderAccount.keyId,
                    keyPath: signer.path,
                    keyLabel: senderAccount.labelForKeyguard,
                    sender: (senderContract || signer).address.serialize(),
                    senderType: senderContract ? senderContract.type : Nimiq.Account.Type.BASIC,
                    senderLabel: (senderContract || signer).label,
                    recipient: this.paymentOptions.protocolSpecific.recipient.serialize(),
                    recipientType: this.paymentOptions.protocolSpecific.recipientType,
                    // recipientLabel: '', // Checkout is using the shopOrigin instead
                    value: this.paymentOptions.amount,
                    fee: this.paymentOptions.fee,
                    validityStartHeight,
                    data: this.paymentOptions.protocolSpecific.extraData,
                    flags: this.paymentOptions.protocolSpecific.flags,
                    fiatAmount: this.request.fiatAmount,
                    fiatCurrency: this.request.fiatCurrency,
                    vendorMarkup: this.paymentOptions.vendorMarkup,
                    time: this.request.time - timeOffset,
                    expires: this.paymentOptions.expires
                        ? this.paymentOptions.expires - timeOffset
                        : undefined,
                };
                _lib_StaticStore__WEBPACK_IMPORTED_MODULE_6__["default"].keyguardRequest = request;
                const client = this.$rpc.createKeyguardClient(isFromRequest);
                client.signTransaction(request);
                return;
        }
    }
    goToOnboarding(useReplace) {
        // Redirect to onboarding
        _lib_StaticStore__WEBPACK_IMPORTED_MODULE_6__["default"].originalRouteName = _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].CHECKOUT;
        if (useReplace) {
            this.$router.replace({ name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].ONBOARD });
        }
        else {
            this.$router.push({ name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].ONBOARD });
        }
    }
    get hasEligibleAddress() {
        const recipientAddress = this.paymentOptions.protocolSpecific.recipient
            ? this.paymentOptions.protocolSpecific.recipient.toUserFriendlyAddress()
            : '';
        return this.wallets.some((wallet) => [...wallet.accounts.values(), ...wallet.contracts]
            .some((info) => 
        // address has a balance and balance is sufficient
        !!info.balance && info.balance >= this.paymentOptions.total
            // has either not a set recipient yet or the current address is not the recipient
            // as it cannot be used to send from.
            && recipientAddress !== info.userFriendlyAddress));
    }
    getLastBalanceUpdateHeight() {
        const rawCache = window.sessionStorage.getItem(CheckoutCardNimiq_1.BALANCE_CHECK_STORAGE_KEY);
        if (!rawCache)
            return null;
        try {
            const cache = JSON.parse(rawCache);
            // Check if expired or doesn't have a height
            if (cache.timestamp < Date.now() - 5 * 60 * 1000 || cache.height === 0)
                throw new Error();
            return Object.assign(cache, {
                balances: new Map(cache.balances),
            });
        }
        catch (e) {
            window.sessionStorage.removeItem(CheckoutCardNimiq_1.BALANCE_CHECK_STORAGE_KEY);
            return null;
        }
    }
};
CheckoutCardNimiq.BALANCE_CHECK_STORAGE_KEY = 'nimiq_checkout_last_balance_check';
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["State"]
], CheckoutCardNimiq.prototype, "wallets", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], CheckoutCardNimiq.prototype, "processedWallets", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], CheckoutCardNimiq.prototype, "findWalletByAddress", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vuex_class__WEBPACK_IMPORTED_MODULE_2__["Mutation"])('addWallet')
], CheckoutCardNimiq.prototype, "$addWallet", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vuex_class__WEBPACK_IMPORTED_MODULE_2__["Mutation"])('setActiveAccount')
], CheckoutCardNimiq.prototype, "$setActiveAccount", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('showStatusScreen')
], CheckoutCardNimiq.prototype, "_delayShowStatusScreen", null);
CheckoutCardNimiq = CheckoutCardNimiq_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: {
            AccountSelector: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["AccountSelector"],
            CurrencyInfo: _CurrencyInfo_vue__WEBPACK_IMPORTED_MODULE_11__["default"],
            Network: _Network_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
            PageBody: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["PageBody"],
            PageFooter: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["PageFooter"],
            SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["SmallPage"],
            StatusScreen: _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
            PaymentInfoLine: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["PaymentInfoLine"],
            ArrowRightSmallIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["ArrowRightSmallIcon"],
            StopwatchIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["StopwatchIcon"],
            TransferIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["TransferIcon"],
            UnderPaymentIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["UnderPaymentIcon"],
            QrCodeIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["QrCodeIcon"],
        } })
], CheckoutCardNimiq);
(function (CheckoutCardNimiq) {
    CheckoutCardNimiq.PaymentState = _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["PaymentState"];
})(CheckoutCardNimiq || (CheckoutCardNimiq = {}));
/* harmony default export */ __webpack_exports__["default"] = (CheckoutCardNimiq);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardNimiqExternal.vue?vue&type=script&lang=ts&":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutCardNimiqExternal.vue?vue&type=script&lang=ts& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CheckoutCardNimiqExternal; });
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _CheckoutCardExternal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckoutCardExternal.vue */ "./src/components/CheckoutCardExternal.vue");



class CheckoutCardNimiqExternal extends _CheckoutCardExternal_vue__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor() {
        super(...arguments);
        this.currencyFullName = 'Nimiq';
        this.icon = ''; // CurrencyInfo uses css class nimiq-logo instead
    }
    get paymentLink() {
        const paymentOptions = this.paymentOptions;
        const protocolSpecific = paymentOptions.protocolSpecific;
        if (!protocolSpecific.recipient)
            return '#';
        return Object(_nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["createNimiqRequestLink"])(protocolSpecific.recipient.toUserFriendlyAddress(), {
            amount: paymentOptions.amount,
            message: protocolSpecific.extraData && _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["Utf8Tools"].isValidUtf8(protocolSpecific.extraData)
                ? _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["Utf8Tools"].utf8ByteArrayToString(protocolSpecific.extraData)
                : undefined,
            label: _lib_StaticStore__WEBPACK_IMPORTED_MODULE_1__["default"].request
                ? `Crypto-Checkout powered by Nimiq - ${_lib_StaticStore__WEBPACK_IMPORTED_MODULE_1__["default"].request.appName}`
                : undefined,
            type: _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["NimiqRequestLinkType"].URI,
        });
    }
    get manualPaymentDetails() {
        const paymentOptions = this.paymentOptions;
        const protocolSpecific = paymentOptions.protocolSpecific;
        const paymentDetails = [...super.manualPaymentDetails, {
                label: this.$t('22'),
                value: {
                    NIM: paymentOptions.baseUnitAmount,
                },
            }];
        if (protocolSpecific.feePerByte || protocolSpecific.fee) {
            const fees = {};
            if (protocolSpecific.fee) {
                fees.NIM = new _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["FormattableNumber"](protocolSpecific.fee)
                    .moveDecimalSeparator(-paymentOptions.decimals).toString();
            }
            if (protocolSpecific.feePerByte) {
                fees['Luna/Byte'] = Math.ceil(protocolSpecific.feePerByte * 100) / 100; // rounded
            }
            paymentDetails.push({
                label: this.$t('119'),
                value: fees,
            });
        }
        if (protocolSpecific.extraData && protocolSpecific.extraData.byteLength
            && _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["Utf8Tools"].isValidUtf8(protocolSpecific.extraData)) {
            paymentDetails.push({
                label: this.$t('181'),
                value: _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["Utf8Tools"].utf8ByteArrayToString(protocolSpecific.extraData),
            });
        }
        return paymentDetails;
    }
}


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutManualPaymentDetails.vue?vue&type=script&lang=ts&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutManualPaymentDetails.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _lib_CheckoutServerApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/CheckoutServerApi */ "./src/lib/CheckoutServerApi.ts");





let CheckoutManualPaymentDetails = class CheckoutManualPaymentDetails extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    async mounted() {
        const paymentInfoLine = this.$refs.info;
        if (!paymentInfoLine)
            return;
        if (!this.request.callbackUrl || !this.request.csrf) {
            throw new Error('Can\'t fetch time without callbackUrl and csrf token');
        }
        const serverTime = await _lib_CheckoutServerApi__WEBPACK_IMPORTED_MODULE_4__["default"].fetchTime(this.request.callbackUrl, this.request.csrf);
        paymentInfoLine.setTime(serverTime);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])({
        type: Array,
        required: true,
        validator: (data) => Array.isArray(data) && data.length > 0
            && data.every((entry) => typeof entry === 'object' && entry.label
                && (['object', 'string', 'number'].includes(typeof entry.value))),
    })
], CheckoutManualPaymentDetails.prototype, "paymentDetails", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])({
        type: Object,
        required: true,
    })
], CheckoutManualPaymentDetails.prototype, "paymentOptions", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_3__["Static"]
], CheckoutManualPaymentDetails.prototype, "rpcState", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_3__["Static"]
], CheckoutManualPaymentDetails.prototype, "request", void 0);
CheckoutManualPaymentDetails = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: {
            CopyableField: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["CopyableField"],
            SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"],
            PageHeader: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageHeader"],
            PageBody: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageBody"],
            PaymentInfoLine: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PaymentInfoLine"],
        } })
], CheckoutManualPaymentDetails);
(function (CheckoutManualPaymentDetails) {
    let Events;
    (function (Events) {
        Events["CLOSE"] = "close";
    })(Events = CheckoutManualPaymentDetails.Events || (CheckoutManualPaymentDetails.Events = {}));
})(CheckoutManualPaymentDetails || (CheckoutManualPaymentDetails = {}));
/* harmony default export */ __webpack_exports__["default"] = (CheckoutManualPaymentDetails);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CurrencyInfo.vue?vue&type=script&lang=ts&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CurrencyInfo.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");




let CurrencyInfo = class CurrencyInfo extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    get isAlmostFree() {
        // Check whether the amount is less than 1 of the smallest unit by checking whether all digits of the rendered
        // number are 0.
        return this.fiatFeeAmount !== 0
            && !!this.fiatFeeAmount.toLocaleString('en-US', { style: 'currency', currency: this.fiatCurrency })
                .replace(/\D+/g, '') // remove all non-digits
                .match(/^0+$/);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])({ type: String, required: true })
], CurrencyInfo.prototype, "currency", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])({ type: String, required: true })
], CurrencyInfo.prototype, "fiatCurrency", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])({ type: Number, required: true })
], CurrencyInfo.prototype, "fiatFeeAmount", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(String)
], CurrencyInfo.prototype, "currencyIcon", void 0);
CurrencyInfo = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { FiatAmount: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["FiatAmount"] } })
], CurrencyInfo);
(function (CurrencyInfo) {
    CurrencyInfo.Currency = _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_3__["Currency"];
})(CurrencyInfo || (CurrencyInfo = {}));
/* harmony default export */ __webpack_exports__["default"] = (CurrencyInfo);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Checkout.vue?vue&type=script&lang=ts&":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Checkout.vue?vue&type=script&lang=ts& ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _components_CheckoutCardBitcoin_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/CheckoutCardBitcoin.vue */ "./src/components/CheckoutCardBitcoin.vue");
/* harmony import */ var _components_CheckoutCardEthereum_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/CheckoutCardEthereum.vue */ "./src/components/CheckoutCardEthereum.vue");
/* harmony import */ var _components_CheckoutCardNimiq_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/CheckoutCardNimiq.vue */ "./src/components/CheckoutCardNimiq.vue");
/* harmony import */ var _components_CheckoutCardNimiqExternal_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/CheckoutCardNimiqExternal.vue */ "./src/components/CheckoutCardNimiqExternal.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
var Checkout_1;












let Checkout = Checkout_1 = class Checkout extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.choosenCurrency = null;
        this.selectedCurrency = null;
        this.leftCard = null;
        this.rightCard = null;
        this.initialCurrencies = [];
        this.availableCurrencies = [];
        this.isIOS = _nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["BrowserDetection"].isIOS();
        this.disclaimerRequired = true;
        this.hasLongDisclaimer = false;
        this.screenFitsDisclaimer = true;
        this.dimensionsUpdateTimeout = -1;
        this.globalCloseButtonLabel = '';
        this.useExternalNimWallet = false;
    }
    updateUnselected() {
        const entries = this.request.paymentOptions.map((paymentOptions) => paymentOptions.currency);
        if (entries.length === 1)
            return;
        const indexSelected = entries.indexOf(this.selectedCurrency);
        if (entries.length === 2) {
            // We have two cards. Determine whether the non selected is to the left or to the right.
            this.leftCard = indexSelected === 1 ? entries[0] : null;
            this.rightCard = indexSelected === 1 ? null : entries[1];
        }
        else {
            this.leftCard = entries[(indexSelected - 1 + entries.length) % entries.length];
            this.rightCard = entries[(indexSelected + 1) % entries.length];
        }
    }
    async created() {
        const $subtitle = document.querySelector('.logo .logo-subtitle');
        $subtitle.textContent = 'Checkout';
        document.title = this.request.paymentOptions.length === 1
            && this.request.paymentOptions[0].currency === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_9__["Currency"].NIM
            ? 'Nimiq Checkout'
            : 'Crypto-Checkout powered by Nimiq';
        this.initialCurrencies = this.request.paymentOptions.map((option) => option.currency).filter((currency) => !history.state
            || !history.state[_lib_Constants__WEBPACK_IMPORTED_MODULE_11__["HISTORY_KEY_SELECTED_CURRENCY"]]
            || history.state[_lib_Constants__WEBPACK_IMPORTED_MODULE_11__["HISTORY_KEY_SELECTED_CURRENCY"]] === currency);
        this.availableCurrencies = [...this.initialCurrencies];
        const currenciesByPreference = this.request.isPointOfSale
            ? [_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_9__["Currency"].BTC, _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_9__["Currency"].ETH, ...this._getLastUsedCurrencies(), this.availableCurrencies[0]]
            : [...this._getLastUsedCurrencies(), _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_9__["Currency"].NIM, _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_9__["Currency"].BTC, this.availableCurrencies[0]];
        this.selectedCurrency = currenciesByPreference
            .find((currency) => this.availableCurrencies.includes(currency));
        const lastUsage = parseInt(window.localStorage[Checkout_1.LAST_USAGE_STORAGE_KEY], 10);
        const lastDisclaimerClose = parseInt(window.localStorage[Checkout_1.DISCLAIMER_CLOSED_STORAGE_KEY], 10);
        this.disclaimerRequired = !this.request.disableDisclaimer && (Number.isNaN(lastUsage) || Date.now() - lastUsage > Checkout_1.LAST_USAGE_RECENT_THRESHOLD
            || Number.isNaN(lastDisclaimerClose) || Date.now() - lastDisclaimerClose > Checkout_1.DISCLAIMER_CLOSED_EXPIRY);
        this._onResize = this._onResize.bind(this);
        window.addEventListener('resize', this._onResize);
        this._onResize();
    }
    mounted() {
        const disclaimer = this.$refs.disclaimer
            ? this.$refs.disclaimer.$el || this.$refs.disclaimer
            : undefined;
        this.hasLongDisclaimer = !!disclaimer && disclaimer.textContent.length > 250;
    }
    destroyed() {
        window.removeEventListener('resize', this._onResize);
    }
    chooseCurrency(currency) {
        this.selectedCurrency = currency;
        this.choosenCurrency = currency;
        this._setLastUsedCurrency(currency);
        window.localStorage[Checkout_1.LAST_USAGE_STORAGE_KEY] = Date.now();
        this.$refs.carousel.updateDimensions();
    }
    expired(currency) {
        this.availableCurrencies.splice(this.availableCurrencies.indexOf(currency), 1);
    }
    _getLastUsedCurrencies() {
        try {
            const knownCurrencies = Object.values(_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_9__["Currency"]);
            return JSON.parse(window.localStorage[Checkout_1.LAST_USED_CURRENCIES_STORAGE_KEY])
                .filter((currency) => knownCurrencies.includes(currency));
        }
        catch (e) {
            return [];
        }
    }
    _setLastUsedCurrency(currency) {
        window.localStorage[Checkout_1.LAST_USED_CURRENCIES_STORAGE_KEY] = JSON.stringify([
            ...new Set([currency, ...this._getLastUsedCurrencies()]),
        ]);
    }
    _closeDisclaimerOverlay() {
        this.disclaimerRequired = false;
        // store when the disclaimer was closed
        window.localStorage[Checkout_1.DISCLAIMER_CLOSED_STORAGE_KEY] = Date.now();
    }
    _onResize() {
        const minWidth = 740; // Width below which English disclaimer would break into three lines.
        const minHeight = 890; // Height at which disclaimer fits at bottom, also with logos over carousel shown.
        this.screenFitsDisclaimer = window.innerWidth >= minWidth && window.innerHeight >= minHeight;
        this.globalCloseButtonLabel = window.innerWidth > 400
            ? this.$t('52')
            : this.$t('51');
        // Throttle calls to carousel.updateDimensions as its an expensive call
        clearTimeout(this.dimensionsUpdateTimeout);
        this.dimensionsUpdateTimeout = window.setTimeout(() => this.$refs.carousel.updateDimensions(), 150);
    }
    _onUseExternalWallet(currency) {
        if (currency === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_9__["Currency"].NIM)
            this.useExternalNimWallet = true;
    }
};
Checkout.LAST_USED_CURRENCIES_STORAGE_KEY = 'checkout-last-used-currencies';
Checkout.LAST_USAGE_STORAGE_KEY = 'ckeckout-last-usage';
Checkout.LAST_USAGE_RECENT_THRESHOLD = 31 * 24 * 60 * 60 * 1000; // One month
Checkout.DISCLAIMER_CLOSED_STORAGE_KEY = 'checkout-disclaimer-last-closed';
Checkout.DISCLAIMER_CLOSED_EXPIRY = 12 * 31 * 24 * 60 * 60 * 1000; // One year
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_10__["Static"]
], Checkout.prototype, "rpcState", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_10__["Static"]
], Checkout.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('selectedCurrency')
], Checkout.prototype, "updateUnselected", null);
Checkout = Checkout_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: {
            GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
            BottomOverlay: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["BottomOverlay"],
            Carousel: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["Carousel"],
            CheckoutCardBitcoin: _components_CheckoutCardBitcoin_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
            CheckoutCardEthereum: _components_CheckoutCardEthereum_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
            CheckoutCardNimiq: _components_CheckoutCardNimiq_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
            CheckoutCardNimiqExternal: _components_CheckoutCardNimiqExternal_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
        } })
], Checkout);
(function (Checkout) {
    Checkout.Currency = _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_9__["Currency"];
})(Checkout || (Checkout = {}));
/* harmony default export */ __webpack_exports__["default"] = (Checkout);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CheckoutTransmission.vue?vue&type=script&lang=ts&":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CheckoutTransmission.vue?vue&type=script&lang=ts& ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Network_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Network.vue */ "./src/components/Network.vue");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../i18n/i18n-setup */ "./src/i18n/i18n-setup.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");









let CheckoutTransmission = class CheckoutTransmission extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.status = _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_7__["i18n"].t('93');
        this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"].State.LOADING;
        this.message = '';
    }
    created() {
        const $subtitle = document.querySelector('.logo .logo-subtitle');
        $subtitle.textContent = 'Checkout';
    }
    async mounted() {
        this.addConsensusListeners();
        const tx = await this.$refs.network.createTx(Object.assign({
            signerPubKey: this.keyguardResult.publicKey,
        }, this.keyguardResult, this.keyguardRequest));
        try {
            const result = await this.$refs.network.sendToNetwork(tx);
            this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"].State.SUCCESS;
            setTimeout(() => this.$rpc.resolve(result), _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"].SUCCESS_REDIRECT_DELAY);
        }
        catch (error) {
            this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"].State.WARNING;
            if (error.message === _components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"].Errors.TRANSACTION_EXPIRED) {
                this.message = this.$t('249');
            }
            else if (error.message === _components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"].Errors.TRANSACTION_NOT_RELAYED) {
                this.message = this.$t('248');
            }
            else {
                this.message = error.message;
            }
        }
    }
    addConsensusListeners() {
        const network = this.$refs.network;
        network.$on(_components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"].Events.API_READY, () => this.status = this.$t('95'));
        network.$on(_components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"].Events.CONSENSUS_SYNCING, () => this.status = this.$t('225'));
        network.$on(_components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"].Events.CONSENSUS_ESTABLISHED, () => this.status = this.$t('209'));
        network.$on(_components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"].Events.TRANSACTION_PENDING, () => this.status = this.$t('27'));
    }
    get title() {
        switch (this.state) {
            case _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"].State.SUCCESS: return this.$t('183');
            case _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"].State.WARNING: return this.$t('215');
            default: return this.$t('192');
        }
    }
    reload() {
        window.location.reload();
    }
    cancel() {
        this.$rpc.reject(new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_8__["ERROR_CANCELED"]));
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_2__["Static"]
], CheckoutTransmission.prototype, "keyguardRequest", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_3__["State"]
], CheckoutTransmission.prototype, "keyguardResult", void 0);
CheckoutTransmission = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"], Network: _components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_4__["SmallPage"] } })
], CheckoutTransmission);
/* harmony default export */ __webpack_exports__["default"] = (CheckoutTransmission);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardExternal.vue?vue&type=template&id=3e26ff11&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutCardExternal.vue?vue&type=template&id=3e26ff11&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "payment-option",
      attrs: { id: _vm.paymentOptions.currency }
    },
    [
      _vm.hasCurrencyInfo
        ? _c("CurrencyInfo", {
            attrs: {
              currency: _vm.paymentOptions.currency,
              fiatCurrency: _vm.request.fiatCurrency,
              fiatFeeAmount: _vm.paymentOptions.fiatFee(_vm.request.fiatAmount),
              currencyIcon: _vm.icon
            }
          })
        : _vm._e(),
      _c(
        "div",
        { staticClass: "nq-card-wrapper" },
        [
          _c(
            "transition",
            { attrs: { name: "transition-fade" } },
            [
              _vm.showStatusScreen
                ? _c("StatusScreen", {
                    attrs: {
                      state: _vm.statusScreenState,
                      title: _vm.statusScreenTitle,
                      status: _vm.statusScreenStatus,
                      message: _vm.statusScreenMessage,
                      mainAction: _vm.statusScreenMainActionText
                    },
                    on: { "main-action": _vm.statusScreenMainAction },
                    scopedSlots: _vm._u(
                      [
                        _vm.timeoutReached ||
                        _vm.paymentState ===
                          _vm.constructor.PaymentState.UNDERPAID
                          ? {
                              key: "warning",
                              fn: function() {
                                return [
                                  _vm.timeoutReached
                                    ? _c("StopwatchIcon", {
                                        staticClass: "stopwatch-icon"
                                      })
                                    : _c("UnderPaymentIcon", {
                                        staticClass: "under-payment-icon"
                                      }),
                                  _c("h1", { staticClass: "title nq-h1" }, [
                                    _vm._v(_vm._s(_vm.statusScreenTitle))
                                  ]),
                                  _vm.statusScreenMessage
                                    ? _c(
                                        "p",
                                        { staticClass: "message nq-text" },
                                        [
                                          _vm._v(
                                            _vm._s(_vm.statusScreenMessage)
                                          )
                                        ]
                                      )
                                    : _vm._e()
                                ]
                              },
                              proxy: true
                            }
                          : null
                      ],
                      null,
                      true
                    )
                  })
                : _vm._e()
            ],
            1
          ),
          _c(
            "transition",
            { attrs: { name: "transition-flip" } },
            [
              !_vm.manualPaymentDetailsOpen
                ? _c(
                    "SmallPage",
                    { staticClass: "flip-primary" },
                    [
                      _vm.rpcState
                        ? _c("PaymentInfoLine", {
                            ref: "info",
                            attrs: {
                              cryptoAmount: {
                                amount: _vm.paymentOptions.amount,
                                currency: _vm.paymentOptions.currency,
                                decimals: _vm.paymentOptions.decimals
                              },
                              fiatAmount:
                                _vm.request.fiatAmount &&
                                _vm.request.fiatCurrency
                                  ? {
                                      amount: _vm.request.fiatAmount,
                                      currency: _vm.request.fiatCurrency
                                    }
                                  : null,
                              vendorMarkup: _vm.paymentOptions.vendorMarkup,
                              networkFee: _vm.paymentOptions.fee,
                              address:
                                typeof _vm.paymentOptions.protocolSpecific
                                  .recipient === "object" &&
                                "toUserFriendlyAddress" in
                                  _vm.paymentOptions.protocolSpecific.recipient
                                  ? _vm.paymentOptions.protocolSpecific.recipient.toUserFriendlyAddress()
                                  : _vm.paymentOptions.protocolSpecific
                                      .recipient,
                              origin: _vm.rpcState.origin,
                              shopLogoUrl: _vm.request.shopLogoUrl,
                              startTime: _vm.request.time,
                              endTime: _vm.paymentOptions.expires
                            }
                          })
                        : _vm._e(),
                      _c(
                        "PageBody",
                        [
                          !_vm.selected
                            ? _c("Account", {
                                attrs: {
                                  layout: "column",
                                  image: _vm.request.shopLogoUrl,
                                  label: _vm.rpcState.origin.split("://")[1]
                                }
                              })
                            : [
                                _c("h1", { staticClass: "nq-h1" }, [
                                  _vm._v(
                                    " " +
                                      _vm._s(_vm.$t('207')) +
                                      " "
                                  )
                                ]),
                                _c("p", { staticClass: "nq-notice warning" }, [
                                  _vm._v(
                                    " " +
                                      _vm._s(
                                        _vm.$t(
                                          '110'
                                        )
                                      ) +
                                      " "
                                  )
                                ]),
                                _c("QrCode", {
                                  attrs: {
                                    data: _vm.paymentLink,
                                    fill: {
                                      type: "radial-gradient",
                                      position: [1, 1, 0, 1, 1, Math.sqrt(2)],
                                      colorStops: [
                                        [0, "#260133"],
                                        [1, "#1F2348"]
                                      ] // nimiq-blue
                                    },
                                    size: _vm.request.isPointOfSale ? 230 : 200
                                  }
                                })
                              ],
                          _c(
                            "div",
                            { staticClass: "amounts" },
                            [
                              _c("Amount", {
                                staticClass: "crypto nq-light-blue",
                                class: {
                                  "reduced-top":
                                    !_vm.request.isPointOfSale &&
                                    _vm.paymentOptions.currency !== "nim"
                                },
                                attrs: {
                                  currency: _vm.paymentOptions.currency,
                                  currencyDecimals: _vm.paymentOptions.decimals,
                                  minDecimals: 0,
                                  maxDecimals:
                                    _vm.paymentOptions.decimals < 8
                                      ? _vm.paymentOptions.decimals
                                      : 8,
                                  amount: _vm.paymentOptions.amount
                                }
                              }),
                              _vm.paymentOptions.fee !== 0
                                ? _c("div", { staticClass: "fee" }, [
                                    _vm._v(
                                      " " +
                                        _vm._s(
                                          _vm.$t('4', {
                                            currency: _vm.currencyFullName
                                          })
                                        ) +
                                        " "
                                    )
                                  ])
                                : _vm._e()
                            ],
                            1
                          )
                        ],
                        2
                      ),
                      _vm.selected
                        ? _c("PageFooter", [
                            !_vm.request.isPointOfSale &&
                            _vm.paymentOptions.currency !== "nim"
                              ? _c(
                                  "a",
                                  {
                                    staticClass:
                                      "nq-button light-blue use-app-button",
                                    attrs: {
                                      disabled: _vm.appNotFound,
                                      href: _vm.paymentLink
                                    },
                                    on: { click: _vm.checkBlur }
                                  },
                                  [
                                    _vm.appNotFound
                                      ? [
                                          _c("span", [
                                            _vm._v(
                                              _vm._s(_vm.$t('166'))
                                            )
                                          ]),
                                          _c("span", [
                                            _vm._v(
                                              _vm._s(
                                                _vm.$t(
                                                  '189'
                                                )
                                              )
                                            )
                                          ])
                                        ]
                                      : [
                                          _vm._v(
                                            " " +
                                              _vm._s(
                                                _vm.$t('174')
                                              ) +
                                              " "
                                          )
                                        ]
                                  ],
                                  2
                                )
                              : _vm._e(),
                            _c(
                              "a",
                              {
                                staticClass: "nq-text-s nq-link",
                                attrs: { href: "javascript:void(0)" },
                                on: {
                                  click: function($event) {
                                    _vm.manualPaymentDetailsOpen = true
                                  }
                                }
                              },
                              [
                                _vm._v(" " + _vm._s(_vm.$t('113'))),
                                _c("CaretRightSmallIcon")
                              ],
                              1
                            )
                          ])
                        : _c("PageFooter", [
                            _c(
                              "button",
                              {
                                staticClass: "nq-button light-blue",
                                on: { click: _vm.selectCurrency }
                              },
                              [
                                _vm._v(
                                  " " +
                                    _vm._s(
                                      _vm.$t('179', {
                                        currencyFullName: _vm.currencyFullName
                                      })
                                    ) +
                                    " "
                                )
                              ]
                            )
                          ])
                    ],
                    1
                  )
                : _c("CheckoutManualPaymentDetails", {
                    staticClass: "flip-secondary",
                    attrs: {
                      paymentDetails: _vm.manualPaymentDetails,
                      paymentOptions: _vm.paymentOptions
                    },
                    on: {
                      close: function($event) {
                        _vm.manualPaymentDetailsOpen = false
                      }
                    }
                  })
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardNimiq.vue?vue&type=template&id=c1244e38&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutCardNimiq.vue?vue&type=template&id=c1244e38&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "payment-option",
      attrs: { id: _vm.paymentOptions.currency }
    },
    [
      _vm.hasCurrencyInfo
        ? _c("CurrencyInfo", {
            attrs: {
              currency: _vm.paymentOptions.currency,
              fiatCurrency: _vm.request.fiatCurrency,
              fiatFeeAmount: _vm.paymentOptions.fiatFee(_vm.request.fiatAmount)
            }
          })
        : _vm._e(),
      _c(
        "SmallPage",
        [
          _c(
            "transition",
            { attrs: { name: "transition-fade" } },
            [
              _vm.delayedShowStatusScreen
                ? _c("StatusScreen", {
                    attrs: {
                      state: _vm.statusScreenState,
                      title: _vm.statusScreenTitle,
                      status: _vm.statusScreenStatus,
                      message: _vm.statusScreenMessage,
                      mainAction: _vm.statusScreenMainActionText
                    },
                    on: { "main-action": _vm.statusScreenMainAction },
                    scopedSlots: _vm._u(
                      [
                        _vm.timeoutReached ||
                        _vm.paymentState ===
                          _vm.constructor.PaymentState.UNDERPAID
                          ? {
                              key: "warning",
                              fn: function() {
                                return [
                                  _vm.timeoutReached
                                    ? _c("StopwatchIcon", {
                                        staticClass: "stopwatch-icon"
                                      })
                                    : _c("UnderPaymentIcon", {
                                        staticClass: "under-payment-icon"
                                      }),
                                  _c("h1", { staticClass: "title nq-h1" }, [
                                    _vm._v(_vm._s(_vm.statusScreenTitle))
                                  ]),
                                  _vm.statusScreenMessage
                                    ? _c(
                                        "p",
                                        { staticClass: "message nq-text" },
                                        [
                                          _vm._v(
                                            _vm._s(_vm.statusScreenMessage)
                                          )
                                        ]
                                      )
                                    : _vm._e()
                                ]
                              },
                              proxy: true
                            }
                          : null
                      ],
                      null,
                      true
                    )
                  })
                : _vm._e()
            ],
            1
          ),
          _vm.rpcState
            ? [
                _c("PaymentInfoLine", {
                  ref: "info",
                  attrs: {
                    cryptoAmount: {
                      amount: _vm.paymentOptions.amount,
                      currency: _vm.paymentOptions.currency,
                      decimals: _vm.paymentOptions.decimals
                    },
                    fiatAmount:
                      _vm.request.fiatAmount && _vm.request.fiatCurrency
                        ? {
                            amount: _vm.request.fiatAmount,
                            currency: _vm.request.fiatCurrency
                          }
                        : null,
                    vendorMarkup: _vm.paymentOptions.vendorMarkup,
                    networkFee: _vm.paymentOptions.fee,
                    address: _vm.paymentOptions.protocolSpecific.recipient
                      ? _vm.paymentOptions.protocolSpecific.recipient.toUserFriendlyAddress()
                      : null,
                    origin: _vm.rpcState.origin,
                    shopLogoUrl: _vm.request.shopLogoUrl,
                    startTime: _vm.request.time,
                    endTime: _vm.paymentOptions.expires
                  }
                })
              ]
            : _vm._e(),
          _vm.wallets.length === 0
            ? [
                _c("h2", { staticClass: "nq-h1" }, [
                  _vm._v(
                    _vm._s(_vm.$t('136'))
                  )
                ]),
                _c("PageBody", { staticClass: "video-container" }, [
                  _c(
                    "video",
                    {
                      attrs: {
                        autoplay: "",
                        loop: "",
                        muted: "",
                        playsinline: "",
                        disablePictureInPicture: ""
                      },
                      domProps: { muted: true }
                    },
                    [
                      _c("source", {
                        attrs: {
                          src: "/checkout-demo.mp4#t=0.7",
                          type: "video/mp4"
                        }
                      })
                    ]
                  )
                ]),
                _c("PageFooter", [
                  _c(
                    "button",
                    {
                      staticClass: "nq-button-pill light-blue",
                      on: { click: _vm.goToOnboarding }
                    },
                    [_vm._v(_vm._s(_vm.$t('151')))]
                  ),
                  _vm.request.version > 1
                    ? _c(
                        "button",
                        {
                          staticClass: "nq-button-s external-wallet",
                          on: {
                            click: function($event) {
                              return _vm.$emit("use-external-wallet")
                            }
                          }
                        },
                        [
                          _c("QrCodeIcon"),
                          _vm._v(" " + _vm._s(_vm.$t('176')))
                        ],
                        1
                      )
                    : _vm._e()
                ])
              ]
            : [
                _c("h2", { staticClass: "nq-h1" }, [
                  _vm._v(_vm._s(_vm.$t('65')))
                ]),
                !_vm.balancesUpdating && !_vm.hasEligibleAddress
                  ? _c("div", { staticClass: "non-sufficient-balance" }, [
                      _c("p", { staticClass: "nq-text nq-orange" }, [
                        _vm._v(
                          _vm._s(
                            _vm.$t(
                              '168'
                            )
                          )
                        )
                      ]),
                      _c(
                        "a",
                        {
                          staticClass: "nq-button-pill light-blue",
                          attrs: {
                            href: "https://nimiq.com/#exchanges",
                            target: "_blank"
                          }
                        },
                        [
                          _c("TransferIcon"),
                          _vm._v(" " + _vm._s(_vm.$t('129')) + " ")
                        ],
                        1
                      )
                    ])
                  : _vm._e(),
                _c("AccountSelector", {
                  attrs: {
                    wallets: _vm.processedWallets,
                    minBalance: _vm.balancesUpdating
                      ? 0
                      : _vm.paymentOptions.total,
                    disabledAddresses: _vm.paymentOptions.protocolSpecific
                      .recipient
                      ? [
                          _vm.paymentOptions.protocolSpecific.recipient.toUserFriendlyAddress()
                        ]
                      : [],
                    allowLogin: false
                  },
                  on: { "account-selected": _vm.setAccountOrContract }
                }),
                _c("PageFooter", { staticClass: "minimal" }, [
                  _c(
                    "button",
                    {
                      staticClass: "nq-button-pill light-blue",
                      on: {
                        click: function() {
                          return _vm.goToOnboarding(false)
                        }
                      }
                    },
                    [_vm._v("Login")]
                  ),
                  _vm.request.version > 1
                    ? _c(
                        "button",
                        {
                          staticClass: "nq-button-s external-wallet",
                          on: {
                            click: function($event) {
                              return _vm.$emit("use-external-wallet")
                            }
                          }
                        },
                        [
                          _c("QrCodeIcon"),
                          _vm._v(" " + _vm._s(_vm.$t('176')))
                        ],
                        1
                      )
                    : _vm._e()
                ])
              ]
        ],
        2
      ),
      _c("Network", {
        ref: "network",
        attrs: { visible: false },
        on: { "head-change": _vm.onHeadChange }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutManualPaymentDetails.vue?vue&type=template&id=e34d0d50&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutManualPaymentDetails.vue?vue&type=template&id=e34d0d50&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    "SmallPage",
    { staticClass: "checkout-manual-payment-details nq-blue-bg" },
    [
      _vm.rpcState
        ? _c("PaymentInfoLine", {
            ref: "info",
            attrs: {
              theme: "inverse",
              cryptoAmount: {
                amount: _vm.paymentOptions.amount,
                currency: _vm.paymentOptions.currency,
                decimals: _vm.paymentOptions.decimals
              },
              fiatAmount:
                _vm.request.fiatAmount && _vm.request.fiatCurrency
                  ? {
                      amount: _vm.request.fiatAmount,
                      currency: _vm.request.fiatCurrency
                    }
                  : null,
              vendorMarkup: _vm.paymentOptions.vendorMarkup,
              networkFee: _vm.paymentOptions.fee,
              address:
                typeof _vm.paymentOptions.protocolSpecific.recipient ===
                  "object" &&
                "toUserFriendlyAddress" in
                  _vm.paymentOptions.protocolSpecific.recipient
                  ? _vm.paymentOptions.protocolSpecific.recipient.toUserFriendlyAddress()
                  : _vm.paymentOptions.protocolSpecific.recipient,
              origin: _vm.rpcState.origin,
              shopLogoUrl: _vm.request.shopLogoUrl,
              startTime: _vm.request.time,
              endTime: _vm.paymentOptions.expires
            }
          })
        : _vm._e(),
      _c(
        "PageHeader",
        {
          attrs: { backArrow: "" },
          on: {
            back: function($event) {
              return _vm.$emit(_vm.constructor.Events.CLOSE)
            }
          }
        },
        [_vm._v(" " + _vm._s(_vm.$t('207')) + " ")]
      ),
      _c(
        "PageBody",
        [
          _c("p", { staticClass: "nq-notice warning" }, [
            _vm._v(
              " " +
                _vm._s(_vm.$t('110')) +
                " "
            ),
            _c("br"),
            _vm._v(" " + _vm._s(_vm.paymentOptions.feeString) + " ")
          ]),
          _vm._l(_vm.paymentDetails, function(entry) {
            return _c("CopyableField", {
              key: entry.label,
              attrs: {
                label: entry.label,
                value: entry.value,
                small: _vm.paymentDetails.length > 3
              }
            })
          })
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

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CurrencyInfo.vue?vue&type=template&id=0e0ca50f&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CurrencyInfo.vue?vue&type=template&id=0e0ca50f&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "currency-info" }, [
    _c("h1", { staticClass: "nq-h1" }, [
      _vm.currency === _vm.constructor.Currency.NIM
        ? _c("span", { staticClass: "nq-icon nimiq-logo" })
        : _vm.currencyIcon
        ? _c("img", { attrs: { src: _vm.currencyIcon } })
        : _vm._e(),
      _vm._v(" " + _vm._s(_vm.currency) + " ")
    ]),
    _c("p", { staticClass: "nq-text" }, [
      _vm.fiatFeeAmount === 0
        ? _c("span", [_vm._v(_vm._s(_vm.$t('165')))])
        : _vm.isAlmostFree
        ? _c("span", [_vm._v("~ 0")])
        : _c(
            "span",
            [
              _vm._v(" ~ "),
              _c("FiatAmount", {
                attrs: { amount: _vm.fiatFeeAmount, currency: _vm.fiatCurrency }
              })
            ],
            1
          ),
      _vm._v(" " + _vm._s(_vm.$t('119')) + " ")
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Checkout.vue?vue&type=template&id=e9bc6700&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Checkout.vue?vue&type=template&id=e9bc6700&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "container" },
    [
      _c("div", { staticClass: "spacer" }),
      _c("Carousel", {
        ref: "carousel",
        class: {
          ios: _vm.isIOS,
          "has-currency-info": _vm.initialCurrencies.length > 1
        },
        attrs: {
          entries: _vm.initialCurrencies,
          entryMargin: 36,
          animationDuration: 500,
          selected: _vm.selectedCurrency,
          disabled:
            _vm.choosenCurrency !== null || _vm.availableCurrencies.length === 0
        },
        on: {
          select: function($event) {
            _vm.selectedCurrency = $event
          }
        },
        scopedSlots: _vm._u(
          [
            _vm._l(_vm.request.paymentOptions, function(paymentOptions) {
              return {
                key: paymentOptions.currency,
                fn: function() {
                  return [
                    _c(
                      paymentOptions.currency === _vm.constructor.Currency.NIM
                        ? _vm.request.isPointOfSale
                          ? "CheckoutCardNimiqExternal"
                          : _vm.useExternalNimWallet
                          ? "CheckoutCardNimiqExternal"
                          : "CheckoutCardNimiq"
                        : paymentOptions.currency ===
                          _vm.constructor.Currency.BTC
                        ? "CheckoutCardBitcoin"
                        : "CheckoutCardEthereum",
                      {
                        key: paymentOptions.currency,
                        tag: "component",
                        class: {
                          confirmed:
                            _vm.choosenCurrency === paymentOptions.currency,
                          left: _vm.leftCard === paymentOptions.currency,
                          right: _vm.rightCard === paymentOptions.currency
                        },
                        attrs: {
                          paymentOptions: paymentOptions,
                          preSelectCurrency:
                            paymentOptions.currency ===
                              _vm.constructor.Currency.NIM &&
                            _vm.useExternalNimWallet
                        },
                        on: {
                          chosen: _vm.chooseCurrency,
                          expired: _vm.expired,
                          "use-external-wallet": function($event) {
                            return _vm._onUseExternalWallet(
                              paymentOptions.currency
                            )
                          }
                        }
                      }
                    )
                  ]
                },
                proxy: true
              }
            })
          ],
          null,
          true
        )
      }),
      _c("GlobalClose", { attrs: { buttonLabel: _vm.globalCloseButtonLabel } }),
      _c("div", { staticClass: "spacer" }),
      _c(
        "transition",
        { attrs: { name: "transition-disclaimer" } },
        [
          (_vm.screenFitsDisclaimer || _vm.disclaimerRequired) &&
          !_vm.request.disableDisclaimer
            ? _c(
                _vm.screenFitsDisclaimer ? "div" : "BottomOverlay",
                {
                  ref: "disclaimer",
                  tag: "component",
                  staticClass: "disclaimer",
                  class: { "long-disclaimer": _vm.hasLongDisclaimer },
                  on: { close: _vm._closeDisclaimerOverlay }
                },
                [
                  _c("strong", [_vm._v(_vm._s(_vm.$t('109')))]),
                  _vm._v(
                    " " +
                      _vm._s(
                        _vm.$t(
                          '242'
                        )
                      ) +
                      " "
                  )
                ]
              )
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CheckoutTransmission.vue?vue&type=template&id=2502a484&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CheckoutTransmission.vue?vue&type=template&id=2502a484& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "container pad-bottom" },
    [
      _c(
        "SmallPage",
        [
          _c("StatusScreen", {
            attrs: {
              title: _vm.title,
              status: _vm.status,
              state: _vm.state,
              message: _vm.message,
              mainAction: _vm.$t('198'),
              alternativeAction: _vm.$t('51'),
              lightBlue: ""
            },
            on: { "main-action": _vm.reload, "alternative-action": _vm.cancel }
          }),
          _c("Network", { ref: "network", attrs: { visible: false } })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardExternal.vue?vue&type=style&index=0&id=3e26ff11&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutCardExternal.vue?vue&type=style&index=0&id=3e26ff11&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.currency-info h1[data-v-3e26ff11] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    margin-bottom: 0;\n}\n.currency-info img[data-v-3e26ff11],\n.currency-info .nq-icon[data-v-3e26ff11] {\n    width: 4.5rem;\n    height: 4.5rem;\n    margin-right: 2rem;\n}\n.payment-option .nq-card-wrapper[data-v-3e26ff11] {\n    position: relative;\n    -webkit-perspective: 250rem;\n            perspective: 250rem;\n}\n.nq-card-wrapper > .transition-flip-enter-active[data-v-3e26ff11] .info-line .arrow-runway *,\n.nq-card-wrapper > .transition-flip-leave-active[data-v-3e26ff11] .info-line .arrow-runway * {\n    -webkit-animation: unset;\n            animation: unset; /* avoid unnecessary rendering layers caused by arrow animation which mess with the flip */\n}\n.status-screen[data-v-3e26ff11] {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: calc(100% - 2 * var(--status-screen-margin));\n    -webkit-transition: opacity .3s var(--nimiq-ease);\n    transition: opacity .3s var(--nimiq-ease);\n    pointer-events: all;\n}\n.status-screen[data-v-3e26ff11] > * {\n    /* cover card in background in margin area */\n    -webkit-box-shadow: 0 0 0 calc(var(--status-screen-margin) + 1px) white;\n            box-shadow: 0 0 0 calc(var(--status-screen-margin) + 1px) white;\n}\n.status-screen .stopwatch-icon[data-v-3e26ff11] {\n    font-size: 15.5rem;\n}\n.status-screen .under-payment-icon[data-v-3e26ff11] {\n    font-size: 18.75rem;\n}\n.payment-option .small-page[data-v-3e26ff11] {\n    width: 52.5rem;\n    margin: 0;\n}\n.payment-option .page-body[data-v-3e26ff11] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    padding-top: 0;\n    padding-bottom: 0;\n    text-align: center;\n    overflow: hidden;\n}\n.payment-option .page-body .nq-h1[data-v-3e26ff11] {\n    margin-bottom: 0;\n    margin-top: 0;\n}\n.payment-option .warning[data-v-3e26ff11] {\n    margin-top: 1.25rem;\n    margin-bottom: 0;\n}\n.payment-option .qr-code[data-v-3e26ff11] {\n    margin: 2rem auto;\n    min-height: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n\n/* Hide payment info line contents until currency selected. Only show timer. */\n.payment-option .info-line[data-v-3e26ff11] > :not(.timer):not(.amounts) {\n    -webkit-transition: opacity .5s var(--nimiq-ease);\n    transition: opacity .5s var(--nimiq-ease);\n}\n.payment-option:not(.confirmed) .info-line[data-v-3e26ff11] > :not(.timer):not(.amounts) {\n    opacity: 0;\n    pointer-events: none;\n}\n.payment-option:not(.confirmed) .info-line[data-v-3e26ff11] > .arrow-runway * {\n    -webkit-animation: unset;\n            animation: unset; /* disable animation while hidden to avoid unnecessary rendering layers */\n}\n.payment-option .small-page[data-v-3e26ff11] {\n    width: 52.5rem;\n}\n.payment-option .account[data-v-3e26ff11],\n.payment-option .account[data-v-3e26ff11] .identicon-and-label {\n    width: 100%;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n.payment-option .account[data-v-3e26ff11] .identicon-and-label .identicon {\n    width: 21rem;\n    height: 21rem;\n}\n.payment-option .account[data-v-3e26ff11] .identicon-and-label .label {\n    max-width: 100%;\n    font-weight: 600;\n    font-size: 3.5rem;\n    line-height: 4rem;\n    margin-top: 2.75rem;\n    text-overflow: fade;\n}\n.payment-option .amounts[data-v-3e26ff11] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    width: 100%;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    border-top: 0.125rem solid rgba(31, 35, 72, 0.1); /* based on nq-dark-blue */\n}\n.payment-option .amounts .crypto[data-v-3e26ff11] {\n    margin-top: 3.5rem;\n    font-weight: 600;\n    font-size: 5rem;\n    line-height: 1;\n}\n.payment-option .amounts .crypto.reduced-top[data-v-3e26ff11] {\n    margin-top: 2rem;\n}\n.payment-option .amounts .fee[data-v-3e26ff11] {\n    margin-top: 1.75rem;\n    font-size: 2rem;\n    line-height: 2.75rem;\n}\n.page-footer[data-v-3e26ff11] {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.page-footer .nq-button[data-v-3e26ff11] {\n    margin: 2rem 4.75rem 2rem;\n    -webkit-box-sizing: content-box;\n            box-sizing: content-box;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: space-evenly;\n        -ms-flex-pack: space-evenly;\n            justify-content: space-evenly;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    --padding: .625rem;\n    padding-top: var(--padding);\n    padding-bottom: var(--padding);\n}\n.page-footer .nq-link[data-v-3e26ff11] {\n    -ms-flex-item-align: center;\n        align-self: center;\n    color:  rgba(31, 35, 72, 0.5);\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    margin: 0 0 1rem;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    text-decoration: none;\n    outline: none;\n}\n.page-footer .nq-link > .nq-icon[data-v-3e26ff11] {\n    --icon-size: 1.2rem;\n    height: var(--icon-size);\n    width: var(--icon-size);\n    -webkit-transition: -webkit-transform .3s var(--nimiq-ease);\n    transition: -webkit-transform .3s var(--nimiq-ease);\n    transition: transform .3s var(--nimiq-ease);\n    transition: transform .3s var(--nimiq-ease), -webkit-transform .3s var(--nimiq-ease);\n}\n.page-footer .nq-link[data-v-3e26ff11]:focus {\n    text-decoration: underline;\n}\n.page-footer .nq-link:hover > .nq-icon[data-v-3e26ff11],\n.page-footer .nq-link:focus > .nq-icon[data-v-3e26ff11] {\n    -webkit-transform: translateX(.25rem);\n            transform: translateX(.25rem);\n}\n.use-app-button > span[data-v-3e26ff11] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    line-height: 1;\n}\n.use-app-button > span + span[data-v-3e26ff11] {\n    font-size: 1.625rem;\n    text-transform: none;\n    letter-spacing: normal;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardNimiq.vue?vue&type=style&index=0&id=c1244e38&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutCardNimiq.vue?vue&type=style&index=0&id=c1244e38&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.small-page[data-v-c1244e38] {\n    position: relative;\n    width: 52.5rem;\n    margin: 0;\n}\n.status-screen[data-v-c1244e38] {\n    position: absolute;\n    left: 0;\n    top: 0;\n    -webkit-transition: opacity .3s var(--nimiq-ease);\n    transition: opacity .3s var(--nimiq-ease);\n}\n.status-screen .stopwatch-icon[data-v-c1244e38] {\n    font-size: 15.5rem;\n}\n.status-screen .under-payment-icon[data-v-c1244e38] {\n    font-size: 18.75rem;\n}\n.nq-h1[data-v-c1244e38] {\n    margin-top: 3.5rem;\n    margin-bottom: 1rem;\n    line-height: 1;\n    text-align: center;\n    white-space: pre-line\n}\n.video-container[data-v-c1244e38] {\n    position: relative;\n    padding: 0;\n    margin: 3rem 1rem 0 1rem;\n    border-radius: .5rem;\n    background: var(--nimiq-gray);\n}\n.video-container > video[data-v-c1244e38] {\n    position: absolute;\n    height: 100%;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n}\n.safe-onboarding-link[data-v-c1244e38] {\n    margin-bottom: .25rem;\n    -ms-flex-item-align: center;\n        align-self: center;\n    font-size: 2rem;\n    font-weight: bold;\n    text-decoration: none;\n    outline: none;\n}\n.safe-onboarding-link .nq-icon[data-v-c1244e38] {\n    margin-left: .875rem;\n    font-size: 1.5rem;\n    -webkit-transition: -webkit-transform .3s var(--nimiq-ease);\n    transition: -webkit-transform .3s var(--nimiq-ease);\n    transition: transform .3s var(--nimiq-ease);\n    transition: transform .3s var(--nimiq-ease), -webkit-transform .3s var(--nimiq-ease);\n}\n.safe-onboarding-link[data-v-c1244e38]:focus {\n    text-decoration: underline;\n}\n.safe-onboarding-link:hover .nq-icon[data-v-c1244e38],\n.safe-onboarding-link:focus .nq-icon[data-v-c1244e38] {\n    -webkit-transform: translateX(.25rem);\n            transform: translateX(.25rem);\n}\n.non-sufficient-balance[data-v-c1244e38] {\n    text-align: center;\n    margin-top: 0.5rem;\n    margin-bottom: 0.5rem;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.non-sufficient-balance .nq-text[data-v-c1244e38] {\n    opacity: 1;\n    font-weight: 600;\n}\n.non-sufficient-balance .nq-button-pill[data-v-c1244e38] {\n    color: white;\n    line-height: 3.375rem;\n}\n.non-sufficient-balance .nq-icon[data-v-c1244e38] {\n    font-size: 2.25rem;\n    vertical-align: text-bottom;\n}\n.page-footer[data-v-c1244e38] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    padding: 3rem;\n}\n.page-footer.minimal[data-v-c1244e38] {\n    padding: 0 3rem 3rem;\n}\n.page-footer .external-wallet[data-v-c1244e38] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.page-footer .external-wallet .nq-icon[data-v-c1244e38] {\n    width: 2.25rem;\n    height: 2.25rem;\n    margin: 0 1rem 0 0.5rem;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutManualPaymentDetails.vue?vue&type=style&index=0&id=e34d0d50&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutManualPaymentDetails.vue?vue&type=style&index=0&id=e34d0d50&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.page-body[data-v-e34d0d50] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.page-body[data-v-e34d0d50] p {\n    -ms-flex-preferred-size: 9rem;\n        flex-basis: 9rem;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n}\n.page-header[data-v-e34d0d50] {\n    padding-top: 2rem;\n    padding-bottom: 2rem;\n}\n.copyable-field[data-v-e34d0d50] {\n    margin-top: .5rem;\n}\n.page-header[data-v-e34d0d50] h1.nq-h1 {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.nq-notice[data-v-e34d0d50] {\n    margin: 0;\n    text-align: center;\n}\n@media (max-width: 375px) {\n.page-header[data-v-e34d0d50] h1.nq-h1 {\n        font-size: 2.5rem;\n        line-height: 3.25rem;\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CurrencyInfo.vue?vue&type=style&index=0&id=0e0ca50f&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CurrencyInfo.vue?vue&type=style&index=0&id=0e0ca50f&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.currency-info h1[data-v-0e0ca50f] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    margin-bottom: 0 !important;\n    padding-bottom: 1.5rem; /* use padding instead of rem to make gap clickable */\n    text-transform: uppercase;\n    font-size: 3.375rem;\n}\n.currency-info img[data-v-0e0ca50f],\n.currency-info .nq-icon[data-v-0e0ca50f] {\n    height: 4.5rem;\n    margin-right: 2rem;\n}\n.currency-info .nq-icon[data-v-0e0ca50f] {\n    width: 4.5rem;\n}\n.currency-info p[data-v-0e0ca50f] {\n    margin-top: 0;\n    margin-bottom: 3.25rem;\n    font-size: 2.5rem;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Checkout.vue?vue&type=style&index=0&id=e9bc6700&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Checkout.vue?vue&type=style&index=0&id=e9bc6700&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.container[data-v-e9bc6700] {\n    margin-top: -2rem; /* to get a bit more space for the long checkout page */\n}\n.container .spacer[data-v-e9bc6700] {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1; /* spacer for content distribution instead of margin which is used for disabled carousel offset */\n}\n.container[data-v-e9bc6700] .nq-h1 {\n    margin-top: 3.5rem;\n    margin-bottom: 1rem;\n    line-height: 1.2;\n    text-align: center;\n}\n.carousel[data-v-e9bc6700] {\n    --currency-info-height: 0rem;\n\n    width: 100vw;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    padding: 0;\n    overflow: hidden;\n    -webkit-transition: margin-top 1s var(--nimiq-ease);\n    transition: margin-top 1s var(--nimiq-ease);\n}\n.carousel.disabled.has-currency-info[data-v-e9bc6700] {\n    --currency-info-height: 16rem;\n    margin-top: calc(-1 * var(--currency-info-height));\n}\n.carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card {\n    -webkit-transition: -webkit-transform .5s cubic-bezier(.67, 0, .16, 1);\n    transition: -webkit-transform .5s cubic-bezier(.67, 0, .16, 1);\n    transition: transform .5s cubic-bezier(.67, 0, .16, 1);\n    transition: transform .5s cubic-bezier(.67, 0, .16, 1), -webkit-transform .5s cubic-bezier(.67, 0, .16, 1);\n}\n.carousel[data-v-e9bc6700] > :not(.selected) .left .nq-card {\n    -webkit-transform: translateX(8rem);\n            transform: translateX(8rem);\n}\n.carousel[data-v-e9bc6700] > :not(.selected) .right .nq-card {\n    -webkit-transform: translateX(-8rem);\n            transform: translateX(-8rem);\n}\n.carousel[data-v-e9bc6700] .payment-option {\n    padding-bottom: 5rem;\n}\n.carousel[data-v-e9bc6700] .currency-info {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n\n    --currency-info-translate-y: -8.875rem;\n    -webkit-transition:\n        opacity .25s var(--nimiq-ease),\n        -webkit-transform .5s cubic-bezier(.67,0,.16,1);\n    transition:\n        opacity .25s var(--nimiq-ease),\n        -webkit-transform .5s cubic-bezier(.67,0,.16,1);\n    transition:\n        transform .5s cubic-bezier(.67,0,.16,1),\n        opacity .25s var(--nimiq-ease);\n    transition:\n        transform .5s cubic-bezier(.67,0,.16,1),\n        opacity .25s var(--nimiq-ease),\n        -webkit-transform .5s cubic-bezier(.67,0,.16,1);\n    -webkit-transform: scale(1) translateY(0);\n            transform: scale(1) translateY(0);\n}\n.carousel[data-v-e9bc6700] > :not(.selected) .currency-info {\n    -webkit-transform: scale(1) translateY(var(--currency-info-translate-y));\n            transform: scale(1) translateY(var(--currency-info-translate-y));\n}\n.carousel.disabled[data-v-e9bc6700] .currency-info {\n    opacity: 0;\n}\n.carousel.disabled[data-v-e9bc6700] .currency-info * {\n    pointer-events: none !important;\n}\n\n/* Mobile Layout */\n@media (max-width: 500px) {\n.carousel.has-currency-info[data-v-e9bc6700] {\n        --currency-info-height: 10rem;\n}\n.carousel[data-v-e9bc6700] * {\n        -webkit-tap-highlight-color: transparent;\n}\n.carousel[data-v-e9bc6700] .payment-option {\n        padding-bottom: 3rem;\n}\n.carousel[data-v-e9bc6700] .currency-info {\n        --currency-info-mobile-scale: .8;\n        -webkit-transform:\n            scale(var(--currency-info-mobile-scale))\n            translateY(calc(var(--currency-info-translate-y) / -5));\n                transform:\n            scale(var(--currency-info-mobile-scale))\n            translateY(calc(var(--currency-info-translate-y) / -5));\n}\n.carousel[data-v-e9bc6700] > :not(.selected) .currency-info {\n        -webkit-transform:\n            scale(var(--currency-info-mobile-scale))\n            translateY(var(--currency-info-translate-y));\n                transform:\n            scale(var(--currency-info-mobile-scale))\n            translateY(var(--currency-info-translate-y));\n}\n.carousel[data-v-e9bc6700] > :not(.selected) .left .currency-info {\n        -webkit-transform:\n            scale(var(--currency-info-mobile-scale))\n            translateY(var(--currency-info-translate-y))\n            translateX(8rem);\n                transform:\n            scale(var(--currency-info-mobile-scale))\n            translateY(var(--currency-info-translate-y))\n            translateX(8rem);\n}\n.carousel[data-v-e9bc6700] > :not(.selected) .right .currency-info {\n        -webkit-transform:\n            scale(var(--currency-info-mobile-scale))\n            translateY(var(--currency-info-translate-y))\n            translateX(-8rem);\n                transform:\n            scale(var(--currency-info-mobile-scale))\n            translateY(var(--currency-info-translate-y))\n            translateX(-8rem);\n}\n.carousel[data-v-e9bc6700] .currency-info .nq-h1 {\n        margin-top: 0;\n}\n}\n@media (max-width: 450px) {\n.carousel[data-v-e9bc6700] {\n        /* On mobile align currency infos via perspective as the positioning of the background cards doesn't really\n        matter and alignment via translations would be too complicated as they depend on the card width and height\n        which vary on mobile. */\n        -webkit-perspective-origin: 50% calc(var(--currency-info-height) + 2rem);\n                perspective-origin: 50% calc(var(--currency-info-height) + 2rem);\n}\n.carousel[data-v-e9bc6700] .payment-option {\n        padding-bottom: 0;\n}\n.carousel[data-v-e9bc6700] .nq-card {\n        width: 100vw;\n        max-width: none;\n        margin: 0;\n}\n.carousel[data-v-e9bc6700] .currency-info {\n        --currency-info-translate-y: -.9rem;\n}\n\n    /* Make cards full height on mobile */\n.carousel[data-v-e9bc6700] .nq-card {\n        --ios-bottom-bar-height: 0px;\n        /* 56px for mobile browser address bar */\n        /* 7.5rem for Nimiq logo & cancel button */\n        --available-mobile-height: calc(100vh - 7.5rem - 56px - var(--ios-bottom-bar-height));\n        /* 1.5rem for additional padding to header */\n        height: calc(var(--available-mobile-height) - var(--currency-info-height) - 1.5rem);\n        min-height: 70.5rem;\n}\n\n    /* IOS specific */\n.carousel.ios[data-v-e9bc6700] .nq-card {\n        --ios-bottom-bar-height: 74px;\n}\n.carousel.ios[data-v-e9bc6700] .currency-info {\n        --currency-info-translate-y: -50px;\n}\n.carousel[data-v-e9bc6700] .confirmed .nq-card {\n        height: var(--available-mobile-height);\n}\n\n    /* make carousel bottom align on mobile */\n.carousel ~ .spacer[data-v-e9bc6700] {\n        display: none;\n}\n}\n\n/* make empty padding in cards click through to cards behind */\n.carousel[data-v-e9bc6700] > * {\n    pointer-events: none;\n}\n.carousel[data-v-e9bc6700] .currency-info > *,\n.carousel[data-v-e9bc6700] .nq-card {\n    pointer-events: all !important;\n}\n\n/* On desktop show placeholders when card is not selected */\n@media (min-width: 451px) {\n.carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .timer,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-button,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-button-s,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-button-pill,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card > .nq-h1,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .info-line .account,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .info-line .amounts,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-body .label,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-body .amounts .crypto,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-body .amounts .fee,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .account-list .amount,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-footer .nq-link,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .account-selector .wallet-label,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-body .identicon-and-label,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .account-list .identicon-and-label > *,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card .non-sufficient-balance .nq-text {\n        position: relative;\n}\n.carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-button::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-button-s::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-button-pill::after {\n        -webkit-transition: all .5s var(--nimiq-ease);\n        transition: all .5s var(--nimiq-ease);\n}\n.carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .timer::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-button::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-button-s::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-button-pill::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card > .nq-h1::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .info-line .account::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .info-line .amounts::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-body .label::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-body .amounts .crypto::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-body .amounts .fee::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .account-list .amount::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-footer .nq-link::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .account-selector .wallet-label::before,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-body .identicon-and-label::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .account-list .identicon-and-label > *::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card .non-sufficient-balance .nq-text::after {\n        --placeholder-size: 100%;\n        --placeholder-width: var(--placeholder-size);\n        --placeholder-height: var(--placeholder-size);\n        content: '';\n        position: absolute;\n        top: calc((100% - var(--placeholder-height)) / 2);\n        left: calc((100% - var(--placeholder-width)) / 2);\n        width: var(--placeholder-width);\n        height: var(--placeholder-height);\n        background-color: #f2f2f4; /* --nimiq-blue 0.06 opacity */\n        opacity: 0;\n        border: none;\n        border-radius: 500px;\n        z-index: 2;\n        -webkit-transition: all .5s var(--nimiq-ease);\n        transition: all .5s var(--nimiq-ease);\n}\n.carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card > .nq-h1::after {\n        --placeholder-width: 85%;\n        -webkit-box-shadow: 0 0 0 5rem var(--nimiq-card-bg);\n                box-shadow: 0 0 0 5rem var(--nimiq-card-bg);\n}\n.carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .info-line .amounts::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .info-line .account::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .account-selector .wallet-label::before {\n        --placeholder-height: 3.25rem;\n        -webkit-box-shadow: 0 0 0 1rem var(--nimiq-card-bg);\n                box-shadow: 0 0 0 1rem var(--nimiq-card-bg);\n}\n.carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .info-line .account::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .account-selector .wallet-label::before {\n        top: initial;\n}\n.carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .timer::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-button::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-button-s::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-button-pill::after {\n        --placeholder-size: 105%;\n}\n.carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-body .identicon-and-label::after {\n        --placeholder-size: 21rem;\n        top: initial;\n        left: initial;\n        -webkit-box-shadow: 0 0 0 4rem var(--nimiq-card-bg);\n                box-shadow: 0 0 0 4rem var(--nimiq-card-bg);\n}\n.carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card .non-sufficient-balance .nq-text::after {\n        --placeholder-width: 90%;\n}\n.carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-body .label::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-body .amounts .crypto::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card-footer .nq-link::after,\n    .carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card .non-sufficient-balance .nq-text::after {\n        -webkit-box-shadow: 0 0 0 .6rem var(--nimiq-card-bg);\n                box-shadow: 0 0 0 .6rem var(--nimiq-card-bg);\n}\n.carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .timer::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-button::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-button-s::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-button-pill::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-card > .nq-h1::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .info-line .account::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .info-line .amounts::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-card-body .label::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .account-list .amount::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-card-body .amounts .crypto::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-card-body .amounts .fee::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-card-footer .nq-link::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .account-selector .wallet-label::before,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-card-body .identicon-and-label::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .account-list .identicon-and-label > *::after,\n    .carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-card .non-sufficient-balance .nq-text::after {\n        opacity: 1;\n}\n.carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .amounts {\n        -webkit-transition: border-top-color .5s var(--nimiq-ease);\n        transition: border-top-color .5s var(--nimiq-ease);\n        border-top-color: var(--nimiq-card-bg);\n}\n.carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .arrow-runway {\n        -webkit-transition: opacity .5s var(--nimiq-ease);\n        transition: opacity .5s var(--nimiq-ease);\n        opacity: 0;\n}\n.carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .arrow-runway * {\n        -webkit-animation: unset;\n                animation: unset; /* disable animation in background to avoid unnecessary rendering layers */\n}\n.carousel[data-v-e9bc6700] .payment-option:not(.confirmed) .nq-card > .nq-h1 {\n        overflow: hidden;\n}\n.carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) .nq-button {\n        -webkit-transition: -webkit-box-shadow .5s var(--nimiq-ease);\n        transition: -webkit-box-shadow .5s var(--nimiq-ease);\n        transition: box-shadow .5s var(--nimiq-ease);\n        transition: box-shadow .5s var(--nimiq-ease), -webkit-box-shadow .5s var(--nimiq-ease);\n        -webkit-box-shadow: none;\n                box-shadow: none;\n}\n.carousel[data-v-e9bc6700] .payment-option:not(.confirmed) video {\n        -webkit-transition: opacity .5s var(--nimiq-ease);\n        transition: opacity .5s var(--nimiq-ease);\n}\n.carousel[data-v-e9bc6700] > :not(.selected) .payment-option:not(.confirmed) video {\n        opacity: 0;\n}\n}\n.global-close[data-v-e9bc6700] {\n    margin-top: 0;\n}\n.disclaimer[data-v-e9bc6700] {\n    -webkit-transition: opacity .3s var(--nimiq-ease), max-height .3s var(--nimiq-ease);\n    transition: opacity .3s var(--nimiq-ease), max-height .3s var(--nimiq-ease);\n}\n.disclaimer[data-v-e9bc6700]:not(.bottom-overlay) {\n    margin-bottom: 1rem;\n    color: #1f234859; /* nimiq-blue with .35 opacity */\n    font-size: 1.5rem;\n    line-height: 1.3;\n    font-weight: 600;\n    text-align: center;\n    overflow: hidden;\n}\n.disclaimer.transition-disclaimer-enter[data-v-e9bc6700],\n.disclaimer.transition-disclaimer-leave-to[data-v-e9bc6700] {\n    opacity: 0;\n}\n.disclaimer:not(.bottom-overlay).transition-disclaimer-enter[data-v-e9bc6700],\n.disclaimer:not(.bottom-overlay).transition-disclaimer-leave-to[data-v-e9bc6700] {\n    max-height: 0;\n}\n.disclaimer:not(.bottom-overlay).transition-disclaimer-enter-to[data-v-e9bc6700],\n.disclaimer:not(.bottom-overlay).transition-disclaimer-leave[data-v-e9bc6700] {\n    max-height: 4.625rem; /* Height of ~2.5 lines at which transition looks decent for 2 and 3 disclaimer lines */\n}\n.disclaimer > strong[data-v-e9bc6700] {\n    font-weight: bold;\n    line-height: 1;\n    letter-spacing: .1rem;\n    text-transform: uppercase;\n}\n.disclaimer.bottom-overlay > strong[data-v-e9bc6700] {\n    font-size: 1.75rem;\n    letter-spacing: .125rem;\n    opacity: .5;\n}\n@media (max-width: 1800px) {\n.disclaimer.long-disclaimer[data-v-e9bc6700]:not(.bottom-overlay) {\n        max-width: 115rem; /* break long disclaimer into 2 lines about equal in length (e.g. French) */\n        margin-bottom: 1.5rem;\n}\n}\n@media (max-width: 1400px) {\n.disclaimer[data-v-e9bc6700]:not(.long-disclaimer):not(.bottom-overlay) {\n        max-width: 92rem; /* break short disclaimer into 2 lines about equal in length (e.g. English) */\n        margin-bottom: 1.5rem;\n}\n}\n@media (max-width: 1000px) {\n.disclaimer.long-disclaimer[data-v-e9bc6700]:not(.bottom-overlay) {\n        /* make more space when long disclaimer breaks into 3 lines (e.g. French) */\n        margin-top: -.5rem;\n        margin-bottom: 1rem;\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardExternal.vue?vue&type=style&index=0&id=3e26ff11&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutCardExternal.vue?vue&type=style&index=0&id=3e26ff11&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutCardExternal.vue?vue&type=style&index=0&id=3e26ff11&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardExternal.vue?vue&type=style&index=0&id=3e26ff11&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("e09f7ccc", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardNimiq.vue?vue&type=style&index=0&id=c1244e38&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutCardNimiq.vue?vue&type=style&index=0&id=c1244e38&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutCardNimiq.vue?vue&type=style&index=0&id=c1244e38&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardNimiq.vue?vue&type=style&index=0&id=c1244e38&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("2d8c04ac", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutManualPaymentDetails.vue?vue&type=style&index=0&id=e34d0d50&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CheckoutManualPaymentDetails.vue?vue&type=style&index=0&id=e34d0d50&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutManualPaymentDetails.vue?vue&type=style&index=0&id=e34d0d50&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutManualPaymentDetails.vue?vue&type=style&index=0&id=e34d0d50&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("7fa04471", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CurrencyInfo.vue?vue&type=style&index=0&id=0e0ca50f&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CurrencyInfo.vue?vue&type=style&index=0&id=0e0ca50f&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CurrencyInfo.vue?vue&type=style&index=0&id=0e0ca50f&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CurrencyInfo.vue?vue&type=style&index=0&id=0e0ca50f&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("5ed57bf6", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Checkout.vue?vue&type=style&index=0&id=e9bc6700&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Checkout.vue?vue&type=style&index=0&id=e9bc6700&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Checkout.vue?vue&type=style&index=0&id=e9bc6700&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Checkout.vue?vue&type=style&index=0&id=e9bc6700&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("b8e8af08", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/CheckoutCard.vue":
/*!*****************************************!*\
  !*** ./src/components/CheckoutCard.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckoutCard_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckoutCard.vue?vue&type=script&lang=ts& */ "./src/components/CheckoutCard.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _CheckoutCard_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CheckoutCard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/CheckoutCard.vue?vue&type=script&lang=ts&":
/*!******************************************************************!*\
  !*** ./src/components/CheckoutCard.vue?vue&type=script&lang=ts& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCard_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutCard.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCard.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCard_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/CheckoutCardBitcoin.vue":
/*!************************************************!*\
  !*** ./src/components/CheckoutCardBitcoin.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckoutCardBitcoin_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckoutCardBitcoin.vue?vue&type=script&lang=ts& */ "./src/components/CheckoutCardBitcoin.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _CheckoutCardBitcoin_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CheckoutCardBitcoin.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/CheckoutCardBitcoin.vue?vue&type=script&lang=ts&":
/*!*************************************************************************!*\
  !*** ./src/components/CheckoutCardBitcoin.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardBitcoin_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutCardBitcoin.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardBitcoin.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardBitcoin_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/CheckoutCardEthereum.vue":
/*!*************************************************!*\
  !*** ./src/components/CheckoutCardEthereum.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckoutCardEthereum_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckoutCardEthereum.vue?vue&type=script&lang=ts& */ "./src/components/CheckoutCardEthereum.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _CheckoutCardEthereum_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CheckoutCardEthereum.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/CheckoutCardEthereum.vue?vue&type=script&lang=ts&":
/*!**************************************************************************!*\
  !*** ./src/components/CheckoutCardEthereum.vue?vue&type=script&lang=ts& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardEthereum_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutCardEthereum.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardEthereum.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardEthereum_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/CheckoutCardExternal.vue":
/*!*************************************************!*\
  !*** ./src/components/CheckoutCardExternal.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckoutCardExternal_vue_vue_type_template_id_3e26ff11_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckoutCardExternal.vue?vue&type=template&id=3e26ff11&scoped=true& */ "./src/components/CheckoutCardExternal.vue?vue&type=template&id=3e26ff11&scoped=true&");
/* harmony import */ var _CheckoutCardExternal_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckoutCardExternal.vue?vue&type=script&lang=ts& */ "./src/components/CheckoutCardExternal.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _CheckoutCardExternal_vue_vue_type_style_index_0_id_3e26ff11_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckoutCardExternal.vue?vue&type=style&index=0&id=3e26ff11&scoped=true&lang=css& */ "./src/components/CheckoutCardExternal.vue?vue&type=style&index=0&id=3e26ff11&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CheckoutCardExternal_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CheckoutCardExternal_vue_vue_type_template_id_3e26ff11_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CheckoutCardExternal_vue_vue_type_template_id_3e26ff11_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3e26ff11",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CheckoutCardExternal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/CheckoutCardExternal.vue?vue&type=script&lang=ts&":
/*!**************************************************************************!*\
  !*** ./src/components/CheckoutCardExternal.vue?vue&type=script&lang=ts& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardExternal_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutCardExternal.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardExternal.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardExternal_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/CheckoutCardExternal.vue?vue&type=style&index=0&id=3e26ff11&scoped=true&lang=css&":
/*!**********************************************************************************************************!*\
  !*** ./src/components/CheckoutCardExternal.vue?vue&type=style&index=0&id=3e26ff11&scoped=true&lang=css& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardExternal_vue_vue_type_style_index_0_id_3e26ff11_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutCardExternal.vue?vue&type=style&index=0&id=3e26ff11&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardExternal.vue?vue&type=style&index=0&id=3e26ff11&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardExternal_vue_vue_type_style_index_0_id_3e26ff11_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardExternal_vue_vue_type_style_index_0_id_3e26ff11_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardExternal_vue_vue_type_style_index_0_id_3e26ff11_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardExternal_vue_vue_type_style_index_0_id_3e26ff11_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardExternal_vue_vue_type_style_index_0_id_3e26ff11_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/CheckoutCardExternal.vue?vue&type=template&id=3e26ff11&scoped=true&":
/*!********************************************************************************************!*\
  !*** ./src/components/CheckoutCardExternal.vue?vue&type=template&id=3e26ff11&scoped=true& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardExternal_vue_vue_type_template_id_3e26ff11_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutCardExternal.vue?vue&type=template&id=3e26ff11&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardExternal.vue?vue&type=template&id=3e26ff11&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardExternal_vue_vue_type_template_id_3e26ff11_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardExternal_vue_vue_type_template_id_3e26ff11_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/CheckoutCardNimiq.vue":
/*!**********************************************!*\
  !*** ./src/components/CheckoutCardNimiq.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckoutCardNimiq_vue_vue_type_template_id_c1244e38_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckoutCardNimiq.vue?vue&type=template&id=c1244e38&scoped=true& */ "./src/components/CheckoutCardNimiq.vue?vue&type=template&id=c1244e38&scoped=true&");
/* harmony import */ var _CheckoutCardNimiq_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckoutCardNimiq.vue?vue&type=script&lang=ts& */ "./src/components/CheckoutCardNimiq.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _CheckoutCardNimiq_vue_vue_type_style_index_0_id_c1244e38_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckoutCardNimiq.vue?vue&type=style&index=0&id=c1244e38&scoped=true&lang=css& */ "./src/components/CheckoutCardNimiq.vue?vue&type=style&index=0&id=c1244e38&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CheckoutCardNimiq_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CheckoutCardNimiq_vue_vue_type_template_id_c1244e38_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CheckoutCardNimiq_vue_vue_type_template_id_c1244e38_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "c1244e38",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CheckoutCardNimiq.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/CheckoutCardNimiq.vue?vue&type=script&lang=ts&":
/*!***********************************************************************!*\
  !*** ./src/components/CheckoutCardNimiq.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardNimiq_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutCardNimiq.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardNimiq.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardNimiq_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/CheckoutCardNimiq.vue?vue&type=style&index=0&id=c1244e38&scoped=true&lang=css&":
/*!*******************************************************************************************************!*\
  !*** ./src/components/CheckoutCardNimiq.vue?vue&type=style&index=0&id=c1244e38&scoped=true&lang=css& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardNimiq_vue_vue_type_style_index_0_id_c1244e38_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutCardNimiq.vue?vue&type=style&index=0&id=c1244e38&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardNimiq.vue?vue&type=style&index=0&id=c1244e38&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardNimiq_vue_vue_type_style_index_0_id_c1244e38_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardNimiq_vue_vue_type_style_index_0_id_c1244e38_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardNimiq_vue_vue_type_style_index_0_id_c1244e38_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardNimiq_vue_vue_type_style_index_0_id_c1244e38_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardNimiq_vue_vue_type_style_index_0_id_c1244e38_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/CheckoutCardNimiq.vue?vue&type=template&id=c1244e38&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./src/components/CheckoutCardNimiq.vue?vue&type=template&id=c1244e38&scoped=true& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardNimiq_vue_vue_type_template_id_c1244e38_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutCardNimiq.vue?vue&type=template&id=c1244e38&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardNimiq.vue?vue&type=template&id=c1244e38&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardNimiq_vue_vue_type_template_id_c1244e38_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardNimiq_vue_vue_type_template_id_c1244e38_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/CheckoutCardNimiqExternal.vue":
/*!******************************************************!*\
  !*** ./src/components/CheckoutCardNimiqExternal.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckoutCardNimiqExternal_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckoutCardNimiqExternal.vue?vue&type=script&lang=ts& */ "./src/components/CheckoutCardNimiqExternal.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _CheckoutCardNimiqExternal_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CheckoutCardNimiqExternal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/CheckoutCardNimiqExternal.vue?vue&type=script&lang=ts&":
/*!*******************************************************************************!*\
  !*** ./src/components/CheckoutCardNimiqExternal.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardNimiqExternal_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutCardNimiqExternal.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutCardNimiqExternal.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutCardNimiqExternal_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/CheckoutManualPaymentDetails.vue":
/*!*********************************************************!*\
  !*** ./src/components/CheckoutManualPaymentDetails.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckoutManualPaymentDetails_vue_vue_type_template_id_e34d0d50_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckoutManualPaymentDetails.vue?vue&type=template&id=e34d0d50&scoped=true& */ "./src/components/CheckoutManualPaymentDetails.vue?vue&type=template&id=e34d0d50&scoped=true&");
/* harmony import */ var _CheckoutManualPaymentDetails_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckoutManualPaymentDetails.vue?vue&type=script&lang=ts& */ "./src/components/CheckoutManualPaymentDetails.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _CheckoutManualPaymentDetails_vue_vue_type_style_index_0_id_e34d0d50_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckoutManualPaymentDetails.vue?vue&type=style&index=0&id=e34d0d50&scoped=true&lang=css& */ "./src/components/CheckoutManualPaymentDetails.vue?vue&type=style&index=0&id=e34d0d50&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CheckoutManualPaymentDetails_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CheckoutManualPaymentDetails_vue_vue_type_template_id_e34d0d50_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CheckoutManualPaymentDetails_vue_vue_type_template_id_e34d0d50_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "e34d0d50",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CheckoutManualPaymentDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/CheckoutManualPaymentDetails.vue?vue&type=script&lang=ts&":
/*!**********************************************************************************!*\
  !*** ./src/components/CheckoutManualPaymentDetails.vue?vue&type=script&lang=ts& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutManualPaymentDetails_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutManualPaymentDetails.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutManualPaymentDetails.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutManualPaymentDetails_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/CheckoutManualPaymentDetails.vue?vue&type=style&index=0&id=e34d0d50&scoped=true&lang=css&":
/*!******************************************************************************************************************!*\
  !*** ./src/components/CheckoutManualPaymentDetails.vue?vue&type=style&index=0&id=e34d0d50&scoped=true&lang=css& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutManualPaymentDetails_vue_vue_type_style_index_0_id_e34d0d50_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutManualPaymentDetails.vue?vue&type=style&index=0&id=e34d0d50&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutManualPaymentDetails.vue?vue&type=style&index=0&id=e34d0d50&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutManualPaymentDetails_vue_vue_type_style_index_0_id_e34d0d50_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutManualPaymentDetails_vue_vue_type_style_index_0_id_e34d0d50_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutManualPaymentDetails_vue_vue_type_style_index_0_id_e34d0d50_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutManualPaymentDetails_vue_vue_type_style_index_0_id_e34d0d50_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutManualPaymentDetails_vue_vue_type_style_index_0_id_e34d0d50_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/CheckoutManualPaymentDetails.vue?vue&type=template&id=e34d0d50&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./src/components/CheckoutManualPaymentDetails.vue?vue&type=template&id=e34d0d50&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutManualPaymentDetails_vue_vue_type_template_id_e34d0d50_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutManualPaymentDetails.vue?vue&type=template&id=e34d0d50&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CheckoutManualPaymentDetails.vue?vue&type=template&id=e34d0d50&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutManualPaymentDetails_vue_vue_type_template_id_e34d0d50_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutManualPaymentDetails_vue_vue_type_template_id_e34d0d50_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/CurrencyInfo.vue":
/*!*****************************************!*\
  !*** ./src/components/CurrencyInfo.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CurrencyInfo_vue_vue_type_template_id_0e0ca50f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CurrencyInfo.vue?vue&type=template&id=0e0ca50f&scoped=true& */ "./src/components/CurrencyInfo.vue?vue&type=template&id=0e0ca50f&scoped=true&");
/* harmony import */ var _CurrencyInfo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CurrencyInfo.vue?vue&type=script&lang=ts& */ "./src/components/CurrencyInfo.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _CurrencyInfo_vue_vue_type_style_index_0_id_0e0ca50f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CurrencyInfo.vue?vue&type=style&index=0&id=0e0ca50f&scoped=true&lang=css& */ "./src/components/CurrencyInfo.vue?vue&type=style&index=0&id=0e0ca50f&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CurrencyInfo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CurrencyInfo_vue_vue_type_template_id_0e0ca50f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CurrencyInfo_vue_vue_type_template_id_0e0ca50f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0e0ca50f",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CurrencyInfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/CurrencyInfo.vue?vue&type=script&lang=ts&":
/*!******************************************************************!*\
  !*** ./src/components/CurrencyInfo.vue?vue&type=script&lang=ts& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CurrencyInfo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CurrencyInfo.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CurrencyInfo.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CurrencyInfo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/CurrencyInfo.vue?vue&type=style&index=0&id=0e0ca50f&scoped=true&lang=css&":
/*!**************************************************************************************************!*\
  !*** ./src/components/CurrencyInfo.vue?vue&type=style&index=0&id=0e0ca50f&scoped=true&lang=css& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CurrencyInfo_vue_vue_type_style_index_0_id_0e0ca50f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CurrencyInfo.vue?vue&type=style&index=0&id=0e0ca50f&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CurrencyInfo.vue?vue&type=style&index=0&id=0e0ca50f&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CurrencyInfo_vue_vue_type_style_index_0_id_0e0ca50f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CurrencyInfo_vue_vue_type_style_index_0_id_0e0ca50f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CurrencyInfo_vue_vue_type_style_index_0_id_0e0ca50f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CurrencyInfo_vue_vue_type_style_index_0_id_0e0ca50f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CurrencyInfo_vue_vue_type_style_index_0_id_0e0ca50f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/CurrencyInfo.vue?vue&type=template&id=0e0ca50f&scoped=true&":
/*!************************************************************************************!*\
  !*** ./src/components/CurrencyInfo.vue?vue&type=template&id=0e0ca50f&scoped=true& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CurrencyInfo_vue_vue_type_template_id_0e0ca50f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CurrencyInfo.vue?vue&type=template&id=0e0ca50f&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CurrencyInfo.vue?vue&type=template&id=0e0ca50f&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CurrencyInfo_vue_vue_type_template_id_0e0ca50f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CurrencyInfo_vue_vue_type_template_id_0e0ca50f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/views/Checkout.vue":
/*!********************************!*\
  !*** ./src/views/Checkout.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Checkout_vue_vue_type_template_id_e9bc6700_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Checkout.vue?vue&type=template&id=e9bc6700&scoped=true& */ "./src/views/Checkout.vue?vue&type=template&id=e9bc6700&scoped=true&");
/* harmony import */ var _Checkout_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Checkout.vue?vue&type=script&lang=ts& */ "./src/views/Checkout.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _Checkout_vue_vue_type_style_index_0_id_e9bc6700_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Checkout.vue?vue&type=style&index=0&id=e9bc6700&scoped=true&lang=css& */ "./src/views/Checkout.vue?vue&type=style&index=0&id=e9bc6700&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Checkout_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Checkout_vue_vue_type_template_id_e9bc6700_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Checkout_vue_vue_type_template_id_e9bc6700_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "e9bc6700",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/Checkout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/Checkout.vue?vue&type=script&lang=ts&":
/*!*********************************************************!*\
  !*** ./src/views/Checkout.vue?vue&type=script&lang=ts& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Checkout.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Checkout.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/Checkout.vue?vue&type=style&index=0&id=e9bc6700&scoped=true&lang=css&":
/*!*****************************************************************************************!*\
  !*** ./src/views/Checkout.vue?vue&type=style&index=0&id=e9bc6700&scoped=true&lang=css& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_style_index_0_id_e9bc6700_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Checkout.vue?vue&type=style&index=0&id=e9bc6700&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Checkout.vue?vue&type=style&index=0&id=e9bc6700&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_style_index_0_id_e9bc6700_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_style_index_0_id_e9bc6700_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_style_index_0_id_e9bc6700_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_style_index_0_id_e9bc6700_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_style_index_0_id_e9bc6700_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/Checkout.vue?vue&type=template&id=e9bc6700&scoped=true&":
/*!***************************************************************************!*\
  !*** ./src/views/Checkout.vue?vue&type=template&id=e9bc6700&scoped=true& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_template_id_e9bc6700_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Checkout.vue?vue&type=template&id=e9bc6700&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Checkout.vue?vue&type=template&id=e9bc6700&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_template_id_e9bc6700_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Checkout_vue_vue_type_template_id_e9bc6700_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/views/CheckoutTransmission.vue":
/*!********************************************!*\
  !*** ./src/views/CheckoutTransmission.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckoutTransmission_vue_vue_type_template_id_2502a484___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckoutTransmission.vue?vue&type=template&id=2502a484& */ "./src/views/CheckoutTransmission.vue?vue&type=template&id=2502a484&");
/* harmony import */ var _CheckoutTransmission_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckoutTransmission.vue?vue&type=script&lang=ts& */ "./src/views/CheckoutTransmission.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CheckoutTransmission_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CheckoutTransmission_vue_vue_type_template_id_2502a484___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CheckoutTransmission_vue_vue_type_template_id_2502a484___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/CheckoutTransmission.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/CheckoutTransmission.vue?vue&type=script&lang=ts&":
/*!*********************************************************************!*\
  !*** ./src/views/CheckoutTransmission.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutTransmission_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutTransmission.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CheckoutTransmission.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutTransmission_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/CheckoutTransmission.vue?vue&type=template&id=2502a484&":
/*!***************************************************************************!*\
  !*** ./src/views/CheckoutTransmission.vue?vue&type=template&id=2502a484& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutTransmission_vue_vue_type_template_id_2502a484___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CheckoutTransmission.vue?vue&type=template&id=2502a484& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CheckoutTransmission.vue?vue&type=template&id=2502a484&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutTransmission_vue_vue_type_template_id_2502a484___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckoutTransmission_vue_vue_type_template_id_2502a484___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=checkout-legacy.js.map