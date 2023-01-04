(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["swap~swap-ledger"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SetupSwap.vue?vue&type=script&lang=ts&":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SetupSwap.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
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
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nimiq/fastspot-api */ "./node_modules/@nimiq/fastspot-api/dist/index.js");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");










let SetupSwap = class SetupSwap extends _BitcoinSyncBaseView_vue__WEBPACK_IMPORTED_MODULE_4__["default"] {
    constructor() {
        super(...arguments);
        this._isDestroyed = false;
    }
    async mounted() {
        // use mounted instead of created to ensure that SetupSwapLedger has the chance to run its created hook before.
        // existence checked by _hubApiHandler in RpcApi
        this._account = this.findWallet(this.request.walletId);
        try {
            const swapSetupInfo = await this._collectSwapSetupInfo();
            if (this._isDestroyed || !swapSetupInfo)
                return; // destroyed or failed and is displaying an error
            this._setupSwap(swapSetupInfo);
        }
        catch (e) {
            this.error = e.message || e;
            if (this.state === this.State.SYNCING_FAILED // keep the error message displayed and offer to retry
                || this._isDestroyed)
                return;
            this.$rpc.reject(e);
        }
    }
    destroyed() {
        this._isDestroyed = true;
    }
    _setupSwap(swapSetupInfo) {
        // note that this method gets overwritten for SetupSwapLedger
        const keyguardRequest = {
            ...swapSetupInfo,
            appName: this.request.appName,
            keyId: this._account.keyId,
            keyLabel: this._account.labelForKeyguard,
            swapId: this.request.swapId,
            // Display data
            fiatCurrency: this.request.fiatCurrency,
            fundingFiatRate: this.request.fundingFiatRate,
            redeemingFiatRate: this.request.redeemingFiatRate,
            fundFees: this.request.fundFees,
            redeemFees: this.request.redeemFees,
            serviceSwapFee: this.request.serviceSwapFee,
            ...(this.request.layout === 'slider' ? {
                layout: 'slider',
                nimiqAddresses: this.request.nimiqAddresses,
                bitcoinAccount: this.request.bitcoinAccount,
            } : {
                layout: 'standard',
            }),
        };
        const client = this.$rpc.createKeyguardClient(true);
        client.signSwap(keyguardRequest);
    }
    async _collectSwapSetupInfo() {
        // Note that the sync state will only be visible in the UI if the sync is not instant (if we actually sync)
        this.state = this.State.SYNCING;
        if ((this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].BTC || this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].BTC)
            && (!this._account.btcXPub || !this._account.btcAddresses || !this._account.btcAddresses.external.length)) {
            throw new Error(`Account does not have any Bitcoin addresses`);
        }
        let fundingInfo = null;
        let redeemingInfo = null;
        if (this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].NIM) {
            const senderContract = this._account.findContractByAddress(this.request.fund.sender);
            const signer = this._account.findSignerForAddress(this.request.fund.sender);
            if (!signer) {
                throw new Error(`Unknown sender ${this.request.fund.sender.toUserFriendlyAddress()}`);
            }
            fundingInfo = {
                type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].NIM,
                keyPath: signer.path,
                sender: (senderContract || signer).address.serialize(),
                senderType: senderContract ? senderContract.type : Nimiq.Account.Type.BASIC,
                senderLabel: (senderContract || signer).label,
                value: this.request.fund.value,
                fee: this.request.fund.fee,
                validityStartHeight: this.request.fund.validityStartHeight,
            };
        }
        if (this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].BTC) {
            if (!this.request.fund.inputs.length) {
                throw new Error('No BTC funding inputs provided');
            }
            const addresses = this.request.fund.inputs
                .map((input) => input.address)
                .concat(this.request.fund.changeOutput ? this.request.fund.changeOutput.address : [], this.request.fund.refundAddress);
            // Only derive BTC addresses once for the account, not multiple times if addresses are fake
            let didDeriveAddresses = false;
            const addressInfos = {};
            try {
                for (const address of addresses) {
                    let addressInfo = this._account.findBtcAddressInfo(address, !didDeriveAddresses);
                    if (addressInfo instanceof Promise) {
                        didDeriveAddresses = true;
                        addressInfo = await addressInfo;
                    }
                    addressInfos[address] = addressInfo;
                }
            }
            catch (e) {
                this.state = this.State.SYNCING_FAILED;
                throw e;
            }
            // Validate that we own the refund address
            const refundAddressInfo = addressInfos[this.request.fund.refundAddress];
            if (!refundAddressInfo) {
                throw new Error(`Refund address not found: ${this.request.fund.refundAddress}`);
            }
            // Validate that we own the change address
            if (this.request.fund.changeOutput) {
                const addressInfo = addressInfos[this.request.fund.changeOutput.address];
                if (!addressInfo) {
                    throw new Error(`Change address not found: ${this.request.fund.changeOutput.address}`);
                }
            }
            fundingInfo = {
                type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].BTC,
                inputs: this.request.fund.inputs.map((input) => {
                    const addressInfo = addressInfos[input.address];
                    if (!addressInfo) {
                        throw new Error(`Input address not found: ${input.address}`);
                    }
                    return {
                        ...input,
                        keyPath: addressInfo.path,
                    };
                }),
                recipientOutput: this.request.fund.output,
                ...(this.request.fund.changeOutput ? {
                    changeOutput: {
                        ...this.request.fund.changeOutput,
                        keyPath: addressInfos[this.request.fund.changeOutput.address].path,
                    },
                } : {}),
                locktime: this.request.fund.locktime,
                refundKeyPath: refundAddressInfo.path,
            };
        }
        if (this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].EUR) {
            fundingInfo = {
                type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].EUR,
                amount: this.request.fund.value,
                fee: this.request.fund.fee,
                bankLabel: this.request.fund.bankLabel,
            };
        }
        if (this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].NIM) {
            const signer = this._account.findSignerForAddress(this.request.redeem.recipient);
            if (!signer) {
                throw new Error(`Redeem address not found: ${this.request.redeem.recipient}`);
            }
            if (!signer.address.equals(this.request.redeem.recipient)) {
                throw new Error(`Redeem address cannot be a contract`);
            }
            redeemingInfo = {
                type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].NIM,
                keyPath: signer.path,
                recipient: signer.address.serialize(),
                recipientLabel: signer.label,
                value: this.request.redeem.value,
                fee: this.request.redeem.fee,
                validityStartHeight: this.request.redeem.validityStartHeight,
            };
        }
        if (this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].BTC) {
            let addressInfo;
            try {
                addressInfo = await this._account.findBtcAddressInfo(this.request.redeem.output.address);
            }
            catch (e) {
                this.state = this.State.SYNCING_FAILED;
                throw e;
            }
            if (!addressInfo) {
                throw new Error(`Redeem address not found: ${this.request.redeem.output.address}`);
            }
            redeemingInfo = {
                type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].BTC,
                input: {
                    ...this.request.redeem.input,
                    keyPath: addressInfo.path,
                },
                output: {
                    ...this.request.redeem.output,
                    keyPath: addressInfo.path,
                },
            };
        }
        if (this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].EUR) {
            redeemingInfo = {
                type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_8__["SwapAsset"].EUR,
                keyPath: _lib_Constants__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_KEY_PATH"],
                settlement: this.request.redeem.settlement,
                amount: this.request.redeem.value,
                fee: this.request.redeem.fee,
                bankLabel: this.request.redeem.bankLabel,
            };
        }
        if (!fundingInfo || !redeemingInfo) {
            throw new Error('Funding or redeeming info missing.');
        }
        this.state = this.State.NONE;
        return { fund: fundingInfo, redeem: redeemingInfo };
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_7__["Static"]
], SetupSwap.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], SetupSwap.prototype, "findWallet", void 0);
SetupSwap = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_5__["default"], SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["SmallPage"], GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_6__["default"] } }) // including components used in parent class
], SetupSwap);
/* harmony default export */ __webpack_exports__["default"] = (SetupSwap);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SetupSwapSuccess.vue?vue&type=script&lang=ts&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SetupSwapSuccess.vue?vue&type=script&lang=ts& ***!
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
/* harmony import */ var _BitcoinSyncBaseView_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BitcoinSyncBaseView.vue */ "./src/views/BitcoinSyncBaseView.vue");
/* harmony import */ var _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nimiq/fastspot-api */ "./node_modules/@nimiq/fastspot-api/dist/index.js");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _components_Network_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Network.vue */ "./src/components/Network.vue");
/* harmony import */ var _lib_StaticStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/StaticStore */ "./src/lib/StaticStore.ts");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/Helpers */ "./src/lib/Helpers.ts");
/* harmony import */ var _lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinJSLoader */ "./src/lib/bitcoin/BitcoinJSLoader.ts");
/* harmony import */ var _lib_bitcoin_ElectrumClient__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../lib/bitcoin/ElectrumClient */ "./src/lib/bitcoin/ElectrumClient.ts");
/* harmony import */ var _lib_bitcoin_BitcoinHtlcUtils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinHtlcUtils */ "./src/lib/bitcoin/BitcoinHtlcUtils.ts");
/* harmony import */ var _lib_MerkleTreePatch__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../lib/MerkleTreePatch */ "./src/lib/MerkleTreePatch.ts");
















