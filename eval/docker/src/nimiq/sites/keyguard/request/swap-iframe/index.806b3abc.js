/* global Nimiq */
/* global KeyStore */
/* global AccountStore */
/* global Errors */
/* global Utf8Tools */

class RequestParser { // eslint-disable-line no-unused-vars
    /**
     * @param {any} appName
     * @returns {string}
     */
    parseAppName(appName) {
        if (!appName || typeof appName !== 'string') {
            throw new Errors.InvalidRequestError('appName must be a string');
        }
        return appName.substring(0, 24);
    }

    /**
     * @param {any} path
     * @param {string} name - name of the property, used in error case only
     * @returns {string}
     */
    parsePath(path, name) {
        if (!path || typeof path !== 'string') {
            throw new Errors.InvalidRequestError(`${name} must be a string`);
        }
        if (!Nimiq.ExtendedPrivateKey.isValidPath(path)) {
            throw new Errors.InvalidRequestError(`${name}: Invalid path`);
        }
        return path;
    }

    /**
     * @param {any} paths
     * @param {string} name - name of the property, used in error case only
     * @returns {string[]}
     */
    parsePathsArray(paths, name) {
        if (!paths || !Array.isArray(paths)) {
            throw new Errors.InvalidRequestError(`${name} must be an array`);
        }
        if (paths.length === 0) {
            throw new Errors.InvalidRequestError(`${name} must not be empty`);
        }
        const requestedKeyPaths = paths.map(
            /**
             * @param {any} path
             * @param {number} index
             * @returns {string}
             */
            (path, index) => this.parsePath(path, `${name}[${index}]`),
        );
        return requestedKeyPaths;
    }

    /**
     * @param {any} label
     * @param {boolean} [allowEmpty = true]
     * @param {string} [parameterName = 'Label']
     * @returns {string | undefined}
     */
    parseLabel(label, allowEmpty = true, parameterName = 'Label') {
        if (!label) {
            if (!allowEmpty) throw new Errors.InvalidRequestError(`${parameterName} must not be empty`);
            return undefined;
        }
        if (typeof label !== 'string') {
            throw new Errors.InvalidRequestError(`${parameterName} must be a string`);
        }
        if (Utf8Tools.stringToUtf8ByteArray(label).byteLength > 63) {
            throw new Errors.InvalidRequestError(`${parameterName} must not exceed 63 bytes`);
        }
        // eslint-disable-next-line no-control-regex
        if (/[\x00-\x1F\x7F]/.test(label)) {
            throw new Errors.InvalidRequestError('Label cannot contain control characters');
        }
        return label;
    }

    /**
     * @param {any} keyId
     * @returns {Promise<KeyInfo>}
     */
    async parseKeyId(keyId) {
        if (!keyId || typeof keyId !== 'string') {
            throw new Errors.InvalidRequestError('keyId must be a string');
        }

        const keyInfo = this.isLegacyKeyId(keyId)
            ? await AccountStore.instance.getInfo(keyId)
            : await KeyStore.instance.getInfo(keyId);

        if (!keyInfo) {
            throw new Errors.KeyNotFoundError();
        }

        return keyInfo;
    }

    /**
     * @param {any} indicesArray
     * @returns {string[]}
     */
    parseIndicesArray(indicesArray) {
        if (!indicesArray || !Array.isArray(indicesArray)) {
            throw new Errors.InvalidRequestError('indicesToDerive must be an array');
        }
        if (indicesArray.length === 0) {
            throw new Errors.InvalidRequestError('indicesToDerive must not be empty');
        }
        indicesArray.forEach(/** @param {any} index */index => {
            if (typeof index !== 'string') {
                throw new Errors.InvalidRequestError('indicesToDerive must consist of strings');
            }
            if (!Nimiq.ExtendedPrivateKey.isValidPath(`m/${index}`)) {
                throw new Errors.InvalidRequestError(
                    'indicesToDerive strings must start with a number and end with a \'',
                );
            }
        });
        return indicesArray;
    }

    /**
     * @param {any} object
     * @returns {Nimiq.ExtendedTransaction}
     */
    parseTransaction(object) {
        const accountTypes = new Set([Nimiq.Account.Type.BASIC, Nimiq.Account.Type.VESTING, Nimiq.Account.Type.HTLC]);
        if (!object || typeof object !== 'object' || object === null) {
            throw new Errors.InvalidRequestError('Request must be an object');
        }

        const sender = this.parseAddress(object.sender, 'sender');
        const senderType = object.senderType || Nimiq.Account.Type.BASIC;
        if (!accountTypes.has(senderType)) {
            throw new Errors.InvalidRequestError('Invalid sender type');
        }

        const recipient = this.parseAddress(object.recipient, 'recipient');
        const recipientType = object.recipientType || Nimiq.Account.Type.BASIC;
        if (!accountTypes.has(recipientType)) {
            throw new Errors.InvalidRequestError('Invalid recipient type');
        }

        if (sender.equals(recipient)) {
            throw new Errors.InvalidRequestError('Sender and recipient must not match');
        }

        const flags = object.flags || Nimiq.Transaction.Flag.NONE;

        const data = typeof object.data === 'string'
            ? Utf8Tools.stringToUtf8ByteArray(object.data)
            : object.data || new Uint8Array(0);

        if (flags === Nimiq.Transaction.Flag.NONE && data.byteLength > 64) {
            throw new Errors.InvalidRequestError('Data must not exceed 64 bytes');
        }
        if (flags === Nimiq.Transaction.Flag.CONTRACT_CREATION
                && data.byteLength !== 78 // HTLC
                && data.byteLength !== 24 // Vesting
                && data.byteLength !== 36 // Vesting
                && data.byteLength !== 44) { // Vesting
            throw new Errors.InvalidRequestError(
                'Contract creation data must be 78 bytes for HTLC and 24, 36, or 44 bytes for vesting contracts',
            );
        }
        if (flags === Nimiq.Transaction.Flag.CONTRACT_CREATION && recipient !== Nimiq.Address.CONTRACT_CREATION) {
            throw new Errors.InvalidRequestError(
                'Transaction recipient must be CONTRACT_CREATION when creating contracts',
            );
        }

        try {
            return new Nimiq.ExtendedTransaction(
                sender,
                senderType,
                recipient,
                recipientType,
                object.value,
                object.fee,
                object.validityStartHeight,
                flags,
                data,
            );
        } catch (error) {
            throw new Errors.InvalidRequestError(error);
        }
    }

