(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add-ledger"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/AddAddressLedger.vue?vue&type=script&lang=ts&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/AddAddressLedger.vue?vue&type=script&lang=ts& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/LedgerUi.vue */ "./src/components/LedgerUi.vue");
/* harmony import */ var _components_IdenticonSelector_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/IdenticonSelector.vue */ "./src/components/IdenticonSelector.vue");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _lib_AccountInfo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/AccountInfo */ "./src/lib/AccountInfo.ts");
/* harmony import */ var _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nimiq/ledger-api */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_LabelingMachine__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/LabelingMachine */ "./src/lib/LabelingMachine.ts");
var AddAddressLedger_1;













let AddAddressLedger = AddAddressLedger_1 = class AddAddressLedger extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.state = AddAddressLedger_1.State.LEDGER_INTERACTION;
        this.addressesToSelectFrom = [];
    }
    async created() {
        // called every time the router shows this page
        const account = (await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_10__["WalletStore"].Instance.get(this.request.walletId));
        this.account = account;
        let startIndex = 0;
        const newestAddress = Array.from(account.accounts.values()).pop();
        if (newestAddress) {
            try {
                startIndex = Object(_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["parseBip32Path"])(newestAddress.path).addressIndex + 1;
            }
            catch (e) {
                // Ignore and start at index 0. Should never happen.
            }
        }
        const pathsToDerive = [];
        for (let keyId = startIndex; keyId < startIndex + _lib_Constants__WEBPACK_IMPORTED_MODULE_11__["ACCOUNT_MAX_ALLOWED_ADDRESS_GAP"]; ++keyId) {
            pathsToDerive.push(Object(_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["getBip32Path"])({
                coin: _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["Coin"].NIMIQ,
                addressIndex: keyId,
            }));
        }
        const derivedAddressInfos = await _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["default"].Nimiq.deriveAddresses(pathsToDerive, this.account.keyId);
        this.addressesToSelectFrom = derivedAddressInfos.map((addressInfo) => new _lib_AccountInfo__WEBPACK_IMPORTED_MODULE_8__["AccountInfo"](addressInfo.keyPath, Object(_lib_LabelingMachine__WEBPACK_IMPORTED_MODULE_12__["labelAddress"])(addressInfo.address), Nimiq.Address.fromString(addressInfo.address), 0));
        this.state = AddAddressLedger_1.State.IDENTICON_SELECTION;
    }
    destroyed() {
        _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["default"].disconnect(
        /* cancelRequest */ true, 
        /* requestTypeToDisconnect */ _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["RequestTypeNimiq"].DERIVE_ADDRESSES);
    }
    async _onAddressSelected(selectedAccount) {
        const userFriendlyAddress = selectedAccount.userFriendlyAddress;
        this.account.accounts.set(userFriendlyAddress, selectedAccount);
        await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_10__["WalletStore"].Instance.put(this.account);
        this.state = AddAddressLedger_1.State.FINISHED;
        await new Promise((resolve) => setTimeout(resolve, _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"].SUCCESS_REDIRECT_DELAY));
        const result = {
            address: userFriendlyAddress,
            label: selectedAccount.label,
        };
        this.$rpc.resolve(result);
    }
};
AddAddressLedger.State = {
    LEDGER_INTERACTION: 'ledger-interaction',
    IDENTICON_SELECTION: 'identicon-selection',
    FINISHED: 'finished',
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_7__["Static"]
], AddAddressLedger.prototype, "request", void 0);
AddAddressLedger = AddAddressLedger_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: {
            PageBody: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageBody"],
            SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"],
            PageHeader: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageHeader"],
            StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
            GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
            LedgerUi: _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
            IdenticonSelector: _components_IdenticonSelector_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
        } })
], AddAddressLedger);
/* harmony default export */ __webpack_exports__["default"] = (AddAddressLedger);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignupLedger.vue?vue&type=script&lang=ts&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignupLedger.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
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
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/LedgerUi.vue */ "./src/components/LedgerUi.vue");
/* harmony import */ var _components_IdenticonSelector_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/IdenticonSelector.vue */ "./src/components/IdenticonSelector.vue");
/* harmony import */ var _lib_WalletInfoCollector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/WalletInfoCollector */ "./src/lib/WalletInfoCollector.ts");
/* harmony import */ var _lib_AccountInfo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/AccountInfo */ "./src/lib/AccountInfo.ts");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _lib_LabelingMachine__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/lib/LabelingMachine */ "./src/lib/LabelingMachine.ts");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
var SignupLedger_1;













