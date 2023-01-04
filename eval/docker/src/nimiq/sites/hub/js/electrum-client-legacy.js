(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["electrum-client"],{

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-api/ElectrumApi.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-api/ElectrumApi.js ***!
  \******************************************************************************/
/*! exports provided: ElectrumApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElectrumApi", function() { return ElectrumApi; });
/* harmony import */ var bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bitcoinjs-lib */ "buffer");
/* harmony import */ var bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _electrum_ws_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../electrum-ws/index */ "./node_modules/@nimiq/electrum-client/dist/electrum-ws/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./node_modules/@nimiq/electrum-client/dist/electrum-api/helpers.js");



class ElectrumApi {
    constructor(options = {}) {
        if (typeof options.network === 'string') {
            if (!(options.network in bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["networks"])) {
                throw new Error('Invalid network name');
            }
            options.network = bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["networks"][options.network];
        }
        this.options = {
            ...options,
            network: options.network || bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["networks"].bitcoin,
        };
        const wsOptions = {};
        if ('proxy' in this.options)
            wsOptions.proxy = this.options.proxy;
        if ('token' in this.options)
            wsOptions.token = this.options.token;
        if ('reconnect' in this.options)
            wsOptions.reconnect = this.options.reconnect;
        this.socket = new _electrum_ws_index__WEBPACK_IMPORTED_MODULE_1__["ElectrumWS"](this.options.endpoint, wsOptions);
    }
    async waitForConnectionEstablished() {
        if (this.socket.isConnected())
            return true;
        return new Promise((resolve, reject) => {
            this.socket.once(_electrum_ws_index__WEBPACK_IMPORTED_MODULE_1__["ElectrumWSEvent"].CONNECTED, () => (resolve(true), reject = () => { }));
            this.socket.once(_electrum_ws_index__WEBPACK_IMPORTED_MODULE_1__["ElectrumWSEvent"].CLOSE, () => (reject(new Error('Unable to establish a WebSocket connection')), resolve = () => { }));
        });
    }
    async getBalance(address) {
        return this.socket.request('blockchain.scripthash.get_balance', await this.addressToScriptHash(address));
    }
    async getReceipts(addressOrScriptHash) {
        const receipts = await this.socket.request('blockchain.scripthash.get_history', addressOrScriptHash.length === 64
            ? addressOrScriptHash
            : await this.addressToScriptHash(addressOrScriptHash));
        receipts.sort((a, b) => (Math.max(0, b.height) || Number.MAX_SAFE_INTEGER) - (Math.max(0, a.height) || Number.MAX_SAFE_INTEGER));
        return receipts.map((r) => ({
            blockHeight: r.height,
            transactionHash: r.tx_hash,
            ...(r.fee ? { fee: r.fee } : {}),
        }));
    }
    async getTransaction(hash, block) {
        if (block)
            await this.proofTransaction(hash, block);
        const raw = await this.socket.request('blockchain.transaction.get', hash);
        return Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["transactionToPlain"])(raw, this.options.network);
    }
    async proofTransaction(hash, block) {
        const transactionMerkleRoot = await this.getTransactionMerkleRoot(hash, block.blockHeight);
        if (transactionMerkleRoot !== block.merkleRoot) {
            throw new Error(`Invalid transaction merkle proof for block height: ${hash}, ${block.blockHeight}`);
        }
        return true;
    }
    async getTransactionMerkleRoot(hash, height) {
        const proof = await this.socket.request('blockchain.transaction.get_merkle', hash, height);
        if (proof.block_height !== height) {
            throw new Error('Invalid reference block height received in transaction merkle proof');
        }
        let i = proof.pos;
        let node = Object(_electrum_ws_index__WEBPACK_IMPORTED_MODULE_1__["hexToBytes"])(hash).reverse();
        for (const pairHash of proof.merkle) {
            const pairNode = Object(_electrum_ws_index__WEBPACK_IMPORTED_MODULE_1__["hexToBytes"])(pairHash).reverse();
            const concatenated = new Uint8Array(i % 2 === 0
                ? [...node, ...pairNode]
                : [...pairNode, ...node]);
            node = new Uint8Array(await crypto.subtle.digest('SHA-256', await crypto.subtle.digest('SHA-256', concatenated)));
            i = Math.floor(i / 2);
        }
        return Object(_electrum_ws_index__WEBPACK_IMPORTED_MODULE_1__["bytesToHex"])(node.reverse());
    }
    async getBlockHeader(height) {
        const raw = await this.socket.request('blockchain.block.header', height);
        return Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["blockHeaderToPlain"])(raw, height);
    }
    async estimateFee(targetBlocks) {
        const coinsPerKilobyte = await this.socket.request('blockchain.estimatefee', targetBlocks);
        return Math.round(coinsPerKilobyte / 1000 * 1e8);
    }
    async getFeeHistogram() {
        return this.socket.request('mempool.get_fee_histogram');
    }
    async getRelayFee() {
        const coins = await this.socket.request('blockchain.relayfee');
        return Math.round(coins * 1e8);
    }
    async broadcastTransaction(rawTx) {
        const tx = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["transactionToPlain"])(rawTx, this.options.network);
        let hash;
        try {
            hash = await this.socket.request('blockchain.transaction.broadcast', rawTx);
        }
        catch (error) {
            if (error.message.includes('Transaction already in block chain')) {
                tx.onChain = true;
                return tx;
            }
            else
                throw error;
        }
        if (hash === tx.transactionHash)
            return tx;
        else
            throw new Error(hash);
    }
    async subscribeReceipts(address, callback) {
        return this.socket.subscribe('blockchain.scripthash', async (scriptHash, status) => {
            callback(!status ? [] : await this.getReceipts(scriptHash));
        }, await this.addressToScriptHash(address));
    }
    async subscribeHeaders(callback) {
        return this.socket.subscribe('blockchain.headers', (headerInfo) => {
            callback(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["blockHeaderToPlain"])(headerInfo.hex, headerInfo.height));
        });
    }
    async setProtocolVersion(clientName, protocolVersion) {
        return this.socket.request('server.version', clientName, protocolVersion);
    }
    async getFeatures() {
        return this.socket.request('server.features');
    }
    async getPeers() {
        const peers = await this.socket.request('server.peers.subscribe');
        return peers.map(peer => {
            const ip = peer[0];
            const host = peer[1];
            let version = '';
            let pruningLimit = undefined;
            let tcp = null;
            let ssl = null;
            let wss = null;
            for (const meta of peer[2]) {
                switch (meta.charAt(0)) {
                    case 'v':
                        version = meta.substring(1);
                        break;
                    case 'p':
                        pruningLimit = Number.parseInt(meta.substring(1), 10);
                        break;
                    case 't':
                        {
                            if (meta.substring(1).length === 0) {
                                switch (this.options.network || bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["networks"].bitcoin) {
                                    case bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["networks"].testnet:
                                        tcp = 60001;
                                        break;
                                    default:
                                        tcp = 50001;
                                        break;
                                }
                            }
                            else {
                                tcp = Number.parseInt(meta.substring(1), 10);
                            }
                        }
                        break;
                    case 's':
                        {
                            if (meta.substring(1).length === 0) {
                                switch (this.options.network || bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["networks"].bitcoin) {
                                    case bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["networks"].testnet:
                                        ssl = 60002;
                                        break;
                                    default:
                                        ssl = 50002;
                                        break;
                                }
                            }
                            else {
                                ssl = Number.parseInt(meta.substring(1), 10);
                            }
                        }
                        break;
                    case 'w':
                        {
                            if (meta.substring(1).length === 0) {
                                switch (this.options.network || bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["networks"].bitcoin) {
                                    case bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["networks"].testnet:
                                        wss = 60004;
                                        break;
                                    default:
                                        wss = 50004;
                                        break;
                                }
                            }
                            else {
                                wss = Number.parseInt(meta.substring(1), 10);
                            }
                        }
                        break;
                }
            }
            return {
                ip,
                host,
                version,
                pruningLimit,
                ports: {
                    tcp,
                    ssl,
                    wss,
                },
            };
        });
    }
    ping() {
        return this.socket.request('server.ping');
    }
    close(reason) {
        return this.socket.close(reason);
    }
    async addressToScriptHash(addr) {
        const outputScript = bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["address"].toOutputScript(addr, this.options.network);
        const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', outputScript));
        return Object(_electrum_ws_index__WEBPACK_IMPORTED_MODULE_1__["bytesToHex"])(hash.reverse());
    }
}


/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-api/helpers.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-api/helpers.js ***!
  \**************************************************************************/
/*! exports provided: blockHeaderToPlain, transactionToPlain, inputToPlain, outputToPlain, deriveAddressFromInput, transactionFromPlain, inputFromPlain, outputFromPlain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blockHeaderToPlain", function() { return blockHeaderToPlain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transactionToPlain", function() { return transactionToPlain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputToPlain", function() { return inputToPlain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "outputToPlain", function() { return outputToPlain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deriveAddressFromInput", function() { return deriveAddressFromInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transactionFromPlain", function() { return transactionFromPlain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputFromPlain", function() { return inputFromPlain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "outputFromPlain", function() { return outputFromPlain; });
/* harmony import */ var bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bitcoinjs-lib */ "buffer");
/* harmony import */ var bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _electrum_ws__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../electrum-ws */ "./node_modules/@nimiq/electrum-client/dist/electrum-ws/index.js");