    /**
     * @param {any} address
     * @param {string} name
     * @returns {Nimiq.Address}
     */
    parseAddress(address, name) {
        if (address === 'CONTRACT_CREATION') {
            return Nimiq.Address.CONTRACT_CREATION;
        }

        try {
            if (typeof address === 'string') {
                return Nimiq.Address.fromString(address);
            }
            return new Nimiq.Address(address);
        } catch (error) {
            throw new Errors.InvalidRequestError(`${name} must be a valid Nimiq address (${error.message})`);
        }
    }

    /**
     * When passed in as a string, the message is parsed as a string and checked for
     * control characters. When passed in as an Uint8Array, the message is handled as
     * binary data and only ever displayed as HEX.
     *
     * @param {any} message
     * @returns {string | Uint8Array}
     */
    parseMessage(message) {
        if (typeof message === 'string') {
            const messageBytes = Utf8Tools.stringToUtf8ByteArray(message);
            if (!Utf8Tools.isValidUtf8(messageBytes)) {
                throw new Errors.InvalidRequestError('message cannot include control characters');
            }
        } else if (!(message instanceof Uint8Array)) {
            throw new Errors.InvalidRequestError('message must be a string or Uint8Array');
        }
        return message;
    }

    /**
     * @param {unknown} url
     * @returns {string}
     */
    parseShopOrigin(url) {
        if (!url || typeof url !== 'string') {
            throw new Errors.InvalidRequestError('shopOrigin must be of type string');
        }
        try {
            const parsedUrl = this._parseUrl(url, 'shopOrigin');
            return parsedUrl.origin;
        } catch (error) {
            throw new Errors.InvalidRequestError(error);
        }
    }

    /**
     * @param {any} url
     * @returns {URL | undefined}
     */
    parseShopLogoUrl(url) {
        if (!url) return undefined;
        if (typeof url !== 'string') {
            throw new Errors.InvalidRequestError('shopLogoUrl must be of type string');
        }
        try {
            return this._parseUrl(url, 'shopLogoUrl');
        } catch (error) {
            throw new Errors.InvalidRequestError(error);
        }
    }

    /**
     * @param {unknown} value
     * @returns {boolean}
     */
    parseBoolean(value) {
        return !!value;
    }

    /**
     * Checks that a given value is a non-negative finite number.
     * @param {any} value
     * @param {boolean} [allowUndefined=true]
     * @param {string} [parameterName='Value']
     * @returns {number | undefined}
     */
    parseNonNegativeFiniteNumber(value, allowUndefined = true, parameterName = 'Value') {
        if (value === undefined && allowUndefined) {
            return undefined;
        }
        if (typeof value !== 'number' || value < 0 || !Number.isFinite(value)) {
            throw new Errors.InvalidRequestError(`${parameterName} must be a non-negative finite number.`);
        }
        return value;
    }

    /**
     * @param {unknown} int
     * @param {boolean} [allowZero=true]
     * @param {string} [parameterName='Value']
     * @returns {number}
     */
    parsePositiveInteger(int, allowZero = true, parameterName = 'Value') {
        const value = /** @type {number} */ (this.parseNonNegativeFiniteNumber(int, false, parameterName));
        if (value === 0 && !allowZero) {
            throw new Errors.InvalidRequestError(`${parameterName} must not be 0`);
        }
        if (Math.round(value) !== value) {
            throw new Errors.InvalidRequestError(`${parameterName} must be a whole number (integer)`);
        }
        return value;
    }

    /**
     * Parses that a currency info is valid.
     * @param {unknown} fiatCurrency
     * @param {boolean} [allowUndefined=true]
     * @returns {string | undefined}
     */
    parseFiatCurrency(fiatCurrency, allowUndefined = true) {
        if (fiatCurrency === undefined && allowUndefined) {
            return undefined;
        }

        // parse currency code
        if (typeof fiatCurrency !== 'string'
            || !/^[a-z]{3}$/i.test(fiatCurrency)) {
            throw new Errors.InvalidRequestError(`Invalid currency code ${fiatCurrency}`);
        }
        return fiatCurrency.toUpperCase();
    }

    /**
     * Parses that a value is a valid vendor markup.
     * @param {unknown} value
     * @returns {number | undefined}
     */
    parseVendorMarkup(value) {
        if (value === undefined) {
            return undefined;
        }
        if (typeof value !== 'number' || value <= -1 || !Number.isFinite(value)) {
            throw new Errors.InvalidRequestError('Vendor markup must be a finite number > -1.');
        }
        return value;
    }

    /**
     * @param {string} id
     * @returns {boolean}
     */
    isLegacyKeyId(id) {
        return id.substr(0, 2) === 'NQ' && id.length === 44;
    }

    /**
     * @param {string} url
     * @param {string} parameterName
     * @returns {URL}
     */
    _parseUrl(url, parameterName) {
        const parsedUrl = new URL(url);
        const whitelistedProtocols = ['https:', 'http:', 'chrome-extension:', 'moz-extension:'];
        if (!whitelistedProtocols.includes(parsedUrl.protocol)) {
            const protocolString = whitelistedProtocols.join(', ');
            throw new Errors.InvalidRequestError(`${parameterName} protocol must be one of: ${protocolString}`);
        }
        return parsedUrl;
    }
}
/* global Nimiq */
/* global BitcoinJS */
/* global BitcoinUtils */
/* global BitcoinConstants */
/* global Errors */

