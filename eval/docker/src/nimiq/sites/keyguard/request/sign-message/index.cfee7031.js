class IqonHash { /* eslint-disable-line no-unused-vars */
    /**
     * @param {string} address
     * @returns {number}
     */
    static getBackgroundColorIndex(address) {
        const hash = this.hash(address);
        return parseInt(hash[2], 10);
    }

    /**
     * @param {string} text
     * @returns {string}
     */
    static hash(text) {
        const fullHash = text
            .split('')
            .map(c => Number(c.charCodeAt(0)) + 3)
            .reduce((a, e) => a * (1 - a) * this._chaosHash(e), 0.5)
            .toString()
            .split('')
            .reduce((a, e) => e + a, '');

        const hash = fullHash
            .replace('.', fullHash[5]) // Replace the dot as it cannot be parsed to int
            .substr(4, 17);

        // The index 5 of `fullHash` is currently unused (index 1 of `hash`,
        // after cutting off the first 4 elements). Iqons.svg() is not using it.

        // A small percentage of returned values are actually too short,
        // leading to an invalid bottom index and feature color. Adding
        // padding creates a bottom feature and accent color where no
        // existed previously, thus it's not a disrupting change.
        return this._padEnd(hash, 13, fullHash[5]);
    }

    /**
     * @param {number} number
     * @returns {number}
     */
    static _chaosHash(number) {
        const k = 3.569956786876;
        let an = 1 / number;
        for (let i = 0; i < 100; i++) {
            an = (1 - an) * an * k;
        }
        return an;
    }

    /**
     * Polyfill for String.padEnd()
     *
     * @param {string} string
     * @param {number} maxLength
     * @param {string} fillString
     * @returns {string}
     */
    static _padEnd(string, maxLength, fillString) {
        if (String.prototype.padEnd) return string.padEnd(maxLength, fillString);

        while (string.length < maxLength) {
            string += fillString;
        }
        return string.substring(0, Math.max(string.length, maxLength));
    }
}
/* global IqonHash */
/* global TemplateTags */

class Iqons {
    /* Public API */

    /**
     * @param {string} text
     * @returns {Promise<string>}
     */
    static async svg(text) {
        const hash = IqonHash.hash(text);
        return this._svgTemplate(
            parseInt(hash[0], 10),
            parseInt(hash[2], 10),
            parseInt(hash[3] + hash[4], 10),
            parseInt(hash[5] + hash[6], 10),
            parseInt(hash[7] + hash[8], 10),
            parseInt(hash[9] + hash[10], 10),
            parseInt(hash[11], 10),
        );
    }

    /**
     * @param {string} text
     * @returns {Promise<string>}
     */
    static async toDataUrl(text) {
        const base64string = btoa(await this.svg(text));
        return TemplateTags.hasVars(1)`data:image/svg+xml;base64,${base64string.replace(/#/g, '%23')}`;
    }

    /**
     * @param {string} [color]
     * @param {number} [strokeWidth]
     * @returns {string}
     */
    static placeholder(color, strokeWidth) {
        color = color || '#bbb';
        strokeWidth = strokeWidth || 1;
        /* eslint-disable max-len */
        return TemplateTags.hasVars(4)`<svg viewBox="0 0 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" >
            <path fill="none" stroke="${color}" stroke-width="${2 * strokeWidth}" transform="translate(0, 8) scale(0.5)" d="M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z"/>
            <g transform="scale(0.9) translate(9, 8)">
                <circle cx="80" cy="80" r="40" fill="none" stroke="${color}" stroke-width="${strokeWidth}" opacity=".9"></circle>
                <g opacity=".1" fill="#010101"><path d="M119.21,80a39.46,39.46,0,0,1-67.13,28.13c10.36,2.33,36,3,49.82-14.28,10.39-12.47,8.31-33.23,4.16-43.26A39.35,39.35,0,0,1,119.21,80Z"/></g>\`
            </g>
        </svg>`;
        /* eslint-enable max-len */
    }

    /**
     * @param {string} [color]
     * @param {number} [strokeWidth]
     * @returns {string}
     */
    static placeholderToDataUrl(color, strokeWidth) {
        return TemplateTags.hasVars(1)`data:image/svg+xml;base64,${btoa(this.placeholder(color, strokeWidth))}`;
    }

