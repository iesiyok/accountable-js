(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-withStaticURLs.es.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-withStaticURLs.es.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-polyfill-node:buffer.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-polyfill-node:buffer.es.js");
/* harmony import */ var _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lazy-chunk-index.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es.js");
/* harmony import */ var _lazy_chunk_events_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-chunk-events.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-events.es.js");




// For avoiding bundling the unnecessary axios dependency in @ledgerhq/hw-transport-http, we use fetch instead and
// shim the required api parts of axios.
function axiosShim({ url, method, headers, data, }) {
    return fetch(url, {
        method,
        headers,
        body: data,
    });
}

/**
 * HTTP transport implementation
 */

class HttpTransport extends _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["T"] {
  // this transport is not discoverable
  static async open(url, timeout) {
    await HttpTransport.check(url, timeout);
    return new HttpTransport(url);
  }

  constructor(url) {
    super();
    this.url = void 0;
    this.url = url;
  }

  async exchange(apdu) {
    const apduHex = apdu.toString("hex");
    Object(_lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["l"])("apdu", "=> " + apduHex);
    const response = await axiosShim({
      method: "POST",
      url: this.url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        apduHex
      })
    });

    if (response.status !== 200) {
      throw new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["a"]("failed to communicate to server. code=" + response.status, "HttpTransportStatus" + response.status);
    }

    const body = await response.data;
    if (body.error) throw body.error;
    Object(_lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["l"])("apdu", "<= " + body.data);
    return _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(body.data, "hex");
  }

  setScrambleKey() {}

  close() {
    return Promise.resolve();
  }

}

HttpTransport.isSupported = () => Promise.resolve(typeof fetch === "function");

HttpTransport.list = () => Promise.resolve([]);

HttpTransport.listen = _observer => ({
  unsubscribe: () => {}
});

HttpTransport.check = async (url, timeout = 5000) => {
  const response = await axiosShim({
    url,
    timeout
  });

  if (response.status !== 200) {
    throw new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["a"]("failed to access HttpTransport(" + url + "): status " + response.status, "HttpTransportNotAccessible");
  }
};

const WebSocket = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["g"].WebSocket || __webpack_require__(/*! ws */ "./node_modules/ws/browser.js");
/**
 * WebSocket transport implementation
 */


class WebSocketTransport extends _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["T"] {
  // this transport is not discoverable
  static async open(url) {
    const exchangeMethods = await new Promise((resolve, reject) => {
      try {
        const socket = new WebSocket(url);
        const exchangeMethods = {
          resolveExchange: _b => {},
          rejectExchange: _e => {},
          onDisconnect: () => {},
          close: () => socket.close(),
          send: msg => socket.send(msg)
        };

        socket.onopen = () => {
          socket.send("open");
        };

        socket.onerror = e => {
          exchangeMethods.onDisconnect();
          reject(e);
        };

        socket.onclose = () => {
          exchangeMethods.onDisconnect();
          reject(new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["a"]("OpenFailed", "OpenFailed"));
        };

        socket.onmessage = e => {
          if (typeof e.data !== "string") return;
          const data = JSON.parse(e.data);

          switch (data.type) {
            case "opened":
              return resolve(exchangeMethods);

            case "error":
              reject(new Error(data.error));
              return exchangeMethods.rejectExchange(new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["a"](data.error, "WSError"));

            case "response":
              return exchangeMethods.resolveExchange(_lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(data.data, "hex"));
          }
        };
      } catch (e) {
        reject(e);
      }
    });
    return new WebSocketTransport(exchangeMethods);
  }

  constructor(hook) {
    super();
    this.hook = void 0;
    this.hook = hook;

    hook.onDisconnect = () => {
      this.emit("disconnect");
      this.hook.rejectExchange(new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["a"]("WebSocket disconnected", "WSDisconnect"));
    };
  }

  async exchange(apdu) {
    const hex = apdu.toString("hex");
    Object(_lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["l"])("apdu", "=> " + hex);
    const res = await new Promise((resolve, reject) => {
      this.hook.rejectExchange = e => reject(e);

      this.hook.resolveExchange = b => resolve(b);

      this.hook.send(hex);
    });
    Object(_lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["l"])("apdu", "<= " + res.toString("hex"));
    return res;
  }

  setScrambleKey() {}

  async close() {
    this.hook.close();
    return new Promise(success => {
      setTimeout(success, 200);
    });
  }

}

WebSocketTransport.isSupported = () => Promise.resolve(typeof WebSocket === "function");

WebSocketTransport.list = () => Promise.resolve([]);

WebSocketTransport.listen = _observer => ({
  unsubscribe: () => {}
});

WebSocketTransport.check = async (url, timeout = 5000) => new Promise((resolve, reject) => {
  const socket = new WebSocket(url);
  let success = false;
  setTimeout(() => {
    socket.close();
  }, timeout);

  socket.onopen = () => {
    success = true;
    socket.close();
  };

  socket.onclose = () => {
    if (success) resolve();else {
      reject(new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["a"]("failed to access WebSocketTransport(" + url + ")", "WebSocketTransportNotAccessible"));
    }
  };

  socket.onerror = () => {
    reject(new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["a"]("failed to access WebSocketTransport(" + url + "): error", "WebSocketTransportNotAccessible"));
  };
});

const getTransport = url => !url.startsWith("ws") ? HttpTransport : WebSocketTransport;

const inferURLs = async urls => {
  const r = await (typeof urls === "function" ? urls() : urls);
  return typeof r === "string" ? [r] : r;
};

var withStaticURLs = (urls => {
  class StaticTransport extends _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["T"] {}

  StaticTransport.isSupported = HttpTransport.isSupported;

  StaticTransport.list = () => inferURLs(urls).then(urls => Promise.all(urls.map(url => getTransport(url).check(url).then(() => [url]).catch(() => [])))).then(arrs => arrs.reduce((acc, a) => acc.concat(a), []));

  StaticTransport.listen = observer => {
    let unsubscribed = false;
    const seen = {};

    function checkLoop() {
      if (unsubscribed) return;
      inferURLs(urls).then(urls => Promise.all(urls.map(async url => {
        if (unsubscribed) return;

        try {
          await getTransport(url).check(url);
          if (unsubscribed) return;

          if (!seen[url]) {
            seen[url] = 1;
            observer.next({
              type: "add",
              descriptor: url
            });
          }
        } catch (e) {
          // nothing
          if (seen[url]) {
            delete seen[url];
            observer.next({
              type: "remove",
              descriptor: url
            });
          }
        }
      }))).then(() => new Promise(success => setTimeout(success, 5000))).then(checkLoop);
    }

    checkLoop();
    return {
      unsubscribe: () => {
        unsubscribed = true;
      }
    };
  };

  StaticTransport.open = url => getTransport(url).open(url);

  return StaticTransport;
});

/* harmony default export */ __webpack_exports__["default"] = (withStaticURLs);
//# sourceMappingURL=lazy-chunk-withStaticURLs.es.js.map


/***/ }),

/***/ "./node_modules/ws/browser.js":
/*!************************************!*\
  !*** ./node_modules/ws/browser.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function() {
  throw new Error(
    'ws does not work in the browser. Browser clients must use the native ' +
      'WebSocket object'
  );
};


/***/ })

}]);
//# sourceMappingURL=25.js.map