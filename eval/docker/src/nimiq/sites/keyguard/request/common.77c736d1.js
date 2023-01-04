const Constants = { // eslint-disable-line no-unused-vars
    MIN_WIDTH_FOR_AUTOFOCUS: 600, // px
    NETWORK: {
        DEV: 'dev',
        TEST: 'test',
        MAIN: 'main',
    },
    LEGACY_DERIVATION_PATH: 'm/0\'',
    DEFAULT_DERIVATION_PATH: 'm/44\'/242\'/0\'/0\'',
    CASHLINK_FUNDING_DATA: new Uint8Array([0, 130, 128, 146, 135]), // 'CASH'.split('').map(c => c.charCodeAt(0) + 63)
    SWAP_IFRAME_SESSION_STORAGE_KEY_PREFIX: 'swap_id_',
};
/* global Constants */

// We want to only allow this config file in dev environments. Supporting IPs as hostname is nice for debugging e.g.
// on mobile devices, though. We assume that any keyguard instance hosted in production would be accessed by DNS.
const ipRegEx = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
if (window.location.hostname !== 'localhost' && !ipRegEx.test(window.location.hostname)) {
    throw new Error('Using development config is only allowed locally');
}

// @ts-ignore
const CONFIG = { // eslint-disable-line no-unused-vars
    ALLOWED_ORIGIN: '*',
    NETWORK: Constants.NETWORK.TEST,
    BTC_NETWORK: /** @type {'MAIN' | 'TEST'} */ ('TEST'), // BitcoinConstants is not included in the common bundle
    ROOT_REDIRECT: 'https://wallet.nimiq-testnet.com',
};
const SignMessageConstants = {
    SIGN_MSG_PREFIX: '\x16Nimiq Signed Message:\n',
};

// 'export' to client via side effects
window.__messageSigningPrefix = {
    MSG_PREFIX: SignMessageConstants.SIGN_MSG_PREFIX,
};
/* global JsonUtils */

/**
 * This file was generated from the @nimiq/rpc package source, with `RpcServer` being the only target.
 *
 * HOWTO:
 * - Remove `export * from './RpcClient';` from @nimiq/rpc/src/main.ts
 * - Run `yarn build` in the @nimiq/rpc directory
 * - @nimiq/rpc/dist/rpc.es.js is the wanted module file
 * - The following changes where made to this file afterwards:
 *   https://github.com/nimiq/keyguard/commits/master/src/lib/RpcServer.es.js
 */

/**
 * @typedef {'ok' | 'error'} ResponseStatus
 * @typedef {{origin: string, data: object}} Message
 * @typedef {{data: {id: number, status: ResponseStatus, result: any}}} ResponseMessage extends Message
 * @typedef {{source: string}} PostMessage extends Message
 * @typedef {{origin: string, data: {id: number, command: string, args: any[]}, returnURL: string}} RedirectRequest
 */

const ResponseStatus = {
    OK: /** @type {'ok'} */ ('ok'),
    ERROR: /** @type {'error'} */ ('error'),
};

class UrlRpcEncoder {
    /**
     * @param {Location} location
     * @returns {RedirectRequest?}
     */
    static receiveRedirectCommand(location) {
        const url = new URL(location.href);

        // Need referrer for origin check
        if (!document.referrer) return null;
        const referrer = new URL(document.referrer);

        // Parse query
        const params = new URLSearchParams(url.search);
        const fragment = new URLSearchParams(url.hash.substring(1));

        // Ignore messages without an ID
        if (!fragment.has('id')) return null;
        const id = parseInt(/** @type {string} */(fragment.get('id')), 10);
        fragment.delete('id');
        params.set(UrlRpcEncoder.URL_SEARCHPARAM_NAME, id.toString());

        // Ignore messages without a command
        if (!fragment.has('command')) return null;
        const command = /** @type {string} */ (fragment.get('command'));

        // Ignore messages without a valid return path
        if (!fragment.has('returnURL')) return null;
        const returnURL = /** @type {string} */ (fragment.get('returnURL'));
        // Only allow returning to same origin
        if (new URL(returnURL).origin !== referrer.origin) return null;

        // Parse args
        let args = [];
        if (fragment.has('args')) {
            try {
                args = JsonUtils.parse(/** @type {string} */ (fragment.get('args')));
            } catch (e) {
                // Do nothing
            }
        }
        args = Array.isArray(args) ? args : [];

        url.hash = '';
        url.search = params.toString();
        window.history.replaceState(window.history.state, '', url.href);

        return {
            origin: referrer.origin,
            data: {
                id,
                command,
                args,
            },
            returnURL,
        };
    }

    /**
     * @param {RpcState} state
     * @param {ResponseStatus} status
     * @param {any} result
     * @returns {string}
     */
    static prepareRedirectReply(state, status, result) {
        const returnUrl = new URL(/** @type {string} */ (state.returnURL));
        const fragment = new URLSearchParams(returnUrl.hash.substring(1));
        fragment.set('id', state.id.toString());
        fragment.set('status', status);
        fragment.set('result', JsonUtils.stringify(result));

        returnUrl.hash = fragment.toString();

        return returnUrl.href;
    }
}
UrlRpcEncoder.URL_SEARCHPARAM_NAME = 'rpcId';

class RpcState {
    /** @type {number} */
    get id() {
        return this._id;
    }

    /** @type {string} */
    get origin() {
        return this._origin;
    }

    /** @type {{command: string, args: any[], id: number}} */
    get data() {
        return this._data;
    }

    /** @type {string?} */
    get returnURL() {
        return this._returnURL;
    }

    /** @type {Window | null} */
    get source() {
        return this._source;
    }

    /**
     * @param {MessageEvent | RedirectRequest } message
     */
    constructor(message) {
        if (!message.data.id) throw Error('Missing id');
        this._origin = message.origin;
        this._id = message.data.id;
        this._postMessage = 'source' in message && !('returnURL' in message);
        this._returnURL = 'returnURL' in message ? message.returnURL : null;
        this._data = message.data;
        this._source = 'source' in message ? /** @type {Window} */ (message.source) : null;
    }