function blockHeaderToPlain(header, height) {
    if (typeof header === 'string')
        header = bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["Block"].fromHex(header);
    return {
        blockHash: header.getId(),
        blockHeight: height,
        timestamp: header.timestamp,
        bits: header.bits,
        nonce: header.nonce,
        version: header.version,
        weight: header.weight(),
        prevHash: header.prevHash ? Object(_electrum_ws__WEBPACK_IMPORTED_MODULE_1__["bytesToHex"])(new Uint8Array(header.prevHash).reverse()) : null,
        merkleRoot: header.merkleRoot ? Object(_electrum_ws__WEBPACK_IMPORTED_MODULE_1__["bytesToHex"])(new Uint8Array(header.merkleRoot).reverse()) : null,
    };
}
function transactionToPlain(tx, network) {
    if (typeof tx === 'string')
        tx = bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["Transaction"].fromHex(tx);
    const inputs = tx.ins.map((input, index) => inputToPlain(input, index, network));
    const outputs = tx.outs.map((output, index) => outputToPlain(output, index, network));
    const plain = {
        transactionHash: tx.getId(),
        inputs,
        outputs,
        version: tx.version,
        vsize: tx.virtualSize(),
        isCoinbase: tx.isCoinbase(),
        weight: tx.weight(),
        locktime: tx.locktime,
        replaceByFee: inputs.some(input => input.sequence < 0xfffffffe),
    };
    return plain;
}
function inputToPlain(input, index, network) {
    let address = null;
    try {
        address = deriveAddressFromInput(input, network) || null;
    }
    catch (error) {
        if (location.hostname === 'localhost')
            console.error(error);
    }
    return {
        script: Object(_electrum_ws__WEBPACK_IMPORTED_MODULE_1__["bytesToHex"])(input.script),
        transactionHash: Object(_electrum_ws__WEBPACK_IMPORTED_MODULE_1__["bytesToHex"])(new Uint8Array(input.hash).reverse()),
        address,
        witness: input.witness.map((buf) => {
            if (typeof buf === 'number')
                return buf;
            return Object(_electrum_ws__WEBPACK_IMPORTED_MODULE_1__["bytesToHex"])(buf);
        }),
        index,
        outputIndex: input.index,
        sequence: input.sequence,
    };
}
function outputToPlain(output, index, network) {
    let address = null;
    try {
        address = bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["address"].fromOutputScript(output.script, network);
    }
    catch (error) {
    }
    return {
        script: Object(_electrum_ws__WEBPACK_IMPORTED_MODULE_1__["bytesToHex"])(output.script),
        address,
        value: output.value,
        index,
    };
}
function deriveAddressFromInput(input, network) {
    if (bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["Transaction"].isCoinbaseHash(input.hash))
        return undefined;
    const chunks = (bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["script"].decompile(input.script) || []);
    const witness = input.witness;
    if (chunks.length === 2 && witness.length === 0) {
        return bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2pkh({
            pubkey: chunks[1],
            network,
        }).address;
    }
    if (chunks.length === 1 && witness.length === 2) {
        return bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2sh({
            redeem: bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2wpkh({
                pubkey: witness[1],
                network,
            }),
        }).address;
    }
    if (chunks.length === 0 && witness.length === 2) {
        return bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2wpkh({
            pubkey: witness[1],
            network,
        }).address;
    }
    if (chunks.length > 2 && witness.length === 0) {
        const redeemScript = bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["script"].decompile(chunks[chunks.length - 1]);
        if (!redeemScript) {
            console.error(new Error('Cannot decode address from input'));
            return undefined;
        }
        if (redeemScript[redeemScript.length - 1] === bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["script"].OPS.OP_CHECKMULTISIG) {
            const m = chunks.length - 2;
            const pubkeys = redeemScript.filter(n => typeof n !== 'number');
            return bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2sh({
                redeem: bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2ms({
                    m,
                    pubkeys,
                    network,
                }),
            }).address;
        }
        if (redeemScript[0] === bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["script"].OPS.OP_IF) {
            return bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2sh({
                redeem: {
                    output: chunks[chunks.length - 1],
                },
                network,
            }).address;
        }
    }
    if (chunks.length === 1 && witness.length > 2) {
        const redeemScript = bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["script"].decompile(witness[witness.length - 1]);
        if (!redeemScript) {
            console.error(new Error('Cannot decode address from input'));
            return undefined;
        }
        if (redeemScript[redeemScript.length - 1] === bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["script"].OPS.OP_CHECKMULTISIG) {
            const m = witness.length - 2;
            const pubkeys = bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["script"].decompile(witness[witness.length - 1])
                .filter(n => typeof n !== 'number');
            return bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2sh({
                redeem: bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2wsh({
                    redeem: bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2ms({
                        m,
                        pubkeys,
                        network,
                    }),
                }),
            }).address;
        }
        if (witness.length === 3 && redeemScript.filter(n => typeof n !== 'number').length === 1) {
            return bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2sh({
                redeem: bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2wsh({
                    redeem: bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2pkh({
                        pubkey: witness[1],
                        network,
                    }),
                }),
            }).address;
        }
    }
    if (chunks.length === 0 && witness.length > 2) {
        const redeemScript = bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["script"].decompile(witness[witness.length - 1]);
        if (!redeemScript) {
            console.error(new Error('Cannot decode address from input'));
            return undefined;
        }
        if (redeemScript[redeemScript.length - 1] === bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["script"].OPS.OP_CHECKMULTISIG) {
            const m = witness.length - 2;
            const pubkeys = redeemScript.filter(n => typeof n !== 'number');
            return bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2wsh({
                redeem: bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2ms({
                    m,
                    pubkeys,
                    network,
                }),
            }).address;
        }
        if (redeemScript[0] === bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["script"].OPS.OP_IF) {
            return bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["payments"].p2wsh({
                witness,
                network,
            }).address;
        }
    }
    console.error(new Error('Cannot decode address from input'));
    return undefined;
}
function transactionFromPlain(plain) {
    const tx = new bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["Transaction"]();
    tx.version = plain.version;
    tx.locktime = plain.locktime;
    tx.ins = plain.inputs.sort((a, b) => a.index - b.index).map(input => inputFromPlain(input));
    tx.outs = plain.outputs.sort((a, b) => a.index - b.index).map(output => outputFromPlain(output));
    return tx;
}
function inputFromPlain(plain) {
    return {
        hash: bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["Buffer"].from(Object(_electrum_ws__WEBPACK_IMPORTED_MODULE_1__["hexToBytes"])(plain.transactionHash).reverse()),
        index: plain.outputIndex,
        script: bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["Buffer"].from(Object(_electrum_ws__WEBPACK_IMPORTED_MODULE_1__["hexToBytes"])(plain.script)),
        sequence: plain.sequence,
        witness: plain.witness.map(scriptOrNumber => typeof scriptOrNumber === 'string' ? bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["Buffer"].from(Object(_electrum_ws__WEBPACK_IMPORTED_MODULE_1__["hexToBytes"])(scriptOrNumber)) : scriptOrNumber),
    };
}
function outputFromPlain(plain) {
    return {
        script: bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["Buffer"].from(Object(_electrum_ws__WEBPACK_IMPORTED_MODULE_1__["hexToBytes"])(plain.script)),
        value: plain.value,
    };
}


/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-api/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-api/index.js ***!
  \************************************************************************/
/*! exports provided: Transport, blockHeaderToPlain, transactionToPlain, inputToPlain, outputToPlain, deriveAddressFromInput, transactionFromPlain, inputFromPlain, outputFromPlain, ElectrumApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./node_modules/@nimiq/electrum-client/dist/electrum-api/types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transport", function() { return _types__WEBPACK_IMPORTED_MODULE_0__["Transport"]; });

/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./node_modules/@nimiq/electrum-client/dist/electrum-api/helpers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "blockHeaderToPlain", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__["blockHeaderToPlain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transactionToPlain", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__["transactionToPlain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inputToPlain", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__["inputToPlain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "outputToPlain", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__["outputToPlain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deriveAddressFromInput", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__["deriveAddressFromInput"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transactionFromPlain", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__["transactionFromPlain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inputFromPlain", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__["inputFromPlain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "outputFromPlain", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__["outputFromPlain"]; });

/* harmony import */ var _ElectrumApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ElectrumApi */ "./node_modules/@nimiq/electrum-client/dist/electrum-api/ElectrumApi.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ElectrumApi", function() { return _ElectrumApi__WEBPACK_IMPORTED_MODULE_2__["ElectrumApi"]; });






/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-api/types.js":
/*!************************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-api/types.js ***!
  \************************************************************************/
/*! exports provided: Transport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transport", function() { return Transport; });
var Transport;
(function (Transport) {
    Transport[Transport["TCP"] = 1] = "TCP";
    Transport[Transport["SSL"] = 2] = "SSL";
    Transport[Transport["WSS"] = 3] = "WSS";
})(Transport || (Transport = {}));


/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-client/Agent.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-client/Agent.js ***!
  \***************************************************************************/
/*! exports provided: Event, Agent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Agent", function() { return Agent; });
/* harmony import */ var _electrum_api_ElectrumApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../electrum-api/ElectrumApi */ "./node_modules/@nimiq/electrum-client/dist/electrum-api/ElectrumApi.js");
/* harmony import */ var _electrum_ws_Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../electrum-ws/Observable */ "./node_modules/@nimiq/electrum-client/dist/electrum-ws/Observable.js");
/* harmony import */ var _electrum_api_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../electrum-api/types */ "./node_modules/@nimiq/electrum-client/dist/electrum-api/types.js");
/* harmony import */ var _GenesisConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GenesisConfig */ "./node_modules/@nimiq/electrum-client/dist/electrum-client/GenesisConfig.js");
/* harmony import */ var _Stores__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Stores */ "./node_modules/@nimiq/electrum-client/dist/electrum-client/Stores.js");
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../package.json */ "./node_modules/@nimiq/electrum-client/dist/package.json");
var _package_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../package.json */ "./node_modules/@nimiq/electrum-client/dist/package.json", 1);






