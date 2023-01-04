(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-Btc.es.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-Btc.es.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-polyfill-node:buffer.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-polyfill-node:buffer.es.js");
/* harmony import */ var _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lazy-chunk-index.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es.js");
/* harmony import */ var _lazy_chunk_polyfill_node_process_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-chunk-polyfill-node:process.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-polyfill-node:process.es.js");
/* harmony import */ var _lazy_chunk_index_es4_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lazy-chunk-index.es4.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es4.js");
/* harmony import */ var _lazy_chunk_index_es3_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lazy-chunk-index.es3.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es3.js");
/* harmony import */ var _lazy_chunk_events_es_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lazy-chunk-events.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-events.es.js");
/* harmony import */ var _lazy_chunk_commonjsHelpers_es_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lazy-chunk-_commonjsHelpers.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-_commonjsHelpers.es.js");
/* harmony import */ var _lazy_chunk_sha256_es_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lazy-chunk-sha256.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-sha256.es.js");









/*
 * Bitcoin BIP32 path helpers
 * (C) 2016 Alex Beregszaszi
 */
const HARDENED = 0x80000000;

var BIPPath = function (path) {
  if (!Array.isArray(path)) {
    throw new Error('Input must be an Array')
  }
  if (path.length === 0) {
    throw new Error('Path must contain at least one level')
  }
  for (var i = 0; i < path.length; i++) {
    if (typeof path[i] !== 'number') {
      throw new Error('Path element is not a number')
    }
  }
  this.path = path;
};

BIPPath.validatePathArray = function (path) {
  try {
    BIPPath.fromPathArray(path);
    return true
  } catch (e) {
    return false
  }
};

BIPPath.validateString = function (text, reqRoot) {
  try {
    BIPPath.fromString(text, reqRoot);
    return true
  } catch (e) {
    return false
  }
};

BIPPath.fromPathArray = function (path) {
  return new BIPPath(path)
};

BIPPath.fromString = function (text, reqRoot) {
  // skip the root
  if (/^m\//i.test(text)) {
    text = text.slice(2);
  } else if (reqRoot) {
    throw new Error('Root element is required')
  }

  var path = text.split('/');
  var ret = new Array(path.length);
  for (var i = 0; i < path.length; i++) {
    var tmp = /(\d+)([hH\']?)/.exec(path[i]);
    if (tmp === null) {
      throw new Error('Invalid input')
    }
    ret[i] = parseInt(tmp[1], 10);

    if (ret[i] >= HARDENED) {
      throw new Error('Invalid child index')
    }

    if (tmp[2] === 'h' || tmp[2] === 'H' || tmp[2] === '\'') {
      ret[i] += HARDENED;
    } else if (tmp[2].length != 0) {
      throw new Error('Invalid modifier')
    }
  }
  return new BIPPath(ret)
};

BIPPath.prototype.toPathArray = function () {
  return this.path
};

BIPPath.prototype.toString = function (noRoot, oldStyle) {
  var ret = new Array(this.path.length);
  for (var i = 0; i < this.path.length; i++) {
    var tmp = this.path[i];
    if (tmp & HARDENED) {
      ret[i] = (tmp & ~HARDENED) + (oldStyle ? 'h' : '\'');
    } else {
      ret[i] = tmp;
    }
  }
  return (noRoot ? '' : 'm/') + ret.join('/')
};

BIPPath.prototype.inspect = function () {
  return 'BIPPath <' + this.toString() + '>'
};

var bip32Path = BIPPath;

// flow
const MAX_SCRIPT_BLOCK = 50;
const DEFAULT_VERSION = 1;
const DEFAULT_LOCKTIME = 0;
const DEFAULT_SEQUENCE = 0xffffffff;
const SIGHASH_ALL = 1;
const OP_DUP = 0x76;
const OP_HASH160 = 0xa9;
const HASH_SIZE = 0x14;
const OP_EQUALVERIFY = 0x88;
const OP_CHECKSIG = 0xac;

async function signMessage(transport, {
  path,
  messageHex
}) {
  const paths = bip32Path.fromString(path).toPathArray();
  const message = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(messageHex, "hex");
  let offset = 0;

  while (offset !== message.length) {
    let maxChunkSize = offset === 0 ? MAX_SCRIPT_BLOCK - 1 - paths.length * 4 - 4 : MAX_SCRIPT_BLOCK;
    let chunkSize = offset + maxChunkSize > message.length ? message.length - offset : maxChunkSize;
    const buffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(offset === 0 ? 1 + paths.length * 4 + 2 + chunkSize : chunkSize);

    if (offset === 0) {
      buffer[0] = paths.length;
      paths.forEach((element, index) => {
        buffer.writeUInt32BE(element, 1 + 4 * index);
      });
      buffer.writeUInt16BE(message.length, 1 + 4 * paths.length);
      message.copy(buffer, 1 + 4 * paths.length + 2, offset, offset + chunkSize);
    } else {
      message.copy(buffer, 0, offset, offset + chunkSize);
    }

    await transport.send(0xe0, 0x4e, 0x00, offset === 0 ? 0x01 : 0x80, buffer);
    offset += chunkSize;
  }

  const res = await transport.send(0xe0, 0x4e, 0x80, 0x00, _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x00]));
  const v = res[0] - 0x30;
  let r = res.slice(4, 4 + res[3]);

  if (r[0] === 0) {
    r = r.slice(1);
  }

  r = r.toString("hex");
  offset = 4 + res[3] + 2;
  let s = res.slice(offset, offset + res[offset - 1]);

  if (s[0] === 0) {
    s = s.slice(1);
  }

  s = s.toString("hex");
  return {
    v,
    r,
    s
  };
}

function bip32asBuffer(path) {
  const paths = !path ? [] : bip32Path.fromString(path).toPathArray();
  let buffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(1 + paths.length * 4);
  buffer[0] = paths.length;
  paths.forEach((element, index) => {
    buffer.writeUInt32BE(element, 1 + 4 * index);
  });
  return buffer;
}

/**
 * address format is one of legacy | p2sh | bech32 | cashaddr
 */

const addressFormatMap = {
  legacy: 0,
  p2sh: 1,
  bech32: 2,
  cashaddr: 3
};
async function getWalletPublicKey(transport, options) {
  const {
    path,
    verify,
    format
  } = {
    verify: false,
    format: "legacy",
    ...options
  };

  if (!(format in addressFormatMap)) {
    throw new Error("btc.getWalletPublicKey invalid format=" + format);
  }

  const buffer = bip32asBuffer(path);
  var p1 = verify ? 1 : 0;
  var p2 = addressFormatMap[format];
  const response = await transport.send(0xe0, 0x40, p1, p2, buffer);
  const publicKeyLength = response[0];
  const addressLength = response[1 + publicKeyLength];
  const publicKey = response.slice(1, 1 + publicKeyLength).toString("hex");
  const bitcoinAddress = response.slice(1 + publicKeyLength + 1, 1 + publicKeyLength + 1 + addressLength).toString("ascii");
  const chainCode = response.slice(1 + publicKeyLength + 1 + addressLength, 1 + publicKeyLength + 1 + addressLength + 32).toString("hex");
  return {
    publicKey,
    bitcoinAddress,
    chainCode
  };
}
//# sourceMappingURL=getWalletPublicKey.js.map

function getVarint(data, offset) {
  if (data[offset] < 0xfd) {
    return [data[offset], 1];
  }

  if (data[offset] === 0xfd) {
    return [(data[offset + 2] << 8) + data[offset + 1], 3];
  }

  if (data[offset] === 0xfe) {
    return [(data[offset + 4] << 24) + (data[offset + 3] << 16) + (data[offset + 2] << 8) + data[offset + 1], 5];
  }

  throw new Error("getVarint called with unexpected parameters");
}
function createVarint(value) {
  if (value < 0xfd) {
    const buffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(1);
    buffer[0] = value;
    return buffer;
  }

  if (value <= 0xffff) {
    const buffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(3);
    buffer[0] = 0xfd;
    buffer[1] = value & 0xff;
    buffer[2] = value >> 8 & 0xff;
    return buffer;
  }

  const buffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(5);
  buffer[0] = 0xfe;
  buffer[1] = value & 0xff;
  buffer[2] = value >> 8 & 0xff;
  buffer[3] = value >> 16 & 0xff;
  buffer[4] = value >> 24 & 0xff;
  return buffer;
}

function formatTransactionDebug(transaction) {
  let str = "TX";
  str += " version " + transaction.version.toString("hex");

  if (transaction.locktime) {
    str += " locktime " + transaction.locktime.toString("hex");
  }

  if (transaction.witness) {
    str += " witness " + transaction.witness.toString("hex");
  }

  if (transaction.timestamp) {
    str += " timestamp " + transaction.timestamp.toString("hex");
  }

  if (transaction.nVersionGroupId) {
    str += " nVersionGroupId " + transaction.nVersionGroupId.toString("hex");
  }

  if (transaction.nExpiryHeight) {
    str += " nExpiryHeight " + transaction.nExpiryHeight.toString("hex");
  }

  if (transaction.extraData) {
    str += " extraData " + transaction.extraData.toString("hex");
  }

  transaction.inputs.forEach(({
    prevout,
    script,
    sequence
  }, i) => {
    str += `\ninput ${i}:`;
    str += ` prevout ${prevout.toString("hex")}`;
    str += ` script ${script.toString("hex")}`;
    str += ` sequence ${sequence.toString("hex")}`;
  });
  (transaction.outputs || []).forEach(({
    amount,
    script
  }, i) => {
    str += `\noutput ${i}:`;
    str += ` amount ${amount.toString("hex")}`;
    str += ` script ${script.toString("hex")}`;
  });
  return str;
}

function splitTransaction(transactionHex, isSegwitSupported = false, hasTimestamp = false, hasExtraData = false, additionals = []) {
  const inputs = [];
  const outputs = [];
  var witness = false;
  let offset = 0;
  let timestamp = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);
  let nExpiryHeight = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);
  let nVersionGroupId = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);
  let extraData = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);
  const isDecred = additionals.includes("decred");
  const transaction = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(transactionHex, "hex");
  const version = transaction.slice(offset, offset + 4);
  const overwinter = version.equals(_lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x03, 0x00, 0x00, 0x80])) || version.equals(_lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x04, 0x00, 0x00, 0x80]));
  offset += 4;

  if (!hasTimestamp && isSegwitSupported && transaction[offset] === 0 && transaction[offset + 1] !== 0) {
    offset += 2;
    witness = true;
  }

  if (hasTimestamp) {
    timestamp = transaction.slice(offset, 4 + offset);
    offset += 4;
  }

  if (overwinter) {
    nVersionGroupId = transaction.slice(offset, 4 + offset);
    offset += 4;
  }

  let varint = getVarint(transaction, offset);
  const numberInputs = varint[0];
  offset += varint[1];

  for (let i = 0; i < numberInputs; i++) {
    const prevout = transaction.slice(offset, offset + 36);
    offset += 36;
    let script = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);
    let tree = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0); //No script for decred, it has a witness

    if (!isDecred) {
      varint = getVarint(transaction, offset);
      offset += varint[1];
      script = transaction.slice(offset, offset + varint[0]);
      offset += varint[0];
    } else {
      //Tree field
      tree = transaction.slice(offset, offset + 1);
      offset += 1;
    }

    const sequence = transaction.slice(offset, offset + 4);
    offset += 4;
    inputs.push({
      prevout,
      script,
      sequence,
      tree
    });
  }

  varint = getVarint(transaction, offset);
  const numberOutputs = varint[0];
  offset += varint[1];

  for (let i = 0; i < numberOutputs; i++) {
    const amount = transaction.slice(offset, offset + 8);
    offset += 8;

    if (isDecred) {
      //Script version
      offset += 2;
    }

    varint = getVarint(transaction, offset);
    offset += varint[1];
    const script = transaction.slice(offset, offset + varint[0]);
    offset += varint[0];
    outputs.push({
      amount,
      script
    });
  }

  let witnessScript, locktime;

  if (witness) {
    witnessScript = transaction.slice(offset, -4);
    locktime = transaction.slice(transaction.length - 4);
  } else {
    locktime = transaction.slice(offset, offset + 4);
  }

  offset += 4;

  if (overwinter || isDecred) {
    nExpiryHeight = transaction.slice(offset, offset + 4);
    offset += 4;
  }

  if (hasExtraData) {
    extraData = transaction.slice(offset);
  } //Get witnesses for Decred


  if (isDecred) {
    varint = getVarint(transaction, offset);
    offset += varint[1];

    if (varint[0] !== numberInputs) {
      throw new Error("splitTransaction: incoherent number of witnesses");
    }

    for (let i = 0; i < numberInputs; i++) {
      //amount
      offset += 8; //block height

      offset += 4; //block index

      offset += 4; //Script size

      varint = getVarint(transaction, offset);
      offset += varint[1];
      const script = transaction.slice(offset, offset + varint[0]);
      offset += varint[0];
      inputs[i].script = script;
    }
  }

  const t = {
    version,
    inputs,
    outputs,
    locktime,
    witness: witnessScript,
    timestamp,
    nVersionGroupId,
    nExpiryHeight,
    extraData
  };
  Object(_lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["l"])("btc", `splitTransaction ${transactionHex}:\n${formatTransactionDebug(t)}`);
  return t;
}

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (_lazy_chunk_polyfill_node_process_es_js__WEBPACK_IMPORTED_MODULE_2__["b"].env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var browser = invariant;

async function getTrustedInputRaw(transport, transactionData, indexLookup) {
  let data;
  let firstRound = false;

  if (typeof indexLookup === "number") {
    firstRound = true;
    const prefix = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(4);
    prefix.writeUInt32BE(indexLookup, 0);
    data = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([prefix, transactionData], transactionData.length + 4);
  } else {
    data = transactionData;
  }

  const trustedInput = await transport.send(0xe0, 0x42, firstRound ? 0x00 : 0x80, 0x00, data);
  const res = trustedInput.slice(0, trustedInput.length - 2).toString("hex");
  return res;
}
async function getTrustedInput(transport, indexLookup, transaction, additionals = []) {
  const {
    version,
    inputs,
    outputs,
    locktime,
    nExpiryHeight,
    extraData
  } = transaction;

  if (!outputs || !locktime) {
    throw new Error("getTrustedInput: locktime & outputs is expected");
  }

  const isDecred = additionals.includes("decred");
  const isXST = additionals.includes("stealthcoin");

  const processScriptBlocks = async (script, sequence) => {
    const seq = sequence || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);
    const scriptBlocks = [];
    let offset = 0;

    while (offset !== script.length) {
      let blockSize = script.length - offset > MAX_SCRIPT_BLOCK ? MAX_SCRIPT_BLOCK : script.length - offset;

      if (offset + blockSize !== script.length) {
        scriptBlocks.push(script.slice(offset, offset + blockSize));
      } else {
        scriptBlocks.push(_lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([script.slice(offset, offset + blockSize), seq]));
      }

      offset += blockSize;
    } // Handle case when no script length: we still want to pass the sequence
    // relatable: https://github.com/LedgerHQ/ledger-live-desktop/issues/1386


    if (script.length === 0) {
      scriptBlocks.push(seq);
    }

    let res;

    for (let scriptBlock of scriptBlocks) {
      res = await getTrustedInputRaw(transport, scriptBlock);
    }

    return res;
  };

  const processWholeScriptBlock = block => getTrustedInputRaw(transport, block);

  await getTrustedInputRaw(transport, _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([transaction.version, transaction.timestamp || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0), transaction.nVersionGroupId || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0), createVarint(inputs.length)]), indexLookup);

  for (let input of inputs) {
    const isXSTV2 = isXST && _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].compare(version, _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x02, 0x00, 0x00, 0x00])) === 0;
    const treeField = isDecred ? input.tree || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x00]) : _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);
    const data = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([input.prevout, treeField, isXSTV2 ? _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x00]) : createVarint(input.script.length)]);
    await getTrustedInputRaw(transport, data); // iteration (eachSeries) ended
    // TODO notify progress
    // deferred.notify("input");
    // Reference: https://github.com/StealthSend/Stealth/commit/5be35d6c2c500b32ed82e5d6913d66d18a4b0a7f#diff-e8db9b851adc2422aadfffca88f14c91R566

    await (isDecred ? processWholeScriptBlock(_lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([input.script, input.sequence])) : isXSTV2 ? processWholeScriptBlock(input.sequence) : processScriptBlocks(input.script, input.sequence));
  }

  await getTrustedInputRaw(transport, createVarint(outputs.length));

  for (let output of outputs) {
    const data = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([output.amount, isDecred ? _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x00, 0x00]) : _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0), //Version script
    createVarint(output.script.length), output.script]);
    await getTrustedInputRaw(transport, data);
  }

  const endData = [];

  if (nExpiryHeight && nExpiryHeight.length > 0) {
    endData.push(nExpiryHeight);
  }

  if (extraData && extraData.length > 0) {
    endData.push(extraData);
  }

  let extraPart;

  if (endData.length) {
    const data = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat(endData);
    extraPart = isDecred ? data : _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([createVarint(data.length), data]);
  }

  const res = await processScriptBlocks(_lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([locktime, extraPart || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0)]));
  browser(res, "missing result in processScriptBlocks");
  return res;
}