    /**
     * @param {ResponseStatus} status
     * @param {any} result
     */
    reply(status, result) {
        console.debug('RpcServer REPLY', result);
        if (status === ResponseStatus.ERROR) {
            // serialize error objects
            result = typeof result === 'object'
                ? { message: result.message, stack: result.stack, name: result.name }
                : { message: result };
        }
        if (this._postMessage) {
            // Send via postMessage (e.g., popup)
            let target;
            // If source is given, use it
            if (this._source) {
                target = this._source;
            } else {
                target = window.parent;
            }
            target.postMessage({
                status,
                result,
                id: this.id,
            }, this.origin);
        } else if (this._returnURL) {
            // Send via top-level navigation
            window.location.href = UrlRpcEncoder.prepareRedirectReply(this, status, result);
        }
    }

    /**
     * Only return an object when the request is via redirect,
     * because for iframe requests the request does not need
     * to be stored.
     *
     * @returns {RedirectRequest?}
     */
    toRequestObject() {
        if (!this._returnURL) return null;
        return {
            origin: this._origin,
            data: this._data,
            returnURL: this._returnURL,
        };
    }
}

class RpcServer { // eslint-disable-line no-unused-vars
    /**
     * @param {RpcState} state
     * @param {any} result
     */
    static _ok(state, result) {
        state.reply(ResponseStatus.OK, result);
    }

    /**
     * @param {RpcState} state
     * @param {Error} error
     */
    static _error(state, error) {
        state.reply(ResponseStatus.ERROR, error);
    }

    /**
     * @param {string} allowedOrigin
     */
    constructor(allowedOrigin) {
        this._allowedOrigin = allowedOrigin;
        this._responseHandlers = new Map();
        this._responseHandlers.set('ping', () => 'pong');
        this._receiveListener = this._receive.bind(this);
    }

    /**
     * @param {string} command
     * @param {Function} fn
     */
    onRequest(command, fn) {
        this._responseHandlers.set(command, fn);
    }

    /**
     * @returns {boolean} Whether a redirect request was handled
     */
    init() {
        window.addEventListener('message', this._receiveListener);
        return this._receiveRedirect();
    }

    close() {
        window.removeEventListener('message', this._receiveListener);
    }

    /**
     * @returns {boolean} Whether a redirect request was handled
     */
    _receiveRedirect() {
        // Check for a request in the URL (also removes params)
        const urlRequest = UrlRpcEncoder.receiveRedirectCommand(window.location);
        if (urlRequest) {
            return this._receive(urlRequest);
        }

        // Check for a stored request referenced by a URL 'id' parameter
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has(UrlRpcEncoder.URL_SEARCHPARAM_NAME)) {
            const storedRequest = window.sessionStorage.getItem(
                `request-${searchParams.get(UrlRpcEncoder.URL_SEARCHPARAM_NAME)}`,
            );
            if (storedRequest) {
                return this._receive(JsonUtils.parse(storedRequest), false);
            }
        }

        return false;
    }

    /**
     * @param {MessageEvent | RedirectRequest} message
     * @param {boolean} [persistMessage]
     * @returns {boolean} Whether a redirect request was handled
     */
    _receive(message, persistMessage = true) {
        let _state = null;
        try {
            _state = new RpcState(message);
            const state = _state;

            // Cannot reply to a message that has no source window or return URL
            if (!('source' in message) && !('returnURL' in message)) return false;
            // Ignore messages without a command
            if (!('command' in state.data)) return false;
            if (this._allowedOrigin !== '*' && message.origin !== this._allowedOrigin) {
                throw new Error('Unauthorized');
            }
            const args = message.data.args && Array.isArray(message.data.args) ? message.data.args : [];
            // Test if request calls a valid handler with the correct number of arguments
            if (!this._responseHandlers.has(state.data.command)) {
                throw new Error(`Unknown command: ${state.data.command}`);
            }
            const requestedMethod = this._responseHandlers.get(state.data.command);
            // Do not include state argument
            if (Math.max(requestedMethod.length - 1, 0) < args.length) {
                throw new Error(`Too many arguments passed: ${JSON.stringify(message)}`);
            }
            console.debug('RpcServer ACCEPT', state.data);

            if (persistMessage) {
                sessionStorage.setItem(`request-${state.data.id}`, JsonUtils.stringify(state.toRequestObject()));
            }

            // Call method
            const result = requestedMethod(state, ...args);
            // If a value is returned, we take care of the reply,
            // otherwise we assume the handler to do the reply when appropriate.
            if (result instanceof Promise) {
                result
                    .then(finalResult => {
                        if (finalResult !== undefined) {
                            RpcServer._ok(state, finalResult);
                        }
                    })
                    .catch(error => RpcServer._error(state, error));
            } else if (result !== undefined) {
                RpcServer._ok(state, result);
            }
            return true;
        } catch (error) {
            if (_state) {
                RpcServer._error(_state, error);
            }
            return false;
        }
    }
}
/* global Nimiq */
/* global Key */
/* global KeyInfo */
/* global AccountStore */
/* global BrowserDetection */
/* global Errors */
/* global CookieJar */

/**
 * Usage:
 * <script src="lib/key.js"></script>
 * <script src="lib/key-store-indexeddb.js"></script>
 *
 * const keyStore = KeyStore.instance;
 * const accounts = await keyStore.list();
 */
class KeyStore {
    /** @type {KeyStore} */
    static get instance() {
        KeyStore._instance = KeyStore._instance || new KeyStore();
        return KeyStore._instance;
    }

    /**
     * @param {KeyRecord} keyRecord
     * @returns {boolean}
     */
    static isEncrypted(keyRecord) {
        // Because we are supporting legacy secrets which cannot be converted during migration,
        // a KeyRecord can be both V2 (legacy) and V3 (Imagewallet, default) encrypted.
        return keyRecord.secret.byteLength === KeyStore.ENCRYPTED_SECRET_SIZE_V2
            || keyRecord.secret.byteLength === KeyStore.ENCRYPTED_SECRET_SIZE;
    }