const PROTOCOL_VERSION_MIN = '1.4';
const PROTOCOL_VERSION_MAX = '1.4.2';
var Event;
(function (Event) {
    Event["BLOCK"] = "block";
    Event["TRANSACTION_ADDED"] = "transaction-added";
    Event["TRANSACTION_MINED"] = "transaction-mined";
    Event["SYNCING"] = "syncing";
    Event["SYNCED"] = "synced";
    Event["CLOSE"] = "close";
})(Event || (Event = {}));
const HANDSHAKE_TIMEOUT = 1000 * 4;
const PING_TIMEOUT = 1000 * 10;
const CONNECTIVITY_CHECK_INTERVAL = 1000 * 60;
class Agent extends _electrum_ws_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"] {
    constructor(peer, options = {}) {
        super();
        this.connection = null;
        this.handshaking = false;
        this.syncing = false;
        this.synced = false;
        this.orphanedBlocks = [];
        this.knownReceipts = new Map();
        this.pingInterval = -1;
        this.peer = peer;
        this.options = {
            tcpProxyUrl: 'wss://electrum.nimiq.network:50001',
            sslProxyUrl: 'wss://electrum.nimiq.network:50002',
            ...options,
        };
        const transport = this.peer.preferTransport && peer.ports[this.transportToString(this.peer.preferTransport)]
            ? this.peer.preferTransport
            : undefined;
        if (peer.ports.wss && (!transport || transport === _electrum_api_types__WEBPACK_IMPORTED_MODULE_2__["Transport"].WSS)) {
            console.debug(`Agent: Connecting to wss://${peer.host}:${peer.ports.wss}/${peer.wssPath || ''}`);
            this.transport = _electrum_api_types__WEBPACK_IMPORTED_MODULE_2__["Transport"].WSS;
            this.connection = new _electrum_api_ElectrumApi__WEBPACK_IMPORTED_MODULE_0__["ElectrumApi"]({
                network: _GenesisConfig__WEBPACK_IMPORTED_MODULE_3__["GenesisConfig"].NETWORK_NAME,
                endpoint: `wss://${peer.host}:${peer.ports.wss}/${peer.wssPath || ''}`,
                proxy: false,
            });
        }
        else if (peer.ports.ssl && this.options.sslProxyUrl && (!transport || transport === _electrum_api_types__WEBPACK_IMPORTED_MODULE_2__["Transport"].SSL)) {
            console.debug(`Agent: Connecting to ssl://${peer.host}:${peer.ports.ssl}`);
            this.transport = _electrum_api_types__WEBPACK_IMPORTED_MODULE_2__["Transport"].SSL;
            this.connection = new _electrum_api_ElectrumApi__WEBPACK_IMPORTED_MODULE_0__["ElectrumApi"]({
                network: _GenesisConfig__WEBPACK_IMPORTED_MODULE_3__["GenesisConfig"].NETWORK_NAME,
                endpoint: this.options.sslProxyUrl,
                proxy: true,
                token: `${this.networkToTokenPrefix(_GenesisConfig__WEBPACK_IMPORTED_MODULE_3__["GenesisConfig"].NETWORK_NAME)}:${peer.host}`
            });
        }
        else if (peer.ports.tcp && this.options.tcpProxyUrl && (!transport || transport === _electrum_api_types__WEBPACK_IMPORTED_MODULE_2__["Transport"].TCP)) {
            console.debug(`Agent: Connecting to tcp://${peer.host}:${peer.ports.tcp}`);
            this.transport = _electrum_api_types__WEBPACK_IMPORTED_MODULE_2__["Transport"].TCP;
            this.connection = new _electrum_api_ElectrumApi__WEBPACK_IMPORTED_MODULE_0__["ElectrumApi"]({
                network: _GenesisConfig__WEBPACK_IMPORTED_MODULE_3__["GenesisConfig"].NETWORK_NAME,
                endpoint: this.options.tcpProxyUrl,
                proxy: true,
                token: `${this.networkToTokenPrefix(_GenesisConfig__WEBPACK_IMPORTED_MODULE_3__["GenesisConfig"].NETWORK_NAME)}:${peer.host}`
            });
        }
        else {
            throw new Error('No suitable transport protocol and port for peer');
        }
    }
    async sync() {
        if (this.handshaking || this.syncing || this.synced)
            return;
        await this.connection.waitForConnectionEstablished();
        this.handshaking = true;
        await this.handshake();
        this.handshaking = false;
        this.syncing = true;
        this.fire(Event.SYNCING);
        const promise = new Promise((resolve, reject) => {
            this.once(Event.BLOCK, () => {
                clearTimeout(timeout);
                resolve(this.synced);
            });
            const timeout = setTimeout(() => reject(new Error('Block timeout')), HANDSHAKE_TIMEOUT);
        });
        this.requestHead();
        return promise;
    }
    async getBalance(address) {
        if (!this.synced)
            throw new Error('Agent not synced');
        return this.connection.getBalance(address);
    }
    async getTransactionReceipts(address) {
        if (!this.synced)
            throw new Error('Agent not synced');
        return this.connection.getReceipts(address);
    }
    async getTransaction(hash, block) {
        if (!this.synced)
            throw new Error('Agent not synced');
        return this.connection.getTransaction(hash, block);
    }
    async getBlockHeader(height) {
        if (!this.synced)
            throw new Error('Agent not synced');
        return this.connection.getBlockHeader(height);
    }
    async estimateFees(targetBlocks) {
        const requests = targetBlocks.map((target) => this.connection.estimateFee(target).catch(() => -1));
        return Promise.all(requests);
    }
    async getFeeHistogram() {
        if (!this.synced)
            throw new Error('Agent not synced');
        return this.connection.getFeeHistogram();
    }
    async getMinimumRelayFee() {
        if (!this.synced)
            throw new Error('Agent not synced');
        return this.connection.getRelayFee();
    }
    async broadcastTransaction(rawTx) {
        if (!this.synced)
            throw new Error('Agent not synced');
        return this.connection.broadcastTransaction(rawTx);
    }
    async subscribe(addresses) {
        if (!this.synced)
            throw new Error('Agent not synced');
        if (typeof addresses === 'string')
            addresses = [addresses];
        for (const address of addresses) {
            await this.connection.subscribeReceipts(address, (receipts) => this.onReceipts(address, receipts));
        }
    }
    async getPeers() {
        if (!this.synced)
            throw new Error('Agent not synced');
        return this.connection.getPeers();
    }
    close(reason) {
        console.debug('Agent: Closed:', reason);
        if (this.connection)
            this.connection.close(reason);
        this.connection = null;
        this.syncing = false;
        this.synced = false;
        this.fire(Event.CLOSE, reason);
        clearInterval(this.pingInterval);
    }
    on(event, callback) {
        return super.on(event, callback);
    }
    once(event, callback) {
        return super.once(event, callback);
    }
    off(event, id) {
        return super.off(event, id);
    }
    allOff(event) {
        return super.allOff(event);
    }
    async handshake() {
        if (!this.connection) {
            throw new Error('Agent not connected');
        }
        return new Promise(async (resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error('Handshake timeout')), HANDSHAKE_TIMEOUT);
            try {
                await this.connection.setProtocolVersion(`${_package_json__WEBPACK_IMPORTED_MODULE_5__["name"]} ${_package_json__WEBPACK_IMPORTED_MODULE_5__["version"]}`, [PROTOCOL_VERSION_MIN, PROTOCOL_VERSION_MAX]);
            }
            catch (error) {
                reject(new Error('Incompatible protocol version'));
                return;
            }
            try {
                const features = await this.connection.getFeatures();
                if (features.genesis_hash !== _GenesisConfig__WEBPACK_IMPORTED_MODULE_3__["GenesisConfig"].GENESIS_HASH)
                    throw new Error('Wrong genesis hash');
            }
            catch (error) {
                reject(error);
                return;
            }
            clearTimeout(timeout);
            resolve(true);
        });
    }
    async ping(failedTries = 0) {
        const timeout = setTimeout(() => {
            if (failedTries > 1)
                this.close('Ping timeout');
            else
                this.ping(failedTries + 1);
        }, PING_TIMEOUT);
        try {
            await this.connection.ping();
            clearTimeout(timeout);
        }
        catch (error) {
        }
    }
    requestHead() {
        if (!this.connection) {
            throw new Error('Agent not connected');
        }
        this.connection.subscribeHeaders(this.onBlock.bind(this));
    }
    async onBlock(block) {
        let prevBlock = _Stores__WEBPACK_IMPORTED_MODULE_4__["BlockStore"].get(block.blockHeight - 1);
        if (!prevBlock && block.blockHeight > 0) {
            prevBlock = await this.connection.getBlockHeader(block.blockHeight - 1);
            _Stores__WEBPACK_IMPORTED_MODULE_4__["BlockStore"].set(prevBlock.blockHeight, prevBlock);
        }
        if ((!prevBlock && block.blockHeight === 0) || prevBlock.blockHash === block.prevHash) {
            _Stores__WEBPACK_IMPORTED_MODULE_4__["BlockStore"].set(block.blockHeight, block);
            this.fire(Event.BLOCK, block);
        }
        else {
            console.warn('Agent: Received non-consecutive block:', block);
        }
        if (this.syncing) {
            this.syncing = false;
            this.synced = true;
            this.fire(Event.SYNCED);
            this.pingInterval = window.setInterval(this.ping.bind(this), CONNECTIVITY_CHECK_INTERVAL);
        }
    }
    async onReceipts(address, receipts) {
        if (!this.knownReceipts.has(address)) {
            this.knownReceipts.set(address, new Map(receipts.map(receipt => [receipt.transactionHash, receipt])));
            return;
        }
        const knownReceipts = this.knownReceipts.get(address);
        for (const receipt of receipts) {
            const knownReceipt = knownReceipts.get(receipt.transactionHash);
            if (knownReceipt && knownReceipt.blockHeight === receipt.blockHeight)
                continue;
            let block = undefined;
            if (receipt.blockHeight > 0) {
                block = _Stores__WEBPACK_IMPORTED_MODULE_4__["BlockStore"].get(receipt.blockHeight);
                if (!block) {
                    block = await this.getBlockHeader(receipt.blockHeight);
                    _Stores__WEBPACK_IMPORTED_MODULE_4__["BlockStore"].set(block.blockHeight, block);
                }
            }
            const storedTransaction = _Stores__WEBPACK_IMPORTED_MODULE_4__["TransactionStore"].get(receipt.transactionHash);
            let txCheck;
            if (!storedTransaction) {
                txCheck = this.connection.getTransaction(receipt.transactionHash, block);
                txCheck.then(tx => _Stores__WEBPACK_IMPORTED_MODULE_4__["TransactionStore"].set(tx.transactionHash, tx)).catch(() => { });
            }
            else {
                txCheck = block
                    ? this.connection.proofTransaction(storedTransaction.transactionHash, block).then(() => storedTransaction)
                    : Promise.resolve(storedTransaction);
            }
            txCheck.then(tx => {
                if (block)
                    this.fire(Event.TRANSACTION_MINED, tx, block);
                else
                    this.fire(Event.TRANSACTION_ADDED, tx);
            }).catch(error => console.error(error));
        }
    }
    networkToTokenPrefix(name) {
        if (name === _GenesisConfig__WEBPACK_IMPORTED_MODULE_3__["Network"].MAIN)
            return 'mainnet';
        if (name === _GenesisConfig__WEBPACK_IMPORTED_MODULE_3__["Network"].TEST)
            return 'testnet';
    }
    transportToString(transport) {
        switch (transport) {
            case _electrum_api_types__WEBPACK_IMPORTED_MODULE_2__["Transport"].WSS: return 'wss';
            case _electrum_api_types__WEBPACK_IMPORTED_MODULE_2__["Transport"].SSL: return 'ssl';
            case _electrum_api_types__WEBPACK_IMPORTED_MODULE_2__["Transport"].TCP: return 'tcp';
        }
    }
}