/**
  @example
const tx1 = btc.splitTransaction("01000000014ea60aeac5252c14291d428915bd7ccd1bfc4af009f4d4dc57ae597ed0420b71010000008a47304402201f36a12c240dbf9e566bc04321050b1984cd6eaf6caee8f02bb0bfec08e3354b022012ee2aeadcbbfd1e92959f57c15c1c6debb757b798451b104665aa3010569b49014104090b15bde569386734abf2a2b99f9ca6a50656627e77de663ca7325702769986cf26cc9dd7fdea0af432c8e2becc867c932e1b9dd742f2a108997c2252e2bdebffffffff0281b72e00000000001976a91472a5d75c8d2d0565b656a5232703b167d50d5a2b88aca0860100000000001976a9144533f5fb9b4817f713c48f0bfe96b9f50c476c9b88ac00000000");
const outputScript = btc.serializeTransactionOutputs(tx1).toString('hex');
  */

function serializeTransactionOutputs({
  outputs
}) {
  let outputBuffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);

  if (typeof outputs !== "undefined") {
    outputBuffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([outputBuffer, createVarint(outputs.length)]);
    outputs.forEach(output => {
      outputBuffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([outputBuffer, output.amount, createVarint(output.script.length), output.script]);
    });
  }

  return outputBuffer;
}
function serializeTransaction(transaction, skipWitness, timestamp, additionals = []) {
  const isDecred = additionals.includes("decred");
  const isBech32 = additionals.includes("bech32");
  let inputBuffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);
  let useWitness = typeof transaction["witness"] != "undefined" && !skipWitness;
  transaction.inputs.forEach(input => {
    inputBuffer = isDecred || isBech32 ? _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([inputBuffer, input.prevout, _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x00]), //tree
    input.sequence]) : _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([inputBuffer, input.prevout, createVarint(input.script.length), input.script, input.sequence]);
  });
  let outputBuffer = serializeTransactionOutputs(transaction);

  if (typeof transaction.outputs !== "undefined" && typeof transaction.locktime !== "undefined") {
    outputBuffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([outputBuffer, useWitness && transaction.witness || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0), transaction.locktime, transaction.nExpiryHeight || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0), transaction.extraData || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0)]);
  }

  return _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([transaction.version, timestamp ? timestamp : _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0), transaction.nVersionGroupId || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0), useWitness ? _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from("0001", "hex") : _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0), createVarint(transaction.inputs.length), inputBuffer, outputBuffer]);
}

