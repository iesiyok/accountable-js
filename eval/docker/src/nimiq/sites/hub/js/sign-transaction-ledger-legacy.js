(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sign-transaction-ledger"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignTransactionLedger.vue?vue&type=script&lang=ts&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignTransactionLedger.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Network_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Network.vue */ "./src/components/Network.vue");
/* harmony import */ var _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nimiq/ledger-api */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/LedgerUi.vue */ "./src/components/LedgerUi.vue");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _lib_CashlinkStore__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../lib/CashlinkStore */ "./src/lib/CashlinkStore.ts");
/* harmony import */ var _lib_CheckoutServerApi__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../lib/CheckoutServerApi */ "./src/lib/CheckoutServerApi.ts");
var SignTransactionLedger_1;
















let SignTransactionLedger = SignTransactionLedger_1 = class SignTransactionLedger extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.state = SignTransactionLedger_1.State.OVERVIEW;
        this.senderDetails = { address: '', label: '' };
        this.recipientDetails = { address: '', label: '' };
        this.shownAccountDetails = null;
        this.isDestroyed = false;
        this._checkoutExpiryTimeout = -1;
    }
    async mounted() {
        const network = this.$refs.network;
        // collect payment information
        let sender;
        let recipient;
        let value;
        let fee;
        let validityStartHeightPromise;
        let data;
        let flags;
        if (this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].SIGN_TRANSACTION) {
            // direct sign transaction request invocation
            const signTransactionRequest = this.request;
            ({ sender, recipient, value, fee, data, flags } = signTransactionRequest);
            validityStartHeightPromise = Promise.resolve(signTransactionRequest.validityStartHeight);
            const recipientUserFriendlyAddress = signTransactionRequest.recipient.toUserFriendlyAddress();
            this.recipientDetails = {
                address: recipientUserFriendlyAddress,
                label: recipientUserFriendlyAddress,
            };
        }
        else if (this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].CHECKOUT) {
            // coming from checkout
            const checkoutRequest = this.request;
            const $subtitle = document.querySelector('.logo .logo-subtitle');
            $subtitle.textContent = 'Checkout'; // reapply the checkout subtitle in case the page was reloaded
            document.title = checkoutRequest.paymentOptions.length === 1
                && checkoutRequest.paymentOptions[0].currency === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["Currency"].NIM
                ? 'Nimiq Checkout'
                : 'Crypto-Checkout powered by Nimiq';
            // Update checkout payment options. This is typically instant even after reload as CheckoutServerApi caches
            // the data previously fetched in checkout.
            const checkoutPaymentOptions = this.checkoutPaymentOptions;
            if (checkoutRequest.callbackUrl && checkoutRequest.csrf) {
                try {
                    const fetchedPaymentOptions = await _lib_CheckoutServerApi__WEBPACK_IMPORTED_MODULE_15__["default"].fetchPaymentOption(checkoutRequest.callbackUrl, checkoutPaymentOptions.currency, checkoutPaymentOptions.type, checkoutRequest.csrf);
                    checkoutPaymentOptions.update(fetchedPaymentOptions);
                }
                catch (e) {
                    this.$rpc.reject(e);
                    return;
                }
            }
            if (!checkoutPaymentOptions.protocolSpecific.recipient) {
                this.$rpc.reject(new Error('Failed to fetch checkout recipient.'));
                return;
            }
            sender = Nimiq.Address.fromString(this.$store.state.activeUserFriendlyAddress);
            ({ amount: value, fee } = checkoutPaymentOptions);
            ({ recipient, flags, extraData: data } = checkoutPaymentOptions.protocolSpecific);
            this.recipientDetails = {
                address: recipient.toUserFriendlyAddress(),
                label: this.rpcState.origin.split('://')[1],
                image: checkoutRequest.shopLogoUrl,
            };
            // Usually instant as synced in checkout. Only on reload we have to resync.
            validityStartHeightPromise = network.getBlockchainHeight().then((blockchainHeight) => blockchainHeight + 1 // The next block is the earliest for which tx are accepted by standard miners
                - _lib_Constants__WEBPACK_IMPORTED_MODULE_11__["TX_VALIDITY_WINDOW"]
                + checkoutPaymentOptions.protocolSpecific.validityDuration);
            // synchronize time in background
            if (checkoutPaymentOptions.expires) {
                this._initializeCheckoutExpiryTimer().catch((e) => this.$rpc.reject(e));
            }
        }
        else if (this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].CREATE_CASHLINK) {
            // coming from cashlink create
            if (!this.cashlink) {
                this.$rpc.reject(new Error('Ledger Cashlink Signing expects the Cashlink to sign to be in the '
                    + 'static store.'));
                return;
            }
            sender = Nimiq.Address.fromString(this.$store.state.activeUserFriendlyAddress);
            ({ recipient, value, fee } = this.cashlink.getFundingDetails());
            validityStartHeightPromise = network.getBlockchainHeight().then((blockchainHeight) => blockchainHeight + 1);
            data = _lib_Constants__WEBPACK_IMPORTED_MODULE_11__["CASHLINK_FUNDING_DATA"];
            flags = Nimiq.Transaction.Flag.NONE;
            this.recipientDetails = {
                address: this.cashlink.address.toUserFriendlyAddress(),
                label: this.$t('161'),
                isCashlink: true,
            };
        }
        else if (history.length >= 3) {
            // First history entry is root, the second an original request handler invoking the transaction signing
            // and the third is this one. If there was an original request handler calling us but the intermediate
            // transaction signing request was lost on reload and instead the original request recovered from the
            // RPC state, navigate back to the original request handler.
            // TODO implementing a proper request call stack instead of the originalRouteName hack would avoid this
            history.back();
            return;
        }
        else {
            this.$rpc.reject(new Error('Legder Transaction Signing must be invoked via sign-transaction, '
                + 'checkout or cashlink requests.'));
            return;
        }
        let senderAddress;
        let senderType;
        let signerKeyId;
        let signerKeyPath;
        if (sender instanceof Nimiq.Address) {
            // we know that these exist as their existence was already checked in RpcApi.ts
            const senderUserFriendlyAddress = sender.toUserFriendlyAddress();
            const senderAccount = this.findWalletByAddress(senderUserFriendlyAddress, true);
            const senderContract = senderAccount.findContractByAddress(sender);
            const signer = senderAccount.findSignerForAddress(sender);
            senderAddress = sender;
            senderType = senderContract ? senderContract.type : Nimiq.Account.Type.BASIC;
            signerKeyId = senderAccount.keyId;
            signerKeyPath = signer.path;
            this.senderDetails = {
                address: senderUserFriendlyAddress,
                label: (senderContract || signer).label || senderUserFriendlyAddress,
                walletLabel: senderAccount.label,
                balance: (senderContract || signer).balance,
            };
        }
        else {
            ({
                address: senderAddress,
                type: senderType,
                signerKeyId,
                signerKeyPath,
            } = sender);
            const senderUserFriendlyAddress = senderAddress.toUserFriendlyAddress();
            this.senderDetails = {
                address: senderUserFriendlyAddress,
                label: sender.label || senderUserFriendlyAddress,
            };
        }
        // If user left this view in the mean time, don't continue signing / sending the transaction
        if (this.isDestroyed)
            return;
        const transactionInfo = {
            sender: senderAddress,
            senderType,
            recipient,
            value,
            fee: fee || 0,
            network: config__WEBPACK_IMPORTED_MODULE_13__["default"].network,
            extraData: data,
            flags,
        };
        // Check whether transaction was already signed but not successfully sent before user reloaded the page.
        let signedTransaction = network.getUnrelayedTransactions(transactionInfo)[0];
        if (!signedTransaction) {
            let validityStartHeight;
            try {
                validityStartHeight = await validityStartHeightPromise;
            }
            catch (e) {
                this.$rpc.reject(e);
                return;
            }
            try {
                signedTransaction = await _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_4__["default"].Nimiq.signTransaction({
                    ...transactionInfo,
                    validityStartHeight,
                }, signerKeyPath, signerKeyId);
            }
            catch (e) {
                if (this.isDestroyed)
                    return; // user is not on this view anymore
                // If cancelled and not expired, handle the exception. Otherwise just keep the ledger ui / expiry error
                // message displayed.
                if (this.state !== SignTransactionLedger_1.State.EXPIRED
                    && e.message.toLowerCase().indexOf('cancelled') !== -1) {
                    const isCheckoutRequestWithManuallySelectedAddress = this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].CHECKOUT
                        && (!this.checkoutPaymentOptions.protocolSpecific.sender
                            || !senderAddress.equals(this.checkoutPaymentOptions.protocolSpecific.sender));
                    if (isCheckoutRequestWithManuallySelectedAddress
                        || this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].CREATE_CASHLINK) {
                        // If user got here after selecting an account in the checkout flow (which was not automatically
                        // selected via the checkout request) he might want to switch to another one
                        this._back();
                    }
                    else {
                        this._close();
                    }
                }
                return;
            }
        }
        this.shownAccountDetails = null;
        // If user left this view in the mean time, don't continue
        if (this.isDestroyed)
            return;
        // send transaction to network and finish
        let result;
        if (this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].CHECKOUT || this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].CREATE_CASHLINK) {
            this.state = SignTransactionLedger_1.State.SENDING_TRANSACTION;
            if (this.cashlink) {
                // Store cashlink in database first to be safe when browser crashes during sending
                await _lib_CashlinkStore__WEBPACK_IMPORTED_MODULE_14__["CashlinkStore"].Instance.put(this.cashlink);
            }
            result = await network.sendToNetwork(signedTransaction);
        }
        else {
            // request.kind === SIGN_TRANSACTION
            result = await network.makeSignTransactionResult(signedTransaction);
        }
        if (this.request.kind !== _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].CREATE_CASHLINK) {
            this.state = SignTransactionLedger_1.State.FINISHED;
            await new Promise((resolve) => setTimeout(resolve, _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__["default"].SUCCESS_REDIRECT_DELAY));
            this.$rpc.resolve(result);
        }
        else {
            this.$router.replace({ name: _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].MANAGE_CASHLINK });
        }
    }
    destroyed() {
        this.isDestroyed = true;
        clearTimeout(this._checkoutExpiryTimeout);
        this._cancelLedgerRequest();
    }
    get checkoutPaymentOptions() {
        if (this.request.kind !== _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].CHECKOUT)
            return null;
        const checkoutRequest = this.request;
        return checkoutRequest.paymentOptions.find((option) => option.currency === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["Currency"].NIM);
    }
    get transactionData() {
        if (this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].CREATE_CASHLINK) {
            return this.cashlink ? this.cashlink.message : null;
        }
        let data;
        let flags;
        if (this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].SIGN_TRANSACTION) {
            ({ data, flags } = this.request);
        }
        else {
            ({ extraData: data, flags } = this.checkoutPaymentOptions.protocolSpecific);
        }
        if (!data || data.length === 0) {
            return null;
        }
        // tslint:disable-next-line no-bitwise
        if ((flags & Nimiq.Transaction.Flag.CONTRACT_CREATION) > 0) {
            // TODO: Decode contract creation transactions
            // return ...
        }
        return _nimiq_utils__WEBPACK_IMPORTED_MODULE_12__["Utf8Tools"].isValidUtf8(data, true)
            ? _nimiq_utils__WEBPACK_IMPORTED_MODULE_12__["Utf8Tools"].utf8ByteArrayToString(data)
            : Nimiq.BufferUtils.toHex(data);
    }
    get statusScreenState() {
        switch (this.state) {
            case SignTransactionLedger_1.State.FINISHED:
                return _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__["default"].State.SUCCESS;
            case SignTransactionLedger_1.State.EXPIRED:
                return _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__["default"].State.WARNING;
            default:
                return _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__["default"].State.LOADING;
        }
    }
    get statusScreenTitle() {
        switch (this.state) {
            case SignTransactionLedger_1.State.SENDING_TRANSACTION:
                return this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].CREATE_CASHLINK
                    ? this.$t('107')
                    : this.$t('208');
            case SignTransactionLedger_1.State.FINISHED:
                return this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_10__["RequestType"].SIGN_TRANSACTION
                    ? this.$t('251')
                    : this.$t('250');
            case SignTransactionLedger_1.State.EXPIRED:
                return this.$t('235');
            default:
                return '';
        }
    }
    async _initializeCheckoutExpiryTimer() {
        if (!this.checkoutPaymentOptions || !this.checkoutPaymentOptions.expires)
            return;
        const checkoutRequest = this.request;
        if (!checkoutRequest.callbackUrl || !checkoutRequest.csrf) {
            throw new Error('callbackUrl and csrf token are required to fetch time.');
        }
        const referenceTime = await _lib_CheckoutServerApi__WEBPACK_IMPORTED_MODULE_15__["default"].fetchTime(checkoutRequest.callbackUrl, checkoutRequest.csrf);
        this.$refs.info.setTime(referenceTime);
        clearTimeout(this._checkoutExpiryTimeout);
        this._checkoutExpiryTimeout = window.setTimeout(() => {
            this.shownAccountDetails = null;
            this.state = SignTransactionLedger_1.State.EXPIRED;
            this._cancelLedgerRequest();
        }, this.checkoutPaymentOptions.expires - referenceTime);
    }
    _back() {
        window.history.back();
    }
    _close() {
        if (this.state !== SignTransactionLedger_1.State.OVERVIEW
            && this.state !== SignTransactionLedger_1.State.EXPIRED)
            return;
        const error = this.state === SignTransactionLedger_1.State.EXPIRED ? _lib_Constants__WEBPACK_IMPORTED_MODULE_11__["ERROR_REQUEST_TIMED_OUT"] : _lib_Constants__WEBPACK_IMPORTED_MODULE_11__["ERROR_CANCELED"];
        this.$rpc.reject(new Error(error));
    }
    _cancelLedgerRequest() {
        _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_4__["default"].disconnect(
        /* cancelRequest */ true, 
        /* requestTypeToDisconnect */ _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_4__["RequestTypeNimiq"].SIGN_TRANSACTION);
    }
    _updateLedgerUiAnimationPlayState() {
        const ledgerUi = this.$refs['ledger-ui'];
        // Before blur pause immediately, otherwise update after unblur / transition to success screen
        const waitTime = !!this.shownAccountDetails ? 0 : 400;
        setTimeout(() => ledgerUi.$el.classList.toggle('animations-paused', !!this.shownAccountDetails || this.state !== SignTransactionLedger_1.State.OVERVIEW), waitTime);
    }
};
SignTransactionLedger.State = {
    OVERVIEW: 'overview',
    SENDING_TRANSACTION: 'sending-transaction',
    FINISHED: 'finished',
    EXPIRED: 'expired',
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_8__["Static"]
], SignTransactionLedger.prototype, "rpcState", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_8__["Static"]
], SignTransactionLedger.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_8__["Static"]
], SignTransactionLedger.prototype, "cashlink", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_9__["Getter"]
], SignTransactionLedger.prototype, "findWalletByAddress", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('shownAccountDetails'),
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('state')
], SignTransactionLedger.prototype, "_updateLedgerUiAnimationPlayState", null);
SignTransactionLedger = SignTransactionLedger_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: {
            Account: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["Account"],
            PageBody: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageBody"],
            PageHeader: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageHeader"],
            PaymentInfoLine: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PaymentInfoLine"],
            SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["SmallPage"],
            LedgerUi: _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
            StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
            GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
            AccountDetails: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["AccountDetails"],
            Network: _components_Network_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
            Amount: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["Amount"],
            ArrowRightIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["ArrowRightIcon"],
            StopwatchIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["StopwatchIcon"],
        } })
], SignTransactionLedger);
/* harmony default export */ __webpack_exports__["default"] = (SignTransactionLedger);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignTransactionLedger.vue?vue&type=template&id=612b26e0&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignTransactionLedger.vue?vue&type=template&id=612b26e0&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return (_vm.request.kind === "create-cashlink"
  ? !!_vm.cashlink
  : true)
    ? _c(
        "div",
        { staticClass: "container" },
        [
          _c(
            "SmallPage",
            { class: { "account-details-shown": !!_vm.shownAccountDetails } },
            [
              _vm.request.kind === "checkout"
                ? _c("PaymentInfoLine", {
                    ref: "info",
                    staticClass: "blur-target",
                    attrs: {
                      cryptoAmount: {
                        amount: _vm.checkoutPaymentOptions.amount,
                        currency: _vm.checkoutPaymentOptions.currency,
                        decimals: _vm.checkoutPaymentOptions.decimals
                      },
                      fiatAmount:
                        _vm.request.fiatAmount && _vm.request.fiatCurrency
                          ? {
                              amount: _vm.request.fiatAmount,
                              currency: _vm.request.fiatCurrency
                            }
                          : null,
                      vendorMarkup: _vm.checkoutPaymentOptions.vendorMarkup,
                      networkFee: _vm.checkoutPaymentOptions.fee,
                      address: _vm.checkoutPaymentOptions.protocolSpecific
                        .recipient
                        ? _vm.checkoutPaymentOptions.protocolSpecific.recipient.toUserFriendlyAddress()
                        : null,
                      origin: _vm.rpcState.origin,
                      shopLogoUrl: _vm.request.shopLogoUrl,
                      startTime: _vm.request.time,
                      endTime: _vm.checkoutPaymentOptions.expires
                    }
                  })
                : _vm._e(),
              _c(
                "PageHeader",
                {
                  staticClass: "blur-target",
                  attrs: {
                    "back-arrow":
                      _vm.request.kind === "checkout" ||
                      _vm.request.kind === "create-cashlink"
                  },
                  on: { back: _vm._back }
                },
                [
                  _vm._v(
                    " " +
                      _vm._s(
                        _vm.request.kind === "checkout"
                          ? _vm.$t('263')
                          : _vm.request.kind === "create-cashlink"
                          ? _vm.$t('79')
                          : _vm.$t('83')
                      ) +
                      " "
                  )
                ]
              ),
              _c(
                "div",
                { staticClass: "accounts" },
                [
                  _c("Account", {
                    staticClass: "blur-target",
                    attrs: {
                      layout: "column",
                      address: _vm.senderDetails.address,
                      label: _vm.senderDetails.label
                    },
                    nativeOn: {
                      click: function($event) {
                        _vm.shownAccountDetails = _vm.senderDetails
                      }
                    }
                  }),
                  _c("ArrowRightIcon", {
                    staticClass: "arrow-right blur-target"
                  }),
                  _c("Account", {
                    staticClass: "blur-target",
                    attrs: {
                      layout: "column",
                      address: _vm.recipientDetails.address,
                      label: _vm.recipientDetails.label,
                      image: _vm.recipientDetails.image,
                      displayAsCashlink: _vm.recipientDetails.isCashlink
                    },
                    nativeOn: {
                      click: function($event) {
                        _vm.shownAccountDetails = _vm.recipientDetails
                          .isCashlink
                          ? null
                          : _vm.recipientDetails
                      }
                    }
                  })
                ],
                1
              ),
              _c("hr", { staticClass: "blur-target" }),
              _c("Amount", {
                staticClass: "value nq-light-blue blur-target",
                attrs: {
                  amount: _vm.checkoutPaymentOptions
                    ? _vm.checkoutPaymentOptions.amount
                    : (_vm.cashlink || _vm.request).value,
                  minDecimals: 2,
                  maxDecimals: 5
                }
              }),
              (_vm.checkoutPaymentOptions
              ? _vm.checkoutPaymentOptions.fee
              : (_vm.cashlink || _vm.request).fee)
                ? _c(
                    "div",
                    { staticClass: "fee nq-text-s blur-target" },
                    [
                      _vm._v(" + "),
                      _c("Amount", {
                        attrs: {
                          amount: _vm.checkoutPaymentOptions
                            ? _vm.checkoutPaymentOptions.fee
                            : (_vm.cashlink || _vm.request).fee,
                          minDecimals: 2,
                          maxDecimals: 5
                        }
                      }),
                      _vm._v(" " + _vm._s(_vm.$t('118')) + " ")
                    ],
                    1
                  )
                : _vm._e(),
              _vm.transactionData
                ? _c("div", { staticClass: "data nq-text blur-target" }, [
                    _vm._v(" " + _vm._s(_vm.transactionData) + " ")
                  ])
                : _vm._e(),
              _c(
                "div",
                {
                  staticClass: "bottom-container blur-target",
                  class: {
                    "full-height": _vm.state !== _vm.constructor.State.OVERVIEW
                  }
                },
                [
                  _c("LedgerUi", { ref: "ledger-ui", attrs: { small: "" } }),
                  _c(
                    "transition",
                    { attrs: { name: "transition-fade" } },
                    [
                      _vm.state !== _vm.constructor.State.OVERVIEW
                        ? _c("StatusScreen", {
                            attrs: {
                              state: _vm.statusScreenState,
                              title: _vm.statusScreenTitle,
                              mainAction:
                                _vm.state === _vm.constructor.State.EXPIRED
                                  ? "Go back to shop"
                                  : null
                            },
                            on: { "main-action": _vm._close },
                            scopedSlots: _vm._u(
                              [
                                _vm.state === _vm.constructor.State.EXPIRED
                                  ? {
                                      key: "warning",
                                      fn: function() {
                                        return [
                                          _c("StopwatchIcon", {
                                            staticClass: "stopwatch-icon"
                                          }),
                                          _c(
                                            "h1",
                                            { staticClass: "title nq-h1" },
                                            [
                                              _vm._v(
                                                _vm._s(_vm.statusScreenTitle)
                                              )
                                            ]
                                          ),
                                          _c(
                                            "p",
                                            { staticClass: "message nq-text" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    '188'
                                                  )
                                                )
                                              )
                                            ]
                                          )
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
                  )
                ],
                1
              ),
              _c(
                "transition",
                { attrs: { name: "transition-fade" } },
                [
                  _vm.shownAccountDetails
                    ? _c("AccountDetails", {
                        attrs: {
                          address: _vm.shownAccountDetails.address,
                          image: _vm.shownAccountDetails.image,
                          label: _vm.shownAccountDetails.label,
                          walletLabel: _vm.shownAccountDetails.walletLabel,
                          balance: _vm.shownAccountDetails.balance
                        },
                        on: {
                          close: function($event) {
                            _vm.shownAccountDetails = null
                          }
                        }
                      })
                    : _vm._e()
                ],
                1
              )
            ],
            1
          ),
          _c("GlobalClose", {
            attrs: {
              buttonLabel:
                _vm.request.kind === "checkout"
                  ? _vm.$t('52')
                  : "" /* use default */,
              onClose: _vm._close,
              hidden: _vm.state !== _vm.constructor.State.OVERVIEW
            }
          }),
          _c("Network", { ref: "network", attrs: { visible: false } })
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignTransactionLedger.vue?vue&type=style&index=0&id=612b26e0&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignTransactionLedger.vue?vue&type=style&index=0&id=612b26e0&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.small-page[data-v-612b26e0] {\n    /* TODO we should stick to the 70rem default height here, but auto is how the keyguard sign tx screen behaves */\n    height: auto;\n    min-height: 70.5rem;\n    position: relative;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    padding: 3.75rem 4rem 26rem; /* bottom padding for bottom container + additional padding */\n    overflow: hidden; /* avoid overflow of blurred elements */\n}\n.info-line[data-v-612b26e0] {\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    margin: -2rem -1.5rem 3rem;\n}\n.page-header[data-v-612b26e0] {\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    padding: 0;\n    margin-bottom: 4rem; /* use margin instead of padding to reduce area on which to apply expensive blur */\n}\n.page-header[data-v-612b26e0] .page-header-back-button {\n    top: 0;\n    left: .5rem;\n}\n.accounts[data-v-612b26e0] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    margin-top: .75rem;\n    margin-bottom: 3.25rem;\n}\n.accounts .account[data-v-612b26e0] {\n    width: calc(50% - 1.5rem); /* minus half arrow width */\n    padding: 0;\n}\n.accounts .account[data-v-612b26e0]:not(.cashlink) {\n    cursor: pointer;\n}\n.accounts .account[data-v-612b26e0]:not(.cashlink) .identicon {\n    -webkit-transition: -webkit-transform 0.45s ease;\n    transition: -webkit-transform 0.45s ease;\n    transition: transform 0.45s ease;\n    transition: transform 0.45s ease, -webkit-transform 0.45s ease;\n}\n.accounts .account[data-v-612b26e0]:not(.cashlink):hover .identicon {\n    -webkit-transform: scale(1.1);\n            transform: scale(1.1);\n}\n.accounts .account.cashlink[data-v-612b26e0] .label {\n    opacity: .5;\n    line-height: 1.5;\n}\n.accounts .arrow-right[data-v-612b26e0] {\n    font-size: 3rem;\n    margin-top: 3.5rem;\n    color: var(--nimiq-light-blue);\n}\nhr[data-v-612b26e0] {\n    width: 100%;\n    height: 1px;\n    margin: 0;\n    border: none;\n    background: #1F2348;\n    opacity: .1;\n}\n.value[data-v-612b26e0] {\n    font-size: 5rem;\n    margin-top: 2rem;\n}\n.value[data-v-612b26e0] .nim {\n    margin-left: -.25rem;\n    font-size: 2.25rem;\n    font-weight: 700;\n}\n.fee[data-v-612b26e0] {\n    opacity: .5;\n}\n.data[data-v-612b26e0] {\n    margin: .25rem 3rem 0;\n    opacity: 1;\n    color: var(--nimiq-blue);\n}\n.bottom-container[data-v-612b26e0] {\n    position: absolute;\n    width: 100%;\n    height: 23rem;\n    bottom: 0;\n    z-index: 0;\n    -webkit-transition: height .4s, -webkit-filter .4s !important;\n    transition: height .4s, -webkit-filter .4s !important;\n    transition: filter .4s, height .4s !important;\n    transition: filter .4s, height .4s, -webkit-filter .4s !important;\n}\n.bottom-container.full-height[data-v-612b26e0] {\n    height: 100%;\n}\n.bottom-container > *[data-v-612b26e0] {\n    position: absolute;\n    top: 0;\n}\n.ledger-ui.animations-paused[data-v-612b26e0] * {\n    -webkit-animation-play-state: paused !important;\n            animation-play-state: paused !important;\n    -webkit-transition: none !important;\n    transition: none !important;\n}\n.status-screen[data-v-612b26e0] {\n    -webkit-transition: opacity .4s;\n    transition: opacity .4s;\n}\n.status-screen .stopwatch-icon[data-v-612b26e0] {\n    font-size: 15.5rem;\n}\n.account-details[data-v-612b26e0] {\n    position: absolute;\n    top: 0;\n    -webkit-transition: opacity .4s;\n    transition: opacity .4s;\n    background: rgba(255, 255, 255, .875); /* equivalent to keyguard: .5 on blurred and .75 on account details */\n}\n.blur-target[data-v-612b26e0] {\n    -webkit-transition: -webkit-filter .4s;\n    transition: -webkit-filter .4s;\n    transition: filter .4s;\n    transition: filter .4s, -webkit-filter .4s;\n}\n.account-details-shown .blur-target[data-v-612b26e0] {\n    -webkit-filter: blur(20px);\n            filter: blur(20px);\n}\n.account-details-shown .bottom-container[data-v-612b26e0] {\n    -webkit-filter: blur(35px);\n            filter: blur(35px);\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignTransactionLedger.vue?vue&type=style&index=0&id=612b26e0&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SignTransactionLedger.vue?vue&type=style&index=0&id=612b26e0&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignTransactionLedger.vue?vue&type=style&index=0&id=612b26e0&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignTransactionLedger.vue?vue&type=style&index=0&id=612b26e0&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("25c97ae6", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

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

/***/ "./src/views/SignTransactionLedger.vue":
/*!*********************************************!*\
  !*** ./src/views/SignTransactionLedger.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SignTransactionLedger_vue_vue_type_template_id_612b26e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignTransactionLedger.vue?vue&type=template&id=612b26e0&scoped=true& */ "./src/views/SignTransactionLedger.vue?vue&type=template&id=612b26e0&scoped=true&");
/* harmony import */ var _SignTransactionLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SignTransactionLedger.vue?vue&type=script&lang=ts& */ "./src/views/SignTransactionLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _SignTransactionLedger_vue_vue_type_style_index_0_id_612b26e0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SignTransactionLedger.vue?vue&type=style&index=0&id=612b26e0&scoped=true&lang=css& */ "./src/views/SignTransactionLedger.vue?vue&type=style&index=0&id=612b26e0&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SignTransactionLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SignTransactionLedger_vue_vue_type_template_id_612b26e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SignTransactionLedger_vue_vue_type_template_id_612b26e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "612b26e0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/SignTransactionLedger.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/SignTransactionLedger.vue?vue&type=script&lang=ts&":
/*!**********************************************************************!*\
  !*** ./src/views/SignTransactionLedger.vue?vue&type=script&lang=ts& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignTransactionLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignTransactionLedger.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignTransactionLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignTransactionLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/SignTransactionLedger.vue?vue&type=style&index=0&id=612b26e0&scoped=true&lang=css&":
/*!******************************************************************************************************!*\
  !*** ./src/views/SignTransactionLedger.vue?vue&type=style&index=0&id=612b26e0&scoped=true&lang=css& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignTransactionLedger_vue_vue_type_style_index_0_id_612b26e0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignTransactionLedger.vue?vue&type=style&index=0&id=612b26e0&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignTransactionLedger.vue?vue&type=style&index=0&id=612b26e0&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignTransactionLedger_vue_vue_type_style_index_0_id_612b26e0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignTransactionLedger_vue_vue_type_style_index_0_id_612b26e0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignTransactionLedger_vue_vue_type_style_index_0_id_612b26e0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignTransactionLedger_vue_vue_type_style_index_0_id_612b26e0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignTransactionLedger_vue_vue_type_style_index_0_id_612b26e0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/SignTransactionLedger.vue?vue&type=template&id=612b26e0&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./src/views/SignTransactionLedger.vue?vue&type=template&id=612b26e0&scoped=true& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignTransactionLedger_vue_vue_type_template_id_612b26e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SignTransactionLedger.vue?vue&type=template&id=612b26e0&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SignTransactionLedger.vue?vue&type=template&id=612b26e0&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignTransactionLedger_vue_vue_type_template_id_612b26e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SignTransactionLedger_vue_vue_type_template_id_612b26e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=sign-transaction-ledger-legacy.js.map