/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-client/ElectrumClient.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-client/ElectrumClient.js ***!
  \************************************************************************************/
/*! exports provided: ElectrumClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElectrumClient", function() { return ElectrumClient; });
/* harmony import */ var _electrum_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../electrum-api */ "./node_modules/@nimiq/electrum-client/dist/electrum-api/index.js");
/* harmony import */ var _electrum_api_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../electrum-api/types */ "./node_modules/@nimiq/electrum-client/dist/electrum-api/types.js");
/* harmony import */ var _Agent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Agent */ "./node_modules/@nimiq/electrum-client/dist/electrum-client/Agent.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./node_modules/@nimiq/electrum-client/dist/electrum-client/types.js");
/* harmony import */ var _Stores__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Stores */ "./node_modules/@nimiq/electrum-client/dist/electrum-client/Stores.js");
/* harmony import */ var _GenesisConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GenesisConfig */ "./node_modules/@nimiq/electrum-client/dist/electrum-client/GenesisConfig.js");






class ElectrumClient {
    constructor(options = {}) {
        this.consensusState = _types__WEBPACK_IMPORTED_MODULE_3__["ConsensusState"].CONNECTING;
        this.head = null;
        this.agents = new Set();
        this.addressBook = new Map();
        this.subscribedAddresses = new Set();
        this.consensusChangedListeners = new Map();
        this.headChangedListeners = new Map();
        this.transactionListeners = new Map();
        this.listenerId = 0;
        this.transactionsWaitingForConfirmation = new Map();
        this.options = {
            requiredBlockConfirmations: 6,
            extraSeedPeers: [],
            ...options,
        };
        this.resetPeers();
        this.connect();
    }
    getHeadHash() {
        var _a;
        return (_a = this.head) === null || _a === void 0 ? void 0 : _a.blockHash;
    }
    getHeadHeight() {
        var _a;
        return (_a = this.head) === null || _a === void 0 ? void 0 : _a.blockHeight;
    }
    getHeadBlock() {
        return this.head || undefined;
    }
    async getBlockAt(height) {
        const storedBlock = _Stores__WEBPACK_IMPORTED_MODULE_4__["BlockStore"].get(height);
        if (storedBlock)
            return storedBlock;
        for (const agent of this.agents) {
            try {
                return await agent.getBlockHeader(height);
            }
            catch (error) {
                console.warn(`Client: failed to get block header at ${height} from ${agent.peer.host}:`, error.message);
            }
        }
        throw new Error(`Failed to get block header at ${height}`);
    }
    async getBalance(address) {
        for (const agent of this.agents) {
            try {
                return await agent.getBalance(address);
            }
            catch (error) {
                console.warn(`Client: failed to get balance for ${address} from ${agent.peer.host}:`, error.message);
            }
        }
        throw new Error(`Failed to get balance for ${address}`);
    }
    async getTransaction(hash, block) {
        if (!block) {
            const storedTransaction = _Stores__WEBPACK_IMPORTED_MODULE_4__["TransactionStore"].get(hash);
            if (storedTransaction)
                return storedTransaction;
        }
        for (const agent of this.agents) {
            try {
                return await agent.getTransaction(hash, block);
            }
            catch (error) {
                console.warn(`Client: failed to get transaction ${hash} from ${agent.peer.host}:`, error.message);
            }
        }
        throw new Error(`Failed to get transaction ${hash}`);
    }
    async getTransactionReceiptsByAddress(address) {
        for (const agent of this.agents) {
            try {
                return await agent.getTransactionReceipts(address);
            }
            catch (error) {
                console.warn(`Client: failed to get transaction receipts for ${address} from ${agent.peer.host}:`, error.message);
            }
        }
        throw new Error(`Failed to get transaction receipts for ${address}`);
    }
    async getTransactionsByAddress(address, sinceBlockHeight = 0, knownTransactions = [], limit = Infinity) {
        const knownTxs = new Map();
        if (knownTransactions) {
            for (const tx of knownTransactions) {
                knownTxs.set(tx.transactionHash, tx);
            }
        }
        let history = await this.getTransactionReceiptsByAddress(address);
        if (limit < Infinity) {
            history = history.slice(0, limit);
        }
        if (sinceBlockHeight > 0) {
            const firstUnwantedHistoryIndex = history.findIndex(receipt => receipt.blockHeight > 0 && receipt.blockHeight < sinceBlockHeight);
            if (firstUnwantedHistoryIndex > -1) {
                history = history.slice(0, firstUnwantedHistoryIndex);
            }
        }
        const blocks = new Map();
        const txs = [];
        for (const { transactionHash, blockHeight } of history) {
            const knownTx = knownTxs.get(transactionHash);
            if (knownTx && knownTx.blockHeight === Math.max(blockHeight, 0) && knownTx.state === _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].CONFIRMED) {
                continue;
            }
            try {
                let block = blocks.get(blockHeight);
                if (!block && blockHeight > 0) {
                    block = await this.getBlockAt(blockHeight);
                    blocks.set(blockHeight, block);
                }
                try {
                    const tx = await this.getTransaction(transactionHash, block);
                    let confirmations = 0;
                    let state = _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].PENDING;
                    if (block) {
                        confirmations = this.head.blockHeight - block.blockHeight + 1;
                        const confirmed = confirmations >= this.options.requiredBlockConfirmations;
                        state = confirmed ? _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].CONFIRMED : _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].MINED;
                    }
                    const details = {
                        ...tx,
                        state,
                        confirmations,
                        ...(block ? {
                            blockHash: block.blockHash,
                            blockHeight: block.blockHeight,
                            timestamp: block.timestamp,
                        } : {}),
                    };
                    if (details.state === _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].MINED)
                        this.queueTransactionForConfirmation(details);
                    txs.push(details);
                }
                catch (error) {
                    console.warn(error);
                    continue;
                }
            }
            catch (error) {
                console.warn(error);
                return txs;
            }
        }
        for (const details of knownTxs.values()) {
            if ((details.state === _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].NEW || details.state === _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].PENDING)
                && !txs.some((tx) => tx.transactionHash === details.transactionHash)) {
                txs.push(await this.sendTransaction(Object(_electrum_api__WEBPACK_IMPORTED_MODULE_0__["transactionFromPlain"])(details).toHex()));
            }
        }
        return txs;
    }
    async sendTransaction(serializedTx) {
        var _a, _b;
        let tx;
        let sendError;
        for (const agent of this.agents) {
            try {
                tx = await agent.broadcastTransaction(serializedTx);
            }
            catch (error) {
                sendError = error;
                console.warn(`Client: failed to broadcast transaction to ${agent.peer.host}:`, error.message);
            }
        }
        if (!tx) {
            throw (sendError || new Error('Could not send transaction'));
        }
        if (tx.onChain) {
            const address = ((_a = tx.inputs.find(input => input.address)) === null || _a === void 0 ? void 0 : _a.address) || ((_b = tx.outputs.find(output => output.address)) === null || _b === void 0 ? void 0 : _b.address);
            const receipts = await this.getTransactionReceiptsByAddress(address);
            const blockHeight = receipts.find(receipt => receipt.transactionHash === tx.transactionHash).blockHeight;
            const block = await this.getBlockAt(blockHeight);
            return this.onMinedTransaction(block, tx, this.head || undefined);
        }
        this.onPendingTransaction(tx);
        return {
            ...tx,
            state: _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].PENDING,
            confirmations: 0,
        };
    }
    async estimateFees(targetBlocks = [25, 10, 5, 2]) {
        const estimates = [];
        for (const agent of this.agents) {
            try {
                estimates.push(await agent.estimateFees(targetBlocks));
            }
            catch (error) {
                console.warn(`Client: failed to get fee estimate from ${agent.peer.host}:`, error.message);
            }
        }
        if (!estimates.length) {
            throw new Error(`Failed to get fee estimates`);
        }
        function median(array) {
            if (!array.length)
                return undefined;
            const middleIndex = Math.floor(array.length / 2);
            const sorted = [...array].sort();
            return array.length % 2 !== 0
                ? sorted[middleIndex]
                : Math.round((sorted[middleIndex - 1] + sorted[middleIndex]) / 2);
        }
        ;
        const result = {};
        for (const target of targetBlocks) {
            const i = targetBlocks.indexOf(target);
            const feesForTarget = estimates.map(estimate => estimate[i]).filter(estimate => estimate > 0);
            result[target] = median(feesForTarget);
        }
        return result;
    }
    async getMempoolFees() {
        for (const agent of this.agents) {
            try {
                return await agent.getFeeHistogram();
            }
            catch (error) {
                console.warn(`Client: failed to get mempool fees from ${agent.peer.host}:`, error.message);
            }
        }
        throw new Error(`Failed to get mempool fees`);
    }
    async getMinimumRelayFee() {
        for (const agent of this.agents) {
            try {
                return await agent.getMinimumRelayFee();
            }
            catch (error) {
                console.warn(`Client: failed to get relay fee from ${agent.peer.host}:`, error.message);
            }
        }
        throw new Error(`Failed to get relay fee`);
    }
    addConsensusChangedListener(listener) {
        const listenerId = this.listenerId++;
        this.consensusChangedListeners.set(listenerId, listener);
        return listenerId;
    }
    addHeadChangedListener(listener) {
        const listenerId = this.listenerId++;
        this.headChangedListeners.set(listenerId, listener);
        return listenerId;
    }
    addTransactionListener(listener, addresses) {
        const set = new Set(addresses);
        for (const address of set) {
            this.subscribedAddresses.add(address);
        }
        if (this.consensusState === _types__WEBPACK_IMPORTED_MODULE_3__["ConsensusState"].ESTABLISHED) {
            for (const agent of this.agents) {
                agent.subscribe([...this.subscribedAddresses.values()]);
            }
        }
        const listenerId = this.listenerId++;
        this.transactionListeners.set(listenerId, { listener, addresses: set });
        return listenerId;
    }
    removeListener(handle) {
        this.consensusChangedListeners.delete(handle);
        this.headChangedListeners.delete(handle);
        this.transactionListeners.delete(handle);
        if (this.transactionListeners.size === 0) {
            this.transactionsWaitingForConfirmation.clear();
        }
    }
    async waitForConsensusEstablished() {
        return new Promise(resolve => {
            if (this.consensusState === _types__WEBPACK_IMPORTED_MODULE_3__["ConsensusState"].ESTABLISHED) {
                resolve();
            }
            else {
                const handle = this.addConsensusChangedListener(state => {
                    if (state === _types__WEBPACK_IMPORTED_MODULE_3__["ConsensusState"].ESTABLISHED) {
                        this.removeListener(handle);
                        resolve();
                    }
                });
            }
        });
    }
    async connect() {
        this.onConsensusChanged(_types__WEBPACK_IMPORTED_MODULE_3__["ConsensusState"].CONNECTING);
        if (this.addressBook.size === 0)
            this.resetPeers();
        let peers = [];
        for (const transport of [_electrum_api_types__WEBPACK_IMPORTED_MODULE_1__["Transport"].WSS, _electrum_api_types__WEBPACK_IMPORTED_MODULE_1__["Transport"].SSL, _electrum_api_types__WEBPACK_IMPORTED_MODULE_1__["Transport"].TCP]) {
            peers = [...this.addressBook.values()].filter((peer) => {
                const protocol = [null, 'tcp', 'ssl', 'wss'][transport];
                if (!peer.ports[protocol])
                    return false;
                if (peer.preferTransport && peer.preferTransport < transport)
                    return false;
                return true;
            });
            if (peers.length > 0)
                break;
        }
        const highPriorityPeers = peers.filter(peer => peer.highPriority);
        if (highPriorityPeers.length > 0)
            peers = highPriorityPeers;
        const peer = peers[Math.floor(Math.random() * peers.length)];
        const agentOptions = this.options.websocketProxy
            ? {
                tcpProxyUrl: this.options.websocketProxy.tcp,
                sslProxyUrl: this.options.websocketProxy.ssl,
            }
            : undefined;
        const agent = new _Agent__WEBPACK_IMPORTED_MODULE_2__["Agent"](peer, agentOptions);
        agent.on(_Agent__WEBPACK_IMPORTED_MODULE_2__["Event"].SYNCING, () => this.onConsensusChanged(_types__WEBPACK_IMPORTED_MODULE_3__["ConsensusState"].SYNCING));
        agent.on(_Agent__WEBPACK_IMPORTED_MODULE_2__["Event"].SYNCED, () => {
            this.agents.add(agent);
            this.onConsensusChanged(_types__WEBPACK_IMPORTED_MODULE_3__["ConsensusState"].ESTABLISHED);
        });
        agent.on(_Agent__WEBPACK_IMPORTED_MODULE_2__["Event"].BLOCK, (block) => this.onHeadChanged(block, 'extended', [], [block]));
        agent.on(_Agent__WEBPACK_IMPORTED_MODULE_2__["Event"].TRANSACTION_ADDED, (tx) => this.onPendingTransaction(tx));
        agent.on(_Agent__WEBPACK_IMPORTED_MODULE_2__["Event"].TRANSACTION_MINED, (tx, block) => this.onMinedTransaction(block, tx, block));
        agent.on(_Agent__WEBPACK_IMPORTED_MODULE_2__["Event"].CLOSE, (reason) => this.onConsensusFailed(agent, reason));
        try {
            await agent.sync();
        }
        catch (error) {
            this.removePeer(agent.peer, agent.transport);
            agent.close(error.message);
            return;
        }
        this.addPeers(await agent.getPeers());
    }
    resetPeers() {
        if (this.addressBook.size > 0)
            this.addressBook.clear();
        this.addPeers(_GenesisConfig__WEBPACK_IMPORTED_MODULE_5__["GenesisConfig"].SEED_PEERS);
        this.addPeers(this.options.extraSeedPeers);
    }
    addPeers(peers) {
        peers = peers.filter(peer => {
            if (peer.host.endsWith('.onion'))
                return false;
            if (peer.ports.ssl && peer.ports.ssl !== (_GenesisConfig__WEBPACK_IMPORTED_MODULE_5__["GenesisConfig"].NETWORK_NAME === _GenesisConfig__WEBPACK_IMPORTED_MODULE_5__["Network"].MAIN ? 50002 : 60002))
                return false;
            if (peer.ports.tcp && peer.ports.tcp !== (_GenesisConfig__WEBPACK_IMPORTED_MODULE_5__["GenesisConfig"].NETWORK_NAME === _GenesisConfig__WEBPACK_IMPORTED_MODULE_5__["Network"].MAIN ? 50001 : 60001))
                return false;
            return true;
        });
        for (const peer of peers) {
            this.addressBook.set(peer.host, peer);
        }
    }
    removePeer(peer, transport) {
        if (peer.highPriority) {
            peer.highPriority = false;
            this.addressBook.set(peer.host, peer);
            return;
        }
        switch (transport) {
            case _electrum_api_types__WEBPACK_IMPORTED_MODULE_1__["Transport"].WSS:
                if (peer.ports['ssl']) {
                    peer.preferTransport = _electrum_api_types__WEBPACK_IMPORTED_MODULE_1__["Transport"].SSL;
                    this.addressBook.set(peer.host, peer);
                    return;
                }
            case _electrum_api_types__WEBPACK_IMPORTED_MODULE_1__["Transport"].SSL:
                if (peer.ports['tcp']) {
                    peer.preferTransport = _electrum_api_types__WEBPACK_IMPORTED_MODULE_1__["Transport"].TCP;
                    this.addressBook.set(peer.host, peer);
                    return;
                }
            case _electrum_api_types__WEBPACK_IMPORTED_MODULE_1__["Transport"].TCP:
                delete peer.preferTransport;
                this.addressBook.delete(peer.host);
                return;
        }
    }
    getConfirmationHeight(blockHeight) {
        return blockHeight + this.options.requiredBlockConfirmations - 1;
    }
    queueTransactionForConfirmation(tx) {
        if (!tx.blockHeight)
            return;
        const confirmationHeight = this.getConfirmationHeight(tx.blockHeight);
        const map = this.transactionsWaitingForConfirmation.get(confirmationHeight) || new Map();
        map.set(tx.transactionHash, tx);
        this.transactionsWaitingForConfirmation.set(confirmationHeight, map);
    }
    clearTransactionFromConfirm(tx) {
        for (const [key, value] of this.transactionsWaitingForConfirmation.entries()) {
            if (value.has(tx.transactionHash)) {
                value.delete(tx.transactionHash);
                if (value.size === 0) {
                    this.transactionsWaitingForConfirmation.delete(key);
                    break;
                }
            }
        }
    }
    onConsensusChanged(state) {
        if (state === this.consensusState)
            return;
        this.consensusState = state;
        for (const listener of this.consensusChangedListeners.values()) {
            listener(state);
        }
        if (state === _types__WEBPACK_IMPORTED_MODULE_3__["ConsensusState"].ESTABLISHED) {
            if (this.subscribedAddresses.size > 0) {
                for (const agent of this.agents) {
                    agent.subscribe([...this.subscribedAddresses.values()]);
                }
            }
            if (!this.head)
                return;
            for (const listener of this.headChangedListeners.values()) {
                listener(this.head, 'established', [], [this.head.blockHash]);
            }
        }
    }
    onConsensusFailed(agent, reason) {
        if (agent) {
            agent.allOff(_Agent__WEBPACK_IMPORTED_MODULE_2__["Event"].SYNCING);
            agent.allOff(_Agent__WEBPACK_IMPORTED_MODULE_2__["Event"].SYNCED);
            agent.allOff(_Agent__WEBPACK_IMPORTED_MODULE_2__["Event"].BLOCK);
            agent.allOff(_Agent__WEBPACK_IMPORTED_MODULE_2__["Event"].TRANSACTION_ADDED);
            agent.allOff(_Agent__WEBPACK_IMPORTED_MODULE_2__["Event"].TRANSACTION_MINED);
            agent.allOff(_Agent__WEBPACK_IMPORTED_MODULE_2__["Event"].CLOSE);
            this.agents.delete(agent);
        }
        console.debug('Client: Consensus failed: last agent closed');
        this.connect();
    }
    onHeadChanged(block, reason, revertedBlocks, adoptedBlocks) {
        const previousBlock = this.head;
        this.head = block;
        if (this.consensusState === _types__WEBPACK_IMPORTED_MODULE_3__["ConsensusState"].ESTABLISHED && (!previousBlock || block.blockHash !== previousBlock.blockHash)) {
            for (const listener of this.headChangedListeners.values()) {
                listener(block, reason, revertedBlocks.map(b => b.blockHash), adoptedBlocks.map(b => b.blockHash));
            }
        }
        if (this.transactionListeners.size > 0) {
            const revertedTxs = new Set();
            for (const block of revertedBlocks) {
                const confirmationHeight = this.getConfirmationHeight(block.blockHeight);
                const map = this.transactionsWaitingForConfirmation.get(confirmationHeight);
                if (map) {
                    for (const tx of map.values()) {
                        revertedTxs.add(tx);
                    }
                    this.transactionsWaitingForConfirmation.delete(confirmationHeight);
                }
            }
            for (const tx of revertedTxs.values()) {
                this.onPendingTransaction(tx);
            }
            for (const block of adoptedBlocks) {
                const map = this.transactionsWaitingForConfirmation.get(block.blockHeight);
                if (map) {
                    for (const tx of map.values()) {
                        this.onConfirmedTransaction(tx, adoptedBlocks[adoptedBlocks.length - 1]);
                    }
                    this.transactionsWaitingForConfirmation.delete(block.blockHeight);
                }
            }
        }
    }
    onPendingTransaction(tx) {
        const details = {
            ...tx,
            state: _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].PENDING,
            confirmations: 0,
        };
        for (const { listener } of this.getListenersForTransaction(tx)) {
            listener(details);
        }
        this.clearTransactionFromConfirm(tx);
        return details;
    }
    onMinedTransaction(block, tx, blockNow) {
        let state = _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].MINED;
        let confirmations = 1;
        if (blockNow) {
            confirmations = (blockNow.blockHeight - block.blockHeight) + 1;
            state = confirmations >= this.options.requiredBlockConfirmations ? _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].CONFIRMED : _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].MINED;
        }
        const details = {
            ...tx,
            blockHash: block.blockHash,
            blockHeight: block.blockHeight,
            timestamp: block.timestamp,
            state,
            confirmations,
        };
        for (const { listener } of this.getListenersForTransaction(tx)) {
            listener(details);
        }
        if (details && details.state === _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].MINED) {
            this.queueTransactionForConfirmation(details);
        }
        return details;
    }
    onConfirmedTransaction(tx, blockNow) {
        const details = {
            ...tx,
            state: _types__WEBPACK_IMPORTED_MODULE_3__["TransactionState"].CONFIRMED,
            confirmations: blockNow.blockHeight - tx.blockHeight,
        };
        for (const { listener } of this.getListenersForTransaction(tx)) {
            listener(details);
        }
        return details;
    }
    getListenersForTransaction(tx) {
        return [...this.transactionListeners.values()].filter(({ addresses }) => tx.inputs.some(input => input.address && addresses.has(input.address))
            || tx.outputs.some(output => output.address && addresses.has(output.address)));
    }
}