function getTrustedInputBIP143(transport, indexLookup, transaction, additionals = []) {
  if (!transaction) {
    throw new Error("getTrustedInputBIP143: missing tx");
  }

  const isDecred = additionals.includes("decred");

  if (isDecred) {
    throw new Error("Decred does not implement BIP143");
  }

  let hash = Object(_lazy_chunk_index_es4_js__WEBPACK_IMPORTED_MODULE_3__["s"])("sha256").update(Object(_lazy_chunk_index_es4_js__WEBPACK_IMPORTED_MODULE_3__["s"])("sha256").update(serializeTransaction(transaction, true)).digest()).digest();
  const data = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(4);
  data.writeUInt32LE(indexLookup, 0);
  const {
    outputs,
    locktime
  } = transaction;

  if (!outputs || !locktime) {
    throw new Error("getTrustedInputBIP143: locktime & outputs is expected");
  }

  if (!outputs[indexLookup]) {
    throw new Error("getTrustedInputBIP143: wrong index");
  }

  hash = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([hash, data, outputs[indexLookup].amount]);
  return hash.toString("hex");
}

function hashPublicKey(buffer) {
  return new _lazy_chunk_index_es4_js__WEBPACK_IMPORTED_MODULE_3__["r"]().update(Object(_lazy_chunk_index_es4_js__WEBPACK_IMPORTED_MODULE_3__["s"])("sha256").update(buffer).digest()).digest();
}