let SignupLedger = SignupLedger_1 = class SignupLedger extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.state = SignupLedger_1.State.LOADING;
        this.walletInfo = null;
        this.accountsToSelectFrom = [];
        this.hadAccounts = false;
        this.cancelled = false;
        this.retryingToFetchAddresses = false;
        this.fetchingAddressesIncomplete = false;
        this.fetchError = '';
    }
    get statusScreenState() {
        switch (this.state) {
            case SignupLedger_1.State.FETCHING_INCOMPLETE:
                return _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].State.WARNING;
            case SignupLedger_1.State.FETCHING_FAILED:
                return _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].State.ERROR;
            case SignupLedger_1.State.FINISHED:
                return _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].State.SUCCESS;
            default:
                return _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].State.LOADING;
        }
    }
    get statusScreenTitle() {
        switch (this.state) {
            case SignupLedger_1.State.FETCHING_ADDRESSES:
                return this.$t('124');
            case SignupLedger_1.State.FETCHING_INCOMPLETE:
                return this.$t('277');
            case SignupLedger_1.State.FETCHING_FAILED:
                return this.$t('120');
            case SignupLedger_1.State.FINISHED:
                return this.hadAccounts
                    ? this.$t('275')
                    : this.$t('267');
            default:
                return '';
        }
    }
    get statusScreenStatus() {
        if (this.state !== SignupLedger_1.State.FETCHING_ADDRESSES)
            return '';
        else if (this.retryingToFetchAddresses)
            return this.$t('117');
        else {
            const count = !this.walletInfo ? 0 : this.walletInfo.accounts.size;
            return count > 0
                ? this.$tc('137', count)
                : '';
        }
    }
    get statusScreenMessage() {
        switch (this.state) {
            case SignupLedger_1.State.FETCHING_INCOMPLETE:
                return this.$t('262');
            case SignupLedger_1.State.FETCHING_FAILED:
                return this.$t('231', { error: this.fetchError });
            default:
                return '';
        }
    }
    get statusScreenAction() {
        switch (this.state) {
            case SignupLedger_1.State.FETCHING_INCOMPLETE:
                return this.$t('97');
            case SignupLedger_1.State.FETCHING_FAILED:
                return this.$t('205');
            default:
                return '';
        }
    }
    async created() {
        // called every time the router shows this page
        let tryCount = 0; // trying multiple times in case of errors due to weak network connection
        while (!this.cancelled) {
            try {
                tryCount += 1;
                // triggers loading and connecting states in LedgerUi if applicable
                const collectionResult = await _lib_WalletInfoCollector__WEBPACK_IMPORTED_MODULE_8__["default"].collectLedgerWalletInfo(
                /* initialAccounts */ [], (walletInfo, currentlyCheckedAccounts) => this._onWalletInfoUpdate(walletInfo, currentlyCheckedAccounts), 
                /* skipActivityCheck */ true);
                this.retryingToFetchAddresses = false;
                this.fetchingAddressesIncomplete = !!collectionResult.receiptsError;
                break;
            }
            catch (e) {
                if (tryCount >= 5) {
                    this.fetchError = e.message || e;
                    if (_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].currentState.type !== _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].ERROR) {
                        // For errors not coming from the LedgerApi, switch to the error screen. For Ledger errors, we
                        // display the error in the LedgerUi.
                        this.state = SignupLedger_1.State.FETCHING_FAILED;
                    }
                    return;
                }
                this.retryingToFetchAddresses = true;
                console.warn('Error while collecting Ledger WalletInfo, retrying', e);
                if (!_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].isBusy)
                    continue;
                // await Ledger request from current iteration to be cancelled to able to start the next one
                await new Promise((resolve) => _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].once(_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["EventType"].REQUEST_CANCELLED, resolve));
            }
        }
        this._continue();
    }
    destroyed() {
        _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].disconnect(
        /* cancelRequest */ true, 
        /* requestTypesToDisconnect */ [_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].GET_WALLET_ID, _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].DERIVE_ADDRESSES]);
        this.cancelled = true;
    }
    async _onAccountSelected(selectedAccount) {
        this.walletInfo.accounts.set(selectedAccount.address.toUserFriendlyAddress(), selectedAccount);
        await this._onWalletInfoUpdate(this.walletInfo);
        this.state = SignupLedger_1.State.WALLET_SUMMARY;
    }
    async _onWalletInfoUpdate(walletInfo, currentlyCheckedAccounts) {
        this.walletInfo = walletInfo;
        if (this.cancelled)
            return;
        this.walletInfo.fileExported = true;
        this.walletInfo.wordsExported = true;
        if (walletInfo.accounts.size > 0) {
            await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_10__["WalletStore"].Instance.put(walletInfo);
        }
        if (currentlyCheckedAccounts && this.accountsToSelectFrom.length === 0) {
            // set the first set of checked accounts as the one the user can select one from, in case he doesn't have
            // an account already
            this.accountsToSelectFrom = currentlyCheckedAccounts.map((account) => new _lib_AccountInfo__WEBPACK_IMPORTED_MODULE_9__["AccountInfo"](account.path, Object(_lib_LabelingMachine__WEBPACK_IMPORTED_MODULE_11__["labelAddress"])(account.address), Nimiq.Address.fromString(account.address), 0));
        }
        this.$forceUpdate(); // because vue does not recognize changes in walletInfo.accounts map // TODO verify
    }
    _continue() {
        if (this.cancelled)
            return;
        if (this.state === SignupLedger_1.State.FETCHING_FAILED) {
            window.location.reload();
        }
        else if (this.fetchingAddressesIncomplete && this.state !== SignupLedger_1.State.FETCHING_INCOMPLETE) {
            // warn user that his addresses might be incomplete
            this.state = SignupLedger_1.State.FETCHING_INCOMPLETE;
        }
        else if (this.walletInfo.accounts.size > 0) {
            this.hadAccounts = true;
            this.done();
        }
        else {
            // Let user select an account
            this.state = SignupLedger_1.State.IDENTICON_SELECTION;
        }
    }
    async done() {
        // Add wallet to vuex
        this.$addWalletAndSetActive(this.walletInfo);
        const result = [await this.walletInfo.toAccountType()];
        this.state = SignupLedger_1.State.FINISHED;
        setTimeout(() => {
            this.$rpc.resolve(result);
        }, _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"].SUCCESS_REDIRECT_DELAY);
    }
    _showLedger() {
        if (this.state === SignupLedger_1.State.FINISHED)
            return;
        const currentRequest = _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].currentRequest;
        if (!currentRequest) {
            // This should never happen. But in case it does, just show the Ledger as there might be an error shown.
            this.state = SignupLedger_1.State.LEDGER_INTERACTION;
            return;
        }
        if (currentRequest.cancelled || (currentRequest.type !== _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].GET_WALLET_ID
            && currentRequest.type !== _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["RequestTypeNimiq"].DERIVE_ADDRESSES))
            return;
        if (_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].currentState.type === _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].REQUEST_PROCESSING
            || _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["default"].currentState.type === _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_3__["StateType"].REQUEST_CANCELLING) {
            // When we actually fetch the accounts from the device, we want to show our own StatusScreen instead of
            // the LedgerUi processing screen to avoid switching back and forth between LedgerUi and StatusScreen during
            // account finding.
            this.state = SignupLedger_1.State.FETCHING_ADDRESSES;
        }
        else {
            this.state = SignupLedger_1.State.LEDGER_INTERACTION;
        }
    }
};
SignupLedger.State = {
    LOADING: 'loading',
    LEDGER_INTERACTION: 'ledger-interaction',
    FETCHING_ADDRESSES: 'fetching-addresses',
    FETCHING_INCOMPLETE: 'fetching-incomplete',
    FETCHING_FAILED: 'fetching-failed',
    IDENTICON_SELECTION: 'identicon-selection',
    WALLET_SUMMARY: 'wallet-summary',
    FINISHED: 'finished',
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vuex_class__WEBPACK_IMPORTED_MODULE_12__["Action"])('addWalletAndSetActive')
], SignupLedger.prototype, "$addWalletAndSetActive", void 0);
SignupLedger = SignupLedger_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: {
            PageBody: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageBody"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"], PageHeader: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageHeader"],
            StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_4__["default"], GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_5__["default"], LedgerUi: _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
            IdenticonSelector: _components_IdenticonSelector_vue__WEBPACK_IMPORTED_MODULE_7__["default"], AccountRing: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["AccountRing"],
        } })
], SignupLedger);
/* harmony default export */ __webpack_exports__["default"] = (SignupLedger);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/AddAddressLedger.vue?vue&type=template&id=20cbb596&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/AddAddressLedger.vue?vue&type=template&id=20cbb596&scoped=true& ***!
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
    { staticClass: "container" },
    [
      _c(
        "SmallPage",
        [
          _c(
            "transition",
            { attrs: { name: "transition-fade" } },
            [
              _vm.state === _vm.constructor.State.LEDGER_INTERACTION
                ? _c("LedgerUi")
                : _vm._e()
            ],
            1
          ),
          _c(
            "transition",
            { attrs: { name: "transition-fade" } },
            [
              _vm.state === _vm.constructor.State.IDENTICON_SELECTION ||
              _vm.state === _vm.constructor.State.FINISHED
                ? _c(
                    "IdenticonSelector",
                    {
                      attrs: {
                        accounts: _vm.addressesToSelectFrom,
                        confirmButtonText: _vm.$t('16')
                      },
                      on: { "identicon-selected": _vm._onAddressSelected }
                    },
                    [
                      _c(
                        "PageHeader",
                        { attrs: { slot: "header" }, slot: "header" },
                        [_vm._v(_vm._s(_vm.$t('63')))]
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          ),
          _vm.state === _vm.constructor.State.FINISHED
            ? _c("StatusScreen", {
                staticClass: "grow-from-bottom-button",
                attrs: { state: "success", title: _vm.$t('19') }
              })
            : _vm._e()
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

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignupLedger.vue?vue&type=template&id=db60dd4a&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignupLedger.vue?vue&type=template&id=db60dd4a&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
          _vm.state === _vm.constructor.State.LOADING ||
          _vm.state === _vm.constructor.State.LEDGER_INTERACTION ||
          _vm.state === _vm.constructor.State.FETCHING_ADDRESSES
            ? _c("LedgerUi", { on: { "information-shown": _vm._showLedger } })
            : _vm._e(),
          _c(
            "transition",
            { attrs: { name: "transition-fade" } },
            [
              _vm.state === _vm.constructor.State.LOADING ||
              _vm.state === _vm.constructor.State.FETCHING_ADDRESSES ||
              _vm.state === _vm.constructor.State.FETCHING_INCOMPLETE ||
              _vm.state === _vm.constructor.State.FETCHING_FAILED ||
              _vm.state === _vm.constructor.State.FINISHED
                ? _c("StatusScreen", {
                    class: {
                      "grow-from-bottom-button":
                        _vm.state === _vm.constructor.State.FINISHED &&
                        !_vm.hadAccounts
                    },
                    attrs: {
                      state: _vm.statusScreenState,
                      title: _vm.statusScreenTitle,
                      status: _vm.statusScreenStatus,
                      message: _vm.statusScreenMessage,
                      mainAction: _vm.statusScreenAction
                    },
                    on: { "main-action": _vm._continue }
                  })
                : _vm._e()
            ],
            1
          ),
          _c(
            "transition",
            { attrs: { name: "transition-fade" } },
            [
              _vm.state === _vm.constructor.State.IDENTICON_SELECTION
                ? _c("IdenticonSelector", {
                    attrs: {
                      accounts: _vm.accountsToSelectFrom,
                      confirmAccountSelection: false
                    },
                    on: { "identicon-selected": _vm._onAccountSelected }
                  })
                : _vm._e()
            ],
            1
          ),
          _c("transition", { attrs: { name: "transition-fade" } }, [
            _vm.state === _vm.constructor.State.WALLET_SUMMARY ||
            (_vm.state === _vm.constructor.State.FINISHED && !_vm.hadAccounts)
              ? _c(
                  "div",
                  { staticClass: "wallet-summary" },
                  [
                    _c("h1", { staticClass: "nq-h1" }, [
                      _vm._v(_vm._s(_vm.$t('9')))
                    ]),
                    _c("AccountRing", {
                      attrs: {
                        addresses: Array.from(_vm.walletInfo.accounts.keys()),
                        animate: ""
                      }
                    }),
                    _c("div", { staticClass: "message nq-text" }, [
                      _vm._v(
                        _vm._s(
                          _vm.$t(
                            '240'
                          )
                        )
                      )
                    ]),
                    _c(
                      "button",
                      { staticClass: "nq-button", on: { click: _vm.done } },
                      [_vm._v(_vm._s(_vm.$t('125')))]
                    )
                  ],
                  1
                )
              : _vm._e()
          ])
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

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/AddAddressLedger.vue?vue&type=style&index=0&id=20cbb596&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/AddAddressLedger.vue?vue&type=style&index=0&id=20cbb596&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.small-page[data-v-20cbb596] {\n    overflow: hidden;\n    position: relative;\n}\n.small-page > *[data-v-20cbb596] {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    -webkit-transition: opacity .4s;\n    transition: opacity .4s;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignupLedger.vue?vue&type=style&index=0&id=db60dd4a&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignupLedger.vue?vue&type=style&index=0&id=db60dd4a&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.small-page[data-v-db60dd4a] {\n    position: relative;\n    overflow: hidden;\n}\n.small-page > *[data-v-db60dd4a] {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    -webkit-transition: opacity .4s;\n    transition: opacity .4s;\n}\n.small-page[data-v-db60dd4a] > :not(.status-screen) {\n    width: 100%;\n    height: 100%;\n    background: white;\n}\n.status-screen[data-v-db60dd4a] .title {\n    min-height: 1em; /* to avoid jumping of the UI when setting a title */\n}\n.ledger-ui[data-v-db60dd4a] {\n    z-index: 0;\n}\n.wallet-summary[data-v-db60dd4a] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    padding: 4rem;\n}\n.wallet-summary h1[data-v-db60dd4a] {\n    margin-top: 0;\n}\n.wallet-summary .account-ring[data-v-db60dd4a] {\n    margin: 4.25rem;\n    width: 20rem;\n}\n.wallet-summary .message[data-v-db60dd4a] {\n    font-size: 2.5rem;\n    text-align: center;\n    max-width: 35rem;\n}\n.wallet-summary .nq-button[data-v-db60dd4a] {\n    width: calc(100% - 6rem);\n    margin-bottom: 0;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/AddAddressLedger.vue?vue&type=style&index=0&id=20cbb596&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/AddAddressLedger.vue?vue&type=style&index=0&id=20cbb596&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./AddAddressLedger.vue?vue&type=style&index=0&id=20cbb596&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/AddAddressLedger.vue?vue&type=style&index=0&id=20cbb596&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("faf2651e", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignupLedger.vue?vue&type=style&index=0&id=db60dd4a&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignupLedger.vue?vue&type=style&index=0&id=db60dd4a&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignupLedger.vue?vue&type=style&index=0&id=db60dd4a&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignupLedger.vue?vue&type=style&index=0&id=db60dd4a&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("55f8623a", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/views/AddAddressLedger.vue":
/*!****************************************!*\
  !*** ./src/views/AddAddressLedger.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddAddressLedger_vue_vue_type_template_id_20cbb596_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddAddressLedger.vue?vue&type=template&id=20cbb596&scoped=true& */ "./src/views/AddAddressLedger.vue?vue&type=template&id=20cbb596&scoped=true&");
/* harmony import */ var _AddAddressLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddAddressLedger.vue?vue&type=script&lang=ts& */ "./src/views/AddAddressLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _AddAddressLedger_vue_vue_type_style_index_0_id_20cbb596_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddAddressLedger.vue?vue&type=style&index=0&id=20cbb596&scoped=true&lang=css& */ "./src/views/AddAddressLedger.vue?vue&type=style&index=0&id=20cbb596&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AddAddressLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddAddressLedger_vue_vue_type_template_id_20cbb596_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AddAddressLedger_vue_vue_type_template_id_20cbb596_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "20cbb596",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/AddAddressLedger.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/AddAddressLedger.vue?vue&type=script&lang=ts&":
/*!*****************************************************************!*\
  !*** ./src/views/AddAddressLedger.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddressLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./AddAddressLedger.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/AddAddressLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddressLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/AddAddressLedger.vue?vue&type=style&index=0&id=20cbb596&scoped=true&lang=css&":
/*!*************************************************************************************************!*\
  !*** ./src/views/AddAddressLedger.vue?vue&type=style&index=0&id=20cbb596&scoped=true&lang=css& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddressLedger_vue_vue_type_style_index_0_id_20cbb596_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./AddAddressLedger.vue?vue&type=style&index=0&id=20cbb596&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/AddAddressLedger.vue?vue&type=style&index=0&id=20cbb596&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddressLedger_vue_vue_type_style_index_0_id_20cbb596_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddressLedger_vue_vue_type_style_index_0_id_20cbb596_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddressLedger_vue_vue_type_style_index_0_id_20cbb596_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddressLedger_vue_vue_type_style_index_0_id_20cbb596_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddressLedger_vue_vue_type_style_index_0_id_20cbb596_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/AddAddressLedger.vue?vue&type=template&id=20cbb596&scoped=true&":
/*!***********************************************************************************!*\
  !*** ./src/views/AddAddressLedger.vue?vue&type=template&id=20cbb596&scoped=true& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddressLedger_vue_vue_type_template_id_20cbb596_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./AddAddressLedger.vue?vue&type=template&id=20cbb596&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/AddAddressLedger.vue?vue&type=template&id=20cbb596&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddressLedger_vue_vue_type_template_id_20cbb596_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddressLedger_vue_vue_type_template_id_20cbb596_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/views/SignupLedger.vue":
/*!************************************!*\
  !*** ./src/views/SignupLedger.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SignupLedger_vue_vue_type_template_id_db60dd4a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignupLedger.vue?vue&type=template&id=db60dd4a&scoped=true& */ "./src/views/SignupLedger.vue?vue&type=template&id=db60dd4a&scoped=true&");
/* harmony import */ var _SignupLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SignupLedger.vue?vue&type=script&lang=ts& */ "./src/views/SignupLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _SignupLedger_vue_vue_type_style_index_0_id_db60dd4a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SignupLedger.vue?vue&type=style&index=0&id=db60dd4a&scoped=true&lang=css& */ "./src/views/SignupLedger.vue?vue&type=style&index=0&id=db60dd4a&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SignupLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SignupLedger_vue_vue_type_template_id_db60dd4a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SignupLedger_vue_vue_type_template_id_db60dd4a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "db60dd4a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/SignupLedger.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/SignupLedger.vue?vue&type=script&lang=ts&":
/*!*************************************************************!*\
  !*** ./src/views/SignupLedger.vue?vue&type=script&lang=ts& ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignupLedger.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignupLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/SignupLedger.vue?vue&type=style&index=0&id=db60dd4a&scoped=true&lang=css&":
/*!*********************************************************************************************!*\
  !*** ./src/views/SignupLedger.vue?vue&type=style&index=0&id=db60dd4a&scoped=true&lang=css& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupLedger_vue_vue_type_style_index_0_id_db60dd4a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignupLedger.vue?vue&type=style&index=0&id=db60dd4a&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignupLedger.vue?vue&type=style&index=0&id=db60dd4a&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupLedger_vue_vue_type_style_index_0_id_db60dd4a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupLedger_vue_vue_type_style_index_0_id_db60dd4a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupLedger_vue_vue_type_style_index_0_id_db60dd4a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupLedger_vue_vue_type_style_index_0_id_db60dd4a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupLedger_vue_vue_type_style_index_0_id_db60dd4a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/SignupLedger.vue?vue&type=template&id=db60dd4a&scoped=true&":
/*!*******************************************************************************!*\
  !*** ./src/views/SignupLedger.vue?vue&type=template&id=db60dd4a&scoped=true& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupLedger_vue_vue_type_template_id_db60dd4a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignupLedger.vue?vue&type=template&id=db60dd4a&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignupLedger.vue?vue&type=template&id=db60dd4a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupLedger_vue_vue_type_template_id_db60dd4a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignupLedger_vue_vue_type_template_id_db60dd4a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=add-ledger.js.map