/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-client/GenesisConfig.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-client/GenesisConfig.js ***!
  \***********************************************************************************/
/*! exports provided: Network, GenesisConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Network", function() { return Network; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenesisConfig", function() { return GenesisConfig; });
/* harmony import */ var bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bitcoinjs-lib */ "buffer");
/* harmony import */ var bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__);

var Network;
(function (Network) {
    Network["MAIN"] = "bitcoin";
    Network["TEST"] = "testnet";
})(Network || (Network = {}));
class GenesisConfig {
    static main() {
        GenesisConfig.init(GenesisConfig.CONFIGS[Network.MAIN]);
    }
    static test() {
        GenesisConfig.init(GenesisConfig.CONFIGS[Network.TEST]);
    }
    static init(config) {
        if (GenesisConfig._config)
            throw new Error('GenesisConfig already initialized');
        if (!config.NETWORK_NAME)
            throw new Error('Config is missing network name');
        if (!config.GENESIS_HEADER)
            throw new Error('Config is missing genesis header');
        if (!config.SEED_PEERS)
            throw new Error('Config is missing seed peers');
        GenesisConfig._config = config;
    }
    static get NETWORK_NAME() {
        if (!GenesisConfig._config)
            throw new Error('GenesisConfig not initialized');
        return GenesisConfig._config.NETWORK_NAME;
    }
    static get GENESIS_HEADER() {
        if (!GenesisConfig._config)
            throw new Error('GenesisConfig not initialized');
        return GenesisConfig._config.GENESIS_HEADER;
    }
    static get GENESIS_HASH() {
        if (!GenesisConfig._config)
            throw new Error('GenesisConfig not initialized');
        if (!GenesisConfig._config.GENESIS_HASH) {
            GenesisConfig._config.GENESIS_HASH = bitcoinjs_lib__WEBPACK_IMPORTED_MODULE_0__["Block"].fromHex(GenesisConfig._config.GENESIS_HEADER).getId();
        }
        return GenesisConfig._config.GENESIS_HASH;
    }
    static get SEED_PEERS() {
        if (!GenesisConfig._config)
            throw new Error('GenesisConfig not initialized');
        return GenesisConfig._config.SEED_PEERS;
    }
    static get SEED_LISTS() {
        if (!GenesisConfig._config)
            throw new Error('GenesisConfig not initialized');
        return GenesisConfig._config.SEED_LISTS;
    }
}
GenesisConfig.CONFIGS = {
    'bitcoin': {
        NETWORK_NAME: Network.MAIN,
        SEED_PEERS: [
            { host: 'electrum.blockstream.info', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'bitcoin.aranguren.org', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'bitcoin.lukechilds.co', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'skbxmit.coinjoined.com', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'electrumx.ultracloud.tk', ports: { wss: null, ssl: 50002, tcp: null }, ip: '', version: '' },
            { host: 'btc.ultracloud.tk', ports: { wss: null, ssl: 50002, tcp: null }, ip: '', version: '' },
            { host: 'btc.electrum.bitbitnet.net', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'electrum.coinext.com.br', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'endthefed.onthewifi.com', ports: { wss: null, ssl: 50002, tcp: null }, ip: '', version: '' },
            { host: '2ex.digitaleveryware.com', ports: { wss: null, ssl: 50002, tcp: null }, ip: '', version: '' },
            { host: '1electrumx.hopto.me', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'helicarrier.bauerj.eu', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'node1.btccuracao.com', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'ultracloud.tk', ports: { wss: null, ssl: 50002, tcp: null }, ip: '', version: '' },
            { host: 'horsey.cryptocowboys.net', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'electrum-btc.leblancnet.us', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'caleb.vegas', ports: { wss: null, ssl: 50002, tcp: null }, ip: '', version: '' },
            { host: 'alviss.coinjoined.com', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'gall.pro', ports: { wss: null, ssl: 50002, tcp: null }, ip: '', version: '' },
            { host: 'electrum.syngularity.es', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'electrum2.privateservers.network', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
            { host: 'electrum.snekash.io', ports: { wss: null, ssl: 50002, tcp: null }, ip: '', version: '' },
            { host: 'stavver.dyshek.org', ports: { wss: null, ssl: 50002, tcp: 50001 }, ip: '', version: '' },
        ],
        SEED_LISTS: [],
        GENESIS_HEADER: '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c',
    },
    'testnet': {
        NETWORK_NAME: Network.TEST,
        SEED_PEERS: [
            { host: 'electrum.blockstream.info', ports: { wss: null, ssl: 60002, tcp: 60001 }, ip: '', version: '' },
        ],
        SEED_LISTS: [],
        GENESIS_HEADER: '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4adae5494dffff001d1aa4ae18',
    },
};


/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-client/Stores.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-client/Stores.js ***!
  \****************************************************************************/
/*! exports provided: TransactionStore, BlockStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionStore", function() { return TransactionStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockStore", function() { return BlockStore; });
const TransactionStore = new Map();
const BlockStore = new Map();


/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-client/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-client/index.js ***!
  \***************************************************************************/
/*! exports provided: ConsensusState, TransactionState, Event, Agent, TransactionStore, BlockStore, Network, GenesisConfig, ElectrumClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./node_modules/@nimiq/electrum-client/dist/electrum-client/types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConsensusState", function() { return _types__WEBPACK_IMPORTED_MODULE_0__["ConsensusState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionState", function() { return _types__WEBPACK_IMPORTED_MODULE_0__["TransactionState"]; });

/* harmony import */ var _Agent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Agent */ "./node_modules/@nimiq/electrum-client/dist/electrum-client/Agent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return _Agent__WEBPACK_IMPORTED_MODULE_1__["Event"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Agent", function() { return _Agent__WEBPACK_IMPORTED_MODULE_1__["Agent"]; });