function startUntrustedHashTransactionInputRaw(transport, newTransaction, firstRound, transactionData, bip143 = false, overwinter = false, additionals = []) {
  const p2 = additionals.includes("cashaddr") ? 0x03 : bip143 ? additionals.includes("sapling") ? 0x05 : overwinter ? 0x04 : 0x02 : 0x00;
  return transport.send(0xe0, 0x44, firstRound ? 0x00 : 0x80, newTransaction ? p2 : 0x80, transactionData);
}
async function startUntrustedHashTransactionInput(transport, newTransaction, transaction, inputs, bip143 = false, overwinter = false, additionals = [], useTrustedInputForSegwit = false) {
  let data = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([transaction.version, transaction.timestamp || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0), transaction.nVersionGroupId || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0), createVarint(transaction.inputs.length)]);
  await startUntrustedHashTransactionInputRaw(transport, newTransaction, true, data, bip143, overwinter, additionals);
  let i = 0;
  const isDecred = additionals.includes("decred");

  for (let input of transaction.inputs) {
    let prefix;
    let inputValue = inputs[i].value;

    if (bip143) {
      if (useTrustedInputForSegwit && inputs[i].trustedInput) {
        prefix = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x01, inputValue.length]);
      } else {
        prefix = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x02]);
      }
    } else {
      if (inputs[i].trustedInput) {
        prefix = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x01, inputs[i].value.length]);
      } else {
        prefix = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x00]);
      }
    }

    data = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([prefix, inputValue, isDecred ? _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x00]) : _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0), createVarint(input.script.length)]);
    await startUntrustedHashTransactionInputRaw(transport, newTransaction, false, data, bip143, overwinter, additionals);
    let scriptBlocks = [];
    let offset = 0;

    if (input.script.length === 0) {
      scriptBlocks.push(input.sequence);
    } else {
      while (offset !== input.script.length) {
        let blockSize = input.script.length - offset > MAX_SCRIPT_BLOCK ? MAX_SCRIPT_BLOCK : input.script.length - offset;

        if (offset + blockSize !== input.script.length) {
          scriptBlocks.push(input.script.slice(offset, offset + blockSize));
        } else {
          scriptBlocks.push(_lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([input.script.slice(offset, offset + blockSize), input.sequence]));
        }

        offset += blockSize;
      }
    }

    for (let scriptBlock of scriptBlocks) {
      await startUntrustedHashTransactionInputRaw(transport, newTransaction, false, scriptBlock, bip143, overwinter, additionals);
    }

    i++;
  }
}

function compressPublicKey(publicKey) {
  const prefix = (publicKey[64] & 1) !== 0 ? 0x03 : 0x02;
  const prefixBuffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(1);
  prefixBuffer[0] = prefix;
  return _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([prefixBuffer, publicKey.slice(1, 1 + 32)]);
}

function signTransaction(transport, path, lockTime, sigHashType, expiryHeight, additionals = []) {
  const isDecred = additionals.includes("decred");
  const pathsBuffer = bip32asBuffer(path);
  const lockTimeBuffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(4);
  lockTimeBuffer.writeUInt32BE(lockTime, 0);
  let buffer = isDecred ? _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([pathsBuffer, lockTimeBuffer, expiryHeight || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x00, 0x00, 0x00, 0x00]), _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([sigHashType])]) : _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([pathsBuffer, _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x00]), lockTimeBuffer, _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([sigHashType])]);

  if (expiryHeight && !isDecred) {
    buffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([buffer, expiryHeight]);
  }

  return transport.send(0xe0, 0x48, 0x00, 0x00, buffer).then(result => {
    if (result.length > 0) {
      result[0] = 0x30;
      return result.slice(0, result.length - 2);
    }

    return result;
  });
}