    /* Private API */

    /**
     * @param {number} color
     * @param {number} backgroundColor
     * @param {number} faceNr
     * @param {number} topNr
     * @param {number} sidesNr
     * @param {number} bottomNr
     * @param {number} accentColor
     * @returns {Promise<string>}
     */
    static async _svgTemplate(color, backgroundColor, faceNr, topNr, sidesNr, bottomNr, accentColor) {
        return this._$svg(await this._$iqons(color, backgroundColor, faceNr, topNr, sidesNr, bottomNr, accentColor));
    }

    /**
     * @param {number} color
     * @param {number} backgroundColor
     * @param {number} faceNr
     * @param {number} topNr
     * @param {number} sidesNr
     * @param {number} bottomNr
     * @param {number} accentColor
     * @returns {Promise<string>}
     */
    static async _$iqons(color, backgroundColor, faceNr, topNr, sidesNr, bottomNr, accentColor) {
        if (color === backgroundColor) {
            color += 1;
            if (color > 9) color = 0;
        }

        while (accentColor === color || accentColor === backgroundColor) {
            accentColor += 1;
            if (accentColor > 9) accentColor = 0;
        }

        const colorString = this.colors[color];
        const backgroundColorString = this.backgroundColors[backgroundColor];
        const accentColorString = this.colors[accentColor];

        /* eslint-disable max-len */
        return TemplateTags.hasVars(8)`<g color="${colorString}" fill="${accentColorString}">
            <rect fill="${backgroundColorString}" x="0" y="0" width="160" height="160"></rect>
            <circle cx="80" cy="80" r="40" fill="${colorString}"></circle>
            <g opacity=".1" fill="#010101"><path d="M119.21,80a39.46,39.46,0,0,1-67.13,28.13c10.36,2.33,36,3,49.82-14.28,10.39-12.47,8.31-33.23,4.16-43.26A39.35,39.35,0,0,1,119.21,80Z"/></g>
            ${await this._generatePart('top', topNr)}
            ${await this._generatePart('side', sidesNr)}
            ${await this._generatePart('face', faceNr)}
            ${await this._generatePart('bottom', bottomNr)}
        </g>`;
        /* eslint-enable max-len */
    }

    /**
     * @param {string} content
     * @returns {string}
     */
    static _$svg(content) {
        const randomId = this._getRandomId();
        /* eslint-disable max-len */
        return TemplateTags.hasVars(3)`<svg viewBox="0 0 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" >
            <defs>
                <clipPath id="hexagon-clip-${randomId}">
                    <path d="M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z" transform="scale(0.5) translate(0, 16)"/>
                </clipPath>
            </defs>
            <g clip-path="url(#hexagon-clip-${randomId})">
                ${content}
            </g>
        </svg>`;
        /* eslint-enable max-len */
    }

    /**
     * @param {string} part
     * @param {number} index
     * @returns {Promise<string>}
     */
    static async _generatePart(part, index) {
        const assets = await this._getAssets();
        const selector = `#${part}_${this._assetIndex(index, part)}`;
        const $part = assets.querySelector(selector);
        return ($part && $part.innerHTML) || '';
    }

    /**
     * @returns {Promise<Document>}
     */
    static async _getAssets() {
        // eslint-disable-next-line no-return-assign
        return this._assetsPromise || (this._assetsPromise = fetch(window.NIMIQ_IQONS_SVG_PATH || Iqons.SVG_PATH)
            .then(response => response.text())
            .then(assetsText => {
                const parser = new DOMParser();
                return parser.parseFromString(assetsText, 'image/svg+xml');
            })
        );
    }

    /**
     * @returns {boolean}
     */
    static hasAssets() {
        if (!this._assetsPromise) return false;
        let hasReturned = false;
        this._assetsPromise.then(() => { hasReturned = true; });
        return hasReturned;
    }

    /** @type {string[]} */
    static get colors() {
        return [
            '#FC8702', // orange-600
            '#D94432', // red-700
            '#E9B213', // yellow-700
            '#1A5493', // indigo-600
            '#0582CA', // light-blue-500
            '#5961A8', // purple-600
            '#21bca5', // teal-500
            '#FA7268', // pink-300
            '#88B04B', // light-green-600
            '#795548', // brown-400
        ];
    }

