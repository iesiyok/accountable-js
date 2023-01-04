(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[27],{

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-TransportWebAuthn.es.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-TransportWebAuthn.es.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-polyfill-node:buffer.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-polyfill-node:buffer.es.js");
/* harmony import */ var _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lazy-chunk-index.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es.js");
/* harmony import */ var _lazy_chunk_events_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-chunk-events.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-events.es.js");




var wrapApdu_1 = wrapApdu;

function wrapApdu(apdu, key) {
  if (apdu.length === 0) return apdu;
  const result = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(apdu.length);

  for (let i = 0; i < apdu.length; i++) {
    result[i] = apdu[i] ^ key[i % key.length];
  }

  return result;
}

const attemptExchange = (apdu, timeout, scrambleKey) => {
  if (!scrambleKey) {
    throw new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["a"]("transport.setScrambleKey must be used to set a scramble key. Refer to documentation.", "NoScrambleKey");
  }

  if (!navigator.credentials) {
    throw new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["a"]("WebAuthn not supported", "NotSupported");
  }

  return navigator.credentials // $FlowFixMe
  .get({
    publicKey: {
      timeout,
      challenge: new Uint8Array(32),
      allowCredentials: [{
        type: "public-key",
        id: new Uint8Array(wrapApdu_1(apdu, scrambleKey))
      }]
    }
  }) // $FlowFixMe
  .then(r => _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(r.response.signature));
};
/**
 * WebAuthn Transport implementation
 * @example
 * import TransportWebAuthn from "@ledgerhq/hw-transport-webauthn";
 * ...
 * TransportWebAuthn.create().then(transport => ...)
 */


class TransportWebAuthn extends _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["T"] {
  constructor(...args) {
    super(...args);
    this.scrambleKey = void 0;
  }

  static async open() {
    return new TransportWebAuthn();
  }
  /**
   * Exchange with the device using APDU protocol.
   * @param apdu
   * @returns a promise of apdu response
   */


  async exchange(apdu) {
    Object(_lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["l"])("apdu", "=> " + apdu.toString("hex"));
    const res = await attemptExchange(apdu, this.exchangeTimeout, this.scrambleKey);
    Object(_lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["l"])("apdu", "<= " + res.toString("hex"));
    return res;
  }
  /**
   * A scramble key is a string that xor the data exchanged.
   * It depends on the device app you need to exchange with.
   * For instance it can be "BTC" for the bitcoin app, "B0L0S" for the dashboard.
   *
   * @example
   * transport.setScrambleKey("B0L0S")
   */


  setScrambleKey(scrambleKey) {
    this.scrambleKey = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(scrambleKey, "ascii");
  }

  close() {
    return Promise.resolve();
  }

}

TransportWebAuthn.isSupported = () => Promise.resolve(!!navigator.credentials);

TransportWebAuthn.list = () => navigator.credentials ? [null] : [];

TransportWebAuthn.listen = observer => {
  setTimeout(() => {
    if (!navigator.credentials) {
      observer.error(new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["a"]("WebAuthn not supported", "NotSupported"));
      return {
        unsubscribe: () => {}
      };
    }

    observer.next({
      type: "add",
      descriptor: null
    });
    observer.complete();
  }, 0);
  return {
    unsubscribe: () => {}
  };
};

/* harmony default export */ __webpack_exports__["default"] = (TransportWebAuthn);
//# sourceMappingURL=lazy-chunk-TransportWebAuthn.es.js.map


/***/ })

}]);
//# sourceMappingURL=27-legacy.js.map