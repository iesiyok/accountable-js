(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["refund-swap-ledger"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwap.vue?vue&type=script&lang=ts&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/RefundSwap.vue?vue&type=script&lang=ts& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _BitcoinSyncBaseView_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BitcoinSyncBaseView.vue */ "./src/views/BitcoinSyncBaseView.vue");
/* harmony import */ var _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nimiq/keyguard-client */ "./node_modules/@nimiq/keyguard-client/dist/KeyguardClient.es.js");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @nimiq/fastspot-api */ "./node_modules/@nimiq/fastspot-api/dist/index.js");











let RefundSwap = class RefundSwap extends _BitcoinSyncBaseView_vue__WEBPACK_IMPORTED_MODULE_4__["default"] {
    async created() {
        if (this.request.kind !== _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_8__["RequestType"].REFUND_SWAP) {
            // can happen for RefundSwapLedger and is handled there
            return;
        }
        const request = this.request;
        const refundInfo = request.refund;
        const account = this.findWallet(request.walletId); // existence checked in RpcApi
        if (refundInfo.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_10__["SwapAsset"].NIM) {
            const { sender, recipient, value, fee, extraData: data, validityStartHeight } = refundInfo;
            const signer = account.findSignerForAddress(recipient);
            if (!signer) {
                this.$rpc.reject(new Error(`Unknown recipient ${refundInfo.recipient}`));
                return;
            }
            const signRequest = {
                appName: request.appName,
                keyId: account.keyId,
                keyLabel: account.labelForKeyguard,
                keyPath: signer.path,
                sender: sender.serialize(),
                senderType: Nimiq.Account.Type.HTLC,
                senderLabel: 'Swap HTLC',
                // My address, must be refund address of HTLC. Send to signer as recipient might be a contract.
                recipient: signer.address.serialize(),
                recipientLabel: signer.label,
                value,
                fee,
                data,
                validityStartHeight,
            };
            this._signTransaction(signRequest);
        }
        if (refundInfo.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_10__["SwapAsset"].BTC) {
            let signerKeyPath;
            try {
                // Note that the sync state will only be visible in UI if the sync is not instant (if we actually sync)
                this.state = this.State.SYNCING;
                let didDeriveAddresses = false;
                let addressInfo = account.findBtcAddressInfo(refundInfo.refundAddress);
                if (addressInfo instanceof Promise) {
                    didDeriveAddresses = true;
                    addressInfo = await addressInfo;
                }
                if (!addressInfo) {
                    this.$rpc.reject(new Error(`Refund address not found: ${refundInfo.refundAddress}`));
                    return;
                }
                signerKeyPath = addressInfo.path;
                if (!await account.findBtcAddressInfo(refundInfo.output.address, !didDeriveAddresses)) {
                    this.$rpc.reject(new Error(`Output address not found: ${refundInfo.output.address}`));
                    return;
                }
                this.state = this.State.NONE;
            }
            catch (e) {
                this.state = this.State.SYNCING_FAILED;
                this.error = e.message || e;
                return;
            }
            const signRequest = {
                appName: request.appName,
                keyId: account.keyId,
                keyLabel: account.labelForKeyguard,
                inputs: [{
                        ...refundInfo.input,
                        keyPath: signerKeyPath,
                        type: _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_5__["BitcoinTransactionInputType"].HTLC_REFUND,
                    }],
                recipientOutput: {
                    ...refundInfo.output,
                    label: account.label,
                },
            };
            this._signTransaction(signRequest);
        }
    }
    _signTransaction(request) {
        // Note that this method gets overwritten in RefundSwapLedger
        const client = this.$rpc.createKeyguardClient(true);
        if ('sender' in request) {
            // Nimiq request
            client.signTransaction(request);
        }
        else {
            // Bitcoin request
            client.signBtcTransaction(request);
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_9__["Static"]
], RefundSwap.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], RefundSwap.prototype, "findWallet", void 0);
RefundSwap = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["SmallPage"], GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_7__["default"] } }) // including components used in parent class
], RefundSwap);
/* harmony default export */ __webpack_exports__["default"] = (RefundSwap);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwapLedger.vue?vue&type=script&lang=ts&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/RefundSwapLedger.vue?vue&type=script&lang=ts& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _RefundSwap_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RefundSwap.vue */ "./src/views/RefundSwap.vue");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/LedgerUi.vue */ "./src/components/LedgerUi.vue");
/* harmony import */ var _components_Network_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Network.vue */ "./src/components/Network.vue");
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/Helpers */ "./src/lib/Helpers.ts");
/* harmony import */ var _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @nimiq/fastspot-api */ "./node_modules/@nimiq/fastspot-api/dist/index.js");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/PublicRequestTypes */ "./src/lib/PublicRequestTypes.ts");
/* harmony import */ var _lib_RequestParser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../lib/RequestParser */ "./src/lib/RequestParser.ts");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");
/* harmony import */ var _lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinJSLoader */ "./src/lib/bitcoin/BitcoinJSLoader.ts");
/* harmony import */ var _lib_bitcoin_BitcoinHtlcUtils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinHtlcUtils */ "./src/lib/bitcoin/BitcoinHtlcUtils.ts");
/* harmony import */ var _lib_LedgerSwapProxy__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../lib/LedgerSwapProxy */ "./src/lib/LedgerSwapProxy.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_MerkleTreePatch__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../lib/MerkleTreePatch */ "./src/lib/MerkleTreePatch.ts");
/* harmony import */ var _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @nimiq/keyguard-client */ "./node_modules/@nimiq/keyguard-client/dist/KeyguardClient.es.js");






















