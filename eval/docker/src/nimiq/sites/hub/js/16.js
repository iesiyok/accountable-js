(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-TransportWebHID.es.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-TransportWebHID.es.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-polyfill-node:buffer.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-polyfill-node:buffer.es.js");
/* harmony import */ var _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lazy-chunk-index.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es.js");
/* harmony import */ var _lazy_chunk_hid_framing_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-chunk-hid-framing.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-hid-framing.es.js");
/* harmony import */ var _lazy_chunk_index_es2_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lazy-chunk-index.es2.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es2.js");
/* harmony import */ var _lazy_chunk_events_es_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lazy-chunk-events.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-events.es.js");
/* harmony import */ var _lazy_chunk_commonjsHelpers_es_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lazy-chunk-_commonjsHelpers.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-_commonjsHelpers.es.js");
/* harmony import */ var _lazy_chunk_index_es3_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lazy-chunk-index.es3.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es3.js");
/* harmony import */ var _lazy_chunk_polyfill_node_process_es_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lazy-chunk-polyfill-node:process.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-polyfill-node:process.es.js");









const ledgerDevices = [{
  vendorId: _lazy_chunk_index_es2_js__WEBPACK_IMPORTED_MODULE_3__["l"]
}];

const isSupported = () => Promise.resolve(!!(_lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["g"].navigator && _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["g"].navigator.hid));

const getHID = () => {
  // $FlowFixMe
  const {
    hid
  } = navigator;
  if (!hid) throw new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["a"]("navigator.hid is not supported", "HIDNotSupported");
  return hid;
};

async function requestLedgerDevices() {
  const device = await getHID().requestDevice({
    filters: ledgerDevices
  });
  if (Array.isArray(device)) return device;
  return [device];
}

async function getLedgerDevices() {
  const devices = await getHID().getDevices();
  return devices.filter(d => d.vendorId === _lazy_chunk_index_es2_js__WEBPACK_IMPORTED_MODULE_3__["l"]);
}

async function getFirstLedgerDevice() {
  const existingDevices = await getLedgerDevices();
  if (existingDevices.length > 0) return existingDevices[0];
  const devices = await requestLedgerDevices();
  return devices[0];
}
/**
 * WebHID Transport implementation
 * @example
 * import TransportWebHID from "@ledgerhq/hw-transport-webhid";
 * ...
 * TransportWebHID.create().then(transport => ...)
 */


class TransportWebHID extends _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["T"] {
  constructor(device) {
    super();
    this.device = void 0;
    this.deviceModel = void 0;
    this.channel = Math.floor(Math.random() * 0xffff);
    this.packetSize = 64;
    this.inputs = [];
    this.inputCallback = void 0;

    this.read = () => {
      if (this.inputs.length) {
        return Promise.resolve(this.inputs.shift());
      }

      return new Promise(success => {
        this.inputCallback = success;
      });
    };

    this.onInputReport = e => {
      const buffer = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].from(e.data.buffer);

      if (this.inputCallback) {
        this.inputCallback(buffer);
        this.inputCallback = null;
      } else {
        this.inputs.push(buffer);
      }
    };

    this._disconnectEmitted = false;

    this._emitDisconnect = e => {
      if (this._disconnectEmitted) return;
      this._disconnectEmitted = true;
      this.emit("disconnect", e);
    };

    this.exchange = apdu => this.exchangeAtomicImpl(async () => {
      const {
        channel,
        packetSize
      } = this;
      Object(_lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["l"])("apdu", "=> " + apdu.toString("hex"));
      const framing = Object(_lazy_chunk_hid_framing_es_js__WEBPACK_IMPORTED_MODULE_2__["h"])(channel, packetSize); // Write...

      const blocks = framing.makeBlocks(apdu);

      for (let i = 0; i < blocks.length; i++) {
        await this.device.sendReport(0, blocks[i]);
      } // Read...


      let result;
      let acc;

      while (!(result = framing.getReducedResult(acc))) {
        const buffer = await this.read();
        acc = framing.reduceResponse(acc, buffer);
      }

      Object(_lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["l"])("apdu", "<= " + result.toString("hex"));
      return result;
    }).catch(e => {
      if (e && e.message && e.message.includes("write")) {
        this._emitDisconnect(e);

        throw new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["D"](e.message);
      }

      throw e;
    });

    this.device = device;
    this.deviceModel = Object(_lazy_chunk_index_es2_js__WEBPACK_IMPORTED_MODULE_3__["i"])(device.productId);
    device.addEventListener("inputreport", this.onInputReport);
  }

  /**
   * Similar to create() except it will always display the device permission (even if some devices are already accepted).
   */
  static async request() {
    const [device] = await requestLedgerDevices();
    return TransportWebHID.open(device);
  }
  /**
   * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
   */


  static async openConnected() {
    const devices = await getLedgerDevices();
    if (devices.length === 0) return null;
    return TransportWebHID.open(devices[0]);
  }
  /**
   * Create a Ledger transport with a HIDDevice
   */


  static async open(device) {
    await device.open();
    const transport = new TransportWebHID(device);

    const onDisconnect = e => {
      if (device === e.device) {
        getHID().removeEventListener("disconnect", onDisconnect);

        transport._emitDisconnect(new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["b"]());
      }
    };

    getHID().addEventListener("disconnect", onDisconnect);
    return transport;
  }

  /**
   * Release the transport device
   */
  async close() {
    await this.exchangeBusyPromise;
    this.device.removeEventListener("inputreport", this.onInputReport);
    await this.device.close();
  }
  /**
   * Exchange with the device using APDU protocol.
   * @param apdu
   * @returns a promise of apdu response
   */


  setScrambleKey() {}

}
TransportWebHID.isSupported = isSupported;
TransportWebHID.list = getLedgerDevices;

