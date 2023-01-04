(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cashlink"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=script&lang=ts&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GlobalClose.vue?vue&type=script&lang=ts& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");





let GlobalClose = class GlobalClose extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    get effectiveButtonLabel() {
        if (this.buttonLabel)
            return this.buttonLabel;
        // Special handling for some specific known app names to be able to adapt translations depending on the app,
        // for example to adapt to an app's gender in a language (e.g. German: "Zurück zur Wallet", "Zurück zum Miner").
        // Note that the app names that should not be translated are specified as a slot.
        const appName = this.request.appName;
        switch (appName) {
            case 'Accounts': return this.$t('37'); // Nimiq Safe
            case 'Wallet': return this.$t('31', { Wallet: appName });
            case 'Nimiq Miner': return this.$t('30', { 'Nimiq Miner': appName });
            case 'Nimiq Faucet': return this.$t('29', { 'Nimiq Faucet': appName });
            case 'Donation Button Creator': return this.$t('36');
            case 'Nimiq Gift Card': return this.$t('38');
            case 'Nimiq Vote': return this.$t('39');
            case 'CryptoPayment.link': return this.$t('35');
            default: return this.$t('28', { appName });
        }
    }
    get effectiveCloseHandler() {
        return !this.hidden
            ? this.onClose || (() => this.$rpc.reject(new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_3__["ERROR_CANCELED"])))
            : () => void 0;
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(String)
], GlobalClose.prototype, "buttonLabel", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(Function)
], GlobalClose.prototype, "onClose", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(Boolean)
], GlobalClose.prototype, "hidden", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__["Static"]
], GlobalClose.prototype, "request", void 0);
GlobalClose = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { ArrowLeftSmallIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["ArrowLeftSmallIcon"] } })
], GlobalClose);
/* harmony default export */ __webpack_exports__["default"] = (GlobalClose);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkCreate.vue?vue&type=script&lang=ts&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CashlinkCreate.vue?vue&type=script&lang=ts& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _lib_Cashlink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/Cashlink */ "./src/lib/Cashlink.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/Helpers */ "./src/lib/Helpers.ts");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nimiq/network-client */ "./node_modules/@nimiq/network-client/dist/NetworkClient.es.js");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../i18n/i18n-setup */ "./src/i18n/i18n-setup.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
var CashlinkCreate_1;
