let RefundSwapLedger = class RefundSwapLedger extends _RefundSwap_vue__WEBPACK_IMPORTED_MODULE_4__["default"] {
    constructor() {
        super(...arguments);
        this.ledgerInstructionsShown = false; // can happen for LedgerSwapProxy LederApi calls
    }
    get State() {
        return {
            ...super.State,
            LEDGER_HTLC_UNSUPPORTED: 'ledger-htlc-unsupported',
        };
    }
    async created() {
        if (this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__["RequestType"].REFUND_SWAP) {
            if (this.request.refund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_10__["SwapAsset"].NIM) {
                Promise.all([
                    // start syncing with the network for later retrieving transaction histories in LedgerSwapProxy
                    (new _components_Network_vue__WEBPACK_IMPORTED_MODULE_8__["default"]()).getNetworkClient(),
                    // preload nimiq cryptography used in LedgerSwapProxy, makeSignTransactionResult
                    Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_9__["loadNimiq"])(),
                ]).catch(() => void 0);
            }
            // first entry point into the flow is handled by the parent class which then calls _signTransaction
            return;
        }
        // After returning from transaction signing side request
        if (!this.sideResult) {
            this.$rpc.reject(new Error('Unexpected: transaction signing did not return a side result'));
            return;
        }
        else if (this.sideResult instanceof Error) {
            this.$rpc.reject(this.sideResult);
            return;
        }
        if (this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__["RequestType"].SIGN_TRANSACTION) {
            // Nimiq transaction
            this.state = this.State.SYNCING; // proxy transaction history is synced in LedgerSwapProxy.createForRefund
            const request = this.request;
            const { sender: senderInfo, recipient, value, fee, data, validityStartHeight } = request;
            const sender = senderInfo instanceof Nimiq.Address ? senderInfo : senderInfo.address;
            // existence guaranteed as already checked previously in RefundSwap
            const ledgerAccount = this.findWalletByAddress(recipient.toUserFriendlyAddress(), true);
            let refundTransaction;
            try {
                // Retrieve the proxy key for this swap from the Ledger
                const swapProxy = await _lib_LedgerSwapProxy__WEBPACK_IMPORTED_MODULE_18__["default"].createForRefund(sender, ledgerAccount.findSignerForAddress(recipient).path, ledgerAccount.keyId);
                if (swapProxy.canSignLocally) {
                    refundTransaction = await swapProxy.signTransaction({
                        recipient,
                        value,
                        fee,
                        validityStartHeight,
                        // extraData: data, // data is the swap proxy marker which we don't want for redeeming from htlc
                        network: config__WEBPACK_IMPORTED_MODULE_11__["default"].network,
                        ...swapProxy.getRefundInfo(sender),
                    });
                }
                else if (sender.equals(swapProxy.address)) {
                    // Refund from the proxy via the Ledger transaction we signed.
                    refundTransaction = Nimiq.Transaction.fromAny(this.sideResult.serializedTx);
                    // Convert the single sig proof of the signed transaction into the proxy multi sig proof.
                    const { publicKey: ledgerSignerPublicKey, signature, } = Nimiq.SignatureProof.unserialize(new Nimiq.SerialBuffer(refundTransaction.proof));
                    refundTransaction.proof = swapProxy.createSignatureProof(ledgerSignerPublicKey, signature)
                        .serialize();
                }
                else {
                    // Refunding from the HTLC is currently not supported by the Ledger app
                    this.state = this.State.LEDGER_HTLC_UNSUPPORTED;
                    return;
                }
            }
            catch (e) {
                this.$rpc.reject(e.message.toLowerCase().indexOf('cancelled') !== -1 ? new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_19__["ERROR_CANCELED"]) : e);
                return;
            }
            if (refundTransaction.senderType === Nimiq.Account.Type.HTLC) {
                // create htlc timeout resolve transaction proof
                const proof = new Nimiq.SerialBuffer(1 + refundTransaction.proof.length);
                proof.writeUint8(Nimiq.HashedTimeLockedContract.ProofType.TIMEOUT_RESOLVE);
                proof.write(refundTransaction.proof);
                refundTransaction.proof = proof;
            }
            // Validate that the transaction is valid
            Object(_lib_MerkleTreePatch__WEBPACK_IMPORTED_MODULE_20__["default"])();
            if (!refundTransaction.verify()) {
                this.$rpc.reject(new Error('NIM transaction is invalid'));
                return;
            }
            this.$rpc.resolve(await (new _components_Network_vue__WEBPACK_IMPORTED_MODULE_8__["default"]()).makeSignTransactionResult(refundTransaction));
        }
        else if (this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__["RequestType"].SIGN_BTC_TRANSACTION) {
            // Bitcoin transaction
            if (!('serializedTx' in this.sideResult && !!this.sideResult.serializedTx)) {
                this.$rpc.reject(new Error('Unexpected: Bitcoin transaction not signed'));
                return;
            }
            await Object(_lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_16__["loadBitcoinJS"])(); // normally it's already loaded at this point, if user didn't reload the page.
            const signedBitcoinTransaction = BitcoinJS.Transaction.fromHex(this.sideResult.serializedTx);
            // set htlc witness for redeeming the BTC htlc
            const htlcInput = signedBitcoinTransaction.ins[0];
            // get signature and signer pub key from default witness generated by ledgerjs (see @ledgerhq/hw-app-btc
            // createTransaction.js creation of the witness towards the end of createTransaction)
            const [inputSignature, signerPubKey] = htlcInput.witness;
            const witnessBytes = BitcoinJS.script.fromASM([
                inputSignature.toString('hex'),
                signerPubKey.toString('hex'),
                'OP_0',
                this.request.inputs[0].witnessScript,
            ].join(' '));
            const witnessStack = BitcoinJS.script.toStack(witnessBytes);
            signedBitcoinTransaction.setWitness(0, witnessStack);
            const result = {
                serializedTx: signedBitcoinTransaction.toHex(),
                hash: signedBitcoinTransaction.getId(),
            };
            this.$rpc.resolve(result);
        }
        else {
            this.$rpc.reject(new Error(`Unexpected request type ${this.request.kind}`));
        }
    }
    async _signTransaction(request) {
        // forward to SignTransactionLedger or SignBtcTransactionLedger
        if ('sender' in request) {
            // Nimiq request
            const { keyId, keyPath, sender, recipient, recipientLabel, value, fee, validityStartHeight } = request;
            const senderAddress = new Nimiq.Address(sender);
            // For Ledgers, the HTLC is currently created by a proxy address, see LedgerSwapProxy, which also needs to
            // sign the refund transaction. The proxy accepts a local key and the Ledger as signers. Let the user
            // confirm and sign the transaction on the Ledger which will then later be used if the local key is not
            // available anymore. However, as the Ledger app currently can not sign HTLC transactions, we always let the
            // user sign the proxy refund transaction instead.
            const signTransactionRequest = {
                appName: request.appName,
                sender: senderAddress.toUserFriendlyAddress(),
                recipient: new Nimiq.Address(recipient).toUserFriendlyAddress(),
                recipientLabel,
                value,
                fee,
                extraData: _lib_LedgerSwapProxy__WEBPACK_IMPORTED_MODULE_18__["LedgerSwapProxyMarker"].REDEEM,
                validityStartHeight,
            };
            const parsedSignTransactionRequest = _lib_RequestParser__WEBPACK_IMPORTED_MODULE_13__["RequestParser"].parse(signTransactionRequest, _lib_StaticStore__WEBPACK_IMPORTED_MODULE_14__["default"].rpcState, _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__["RequestType"].SIGN_TRANSACTION);
            parsedSignTransactionRequest.sender = {
                address: senderAddress,
                label: 'Swap HTLC',
                // type: Nimiq.Account.Type.HTLC, // Ledgers currently can not sign actual htlc transactions
                signerKeyId: keyId,
                signerKeyPath: keyPath,
            };
            // redirect to SignTransactionLedger
            _lib_StaticStore__WEBPACK_IMPORTED_MODULE_14__["default"].request = parsedSignTransactionRequest;
            _lib_StaticStore__WEBPACK_IMPORTED_MODULE_14__["default"].originalRouteName = `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__["RequestType"].REFUND_SWAP}-ledger`;
            this.$router.replace({ name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__["RequestType"].SIGN_TRANSACTION}-ledger` });
        }
        else {
            // Bitcoin request
            const { walletId: accountId } = this.request;
            const { appName, inputs: [htlcInput], recipientOutput: output } = request;
            // Type guard to ensure inputs have a witnessScript
            if (htlcInput.type !== _nimiq_keyguard_client__WEBPACK_IMPORTED_MODULE_21__["BitcoinTransactionInputType"].HTLC_REFUND) {
                throw new Error('UNEXPECTED: Refund input does not have type \'htlc-refund\'');
            }
            this.state = this.State.SYNCING;
            await Object(_lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_16__["loadBitcoinJS"])();
            // note that buffer is marked as external module in vue.config.js and internally, the buffer bundled with
            // BitcoinJS is used, therefore we retrieve it after having BitcoinJS loaded.
            // TODO change this when we don't prebuild BitcoinJS anymore
            const Buffer = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! buffer */ "buffer", 7)).then((module) => module.Buffer);
            const bitcoinNetwork = config__WEBPACK_IMPORTED_MODULE_11__["default"].bitcoinNetwork === _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_15__["BTC_NETWORK_TEST"]
                ? BitcoinJS.networks.testnet
                : BitcoinJS.networks.bitcoin;
            const htlcAddress = BitcoinJS.address.fromOutputScript(Buffer.from(Nimiq.BufferUtils.fromAny(htlcInput.outputScript)), bitcoinNetwork);
            // The timeoutTimestamp we parse from the BTC HTLC script is forwarded one hour
            // (because the timeout in the script itself is set back one hour, because the BTC
            // network only accepts locktimes that are at least one hour old). So we need to
            // remove this added hour before using it as the transaction's locktime.
            const { timeoutTimestamp } = await Object(_lib_bitcoin_BitcoinHtlcUtils__WEBPACK_IMPORTED_MODULE_17__["decodeBtcScript"])(htlcInput.witnessScript);
            const locktime = timeoutTimestamp - (60 * 60) + 1;
            const sequence = 0xfffffffe; // Signal to use locktime, but do not opt into replace-by-fee
            const signBtcTransactionRequest = {
                appName,
                accountId,
                inputs: [{
                        ...htlcInput,
                        sequence,
                        address: htlcAddress,
                    }],
                output,
                locktime,
            };
            const parsedSignBtcTransactionRequest = _lib_RequestParser__WEBPACK_IMPORTED_MODULE_13__["RequestParser"].parse(signBtcTransactionRequest, _lib_StaticStore__WEBPACK_IMPORTED_MODULE_14__["default"].rpcState, _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__["RequestType"].SIGN_BTC_TRANSACTION);
            parsedSignBtcTransactionRequest.inputs[0].keyPath = htlcInput.keyPath;
            // Redirect to SignBtcTransactionLedger
            _lib_StaticStore__WEBPACK_IMPORTED_MODULE_14__["default"].request = parsedSignBtcTransactionRequest;
            _lib_StaticStore__WEBPACK_IMPORTED_MODULE_14__["default"].originalRouteName = `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__["RequestType"].REFUND_SWAP}-ledger`;
            this.$router.replace({ name: `${_lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__["RequestType"].SIGN_BTC_TRANSACTION}-ledger` });
        }
    }
    get statusScreenState() {
        if (this.state !== this.State.LEDGER_HTLC_UNSUPPORTED)
            return super.statusScreenState;
        return _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__["default"].State.ERROR;
    }
    get statusScreenTitle() {
        switch (this.state) {
            case this.State.SYNCING:
                return this.$t('224');
            case this.State.LEDGER_HTLC_UNSUPPORTED:
                return this.$t('196');
            default:
                return super.statusScreenTitle;
        }
    }
    get statusScreenStatus() {
        if (this.state !== this.State.SYNCING)
            return super.statusScreenStatus;
        return this.$t('228', { currency: this._currencyName });
    }
    get statusScreenMessage() {
        switch (this.state) {
            case this.State.SYNCING_FAILED:
                return this.$t('227', {
                    currency: this._currencyName,
                    error: this.error,
                });
            case this.State.LEDGER_HTLC_UNSUPPORTED:
                return this.$t('197');
            default:
                return super.statusScreenMessage;
        }
    }
    get statusScreenAction() {
        if (this.state !== this.State.LEDGER_HTLC_UNSUPPORTED)
            return super.statusScreenAction;
        return this.$t('171');
    }
    get isGlobalCloseShown() {
        return this.request.kind === _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__["RequestType"].REFUND_SWAP // before having signed
            || this.state === this.State.SYNCING_FAILED
            || this.state === this.State.LEDGER_HTLC_UNSUPPORTED;
    }
    get _currencyName() {
        switch (this.request.kind) {
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__["RequestType"].SIGN_TRANSACTION: return 'Nimiq';
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__["RequestType"].SIGN_BTC_TRANSACTION: return 'Bitcoin';
            case _lib_PublicRequestTypes__WEBPACK_IMPORTED_MODULE_12__["RequestType"].REFUND_SWAP:
                const { refund: { type: currency } } = this.request;
                switch (currency) {
                    case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_10__["SwapAsset"].NIM: return 'Nimiq';
                    case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_10__["SwapAsset"].BTC: return 'Bitcoin';
                    default: // fall through
                }
            default:
                throw new Error('Failed to determine request currency');
        }
    }
    _statusScreenActionHandler() {
        if (this.state === this.State.LEDGER_HTLC_UNSUPPORTED) {
            this.$rpc.reject(new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_19__["ERROR_CANCELED"]));
        }
        else {
            super._statusScreenActionHandler();
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_14__["Static"]
], RefundSwapLedger.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_14__["Static"]
], RefundSwapLedger.prototype, "sideResult", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], RefundSwapLedger.prototype, "findWalletByAddress", void 0);
RefundSwapLedger = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__["default"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["SmallPage"], GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_6__["default"], LedgerUi: _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_7__["default"] } })
], RefundSwapLedger);
/* harmony default export */ __webpack_exports__["default"] = (RefundSwapLedger);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwapLedger.vue?vue&type=template&id=2dbc2cae&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/RefundSwapLedger.vue?vue&type=template&id=2dbc2cae&scoped=true& ***!
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
  return _vm.state !== _vm.State.NONE
    ? _c(
        "div",
        { staticClass: "container" },
        [
          _c(
            "SmallPage",
            [
              _c("LedgerUi", {
                on: {
                  "information-shown": function($event) {
                    _vm.ledgerInstructionsShown = true
                  },
                  "no-information-shown": function($event) {
                    _vm.ledgerInstructionsShown = false
                  }
                }
              }),
              _c(
                "transition",
                { attrs: { name: "transition-fade" } },
                [
                  _vm.state === _vm.State.SYNCING_FAILED ||
                  !_vm.ledgerInstructionsShown
                    ? _c("StatusScreen", {
                        attrs: {
                          state: _vm.statusScreenState,
                          title: _vm.statusScreenTitle,
                          status: _vm.statusScreenStatus,
                          message: _vm.statusScreenMessage,
                          mainAction: _vm.statusScreenAction
                        },
                        on: { "main-action": _vm._statusScreenActionHandler }
                      })
                    : _vm._e()
                ],
                1
              )
            ],
            1
          ),
          _c("GlobalClose", { attrs: { hidden: !_vm.isGlobalCloseShown } })
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwapLedger.vue?vue&type=style&index=0&id=2dbc2cae&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/RefundSwapLedger.vue?vue&type=style&index=0&id=2dbc2cae&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.small-page[data-v-2dbc2cae] {\n    position: relative;\n}\n.small-page > *[data-v-2dbc2cae] {\n    position: absolute;\n    top: 0;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwapLedger.vue?vue&type=style&index=0&id=2dbc2cae&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/RefundSwapLedger.vue?vue&type=style&index=0&id=2dbc2cae&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RefundSwapLedger.vue?vue&type=style&index=0&id=2dbc2cae&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwapLedger.vue?vue&type=style&index=0&id=2dbc2cae&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("3e8760c6", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/lib/MerkleTreePatch.ts":
/*!************************************!*\
  !*** ./src/lib/MerkleTreePatch.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return patchMerkleTree; });
function patchMerkleTree() {
    // Patch the Nimiq core MerkleTree class until it gets actually shipped with the Nimiq core web-offline package.
    if (typeof Nimiq.MerkleTree !== 'undefined') {
        console.warn('Nimiq.MerkleTree patch not required anymore and can be removed.');
    }
    else {
        class MerkleTree {
            static computeRoot(values, fnHash = MerkleTree._hash) {
                return MerkleTree._computeRoot(values, fnHash);
            }
            static _computeRoot(values, fnHash) {
                const len = values.length;
                if (len === 0) {
                    return Nimiq.Hash.light(new Uint8Array(0));
                }
                if (len === 1) {
                    return fnHash(values[0]);
                }
                const mid = Math.round(len / 2);
                const left = values.slice(0, mid);
                const right = values.slice(mid);
                const leftHash = MerkleTree._computeRoot(left, fnHash);
                const rightHash = MerkleTree._computeRoot(right, fnHash);
                return Nimiq.Hash.light(Nimiq.BufferUtils.concatTypedArrays(leftHash.serialize(), rightHash.serialize()));
            }
            static _hash(o) {
                if (o instanceof Nimiq.Hash) {
                    return o;
                }
                if ('hash' in o && typeof o.hash === 'function') {
                    return o.hash();
                }
                if ('serialize' in o && typeof o.serialize === 'function') {
                    return Nimiq.Hash.light(o.serialize());
                }
                if (o instanceof Uint8Array) {
                    return Nimiq.Hash.light(o);
                }
                throw new Error('MerkleTree objects must be Uint8Array or have a .hash()/.serialize() method');
            }
        }
        Nimiq.MerkleTree = MerkleTree;
    }
}


/***/ }),

/***/ "./src/lib/bitcoin/BitcoinHtlcUtils.ts":
/*!*********************************************!*\
  !*** ./src/lib/bitcoin/BitcoinHtlcUtils.ts ***!
  \*********************************************/
/*! exports provided: decodeBtcScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeBtcScript", function() { return decodeBtcScript; });
/* harmony import */ var _BitcoinConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");
/* harmony import */ var _BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BitcoinJSLoader */ "./src/lib/bitcoin/BitcoinJSLoader.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");



async function decodeBtcScript(script) {
    // note that buffer is marked as external module in vue.config.js and internally, the buffer bundled
    // with BitcoinJS is used, therefore we retrieve it after having BitcoinJS loaded.
    // TODO change this when we don't prebuild BitcoinJS anymore
    await Object(_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_1__["loadBitcoinJS"])();
    const Buffer = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! buffer */ "buffer", 7)).then((module) => module.Buffer);
    const error = new Error('Invalid BTC HTLC script');
    if (!script || typeof script !== 'string' || !script.length)
        throw error;
    const chunks = BitcoinJS.script.decompile(Buffer.from(script, 'hex'));
    if (!chunks)
        throw error;
    const asm = BitcoinJS.script.toASM(chunks).split(' ');
    let branchesVerifiedIndividually = false;
    /* eslint-disable no-plusplus */
    let i = 0;
    // Start redeem branch
    if (asm[i] !== 'OP_IF')
        throw error;
    // Check secret size
    if (asm[++i] !== 'OP_SIZE' || asm[++i] !== (32).toString(16) || asm[++i] !== 'OP_EQUALVERIFY')
        throw error;
    // Check hash
    if (asm[++i] !== 'OP_SHA256' || asm[i + 2] !== 'OP_EQUALVERIFY')
        throw error;
    const hashRoot = asm[++i];
    ++i;
    // Check redeem address
    if (asm[++i] !== 'OP_DUP' || asm[++i] !== 'OP_HASH160')
        throw error;
    const redeemAddressBytes = asm[++i];
    // End redeem branch, start refund branch
    if (asm[++i] !== 'OP_ELSE') {
        branchesVerifiedIndividually = true;
        if (asm[i] !== 'OP_EQUALVERIFY' || asm[++i] !== 'OP_CHECKSIG' || asm[++i] !== 'OP_ELSE')
            throw error;
    }
    // Check timeout
    // Bitcoin HTLC timeouts are backdated 1 hour, to account for Bitcoin's
    // minimum age for valid transaction locktimes (6 blocks).
    const timeoutTimestamp = BitcoinJS.script.number.decode(Buffer.from(asm[++i], 'hex')) + (60 * 60);
    if (asm[++i] !== 'OP_CHECKLOCKTIMEVERIFY' || asm[++i] !== 'OP_DROP')
        throw error;
    // Check refund address
    if (asm[++i] !== 'OP_DUP' || asm[++i] !== 'OP_HASH160')
        throw error;
    const refundAddressBytes = asm[++i];
    // End refund branch
    if (branchesVerifiedIndividually) {
        if (asm[++i] !== 'OP_EQUALVERIFY' || asm[++i] !== 'OP_CHECKSIG' || asm[++i] !== 'OP_ENDIF')
            throw error;
    }
    else {
        // End contract
        // eslint-disable-next-line no-lonely-if
        if (asm[++i] !== 'OP_ENDIF' || asm[++i] !== 'OP_EQUALVERIFY' || asm[++i] !== 'OP_CHECKSIG')
            throw error;
    }
    if (asm.length !== ++i)
        throw error;
    /* eslint-enable no-plusplus */
    const refundAddress = BitcoinJS.address
        .toBech32(Buffer.from(refundAddressBytes, 'hex'), 0, _BitcoinConstants__WEBPACK_IMPORTED_MODULE_0__["BIP84_ADDRESS_PREFIX"][config__WEBPACK_IMPORTED_MODULE_2__["default"].bitcoinNetwork]);
    const redeemAddress = BitcoinJS.address
        .toBech32(Buffer.from(redeemAddressBytes, 'hex'), 0, _BitcoinConstants__WEBPACK_IMPORTED_MODULE_0__["BIP84_ADDRESS_PREFIX"][config__WEBPACK_IMPORTED_MODULE_2__["default"].bitcoinNetwork]);
    return {
        refundAddress,
        redeemAddress,
        hashRoot,
        timeoutTimestamp,
    };
}


/***/ }),

/***/ "./src/views/RefundSwap.vue":
/*!**********************************!*\
  !*** ./src/views/RefundSwap.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RefundSwap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RefundSwap.vue?vue&type=script&lang=ts& */ "./src/views/RefundSwap.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _RefundSwap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/RefundSwap.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/RefundSwap.vue?vue&type=script&lang=ts&":
/*!***********************************************************!*\
  !*** ./src/views/RefundSwap.vue?vue&type=script&lang=ts& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RefundSwap.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwap.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/RefundSwapLedger.vue":
/*!****************************************!*\
  !*** ./src/views/RefundSwapLedger.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RefundSwapLedger_vue_vue_type_template_id_2dbc2cae_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RefundSwapLedger.vue?vue&type=template&id=2dbc2cae&scoped=true& */ "./src/views/RefundSwapLedger.vue?vue&type=template&id=2dbc2cae&scoped=true&");
/* harmony import */ var _RefundSwapLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RefundSwapLedger.vue?vue&type=script&lang=ts& */ "./src/views/RefundSwapLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _RefundSwapLedger_vue_vue_type_style_index_0_id_2dbc2cae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RefundSwapLedger.vue?vue&type=style&index=0&id=2dbc2cae&scoped=true&lang=css& */ "./src/views/RefundSwapLedger.vue?vue&type=style&index=0&id=2dbc2cae&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _RefundSwapLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RefundSwapLedger_vue_vue_type_template_id_2dbc2cae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RefundSwapLedger_vue_vue_type_template_id_2dbc2cae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2dbc2cae",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/RefundSwapLedger.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/RefundSwapLedger.vue?vue&type=script&lang=ts&":
/*!*****************************************************************!*\
  !*** ./src/views/RefundSwapLedger.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RefundSwapLedger.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwapLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/RefundSwapLedger.vue?vue&type=style&index=0&id=2dbc2cae&scoped=true&lang=css&":
/*!*************************************************************************************************!*\
  !*** ./src/views/RefundSwapLedger.vue?vue&type=style&index=0&id=2dbc2cae&scoped=true&lang=css& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapLedger_vue_vue_type_style_index_0_id_2dbc2cae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RefundSwapLedger.vue?vue&type=style&index=0&id=2dbc2cae&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwapLedger.vue?vue&type=style&index=0&id=2dbc2cae&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapLedger_vue_vue_type_style_index_0_id_2dbc2cae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapLedger_vue_vue_type_style_index_0_id_2dbc2cae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapLedger_vue_vue_type_style_index_0_id_2dbc2cae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapLedger_vue_vue_type_style_index_0_id_2dbc2cae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapLedger_vue_vue_type_style_index_0_id_2dbc2cae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/RefundSwapLedger.vue?vue&type=template&id=2dbc2cae&scoped=true&":
/*!***********************************************************************************!*\
  !*** ./src/views/RefundSwapLedger.vue?vue&type=template&id=2dbc2cae&scoped=true& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapLedger_vue_vue_type_template_id_2dbc2cae_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./RefundSwapLedger.vue?vue&type=template&id=2dbc2cae&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RefundSwapLedger.vue?vue&type=template&id=2dbc2cae&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapLedger_vue_vue_type_template_id_2dbc2cae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RefundSwapLedger_vue_vue_type_template_id_2dbc2cae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=refund-swap-ledger-legacy.js.map