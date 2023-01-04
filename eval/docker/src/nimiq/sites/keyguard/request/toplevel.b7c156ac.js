/* global I18n */
/* global TemplateTags */

class NoRequestErrorPage { // eslint-disable-line no-unused-vars
    constructor() {
        this.$el = NoRequestErrorPage._createElement();
    }

    /**
     * @returns {HTMLDivElement}
     */
    getElement() {
        return this.$el;
    }

    /**
     * @returns {HTMLDivElement}
     */
    static _createElement() {
        const $element = document.createElement('div');

        $element.classList.add('page');
        $element.id = 'error';

        $element.innerHTML = TemplateTags.noVars`
            <h1 class="nq-h1" data-i18n="error-no-request-heading">That went wrong :(</h1>
            <div data-i18n="error-no-request-message">
                We could not detect a valid request. Please go back and try again.
            </div>
        `;

        I18n.translateDom($element);

        return $element;
    }
}
/* global AnimationUtils */
/* global Nimiq */
/* global I18n */
/* global PasswordInput */
/* global TemplateTags */
/* global Key */

/**
 *  @typedef {{
 *      bgColor: string,
 *      hideInput: boolean,
 *      buttonI18nTag: string,
 *      minLength: number,
 *      showResetPassword: boolean,
 *  }} PasswordBoxOptions
 */

class PasswordBox extends Nimiq.Observable {
    // eslint-disable-next-line valid-jsdoc
    /**
     * @param {HTMLFormElement} [$el]
     * @param {Partial<PasswordBoxOptions>} [options]
     */
    constructor($el, options = {}) {
        const defaults = {
            bgColor: 'light-blue',
            hideInput: false,
            buttonI18nTag: 'passwordbox-confirm-tx',
            minLength: PasswordInput.DEFAULT_MIN_LENGTH,
            showResetPassword: false,
        };

        super();

        /** @type {PasswordBoxOptions} */
        this.options = Object.assign(defaults, options);

        this.$el = PasswordBox._createElement($el, this.options);

        this.$el.classList.toggle('hide-input', this.options.hideInput);

        this._passwordInput = new PasswordInput(this.$el.querySelector('[password-input]'));
        this._passwordInput.on(PasswordInput.Events.VALID, isValid => this._onInputChangeValidity(isValid));

        this.setMinLength(this.options.minLength);

        this._isInputValid = false;

        this.$el.addEventListener('submit', event => this._onSubmit(event));

        if (options.showResetPassword) {
            /** @type {HTMLAnchorElement} */
            (this.$el.querySelector('.skip')).addEventListener('click', /** @param {Event} event */ event => {
                event.preventDefault();
                this.fire(PasswordBox.Events.RESET_PASSWORD);
            });
        }
    }

    /**
     * @param {HTMLFormElement} [$el]
     * @param {PasswordBoxOptions} options
     * @returns {HTMLFormElement}
     */
    static _createElement($el, options) {
        $el = $el || document.createElement('form');
        $el.classList.add('password-box', 'actionbox');
        if (!options.hideInput) $el.classList.add(`nq-${options.bgColor}-bg`);

        // To enable i18n validation with the dynamic nature of the password box's contents,
        // all possible i18n tags and texts have to be specified here in the below format to
        // enable the validator to find them with its regular expression.
        /* eslint-disable max-len */
        /** @type {{[i18nTag: string]: string}} */
        const buttonVersions = {
            'passwordbox-continue': '<button class="submit" data-i18n="passwordbox-continue">Continue</button>',
            'passwordbox-confirm': '<button class="submit" data-i18n="passwordbox-confirm">Confirm</button>',
            'passwordbox-log-in': '<button class="submit" data-i18n="passwordbox-log-in">Unlock</button>',
            'passwordbox-log-out': '<button class="submit" data-i18n="passwordbox-log-out">Confirm logout</button>',
            'passwordbox-confirm-tx': '<button class="submit" data-i18n="passwordbox-confirm-tx">Confirm transaction</button>',
            'passwordbox-create-cashlink': '<button class="submit" data-i18n="passwordbox-create-cashlink">Create cashlink</button>',
            'passwordbox-show-words': '<button class="submit" data-i18n="passwordbox-show-words">Show recovery words</button>',
            'passwordbox-sign-msg': '<button class="submit" data-i18n="passwordbox-sign-msg">Sign message</button>',
            'passwordbox-confirm-swap': '<button class="submit" data-i18n="passwordbox-confirm-swap">Confirm swap</button>',
        };

        const resetPasswordHtml = options.showResetPassword
            ? TemplateTags.noVars`
                <a href="#" class="skip nq-link">
                    <span data-i18n="passwordbox-reset-password">Reset with Recovery Words</span>
                    <svg class="nq-icon">
                        <use xlink:href="/assets/nimiq-style.icons.svg#nq-caret-right-small"/>
                    </svg>
                <a>`
            : '';

        /** @type {{[i18nTag: string]: string}} */
        const promptVersions = {
            'passwordbox-enter-password': '<div class="prompt nq-text-s" data-i18n="passwordbox-enter-password">Enter your password</div>',
            'passwordbox-enter-pin': '<div class="prompt nq-text-s" data-i18n="passwordbox-enter-pin">Enter your PIN</div>',
        };
        /* eslint-enable max-len */

        if (!buttonVersions[options.buttonI18nTag]) throw new Error('PasswordBox button i18n tag not defined');

        /* eslint-disable max-len */
        $el.innerHTML = TemplateTags.hasVars(3)`
            ${promptVersions[options.minLength === Key.PIN_LENGTH ? 'passwordbox-enter-pin' : 'passwordbox-enter-password']}
            <div password-input></div>
            ${buttonVersions[options.buttonI18nTag]}
            <!-- Loading spinner SVG -->
            <svg height="48" width="54" color="inherit" class="loading-spinner"><g>
                <path class="big-hex" d="M51.9,21.9L41.3,3.6c-0.8-1.3-2.2-2.1-3.7-2.1H16.4c-1.5,0-2.9,0.8-3.7,2.1L2.1,21.9c-0.8,1.3-0.8,2.9,0,4.2 l10.6,18.3c0.8,1.3,2.2,2.1,3.7,2.1h21.3c1.5,0,2.9-0.8,3.7-2.1l10.6-18.3C52.7,24.8,52.7,23.2,51.9,21.9z" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.4" stroke-dasharray="92.5 60"/>
                <path class="small-hex" d="M51.9,21.9L41.3,3.6c-0.8-1.3-2.2-2.1-3.7-2.1H16.4c-1.5,0-2.9,0.8-3.7,2.1L2.1,21.9c-0.8,1.3-0.8,2.9,0,4.2 l10.6,18.3c0.8,1.3,2.2,2.1,3.7,2.1h21.3c1.5,0,2.9-0.8,3.7-2.1l10.6-18.3C52.7,24.8,52.7,23.2,51.9,21.9z" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="47.5 105"/>
            </g></svg>
            ${resetPasswordHtml}
        `;
        /* eslint-enable max-len */

        /** @type {HTMLButtonElement} */
        ($el.querySelector('button.submit')).classList.add('nq-button', options.bgColor);
        if (!options.hideInput) {
            /** @type {HTMLButtonElement} */
            ($el.querySelector('button.submit')).classList.add('inverse');
        }

        I18n.translateDom($el);
        return $el;
    }

    /** @returns {HTMLElement} @deprecated */
    getElement() {
        return this.$el;
    }

    /** @type {HTMLElement} */
    get element() {
        return this.$el;
    }

    focus() {
        if (!this.options.hideInput) {
            this._passwordInput.focus();
        }
    }

    reset() {
        this._passwordInput.reset();
    }

    /**
     * @param {number} [minLength]
     */
    setMinLength(minLength) {
        this._passwordInput.setMinLength(minLength);
    }

    /**
     * @returns {Promise<void>}
     */
    async onPasswordIncorrect() {
        await AnimationUtils.animate('shake', this.$el);
        this._passwordInput.reset();
        this._passwordInput.focus();
    }

    /**
     * @param {boolean} isValid
     */
    _onInputChangeValidity(isValid) {
        this._isInputValid = isValid;
        this.$el.classList.toggle('input-eligible', isValid);
    }

    /**
     * @param {Event} event
     */
    _onSubmit(event) {
        event.preventDefault();
        if (!this.options.hideInput && !this._isInputValid) return;

        const password = !this.options.hideInput ? this._passwordInput.text : undefined;
        this.fire(PasswordBox.Events.SUBMIT, password);
        this._passwordInput.reset();
    }

    /**
     * @param {boolean} hidden
     */
    hideInput(hidden) {
        this.options.hideInput = hidden;
        this.$el.classList.toggle('hide-input', hidden);
        this.$el.classList.toggle(`nq-${this.options.bgColor}-bg`, !hidden);
        /** @type {HTMLElement} */
        (this.$el.querySelector('button.submit')).classList.toggle('inverse', !hidden);
    }
}

PasswordBox.Events = {
    SUBMIT: 'passwordbox-submit',
    RESET_PASSWORD: 'passwordbox-reset-password',
};
/* global Nimiq */
/* global I18n */
/* global TemplateTags */
/* global BrowserDetection */

class PasswordInput extends Nimiq.Observable {
    /**
     * @param {?HTMLElement} $el
     * @param {number} [maxLength]
     * @param {string} [placeholder]
     */
    constructor($el, maxLength, placeholder = '••••••••') {
        super();
        this._minLength = PasswordInput.DEFAULT_MIN_LENGTH;
        this._maxLength = maxLength || Infinity;
        this.$el = PasswordInput._createElement($el);

        this.$input = /** @type {HTMLInputElement} */ (this.$el.querySelector('input.password'));
        this.$eyeButton = /** @type {HTMLElement} */ (this.$el.querySelector('.eye-button'));

        this.$input.placeholder = placeholder;

        this.$eyeButton.addEventListener('click', () => {
            this._changeVisibility();
            this.focus();
        });

        this._onInputChanged();
        this.$input.addEventListener('input', () => this._onInputChanged());

        // Scroll parent into view on mobile devices (except iOS) when input is focused and on 'input'
        // to prevent the submit button from being (partially) hidden behind the virtual keyboard
        if (BrowserDetection.isMobile() && BrowserDetection.isTouchDevice() && !BrowserDetection.isIOS()) {
            // 700ms to wait for on-screen keyboard to be visible, for most devices
            this.$input.addEventListener('focus', () => setTimeout(() => this.scrollParentIntoView(), 700));
            this.$input.addEventListener('input', () => this.scrollParentIntoView());
        }
    }

    /**
     * @param {?HTMLElement} [$el]
     * @returns {HTMLElement}
     */
    static _createElement($el) {
        $el = $el || document.createElement('form');
        $el.classList.add('password-input');

        /* eslint-disable max-len */
        $el.innerHTML = TemplateTags.noVars`
            <div class="input-container">
                <div class="input-wrapper">
                    <input class="nq-input password" type="password">
                </div>
                <svg class="nq-icon eye-button">
                    <use class="is-visible" xlink:href="/assets/nimiq-style.icons.svg#nq-view-off"/>
                    <use class="not-visible"  xlink:href="/assets/nimiq-style.icons.svg#nq-view"/>
                </svg>
            </div>
        `;
        /* eslint-enable max-len */

        I18n.translateDom($el);
        return $el;
    }

    /** @returns {HTMLElement} @deprecated */
    getElement() {
        return this.$el;
    }

    /** @type {HTMLElement} */
    get element() {
        return this.$el;
    }

    /** @type {HTMLInputElement} */
    get input() {
        return this.$input;
    }

    focus() {
        this.$input.focus();
    }

    reset() {
        this.$input.value = '';
        this._onInputChanged();
    }

    /** @param {boolean} [becomeVisible] */
    _changeVisibility(becomeVisible) {
        becomeVisible = typeof becomeVisible !== 'undefined'
            ? becomeVisible
            : this.$input.getAttribute('type') === 'password';
        this.$input.setAttribute('type', becomeVisible ? 'text' : 'password');
        this.$eyeButton.classList.toggle('visible', becomeVisible);
    }

    _onInputChanged() {
        const passwordLength = this.$input.value.length;
        this.valid = passwordLength >= this._minLength && passwordLength <= this._maxLength;

        this.fire(PasswordInput.Events.LENGTH, passwordLength);
        this.fire(PasswordInput.Events.VALID, this.valid);
    }

    /**
     * @returns {string}
     */
    get text() {
        return this.$input.value;
    }

    /**
     * @param {number} [minLength]
     */
    setMinLength(minLength) {
        this._minLength = minLength || PasswordInput.DEFAULT_MIN_LENGTH;
    }

    scrollParentIntoView() {
        const $parent = this.$el.parentElement;

        if (!$parent) return;

        $parent.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }
}

PasswordInput.Events = {
    VALID: 'passwordinput-valid',
    LENGTH: 'passwordinput-length',
};

PasswordInput.DEFAULT_MIN_LENGTH = 8;
class AnimationUtils { // eslint-disable-line no-unused-vars
    /**
     * @param {string} className
     * @param {HTMLElement} el
     * @param {Function} [afterStartCallback]
     * @param {Function} [beforeEndCallback]
     */
    static async animate(className, el, afterStartCallback, beforeEndCallback) {
        return new Promise(resolve => {
            // 'animiationend' is a native DOM event that fires upon CSS animation completion
            /** @param {Event} e */
            const listener = e => {
                if (e.target !== el) return;
                if (beforeEndCallback instanceof Function) beforeEndCallback();
                this.stopAnimate(className, el);
                el.removeEventListener('animationend', listener);
                resolve();
            };
            el.addEventListener('animationend', listener);
            el.classList.add(className);
            if (afterStartCallback instanceof Function) afterStartCallback();
        });
    }

    /**
     * @param {string} className
     * @param {HTMLElement} el
     */
    static stopAnimate(className, el) {
        el.classList.remove(className);
    }
}
/* global TRANSLATIONS */ // eslint-disable-line no-unused-vars
/* global Nimiq */

/**
 * @typedef {{[language: string]: {[id: string]: string}}} dict
 */

class I18n { // eslint-disable-line no-unused-vars
    /**
     * @param {dict} dictionary - Dictionary of all languages and phrases
     * @param {string} fallbackLanguage - Language to be used if no translation for the current language can be found
     */
    static initialize(dictionary, fallbackLanguage) {
        this._dict = dictionary;

        if (!(fallbackLanguage in this._dict)) {
            throw new Error(`Fallback language "${fallbackLanguage}" not defined`);
        }
        /** @type {string} */
        this._fallbackLanguage = fallbackLanguage;

        this.language = this.detectLanguage();

        window.addEventListener('focus', this._onTabFocus.bind(this));
    }

    /**
     * @returns {string} The detected language set in the 'lang' cookie. Fallback to the browser language.
     */
    static detectLanguage() {
        const cookieMatch = document.cookie.match(new RegExp('(^| )lang=([^;]+)'));
        const cookieLang = cookieMatch && decodeURIComponent(cookieMatch[2]);

        const lang = cookieLang || navigator.language.split('-')[0];
        return I18n.getClosestSupportedLanguage(lang);
    }

    /**
     * This method is executed on tab focus to check if the selected language got changed in another tab
     * by the user and, if so, ask him if he wants to reload the page to update translations
     */
    static _onTabFocus() {
        const lang = this.detectLanguage();
        if (lang !== this.language && Object.keys(window.TRANSLATIONS).includes(lang)) {
            this.language = lang;
            const question = this.translatePhrase('language-changed');

            // eslint-disable-next-line no-alert
            if (window.confirm(question)) {
                document.location.reload();
            }
        }
    }

    /**
     * @param {HTMLElement} [dom] - The DOM element to be translated, or body by default
     * @param {string} [enforcedLanguage] - ISO code of language to translate to
     */
    static translateDom(dom = document.body, enforcedLanguage) {
        const language = enforcedLanguage ? this.getClosestSupportedLanguage(enforcedLanguage) : this.language;

        /* eslint-disable-next-line valid-jsdoc */ // Multi-line descriptions are not valid JSDoc, apparently
        /**
         * @param {string} tag
         * @param {(element: HTMLElement, translation: string) => void} callback - callback(element, translation) for
         * each matching element
         */
        const translateElements = (tag, callback) => {
            const attribute = `data-${tag}`;
            /** @type {NodeListOf<HTMLElement>} */
            const elements = dom.querySelectorAll(`[${attribute}]`);
            elements.forEach(element => {
                const id = element.getAttribute(attribute);
                if (!id) return;
                callback(element, this._translate(id, language));
            });
        };

        /**
         * @param {string} tag
         */
        const translateAttribute = tag => {
            translateElements(`i18n-${tag}`, (element, translation) => element.setAttribute(tag, translation));
        };

        translateElements('i18n', (element, translation) => {
            const sanitized = translation.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const withMarkup = sanitized
                .replace(/\[strong]/g, '<strong>')
                .replace(/\[\/strong]/g, '</strong>')
                .replace(/\[br]/g, '<br/>');
            element.innerHTML = withMarkup;
        });
        translateAttribute('value');
        translateAttribute('placeholder');
    }

    /**
     * @param {string} id - translation dict ID
     * @param {string} [enforcedLanguage] - ISO code of language to translate to
     * @returns {string}
     */
    static translatePhrase(id, enforcedLanguage) {
        const language = enforcedLanguage ? this.getClosestSupportedLanguage(enforcedLanguage) : this.language;
        return this._translate(id, language);
    }

    /**
     * @param {string} id
     * @param {string} language
     * @returns {string}
     */
    static _translate(id, language) {
        if (!this.dictionary[language] || !this.dictionary[language][id]) {
            throw new Error(`I18n: ${language}/${id} is undefined!`);
        }
        return this.dictionary[language][id];
    }

    /**
     * @returns {string[]} ISO codes of all available languages.
     */
    static availableLanguages() {
        return Object.keys(this.dictionary);
    }

    /**
     * @param {string} language
     */
    static switchLanguage(language) {
        this.language = language;
    }

    /**
     * Selects a supported language closed to the desired language. Examples it might return:
     * en-us => en-us, en-us => en, en => en-us, fr => en.
     * @param {string} language - ISO 639-1 language codes, e.g. en, en-us, de, de-at
     * @returns {string}
     */
    static getClosestSupportedLanguage(language) {
        // If this language is supported, return it directly
        if (language in this.dictionary) return language;

        // Return the base language, if it exists in the dictionary
        const baseLanguage = language.split('-')[0];
        if (baseLanguage !== language && baseLanguage in this.dictionary) return baseLanguage;

        // Check if other versions (siblings) of the base language exist
        const languagePrefix = `${baseLanguage}-`;
        const siblingLanguage = this.availableLanguages()
            .find(supportedLanguage => supportedLanguage.startsWith(languagePrefix));

        return siblingLanguage || this.fallbackLanguage;
    }

