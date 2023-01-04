(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["onboarding"],{

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

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/NotEnoughCookieSpace.vue?vue&type=script&lang=ts&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NotEnoughCookieSpace.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");





let NotEnoughCookieSpace = class NotEnoughCookieSpace extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    onContinue() {
        this.$rpc.reject(new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_4__["ERROR_COOKIE_SPACE"]));
    }
};
NotEnoughCookieSpace = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { StatusScreen: _StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"] } })
], NotEnoughCookieSpace);
/* harmony default export */ __webpack_exports__["default"] = (NotEnoughCookieSpace);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/OnboardingMenu.vue?vue&type=script&lang=ts&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/OnboardingMenu.vue?vue&type=script&lang=ts& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);



let AccountList = class AccountList extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.hasThreeLineText = false;
    }
    mounted() {
        this.hasThreeLineText = [...this.$el.querySelectorAll('.text')].some((text) => {
            return text.offsetHeight > 50; // note that this works independent of zoom level
        });
    }
    signup() { }
    login() { }
    ledger() { }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Emit"])()
], AccountList.prototype, "signup", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Emit"])()
], AccountList.prototype, "login", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Emit"])()
], AccountList.prototype, "ledger", null);
AccountList = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"], LedgerIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["LedgerIcon"], PlusCircleIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PlusCircleIcon"], LoginIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["LoginIcon"] } })
], AccountList);
/* harmony default export */ __webpack_exports__["default"] = (AccountList);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Login.vue?vue&type=script&lang=ts&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Login.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_CookieHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/CookieHelper */ "./src/lib/CookieHelper.ts");
/* harmony import */ var _components_NotEnoughCookieSpace_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/NotEnoughCookieSpace.vue */ "./src/components/NotEnoughCookieSpace.vue");
/* harmony import */ var _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");









let Login = class Login extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.notEnoughCookieSpace = false;
    }
    async created() {
        if ((_nimiq_utils__WEBPACK_IMPORTED_MODULE_2__["BrowserDetection"].isIOS() || _nimiq_utils__WEBPACK_IMPORTED_MODULE_2__["BrowserDetection"].isSafari()) && !await _lib_CookieHelper__WEBPACK_IMPORTED_MODULE_5__["default"].canFitNewWallets()) {
            this.notEnoughCookieSpace = true;
            return;
        }
        const request = {
            appName: this.request.appName,
            requestedKeyPaths: [_lib_Constants__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_KEY_PATH"]],
            bitcoinXPubPath: _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_7__["BTC_ACCOUNT_KEY_PATH"][config__WEBPACK_IMPORTED_MODULE_8__["default"].bitcoinAddressType][config__WEBPACK_IMPORTED_MODULE_8__["default"].bitcoinNetwork],
        };
        const client = this.$rpc.createKeyguardClient(true);
        client.import(request);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_3__["Static"]
], Login.prototype, "request", void 0);
Login = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { NotEnoughCookieSpace: _components_NotEnoughCookieSpace_vue__WEBPACK_IMPORTED_MODULE_6__["default"] } })
], Login);
/* harmony default export */ __webpack_exports__["default"] = (Login);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/LoginSuccess.vue?vue&type=script&lang=ts&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/LoginSuccess.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _lib_WalletInfoCollector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/WalletInfoCollector */ "./src/lib/WalletInfoCollector.ts");
/* harmony import */ var _lib_CookieHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/CookieHelper */ "./src/lib/CookieHelper.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");