TransportWebHID.listen = observer => {
  let unsubscribed = false;
  getFirstLedgerDevice().then(device => {
    if (!device) {
      observer.error(new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["c"]("Access denied to use Ledger device"));
    } else if (!unsubscribed) {
      const deviceModel = Object(_lazy_chunk_index_es2_js__WEBPACK_IMPORTED_MODULE_3__["i"])(device.productId);
      observer.next({
        type: "add",
        descriptor: device,
        deviceModel
      });
      observer.complete();
    }
  }, error => {
    observer.error(new _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["c"](error.message));
  });

  function unsubscribe() {
    unsubscribed = true;
  }

  return {
    unsubscribe
  };
};

/* harmony default export */ __webpack_exports__["default"] = (TransportWebHID);
//# sourceMappingURL=lazy-chunk-TransportWebHID.es.js.map


/***/ }),

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-hid-framing.es.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-hid-framing.es.js ***!
  \*****************************************************************************************/
/*! exports provided: h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hidFraming$1; });
/* harmony import */ var _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-polyfill-node:buffer.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-polyfill-node:buffer.es.js");
/* harmony import */ var _lazy_chunk_commonjsHelpers_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lazy-chunk-_commonjsHelpers.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-_commonjsHelpers.es.js");
/* harmony import */ var _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-chunk-index.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es.js");
/* harmony import */ var _lazy_chunk_index_es2_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lazy-chunk-index.es2.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es2.js");





var hidFraming = Object(_lazy_chunk_commonjsHelpers_es_js__WEBPACK_IMPORTED_MODULE_1__["c"])(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



const Tag = 0x05;

function asUInt16BE(value) {
  const b = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(2);
  b.writeUInt16BE(value, 0);
  return b;
}

const initialAcc = {
  data: _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(0),
  dataLength: 0,
  sequence: 0
};
/**
 *
 */

const createHIDframing = (channel, packetSize) => {
  return {
    makeBlocks(apdu) {
      let data = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([asUInt16BE(apdu.length), apdu]);
      const blockSize = packetSize - 5;
      const nbBlocks = Math.ceil(data.length / blockSize);
      data = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([data, // fill data with padding
      _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(nbBlocks * blockSize - data.length + 1).fill(0)]);
      const blocks = [];

      for (let i = 0; i < nbBlocks; i++) {
        const head = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].alloc(5);
        head.writeUInt16BE(channel, 0);
        head.writeUInt8(Tag, 2);
        head.writeUInt16BE(i, 3);
        const chunk = data.slice(i * blockSize, (i + 1) * blockSize);
        blocks.push(_lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([head, chunk]));
      }

      return blocks;
    },

    reduceResponse(acc, chunk) {
      let {
        data,
        dataLength,
        sequence
      } = acc || initialAcc;

      if (chunk.readUInt16BE(0) !== channel) {
        throw new _lazy_chunk_index_es2_js__WEBPACK_IMPORTED_MODULE_3__["_"].TransportError("Invalid channel", "InvalidChannel");
      }

      if (chunk.readUInt8(2) !== Tag) {
        throw new _lazy_chunk_index_es2_js__WEBPACK_IMPORTED_MODULE_3__["_"].TransportError("Invalid tag", "InvalidTag");
      }

      if (chunk.readUInt16BE(3) !== sequence) {
        throw new _lazy_chunk_index_es2_js__WEBPACK_IMPORTED_MODULE_3__["_"].TransportError("Invalid sequence", "InvalidSequence");
      }

      if (!acc) {
        dataLength = chunk.readUInt16BE(5);
      }

      sequence++;
      const chunkData = chunk.slice(acc ? 5 : 7);
      data = _lazy_chunk_polyfill_node_buffer_es_js__WEBPACK_IMPORTED_MODULE_0__["B"].concat([data, chunkData]);

      if (data.length > dataLength) {
        data = data.slice(0, dataLength);
      }

      return {
        data,
        dataLength,
        sequence
      };
    },

    getReducedResult(acc) {
      if (acc && acc.dataLength === acc.data.length) {
        return acc.data;
      }
    }

  };
};