class HtlcUtils { // eslint-disable-line no-unused-vars
    /**
     * @param {unknown} data - Uint8Array
     * @returns {NimHtlcContents}
     */
    static decodeNimHtlcData(data) {
        const error = new Errors.InvalidRequestError('Invalid NIM HTLC data');

        if (!data || !(data instanceof Uint8Array) || data.length !== 78) throw error;

        const buf = new Nimiq.SerialBuffer(data);

        const sender = Nimiq.Address.unserialize(buf).toUserFriendlyAddress();
        const recipient = Nimiq.Address.unserialize(buf).toUserFriendlyAddress();
        const hashAlgorithm = /** @type {Nimiq.Hash.Algorithm} */ (buf.readUint8());
        const hashRoot = Nimiq.Hash.unserialize(buf, hashAlgorithm).toHex();
        const hashCount = buf.readUint8();
        const timeout = buf.readUint32();

        if (hashAlgorithm !== Nimiq.Hash.Algorithm.SHA256) throw error;
        if (hashCount !== 1) throw error;

        return {
            refundAddress: sender,
            redeemAddress: recipient,
            hash: hashRoot,
            timeoutBlockHeight: timeout,
        };
    }

    /**
     * @param {unknown} script - Uint8Array
     * @returns {BtcHtlcContents}
     */
    static decodeBtcHtlcScript(script) {
        const error = new Errors.InvalidRequestError('Invalid BTC HTLC script');

        if (!script || !(script instanceof Uint8Array) || !script.length) throw error;
        // @ts-ignore Type 'import(...).Buffer' is not assignable to type 'Buffer'.
        const chunks = BitcoinJS.script.decompile(BitcoinJS.Buffer.from(script));
        if (!chunks) throw error;
        const asm = BitcoinJS.script.toASM(chunks).split(' ');

        let branchesVerifiedIndividually = false;

        /* eslint-disable no-plusplus */
        let i = 0;

        // Start redeem branch
        if (asm[i] !== 'OP_IF') throw error;

        // Check secret size
        if (asm[++i] !== 'OP_SIZE' || asm[++i] !== (32).toString(16) || asm[++i] !== 'OP_EQUALVERIFY') throw error;

        // Check hash
        if (asm[++i] !== 'OP_SHA256' || asm[i + 2] !== 'OP_EQUALVERIFY') throw error;
        const hash = asm[++i];
        if (hash.length !== 64) throw error;
        ++i;

        // Check redeem address
        if (asm[++i] !== 'OP_DUP' || asm[++i] !== 'OP_HASH160') throw error;
        const redeemAddressBytes = asm[++i];

        // End redeem branch, start refund branch
        if (asm[++i] !== 'OP_ELSE') {
            branchesVerifiedIndividually = true;
            if (asm[i] !== 'OP_EQUALVERIFY' || asm[++i] !== 'OP_CHECKSIG' || asm[++i] !== 'OP_ELSE') throw error;
        }

        // Check timeout
        // Bitcoin HTLC timeouts are backdated 1 hour, to account for Bitcoin's
        // minimum age for valid transaction locktimes (6 blocks).
        // @ts-ignore Argument of type 'Buffer' is not assignable to parameter of type 'Buffer'
        const timeoutTimestamp = BitcoinJS.script.number.decode(BitcoinJS.Buffer.from(asm[++i], 'hex')) + (60 * 60);
        if (asm[++i] !== 'OP_CHECKLOCKTIMEVERIFY' || asm[++i] !== 'OP_DROP') throw error;

        // Check refund address
        if (asm[++i] !== 'OP_DUP' || asm[++i] !== 'OP_HASH160') throw error;
        const refundAddressBytes = asm[++i];

        // End refund branch
        if (branchesVerifiedIndividually) {
            if (asm[++i] !== 'OP_EQUALVERIFY' || asm[++i] !== 'OP_CHECKSIG' || asm[++i] !== 'OP_ENDIF') throw error;
        } else {
            // End contract
            // eslint-disable-next-line no-lonely-if
            if (asm[++i] !== 'OP_ENDIF' || asm[++i] !== 'OP_EQUALVERIFY' || asm[++i] !== 'OP_CHECKSIG') throw error;
        }

        if (asm.length !== ++i) throw error;
        /* eslint-enable no-plusplus */

        return {
            refundAddress: BitcoinUtils.addressBytesToAddress(refundAddressBytes, BitcoinConstants.BIP.BIP84),
            redeemAddress: BitcoinUtils.addressBytesToAddress(redeemAddressBytes, BitcoinConstants.BIP.BIP84),
            hash,
            timeoutTimestamp,
        };
    }

    /**
     * @param {Buffer[]} witness
     * @returns {Buffer}
     */
    static witnessStackToScriptWitness(witness) {
        /** @type {number[]} */
        let buffer = [];

        /**
         * @param {Buffer} slice
         */
        function writeSlice(slice) {
            buffer = buffer.concat([...slice.subarray(0)]);
        }

        /**
         * Specification: https://en.bitcoin.it/wiki/Protocol_documentation#Variable_length_integer
         *
         * @param {number} i
         */
        function writeVarInt(i) {
            if (i < 0xFD) {
                buffer.push(i);
            } else if (i <= 0xFFFF) {
                buffer.push(0xFD);
                const number = new Nimiq.SerialBuffer(2);
                number.writeUint16(i);
                buffer = buffer.concat([...number.reverse()]);
            } else if (i <= 0xFFFFFFFF) {
                buffer.push(0xFE);
                const number = new Nimiq.SerialBuffer(4);
                number.writeUint32(i);
                buffer = buffer.concat([...number.reverse()]);
            } else {
                buffer.push(0xFF);
                const number = new Nimiq.SerialBuffer(8);
                number.writeUint64(i);
                buffer = buffer.concat([...number.reverse()]);
            }
        }

        /**
         * @param {Buffer} slice
         */
        function writeVarSlice(slice) {
            writeVarInt(slice.length);
            writeSlice(slice);
        }

        /**
         * @param {Buffer[]} vector
         */
        function writeVector(vector) {
            writeVarInt(vector.length);
            vector.forEach(writeVarSlice);
        }

        writeVector(witness);

        // @ts-ignore Type 'Buffer' is not assignable to type 'Buffer'.
        return BitcoinJS.Buffer.from(buffer);
    }
}
/* eslint-disable no-bitwise, no-plusplus, eqeqeq, no-mixed-operators, brace-style */