function provideOutputFullChangePath(transport, path) {
  let buffer = bip32asBuffer(path);
  return transport.send(0xe0, 0x4a, 0xff, 0x00, buffer);
}
async function hashOutputFull(transport, outputScript, additionals = []) {
  let offset = 0;
  let p1 = 0x80;
  const isDecred = additionals.includes("decred"); ///WARNING: Decred works only with one call (without chunking)
  //TODO: test without this for Decred

  if (isDecred) {
    return transport.send(0xe0, 0x4a, p1, 0x00, outputScript);
  }

  while (offset < outputScript.length) {
    let blockSize = offset + MAX_SCRIPT_BLOCK >= outputScript.length ? outputScript.length - offset : MAX_SCRIPT_BLOCK;
    let p1 = offset + blockSize === outputScript.length ? 0x80 : 0x00;
    let data = outputScript.slice(offset, offset + blockSize);
    await transport.send(0xe0, 0x4a, p1, 0x00, data);
    offset += blockSize;
  }
}
//# sourceMappingURL=finalizeInput.js.map

const getAppAndVersion = async (transport) => {
  const r = await transport.send(0xb0, 0x01, 0x00, 0x00);
  let i = 0;
  const format = r[i++];
  browser(format === 1, "getAppAndVersion: format not supported");
  const nameLength = r[i++];
  const name = r.slice(i, i += nameLength).toString("ascii");
  const versionLength = r[i++];
  const version = r.slice(i, i += versionLength).toString("ascii");
  const flagLength = r[i++];
  const flags = r.slice(i, i += flagLength);
  return {
    name,
    version,
    flags
  };
};

function shouldUseTrustedInputForSegwit({
  version,
  name
}) {
  if (name === "Decred") return false;
  if (name === "Exchange") return true;
  return _lazy_chunk_index_es3_js__WEBPACK_IMPORTED_MODULE_4__["s"].gte(version, "1.4.0");
}

const defaultsSignTransaction = {
  lockTime: DEFAULT_LOCKTIME,
  sigHashType: SIGHASH_ALL,
  segwit: false,
  additionals: [],
  onDeviceStreaming: _e => {},
  onDeviceSignatureGranted: () => {},
  onDeviceSignatureRequested: () => {}
};
/**
 *
 */