    /** @type {string[]} */
    static get backgroundColors() {
        return [
            '#FC8702', // orange-600
            '#D94432', // red-700
            '#E9B213', // yellow-700
            '#1F2348', // indigo-600
            '#0582CA', // light-blue-500
            '#5F4B8B', // purple-600
            '#21bca5', // teal-500
            '#FA7268', // pink-300
            '#88B04B', // light-green-600
            '#795548', // brown-400
        ];
    }

    /** @type {object} */
    static get assetCounts() {
        return {
            face: Iqons.CATALOG.face.length,
            side: Iqons.CATALOG.side.length,
            top: Iqons.CATALOG.top.length,
            bottom: Iqons.CATALOG.bottom.length,
        };
    }

    /**
     * @param {number} index
     * @param {string} part
     * @returns {string}
     */
    static _assetIndex(index, part) {
        index = (index % this.assetCounts[part]) + 1;
        let fullIndex = index.toString();
        if (index < 10) fullIndex = `0${fullIndex}`;
        return fullIndex;
    }

    /**
     * @returns {number}
     */
    static _getRandomId() {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return array[0];
    }
}

Iqons.SVG_PATH = '../../assets/Iqons.min.svg';

Iqons.CATALOG = {
    face: [
        'face_01', 'face_02', 'face_03', 'face_04', 'face_05', 'face_06', 'face_07',
        'face_08', 'face_09', 'face_10', 'face_11', 'face_12', 'face_13', 'face_14',
        'face_15', 'face_16', 'face_17', 'face_18', 'face_19', 'face_20', 'face_21',
    ],
    side: [
        'side_01', 'side_02', 'side_03', 'side_04', 'side_05', 'side_06', 'side_07',
        'side_08', 'side_09', 'side_10', 'side_11', 'side_12', 'side_13', 'side_14',
        'side_15', 'side_16', 'side_17', 'side_18', 'side_19', 'side_20', 'side_21',
    ],
    top: [
        'top_01', 'top_02', 'top_03', 'top_04', 'top_05', 'top_06', 'top_07',
        'top_08', 'top_09', 'top_10', 'top_11', 'top_12', 'top_13', 'top_14',
        'top_15', 'top_16', 'top_17', 'top_18', 'top_19', 'top_20', 'top_21',
    ],
    bottom: [
        'bottom_01', 'bottom_02', 'bottom_03', 'bottom_04', 'bottom_05', 'bottom_06', 'bottom_07',
        'bottom_08', 'bottom_09', 'bottom_10', 'bottom_11', 'bottom_12', 'bottom_13', 'bottom_14',
        'bottom_15', 'bottom_16', 'bottom_17', 'bottom_18', 'bottom_19', 'bottom_20', 'bottom_21',
    ],
};
/* global Nimiq */
/* global I18n */
/* global TemplateTags */

class TabWidthSelector extends Nimiq.Observable {
    /**
     * @param {?HTMLElement} $el
     */
    constructor($el) {
        super();

        this.$el = TabWidthSelector._createElement($el);

        // Load last used width from localStorage.
        this._tabWidth = localStorage.getItem(TabWidthSelector.LOCALSTORAGE_KEY) || TabWidthSelector.DEFAULT_TAB_WIDTH;
        this._updateClasses();

        this.$width2Button = /** @type {HTMLButtonElement} */ (this.$el.querySelector('button[data-width="2"]'));
        this.$width4Button = /** @type {HTMLButtonElement} */ (this.$el.querySelector('button[data-width="4"]'));
        this.$width8Button = /** @type {HTMLButtonElement} */ (this.$el.querySelector('button[data-width="8"]'));

        this._onSelection = this._onSelection.bind(this);

        this.$width2Button.addEventListener('click', this._onSelection);
        this.$width4Button.addEventListener('click', this._onSelection);
        this.$width8Button.addEventListener('click', this._onSelection);
    }

    /**
     * @param {?HTMLElement} [$el]
     * @returns {HTMLElement}
     */
    static _createElement($el) {
        $el = $el || document.createElement('div');
        $el.classList.add('tab-width-selector');

        /* eslint-disable max-len */
        $el.innerHTML = TemplateTags.noVars`
            <span data-i18n="tab-width-selector-label">Tab Width</span>
            <button class="nq-button-s" data-width="2">2</button>
            <button class="nq-button-s" data-width="4">4</button>
            <button class="nq-button-s" data-width="8">8</button>
        `;
        /* eslint-enable max-len */

        I18n.translateDom($el);
        return $el;
    }