/**
 * Sources:
 *
 * Conversion functions taken from
 * https://github.com/google/closure-library/blob/master/closure/goog/crypt/crypt.js
 *
 * UTF-8 validitiy limit values from
 * https://lemire.me/blog/2018/05/09/how-quickly-can-you-check-that-a-string-is-valid-unicode-utf-8/
 */

// TODO: Remove fallbacks when TextEncoder/TextDecoder are sufficiently supported

class Utf8Tools { // eslint-disable-line no-unused-vars
    /**
     * @param {string} str
     * @returns {Uint8Array}
     */
    static stringToUtf8ByteArray(str) {
        if (typeof TextEncoder !== 'undefined') {
            const encoder = new TextEncoder(); // utf-8 is the default
            return encoder.encode(str);
        }

        // Fallback for unsupported TextEncoder
        const out = [];
        let p = 0;
        for (let i = 0; i < str.length; i++) {
            let c = str.charCodeAt(i);
            if (c < 128) {
                out[p++] = c;
            } else if (c < 2048) {
                out[p++] = (c >> 6) | 192;
                out[p++] = (c & 63) | 128;
            } else if (
                ((c & 0xFC00) == 0xD800) && (i + 1) < str.length
            && ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
                // Surrogate Pair
                c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
                out[p++] = (c >> 18) | 240;
                out[p++] = ((c >> 12) & 63) | 128;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            } else {
                out[p++] = (c >> 12) | 224;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
        }
        return new Uint8Array(out);
    }

    /**
     * @param {Uint8Array} bytes
     * @returns {string}
     */
    static utf8ByteArrayToString(bytes) {
        if (typeof TextDecoder !== 'undefined') {
            const decoder = new TextDecoder('utf-8');
            return decoder.decode(bytes);
        }

        // Fallback for unsupported TextDecoder
        const out = [];
        let pos = 0;
        let c = 0;
        while (pos < bytes.length) {
            const c1 = bytes[pos++];
            if (c1 < 128) {
                out[c++] = String.fromCharCode(c1);
            } else if (c1 > 191 && c1 < 224) {
                const c2 = bytes[pos++];
                out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
            } else if (c1 > 239 && c1 < 365) {
                // Surrogate Pair
                const c2 = bytes[pos++];
                const c3 = bytes[pos++];
                const c4 = bytes[pos++];
                const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 0x10000;
                out[c++] = String.fromCharCode(0xD800 + (u >> 10));
                out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
            } else {
                const c2 = bytes[pos++];
                const c3 = bytes[pos++];
                out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            }
        }
        return out.join('');
    }

    /**
     * @param {Uint8Array} bytes
     * @returns {boolean}
     */
    static isValidUtf8(bytes) {
        // We cannot use the build-in TextDecoder to check for validity, as we need to
        // also filter out control characters, which are valid UTF8.

        let i = 0;

        while (i < bytes.length) {
            const bytesLeft = bytes.length - i;
            const first = bytes[i]; // The byte

            const controlCharsWhitelist = [
                0x09, /* horizontal tab (\t) */
                0x0A, /* line feed (\n) */
                0x0D, /* carriage return (\r) */
            ];

            if (first <= 0x7F) { // Possible one-byte
                if (controlCharsWhitelist.indexOf(first) > -1) ++i;
                else if (first >= 0x20 /* space */ && first <= 0x7E /* tilde */) ++i; // Only allow non-control chars
                else break;
            }

            else if (first >= 0xC2 && first <= 0xDF && bytesLeft >= 2) { // Possible two-byte
                const second = bytes[++i];

                if (second >= 0x80 && second <= 0xBF) ++i; // Is valid two-byte
                else break;
            }

            else if (first === 0xE0 && bytesLeft >= 3) { // Possible three-byte
                const second = bytes[++i];
                const third = bytes[++i];

                if (second >= 0xA0 && second <= 0xBF
                 && third >= 0x80 && third <= 0xBF) ++i; // Is valid three-byte
                else break;
            }

            else if (first >= 0xE1 && first <= 0xEC && bytesLeft >= 3) { // Possible three-byte
                const second = bytes[++i];
                const third = bytes[++i];

                if (second >= 0x80 && second <= 0xBF
                 && third >= 0x80 && third <= 0xBF) ++i; // Is valid three-byte
                else break;
            }

            else if (first === 0xED && bytesLeft >= 3) { // Possible three-byte
                const second = bytes[++i];
                const third = bytes[++i];

                if (second >= 0x80 && second <= 0x9F
                 && third >= 0x80 && third <= 0xBF) ++i; // Is valid three-byte
                else break;
            }

            else if (first >= 0xEE && first <= 0xEF && bytesLeft >= 3) { // Possible three-byte
                const second = bytes[++i];
                const third = bytes[++i];

                if (second >= 0x80 && second <= 0xBF
                 && third >= 0x80 && third <= 0xBF) ++i; // Is valid three-byte
                else break;
            }

            else if (first === 0xF0 && bytesLeft >= 4) { // Possible four-byte
                const second = bytes[++i];
                const third = bytes[++i];
                const fourth = bytes[++i];

                if (second >= 0x90 && second <= 0xBF
                 && third >= 0x80 && third <= 0xBF
                 && fourth >= 0x80 && fourth <= 0xBF) ++i; // Is valid four-byte
                else break;
            }

            else if (first >= 0xF1 && first <= 0xF3 && bytesLeft >= 4) { // Possible four-byte
                const second = bytes[++i];
                const third = bytes[++i];
                const fourth = bytes[++i];

                if (second >= 0x80 && second <= 0xBF
                 && third >= 0x80 && third <= 0xBF
                 && fourth >= 0x80 && fourth <= 0xBF) ++i; // Is valid four-byte
                else break;
            }

            else if (first === 0xF4 && bytesLeft >= 4) { // Possible four-byte
                const second = bytes[++i];
                const third = bytes[++i];
                const fourth = bytes[++i];

                if (second >= 0x80 && second <= 0x8F
                 && third >= 0x80 && third <= 0xBF
                 && fourth >= 0x80 && fourth <= 0xBF) ++i; // Is valid four-byte
                else break;
            }

            else break;
        }

        // If the whole array was walked successfully, then the last check also increased the counter
        // and the index i is equal to the length of the array.
        // If the while loop was broken early, i is smaller and the array is not valid UTF-8.
        return i === bytes.length;
    }
}
/* global BitcoinRequestParserMixin */
/* global RequestParser */
/* global Nimiq */
/* global loadNimiq */
/* global BitcoinJS */
/* global BitcoinUtils */
/* global HtlcUtils */
/* global Errors */
/* global Constants */
/* global Key */
/* global OasisSettlementInstructionUtils */

class SwapIFrameApi extends BitcoinRequestParserMixin(RequestParser) { // eslint-disable-line no-unused-vars
    /**
     * @param {RpcState?} state
     * @param {KeyguardRequest.SignSwapTransactionsRequest} request
     * @returns {Promise<KeyguardRequest.SignSwapTransactionsResult>}
     */
    async signSwapTransactions(state, request) {
        const storageKey = Constants.SWAP_IFRAME_SESSION_STORAGE_KEY_PREFIX + request.swapId;

        const storedData = sessionStorage.getItem(storageKey);
        sessionStorage.removeItem(storageKey); // Delete storage

        if (!storedData) throw new Error('No swap stored in SessionStorage');

        /** @type {{keys: {nim: string, btc: string[], eur: string, btc_refund?: string}, request: any}} */
        const { keys: privateKeys, request: storedRawRequest } = (JSON.parse(storedData));

        if (request.fund.type === 'NIM' || request.redeem.type === 'NIM') {
            if (!privateKeys.nim) throw new Error('No NIM key stored in SessionStorage');
            if (privateKeys.nim.length !== 64) throw new Error('Invalid NIM key stored in SessionStorage');
        }

        if (request.fund.type === 'BTC' || request.redeem.type === 'BTC') {
            if (!privateKeys.btc) throw new Error('No BTC key list stored in SessionStorage');
            if (!privateKeys.btc.length) throw new Error('No BTC keys stored in SessionStorage');
            if (privateKeys.btc.some(key => !key)) throw new Error('Empty BTC key stored in SessionStorage');
            if (privateKeys.btc.some(key => key.length !== 64)) {
                throw new Error('Invalid BTC key stored in SessionStorage');
            }
        }

        if (request.redeem.type === 'EUR') {
            if (!privateKeys.eur) throw new Error('No EUR key stored in SessionStorage');
            if (privateKeys.eur.length !== 64) throw new Error('Invalid EUR key stored in SessionStorage');
        }

        // Deserialize stored request
        if (storedRawRequest.fund.type === 'NIM') {
            storedRawRequest.fund.transaction = Nimiq.Transaction.fromPlain(storedRawRequest.fund.transaction);
        }
        if (storedRawRequest.fund.type === 'BTC') {
            // Plainify BTC input script buffers
            for (let i = 0; i < storedRawRequest.fund.inputs.length; i++) {
                storedRawRequest.fund.inputs[i].witnessUtxo.script = BitcoinJS.Buffer.from(
                    storedRawRequest.fund.inputs[i].witnessUtxo.script,
                    'hex',
                );
            }
        }
        if (storedRawRequest.redeem.type === 'NIM') {
            storedRawRequest.redeem.transaction = Nimiq.Transaction.fromPlain(storedRawRequest.redeem.transaction);
        }

        /** @type {Parsed<KeyguardRequest.SignSwapRequest>} */
        const storedRequest = storedRawRequest;

        /** @type {{
            type: 'NIM',
            htlcDetails: NimHtlcContents,
            htlcData: Uint8Array,
        } | {
            type: 'BTC',
            htlcDetails: BtcHtlcContents,
            htlcScript: Uint8Array,
            htlcAddress: string,
        } | {
            type: 'EUR',
            htlcDetails: EurHtlcContents,
            htlcId: string,
        } | undefined } */
        let fund;

        /** @type {{
            type: 'NIM',
            htlcDetails: NimHtlcContents,
            htlcData: Uint8Array,
            htlcAddress: string,
        } | {
            type: 'BTC',
            htlcDetails: BtcHtlcContents,
            htlcScript: Uint8Array,
            transactionHash: string,
            outputIndex: number,
            outputScript: Buffer,
        } | {
            type: 'EUR',
            htlcDetails: EurHtlcContents,
            htlcId: string,
        } | undefined } */
        let redeem;

        // Parse request
        if (storedRequest.fund.type !== request.fund.type || storedRequest.redeem.type !== request.redeem.type) {
            throw new Errors.InvalidRequestError('Different swap assets in iframe request than in top-level request');
        }

        if (request.fund.type === 'NIM' && storedRequest.fund.type === 'NIM') {
            const htlcDetails = HtlcUtils.decodeNimHtlcData(request.fund.htlcData);

            if (htlcDetails.refundAddress !== storedRequest.fund.transaction.sender.toUserFriendlyAddress()) {
                throw new Errors.InvalidRequestError('NIM HTLC refund address must be same as sender');
            }

            // Check that validityStartHeight is before HTLC timeout
            if (storedRequest.fund.transaction.validityStartHeight >= htlcDetails.timeoutBlockHeight) {
                throw new Errors.InvalidRequestError(
                    'Fund validityStartHeight must be lower than HTLC timeout block height',
                );
            }

            fund = {
                type: 'NIM',
                htlcDetails,
                htlcData: request.fund.htlcData,
            };
        }

        if (request.redeem.type === 'NIM' && storedRequest.redeem.type === 'NIM') {
            const htlcDetails = HtlcUtils.decodeNimHtlcData(request.redeem.htlcData);

            if (htlcDetails.redeemAddress !== storedRequest.redeem.transaction.recipient.toUserFriendlyAddress()) {
                throw new Errors.InvalidRequestError('NIM HTLC redeem address must be same as recipient');
            }

            // Check that validityStartHeight is before HTLC timeout
            if (storedRequest.redeem.transaction.validityStartHeight >= htlcDetails.timeoutBlockHeight) {
                throw new Errors.InvalidRequestError(
                    'Redeem validityStartHeight must be lower than HTLC timeout block height',
                );
            }

            redeem = {
                type: 'NIM',
                htlcDetails,
                htlcData: request.redeem.htlcData,
                htlcAddress: this.parseAddress(request.redeem.htlcAddress, 'redeem.htlcAddress')
                    .toUserFriendlyAddress(),
            };
        }

        if (request.fund.type === 'BTC' && storedRequest.fund.type === 'BTC') {
            const htlcDetails = HtlcUtils.decodeBtcHtlcScript(request.fund.htlcScript);

            if (htlcDetails.refundAddress !== storedRequest.fund.refundAddress) {
                throw new Errors.InvalidRequestError(
                    'BTC HTLC refund address must be same as given in top-level request',
                );
            }

            const htlcAddress = BitcoinJS.payments.p2wsh({
                // @ts-ignore Type 'Uint8Array' is not assignable to type 'Buffer'.
                witness: [BitcoinJS.Buffer.from(request.fund.htlcScript)],
                network: BitcoinUtils.Network,
            }).address;

            if (!htlcAddress) {
                throw new Errors.InvalidRequestError('Cannot derive HTLC address from BTC HTLC script');
            }

            fund = {
                type: 'BTC',
                htlcDetails,
                htlcScript: request.fund.htlcScript,
                htlcAddress,
            };
        }

        if (request.redeem.type === 'BTC' && storedRequest.redeem.type === 'BTC') {
            const htlcDetails = HtlcUtils.decodeBtcHtlcScript(request.redeem.htlcScript);

            if (htlcDetails.redeemAddress !== storedRequest.redeem.output.address) {
                throw new Errors.InvalidRequestError('BTC HTLC redeem address must be same as recipient');
            }

            const outputScript = BitcoinJS.payments.p2wsh({
                // @ts-ignore Type 'Uint8Array' is not assignable to type 'Buffer'.
                witness: [BitcoinJS.Buffer.from(request.redeem.htlcScript)],
                network: BitcoinUtils.Network,
            }).output;

            if (!outputScript) {
                throw new Errors.InvalidRequestError('Cannot derive HTLC output script from BTC HTLC script');
            }

            redeem = {
                type: 'BTC',
                htlcDetails,
                htlcScript: request.redeem.htlcScript,
                transactionHash: Nimiq.BufferUtils.toHex(Nimiq.BufferUtils.fromAny(request.redeem.transactionHash)),
                outputIndex: this.parsePositiveInteger(request.redeem.outputIndex),
                outputScript,
            };
        }

        if (request.fund.type === 'EUR' && storedRequest.fund.type === 'EUR') {
            fund = {
                type: 'EUR',
                htlcDetails: {
                    hash: Nimiq.BufferUtils.toHex(Nimiq.BufferUtils.fromAny(request.fund.hash)),
                    timeoutTimestamp: this.parsePositiveInteger(request.fund.timeout, false, 'fund.timeout'),
                },
                htlcId: /** @type {string} */ (this.parseLabel(request.fund.htlcId, false, 'fund.htlcId')),
            };
        }

        if (request.redeem.type === 'EUR' && storedRequest.redeem.type === 'EUR') {
            redeem = {
                type: 'EUR',
                htlcDetails: {
                    hash: Nimiq.BufferUtils.toHex(Nimiq.BufferUtils.fromAny(request.redeem.hash)),
                    timeoutTimestamp: this.parsePositiveInteger(request.redeem.timeout, false, 'redeem.timeout'),
                },
                htlcId: /** @type {string} */ (this.parseLabel(request.redeem.htlcId, false, 'redeem.htlcId')),
            };
        }

        if (!fund || !redeem) {
            throw new Errors.InvalidRequestError('No funding or redeeming data');
        }

        /** @type {Parsed<KeyguardRequest.SignSwapTransactionsRequest>} */
        const parsedRequest = {
            swapId: request.swapId,
            fund,
            redeem,
        };

        // Verify hash is the same across HTLCs
        if (parsedRequest.fund.htlcDetails.hash !== parsedRequest.redeem.htlcDetails.hash) {
            throw new Errors.InvalidRequestError('HTLC hashes do not match');
        }

        // Validate timeouts of the two contracts
        // The redeem HTLC must have a later timeout than the funding HTLC.
        if ('timeoutTimestamp' in fund.htlcDetails && 'timeoutTimestamp' in redeem.htlcDetails) {
            const diff = redeem.htlcDetails.timeoutTimestamp - fund.htlcDetails.timeoutTimestamp;

            // Validate that the difference is at least 15 minutes
            if (diff < 15 * 60) {
                throw new Errors.InvalidRequestError(
                    'HTLC redeem timeout must be 15 min or more after the funding timeout',
                );
            }
        }

        /** @type {KeyguardRequest.SignSwapTransactionsResult} */
        const result = {};

        if (parsedRequest.fund.type === 'NIM' && storedRequest.fund.type === 'NIM') {
            await loadNimiq();

            const privateKey = new Nimiq.PrivateKey(Nimiq.BufferUtils.fromHex(privateKeys.nim));
            const publicKey = Nimiq.PublicKey.derive(privateKey);

            const transaction = Nimiq.Transaction.fromPlain({
                ...storedRequest.fund.transaction.toPlain(),
                data: parsedRequest.fund.htlcData,
                // Must be the exact object reference, which gets lost with toPlain()
                recipient: Nimiq.Address.CONTRACT_CREATION,
            });

            const signature = Nimiq.Signature.create(privateKey, publicKey, transaction.serializeContent());

            /** @type {KeyguardRequest.SignatureResult} */
            result.nim = {
                publicKey: publicKey.serialize(),
                signature: signature.serialize(),
            };

            if (transaction.senderType === Nimiq.Account.Type.BASIC) {
                const feePerUnit = transaction.fee / transaction.serializedSize;
                const fee = Math.ceil(feePerUnit * 167); // 167 = NIM HTLC refunding tx size

                // Create refund transaction
                const refundTransaction = new Nimiq.ExtendedTransaction(
                    transaction.recipient, Nimiq.Account.Type.HTLC,
                    transaction.sender, Nimiq.Account.Type.BASIC,
                    transaction.value - fee, fee,
                    parsedRequest.fund.htlcDetails.timeoutBlockHeight,
                    Nimiq.Transaction.Flag.NONE,
                    new Uint8Array(0),
                );

                const refundSignature = Nimiq.Signature.create(
                    privateKey,
                    publicKey,
                    refundTransaction.serializeContent(),
                );
                const refundSignatureProof = Nimiq.SignatureProof.singleSig(publicKey, refundSignature);

                const proof = new Nimiq.SerialBuffer(1 + Nimiq.SignatureProof.SINGLE_SIG_SIZE);
                proof.writeUint8(Nimiq.HashedTimeLockedContract.ProofType.TIMEOUT_RESOLVE);
                refundSignatureProof.serialize(proof);
                refundTransaction.proof = proof;

                result.refundTx = Nimiq.BufferUtils.toHex(refundTransaction.serialize());
            }
        }

        if (parsedRequest.fund.type === 'BTC' && storedRequest.fund.type === 'BTC') {
            const inputs = storedRequest.fund.inputs;

            // Sort inputs by tx hash ASC, then index ASC
            inputs.sort((a, b) => {
                if (a.hash !== b.hash) return a.hash < b.hash ? -1 : 1;
                return a.index - b.index;
            });

            // Construct outputs
            const outputs = [{
                address: parsedRequest.fund.htlcAddress,
                value: storedRequest.fund.recipientOutput.value,
            }];

            // Add change output
            if (storedRequest.fund.changeOutput) {
                // The address is set in SignSwap after password entry.
                if (!storedRequest.fund.changeOutput.address) {
                    throw new Errors.KeyguardError('Missing address in funding change output');
                }

                outputs.push(/** @type {{address: string, value: number}} */ (storedRequest.fund.changeOutput));
            }

            // Sort outputs by value ASC, then address ASC
            outputs.sort((a, b) => (a.value - b.value) || (a.address < b.address ? -1 : 1));

            // Construct transaction
            const psbt = new BitcoinJS.Psbt({ network: BitcoinUtils.Network });

            // Add inputs
            // @ts-ignore Argument of type 'Uint8Array' is not assignable to parameter of type 'Buffer'.
            psbt.addInputs(inputs);
            // Add outputs
            psbt.addOutputs(outputs);
            // Set locktime
            if (storedRequest.fund.locktime) {
                psbt.locktime = storedRequest.fund.locktime;
            }

            // Sign
            const keyPairs = privateKeys.btc.map(privateKey => BitcoinJS.ECPair.fromPrivateKey(
                // @ts-ignore Argument of type 'import("...").Buffer' is not assignable to parameter of type 'Buffer'.
                BitcoinJS.Buffer.from(privateKey, 'hex'),
            ));
            for (const keyPair of keyPairs) {
                psbt.signAllInputs(keyPair);
            }

            // Verify that all inputs are signed
            if (!psbt.validateSignaturesOfAllInputs()) {
                throw new Error('Invalid or missing signature(s) for BTC transaction.');
            }

            // Finalize
            psbt.finalizeAllInputs();

            // Extract tx
            const tx = psbt.extractTransaction();

            /** @type {KeyguardRequest.SignedBitcoinTransaction} */
            result.btc = {
                transactionHash: tx.getId(),
                raw: tx.toHex(),
            };

            if (privateKeys.btc_refund && privateKeys.btc_refund.length === 64) {
                const sumInputs = storedRequest.fund.inputs.reduce((sum, input) => sum + input.witnessUtxo.value, 0);
                const sumOutputs = storedRequest.fund.recipientOutput.value + (storedRequest.fund.changeOutput
                    ? storedRequest.fund.changeOutput.value
                    : 0);
                const feePerUnit = (sumInputs - sumOutputs) / tx.weight();
                const fee = Math.ceil(feePerUnit * 540); // 540 = BTC HTLC refunding tx weight units

                const htlcAddress = parsedRequest.fund.htlcAddress;
                const htlcScript = /** @type {Buffer} */ (BitcoinJS.payments.p2wsh({
                    // @ts-ignore Type 'import("...").Buffer' is not assignable to type 'Buffer'.
                    witness: [BitcoinJS.Buffer.from(parsedRequest.fund.htlcScript, 'hex')],
                    network: BitcoinUtils.Network,
                }).output);

                // Construct refund transaction
                const refundPsbt = new BitcoinJS.Psbt({ network: BitcoinUtils.Network });

                // Add HTLC UTXO as input
                refundPsbt.addInput({
                    hash: tx.getId(),
                    index: outputs.findIndex(output => output.address === htlcAddress),
                    witnessUtxo: {
                        script: htlcScript,
                        value: storedRequest.fund.recipientOutput.value,
                    },
                    // @ts-ignore Type of type 'import("...").Buffer' is not assignable to type 'Buffer'.
                    witnessScript: BitcoinJS.Buffer.from(parsedRequest.fund.htlcScript),
                });

                // Add refund output
                refundPsbt.addOutput({
                    address: storedRequest.fund.refundAddress,
                    value: storedRequest.fund.recipientOutput.value - fee,
                });

                // The timeoutTimestamp we parse from the BTC HTLC script is forwarded one hour
                // (because the timeout in the script itself is set back one hour, because the BTC
                // network only accepts locktimes that are at least one hour old). So we need to
                // remove this added hour before using it as the transaction's locktime.
                refundPsbt.locktime = parsedRequest.fund.htlcDetails.timeoutTimestamp - (60 * 60) + 1;
                // Signal to use locktime, but to not opt into replace-by-fee
                refundPsbt.setInputSequence(0, 0xfffffffe);

                // Sign
                const refundKeyPair = BitcoinJS.ECPair.fromPrivateKey(
                    // @ts-ignore Argument of type 'import("...").Buffer' is not assignable to parameter of
                    //            type 'Buffer'.
                    BitcoinJS.Buffer.from(privateKeys.btc_refund, 'hex'),
                );
                refundPsbt.signInput(0, refundKeyPair);

                // Verify that all inputs are signed
                if (!refundPsbt.validateSignaturesOfAllInputs()) {
                    throw new Error('Invalid or missing signature(s) for BTC transaction.');
                }

                // Finalize (with custom logic for the HTLC)
                refundPsbt.finalizeInput(0, (inputIndex, input /* , script, isSegwit, isP2SH, isP2WSH */) => {
                    if (!input.partialSig) {
                        throw new Errors.KeyguardError('UNEXPECTED: Input does not have a partial signature');
                    }

                    if (!input.witnessScript) {
                        throw new Errors.KeyguardError('UNEXPECTED: Input does not have a witnessScript');
                    }

                    const witnessBytes = BitcoinJS.script.fromASM([
                        input.partialSig[0].signature.toString('hex'),
                        input.partialSig[0].pubkey.toString('hex'),
                        'OP_0', // OP_0 (false) activates the refund branch in the HTLC script
                        input.witnessScript.toString('hex'),
                    ].join(' '));

                    const witnessStack = BitcoinJS.script.toStack(witnessBytes);

                    return {
                        finalScriptSig: undefined,
                        finalScriptWitness: HtlcUtils.witnessStackToScriptWitness(witnessStack),
                    };
                });

                result.refundTx = refundPsbt.extractTransaction().toHex();
            }
        }

        if (parsedRequest.fund.type === 'EUR' && storedRequest.fund.type === 'EUR') {
            // Nothing to do for funding EUR
            result.eur = '';
        }

        if (parsedRequest.redeem.type === 'NIM' && storedRequest.redeem.type === 'NIM') {
            await loadNimiq();

            const privateKey = new Nimiq.PrivateKey(Nimiq.BufferUtils.fromHex(privateKeys.nim));
            const publicKey = Nimiq.PublicKey.derive(privateKey);

            const transaction = Nimiq.Transaction.fromPlain({
                ...storedRequest.redeem.transaction.toPlain(),
                sender: parsedRequest.redeem.htlcAddress,
            });

            const signature = Nimiq.Signature.create(privateKey, publicKey, transaction.serializeContent());

            /** @type {KeyguardRequest.SignatureResult} */
            result.nim = {
                publicKey: publicKey.serialize(),
                signature: signature.serialize(),
            };
        }

        if (parsedRequest.redeem.type === 'BTC' && storedRequest.redeem.type === 'BTC') {
            const inputs = [{
                hash: parsedRequest.redeem.transactionHash,
                index: parsedRequest.redeem.outputIndex,
                witnessUtxo: {
                    script: parsedRequest.redeem.outputScript,
                    value: storedRequest.redeem.input.witnessUtxo.value,
                },
                witnessScript: BitcoinJS.Buffer.from(parsedRequest.redeem.htlcScript),
            }];

            // The address is set in SignSwap after password entry.
            if (!storedRequest.redeem.output.address) {
                throw new Errors.KeyguardError('Missing address in redeem output');
            }
            const output = /** @type {{address: string, value: number}} */ (storedRequest.redeem.output);

            // Construct transaction
            const psbt = new BitcoinJS.Psbt({ network: BitcoinUtils.Network });

            // Add inputs
            // @ts-ignore Argument of type 'Uint8Array' is not assignable to parameter of type 'Buffer'.
            psbt.addInputs(inputs);
            // Add outputs
            psbt.addOutput(output);

            // Sign
            const keyPair = BitcoinJS.ECPair.fromPrivateKey(
                // @ts-ignore Argument of type 'import("...").Buffer' is not assignable to parameter of type 'Buffer'.
                BitcoinJS.Buffer.from(privateKeys.btc[0], 'hex'),
            );
            psbt.signInput(0, keyPair);

            // Verify that all inputs are signed
            if (!psbt.validateSignaturesOfAllInputs()) {
                throw new Error('Invalid or missing signature(s) for BTC transaction.');
            }

            // Finalize (with custom logic for the HTLC)
            psbt.finalizeInput(0, (inputIndex, input /* , script, isSegwit, isP2SH, isP2WSH */) => {
                if (!input.partialSig) {
                    throw new Errors.KeyguardError('UNEXPECTED: Input does not have a partial signature');
                }

                if (!input.witnessScript) {
                    throw new Errors.KeyguardError('UNEXPECTED: Input does not have a witnessScript');
                }

                const witnessBytes = BitcoinJS.script.fromASM([
                    input.partialSig[0].signature.toString('hex'),
                    input.partialSig[0].pubkey.toString('hex'),
                    // Use zero-bytes as a dummy secret, required for signing
                    '0000000000000000000000000000000000000000000000000000000000000000',
                    'OP_1', // OP_1 (true) activates the redeem branch in the HTLC script
                    input.witnessScript.toString('hex'),
                ].join(' '));

                const witnessStack = BitcoinJS.script.toStack(witnessBytes);

                return {
                    finalScriptSig: undefined,
                    finalScriptWitness: HtlcUtils.witnessStackToScriptWitness(witnessStack),
                };
            });

            // Extract tx
            const tx = psbt.extractTransaction();

            /** @type {KeyguardRequest.SignedBitcoinTransaction} */
            result.btc = {
                transactionHash: tx.getId(),
                raw: tx.toHex(),
            };
        }

        if (parsedRequest.redeem.type === 'EUR' && storedRequest.redeem.type === 'EUR') {
            await loadNimiq();

            // Create and sign a JWS of the settlement instructions
            const privateKey = new Nimiq.PrivateKey(Nimiq.BufferUtils.fromHex(privateKeys.eur));
            const key = new Key(privateKey);

            /** @type {KeyguardRequest.SettlementInstruction} */
            const settlement = {
                ...storedRequest.redeem.settlement,
                contractId: parsedRequest.redeem.htlcId,
            };

            if (settlement.type === 'sepa') {
                // Remove spaces from IBAN
                settlement.recipient.iban = settlement.recipient.iban.replace(/\s/g, '');
            }

            result.eur = OasisSettlementInstructionUtils.signSettlementInstruction(key, 'm', settlement);
        }

        return result;
    }
}
/* global runKeyguard */
/* global SwapIFrameApi */

runKeyguard(SwapIFrameApi, {
    loadNimiq: false,
    whitelist: [
        'signSwapTransactions',
    ],
});