/* harmony import */ var _Stores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Stores */ "./node_modules/@nimiq/electrum-client/dist/electrum-client/Stores.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionStore", function() { return _Stores__WEBPACK_IMPORTED_MODULE_2__["TransactionStore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BlockStore", function() { return _Stores__WEBPACK_IMPORTED_MODULE_2__["BlockStore"]; });

/* harmony import */ var _GenesisConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GenesisConfig */ "./node_modules/@nimiq/electrum-client/dist/electrum-client/GenesisConfig.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Network", function() { return _GenesisConfig__WEBPACK_IMPORTED_MODULE_3__["Network"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GenesisConfig", function() { return _GenesisConfig__WEBPACK_IMPORTED_MODULE_3__["GenesisConfig"]; });

/* harmony import */ var _ElectrumClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ElectrumClient */ "./node_modules/@nimiq/electrum-client/dist/electrum-client/ElectrumClient.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ElectrumClient", function() { return _ElectrumClient__WEBPACK_IMPORTED_MODULE_4__["ElectrumClient"]; });








/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-client/types.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-client/types.js ***!
  \***************************************************************************/
/*! exports provided: ConsensusState, TransactionState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsensusState", function() { return ConsensusState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionState", function() { return TransactionState; });
var ConsensusState;
(function (ConsensusState) {
    ConsensusState["CONNECTING"] = "connecting";
    ConsensusState["SYNCING"] = "syncing";
    ConsensusState["ESTABLISHED"] = "established";
})(ConsensusState || (ConsensusState = {}));
var TransactionState;
(function (TransactionState) {
    TransactionState["NEW"] = "new";
    TransactionState["PENDING"] = "pending";
    TransactionState["MINED"] = "mined";
    TransactionState["INVALIDATED"] = "invalidated";
    TransactionState["CONFIRMED"] = "confirmed";
})(TransactionState || (TransactionState = {}));


/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-ws/ElectrumWS.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-ws/ElectrumWS.js ***!
  \****************************************************************************/
/*! exports provided: ElectrumWSEvent, DEFAULT_ENDPOINT, DEFAULT_TOKEN, ElectrumWS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElectrumWSEvent", function() { return ElectrumWSEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_ENDPOINT", function() { return DEFAULT_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_TOKEN", function() { return DEFAULT_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElectrumWS", function() { return ElectrumWS; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observable */ "./node_modules/@nimiq/electrum-client/dist/electrum-ws/Observable.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./node_modules/@nimiq/electrum-client/dist/electrum-ws/helpers.js");


var ElectrumWSEvent;
(function (ElectrumWSEvent) {
    ElectrumWSEvent["OPEN"] = "open";
    ElectrumWSEvent["CLOSE"] = "close";
    ElectrumWSEvent["CONNECTED"] = "connected";
    ElectrumWSEvent["DISCONNECTED"] = "disconnected";
    ElectrumWSEvent["RECONNECTING"] = "reconnecting";
    ElectrumWSEvent["ERROR"] = "error";
    ElectrumWSEvent["MESSAGE"] = "message";
})(ElectrumWSEvent || (ElectrumWSEvent = {}));
const DEFAULT_ENDPOINT = 'wss://api.nimiqwatch.com:50002';
const DEFAULT_TOKEN = 'mainnet:electrum.blockstream.info';
const RECONNECT_TIMEOUT = 1000;
const CONNECTED_TIMEOUT = 500;
const REQUEST_TIMEOUT = 1000 * 10;
const CLOSE_CODE = 1000;
class ElectrumWS extends _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"] {
    constructor(endpoint = DEFAULT_ENDPOINT, options = {}) {
        super();
        this.requests = new Map();
        this.subscriptions = new Map();
        this.connected = false;
        this.reconnectionTimeout = -1;
        this.incompleteMessage = '';
        this.endpoint = endpoint;
        this.options = Object.assign({
            proxy: true,
            token: DEFAULT_TOKEN,
            reconnect: true,
        }, options);
        this.connect();
        Object.values(ElectrumWSEvent).forEach((ev) => {
            this.on(ev, (e) => e
                ? console.debug(`ElectrumWS - ${ev.toUpperCase()}:`, e)
                : console.debug(`ElectrumWS - ${ev.toUpperCase()}`));
        });
    }
    async request(method, ...params) {
        let id;
        do {
            id = Math.ceil(Math.random() * 1e5);
        } while (this.requests.has(id));
        const payload = {
            jsonrpc: "2.0",
            method,
            params,
            id,
        };
        if (!this.connected) {
            await new Promise((resolve) => this.once(ElectrumWSEvent.CONNECTED, () => resolve(true)));
        }
        const promise = new Promise((resolve, reject) => {
            const timeout = window.setTimeout(() => {
                this.requests.delete(id);
                reject(new Error('Request timeout'));
            }, REQUEST_TIMEOUT);
            this.requests.set(id, {
                resolve,
                reject,
                method,
                timeout,
            });
        });
        console.debug('ElectrumWS SEND:', method, ...params);
        this.ws.send(this.options.proxy ? Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["stringToBytes"])(JSON.stringify(payload) + '\n') : JSON.stringify(payload));
        return promise;
    }
    async subscribe(method, callback, ...params) {
        const subscriptionKey = `${method}${typeof params[0] === 'string' ? `-${params[0]}` : ''}`;
        this.subscriptions.set(subscriptionKey, callback);
        if (!this.connected)
            return;
        callback(...params, await this.request(`${method}.subscribe`, ...params));
    }
    async unsubscribe(method, ...params) {
        const subscriptionKey = `${method}${typeof params[0] === 'string' ? `-${params[0]}` : ''}`;
        this.subscriptions.delete(subscriptionKey);
        return this.request(`${method}.unsubscribe`, ...params);
    }
    isConnected() {
        return this.connected;
    }
    async close(reason) {
        this.options.reconnect = false;
        for (const [id, request] of this.requests) {
            window.clearTimeout(request.timeout);
            this.requests.delete(id);
            console.debug('Rejecting pending request:', request.method);
            request.reject(new Error(reason));
        }
        window.clearTimeout(this.reconnectionTimeout);
        if (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN) {
            const closingPromise = new Promise((resolve) => this.once(ElectrumWSEvent.CLOSE, () => resolve(true)));
            this.ws.close(CLOSE_CODE, reason);
            return closingPromise;
        }
    }
    connect() {
        let url = this.endpoint;
        if (this.options.proxy && this.options.token) {
            url = `${url}?token=${this.options.token}`;
        }
        this.ws = new WebSocket(url, this.options.proxy ? 'binary' : undefined);
        this.ws.binaryType = 'arraybuffer';
        this.ws.addEventListener('open', this.onOpen.bind(this));
        this.ws.addEventListener('message', this.onMessage.bind(this));
        this.ws.addEventListener('error', this.onError.bind(this));
        this.ws.addEventListener('close', this.onClose.bind(this));
    }
    onOpen() {
        this.fire(ElectrumWSEvent.OPEN);
        this.connectedTimeout = window.setTimeout(() => {
            this.connected = true;
            this.fire(ElectrumWSEvent.CONNECTED);
            for (const [subscriptionKey, callback] of this.subscriptions) {
                const params = subscriptionKey.split('-');
                const method = params.shift();
                if (!method) {
                    console.warn('Cannot resubscribe, no method in subscription key:', subscriptionKey);
                    continue;
                }
                this.subscribe(method, callback, ...params).catch((error) => {
                    if (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN) {
                        this.ws.close(CLOSE_CODE, error.message);
                    }
                });
            }
        }, CONNECTED_TIMEOUT);
    }
    onMessage(msg) {
        const raw = typeof msg.data === 'string' ? msg.data : Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["bytesToString"])(msg.data);
        const lines = raw.split('\n').filter(line => line.length > 0);
        for (const line of lines) {
            const response = this.parseLine(line);
            if (!response)
                continue;
            this.fire(ElectrumWSEvent.MESSAGE, response);
            if ('id' in response && this.requests.has(response.id)) {
                const request = this.requests.get(response.id);
                window.clearTimeout(request.timeout);
                this.requests.delete(response.id);
                if ('result' in response) {
                    request.resolve(response.result);
                }
                else if (response.error) {
                    request.reject(new Error(typeof response.error === 'string' ? response.error : response.error.message));
                }
                else {
                    request.reject(new Error('No result'));
                }
            }
            if ('method' in response && (response.method).endsWith('subscribe')) {
                const method = response.method.replace('.subscribe', '');
                const params = response.params || [];
                const subscriptionKey = `${method}${typeof params[0] === 'string' ? `-${params[0]}` : ''}`;
                if (this.subscriptions.has(subscriptionKey)) {
                    const callback = this.subscriptions.get(subscriptionKey);
                    callback(...params);
                }
            }
        }
    }
    parseLine(line) {
        try {
            const parsed = JSON.parse(line);
            this.incompleteMessage = '';
            return parsed;
        }
        catch (error) {
        }
        if (this.incompleteMessage && !line.includes(this.incompleteMessage)) {
            return this.parseLine(`${this.incompleteMessage}${line}`);
        }
        this.incompleteMessage = line;
        return false;
    }
    onError(event) {
        if (event.error) {
            console.error('ElectrumWS ERROR:', event.error);
            this.fire(ElectrumWSEvent.ERROR, event.error);
        }
    }
    onClose(event) {
        this.fire(ElectrumWSEvent.CLOSE, event);
        if (!this.connected)
            window.clearTimeout(this.connectedTimeout);
        else
            this.fire(ElectrumWSEvent.DISCONNECTED);
        if (this.options.reconnect && this.connected) {
            this.fire(ElectrumWSEvent.RECONNECTING);
            this.reconnectionTimeout = window.setTimeout(() => this.connect(), RECONNECT_TIMEOUT);
        }
        this.connected = false;
    }
}