    get width() {
        return this._tabWidth;
    }

    /**
     * @param {Event} event
     */
    _onSelection(event) {
        if (!event.target) return;
        const width = /** @type {HTMLButtonElement} */ (event.target).dataset.width;
        if (!width) return; // For Typescript, as the width could be 'undefined' in the dataset
        this._updateWidth(width);
    }

    /**
     * @param {string} width
     */
    _updateWidth(width) {
        this._tabWidth = width;
        this._updateClasses();
        localStorage.setItem(TabWidthSelector.LOCALSTORAGE_KEY, this._tabWidth);
        this.fire(TabWidthSelector.Events.INPUT, this._tabWidth);
    }

    _updateClasses() {
        this.$el.classList.remove('width-2', 'width-4', 'width-8');
        this.$el.classList.add(`width-${this._tabWidth}`);
    }
}

TabWidthSelector.LOCALSTORAGE_KEY = 'tab-width';
TabWidthSelector.DEFAULT_TAB_WIDTH = '4';

TabWidthSelector.Events = {
    INPUT: 'tabwidthselector-input',
};
/* global Iqons */

class Identicon { // eslint-disable-line no-unused-vars
    /**
     * @param {string} [address]
     * @param {HTMLDivElement} [$el]
     */
    constructor(address, $el) {
        this._address = address;

        this.$el = Identicon._createElement($el);

        /** @type {HTMLImageElement} */
        this.$imgEl = (this.$el.firstChild);

        this._updateIqon();
    }

    /**
     * @returns {HTMLDivElement}
     */
    getElement() {
        return this.$el;
    }

    /**
     * @param {string} address
     */
    set address(address) {
        this._address = address;
        this._updateIqon();
    }

    /**
     * @param {HTMLDivElement} [$el]
     * @returns {HTMLDivElement}
     */
    static _createElement($el) {
        const $element = $el || document.createElement('div');
        const imageElement = new Image();
        $element.classList.add('identicon');
        while ($element.firstChild) { $element.removeChild($element.firstChild); }
        $element.appendChild(imageElement);

        return $element;
    }

    _updateIqon() {
        if (!this._address || !Iqons.hasAssets()) {
            this.$imgEl.src = Iqons.placeholderToDataUrl();
        }

        if (this._address) {
            Iqons.toDataUrl(this._address).then(url => {
                // Placeholder setting above is synchronous, thus this async result will replace the placeholder
                this.$imgEl.src = url;
            });
        }
    }
}
/* global TopLevelApi */
/* global SignMessage */
/* global Errors */

/** @extends {TopLevelApi<KeyguardRequest.SignMessageRequest>} */
class SignMessageApi extends TopLevelApi { // eslint-disable-line no-unused-vars
    /**
     * @param {KeyguardRequest.SignMessageRequest} request
     * @returns {Promise<Parsed<KeyguardRequest.SignMessageRequest>>}
     */
    async parseRequest(request) {
        if (!request) {
            throw new Errors.InvalidRequestError('request is required');
        }

        const parsedRequest = {};
        parsedRequest.appName = this.parseAppName(request.appName);
        parsedRequest.keyInfo = await this.parseKeyId(request.keyId);
        parsedRequest.keyLabel = this.parseLabel(request.keyLabel);
        parsedRequest.keyPath = this.parsePath(request.keyPath, 'keyPath');
        parsedRequest.message = this.parseMessage(request.message);
        parsedRequest.signerLabel = /** @type {string} */ (this.parseLabel(request.signerLabel, false));
        parsedRequest.signer = this.parseAddress(request.signer, 'signer');

        return parsedRequest;
    }

    get Handler() {
        return SignMessage;
    }
}
/* global Nimiq */
/* global Key */
/* global KeyStore */
/* global TabWidthSelector */
/* global Identicon */
/* global PasswordBox */
/* global Utf8Tools */
/* global KeyStore */
/* global Errors */
/* global TopLevelApi */

/**
 * @callback SignMessage.resolve
 * @param {KeyguardRequest.SignatureResult} result
 */