let CashlinkCreate = CashlinkCreate_1 = class CashlinkCreate extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.loading = false;
        this.liveAmountAndFee = {
            amount: 0,
            fee: 0,
            isValid: false,
        };
        this.feeLunaPerByte = 0;
        this.feeLunaPerBytePreview = 0;
        this.message = '';
        this.accountOrContractInfo = null;
        this.optionsOpened = false;
        this.openedDetails = CashlinkCreate_1.Details.NONE;
        this.fiatRate = null;
    }
    get fiatAmount() {
        if (!this.fiatRate)
            return this.request.fiatCurrency ? 0 : null;
        return this.liveAmountAndFee.amount / 1e5 * this.fiatRate;
    }
    get availableBalance() {
        if (this.accountOrContractInfo && this.accountOrContractInfo.balance) {
            return this.accountOrContractInfo.balance;
        }
        return 0;
    }
    async created() {
        // if there are no existing accounts, redirect to Onboarding
        if (this.wallets.length === 0) {
            this.login(true);
            return;
        }
        // If there is no wallet to the address provided in the request,
        // remove it to let the user potentially choose another.
        if (this.request.senderAddress
            && !this.findWalletByAddress(this.request.senderAddress.toUserFriendlyAddress(), true)) {
            this.request.senderAddress = undefined;
        }
        if (this.request.value) {
            this.liveAmountAndFee.amount = this.request.value;
        }
        if (this.request.message) {
            this.message = this.request.message;
        }
        if (!_nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__["NetworkClient"].hasInstance()) {
            _nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__["NetworkClient"].createInstance(config__WEBPACK_IMPORTED_MODULE_13__["default"].networkEndpoint);
        }
        this.loading = !_lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__["default"].cashlink && (!this.request.senderAddress || !this.request.senderBalance);
        this.nimiqLoadedPromise = Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["loadNimiq"])();
        this.balanceUpdatedPromise = this.updateBalances();
        if (this.loading) {
            this.balanceUpdatedPromise.then(() => this.loading = false);
        }
        if (_lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__["default"].cashlink) {
            // If the Cashlink is restored in the static store after navigating back from the Keyguard or Ledger signing
            // also restore the previously used values in the UI.
            this.liveAmountAndFee.amount = _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__["default"].cashlink.value;
            this.feeLunaPerByte = this.feeLunaPerBytePreview =
                Math.round(_lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__["default"].cashlink.fee / CashlinkCreate_1.TRANSACTION_SIZE);
            this.liveAmountAndFee.fee = this.fee;
            this.message = _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__["default"].cashlink.message;
            // Restore the sender from activeAccount. We don't await the balance update as we assume it to not have
            // changed.
            this.setSender(this.$store.state.activeWalletId, this.$store.state.activeUserFriendlyAddress);
        }
        else if (this.request.senderAddress) {
            if (!this.request.senderBalance) {
                await this.balanceUpdatedPromise;
            }
            this.setSender(null, this.request.senderAddress.toUserFriendlyAddress());
            // If a balance was given in the request use it until the balance update finishes.
            // The given balance in the request takes precedence over the currently stored (before the update)
            // balance in the store.
            if (this.accountOrContractInfo && this.request.senderBalance) {
                this.accountOrContractInfo.balance = this.request.senderBalance;
            }
        }
        if (this.request.fiatCurrency) {
            const fiatCurrency = this.request.fiatCurrency;
            const refreshFiatRate = () => {
                Object(_nimiq_utils__WEBPACK_IMPORTED_MODULE_15__["getExchangeRates"])([_nimiq_utils__WEBPACK_IMPORTED_MODULE_15__["FiatApiSupportedCryptoCurrency"].NIM], [fiatCurrency]).then((prices) => {
                    this.fiatRate = prices[_nimiq_utils__WEBPACK_IMPORTED_MODULE_15__["FiatApiSupportedCryptoCurrency"].NIM][fiatCurrency] || null;
                }).catch((error) => {
                    this.$captureException(error);
                    console.error(error);
                });
            };
            refreshFiatRate();
            window.setInterval(refreshFiatRate, 2 * 60 * 1000); // Refresh rate every 2 minutes
        }
    }
    setSender(walletId, address) {
        const wallet = walletId
            ? this.findWallet(walletId)
            : this.findWalletByAddress(address, true);
        if (!wallet) {
            const errorMsg = walletId ? 'UNEXPECTED: WalletId not found!' : 'Address not found';
            this.$rpc.reject(new Error(errorMsg));
            return;
        }
        this.accountOrContractInfo = wallet.accounts.get(address)
            || wallet.findContractByAddress(Nimiq.Address.fromString(address));
        // FIXME: Also handle active account we get from store
        this.$setActiveAccount({
            walletId: wallet.id,
            userFriendlyAddress: address,
        });
    }
    async updateBalances() {
        if (this.balanceUpdatedPromise) {
            return this.balanceUpdatedPromise;
        }
        await _nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__["NetworkClient"].Instance.init();
        const wallets = this.wallets.slice(0);
        let addresses = [];
        let accountsAndContracts = [];
        if (!this.request.senderAddress) { // No senderAddress in the request
            accountsAndContracts = wallets.reduce((acc, wallet) => {
                acc.push(...wallet.accounts.values());
                acc.push(...wallet.contracts);
                return acc;
            }, []);
            // Reduce userfriendly addresses from that
            addresses = accountsAndContracts.map((accountOrContract) => accountOrContract.userFriendlyAddress);
        }
        else {
            const wallet = this.findWalletByAddress(this.request.senderAddress.toUserFriendlyAddress(), true);
            if (!wallet) {
                this.$rpc.reject(new Error('Address not found!'));
                return;
            }
            const accountOrContractInfo = wallet.accounts.get(this.request.senderAddress.toUserFriendlyAddress())
                || wallet.findContractByAddress(this.request.senderAddress);
            accountsAndContracts.push(accountOrContractInfo);
            addresses.push(accountOrContractInfo.userFriendlyAddress);
        }
        const balances = await _nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__["NetworkClient"].Instance.getBalance(addresses);
        for (const accountOrContract of accountsAndContracts) {
            const balance = balances.get(accountOrContract.userFriendlyAddress);
            if (balance === undefined)
                continue;
            if ('type' in accountOrContract && accountOrContract.type === Nimiq.Account.Type.VESTING) {
                // Calculate available amount for vesting contract
                accountOrContract.balance =
                    accountOrContract.calculateAvailableAmount(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__["NetworkClient"].Instance.headInfo.height, Nimiq.Policy.coinsToSatoshis(balance));
            }
            else {
                accountOrContract.balance = Nimiq.Policy.coinsToSatoshis(balance);
            }
        }
        // Store updated wallets
        for (const wallet of wallets) {
            // Update IndexedDB
            await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_10__["WalletStore"].Instance.put(wallet);
            // Update Vuex
            this.$addWallet(wallet);
        }
    }
    updateFeePreview(fee) {
        this.feeLunaPerBytePreview = fee;
    }
    setFee() {
        this.optionsOpened = false;
        this.feeLunaPerByte = this.$refs.fee.value;
        this.liveAmountAndFee.fee = this.fee;
    }
    get fee() {
        return CashlinkCreate_1.TRANSACTION_SIZE * this.feeLunaPerByte;
    }
    get feePreview() {
        return CashlinkCreate_1.TRANSACTION_SIZE * this.feeLunaPerBytePreview;
    }
    async sendTransaction() {
        const loadingTimeout = window.setTimeout(() => this.loading = true, 10);
        await Promise.all([this.balanceUpdatedPromise, this.nimiqLoadedPromise]);
        window.clearTimeout(loadingTimeout);
        if (!this.liveAmountAndFee.isValid && this.liveAmountAndFee.amount > 0) {
            this.loading = false;
            return;
        }
        const cashlink = await _lib_Cashlink__WEBPACK_IMPORTED_MODULE_3__["default"].create();
        _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__["default"].cashlink = cashlink;
        cashlink.networkClient = _nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__["NetworkClient"].Instance;
        cashlink.value = this.liveAmountAndFee.amount;
        cashlink.fee = this.fee;
        cashlink.message = this.message;
        if (this.request.theme) {
            cashlink.theme = this.request.theme;
        }
        const senderAccount = this.findWalletByAddress(this.accountOrContractInfo.userFriendlyAddress, true);
        // proceed to transaction signing
        switch (senderAccount.type) {
            case _lib_Constants__WEBPACK_IMPORTED_MODULE_11__["WalletType"].LEDGER:
                this.$router.push({ name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_8__["RequestType"].SIGN_TRANSACTION}-ledger` });
                return;
            case _lib_Constants__WEBPACK_IMPORTED_MODULE_11__["WalletType"].LEGACY:
            case _lib_Constants__WEBPACK_IMPORTED_MODULE_11__["WalletType"].BIP39:
                const fundingDetails = cashlink.getFundingDetails();
                const validityStartHeight = _nimiq_network_client__WEBPACK_IMPORTED_MODULE_9__["NetworkClient"].Instance.headInfo.height + 1;
                const request = Object.assign({}, fundingDetails, {
                    shopOrigin: this.rpcState.origin,
                    appName: this.request.appName,
                    keyId: senderAccount.keyId,
                    keyPath: senderAccount.findSignerForAddress(this.accountOrContractInfo.address).path,
                    keyLabel: senderAccount.labelForKeyguard,
                    sender: this.accountOrContractInfo.address.serialize(),
                    senderType: this.accountOrContractInfo.type
                        ? this.accountOrContractInfo.type
                        : Nimiq.Account.Type.BASIC,
                    senderLabel: this.accountOrContractInfo.label,
                    recipient: fundingDetails.recipient.serialize(),
                    recipientType: Nimiq.Account.Type.BASIC,
                    fee: this.fee,
                    validityStartHeight,
                });
                _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__["default"].keyguardRequest = request;
                const client = this.$rpc.createKeyguardClient();
                client.signTransaction(request);
                return;
        }
    }
    login(useReplace = false) {
        _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__["default"].originalRouteName = _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_8__["RequestType"].CREATE_CASHLINK;
        if (useReplace) {
            this.$router.replace({ name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_8__["RequestType"].ONBOARD });
        }
        else {
            this.$router.push({ name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_8__["RequestType"].ONBOARD });
        }
    }
    reset() {
        this.liveAmountAndFee.isValid = false;
        this.accountOrContractInfo = null;
    }
    focus(newValue) {
        if ((typeof newValue === 'boolean' && newValue === false)
            || (typeof newValue === 'number' && newValue === CashlinkCreate_1.Details.NONE)
            || (typeof newValue === 'object' && newValue !== null)) {
            vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"].nextTick(() => this.$refs.amountWithFee.focus());
        }
    }
};
CashlinkCreate.FEE_OPTIONS = [{
        color: 'nq-light-blue-bg',
        value: 0,
        get text() { return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_12__["i18n"].t('126'); },
        index: 0,
    }, {
        color: 'nq-green-bg',
        value: 1,
        get text() { return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_12__["i18n"].t('219'); },
        index: 1,
    }, {
        color: 'nq-gold-bg',
        value: 2,
        get text() { return _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_12__["i18n"].t('116'); },
        index: 2,
    },
];
CashlinkCreate.TRANSACTION_SIZE = 171; // 166 + 5 bytes extraData for funding a cashlink
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__["Static"]
], CashlinkCreate.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_4__["Static"]
], CashlinkCreate.prototype, "rpcState", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["State"]
], CashlinkCreate.prototype, "wallets", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], CashlinkCreate.prototype, "processedWallets", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], CashlinkCreate.prototype, "findWalletByAddress", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], CashlinkCreate.prototype, "findWallet", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vuex_class__WEBPACK_IMPORTED_MODULE_2__["Mutation"])('addWallet')
], CashlinkCreate.prototype, "$addWallet", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vuex_class__WEBPACK_IMPORTED_MODULE_2__["Mutation"])('setActiveAccount')
], CashlinkCreate.prototype, "$setActiveAccount", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('accountOrContractInfo'),
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('openedDetails'),
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('optionsOpened')
], CashlinkCreate.prototype, "focus", null);
CashlinkCreate = CashlinkCreate_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: {
            Account: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["Account"],
            AccountDetails: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["AccountDetails"],
            AccountSelector: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["AccountSelector"],
            Amount: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["Amount"],
            AmountWithFee: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["AmountWithFee"],
            ArrowRightIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["ArrowRightIcon"],
            CloseButton: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["CloseButton"],
            GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
            FiatAmount: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["FiatAmount"],
            LabelInput: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["LabelInput"],
            PageBody: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["PageBody"],
            PageFooter: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["PageFooter"],
            PageHeader: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["PageHeader"],
            SelectBar: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["SelectBar"],
            SettingsIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["SettingsIcon"],
            SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["SmallPage"],
            StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
            Tooltip: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_14__["Tooltip"],
        } })
], CashlinkCreate);
(function (CashlinkCreate) {
    let Details;
    (function (Details) {
        Details[Details["NONE"] = 0] = "NONE";
        Details[Details["SENDER"] = 1] = "SENDER";
        Details[Details["RECIPIENT"] = 2] = "RECIPIENT";
    })(Details = CashlinkCreate.Details || (CashlinkCreate.Details = {}));
})(CashlinkCreate || (CashlinkCreate = {}));
/* harmony default export */ __webpack_exports__["default"] = (CashlinkCreate);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkManage.vue?vue&type=script&lang=ts&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CashlinkManage.vue?vue&type=script&lang=ts& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_Network_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Network.vue */ "./src/components/Network.vue");
/* harmony import */ var _lib_CashlinkStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/CashlinkStore */ "./src/lib/CashlinkStore.ts");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../i18n/i18n-setup */ "./src/i18n/i18n-setup.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
var CashlinkManage_1;











let CashlinkManage = CashlinkManage_1 = class CashlinkManage extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.isTxSent = false;
        this.isManagementRequest = false;
        this.status = _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_9__["i18n"].t('93');
        this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].State.LOADING;
        this.message = '';
        this.retrievedCashlink = null;
        this.copied = false;
        this.qrOverlayOpen = false;
        // @ts-ignore Property 'share' does not exist on type 'Navigator'
        this.nativeShareAvailable = (!!window.navigator && !!window.navigator.share);
    }
    async mounted() {
        const network = this.$refs.network;
        this.isManagementRequest = !this.cashlink; // freshly created cashlink or management request?
        let storedCashlink;
        if ('cashlinkAddress' in this.request && !!this.request.cashlinkAddress) {
            storedCashlink = await _lib_CashlinkStore__WEBPACK_IMPORTED_MODULE_6__["CashlinkStore"].Instance.get(this.request.cashlinkAddress.toUserFriendlyAddress());
            if (!storedCashlink) {
                this.$rpc.reject(new Error(`Could not find Cashlink for address ${this.request.cashlinkAddress}.`));
                return;
            }
        }
        else if (this.cashlink) {
            storedCashlink = await _lib_CashlinkStore__WEBPACK_IMPORTED_MODULE_6__["CashlinkStore"].Instance.get(this.cashlink.address.toUserFriendlyAddress());
        }
        else {
            this.$rpc.reject(new Error('CashlinkManage expects the cashlink to display to be specified either via '
                + 'request.cashlinkAddress or the cashlink in the static store.'));
            return;
        }
        let transactionToSend;
        if (storedCashlink) {
            // Cashlink is typically already sent as the sending happens right after storing the Cashlink. However, it
            // might be that the sending failed and the user reloaded the page, in which case we try sending again.
            transactionToSend = network.getUnrelayedTransactions({
                recipient: storedCashlink.address,
                value: storedCashlink.value,
            })[0];
            this.isTxSent = !transactionToSend;
            this.retrievedCashlink = storedCashlink;
        }
        else {
            // Cashlink can not have been sent yet because whenever it gets sent, it was also added to the store.
            this.isTxSent = false;
            this.retrievedCashlink = this.cashlink;
        }
        if (!this.isTxSent) {
            // Note that this will never be called when coming from SignTransactionLedger as it sends and stores
            // the cashlink itself.
            if (!this.keyguardResult || !this.keyguardRequest) {
                this.$rpc.reject(new Error('Unexpected: No valid Cashlink;'));
                return;
            }
            network.$on(_components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"].Events.API_READY, () => this.status = this.$t('95'));
            network.$on(_components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"].Events.CONSENSUS_SYNCING, () => this.status = this.$t('225'));
            network.$on(_components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"].Events.CONSENSUS_ESTABLISHED, () => this.status = this.$t('209'));
            network.$on(_components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"].Events.TRANSACTION_PENDING, () => this.status = this.$t('27'));
            this.retrievedCashlink.networkClient = await network.getNetworkClient();
            // Store cashlink in database first to be safe when browser crashes during sending
            await _lib_CashlinkStore__WEBPACK_IMPORTED_MODULE_6__["CashlinkStore"].Instance.put(this.retrievedCashlink);
            transactionToSend = transactionToSend || await network.createTx({
                ...this.keyguardRequest,
                signerPubKey: this.keyguardResult.publicKey,
                signature: this.keyguardResult.signature,
            });
            try {
                await network.sendToNetwork(transactionToSend);
                this.isTxSent = true;
            }
            catch (error) {
                this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].State.WARNING;
                if (error.message === _components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"].Errors.TRANSACTION_EXPIRED) {
                    this.message = this.$t('249');
                }
                else if (error.message === _components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"].Errors.TRANSACTION_NOT_RELAYED) {
                    this.message = this.$t('248');
                }
                else {
                    this.message = error.message;
                }
                return;
            }
        }
        if ('skipSharing' in this.request && this.request.skipSharing) {
            this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].State.SUCCESS;
            window.setTimeout(() => this.close(), _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].SUCCESS_REDIRECT_DELAY);
        }
    }
    get title() {
        switch (this.state) {
            case _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].State.SUCCESS: return this.$t('55');
            case _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].State.WARNING: return this.$t('215');
            default: return this.$t('107');
        }
    }
    get link() {
        return `${window.location.origin}/cashlink/#${this.retrievedCashlink.render()}`;
    }
    close() {
        const result = {
            address: this.retrievedCashlink.address.toUserFriendlyAddress(),
            message: this.retrievedCashlink.message,
            value: this.retrievedCashlink.value,
            status: this.retrievedCashlink.state,
            theme: this.retrievedCashlink.theme,
        };
        if ('returnLink' in this.request && this.request.returnLink) {
            // exposes the cashlink private key to the caller
            result.link = this.link;
        }
        this.$rpc.resolve(result);
    }
    copy() {
        _nimiq_utils__WEBPACK_IMPORTED_MODULE_8__["Clipboard"].copy(this.link);
        this.copied = true;
        setTimeout(() => this.copied = false, 800);
    }
    get shareText() {
        return encodeURIComponent(`${CashlinkManage_1.SHARE_PREFIX} ${this.link}`);
    }
    share() {
        navigator.share({
            title: 'Nimiq Cashlink',
            text: CashlinkManage_1.SHARE_PREFIX,
            url: this.link,
        }).catch((error) => console.log('Error sharing', error));
    }
    get telegram() {
        return `https://telegram.me/share/msg?url=${location.host}&text=${this.shareText}`;
    }
    get mail() {
        return `mailto:?subject=${encodeURIComponent('Nimiq Cashlink')}&body=${this.shareText}`;
    }
    get whatsapp() {
        return `https://api.whatsapp.com/send?text=${this.shareText}`;
    }
    reload() {
        window.location.reload();
    }
    cancel() {
        this.$rpc.reject(new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_10__["ERROR_CANCELED"]));
    }
    async exportQrCode() {
        const data = await this.$refs.qrCode.toDataUrl();
        const link = document.createElement('a');
        link.download = 'NimiqCashlink.png';
        link.href = data;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
CashlinkManage.SHARE_PREFIX = _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_9__["i18n"].t('135');
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_2__["Static"]
], CashlinkManage.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_2__["Static"]
], CashlinkManage.prototype, "cashlink", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_2__["Static"]
], CashlinkManage.prototype, "keyguardRequest", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_7__["State"]
], CashlinkManage.prototype, "keyguardResult", void 0);
CashlinkManage = CashlinkManage_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: {
            Account: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["Account"],
            CheckmarkSmallIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["CheckmarkSmallIcon"],
            CloseButton: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["CloseButton"],
            PageBody: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["PageBody"],
            PageFooter: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["PageFooter"],
            SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["SmallPage"],
            StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
            Network: _components_Network_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
            Copyable: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["Copyable"],
            QrCode: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["QrCode"],
            QrCodeIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["QrCodeIcon"],
            DownloadIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["DownloadIcon"],
        } })
], CashlinkManage);
/* harmony default export */ __webpack_exports__["default"] = (CashlinkManage);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true& ***!
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
    "button",
    {
      staticClass: "global-close nq-button-s",
      class: { hidden: _vm.hidden },
      on: { click: _vm.effectiveCloseHandler }
    },
    [
      _c("ArrowLeftSmallIcon"),
      _vm._v(" " + _vm._s(_vm.effectiveButtonLabel) + " ")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkCreate.vue?vue&type=template&id=71c9557a&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CashlinkCreate.vue?vue&type=template&id=71c9557a&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      _c(
        "SmallPage",
        [
          _c(
            "transition",
            { attrs: { name: "transition-fade" } },
            [
              _vm.loading
                ? _c("StatusScreen", {
                    key: "loading",
                    attrs: {
                      title: _vm.$t('260'),
                      lightBlue: ""
                    }
                  })
                : !_vm.accountOrContractInfo
                ? _c(
                    "div",
                    {
                      key: "choose-sender",
                      staticClass: "create-cashlink-choose-sender"
                    },
                    [
                      _c("PageHeader", [
                        _vm._v(" " + _vm._s(_vm.$t('69')) + " ")
                      ]),
                      _c("AccountSelector", {
                        attrs: {
                          wallets: _vm.processedWallets,
                          "min-balance": _vm.request.value || 1
                        },
                        on: {
                          "account-selected": _vm.setSender,
                          login: _vm.login
                        }
                      })
                    ],
                    1
                  )
                : _c(
                    "div",
                    {
                      key: "create",
                      staticClass: "create-cashlink",
                      class: {
                        blurred:
                          _vm.optionsOpened ||
                          _vm.openedDetails !== _vm.constructor.Details.NONE
                      }
                    },
                    [
                      _c(
                        "transition",
                        { attrs: { name: "transition-fade" } },
                        [
                          _vm.optionsOpened
                            ? _c(
                                "SmallPage",
                                { key: "fee", staticClass: "overlay fee" },
                                [
                                  _c(
                                    "PageBody",
                                    [
                                      _c("h1", { staticClass: "nq-h1" }, [
                                        _vm._v(
                                          _vm._s(
                                            _vm.$t('218')
                                          )
                                        )
                                      ]),
                                      _c("p", { staticClass: "nq-text" }, [
                                        _vm._v(
                                          _vm._s(
                                            _vm.$t(
                                              '50'
                                            )
                                          )
                                        )
                                      ]),
                                      _c("SelectBar", {
                                        ref: "fee",
                                        attrs: {
                                          name: "fee",
                                          options: _vm.constructor.FEE_OPTIONS,
                                          selectedValue: _vm.feeLunaPerByte
                                        },
                                        on: { changed: _vm.updateFeePreview }
                                      }),
                                      _c("Amount", {
                                        attrs: {
                                          amount: _vm.feePreview,
                                          minDecimals: 0,
                                          maxDecimals: 5
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _c("PageFooter", [
                                    _c(
                                      "button",
                                      {
                                        staticClass: "nq-button light-blue",
                                        on: { click: _vm.setFee }
                                      },
                                      [_vm._v(_vm._s(_vm.$t('210')))]
                                    )
                                  ]),
                                  _c("CloseButton", {
                                    staticClass: "top-right",
                                    on: {
                                      click: function($event) {
                                        _vm.optionsOpened = false
                                      }
                                    }
                                  })
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm.openedDetails !== _vm.constructor.Details.NONE
                            ? _c(
                                "SmallPage",
                                { key: "details", staticClass: "overlay" },
                                [
                                  _c("AccountDetails", {
                                    attrs: {
                                      address: _vm.accountOrContractInfo.address.toUserFriendlyAddress(),
                                      label: _vm.accountOrContractInfo.label,
                                      balance: _vm.availableBalance
                                    },
                                    on: {
                                      close: function($event) {
                                        _vm.openedDetails =
                                          _vm.constructor.Details.NONE
                                      }
                                    }
                                  })
                                ],
                                1
                              )
                            : _vm._e()
                        ],
                        1
                      ),
                      _c(
                        "PageHeader",
                        {
                          attrs: { backArrow: !_vm.request.senderAddress },
                          on: { back: _vm.reset }
                        },
                        [
                          _c("span", [
                            _vm._v(_vm._s(_vm.$t('100')))
                          ]),
                          _c(
                            "a",
                            {
                              staticClass: "nq-blue options-button",
                              attrs: { href: "javascript:void(0)" },
                              on: {
                                click: function($event) {
                                  _vm.optionsOpened = true
                                }
                              }
                            },
                            [_c("SettingsIcon")],
                            1
                          )
                        ]
                      ),
                      _c(
                        "PageBody",
                        { ref: "createCashlinkTooltipTarget" },
                        [
                          _c(
                            "div",
                            { staticClass: "sender-and-recipient" },
                            [
                              _c("Account", {
                                staticClass: "sender",
                                attrs: {
                                  layout: "column",
                                  address: _vm.accountOrContractInfo.address.toUserFriendlyAddress(),
                                  label: _vm.accountOrContractInfo.label
                                },
                                nativeOn: {
                                  click: function($event) {
                                    _vm.openedDetails =
                                      _vm.constructor.Details.SENDER
                                  }
                                }
                              }),
                              _c("ArrowRightIcon", {
                                staticClass: "nq-light-blue arrow"
                              }),
                              _c("Account", {
                                attrs: {
                                  layout: "column",
                                  label: _vm.$t('161'),
                                  displayAsCashlink: true
                                }
                              })
                            ],
                            1
                          ),
                          _c("hr"),
                          _c("AmountWithFee", {
                            ref: "amountWithFee",
                            attrs: {
                              "available-balance": _vm.availableBalance,
                              fiatAmount: _vm.fiatAmount,
                              fiatCurrency: _vm.request.fiatCurrency
                            },
                            model: {
                              value: _vm.liveAmountAndFee,
                              callback: function($$v) {
                                _vm.liveAmountAndFee = $$v
                              },
                              expression: "liveAmountAndFee"
                            }
                          }),
                          _c(
                            "div",
                            { staticClass: "message-with-tooltip" },
                            [
                              _c("LabelInput", {
                                staticClass: "message",
                                attrs: {
                                  placeholder: _vm.$t('13'),
                                  vanishing: true,
                                  maxBytes: 255
                                },
                                model: {
                                  value: _vm.message,
                                  callback: function($$v) {
                                    _vm.message = $$v
                                  },
                                  expression: "message"
                                }
                              }),
                              _c(
                                "Tooltip",
                                {
                                  ref: "tooltip",
                                  attrs: {
                                    container:
                                      _vm.$refs.createCashlinkTooltipTarget,
                                    autoWidth: ""
                                  }
                                },
                                [
                                  _vm._v(
                                    " " +
                                      _vm._s(
                                        _vm.$t(
                                          '241'
                                        )
                                      ) +
                                      " " +
                                      _vm._s(
                                        _vm.$t(
                                          '142'
                                        )
                                      ) +
                                      " "
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _c("PageFooter", [
                        _c(
                          "button",
                          {
                            staticClass: "nq-button light-blue",
                            attrs: {
                              disabled:
                                _vm.liveAmountAndFee.amount === 0 ||
                                !_vm.liveAmountAndFee.isValid
                            },
                            on: { click: _vm.sendTransaction }
                          },
                          [
                            _vm._v(
                              " " + _vm._s(_vm.$t('105')) + " "
                            )
                          ]
                        )
                      ])
                    ],
                    1
                  )
            ],
            1
          )
        ],
        1
      ),
      _c("GlobalClose")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkManage.vue?vue&type=template&id=0a29f52c&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CashlinkManage.vue?vue&type=template&id=0a29f52c&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      _vm.retrievedCashlink
        ? _c(
            "SmallPage",
            {
              staticClass: "cashlink-manage",
              class: { "fixed-height": this.request.skipSharing }
            },
            [
              _c(
                "transition",
                { attrs: { name: "transition-fade" } },
                [
                  !_vm.isTxSent || this.request.skipSharing
                    ? _c("StatusScreen", {
                        attrs: {
                          state: _vm.state,
                          title: _vm.title,
                          status: _vm.status,
                          message: _vm.message,
                          mainAction: _vm.$t('198'),
                          alternativeAction: _vm.$t('51'),
                          lightBlue: ""
                        },
                        on: {
                          "main-action": _vm.reload,
                          "alternative-action": _vm.cancel
                        }
                      })
                    : _vm._e()
                ],
                1
              ),
              !this.request.skipSharing
                ? _c(
                    "PageBody",
                    [
                      _c("transition", { attrs: { name: "transition-fade" } }, [
                        !_vm.isManagementRequest && _vm.isTxSent
                          ? _c(
                              "div",
                              { staticClass: "nq-green cashlink-status" },
                              [
                                _c("CheckmarkSmallIcon"),
                                _vm._v(_vm._s(_vm.$t('54')))
                              ],
                              1
                            )
                          : _vm._e()
                      ]),
                      _c(
                        "button",
                        {
                          staticClass: "nq-button-s close",
                          on: { click: _vm.close }
                        },
                        [_vm._v(_vm._s(_vm.$t('111')))]
                      ),
                      _c(
                        "div",
                        { staticClass: "cashlink-and-url" },
                        [
                          _c("Account", {
                            class: {
                              sending: !_vm.isTxSent,
                              "show-loader": !_vm.isManagementRequest
                            },
                            attrs: { layout: "column", displayAsCashlink: true }
                          }),
                          _c("small", [
                            _vm._v(_vm._s(_vm.$t('74')))
                          ]),
                          _c("Copyable", { attrs: { text: _vm.link } }, [
                            _c("div", { staticClass: "cashlink-url" }, [
                              _vm._v(_vm._s(_vm.link))
                            ])
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e(),
              !this.request.skipSharing
                ? _c(
                    "PageFooter",
                    [
                      _c(
                        "button",
                        {
                          staticClass: "nq-button-s social-share qr-code",
                          on: {
                            click: function($event) {
                              _vm.qrOverlayOpen = true
                            }
                          }
                        },
                        [_c("QrCodeIcon")],
                        1
                      ),
                      _vm.nativeShareAvailable
                        ? _c(
                            "button",
                            {
                              staticClass: "nq-button share-mobile",
                              on: { click: _vm.share }
                            },
                            [_vm._v(" " + _vm._s(_vm.$t('211')) + " ")]
                          )
                        : [
                            _c(
                              "a",
                              {
                                staticClass:
                                  "nq-button-s social-share telegram",
                                attrs: { target: "_blank", href: _vm.telegram }
                              },
                              [
                                _c(
                                  "svg",
                                  {
                                    attrs: {
                                      width: "29",
                                      height: "25",
                                      viewBox: "0 0 29 25",
                                      fill: "currentColor",
                                      xmlns: "http://www.w3.org/2000/svg"
                                    }
                                  },
                                  [
                                    _c("path", {
                                      attrs: {
                                        d:
                                          "M28.54.53c-.1-.31-.23-.4-.42-.47C27.7-.11 27 .14 27 .14S1.94 9.5.52 10.54c-.31.22-.42.35-.47.5-.25.74.52 1.06.52 1.06l6.46 2.19h.06L10.1 23s.28.59.61.78l.03.02.03.02.13.02h.02c.25 0 .66-.21 1.31-.9a56.7 56.7 0 013.4-3.22 90.48 90.48 0 015.64 4.27c.51.47.95.54 1.3.53.98-.04 1.25-1.16 1.25-1.16S28.41 4.26 28.56 1.7c0-.25.03-.4.03-.58 0-.24-.02-.48-.05-.6zM8.34 13.76v-.13c3.46-2.27 13.88-9.1 14.56-9.35.13-.04.21 0 .2.09-.32 1.12-11.88 11.8-11.88 11.8l-.06.12-.02-.01-.4 4.4-2.4-6.92z"
                                      }
                                    })
                                  ]
                                )
                              ]
                            ),
                            _c(
                              "a",
                              {
                                staticClass: "nq-button-s social-share",
                                attrs: { href: _vm.mail }
                              },
                              [
                                _c(
                                  "svg",
                                  {
                                    attrs: {
                                      width: "28",
                                      height: "24",
                                      viewBox: "0 0 28 24",
                                      fill: "currentColor",
                                      xmlns: "http://www.w3.org/2000/svg"
                                    }
                                  },
                                  [
                                    _c("g", [
                                      _c("path", {
                                        attrs: {
                                          d:
                                            "M13.9 11.36c.14.14.27.14.4 0l12.84-8.55c.27-.14.4-.4.27-.67A2.73 2.73 0 0024.73 0H2.67A2.73 2.73 0 000 2.14c0 .27.13.53.4.8l13.5 8.42z"
                                        }
                                      }),
                                      _c("path", {
                                        attrs: {
                                          d:
                                            "M15.38 14.44c-.8.53-1.74.53-2.55 0L1.08 6.95c-.4-.13-.8 0-.94.27-.13.13-.13.27-.13.4v13.1a2.68 2.68 0 002.67 2.68h22.06a2.68 2.68 0 002.68-2.68V7.62c0-.4-.27-.67-.67-.67-.13 0-.27 0-.4.14l-10.96 7.35z"
                                        }
                                      })
                                    ])
                                  ]
                                )
                              ]
                            ),
                            _c(
                              "a",
                              {
                                staticClass: "nq-button-s social-share",
                                attrs: { target: "_blank", href: _vm.whatsapp }
                              },
                              [
                                _c(
                                  "svg",
                                  {
                                    attrs: {
                                      width: "28",
                                      height: "28",
                                      viewBox: "0 0 28 28",
                                      fill: "currentColor",
                                      xmlns: "http://www.w3.org/2000/svg"
                                    }
                                  },
                                  [
                                    _c("path", {
                                      attrs: {
                                        d:
                                          "M14 0A14 14 0 000 14c0 2.82.82 5.65 2.45 8L.82 26.7c-.12.24 0 .48.11.6.12.11.35.23.59.11l5.01-1.53a13.91 13.91 0 0019.25-4.47c1.4-2.23 2.1-4.82 2.1-7.41C28 6.24 21.7 0 14 0zm8.4 19.65a4.57 4.57 0 01-4.08 2.47c-1.4-.12-2.8-.6-3.97-1.18a16.76 16.76 0 01-7-6.12c-2.22-2.94-2.33-5.76-.23-8.11a2.9 2.9 0 012.21-.6c.59.12 1.17.48 1.4 1.07l.47 1.06c.35.82.7 1.64.7 1.76.23.35.23.82 0 1.18-.35.58-.7 1.17-1.17 1.64a10.68 10.68 0 002.1 2.47 8.68 8.68 0 003.15 1.89c.35-.47.94-1.18 1.17-1.53a1.18 1.18 0 011.52-.47c.46.11 2.91 1.4 2.91 1.4.35.13.59.36.82.6.47.94.47 1.76 0 2.47z"
                                      }
                                    })
                                  ]
                                )
                              ]
                            )
                          ]
                    ],
                    2
                  )
                : _vm._e(),
              _c("transition", { attrs: { name: "fade" } }, [
                _vm.qrOverlayOpen
                  ? _c(
                      "div",
                      {
                        staticClass: "qr-overlay",
                        on: {
                          click: function($event) {
                            if ($event.target !== $event.currentTarget) {
                              return null
                            }
                            _vm.qrOverlayOpen = false
                          }
                        }
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "nq-card" },
                          [
                            _c("CloseButton", {
                              on: {
                                click: function($event) {
                                  _vm.qrOverlayOpen = false
                                }
                              }
                            }),
                            _c("QrCode", {
                              ref: "qrCode",
                              attrs: {
                                data: _vm.link,
                                fill: "#1F2348",
                                background: "#fff"
                              }
                            }),
                            _c(
                              "button",
                              {
                                staticClass: "nq-button-s export-qr-code",
                                on: { click: _vm.exportQrCode }
                              },
                              [
                                _c("DownloadIcon"),
                                _vm._v(" " + _vm._s(_vm.$t('112')) + " ")
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ]
                    )
                  : _vm._e()
              ])
            ],
            1
          )
        : _vm._e(),
      _c("Network", { ref: "network", attrs: { visible: false } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.global-close[data-v-d78638d6] {\n    margin-top: 8rem;\n    margin-bottom: 3rem;\n    background: transparent !important;\n    opacity: 0.4;\n    font-size: 2rem;\n    -webkit-transition: color .3s var(--nimiq-ease), opacity .3s var(--nimiq-ease), visibility .3s;\n    transition: color .3s var(--nimiq-ease), opacity .3s var(--nimiq-ease), visibility .3s;\n}\n.global-close[data-v-d78638d6]:hover,\n.global-close[data-v-d78638d6]:focus {\n    color: var(--nimiq-light-blue);\n    opacity: 1;\n}\n.global-close.hidden[data-v-d78638d6] {\n    visibility: hidden;\n    pointer-events: none;\n    opacity: 0;\n}\n.nq-icon[data-v-d78638d6] {\n    vertical-align: top;\n    width: 1.375rem;\n    height: 1.125rem;\n    margin-right: 0.25rem;\n    margin-top: 1.125rem;\n    -webkit-transition: -webkit-transform .3s var(--nimiq-ease);\n    transition: -webkit-transform .3s var(--nimiq-ease);\n    transition: transform .3s var(--nimiq-ease);\n    transition: transform .3s var(--nimiq-ease), -webkit-transform .3s var(--nimiq-ease);\n}\n.global-close:hover .nq-icon[data-v-d78638d6],\n.global-close:focus .nq-icon[data-v-d78638d6] {\n    -webkit-transform: translate3D(-0.25rem, 0, 0);\n            transform: translate3D(-0.25rem, 0, 0);\n}\n@media (max-width: 450px) {\n.global-close[data-v-d78638d6] {\n        position: absolute;\n        right: 1rem;\n        top: 2.4rem;\n        margin: 0;\n}\n.global-close[data-v-d78638d6]::before {\n        /* avoid that the button overflows the page, causing vertical scrolling on mobile */\n        right: -1rem;\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkCreate.vue?vue&type=style&index=0&id=71c9557a&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CashlinkCreate.vue?vue&type=style&index=0&id=71c9557a&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.container > .small-page[data-v-71c9557a] {\n    position: relative;\n    overflow: hidden;\n}\n.status-screen[data-v-71c9557a] {\n    position: absolute;\n    -webkit-transition: opacity .3s var(--nimiq-ease);\n    transition: opacity .3s var(--nimiq-ease);\n}\n.create-cashlink[data-v-71c9557a],\n.create-cashlink-choose-sender[data-v-71c9557a] {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    -webkit-transition: opacity .3s;\n    transition: opacity .3s;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n.page-footer .nq-button[data-v-71c9557a] {\n    margin-top: 0;\n}\n.create-cashlink .page-body[data-v-71c9557a] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n    padding-bottom: 2rem;\n    padding-top: 0;\n}\n.create-cashlink .page-body > .nq-label[data-v-71c9557a] {\n    margin-top: 6rem;\n    margin-bottom: 3rem;\n}\n.sender-and-recipient[data-v-71c9557a] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: 100%;\n}\n.sender-and-recipient .arrow[data-v-71c9557a] {\n    font-size: 3rem;\n    margin-top: -6.5rem;\n    -webkit-transition: opacity .3s var(--nimiq-ease);\n    transition: opacity .3s var(--nimiq-ease);\n}\n.options-button[data-v-71c9557a] {\n    position: absolute;\n    top: 4rem;\n    right: 4rem;\n    opacity: .25;\n    font-size: 3.625rem;\n    -webkit-transition: opacity .3s var(--nimiq-ease);\n    transition: opacity .3s var(--nimiq-ease);\n}\n.options-button[data-v-71c9557a]:hover {\n    opacity: 1;\n}\n.sender-and-recipient .account[data-v-71c9557a] {\n    width: calc(50% - 1.1235rem);\n}\n.sender-and-recipient .account.sender[data-v-71c9557a] {\n    cursor: pointer;\n}\n.sender-and-recipient .account[data-v-71c9557a] .identicon {\n    width: 9rem;\n    height: 9rem;\n}\n.sender-and-recipient .account[data-v-71c9557a] .label {\n    height: 3em;\n}\n.create-cashlink .value[data-v-71c9557a] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline;\n    height: 14.5rem; /* 12.5rem height + 2rem padding */\n    border-top: .125rem solid var(--nimiq-highlight-bg);\n    margin-top: 1rem;\n    padding-top: 2rem;\n}\n.create-cashlink .message-with-tooltip[data-v-71c9557a] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    max-width: 100%;\n}\n.page-body[data-v-71c9557a] .tooltip-box {\n    font-size: 1.75rem;\n    font-weight: 600;\n    line-height: 1.49;\n}\n.create-cashlink .tooltip[data-v-71c9557a] {\n    font-size: 3rem;\n    margin: 1rem 1rem 0;\n}\n.create-cashlink .tooltip[data-v-71c9557a] a.top::after {\n    bottom: calc(1em + 0.75rem);\n}\n.create-cashlink .tooltip[data-v-71c9557a]:not(.active) a svg {\n    color: rgba(31, 35, 72, 0.25) !important;\n}\n.create-cashlink .message[data-v-71c9557a] {\n    margin-top: 1rem;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n.overlay[data-v-71c9557a] {\n    position: absolute;\n    z-index: 2;\n    left: 0;\n    top: 0;\n    margin: 0;\n    -webkit-box-shadow: 0 0;\n            box-shadow: 0 0;\n    background: rgba(255, 255, 255, .5);\n    -webkit-transition: opacity .3s var(--nimiq-ease);\n    transition: opacity .3s var(--nimiq-ease);\n}\n.overlay .account-details[data-v-71c9557a] {\n    background: none;\n}\n.overlay.fee .page-body[data-v-71c9557a] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.overlay.fee .amount[data-v-71c9557a] {\n    margin-top: 3rem;\n}\n.overlay.fee h1[data-v-71c9557a] {\n    text-align: center;\n}\n.overlay.fee p[data-v-71c9557a] {\n    text-align: center;\n    margin-bottom: 4rem;\n    margin-top: .5rem;\n}\n.label-input[data-v-71c9557a] {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n.create-cashlink > .page-body hr[data-v-71c9557a] {\n    width: 100%;\n    margin: 0;\n    height: 0.125rem;\n    border: none;\n    background-color: var(--nimiq-highlight-bg);\n    -webkit-transition: opacity .3s var(--nimiq-ease);\n    transition: opacity .3s var(--nimiq-ease);\n}\n.amount-with-fee[data-v-71c9557a] {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin-top: 2rem;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.create-cashlink .page-header[data-v-71c9557a] h1 > span,\n.create-cashlink .page-body[data-v-71c9557a] .amount-with-fee input,\n.create-cashlink .page-body[data-v-71c9557a] .amount-with-fee .nim,\n.create-cashlink .page-body[data-v-71c9557a] .amount-with-fee .fee-section,\n.create-cashlink .page-body[data-v-71c9557a] .label,\n.create-cashlink .page-body[data-v-71c9557a] .identicon,\n.create-cashlink .page-body[data-v-71c9557a] .message-with-tooltip input,\n.create-cashlink .page-body[data-v-71c9557a] .tooltip,\n.create-cashlink .page-footer[data-v-71c9557a] button {\n    -webkit-transition: opacity .3s var(--nimiq-ease), -webkit-filter .3s var(--nimiq-ease);\n    transition: opacity .3s var(--nimiq-ease), -webkit-filter .3s var(--nimiq-ease);\n    transition: filter .3s var(--nimiq-ease), opacity .3s var(--nimiq-ease);\n    transition: filter .3s var(--nimiq-ease), opacity .3s var(--nimiq-ease), -webkit-filter .3s var(--nimiq-ease);\n    -webkit-filter: blur(0px);\n            filter: blur(0px);\n    opacity: 1;\n}\n.create-cashlink .page-footer[data-v-71c9557a] button {\n    -webkit-transition: opacity .3s var(--nimiq-ease), -webkit-filter .3s var(--nimiq-ease), -webkit-transform .45s var(--nimiq-ease);\n    transition: opacity .3s var(--nimiq-ease), -webkit-filter .3s var(--nimiq-ease), -webkit-transform .45s var(--nimiq-ease);\n    transition: filter .3s var(--nimiq-ease), opacity .3s var(--nimiq-ease), transform .45s var(--nimiq-ease);\n    transition: filter .3s var(--nimiq-ease), opacity .3s var(--nimiq-ease), transform .45s var(--nimiq-ease), -webkit-filter .3s var(--nimiq-ease), -webkit-transform .45s var(--nimiq-ease);\n}\n\n/* these elements are too small to make a notable difference in the blurred background */\n.create-cashlink.blurred > .page-body[data-v-71c9557a] .arrow, \n.create-cashlink.blurred > .page-body hr[data-v-71c9557a], \n.create-cashlink.blurred > .page-header[data-v-71c9557a] a , \n.create-cashlink.blurred > .page-header[data-v-71c9557a] h1 > a { /* back button */\n    opacity: 0;\n}\n.create-cashlink.blurred > .page-body[data-v-71c9557a],\n.create-cashlink.blurred > .page-body[data-v-71c9557a] .account,\n.create-cashlink.blurred > .page-body[data-v-71c9557a] .label-input {\n    overflow: visible; /** needed for ugly hard lines to disappear */\n}\n.create-cashlink.blurred > .page-header[data-v-71c9557a] h1 > span,\n.create-cashlink.blurred > .page-body[data-v-71c9557a] .amount-with-fee input,\n.create-cashlink.blurred > .page-body[data-v-71c9557a] .amount-with-fee .nim,\n.create-cashlink.blurred > .page-body[data-v-71c9557a] .amount-with-fee .fee-section,\n.create-cashlink.blurred > .page-body[data-v-71c9557a] .label,\n.create-cashlink.blurred > .page-body[data-v-71c9557a] .identicon,\n.create-cashlink.blurred > .page-body[data-v-71c9557a] .message-with-tooltip input,\n.create-cashlink.blurred > .page-body[data-v-71c9557a] .tooltip,\n.create-cashlink.blurred > .page-footer[data-v-71c9557a] button {\n    opacity: .5;\n    -webkit-filter: blur(20px);\n            filter: blur(20px);\n}\n.sender-and-recipient[data-v-71c9557a] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: 100%;\n}\n.create-cashlink .cashlink[data-v-71c9557a] .label {\n    opacity: .5;\n    line-height: 1.5;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkManage.vue?vue&type=style&index=0&id=0a29f52c&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CashlinkManage.vue?vue&type=style&index=0&id=0a29f52c&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.cashlink-manage[data-v-0a29f52c] {\n    position: relative;\n    overflow: hidden;\n}\n.cashlink-manage[data-v-0a29f52c]:not(.fixed-height) {\n    height: auto;\n    min-height: 70.5rem;\n}\n.status-screen[data-v-0a29f52c] {\n    position: absolute;\n    -webkit-transition: opacity .3s var(--nimiq-ease);\n    transition: opacity .3s var(--nimiq-ease);\n}\n.close[data-v-0a29f52c] {\n    position: absolute;\n    top: 2rem;\n    right: 2rem;\n}\n.cashlink-status[data-v-0a29f52c] {\n    position: absolute;\n    top: 2rem;\n    left: 2rem;\n    -webkit-transition: opacity .4s var(--nimiq-ease);\n    transition: opacity .4s var(--nimiq-ease);\n    font-size: 2rem;\n    font-weight: bold;\n}\n.cashlink-status .nq-icon[data-v-0a29f52c] {\n    font-size: 1.5rem;\n    margin-right: 1.25rem;\n}\n.cashlink-manage .cashlink-and-url[data-v-0a29f52c] {\n    height: 100%;\n    width: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n.cashlink-manage .cashlink[data-v-0a29f52c] .identicon {\n    width: 18rem;\n    height: 18rem;\n    padding: 1rem;\n    margin-bottom: 1.25rem;\n}\n.cashlink-manage .cashlink[data-v-0a29f52c] .identicon:before {\n    border: .5rem solid transparent;\n}\n.cashlink-manage .cashlink.show-loader[data-v-0a29f52c] .identicon:before {\n    border: .5rem solid var(--nimiq-green);\n    -webkit-animation: spin-data-v-0a29f52c 4s linear infinite;\n            animation: spin-data-v-0a29f52c 4s linear infinite;\n    -webkit-transition: border 1s var(--nimiq-ease);\n    transition: border 1s var(--nimiq-ease);\n}\n.cashlink-manage .cashlink.show-loader.sending[data-v-0a29f52c] .identicon:before {\n    border-color: var(--nimiq-gray) var(--nimiq-gray) var(--nimiq-gray) var(--nimiq-light-blue);\n}\n@-webkit-keyframes spin-data-v-0a29f52c {\n100% { -webkit-transform: rotate(360deg); transform:rotate(360deg);\n}\n}\n@keyframes spin-data-v-0a29f52c {\n100% { -webkit-transform: rotate(360deg); transform:rotate(360deg);\n}\n}\n.cashlink-manage .cashlink-and-url .cashlink-url[data-v-0a29f52c] {\n    text-align: center;\n    font-size: 3rem;\n    line-height: 4rem;\n    text-transform: none;\n    word-break: break-all;\n    max-width: unset;\n    max-height: unset;\n    opacity: .5;\n}\n.cashlink-manage .cashlink-and-url .copyable[data-v-0a29f52c] {\n    padding: 0.75rem 1.5rem;\n    margin-top: 1rem;\n}\n.cashlink-manage .cashlink-and-url small[data-v-0a29f52c] {\n    font-size: 1.625rem;\n    opacity: 0.5;\n    font-weight: bold;\n}\n.page-body[data-v-0a29f52c] {\n    padding-top: 6rem;\n    padding-bottom: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n.page-footer[data-v-0a29f52c] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: space-evenly;\n        -ms-flex-pack: space-evenly;\n            justify-content: space-evenly;\n}\n.page-footer .nq-button[data-v-0a29f52c] {\n    min-width: unset;\n    width: 17rem;\n    margin-left: unset;\n    margin-right: unset;\n}\n.page-footer .nq-button[data-v-0a29f52c]:hover,\n.page-footer .nq-button[data-v-0a29f52c]:focus {\n    -webkit-transform: none;\n            transform: none;\n}\n.page-footer .nq-button.copy[data-v-0a29f52c] {\n    padding: unset;\n}\n.social-share[data-v-0a29f52c] {\n    width: 7.5rem;\n    height: 7.5rem;\n    border-radius: 50%;\n    padding: 2rem;\n    margin: 2rem 0 3rem;\n}\n.social-share.telegram[data-v-0a29f52c] {\n    padding-left: 1.75rem;\n    padding-right: 2.25rem;\n}\n.social-share svg[data-v-0a29f52c] {\n    width: 3.5rem;\n    height: 3.5rem;\n    -webkit-transition: opacity .4s var(--nimiq-ease);\n    transition: opacity .4s var(--nimiq-ease);\n    opacity: .5;\n}\n.social-share:hover svg[data-v-0a29f52c],\n.social-share:focus svg[data-v-0a29f52c] {\n    opacity: .7;\n}\n.share-mobile[data-v-0a29f52c] {\n    background: none;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    background-color: rgba(31, 35, 72, 0.07); /* Based on Nimiq Blue */\n    color: rgba(31, 35, 72, 0.7);\n    -webkit-transition: background-color 300ms var(--nimiq-ease), color 300ms var(--nimiq-ease);\n    transition: background-color 300ms var(--nimiq-ease), color 300ms var(--nimiq-ease);\n}\n.share-mobile[data-v-0a29f52c]:hover,\n.share-mobile[data-v-0a29f52c]:focus {\n    background: none;\n    background-color: rgba(31, 35, 72, 0.12); /* Based on Nimiq Blue */\n    color: rgba(31, 35, 72, 1);\n}\n.qr-overlay[data-v-0a29f52c] {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background: rgba(31, 35, 72, 0.85);\n}\n.qr-overlay .nq-card[data-v-0a29f52c] {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    padding: 2rem;\n    margin-left: -17rem;\n    margin-top: -19.5rem;\n}\n.qr-overlay .qr-code[data-v-0a29f52c] {\n    width: 30rem;\n}\n.qr-overlay .close-button[data-v-0a29f52c] {\n    display: block;\n    margin-left: auto;\n    margin-bottom: 2rem;\n}\n.qr-overlay .export-qr-code[data-v-0a29f52c] {\n    display: block;\n    margin: 2rem auto 0.75rem;\n}\n.fade-enter-active[data-v-0a29f52c], .fade-leave-active[data-v-0a29f52c] {\n    -webkit-transition: opacity .5s var(--nimiq-ease);\n    transition: opacity .5s var(--nimiq-ease);\n}\n.fade-enter[data-v-0a29f52c], .fade-leave-to[data-v-0a29f52c] {\n    opacity: 0;\n    pointer-events: none;\n}\n@media (max-width: 450px) {\n.qr-overlay .nq-card[data-v-0a29f52c] {\n        /* Overwrite removed bottom radius of .nq-card on mobile */\n        border-radius: 1.25rem;\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("71f0508c", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkCreate.vue?vue&type=style&index=0&id=71c9557a&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CashlinkCreate.vue?vue&type=style&index=0&id=71c9557a&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkCreate.vue?vue&type=style&index=0&id=71c9557a&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkCreate.vue?vue&type=style&index=0&id=71c9557a&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("14a39f3e", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkManage.vue?vue&type=style&index=0&id=0a29f52c&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/CashlinkManage.vue?vue&type=style&index=0&id=0a29f52c&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkManage.vue?vue&type=style&index=0&id=0a29f52c&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkManage.vue?vue&type=style&index=0&id=0a29f52c&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("0b789812", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/GlobalClose.vue":
/*!****************************************!*\
  !*** ./src/components/GlobalClose.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GlobalClose_vue_vue_type_template_id_d78638d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true& */ "./src/components/GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true&");
/* harmony import */ var _GlobalClose_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GlobalClose.vue?vue&type=script&lang=ts& */ "./src/components/GlobalClose.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css& */ "./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _GlobalClose_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GlobalClose_vue_vue_type_template_id_d78638d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GlobalClose_vue_vue_type_template_id_d78638d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d78638d6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/GlobalClose.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/GlobalClose.vue?vue&type=script&lang=ts&":
/*!*****************************************************************!*\
  !*** ./src/components/GlobalClose.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./GlobalClose.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css&":
/*!*************************************************************************************************!*\
  !*** ./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=style&index=0&id=d78638d6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_style_index_0_id_d78638d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true&":
/*!***********************************************************************************!*\
  !*** ./src/components/GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_template_id_d78638d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/GlobalClose.vue?vue&type=template&id=d78638d6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_template_id_d78638d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalClose_vue_vue_type_template_id_d78638d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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

/***/ "./src/views/CashlinkCreate.vue":
/*!**************************************!*\
  !*** ./src/views/CashlinkCreate.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CashlinkCreate_vue_vue_type_template_id_71c9557a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CashlinkCreate.vue?vue&type=template&id=71c9557a&scoped=true& */ "./src/views/CashlinkCreate.vue?vue&type=template&id=71c9557a&scoped=true&");
/* harmony import */ var _CashlinkCreate_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CashlinkCreate.vue?vue&type=script&lang=ts& */ "./src/views/CashlinkCreate.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _CashlinkCreate_vue_vue_type_style_index_0_id_71c9557a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CashlinkCreate.vue?vue&type=style&index=0&id=71c9557a&scoped=true&lang=css& */ "./src/views/CashlinkCreate.vue?vue&type=style&index=0&id=71c9557a&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CashlinkCreate_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CashlinkCreate_vue_vue_type_template_id_71c9557a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CashlinkCreate_vue_vue_type_template_id_71c9557a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "71c9557a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/CashlinkCreate.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/CashlinkCreate.vue?vue&type=script&lang=ts&":
/*!***************************************************************!*\
  !*** ./src/views/CashlinkCreate.vue?vue&type=script&lang=ts& ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkCreate_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkCreate.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkCreate.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkCreate_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/CashlinkCreate.vue?vue&type=style&index=0&id=71c9557a&scoped=true&lang=css&":
/*!***********************************************************************************************!*\
  !*** ./src/views/CashlinkCreate.vue?vue&type=style&index=0&id=71c9557a&scoped=true&lang=css& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkCreate_vue_vue_type_style_index_0_id_71c9557a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkCreate.vue?vue&type=style&index=0&id=71c9557a&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkCreate.vue?vue&type=style&index=0&id=71c9557a&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkCreate_vue_vue_type_style_index_0_id_71c9557a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkCreate_vue_vue_type_style_index_0_id_71c9557a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkCreate_vue_vue_type_style_index_0_id_71c9557a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkCreate_vue_vue_type_style_index_0_id_71c9557a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkCreate_vue_vue_type_style_index_0_id_71c9557a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/CashlinkCreate.vue?vue&type=template&id=71c9557a&scoped=true&":
/*!*********************************************************************************!*\
  !*** ./src/views/CashlinkCreate.vue?vue&type=template&id=71c9557a&scoped=true& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkCreate_vue_vue_type_template_id_71c9557a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkCreate.vue?vue&type=template&id=71c9557a&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkCreate.vue?vue&type=template&id=71c9557a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkCreate_vue_vue_type_template_id_71c9557a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkCreate_vue_vue_type_template_id_71c9557a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/views/CashlinkManage.vue":
/*!**************************************!*\
  !*** ./src/views/CashlinkManage.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CashlinkManage_vue_vue_type_template_id_0a29f52c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CashlinkManage.vue?vue&type=template&id=0a29f52c&scoped=true& */ "./src/views/CashlinkManage.vue?vue&type=template&id=0a29f52c&scoped=true&");
/* harmony import */ var _CashlinkManage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CashlinkManage.vue?vue&type=script&lang=ts& */ "./src/views/CashlinkManage.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _CashlinkManage_vue_vue_type_style_index_0_id_0a29f52c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CashlinkManage.vue?vue&type=style&index=0&id=0a29f52c&scoped=true&lang=css& */ "./src/views/CashlinkManage.vue?vue&type=style&index=0&id=0a29f52c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CashlinkManage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CashlinkManage_vue_vue_type_template_id_0a29f52c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CashlinkManage_vue_vue_type_template_id_0a29f52c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0a29f52c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/CashlinkManage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/CashlinkManage.vue?vue&type=script&lang=ts&":
/*!***************************************************************!*\
  !*** ./src/views/CashlinkManage.vue?vue&type=script&lang=ts& ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkManage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkManage.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkManage.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkManage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/CashlinkManage.vue?vue&type=style&index=0&id=0a29f52c&scoped=true&lang=css&":
/*!***********************************************************************************************!*\
  !*** ./src/views/CashlinkManage.vue?vue&type=style&index=0&id=0a29f52c&scoped=true&lang=css& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkManage_vue_vue_type_style_index_0_id_0a29f52c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkManage.vue?vue&type=style&index=0&id=0a29f52c&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkManage.vue?vue&type=style&index=0&id=0a29f52c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkManage_vue_vue_type_style_index_0_id_0a29f52c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkManage_vue_vue_type_style_index_0_id_0a29f52c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkManage_vue_vue_type_style_index_0_id_0a29f52c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkManage_vue_vue_type_style_index_0_id_0a29f52c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkManage_vue_vue_type_style_index_0_id_0a29f52c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/CashlinkManage.vue?vue&type=template&id=0a29f52c&scoped=true&":
/*!*********************************************************************************!*\
  !*** ./src/views/CashlinkManage.vue?vue&type=template&id=0a29f52c&scoped=true& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkManage_vue_vue_type_template_id_0a29f52c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./CashlinkManage.vue?vue&type=template&id=0a29f52c&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/CashlinkManage.vue?vue&type=template&id=0a29f52c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkManage_vue_vue_type_template_id_0a29f52c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CashlinkManage_vue_vue_type_template_id_0a29f52c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=cashlink.js.map