/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-ws/Observable.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-ws/Observable.js ***!
  \****************************************************************************/
/*! exports provided: Observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return Observable; });
class Observable {
    constructor() {
        this.listeners = new Map();
    }
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        return this.listeners.get(event).push(callback) - 1;
    }
    once(event, callback) {
        const id = this.on(event, (...params) => {
            this.off(event, id);
            callback(...params);
        });
    }
    off(event, id) {
        const callbacks = this.listeners.get(event);
        if (!callbacks || callbacks.length < id + 1)
            return;
        callbacks[id] = null;
    }
    allOff(event) {
        this.listeners.delete(event);
    }
    fire(event, ...payload) {
        const callbacks = this.listeners.get(event);
        if (!callbacks || !callbacks.length)
            return;
        for (const callback of callbacks) {
            if (!callback)
                continue;
            callback(...payload);
        }
    }
}


/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-ws/helpers.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-ws/helpers.js ***!
  \*************************************************************************/
/*! exports provided: stringToBytes, bytesToString, hexToBytes, bytesToHex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToBytes", function() { return stringToBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToString", function() { return bytesToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexToBytes", function() { return hexToBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToHex", function() { return bytesToHex; });
function stringToBytes(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}
function bytesToString(bytes) {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
}
function hexToBytes(hex) {
    return new Uint8Array((hex.match(/.{2}/g) || []).map(byte => parseInt(byte, 16)));
}
function bytesToHex(bytes) {
    const HEX_ALPHABET = '0123456789abcdef';
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
        const code = bytes[i];
        hex += HEX_ALPHABET[code >>> 4];
        hex += HEX_ALPHABET[code & 0x0F];
    }
    return hex;
}


/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/electrum-ws/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/electrum-ws/index.js ***!
  \***********************************************************************/