class SignMessage {
    /**
     * @param {Parsed<KeyguardRequest.SignMessageRequest>} request
     * @param {SignMessage.resolve} resolve
     * @param {reject} reject
     */
    constructor(request, resolve, reject) {
        /** @type {HTMLDivElement} */
        const $page = (document.getElementById(SignMessage.Pages.SIGN_MESSAGE));

        /** @type {HTMLDivElement} */
        const $signerIdenticon = ($page.querySelector('#signer-identicon'));

        /** @type {HTMLDivElement} */
        const $signerLabel = ($page.querySelector('#signer-label'));

        /** @type {HTMLInputElement} */
        const $message = ($page.querySelector('#message'));

        // Set message
        if (typeof request.message === 'string') {
            $message.value = request.message;

            // Look for tabs
            if (request.message.includes('\t')) {
                // Init tab width selector

                /** @type {HTMLDivElement} */
                const $tabWidthSelector = ($page.querySelector('#tab-width-selector'));
                const tws = new TabWidthSelector($tabWidthSelector);

                // @ts-ignore Property 'tabSize' does not exist on type 'CSSStyleDeclaration'
                $message.style.tabSize = tws.width;

                tws.on(TabWidthSelector.Events.INPUT, width => {
                    // @ts-ignore Property 'tabSize' does not exist on type 'CSSStyleDeclaration'
                    $message.style.tabSize = width;
                });

                $page.classList.add('show-tab-width-selector');
            }
        } else {
            $message.value = Nimiq.BufferUtils.toHex(request.message);
        }

        // Set signing account
        const signerAddress = request.signer.toUserFriendlyAddress();
        new Identicon(signerAddress, $signerIdenticon); // eslint-disable-line no-new
        $signerLabel.textContent = request.signerLabel;

        // Set up password box
        /** @type {HTMLFormElement} */
        const $passwordBox = (document.querySelector('#password-box'));
        this._passwordBox = new PasswordBox($passwordBox, {
            hideInput: !request.keyInfo.encrypted,
            buttonI18nTag: 'passwordbox-sign-msg',
            minLength: request.keyInfo.hasPin ? Key.PIN_LENGTH : undefined,
        });

        this._passwordBox.on(
            PasswordBox.Events.SUBMIT,
            password => this._onConfirm(request, resolve, reject, password),
        );
    }

    /**
     * @param {Parsed<KeyguardRequest.SignMessageRequest>} request
     * @param {SignMessage.resolve} resolve
     * @param {reject} reject
     * @param {string} [password]
     * @returns {Promise<void>}
     * @private
     */
    async _onConfirm(request, resolve, reject, password) {
        TopLevelApi.setLoading(true);

        const passwordBuf = password ? Utf8Tools.stringToUtf8ByteArray(password) : undefined;

        /** @type {Key?} */
        let key = null;
        try {
            key = await KeyStore.instance.get(request.keyInfo.id, passwordBuf);
        } catch (e) {
            if (e.message === 'Invalid key') {
                TopLevelApi.setLoading(false);
                this._passwordBox.onPasswordIncorrect();
                return;
            }
            reject(new Errors.CoreError(e));
            return;
        }

        if (!key) {
            reject(new Errors.KeyNotFoundError());
            return;
        }

        const publicKey = key.derivePublicKey(request.keyPath);

        // Validate that the derived address is the same as the request's 'signer' address
        const derivedAddress = publicKey.toAddress();
        if (!derivedAddress.equals(request.signer)) {
            reject(new Errors.KeyguardError('Provided keyPath does not derive provided signer address'));
            return;
        }

        /** @type {Uint8Array} */
        let messageBytes;
        if (typeof request.message === 'string') {
            messageBytes = Utf8Tools.stringToUtf8ByteArray(request.message);
        } else {
            messageBytes = request.message;
        }

        const signature = key.signMessage(request.keyPath, messageBytes);

        /** @type {KeyguardRequest.SignatureResult} */
        const result = {
            publicKey: publicKey.serialize(),
            signature: signature.serialize(),
        };
        resolve(result);
    }

    run() {
        // Go to start page
        window.location.hash = SignMessage.Pages.SIGN_MESSAGE;
    }
}

SignMessage.Pages = {
    SIGN_MESSAGE: 'sign-message',
};
/* global SignMessageApi */
/* global runKeyguard */

runKeyguard(SignMessageApi);
