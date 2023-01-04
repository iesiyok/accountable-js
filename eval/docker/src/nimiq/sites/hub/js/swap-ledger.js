(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["swap-ledger"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SetupSwapLedger.vue?vue&type=script&lang=ts&":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SetupSwapLedger.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SetupSwap_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SetupSwap.vue */ "./src/views/SetupSwap.vue");
/* harmony import */ var _SetupSwapSuccess_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SetupSwapSuccess.vue */ "./src/views/SetupSwapSuccess.vue");
/* harmony import */ var _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/StatusScreen.vue */ "./src/components/StatusScreen.vue");
/* harmony import */ var _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/GlobalClose.vue */ "./src/components/GlobalClose.vue");
/* harmony import */ var _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/LedgerUi.vue */ "./src/components/LedgerUi.vue");
/* harmony import */ var _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nimiq/ledger-api */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/ledger-api.es.js");
/* harmony import */ var _nimiq_iqons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @nimiq/iqons */ "./node_modules/@nimiq/iqons/dist/iqons.min.js");
/* harmony import */ var _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @nimiq/fastspot-api */ "./node_modules/@nimiq/fastspot-api/dist/index.js");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinConstants */ "./src/lib/bitcoin/BitcoinConstants.ts");
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../lib/Helpers */ "./src/lib/Helpers.ts");
/* harmony import */ var _lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinJSLoader */ "./src/lib/bitcoin/BitcoinJSLoader.ts");
/* harmony import */ var _lib_bitcoin_ElectrumClient__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../lib/bitcoin/ElectrumClient */ "./src/lib/bitcoin/ElectrumClient.ts");
/* harmony import */ var _lib_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinUtils */ "./src/lib/bitcoin/BitcoinUtils.ts");
/* harmony import */ var _lib_bitcoin_BitcoinLedgerUtils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../lib/bitcoin/BitcoinLedgerUtils */ "./src/lib/bitcoin/BitcoinLedgerUtils.ts");
/* harmony import */ var _lib_LedgerSwapProxy__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../lib/LedgerSwapProxy */ "./src/lib/LedgerSwapProxy.ts");





