    /**
     * @param {string} language - ISO 639-1 language codes, e.g. en, en-us, de, de-at
     */
    static set language(language) {
        const languageToUse = this.getClosestSupportedLanguage(language);

        if (languageToUse !== language) {
            // eslint-disable-next-line no-console
            console.warn(`Language ${language} not supported, using ${languageToUse} instead.`);
        }

        if (this._language !== languageToUse) {
            /** @type {string} */
            this._language = languageToUse;

            if (['interactive', 'complete'].indexOf(document.readyState) > -1) {
                this.translateDom();
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    this.translateDom();
                });
            }
            document.documentElement.setAttribute('lang', this._language);
            I18n.observer.fire(I18n.Events.LANGUAGE_CHANGED, this._language);
        }
    }

    /** @type {string} */
    static get language() {
        return this._language || this.fallbackLanguage;
    }

    /** @type {dict} */
    static get dictionary() {
        if (!this._dict) throw new Error('I18n not initialized');
        return this._dict;
    }

    /** @type {string} */
    static get fallbackLanguage() {
        if (!this._fallbackLanguage) throw new Error('I18n not initialized');
        return this._fallbackLanguage;
    }

    /** @returns {DOMParser} */
    static get parser() {
        /** @type {DOMParser} */
        this._parser = this._parser || new DOMParser();

        return this._parser;
    }
}

I18n.observer = new Nimiq.Observable();
I18n.Events = {
    LANGUAGE_CHANGED: 'language-changed',
};
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
class TemplateTags {
    // Let typescript infer return value. (Seems to be impossible to declare it the right way in standard JSDoc)
    // eslint-disable-next-line valid-jsdoc
    /**
     * @template {number} T
     * @param {T} variableCount
     *
     */
    static hasVars(variableCount) {
        return (
            /** @type {TemplateStringsArray} */ strings,
            /** @type {(string | number)[] & { length: T }} */ ...expressions
        ) => {
            if (expressions.length !== variableCount) {
                throw new Error('Illegal variable use');
            }

            let output = strings[0];
            expressions.forEach((expression, index) => {
                output += expression + strings[index + 1];
            });

            return output;
        };
    }
}