let LoginSuccess = class LoginSuccess extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.walletInfos = [];
        this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.LOADING;
        this.title = this.$root.$t('124');
        this.status = this.$root.$t('93');
        this.message = '';
        this.action = '';
        this.receiptsError = null;
        this.result = null;
        this.resolve = () => { }; // tslint:disable-line:no-empty
    }
    async mounted() {
        const collectionResults = [];
        try {
            await Promise.all(this.keyguardResult.map(async (keyResult) => {
                // The Keyguard always returns (at least) one derived Address,
                const keyguardResultAccounts = keyResult.addresses.map((addressObj) => ({
                    address: new Nimiq.Address(addressObj.address).toUserFriendlyAddress(),
                    path: addressObj.keyPath,
                }));
                let tryCount = 0;
                while (true) {
                    try {
                        tryCount += 1;
                        let collectionResult;
                        if (keyResult.keyType === _lib_Constants__WEBPACK_IMPORTED_MODULE_11__["WalletType"].BIP39) {
                            collectionResult = await _lib_WalletInfoCollector__WEBPACK_IMPORTED_MODULE_9__["default"].collectBip39WalletInfo(keyResult.keyId, keyguardResultAccounts, this.onUpdate.bind(this), this.keyguardResult.length === 1, keyResult.bitcoinXPub);
                        }
                        else {
                            collectionResult = await _lib_WalletInfoCollector__WEBPACK_IMPORTED_MODULE_9__["default"].collectLegacyWalletInfo(keyResult.keyId, keyguardResultAccounts[0], this.onUpdate.bind(this), this.keyguardResult.length === 1);
                        }
                        if (collectionResult.receiptsError) {
                            this.receiptsError = collectionResult.receiptsError;
                        }
                        collectionResult.walletInfo.fileExported = collectionResult.walletInfo.fileExported
                            || keyResult.fileExported;
                        collectionResult.walletInfo.wordsExported = collectionResult.walletInfo.wordsExported
                            || keyResult.wordsExported;
                        if (keyResult.keyLabel) {
                            collectionResult.walletInfo.label = keyResult.keyLabel;
                        }
                        collectionResults.push(collectionResult);
                        break;
                    }
                    catch (e) {
                        this.status = this.$root.$t('20');
                        if (tryCount >= 5)
                            throw e;
                    }
                }
            }));
        }
        catch (e) {
            this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.ERROR;
            this.title = this.$t('120');
            this.message = this.$t('231', { error: e.message || e });
            this.action = this.$t('205');
            await new Promise((resolve) => { this.resolve = resolve; });
            window.location.reload();
            return;
        }
        // In case there is only one returned Account it is always added.
        let keepWalletCondition = () => true;
        if (collectionResults.length > 1) {
            if (collectionResults.some((walletInfo) => walletInfo.hasActivity)) {
                // In case there is more than one account returned and at least one saw activity in the past
                // add the accounts with activity while discarding the others.
                keepWalletCondition = (collectionResult) => collectionResult.hasActivity;
            }
            else {
                // In case of more than one returned account but none saw activity in the past
                // look for the BIP39 account and add it while discarding the others.
                keepWalletCondition = (collectionResult) => collectionResult.walletInfo.type === _lib_Constants__WEBPACK_IMPORTED_MODULE_11__["WalletType"].BIP39;
            }
        }
        let failBecauseOfCookieSpace = false;
        if (_nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["BrowserDetection"].isIOS() || _nimiq_utils__WEBPACK_IMPORTED_MODULE_3__["BrowserDetection"].isSafari()) {
            const walletInfosToKeep = collectionResults
                .filter((collectionResult) => keepWalletCondition(collectionResult))
                .map((collectionResult) => collectionResult.walletInfo.toObject());
            failBecauseOfCookieSpace = !await _lib_CookieHelper__WEBPACK_IMPORTED_MODULE_10__["default"].canFitNewWallets(walletInfosToKeep);
        }
        await Promise.all(collectionResults.map(async (collectionResult) => {
            if (!failBecauseOfCookieSpace && keepWalletCondition(collectionResult)) {
                await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_6__["WalletStore"].Instance.put(collectionResult.walletInfo);
                this.walletInfos.push(collectionResult.walletInfo);
                await collectionResult.releaseKey(false);
            }
            else {
                await collectionResult.releaseKey(true);
            }
        }));
        if (failBecauseOfCookieSpace) {
            this.title = this.$t('217');
            this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.ERROR;
            this.message = this.$t('254');
            this.action = this.$t('97');
            await new Promise((resolve) => { this.resolve = resolve; });
            this.$rpc.reject(new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_11__["ERROR_COOKIE_SPACE"]));
            return;
        }
        this.done();
    }
    onUpdate(walletInfo, currentlyCheckedAccounts) {
        const count = !walletInfo ? 0 : walletInfo.accounts.size;
        this.status = this.$tc('137', count);
    }
    async done() {
        if (!this.walletInfos.length)
            throw new Error('WalletInfo not ready.');
        // Add wallets to vuex
        for (const walletInfo of this.walletInfos) {
            this.$addWalletAndSetActive(walletInfo);
        }
        const result = await Promise.all(this.walletInfos.map((walletInfo) => walletInfo.toAccountType()));
        if (this.receiptsError) {
            this.title = this.$t('277');
            this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.WARNING;
            this.message = this.$t('262');
            this.action = this.$t('97');
            await new Promise((resolve) => { this.resolve = resolve; });
        }
        // In RequestType.CHANGE_PASSWORD a reset password function was added leading to an import with
        // recovery words. Display an appropriate success message in case that is how this successful
        // import came to be.
        if (this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].CHANGE_PASSWORD) {
            this.title = this.$t('281');
            this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.SUCCESS;
            setTimeout(() => { this.$rpc.resolve({ success: true }); }, _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].SUCCESS_REDIRECT_DELAY);
            return;
        }
        this.title = this.$tc('265', result.length);
        this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.SUCCESS;
        setTimeout(() => { this.$rpc.resolve(result); }, _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].SUCCESS_REDIRECT_DELAY);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_7__["Static"]
], LoginSuccess.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["State"]
], LoginSuccess.prototype, "keyguardResult", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vuex_class__WEBPACK_IMPORTED_MODULE_2__["Action"])('addWalletAndSetActive')
], LoginSuccess.prototype, "$addWalletAndSetActive", void 0);
LoginSuccess = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_4__["SmallPage"] } })
], LoginSuccess);
/* harmony default export */ __webpack_exports__["default"] = (LoginSuccess);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/OnboardingSelector.vue?vue&type=script&lang=ts&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/OnboardingSelector.vue?vue&type=script&lang=ts& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _components_OnboardingMenu_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/OnboardingMenu.vue */ "./src/components/OnboardingMenu.vue");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_CookieHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/CookieHelper */ "./src/lib/CookieHelper.ts");
/* harmony import */ var _components_NotEnoughCookieSpace_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/NotEnoughCookieSpace.vue */ "./src/components/NotEnoughCookieSpace.vue");
/* harmony import */ var _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _lib_CookieJar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/CookieJar */ "./src/lib/CookieJar.ts");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../lib/WalletInfo */ "./src/lib/WalletInfo.ts");
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../lib/Helpers */ "./src/lib/Helpers.ts");
