    constructor() {
        /** @type {Promise<IDBDatabase>?} */
        this._dbPromise = null;
    }

    /**
     * @returns {Promise<IDBDatabase>}
     * @private
     */
    async connect() {
        if (this._dbPromise) return this._dbPromise;

        this._dbPromise = new Promise((resolve, reject) => {
            const request = window.indexedDB.open(KeyStore.DB_NAME, KeyStore.DB_VERSION);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
            request.onupgradeneeded = event => {
                /** @type {IDBDatabase} */
                const db = request.result;

                if (event.oldVersion < 4) {
                    // Setup the database, deleting old testnet versions (prior to 4) if existing.
                    try {
                        db.deleteObjectStore(KeyStore.DB_KEY_STORE_NAME);
                    } catch (e) {} // eslint-disable-line no-empty
                    db.createObjectStore(KeyStore.DB_KEY_STORE_NAME, { keyPath: 'id' });
                }
            };
        });

        return this._dbPromise;
    }

    /**
     * @param {string} id
     * @param {Uint8Array} [password]
     * @returns {Promise<Key?>}
     */
    async get(id, password) {
        const keyRecord = await this._get(id);
        if (!keyRecord) {
            return null;
        }

        if (!KeyStore.isEncrypted(keyRecord)) {
            // Compare stored type with purposeID to make sure there was no storage error.
            const purposeId = new Nimiq.SerialBuffer(keyRecord.secret).readUint32();
            const expectedPurposeId = keyRecord.type === Nimiq.Secret.Type.PRIVATE_KEY
                ? Nimiq.PrivateKey.PURPOSE_ID
                : Nimiq.Entropy.PURPOSE_ID;
            if (purposeId !== expectedPurposeId) {
                throw new Errors.KeyguardError('Stored type does not match secret\'s purposeId');
            }

            const secret = keyRecord.type === Nimiq.Secret.Type.PRIVATE_KEY
                ? new Nimiq.PrivateKey(keyRecord.secret.subarray(4)) // The first 4 bytes are the purposeId
                : new Nimiq.Entropy(keyRecord.secret.subarray(4));

            return new Key(secret, keyRecord.hasPin);
        }

        if (!password) {
            throw new Error('Password required');
        }

        const secret = await Nimiq.Secret.fromEncrypted(new Nimiq.SerialBuffer(keyRecord.secret), password);
        return new Key(secret, keyRecord.hasPin);
    }

    /**
     * @param {string} id
     * @returns {Promise<KeyInfo?>}
     */
    async getInfo(id) {
        const keyRecord = await this._get(id);
        return keyRecord
            ? KeyInfo.fromObject(keyRecord, KeyStore.isEncrypted(keyRecord), keyRecord.defaultAddress)
            : null;
    }

    /**
     * @param {string} id
     * @returns {Promise<KeyRecord?>}
     * @private
     */
    async _get(id) {
        const db = await this.connect();
        const transaction = db.transaction([KeyStore.DB_KEY_STORE_NAME], 'readonly');
        const request = transaction.objectStore(KeyStore.DB_KEY_STORE_NAME).get(id);
        return KeyStore.requestToPromise(request, transaction);
    }

    /**
     * @param {Key} key
     * @param {Uint8Array} [password]
     * @returns {Promise<string>}
     */
    async put(key, password) {
        /** @type {Nimiq.SerialBuffer} */
        let buffer;
        if (password) {
            buffer = await key.secret.exportEncrypted(password);
        } else {
            buffer = new Nimiq.SerialBuffer(KeyStore.UNENCRYPTED_SECRET_SIZE);

            // When storing the secret unencrypted, we prepend the
            // purposeID to the secret as a safety redundancy.
            const purposeId = key.secret instanceof Nimiq.PrivateKey
                ? Nimiq.PrivateKey.PURPOSE_ID
                : Nimiq.Entropy.PURPOSE_ID;

            buffer.writeUint32(purposeId);
            key.secret.serialize(buffer);
        }

        const keyRecord = /** @type {KeyRecord} */ {
            id: key.id,
            type: key.type,
            hasPin: key.hasPin,
            secret: buffer.subarray(0, buffer.byteLength),
            defaultAddress: key.defaultAddress.serialize(),
        };

        return this.putPlain(keyRecord);
    }

    /**
     * @param {KeyRecord} keyRecord
     * @returns {Promise<string>}
     */
    async putPlain(keyRecord) {
        if (keyRecord.secret.byteLength !== KeyStore.ENCRYPTED_SECRET_SIZE
            && keyRecord.secret.byteLength !== KeyStore.ENCRYPTED_SECRET_SIZE_V2 // Required for migration
            && keyRecord.secret.byteLength !== KeyStore.UNENCRYPTED_SECRET_SIZE) {
            throw new Errors.KeyguardError('KeyRecord.secret has invalid length');
        }
        const db = await this.connect();
        const transaction = db.transaction([KeyStore.DB_KEY_STORE_NAME], 'readwrite');
        const request = transaction.objectStore(KeyStore.DB_KEY_STORE_NAME).put(keyRecord);

        const dbKey = await KeyStore.requestToPromise(request, transaction);

        /** @type {string} */
        const newId = (dbKey.valueOf());

        return newId;
    }

    /**
     * @param {string} id
     * @returns {Promise<void>}
     */
    async remove(id) {
        const db = await this.connect();
        const transaction = db.transaction([KeyStore.DB_KEY_STORE_NAME], 'readwrite');
        const request = transaction.objectStore(KeyStore.DB_KEY_STORE_NAME).delete(id);
        return KeyStore.requestToPromise(request, transaction);
    }

    /**
     * @returns {Promise<KeyInfo[]>}
     */
    async list() {
        const results = await this._listRecords();
        return results.map(
            keyRecord => KeyInfo.fromObject(keyRecord, KeyStore.isEncrypted(keyRecord), keyRecord.defaultAddress),
        );
    }