TemplateTags.noVars = TemplateTags.hasVars(0);
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
/* eslint-disable */
const TRANSLATIONS = {
de: {
    "_language": "Deutsch",

    "language-changed": "Die Anzeigesprache hat sich geändert. Möchtest du die Seite neu laden, um alle Übersetzungen zu aktualisieren? Andernfalls könnten manche Übersetzungen nicht automatisch aktualisiert werden.",

    "back-to-app": "Zurück zu {appName}",
    "back-to-accounts": "Zurück zu meinen Konten",
    "back-to-wallet": "Zurück zur {Wallet}",
    "back-to-miner": "Zurück zum {Nimiq Miner}",
    "back-to-faucet": "Zurück zur {Nimiq Faucet}",
    "back-to-donation": "Zurück zum Spendenbuttongenerator",
    "back-to-gift-card": "Zurück zur Geschenkkarte",
    "back-to-vote": "Zurück zur Abstimmung",
    "back-to-cpl": "Zurück zu CryptoPayment.link",

    "funding-cashlink": "Cashlink aufladen",

    "recovery-words-title": "Schreibe diese 24 Wörter auf Papier",
    "recovery-words-intro-text": "Die Wiederherstellungswörter sind der EINZIGE Weg, auf dein Konto zuzugreifen, wenn du deine Login‑Datei oder dein Passwort verlierst.",
    "recovery-words-intro-offline": "Bewahre deine Wörter offline auf und gib sie auf keiner anderen Seite als [strong]keyguard[/strong].nimiq.com ein.",
    "recovery-words-intro-copy": "Erstelle eine Kopie und verwahre sie an einem sicheren Ort: Dem Haus deiner Familie, Bankschließfach, etc.",
    "recovery-words-intro-safety": "Schütze dich vor Wasser und Feuer und verwahre deine Wieder­herstellungs­wörter in einer verschlossenen Kiste.",
    "recovery-words-text": "Jeder, der im Besitz dieser Wörter ist, kann auf dein Konto zugreifen. Verwahre sie sicher!",
    "recovery-words-validate": "Wörter überprüfen",

    "create-heading-choose-identicon": "Wähle einen Avatar",
    "create-address-label": "Deine Adresse:",
    "create-confirm-address": "Auswählen und weiter",
    "create-heading-create-password": "Erstelle ein Passwort",
    "create-heading-repeat-password": "Bestätige dein Passwort",
    "create-heading-validate-backup": "Überprüfe dein Backup",
    "create-loginfile-keycard": "Das Passwort schützt deine Login-Datei,\nbetrachte es als eine Schlüsselkarte zu deinem Account.",
    "create-loginfile-any-device": "Mit dieser Datei kannst du dich von jedem Gerät aus einloggen.",
    "create-heading-what-is-loginfile": "Was ist eine Login-Datei?",
    "create-login-file-explainer-intro": "Eine Bilddatei, die dir in Kombination mit deinem Passwort den Zugang zu deinem Account gewährt.",
    "create-login-file-paragraph-1": "Nimiq speichert deine Daten nicht. Die Login-Datei ersetzt die E-Mail als Möglichkeit, sich einzuloggen.",
    "create-login-file-paragraph-2": "Die Login-Datei ist in deinem Browser gespeichert. Entsperre sie mit deinem Passwort.",
    "create-login-file-paragraph-3": "Du könntest versehentlich ausgeloggt werden. Lade die Login-Datei herunter und speichere sie sicher, um die Kontrolle zu behalten.",
    "create-login-file-return": "Verstanden",

    "import-heading-enter-recovery-words": "Wiederherstellungswörter eingeben",
    "import-import-login-file": "Mit Login-Datei einloggen",
    "import-login-to-continue": "Bitte logge dich neu ein, um fortzufahren.",
    "import-unlock-account": "Entsperre dein Konto",
    "import-create-account": "Erstelle ein neues Konto",
    "import-qr-video-tooltip": "Scanne deine Login‑Datei mit der Kamera deines Geräts.",

    "import-file-button-words": "Mit Wiederherstellungswörtern einloggen",

    "import-words-file-available": "Die Wiederherstellungswörter erzeugen eine neue Login‑Datei. Setze ein Passwort, um sie zu schützen.",
    "import-words-file-unavailable": "Die Wiederherstellungswörter erzeugen ein neues Konto. Setze ein Passwort, um es zu schützen.",
    "import-words-hint": "Springe mit Tab zwischen Feldern",
    "import-words-error": "Das ist kein gültiges Konto. Schreibfehler?",
    "import-words-wrong-seed-phrase": "Diese Wiederherstellungswörter gehören zu einem anderen Konto",
    "import-words-download-loginfile": "Speichere deine Login‑Datei",

    "file-import-prompt": "Zum Hochladen hierher ziehen oder klicken",
    "file-import-error-could-not-read": "Login-Datei nicht erkannt.",
    "file-import-error-invalid": "Ungültige Login‑Datei.",

    "qr-video-scanner-cancel": "Abbrechen",
    "qr-video-scanner-no-camera": "Dein Endgerät verfügt über keine verwendbare Kamera.",
    "qr-video-scanner-enable-camera": "Erlaube den Zugriff auf deine Kamera, um QR-Codes zu scannen.",

    "sign-tx-heading-tx": "Transaktion bestätigen",
    "sign-tx-heading-checkout": "Zahlung bestätigen",
    "sign-tx-heading-cashlink": "Cashlink erstellen",
    "sign-tx-fee": "Gebühr",
    "sign-tx-cancel-payment": "Zahlung abbrechen",

    "sign-msg-heading": "Nachricht signieren",
    "sign-msg-signer": "Unterzeichner",

    "tab-width-selector-label": "Tab-Breite",

    "address-info-new-cashlink": "Neuer Cashlink",

    "copyable-copied": "Kopiert",

    "passwordbox-enter-password": "Gib dein Passwort ein",
    "passwordbox-enter-pin": "Gib deine PIN ein",
    "passwordbox-repeat-password": "Wiederhole dein Passwort",
    "passwordbox-repeat": "Passwort wiederholen",
    "passwordbox-continue": "Weiter",
    "passwordbox-log-in": "Entsperren",
    "passwordbox-confirm": "Bestätigen",
    "passwordbox-log-out": "Abmeldung bestätigen",
    "passwordbox-confirm-tx": "Transaktion bestätigen",
    "passwordbox-create-cashlink": "Cashlink erstellen",
    "passwordbox-confirm-create": "Konto erstellen",
    "passwordbox-confirm-log-in": "Anmelden",
    "passwordbox-show-words": "Wiederherstellungswörter anzeigen",
    "passwordbox-sign-msg": "Nachricht signieren",
    "passwordbox-confirm-swap": "Tausch bestätigen",
    "passwordbox-password-strength-short": "Gib mindestens 8 Zeichen ein",
    "passwordbox-password-strength-weak": "Schlechtes Passwort",
    "passwordbox-password-strength-good": "Gutes Passwort",
    "passwordbox-password-strength-strong": "Starkes Passwort",
    "passwordbox-password-strength-secure": "Sicheres Passwort",
    "passwordbox-password-too-long": "Max. 256 Zeichen",
    "passwordbox-repeat-password-long": "Keine Übereinstimmung, bitte versuche es erneut",
    "passwordbox-repeat-password-short": "Das Passwort ist zu kurz",
    "passwordbox-password-skip": "Erstmal überspringen",
    "passwordbox-reset-password": "Mit Wiederherstellungswörtern zurücksetzen",

    "payment-info-line-order-amount": "Kaufbetrag",
    "payment-info-line-vendor-markup": "Krypto-Aufschlag des Verkäufers",
    "payment-info-line-vendor-discount": "Krypto-Rabatt des Verkäufers",
    "payment-info-line-effective-rate": "Effektiver Wechselkurs",
    "payment-info-line-free-service": "Nimiq bietet diesen Service kostenfrei an.",
    "payment-info-line-total": "Gesamt",
    "payment-info-line-network-fee": "Netzwerkgebühr",
    "payment-info-line-paying-more": "Du zahlst etwa %RATE_DEVIATION% mehr als zum aktuellen Wechselkurs (coingecko.com).",
    "payment-info-line-paying-less": "Du zahlst etwa %RATE_DEVIATION% weniger als zum aktuellen Wechselkurs (coingecko.com).",
    "payment-info-line-actual-discount": "Dein tatsächlicher Rabatt beträgt etwa %RATE_DEVIATION% zum aktuellen Wechselkurs (coingecko.com).",

    "timer-expiry": "Angebot endet in",
    "timer-second": "Sekunde",
    "timer-seconds": "Sekunden",
    "timer-minute": "Minute",
    "timer-minutes": "Minuten",
    "timer-hour": "Stunde",
    "timer-hours": "Stunden",
    "timer-day": "Tag",
    "timer-days": "Tagen",

    "identicon-selector-avatars-hint": "Avatare repräsentieren NIM-Adressen",
    "identicon-selector-avatars-hint-2": "Stelle sie dir wie Kontonummern vor.",
    "identicon-selector-generate-new": "Neue Avatare",

    "download-loginfile-download": "Herunterladen",
    "download-loginfile-successful": "Download erfolgreich?",
    "download-loginfile-tap-and-hold": "Zum Herunterladen\nBild gedrückt halten",
    "download-loginfile-continue": "Weiter",

    "validate-words-text": "Bitte wähle das richtige Wort aus deiner Liste von Wiederherstellungswörtern aus.",
    "validate-words-1-hint": "Was ist das 1. Wort?",
    "validate-words-2-hint": "Was ist das 2. Wort?",
    "validate-words-3-hint": "Was ist das 3. Wort?",
    "validate-words-4-hint": "Was ist das 4. Wort?",
    "validate-words-5-hint": "Was ist das 5. Wort?",
    "validate-words-6-hint": "Was ist das 6. Wort?",
    "validate-words-7-hint": "Was ist das 7. Wort?",
    "validate-words-8-hint": "Was ist das 8. Wort?",
    "validate-words-9-hint": "Was ist das 9. Wort?",
    "validate-words-10-hint": "Was ist das 10. Wort?",
    "validate-words-11-hint": "Was ist das 11. Wort?",
    "validate-words-12-hint": "Was ist das 12. Wort?",
    "validate-words-13-hint": "Was ist das 13. Wort?",
    "validate-words-14-hint": "Was ist das 14. Wort?",
    "validate-words-15-hint": "Was ist das 15. Wort?",
    "validate-words-16-hint": "Was ist das 16. Wort?",
    "validate-words-17-hint": "Was ist das 17. Wort?",
    "validate-words-18-hint": "Was ist das 18. Wort?",
    "validate-words-19-hint": "Was ist das 19. Wort?",
    "validate-words-20-hint": "Was ist das 20. Wort?",
    "validate-words-21-hint": "Was ist das 21. Wort?",
    "validate-words-22-hint": "Was ist das 22. Wort?",
    "validate-words-23-hint": "Was ist das 23. Wort?",
    "validate-words-24-hint": "Was ist das 24. Wort?",

    "export-file-heading": "Login-Datei entsperren",
    "export-file-intro-heading": "Sichere dein Konto",
    "export-file-intro-blue-text": "Deine Login-Datei gewährt Zugang zu deinem Konto. Lade sie runter und speichere sie.",
    "export-file-intro-browser": "Dein Konto ist in deinem Browser gespeichert.",
    "export-file-intro-accident": "Als Teil deiner Browserdaten könnte es versehentlich gelöscht werden.",
    "export-file-intro-download-file": "Lade die Login-Datei runter, um deinen Zugang zu sichern.",
    "export-file-intro-orange-text": "Teile sie mit niemandem.\nVerliere sie nicht.",
    "export-file-success-set-password": "Passwort gesetzt",
    "export-file-success-save-file": "Login-Datei gespeichert",
    "export-file-success-create-backup": "Backup erstellt",
    "export-file-success-heading": "Nimm dir 5 Minuten Zeit für ein Backup",
    "export-file-success-words-intro": "Es gibt keine Möglichkeit der Passwortwiederherstellung. Schreib dir 24 Wörter auf, um ein sicheres Backup zu erstellen.",
    "export-words-intro-heading": "Es gibt keine Passwortwiederherstellung!",
    "export-words-unlock-heading": "Wiederherstellungswörter entsperren",
    "export-words-hint": "Scroll runter, um fortzufahren",
    "go-to-recovery-words": "Erstelle ein Backup",
    "export-continue-to-login-file": "Weiter zur Login‑Datei",
    "export-show-recovery-words": "Wiederherstellungswörter anzeigen",

    "remove-key-heading": "Verliere deinen Zugang nicht",
    "remove-key-intro-text": "Falls du dich ausloggst, ohne dein Konto zu sichern, wirst du unwiderruflich den Zugriff darauf verlieren. ",
    "remove-key-login-file-question": "Ist deine Login-Datei sicher gespeichert und zugänglich?",
    "remove-key-download-login-file": "Login-Datei herunterladen",
    "remove-key-recovery-words-question": "Weißt du, wo deine Wiederherstellungswörter sind?",
    "remove-key-show-recovery-words": "Backup anlegen",
    "remove-key-label-confirm-instructions": "Gib \"{accountLabel}\" ein, um dich auszuloggen.",
    "remove-key-final-confirm": "Ausloggen",

    "derive-address-heading-password": "Entschlüssele dein Konto",
    "derive-address-password-text": "Bitte gib dein Passwort ein, um deinem[br]Konto eine weitere Adresse hinzuzufügen.",

    "change-password-heading": "Altes Passwort bestätigen",
    "change-password-paragraph": "Die Passwortänderung wird eine neue Login-Datei erstellen, welche die bisherige ersetzt.",
    "change-password-paragraph-legacy": "Die Passwortänderung wird nur für dieses Gerät wirksam.",
    "change-password-info-item-1": "Alle alten Login-Dateien funktionieren weiterhin mit ihrem alten Passwort.",
    "change-password-info-item-2": "Wenn eine Login-Datei kompromittiert wurde: Erstelle ein neues Konto und übertrage dein Guthaben.",
    "change-password-download-login-file": "Neue Login-Datei herunterladen",
    "change-password-set-password-heading": "Neues Passwort setzen",
    "change-password-set-password-text": "Sichere deine neue Login‑Datei.",
    "change-password-set-password-text-legacy": "Sichere dein Konto.",

    "error-no-request-heading": "Das ging schief :(",
    "error-no-request-message": "Wir konnten keine gültige Anfrage finden. Bitte gehe zurück und versuche es noch einmal.",

    "login-file-color-orange": "Oranges",
    "login-file-color-red": "Rotes",
    "login-file-color-yellow": "Gelbes",
    "login-file-color-indigo": "Indigoblaues",
    "login-file-color-blue": "Blaues",
    "login-file-color-purple": "Lila",
    "login-file-color-teal": "Türkises",
    "login-file-color-pink": "Pinkes",
    "login-file-color-green": "Grünes",
    "login-file-color-brown": "Braunes",

    "login-file-filename": "Nimiq-Login-Datei-{accountLabel}.png",
    "login-file-default-account-label": "{color} Konto",

    "bitcoin": "Bitcoin",
    "bitcoin-recipient-unlabelled": "Unbeschriftet",

    "derive-btc-xpub-heading": "Füge deinem Account\nBitcoin hinzu",
    "derive-btc-xpub-text": "Einfach zwischen NIM, dem superperformanten Zahlungscoin und BTC, dem Goldstandard der Krytowährungen tauschen.",

    "sign-swap-heading": "Tausch Bestätigen",
    "sign-swap-exchange-rate-tooltip": "Dieser Kurs beinhaltet die Tauschgebühren.",
    "sign-swap-fees": "Gebühren",
    "sign-swap-btc-fees": "BTC Netzwerkgebühr",
    "sign-swap-btc-fees-explainer": "Ein sicherer Tausch benötigt zwei BTC Transaktionen.",
    "sign-swap-oasis-fees": "OASIS Servicegebühr",
    "sign-swap-oasis-fees-explainer": "des Tauschwerts.",
    "sign-swap-bank-fees": "Gebühr",
    "sign-swap-bank-fees-explainer": "Bankennetzwerk-Gebühr.",
    "sign-swap-nim-fees": "NIM Netzwerkgebühr",
    "sign-swap-exchange-fee": "Tauschgebühr",
    "sign-swap-of-exchange-value": "des Tauschwerts.",
    "sign-swap-total-fees": "Gebühren gesamt",
    "sign-swap-your-bank": "Deine Bank"
},
en: {
    "_language": "English",

    "language-changed": "The display language changed. Do you want to reload the page to update all translations? Otherwise, some translations might not be updated automatically.",

    "back-to-app": "Back to {appName}",
    "back-to-accounts": "Back to my accounts",
    "back-to-wallet": "Back to {Wallet}",
    "back-to-miner": "Back to {Nimiq Miner}",
    "back-to-faucet": "Back to {Nimiq Faucet}",
    "back-to-donation": "Back to Donation Button Creator",
    "back-to-gift-card": "Back to Nimiq Gift Card",
    "back-to-vote": "Back to Nimiq Vote",
    "back-to-cpl": "Back to CryptoPayment.link",

    "funding-cashlink": "Funding cashlink",

    "recovery-words-title": "Write these 24 Words on Paper",
    "recovery-words-intro-text": "The Recovery Words are the ONLY way to restore your account in case you lose your Login File or password.",
    "recovery-words-intro-offline": "Keep your words offline, enter them nowhere but on [strong]keyguard[/strong].nimiq.com.",
    "recovery-words-intro-copy": "Create a copy and store it in a safe place: family’s house, bank locker etc.",
    "recovery-words-intro-safety": "Mind water and fire, use a sealed box to keep your Recovery Words safe.",
    "recovery-words-text": "Anyone with these words can access your account! Keep them safe.",
    "recovery-words-validate": "Validate backup",

    "create-heading-choose-identicon": "Choose an Avatar",
    "create-address-label": "Your address:",
    "create-confirm-address": "Select and continue",
    "create-heading-create-password": "Create a Password",
    "create-heading-repeat-password": "Confirm your Password",
    "create-heading-validate-backup": "Validate your Backup",
    "create-loginfile-keycard": "The password protects your Login File,\nconsider it a keycard to your account.",
    "create-loginfile-any-device": "This file allows you to login from any device.",
    "create-heading-what-is-loginfile": "What is a Login File?",
    "create-login-file-explainer-intro": "An image file that, in combination with your password, grants access to your account.",
    "create-login-file-paragraph-1": "Nimiq does not store your data. The Login File replaces email as the way to log in.",
    "create-login-file-paragraph-2": "The Login File is stored in your browser. Unlock it with your password.",
    "create-login-file-paragraph-3": "You might get logged out by accident. Download and store the Login File safely to stay in control.",
    "create-login-file-return": "Got it",

    "import-heading-enter-recovery-words": "Enter Recovery Words",
    "import-import-login-file": "Import your Login File",
    "import-login-to-continue": "Please login again to continue.",
    "import-unlock-account": "Unlock your Account",
    "import-create-account": "Create new account",
    "import-qr-video-tooltip": "Scan your Login File with your device's camera.",

    "import-file-button-words": "Login with Recovery Words",

    "import-words-file-available": "Using the Recovery Words creates a new Login File. Create a password to secure it.",
    "import-words-file-unavailable": "Using the Recovery Words creates a new account. Create a password to secure it.",
    "import-words-hint": "Press Tab to Jump to the next field",
    "import-words-error": "This is not a valid account. Typo?",
    "import-words-wrong-seed-phrase": "These Recovery Words belong to a different account",
    "import-words-download-loginfile": "Save your Login File",

    "file-import-prompt": "Drag here or click to import",
    "file-import-error-could-not-read": "Could not read Login File.",
    "file-import-error-invalid": "Invalid Login File.",

    "qr-video-scanner-cancel": "Cancel",
    "qr-video-scanner-no-camera": "Your device does not have an accessible camera.",
    "qr-video-scanner-enable-camera": "Unblock the camera for this website to scan QR codes.",

    "sign-tx-heading-tx": "Confirm Transaction",
    "sign-tx-heading-checkout": "Verify Payment",
    "sign-tx-heading-cashlink": "Create a Cashlink",
    "sign-tx-fee": "fee",
    "sign-tx-cancel-payment": "Cancel payment",

    "sign-msg-heading": "Sign Message",
    "sign-msg-signer": "Signer",

    "tab-width-selector-label": "Tab Width",

    "address-info-new-cashlink": "New Cashlink",

    "copyable-copied": "Copied",

    "passwordbox-enter-password": "Enter your password",
    "passwordbox-enter-pin": "Enter your PIN",
    "passwordbox-repeat-password": "Repeat your password",
    "passwordbox-repeat": "Repeat password",
    "passwordbox-continue": "Continue",
    "passwordbox-log-in": "Unlock",
    "passwordbox-confirm": "Confirm",
    "passwordbox-log-out": "Confirm logout",
    "passwordbox-confirm-tx": "Confirm transaction",
    "passwordbox-create-cashlink": "Create cashlink",
    "passwordbox-confirm-create": "Create account",
    "passwordbox-confirm-log-in": "Log in",
    "passwordbox-show-words": "Show recovery words",
    "passwordbox-sign-msg": "Sign message",
    "passwordbox-confirm-swap": "Confirm swap",
    "passwordbox-password-strength-short": "Enter 8 characters or more",
    "passwordbox-password-strength-weak": "Weak password",
    "passwordbox-password-strength-good": "Good password",
    "passwordbox-password-strength-strong": "Strong password",
    "passwordbox-password-strength-secure": "Secure password",
    "passwordbox-password-too-long": "Max. 256 characters",
    "passwordbox-repeat-password-long": "No match, please try again",
    "passwordbox-repeat-password-short": "Password is too short",
    "passwordbox-password-skip": "Skip for now",
    "passwordbox-reset-password": "Reset with Recovery Words",

    "payment-info-line-order-amount": "Order amount",
    "payment-info-line-vendor-markup": "Vendor crypto markup",
    "payment-info-line-vendor-discount": "Vendor crypto discount",
    "payment-info-line-effective-rate": "Effective rate",
    "payment-info-line-free-service": "Nimiq provides this service free of charge.",
    "payment-info-line-total": "Total",
    "payment-info-line-network-fee": "network fee",
    "payment-info-line-paying-more": "You are paying approx. %RATE_DEVIATION% more than at the current market rate (coingecko.com).",
    "payment-info-line-paying-less": "You are paying approx. %RATE_DEVIATION% less than at the current market rate (coingecko.com).",
    "payment-info-line-actual-discount": "Your actual discount is approx. %RATE_DEVIATION% compared to the current market rate (coingecko.com).",

    "timer-expiry": "This offer expires in",
    "timer-second": "second",
    "timer-seconds": "seconds",
    "timer-minute": "minute",
    "timer-minutes": "minutes",
    "timer-hour": "hour",
    "timer-hours": "hours",
    "timer-day": "day",
    "timer-days": "days",

    "identicon-selector-avatars-hint": "Avatars represent NIM addresses.",
    "identicon-selector-avatars-hint-2": "Think of them as bank account numbers.",
    "identicon-selector-generate-new": "New avatars",

    "download-loginfile-download": "Download",
    "download-loginfile-successful": "Download successful?",
    "download-loginfile-tap-and-hold": "Tap and hold image\nto download",
    "download-loginfile-continue": "Continue",

    "validate-words-text": "Please select the correct word from your list of recovery words.",
    "validate-words-1-hint": "What is the 1st word?",
    "validate-words-2-hint": "What is the 2nd word?",
    "validate-words-3-hint": "What is the 3rd word?",
    "validate-words-4-hint": "What is the 4th word?",
    "validate-words-5-hint": "What is the 5th word?",
    "validate-words-6-hint": "What is the 6th word?",
    "validate-words-7-hint": "What is the 7th word?",
    "validate-words-8-hint": "What is the 8th word?",
    "validate-words-9-hint": "What is the 9th word?",
    "validate-words-10-hint": "What is the 10th word?",
    "validate-words-11-hint": "What is the 11th word?",
    "validate-words-12-hint": "What is the 12th word?",
    "validate-words-13-hint": "What is the 13th word?",
    "validate-words-14-hint": "What is the 14th word?",
    "validate-words-15-hint": "What is the 15th word?",
    "validate-words-16-hint": "What is the 16th word?",
    "validate-words-17-hint": "What is the 17th word?",
    "validate-words-18-hint": "What is the 18th word?",
    "validate-words-19-hint": "What is the 19th word?",
    "validate-words-20-hint": "What is the 20th word?",
    "validate-words-21-hint": "What is the 21st word?",
    "validate-words-22-hint": "What is the 22nd word?",
    "validate-words-23-hint": "What is the 23rd word?",
    "validate-words-24-hint": "What is the 24th word?",

    "export-file-heading": "Access your Login File",
    "export-file-intro-heading": "Save your Account",
    "export-file-intro-blue-text": "Your Login File grants access to your account. Download and save it.",
    "export-file-intro-browser": "Your account is stored in your browser.",
    "export-file-intro-accident": "It might be deleted automatically or by accident.",
    "export-file-intro-download-file": "Download the Login File to secure access to your account.",
    "export-file-intro-orange-text": "Keep it safe and confidential.",
    "export-file-success-set-password": "Set password",
    "export-file-success-save-file": "Save Login File",
    "export-file-success-create-backup": "Create backup",
    "export-file-success-heading": "Take 5 Minutes for a Backup",
    "export-file-success-words-intro": "There is no 'forgot password' option. Write down 24 words to create a secure backup.",
    "export-words-intro-heading": "There is no Password Recovery!",
    "export-words-unlock-heading": "Unlock your Backup",
    "export-words-hint": "Scroll to continue",
    "go-to-recovery-words": "Create backup",
    "export-continue-to-login-file": "Continue to Login File",
    "export-show-recovery-words": "Show Recovery Words",

    "remove-key-heading": "Don't lose Access",
    "remove-key-intro-text": "If you log out without saving your account, you will irreversibly lose access to it!",
    "remove-key-login-file-question": "Is your Login File savely stored and accessible?",
    "remove-key-download-login-file": "Download Login File",
    "remove-key-recovery-words-question": "Do you know where your Recovery Words are?",
    "remove-key-show-recovery-words": "Create a backup",
    "remove-key-label-confirm-instructions": "Type \"{accountLabel}\" to log out.",
    "remove-key-final-confirm": "Log out",

    "derive-address-heading-password": "Unlock new Addresses",
    "derive-address-password-text": "To add a new address, please[br]unlock your account first.",

    "change-password-heading": "Confirm old Password",
    "change-password-paragraph": "Changing the password will create a new Login File that replaces the current one.",
    "change-password-paragraph-legacy": "Changing the password only has an effect on this device.",
    "change-password-info-item-1": "All old Login Files still work with their old passwords.",
    "change-password-info-item-2": "If a Login File was compromised: Please create a new account and transfer all funds.",
    "change-password-download-login-file": "Download new Login File",
    "change-password-set-password-heading": "Create a new Password",
    "change-password-set-password-text": "Secure your new Login File.",
    "change-password-set-password-text-legacy": "Secure your account.",

    "error-no-request-heading": "That went wrong :(",
    "error-no-request-message": "We could not detect a valid request. Please go back and try again.",

    "login-file-color-orange": "Orange",
    "login-file-color-red": "Red",
    "login-file-color-yellow": "Yellow",
    "login-file-color-indigo": "Indigo",
    "login-file-color-blue": "Blue",
    "login-file-color-purple": "Purple",
    "login-file-color-teal": "Teal",
    "login-file-color-pink": "Pink",
    "login-file-color-green": "Green",
    "login-file-color-brown": "Brown",

    "login-file-filename": "Nimiq-Login-File-{accountLabel}.png",
    "login-file-default-account-label": "{color} Account",

    "bitcoin": "Bitcoin",
    "bitcoin-recipient-unlabelled": "Unlabelled",

    "derive-btc-xpub-heading": "Add Bitcoin\nto your account",
    "derive-btc-xpub-text": "Easily swap between NIM, the super performant payment coin and BTC, the gold standard of crypto.",

    "sign-swap-heading": "Confirm Swap",
    "sign-swap-exchange-rate-tooltip": "This rate includes the swap fee.",
    "sign-swap-fees": "fees",
    "sign-swap-btc-fees": "BTC network fee",
    "sign-swap-btc-fees-explainer": "Atomic swaps require two BTC transactions.",
    "sign-swap-oasis-fees": "OASIS service fee",
    "sign-swap-oasis-fees-explainer": "of swap value.",
    "sign-swap-bank-fees": "fee",
    "sign-swap-bank-fees-explainer": "Banking network fee.",
    "sign-swap-nim-fees": "NIM network fee",
    "sign-swap-exchange-fee": "Swap fee",
    "sign-swap-of-exchange-value": "of swap value.",
    "sign-swap-total-fees": "Total fees",
    "sign-swap-your-bank": "Your bank"
},
es: {
    "_language": "Español",

    "language-changed": "El lenguaje ha cambiado. ¿Quieres volver a cargar la página para actualizar todas las traducciones? De no hacerlo, algunas traducciones podrían no ser actualizadas automáticamente.",

    "back-to-app": "Volver a {appName}",
    "back-to-accounts": "Volver a mis cuentas",
    "back-to-wallet": "Volver a la {Wallet}",
    "back-to-miner": "Volver al {Nimiq Miner}",
    "back-to-faucet": "Volver a la {Nimiq Faucet}",
    "back-to-donation": "Volver al creador de Botón de Donación.",
    "back-to-gift-card": "Volver a las Tarjetas de Regalo Nimiq",
    "back-to-vote": "Volver a Votación Nimiq",
    "back-to-cpl": "Volver a CryptoPayment.link",

    "funding-cashlink": "Fundando cashlink",

    "recovery-words-title": "Escriba estas 24 Palabras en Papel",
    "recovery-words-intro-text": "Las Palabras de Recuperación son la ÚNICA manera de restaurar su cuenta en caso de que pierda su archivo de acceso o contraseña.",
    "recovery-words-intro-offline": "Mantenga sus palabras fuera de línea, no las ingrese en ningún lugar excepto en [strong]keyguard[/strong].nimiq.com.",
    "recovery-words-intro-copy": "Cree una copia y guárdela en un lugar seguro: la casa de su familia, casillero de un banco, etc.",
    "recovery-words-intro-safety": "Tenga en cuenta el agua y el fuego. Utilice una caja sellada para mantener sus Palabras de Recuperación a salvo.",
    "recovery-words-text": "¡Cualquiera con estas palabras puede acceder a su cuenta! Manténgalas a salvo.",
    "recovery-words-validate": "Validar respaldo",

    "create-heading-choose-identicon": "Elija un Avatar",
    "create-address-label": "Your address:",
    "create-confirm-address": "Seleccione y continue",
    "create-heading-create-password": "Cree una Contraseña",
    "create-heading-repeat-password": "Confirme su Contraseña",
    "create-heading-validate-backup": "Valide su Respaldo",
    "create-loginfile-keycard": "La contraseña protege su Archivo Inicio de Sesión,\nconsidérelo una llave a su cuenta ",
    "create-loginfile-any-device": "Este archivo le permite iniciar sesión desde cualquier dispositivo.",
    "create-heading-what-is-loginfile": "¿Que es un Archivo de Inicio de Sesión?",
    "create-login-file-explainer-intro": "Un archivo de imagen que, en combinación con su contraseña, le da acceso a su cuenta.",
    "create-login-file-paragraph-1": "Nimiq no almacena sus datos. El Archivo de Inicio de Sesión reemplaza al correo electrónico como la forma de iniciar sesión.",
    "create-login-file-paragraph-2": "El Archivo de Inicio de Sesión es almacenado en su navegador. Des-bloque el archivo con su contraseña.",
    "create-login-file-paragraph-3": "Puede que se salga de su sesión por accidente. Descargue y almacene su Archivo de Inicio de Sesión para mantenerse en control.",
    "create-login-file-return": "Lo tengo",

    "import-heading-enter-recovery-words": "Ingrese Palabras de Recuperación",
    "import-import-login-file": "Importe su Archivo de Sesión",
    "import-login-to-continue": "Por favor inicie sesión de nuevo para continuar.",
    "import-unlock-account": "Desbloquear su Cuenta",
    "import-create-account": "Crear nueva cuenta",
    "import-qr-video-tooltip": "Escanee su Archivo de Sesión con la cámara de su dispositivo.",

    "import-file-button-words": "Inicie sesión con Palabras de Recuperación",

    "import-words-file-available": "Usando las Palabras de Recuperación se crea una nueva un nuevo Archivo de Sesión. Cree una contraseña para asegurarlo.",
    "import-words-file-unavailable": "Usando las Palabras de Recuperación se crea una nueva cuenta. Cree una contraseña para asegurarla.",
    "import-words-hint": "Presione Tab para Saltar a la próxima casilla.",
    "import-words-error": "Esta no es una cuenta válida. Revise que escribió todos los caracteres.",
    "import-words-wrong-seed-phrase": "Estas Palabras de Recuperación le pertenecen a una cuenta diferente.",
    "import-words-download-loginfile": "Guarde su Archivo de Sesión",

    "file-import-prompt": "Arrastre aquí o haga click para importar",
    "file-import-error-could-not-read": "No se pudo leer el Archivo de Sesión.",
    "file-import-error-invalid": "Archivo de Sesión inválido.",

    "qr-video-scanner-cancel": "Cancelar",
    "qr-video-scanner-no-camera": "Su dispositivo no tiene una cámara accesible.",
    "qr-video-scanner-enable-camera": "Desbloquee la cámara para esta página para poder escanear códigos QR.",

    "sign-tx-heading-tx": "Confirme Transacción",
    "sign-tx-heading-checkout": "Verificar Pago",
    "sign-tx-heading-cashlink": "Crear un Cashlink",
    "sign-tx-fee": "cuota",
    "sign-tx-cancel-payment": "Cancelar pago",

    "sign-msg-heading": "Firmar Mensaje",
    "sign-msg-signer": "Firmador",

    "tab-width-selector-label": "Ancho de Pestaña",

    "address-info-new-cashlink": "Nuevo Cashlink",

    "copyable-copied": "Copiado",

    "passwordbox-enter-password": "Ingrese su contraseña",
    "passwordbox-enter-pin": "Ingrese su PIN",
    "passwordbox-repeat-password": "Repita su contraseña",
    "passwordbox-repeat": "Repita contraseña",
    "passwordbox-continue": "Continue",
    "passwordbox-log-in": "Desbloquear",
    "passwordbox-confirm": "Confirmar",
    "passwordbox-log-out": "Confirme finalizar sesión.",
    "passwordbox-confirm-tx": "Confirme transacción",
    "passwordbox-create-cashlink": "Crear cashlink",
    "passwordbox-confirm-create": "Crear cuenta",
    "passwordbox-confirm-log-in": "Inicio de sesión",
    "passwordbox-show-words": "Mostrar Palabras de Recuperación",
    "passwordbox-sign-msg": "Firmar mensaje",
    "passwordbox-confirm-swap": "Confirmar intercambio",
    "passwordbox-password-strength-short": "Ingrese 8 caracteres o más",
    "passwordbox-password-strength-weak": "Contraseña débil",
    "passwordbox-password-strength-good": "Contraseña buena",
    "passwordbox-password-strength-strong": "Contraseña fuerte",
    "passwordbox-password-strength-secure": "Contraseña segura",
    "passwordbox-password-too-long": "Max. 256 caracteres",
    "passwordbox-repeat-password-long": "No hubo match, por favor intente de nuevo.",
    "passwordbox-repeat-password-short": "La contraseña es muy corta",
    "passwordbox-password-skip": "Salar por ahora",
    "passwordbox-reset-password": "Reiniciar con Palabras de Recuperación",

    "payment-info-line-order-amount": "Monto de orden",
    "payment-info-line-vendor-markup": "Margen del vendedor en cripto",
    "payment-info-line-vendor-discount": "Descuento del vendedor en cripto",
    "payment-info-line-effective-rate": "Taza efectiva",
    "payment-info-line-free-service": "Nimiq provee este servicio libre de costo",
    "payment-info-line-total": "Total",
    "payment-info-line-network-fee": "cuota de red",
    "payment-info-line-paying-more": "Usted esta pagando aproximadamente. %RATE_DEVIATION% más que la taza del mercado actual  (coingecko.com).",
    "payment-info-line-paying-less": "Usted esta pagando aproximadamente. %RATE_DEVIATION% menos que la taza del mercado actual (coingecko.com).",
    "payment-info-line-actual-discount": "Su descuento actual es aproximadamente %RATE_DEVIATION% en comparación de la taza del mercado actual (coingecko.com).",

    "timer-expiry": "La oferta expira en",
    "timer-second": "segundo",
    "timer-seconds": "segundos",
    "timer-minute": "minuto",
    "timer-minutes": "minutos",
    "timer-hour": "hora",
    "timer-hours": "horas",
    "timer-day": "día",
    "timer-days": "días",

    "identicon-selector-avatars-hint": "Los Avatares representan direcciones NIM",
    "identicon-selector-avatars-hint-2": "Considérelas como números de cuentas bancarias.",
    "identicon-selector-generate-new": "Nuevos avatares",

    "download-loginfile-download": "Descargar",
    "download-loginfile-successful": "¿Descarga exitosa?",
    "download-loginfile-tap-and-hold": "Toca la pantalla y mantén\npresionado para descargar.",
    "download-loginfile-continue": "Continue",

    "validate-words-text": "Por favor seleccione la palabra correcta de su lista de Palabras de Recuperación.",
    "validate-words-1-hint": "¿Cual es la primer palabra?",
    "validate-words-2-hint": "¿Cual es la segunda palabra?",
    "validate-words-3-hint": "¿Cual es la tercer palabra?",
    "validate-words-4-hint": "¿Cual es la cuarta palabra?",
    "validate-words-5-hint": "¿Cual es la quinta palabra?",
    "validate-words-6-hint": "¿Cual es la sexta palabra?",
    "validate-words-7-hint": "¿Cual es la séptima palabra?",
    "validate-words-8-hint": "¿Cual es la octava palabra?",
    "validate-words-9-hint": "¿Cual es la novena palabra?",
    "validate-words-10-hint": "¿Cual es la décima palabra?",
    "validate-words-11-hint": "¿Cual es la onceava palabra?",
    "validate-words-12-hint": "¿Cual es la duodécima palabra?",
    "validate-words-13-hint": "¿Cual es la decimotercera palabra?",
    "validate-words-14-hint": "¿Cual es la decimocuarta palabra?",
    "validate-words-15-hint": "¿Cual es la decimoquinta palabra?",
    "validate-words-16-hint": "¿Cual es la decimosexta palabra?",
    "validate-words-17-hint": "¿Cual es la decimoséptima palabra?",
    "validate-words-18-hint": "¿Cual es la decimooctava palabra?",
    "validate-words-19-hint": "¿Cual es la decimonovena palabra?",
    "validate-words-20-hint": "¿Cual es la vigésima palabra?",
    "validate-words-21-hint": "¿Cual es la vigésimoprimera palabra?",
    "validate-words-22-hint": "¿Cual es la vigésimosegunda palabra?",
    "validate-words-23-hint": "¿Cual es la vigésimotercera palabra?",
    "validate-words-24-hint": "¿Cual es la vigésimocuarta palabra?",

    "export-file-heading": "Acceda a su Archivo de Sesión",
    "export-file-intro-heading": "Salve su Cuenta",
    "export-file-intro-blue-text": "Tu Archivo de Sesión le da acceso a su cuenta. Descarguelo y guárdelo.",
    "export-file-intro-browser": "Su cuenta se almacena en su navegador.",
    "export-file-intro-accident": "Podría ser borrada automáticamente o por accidente.",
    "export-file-intro-download-file": "Descarga el Archivo de Sesión para asegurar el acceso a su cuenta.",
    "export-file-intro-orange-text": "Mantengalo a salvo y confidencial.",
    "export-file-success-set-password": "Establecer contraseña",
    "export-file-success-save-file": "Salvar Archivo de Sesión",
    "export-file-success-create-backup": "Crear respaldo",
    "export-file-success-heading": "Tome 5 minutos para crear el respaldo",
    "export-file-success-words-intro": "No hay opción de \"olvide mi contraseña\". Escriba las 24 palabras para crear un respaldo seguro.",
    "export-words-intro-heading": "¡No hay Recuperación de Contraseña!",
    "export-words-unlock-heading": "Desbloquear su Respaldo",
    "export-words-hint": "Desplácese hacia abajo para continuar",
    "go-to-recovery-words": "Crear respaldo",
    "export-continue-to-login-file": "Continuar",
    "export-show-recovery-words": "Muestre Palabras de Recuperación",

    "remove-key-heading": "No pierda Acceso",
    "remove-key-intro-text": "¡Si usted cierra sesión sin salvar su cuenta, usted perderá acceso irreversiblemente!",
    "remove-key-login-file-question": "Almaceno de forma segura y accesible su Archivo de Sesión?",
    "remove-key-download-login-file": "Descargar",
    "remove-key-recovery-words-question": "¿Sabe usted donde están sus Palabras de Recuperación?",
    "remove-key-show-recovery-words": "Crear respaldo",
    "remove-key-label-confirm-instructions": "Ingrese \"{accountLabel}\" para cerrar sesión.",
    "remove-key-final-confirm": "Cerrar sesión",

    "derive-address-heading-password": "Desbloquear nuevas Direcciones.",
    "derive-address-password-text": "Para agregar una dirección nueva, por favor[br]desbloquee su cuenta primero.",

    "change-password-heading": "Confirme vieja Contraseña",
    "change-password-paragraph": "Al cambiar la contraseña se crea un nuevo Archivo de Sesión que reemplace el actual.",
    "change-password-paragraph-legacy": "Cambiar la contraseña solo tiene efecto sobre este dispositivo.",
    "change-password-info-item-1": "Todos los Archivos de Sesión viejos funcionan con sus contraseñas viejas.",
    "change-password-info-item-2": "Si un Archivo de Sesión es comprometido: Por favor cree una nueva cuenta y transfiera los fondos.",
    "change-password-download-login-file": "Descargue un nuevo Archivo de Sesión",
    "change-password-set-password-heading": "Cree una Contraseña nueva",
    "change-password-set-password-text": "Asegure su Archivo de Sesión nuevo.",
    "change-password-set-password-text-legacy": "Asegure su cuenta.",

    "error-no-request-heading": "Eso salio mal :(",
    "error-no-request-message": "No pudimos detectar una petición válida. Por favor intente de nuevo.",

    "login-file-color-orange": "Naranja",
    "login-file-color-red": "Roja",
    "login-file-color-yellow": "Amarilla",
    "login-file-color-indigo": "Indigo",
    "login-file-color-blue": "Azul",
    "login-file-color-purple": "Morada",
    "login-file-color-teal": "Turquesa",
    "login-file-color-pink": "Rosada",
    "login-file-color-green": "Verde",
    "login-file-color-brown": "Marron",

    "login-file-filename": "Nimiq-Archivo-Sesion-{accountLabel}.png",
    "login-file-default-account-label": "Cuenta {color}",

    "bitcoin": "Bitcoin",
    "bitcoin-recipient-unlabelled": "Sin etiqueta",

    "derive-btc-xpub-heading": "Agregar Bitcoin\na su Cuenta",
    "derive-btc-xpub-text": "Fácilmente intecambie entre NIM, la moneda de pago con super rendimiento y BTC, el estándar de oro en cripto.",

    "sign-swap-heading": "Confirmar Intercambio",
    "sign-swap-exchange-rate-tooltip": "La taza de cambio incluye cuotas de intercambio.",
    "sign-swap-fees": "cuotas",
    "sign-swap-btc-fees": "Cuota de red de BTC",
    "sign-swap-btc-fees-explainer": "Los intercambios atómicos requieren dos transacciones BTC.",
    "sign-swap-oasis-fees": "Cuota de servicio de OASIS",
    "sign-swap-oasis-fees-explainer": "del valor del intercambio.",
    "sign-swap-bank-fees": "cuota",
    "sign-swap-bank-fees-explainer": "Cuotas de la red bancarias.",
    "sign-swap-nim-fees": "Cuota de red de NIM",
    "sign-swap-exchange-fee": "Cuotas de intercambio",
    "sign-swap-of-exchange-value": "del valor del intercambio.",
    "sign-swap-total-fees": "Cuotas totales",
    "sign-swap-your-bank": "Su banco"
},
fr: {
    "_language": "Français",

    "language-changed": "La langue d'affichage a changé. Voulez-vous recharger la page pour mettre à jour toutes les traductions ? Certaines pourraient ne pas être mises à jour automatiquement.",

    "back-to-app": "Retour à {appName}",
    "back-to-accounts": "Retour à mes comptes",
    "back-to-wallet": "Retour au {Wallet}",
    "back-to-miner": "Retour à {Nimiq Miner}",
    "back-to-faucet": "Retour au {Nimiq Faucet}",
    "back-to-donation": "Retour au Créateur de bouton de don",
    "back-to-gift-card": "Retour à la Carte cadeau Nimiq",
    "back-to-vote": "Retour à Nimiq Vote",
    "back-to-cpl": "Retour à CryptoPayment.link",

    "funding-cashlink": "Financement du cashlink",

    "recovery-words-title": "Écrivez ces 24 Mots sur du papier",
    "recovery-words-intro-text": "Les Mots de Récupération sont le SEUL moyen de restaurer votre compte dans le cas où vous perdriez votre Ficher de Connexion ou votre mot de passe.",
    "recovery-words-intro-offline": "Gardez vos mots hors-ligne, ne les renseignez nul part hormis sur [strong]keyguard[/strong].nimiq.com.",
    "recovery-words-intro-copy": "Créez une copie et stockez-la dans un endroit sûr: maison familiale, coffre de banque, etc.",
    "recovery-words-intro-safety": "Faites attention à l'eau et au feu, utilisez une boîte scellée pour protéger vos Mots de Récupération.",
    "recovery-words-text": "N'importe qui avec ces mots peut accéder à votre compte ! Gardez-les en lieu sûr.",
    "recovery-words-validate": "Valider la sauvegarde",

    "create-heading-choose-identicon": "Choisissez un Avatar",
    "create-address-label": "Your address:",
    "create-confirm-address": "Sélectionner et continuer",
    "create-heading-create-password": "Créez un Mot de Passe",
    "create-heading-repeat-password": "Confirmez le Mot de Passe",
    "create-heading-validate-backup": "Validez votre Sauvegarde",
    "create-loginfile-keycard": "Le mot de passe protège votre fichier de connexion. Considérez-le comme un code d'accès pour votre compte.",
    "create-loginfile-any-device": "Ce fichier vous permet de vous connecter à partir de n'importe quel appareil.",
    "create-heading-what-is-loginfile": "Qu'est-ce qu'un fichier de connexion ?",
    "create-login-file-explainer-intro": "Un fichier image, combiné avec votre mot de passe, vous garanti l'accès à votre compte.",
    "create-login-file-paragraph-1": "Nimiq ne conserve pas vos données. Le fichier de connexion remplace une adresse mail pour vous connecter.",
    "create-login-file-paragraph-2": "Le fichier de connexion est stocké dans votre navigateur. Débloquez-le avec votre mot de passe.",
    "create-login-file-paragraph-3": "Vous pourriez vous être déconnecté par accident. Téléchargez et conservez le fichier de connexion en toute sécurité pour converser votre accès au compte.",
    "create-login-file-return": "J'ai compris",

    "import-heading-enter-recovery-words": "Entrez vos Mots de Récupération",
    "import-import-login-file": "Importez votre Fichier de Connexion",
    "import-login-to-continue": "Veuillez vous reconnecter pour continuer.",
    "import-unlock-account": "Déverrouiller votre Compte",
    "import-create-account": "Créer un nouveau compte",
    "import-qr-video-tooltip": "Scannez votre Fichier de Connexion avec la caméra de votre appareil.",

    "import-file-button-words": "Se connecter avec les Mots de Récupération",

    "import-words-file-available": "L'utilisation des Mots de Récupération crée un nouveau Fichier de Connexion. Créez un mot de passe pour le sécuriser.",
    "import-words-file-unavailable": "L'utilisation des Mots de Récupération crée un nouveau compte. Créez un mot de passe pour le sécuriser.",
    "import-words-hint": "Pressez Tab pour passer au champ suivant",
    "import-words-error": "Ce n'est pas un compte valide. Faute de frappe ?",
    "import-words-wrong-seed-phrase": "Ces Mots de Récupération appartiennent à un autre compte",
    "import-words-download-loginfile": "Sauvegarder votre Fichier de Connexion",

    "file-import-prompt": "Glissez-déposez ici ou cliquez pour importer",
    "file-import-error-could-not-read": "Impossible de lire le fichier de connexion.",
    "file-import-error-invalid": "Fichier de connexion invalide.",

    "qr-video-scanner-cancel": "Annuler",
    "qr-video-scanner-no-camera": "Votre appareil n'a pas de caméra accessible.",
    "qr-video-scanner-enable-camera": "Débloquez la caméra pour ce site de façon à scanner les QR codes.",

    "sign-tx-heading-tx": "Confirmer la Transaction",
    "sign-tx-heading-checkout": "Vérifier le Paiement",
    "sign-tx-heading-cashlink": "Créer un Cashlink",
    "sign-tx-fee": "frais",
    "sign-tx-cancel-payment": "Annuler le paiement",

    "sign-msg-heading": "Signer le Message",
    "sign-msg-signer": "Signataire",

    "tab-width-selector-label": "Largeur de Tabulation",

    "address-info-new-cashlink": "Nouveau Cashlink",

    "copyable-copied": "Copié",

    "passwordbox-enter-password": "Entrez votre mot de passe",
    "passwordbox-enter-pin": "Entrez votre PIN",
    "passwordbox-repeat-password": "Répétez votre mot de passe",
    "passwordbox-repeat": "Répéter le mot de passe",
    "passwordbox-continue": "Continuer",
    "passwordbox-log-in": "Déverrouiller",
    "passwordbox-confirm": "Confirmer",
    "passwordbox-log-out": "Confirmer la déconnexion",
    "passwordbox-confirm-tx": "Confirmer la transaction",
    "passwordbox-create-cashlink": "Créer le cashlink",
    "passwordbox-confirm-create": "Créer le compte",
    "passwordbox-confirm-log-in": "Se connecter",
    "passwordbox-show-words": "Afficher les mots de récupération",
    "passwordbox-sign-msg": "Signer le message",
    "passwordbox-confirm-swap": "Confirmer le swap",
    "passwordbox-password-strength-short": "Entrez 8 caractères ou plus",
    "passwordbox-password-strength-weak": "Faible mot de passe",
    "passwordbox-password-strength-good": "Bon mot de passe",
    "passwordbox-password-strength-strong": "Très bon mot de passe",
    "passwordbox-password-strength-secure": "Excellent mot de passe",
    "passwordbox-password-too-long": "Maximum 256 caractères",
    "passwordbox-repeat-password-long": "Pas de correspondance, veuillez essayer à nouveau",
    "passwordbox-repeat-password-short": "Le mot de passe est trop court",
    "passwordbox-password-skip": "Ignorer pour l'instant",
    "passwordbox-reset-password": "Réinitialiser avec les mots de récupération",

    "payment-info-line-order-amount": "Montant de la commande",
    "payment-info-line-vendor-markup": "Crypto-premium",
    "payment-info-line-vendor-discount": "Crypto-remise",
    "payment-info-line-effective-rate": "Taux effectif",
    "payment-info-line-free-service": "Nimiq fournit ce service gratuitement.",
    "payment-info-line-total": "Total",
    "payment-info-line-network-fee": "frais du réseau",
    "payment-info-line-paying-more": "Vous payez env. %RATE_DEVIATION% de plus que le taux actuel du marché (coingecko.com).",
    "payment-info-line-paying-less": "Vous payez env. %RATE_DEVIATION% de moins que le taux actuel du marché (coingecko.com).",
    "payment-info-line-actual-discount": "Votre remise réelle est d'env. %RATE_DEVIATION% par rapport au taux actuel du marché (coingecko.com).",

    "timer-expiry": "Cette offre expire dans",
    "timer-second": "seconde",
    "timer-seconds": "secondes",
    "timer-minute": "minute",
    "timer-minutes": "minutes",
    "timer-hour": "heure",
    "timer-hours": "heures",
    "timer-day": "jour",
    "timer-days": "jours",

    "identicon-selector-avatars-hint": "Les Avatars représentent des adresses NIM.",
    "identicon-selector-avatars-hint-2": "Rappelez-vous en comme des numéros de compte.",
    "identicon-selector-generate-new": "Nouveaux avatars",

    "download-loginfile-download": "Télécharger",
    "download-loginfile-successful": "Téléchargement réussi ?",
    "download-loginfile-tap-and-hold": "Appuyez et maintenez l'image\npour la télécharger",
    "download-loginfile-continue": "Continuer",

    "validate-words-text": "Veuillez sélectionner le mot correct dans votre liste de mots de récupération.",
    "validate-words-1-hint": "Quel est le 1er mot ?",
    "validate-words-2-hint": "Quel est le 2ème mot ?",
    "validate-words-3-hint": "Quel est le 3ème mot ?",
    "validate-words-4-hint": "Quel est le 4ème mot ?",
    "validate-words-5-hint": "Quel est le 5ème mot ?",
    "validate-words-6-hint": "Quel est le 6ème mot ?",
    "validate-words-7-hint": "Quel est le 7ème mot ?",
    "validate-words-8-hint": "Quel est le 8ème mot ?",
    "validate-words-9-hint": "Quel est le 9ème mot ?",
    "validate-words-10-hint": "Quel est le 10ème mot ?",
    "validate-words-11-hint": "Quel est le 11ème mot ?",
    "validate-words-12-hint": "Quel est le 12ème mot ?",
    "validate-words-13-hint": "Quel est le 13ème mot ?",
    "validate-words-14-hint": "Quel est le 14ème mot ?",
    "validate-words-15-hint": "Quel est le 15ème mot ?",
    "validate-words-16-hint": "Quel est le 16ème mot ?",
    "validate-words-17-hint": "Quel est le 17ème mot ?",
    "validate-words-18-hint": "Quel est le 18ème mot ?",
    "validate-words-19-hint": "Quel est le 19ème mot ?",
    "validate-words-20-hint": "Quel est le 20ème mot ?",
    "validate-words-21-hint": "Quel est le 21ème mot ?",
    "validate-words-22-hint": "Quel est le 22ème mot ?",
    "validate-words-23-hint": "Quel est le 23ème mot ?",
    "validate-words-24-hint": "Quel est le 24ème mot ?",

    "export-file-heading": "Accédez à votre Fichier de Connexion",
    "export-file-intro-heading": "Sauvegardez votre Compte",
    "export-file-intro-blue-text": "Votre Fichier de Connexion donne accès à votre compte. Téléchargez et enregistrez-le.",
    "export-file-intro-browser": "Votre compte est stocké dans votre navigateur.",
    "export-file-intro-accident": "Il peut être supprimé automatiquement ou par accident.",
    "export-file-intro-download-file": "Téléchargez le Fichier de Connexion pour sécuriser l'accès à votre compte.",
    "export-file-intro-orange-text": "Gardez-le sûr et confidentiel.",
    "export-file-success-set-password": "Définir le mot de passe",
    "export-file-success-save-file": "Enregistrer le Fichier de Connexion",
    "export-file-success-create-backup": "Créer sauvegarde",
    "export-file-success-heading": "Prenez 5 Minutes pour une Sauvegarde",
    "export-file-success-words-intro": "Il n'y a pas d'option 'mot de passe oublié'. Notez les 24 mots pour créer une sauvegarde sécurisée.",
    "export-words-intro-heading": "Il n'y a pas de Récupéra­tion de Mot de Passe !",
    "export-words-unlock-heading": "Déverrouillez votre Sauvegarde",
    "export-words-hint": "Faites défiler pour continuer",
    "go-to-recovery-words": "Créer une sauvegarde",
    "export-continue-to-login-file": "Continuer",
    "export-show-recovery-words": "Afficher les Mots",

    "remove-key-heading": "Ne perdez pas l'Accès",
    "remove-key-intro-text": "Si vous vous déconnectez sans enregistrer votre compte, vous y perdrez irréversiblement l'accès !",
    "remove-key-login-file-question": "Votre Fichier de Connexion est-il stocké et accessible en toute sécurité ?",
    "remove-key-download-login-file": "Télécharger",
    "remove-key-recovery-words-question": "Savez-vous où sont vos Mots de Récupération ?",
    "remove-key-show-recovery-words": "Créer sauvegarde",
    "remove-key-label-confirm-instructions": "Écrivez \"{accountLabel}\" pour vous déconnecter.",
    "remove-key-final-confirm": "Se déconnecter",

    "derive-address-heading-password": "Déverrouillez de nouvelles Adresses",
    "derive-address-password-text": "Pour ajouter une nouvelle adresse, veuillez[br]d'abord déverrouiller votre compte.",

    "change-password-heading": "Confirmez l'ancien Mot de Passe",
    "change-password-paragraph": "La modification du mot de passe créera un nouveau Fichier de Connexion qui remplace l'actuel.",
    "change-password-paragraph-legacy": "La modification du mot de passe n'a d'effet que sur cet appareil.",
    "change-password-info-item-1": "Tous les anciens Fichiers de Connexion fonctionnent toujours avec leurs anciens mots de passe.",
    "change-password-info-item-2": "Si un Fichier de Connexion a été compromis : veuillez créer un nouveau compte et transférer tous les fonds.",
    "change-password-download-login-file": "Télécharger le nouveau Fichier de Connexion",
    "change-password-set-password-heading": "Créez un nouveau Mot de Passe",
    "change-password-set-password-text": "Sécurisez votre nouveau Fichier de Connexion.",
    "change-password-set-password-text-legacy": "Sécurisez votre compte.",

    "error-no-request-heading": "Cela a mal tourné :(",
    "error-no-request-message": "Nous n'avons pas pu détecter une requête valide. Veuillez revenir en arrière et réessayer.",

    "login-file-color-orange": "Orange",
    "login-file-color-red": "Rouge",
    "login-file-color-yellow": "Jaune",
    "login-file-color-indigo": "Indigo",
    "login-file-color-blue": "Bleu",
    "login-file-color-purple": "Violet",
    "login-file-color-teal": "Sarcelle",
    "login-file-color-pink": "Rose",
    "login-file-color-green": "Vert",
    "login-file-color-brown": "Marron",

    "login-file-filename": "Fichier-de-Connexion-Nimiq-{accountLabel}.png",
    "login-file-default-account-label": "Compte {color}",

    "bitcoin": "Bitcoin",
    "bitcoin-recipient-unlabelled": "Non-libellé",

    "derive-btc-xpub-heading": "Ajouter Bitcoin\nà votre compte",
    "derive-btc-xpub-text": "Swappez facilement entre NIM, la monnaie de paiement super performante et BTC, l'étalon-or de la crypto.",

    "sign-swap-heading": "Confirmer le swap",
    "sign-swap-exchange-rate-tooltip": "Ce taux inclut les frais de swap.",
    "sign-swap-fees": "frais",
    "sign-swap-btc-fees": "frais de réseau BTC",
    "sign-swap-btc-fees-explainer": "Un swap atomique nécessite 2 transactions BTC.",
    "sign-swap-oasis-fees": "frais de service OASIS",
    "sign-swap-oasis-fees-explainer": "de la valeur du swap.",
    "sign-swap-bank-fees": "frais",
    "sign-swap-bank-fees-explainer": "Frais du réseau bancaire.",
    "sign-swap-nim-fees": "frais de réseau NIM",
    "sign-swap-exchange-fee": "Frais de swap",
    "sign-swap-of-exchange-value": "de la valeur du swap.",
    "sign-swap-total-fees": "Total des frais",
    "sign-swap-your-bank": "Votre banque"
},
nl: {
    "_language": "Nederlands",

    "language-changed": "De weergavetaal is gewijzigd. Wil je de pagina opnieuw laden om alle vertalingen bij te werken? Anders worden sommige vertalingen mogelijk niet automatisch bijgewerkt.",

    "back-to-app": "Terug naar {appName}",
    "back-to-accounts": "Terug naar mijn accounts",
    "back-to-wallet": "Terug naar {Wallet}",
    "back-to-miner": "Terug naar {Nimiq Miner}",
    "back-to-faucet": "Terug naar {Nimiq Faucet}",
    "back-to-donation": "Terug naar Donation Button Creator",
    "back-to-gift-card": "Terug naar Nimiq Gift Card",
    "back-to-vote": "Terug naar Nimiq Vote",
    "back-to-cpl": "Terug naar CryptoPayment.link",

    "funding-cashlink": "Financiering cashlink",

    "recovery-words-title": "Schrijf deze 24 woorden op papier",
    "recovery-words-intro-text": "De herstelwoorden is de ENIGSTE manier om je account te herstellen in het geval dat je je Login File of wachtwoord verliest.",
    "recovery-words-intro-offline": "Houd je woorden offline, voer ze nergens in dan op [strong]keyguard[/strong].nimiq.com.",
    "recovery-words-intro-copy": "Kopiëer deze gegevens en bewaar ze op een veilige plaats: thuis, bank kluis etc.",
    "recovery-words-intro-safety": "Let op water en vuur, gebruik een verzegelde kist om je herstelwoorden veilig te bewaren.",
    "recovery-words-text": "Iedereen met deze woorden heeft toegang tot uw account! Houd ze veilig.",
    "recovery-words-validate": "Valideer back-up",

    "create-heading-choose-identicon": "Kies een avatar",
    "create-address-label": "Your address:",
    "create-confirm-address": "Selecteer en ga verder",
    "create-heading-create-password": "Maak een wachtwoord",
    "create-heading-repeat-password": "Bevestig je wachtwoord",
    "create-heading-validate-backup": "Valideer je back-up",
    "create-loginfile-keycard": "Het wachtwoord beschermt je Login File,\nbeschouw het als een keycard voor je account.",
    "create-loginfile-any-device": "Met dit bestand kunt u vanaf elk apparaat inloggen.",
    "create-heading-what-is-loginfile": "Wat is een Login File?",
    "create-login-file-explainer-intro": "Een Login File, in combinatie met je wachtwoord, toegang geeft tot je account.",
    "create-login-file-paragraph-1": "Nimiq bewaart je gegevens niet. De Login File vervangt je e-mail als manier om in te loggen.",
    "create-login-file-paragraph-2": "Het aanmeldingsbestand wordt opgeslagen in je browser. Ontgrendel het met je wachtwoord.",
    "create-login-file-paragraph-3": "Je kunt per ongeluk worden uitgelogd. Download en bewaar de Login File veilig om geen toegang te verliezen.",
    "create-login-file-return": "Begrepen",

    "import-heading-enter-recovery-words": "Voer herstelwoorden in",
    "import-import-login-file": "Importeer je Login File",
    "import-login-to-continue": "Log opnieuw in om door te gaan.",
    "import-unlock-account": "Ontgrendel je account",
    "import-create-account": "Creëer nieuw account",
    "import-qr-video-tooltip": "Scan je Login File met de camera.",

    "import-file-button-words": "Inloggen met herstelwoorden",

    "import-words-file-available": "Met behulp van de herstelwoorden wordt een nieuwe Login File gemaakt. Maak een wachtwoord om het te beveiligen.",
    "import-words-file-unavailable": "Met behulp van de herstelwoorden maak je een nieuw account aan. Maak een wachtwoord om het te beveiligen.",
    "import-words-hint": "Druk op Tab om naar het volgende veld te springen",
    "import-words-error": "Dit is geen geldig account. Typfoutje?",
    "import-words-wrong-seed-phrase": "Deze herstelwoorden horen bij een ander account",
    "import-words-download-loginfile": "Login File opslaan",

    "file-import-prompt": "Sleep hierheen of klik om te importeren",
    "file-import-error-could-not-read": "Kan Login File niet lezen.",
    "file-import-error-invalid": "Ongeldige Login File.",

    "qr-video-scanner-cancel": "Annuleer",
    "qr-video-scanner-no-camera": "Je apparaat heeft geen toegankelijke camera.",
    "qr-video-scanner-enable-camera": "Deblokkeer de camera zodat deze website QR-codes kan scannen.",

    "sign-tx-heading-tx": "Bevestig transactie",
    "sign-tx-heading-checkout": "Verifieer betaling",
    "sign-tx-heading-cashlink": "Maak een Cashlink",
    "sign-tx-fee": "kosten",
    "sign-tx-cancel-payment": "Annuleer betaling",

    "sign-msg-heading": "Bericht ondertekenen",
    "sign-msg-signer": "Ondertekenaar",

    "tab-width-selector-label": "Tab breedte",

    "address-info-new-cashlink": "Nieuwe Cashlink",

    "copyable-copied": "Gekopieerd",

    "passwordbox-enter-password": "Vul wachtwoord in",
    "passwordbox-enter-pin": "Vul PIN in",
    "passwordbox-repeat-password": "Herhaal je wachtwoord",
    "passwordbox-repeat": "Herhaal wachtwoord",
    "passwordbox-continue": "Doorgaan",
    "passwordbox-log-in": "Ontgrendel",
    "passwordbox-confirm": "Bevestig",
    "passwordbox-log-out": "Uitloggen bevestigen",
    "passwordbox-confirm-tx": "Bevestig transactie",
    "passwordbox-create-cashlink": "Creëer cashlink",
    "passwordbox-confirm-create": "Creëer account",
    "passwordbox-confirm-log-in": "Log in",
    "passwordbox-show-words": "Toon herstelwoorden",
    "passwordbox-sign-msg": "Bericht ondertekenen",
    "passwordbox-confirm-swap": "Bevestig swap",
    "passwordbox-password-strength-short": "Voer 8 tekens of meer in",
    "passwordbox-password-strength-weak": "Zwak wachtwoord",
    "passwordbox-password-strength-good": "Goed wachtwoord",
    "passwordbox-password-strength-strong": "Sterk wachtwoord",
    "passwordbox-password-strength-secure": "Veilig wachtwoord",
    "passwordbox-password-too-long": "Max. 256 tekens",
    "passwordbox-repeat-password-long": "Geen overeenkomst, probeer het opnieuw",
    "passwordbox-repeat-password-short": "Wachtwoord is te kort",
    "passwordbox-password-skip": "Voor nu overslaan",
    "passwordbox-reset-password": "Resetten met herstelwoorden",

    "payment-info-line-order-amount": "Orderbedrag",
    "payment-info-line-vendor-markup": "Crypto leverancier opmaak",
    "payment-info-line-vendor-discount": "Crypto leverancier korting",
    "payment-info-line-effective-rate": "Effectief tarief",
    "payment-info-line-free-service": "Nimiq biedt deze service gratis aan.",
    "payment-info-line-total": "Totaal",
    "payment-info-line-network-fee": "netwerkkosten",
    "payment-info-line-paying-more": "U betaalt ongeveer %RATE_DEVIATION% meer dan de huidige marktkoers (coingecko.com).",
    "payment-info-line-paying-less": "Je betaalt ongeveer %RATE_DEVIATION% minder dan het huidige markttarief (coingecko.com).",
    "payment-info-line-actual-discount": "Je daadwerkelijke korting is ca. %RATE_DEVIATION% in vergelijking met het huidige markttarief (coingecko.com).",

    "timer-expiry": "Deze aanbieding vervalt over",
    "timer-second": "seconde",
    "timer-seconds": "seconden",
    "timer-minute": "minuut",
    "timer-minutes": "minuten",
    "timer-hour": "uur",
    "timer-hours": "uren",
    "timer-day": "dag",
    "timer-days": "dagen",

    "identicon-selector-avatars-hint": "Avatars stellen NIM-adressen voor.",
    "identicon-selector-avatars-hint-2": "Beschouw ze als bankrekeningnummers.",
    "identicon-selector-generate-new": "Nieuwe avatar",

    "download-loginfile-download": "Downloaden",
    "download-loginfile-successful": "Download succesvol?",
    "download-loginfile-tap-and-hold": "Tik en houd de afbeelding\nvast om te downloaden",
    "download-loginfile-continue": "Doorgaan",

    "validate-words-text": "Selecteer het juiste woord uit je lijst met herstelwoorden.",
    "validate-words-1-hint": "Wat is het 1e woord?",
    "validate-words-2-hint": "Wat is het 2e woord?",
    "validate-words-3-hint": "Wat is het 3e woord?",
    "validate-words-4-hint": "Wat is het 4e woord?",
    "validate-words-5-hint": "Wat is het 5e woord?",
    "validate-words-6-hint": "Wat is het 6e woord?",
    "validate-words-7-hint": "Wat is het 7e woord?",
    "validate-words-8-hint": "Wat is het 8e woord?",
    "validate-words-9-hint": "Wat is het 9e woord?",
    "validate-words-10-hint": "Wat is het 10e woord?",
    "validate-words-11-hint": "Wat is het 11e woord?",
    "validate-words-12-hint": "Wat is het 12e woord?",
    "validate-words-13-hint": "Wat is het 13e woord?",
    "validate-words-14-hint": "Wat is het 14e woord?",
    "validate-words-15-hint": "Wat is het 15e woord?",
    "validate-words-16-hint": "Wat is het 16e woord?",
    "validate-words-17-hint": "Wat is het 17e woord?",
    "validate-words-18-hint": "Wat is het 18e woord?",
    "validate-words-19-hint": "Wat is het 19e woord?",
    "validate-words-20-hint": "Wat is het 20e woord?",
    "validate-words-21-hint": "Wat is het 21e woord?",
    "validate-words-22-hint": "Wat is het 22e woord?",
    "validate-words-23-hint": "Wat is het 23e woord?",
    "validate-words-24-hint": "Wat is het 24e woord?",

    "export-file-heading": "Open je Login File",
    "export-file-intro-heading": "Account opslaan",
    "export-file-intro-blue-text": "Je Login File geeft toegang tot je account. Download het en sla het op.",
    "export-file-intro-browser": "Je account is opgeslagen in je browser.",
    "export-file-intro-accident": "Het kan automatisch of per ongeluk worden verwijderd.",
    "export-file-intro-download-file": "Download de Login File om de toegang tot je account te beveiligen.",
    "export-file-intro-orange-text": "Bewaar het veilig en vertrouwelijk.",
    "export-file-success-set-password": "Stel een wachtwoord in",
    "export-file-success-save-file": "Login File opslaan",
    "export-file-success-create-backup": "Back-up maken",
    "export-file-success-heading": "Neem 5 minuten voor een back-up",
    "export-file-success-words-intro": "De 'wachtwoord vergeten' optie bestaat niet. Schrijf de 24 woorden op om een veilige back-up te maken.",
    "export-words-intro-heading": "Er is geen wachtwoordherstel!",
    "export-words-unlock-heading": "Back-up ontgrendelen",
    "export-words-hint": "Scroll om door te gaan",
    "go-to-recovery-words": "Back-up maken",
    "export-continue-to-login-file": "Ga naar Login File",
    "export-show-recovery-words": "Laat herstelwoorden zien",

    "remove-key-heading": "Verlies geen toegang",
    "remove-key-intro-text": "Als je uitlogt zonder je account op te slaan, verlies je onherroepelijk de toegang ertoe!",
    "remove-key-login-file-question": "Is je Login File veilig opgeslagen en toegankelijk?",
    "remove-key-download-login-file": "Download Login File",
    "remove-key-recovery-words-question": "Weet je waar je herstelwoorden zijn?",
    "remove-key-show-recovery-words": "Back-up maken",
    "remove-key-label-confirm-instructions": "Typ \"{accountLabel}\" om uit te loggen.",
    "remove-key-final-confirm": "Uitloggen",

    "derive-address-heading-password": "Ontgrendel nieuwe adressen",
    "derive-address-password-text": "Om een nieuw adres toe te voegen, moet je eerst je account ontgrendelen.",

    "change-password-heading": "Bevestig het oude wachtwoord",
    "change-password-paragraph": "Als je het wachtwoord wijzigt, wordt een nieuwe Login File aangemaakt dat het huidige vervangt.",
    "change-password-paragraph-legacy": "Het wijzigen van het wachtwoord heeft alleen effect op dit apparaat.",
    "change-password-info-item-1": "Alle oude Login Files werken nog steeds met hun oude wachtwoorden.",
    "change-password-info-item-2": "Als de veiligheid van de Login File in gevaar is gebracht: maak een nieuw account aan en maak al het geld over.",
    "change-password-download-login-file": "Nieuwe Login File downloaden",
    "change-password-set-password-heading": "Maak een nieuw wachtwoord",
    "change-password-set-password-text": "Beveilig je nieuwe Login File.",
    "change-password-set-password-text-legacy": "Beveilig je account.",

    "error-no-request-heading": "Dat ging mis :(",
    "error-no-request-message": "We konden geen geldig verzoek detecteren. Ga alstublieft terug en probeer het opnieuw.",

    "login-file-color-orange": "Oranje",
    "login-file-color-red": "Rood",
    "login-file-color-yellow": "Geel",
    "login-file-color-indigo": "Indigo",
    "login-file-color-blue": "Blauw",
    "login-file-color-purple": "Paars",
    "login-file-color-teal": "Teal",
    "login-file-color-pink": "Roze",
    "login-file-color-green": "Groen",
    "login-file-color-brown": "Bruin",

    "login-file-filename": "Nimiq-Login-File-{accountLabel}.png",
    "login-file-default-account-label": "{color} Account",

    "bitcoin": "Bitcoin",
    "bitcoin-recipient-unlabelled": "Ongelabeld",

    "derive-btc-xpub-heading": "Voeg Bitcoin\ntoe aan je account",
    "derive-btc-xpub-text": "Wissel eenvoudig tussen NIM, de superpresterende betaalmunt en BTC, de gouden standaard van crypto.",

    "sign-swap-heading": "Swap bevestigen",
    "sign-swap-exchange-rate-tooltip": "Dit tarief is inclusief de wisselkosten.",
    "sign-swap-fees": "kosten",
    "sign-swap-btc-fees": "BTC netwerk fee",
    "sign-swap-btc-fees-explainer": "Atomic swaps vereisen twee BTC-transacties.",
    "sign-swap-oasis-fees": "OASIS servicekosten",
    "sign-swap-oasis-fees-explainer": "van ruilwaarde.",
    "sign-swap-bank-fees": "kosten",
    "sign-swap-bank-fees-explainer": "Bank kosten.",
    "sign-swap-nim-fees": "NIM netwerk fee",
    "sign-swap-exchange-fee": "Wisselkosten",
    "sign-swap-of-exchange-value": "van ruilwaarde.",
    "sign-swap-total-fees": "Totale kosten",
    "sign-swap-your-bank": "Jouw bank"
},
ru: {
    "_language": "Pусский",

    "language-changed": "Язык интерфейса изменен. Хотите перезагрузить страницу, чтобы применить изменения? В противном случае отдельные слова не будут переведены.",

    "back-to-app": "Вернуться в {appName}",
    "back-to-accounts": "Вернуться к списку аккаунтов",
    "back-to-wallet": "Назад в {Wallet}",
    "back-to-miner": "Назад в {Nimiq Miner}",
    "back-to-faucet": "Назад в {Nimiq Faucet}",
    "back-to-donation": "Вернуться к созданию кнопки пожертвований",
    "back-to-gift-card": "Назад к Nimiq Gift Card",
    "back-to-vote": "Назад к Nimiq Vote",
    "back-to-cpl": "Назад к CryptoPayment.link",

    "funding-cashlink": "Финансирование Cashlink",

    "recovery-words-title": "Запишите эти 24 слова на бумаге",
    "recovery-words-intro-text": "При потере Файла и/или пароля аккайнт можно восстановить ТОЛЬКО Защитной Фразой из 24 слов.",
    "recovery-words-intro-offline": "Храните Защитную Фразу в оффлайне, не вводите слова безопасности только в [strong]keyguard[/strong].nimiq.com.",
    "recovery-words-intro-copy": "Сделайте несколько копий и спрячьте их в надёжных местах: например, в банковской ячейке. ",
    "recovery-words-intro-safety": "Чтобы ваша Защитная Фраза не сгорела и не утопла, храните её герметичной ёмкости.",
    "recovery-words-text": "Тот, у кого есть доступ к вашей Защитной Фразе, может получить доступ и к вашему аккаунту! Надёжно храните свои защитные слова!",
    "recovery-words-validate": "Проверить резервную копию",

    "create-heading-choose-identicon": "Выберите Аватар",
    "create-address-label": "Your address:",
    "create-confirm-address": "Выбрать и продолжить",
    "create-heading-create-password": "Создать пароль",
    "create-heading-repeat-password": "Подтвердите пароль",
    "create-heading-validate-backup": "Проверить вашу резервную копию",
    "create-loginfile-keycard": "Пароль защищает ваш Файл Авторизации",
    "create-loginfile-any-device": "С этим файлом вы можете войти в систему с любого устройства.",
    "create-heading-what-is-loginfile": "Что такое Файл Авторизации?",
    "create-login-file-explainer-intro": "Это файл-картинка, который вместе с вашим паролем предоставляет доступ к вашему аккаунту.",
    "create-login-file-paragraph-1": "Nimiq не хранит ваши данные. Файл Авторизации используется вместо вашей почты для входа в систему.",
    "create-login-file-paragraph-2": "Файл Авторизации хранится в вашем браузере и «отпирается» вашим паролем.",
    "create-login-file-paragraph-3": "Вы можете случайно выйти из системы. Скачайте и надёжно сохраните Файл Авторизации, чтобы не потерять доступ.",
    "create-login-file-return": "Понятно",

    "import-heading-enter-recovery-words": "Введите Защитную Фразу",
    "import-import-login-file": "Импортировать ваш Файл Авторизации",
    "import-login-to-continue": "Чтобы продолжить, войдите снова",
    "import-unlock-account": "Разблокировать ваш Аккаунт",
    "import-create-account": "Создать новый аккаунт",
    "import-qr-video-tooltip": "Scan your Login File with your device's camera.",

    "import-file-button-words": "Войти с помощью Защитной Фразы",

    "import-words-file-available": "Каждый раз, когда вы используете для восстановления Защитную Фразу, создаётся новый Файл Авторизации. Чтобы обезопасить его, создайте пароль.",
    "import-words-file-unavailable": "Каждый раз, когда вы используете для восстановления Защитную Фразу, создаётся новый Файл Авторизации. Чтобы обезопасить его, создайте пароль.",
    "import-words-hint": "Tab, чтобы перейти дальше",
    "import-words-error": "Это некорректный аккаунт. Опечатались?",
    "import-words-wrong-seed-phrase": "Эта Защитная Фраза - от другого аккаунта",
    "import-words-download-loginfile": "Сохраните свой Файл Авторизации",

    "file-import-prompt": "Перетащите сюда или кликните для импорта",
    "file-import-error-could-not-read": "Файл Авторизации не прочитался",
    "file-import-error-invalid": "Некорретный Файл Авторизации",

    "qr-video-scanner-cancel": "Отменить",
    "qr-video-scanner-no-camera": "Камера вашего устройства недоступна.",
    "qr-video-scanner-enable-camera": "Разблокируйте камеру для этого сайта, чтобы сканировать QR-коды.",

    "sign-tx-heading-tx": "Подтвердите транзакцию",
    "sign-tx-heading-checkout": "Проверьте Платёж",
    "sign-tx-heading-cashlink": "Создать Cashlink",
    "sign-tx-fee": "комиссия",
    "sign-tx-cancel-payment": "Отменить платёж",

    "sign-msg-heading": "Подписать сообщение",
    "sign-msg-signer": "Отправитель",

    "tab-width-selector-label": "Ширина вкладки",

    "address-info-new-cashlink": "Новый Cashlink",

    "copyable-copied": "Скопировано",

    "passwordbox-enter-password": "Введите ваш пароль",
    "passwordbox-enter-pin": "Введите ваш PIN-код",
    "passwordbox-repeat-password": "Повторите ваш пароль",
    "passwordbox-repeat": "Повторите пароль",
    "passwordbox-continue": "Продолжить",
    "passwordbox-log-in": "Разблокировать",
    "passwordbox-confirm": "Подтвердить",
    "passwordbox-log-out": "Подтвердить выход",
    "passwordbox-confirm-tx": "Подтвердите транзакцию",
    "passwordbox-create-cashlink": "Создать Cashlink",
    "passwordbox-confirm-create": "Создать аккаунт",
    "passwordbox-confirm-log-in": "Войти",
    "passwordbox-show-words": "Показать Защитную Фразу",
    "passwordbox-sign-msg": "Подписать сообщение",
    "passwordbox-confirm-swap": "Подтвердить обмен",
    "passwordbox-password-strength-short": "Введите 8 или более символов",
    "passwordbox-password-strength-weak": "Пароль ненадёжный",
    "passwordbox-password-strength-good": "Пароль надёжный",
    "passwordbox-password-strength-strong": "Пароль очень надёжный",
    "passwordbox-password-strength-secure": "Надёжный пароль",
    "passwordbox-password-too-long": "Максимум 256 символов",
    "passwordbox-repeat-password-long": "Не совпадает. Пожалуйста, попробуйте ещё раз",
    "passwordbox-repeat-password-short": "Пароль слишком короткий",
    "passwordbox-password-skip": "Пока отложить",
    "passwordbox-reset-password": "Сбросить, используя Защитную Фразу",

    "payment-info-line-order-amount": "Сумма заказа",
    "payment-info-line-vendor-markup": "Маркап вендора криптовалюты",
    "payment-info-line-vendor-discount": "Скидка вендора криптовалюты",
    "payment-info-line-effective-rate": "Курс конвертации",
    "payment-info-line-free-service": "Nimiq предоставляет данный сервис бесплатно.",
    "payment-info-line-total": "Итого",
    "payment-info-line-network-fee": "комиссия сети",
    "payment-info-line-paying-more": "Вы платите приблизительно на %RATE_DEVIATION% больше, чем по текущему рыночному курсу (coingecko.com).",
    "payment-info-line-paying-less": "Вы платите приблизительно на %RATE_DEVIATION% меньше, чем по текущему рыночному курсу (coingecko.com).",
    "payment-info-line-actual-discount": "Ваша фактическая скидка составляет приблизительно %RATE_DEVIATION% по сравнению с текущим рыночным курсом (coingecko.com).",

    "timer-expiry": "Срок действия этого предложения истекает через",
    "timer-second": "секунда",
    "timer-seconds": " секунд",
    "timer-minute": "минута",
    "timer-minutes": "минут",
    "timer-hour": "час",
    "timer-hours": "часов",
    "timer-day": "день",
    "timer-days": "дней",

    "identicon-selector-avatars-hint": "Аватары символизируют NIM-адреса",
    "identicon-selector-avatars-hint-2": "Представьте, что это номер банковского счёта.",
    "identicon-selector-generate-new": "Новые аватары",

    "download-loginfile-download": "Скачать",
    "download-loginfile-successful": "Скачивание прошло успешно?",
    "download-loginfile-tap-and-hold": "Удерживайте изображение,\nчтобы скачать его",
    "download-loginfile-continue": "Продолжить",

    "validate-words-text": "Для восстановления выберите верное слово из списка.",
    "validate-words-1-hint": "Введите 1 слово",
    "validate-words-2-hint": "Введите 2 слово",
    "validate-words-3-hint": "Введите 3 слово",
    "validate-words-4-hint": "Введите 4 слово",
    "validate-words-5-hint": "Введите 5 слово",
    "validate-words-6-hint": "Введите 6 слово",
    "validate-words-7-hint": "Введите 7 слово",
    "validate-words-8-hint": "Введите 8 слово",
    "validate-words-9-hint": "Введите 9 слово",
    "validate-words-10-hint": "Введите 10 слово",
    "validate-words-11-hint": "Введите 11 слово",
    "validate-words-12-hint": "Введите 12 слово",
    "validate-words-13-hint": "Введите 13 слово",
    "validate-words-14-hint": "Введите 14 слово",
    "validate-words-15-hint": "Введите 15 слово",
    "validate-words-16-hint": "Введите 16 слово",
    "validate-words-17-hint": "Введите 17 слово",
    "validate-words-18-hint": "Введите 18 слово",
    "validate-words-19-hint": "Введите 19 слово",
    "validate-words-20-hint": "Введите 20 слово",
    "validate-words-21-hint": "Введите 21 слово",
    "validate-words-22-hint": "Введите 22 слово",
    "validate-words-23-hint": "Введите 23 слово",
    "validate-words-24-hint": "Введите 24 слово",

    "export-file-heading": "Доступ к Файлу Авторизации",
    "export-file-intro-heading": "Сохраните ваш аккаунт",
    "export-file-intro-blue-text": "Файл Авторизации обеспечивает доступ к вашему аккаунту.\nСкачайте и сохраните его.",
    "export-file-intro-browser": "Ваш аккаунт хранится в браузере.",
    "export-file-intro-accident": "Он может быть удалён автоматически или по ошибке",
    "export-file-intro-download-file": "Скачайте Файл Авторизации, чтобы защитить доступ к своему аккаунту.",
    "export-file-intro-orange-text": "Сохраните его в надежном месте.",
    "export-file-success-set-password": "Установите пароль",
    "export-file-success-save-file": "Сохранить",
    "export-file-success-create-backup": "Создать резервную копию",
    "export-file-success-heading": "Потратьте 5 минут и создайте Резервную Копию",
    "export-file-success-words-intro": "Пароль забывать нельзя! Запишите 24 фразы восстановления доступа.",
    "export-words-intro-heading": "Утерянный пароль не восстановить!",
    "export-words-unlock-heading": "Разблокировать резервную копию",
    "export-words-hint": "Прокрутите, чтобы продолжить",
    "go-to-recovery-words": "Создать резервную копию",
    "export-continue-to-login-file": "Далее к Файлу Авторизации",
    "export-show-recovery-words": "Показать Защитную Фразу",

    "remove-key-heading": "Не потеряйте доступ",
    "remove-key-intro-text": "Не выходите из учётной записи, не сохранив данные доступа к своему аккаунту! Так вы рискуете навсегда потерять к нему доступ!",
    "remove-key-login-file-question": "Вы точно сохранили свой Файл Авторизации? Убедитесь, что у вас всегда есть доступ к нему.",
    "remove-key-download-login-file": "Скачать",
    "remove-key-recovery-words-question": "Известно ли вам, где хранится ваша Защитная Фраза?",
    "remove-key-show-recovery-words": "Бэкап",
    "remove-key-label-confirm-instructions": "Введите \"{accountLabel}\", чтобы выйти из учётной записи.",
    "remove-key-final-confirm": "Выйти",

    "derive-address-heading-password": "Разблокировать новый адрес",
    "derive-address-password-text": "Чтобы добавить новый адрес, пожалуйста,[br]сначала разблокируйте ваш аккаунт.",

    "change-password-heading": "Подтвердите старый пароль",
    "change-password-paragraph": "Изменение пароля приведёт к созданию нового Файла Авторизации, который заменит существующий Файл.",
    "change-password-paragraph-legacy": "Смена пароля распространается только на данное устройство.",
    "change-password-info-item-1": "Все ранее созданные Файлы Авторизации по-прежнему можно использовать по назначению вместе с их старыми паролями.",
    "change-password-info-item-2": "Данный Файл Авторизации скомпрометирован: Пожалуйста, создайте новый аккаунт и переведите на него свои сбережения.",
    "change-password-download-login-file": "Скачать новый Файл Авторизации",
    "change-password-set-password-heading": "Создать новый Пароль",
    "change-password-set-password-text": "Сохраните ваш новый Файл Авторизации.",
    "change-password-set-password-text-legacy": "Защитите ваш аккаунт.",

    "error-no-request-heading": "Операция не удалась :(",
    "error-no-request-message": "Мы не смогли идентифицировать корректный запрос. Пожалуйста, вернитесь и попробуйте еще раз.",

    "login-file-color-orange": "Оранжевый",
    "login-file-color-red": "Красный",
    "login-file-color-yellow": "Жёлтый",
    "login-file-color-indigo": "Индиго",
    "login-file-color-blue": "Синий",
    "login-file-color-purple": "Фиолетовый",
    "login-file-color-teal": "Бирюзовый",
    "login-file-color-pink": "Розовый",
    "login-file-color-green": "Зеленый",
    "login-file-color-brown": "Коричневый",

    "login-file-filename": "Nimiq-Файл-Авторизации-{accountLabel}.png",
    "login-file-default-account-label": "{color} Аккаунт",

    "bitcoin": "Bitcoin",
    "bitcoin-recipient-unlabelled": "Немаркированный",

    "derive-btc-xpub-heading": "Добавьте Биткоин\nна свой аккаунт",
    "derive-btc-xpub-text": "NIM - супербыстрая платёжная монета. BTC - золотой криптовалютный стандарт. Меняйте NIM на BTC - и обратно. Это легко и просто!",

    "sign-swap-heading": "Подтвердить обмен",
    "sign-swap-exchange-rate-tooltip": "Эта ставка включает в \nсебя комиссию за обмен.",
    "sign-swap-fees": "комиссии",
    "sign-swap-btc-fees": "Комиссия сети BTC",
    "sign-swap-btc-fees-explainer": " Обмен выполняется в 2 транзакции BTC.",
    "sign-swap-oasis-fees": "Комиссия сервиса OASIS",
    "sign-swap-oasis-fees-explainer": "от суммы обмена.",
    "sign-swap-bank-fees": "комиссия",
    "sign-swap-bank-fees-explainer": "Комиссия банка.",
    "sign-swap-nim-fees": "Комиссия сети NIM",
    "sign-swap-exchange-fee": "Комиссия",
    "sign-swap-of-exchange-value": "от суммы обмена.",
    "sign-swap-total-fees": "Итого",
    "sign-swap-your-bank": "Ваш банк"
},
uk: {
    "_language": "Українська",

    "language-changed": "Мову інтерфейсу змінено. Чи хочете ви обновити сторінку щоб замінити усі переклади? В інакшому випадку, деякі переклади можуть бути не оновлені.",

    "back-to-app": "Повернутися до {appName}",
    "back-to-accounts": "Повернутися до моїх рахунків",
    "back-to-wallet": "Повернутися до {Wallet}",
    "back-to-miner": "Повернутися до {Nimiq Miner}",
    "back-to-faucet": "Повернутися до {Nimiq Faucet}",
    "back-to-donation": "Повернутися до створення кнопки пожертв",
    "back-to-gift-card": "Повернутися до подарункової картки Nimiq",
    "back-to-vote": "Повернутися до Nimiq голосування",
    "back-to-cpl": "Повернутися до CryptoPayment.link",

    "funding-cashlink": "Чек поповнюється",

    "recovery-words-title": "Напишіть ці 24 слова на папері",
    "recovery-words-intro-text": "Секретні слова це ЄДИНИЙ спосіб відновити ваш рахунок у випадку якщо ви втратили файл-ключ.",
    "recovery-words-intro-offline": "Не зберігайте ваші секретні слова в інтернеті, ніде їх не вводьте, окрім як на [strong]keyguard[/strong].nimiq.com.",
    "recovery-words-intro-copy": "Створіть копію та зберігайте її у безпечних місцях: сімейний будинок, банківська комірка тощо.",
    "recovery-words-intro-safety": "Остерігайтеся води і вогню, надійно зберігайте ваші секретні слова у герметичній коробці.",
    "recovery-words-text": "Кожен, хто має ці слова, може отримати доступ до вашого рахунку! Зберігайте їх у безпечному місці.",
    "recovery-words-validate": "Перевірити ключові слова",

    "create-heading-choose-identicon": "Виберіть адресу",
    "create-address-label": "Your address:",
    "create-confirm-address": "Оберіть щоб продовжити",
    "create-heading-create-password": "Задайте пароль",
    "create-heading-repeat-password": "Підтвердьте пароль",
    "create-heading-validate-backup": "Перевірте ключові слова",
    "create-loginfile-keycard": "Пароль захищає ваш файл-ключ,\nначе це пароль від облікового запису.",
    "create-loginfile-any-device": "Цей файл надає доступ до вашого рахунку на будь-якому пристрої.",
    "create-heading-what-is-loginfile": "Що таке файлю-ключ?",
    "create-login-file-explainer-intro": "Файл-ключ, разом з паролем, надає доступ до вашого рахунку.",
    "create-login-file-paragraph-1": "Німік не зберігає ваших даних. Файлю-ключ заміщує емейл як засіб входу.",
    "create-login-file-paragraph-2": "Файл-ключ зберігається у вашому веб-оглядачі. Використовуйте пароль, щоб отримати доступ.",
    "create-login-file-paragraph-3": "Ви можете випадково вийти з гаманця. Завантажте та зберігайте файл-ключ щоб не втратити доступ.",
    "create-login-file-return": "Зрозуміло",

    "import-heading-enter-recovery-words": "Уведіть секретні слова",
    "import-import-login-file": "Завантажте файл-ключ",
    "import-login-to-continue": "Будь ласка, увійдіть ще раз, щоб продовжити.",
    "import-unlock-account": "Розблокувати рахунок",
    "import-create-account": "Створити новий рахунок",
    "import-qr-video-tooltip": "Відскануйте свій файл-ключ за допомогою камери вашого пристрою",

    "import-file-button-words": "Увійти за допомогою секретних слів",

    "import-words-file-available": "Використання секретних слів створює новий файл-ключ. Створіть пароль щоб захистити його.",
    "import-words-file-unavailable": "Створіть новий рахунок за допомогою секретних слів. Створіть пароль щоб захистити його.",
    "import-words-hint": "Натисніть Tab, щоб перейти до наступного поля",
    "import-words-error": "Це невірний рахунок. Схибили?",
    "import-words-wrong-seed-phrase": "Ці секретні слова відповідають іншому рахунку",
    "import-words-download-loginfile": "Збережіть файл-ключ",

    "file-import-prompt": "Перетягніть сюди або клацніть щоб завантажити",
    "file-import-error-could-not-read": "Неможливо прочитати файл-ключ.",
    "file-import-error-invalid": "Невірний файл-ключ.",

    "qr-video-scanner-cancel": "Скасувати",
    "qr-video-scanner-no-camera": "Ваш пристрій не має доступної камери.",
    "qr-video-scanner-enable-camera": "Розблокуйте камеру для цього веб-сайту, щоб сканувати QR-коди.",

    "sign-tx-heading-tx": "Підтвердіть переказ",
    "sign-tx-heading-checkout": "Підтвердіть платіж",
    "sign-tx-heading-cashlink": "Створити чек",
    "sign-tx-fee": "комісія",
    "sign-tx-cancel-payment": "Скасувати платіж",

    "sign-msg-heading": "Підписати повідомлення",
    "sign-msg-signer": "Підписант",

    "tab-width-selector-label": "Довжина вкладки",

    "address-info-new-cashlink": "Новий чек",

    "copyable-copied": "Скопійовано",

    "passwordbox-enter-password": "Введіть пароль",
    "passwordbox-enter-pin": "Уведіть PIN",
    "passwordbox-repeat-password": "Повторіть пароль",
    "passwordbox-repeat": "Повторіть пароль",
    "passwordbox-continue": "Продовжити",
    "passwordbox-log-in": "Розблокувати",
    "passwordbox-confirm": "Підтвердити",
    "passwordbox-log-out": "Підтвердіть вихід",
    "passwordbox-confirm-tx": "Підтвердити переказ",
    "passwordbox-create-cashlink": "Створити чек",
    "passwordbox-confirm-create": "Створити рахунок",
    "passwordbox-confirm-log-in": "Увійти",
    "passwordbox-show-words": "Показати секретні слова",
    "passwordbox-sign-msg": "Підписати повідомлення",
    "passwordbox-confirm-swap": "Підтвердити обмін",
    "passwordbox-password-strength-short": "Введіть 8 символів або більше",
    "passwordbox-password-strength-weak": "Слабкий пароль",
    "passwordbox-password-strength-good": "Хороший пароль",
    "passwordbox-password-strength-strong": "Міцний пароль",
    "passwordbox-password-strength-secure": "Безпечний пароль",
    "passwordbox-password-too-long": "Максимум 256 символів",
    "passwordbox-repeat-password-long": "Не співпадає, повторіть ще раз",
    "passwordbox-repeat-password-short": "Пароль занадто короткий",
    "passwordbox-password-skip": "Наразі пропустити",
    "passwordbox-reset-password": "Скинути за допомогою секретних слів",

    "payment-info-line-order-amount": "Сума замовлення",
    "payment-info-line-vendor-markup": "Націнка від постачальника",
    "payment-info-line-vendor-discount": "Знижка від постачальника",
    "payment-info-line-effective-rate": "Дійсний курс",
    "payment-info-line-free-service": "Німік надає цю послугу безплатно.",
    "payment-info-line-total": "сума",
    "payment-info-line-network-fee": "комісія мережі",
    "payment-info-line-paying-more": "У вас знижка приблизно %RATE_DEVIATION% більше в порівнянні з поточним ринковим курсом (coingecko.com).",
    "payment-info-line-paying-less": "Ви платите приблизно %RATE_DEVIATION% менше в порівнянні з поточним ринковим курсом (coingecko.com).",
    "payment-info-line-actual-discount": "У вас знижка приблизно %RATE_DEVIATION% в порівнянні з поточним ринковим курсом (coingecko.com).",

    "timer-expiry": "Ця пропозиція закінчується через",
    "timer-second": "секунду",
    "timer-seconds": "секунд",
    "timer-minute": "хвилину",
    "timer-minutes": "хвилин",
    "timer-hour": "годину",
    "timer-hours": "годин",
    "timer-day": "день",
    "timer-days": "дні",

    "identicon-selector-avatars-hint": "Піктограми представляють адреси NIM.",
    "identicon-selector-avatars-hint-2": "Адреси це наче реквізити в банку.",
    "identicon-selector-generate-new": "Нові адреси",

    "download-loginfile-download": "Завантажити",
    "download-loginfile-successful": "Завантажено успішно?",
    "download-loginfile-tap-and-hold": "Натисніть і утримуйте на\nмалюнку щоб завантажити",
    "download-loginfile-continue": "Продовжити",

    "validate-words-text": "Будь ласка, вкажіть слово з ваших секретних слів для доступу до рахунку.",
    "validate-words-1-hint": "Вкажіть слово №1",
    "validate-words-2-hint": "Вкажіть слово №2",
    "validate-words-3-hint": "Вкажіть слово №3",
    "validate-words-4-hint": "Вкажіть слово №4",
    "validate-words-5-hint": "Вкажіть слово №5",
    "validate-words-6-hint": "Вкажіть слово №6",
    "validate-words-7-hint": "Вкажіть слово №7",
    "validate-words-8-hint": "Вкажіть слово №8",
    "validate-words-9-hint": "Вкажіть слово №9",
    "validate-words-10-hint": "Вкажіть слово №10",
    "validate-words-11-hint": "Вкажіть слово №11",
    "validate-words-12-hint": "Вкажіть слово №12",
    "validate-words-13-hint": "Вкажіть слово №13",
    "validate-words-14-hint": "Вкажіть слово №14",
    "validate-words-15-hint": "Вкажіть слово №15",
    "validate-words-16-hint": "Вкажіть слово №16",
    "validate-words-17-hint": "Вкажіть слово №17",
    "validate-words-18-hint": "Вкажіть слово №18",
    "validate-words-19-hint": "Вкажіть слово №19",
    "validate-words-20-hint": "Вкажіть слово №20",
    "validate-words-21-hint": "Вкажіть слово №21",
    "validate-words-22-hint": "Вкажіть слово №22",
    "validate-words-23-hint": "Вкажіть слово №23",
    "validate-words-24-hint": "Вкажіть слово №24",

    "export-file-heading": "Отримати файл-ключ",
    "export-file-intro-heading": "Зберегти рахунок",
    "export-file-intro-blue-text": "Файл-ключ надає доступ до вашого рахунку. Завантажте його і безпечно зберігайте.",
    "export-file-intro-browser": "Ваш рахунок зберігається у вашому веб-оглядачі.",
    "export-file-intro-accident": "Він може бути видалений автоматично або випадково.",
    "export-file-intro-download-file": "Завантажте файл щоб убезпечити доступ до вашого рахунку.",
    "export-file-intro-orange-text": "Ретельно зберігайте його.",
    "export-file-success-set-password": "Зберегти пароль",
    "export-file-success-save-file": "Зберегти файл-ключ",
    "export-file-success-create-backup": "Створити спосіб відновлення",
    "export-file-success-heading": "Використайте 5 хв. щоб створити спосіб відновлення",
    "export-file-success-words-intro": "Функція відновлення паролю не існує. Запишіть 24 ключові слова, щоб не втратити доступ до рахунку.",
    "export-words-intro-heading": "Функція відновлення паролю НЕ ІСНУЄ!",
    "export-words-unlock-heading": "Розблокуйте рахунок",
    "export-words-hint": "Пролистайте щоб продовжити",
    "go-to-recovery-words": "Створити спосіб відновлення",
    "export-continue-to-login-file": "Продовжити з файлом",
    "export-show-recovery-words": "Показати секретні слова",

    "remove-key-heading": "Не втрачайте доступ",
    "remove-key-intro-text": "Якщо ви вийдете не зберігши ваш рахунок ви назавжди втратите доступ до нього!",
    "remove-key-login-file-question": "Ваш файл-ключ доступний і надійно збережено?",
    "remove-key-download-login-file": "Завантажити файл-ключ",
    "remove-key-recovery-words-question": "Чи знаєте ви де знаходяться ваші секретні слова?",
    "remove-key-show-recovery-words": "Створити спосіб відновлення",
    "remove-key-label-confirm-instructions": "Введіть \"{accountLabel}\" щоб вийти.",
    "remove-key-final-confirm": "Вийти",

    "derive-address-heading-password": "Відкрийте нові адреси",
    "derive-address-password-text": "Спочатку розблокуйте ваш рахунок[br]щоб додати нові адреси.",

    "change-password-heading": "Підтвердіть старий пароль",
    "change-password-paragraph": "Зміна паролю створить новий файл-ключ, який замінить поточний.",
    "change-password-paragraph-legacy": "Зміна паролю застосується тільки на цьому пристрої.",
    "change-password-info-item-1": "Усі старі файли-ключі працюють з їхніми паролями.",
    "change-password-info-item-2": "Будь ласка, створіть новий рахунок і перекажіть кошти, якщо файл-ключ було скомпроментовано.",
    "change-password-download-login-file": "Завантажте новий файл-ключ",
    "change-password-set-password-heading": "Створіть новий пароль",
    "change-password-set-password-text": "Убезпечте ваш файл-ключ.",
    "change-password-set-password-text-legacy": "Убезпечте ваш рахунок.",

    "error-no-request-heading": "Це пішло не так :(",
    "error-no-request-message": "Ми не можемо відшукати вірний запит. Будь ласка, спробуйте ще.",

    "login-file-color-orange": "Помаранчевий",
    "login-file-color-red": "Червоний",
    "login-file-color-yellow": "Жовтий",
    "login-file-color-indigo": "Індиго",
    "login-file-color-blue": "Голубий",
    "login-file-color-purple": "Пурпуровий",
    "login-file-color-teal": "Пірузовий",
    "login-file-color-pink": "Рожевий",
    "login-file-color-green": "Зелений",
    "login-file-color-brown": "Коричневий",

    "login-file-filename": "Файл-Ключ-Німік-{accountLabel}.png",
    "login-file-default-account-label": "{color} Рахунок",

    "bitcoin": "Біткоїн",
    "bitcoin-recipient-unlabelled": "Без назви",

    "derive-btc-xpub-heading": "Додати Біткоїн\nдо вашого рахунку",
    "derive-btc-xpub-text": "З легкістю обмінюйте NIM - ефективну платіжну монету та BTC - золотий стандарт криптовалюти.",

    "sign-swap-heading": "Підтвердити обмін",
    "sign-swap-exchange-rate-tooltip": "Курс включає комісію за обмін.",
    "sign-swap-fees": "комісія",
    "sign-swap-btc-fees": "Комісія BTC",
    "sign-swap-btc-fees-explainer": "Атомарний обмін потребує двох транзакцій BTC.",
    "sign-swap-oasis-fees": "Комісія OASIS",
    "sign-swap-oasis-fees-explainer": "суми обміну.",
    "sign-swap-bank-fees": "комісія",
    "sign-swap-bank-fees-explainer": "Банківська комісія",
    "sign-swap-nim-fees": "Комісія NIM",
    "sign-swap-exchange-fee": "Комісія обміну",
    "sign-swap-of-exchange-value": "суми обміну.",
    "sign-swap-total-fees": "Сумарна комісія",
    "sign-swap-your-bank": "Ваш банк"
},
zh: {
    "_language": "中文",

    "language-changed": "显示语言已更改。你要重新加载页面以更新所有翻译吗？否则，某些翻译可能不会自动更新。",

    "back-to-app": "返回{appName}",
    "back-to-accounts": "返回我的帐户",
    "back-to-wallet": "返回{Wallet}",
    "back-to-miner": "返回{Nimiq Miner}",
    "back-to-faucet": "返回{Nimiq Faucet}",
    "back-to-donation": "返回捐赠按钮创建工具",
    "back-to-gift-card": "返回Nimiq礼品卡",
    "back-to-vote": "返回Nimiq投票",
    "back-to-cpl": "返回CryptoPayment.link",

    "funding-cashlink": "现金链接充值",

    "recovery-words-title": "请将这24个单词写在纸上",
    "recovery-words-intro-text": "如果你丢失了登录文件或密码，助记词是恢复帐户的＂唯一＂方法",
    "recovery-words-intro-offline": "离线储存你的助记词，并且不要在strong]keyguard[/strong].nimiq.com以外的地方输入",
    "recovery-words-intro-copy": "建立一份副本，并存放在安全的地方，例如住家、银行的储物柜等",
    "recovery-words-intro-safety": "当心水和火，请用密封盒来确保你助记词的安全",
    "recovery-words-text": "任何有这些助记词的人都可以存取你的账户！请务必确保助记词安全",
    "recovery-words-validate": "验证备份",

    "create-heading-choose-identicon": "选择头像",
    "create-address-label": "Your address:",
    "create-confirm-address": "选择并继续",
    "create-heading-create-password": "设置密码",
    "create-heading-repeat-password": "确认你的密码",
    "create-heading-validate-backup": "验证你的备份",
    "create-loginfile-keycard": "密码会保护你的登录文件，\n請將它視為你账户的钥匙卡",
    "create-loginfile-any-device": "该文件允许你从任何设备登录",
    "create-heading-what-is-loginfile": "什么是登录文件？",
    "create-login-file-explainer-intro": "结合你的密码的图像文件，将允许访问你的帐户。",
    "create-login-file-paragraph-1": "Nimiq不会存储你的数据。 以登录文件取代电子邮件作为登录方式。",
    "create-login-file-paragraph-2": "登录文件存储在浏览器中。 请用你的密码解锁。",
    "create-login-file-paragraph-3": "你可能会不小心登出。请下载并安全地存储登录文件，以保持你对帐户的掌控权。",
    "create-login-file-return": "完成",

    "import-heading-enter-recovery-words": "输入助记词",
    "import-import-login-file": "导入你的登录文件",
    "import-login-to-continue": "请再次登录以继续",
    "import-unlock-account": "解锁你的账户",
    "import-create-account": "建立新帐户",
    "import-qr-video-tooltip": "使用设备的相机扫描你的登录文件",

    "import-file-button-words": "使用助记词登录",

    "import-words-file-available": "使用助记词创建一个新的登录文件，并设置密码保护",
    "import-words-file-unavailable": "使用助记词创建一个新的登录文件，并设置密码保护",
    "import-words-hint": "按Tab键跳到下一栏",
    "import-words-error": "这不是有效的帐户，是否有错别字？",
    "import-words-wrong-seed-phrase": "这些助记词属于另一个帐户",
    "import-words-download-loginfile": "储存你的登录文件",

    "file-import-prompt": "拖拽到此处或点击导入",
    "file-import-error-could-not-read": "无法读取登录文件",
    "file-import-error-invalid": "无效的登录文件",

    "qr-video-scanner-cancel": "取消",
    "qr-video-scanner-no-camera": "你的设备没有可访问的相机",
    "qr-video-scanner-enable-camera": "打开此网站相机的使用权限以扫描QR码",

    "sign-tx-heading-tx": "确认交易",
    "sign-tx-heading-checkout": "验证付款",
    "sign-tx-heading-cashlink": "创建现金链接",
    "sign-tx-fee": "手续费",
    "sign-tx-cancel-payment": "取消付款",

    "sign-msg-heading": "签署信息",
    "sign-msg-signer": "签署者",

    "tab-width-selector-label": "标签宽度",

    "address-info-new-cashlink": "新的现金链接",

    "copyable-copied": "已复制",

    "passwordbox-enter-password": "输入你的密码",
    "passwordbox-enter-pin": "输入你的PIN码",
    "passwordbox-repeat-password": "再次输入密码",
    "passwordbox-repeat": "再次输入密码",
    "passwordbox-continue": "继续",
    "passwordbox-log-in": "解锁",
    "passwordbox-confirm": "确认",
    "passwordbox-log-out": "确认登出",
    "passwordbox-confirm-tx": "确认交易",
    "passwordbox-create-cashlink": "创建现金链接",
    "passwordbox-confirm-create": "创建账户",
    "passwordbox-confirm-log-in": "登录",
    "passwordbox-show-words": "显示助记词",
    "passwordbox-sign-msg": "签署信息",
    "passwordbox-confirm-swap": "确认交换",
    "passwordbox-password-strength-short": "输入8个字符或更多",
    "passwordbox-password-strength-weak": "密码强度低",
    "passwordbox-password-strength-good": "密码强度中",
    "passwordbox-password-strength-strong": "密码强度高",
    "passwordbox-password-strength-secure": "安全密码",
    "passwordbox-password-too-long": "最多256个字符",
    "passwordbox-repeat-password-long": "没有匹配项，请重试",
    "passwordbox-repeat-password-short": "密码太短",
    "passwordbox-password-skip": "现在跳过",
    "passwordbox-reset-password": "使用助记词重置",

    "payment-info-line-order-amount": "订单数量",
    "payment-info-line-vendor-markup": "供应商加密货币加价",
    "payment-info-line-vendor-discount": "供应商加密货币折扣",
    "payment-info-line-effective-rate": "有效汇率",
    "payment-info-line-free-service": "Nimiq免费提供这项服务。",
    "payment-info-line-total": "总额",
    "payment-info-line-network-fee": "网络费",
    "payment-info-line-paying-more": "你需要比当前市场汇率(coingecko.com)多支付大约%RATE_DEVIATION%。",
    "payment-info-line-paying-less": "你需要比当前市场汇率(coingecko.com)少支付大约%RATE_DEVIATION%。",
    "payment-info-line-actual-discount": "与当前市场汇率(coingecko.com)相比，你的实际折扣约为%RATE_DEVIATION%。",

    "timer-expiry": "此报价在以下时间到期",
    "timer-second": "秒",
    "timer-seconds": "秒",
    "timer-minute": "分钟",
    "timer-minutes": "分钟",
    "timer-hour": "小时",
    "timer-hours": "小时",
    "timer-day": "天",
    "timer-days": "天",

    "identicon-selector-avatars-hint": "头像表現你的NIM地址。",
    "identicon-selector-avatars-hint-2": "請将它们视为银行帐号。",
    "identicon-selector-generate-new": "新的头像",

    "download-loginfile-download": "下载",
    "download-loginfile-successful": "是否成功下载？",
    "download-loginfile-tap-and-hold": "点击并按住图片下载",
    "download-loginfile-continue": "继续",

    "validate-words-text": "请从助记词列表中选出正确的单词",
    "validate-words-1-hint": "第一个单词是什么？",
    "validate-words-2-hint": "第二个单词是什么？",
    "validate-words-3-hint": "第三个单词是什么？",
    "validate-words-4-hint": "第四个单词是什么？",
    "validate-words-5-hint": "第五个单词是什么？",
    "validate-words-6-hint": "第六个单词是什么？",
    "validate-words-7-hint": "第七个单词是什么？",
    "validate-words-8-hint": "第八个单词是什么？",
    "validate-words-9-hint": "第九个单词是什么？",
    "validate-words-10-hint": "第十个单词是什么？",
    "validate-words-11-hint": "第十一个单词是什么？",
    "validate-words-12-hint": "第十二个单词是什么？",
    "validate-words-13-hint": "第十三个单词是什么？",
    "validate-words-14-hint": "第十四个单词是什么？",
    "validate-words-15-hint": "第十五个单词是什么？",
    "validate-words-16-hint": "第十六个单词是什么？",
    "validate-words-17-hint": "第十七个单词是什么？",
    "validate-words-18-hint": "第十八个单词是什么？",
    "validate-words-19-hint": "第十九个单词是什么？",
    "validate-words-20-hint": "第二十个单词是什么？",
    "validate-words-21-hint": "第二十一个单词是什么？",
    "validate-words-22-hint": "第二十二个单词是什么？",
    "validate-words-23-hint": "第二十三个单词是什么？",
    "validate-words-24-hint": "第二十四个单词是什么？",

    "export-file-heading": "获取你的登录文件",
    "export-file-intro-heading": "储存你的账户",
    "export-file-intro-blue-text": "你的登录文件将给予你对此帐户的访问权限，请下载并妥善保存",
    "export-file-intro-browser": "你的帐户存储在浏览器中",
    "export-file-intro-accident": "它可能会被自动或意外删除",
    "export-file-intro-download-file": "下载登录文件以安全访问你的帐户",
    "export-file-intro-orange-text": "请安全保存并保密",
    "export-file-success-set-password": "设置密码",
    "export-file-success-save-file": "保存登录文件",
    "export-file-success-create-backup": "建立备份",
    "export-file-success-heading": "请花5分钟进行备份",
    "export-file-success-words-intro": "这里没有“忘记密码”的选项，请写下24个单词来创建安全备份",
    "export-words-intro-heading": "没有恢复密码这个选项！",
    "export-words-unlock-heading": "解锁你的备份",
    "export-words-hint": "滚动以继续",
    "go-to-recovery-words": "建立备份",
    "export-continue-to-login-file": "继续登录文件",
    "export-show-recovery-words": "显示助记词",

    "remove-key-heading": "不要遗失你的访问权限",
    "remove-key-intro-text": "如果你在未保存帐户的情况下登出帐户，你将不可逆地失去对该帐户的访问权限！",
    "remove-key-login-file-question": "你的登录文件是否已保存并可以进行访问？",
    "remove-key-download-login-file": "下载登录文件",
    "remove-key-recovery-words-question": "你知道你的助记词吗？",
    "remove-key-show-recovery-words": "建立备份",
    "remove-key-label-confirm-instructions": "输入\"{accountLabel}\"登出",
    "remove-key-final-confirm": "登出",

    "derive-address-heading-password": "解锁新地址",
    "derive-address-password-text": "要添加新地址，请[br]首先解锁你的帐户",

    "change-password-heading": "确认旧密码",
    "change-password-paragraph": "更改密码后将会有个新的登录文件被创建，当前的登录文件将被取代",
    "change-password-paragraph-legacy": "更改密码仅对本设备有影响",
    "change-password-info-item-1": "所有旧的登录文件仍然可以搭配其旧密码使用",
    "change-password-info-item-2": "如果你的登录文件被盗，请创建一个新帐户并转移所有资金",
    "change-password-download-login-file": "下载新的登录文件",
    "change-password-set-password-heading": "设置新密码",
    "change-password-set-password-text": "安全储存你的新的登录文件",
    "change-password-set-password-text-legacy": "确保你的账户安全",

    "error-no-request-heading": "出错了 :(",
    "error-no-request-message": "我们无法检测到有效的请求，请返回并再次尝试",

    "login-file-color-orange": "橙色",
    "login-file-color-red": "红色",
    "login-file-color-yellow": "黄色",
    "login-file-color-indigo": "靛蓝色",
    "login-file-color-blue": "蓝色",
    "login-file-color-purple": "紫色",
    "login-file-color-teal": "青色",
    "login-file-color-pink": "粉红色",
    "login-file-color-green": "绿色",
    "login-file-color-brown": "棕色",

    "login-file-filename": "Nimiq-登录文件-{accountLabel}.png",
    "login-file-default-account-label": "{color}帐户",

    "bitcoin": "比特币",
    "bitcoin-recipient-unlabelled": "未标签",

    "derive-btc-xpub-heading": "添加比特币\n到你的帐户",
    "derive-btc-xpub-text": "在超级高性能的支付硬币：NIM，与加密的黄金标准：比特币之间轻松交换。",

    "sign-swap-heading": "确认交换",
    "sign-swap-exchange-rate-tooltip": "此价格包括交换费用",
    "sign-swap-fees": "费用",
    "sign-swap-btc-fees": "BTC网络费",
    "sign-swap-btc-fees-explainer": "原子交换需要进行两次比特币交易",
    "sign-swap-oasis-fees": "OASIS服务费",
    "sign-swap-oasis-fees-explainer": "交换价值",
    "sign-swap-bank-fees": "手续费",
    "sign-swap-bank-fees-explainer": "银行网络费用",
    "sign-swap-nim-fees": "NIM网络费",
    "sign-swap-exchange-fee": "交换费用",
    "sign-swap-of-exchange-value": "交换价值",
    "sign-swap-total-fees": "总费用",
    "sign-swap-your-bank": "你的银行"
},
};

