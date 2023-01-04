(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cookie-decoder"],{

/***/ "./src/lib/CookieDecoder.ts":
/*!**********************************!*\
  !*** ./src/lib/CookieDecoder.ts ***!
  \**********************************/
/*! exports provided: CookieDecoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieDecoder", function() { return CookieDecoder; });
/* harmony import */ var _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nimiq/utils */ "./node_modules/@nimiq/utils/dist/module/main.js");
/* harmony import */ var _CookieJar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CookieJar */ "./src/lib/CookieJar.ts");
/* harmony import */ var _lib_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/Constants */ "./src/lib/Constants.ts");
/* harmony import */ var _LabelingMachine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LabelingMachine */ "./src/lib/LabelingMachine.ts");
/* harmony import */ var _AddressUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AddressUtils */ "./src/lib/AddressUtils.ts");
/* harmony import */ var _bitcoin_Base58__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bitcoin/Base58 */ "./src/lib/bitcoin/Base58.ts");
// tslint:disable no-bitwise no-shadowed-variable






class CookieDecoder {
    static decode(str) {
        if (!str)
            return [];
        // Convert base64 str into byte array
        const bytes = Array.from(this.base64Decode(str));
        // Cookie version
        const version = this.readByte(bytes);
        if (version !== _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].VERSION)
            return this.legacyCookie(version, bytes);
        const wallets = [];
        while (bytes.length > 0) {
            wallets.push(this.decodeWallet(bytes));
        }
        return wallets;
    }
    static readByte(bytes) {
        const byte = bytes.shift();
        if (typeof byte === 'undefined')
            throw new Error('Malformed Cookie');
        return byte;
    }
    static readBytes(bytes, length) {
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(this.readByte(bytes));
        }
        return result;
    }
    static decodeWallet(bytes) {
        // Wallet type and label length
        const typeAndLabelLength = this.readByte(bytes);
        const type = typeAndLabelLength & 0b11;
        const labelLength = typeAndLabelLength >> 2; // Can only be < 64 because it's only 6 bit
        // Status byte
        const statusByte = this.readByte(bytes);
        const keyMissing = (statusByte & _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].StatusFlags.KEY_MISSING) === _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].StatusFlags.KEY_MISSING;
        const fileExported = (statusByte & _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].StatusFlags.FILE_EXPORTED) === _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].StatusFlags.FILE_EXPORTED;
        const wordsExported = (statusByte & _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].StatusFlags.WORDS_EXPORTED) === _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].StatusFlags.WORDS_EXPORTED;
        const hasContracts = (statusByte & _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].StatusFlags.HAS_CONTRACTS) === _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].StatusFlags.HAS_CONTRACTS;
        const hasXPub = (statusByte & _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].StatusFlags.HAS_XPUB) === _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].StatusFlags.HAS_XPUB;
        // Wallet ID
        let id = '';
        for (let i = 0; i < 6; i++) {
            const idChunk = this.readByte(bytes).toString(16);
            id += `${idChunk.length < 2 ? '0' : ''}${idChunk}`;
        }
        // Handle LEGACY wallet
        if (type === _lib_Constants__WEBPACK_IMPORTED_MODULE_2__["WalletType"].LEGACY) {
            const walletLabel = Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_3__["labelLegacyAccount"])();
            const accounts = this.decodeAccounts(bytes, labelLength);
            const contracts = hasContracts ? this.decodeContracts(bytes) : [];
            const walletInfoEntry = {
                id,
                keyId: '',
                type,
                label: walletLabel,
                accounts,
                contracts,
                keyMissing,
                fileExported,
                wordsExported,
                btcAddresses: { internal: [], external: [] },
            };
            return walletInfoEntry;
        }
        // Handle regular wallet
        // Wallet label
        const walletLabelBytes = this.readBytes(bytes, labelLength);
        const accounts = this.decodeAccounts(bytes);
        const contracts = hasContracts ? this.decodeContracts(bytes) : [];
        const btcXPub = hasXPub ? this.decodeXPub(bytes) : undefined;
        const firstAccount = accounts.values().next().value;
        const walletLabel = walletLabelBytes.length > 0
            ? _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["Utf8Tools"].utf8ByteArrayToString(new Uint8Array(walletLabelBytes))
            : type === _lib_Constants__WEBPACK_IMPORTED_MODULE_2__["WalletType"].LEDGER
                ? Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_3__["labelLedgerAccount"])()
                : Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_3__["labelKeyguardAccount"])(_AddressUtils__WEBPACK_IMPORTED_MODULE_4__["default"].toUserFriendlyAddress(firstAccount.address));
        const walletInfoEntry = {
            id,
            keyId: '',
            type,
            label: walletLabel,
            accounts,
            contracts,
            keyMissing,
            fileExported,
            wordsExported,
            btcXPub,
            btcAddresses: { internal: [], external: [] },
        };
        return walletInfoEntry;
    }
    static decodeAccounts(bytes, labelLength) {
        let numberAccounts = 1;
        if (typeof labelLength === 'undefined') {
            // When the labelLength is not passed, it means it is not a LEGACY wallet
            // and the number of accounts is encoded before the list
            numberAccounts = this.readByte(bytes);
        }
        const accounts = [];
        for (let i = 0; i < numberAccounts; i++) {
            accounts.push(this.decodeAccount(bytes, labelLength));
        }
        const accountsMapArray = accounts.map((account) => {
            // Deserialize Nimiq.Address
            const userFriendlyAddress = _AddressUtils__WEBPACK_IMPORTED_MODULE_4__["default"].toUserFriendlyAddress(account.address);
            return [userFriendlyAddress, account];
        });
        return new Map(accountsMapArray);
    }
    static decodeAccount(bytes, labelLength) {
        if (typeof labelLength === 'undefined') {
            labelLength = this.readByte(bytes);
        }
        if (labelLength > _lib_Constants__WEBPACK_IMPORTED_MODULE_2__["LABEL_MAX_LENGTH"]) {
            throw new Error('Malformed Cookie, label too long');
        }
        // Account label
        const labelBytes = this.readBytes(bytes, labelLength);
        // Account address
        // (iframe does not have Nimiq lib)
        const addressBytes = this.readBytes(bytes, 20 /* Nimiq.Address.SERIALIZED_SIZE */);
        const accountLabel = labelBytes.length > 0
            ? _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["Utf8Tools"].utf8ByteArrayToString(new Uint8Array(labelBytes))
            : Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_3__["labelAddress"])(_AddressUtils__WEBPACK_IMPORTED_MODULE_4__["default"].toUserFriendlyAddress(new Uint8Array(addressBytes)));
        const accountInfoEntry = {
            path: 'not public',
            label: accountLabel,
            address: new Uint8Array(addressBytes),
        };
        return accountInfoEntry;
    }
    static decodeContracts(bytes) {
        const numberContracts = this.readByte(bytes);
        const contracts = [];
        for (let i = 0; i < numberContracts; i++) {
            contracts.push(this.decodeContract(bytes));
        }
        return contracts;
    }
    static decodeContract(bytes) {
        // Contract type and label length
        const typeAndLabelLength = this.readByte(bytes);
        const type = typeAndLabelLength & 0b11;
        const labelLength = typeAndLabelLength >> 2;
        const labelBytes = this.readBytes(bytes, labelLength);
        // Contract address
        // (iframe does not have Nimiq lib)
        const addressBytes = this.readBytes(bytes, 20 /* Nimiq.Address.SERIALIZED_SIZE */);
        switch (type) {
            case 1 /* Nimiq.Account.Type.VESTING */:
                const label = labelBytes.length > 0
                    ? _nimiq_utils__WEBPACK_IMPORTED_MODULE_0__["Utf8Tools"].utf8ByteArrayToString(new Uint8Array(labelBytes))
                    : Object(_LabelingMachine__WEBPACK_IMPORTED_MODULE_3__["labelVestingContract"])();
                const ownerBytes = this.readBytes(bytes, 20 /* Nimiq.Address.SERIALIZED_SIZE */);
                const start = this.fromBase256(this.readBytes(bytes, 4)); // Uint32
                const stepAmount = this.fromBase256(this.readBytes(bytes, 8)); // Uint64
                const stepBlocks = this.fromBase256(this.readBytes(bytes, 4)); // Uint32
                const totalAmount = this.fromBase256(this.readBytes(bytes, 8)); // Uint64
                return {
                    type,
                    label,
                    address: new Uint8Array(addressBytes),
                    owner: new Uint8Array(ownerBytes),
                    start,
                    stepAmount,
                    stepBlocks,
                    totalAmount,
                };
            case 2 /* Nimiq.Account.Type.HTLC */:
                throw new Error('HTLC decoding is not yet implemented');
            default:
                throw new Error('Unknown contract type: ' + type);
        }
    }
    static decodeXPub(bytes) {
        const xpubType = this.readByte(bytes);
        const xpubBytes = this.readBytes(bytes, 78); // 82 length - 4 bytes prefix
        const prefix = _CookieJar__WEBPACK_IMPORTED_MODULE_1__["default"].XPUB_TYPES[xpubType];
        const prefixBytes = prefix.match(/.{2}/g).map((byte) => parseInt(byte, 16));
        return Object(_bitcoin_Base58__WEBPACK_IMPORTED_MODULE_5__["encodeBase58"])(prefixBytes.concat(xpubBytes));
    }
    static legacyCookie(version, bytes) {
        switch (version) {
            default: return [];
        }
    }
    static fromBase256(numbers) {
        const base2bytes = numbers.map((value) => value.toString(2).padStart(8, '0'));
        return parseInt(base2bytes.join(''), 2);
    }
    static base64Decode(base64) {
        /*
        Source: https://github.com/danguer/blog-examples/blob/master/js/base64-binary.js

        Copyright (c) 2011, Daniel Guerrero
        All rights reserved.

        Redistribution and use in source and binary forms, with or without
        modification, are permitted provided that the following conditions are met:
            * Redistributions of source code must retain the above copyright
            notice, this list of conditions and the following disclaimer.
            * Redistributions in binary form must reproduce the above copyright
            notice, this list of conditions and the following disclaimer in the
            documentation and/or other materials provided with the distribution.

        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
        DISCLAIMED. IN NO EVENT SHALL DANIEL GUERRERO BE LIABLE FOR ANY
        DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
        ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        */
        // Use a lookup table to find the index.
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        const lookup = new Uint8Array(256);
        for (let i = 0; i < chars.length; i++) {
            lookup[chars.charCodeAt(i)] = i;
        }
        // Decode
        let bufferLength = base64.length * 0.75;
        let p = 0;
        let encoded1;
        let encoded2;
        let encoded3;
        let encoded4;
        if (base64[base64.length - 1] === '=') {
            bufferLength--;
            if (base64[base64.length - 2] === '=') {
                bufferLength--;
            }
        }
        const bytes = new Uint8Array(bufferLength);
        for (let i = 0; i < base64.length; i += 4) {
            encoded1 = lookup[base64.charCodeAt(i)];
            encoded2 = lookup[base64.charCodeAt(i + 1)];
            encoded3 = lookup[base64.charCodeAt(i + 2)];
            encoded4 = lookup[base64.charCodeAt(i + 3)];
            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }
        return bytes;
    }
}


/***/ })

}]);
//# sourceMappingURL=cookie-decoder-legacy.js.map