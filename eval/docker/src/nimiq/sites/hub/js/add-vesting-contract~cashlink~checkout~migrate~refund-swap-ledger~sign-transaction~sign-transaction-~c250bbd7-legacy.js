(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Network.vue?vue&type=script&lang=ts&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Network.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/network-client */ "./node_modules/@nimiq/network-client/dist/NetworkClient.es.js");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! config */ "./src/config/config.local.ts");
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/Helpers */ "./src/lib/Helpers.ts");
/* harmony import */ var _lib_LabelingMachine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/LabelingMachine */ "./src/lib/LabelingMachine.ts");
/* harmony import */ var _lib_ContractInfo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/ContractInfo */ "./src/lib/ContractInfo.ts");
var Network_1;







let Network = Network_1 = class Network extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.boundListeners = [];
    }
    async createTx({ sender, senderType = Nimiq.Account.Type.BASIC, recipient, recipientType = Nimiq.Account.Type.BASIC, value, fee = 0, validityStartHeight, flags = Nimiq.Transaction.Flag.NONE, data, signerPubKey, signature, }) {
        if (!(sender instanceof Nimiq.Address))
            sender = new Nimiq.Address(sender);
        if (!(recipient instanceof Nimiq.Address))
            recipient = new Nimiq.Address(recipient);
        if (!(signerPubKey instanceof Nimiq.PublicKey))
            signerPubKey = new Nimiq.PublicKey(signerPubKey);
        if (signature && !(signature instanceof Nimiq.Signature))
            signature = new Nimiq.Signature(signature);
        await Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_4__["loadNimiq"])();
        if ((data && data.length > 0)
            || senderType !== Nimiq.Account.Type.BASIC
            || recipientType !== Nimiq.Account.Type.BASIC
            || flags !== Nimiq.Transaction.Flag.NONE) {
            return new Nimiq.ExtendedTransaction(sender, senderType, recipient, recipientType, value, fee, validityStartHeight, flags, data || new Uint8Array(0), signature ? Nimiq.SignatureProof.singleSig(signerPubKey, signature).serialize() : undefined);
        }
        else {
            return new Nimiq.BasicTransaction(signerPubKey, recipient, value, fee, validityStartHeight, signature);
        }
    }
    async makeSignTransactionResult(tx) {
        await Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_4__["loadNimiq"])(); // needed for hash computation
        const parsedProof = Nimiq.Account.TYPE_MAP.get(tx.senderType).proofToPlain(tx.proof);
        const signerPublicKeyHex = 'publicKey' in parsedProof
            ? parsedProof.publicKey
            : 'creatorPublicKey' in parsedProof
                ? parsedProof.creatorPublicKey
                : (() => { throw new Error('Unsupported transaction proof'); })();
        const signatureHex = 'signature' in parsedProof
            ? parsedProof.signature
            : 'creatorSignature' in parsedProof
                ? parsedProof.creatorSignature
                : (() => { throw new Error('Unsupported transaction proof'); })();
        const result = {
            serializedTx: Nimiq.BufferUtils.toHex(tx.serialize()),
            hash: tx.hash().toHex(),
            raw: {
                signerPublicKey: Nimiq.BufferUtils.fromHex(signerPublicKeyHex),
                signature: Nimiq.BufferUtils.fromHex(signatureHex),
                sender: tx.sender.toUserFriendlyAddress(),
                senderType: tx.senderType,
                recipient: tx.recipient.toUserFriendlyAddress(),
                recipientType: tx.recipientType,
                value: tx.value,
                fee: tx.fee,
                validityStartHeight: tx.validityStartHeight,
                extraData: tx.data,
                flags: tx.flags,
                networkId: tx.networkId,
                proof: tx.proof,
            },
        };
        return result;
    }
    /**
     * Relays the transaction to the network and only resolves when the network
     * fires its 'transaction-relayed' event for that transaction.
     */
    async sendToNetwork(tx) {
        await Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_4__["loadNimiq"])(); // needed for hash computation
        // Store the transaction in the history state to be able to resend the transaction when the user reloads the
        // window in case it failed to relay it to the network. Not using localstorage or sessionstorage as the
        // transaction should not be broadcast anymore when user closes page, accepting that it failed to send.
        let unrelayedTransactionMap = Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_4__["getHistoryStorage"])(Network_1.HISTORY_KEY_UNRELAYED_TRANSACTIONS) || {};
        const base64Hash = tx.hash().toBase64();
        unrelayedTransactionMap[base64Hash] = tx.serialize();
        Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_4__["setHistoryStorage"])(Network_1.HISTORY_KEY_UNRELAYED_TRANSACTIONS, unrelayedTransactionMap);
        const signedTx = await this.makeSignTransactionResult(tx);
        const client = await this.getNetworkClient();
        const txObjToSend = Object.assign({}, signedTx.raw, {
            senderPubKey: signedTx.raw.signerPublicKey,
            value: Nimiq.Policy.satoshisToCoins(signedTx.raw.value),
            fee: Nimiq.Policy.satoshisToCoins(signedTx.raw.fee),
        });
        const plainTx = await client.relayTransaction(txObjToSend);
        if (plainTx.state === 'expired') {
            throw new Error(Network_1.Errors.TRANSACTION_EXPIRED);
        }
        if (plainTx.state === 'new') {
            throw new Error(Network_1.Errors.TRANSACTION_NOT_RELAYED);
        }
        unrelayedTransactionMap = Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_4__["getHistoryStorage"])(Network_1.HISTORY_KEY_UNRELAYED_TRANSACTIONS);
        delete unrelayedTransactionMap[base64Hash];
        Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_4__["setHistoryStorage"])(Network_1.HISTORY_KEY_UNRELAYED_TRANSACTIONS, unrelayedTransactionMap);
        return signedTx;
    }
    getUnrelayedTransactions(filter) {
        if (!Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_4__["getHistoryStorage"])(Network_1.HISTORY_KEY_UNRELAYED_TRANSACTIONS))
            return [];
        const serializedTransactions = Object.values(Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_4__["getHistoryStorage"])(Network_1.HISTORY_KEY_UNRELAYED_TRANSACTIONS));
        const transactions = serializedTransactions.map((serializedTx) => Nimiq.Transaction.unserialize(new Nimiq.SerialBuffer(serializedTx)));
        if (!filter)
            return transactions;
        return transactions.filter((tx) => (filter.sender === undefined || tx.sender.equals(filter.sender))
            && (filter.senderType === undefined || tx.senderType === filter.senderType)
            && (filter.recipient === undefined || tx.recipient.equals(filter.recipient))
            && (filter.recipientType === undefined || tx.recipientType === filter.recipientType)
            && (filter.value === undefined || tx.value === filter.value)
            && (filter.fee === undefined || tx.fee === filter.fee)
            && (filter.validityStartHeight === undefined || tx.validityStartHeight === filter.validityStartHeight)
            && (filter.flags === undefined || tx.flags === filter.flags)
            && (filter.data === undefined || Nimiq.BufferUtils.equals(tx.data, filter.data)));
    }
    async getBlockchainHeight() {
        const client = await this.getNetworkClient();
        if (Network_1._hasOrSyncsOnTopOfConsensus)
            return client.headInfo.height;
        return new Promise((resolve) => this.$once(Network_1.Events.CONSENSUS_ESTABLISHED, () => 
        // At the time of the consensus event, the new head is not populated yet. Therefore, instead of accessing
        // client.headInfo we wait for the HEAD_CHANGE which is triggered immediately after CONSENSUS_ESTABLISHED
        this.$once(Network_1.Events.HEAD_CHANGE, (head) => resolve(head.height))));
    }
    async getBalances(addresses) {
        const client = await this.getNetworkClient();
        return client.getBalance(addresses);
    }
    async getGenesisVestingContracts() {
        const client = await this.getNetworkClient();
        const contracts = await client.getGenesisVestingContracts();
        return contracts.map((contract) => new _lib_ContractInfo__WEBPACK_IMPORTED_MODULE_6__["VestingContractInfo"](Object(_lib_LabelingMachine__WEBPACK_IMPORTED_MODULE_5__["labelVestingContract"])(), Nimiq.Address.fromString(contract.address), Nimiq.Address.fromString(contract.owner), contract.start, Nimiq.Policy.coinsToSatoshis(contract.stepAmount), contract.stepBlocks, Nimiq.Policy.coinsToSatoshis(contract.totalAmount)));
    }
    async getNetworkClient() {
        if (!_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].hasInstance()) {
            _nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].createInstance(config__WEBPACK_IMPORTED_MODULE_3__["default"].networkEndpoint);
        }
        // Make sure the client is initialized
        await _nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Instance.init();
        if (this.boundListeners.length === 0) {
            this._registerNetworkListener(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Events.API_READY, () => this.$emit(Network_1.Events.API_READY));
            this._registerNetworkListener(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Events.API_FAIL, (e) => this.$emit(Network_1.Events.API_FAIL, e));
            this._registerNetworkListener(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Events.CONSENSUS_SYNCING, () => this.$emit(Network_1.Events.CONSENSUS_SYNCING));
            this._registerNetworkListener(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Events.CONSENSUS_ESTABLISHED, () => this.$emit(Network_1.Events.CONSENSUS_ESTABLISHED));
            this._registerNetworkListener(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Events.CONSENSUS_LOST, () => this.$emit(Network_1.Events.CONSENSUS_LOST));
            this._registerNetworkListener(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Events.PEERS_CHANGED, (count) => this.$emit(Network_1.Events.PEERS_CHANGED, count));
            this._registerNetworkListener(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Events.BALANCES_CHANGED, (balances) => this.$emit(Network_1.Events.BALANCES_CHANGED, balances));
            this._registerNetworkListener(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Events.TRANSACTION_PENDING, (txInfo) => this.$emit(Network_1.Events.TRANSACTION_PENDING, txInfo));
            this._registerNetworkListener(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Events.TRANSACTION_EXPIRED, (hash) => this.$emit(Network_1.Events.TRANSACTION_EXPIRED, hash));
            this._registerNetworkListener(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Events.TRANSACTION_MINED, (txInfo) => this.$emit(Network_1.Events.TRANSACTION_MINED, txInfo));
            this._registerNetworkListener(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Events.TRANSACTION_RELAYED, (txInfo) => this.$emit(Network_1.Events.TRANSACTION_RELAYED, txInfo));
            this._registerNetworkListener(_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Events.HEAD_CHANGE, (headInfo) => this.$emit(Network_1.Events.HEAD_CHANGE, headInfo));
            this._fireInitialEvents();
        }
        return _nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Instance;
    }
    created() {
        this.$on(Network_1.Events.CONSENSUS_ESTABLISHED, () => {
            Network_1._hasOrSyncsOnTopOfConsensus = true;
        });
        this.$on(Network_1.Events.CONSENSUS_LOST, () => {
            Network_1._hasOrSyncsOnTopOfConsensus = false;
        });
    }
    destroyed() {
        if (!_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].hasInstance())
            return;
        for (const [event, listener] of this.boundListeners) {
            _nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Instance.off(event, listener);
        }
    }
    _registerNetworkListener(event, listener) {
        if (!_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].hasInstance())
            console.warn('Using default instance with default endpoint.');
        _nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Instance.on(event, listener);
        this.boundListeners.push([event, listener]);
    }
    _fireInitialEvents() {
        if (!_nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].hasInstance())
            return;
        const networkClient = _nimiq_network_client__WEBPACK_IMPORTED_MODULE_2__["NetworkClient"].Instance;
        if (networkClient.apiLoadingState === 'ready')
            this.$emit(Network_1.Events.API_READY);
        else if (networkClient.apiLoadingState === 'failed')
            this.$emit(Network_1.Events.API_FAIL);
        if (networkClient.consensusState === 'syncing')
            this.$emit(Network_1.Events.CONSENSUS_SYNCING);
        else if (networkClient.consensusState === 'established')
            this.$emit(Network_1.Events.CONSENSUS_ESTABLISHED);
        else if (networkClient.consensusState === 'lost')
            this.$emit(Network_1.Events.CONSENSUS_LOST);
        Network_1._hasOrSyncsOnTopOfConsensus = Network_1._hasOrSyncsOnTopOfConsensus
            || networkClient.consensusState === 'established';
        if (networkClient.peerCount !== 0)
            this.$emit(Network_1.Events.PEERS_CHANGED, networkClient.peerCount);
        if (networkClient.balances.size !== 0)
            this.$emit(Network_1.Events.BALANCES_CHANGED, networkClient.balances);
        for (const tx of networkClient.pendingTransactions)
            this.$emit(Network_1.Events.TRANSACTION_PENDING, tx);
        for (const txHash of networkClient.expiredTransactions)
            this.$emit(Network_1.Events.TRANSACTION_EXPIRED, txHash);
        for (const tx of networkClient.minedTransactions)
            this.$emit(Network_1.Events.TRANSACTION_MINED, tx);
        for (const tx of networkClient.relayedTransactions)
            this.$emit(Network_1.Events.TRANSACTION_RELAYED, tx);
        if (networkClient.headInfo.height !== 0)
            this.$emit(Network_1.Events.HEAD_CHANGE, networkClient.headInfo);
    }
};
Network._hasOrSyncsOnTopOfConsensus = false;
Network = Network_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"]
], Network);
(function (Network) {
    let Events;
    (function (Events) {
        Events["API_READY"] = "api-ready";
        Events["API_FAIL"] = "api-fail";
        Events["CONSENSUS_SYNCING"] = "consensus-syncing";
        Events["CONSENSUS_ESTABLISHED"] = "consensus-established";
        Events["CONSENSUS_LOST"] = "consensus-lost";
        Events["PEERS_CHANGED"] = "peer-count";
        Events["BALANCES_CHANGED"] = "balances";
        Events["TRANSACTION_PENDING"] = "transaction-pending";
        Events["TRANSACTION_EXPIRED"] = "transaction-expired";
        Events["TRANSACTION_MINED"] = "transaction-mined";
        Events["TRANSACTION_RELAYED"] = "transaction-relayed";
        Events["HEAD_CHANGE"] = "head-change";
    })(Events = Network.Events || (Network.Events = {}));
    let Errors;
    (function (Errors) {
        Errors["TRANSACTION_EXPIRED"] = "Transaction is expired";
        Errors["TRANSACTION_NOT_RELAYED"] = "Transaction could not be relayed";
    })(Errors = Network.Errors || (Network.Errors = {}));
    Network.HISTORY_KEY_UNRELAYED_TRANSACTIONS = 'network-unrelayed-transactions';
})(Network || (Network = {}));
/* harmony default export */ __webpack_exports__["default"] = (Network);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Network.vue?vue&type=template&id=2231c52e&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Network.vue?vue&type=template&id=2231c52e& ***!
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
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/components/Network.vue":
/*!************************************!*\
  !*** ./src/components/Network.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Network_vue_vue_type_template_id_2231c52e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Network.vue?vue&type=template&id=2231c52e& */ "./src/components/Network.vue?vue&type=template&id=2231c52e&");
/* harmony import */ var _Network_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Network.vue?vue&type=script&lang=ts& */ "./src/components/Network.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Network_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Network_vue_vue_type_template_id_2231c52e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Network_vue_vue_type_template_id_2231c52e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Network.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/Network.vue?vue&type=script&lang=ts&":
/*!*************************************************************!*\
  !*** ./src/components/Network.vue?vue&type=script&lang=ts& ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Network_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Network.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Network.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Network_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Network.vue?vue&type=template&id=2231c52e&":
/*!*******************************************************************!*\
  !*** ./src/components/Network.vue?vue&type=template&id=2231c52e& ***!
  \*******************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Network_vue_vue_type_template_id_2231c52e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Network.vue?vue&type=template&id=2231c52e& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Network.vue?vue&type=template&id=2231c52e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Network_vue_vue_type_template_id_2231c52e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Network_vue_vue_type_template_id_2231c52e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=add-vesting-contract~cashlink~checkout~migrate~refund-swap-ledger~sign-transaction~sign-transaction-~c250bbd7-legacy.js.map