if (typeof module !== 'undefined') module.exports = TRANSLATIONS;
else window.TRANSLATIONS = TRANSLATIONS;

/* global BrowserDetection */
/* global Constants */
/* global Errors */
/* global KeyStore */
/* global CookieJar */
/* global I18n */
/* global Nimiq */
/* global RequestParser */
/* global NoRequestErrorPage */

/**
 * A common parent class for pop-up requests.
 *
 * Usage:
 * Inherit this class in your popup request API class and define two properties:
 * ```
 *  class SignTransactionApi extends TopLevelApi {
 *      async parseRequest(request) {
 *          // This method receives the raw internal request and is expected to
 *          // return a parsed request of the same type, using the parsing methods
 *          // inherited from the RequestParser class.
 *          // Throwing an InvalidRequestError means parsing has failed.
 *      }
 *
 *      get Handler() {
 *          // Should return the class that should be instantiated as the request's primary handler
 *      }
 *
 *      async onBeforeRun(parsedRequest) {
 *          // This optional method receives the parsed request just before the
 *          // global close button text is set and the handler is run.
 *          // The return value is not used.
 *      }
 *
 *      async onGlobalClose(handler) {
 *          // Handle the user's click on the global-close button.
 *          // This method receives the instantiated handler.
 *      }
 *  }
 *
 *  // Finally, start your API:
 *  runKeyguard(SignTransactionApi);
 * ```
 * @abstract
 * @template {KeyguardRequest.RedirectRequest} T
 */