    /**
     * @returns {Promise<void>}
     */
    async close() {
        if (!this._dbPromise) return;
        // If failed to open database (i.e. _dbPromise rejects) we don't need to close the db
        const db = await this._dbPromise.catch(() => null);
        this._dbPromise = null;
        if (db) db.close();
    }

    /**
     * To migrate from the 'account' database and store (AccountStore) to this new
     * 'nimiq-keyguard' database with the 'keys' store, this function is called by
     * the account manager (via IFrameApi.migrateAccountstoKeys()) after it successfully
     * stored the existing account labels. Both the 'accounts' database and cookie are
     * deleted afterwards.
     *
     * @returns {Promise<void>}
     * @deprecated Only for database migration
     */
    async migrateAccountsToKeys() {
        const accounts = await AccountStore.instance.dangerousListPlain();
        const keysRecords = KeyStore.accountRecords2KeyRecords(accounts);
        await Promise.all(keysRecords.map(keyRecord => this.putPlain(keyRecord)));

        await new Promise(async resolve => {
            setTimeout(resolve, 2000); // Wait 2s and then just continue
            await AccountStore.instance.drop();
            resolve();
        });

        if (BrowserDetection.isIOS() || BrowserDetection.isSafari()) {
            // Delete migrate cookie
            CookieJar.deleteCookie('migrate');

            // Delete accounts cookie
            CookieJar.deleteCookie('accounts');
        }
    }

    /**
     * @param {AccountRecord[]} accounts
     * @returns {KeyRecord[]}
     */
    static accountRecords2KeyRecords(accounts) {
        return accounts.map(account => {
            const address = Nimiq.Address.fromUserFriendlyAddress(account.userFriendlyAddress);
            const legacyKeyHash = Key.deriveHash(address.serialize());

            return {
                id: legacyKeyHash,
                type: Nimiq.Secret.Type.PRIVATE_KEY,
                hasPin: account.type === 'low',
                secret: account.encryptedKeyPair,
                defaultAddress: address.serialize(),
            };
        });
    }

    /**
     * @param {AccountInfo[]} accounts
     * @returns {KeyguardRequest.LegacyKeyInfoObject[]}
     */
    static accountInfos2KeyInfos(accounts) {
        return accounts.map(account => {
            const address = Nimiq.Address.fromUserFriendlyAddress(account.userFriendlyAddress);
            const legacyKeyHash = Key.deriveHash(address.serialize());

            /** @type {KeyguardRequest.LegacyKeyInfoObject} */
            const legacyKeyObject = {
                id: legacyKeyHash,
                type: Nimiq.Secret.Type.PRIVATE_KEY,
                hasPin: account.type === 'low',
                legacyAccount: {
                    label: account.label,
                    address: address.serialize(),
                },
            };

            return legacyKeyObject;
        });
    }

    /**
     * @returns {Promise<KeyRecord[]>}
     */
    async _listRecords() {
        const db = await this.connect();
        const request = db.transaction([KeyStore.DB_KEY_STORE_NAME], 'readonly')
            .objectStore(KeyStore.DB_KEY_STORE_NAME)
            .openCursor();

        return KeyStore._readAllFromCursor(request);
    }