async function createTransaction(transport, arg) {
  let {
    inputs,
    associatedKeysets,
    changePath,
    outputScriptHex,
    lockTime,
    sigHashType,
    segwit,
    initialTimestamp,
    additionals,
    expiryHeight,
    useTrustedInputForSegwit,
    onDeviceStreaming,
    onDeviceSignatureGranted,
    onDeviceSignatureRequested
  } = { ...defaultsSignTransaction,
    ...arg
  };

  if (useTrustedInputForSegwit === undefined) {
    try {
      const a = await getAppAndVersion(transport);
      useTrustedInputForSegwit = shouldUseTrustedInputForSegwit(a);
    } catch (e) {
      if (e.statusCode === 0x6d00) {
        useTrustedInputForSegwit = false;
      } else {
        throw e;
      }
    }
  } // loop: 0 or 1 (before and after)
  // i: index of the input being streamed
  // i goes on 0...n, inluding n. in order for the progress value to go to 1
  // we normalize the 2 loops to make a global percentage


  const notify = (loop, i) => {
    const {
      length
    } = inputs;
    if (length < 3) return; // there is not enough significant event to worth notifying (aka just use a spinner)

    const index = length * loop + i;
    const total = 2 * length;
    const progress = index / total;
    onDeviceStreaming({
      progress,
      total,
      index
    });
  };

  const isDecred = additionals.includes("decred");
  const isXST = additionals.includes("stealthcoin");
  let startTime = Date.now();
  const sapling = additionals.includes("sapling");
  const bech32 = segwit && additionals.includes("bech32");
  let useBip143 = segwit || !!additionals && (additionals.includes("abc") || additionals.includes("gold") || additionals.includes("bip143")) || !!expiryHeight && !isDecred; // Inputs are provided as arrays of [transaction, output_index, optional redeem script, optional sequence]
  // associatedKeysets are provided as arrays of [path]

  const nullScript = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);
  const nullPrevout = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);
  const defaultVersion = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(4);
  !!expiryHeight && !isDecred ? defaultVersion.writeUInt32LE(sapling ? 0x80000004 : 0x80000003, 0) : isXST ? defaultVersion.writeUInt32LE(2, 0) : defaultVersion.writeUInt32LE(1, 0); // Default version to 2 for XST not to have timestamp

  const trustedInputs = [];
  const regularOutputs = [];
  const signatures = [];
  const publicKeys = [];
  let firstRun = true;
  const targetTransaction = {
    inputs: [],
    version: defaultVersion,
    timestamp: _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0)
  };
  const getTrustedInputCall = useBip143 && !useTrustedInputForSegwit ? getTrustedInputBIP143 : getTrustedInput;
  const outputScript = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(outputScriptHex, "hex");
  notify(0, 0); // first pass on inputs to get trusted inputs

  for (let input of inputs) {
    {
      const trustedInput = await getTrustedInputCall(transport, input[1], input[0], additionals);
      Object(_lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["l"])("hw", "got trustedInput=" + trustedInput);
      let sequence = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(4);
      sequence.writeUInt32LE(input.length >= 4 && typeof input[3] === "number" ? input[3] : DEFAULT_SEQUENCE, 0);
      trustedInputs.push({
        trustedInput: true,
        value: _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(trustedInput, "hex"),
        sequence
      });
    }

    const {
      outputs
    } = input[0];
    const index = input[1];

    if (outputs && index <= outputs.length - 1) {
      regularOutputs.push(outputs[index]);
    }

    if (expiryHeight && !isDecred) {
      targetTransaction.nVersionGroupId = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(sapling ? [0x85, 0x20, 0x2f, 0x89] : [0x70, 0x82, 0xc4, 0x03]);
      targetTransaction.nExpiryHeight = expiryHeight; // For sapling : valueBalance (8), nShieldedSpend (1), nShieldedOutput (1), nJoinSplit (1)
      // Overwinter : use nJoinSplit (1)

      targetTransaction.extraData = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(sapling ? [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] : [0x00]);
    } else if (isDecred) {
      targetTransaction.nExpiryHeight = expiryHeight;
    }
  }

  targetTransaction.inputs = inputs.map(input => {
    let sequence = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(4);
    sequence.writeUInt32LE(input.length >= 4 && typeof input[3] === "number" ? input[3] : DEFAULT_SEQUENCE, 0);
    return {
      script: nullScript,
      prevout: nullPrevout,
      sequence
    };
  });

  {
    // Collect public keys
    const result = [];

    for (let i = 0; i < inputs.length; i++) {
      const r = await getWalletPublicKey(transport, {
        path: associatedKeysets[i]
      });
      notify(0, i + 1);
      result.push(r);
    }

    for (let i = 0; i < result.length; i++) {
      publicKeys.push(compressPublicKey(_lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(result[i].publicKey, "hex")));
    }
  }

  if (initialTimestamp !== undefined) {
    targetTransaction.timestamp = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(4);
    targetTransaction.timestamp.writeUInt32LE(Math.floor(initialTimestamp + (Date.now() - startTime) / 1000), 0);
  }

  onDeviceSignatureRequested();

  if (useBip143) {
    // Do the first run with all inputs
    await startUntrustedHashTransactionInput(transport, true, targetTransaction, trustedInputs, true, !!expiryHeight, additionals, useTrustedInputForSegwit);

    if (changePath) {
      await provideOutputFullChangePath(transport, changePath);
    }

    await hashOutputFull(transport, outputScript);
  }

  if (!!expiryHeight && !isDecred) {
    await signTransaction(transport, "", lockTime, SIGHASH_ALL, expiryHeight);
  } // Do the second run with the individual transaction


  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    let script = inputs[i].length >= 3 && typeof input[2] === "string" ? _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(input[2], "hex") : !segwit ? regularOutputs[i].script : _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([_lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([OP_DUP, OP_HASH160, HASH_SIZE]), hashPublicKey(publicKeys[i]), _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([OP_EQUALVERIFY, OP_CHECKSIG])]);
    let pseudoTX = Object.assign({}, targetTransaction);
    let pseudoTrustedInputs = useBip143 ? [trustedInputs[i]] : trustedInputs;

    if (useBip143) {
      pseudoTX.inputs = [{ ...pseudoTX.inputs[i],
        script
      }];
    } else {
      pseudoTX.inputs[i].script = script;
    }

    await startUntrustedHashTransactionInput(transport, !useBip143 && firstRun, pseudoTX, pseudoTrustedInputs, useBip143, !!expiryHeight && !isDecred, additionals, useTrustedInputForSegwit);

    if (!useBip143) {
      if (changePath) {
        await provideOutputFullChangePath(transport, changePath);
      }

      await hashOutputFull(transport, outputScript, additionals);
    }

    if (firstRun) {
      onDeviceSignatureGranted();
      notify(1, 0);
    }

    const signature = await signTransaction(transport, associatedKeysets[i], lockTime, sigHashType, expiryHeight, additionals);
    notify(1, i + 1);
    signatures.push(signature);
    targetTransaction.inputs[i].script = nullScript;

    if (firstRun) {
      firstRun = false;
    }
  } // Populate the final input scripts


  for (let i = 0; i < inputs.length; i++) {
    if (segwit) {
      targetTransaction.witness = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);

      if (!bech32) {
        targetTransaction.inputs[i].script = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([_lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from("160014", "hex"), hashPublicKey(publicKeys[i])]);
      }
    } else {
      const signatureSize = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(1);
      const keySize = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(1);
      signatureSize[0] = signatures[i].length;
      keySize[0] = publicKeys[i].length;
      targetTransaction.inputs[i].script = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([signatureSize, signatures[i], keySize, publicKeys[i]]);
    }

    let offset = useBip143 && !useTrustedInputForSegwit ? 0 : 4;
    targetTransaction.inputs[i].prevout = trustedInputs[i].value.slice(offset, offset + 0x24);
  }

  const lockTimeBuffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(4);
  lockTimeBuffer.writeUInt32LE(lockTime, 0);
  var result = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([serializeTransaction(targetTransaction, false, targetTransaction.timestamp, additionals), outputScript]);

  if (segwit && !isDecred) {
    var witness = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);

    for (var i = 0; i < inputs.length; i++) {
      var tmpScriptData = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([_lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from("02", "hex"), _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([signatures[i].length]), signatures[i], _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([publicKeys[i].length]), publicKeys[i]]);
      witness = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([witness, tmpScriptData]);
    }

    result = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([result, witness]);
  } // FIXME: In ZEC or KMD sapling lockTime is serialized before expiryHeight.
  // expiryHeight is used only in overwinter/sapling so I moved lockTimeBuffer here
  // and it should not break other coins because expiryHeight is false for them.
  // Don't know about Decred though.


  result = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([result, lockTimeBuffer]);

  if (expiryHeight) {
    result = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([result, targetTransaction.nExpiryHeight || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0), targetTransaction.extraData || _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0)]);
  }

  if (isDecred) {
    let decredWitness = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([targetTransaction.inputs.length]);
    inputs.forEach((input, inputIndex) => {
      decredWitness = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([decredWitness, _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0x00, 0x00, 0x00, 0x00]), //Block height
      _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([0xff, 0xff, 0xff, 0xff]), //Block index
      _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from([targetTransaction.inputs[inputIndex].script.length]), targetTransaction.inputs[inputIndex].script]);
    });
    result = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([result, decredWitness]);
  }

  return result.toString("hex");
}

const defaultArg = {
  lockTime: DEFAULT_LOCKTIME,
  sigHashType: SIGHASH_ALL,
  segwit: false,
  transactionVersion: DEFAULT_VERSION
};
/**
 *
 */