var _default = createHIDframing;
exports.default = _default;

});

var hidFraming$1 = /*@__PURE__*/Object(_lazy_chunk_commonjsHelpers_es_js__WEBPACK_IMPORTED_MODULE_1__["g"])(hidFraming);


//# sourceMappingURL=lazy-chunk-hid-framing.es.js.map


/***/ }),

/***/ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es2.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es2.js ***!
  \************************************************************************************/
/*! exports provided: _, a, g, i, l */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_", function() { return _errors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getInfosForServiceUuid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getBluetoothServiceUuids; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return identifyUSBProductId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return ledgerUSBVendorId; });
/* harmony import */ var _lazy_chunk_commonjsHelpers_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-chunk-_commonjsHelpers.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-_commonjsHelpers.es.js");
/* harmony import */ var _lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lazy-chunk-index.es.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es.js");
/* harmony import */ var _lazy_chunk_index_es3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-chunk-index.es3.js */ "./node_modules/@nimiq/ledger-api/dist/high-level-api/lazy-chunk-index.es3.js");




var _errors = /*@__PURE__*/Object(_lazy_chunk_commonjsHelpers_es_js__WEBPACK_IMPORTED_MODULE_0__["a"])(_lazy_chunk_index_es_js__WEBPACK_IMPORTED_MODULE_1__["d"]);

const devices = {
  blue: {
    id: "blue",
    productName: "Ledger Blue",
    productIdMM: 0x00,
    legacyUsbProductId: 0x0000,
    usbOnly: true,
    memorySize: 480 * 1024,
    blockSize: 4 * 1024,
    getBlockSize: _firwareVersion => 4 * 1024
  },
  nanoS: {
    id: "nanoS",
    productName: "Ledger Nano S",
    productIdMM: 0x10,
    legacyUsbProductId: 0x0001,
    usbOnly: true,
    memorySize: 320 * 1024,
    blockSize: 4 * 1024,
    getBlockSize: firmwareVersion => _lazy_chunk_index_es3_js__WEBPACK_IMPORTED_MODULE_2__["s"].lt(_lazy_chunk_index_es3_js__WEBPACK_IMPORTED_MODULE_2__["s"].coerce(firmwareVersion), "2.0.0") ? 4 * 1024 : 2 * 1024
  },
  nanoX: {
    id: "nanoX",
    productName: "Ledger Nano X",
    productIdMM: 0x40,
    legacyUsbProductId: 0x0004,
    usbOnly: false,
    memorySize: 2 * 1024 * 1024,
    blockSize: 4 * 1024,
    getBlockSize: _firwareVersion => 4 * 1024,
    bluetoothSpec: [{
      // this is the legacy one (prototype version). we will eventually drop it.
      serviceUuid: "d973f2e0-b19e-11e2-9e96-0800200c9a66",
      notifyUuid: "d973f2e1-b19e-11e2-9e96-0800200c9a66",
      writeUuid: "d973f2e2-b19e-11e2-9e96-0800200c9a66"
    }, {
      serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
      notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
      writeUuid: "13d63400-2c97-0004-0002-4c6564676572"
    }]
  }
};

const devicesList = Object.values(devices);
/**
 *
 */

const ledgerUSBVendorId = 0x2c97;
/**
 *
 */

const identifyUSBProductId = usbProductId => {
  const legacy = devicesList.find(d => d.legacyUsbProductId === usbProductId);
  if (legacy) return legacy;
  const mm = usbProductId >> 8;
  const deviceModel = devicesList.find(d => d.productIdMM === mm);
  return deviceModel;
};
const bluetoothServices = [];
const serviceUuidToInfos = {};

for (let id in devices) {
  const deviceModel = devices[id];
  const {
    bluetoothSpec
  } = deviceModel;

  if (bluetoothSpec) {
    for (let i = 0; i < bluetoothSpec.length; i++) {
      const spec = bluetoothSpec[i];
      bluetoothServices.push(spec.serviceUuid);
      serviceUuidToInfos[spec.serviceUuid] = serviceUuidToInfos[spec.serviceUuid.replace(/-/g, "")] = {
        deviceModel,
        ...spec
      };
    }
  }
}
/**
 *
 */


const getBluetoothServiceUuids = () => bluetoothServices;
/**
 *
 */

const getInfosForServiceUuid = uuid => serviceUuidToInfos[uuid.toLowerCase()];
/**
 *
 */


//# sourceMappingURL=lazy-chunk-index.es2.js.map


/***/ })

}]);
//# sourceMappingURL=16.js.map