let SetupSwapSuccess = class SetupSwapSuccess extends _BitcoinSyncBaseView_vue__WEBPACK_IMPORTED_MODULE_4__["default"] {
    constructor() {
        super(...arguments);
        this.nimiqNetwork = new _components_Network_vue__WEBPACK_IMPORTED_MODULE_8__["default"]();
        this._isDestroyed = false;
    }
    get State() {
        return {
            ...super.State,
            FETCHING_SWAP_DATA: 'fetching-swap-data',
            FETCHING_SWAP_DATA_FAILED: 'fetching-swap-data-failed',
            SIGNING_TRANSACTIONS: 'signing-transactions',
        };
    }
    async mounted() {
        Promise.all([
            // if nimiq is involved, preload nimiq cryptography used in createTx, makeSignTransactionResult
            this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM || this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM ? Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_11__["loadNimiq"])() : null,
            // if BTC is involved preload BitcoinJS
            this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC || this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC
                ? Object(_lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_12__["loadBitcoinJS"])() : null,
            // if we need to fetch the tx from the network, preload the electrum client
            this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC ? Object(_lib_bitcoin_ElectrumClient__WEBPACK_IMPORTED_MODULE_13__["getElectrumClient"])() : null,
        ]).catch(() => void 0);
        // use mounted instead of created to ensure that SetupSwapLedger has the chance to run its created hook before.
        if (!await this._shouldConfirmSwap()) {
            return; // keep potential error message displayed
        }
        // Confirm swap to Fastspot and get contract details
        this.state = this.State.FETCHING_SWAP_DATA;
        Object(_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["init"])(config__WEBPACK_IMPORTED_MODULE_10__["default"].fastspot.apiEndpoint, config__WEBPACK_IMPORTED_MODULE_10__["default"].fastspot.apiKey);
        let refundAddress = '';
        switch (this.request.fund.type) {
            case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM:
                refundAddress = this.request.fund.sender.toUserFriendlyAddress();
                break;
            case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC:
                refundAddress = this.request.fund.refundAddress;
                break;
            default: break;
        }
        let redeemAddress = '';
        switch (this.request.redeem.type) {
            case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM:
                redeemAddress = this.request.redeem.recipient.toUserFriendlyAddress();
                break;
            case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC:
                redeemAddress = this.request.redeem.output.address;
                break;
            case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].EUR:
                // Assemble recipient object
                redeemAddress = {
                    kty: 'OKP',
                    crv: 'Ed25519',
                    x: this._getOasisRecipientPublicKey(),
                };
                break;
            default: break;
        }
        // Generate UID to track account limits
        const walletInfo = this.findWallet(this.request.walletId);
        if (!walletInfo)
            throw new Error('UNEXPECTED: Cannot find walletId for swap signing');
        const uid = await walletInfo.getUid();
        let confirmedSwap;
        try {
            confirmedSwap = await Object(_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["confirmSwap"])({
                id: this.request.swapId,
            }, this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].EUR ? {
                asset: this.request.redeem.type,
                ...redeemAddress,
            } : {
                // Redeem
                asset: this.request.redeem.type,
                address: redeemAddress,
            }, {
                // Refund
                asset: this.request.fund.type,
                address: refundAddress,
            }, uid).catch((error) => {
                if (error.message === 'The swap was already confirmed before.') {
                    return Object(_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["getSwap"])(this.request.swapId);
                }
                else if (error.message.includes('503')) {
                    throw new Error(this.$t('7'));
                }
                else {
                    throw error;
                }
            });
            console.debug('Swap:', confirmedSwap);
        }
        catch (error) {
            console.error(error);
            this.state = this.State.FETCHING_SWAP_DATA_FAILED;
            this.error = error.message || error;
            return;
        }
        if (this._isDestroyed)
            return;
        // Validate contract details
        // TODO: Validate timeouts if possible (e.g. not possible for NIM)
        let hashRoot;
        let nimiqHtlcHashAlgorithm;
        if (confirmedSwap.from.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM || confirmedSwap.to.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM) {
            const { data: nimHtlcData } = confirmedSwap.contracts[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM].htlc;
            const decodedNimHtlc = Nimiq.HashedTimeLockedContract.dataToPlain(Nimiq.BufferUtils.fromHex(nimHtlcData));
            if (!('hashRoot' in decodedNimHtlc && 'hashAlgorithm' in decodedNimHtlc && 'hashCount' in decodedNimHtlc
                && 'sender' in decodedNimHtlc && 'recipient' in decodedNimHtlc)) {
                this.$rpc.reject(new Error('Invalid Nimiq HTLC data'));
                return;
            }
            const { sender: decodedRefundAddress, recipient: decodedRedeemAddress, hashCount, } = decodedNimHtlc;
            hashRoot = decodedNimHtlc.hashRoot;
            nimiqHtlcHashAlgorithm = Nimiq.Hash.Algorithm.fromAny(decodedNimHtlc.hashAlgorithm);
            const hashSize = Nimiq.Hash.SIZE.get(nimiqHtlcHashAlgorithm);
            if (nimiqHtlcHashAlgorithm === Nimiq.Hash.Algorithm.ARGON2D) {
                // argon2d is blacklisted for HTLCs
                this.$rpc.reject(new Error('Disallowed HTLC hash algorithm argon2d'));
                return;
            }
            if (hashSize !== 32) {
                // Hash must be 32 bytes, as otherwise it cannot work with the BTC HTLC
                this.$rpc.reject(new Error('Disallowed HTLC hash length'));
                return;
            }
            if (hashCount !== 1) {
                // Hash count must be 1 for us to accept the swap
                this.$rpc.reject(new Error('Disallowed HTLC hash count'));
                return;
            }
            if (confirmedSwap.from.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM && refundAddress !== decodedRefundAddress) {
                this.$rpc.reject(new Error('Unknown HTLC refund address'));
                return;
            }
            if (confirmedSwap.to.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM && redeemAddress !== decodedRedeemAddress) {
                this.$rpc.reject(new Error('Unknown HTLC redeem address'));
                return;
            }
        }
        if (confirmedSwap.from.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC || confirmedSwap.to.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC) {
            const { script: btcHtlcScript } = confirmedSwap.contracts[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC].htlc;
            await Object(_lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_12__["loadBitcoinJS"])();
            const decodedBtcHtlc = await Object(_lib_bitcoin_BitcoinHtlcUtils__WEBPACK_IMPORTED_MODULE_14__["decodeBtcScript"])(btcHtlcScript);
            if (hashRoot && decodedBtcHtlc.hashRoot !== hashRoot) {
                this.$rpc.reject(new Error('HTLC hash roots do not match'));
                return;
            }
            hashRoot = decodedBtcHtlc.hashRoot;
            if (confirmedSwap.from.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC && refundAddress !== decodedBtcHtlc.refundAddress) {
                this.$rpc.reject(new Error('Unknown HTLC refund address'));
                return;
            }
            if (confirmedSwap.to.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC && redeemAddress !== decodedBtcHtlc.redeemAddress) {
                this.$rpc.reject(new Error('Unknown HTLC redeem address'));
                return;
            }
        }
        if (confirmedSwap.from.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].EUR || confirmedSwap.to.asset === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].EUR) {
            // TODO: Fetch contract from OASIS API and compare instead of trusting Fastspot
            if (hashRoot && confirmedSwap.hash !== hashRoot) {
                this.$rpc.reject(new Error('HTLC hash roots do not match'));
                return;
            }
            hashRoot = confirmedSwap.hash;
            // TODO: Validate correct recipient public key
        }
        if (!hashRoot) {
            this.$rpc.reject(new Error('UNEXPECTED: Could not extract swap hash from contracts'));
            return;
        }
        // Construct htlc info
        let fundingHtlcInfo = null;
        let redeemingHtlcInfo = null;
        if (this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM) {
            const nimHtlcData = confirmedSwap.contracts[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM].htlc;
            fundingHtlcInfo = {
                type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM,
                htlcData: Nimiq.BufferUtils.fromHex(nimHtlcData.data),
            };
        }
        if (this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC) {
            const btcHtlcData = confirmedSwap.contracts[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC].htlc;
            fundingHtlcInfo = {
                type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC,
                htlcScript: Nimiq.BufferUtils.fromHex(btcHtlcData.script),
            };
        }
        if (this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].EUR) {
            const eurContract = confirmedSwap.contracts[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].EUR];
            const eurHtlcData = eurContract.htlc;
            fundingHtlcInfo = {
                type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].EUR,
                hash: hashRoot,
                timeout: eurContract.timeout,
                htlcId: eurHtlcData.address,
            };
        }
        if (this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM) {
            const nimHtlcData = confirmedSwap.contracts[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM].htlc;
            redeemingHtlcInfo = {
                type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM,
                htlcData: Nimiq.BufferUtils.fromHex(nimHtlcData.data),
                htlcAddress: nimHtlcData.address,
            };
        }
        if (this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC) {
            const btcHtlcData = confirmedSwap.contracts[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC].htlc;
            // Fetch missing info from the blockchain
            // BTC tx hash and output data
            try {
                this.state = this.State.SYNCING;
                const { transaction, output } = await new Promise(async (resolve, reject) => {
                    try {
                        function listener(tx) {
                            const htlcOutput = tx.outputs.find((out) => out.address === btcHtlcData.address);
                            if (htlcOutput && htlcOutput.value === confirmedSwap.to.amount) {
                                resolve({
                                    transaction: tx,
                                    output: htlcOutput,
                                });
                                electrum.removeListener(handle);
                                return true;
                            }
                            return false;
                        }
                        const electrum = await Object(_lib_bitcoin_ElectrumClient__WEBPACK_IMPORTED_MODULE_13__["getElectrumClient"])();
                        // First subscribe to new transactions
                        const handle = electrum.addTransactionListener(listener, [btcHtlcData.address]);
                        // Then check history
                        const history = await electrum.getTransactionsByAddress(btcHtlcData.address);
                        for (const tx of history) {
                            if (listener(tx))
                                return;
                        }
                    }
                    catch (error) {
                        reject(error);
                    }
                });
                redeemingHtlcInfo = {
                    type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].BTC,
                    htlcScript: Nimiq.BufferUtils.fromHex(btcHtlcData.script),
                    transactionHash: transaction.transactionHash,
                    outputIndex: output.index,
                };
            }
            catch (error) {
                console.error(error);
                this.state = this.State.SYNCING_FAILED;
                this.error = error.message || error;
                return;
            }
        }
        if (this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].EUR) {
            const eurContract = confirmedSwap.contracts[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].EUR];
            const eurHtlcData = eurContract.htlc;
            redeemingHtlcInfo = {
                type: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].EUR,
                hash: hashRoot,
                timeout: eurContract.timeout,
                htlcId: eurHtlcData.address,
            };
        }
        if (this._isDestroyed)
            return;
        if (!fundingHtlcInfo || !redeemingHtlcInfo) {
            this.$rpc.reject(new Error('Funding or redeeming HTLC info missing.'));
            return;
        }
        // Sign transactions
        this.state = this.State.SIGNING_TRANSACTIONS;
        let nimiqTransaction;
        let nimiqProxyTransaction;
        let bitcoinTransaction;
        let refundTransaction;
        let euroSettlement;
        try {
            const signingResult = await this._signSwapTransactions({
                fund: fundingHtlcInfo,
                redeem: redeemingHtlcInfo,
            });
            if (!signingResult)
                return; // failed to sign and an error is getting displayed
            ({
                nim: nimiqTransaction,
                nimProxy: nimiqProxyTransaction,
                btc: bitcoinTransaction,
                eur: euroSettlement,
                refundTx: refundTransaction,
            } = signingResult);
        }
        catch (error) {
            if (!this._isDestroyed) {
                this.$rpc.reject(error);
            }
            return;
        }
        if (this._isDestroyed)
            return;
        if (nimiqTransaction) {
            // for redeeming nim transaction prepare a htlc proof with a dummy preImage and hashRoot
            if (this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM && redeemingHtlcInfo.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM
                && nimiqHtlcHashAlgorithm) {
                const dummyPreImage = '0000000000000000000000000000000000000000000000000000000000000000';
                const dummyHashRoot = '66687aadf862bd776c8fc18b8e9f8e20089714856ee233b3902a591d0d5f2925'; // sha256
                const proof = new Nimiq.SerialBuffer(3 + 2 * 32 + nimiqTransaction.proof.length);
                proof.writeUint8(Nimiq.HashedTimeLockedContract.ProofType.REGULAR_TRANSFER);
                proof.writeUint8(nimiqHtlcHashAlgorithm);
                proof.writeUint8(1); // hashCount must be 1 for our swaps
                proof.write(Nimiq.BufferUtils.fromHex(dummyHashRoot));
                proof.write(Nimiq.BufferUtils.fromHex(dummyPreImage));
                proof.write(new Nimiq.SerialBuffer(nimiqTransaction.proof)); // Current proof is regular SignatureProof
                nimiqTransaction.proof = proof;
            }
            // Validate that transaction is valid
            Object(_lib_MerkleTreePatch__WEBPACK_IMPORTED_MODULE_15__["default"])();
            if (!nimiqTransaction.verify()) {
                this.$rpc.reject(new Error('NIM transaction is invalid'));
                return;
            }
        }
        // Construct Hub response
        const result = {
            nim: nimiqTransaction ? await this.nimiqNetwork.makeSignTransactionResult(nimiqTransaction) : undefined,
            nimProxy: nimiqProxyTransaction
                ? await this.nimiqNetwork.makeSignTransactionResult(nimiqProxyTransaction)
                : undefined,
            btc: bitcoinTransaction,
            eur: euroSettlement,
            refundTx: refundTransaction,
        };
        this.$rpc.resolve(result);
    }
    destroyed() {
        this._isDestroyed = true;
    }
    async _shouldConfirmSwap() {
        // note that this method gets overwritten for SetupSwapLedger
        return this.keyguardResult && this.keyguardResult.success && !this._isDestroyed;
    }
    _getOasisRecipientPublicKey() {
        // note that this method gets overwritten for SetupSwapLedger
        if (!this.keyguardResult || !this.keyguardResult.eurPubKey) {
            throw new Error('Cannot find OASIS recipient public key');
        }
        return Nimiq.BufferUtils.toBase64Url(Nimiq.BufferUtils.fromHex(this.keyguardResult.eurPubKey))
            .replace(/\.*$/, ''); // OASIS cannot handle trailing filler dots
    }
    async _signSwapTransactions(htlcInfo) {
        // Note that this method gets overwritten for SetupSwapLedger
        const keyguardRequest = {
            ...htlcInfo,
            swapId: this.request.swapId,
        };
        const client = this.$rpc.createKeyguardClient();
        const { nim: nimiqSignatureResult, btc: bitcoinTransaction, eur: euroSettlement, refundTx, } = await client.signSwapTransactions(keyguardRequest);
        // create a nimiq transaction
        let nimiqTransaction;
        if (this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM && htlcInfo.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM && nimiqSignatureResult) {
            nimiqTransaction = await this.nimiqNetwork.createTx({
                ...this.request.fund,
                recipient: Nimiq.Address.CONTRACT_CREATION,
                recipientType: Nimiq.Account.Type.HTLC,
                data: htlcInfo.fund.htlcData,
                flags: Nimiq.Transaction.Flag.CONTRACT_CREATION,
                signerPubKey: nimiqSignatureResult.publicKey,
                signature: nimiqSignatureResult.signature,
            });
        }
        else if (this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM && htlcInfo.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_5__["SwapAsset"].NIM
            && nimiqSignatureResult) {
            nimiqTransaction = await this.nimiqNetwork.createTx({
                ...this.request.redeem,
                sender: Nimiq.Address.fromUserFriendlyAddress(htlcInfo.redeem.htlcAddress),
                senderType: Nimiq.Account.Type.HTLC,
                signerPubKey: nimiqSignatureResult.publicKey,
                signature: nimiqSignatureResult.signature,
            });
        }
        return {
            nim: nimiqTransaction,
            btc: bitcoinTransaction ? {
                serializedTx: bitcoinTransaction.raw,
                hash: bitcoinTransaction.transactionHash,
            } : undefined,
            eur: euroSettlement,
            refundTx,
        };
    }
    get statusScreenState() {
        if (this.state === this.State.FETCHING_SWAP_DATA_FAILED)
            return _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"].State.ERROR;
        return super.statusScreenState;
    }
    get statusScreenTitle() {
        switch (this.state) {
            case this.State.FETCHING_SWAP_DATA_FAILED:
                return this.$t('223');
            case this.State.SYNCING_FAILED:
                return this.$t('226');
            default:
                return this.$t('191');
        }
    }
    get statusScreenStatus() {
        switch (this.state) {
            case this.State.FETCHING_SWAP_DATA:
                return this.$t('123');
            case this.State.SIGNING_TRANSACTIONS:
                return this.$t('213');
            default:
                return super.statusScreenStatus;
        }
    }
    get statusScreenMessage() {
        if (this.state === this.State.FETCHING_SWAP_DATA_FAILED) {
            return this.$t('122', { error: this.error });
        }
        return super.statusScreenMessage;
    }
    get statusScreenAction() {
        if (this.state !== this.State.FETCHING_SWAP_DATA_FAILED
            && this.state !== this.State.SYNCING_FAILED)
            return '';
        return this.$t('205');
    }
    get isGlobalCloseShown() {
        return this.state === this.State.FETCHING_SWAP_DATA_FAILED || super.isGlobalCloseShown;
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], SetupSwapSuccess.prototype, "findWallet", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    _lib_StaticStore__WEBPACK_IMPORTED_MODULE_9__["Static"]
], SetupSwapSuccess.prototype, "request", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["State"]
], SetupSwapSuccess.prototype, "keyguardResult", void 0);
SetupSwapSuccess = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["SmallPage"], StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"], GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_7__["default"] } }) // including components used in parent class
], SetupSwapSuccess);
/* harmony default export */ __webpack_exports__["default"] = (SetupSwapSuccess);


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

/***/ "./src/views/SetupSwap.vue":
/*!*********************************!*\
  !*** ./src/views/SetupSwap.vue ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SetupSwap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SetupSwap.vue?vue&type=script&lang=ts& */ "./src/views/SetupSwap.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _SetupSwap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/SetupSwap.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/SetupSwap.vue?vue&type=script&lang=ts&":
/*!**********************************************************!*\
  !*** ./src/views/SetupSwap.vue?vue&type=script&lang=ts& ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SetupSwap.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SetupSwap.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/SetupSwapSuccess.vue":
/*!****************************************!*\
  !*** ./src/views/SetupSwapSuccess.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SetupSwapSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SetupSwapSuccess.vue?vue&type=script&lang=ts& */ "./src/views/SetupSwapSuccess.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _SetupSwapSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/SetupSwapSuccess.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/SetupSwapSuccess.vue?vue&type=script&lang=ts&":
/*!*****************************************************************!*\
  !*** ./src/views/SetupSwapSuccess.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwapSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SetupSwapSuccess.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SetupSwapSuccess.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwapSuccess_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ })

}]);
//# sourceMappingURL=swap~swap-ledger.js.map