    /**
     * @param {IDBRequest} request
     * @param {IDBTransaction} transaction
     * @returns {Promise<any>}
     */
    static async requestToPromise(request, transaction) {
        const done = await Promise.all([
            new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            }),
            new Promise((resolve, reject) => {
                transaction.oncomplete = () => resolve();
                transaction.onabort = () => reject(transaction.error);
                transaction.onerror = () => reject(transaction.error);
            }),
        ]);

        // In case of rejection of any one of the above promises,
        // the 'await' keyword makes sure that the error is thrown
        // and this async function is itself rejected.

        // Promise.all returns an array of resolved promises, but we are only
        // interested in the request.result, which is the first item.
        return done[0];
    }

    /**
     * @param {IDBRequest} request
     * @returns {Promise<KeyRecord[]>}
     * @private
     */
    static _readAllFromCursor(request) {
        return new Promise((resolve, reject) => {
            /** @type {KeyRecord[]} */
            const results = [];
            request.onsuccess = () => {
                const cursor = request.result;
                if (cursor) {
                    results.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }
}
/** @type {KeyStore?} */
KeyStore._instance = null;

KeyStore.DB_VERSION = 4;
KeyStore.DB_NAME = 'nimiq-keyguard';
KeyStore.DB_KEY_STORE_NAME = 'keys';

// The current default (V3/Imagewallet format)
KeyStore.ENCRYPTED_SECRET_SIZE = 56; /* version + rounds: 2, salt: 16, checksum: 2, purposeId: 4, secret: 32 */

// 'Legacy' format, used by migrated keys
KeyStore.ENCRYPTED_SECRET_SIZE_V2 = 54; /* version + rounds: 2, secret: 32, salt: 16, checksum: 4 */

// Default unencrypted format (legacy keys could not be stored unencrypted)
KeyStore.UNENCRYPTED_SECRET_SIZE = /* purposeId */ 4 + /* secret */ 32;
/* global Nimiq */

// eslint-disable-next-line no-unused-vars
class KeyInfo {
    /**
     * @param {string} id
     * @param {Nimiq.Secret.Type} type
     * @param {boolean} encrypted
     * @param {boolean} hasPin
     * @param {Uint8Array} defaultAddress
     */
    constructor(id, type, encrypted, hasPin, defaultAddress) {
        /** @private */
        this._id = id;
        /** @private */
        this._type = type;
        /** @private */
        this._encrypted = encrypted;
        /** @private */
        this._hasPin = hasPin;
        /** @private */
        this._defaultAddress = new Nimiq.Address(defaultAddress);
        /**
         * @description Used for distinguishing pre-migration accountInfo from regular keyInfo
         * @type {boolean}
         * @private
         */
        this.useLegacyStore = false;
    }

    /**
     * @type {string}
     */
    get id() {
        return this._id;
    }

    /**
     * @type {Nimiq.Secret.Type}
     */
    get type() {
        return this._type;
    }

    /**
     * @type {boolean}
     */
    get encrypted() {
        return this._encrypted;
    }

    set encrypted(encrypted) {
        this._encrypted = encrypted;
    }

    /**
     * @type {boolean}
     */
    get hasPin() {
        return this._hasPin;
    }

    /** @type {Nimiq.Address} */
    get defaultAddress() {
        return this._defaultAddress;
    }

    /**
     * @returns {KeyguardRequest.KeyInfoObject}
     */
    toObject() {
        return {
            id: this.id,
            type: this.type,
            hasPin: this.hasPin,
        };
    }

    /**
     * @param {KeyguardRequest.KeyInfoObject} obj
     * @param {boolean} encrypted
     * @param {Uint8Array} defaultAddress
     * @returns {KeyInfo}
     */
    static fromObject(obj, encrypted, defaultAddress) {
        return new KeyInfo(obj.id, obj.type, encrypted, obj.hasPin, defaultAddress);
    }
}
/* global Constants */
/* global Nimiq */
/* global SignMessageConstants */

class Key {
    /**
     * @param {Uint8Array} input
     * @returns {string}
     */
    static deriveHash(input) {
        return Nimiq.Hash.blake2b(input).toBase64();
    }

    /**
     * @param {Nimiq.Entropy|Nimiq.PrivateKey} secret
     * @param {boolean} [hasPin]
     */
    constructor(secret, hasPin = false) {
        this._secret = secret;
        this._hasPin = hasPin;
        /** @type {string?} */
        this._id = null;
        this._defaultAddress = this.deriveAddress(Constants.DEFAULT_DERIVATION_PATH);
    }

    /**
     * @param {string} path
     * @returns {Nimiq.PublicKey}
     */
    derivePublicKey(path) {
        return Nimiq.PublicKey.derive(this.derivePrivateKey(path));
    }

    /**
     * @param {string} path
     * @returns {Nimiq.Address}
     */
    deriveAddress(path) {
        return this.derivePublicKey(path).toAddress();
    }

    /**
     * @param {string} path
     * @param {Uint8Array} data
     * @returns {Nimiq.Signature}
     */
    sign(path, data) {
        const privateKey = this.derivePrivateKey(path);
        const publicKey = Nimiq.PublicKey.derive(privateKey);
        return Nimiq.Signature.create(privateKey, publicKey, data);
    }

    /**
     * @param {string} path
     * @param {Uint8Array} message - A byte array
     * @returns {Nimiq.Signature}
     */
    signMessage(path, message) {
        const msgLength = message.byteLength;
        const msgLengthAsString = msgLength.toString(10);

        /**
         * Adding a prefix to the message makes the calculated signature recognisable as
         * a Nimiq specific signature. This and the hashing prevents misuse where a malicious
         * request can sign arbitrary data (e.g. a transaction) and use the signature to
         * impersonate the victim. (https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign)
         */
        const dataLength = SignMessageConstants.SIGN_MSG_PREFIX.length
                         + msgLengthAsString.length
                         + msgLength;

        // Construct buffer
        const data = new Nimiq.SerialBuffer(dataLength);
        data.write(Nimiq.BufferUtils.fromAscii(SignMessageConstants.SIGN_MSG_PREFIX));
        data.write(Nimiq.BufferUtils.fromAscii(msgLengthAsString));
        data.write(message);

        // Hash data before signing (uses SHA256, because it is the widest available)
        const hash = Nimiq.Hash.computeSha256(data);

        return this.sign(path, hash);
    }

    /**
     * @param {string} path
     * @returns {Nimiq.PrivateKey}
     */
    derivePrivateKey(path) {
        return this._secret instanceof Nimiq.Entropy
            ? this._secret.toExtendedPrivateKey().derivePath(path).privateKey
            : this._secret;
    }

    /**
     * @type {string}
     */
    get id() {
        if (!this._id) {
            this._id = this.hash;
        }
        return this._id;
    }

    /**
     * @type {Nimiq.Entropy|Nimiq.PrivateKey}
     */
    get secret() {
        return this._secret;
    }

    /**
     * @type {Nimiq.Secret.Type}
     */
    get type() {
        return this._secret.type;
    }

    /**
     * @type {boolean}
     */
    get hasPin() {
        return this._hasPin;
    }

    set hasPin(hasPin) {
        /** @type {boolean} */ // Annotation required for Typescript
        this._hasPin = hasPin;
    }

    get defaultAddress() {
        return this._defaultAddress;
    }

    /**
     * @type {string}
     */
    get hash() {
        // Private keys use the address as input, as during migration of legacy accounts
        // their entropy or public key is not known, as it is stored encrypted.
        const input = this._secret instanceof Nimiq.Entropy
            ? this._secret.serialize()
            : Nimiq.PublicKey.derive(this._secret).toAddress().serialize();
        return Key.deriveHash(input);
    }
}

Key.PIN_LENGTH = 6;
/* global Nimiq */
/* global Errors */

class JsonUtils {
    /**
     * @param {any} value
     * @returns {string}
     */
    static stringify(value) {
        return JSON.stringify(value, JsonUtils._jsonifyType);
    }

    /**
     * @param {string} value
     * @returns {any}
     */
    static parse(value) {
        return JSON.parse(value, JsonUtils._parseType);
    }

    /**
     * @param {string} key
     * @param {any} value
     * @returns {any}
     */
    static _parseType(key, value) {
        /* eslint-disable no-prototype-builtins */
        if (value && value.hasOwnProperty
            && value.hasOwnProperty(JsonUtils.TYPE_SYMBOL)
            && value.hasOwnProperty(JsonUtils.VALUE_SYMBOL)) {
            /* eslint-enable no-prototype-builtins */
            switch (value[JsonUtils.TYPE_SYMBOL]) {
                case JsonUtils.ExtraJsonTypes.UINT8_ARRAY: {
                    const buf = Nimiq.BufferUtils.fromBase64(value[JsonUtils.VALUE_SYMBOL]);
                    return buf.subarray(0, buf.byteLength);
                }
                default:
                    throw new Errors.KeyguardError(`Unknown type ${value[JsonUtils.TYPE_SYMBOL]}`);
            }
        }
        return value;
    }

    /**
     * @param {string} key
     * @param {any} value
     * @returns {any}
     */
    static _jsonifyType(key, value) {
        if (value instanceof Uint8Array) {
            return JsonUtils._typedObject(JsonUtils.ExtraJsonTypes.UINT8_ARRAY, Nimiq.BufferUtils.toBase64(value));
        }
        return value;
    }

    /* eslint-disable-next-line valid-jsdoc */
    /**
     * @param {number} type
     * @param {string} value
     * @returns {{[x: string]: number|string}}
     */
    static _typedObject(type, value) {
        /** @type {{[x: string]: number|string}} */
        const obj = {};
        obj[JsonUtils.TYPE_SYMBOL] = type;
        obj[JsonUtils.VALUE_SYMBOL] = value;
        return obj;
    }
}

JsonUtils.TYPE_SYMBOL = '__';
JsonUtils.VALUE_SYMBOL = 'v';
JsonUtils.ExtraJsonTypes = {
    UINT8_ARRAY: 0,
};
/* global ErrorConstants */

class Errors { }

Errors.BaseError = class extends Error {
    /**
     *  @param {string} type
     *  @param {string|Error?} messageOrError
     */
    constructor(type, messageOrError = null) {
        if (messageOrError instanceof Error) {
            const error = messageOrError;
            super(error.message);
            if (error.name === 'Error') {
                this.name = type;
            } else {
                this.name = error.name;
            }
            if (error.stack) {
                this.stack = error.stack;
            }
        } else {
            const message = messageOrError;
            super(message || '');
            this.name = type;
        }
    }
};

Errors.InvalidRequestError = class extends Errors.BaseError {
    /**
     *  @param {string|Error} [messageOrError]
     */
    constructor(messageOrError) {
        super(ErrorConstants.Types.INVALID_REQUEST, messageOrError);
    }
};

Errors.CoreError = class extends Errors.BaseError {
    /**
     *  @param {string|Error} [messageOrError]
     */
    constructor(messageOrError) {
        super(ErrorConstants.Types.CORE, messageOrError);
    }
};

Errors.KeyguardError = class extends Errors.BaseError {
    /**
     *  @param {string|Error} [messageOrError]
     */
    constructor(messageOrError) {
        super(ErrorConstants.Types.KEYGUARD, messageOrError);
    }
};

Errors.UnclassifiedError = class extends Errors.BaseError {
    /**
     *  @param {string|Error} [messageOrError]
     * */
    constructor(messageOrError) {
        super(ErrorConstants.Types.UNCLASSIFIED, messageOrError);
    }
};

Errors.KeyNotFoundError = class extends Errors.KeyguardError {
    constructor() {
        super(ErrorConstants.Messages.KEY_NOT_FOUND);
    }
};

Errors.RequestCanceled = class extends Errors.KeyguardError {
    constructor() {
        super(ErrorConstants.Messages.CANCELED);
    }
};

Errors.RequestExpired = class extends Errors.KeyguardError {
    constructor() {
        super(ErrorConstants.Messages.EXPIRED);
    }
};

Errors.GoToResetPassword = class extends Errors.KeyguardError {
    constructor() {
        super(ErrorConstants.Messages.GOTO_RESET_PASSWORD);
    }
};

Errors.GoToCreate = class extends Errors.KeyguardError {
    constructor() {
        super(ErrorConstants.Messages.GOTO_CREATE);
    }
};

Errors.InvalidNetworkConfig = class extends Errors.KeyguardError {
    constructor() {
        super(ErrorConstants.Messages.INVALID_NETWORK_CONFIG);
    }
};
/** @type KeyguardRequest.KeyguardError */
const ErrorConstants = {
    Types: {
        // used for request parsing errors.
        INVALID_REQUEST: 'InvalidRequest',
        // used for errors thrown from core methods
        CORE: 'Core',
        // used for other internal keyguard Errors.
        KEYGUARD: 'Keyguard',
        // used for the remaining Errors which are not assigned an own type just yet.
        UNCLASSIFIED: 'Unclassified',
    },
    Messages: {
        // specifically used to trigger a redirect to create after returning to caller
        GOTO_CREATE: 'GOTO_CREATE',
        // Specifically used to trigger a redirect to a special import after returning to caller
        GOTO_RESET_PASSWORD: 'GOTO_RESET_PASSWORD',
        // used to signal a user initiated cancelation of the request
        CANCELED: 'CANCELED',
        // used to signal that the request expired
        EXPIRED: 'EXPIRED',
        // used to signal that a given keyId no longer exist in KG, to be treated by caller.
        KEY_NOT_FOUND: 'keyId not found',
        // network name does not exist
        INVALID_NETWORK_CONFIG: 'Invalid network config',
    },
};

// 'export' to client via side effects
window.__keyguardErrorContainer = {
    ErrorConstants,
};
/* global KeyInfo */

class CookieJar { // eslint-disable-line no-unused-vars
    /**
     * @param {KeyInfo[]} keys
     */
    static fill(keys) {
        this.writeCookie('k', this._encodeCookie(keys));
    }

    /**
     * @returns {KeyInfo[]}
     */
    static eat() {
        const match = document.cookie.match(new RegExp('k=([^;]+)'));
        if (match && match[1]) {
            return this._decodeCookie(match[1]);
        }

        return [];
    }

    /**
     * @deprecated Only for database migration
     * @returns {AccountInfo[]}
     */
    static eatDeprecated() {
        const match = document.cookie.match(new RegExp('accounts=([^;]+)'));
        if (match && match[1]) {
            const decoded = decodeURIComponent(match[1]);
            const cookieAccounts = JSON.parse(decoded);

            // Map from cookie format to AccountInfo format
            return cookieAccounts.map(
                /**
                 * @param {any} acc
                 * @returns {AccountInfo}
                 */
                acc => ({
                    userFriendlyAddress: acc.address,
                    type: acc.type,
                    label: acc.label,
                }),
            );
        }
        return [];
    }

    /**
     * @param {string} name
     * @param {string} value
     * @param {number} [maxAge]
     */
    static writeCookie(name, value, maxAge = 31536000 /* 1 year */) {
        const secure = window.location.protocol === 'https:' ? 'Secure;' : '';
        document.cookie = `${name}=${value};max-age=${maxAge.toString()};${secure}SameSite=strict;Path=/`;
    }

    /**
     * @param {string} name
     */
    static deleteCookie(name) {
        this.writeCookie(name, '', 0);
    }

    /**
     * @param {KeyInfo[]} keys
     * @returns {string}
     */
    static _encodeCookie(keys) {
        return keys.map(
            keyInfo => `${keyInfo.type}`
                     + `${keyInfo.hasPin ? 1 : 0}`
                     + `${keyInfo.id}`,
        ).join(',');
    }

    /**
     * @param {string} str
     * @returns {KeyInfo[]}
     */
    static _decodeCookie(str) {
        if (!str) return [];

        const keys = str.split(',');

        return keys.map(key => {
            const type = /** @type {Nimiq.Secret.Type} */ (parseInt(key[0], 10));
            const hasPin = key[1] === '1';
            const id = key.substr(2);
            return new KeyInfo(id, type, true, hasPin, new Uint8Array(20 /* Nimiq.Address.SERIALIZED_SIZE */));
            // Cookies are only eaten during IframeApi.list(), in which the KeyInfo is
            // converted into a KeyguardRequest.KeyInfoObject, loosing the 'encrypted' status flag.
            // Thus it does not matter what we pass to the KeyInfo contructor here for that flag.
        });
    }
}
class BrowserDetection { // eslint-disable-line no-unused-vars
    /**
     * @returns {boolean}
     */
    static isDesktopSafari() {
        // see https://stackoverflow.com/a/23522755
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && !/mobile/i.test(navigator.userAgent);
    }

    /**
     * @returns {boolean}
     */
    static isSafari() {
        return !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/);
    }

    /**
     * @returns {boolean}
     */
    static isIOS() {
        // @ts-ignore (MSStream is not on window)
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }

    /**
     * @returns {number[]}
     */
    static iOSVersion() {
        if (BrowserDetection.isIOS()) {
            const v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            if (v) {
                return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || '0', 10)];
            }
        }

        throw new Error('No iOS version detected');
    }

    /**
     * @returns {boolean}
     */
    static isBadIOS() {
        const version = this.iOSVersion();
        return version[0] < 11 || (version[0] === 11 && version[1] === 2); // Only 11.2 has the WASM bug
    }

    /**
     * @returns {boolean}
     */
    static isMobile() {
        return window.matchMedia('only screen and (max-width: 760px)').matches;
    }

    /**
     * @returns {boolean}
     */
    static isTouchDevice() {
        return (('ontouchstart' in window)
            || (navigator.maxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
    }
}
/* global Nimiq */
/* global Key */
/* global KeyInfo */
/* global KeyStore */

/**
 * DEPRECATED
 * This class is only used for retrieving keys and accounts from the old KeyStore.
 *
 * Usage:
 * <script src="lib/account-store-indexeddb.js"></script>
 *
 * const accountStore = AccountStore.instance;
 * const accounts = await accountStore.list();
 * accountStore.drop();
 */

class AccountStore {
    /** @type {AccountStore} */
    static get instance() {
        /** @type {AccountStore} */
        this._instance = this._instance || new AccountStore();
        return this._instance;
    }

    /**
     * @param {string} dbName
     * @constructor
     */
    constructor(dbName = AccountStore.ACCOUNT_DATABASE) {
        this._dbName = dbName;
        this._dropped = false;
        /** @type {Promise<IDBDatabase?>|?} */
        this._dbPromise = null;
    }

    /**
     * @returns {Promise<IDBDatabase?>}
     * @private
     */
    async connect() {
        if (this._dbPromise) return this._dbPromise;

        this._dbPromise = new Promise((resolve, reject) => {
            const request = window.indexedDB.open(this._dbName, AccountStore.VERSION);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => reject(request.error);
            request.onupgradeneeded = () => {
                // account database doesn't exist
                this._dropped = true;
                if (request.transaction) request.transaction.abort();
                resolve(null);
            };
        });

        return this._dbPromise;
    }

    /**
     * @returns {Promise<AccountInfo[]>}
     */
    async list() {
        const db = await this.connect();
        if (!db) return [];
        return new Promise((resolve, reject) => {
            const results = /** @type {AccountInfo[]} */ ([]);
            const openCursorRequest = db.transaction([AccountStore.ACCOUNT_DATABASE], 'readonly')
                .objectStore(AccountStore.ACCOUNT_DATABASE)
                .openCursor();
            openCursorRequest.onsuccess = () => {
                const cursor = openCursorRequest.result;
                if (cursor) {
                    const key = cursor.value;

                    /** @type {AccountInfo} */
                    const accountInfo = {
                        userFriendlyAddress: key.userFriendlyAddress,
                        type: key.type,
                        label: key.label,
                    };

                    results.push(accountInfo);
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            openCursorRequest.onerror = () => reject(openCursorRequest.error);
        });
    }

    /**
     * @returns {Promise<AccountRecord[]>}
     * @deprecated Only for database migration
     *
     * @description Returns the encrypted keypairs!
     */
    async dangerousListPlain() {
        const db = await this.connect();
        if (!db) return [];
        return new Promise((resolve, reject) => {
            const results = /** @type {AccountRecord[]} */ ([]);
            const openCursorRequest = db.transaction([AccountStore.ACCOUNT_DATABASE], 'readonly')
                .objectStore(AccountStore.ACCOUNT_DATABASE)
                .openCursor();
            openCursorRequest.onsuccess = () => {
                const cursor = openCursorRequest.result;
                if (cursor) {
                    const key = /** @type {AccountRecord} */ (cursor.value);
                    results.push(key);
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            openCursorRequest.onerror = () => reject(openCursorRequest.error);
        });
    }

    /**
     * @param {string} id
     * @param {Uint8Array} password
     * @returns {Promise<Key?>}
     */
    async get(id, password) {
        /** @type {KeyRecord?} */
        const keyRecord = await this._get(id);
        if (!keyRecord) return null;

        const secret = await Nimiq.Secret.fromEncrypted(new Nimiq.SerialBuffer(keyRecord.secret), password);
        return new Key(secret, keyRecord.hasPin);
    }

    /**
     * @param {string} id
     * @returns {Promise<KeyInfo?>}
     */
    async getInfo(id) {
        const keyRecord = await this._get(id);
        if (!keyRecord) return null;
        const keyInfo = KeyInfo.fromObject(keyRecord, KeyStore.isEncrypted(keyRecord), keyRecord.defaultAddress);
        keyInfo.useLegacyStore = true;
        return keyInfo;
    }

    /**
     * @param {string} id
     * @returns {Promise<KeyRecord?>}
     * @private
     */
    async _get(id) {
        const db = await this.connect();
        if (!db) return null;
        const transaction = db.transaction([AccountStore.ACCOUNT_DATABASE], 'readonly');
        const request = transaction.objectStore(AccountStore.ACCOUNT_DATABASE).get(id);
        /** @type {AccountRecord} */
        const accountRecord = await KeyStore.requestToPromise(request, transaction);
        if (!accountRecord) return null;
        return KeyStore.accountRecords2KeyRecords([accountRecord])[0];
    }

    async close() {
        if (!this._dbPromise) return;
        // If failed to open database (i.e. _dbPromise rejects) we don't need to close the db
        const db = await this._dbPromise.catch(() => null);
        this._dbPromise = null;
        if (db) db.close();
    }

    /**
     * @returns {Promise<void>}
     */
    async drop() {
        if (this._dropped) return Promise.resolve();
        await this.close();

        return new Promise((resolve, reject) => {
            const request = window.indexedDB.deleteDatabase(this._dbName);

            request.onsuccess = () => {
                this._dropped = true;
                resolve();
            };

            request.onerror = () => reject(request.error);
        });
    }
}

AccountStore.VERSION = 2;
AccountStore.ACCOUNT_DATABASE = 'accounts';
/* global Nimiq */
/* global RpcServer */
/* global Errors */
/* global Constants */
/* global CONFIG */
// /* global BrowserDetection */

/**
 * @callback reject
 * @param {Error} error
 */

/** @type {Promise<void>?} */
let __nimiqLoaded = null;

// if ((BrowserDetection.isIOS() || BrowserDetection.isSafari()) && 'serviceWorker' in navigator) {
//     // Register service worker to strip cookie from requests.
//     // This file is always called from a ./request/*/ folder, hence the paths.
//     navigator.serviceWorker.register('../../ServiceWorker.js', {
//         scope: '../../',
//     }).then(reg => {
//         console.debug(`Service worker has been registered for scope: ${reg.scope}`);
//     }).catch(error => {
//         console.error('Service worker installation failed');
//         throw error;
//     });
// }

/**
 * Singleton promise
 *
 * @returns {Promise<void>}
 */
async function loadNimiq() {
    // eslint-disable-next-line no-return-assign
    return __nimiqLoaded || (__nimiqLoaded = new Promise(async resolve => {
        // Load web assembly encryption library into browser (if supported)
        await Nimiq.WasmHelper.doImport();

        switch (CONFIG.NETWORK) {
            case Constants.NETWORK.DEV:
                Nimiq.GenesisConfig.dev();
                break;
            case Constants.NETWORK.TEST:
                Nimiq.GenesisConfig.test();
                break;
            case Constants.NETWORK.MAIN:
                Nimiq.GenesisConfig.main();
                break;
            default:
                throw new Errors.InvalidNetworkConfig();
        }

        resolve();
    }));
}

/**
 * @typedef {{loadNimiq: boolean, whitelist: string[]}} Options
 */

/**
 * @template {KeyguardRequest.RedirectRequest} T
 * @param {Newable} RequestApiClass - Class object of the API which is to be exposed via RPC
 * @param {Partial<Options>} [opts]
 */
async function runKeyguard(RequestApiClass, opts) { // eslint-disable-line no-unused-vars
    /** @type {Options} */
    const defaultOptions = {
        loadNimiq: true,
        whitelist: ['request'],
    };

    /** @type {Options} */
    const options = Object.assign(defaultOptions, opts);

    if (options.loadNimiq) {
        await loadNimiq();
    }

    // If user navigates back to loading screen, skip it
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '') {
            window.history.back();
        }
    });

    // Back arrow functionality
    document.body.addEventListener('click', event => {
        // @ts-ignore (Property 'matches' does not exist on type 'EventTarget'.)
        if (!event.target || !event.target.matches('a.page-header-back-button')) return;
        window.history.back();
    });

    // Instantiate handler.
    /** @type {TopLevelApi<T> | IFrameApi} */
    const api = new RequestApiClass();

    /** @type {string} */
    const allowedOrigin = CONFIG.ALLOWED_ORIGIN;

    window.rpcServer = new RpcServer(allowedOrigin);

    options.whitelist.forEach(/** @param {string} method */ method => {
        // @ts-ignore (Element implicitly has an 'any' type because type 'TopLevelApi' has no index signature.)
        window.rpcServer.onRequest(method, api[method].bind(api));
    });

    const handledRedirectRequest = window.rpcServer.init();

    if (window.top === window && !handledRedirectRequest) {
        // This is not an iframe and no request was handled
        TopLevelApi.showNoRequestErrorPage(); // eslint-disable-line no-undef
    }
}