let OnboardingSelector = class OnboardingSelector extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.notEnoughCookieSpace = false;
        this.shouldRender = null;
    }
    async created() {
        /**
         * On iOS/Safari, especially when the Wallet is installed to homescreen, the Hub sometimes deletes its cookie,
         * even before 7 days are over (it should not delete any data in a PWA context, but maybe because the Hub is a
         * non-first-party domain to the PWA and opens in a webview, it is still affected?). The IndexedDB in the
         * webview is still present then.
         *
         * This deletion of the Hub cookie leads to the Wallet triggering the onboarding flow. This check uses this and
         * short-circuits the onboarding request by simply responding with a full list of accounts, which also sets the
         * cookie (through the `_reply` function in `RpcApi`).
         */
        const isPrivileged = Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_15__["includesOrigin"])(config__WEBPACK_IMPORTED_MODULE_11__["default"].privilegedOrigins, this.rpcState.origin);
        if (isPrivileged && (_nimiq_utils__WEBPACK_IMPORTED_MODULE_2__["BrowserDetection"].isIOS() || _nimiq_utils__WEBPACK_IMPORTED_MODULE_2__["BrowserDetection"].isSafari())) {
            const cookieAccounts = await _lib_CookieJar__WEBPACK_IMPORTED_MODULE_12__["default"].eat();
            if (!cookieAccounts.length) {
                const dbAccounts = await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_13__["WalletStore"].Instance.list();
                if (dbAccounts.length) {
                    this.shouldRender = false;
                    const result = await Promise.all(dbAccounts.map(async (entry) => {
                        const walletInfo = _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_14__["WalletInfo"].fromObject(entry);
                        return walletInfo.toAccountType();
                    }));
                    this.$rpc.resolve(result);
                }
            }
        }
        this.notEnoughCookieSpace = (_nimiq_utils__WEBPACK_IMPORTED_MODULE_2__["BrowserDetection"].isIOS() || _nimiq_utils__WEBPACK_IMPORTED_MODULE_2__["BrowserDetection"].isSafari())
            && !await _lib_CookieHelper__WEBPACK_IMPORTED_MODULE_8__["default"].canFitNewWallets();
        if (this.shouldRender === null) {
            this.shouldRender = true;
        }
    }
    signup() {
        const request = {
            appName: this.request.appName,
            defaultKeyPath: _lib_Constants__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_KEY_PATH"],
            enableBackArrow: true,
            bitcoinXPubPath: _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_10__["BTC_ACCOUNT_KEY_PATH"][config__WEBPACK_IMPORTED_MODULE_11__["default"].bitcoinAddressType][config__WEBPACK_IMPORTED_MODULE_11__["default"].bitcoinNetwork],
        };
        const client = this.$rpc.createKeyguardClient();
        client.create(request);
    }
    login() {
        const request = {
            appName: this.request.appName,
            requestedKeyPaths: [_lib_Constants__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_KEY_PATH"]],
            enableBackArrow: true,
            bitcoinXPubPath: _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_10__["BTC_ACCOUNT_KEY_PATH"][config__WEBPACK_IMPORTED_MODULE_11__["default"].bitcoinAddressType][config__WEBPACK_IMPORTED_MODULE_11__["default"].bitcoinNetwork],
        };
        const client = this.$rpc.createKeyguardClient();
        client.import(request);
    }
    ledger() {
        this.$router.push({ name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].SIGNUP}-ledger` });
    }
    close() {
        if (this.isSecondaryOnboarding) {
            window.history.back();
        }
        else {
            this.$rpc.reject(new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_7__["ERROR_CANCELED"]));
        }
    }
    get backButtonLabel() {
        switch (this.originalRouteName) {
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].CHECKOUT:
                return this.$t('33');
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].CHOOSE_ADDRESS:
                return this.$t('34');
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].SIGN_MESSAGE:
                return this.$t('40');
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].CREATE_CASHLINK:
                return this.$t('32');
            default:
                return ''; // use default label
        }
    }
    get headerText() {
        switch (this.originalRouteName) {
            case undefined:
                return this.$t('143');
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].CHECKOUT:
                return this.$t('180');
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].CREATE_CASHLINK:
                return this.$t('154');
            default:
                return undefined;
        }
    }
    get sublineText() {
        switch (this.originalRouteName) {
            case undefined:
                return this.$t('167');
            default:
                return undefined;
        }
    }
    get isSecondaryOnboarding() {
        return this.originalRouteName === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].CHECKOUT
            || this.originalRouteName === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].CHOOSE_ADDRESS
            || this.originalRouteName === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].SIGN_MESSAGE
            || this.originalRouteName === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_5__["RequestType"].CREATE_CASHLINK;
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_6__["Static"]
], OnboardingSelector.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_6__["Static"]
], OnboardingSelector.prototype, "rpcState", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_6__["Static"]
], OnboardingSelector.prototype, "originalRouteName", void 0);
OnboardingSelector = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_3__["default"], OnboardingMenu: _components_OnboardingMenu_vue__WEBPACK_IMPORTED_MODULE_4__["default"], NotEnoughCookieSpace: _components_NotEnoughCookieSpace_vue__WEBPACK_IMPORTED_MODULE_9__["default"] } })
], OnboardingSelector);
/* harmony default export */ __webpack_exports__["default"] = (OnboardingSelector);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Signup.vue?vue&type=script&lang=ts&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Signup.vue?vue&type=script&lang=ts& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/keyguard-client */ "./node_modules/@nimiq/keyguard-client/dist/KeyguardClient.es.js");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_CookieHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/CookieHelper */ "./src/lib/CookieHelper.ts");
/* harmony import */ var _components_NotEnoughCookieSpace_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/NotEnoughCookieSpace.vue */ "./src/components/NotEnoughCookieSpace.vue");
/* harmony import */ var _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");











let Signup = class Signup extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.notEnoughCookieSpace = false;
    }
    async created() {
        if ((_nimiq_utils__WEBPACK_IMPORTED_MODULE_4__["BrowserDetection"].isIOS() || _nimiq_utils__WEBPACK_IMPORTED_MODULE_4__["BrowserDetection"].isSafari()) && !await _lib_CookieHelper__WEBPACK_IMPORTED_MODULE_7__["default"].canFitNewWallets()) {
            this.notEnoughCookieSpace = true;
            return;
        }
        const request = {
            appName: this.request.appName,
            defaultKeyPath: _lib_Constants__WEBPACK_IMPORTED_MODULE_6__["DEFAULT_KEY_PATH"],
            enableBackArrow: (this.keyguardResult && this.keyguardResult.message === _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_3__["Errors"].Messages.GOTO_CREATE)
                ? true
                : false,
            bitcoinXPubPath: _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_9__["BTC_ACCOUNT_KEY_PATH"][config__WEBPACK_IMPORTED_MODULE_10__["default"].bitcoinAddressType][config__WEBPACK_IMPORTED_MODULE_10__["default"].bitcoinNetwork],
        };
        const client = this.$rpc.createKeyguardClient(true);
        client.create(request);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_5__["Static"]
], Signup.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["State"]
], Signup.prototype, "keyguardResult", void 0);
Signup = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { NotEnoughCookieSpace: _components_NotEnoughCookieSpace_vue__WEBPACK_IMPORTED_MODULE_8__["default"] } })
], Signup);
/* harmony default export */ __webpack_exports__["default"] = (Signup);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignupSuccess.vue?vue&type=script&lang=ts&":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignupSuccess.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_AccountInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/AccountInfo */ "./src/lib/AccountInfo.ts");
/* harmony import */ var _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/WalletInfo */ "./src/lib/WalletInfo.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _lib_LabelingMachine__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/lib/LabelingMachine */ "./src/lib/LabelingMachine.ts");
/* harmony import */ var _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../i18n/i18n-setup */ "./src/i18n/i18n-setup.ts");
/* harmony import */ var _lib_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinUtils */ "./src/lib/bitcoin/BitcoinUtils.ts");
/* harmony import */ var _lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinJSLoader */ "./src/lib/bitcoin/BitcoinJSLoader.ts");
/* harmony import */ var _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");














let SignupSuccess = class SignupSuccess extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.title = _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_10__["i18n"].t('106');
        this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.LOADING;
    }
    async mounted() {
        const walletType = _lib_Constants__WEBPACK_IMPORTED_MODULE_5__["WalletType"].BIP39;
        const createdAddress = new Nimiq.Address(this.keyguardResult[0].addresses[0].address);
        const userFriendlyAddress = createdAddress.toUserFriendlyAddress();
        const walletLabel = Object(_lib_LabelingMachine__WEBPACK_IMPORTED_MODULE_9__["labelKeyguardAccount"])(userFriendlyAddress);
        const accountLabel = Object(_lib_LabelingMachine__WEBPACK_IMPORTED_MODULE_9__["labelAddress"])(userFriendlyAddress);
        const accountInfo = new _lib_AccountInfo__WEBPACK_IMPORTED_MODULE_3__["AccountInfo"](this.keyguardResult[0].addresses[0].keyPath, accountLabel, createdAddress);
        // Derive initial BTC addresses
        await Object(_lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_12__["loadBitcoinJS"])();
        const bitcoinXPub = this.keyguardResult[0].bitcoinXPub;
        const btcAddresses = bitcoinXPub
            ? {
                internal: Object(_lib_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_11__["deriveAddressesFromXPub"])(bitcoinXPub, [_lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["INTERNAL_INDEX"]], 0, _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["BTC_ACCOUNT_MAX_ALLOWED_ADDRESS_GAP"]),
                external: Object(_lib_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_11__["deriveAddressesFromXPub"])(bitcoinXPub, [_lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["EXTERNAL_INDEX"]], 0, _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_13__["BTC_ACCOUNT_MAX_ALLOWED_ADDRESS_GAP"]),
            }
            : {
                internal: [],
                external: [],
            };
        const walletInfo = new _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_4__["WalletInfo"](await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_7__["WalletStore"].Instance.deriveId(this.keyguardResult[0].keyId), this.keyguardResult[0].keyId, walletLabel, new Map().set(userFriendlyAddress, accountInfo), [], walletType, false, // keyMissing
        this.keyguardResult[0].fileExported, this.keyguardResult[0].wordsExported, this.keyguardResult[0].bitcoinXPub, btcAddresses);
        await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_7__["WalletStore"].Instance.put(walletInfo);
        // Add wallet to vuex
        this.$addWalletAndSetActive(walletInfo);
        // Artificially delay, to display loading status
        await new Promise((res) => setTimeout(res, 2000));
        this.title = this.$t('266');
        this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.SUCCESS;
        const result = [await walletInfo.toAccountType()];
        setTimeout(() => this.$rpc.resolve(result), _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].SUCCESS_REDIRECT_DELAY);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_6__["State"]
], SignupSuccess.prototype, "keyguardResult", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vuex_class__WEBPACK_IMPORTED_MODULE_6__["Action"])('addWalletAndSetActive')
], SignupSuccess.prototype, "$addWalletAndSetActive", void 0);
SignupSuccess = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"], StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"], CheckmarkIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["CheckmarkIcon"] } })
], SignupSuccess);
/* harmony default export */ __webpack_exports__["default"] = (SignupSuccess);


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

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2& ***!
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
    { staticClass: "container" },
    [
      _c(
        "SmallPage",
        [
          _c("StatusScreen", {
            attrs: {
              state: "error",
              title: _vm.$t('11'),
              message: _vm.$t(
                '253'
              ),
              mainAction: _vm.$t('97')
            },
            on: { "main-action": _vm.onContinue }
          })
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

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/OnboardingMenu.vue?vue&type=template&id=0681a96c&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/OnboardingMenu.vue?vue&type=template&id=0681a96c&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    {
      staticClass: "onboarding-menu",
      class: { "has-three-line-text": _vm.hasThreeLineText }
    },
    [
      _c(
        "button",
        {
          staticClass: "choice ledger",
          attrs: { tabindex: "3" },
          on: { click: _vm.ledger }
        },
        [
          _c("LedgerIcon"),
          _c("h2", { staticClass: "nq-h2" }, [
            _vm._v(_vm._s(_vm.$t('89')))
          ]),
          _c("p", { staticClass: "text" }, [
            _vm._v(
              _vm._s(_vm.$t('91'))
            )
          ])
        ],
        1
      ),
      _c(
        "button",
        {
          staticClass: "choice login",
          attrs: { tabindex: "2" },
          on: { click: _vm.login }
        },
        [
          _c("LoginIcon"),
          _c("h2", { staticClass: "nq-h2" }, [_vm._v(_vm._s(_vm.$t('151')))]),
          _c("p", { staticClass: "text" }, [
            _vm._v(_vm._s(_vm.$t('261')))
          ])
        ],
        1
      ),
      _c(
        "button",
        {
          staticClass: "choice signup",
          attrs: { tabindex: "1" },
          on: { click: _vm.signup }
        },
        [
          _c("PlusCircleIcon"),
          _c("h2", { staticClass: "nq-h2" }, [
            _vm._v(_vm._s(_vm.$t('102')))
          ]),
          _c("p", { staticClass: "text" }, [
            _vm._v(_vm._s(_vm.$t('68')))
          ])
        ],
        1
      ),
      _c("div", { staticClass: "background-container" }, [
        _c("div", { staticClass: "background signup nq-green-bg" }),
        _c("div", { staticClass: "background login nq-light-blue-bg" }),
        _c("div", { staticClass: "background ledger nq-blue-bg" })
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Login.vue?vue&type=template&id=26084dc2&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Login.vue?vue&type=template&id=26084dc2& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.notEnoughCookieSpace ? _c("NotEnoughCookieSpace") : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/LoginSuccess.vue?vue&type=template&id=03a2a494&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/LoginSuccess.vue?vue&type=template&id=03a2a494& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
              state: _vm.state,
              status: _vm.status,
              lightBlue: true,
              mainAction: _vm.action,
              message: _vm.message
            },
            on: { "main-action": _vm.resolve }
          })
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

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/OnboardingSelector.vue?vue&type=template&id=692215d4&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/OnboardingSelector.vue?vue&type=template&id=692215d4&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.notEnoughCookieSpace
    ? _c("NotEnoughCookieSpace")
    : _vm.shouldRender
    ? _c(
        "div",
        { staticClass: "container", class: { "has-heading": _vm.headerText } },
        [
          _c("div", { staticClass: "headline-container" }, [
            _vm.headerText
              ? _c("h1", { staticClass: "uber-header" }, [
                  _vm._v(_vm._s(_vm.headerText))
                ])
              : _vm._e(),
            _vm.sublineText
              ? _c("p", { staticClass: "nq-text subline-text" }, [
                  _vm._v(" " + _vm._s(_vm.sublineText))
                ])
              : _vm._e()
          ]),
          _c(
            "div",
            { staticClass: "center" },
            [
              _c("OnboardingMenu", {
                on: { signup: _vm.signup, login: _vm.login, ledger: _vm.ledger }
              }),
              !_vm.request.disableBack
                ? _c("GlobalClose", {
                    attrs: {
                      buttonLabel: _vm.backButtonLabel,
                      onClose: _vm.close
                    }
                  })
                : _vm._e()
            ],
            1
          ),
          _vm.headerText ? _c("div", { staticClass: "uber-footer" }) : _vm._e()
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Signup.vue?vue&type=template&id=024d905c&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Signup.vue?vue&type=template&id=024d905c& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.notEnoughCookieSpace ? _c("NotEnoughCookieSpace") : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignupSuccess.vue?vue&type=template&id=3fdc32fe&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignupSuccess.vue?vue&type=template&id=3fdc32fe& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
            attrs: { title: _vm.title, state: _vm.state, lightBlue: true }
          })
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

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/OnboardingMenu.vue?vue&type=style&index=0&id=0681a96c&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/OnboardingMenu.vue?vue&type=style&index=0&id=0681a96c&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.onboarding-menu[data-v-0681a96c] {\n    max-width: unset;\n    min-height: unset;\n    width: 89rem;\n    height: auto;\n    padding: 0.75rem;\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n        -ms-flex-direction: row-reverse;\n            flex-direction: row-reverse;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    z-index: 0;\n    overflow: hidden;\n}\n.choice[data-v-0681a96c] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    width: 33.33%;\n    padding: 4rem 4rem 3.75rem;\n    background: none;\n    border: none;\n    outline: none;\n    font-size: inherit;\n    font-family: inherit;\n    -webkit-transition: color 450ms cubic-bezier(0.25, 0, 0, 1);\n    transition: color 450ms cubic-bezier(0.25, 0, 0, 1);\n    cursor: pointer;\n    text-align: left;\n    z-index: 200;\n    position: relative;\n}\n.has-three-line-text .choice[data-v-0681a96c] {\n    min-height: 27rem;\n    padding: 3rem 3rem 2rem; /* by reduced padding the 3 line text might become 2 lines but that still looks ok */\n}\n.choice[data-v-0681a96c],\n.choice.login:hover ~ .choice.signup[data-v-0681a96c],\n.choice.login:focus ~ .choice.signup[data-v-0681a96c],\n.choice.ledger:hover ~ .choice.signup[data-v-0681a96c],\n.choice.ledger:focus ~ .choice.signup[data-v-0681a96c] {\n    color: inherit;\n}\n.choice svg[data-v-0681a96c],\n.choice.login:hover ~ .choice.signup svg[data-v-0681a96c],\n.choice.login:focus ~ .choice.signup svg[data-v-0681a96c],\n.choice.ledger:hover ~ .choice.signup svg[data-v-0681a96c],\n.choice.ledger:focus ~ .choice.signup svg[data-v-0681a96c] {\n    font-size: 6.75rem;\n    color: rgba(31, 35, 72, 0.2); /* based on Nimiq Blue */\n    -webkit-transition: color 450ms cubic-bezier(0.25, 0, 0, 1);\n    transition: color 450ms cubic-bezier(0.25, 0, 0, 1);\n}\n.choice.ledger svg[data-v-0681a96c] {\n    height: 6.75rem;\n    width: unset;\n}\n.choice.signup[data-v-0681a96c],\n.choice[data-v-0681a96c]:hover,\n.choice[data-v-0681a96c]:focus {\n    color: white;\n}\n.choice.signup svg[data-v-0681a96c],\n.choice:hover svg[data-v-0681a96c],\n.choice:focus svg[data-v-0681a96c] {\n    color: white;\n}\n.choice.signup[data-v-0681a96c]::after,\n.choice.login[data-v-0681a96c]::after,\n.choice.ledger:hover ~ .choice.signup[data-v-0681a96c]::after,\n.choice.ledger:focus ~ .choice.signup[data-v-0681a96c]::after {\n    content: '';\n    display: block;\n    position: absolute;\n    right: -0.125rem;\n    top: 2rem;\n    width: 0.25rem;\n    border-radius: 0.25rem;\n    height: calc(100% - 4rem);\n    background: var(--nimiq-blue);\n    opacity: 0.1;\n    -webkit-transition: opacity 450ms cubic-bezier(0.25, 0, 0, 1);\n    transition: opacity 450ms cubic-bezier(0.25, 0, 0, 1);\n}\n.choice.signup[data-v-0681a96c]::after,\n.choice.login[data-v-0681a96c]:hover::after,\n.choice.login[data-v-0681a96c]:focus::after,\n.choice.ledger:hover ~ .choice.login[data-v-0681a96c]::after,\n.choice.ledger:focus ~ .choice.login[data-v-0681a96c]::after {\n    opacity: 0;\n}\n.nq-h2[data-v-0681a96c] {\n    margin-top: 4.25rem;\n    margin-bottom: 1.25rem;\n}\n.text[data-v-0681a96c] {\n    font-size: 2rem;\n    line-height: 1.3125;\n    margin: 0;\n    white-space: pre-line;\n}\n.background-container[data-v-0681a96c] {\n    position: absolute;\n    left: 0.75rem;\n    top: 0.75rem;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    -webkit-transition: -webkit-transform 450ms cubic-bezier(0.25, 0, 0, 1);\n    transition: -webkit-transform 450ms cubic-bezier(0.25, 0, 0, 1);\n    transition: transform 450ms cubic-bezier(0.25, 0, 0, 1);\n    transition: transform 450ms cubic-bezier(0.25, 0, 0, 1), -webkit-transform 450ms cubic-bezier(0.25, 0, 0, 1);\n    z-index: 100;\n    width: calc((100% - 1.5rem) / 3);\n    height: calc(100% - 1.5rem);\n}\n.background[data-v-0681a96c] {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    border-radius: 0.5rem;\n    -webkit-transition: opacity 300ms cubic-bezier(0.25, 0, 0, 1);\n    transition: opacity 300ms cubic-bezier(0.25, 0, 0, 1);\n}\n.background.login[data-v-0681a96c],\n.background.ledger[data-v-0681a96c] {\n    opacity: 0;\n}\n.choice.login:hover ~ .background-container[data-v-0681a96c],\n.choice.login:focus ~ .background-container[data-v-0681a96c] {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0);\n}\n.choice.ledger:hover ~ .background-container[data-v-0681a96c],\n.choice.ledger:focus ~ .background-container[data-v-0681a96c] {\n    -webkit-transform: translate3d(200%, 0, 0);\n            transform: translate3d(200%, 0, 0);\n}\n.choice.login:hover ~ .background-container .background.login[data-v-0681a96c],\n.choice.login:focus ~ .background-container .background.login[data-v-0681a96c] {\n    opacity: 1;\n}\n.choice.ledger:hover ~ .background-container .background.ledger[data-v-0681a96c],\n.choice.ledger:focus ~ .background-container .background.ledger[data-v-0681a96c] {\n    opacity: 1;\n}\n@media (max-width: 750px) {\n    /* make the menu a column */\n.onboarding-menu[data-v-0681a96c] {\n        margin: 0;\n        width: 100%;\n        height: 50rem;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: reverse;\n            -ms-flex-direction: column-reverse;\n                flex-direction: column-reverse;\n}\n.choice[data-v-0681a96c] {\n        width: 100%;\n        height: 33%;\n        min-height: unset !important;\n        padding: 3.25rem 3rem !important;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n}\n.choice h2[data-v-0681a96c] {\n        margin-top: -.25rem;\n}\n.choice .text[data-v-0681a96c] {\n        max-width: 23rem;\n}\n.choice svg[data-v-0681a96c] {\n        position: absolute;\n        top: 50%;\n        /* combination of right and transform, that renders signup and login SVGs at 32px margin\n        (80% * svg width - right = -32px) and ledger at a nice looking position */\n        right: 9.4rem;\n        -webkit-transform: translateY(-50%) translateX(80%);\n                transform: translateY(-50%) translateX(80%);\n}\n.choice.signup[data-v-0681a96c]::after,\n    .choice.login[data-v-0681a96c]::after,\n    .choice.ledger:hover ~ .choice.signup[data-v-0681a96c]::after,\n    .choice.ledger:focus ~ .choice.signup[data-v-0681a96c]::after {\n        top: unset;\n        right: unset;\n        bottom: -0.125rem;\n        left: 2rem;\n        height: 0.25rem;\n        border-radius: 0.25rem;\n        width: calc(100% - 4rem);\n}\n.background-container[data-v-0681a96c] {\n        width: calc(100% - 1.5rem);\n        height: calc((100% - 1.5rem) / 3);\n}\n.choice.login:hover ~ .background-container[data-v-0681a96c],\n    .choice.login:focus ~ .background-container[data-v-0681a96c] {\n        -webkit-transform: translate3d(0, 100%, 0);\n                transform: translate3d(0, 100%, 0);\n}\n.choice.ledger:hover ~ .background-container[data-v-0681a96c],\n    .choice.ledger:focus ~ .background-container[data-v-0681a96c] {\n        -webkit-transform: translate3d(0, 200%, 0);\n                transform: translate3d(0, 200%, 0);\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/OnboardingSelector.vue?vue&type=style&index=0&id=692215d4&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/OnboardingSelector.vue?vue&type=style&index=0&id=692215d4&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.container.has-heading[data-v-692215d4] {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important;\n}\n.headline-container[data-v-692215d4],\n.uber-footer[data-v-692215d4] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    margin-top: 6rem;\n}\n.uber-header[data-v-692215d4] {\n    font-size: 5rem;\n    margin: 0;\n}\n.subline-text[data-v-692215d4] {\n    font-size: 2rem;\n    font-weight: 600;\n    color: rgba(31, 35, 72, 0.6);\n    white-space: pre-line;\n    text-align: center;\n}\n.center[data-v-692215d4] {\n    text-align: center;\n    width: 100%;\n}\n.onboarding-menu[data-v-692215d4] {\n    margin: auto !important;\n}\n@media (max-width: 450px) {\n.headline-container[data-v-692215d4] {\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n        margin-top: 2rem;\n}\n.subline-text[data-v-692215d4] {\n        font-size: 2.125rem;\n}\n.onboarding-menu[data-v-692215d4] {\n        height: 55rem;\n}\n.uber-footer[data-v-692215d4] {\n        display: none;\n}\n}\n", ""]);
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

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/OnboardingMenu.vue?vue&type=style&index=0&id=0681a96c&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/OnboardingMenu.vue?vue&type=style&index=0&id=0681a96c&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./OnboardingMenu.vue?vue&type=style&index=0&id=0681a96c&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/OnboardingMenu.vue?vue&type=style&index=0&id=0681a96c&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("184a1ce8", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/OnboardingSelector.vue?vue&type=style&index=0&id=692215d4&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/OnboardingSelector.vue?vue&type=style&index=0&id=692215d4&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./OnboardingSelector.vue?vue&type=style&index=0&id=692215d4&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/OnboardingSelector.vue?vue&type=style&index=0&id=692215d4&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("b3fe2afa", content, false, {"sourceMap":false,"shadowMode":false});
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

/***/ "./src/components/NotEnoughCookieSpace.vue":
/*!*************************************************!*\
  !*** ./src/components/NotEnoughCookieSpace.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotEnoughCookieSpace_vue_vue_type_template_id_04d2d0e2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2& */ "./src/components/NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2&");
/* harmony import */ var _NotEnoughCookieSpace_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotEnoughCookieSpace.vue?vue&type=script&lang=ts& */ "./src/components/NotEnoughCookieSpace.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NotEnoughCookieSpace_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotEnoughCookieSpace_vue_vue_type_template_id_04d2d0e2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NotEnoughCookieSpace_vue_vue_type_template_id_04d2d0e2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/NotEnoughCookieSpace.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/NotEnoughCookieSpace.vue?vue&type=script&lang=ts&":
/*!**************************************************************************!*\
  !*** ./src/components/NotEnoughCookieSpace.vue?vue&type=script&lang=ts& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotEnoughCookieSpace_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./NotEnoughCookieSpace.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/NotEnoughCookieSpace.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotEnoughCookieSpace_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2&":
/*!********************************************************************************!*\
  !*** ./src/components/NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotEnoughCookieSpace_vue_vue_type_template_id_04d2d0e2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/NotEnoughCookieSpace.vue?vue&type=template&id=04d2d0e2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotEnoughCookieSpace_vue_vue_type_template_id_04d2d0e2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotEnoughCookieSpace_vue_vue_type_template_id_04d2d0e2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/OnboardingMenu.vue":
/*!*******************************************!*\
  !*** ./src/components/OnboardingMenu.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OnboardingMenu_vue_vue_type_template_id_0681a96c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OnboardingMenu.vue?vue&type=template&id=0681a96c&scoped=true& */ "./src/components/OnboardingMenu.vue?vue&type=template&id=0681a96c&scoped=true&");
/* harmony import */ var _OnboardingMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OnboardingMenu.vue?vue&type=script&lang=ts& */ "./src/components/OnboardingMenu.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _OnboardingMenu_vue_vue_type_style_index_0_id_0681a96c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OnboardingMenu.vue?vue&type=style&index=0&id=0681a96c&scoped=true&lang=css& */ "./src/components/OnboardingMenu.vue?vue&type=style&index=0&id=0681a96c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _OnboardingMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OnboardingMenu_vue_vue_type_template_id_0681a96c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OnboardingMenu_vue_vue_type_template_id_0681a96c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0681a96c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/OnboardingMenu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/OnboardingMenu.vue?vue&type=script&lang=ts&":
/*!********************************************************************!*\
  !*** ./src/components/OnboardingMenu.vue?vue&type=script&lang=ts& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./OnboardingMenu.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/OnboardingMenu.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/OnboardingMenu.vue?vue&type=style&index=0&id=0681a96c&scoped=true&lang=css&":
/*!****************************************************************************************************!*\
  !*** ./src/components/OnboardingMenu.vue?vue&type=style&index=0&id=0681a96c&scoped=true&lang=css& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingMenu_vue_vue_type_style_index_0_id_0681a96c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./OnboardingMenu.vue?vue&type=style&index=0&id=0681a96c&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/OnboardingMenu.vue?vue&type=style&index=0&id=0681a96c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingMenu_vue_vue_type_style_index_0_id_0681a96c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingMenu_vue_vue_type_style_index_0_id_0681a96c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingMenu_vue_vue_type_style_index_0_id_0681a96c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingMenu_vue_vue_type_style_index_0_id_0681a96c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingMenu_vue_vue_type_style_index_0_id_0681a96c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/OnboardingMenu.vue?vue&type=template&id=0681a96c&scoped=true&":
/*!**************************************************************************************!*\
  !*** ./src/components/OnboardingMenu.vue?vue&type=template&id=0681a96c&scoped=true& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingMenu_vue_vue_type_template_id_0681a96c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./OnboardingMenu.vue?vue&type=template&id=0681a96c&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/OnboardingMenu.vue?vue&type=template&id=0681a96c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingMenu_vue_vue_type_template_id_0681a96c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingMenu_vue_vue_type_template_id_0681a96c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/lib/CookieHelper.ts":
/*!*********************************!*\
  !*** ./src/lib/CookieHelper.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CookieHelper; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _CookieJar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CookieJar */ "./src/lib/CookieJar.ts");
/* harmony import */ var _WalletStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WalletStore */ "./src/lib/WalletStore.ts");
// tslint:disable no-bitwise no-shadowed-variable



class CookieHelper {
    static async canFitNewWallets(wallets) {
        const [canHubCookieFitNewWallets, canKeyguardCookieFitNewWallets] = await Promise.all([
            _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].canFitNewWallets(wallets),
            CookieHelper._canKeyguardCookieFitNewKey(),
        ]);
        return canHubCookieFitNewWallets && canKeyguardCookieFitNewWallets;
    }
    static async _canKeyguardCookieFitNewKey() {
        const wallets = await _WalletStore__WEBPACK_IMPORTED_MODULE_2__["WalletStore"].Instance.list();
        const nonLedgerWallets = wallets.filter((wallet) => wallet.type !== _Constants__WEBPACK_IMPORTED_MODULE_0__["WalletType"].LEDGER);
        const cookieSize = (nonLedgerWallets.length + 1) * this.KEYGUARD_COOKIE_KEY_SIZE;
        return cookieSize <= this.MAX_COOKIE_SIZE_KEYGUARD;
    }
}
CookieHelper.MAX_COOKIE_SIZE_KEYGUARD = 4000; // byte
CookieHelper.KEYGUARD_COOKIE_KEY_SIZE = 47; // 1 char for type, 1 for hasPin, 44 for id, 1 for separator


/***/ }),

/***/ "./src/views/Login.vue":
/*!*****************************!*\
  !*** ./src/views/Login.vue ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_26084dc2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=26084dc2& */ "./src/views/Login.vue?vue&type=template&id=26084dc2&");
/* harmony import */ var _Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=ts& */ "./src/views/Login.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_26084dc2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_26084dc2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/Login.vue?vue&type=script&lang=ts&":
/*!******************************************************!*\
  !*** ./src/views/Login.vue?vue&type=script&lang=ts& ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Login.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/Login.vue?vue&type=template&id=26084dc2&":
/*!************************************************************!*\
  !*** ./src/views/Login.vue?vue&type=template&id=26084dc2& ***!
  \************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_26084dc2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=26084dc2& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Login.vue?vue&type=template&id=26084dc2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_26084dc2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_26084dc2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/views/LoginSuccess.vue":
/*!************************************!*\
  !*** ./src/views/LoginSuccess.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoginSuccess_vue_vue_type_template_id_03a2a494___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoginSuccess.vue?vue&type=template&id=03a2a494& */ "./src/views/LoginSuccess.vue?vue&type=template&id=03a2a494&");
/* harmony import */ var _LoginSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoginSuccess.vue?vue&type=script&lang=ts& */ "./src/views/LoginSuccess.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LoginSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LoginSuccess_vue_vue_type_template_id_03a2a494___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LoginSuccess_vue_vue_type_template_id_03a2a494___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/LoginSuccess.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/LoginSuccess.vue?vue&type=script&lang=ts&":
/*!*************************************************************!*\
  !*** ./src/views/LoginSuccess.vue?vue&type=script&lang=ts& ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./LoginSuccess.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/LoginSuccess.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/LoginSuccess.vue?vue&type=template&id=03a2a494&":
/*!*******************************************************************!*\
  !*** ./src/views/LoginSuccess.vue?vue&type=template&id=03a2a494& ***!
  \*******************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginSuccess_vue_vue_type_template_id_03a2a494___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./LoginSuccess.vue?vue&type=template&id=03a2a494& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/LoginSuccess.vue?vue&type=template&id=03a2a494&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginSuccess_vue_vue_type_template_id_03a2a494___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginSuccess_vue_vue_type_template_id_03a2a494___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/views/OnboardingSelector.vue":
/*!******************************************!*\
  !*** ./src/views/OnboardingSelector.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OnboardingSelector_vue_vue_type_template_id_692215d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OnboardingSelector.vue?vue&type=template&id=692215d4&scoped=true& */ "./src/views/OnboardingSelector.vue?vue&type=template&id=692215d4&scoped=true&");
/* harmony import */ var _OnboardingSelector_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OnboardingSelector.vue?vue&type=script&lang=ts& */ "./src/views/OnboardingSelector.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _OnboardingSelector_vue_vue_type_style_index_0_id_692215d4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OnboardingSelector.vue?vue&type=style&index=0&id=692215d4&scoped=true&lang=css& */ "./src/views/OnboardingSelector.vue?vue&type=style&index=0&id=692215d4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _OnboardingSelector_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OnboardingSelector_vue_vue_type_template_id_692215d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OnboardingSelector_vue_vue_type_template_id_692215d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "692215d4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/OnboardingSelector.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/OnboardingSelector.vue?vue&type=script&lang=ts&":
/*!*******************************************************************!*\
  !*** ./src/views/OnboardingSelector.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingSelector_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./OnboardingSelector.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/OnboardingSelector.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingSelector_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/OnboardingSelector.vue?vue&type=style&index=0&id=692215d4&scoped=true&lang=css&":
/*!***************************************************************************************************!*\
  !*** ./src/views/OnboardingSelector.vue?vue&type=style&index=0&id=692215d4&scoped=true&lang=css& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingSelector_vue_vue_type_style_index_0_id_692215d4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./OnboardingSelector.vue?vue&type=style&index=0&id=692215d4&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/OnboardingSelector.vue?vue&type=style&index=0&id=692215d4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingSelector_vue_vue_type_style_index_0_id_692215d4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingSelector_vue_vue_type_style_index_0_id_692215d4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingSelector_vue_vue_type_style_index_0_id_692215d4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingSelector_vue_vue_type_style_index_0_id_692215d4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingSelector_vue_vue_type_style_index_0_id_692215d4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/OnboardingSelector.vue?vue&type=template&id=692215d4&scoped=true&":
/*!*************************************************************************************!*\
  !*** ./src/views/OnboardingSelector.vue?vue&type=template&id=692215d4&scoped=true& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingSelector_vue_vue_type_template_id_692215d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./OnboardingSelector.vue?vue&type=template&id=692215d4&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/OnboardingSelector.vue?vue&type=template&id=692215d4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingSelector_vue_vue_type_template_id_692215d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OnboardingSelector_vue_vue_type_template_id_692215d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/views/Signup.vue":
/*!******************************!*\
  !*** ./src/views/Signup.vue ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Signup_vue_vue_type_template_id_024d905c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Signup.vue?vue&type=template&id=024d905c& */ "./src/views/Signup.vue?vue&type=template&id=024d905c&");
/* harmony import */ var _Signup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Signup.vue?vue&type=script&lang=ts& */ "./src/views/Signup.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Signup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Signup_vue_vue_type_template_id_024d905c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Signup_vue_vue_type_template_id_024d905c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/Signup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/Signup.vue?vue&type=script&lang=ts&":
/*!*******************************************************!*\
  !*** ./src/views/Signup.vue?vue&type=script&lang=ts& ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Signup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Signup.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Signup.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Signup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/Signup.vue?vue&type=template&id=024d905c&":
/*!*************************************************************!*\
  !*** ./src/views/Signup.vue?vue&type=template&id=024d905c& ***!
  \*************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Signup_vue_vue_type_template_id_024d905c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Signup.vue?vue&type=template&id=024d905c& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Signup.vue?vue&type=template&id=024d905c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Signup_vue_vue_type_template_id_024d905c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Signup_vue_vue_type_template_id_024d905c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/views/SignupSuccess.vue":
/*!*************************************!*\
  !*** ./src/views/SignupSuccess.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SignupSuccess_vue_vue_type_template_id_3fdc32fe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignupSuccess.vue?vue&type=template&id=3fdc32fe& */ "./src/views/SignupSuccess.vue?vue&type=template&id=3fdc32fe&");
/* harmony import */ var _SignupSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SignupSuccess.vue?vue&type=script&lang=ts& */ "./src/views/SignupSuccess.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SignupSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SignupSuccess_vue_vue_type_template_id_3fdc32fe___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SignupSuccess_vue_vue_type_template_id_3fdc32fe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/SignupSuccess.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/SignupSuccess.vue?vue&type=script&lang=ts&":
/*!**************************************************************!*\
  !*** ./src/views/SignupSuccess.vue?vue&type=script&lang=ts& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignupSuccess.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignupSuccess.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/SignupSuccess.vue?vue&type=template&id=3fdc32fe&":
/*!********************************************************************!*\
  !*** ./src/views/SignupSuccess.vue?vue&type=template&id=3fdc32fe& ***!
  \********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupSuccess_vue_vue_type_template_id_3fdc32fe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignupSuccess.vue?vue&type=template&id=3fdc32fe& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignupSuccess.vue?vue&type=template&id=3fdc32fe&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupSuccess_vue_vue_type_template_id_3fdc32fe___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupSuccess_vue_vue_type_template_id_3fdc32fe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=onboarding.js.map