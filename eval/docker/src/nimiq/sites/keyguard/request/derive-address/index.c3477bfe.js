/* global PasswordBox */
/* global KeyStore */
/* global Errors */
/* global Utf8Tools */
/* global TopLevelApi */

/**
 * @callback DeriveAddress.resolve
 * @param {KeyguardRequest.DerivedAddress[]} result
 */

class DeriveAddress {
    /**
     * @param {Parsed<KeyguardRequest.DeriveAddressRequest>} request
     * @param {DeriveAddress.resolve} resolve
     * @param {reject} reject
     */
    constructor(request, resolve, reject) {
        this._request = request;
        this._resolve = resolve;
        this._reject = reject;

        /** @type {HTMLFormElement} */
        const $passwordBox = (document.querySelector('.password-box'));

        // Create components

        this._passwordBox = new PasswordBox($passwordBox, {
            hideInput: !request.keyInfo.encrypted,
            buttonI18nTag: 'passwordbox-continue',
        });

        // Wire up logic

        this._passwordBox.on(PasswordBox.Events.SUBMIT, /** @param {string|undefined} password */ password => {
            this._onPasswordEntered(password);
        });
    } // constructor

    /**
     * @param {string} [password]
     * @returns {Promise<void>}
     */
    async _onPasswordEntered(password) {
        TopLevelApi.setLoading(true);
        const passwordBuffer = password && password.length > 0
            ? Utf8Tools.stringToUtf8ByteArray(password)
            : undefined;

        /** @type {Key|null} */
        let key = null;
        try {
            key = await KeyStore.instance.get(this._request.keyInfo.id, passwordBuffer);
        } catch (e) {
            if (e.message === 'Invalid key') {
                TopLevelApi.setLoading(false);
                this._passwordBox.onPasswordIncorrect();
                return;
            }
            this._reject(new Errors.CoreError(e));
            return;
        }

        if (!key) {
            this._reject(new Errors.KeyNotFoundError());
            return;
        }
        const masterKey = /** @type {Nimiq.Entropy} */ (key.secret).toExtendedPrivateKey();
        const pathsToDerive = this._request.indicesToDerive.map(index => `${this._request.baseKeyPath}/${index}`);

        /** @type {KeyguardRequest.DerivedAddress[]} */
        const derivedAddresses = pathsToDerive.map(path => ({
            address: masterKey.derivePath(path).toAddress().serialize(),
            keyPath: path,
        }));

        this._resolve(derivedAddresses);
    }

    async run() {
        window.location.hash = DeriveAddress.Pages.UNLOCK;
    }
}

DeriveAddress.Pages = {
    UNLOCK: 'unlock',
};
/* global Nimiq */
/* global TopLevelApi */
/* global DeriveAddress */
/* global Errors */

/** @extends {TopLevelApi<KeyguardRequest.DeriveAddressRequest>} */
class DeriveAddressApi extends TopLevelApi { // eslint-disable-line no-unused-vars
    /**
     * @param {KeyguardRequest.DeriveAddressRequest} request
     * @returns {Promise<Parsed<KeyguardRequest.DeriveAddressRequest>>}
     */
    async parseRequest(request) {
        if (!request) {
            throw new Errors.InvalidRequestError('request is required');
        }

        const parsedRequest = {};
        parsedRequest.appName = this.parseAppName(request.appName);
        parsedRequest.keyInfo = await this.parseKeyId(request.keyId);
        if (parsedRequest.keyInfo.type === Nimiq.Secret.Type.PRIVATE_KEY) {
            throw new Errors.InvalidRequestError('Cannot derive addresses for single-address accounts');
        }
        parsedRequest.keyLabel = this.parseLabel(request.keyLabel);
        parsedRequest.baseKeyPath = this.parsePath(request.baseKeyPath, 'baseKeyPath');
        parsedRequest.indicesToDerive = this.parseIndicesArray(request.indicesToDerive);

        return parsedRequest;
    }

    get Handler() {
        return DeriveAddress;
    }
}
/* global DeriveAddressApi */
/* global runKeyguard */

runKeyguard(DeriveAddressApi);