async function signP2SHTransaction(transport, arg) {
  const {
    inputs,
    associatedKeysets,
    outputScriptHex,
    lockTime,
    sigHashType,
    segwit,
    transactionVersion
  } = { ...defaultArg,
    ...arg
  }; // Inputs are provided as arrays of [transaction, output_index, redeem script, optional sequence]
  // associatedKeysets are provided as arrays of [path]

  const nullScript = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);
  const nullPrevout = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0);
  const defaultVersion = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(4);
  defaultVersion.writeUInt32LE(transactionVersion, 0);
  const trustedInputs = [];
  const regularOutputs = [];
  const signatures = [];
  let firstRun = true;
  let targetTransaction = {
    inputs: [],
    version: defaultVersion
  };
  const getTrustedInputCall = segwit ? getTrustedInputBIP143 : getTrustedInput;
  const outputScript = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(outputScriptHex, "hex");

  for (let input of inputs) {
    {
      const trustedInput = await getTrustedInputCall(transport, input[1], input[0]);
      let sequence = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(4);
      sequence.writeUInt32LE(input.length >= 4 && typeof input[3] === "number" ? input[3] : DEFAULT_SEQUENCE, 0);
      trustedInputs.push({
        trustedInput: false,
        value: segwit ? _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(trustedInput, "hex") : _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(trustedInput, "hex").slice(4, 4 + 0x24),
        sequence
      });
    }

    const {
      outputs
    } = input[0];
    const index = input[1];

    if (outputs && index <= outputs.length - 1) {
      regularOutputs.push(outputs[index]);
    }
  } // Pre-build the target transaction


  for (let i = 0; i < inputs.length; i++) {
    let sequence = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(4);
    sequence.writeUInt32LE(inputs[i].length >= 4 && typeof inputs[i][3] === "number" ? inputs[i][3] : DEFAULT_SEQUENCE, 0);
    targetTransaction.inputs.push({
      script: nullScript,
      prevout: nullPrevout,
      sequence
    });
  }

  if (segwit) {
    await startUntrustedHashTransactionInput(transport, true, targetTransaction, trustedInputs, true);
    await hashOutputFull(transport, outputScript);
  }

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    let script = inputs[i].length >= 3 && typeof input[2] === "string" ? _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(input[2], "hex") : regularOutputs[i].script;
    let pseudoTX = Object.assign({}, targetTransaction);
    let pseudoTrustedInputs = segwit ? [trustedInputs[i]] : trustedInputs;

    if (segwit) {
      pseudoTX.inputs = [{ ...pseudoTX.inputs[i],
        script
      }];
    } else {
      pseudoTX.inputs[i].script = script;
    }

    await startUntrustedHashTransactionInput(transport, !segwit && firstRun, pseudoTX, pseudoTrustedInputs, segwit);

    if (!segwit) {
      await hashOutputFull(transport, outputScript);
    }

    const signature = await signTransaction(transport, associatedKeysets[i], lockTime, sigHashType);
    signatures.push(segwit ? signature.toString("hex") : signature.slice(0, signature.length - 1).toString("hex"));
    targetTransaction.inputs[i].script = nullScript;

    if (firstRun) {
      firstRun = false;
    }
  }

  return signatures;
}

/**
 * Bitcoin API.
 *
 * @example
 * import Btc from "@ledgerhq/hw-app-btc";
 * const btc = new Btc(transport)
 */
class Btc {
  constructor(transport, scrambleKey = "BTC") {
    this.transport = void 0;
    this.transport = transport;
    transport.decorateAppAPIMethods(this, ["getWalletPublicKey", "signP2SHTransaction", "signMessageNew", "createPaymentTransactionNew", "getTrustedInput", "getTrustedInputBIP143"], scrambleKey);
  }
  /**
   * @param path a BIP 32 path
   * @param options an object with optional these fields:
   *
   * - verify (boolean) will ask user to confirm the address on the device
   *
   * - format ("legacy" | "p2sh" | "bech32" | "cashaddr") to use different bitcoin address formatter.
   *
   * NB The normal usage is to use:
   *
   * - legacy format with 44' paths
   *
   * - p2sh format with 49' paths
   *
   * - bech32 format with 173' paths
   *
   * - cashaddr in case of Bitcoin Cash
   *
   * @example
   * btc.getWalletPublicKey("44'/0'/0'/0/0").then(o => o.bitcoinAddress)
   * btc.getWalletPublicKey("49'/0'/0'/0/0", { format: "p2sh" }).then(o => o.bitcoinAddress)
   */


  getWalletPublicKey(path, opts) {
    let options;

    if (arguments.length > 2 || typeof opts === "boolean") {
      console.warn("btc.getWalletPublicKey deprecated signature used. Please switch to getWalletPublicKey(path, { format, verify })");
      options = {
        verify: !!opts,
        format: arguments[2] ? "p2sh" : "legacy"
      };
    } else {
      options = opts || {};
    }

    return getWalletPublicKey(this.transport, { ...options,
      path
    });
  }
  /**
   * You can sign a message according to the Bitcoin Signature format and retrieve v, r, s given the message and the BIP 32 path of the account to sign.
   * @example
   btc.signMessageNew_async("44'/60'/0'/0'/0", Buffer.from("test").toString("hex")).then(function(result) {
     var v = result['v'] + 27 + 4;
     var signature = Buffer.from(v.toString(16) + result['r'] + result['s'], 'hex').toString('base64');
     console.log("Signature : " + signature);
   }).catch(function(ex) {console.log(ex);});
   */


  signMessageNew(path, messageHex) {
    return signMessage(this.transport, {
      path,
      messageHex
    });
  }
  /**
   * To sign a transaction involving standard (P2PKH) inputs, call createTransaction with the following parameters
   * @param inputs is an array of [ transaction, output_index, optional redeem script, optional sequence ] where
   *
   * * transaction is the previously computed transaction object for this UTXO
   * * output_index is the output in the transaction used as input for this UTXO (counting from 0)
   * * redeem script is the optional redeem script to use when consuming a Segregated Witness input
   * * sequence is the sequence number to use for this input (when using RBF), or non present
   * @param associatedKeysets is an array of BIP 32 paths pointing to the path to the private key used for each UTXO
   * @param changePath is an optional BIP 32 path pointing to the path to the public key used to compute the change address
   * @param outputScriptHex is the hexadecimal serialized outputs of the transaction to sign
   * @param lockTime is the optional lockTime of the transaction to sign, or default (0)
   * @param sigHashType is the hash type of the transaction to sign, or default (all)
   * @param segwit is an optional boolean indicating wether to use segwit or not
   * @param initialTimestamp is an optional timestamp of the function call to use for coins that necessitate timestamps only, (not the one that the tx will include)
   * @param additionals list of additionnal options
   *
   * - "bech32" for spending native segwit outputs
   * - "abc" for bch
   * - "gold" for btg
   * - "bipxxx" for using BIPxxx
   * - "sapling" to indicate a zec transaction is supporting sapling (to be set over block 419200)
   * @param expiryHeight is an optional Buffer for zec overwinter / sapling Txs
   * @param useTrustedInputForSegwit trust inputs for segwit transactions
   * @return the signed transaction ready to be broadcast
   * @example
  btc.createTransaction({
   inputs: [ [tx1, 1] ],
   associatedKeysets: ["0'/0/0"],
   outputScriptHex: "01905f0100000000001976a91472a5d75c8d2d0565b656a5232703b167d50d5a2b88ac"
  }).then(res => ...);
   */