/*! exports provided: stringToBytes, bytesToString, hexToBytes, bytesToHex, ElectrumWSEvent, DEFAULT_ENDPOINT, DEFAULT_TOKEN, ElectrumWS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./node_modules/@nimiq/electrum-client/dist/electrum-ws/helpers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringToBytes", function() { return _helpers__WEBPACK_IMPORTED_MODULE_0__["stringToBytes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bytesToString", function() { return _helpers__WEBPACK_IMPORTED_MODULE_0__["bytesToString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hexToBytes", function() { return _helpers__WEBPACK_IMPORTED_MODULE_0__["hexToBytes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bytesToHex", function() { return _helpers__WEBPACK_IMPORTED_MODULE_0__["bytesToHex"]; });

/* harmony import */ var _ElectrumWS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ElectrumWS */ "./node_modules/@nimiq/electrum-client/dist/electrum-ws/ElectrumWS.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ElectrumWSEvent", function() { return _ElectrumWS__WEBPACK_IMPORTED_MODULE_1__["ElectrumWSEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_ENDPOINT", function() { return _ElectrumWS__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_ENDPOINT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_TOKEN", function() { return _ElectrumWS__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_TOKEN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ElectrumWS", function() { return _ElectrumWS__WEBPACK_IMPORTED_MODULE_1__["ElectrumWS"]; });





/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/index.js ***!
  \***********************************************************/
/*! exports provided: stringToBytes, bytesToString, hexToBytes, bytesToHex, ElectrumWSEvent, DEFAULT_ENDPOINT, DEFAULT_TOKEN, ElectrumWS, Transport, blockHeaderToPlain, transactionToPlain, inputToPlain, outputToPlain, deriveAddressFromInput, transactionFromPlain, inputFromPlain, outputFromPlain, ElectrumApi, ConsensusState, TransactionState, Event, Agent, TransactionStore, BlockStore, Network, GenesisConfig, ElectrumClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _electrum_ws_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./electrum-ws/index */ "./node_modules/@nimiq/electrum-client/dist/electrum-ws/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringToBytes", function() { return _electrum_ws_index__WEBPACK_IMPORTED_MODULE_0__["stringToBytes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bytesToString", function() { return _electrum_ws_index__WEBPACK_IMPORTED_MODULE_0__["bytesToString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hexToBytes", function() { return _electrum_ws_index__WEBPACK_IMPORTED_MODULE_0__["hexToBytes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bytesToHex", function() { return _electrum_ws_index__WEBPACK_IMPORTED_MODULE_0__["bytesToHex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ElectrumWSEvent", function() { return _electrum_ws_index__WEBPACK_IMPORTED_MODULE_0__["ElectrumWSEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_ENDPOINT", function() { return _electrum_ws_index__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_ENDPOINT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_TOKEN", function() { return _electrum_ws_index__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_TOKEN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ElectrumWS", function() { return _electrum_ws_index__WEBPACK_IMPORTED_MODULE_0__["ElectrumWS"]; });

/* harmony import */ var _electrum_api_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./electrum-api/index */ "./node_modules/@nimiq/electrum-client/dist/electrum-api/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transport", function() { return _electrum_api_index__WEBPACK_IMPORTED_MODULE_1__["Transport"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "blockHeaderToPlain", function() { return _electrum_api_index__WEBPACK_IMPORTED_MODULE_1__["blockHeaderToPlain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transactionToPlain", function() { return _electrum_api_index__WEBPACK_IMPORTED_MODULE_1__["transactionToPlain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inputToPlain", function() { return _electrum_api_index__WEBPACK_IMPORTED_MODULE_1__["inputToPlain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "outputToPlain", function() { return _electrum_api_index__WEBPACK_IMPORTED_MODULE_1__["outputToPlain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deriveAddressFromInput", function() { return _electrum_api_index__WEBPACK_IMPORTED_MODULE_1__["deriveAddressFromInput"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transactionFromPlain", function() { return _electrum_api_index__WEBPACK_IMPORTED_MODULE_1__["transactionFromPlain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inputFromPlain", function() { return _electrum_api_index__WEBPACK_IMPORTED_MODULE_1__["inputFromPlain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "outputFromPlain", function() { return _electrum_api_index__WEBPACK_IMPORTED_MODULE_1__["outputFromPlain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ElectrumApi", function() { return _electrum_api_index__WEBPACK_IMPORTED_MODULE_1__["ElectrumApi"]; });

/* harmony import */ var _electrum_client_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./electrum-client/index */ "./node_modules/@nimiq/electrum-client/dist/electrum-client/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConsensusState", function() { return _electrum_client_index__WEBPACK_IMPORTED_MODULE_2__["ConsensusState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionState", function() { return _electrum_client_index__WEBPACK_IMPORTED_MODULE_2__["TransactionState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return _electrum_client_index__WEBPACK_IMPORTED_MODULE_2__["Event"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Agent", function() { return _electrum_client_index__WEBPACK_IMPORTED_MODULE_2__["Agent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionStore", function() { return _electrum_client_index__WEBPACK_IMPORTED_MODULE_2__["TransactionStore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BlockStore", function() { return _electrum_client_index__WEBPACK_IMPORTED_MODULE_2__["BlockStore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Network", function() { return _electrum_client_index__WEBPACK_IMPORTED_MODULE_2__["Network"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GenesisConfig", function() { return _electrum_client_index__WEBPACK_IMPORTED_MODULE_2__["GenesisConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ElectrumClient", function() { return _electrum_client_index__WEBPACK_IMPORTED_MODULE_2__["ElectrumClient"]; });






/***/ }),

/***/ "./node_modules/@nimiq/electrum-client/dist/package.json":
/*!***************************************************************!*\
  !*** ./node_modules/@nimiq/electrum-client/dist/package.json ***!
  \***************************************************************/
/*! exports provided: name, version, description, author, module, types, license, scripts, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"@nimiq/electrum-client\",\"version\":\"0.1.0\",\"description\":\"Electrum utilities for the Nimiq ecosystem\",\"author\":\"Sören <soeren@nimiq.com>\",\"module\":\"dist/index.js\",\"types\":\"dist/index.d.ts\",\"license\":\"Apache-2.0\",\"scripts\":{\"test\":\"jest\",\"build\":\"tsc\"},\"dependencies\":{\"bitcoinjs-lib\":\"^5.1.10\"},\"devDependencies\":{\"@types/jest\":\"^26.0.10\",\"jest\":\"^26.4.2\",\"ts-jest\":\"^26.3.0\",\"typescript\":\"^3.9.7\"}}");

/***/ })

}]);
//# sourceMappingURL=electrum-client-legacy.js.map