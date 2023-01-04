(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["migrate"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Migrate.vue?vue&type=script&lang=ts&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Migrate.vue?vue&type=script&lang=ts& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _lib_AccountInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/AccountInfo */ "./src/lib/AccountInfo.ts");
/* harmony import */ var _lib_WalletStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/WalletStore */ "./src/lib/WalletStore.ts");
/* harmony import */ var _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/WalletInfo */ "./src/lib/WalletInfo.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_Network_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/Network.vue */ "./src/components/Network.vue");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _lib_LabelingMachine__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/lib/LabelingMachine */ "./src/lib/LabelingMachine.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../i18n/i18n-setup */ "./src/i18n/i18n-setup.ts");













let Migrate = class Migrate extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.page = 'intro';
        this.backupsAreSafe = false;
        this.title = _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_12__["i18n"].t('259');
        this.status = _i18n_i18n_setup__WEBPACK_IMPORTED_MODULE_12__["i18n"].t('92');
        this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.LOADING;
        this.message = '';
        this.legacyAccounts = [];
        this.LOCALSTORAGE_ACCOUNTS_KEY = '__legacy_accounts';
    }
    async created() {
        try {
            this.legacyAccounts = this.readAccountsCache(); // Throws when none stored
            this.page = 'accounts';
            console.debug('From LocalStorage');
            if (this.keyguardRequest
                && this.keyguardResult
                && !(this.keyguardResult instanceof Error)
                && this.keyguardResult.wordsExported) {
                // Find account that was exported
                const exportedAccount = this.legacyAccounts.find((account) => account.userFriendlyAddress === this.keyguardRequest.keyId);
                exportedAccount.isBackedUp = true;
                this.storeAccountsCache();
            }
        }
        catch (e) { } // tslint:disable-line:no-empty
        if (!this.legacyAccounts.length) {
            const legacyKeys = await this.$rpc.keyguardClient.listLegacyAccounts();
            this.legacyAccounts = legacyKeys.map((key) => this.legacyKeyInfoObject2AccountInfo(key));
            this.storeAccountsCache();
            console.debug('From Keyguard');
        }
    }
    async getBalances() {
        // Get balances from network
        const network = this.$refs.network;
        const balances = await network.getBalances(this.legacyAccounts.map((account) => account.userFriendlyAddress));
        console.log(balances);
        // Update legacyAccounts array
        this.legacyAccounts.forEach((account) => {
            const balance = balances.get(account.userFriendlyAddress);
            account.balance = balance !== undefined ? Nimiq.Policy.coinsToSatoshis(balance) : balance;
        });
        this.storeAccountsCache();
    }
    startExportForAddress(address) {
        const request = {
            appName: this.request.appName,
            keyId: address,
            keyLabel: '',
        };
        _lib_StaticStore__WEBPACK_IMPORTED_MODULE_10__["default"].keyguardRequest = request;
        const client = this.$rpc.createKeyguardClient();
        client.export(request);
    }
    async runMigration() {
        try {
            await this.doMigration();
        }
        catch (error) {
            this.onError(error);
        }
    }
    async doMigration() {
        this.page = 'migration';
        this.status = this.$t('204');
        const legacyAccounts = await this.$rpc.keyguardClient.listLegacyAccounts();
        if (!legacyAccounts.length) {
            this.deleteAccountsCache();
            this.title = this.$t('169');
            this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.SUCCESS;
            setTimeout(() => this.$rpc.resolve([]), _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].SUCCESS_REDIRECT_DELAY);
            return;
        }
        this.status = this.$t('108');
        const genesisVestingContracts = await this.$refs.network.getGenesisVestingContracts();
        this.status = this.$t('221');
        // For the wallet ID derivation to work, the ID derivation and storing of new wallets needs
        // to happen serially, e.g. synchroneous.
        const walletInfos = [];
        for (const keyInfo of legacyAccounts) {
            const accountInfo = this.legacyKeyInfoObject2AccountInfo(keyInfo);
            const accounts = new Map([
                [accountInfo.userFriendlyAddress, accountInfo],
            ]);
            const contracts = genesisVestingContracts.filter((contract) => contract.owner.equals(accountInfo.address));
            const walletInfo = new _lib_WalletInfo__WEBPACK_IMPORTED_MODULE_4__["WalletInfo"](await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_3__["WalletStore"].Instance.deriveId(keyInfo.id), keyInfo.id, Object(_lib_LabelingMachine__WEBPACK_IMPORTED_MODULE_9__["labelLegacyAccount"])(), accounts, contracts, _lib_Constants__WEBPACK_IMPORTED_MODULE_5__["WalletType"].LEGACY, 
            /* keyMissing */ false, 
            /* fileExported */ false, 
            /* wordsExported */ true);
            await _lib_WalletStore__WEBPACK_IMPORTED_MODULE_3__["WalletStore"].Instance.put(walletInfo);
            walletInfos.push(walletInfo);
        }
        this.status = this.$t('258');
        await this.$rpc.keyguardClient.migrateAccountsToKeys();
        this.deleteAccountsCache();
        this.title = this.$t('10');
        this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.SUCCESS;
        const listResult = await Promise.all(walletInfos.map((walletInfo) => walletInfo.toAccountType()));
        setTimeout(() => this.$rpc.resolve(listResult), _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].SUCCESS_REDIRECT_DELAY);
    }
    onError(error) {
        this.title = this.$t('269');
        this.message = `${error.name}: ${error.message}`;
        this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.ERROR;
        if (this.$captureException) {
            this.$captureException(error);
        }
    }
    tryAgain() {
        this.title = this.$t('259');
        this.status = this.$t('92');
        this.state = _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"].State.LOADING;
        setTimeout(() => this.runMigration(), 1000);
    }
    legacyKeyInfoObject2AccountInfo(keyInfo) {
        return new _lib_AccountInfo__WEBPACK_IMPORTED_MODULE_2__["AccountInfo"]('m/0\'', keyInfo.legacyAccount.label, new Nimiq.Address(keyInfo.legacyAccount.address));
    }
    serializeAccounts(accounts) {
        return JSON.stringify(accounts.map((account) => {
            const entry = account.toObject();
            return {
                ...entry,
                address: Nimiq.BufferUtils.toBase64(entry.address),
                isBackedUp: account.isBackedUp,
            };
        }));
    }
    deserializeAccounts(storedAccounts) {
        return JSON.parse(storedAccounts).map((entry) => {
            const accountInfo = _lib_AccountInfo__WEBPACK_IMPORTED_MODULE_2__["AccountInfo"].fromObject({
                ...entry,
                address: Nimiq.BufferUtils.fromBase64(entry.address),
            });
            accountInfo.isBackedUp = entry.isBackedUp;
            return accountInfo;
        });
    }
    storeAccountsCache() {
        window.localStorage.setItem(this.LOCALSTORAGE_ACCOUNTS_KEY, this.serializeAccounts(this.legacyAccounts));
    }
    readAccountsCache() {
        const storedAccounts = window.localStorage.getItem(this.LOCALSTORAGE_ACCOUNTS_KEY);
        if (!storedAccounts)
            throw new Error('No accounts cached');
        return this.deserializeAccounts(storedAccounts);
    }
    deleteAccountsCache() {
        window.localStorage.removeItem(this.LOCALSTORAGE_ACCOUNTS_KEY);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_10__["Static"]
], Migrate.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_10__["Static"]
], Migrate.prototype, "keyguardRequest", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_11__["State"]
], Migrate.prototype, "keyguardResult", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('legacyAccounts')
], Migrate.prototype, "getBalances", null);
Migrate = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: {
            SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_6__["SmallPage"], PageHeader: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_6__["PageHeader"], PageBody: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_6__["PageBody"], PageFooter: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_6__["PageFooter"],
            AccountRing: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_6__["AccountRing"], Identicon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_6__["Identicon"], Amount: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_6__["Amount"],
            ScanQrCodeIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_6__["ScanQrCodeIcon"], ArrowRightSmallIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_6__["ArrowRightSmallIcon"], CheckmarkIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_6__["CheckmarkIcon"],
            StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_8__["default"], Network: _components_Network_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
        } })
], Migrate);
/* harmony default export */ __webpack_exports__["default"] = (Migrate);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Migrate.vue?vue&type=template&id=3399423e&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Migrate.vue?vue&type=template&id=3399423e&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      _c("Network", { ref: "network" }),
      _vm.page === "intro"
        ? _c(
            "SmallPage",
            { staticClass: "intro" },
            [
              _c("PageHeader", [
                _vm._v(" " + _vm._s(_vm.$t('245')) + " "),
                _c(
                  "p",
                  {
                    staticClass: "nq-notice info",
                    attrs: { slot: "more" },
                    slot: "more"
                  },
                  [
                    _vm._v(
                      " " +
                        _vm._s(
                          _vm.$t(
                            '164'
                          )
                        ) +
                        " "
                    )
                  ]
                )
              ]),
              _c("PageBody", [
                _c("div", { staticClass: "topic" }, [
                  _c(
                    "div",
                    { staticClass: "topic-visual account-ring" },
                    [
                      _c("AccountRing", {
                        attrs: {
                          addresses: [
                            "NQ18 37VM K2Y5 2HPY 5U80 2E0U VHUJ R7RK QSNE",
                            "NQ81 K7NT 9TJA BXE8 5D0R 3FN4 QJK0 YVYQ YD9A",
                            "NQ90 277A GR05 F775 AVFK 61RP CS7Y R7JA KGCT"
                          ]
                        }
                      })
                    ],
                    1
                  ),
                  _c("p", { staticClass: "topic-text" }, [
                    _vm._v(
                      " " +
                        _vm._s(
                          _vm.$t('172')
                        ) +
                        " "
                    )
                  ])
                ]),
                _c("div", { staticClass: "topic" }, [
                  _c("p", { staticClass: "topic-text" }, [
                    _vm._v(
                      " " +
                        _vm._s(
                          _vm.$t(
                            '163'
                          )
                        ) +
                        " "
                    )
                  ]),
                  _c("div", { staticClass: "topic-visual login-file" }, [
                    _c(
                      "svg",
                      {
                        attrs: {
                          width: "58",
                          height: "97",
                          viewBox: "0 0 58 97",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }
                      },
                      [
                        _c("rect", {
                          attrs: {
                            x: ".59",
                            y: ".78",
                            width: "56.81",
                            height: "95.45",
                            rx: "2.78",
                            fill: "#fff"
                          }
                        }),
                        _c("path", {
                          attrs: {
                            d:
                              "M1.67 3.7c0-1.01.83-1.84 1.85-1.84h50.95c1.02 0 1.85.83 1.85 1.85v89.58c0 1.02-.83 1.85-1.85 1.85H3.52a1.85 1.85 0 0 1-1.85-1.85V3.71z",
                            fill: "url(#paint0_radial)"
                          }
                        }),
                        _c("g", { attrs: { opacity: ".5", fill: "#fff" } }, [
                          _c("g", { attrs: { "clip-path": "url(#clip0)" } }, [
                            _c("path", {
                              attrs: {
                                d:
                                  "M15.87 10.5l-1.02-1.77a.4.4 0 0 0-.35-.2h-2.03a.4.4 0 0 0-.35.2l-1.01 1.76a.4.4 0 0 0 0 .4l1.01 1.77c.08.13.21.2.35.2h2.03a.4.4 0 0 0 .35-.2l1.02-1.76a.4.4 0 0 0 0-.4z"
                              }
                            }),
                            _c("rect", {
                              attrs: {
                                x: "17.26",
                                y: "9.14",
                                width: "12.12",
                                height: "3.03",
                                rx: "1.51"
                              }
                            }),
                            _c("rect", {
                              attrs: {
                                x: "30.89",
                                y: "9.14",
                                width: "15.15",
                                height: "3.03",
                                rx: "1.51"
                              }
                            })
                          ]),
                          _c("rect", {
                            attrs: {
                              x: "21.8",
                              y: "16.52",
                              width: "14.39",
                              height: "1.51",
                              rx: ".76"
                            }
                          })
                        ]),
                        _c("g", { attrs: { opacity: ".5", fill: "#fff" } }, [
                          _c("path", {
                            attrs: {
                              "fill-rule": "evenodd",
                              "clip-rule": "evenodd",
                              d:
                                "M23.47 67.02h-6.62c-.61 0-1.1-.5-1.1-1.1v-6.63c0-.61.49-1.1 1.1-1.1h6.62c.62 0 1.11.49 1.11 1.1v6.63c0 .6-.5 1.1-1.1 1.1zm-5.24-6.63a.28.28 0 0 0-.28.28v3.86c0 .16.13.28.28.28h3.86c.16 0 .28-.12.28-.28v-3.86a.28.28 0 0 0-.28-.28h-3.86zM16.85 75.86h6.62c.61 0 1.1.5 1.1 1.1v6.63c0 .6-.49 1.1-1.1 1.1h-6.62c-.61 0-1.1-.49-1.1-1.1v-6.63c0-.6.49-1.1 1.1-1.1zm5.24 6.62c.16 0 .28-.12.28-.27v-3.87a.28.28 0 0 0-.28-.27h-3.86a.28.28 0 0 0-.28.27v3.87c0 .15.13.27.28.27h3.86zM34.52 58.18h6.63c.6 0 1.1.5 1.1 1.1v6.64c0 .6-.5 1.1-1.1 1.1h-6.63c-.6 0-1.1-.5-1.1-1.1v-6.63c0-.61.5-1.1 1.1-1.1zm5.25 6.63c.15 0 .27-.12.27-.28v-3.86a.28.28 0 0 0-.27-.28H35.9a.28.28 0 0 0-.27.28v3.86c0 .16.12.28.27.28h3.87z"
                            }
                          }),
                          _c("path", {
                            attrs: {
                              d:
                                "M26.79 62.88h1.1a.83.83 0 1 0 0-1.66.28.28 0 0 1-.27-.28V59.3a.83.83 0 0 0-1.66 0v2.76c0 .46.37.83.83.83zM30.1 60.12c.16 0 .28.12.28.27v6.08a.83.83 0 0 0 1.66 0v-7.18a.83.83 0 0 0-.83-.83h-1.1a.83.83 0 0 0 0 1.66zM22.1 69.78c0 .46.36.83.82.83h3.87c.46 0 .83-.37.83-.83v-4.42a.83.83 0 0 0-1.66 0v3.32c0 .15-.12.27-.28.27h-2.76a.83.83 0 0 0-.83.83z"
                            }
                          }),
                          _c("path", {
                            attrs: {
                              d:
                                "M19.06 68.95a.83.83 0 0 0-.83.83v2.76c0 .16-.13.28-.28.28h-1.1a.83.83 0 0 0 0 1.66H31.2c.45 0 .83-.37.83-.83v-3.32a.83.83 0 0 0-1.66 0v2.21c0 .16-.13.28-.28.28h-9.94a.28.28 0 0 1-.28-.28v-2.76a.83.83 0 0 0-.82-.83zM30.93 76.96a.83.83 0 0 0-.83-.83H26.8a.83.83 0 0 0-.83.83v4.42a.83.83 0 0 0 1.66 0v-3.31c0-.16.12-.28.27-.28h2.21c.46 0 .83-.37.83-.83zM41.15 82.76h-9.39a.28.28 0 0 1-.28-.28v-2.2a.83.83 0 0 0-1.65 0v3.31c0 .46.37.83.82.83h10.5a.83.83 0 1 0 0-1.66z"
                            }
                          }),
                          _c("path", {
                            attrs: {
                              "fill-rule": "evenodd",
                              "clip-rule": "evenodd",
                              d:
                                "M37.28 80.55h-3.31a.83.83 0 0 1-.83-.83v-3.31c0-.46.37-.83.83-.83h3.31c.46 0 .83.37.83.83v3.31c0 .46-.37.83-.83.83zm-2.2-3.31a.28.28 0 0 0-.28.27v1.1c0 .16.12.28.27.28h1.1c.16 0 .28-.12.28-.27v-1.1a.28.28 0 0 0-.27-.28h-1.1z"
                            }
                          }),
                          _c("path", {
                            attrs: {
                              d:
                                "M40.6 72.27a.83.83 0 0 0-.83.83v7.18a.83.83 0 1 0 1.66 0V73.1a.83.83 0 0 0-.83-.83zM41.43 69.23a.83.83 0 0 0-.83-.83h-6.08a.83.83 0 0 0-.83.83v3.31a.83.83 0 1 0 1.66 0v-2.2c0-.16.12-.28.28-.28h4.97c.45 0 .83-.37.83-.83z"
                            }
                          })
                        ]),
                        _c("g", { attrs: { opacity: ".35", fill: "#fff" } }, [
                          _c("path", {
                            attrs: {
                              opacity: ".7",
                              d:
                                "M32.29 29.4l-1.57-2.72a.63.63 0 0 0-.54-.31h-3.14a.63.63 0 0 0-.54.31l-1.57 2.72a.63.63 0 0 0 0 .62l1.57 2.72c.11.2.32.31.54.31h3.14c.22 0 .43-.12.54-.31l1.57-2.72a.62.62 0 0 0 0-.62z"
                            }
                          }),
                          _c("path", {
                            attrs: {
                              opacity: ".78",
                              d:
                                "M32.29 45.2l-1.57-2.72a.63.63 0 0 0-.54-.31h-3.14a.63.63 0 0 0-.54.3l-1.57 2.72a.63.63 0 0 0 0 .63l1.57 2.72c.11.2.32.31.54.31h3.14c.22 0 .43-.12.54-.31l1.57-2.72a.62.62 0 0 0 0-.63z"
                            }
                          }),
                          _c("path", {
                            attrs: {
                              opacity: ".5",
                              d:
                                "M25.45 33.35l-1.57-2.72a.63.63 0 0 0-.54-.31h-3.13a.63.63 0 0 0-.54.31l-1.57 2.72a.63.63 0 0 0 0 .62l1.56 2.72c.12.2.32.31.55.31h3.13c.22 0 .43-.12.54-.31l1.57-2.72a.63.63 0 0 0 0-.62z"
                            }
                          }),
                          _c("path", {
                            attrs: {
                              opacity: ".6",
                              d:
                                "M25.45 41.24l-1.57-2.71a.63.63 0 0 0-.54-.31h-3.13a.63.63 0 0 0-.54.3l-1.57 2.72a.63.63 0 0 0 0 .63l1.56 2.72c.12.2.32.31.55.31h3.13c.22 0 .43-.12.54-.31l1.57-2.72a.63.63 0 0 0 0-.63z"
                            }
                          }),
                          _c("path", {
                            attrs: {
                              opacity: ".8",
                              d:
                                "M39.12 33.35l-1.56-2.72a.63.63 0 0 0-.55-.31h-3.13a.63.63 0 0 0-.54.31l-1.57 2.72a.63.63 0 0 0 0 .62l1.57 2.72c.1.2.32.31.54.31h3.13c.23 0 .43-.12.54-.31l1.57-2.72a.62.62 0 0 0 0-.62z"
                            }
                          }),
                          _c("path", {
                            attrs: {
                              opacity: ".6",
                              d:
                                "M39.12 41.24l-1.56-2.71a.63.63 0 0 0-.55-.31h-3.13a.63.63 0 0 0-.54.3l-1.57 2.72a.63.63 0 0 0 0 .63l1.57 2.72c.1.2.32.31.54.31H37c.23 0 .43-.12.54-.31l1.57-2.72a.62.62 0 0 0 0-.63z"
                            }
                          })
                        ]),
                        _c(
                          "defs",
                          [
                            _c(
                              "radialGradient",
                              {
                                attrs: {
                                  id: "paint0_radial",
                                  cx: "0",
                                  cy: "0",
                                  r: "1",
                                  gradientUnits: "userSpaceOnUse",
                                  gradientTransform:
                                    "matrix(-54.6465 0 0 -93.2842 56.32 95.14)"
                                }
                              },
                              [
                                _c("stop", {
                                  attrs: { "stop-color": "#EC991C" }
                                }),
                                _c("stop", {
                                  attrs: {
                                    offset: "1",
                                    "stop-color": "#E9B213"
                                  }
                                })
                              ],
                              1
                            ),
                            _c("clipPath", { attrs: { id: "clip0" } }, [
                              _c("path", {
                                attrs: {
                                  fill: "#fff",
                                  transform: "translate(11.05 8.53)",
                                  d: "M0 0h35.81v4.33H0z"
                                }
                              })
                            ])
                          ],
                          1
                        )
                      ]
                    )
                  ])
                ]),
                _c("div", { staticClass: "topic" }, [
                  _c(
                    "div",
                    { staticClass: "topic-visual qr-code" },
                    [_c("ScanQrCodeIcon")],
                    1
                  ),
                  _c("p", { staticClass: "topic-text" }, [
                    _vm._v(
                      " " +
                        _vm._s(
                          _vm.$t(
                            '104'
                          )
                        ) +
                        " "
                    )
                  ])
                ]),
                _c(
                  "a",
                  {
                    staticClass: "nq-link link-read-article",
                    attrs: {
                      href:
                        "https://medium.com/nimiq-network/the-biggest-release-since-mainnet-launch-f8096e33dab9",
                      target: "_blank"
                    }
                  },
                  [
                    _vm._v(
                      " " +
                        _vm._s(
                          _vm.$t('237')
                        ) +
                        " "
                    ),
                    _c("ArrowRightSmallIcon")
                  ],
                  1
                )
              ]),
              _c("PageFooter", { key: "intro-footer" }, [
                _c(
                  "button",
                  {
                    staticClass: "nq-button light-blue",
                    on: {
                      click: function($event) {
                        _vm.page = "accounts"
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.$t('190')))]
                )
              ])
            ],
            1
          )
        : _vm.page === "accounts"
        ? _c(
            "SmallPage",
            { staticClass: "accounts" },
            [
              _c(
                "PageHeader",
                {
                  attrs: { backArrow: "" },
                  on: {
                    back: function($event) {
                      _vm.page = "intro"
                      _vm.backupsAreSafe = false
                    }
                  }
                },
                [
                  _vm._v(
                    " " +
                      _vm._s(
                        _vm.$tc(
                          '61',
                          _vm.legacyAccounts.length
                        )
                      ) +
                      " "
                  ),
                  _c(
                    "p",
                    {
                      staticClass: "nq-notice warning",
                      attrs: { slot: "more" },
                      slot: "more"
                    },
                    [
                      _vm._v(
                        " " +
                          _vm._s(
                            _vm.$t(
                              '236'
                            )
                          ) +
                          " "
                      )
                    ]
                  )
                ]
              ),
              _c(
                "PageBody",
                _vm._l(_vm.legacyAccounts, function(account) {
                  return _c(
                    "div",
                    {
                      key: account.userFriendlyAddress,
                      staticClass: "account"
                    },
                    [
                      _c("Identicon", {
                        attrs: { address: account.userFriendlyAddress }
                      }),
                      _c(
                        "div",
                        { staticClass: "meta" },
                        [
                          _c("div", { staticClass: "label" }, [
                            _vm._v(_vm._s(account.label))
                          ]),
                          account.balance !== undefined
                            ? _c("Amount", {
                                attrs: { amount: account.balance, decimals: 0 }
                              })
                            : _vm._e()
                        ],
                        1
                      ),
                      _c(
                        "button",
                        {
                          staticClass: "nq-button-s",
                          class: { green: account.isBackedUp },
                          on: {
                            click: function($event) {
                              return _vm.startExportForAddress(
                                account.userFriendlyAddress
                              )
                            }
                          }
                        },
                        [
                          account.isBackedUp
                            ? _c(
                                "svg",
                                {
                                  attrs: {
                                    width: "12",
                                    height: "11",
                                    viewBox: "0 0 12 11",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg"
                                  }
                                },
                                [
                                  _c("path", {
                                    attrs: {
                                      d: "M10.5 1.9l-5.8 8-3-3.1",
                                      stroke: "currentColor",
                                      "stroke-width": "2",
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round"
                                    }
                                  })
                                ]
                              )
                            : _vm._e(),
                          _vm._v(
                            " " +
                              _vm._s(
                                account.isBackedUp
                                  ? _vm.$t('42')
                                  : _vm.$t('41')
                              ) +
                              " "
                          )
                        ]
                      )
                    ],
                    1
                  )
                }),
                0
              ),
              _c(
                "PageFooter",
                { key: "accounts-footer" },
                [
                  _c(
                    "transition",
                    { attrs: { name: "transition-fade", mode: "out-in" } },
                    [
                      !_vm.backupsAreSafe
                        ? _c(
                            "div",
                            { staticClass: "nq-light-blue-bg check-box" },
                            [
                              _c("label", [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.backupsAreSafe,
                                      expression: "backupsAreSafe"
                                    }
                                  ],
                                  attrs: { type: "checkbox" },
                                  domProps: {
                                    checked: Array.isArray(_vm.backupsAreSafe)
                                      ? _vm._i(_vm.backupsAreSafe, null) > -1
                                      : _vm.backupsAreSafe
                                  },
                                  on: {
                                    change: function($event) {
                                      var $$a = _vm.backupsAreSafe,
                                        $$el = $event.target,
                                        $$c = $$el.checked ? true : false
                                      if (Array.isArray($$a)) {
                                        var $$v = null,
                                          $$i = _vm._i($$a, $$v)
                                        if ($$el.checked) {
                                          $$i < 0 &&
                                            (_vm.backupsAreSafe = $$a.concat([
                                              $$v
                                            ]))
                                        } else {
                                          $$i > -1 &&
                                            (_vm.backupsAreSafe = $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1)))
                                        }
                                      } else {
                                        _vm.backupsAreSafe = $$c
                                      }
                                    }
                                  }
                                }),
                                _c(
                                  "div",
                                  { staticClass: "checkcircle" },
                                  [_c("CheckmarkIcon")],
                                  1
                                ),
                                _vm._v(
                                  " " +
                                    _vm._s(_vm.$t('159')) +
                                    " "
                                )
                              ])
                            ]
                          )
                        : _c(
                            "button",
                            {
                              staticClass: "nq-button light-blue activate",
                              on: { click: _vm.runMigration }
                            },
                            [_vm._v(_vm._s(_vm.$t('12')))]
                          )
                    ]
                  )
                ],
                1
              )
            ],
            1
          )
        : _c(
            "SmallPage",
            { staticClass: "migration" },
            [
              _c("StatusScreen", {
                attrs: {
                  lightBlue: "",
                  title: _vm.title,
                  status: _vm.status,
                  state: _vm.state,
                  message: _vm.message,
                  mainAction: _vm.$t('252')
                },
                on: { "main-action": _vm.tryAgain }
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

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Migrate.vue?vue&type=style&index=0&id=3399423e&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Migrate.vue?vue&type=style&index=0&id=3399423e&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.intro .page-body[data-v-3399423e] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    padding-left: 5rem;\n    padding-right: 5rem;\n}\n.topic[data-v-3399423e] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.topic-visual[data-v-3399423e] {\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n    width: 8rem;\n    height: 8rem;\n    border-radius: .5rem;\n    margin-top: -1rem;\n    margin-bottom: -1rem;\n    margin-right: 3rem;\n}\n.topic-text[data-v-3399423e] {\n    margin: 0;\n    font-size: 2rem;\n    line-height: 1.3;\n}\n.topic-text + .topic-visual[data-v-3399423e] {\n    margin-right: 0;\n    margin-left: 2rem; /* Less than the right margin, to fit in Firefox */\n}\n.topic-visual .account-ring[data-v-3399423e] {\n    width: 100%;\n    height: 100%;\n}\n.topic-visual.login-file[data-v-3399423e] {\n    width: 6.875rem;\n    height: 11.75rem;\n    margin-top: -2.875rem;\n    margin-bottom: -2.875rem;\n}\n.topic-visual.login-file svg[data-v-3399423e] {\n    width: 100%;\n    height: 100%;\n}\n.topic-visual.qr-code[data-v-3399423e] {\n    font-size: 7.25rem;\n    padding: .375rem;\n    opacity: .4;\n}\n.link-read-article[data-v-3399423e] {\n    font-size: 2rem;\n    font-weight: bold;\n    -ms-flex-item-align: center;\n        align-self: center;\n}\n.link-read-article .nq-icon[data-v-3399423e] {\n    vertical-align: middle;\n    width: 1.375rem;\n    height: 1.125rem;\n    margin-top: -0.125rem;\n    -webkit-transition: -webkit-transform .3s cubic-bezier(0.25, 0, 0, 1);\n    transition: -webkit-transform .3s cubic-bezier(0.25, 0, 0, 1);\n    transition: transform .3s cubic-bezier(0.25, 0, 0, 1);\n    transition: transform .3s cubic-bezier(0.25, 0, 0, 1), -webkit-transform .3s cubic-bezier(0.25, 0, 0, 1);\n}\n.link-read-article:hover .nq-icon[data-v-3399423e],\n.link-read-article:focus .nq-icon[data-v-3399423e] {\n    -webkit-transform: translate3D(0.25rem, 0, 0);\n            transform: translate3D(0.25rem, 0, 0);\n}\n.accounts .page-body[data-v-3399423e] {\n    margin-top: -2rem;\n    padding-top: 0;\n    padding-bottom: 0;\n    -webkit-mask-image: -webkit-gradient(linear , left bottom, left top , from(rgba(255,255,255,0)), color-stop(4rem, rgba(255,255,255, 1)), color-stop(rgba(255,255,255,1)), to(rgba(255,255,255,0)));\n    -webkit-mask-image: linear-gradient(0deg , rgba(255,255,255,0), rgba(255,255,255, 1) 4rem, rgba(255,255,255,1) calc(100% - 4rem), rgba(255,255,255,0));\n            mask-image: -webkit-gradient(linear , left bottom, left top , from(rgba(255,255,255,0)), color-stop(4rem, rgba(255,255,255, 1)), color-stop(rgba(255,255,255,1)), to(rgba(255,255,255,0)));\n            mask-image: linear-gradient(0deg , rgba(255,255,255,0), rgba(255,255,255, 1) 4rem, rgba(255,255,255,1) calc(100% - 4rem), rgba(255,255,255,0));\n}\n.account[data-v-3399423e] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    margin: 4rem 0;\n}\n.account .identicon[data-v-3399423e] {\n    width: 6.25rem;\n    height: 6.25rem;\n    margin-right: 2rem;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.account .meta[data-v-3399423e] {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    min-width: 0;\n}\n.account .label[data-v-3399423e] {\n    font-size: 2.25rem;\n    line-height: 3rem;\n    font-weight: bold;\n    white-space: nowrap;\n    overflow: hidden;\n    max-width: 100%;\n    -webkit-mask-image: -webkit-gradient(linear , left top, right top , from(white), color-stop(white), to(rgba(255,255,255, 0)));\n    -webkit-mask-image: linear-gradient(90deg , white, white calc(100% - 3rem), rgba(255,255,255, 0));\n            mask-image: -webkit-gradient(linear , left top, right top , from(white), color-stop(white), to(rgba(255,255,255, 0)));\n            mask-image: linear-gradient(90deg , white, white calc(100% - 3rem), rgba(255,255,255, 0));\n}\n.account .amount[data-v-3399423e] {\n    display: block;\n    font-size: 1.75rem;\n    line-height: 2rem;\n    font-weight: 600;\n    opacity: .5;\n}\n.account .nq-button-s[data-v-3399423e] {\n    margin-left: 1rem;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.account .nq-button-s svg[data-v-3399423e] {\n    margin-right: 0.25rem;\n}\n.page-footer .nq-button[data-v-3399423e] {\n    margin-top: 1rem;\n}\n.check-box[data-v-3399423e] {\n    width: 100%;\n    padding: 2.5rem;\n    border-radius: .5rem;\n    font-size: 2.375rem;\n    font-weight: 600;\n    text-align: center;\n    position: relative;\n}\n.check-box[data-v-3399423e] {\n    -webkit-transition: opacity .5s .5s ease-in;\n    transition: opacity .5s .5s ease-in;\n}\n.nq-button.activate[data-v-3399423e] {\n    -webkit-transition:\n        opacity 450ms cubic-bezier(.25,0,0,1),\n        -webkit-transform 450ms cubic-bezier(.25,0,0,1),\n        -webkit-box-shadow 450ms cubic-bezier(.25,0,0,1);\n    transition:\n        opacity 450ms cubic-bezier(.25,0,0,1),\n        -webkit-transform 450ms cubic-bezier(.25,0,0,1),\n        -webkit-box-shadow 450ms cubic-bezier(.25,0,0,1);\n    transition:\n        transform 450ms cubic-bezier(.25,0,0,1),\n        box-shadow 450ms cubic-bezier(.25,0,0,1),\n        opacity 450ms cubic-bezier(.25,0,0,1);\n    transition:\n        transform 450ms cubic-bezier(.25,0,0,1),\n        box-shadow 450ms cubic-bezier(.25,0,0,1),\n        opacity 450ms cubic-bezier(.25,0,0,1),\n        -webkit-transform 450ms cubic-bezier(.25,0,0,1),\n        -webkit-box-shadow 450ms cubic-bezier(.25,0,0,1);\n}\n.check-box input[data-v-3399423e] {\n    position: absolute;\n    left: -9999rem;\n    opacity: 0;\n}\n.check-box label[data-v-3399423e] {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    padding: 1.5rem 2.5rem;\n    cursor: pointer;\n    border-radius: 4rem;\n}\n.check-box .checkcircle[data-v-3399423e] {\n    border: solid .25rem rgba(255, 255, 255, 0.6);\n    border-radius: 50%;\n    width: 3.5rem;\n    height: 3.5rem;\n    margin-right: 2rem;\n    position: relative;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.check-box .checkcircle .nq-icon[data-v-3399423e] {\n    display: none;\n}\n.check-box .checkcircle[data-v-3399423e]::after {\n    content: \"\";\n    position: absolute;\n    left: -0.875rem;\n    top: -0.875rem;\n    right: -0.875rem;\n    bottom: -0.875rem;\n    border: 0.25rem solid rgba(255, 255, 255, 0.6);\n    border-radius: 50%;\n    opacity: 0;\n}\n.check-box input:focus ~ .checkcircle[data-v-3399423e]::after,\n.check-box input:active ~ .checkcircle[data-v-3399423e]::after {\n    opacity: 1;\n}\n.check-box input:checked ~ .checkcircle[data-v-3399423e] {\n    background: rgba(255, 255, 255, 0.6);\n    border: none;\n}\n.check-box input:checked ~ .checkcircle[data-v-3399423e]::after {\n    left: -0.625rem;\n    top: -0.625rem;\n    right: -0.625rem;\n    bottom: -0.625rem;\n}\n.check-box input:checked ~ .checkcircle .nq-icon[data-v-3399423e] {\n    position: absolute;\n    display: block;\n    font-size: 3rem;\n    margin-left: -1.125rem;\n    left: 50%;\n    bottom: .75rem;\n}\n.transition-fade-enter[data-v-3399423e],\n.transition-fade-leave-to[data-v-3399423e] {\n    opacity: 0;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Migrate.vue?vue&type=style&index=0&id=3399423e&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Migrate.vue?vue&type=style&index=0&id=3399423e&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Migrate.vue?vue&type=style&index=0&id=3399423e&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Migrate.vue?vue&type=style&index=0&id=3399423e&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("be500d88", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/views/Migrate.vue":
/*!*******************************!*\
  !*** ./src/views/Migrate.vue ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Migrate_vue_vue_type_template_id_3399423e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Migrate.vue?vue&type=template&id=3399423e&scoped=true& */ "./src/views/Migrate.vue?vue&type=template&id=3399423e&scoped=true&");
/* harmony import */ var _Migrate_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Migrate.vue?vue&type=script&lang=ts& */ "./src/views/Migrate.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _Migrate_vue_vue_type_style_index_0_id_3399423e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Migrate.vue?vue&type=style&index=0&id=3399423e&scoped=true&lang=css& */ "./src/views/Migrate.vue?vue&type=style&index=0&id=3399423e&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Migrate_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Migrate_vue_vue_type_template_id_3399423e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Migrate_vue_vue_type_template_id_3399423e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3399423e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/Migrate.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/Migrate.vue?vue&type=script&lang=ts&":
/*!********************************************************!*\
  !*** ./src/views/Migrate.vue?vue&type=script&lang=ts& ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Migrate_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Migrate.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Migrate.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Migrate_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/Migrate.vue?vue&type=style&index=0&id=3399423e&scoped=true&lang=css&":
/*!****************************************************************************************!*\
  !*** ./src/views/Migrate.vue?vue&type=style&index=0&id=3399423e&scoped=true&lang=css& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Migrate_vue_vue_type_style_index_0_id_3399423e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Migrate.vue?vue&type=style&index=0&id=3399423e&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Migrate.vue?vue&type=style&index=0&id=3399423e&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Migrate_vue_vue_type_style_index_0_id_3399423e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Migrate_vue_vue_type_style_index_0_id_3399423e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Migrate_vue_vue_type_style_index_0_id_3399423e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Migrate_vue_vue_type_style_index_0_id_3399423e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Migrate_vue_vue_type_style_index_0_id_3399423e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/Migrate.vue?vue&type=template&id=3399423e&scoped=true&":
/*!**************************************************************************!*\
  !*** ./src/views/Migrate.vue?vue&type=template&id=3399423e&scoped=true& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Migrate_vue_vue_type_template_id_3399423e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Migrate.vue?vue&type=template&id=3399423e&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Migrate.vue?vue&type=template&id=3399423e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Migrate_vue_vue_type_template_id_3399423e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Migrate_vue_vue_type_template_id_3399423e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=migrate-legacy.js.map