class TopLevelApi extends RequestParser {
    constructor() {
        super();
        if (window.self !== window.top) {
            // TopLevelApi may not run in a frame
            throw new Error('Illegal use');
        }

        /** @type {Function} */
        this._resolve = () => { throw new Error('Method this._resolve not defined'); };

        /** @type {Function} */
        this._reject = () => { throw new Error('Method this._reject not defined'); };

        /** @type {any?} */
        this._handler = null;

        I18n.initialize(window.TRANSLATIONS, 'en');
        I18n.translateDom();
    }

    /**
     * Method to be called by the Keyguard client via RPC
     *
     * @param {RpcState?} state
     * @param {unknown} request
     */
    async request(state, request) {
        /**
         * Detect migration cookie set by the iframe
         *
         * @deprecated Only for database migration
         */
        if (BrowserDetection.isIOS() || BrowserDetection.isSafari()) {
            if (TopLevelApi._hasMigrateFlag()) {
                await KeyStore.instance.migrateAccountsToKeys();
            }
            /*
             * There is a case using recovery words when the kind of secret, entropy or privateKey is ambiguous.
             * In that scenario both keys will be encrypted and stored.
             * After returning, the Hub will do an activity lookup for addresses to both of these keys.
             * In case one did not see any activity at all, it will be discarded and removed by this code.
             * The cookie is set in `IFrameAPI.releaseKey()` which requires the session to still be active.
             */
            if (TopLevelApi._hasRemoveKey()) {
                // eat
                const match = document.cookie.match(new RegExp('removeKey=([^;]+)'));
                if (match && match[1]) {
                    try {
                        /** @type {string[]} */
                        const removeKeyArray = JSON.parse(match[1]);
                        await Promise.all(removeKeyArray.map(keyId => KeyStore.instance.remove(keyId)));
                    } catch (e) {
                        this._reject(e);
                    }
                }
                // crumble
                CookieJar.deleteCookie('removeKey');
            }
        }

        const parsedRequest = await this.parseRequest(request);

        return new Promise(async (resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;

            if (!parsedRequest) { // should already be rejected here with an Errors.InvalidRequestError()
                // this really should never happen
                this.reject(new Errors.InvalidRequestError('Request could not be parsed'));
                return;
            }

            /**
             * Load the crypto worker only if needed. That is, requests who are either
             * Import or Create (the only ones which don't have the keyInfo property)
             * or any request which has the keyInfo property and the encrypted flag set.
             */
            if (!(/** @type {any} */(parsedRequest).keyInfo)
                || /** @type {any} */(parsedRequest).keyInfo.encrypted) {
                Nimiq.CryptoWorker.getInstanceAsync();
            }

            window.addEventListener('unhandledrejection', event => {
                const error = new Errors.UnclassifiedError(/** @type {PromiseRejectionEvent} */(event).reason);
                this.reject(error);
                return false;
            });

            window.addEventListener('error', event => {
                let error;
                if (event.error) {
                    error = new Errors.UnclassifiedError(event.error);
                } else {
                    error = new Errors.UnclassifiedError(
                        `${event.message} at ${event.filename}:${event.lineno}:${event.colno}`,
                    );
                }
                this.reject(error);
                return false;
            });

            if (!this.Handler) {
                reject(new Errors.KeyguardError('Handler undefined'));
                return;
            }

            try {
                this._handler = new this.Handler(parsedRequest, this.resolve.bind(this), reject);

                await this.onBeforeRun(parsedRequest);

                this.enableGlobalCloseButton(parsedRequest);

                this._handler.run();

                TopLevelApi.setLoading(false);

                TopLevelApi.focusPasswordBox();
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Overwritten by each request's API class
     *
     * @param {unknown} request
     * @returns {Promise<Parsed<T>>}
     * @abstract
     */
    async parseRequest(request) { // eslint-disable-line no-unused-vars
        throw new Error('parseRequest not implemented');
    }

    /** @type {Newable?} */
    get Handler() {
        return null;
    }

    /**
     * Can be overwritten by a request's API class to excute code before the handler's run() is called
     * @param {Parsed<T>} parsedRequest
     */
    async onBeforeRun(parsedRequest) { // eslint-disable-line no-unused-vars
        // noop
    }

    /**
     * Can be overwritten by a request's API class to excute custom code when the user clicks
     * the global-cancel button.
     * The instantiated handler is passed as the only argument.
     * @param {any} handler
     */
    async onGlobalClose(handler) { // eslint-disable-line no-unused-vars
        this.reject(new Errors.RequestCanceled());
    }

    /**
     * Called by a page's API class on success
     *
     * @param {KeyguardRequest.ResultType<T>} result
     * @returns {Promise<void>}
     */
    async resolve(result) {
        // Keys might have changed, so update cookie for iOS and Safari users
        if (BrowserDetection.isIOS() || BrowserDetection.isSafari()) {
            const keys = await KeyStore.instance.list();
            CookieJar.fill(keys);
        }

        this._resolve(result);
    }

    /**
     * Called by a page's API class on error
     *
     * @param {Error} error
     */
    reject(error) {
        this._reject(error);
    }

    /**
     * @param {string|Parsed<T>} requestOrCustomButtonText
     */
    enableGlobalCloseButton(requestOrCustomButtonText) {
        /** @type {HTMLElement} */
        const $globalCloseText = (document.querySelector('#global-close-text'));
        /** @type {HTMLSpanElement} */
        const $button = ($globalCloseText.parentNode);
        if (!$button.classList.contains('display-none')) return;

        // eslint-disable-next-line require-jsdoc-except/require-jsdoc
        const setButtonText = () => {
            if (typeof requestOrCustomButtonText === 'string') {
                $globalCloseText.textContent = requestOrCustomButtonText;
                return;
            }
            // Special handling for some specific known app names to be able to adapt translations depending on the
            // app, for example to adapt to an app's gender (e.g. German: "Zurück zur Wallet", "Zurück zum Miner").
            // Note that the names that should not be translated are specified as a placeholder in the translation.
            const appName = requestOrCustomButtonText.appName;
            let buttonText;
            switch (appName) {
                case 'Accounts':
                    buttonText = I18n.translatePhrase('back-to-accounts'); // Nimiq Safe
                    break;
                case 'Wallet':
                    buttonText = I18n.translatePhrase('back-to-wallet');
                    break;
                case 'Nimiq Miner':
                    buttonText = I18n.translatePhrase('back-to-miner');
                    break;
                case 'Nimiq Faucet':
                    buttonText = I18n.translatePhrase('back-to-faucet');
                    break;
                case 'Donation Button Creator':
                    buttonText = I18n.translatePhrase('back-to-donation');
                    break;
                case 'Nimiq Gift Card':
                    buttonText = I18n.translatePhrase('back-to-gift-card');
                    break;
                case 'Nimiq Vote':
                    buttonText = I18n.translatePhrase('back-to-vote');
                    break;
                case 'CryptoPayment.link':
                    buttonText = I18n.translatePhrase('back-to-cpl');
                    break;
                default:
                    buttonText = I18n.translatePhrase('back-to-app');
            }
            // replace potential placeholder in buttonText
            $globalCloseText.textContent = buttonText.replace(/{[^}]+}/, appName);
        };
        setButtonText();
        I18n.observer.on(I18n.Events.LANGUAGE_CHANGED, setButtonText);

        $button.addEventListener('click', () => this.onGlobalClose(this._handler));
        $button.classList.remove('display-none');
    }

    /**
     * @param {boolean} showLoading
     */
    static setLoading(showLoading) {
        // Check if a loading spinner element is available somewhere on the current page
        const loadingSpinner = document.body.querySelector('.page:target .loading-spinner');
        if (loadingSpinner) {
            /** @type {HTMLElement} */
            (document.getElementById(TopLevelApi.Pages.LOADING)).classList.add('display-none');
        } else {
            /** @type {HTMLElement} */
            (document.getElementById(TopLevelApi.Pages.LOADING)).classList.remove('display-none');
        }
        document.body.classList.toggle('loading', showLoading);
    }

    static showNoRequestErrorPage() {
        const errorPage = new NoRequestErrorPage();
        /** @type {HTMLDivElement} */
        const $target = (document.querySelector('#rotation-container') || document.querySelector('#app'));
        $target.appendChild(errorPage.getElement());
        window.location.hash = 'error';
        TopLevelApi.setLoading(false);
    }

    static focusPasswordBox() {
        if (TopLevelApi.getDocumentWidth() > Constants.MIN_WIDTH_FOR_AUTOFOCUS) {
            const $passwordBoxInput = (document.querySelector('.page:target .password-box input'));
            if ($passwordBoxInput) {
                /** @type {HTMLInputElement} */
                ($passwordBoxInput).focus();
            }
        }
    }

    /**
     * @deprecated Only for database migration
     * @returns {boolean}
     * @private
     */
    static _hasMigrateFlag() {
        const match = document.cookie.match(new RegExp('migrate=([^;]+)'));
        return !!match && match[1] === '1';
    }

    /**
     * @returns {boolean}
     * @private
     */
    static _hasRemoveKey() {
        const match = document.cookie.match(new RegExp('removeKey=([^;]+)'));
        return !!match && match[1] !== '';
    }

    /**
     * @returns {number} the current width of the document
     */
    static getDocumentWidth() {
        return window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
    }
}

TopLevelApi.Pages = {
    LOADING: 'loading',
};