  createPaymentTransactionNew(arg) {
    if (arguments.length > 1) {
      console.warn("@ledgerhq/hw-app-btc: createPaymentTransactionNew multi argument signature is deprecated. please switch to named parameters.");
      arg = fromDeprecateArguments(arguments, ["inputs", "associatedKeysets", "changePath", "outputScriptHex", "lockTime", "sigHashType", "segwit", "initialTimestamp", "additionals", "expiryHeight", "useTrustedInputForSegwit"]);
    }

    return createTransaction(this.transport, arg);
  }
  /**
   * To obtain the signature of multisignature (P2SH) inputs, call signP2SHTransaction_async with the folowing parameters
   * @param inputs is an array of [ transaction, output_index, redeem script, optional sequence ] where
   * * transaction is the previously computed transaction object for this UTXO
   * * output_index is the output in the transaction used as input for this UTXO (counting from 0)
   * * redeem script is the mandatory redeem script associated to the current P2SH input
   * * sequence is the sequence number to use for this input (when using RBF), or non present
   * @param associatedKeysets is an array of BIP 32 paths pointing to the path to the private key used for each UTXO
   * @param outputScriptHex is the hexadecimal serialized outputs of the transaction to sign
   * @param lockTime is the optional lockTime of the transaction to sign, or default (0)
   * @param sigHashType is the hash type of the transaction to sign, or default (all)
   * @return the signed transaction ready to be broadcast
   * @example
  btc.signP2SHTransaction({
  inputs: [ [tx, 1, "52210289b4a3ad52a919abd2bdd6920d8a6879b1e788c38aa76f0440a6f32a9f1996d02103a3393b1439d1693b063482c04bd40142db97bdf139eedd1b51ffb7070a37eac321030b9a409a1e476b0d5d17b804fcdb81cf30f9b99c6f3ae1178206e08bc500639853ae"] ],
  associatedKeysets: ["0'/0/0"],
  outputScriptHex: "01905f0100000000001976a91472a5d75c8d2d0565b656a5232703b167d50d5a2b88ac"
  }).then(result => ...);
   */


  signP2SHTransaction(arg) {
    if (arguments.length > 1) {
      console.warn("@ledgerhq/hw-app-btc: signP2SHTransaction multi argument signature is deprecated. please switch to named parameters.");
      const [inputs, associatedKeysets, outputScriptHex, lockTime, sigHashType, segwit, transactionVersion] = arguments;
      arg = {
        inputs,
        associatedKeysets,
        outputScriptHex,
        lockTime,
        sigHashType,
        segwit,
        transactionVersion
      };
      arg = fromDeprecateArguments(arguments, ["inputs", "associatedKeysets", "outputScriptHex", "lockTime", "sigHashType", "segwit", "transactionVersion"]);
    }

    return signP2SHTransaction(this.transport, arg);
  }
  /**
   * For each UTXO included in your transaction, create a transaction object from the raw serialized version of the transaction used in this UTXO.
   * @example
  const tx1 = btc.splitTransaction("01000000014ea60aeac5252c14291d428915bd7ccd1bfc4af009f4d4dc57ae597ed0420b71010000008a47304402201f36a12c240dbf9e566bc04321050b1984cd6eaf6caee8f02bb0bfec08e3354b022012ee2aeadcbbfd1e92959f57c15c1c6debb757b798451b104665aa3010569b49014104090b15bde569386734abf2a2b99f9ca6a50656627e77de663ca7325702769986cf26cc9dd7fdea0af432c8e2becc867c932e1b9dd742f2a108997c2252e2bdebffffffff0281b72e00000000001976a91472a5d75c8d2d0565b656a5232703b167d50d5a2b88aca0860100000000001976a9144533f5fb9b4817f713c48f0bfe96b9f50c476c9b88ac00000000");
   */


  splitTransaction(transactionHex, isSegwitSupported = false, hasTimestamp = false, hasExtraData = false, additionals = []) {
    return splitTransaction(transactionHex, isSegwitSupported, hasTimestamp, hasExtraData, additionals);
  }
  /**
  @example
  const tx1 = btc.splitTransaction("01000000014ea60aeac5252c14291d428915bd7ccd1bfc4af009f4d4dc57ae597ed0420b71010000008a47304402201f36a12c240dbf9e566bc04321050b1984cd6eaf6caee8f02bb0bfec08e3354b022012ee2aeadcbbfd1e92959f57c15c1c6debb757b798451b104665aa3010569b49014104090b15bde569386734abf2a2b99f9ca6a50656627e77de663ca7325702769986cf26cc9dd7fdea0af432c8e2becc867c932e1b9dd742f2a108997c2252e2bdebffffffff0281b72e00000000001976a91472a5d75c8d2d0565b656a5232703b167d50d5a2b88aca0860100000000001976a9144533f5fb9b4817f713c48f0bfe96b9f50c476c9b88ac00000000");
  const outputScript = btc.serializeTransactionOutputs(tx1).toString('hex');
  */


  serializeTransactionOutputs(t) {
    return serializeTransactionOutputs(t);
  }

  getTrustedInput(indexLookup, transaction, additionals = []) {
    return getTrustedInput(this.transport, indexLookup, transaction, additionals);
  }

  getTrustedInputBIP143(indexLookup, transaction, additionals = []) {
    return getTrustedInputBIP143(this.transport, indexLookup, transaction, additionals);
  }

}

function fromDeprecateArguments(args, keys) {
  const obj = {};
  keys.forEach((key, i) => {
    const value = args[i];

    if (value !== undefined) {
      obj[key] = value;
    }
  });
  return obj;
}
//# sourceMappingURL=Btc.js.map

/* harmony default export */ __webpack_exports__["default"] = (Btc);
//# sourceMappingURL=lazy-chunk-Btc.es.js.map


/***/ })

}]);
//# sourceMappingURL=26-legacy.js.map