let SetupSwapLedger = class SetupSwapLedger extends Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Mixins"])(_SetupSwap_vue__WEBPACK_IMPORTED_MODULE_4__["default"], _SetupSwapSuccess_vue__WEBPACK_IMPORTED_MODULE_5__["default"]) {
    constructor() {
        super(...arguments);
        this.SwapAsset = _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"];
        this.LedgerApiStateType = _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["StateType"];
        this.ledgerInstructionsShown = false;
        this.ledgerApiStateType = _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["default"].currentState.type;
        this.currentlySignedTransaction = null;
    }
    get State() {
        return {
            // super.State doesn't work
            ...this.constructor.superOptions.computed.State.get.call(this),
            FINISHED: 'finished',
        };
    }
    async created() {
        const { fund, redeem, nimiqAddresses, walletId } = this.request;
        Promise.all([
            // preload nimiq cryptography used in ledger api, LedgerSwapProxy and sendToNetwork
            fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM || redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM ? Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_15__["loadNimiq"])() : null,
            // if we need to fund the proxy address, pre-initialize the nimiq network
            fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM ? this.nimiqNetwork.getNetworkClient() : null,
            // preload BitcoinJS and the electrum client used in prepareBitcoinTransactionForLedgerSigning
            fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC || redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC
                ? Object(_lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_16__["loadBitcoinJS"])().then(_lib_bitcoin_ElectrumClient__WEBPACK_IMPORTED_MODULE_17__["getElectrumClient"]) : null,
        ]).catch(() => void 0);
        this._setupSwapPromise = new Promise((resolve) => this._setupSwap = resolve);
        // existence checked by _hubApiHandler in RpcApi
        this._account = this.findWallet(walletId);
        if (fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM || redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM) {
            const nimiqLedgerAddress = fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM
                ? fund.sender
                : redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM
                    ? redeem.recipient
                    : (() => { throw new Error('Unexpected'); })(); // should never happen
            const nimiqLedgerAddressInfo = this._account.findContractByAddress(nimiqLedgerAddress)
                || this._account.accounts.get(nimiqLedgerAddress.toUserFriendlyAddress());
            if (!nimiqLedgerAddressInfo) {
                this.$rpc.reject(new Error(`Unknown address ${nimiqLedgerAddress.toUserFriendlyAddress()}`));
                return;
            }
            if (nimiqAddresses) {
                // Use the provided balance as it's potentially more up to date. Existence of an entry for our address
                // is ensured by RequestParser.
                nimiqLedgerAddressInfo.balance = nimiqAddresses.find(({ address }) => Nimiq.Address.fromAny(address).equals(nimiqLedgerAddress)).balance;
            }
            else {
                nimiqLedgerAddressInfo.balance = nimiqLedgerAddressInfo.balance || 0;
            }
            const signerPath = this._account.findSignerForAddress(nimiqLedgerAddress).path;
            this.nimiqLedgerAddressInfo = {
                ...nimiqLedgerAddressInfo,
                signerPath,
            };
            // As the Ledger Nimiq app currently does not support signing HTLCs yet, we use a proxy in-memory key.
            this._nimiqSwapProxyPromise = (async () => {
                const swapValidityStartHeight = this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM
                    ? this.request.fund.validityStartHeight
                    : this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM
                        ? this.request.redeem.validityStartHeight
                        : (() => { throw new Error('Unexpected'); })(); // should never happen
                // Retrieve the proxy for this swap from the Ledger
                const nimiqSwapProxy = await _lib_LedgerSwapProxy__WEBPACK_IMPORTED_MODULE_20__["default"].create(swapValidityStartHeight, signerPath, this._account.keyId);
                // Replace nim address by the proxy's address. Don't replace request.nimiqAddresses which should contain
                // the original address for display.
                if (fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM) {
                    fund.sender = nimiqSwapProxy.address; // also defines htlc refundAddress in SetupSwapSuccess
                }
                else if (redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM) {
                    redeem.recipient = nimiqSwapProxy.address; // also defines htlc redeemAddress in SetupSwapSuccess
                }
                return nimiqSwapProxy;
            })();
            // Catch errors to avoid uncaught promise rejections but ignore them and keep errors displayed in LedgerUi.
            this._nimiqSwapProxyPromise.catch(() => void 0);
        }
        this._onLedgerApiStateChange = this._onLedgerApiStateChange.bind(this);
        _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["default"].on(_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["EventType"].STATE_CHANGE, this._onLedgerApiStateChange);
    }
    destroyed() {
        this._isDestroyed = true;
        _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["default"].off(_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["EventType"].STATE_CHANGE, this._onLedgerApiStateChange);
        _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["default"].disconnect(
        /* cancelRequest */ true, 
        /* requestTypesToDisconnect */ [
            _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["RequestTypeNimiq"].GET_PUBLIC_KEY,
            _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["RequestTypeNimiq"].SIGN_TRANSACTION,
            _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["RequestTypeBitcoin"].SIGN_TRANSACTION,
        ]);
    }
    async _collectSwapSetupInfo() {
        // super._collectSwapSetupInfo doesn't work
        const swapSetupInfo = await this.constructor.superOptions.methods._collectSwapSetupInfo.call(this);
        if (!swapSetupInfo)
            return null;
        // Replace nim address by the proxy's address.
        if (this._nimiqSwapProxyPromise) {
            let nimiqSwapProxy;
            try {
                nimiqSwapProxy = await this._nimiqSwapProxyPromise;
            }
            catch (e) {
                return null;
            }
            const proxyAddress = nimiqSwapProxy.address.serialize();
            if (swapSetupInfo.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM) {
                swapSetupInfo.fund.sender = proxyAddress;
                swapSetupInfo.fund.senderType = Nimiq.Account.Type.BASIC;
            }
            else if (swapSetupInfo.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM) {
                swapSetupInfo.redeem.recipient = proxyAddress;
            }
        }
        return swapSetupInfo;
    }
    async _shouldConfirmSwap() {
        if (this._isDestroyed)
            return false;
        try {
            // await first step of swap setup
            const swapSetupInfo = await this._setupSwapPromise;
            // Require user to connect and unlock his ledger which also shows that he intends to actually do the swap.
            if (this._nimiqSwapProxyPromise) {
                await this._nimiqSwapProxyPromise; // connects to Ledger within LedgerSwapProxy.create
            }
            else if (swapSetupInfo.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC || swapSetupInfo.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC) {
                await _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["default"].Bitcoin.getWalletId(config__WEBPACK_IMPORTED_MODULE_12__["default"].bitcoinNetwork === _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_14__["BTC_NETWORK_TEST"]
                    ? _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["Network"].TESTNET
                    : _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["Network"].MAINNET);
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
        return !this._isDestroyed;
    }
    _getOasisRecipientPublicKey() {
        throw new Error('Not implemented for Ledger');
        return 'pubkey?';
    }
    async _signSwapTransactions(htlcInfo) {
        // Called from SetupSwapSuccess
        if (this._isDestroyed)
            return null;
        let swapSetupInfo;
        let nimiqSwapProxy;
        let Buffer;
        try {
            [swapSetupInfo, nimiqSwapProxy] = await Promise.all([
                this._setupSwapPromise,
                this._nimiqSwapProxyPromise,
                this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC || this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC
                    ? Object(_lib_bitcoin_BitcoinJSLoader__WEBPACK_IMPORTED_MODULE_16__["loadBitcoinJS"])() : null,
            ]);
            if (typeof BitcoinJS !== 'undefined') {
                // note that buffer is marked as external module in vue.config.js and internally, the buffer bundled
                // with BitcoinJS is used, therefore we retrieve it after having BitcoinJS loaded.
                // TODO change this when we don't prebuild BitcoinJS anymore
                Buffer = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! buffer */ "buffer", 7)).then((module) => module.Buffer);
            }
        }
        catch (e) {
            return null;
        }
        if (this._isDestroyed)
            return null;
        // Step 1: collect transaction infos to sign
        // Collect nimiq swap transaction info
        let nimiqSwapTransactionInfo; // signed by proxy, not Ledger
        let nimiqProxyTransactionInfo;
        if (this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM
            && swapSetupInfo.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM
            && htlcInfo.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM
            && this.nimiqLedgerAddressInfo
            && nimiqSwapProxy) {
            nimiqSwapTransactionInfo = {
                value: swapSetupInfo.fund.value,
                fee: swapSetupInfo.fund.fee,
                network: config__WEBPACK_IMPORTED_MODULE_12__["default"].network,
                ...nimiqSwapProxy.getHtlcCreationInfo(htlcInfo.fund.htlcData),
            };
            // funding tx from Ledger to proxy address
            nimiqProxyTransactionInfo = {
                sender: this.nimiqLedgerAddressInfo.address,
                value: swapSetupInfo.fund.value,
                network: config__WEBPACK_IMPORTED_MODULE_12__["default"].network,
                ...nimiqSwapProxy.getFundingInfo(),
            };
        }
        else if (this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM
            && swapSetupInfo.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM
            && htlcInfo.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM
            && this.nimiqLedgerAddressInfo
            && nimiqSwapProxy) {
            // The htlc redeem tx currently has to be signed by the proxy but doesn't have to forward funds through it.
            nimiqSwapTransactionInfo = {
                sender: Nimiq.Address.fromString(htlcInfo.redeem.htlcAddress),
                senderType: Nimiq.Account.Type.HTLC,
                recipient: this.nimiqLedgerAddressInfo.address,
                value: swapSetupInfo.redeem.value,
                fee: swapSetupInfo.redeem.fee,
                validityStartHeight: swapSetupInfo.redeem.validityStartHeight,
                network: config__WEBPACK_IMPORTED_MODULE_12__["default"].network,
            };
        }
        // Collect bitcoin swap transaction info
        let bitcoinTransactionInfo;
        const bitcoinNetwork = typeof BitcoinJS !== 'undefined' && (config__WEBPACK_IMPORTED_MODULE_12__["default"].bitcoinNetwork === _lib_bitcoin_BitcoinConstants__WEBPACK_IMPORTED_MODULE_14__["BTC_NETWORK_TEST"]
            ? BitcoinJS.networks.testnet
            : BitcoinJS.networks.bitcoin);
        if (this.request.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC
            && swapSetupInfo.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC
            && htlcInfo.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC
            && bitcoinNetwork
            && Buffer) {
            const htlcAddress = BitcoinJS.payments.p2wsh({
                witness: [Buffer.from(htlcInfo.fund.htlcScript)],
                network: bitcoinNetwork,
            }).address;
            if (!htlcAddress) {
                throw new Error('Cannot derive HTLC address from BTC HTLC script');
            }
            bitcoinTransactionInfo = {
                inputs: swapSetupInfo.fund.inputs,
                recipientOutput: {
                    ...swapSetupInfo.fund.recipientOutput,
                    address: htlcAddress,
                },
                ...(this.request.fund.changeOutput && swapSetupInfo.fund.changeOutput ? {
                    changeOutput: {
                        ...swapSetupInfo.fund.changeOutput,
                        address: this.request.fund.changeOutput.address,
                    },
                } : {}),
                locktime: swapSetupInfo.fund.locktime,
            };
        }
        else if (this.request.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC
            && swapSetupInfo.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC
            && htlcInfo.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC) {
            bitcoinTransactionInfo = {
                inputs: [{
                        keyPath: swapSetupInfo.redeem.input.keyPath,
                        transactionHash: htlcInfo.redeem.transactionHash,
                        outputIndex: htlcInfo.redeem.outputIndex,
                        witnessScript: Nimiq.BufferUtils.toHex(htlcInfo.redeem.htlcScript),
                    }],
                recipientOutput: {
                    ...swapSetupInfo.redeem.output,
                    address: this.request.redeem.output.address,
                },
            };
        }
        // prepare btc transaction for ledger signing
        const preparedBitcoinTransactionInfoPromise = bitcoinTransactionInfo
            && Object(_lib_bitcoin_BitcoinLedgerUtils__WEBPACK_IMPORTED_MODULE_19__["prepareBitcoinTransactionForLedgerSigning"])(bitcoinTransactionInfo);
        // Step 2: sign transactions on the Ledger
        let signedNimiqSwapTransaction;
        let signedNimiqProxyTransaction;
        let nimiqSendPromise = Promise.resolve();
        let signedBitcoinTransaction;
        let euroSettlement;
        try {
            if (this._isDestroyed)
                return null;
            // First sign Nim transaction (if Nim is involved in the swap) as user is already connected to nimiq app and
            // to give time for proxy funding.
            if (swapSetupInfo.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM && nimiqProxyTransactionInfo && this.nimiqLedgerAddressInfo) {
                // send funding tx from Ledger to proxy address
                this.currentlySignedTransaction = nimiqProxyTransactionInfo;
                signedNimiqProxyTransaction = this.nimiqNetwork.getUnrelayedTransactions(nimiqProxyTransactionInfo)[0];
                if (!signedNimiqProxyTransaction) {
                    signedNimiqProxyTransaction = await _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["default"].Nimiq.signTransaction(nimiqProxyTransactionInfo, this.nimiqLedgerAddressInfo.signerPath, this._account.keyId);
                }
                // ignore broadcast errors. The Wallet will also try to send the tx
                nimiqSendPromise = this.nimiqNetwork.sendToNetwork(signedNimiqProxyTransaction).catch(() => void 0);
            }
            else if (swapSetupInfo.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM && nimiqSwapTransactionInfo) {
                // For redeeming, the htlc swap transaction is signed by the proxy. Nonetheless, we let the user sign an
                // unused dummy transaction for ux consistency. This transaction is signed from a keyPath which does not
                // actually hold funds.
                const dummyTransaction = {
                    ...nimiqSwapTransactionInfo,
                    senderType: undefined,
                };
                this.currentlySignedTransaction = dummyTransaction;
                await _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["default"].Nimiq.signTransaction(dummyTransaction, 
                // Any unused key path; We use the highest bip32 nimiq path here.
                Object(_nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["getBip32Path"])({ coin: _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["Coin"].NIMIQ, accountIndex: 2 ** 31 - 1, addressIndex: 2 ** 31 - 1 }), this._account.keyId);
            }
            if (this._isDestroyed)
                return null;
            // Sign the Btc transaction
            if (bitcoinTransactionInfo && preparedBitcoinTransactionInfoPromise) {
                let preparedBitcoinTransactionInfo;
                try {
                    preparedBitcoinTransactionInfo = await preparedBitcoinTransactionInfoPromise;
                }
                catch (e) {
                    this.error = e.message || e;
                    return null;
                }
                // Set the state to idle in case it wasn't set yet, as the LedgerApi event fires asynchronously, to
                // avoid that the signing instructions already switch to the next request before it's being processed.
                this.ledgerApiStateType = _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["StateType"].IDLE;
                this.currentlySignedTransaction = bitcoinTransactionInfo;
                signedBitcoinTransaction = BitcoinJS.Transaction.fromHex(await _nimiq_ledger_api__WEBPACK_IMPORTED_MODULE_9__["default"].Bitcoin.signTransaction(preparedBitcoinTransactionInfo));
            }
        }
        catch (e) {
            // If cancelled reject. Otherwise just keep the ledger ui / error message displayed.
            if (e.message.toLowerCase().indexOf('cancelled') !== -1)
                throw new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_13__["ERROR_CANCELED"]);
            return null;
        }
        // Step 3: sign transactions not signed by Ledger
        // Sign Nim swap transaction by proxy. Note that as we just created the proxy, we should still have the salt and
        // therefore the transaction can be signed with the local proxy key without Ledger involvement.
        if (nimiqSwapTransactionInfo && nimiqSwapProxy) {
            signedNimiqSwapTransaction = await nimiqSwapProxy.signTransaction(nimiqSwapTransactionInfo);
        }
        // Set euro settlement
        if (swapSetupInfo.fund.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].EUR) {
            // Nothing to sign for funding EUR
            euroSettlement = '';
        }
        // Step 4: post process signed transactions
        // set htlc witness for redeeming the BTC htlc. For Nimiq, the htlc proof is set in SetupSwapSuccess.
        if (swapSetupInfo.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC
            && htlcInfo.redeem.type === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC
            && signedBitcoinTransaction) {
            const htlcInput = signedBitcoinTransaction.ins[0];
            // get signature and signer pub key from default witness generated by ledgerjs (see @ledgerhq/hw-app-btc
            // createTransaction.js creation of the witness towards the end of createTransaction)
            const [inputSignature, signerPubKey] = htlcInput.witness;
            const witnessBytes = BitcoinJS.script.fromASM([
                inputSignature.toString('hex'),
                signerPubKey.toString('hex'),
                // Use zero-bytes as a dummy secret which are replaced in the wallet once the swap secret is known
                '0000000000000000000000000000000000000000000000000000000000000000',
                'OP_1',
                Nimiq.BufferUtils.toHex(htlcInfo.redeem.htlcScript),
            ].join(' '));
            const witnessStack = BitcoinJS.script.toStack(witnessBytes);
            signedBitcoinTransaction.setWitness(0, witnessStack);
        }
        this.state = this.State.FINISHED;
        await nimiqSendPromise;
        return {
            nim: signedNimiqSwapTransaction,
            nimProxy: signedNimiqProxyTransaction,
            btc: signedBitcoinTransaction && {
                serializedTx: signedBitcoinTransaction.toHex(),
                hash: signedBitcoinTransaction.getId(),
            },
            eur: euroSettlement,
        };
    }
    _statusScreenActionHandler() {
        window.location.reload();
    }
    // Getters for displaying information
    get statusScreenTitle() {
        switch (this.state) {
            case this.State.FETCHING_SWAP_DATA_FAILED:
                return this.$t('223');
            case this.State.SYNCING_FAILED:
                return this.$t('226');
            default:
                return ''; // don't display a title in small ui state
        }
    }
    get statusScreenStatus() {
        // Other than SetupSwapSuccess do no show a status for FETCHING_SWAP_DATA and SIGNING_TRANSACTIONS as during
        // these states typically the LedgerUi is / was just active and the StatusScreen will fade.
        if (this.state !== this.State.SYNCING)
            return '';
        return this.$t('230');
    }
    get _fundingAmountInfo() {
        const { fund: fundInfo, fundFees, bitcoinAccount, fundingFiatRate: fiatRate } = this.request;
        const { type: currency } = fundInfo;
        let currencyDecimals;
        let myAmount; // what we are paying including fees
        let myTransactionFee;
        let newBalance;
        switch (fundInfo.type) {
            case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM:
                currencyDecimals = 5;
                myTransactionFee = fundInfo.fee;
                myAmount = fundInfo.value + fundInfo.fee;
                newBalance = this.nimiqLedgerAddressInfo.balance - myAmount;
                break;
            case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC:
                currencyDecimals = 8;
                const { inputs, output, changeOutput } = fundInfo;
                const inputsValue = inputs.reduce((sum, { value }) => sum + value, 0);
                // inputs minus outputs
                myTransactionFee = (inputsValue - output.value - (changeOutput ? changeOutput.value : 0));
                myAmount = inputsValue - (changeOutput ? changeOutput.value : 0);
                newBalance = bitcoinAccount ? bitcoinAccount.balance - myAmount : undefined;
                break;
            case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].EUR:
                currencyDecimals = 2;
                myTransactionFee = fundInfo.fee;
                myAmount = fundInfo.value + fundInfo.fee;
                newBalance = undefined; // unknown and unused
                break;
            default:
                throw new Error(`Unsupported currency ${currency}`);
        }
        const fees = myTransactionFee + fundFees.processing + fundFees.redeeming;
        const theirAmount = myAmount - fees; // what the other party receives excluding fees
        return { myAmount, theirAmount, myTransactionFee, fees, currency, currencyDecimals, newBalance, fiatRate };
    }
    get _redeemingAmountInfo() {
        const { redeem: redeemInfo, redeemFees, bitcoinAccount, redeemingFiatRate: fiatRate } = this.request;
        const { type: currency } = redeemInfo;
        let currencyDecimals;
        let myAmount; // what we receive excluding fees
        let myTransactionFee;
        let newBalance;
        switch (redeemInfo.type) {
            case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM:
                currencyDecimals = 5;
                myAmount = redeemInfo.value;
                myTransactionFee = redeemInfo.fee;
                newBalance = this.nimiqLedgerAddressInfo.balance + myAmount;
                break;
            case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC:
                currencyDecimals = 8;
                const { input, output } = redeemInfo;
                myAmount = output.value;
                myTransactionFee = input.value - output.value; // inputs minus outputs
                newBalance = bitcoinAccount ? bitcoinAccount.balance + myAmount : undefined;
                break;
            // case SwapAsset.EUR:
            //     currencyDecimals = 2;
            //     myAmount = redeemInfo.value;
            //     myTransactionFee = redeemInfo.fee;
            //     newBalance = undefined; // unknown and unused
            //     break;
            default:
                throw new Error(`Unsupported currency ${currency}`);
        }
        const fees = myTransactionFee + redeemFees.funding + redeemFees.processing;
        const theirAmount = myAmount + fees; // what the other party pays including fees
        return { myAmount, theirAmount, myTransactionFee, fees, currency, currencyDecimals, newBalance, fiatRate };
    }
    get _baseAmountInfo() {
        // alias for _fundingAmountInfo or _redeemingAmountInfo for easier lookup
        const { fund: { type: fundingCurrency }, redeem: { type: redeemingCurrency } } = this.request;
        const swapCurrencies = [fundingCurrency, redeemingCurrency];
        let swapBase;
        if (swapCurrencies.includes(_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM)) {
            swapBase = _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM; // Nim if Nim is involved
        }
        else {
            swapBase = swapCurrencies.find((currency) => currency !== _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].EUR); // the non-fiat currency
        }
        return [this._fundingAmountInfo, this._redeemingAmountInfo].find((info) => info.currency === swapBase);
    }
    get _otherAmountInfo() {
        // alias for _fundingAmountInfo or _redeemingAmountInfo for easier lookup
        return [this._fundingAmountInfo, this._redeemingAmountInfo].find((info) => info !== this._baseAmountInfo);
    }
    get _amountInfoForCurrency() {
        // alias for _fundingAmountInfo and _redeemingAmountInfo for easier lookup
        const amountInfoForCurrency = {};
        amountInfoForCurrency[this._fundingAmountInfo.currency] = this._fundingAmountInfo;
        amountInfoForCurrency[this._redeemingAmountInfo.currency] = this._redeemingAmountInfo;
        return amountInfoForCurrency;
    }
    get _currentSigningInfo() {
        if (!this.currentlySignedTransaction)
            return null;
        let currency;
        let recipient;
        if ('recipient' in this.currentlySignedTransaction) {
            currency = _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM;
            recipient = this.currentlySignedTransaction.recipient.toUserFriendlyAddress();
        }
        else {
            currency = _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC;
            recipient = this.currentlySignedTransaction.recipientOutput.address;
        }
        const amountInfo = this._amountInfoForCurrency[currency];
        if (!amountInfo)
            return null;
        const currenciesToBeSigned = [this._baseAmountInfo, this._otherAmountInfo]
            .map(({ currency: c }) => c)
            // filter out fiat funding which does not have to be signed on the Ledger
            .filter((c) => c === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM || c === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC);
        return {
            step: currenciesToBeSigned.indexOf(currency) + 1,
            totalSteps: currenciesToBeSigned.length,
            instructions: this.$t('77', {
                outgoingOrIncoming: this._fundingAmountInfo.currency === currency
                    ? this.$t('177')
                    : this.$t('138'),
            }),
            recipient,
            amount: this._fundingAmountInfo.currency === currency
                ? amountInfo.myAmount - amountInfo.myTransactionFee
                : amountInfo.myAmount,
            fee: amountInfo.myTransactionFee,
            currency,
            currencyDecimals: amountInfo.currencyDecimals,
        };
    }
    get _totalFiatFees() {
        return this._toFiat(this._fundingAmountInfo.fees, this._fundingAmountInfo.currency)
            + this._toFiat(this._redeemingAmountInfo.fees, this._redeemingAmountInfo.currency)
            + this._toFiat(this.request.serviceSwapFee, this._fundingAmountInfo.currency); // in funding currency
    }
    get _exchangeRate() {
        // how much is one coin of the base currency in the other currency (based on theirAmount as the exchange is
        // determined on their side)?
        const exchangeRate = this._toCoins(this._otherAmountInfo.theirAmount, this._otherAmountInfo.currency)
            / this._toCoins(this._baseAmountInfo.theirAmount, this._baseAmountInfo.currency);
        // Round to _otherAmountInfo.currencyDecimals + 1 decimals and avoid displaying a better exchange rate than the
        // actual one by flooring / ceiling in the worse direction instead of rounding, depending on whether we are
        // paying or receiving the base currency. Add or subtract a small epsilon to avoid rounding up or down due to
        // floating point imprecision.
        const roundingFactor = 10 ** (this._otherAmountInfo.currencyDecimals + 1);
        return this._fundingAmountInfo === this._baseAmountInfo
            // when funding, a lower rate is worse (receives less of other currency for same amount of base currency)
            ? Math.floor(exchangeRate * roundingFactor + 1e-10) / roundingFactor
            // when redeeming, a higher rate is worse (pays more of other currency for same amount of base currency)
            : Math.ceil(exchangeRate * roundingFactor - 1e-10) / roundingFactor;
    }
    get _formattedServiceFee() {
        const { serviceSwapFee } = this.request; // in funding currency
        const relativeServiceFee = serviceSwapFee / (this._fundingAmountInfo.theirAmount - serviceSwapFee);
        // Convert to percent and round to two decimals. Always ceil to avoid displaying a lower fee than charged.
        // Subtract a small epsilon to avoid that numbers get rounded up as a result of floating point imprecision after
        // multiplication. Otherwise formatting for example .07 would result in 7.01%.
        return `${Math.ceil(relativeServiceFee * 100 * 100 - 1e-10) / 100}%`;
    }
    get _formattedOasisFee() {
        const euroAmountInfo = this._amountInfoForCurrency[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].EUR];
        if (!euroAmountInfo)
            return '0%';
        const relativeOasisFee = euroAmountInfo.fees / this._fundingAmountInfo.theirAmount;
        // Convert to percent and round to two decimals. Always ceil to avoid displaying a lower fee than charged.
        // Subtract a small epsilon to avoid that numbers get rounded up as a result of floating point imprecision after
        // multiplication. Otherwise formatting for example .07 would result in 7.01%.
        return `${Math.ceil(relativeOasisFee * 100 * 100 - 1e-10) / 100}%`;
    }
    get _balanceBarEntries() {
        if (this.request.layout !== 'slider'
            || !this.request.nimiqAddresses
            || !this.request.bitcoinAccount
            || !this._amountInfoForCurrency[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM]
            || !this._amountInfoForCurrency[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC])
            return [];
        return [
            ...this.request.nimiqAddresses.map(({ address, balance }) => {
                const nimiqAddress = Nimiq.Address.fromAny(address);
                const oldFiatBalance = this._toFiat(balance, _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM);
                return {
                    currency: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM,
                    background: _nimiq_iqons__WEBPACK_IMPORTED_MODULE_10__["backgroundColors"][_nimiq_iqons__WEBPACK_IMPORTED_MODULE_10__["colorNames"].indexOf(Object(_nimiq_iqons__WEBPACK_IMPORTED_MODULE_10__["getBackgroundColorName"])(nimiqAddress.toUserFriendlyAddress()))],
                    oldFiatBalance,
                    newFiatBalance: nimiqAddress.equals(this.nimiqLedgerAddressInfo.address)
                        ? this._toFiat(this._amountInfoForCurrency[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM].newBalance, _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM)
                        : oldFiatBalance,
                };
            }), {
                currency: _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC,
                background: '#F7931A',
                oldFiatBalance: this._toFiat(this.request.bitcoinAccount.balance, _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC),
                newFiatBalance: this._toFiat(this._amountInfoForCurrency[_nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC].newBalance, _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC),
            },
        ];
    }
    _onLedgerApiStateChange(state) {
        this.ledgerApiStateType = state.type;
    }
    _toCoins(amount, currency) {
        switch (currency) {
            case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].NIM: return Nimiq.Policy.lunasToCoins(amount);
            case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].BTC: return Object(_lib_bitcoin_BitcoinUtils__WEBPACK_IMPORTED_MODULE_18__["satoshisToCoins"])(amount);
            case _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].EUR: return amount / 100;
            default: throw new Error(`Invalid currency ${currency}`);
        }
    }
    _toFiat(amount, currency) {
        const coins = this._toCoins(amount, currency);
        if (currency === _nimiq_fastspot_api__WEBPACK_IMPORTED_MODULE_11__["SwapAsset"].EUR)
            return coins;
        const amountInfoForCurrency = this._amountInfoForCurrency[currency];
        if (!amountInfoForCurrency)
            throw new Error(`Unknown fiat rate for ${currency}`);
        return coins * amountInfoForCurrency.fiatRate;
    }
    _close() {
        if (this.state === this.State.FINISHED)
            return;
        this.$rpc.reject(new Error(_lib_Constants__WEBPACK_IMPORTED_MODULE_13__["ERROR_CANCELED"]));
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vuex_class__WEBPACK_IMPORTED_MODULE_2__["Getter"]
], SetupSwapLedger.prototype, "findWallet", void 0);
SetupSwapLedger = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: {
            SmallPage: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["SmallPage"],
            PageHeader: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["PageHeader"],
            PageBody: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["PageBody"],
            Identicon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["Identicon"],
            Amount: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["Amount"],
            FiatAmount: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["FiatAmount"],
            Tooltip: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["Tooltip"],
            ArrowRightIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["ArrowRightIcon"],
            CheckmarkSmallIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_3__["CheckmarkSmallIcon"],
            StatusScreen: _components_StatusScreen_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
            GlobalClose: _components_GlobalClose_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
            LedgerUi: _components_LedgerUi_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
        } })
], SetupSwapLedger);
/* harmony default export */ __webpack_exports__["default"] = (SetupSwapLedger);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SetupSwapLedger.vue?vue&type=template&id=5734e36f&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SetupSwapLedger.vue?vue&type=template&id=5734e36f&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
        { class: { "wide-page": _vm.request.layout === "slider" } },
        [
          _c("PageHeader", {
            attrs: { "back-arrow": "" },
            on: { back: _vm._close },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function() {
                  return [_vm._v(_vm._s(_vm.$t('80')))]
                },
                proxy: true
              },
              {
                key: "more",
                fn: function() {
                  return [
                    _c("Tooltip", {
                      staticClass: "exchange-rate-tooltip",
                      attrs: { preferredPosition: "bottom right" },
                      scopedSlots: _vm._u([
                        {
                          key: "trigger",
                          fn: function() {
                            return [
                              _vm._v(
                                " 1 " +
                                  _vm._s(_vm._baseAmountInfo.currency) +
                                  " = "
                              ),
                              _vm._otherAmountInfo.currency ===
                                _vm.SwapAsset.BTC ||
                              _vm._otherAmountInfo.currency ===
                                _vm.SwapAsset.NIM
                                ? _c("Amount", {
                                    attrs: {
                                      amount:
                                        _vm._exchangeRate *
                                        Math.pow(
                                          10,
                                          _vm._otherAmountInfo
                                            .currencyDecimals + 1
                                        ),
                                      currency: _vm._otherAmountInfo.currency,
                                      currencyDecimals:
                                        _vm._otherAmountInfo.currencyDecimals +
                                        1,
                                      maxDecimals:
                                        _vm._otherAmountInfo.currencyDecimals +
                                        1,
                                      minDecimals: 0
                                    }
                                  })
                                : _c("FiatAmount", {
                                    attrs: {
                                      amount: _vm._exchangeRate,
                                      currency: _vm.request.fiatCurrency
                                    }
                                  })
                            ]
                          },
                          proxy: true
                        },
                        {
                          key: "default",
                          fn: function() {
                            return [
                              _vm._v(
                                _vm._s(
                                  _vm.$t('244')
                                )
                              )
                            ]
                          },
                          proxy: true
                        }
                      ])
                    }),
                    _c("Tooltip", {
                      staticClass: "fee-tooltip",
                      attrs: { preferredPosition: "bottom left" },
                      scopedSlots: _vm._u([
                        {
                          key: "trigger",
                          fn: function() {
                            return [
                              _c("i18n", {
                                attrs: { path: '3', tag: false },
                                scopedSlots: _vm._u([
                                  {
                                    key: "totalFees",
                                    fn: function() {
                                      return [
                                        _c("FiatAmount", {
                                          attrs: {
                                            amount: _vm._totalFiatFees,
                                            currency: _vm.request.fiatCurrency
                                          }
                                        })
                                      ]
                                    },
                                    proxy: true
                                  }
                                ])
                              })
                            ]
                          },
                          proxy: true
                        },
                        {
                          key: "default",
                          fn: function() {
                            return [
                              _vm._amountInfoForCurrency[_vm.SwapAsset.BTC]
                                ? [
                                    _c("label", [
                                      _vm._v(_vm._s(_vm.$t('49')))
                                    ]),
                                    _c("FiatAmount", {
                                      attrs: {
                                        amount: _vm._toFiat(
                                          _vm._amountInfoForCurrency[
                                            _vm.SwapAsset.BTC
                                          ].fees,
                                          _vm.SwapAsset.BTC
                                        ),
                                        currency: _vm.request.fiatCurrency
                                      }
                                    }),
                                    _c("div", { staticClass: "explainer" }, [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$t(
                                            '26'
                                          )
                                        )
                                      )
                                    ])
                                  ]
                                : _vm._e(),
                              _vm._amountInfoForCurrency[_vm.SwapAsset.EUR]
                                ? [
                                    _c("label", [
                                      _vm._v(
                                        _vm._s(_vm.$t('170'))
                                      )
                                    ]),
                                    _c("FiatAmount", {
                                      attrs: {
                                        amount: _vm._toFiat(
                                          _vm._amountInfoForCurrency[
                                            _vm.SwapAsset.EUR
                                          ].fees,
                                          _vm.SwapAsset.EUR
                                        ),
                                        currency: _vm.request.fiatCurrency
                                      }
                                    }),
                                    _c("div", { staticClass: "explainer" }, [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$t(
                                            '2',
                                            {
                                              percentage: _vm._formattedOasisFee
                                            }
                                          )
                                        )
                                      )
                                    ])
                                  ]
                                : _vm._e(),
                              _vm._amountInfoForCurrency[_vm.SwapAsset.NIM]
                                ? [
                                    _c("label", [
                                      _vm._v(_vm._s(_vm.$t('162')))
                                    ]),
                                    _c("FiatAmount", {
                                      attrs: {
                                        amount: _vm._toFiat(
                                          _vm._amountInfoForCurrency[
                                            _vm.SwapAsset.NIM
                                          ].fees,
                                          _vm.SwapAsset.NIM
                                        ),
                                        currency: _vm.request.fiatCurrency
                                      }
                                    })
                                  ]
                                : _vm._e(),
                              _vm.request.serviceSwapFee
                                ? [
                                    _c("label", [
                                      _vm._v(_vm._s(_vm.$t('222')))
                                    ]),
                                    _c("FiatAmount", {
                                      attrs: {
                                        amount: _vm._toFiat(
                                          _vm.request.serviceSwapFee,
                                          _vm._fundingAmountInfo.currency
                                        ),
                                        currency: _vm.request.fiatCurrency
                                      }
                                    }),
                                    _c("div", { staticClass: "explainer" }, [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$t(
                                            '2',
                                            {
                                              percentage:
                                                _vm._formattedServiceFee
                                            }
                                          )
                                        )
                                      )
                                    ])
                                  ]
                                : _vm._e(),
                              _c("hr"),
                              _c("label", { staticClass: "total" }, [
                                _vm._v(_vm._s(_vm.$t('247')))
                              ]),
                              _c("FiatAmount", {
                                staticClass: "total",
                                attrs: {
                                  amount: _vm._totalFiatFees,
                                  currency: _vm.request.fiatCurrency
                                }
                              })
                            ]
                          },
                          proxy: true
                        }
                      ])
                    })
                  ]
                },
                proxy: true
              }
            ])
          }),
          _vm.request.layout === "standard"
            ? _c("PageBody", { staticClass: "layout-standard" }, [
                _c(
                  "div",
                  { staticClass: "address-infos" },
                  [
                    _vm._l([_vm.request.fund, _vm.request.redeem], function(
                      fundingOrRedeemingInfo
                    ) {
                      return [
                        fundingOrRedeemingInfo.type === _vm.SwapAsset.NIM
                          ? _c(
                              "div",
                              { key: fundingOrRedeemingInfo.type },
                              [
                                _c("Identicon", {
                                  attrs: {
                                    address: _vm.nimiqLedgerAddressInfo.address.toUserFriendlyAddress()
                                  }
                                }),
                                _c("label", [
                                  _vm._v(
                                    _vm._s(_vm.nimiqLedgerAddressInfo.label)
                                  )
                                ])
                              ],
                              1
                            )
                          : fundingOrRedeemingInfo.type === _vm.SwapAsset.BTC
                          ? _c("div", { key: fundingOrRedeemingInfo.type }, [
                              _c("img", { attrs: { src: "/icon-btc.svg" } }),
                              _c("label", [_vm._v(_vm._s(_vm.$t('44')))])
                            ])
                          : fundingOrRedeemingInfo.type === _vm.SwapAsset.EUR
                          ? _c("div", { key: fundingOrRedeemingInfo.type }, [
                              _c("img", { attrs: { src: "/icon-bank.svg" } }),
                              _c("label", [
                                _vm._v(
                                  _vm._s(
                                    _vm.request.fund.bankLabel ||
                                      _vm.$t('278')
                                  )
                                )
                              ])
                            ])
                          : _vm._e(),
                        fundingOrRedeemingInfo === _vm.request.fund
                          ? _c("ArrowRightIcon", {
                              key: fundingOrRedeemingInfo.type + "-arrow"
                            })
                          : _vm._e()
                      ]
                    })
                  ],
                  2
                ),
                _c(
                  "div",
                  { staticClass: "swap-values" },
                  [
                    _c("Amount", {
                      staticClass: "from-value nq-light-blue",
                      attrs: {
                        amount: _vm._fundingAmountInfo.myAmount,
                        currency: _vm._fundingAmountInfo.currency,
                        currencyDecimals:
                          _vm._fundingAmountInfo.currencyDecimals,
                        maxDecimals: _vm._fundingAmountInfo.currencyDecimals,
                        minDecimals:
                          _vm._fundingAmountInfo.currency === _vm.SwapAsset.EUR
                            ? _vm._fundingAmountInfo.currencyDecimals
                            : 0
                      }
                    }),
                    _c(
                      "div",
                      { staticClass: "to-value nq-gray" },
                      [
                        _c(
                          "svg",
                          {
                            attrs: {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "27",
                              height: "21",
                              viewBox: "0 0 27 21"
                            }
                          },
                          [
                            _c(
                              "g",
                              {
                                attrs: {
                                  fill: "none",
                                  stroke: "currentColor",
                                  "stroke-linecap": "round",
                                  "stroke-width": "1.5"
                                }
                              },
                              [
                                _c("path", {
                                  attrs: { d: "M.75.75v6a8 8 0 008 8h17" }
                                }),
                                _c("path", {
                                  attrs: {
                                    d: "M20.75 9.25l5.5 5.5-5.5 5.5",
                                    "stroke-linejoin": "round"
                                  }
                                })
                              ]
                            )
                          ]
                        ),
                        _c("Amount", {
                          attrs: {
                            amount: _vm._redeemingAmountInfo.myAmount,
                            currency: _vm._redeemingAmountInfo.currency,
                            currencyDecimals:
                              _vm._redeemingAmountInfo.currencyDecimals,
                            maxDecimals:
                              _vm._redeemingAmountInfo.currencyDecimals,
                            minDecimals:
                              _vm._redeemingAmountInfo.currency ===
                              _vm.SwapAsset.EUR
                                ? _vm._redeemingAmountInfo.currencyDecimals
                                : 0
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                )
              ])
            : _vm.request.layout === "slider"
            ? _c("PageBody", { staticClass: "layout-slider" }, [
                _c(
                  "div",
                  { staticClass: "address-infos" },
                  [
                    _c("Identicon", {
                      attrs: {
                        address: _vm.nimiqLedgerAddressInfo.address.toUserFriendlyAddress()
                      }
                    }),
                    _c("label", [
                      _vm._v(_vm._s(_vm.nimiqLedgerAddressInfo.label))
                    ]),
                    _c("label", [_vm._v(_vm._s(_vm.$t('44')))]),
                    _c("img", { attrs: { src: "/icon-btc.svg" } })
                  ],
                  1
                ),
                _c(
                  "div",
                  { staticClass: "balance-bar" },
                  [
                    _vm._l(_vm._balanceBarEntries, function(ref, i) {
                      var currency = ref.currency
                      var background = ref.background
                      var oldFiatBalance = ref.oldFiatBalance
                      var newFiatBalance = ref.newFiatBalance
                      return [
                        _vm._balanceBarEntries[i - 1] &&
                        _vm._balanceBarEntries[i - 1].currency !== currency
                          ? [
                              _c("div", {
                                key: "seperator-" + i,
                                staticClass: "separator"
                              })
                            ]
                          : _vm._e(),
                        _c(
                          "div",
                          {
                            key: "bar-" + i,
                            staticClass: "bar",
                            style: {
                              flexGrow: newFiatBalance,
                              opacity:
                                newFiatBalance !== oldFiatBalance ? 1 : 0.25,
                              background: background,
                              borderColor: background
                            }
                          },
                          [
                            newFiatBalance > oldFiatBalance
                              ? _c("div", {
                                  staticClass: "change",
                                  style: {
                                    width:
                                      ((newFiatBalance - oldFiatBalance) /
                                        newFiatBalance) *
                                        100 +
                                      "%"
                                  }
                                })
                              : _vm._e()
                          ]
                        )
                      ]
                    })
                  ],
                  2
                ),
                _c("div", { staticClass: "swap-values" }, [
                  _c(
                    "div",
                    {
                      class: {
                        redeeming:
                          _vm._redeemingAmountInfo === _vm._baseAmountInfo
                      }
                    },
                    [
                      _c("Amount", {
                        attrs: {
                          amount: _vm._baseAmountInfo.myAmount,
                          currency: _vm._baseAmountInfo.currency,
                          currencyDecimals:
                            _vm._baseAmountInfo.currencyDecimals,
                          maxDecimals: _vm._baseAmountInfo.currencyDecimals,
                          minDecimals: 0
                        }
                      }),
                      _c("FiatAmount", {
                        attrs: {
                          amount: _vm._toFiat(
                            _vm._baseAmountInfo.myAmount,
                            _vm._baseAmountInfo.currency
                          ),
                          currency: _vm.request.fiatCurrency
                        }
                      })
                    ],
                    1
                  ),
                  _c(
                    "div",
                    {
                      class: {
                        redeeming:
                          _vm._redeemingAmountInfo === _vm._otherAmountInfo
                      }
                    },
                    [
                      _c("Amount", {
                        attrs: {
                          amount: _vm._otherAmountInfo.myAmount,
                          currency: _vm._otherAmountInfo.currency,
                          currencyDecimals:
                            _vm._otherAmountInfo.currencyDecimals,
                          maxDecimals: _vm._otherAmountInfo.currencyDecimals,
                          minDecimals: 0
                        }
                      }),
                      _c("FiatAmount", {
                        attrs: {
                          amount: _vm._toFiat(
                            _vm._otherAmountInfo.myAmount,
                            _vm._otherAmountInfo.currency
                          ),
                          currency: _vm.request.fiatCurrency
                        }
                      })
                    ],
                    1
                  )
                ]),
                _c("div", { staticClass: "new-balances" }, [
                  _c(
                    "div",
                    [
                      _c("Amount", {
                        attrs: {
                          amount: _vm._baseAmountInfo.newBalance,
                          currency: _vm._baseAmountInfo.currency,
                          currencyDecimals:
                            _vm._baseAmountInfo.currencyDecimals,
                          maxDecimals: _vm._baseAmountInfo.currencyDecimals,
                          minDecimals: 0
                        }
                      }),
                      _c("FiatAmount", {
                        attrs: {
                          amount: _vm._toFiat(
                            _vm._baseAmountInfo.newBalance,
                            _vm._baseAmountInfo.currency
                          ),
                          currency: _vm.request.fiatCurrency
                        }
                      })
                    ],
                    1
                  ),
                  _c(
                    "div",
                    [
                      _c("Amount", {
                        attrs: {
                          amount: _vm._otherAmountInfo.newBalance,
                          currency: _vm._otherAmountInfo.currency,
                          currencyDecimals:
                            _vm._otherAmountInfo.currencyDecimals,
                          maxDecimals: _vm._otherAmountInfo.currencyDecimals,
                          minDecimals: 0
                        }
                      }),
                      _c("FiatAmount", {
                        attrs: {
                          amount: _vm._toFiat(
                            _vm._otherAmountInfo.newBalance,
                            _vm._otherAmountInfo.currency
                          ),
                          currency: _vm.request.fiatCurrency
                        }
                      })
                    ],
                    1
                  )
                ])
              ])
            : _vm._e(),
          _c(
            "div",
            {
              staticClass: "bottom-container",
              class: {
                "full-height":
                  _vm.state === _vm.State.SYNCING_FAILED ||
                  _vm.state === _vm.State.FETCHING_SWAP_DATA_FAILED
              }
            },
            [
              _c("LedgerUi", {
                attrs: { small: "" },
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
                  _vm._currentSigningInfo &&
                  _vm.ledgerApiStateType ===
                    _vm.LedgerApiStateType.REQUEST_PROCESSING
                    ? _c("div", { staticClass: "signing-info nq-blue-bg" }, [
                        _c(
                          "div",
                          { staticClass: "signing-instructions" },
                          [
                            _vm._l(_vm._currentSigningInfo.step - 1, function(
                              step
                            ) {
                              return _c("CheckmarkSmallIcon", {
                                key: "step-icon-" + step,
                                staticClass: "step"
                              })
                            }),
                            _vm._currentSigningInfo.totalSteps > 1
                              ? _c(
                                  "div",
                                  { staticClass: "step current-step" },
                                  [
                                    _vm._v(
                                      " " +
                                        _vm._s(_vm._currentSigningInfo.step) +
                                        " "
                                    )
                                  ]
                                )
                              : _vm._e(),
                            _c("div", { staticClass: "instructions-text" }, [
                              _vm._v(
                                _vm._s(_vm._currentSigningInfo.instructions)
                              )
                            ]),
                            _vm._l(
                              _vm._currentSigningInfo.totalSteps -
                                _vm._currentSigningInfo.step,
                              function(step) {
                                return _c(
                                  "div",
                                  { key: "step-" + step, staticClass: "step" },
                                  [
                                    _vm._v(
                                      " " +
                                        _vm._s(
                                          step + _vm._currentSigningInfo.step
                                        ) +
                                        " "
                                    )
                                  ]
                                )
                              }
                            )
                          ],
                          2
                        ),
                        _c(
                          "div",
                          {
                            staticClass: "transaction-details",
                            class: {
                              // For long BTC htlc addresses use a two line layout
                              "two-line-address-layout":
                                _vm._currentSigningInfo.recipient.length > 44,
                              // on narrower standard layout shrink long amounts if they and the labels don't fit
                              "shrink-amounts":
                                _vm.request.layout === "standard" &&
                                (
                                  _vm.$t('22') +
                                  "" +
                                  _vm._currentSigningInfo.amount /
                                    Math.pow(
                                      10,
                                      _vm._currentSigningInfo.currencyDecimals
                                    ) +
                                  _vm.$t('119') +
                                  "" +
                                  _vm._currentSigningInfo.fee /
                                    Math.pow(
                                      10,
                                      _vm._currentSigningInfo.currencyDecimals
                                    )
                                ).length > 29
                            }
                          },
                          [
                            _c("label", { staticClass: "address-label" }, [
                              _vm._v(_vm._s(_vm.$t('18')))
                            ]),
                            _c("div", { staticClass: "address" }, [
                              _vm._v(_vm._s(_vm._currentSigningInfo.recipient))
                            ]),
                            _c("label", { staticClass: "amount-label" }, [
                              _vm._v(_vm._s(_vm.$t('22')))
                            ]),
                            _c("Amount", {
                              staticClass: "amount",
                              attrs: {
                                amount: _vm._currentSigningInfo.amount,
                                currency: _vm._currentSigningInfo.currency,
                                currencyDecimals:
                                  _vm._currentSigningInfo.currencyDecimals,
                                maxDecimals:
                                  _vm._currentSigningInfo.currencyDecimals,
                                minDecimals: 0
                              }
                            }),
                            _c("label", { staticClass: "fee-label" }, [
                              _vm._v(_vm._s(_vm.$t('119')))
                            ]),
                            _c("Amount", {
                              staticClass: "fee",
                              attrs: {
                                amount: _vm._currentSigningInfo.fee,
                                currency: _vm._currentSigningInfo.currency,
                                currencyDecimals:
                                  _vm._currentSigningInfo.currencyDecimals,
                                maxDecimals:
                                  _vm._currentSigningInfo.currencyDecimals,
                                minDecimals: 0
                              }
                            })
                          ],
                          1
                        )
                      ])
                    : _vm.state === _vm.State.SYNCING_FAILED ||
                      _vm.state === _vm.State.FETCHING_SWAP_DATA_FAILED ||
                      !_vm.ledgerInstructionsShown
                    ? _c("StatusScreen", {
                        attrs: {
                          state: _vm.statusScreenState,
                          title: _vm.statusScreenTitle,
                          status: _vm.statusScreenStatus,
                          message: _vm.statusScreenMessage,
                          mainAction: _vm.statusScreenAction,
                          small:
                            _vm.state !== _vm.State.SYNCING_FAILED &&
                            _vm.state !== _vm.State.FETCHING_SWAP_DATA_FAILED
                        },
                        on: { "main-action": _vm._statusScreenActionHandler }
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
      _c("GlobalClose", { attrs: { hidden: _vm.state === _vm.State.FINISHED } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SetupSwapLedger.vue?vue&type=style&index=0&id=5734e36f&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SetupSwapLedger.vue?vue&type=style&index=0&id=5734e36f&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.small-page[data-v-5734e36f] {\n    position: relative;\n    padding-bottom: 24rem; /* for bottom container + additional padding */\n}\n.small-page.wide-page[data-v-5734e36f] {\n    min-width: 63.5rem;\n}\n.page-header[data-v-5734e36f] {\n    padding-bottom: 3rem;\n}\n.page-header .tooltip[data-v-5734e36f] {\n    margin-top: 2rem;\n    text-align: left;\n    vertical-align: bottom;\n}\n.page-header .tooltip[data-v-5734e36f]:not(:first-of-type) {\n    margin-left: .75rem;\n}\n.page-header .tooltip[data-v-5734e36f] .trigger {\n    padding: 0.75rem 1.5rem;\n    border-radius: 5rem;\n    font-size: 1.75rem;\n    font-weight: 600;\n    color: rgba(31, 35, 72, .6); /* nq-blue with .6 opacity */\n    -webkit-box-shadow: rgba(31, 35, 72, .15) 0 0 0 1.5px inset;\n            box-shadow: rgba(31, 35, 72, .15) 0 0 0 1.5px inset;\n}\n.page-header .tooltip[data-v-5734e36f] .tooltip-box {\n    font-size: 2rem;\n}\n.exchange-rate-tooltip[data-v-5734e36f] .tooltip-box {\n    min-width: 19.5rem;\n    line-height: 1.3;\n}\n.fee-tooltip[data-v-5734e36f] .tooltip-box {\n    display: grid;\n    grid-template-columns: 1fr auto;\n    -webkit-column-gap: 1rem;\n       -moz-column-gap: 1rem;\n            column-gap: 1rem;\n    row-gap: 1rem;\n    width: 32.5rem;\n    padding-left: 2rem;\n    padding-right: 2rem;\n    white-space: nowrap;\n}\n.fee-tooltip .fiat-amount[data-v-5734e36f] {\n    justify-self: right;\n}\n.fee-tooltip .explainer[data-v-5734e36f] {\n    grid-column: span 2;\n    margin-top: -1rem;\n    font-size: 1.75rem;\n    white-space: normal;\n    opacity: .6;\n}\n.fee-tooltip hr[data-v-5734e36f] {\n    grid-column: span 2;\n    margin: .75rem -1rem .5rem;\n    border: unset;\n    border-top: 1px solid white;\n    opacity: .2;\n}\n.fee-tooltip .total[data-v-5734e36f] {\n    font-weight: bold;\n}\n.page-body[data-v-5734e36f] {\n    padding-bottom: 0;\n}\n.address-infos[data-v-5734e36f],\n.swap-values[data-v-5734e36f],\n.new-balances[data-v-5734e36f] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.address-infos label[data-v-5734e36f] {\n    font-size: 2rem;\n    font-weight: 600;\n    line-height: 1.3;\n}\n\n/* Standard layout */\n.layout-standard[data-v-5734e36f] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n.layout-standard .address-infos[data-v-5734e36f] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    margin: 1rem 0 2rem;\n}\n.layout-standard .address-infos > div[data-v-5734e36f] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: calc(50% - 1.5rem);\n}\n.layout-standard .address-infos .identicon[data-v-5734e36f] {\n    width: 9rem;\n    height: 9rem;\n}\n.layout-standard .address-infos :not(.identicon) > img[data-v-5734e36f] {\n    width: 8.5rem;\n    height: 8.5rem;\n    margin: .25rem;\n}\n.layout-standard .address-infos label[data-v-5734e36f] {\n    position: relative;\n    width: 18.5rem; /* 148px, the width the automatic labels are designed for */\n    margin: 1.75rem 0;\n    white-space: nowrap;\n    overflow: hidden;\n    text-align: center;\n}\n.layout-standard .address-infos label[data-v-5734e36f]::after {\n    content: '';\n    display: inline-block;\n    width: 2rem;\n    height: 100%;\n    position: absolute;\n    right: 0;\n    background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), to(white));\n    background: linear-gradient(to right, rgba(255, 255, 255, 0), white);\n}\n.layout-standard .address-infos .nq-icon[data-v-5734e36f] {\n    margin-top: 3.5rem;\n    height: 2.25rem;\n    width: 3rem;\n    color: var(--nimiq-light-blue);\n}\n.layout-standard .swap-values[data-v-5734e36f] {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    margin: 0 auto;\n}\n.layout-standard .from-value[data-v-5734e36f] {\n    font-size: 4rem;\n    font-weight: 600;\n}\n.layout-standard .from-value[data-v-5734e36f] .currency {\n    margin-left: -.15em;\n    font-size: 0.625em;\n    font-weight: bold;\n}\n.layout-standard .to-value[data-v-5734e36f] {\n    font-size: 2.5rem;\n    font-weight: 600;\n    opacity: 0.6;\n}\n.layout-standard .to-value svg[data-v-5734e36f] {\n    opacity: 0.5;\n    margin-left: 1.5rem;\n    margin-right: 0.375rem;\n}\n.layout-standard .to-value[data-v-5734e36f] .currency {\n    margin-left: -.15em;\n    font-size: 0.8em;\n    font-weight: bold;\n}\n\n/* Slider layout */\n.layout-slider .address-infos > .identicon[data-v-5734e36f] {\n    width: 5.75rem;\n    height: 5.75rem;\n    margin: -.25rem 0;\n}\n.layout-slider .address-infos > img[data-v-5734e36f] {\n    width: 5.25rem;\n    height: 5.25rem;\n}\n.layout-slider .address-infos > label[data-v-5734e36f] {\n    max-width: calc(50% - 5.75rem - 3rem); /* minus identicon width and margin */\n    margin: 0 1.5rem;\n}\n.layout-slider .address-infos > label[data-v-5734e36f]:first-of-type {\n    margin-right: auto;\n}\n.layout-slider .balance-bar[data-v-5734e36f] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    height: 3.5rem;\n    margin: 2.75rem 0 4rem;\n}\n.layout-slider .balance-bar[data-v-5734e36f] > :not(:last-child) {\n    margin-right: 0.375rem;\n}\n.layout-slider .balance-bar .bar[data-v-5734e36f] {\n    position: relative;\n    height: 2.5rem;\n    border-radius: 0.5rem;\n    border-width: .25rem;\n    border-style: solid;\n    overflow: hidden;\n}\n.layout-slider .balance-bar .bar[data-v-5734e36f]:first-child {\n    border-top-left-radius: 2rem;\n    border-bottom-left-radius: 2rem;\n}\n.layout-slider .balance-bar .bar[data-v-5734e36f]:last-child {\n    border-top-right-radius: 2rem;\n    border-bottom-right-radius: 2rem;\n}\n.layout-slider .balance-bar .bar .change[data-v-5734e36f] {\n    position: absolute;\n    height: 100%;\n    right: 0;\n    border-radius: 0.125rem;\n    background: url('/swap-change-background.svg') repeat-x;\n}\n.layout-slider .balance-bar .separator ~ .bar .change[data-v-5734e36f] {\n    left: 0;\n    right: unset;\n}\n.layout-slider .balance-bar .separator[data-v-5734e36f] {\n    width: 0.25rem;\n    height: 100%;\n    background: rgba(31, 35, 72, 0.3);\n    border-radius: .125rem;\n}\n.layout-slider .swap-values[data-v-5734e36f] {\n    margin-bottom: 2rem;\n}\n.layout-slider .swap-values > *[data-v-5734e36f],\n.layout-slider .new-balances > *[data-v-5734e36f] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    line-height: 1;\n}\n.layout-slider .swap-values[data-v-5734e36f] > :last-child,\n.layout-slider .new-balances[data-v-5734e36f] > :last-child {\n    text-align: right;\n}\n.layout-slider .swap-values .amount[data-v-5734e36f],\n.layout-slider .new-balances .amount[data-v-5734e36f] {\n    font-size: 2.5rem;\n    font-weight: bold;\n}\n.layout-slider .swap-values .fiat-amount[data-v-5734e36f],\n.layout-slider .new-balances .fiat-amount[data-v-5734e36f] {\n    margin-top: .5rem;\n    font-size: 2rem;\n    font-weight: 600;\n    opacity: .4;\n}\n.layout-slider .swap-values .redeeming[data-v-5734e36f] {\n    color: var(--nimiq-green);\n}\n.layout-slider .swap-values .redeeming .amount[data-v-5734e36f]::before {\n    content: '+';\n}\n.layout-slider .swap-values :not(.redeeming) .amount[data-v-5734e36f]::before {\n    content: '-';\n}\n.layout-slider .swap-values .redeeming .fiat-amount[data-v-5734e36f] {\n    opacity: .7;\n}\n.bottom-container[data-v-5734e36f] {\n    position: absolute;\n    width: 100%;\n    height: 23rem;\n    bottom: 0;\n    -webkit-transition: height .4s;\n    transition: height .4s;\n}\n.bottom-container.full-height[data-v-5734e36f] {\n    height: 100%;\n}\n.bottom-container > *[data-v-5734e36f] {\n    position: absolute;\n    top: 0;\n    -webkit-transition: opacity .4s;\n    transition: opacity .4s;\n    overflow: hidden;\n}\n.ledger-ui[data-v-5734e36f] .loading-spinner {\n    margin-top: -1.25rem; /* position at same position as StatusScreen's loading spinner */\n}\n.signing-info[data-v-5734e36f] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    padding: 2rem;\n    margin: .75rem;\n    width: calc(100% - 1.5rem); /* minus 2 * margin */\n    height: calc(100% - 1.5rem);\n    border-radius: .625rem;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    z-index: 1000;\n}\n.signing-instructions[data-v-5734e36f] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.signing-instructions .step[data-v-5734e36f] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    width: 2.5rem;\n    height: 2.5rem;\n    margin: 0 .375rem;\n    border-radius: 1.25rem;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    font-size: 1.5rem;\n    font-weight: bold;\n    line-height: 1;\n    color: rgba(255, 255, 255, .5);\n    background: rgba(255, 255, 255, .1);\n}\n.signing-instructions .step.nq-icon[data-v-5734e36f] {\n    padding: .75rem;\n}\n.signing-instructions .current-step[data-v-5734e36f] {\n    color: white;\n}\n.signing-instructions .instructions-text[data-v-5734e36f] {\n    font-size: 1.75rem;\n    font-weight: 600;\n    margin: 0 1rem 0 .625rem;\n}\n.transaction-details[data-v-5734e36f] {\n    /* as grid layout to be able to align address with amount in two-line-address-layout regardless of label\n    transaction lengths */\n    display: grid;\n    min-width: 100%;\n    grid-template-columns: 1fr auto 1fr auto;\n    /* short address layout: have the address and address label in separate lines */\n    grid-template-areas:\n        \"address-label address-label address-label address-label\"\n        \"address       address       address       address\"\n        \"amount-label  amount        fee-label     fee\";\n}\n.transaction-details.two-line-address-layout[data-v-5734e36f] {\n    grid-template-columns: .5fr auto 1fr auto;\n    /* long address layout: no own line for address label, allow the address to break into multiple lines instead */\n    grid-template-areas:\n        \"address-label   address   address   address\"\n        \"amount-label    amount    fee-label fee\";\n}\n.transaction-details > *[data-v-5734e36f] {\n    border-radius: .5rem;\n    padding: 1rem 1rem .875rem;\n    border: .25rem solid rgba(255, 255, 255, .15);\n}\n.transaction-details.two-line-address-layout .address-label[data-v-5734e36f],\n.transaction-details .amount-label[data-v-5734e36f],\n.transaction-details .fee-label[data-v-5734e36f] {\n    padding-right: 0;\n    border-right: none;\n    border-top-right-radius: unset;\n    border-bottom-right-radius: unset;\n}\n.transaction-details.two-line-address-layout .address[data-v-5734e36f],\n.transaction-details .amount[data-v-5734e36f],\n.transaction-details .fee[data-v-5734e36f] {\n    border-left: none;\n    border-top-left-radius: unset;\n    border-bottom-left-radius: unset;\n}\n.transaction-details:not(.two-line-address-layout) .address-label[data-v-5734e36f] {\n    border-bottom: none;\n    border-bottom-left-radius: unset;\n    border-bottom-right-radius: unset;\n}\n.transaction-details:not(.two-line-address-layout) .address[data-v-5734e36f] {\n    padding-top: .125rem;\n    border-top: none;\n    border-top-left-radius: unset;\n    border-top-right-radius: unset;\n}\n.transaction-details .address ~ *[data-v-5734e36f] {\n    margin-top: 1.5rem;\n}\n.transaction-details .fee-label[data-v-5734e36f] {\n    margin-left: 1.5rem;\n}\n.transaction-details label[data-v-5734e36f] {\n    font-size: 1.5rem;\n    font-weight: bold;\n    line-height: 1;\n    letter-spacing: 0.0875rem;\n    text-transform: uppercase;\n    color: rgba(255, 255, 255, .5);\n}\n\n/* Let the browser lazy load the missing glyph for the letter I that is not included in the Fira Mono subset for\nNimiq addresses (see blocking.css) when we need it to render the ticker \"NIM\".\nSee https://jakearchibald.com/2014/minimising-font-downloads/ or https://jakearchibald.com/2017/combining-fonts/ */\n@font-face {\n    font-family: 'Fira Mono';\n    font-style: normal;\n    font-weight: 400;\n    font-display: swap;\n    src: local('Fira Mono Regular'), local('FiraMono-Regular'),\n        /* Taken from https://fonts.googleapis.com/css2?family=Fira+Mono&text=I */\n        url(https://fonts.gstatic.com/l/font?kit=N0bX2SlFPv1weGeLZDtQJOzW0A&skey=bb26c8d476ab3f05&v=v9) format('woff2');\n    unicode-range: U+49; /* capital I */\n}\n.transaction-details label + *[data-v-5734e36f] {\n    font-family: 'Fira Mono', monospace;\n    font-size: 1.75rem;\n    line-height: 1;\n}\n.wide-page .transaction-details label + *[data-v-5734e36f] {\n    font-size: 2rem;\n    line-height: .75;\n}\n.transaction-details .address[data-v-5734e36f] {\n    word-spacing: -.25rem;\n    white-space: nowrap;\n}\n.wide-page  .transaction-details .address[data-v-5734e36f] {\n    word-spacing: normal;\n}\n.transaction-details.two-line-address-layout .address[data-v-5734e36f] {\n    padding-top: .5rem;\n    line-height: 1.3;\n    word-break: break-all;\n    white-space: normal;\n}\n.transaction-details .amount[data-v-5734e36f],\n.transaction-details .fee[data-v-5734e36f] {\n    word-spacing: -.375rem;\n}\n.transaction-details.shrink-amounts .amount[data-v-5734e36f],\n.transaction-details.shrink-amounts .fee[data-v-5734e36f] {\n    letter-spacing: -.125rem;\n}\n.transaction-details .address-label[data-v-5734e36f] {\n    grid-area: address-label;\n}\n.transaction-details .address[data-v-5734e36f] {\n    grid-area: address;\n}\n.transaction-details .amount-label[data-v-5734e36f] {\n    grid-area: amount-label;\n}\n.transaction-details .amount[data-v-5734e36f]:not(.fee) {\n    grid-area: amount;\n}\n.transaction-details .fee-label[data-v-5734e36f] {\n    grid-area: fee-label;\n}\n.transaction-details .fee[data-v-5734e36f] {\n    grid-area: fee;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SetupSwapLedger.vue?vue&type=style&index=0&id=5734e36f&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SetupSwapLedger.vue?vue&type=style&index=0&id=5734e36f&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SetupSwapLedger.vue?vue&type=style&index=0&id=5734e36f&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SetupSwapLedger.vue?vue&type=style&index=0&id=5734e36f&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("790f428d", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

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

/***/ "./src/views/SetupSwapLedger.vue":
/*!***************************************!*\
  !*** ./src/views/SetupSwapLedger.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SetupSwapLedger_vue_vue_type_template_id_5734e36f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SetupSwapLedger.vue?vue&type=template&id=5734e36f&scoped=true& */ "./src/views/SetupSwapLedger.vue?vue&type=template&id=5734e36f&scoped=true&");
/* harmony import */ var _SetupSwapLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SetupSwapLedger.vue?vue&type=script&lang=ts& */ "./src/views/SetupSwapLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _SetupSwapLedger_vue_vue_type_style_index_0_id_5734e36f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SetupSwapLedger.vue?vue&type=style&index=0&id=5734e36f&scoped=true&lang=css& */ "./src/views/SetupSwapLedger.vue?vue&type=style&index=0&id=5734e36f&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SetupSwapLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SetupSwapLedger_vue_vue_type_template_id_5734e36f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SetupSwapLedger_vue_vue_type_template_id_5734e36f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5734e36f",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/SetupSwapLedger.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/SetupSwapLedger.vue?vue&type=script&lang=ts&":
/*!****************************************************************!*\
  !*** ./src/views/SetupSwapLedger.vue?vue&type=script&lang=ts& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwapLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SetupSwapLedger.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SetupSwapLedger.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwapLedger_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/SetupSwapLedger.vue?vue&type=style&index=0&id=5734e36f&scoped=true&lang=css&":
/*!************************************************************************************************!*\
  !*** ./src/views/SetupSwapLedger.vue?vue&type=style&index=0&id=5734e36f&scoped=true&lang=css& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwapLedger_vue_vue_type_style_index_0_id_5734e36f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SetupSwapLedger.vue?vue&type=style&index=0&id=5734e36f&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SetupSwapLedger.vue?vue&type=style&index=0&id=5734e36f&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwapLedger_vue_vue_type_style_index_0_id_5734e36f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwapLedger_vue_vue_type_style_index_0_id_5734e36f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwapLedger_vue_vue_type_style_index_0_id_5734e36f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwapLedger_vue_vue_type_style_index_0_id_5734e36f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwapLedger_vue_vue_type_style_index_0_id_5734e36f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/SetupSwapLedger.vue?vue&type=template&id=5734e36f&scoped=true&":
/*!**********************************************************************************!*\
  !*** ./src/views/SetupSwapLedger.vue?vue&type=template&id=5734e36f&scoped=true& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwapLedger_vue_vue_type_template_id_5734e36f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SetupSwapLedger.vue?vue&type=template&id=5734e36f&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SetupSwapLedger.vue?vue&type=template&id=5734e36f&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwapLedger_vue_vue_type_template_id_5734e36f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SetupSwapLedger_vue_vue_type_template_id_5734e36f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=swap-ledger.js.map