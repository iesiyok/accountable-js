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
/* global I18n */

const LoginFileConfig = [ /* eslint-disable-line no-unused-vars */
    // Order determined by Iqons.backgroundColors

    /* eslint-disable object-curly-newline, max-len, require-jsdoc-except/require-jsdoc */
    { get name() { return I18n.translatePhrase('login-file-color-orange'); }, className: 'nq-orange-bg', color: '#FC8702', corner: '#FD6216', opacityLines: 0.15, opacityDate: 0.6 },
    { get name() { return I18n.translatePhrase('login-file-color-red'); }, className: 'nq-red-bg', color: '#D94432', corner: '#CC3047', opacityLines: 0.15, opacityDate: 0.45 },
    { get name() { return I18n.translatePhrase('login-file-color-yellow'); }, className: 'nq-gold-bg', color: '#E9B213', corner: '#EC991C', opacityLines: 0.2, opacityDate: 0.6 },
    { get name() { return I18n.translatePhrase('login-file-color-indigo'); }, className: 'nq-blue-bg', color: '#1F2348', corner: '#260133', opacityLines: 0.1, opacityDate: 0.35 },
    { get name() { return I18n.translatePhrase('login-file-color-blue'); }, className: 'nq-light-blue-bg', color: '#0582CA', corner: '#265DD7', opacityLines: 0.1, opacityDate: 0.45 },
    { get name() { return I18n.translatePhrase('login-file-color-purple'); }, className: 'nq-purple-bg', color: '#5F4B8B', corner: '#4D4C96', opacityLines: 0.1, opacityDate: 0.35 },
    { get name() { return I18n.translatePhrase('login-file-color-teal'); }, className: 'nq-green-bg', color: '#21BCA5', corner: '#41A38E', opacityLines: 0.15, opacityDate: 0.55 },
    { get name() { return I18n.translatePhrase('login-file-color-pink'); }, className: 'nq-pink-bg', color: '#FA7268', corner: '#E0516B', opacityLines: 0.15, opacityDate: 0.6 },
    { get name() { return I18n.translatePhrase('login-file-color-green'); }, className: 'nq-light-green-bg', color: '#88B04B', corner: '#70B069', opacityLines: 0.15, opacityDate: 0.55 },
    { get name() { return I18n.translatePhrase('login-file-color-brown'); }, className: 'nq-brown-bg', color: '#795548', corner: '#724147', opacityLines: 0.1, opacityDate: 0.35 },
    /* eslint-enable object-curly-newline, max-len, require-jsdoc-except/require-jsdoc */
];
// Adapted and simplified from @nimiq/utils.
// See there for extended documentation on how the data was generated.
// This file should also be updated whenever CurrencyInfo in @nimiq/utils is updated.
class CurrencyInfo {
    /**
     * @private
     * @param {number} value
     * @param {string | string[]} [locales]
     * @param {Intl.NumberFormatOptions} [options]
     * @returns {string | null}
     */
    static _failsafeNumberToLocaleString(value, locales, options) {
        try {
            // toLocaleString can fail for example for invalid locales or currency codes or unsupported currencyDisplay
            // options in older browsers. Older Chrome versions also had a bug, where some option combinations lead to
            // a "Internal error. Icu error." exception.
            return value.toLocaleString(
                locales,
                options,
            );
        } catch (e) {
            return null;
        }
    }

    /**
     * @param {string} currencyCode 3-letter currency code
     * @param {string} [locale] The locale to use for auto-detecting the name and symbol
     * @throws If currency code is not a well-formed currency code.
     */
    constructor(currencyCode, locale) {
        if (!CurrencyInfo.CURRENCY_CODE_REGEX.test(currencyCode)) {
            throw new Error(`Invalid currency code ${currencyCode}`);
        }

        /** @type {string} */
        this.code = currencyCode.toUpperCase();
        /** @type {string} */
        this.symbol = '';
        /** @type {string} */
        this.name = '';
        /** @type {number} */
        this.decimals = 2;
        /** @type {string} */
        this.locale = '';

        // Get the country from the currency code which is typically (but not necessarily) the first two letters,
        // see https://en.wikipedia.org/wiki/ISO_4217#National_currencies.
        const currencyCountry = this.code.substring(0, 2);

        const nameLocalesToTry = [
            ...(locale ? [locale] : []), // try requested locale
            `${navigator.language.substring(0, 2)}-${currencyCountry}`, // user language as spoken in currency country
            navigator.language, // fallback
            'en-US', // en-US as last resort
        ];
        let supportsDisplayNames = 'DisplayNames' in Intl;
        // also normalizes the locales
        [this.locale] = supportsDisplayNames
            // @ts-ignore TODO use proper types once https://github.com/microsoft/TypeScript/pull/44022 is available
            ? Intl.DisplayNames.supportedLocalesOf(nameLocalesToTry)
            : Intl.NumberFormat.supportedLocalesOf(nameLocalesToTry);
        if (supportsDisplayNames && !this.locale) {
            // DisplayNames does not support any of the tried locales, not even en. This can happen especially if
            // DisplayNames was polyfilled, e.g. by @formatjs/intl-displaynames, but no data was (lazy)loaded for any
            // of our locales.
            supportsDisplayNames = false;
            [this.locale] = Intl.NumberFormat.supportedLocalesOf(nameLocalesToTry);
        }

        const cacheKey = `${this.code} ${this.locale}`;
        const cachedCurrencyInfo = CurrencyInfo.CACHED_AUTO_GENERATED_CURRENCY_INFOS[cacheKey];
        if (cachedCurrencyInfo) {
            return cachedCurrencyInfo;
        }

        let formattedString;
        const formatterOptions = {
            style: 'currency',
            currency: currencyCode, // without toUpperCase to avoid conversion of characters, e.g. Eszett to SS
            useGrouping: false,
            numberingSystem: 'latn',
        };

        if (supportsDisplayNames) {
            try {
                // Use DisplayNames if available as it provides better names.
                // @ts-ignore TODO use proper types once https://github.com/microsoft/TypeScript/pull/44022 is merged
                this.name = new Intl.DisplayNames(this.locale, { type: 'currency' }).of(currencyCode);
            } catch (e) {
                // Ignore and continue with if block below.
            }
        }
        if (!this.name) {
            formattedString = CurrencyInfo._failsafeNumberToLocaleString(
                0,
                this.locale,
                { currencyDisplay: 'name', ...formatterOptions },
            );
            this.name = formattedString
                // Using regex parsing instead of NumberFormat.formatToParts which has less browser support.
                ? formattedString.replace(CurrencyInfo.NUMBER_REGEX, '').trim()
                : this.code;
        }

        const extraSymbol = CurrencyInfo.EXTRA_SYMBOLS[this.code];
        if (typeof extraSymbol === 'string') {
            this.symbol = extraSymbol;
        } else if (Array.isArray(extraSymbol)) {
            // Use right-to-left currency symbols only if a right-to-left locale was used and explicitly requested.
            const useRightToLeft = this.locale === locale
                && CurrencyInfo.RIGHT_TO_LEFT_DETECTION_REGEX.test(this.name);
            this.symbol = extraSymbol[useRightToLeft ? 1 : 0];
        } else {
            // Unless a locale was specifically requested, use `en-${currencyCountry}` for the symbol detection
            // instead of this.locale which is based on navigator.language, as the EXTRA_SYMBOLS have been
            // created based on en.
            const symbolLocalesToTry = [
                ...(locale ? [locale] : []), // try requested locale
                `en-${currencyCountry}`,
                'en',
            ];
            const symbolFormattedString = CurrencyInfo._failsafeNumberToLocaleString(
                0,
                symbolLocalesToTry,
                { currencyDisplay: 'narrowSymbol', ...formatterOptions }, // not supported on older browsers
            ) || CurrencyInfo._failsafeNumberToLocaleString(
                0,
                symbolLocalesToTry,
                { currencyDisplay: 'symbol', ...formatterOptions },
            );
            if (symbolFormattedString) {
                formattedString = symbolFormattedString;
                this.symbol = formattedString.replace(CurrencyInfo.NUMBER_REGEX, '').trim();
            } else {
                this.symbol = this.code;
            }
        }

        if (CurrencyInfo.CUSTOM_DECIMAL_LESS_CURRENCIES.has(this.code)) {
            this.decimals = 0;
        } else {
            // As we only need the number, the used locale and currencyDisplay don't matter.
            formattedString = formattedString || CurrencyInfo._failsafeNumberToLocaleString(
                0,
                'en',
                { currencyDisplay: 'code', ...formatterOptions },
            );
            if (formattedString) {
                const numberMatch = formattedString.match(CurrencyInfo.NUMBER_REGEX);
                this.decimals = numberMatch ? (numberMatch[1] || '').length : 2;
            } else {
                this.decimals = 2;
            }
        }

        CurrencyInfo.CACHED_AUTO_GENERATED_CURRENCY_INFOS[cacheKey] = this;
    }
}

/**
 * @private
 * @readonly
 * @type {{[code: string]: string | [string, string]}}
 */
CurrencyInfo.EXTRA_SYMBOLS = {
    AED: ['DH', 'د.إ'],
    AFN: ['Afs', '؋'],
    ALL: 'L',
    ANG: 'ƒ',
    AWG: 'ƒ',
    BGN: 'лв.',
    BHD: ['BD', '.د.ب'],
    BTN: 'Nu.',
    BYN: 'Br',
    CDF: 'Fr',
    CHF: 'Fr.',
    CVE: '$',
    DJF: 'Fr',
    DZD: ['DA', 'د.ج'],
    EGP: ['£', 'ج.م'],
    ETB: 'Br',
    HTG: 'G',
    IQD: ['ID', 'ع.د'],
    IRR: ['RI', '﷼'],
    JOD: ['JD', 'د.ا'],
    KES: 'Sh',
    KGS: '\u20c0', // new unicode char to be released Sep 2021
    KWD: ['KD', 'د.ك'],
    LBP: ['LL', 'ل.ل'],
    LSL: 'M', // mismatch to Wikipedia's L because M is used for plural
    LYD: ['LD', 'ل.د'],
    MAD: ['DH', 'درهم'], // mismatch to Wikipedia as the actual wiki article shows different symbols, also in Arabic
    MDL: 'L',
    MKD: 'ден',
    MMK: 'Ks', // Ks for plural
    MRU: 'UM',
    MVR: ['Rf', '.ރ'],
    MZN: 'MT',
    NPR: 'रु', // mismatch to Wikipedia as actual wiki article shows it as रु, also in Nepali
    OMR: ['R.O.', 'ر.ع.'],
    PAB: 'B/.',
    PEN: 'S/', // mismatch to Wikipedia as actual wiki article shows it as S/, also in Spanish
    PKR: '₨',
    QAR: ['QR', 'ر.ق'],
    RSD: 'дин.',
    SAR: ['SR', '﷼'],
    SDG: ['£SD', 'ج.س.'],
    SOS: 'Sh.',
    TJS: 'SM', // mismatch to Wikipedia as actual wiki article shows it as SM
    TMT: 'm', // mismatch to Wikipedia as actual wiki article shows it as m
    TND: ['DT', 'د.ت'],
    UZS: 'сум', // mismatch to Wikipedia as actual wiki article shows it as сум
    VES: 'Bs.',
    WST: 'T',
    XPF: '₣',
    YER: ['RI', '﷼'],
};

/**
 * Some currencies have been devalued so much by inflation that their sub-units have been removed from circulation
 * or are effectively not being used anymore. This is not for all currencies reflected yet in toLocaleString, such
 * that we mark some currencies manually as decimal-less.
 * @private
 * @readonly
 * @type {Set<string>}
 */
CurrencyInfo.CUSTOM_DECIMAL_LESS_CURRENCIES = new Set([
    'AMD', // sub-unit rarely used
    'AOA', // sub-unit rarely used
    'ARS', // sub-unit discontinued
    'BDT', // sub-unit discontinued
    'BTN', // sub-unit rarely used
    'CDF', // sub-unit rarely used
    'COP', // sub-unit rarely used
    'CRC', // sub-unit discontinued
    'CVE', // sub-unit discontinued
    'CZK', // sub-unit discontinued
    'DOP', // sub-unit rarely used
    'DZD', // sub-unit discontinued
    'GMD', // sub-unit discontinued
    'GYD', // sub-unit discontinued
    'HUF', // sub-unit discontinued
    'IDR', // sub-unit discontinued
    'INR', // sub-unit discontinued
    'JMD', // sub-unit discontinued
    'KES', // sub-unit rarely used
    'KGS', // sub-unit rarely used
    'KHR', // sub-unit discontinued
    'KZT', // sub-unit rarely used
    'LKR', // sub-unit discontinued
    'MAD', // sub-unit rarely used
    'MKD', // sub-unit discontinued
    'MNT', // sub-unit discontinued
    'MOP', // sub-unit discontinued
    'MWK', // sub-unit rarely used
    'MXN', // sub-unit rarely used
    'NGN', // sub-unit rarely used
    'NOK', // sub-unit discontinued
    'NPR', // sub-unit rarely used
    'PHP', // sub-unit rarely used
    'PKR', // sub-unit discontinued
    'RUB', // sub-unit rarely used
    'SEK', // sub-unit discontinued
    'TWD', // sub-unit discontinued
    'TZS', // sub-unit discontinued
    'UAH', // sub-unit discontinued
    'UYU', // sub-unit discontinued
    'UZS', // sub-unit discontinued
    'VES', // sub-unit rarely used
]);

/**
 * Cached auto-generated CurrencyInfos such that they do not need to be recalculated.
 * @private
 * @readonly
 * @type {{[currencyAndLocale: string]: CurrencyInfo}}
 */
CurrencyInfo.CACHED_AUTO_GENERATED_CURRENCY_INFOS = {};

/**
 * Regex for detecting valid currency codes.
 * @private
 * @readonly
 * @type {RegExp}
 */
CurrencyInfo.CURRENCY_CODE_REGEX = /[A-Z]{3}/i;

/**
 * Regex for detecting the number with optional decimals in a formatted string for useGrouping: false
 * @private
 * @readonly
 * @type {RegExp}
 */
CurrencyInfo.NUMBER_REGEX = /\d+(?:\D(\d+))?/;

/**
 * Regex for detecting right-to-left text.
 * Simplified and adapted from https://stackoverflow.com/a/14824756.
 * Note that this rtl detection is incomplete but good enough for our needs.
 * @private
 * @readonly
 * @type {RegExp}
 */
CurrencyInfo.RIGHT_TO_LEFT_DETECTION_REGEX = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
/* global I18n */
/* global CurrencyInfo */

class NumberFormatting { // eslint-disable-line no-unused-vars
    /**
     * @param {number} value
     * @param {number} [maxDecimals]
     * @param {number} [minDecimals]
     * @returns {string}
     */
    static formatNumber(value, maxDecimals = 5, minDecimals = 0) {
        const roundingFactor = 10 ** maxDecimals;
        value = Math.round(value * roundingFactor) / roundingFactor;

        const result = parseFloat(value.toFixed(minDecimals)) === value
            ? value.toFixed(minDecimals)
            : value.toString();

        if (Math.abs(value) < 10000) return result;

        // Add thin spaces (U+202F) every 3 digits. Stop at the decimal separator if there is one.
        const regexp = result.includes('.') ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(\d{3})+$)/g;
        return result.replace(regexp, '$1\u202F');
    }

    /**
     * @param {number} value
     * @param {string} currency
     * @param {number} [maxRelativeDeviation = .1]
     * @param {string} [locale = I18n.language]
     * @returns {string}
     */
    static formatCurrency(value, currency, maxRelativeDeviation = 0.1, locale = I18n.language) {
        const positioningLocale = this._getPositioningLocale(currency);
        const currencyInfo = new CurrencyInfo(currency, locale);
        const formattingOptions = {
            style: 'currency',
            currency,
            currencyDisplay: 'code', // will later be replaced by the optimized currency symbol provided by CurrencyInfo
            useGrouping: false,
            numberingSystem: 'latn',
            // start with decimal count typical for this currency, e.g. 2 for eur
            minimumFractionDigits: currencyInfo.decimals,
            maximumFractionDigits: currencyInfo.decimals,
        };
        let formatted;
        let integers;
        let relativeDeviation;

        do {
            formatted = value.toLocaleString([
                positioningLocale,
                locale,
                `${navigator.language.substring(0, 2)}-${positioningLocale}`,
                navigator.language,
                `en-${positioningLocale}`,
                'en',
            ], formattingOptions)
                // Enforce a dot as decimal separator for consistency and parseFloat. Using capturing groups instead of
                // lookahead/lookbehind to avoid browser support limitations.
                .replace(/(\d)\D(\d)/, '$1.$2');
            const partsMatch = formatted.match(/(-)?\D*(\d+)(\.\d+)?/);
            if (!partsMatch) return formatted; // should never happen
            const [/* full match */, sign, /* integers */, decimalsIncludingSeparator] = partsMatch;
            integers = partsMatch[2];
            const formattedNumber = `${sign || ''}${integers}${decimalsIncludingSeparator || ''}`;
            relativeDeviation = Math.abs((value - Number.parseFloat(formattedNumber)) / value);

            formattingOptions.minimumFractionDigits += 1;
            formattingOptions.maximumFractionDigits += 1;
        } while (relativeDeviation > maxRelativeDeviation
            && formattingOptions.minimumFractionDigits <= 20 // max for minimumFractionDigits and maximumFractionDigits
        );

        // Replace the currency code with our custom currency symbol.
        formatted = formatted.replace(/[A-Z]{3}\s?/i, (match, position) => {
            if (position !== 0 || !/[A-Z.]$/i.test(currencyInfo.symbol)) {
                // For trailing currency symbol or currency symbol that does not end with a latin letter or dot do not
                // append a space, e.g.: 1.00 € (EUR), $1.00 (USD), R$1.00 (BRL), ₼1.00 (AZN), ৳1 (BDT), S/1.00 (PEN)
                return currencyInfo.symbol;
            }
            // For leading currency symbol that ends with a latin letter or dot, add a (non-breaking) space, e.g.
            // KM 1.00 (BAM), B/. 1.00 (PAB), лв. 1.00 (BGN), kr 1.00 (DKK)
            return `${currencyInfo.symbol}\u00A0`;
        });

        // apply integer grouping
        if (integers.length <= 4) return formatted;
        return formatted.replace(integers, NumberFormatting.formatNumber(parseInt(integers, 10)));
    }

    /**
     * @private
     * @param {string} currency
     * @returns {string}
     */
    static _getPositioningLocale(currency) {
        // Try to guess a locale which positions the currency symbol in a way typical for countries, where the currency
        // is used, e.g. 1.00€ for eur; $1.00 for usd.
        currency = currency.toLowerCase();
        switch (currency) {
            case 'eur':
            case 'chf':
                return 'de';
            case 'gbp':
            case 'usd':
                return 'en';
            case 'cny':
                return 'zh';
            default:
                // Return the country from the currency code which is typically (but not necessarily) the first two
                // letters (see https://en.wikipedia.org/wiki/ISO_4217#National_currencies), in the hope that it
                // coincides with a locale.
                // TODO oftentimes this results in the wrong locale, e.g. ARS (Argentinan Peso) -> AR (Arabic),
                //  CAD (Canadian Dollar) -> CA (Catalan). Can we come up with a better heuristic?
                return currency.substr(0, 2);
        }
    }
}
const EuroConstants = { // eslint-disable-line no-unused-vars
    CENTS_PER_COIN: 100,
};
/* global EuroConstants */

class EuroUtils { // eslint-disable-line no-unused-vars
    /**
     * @param {number} coins Euro amount in decimal
     * @returns {number} Number of Eurocents
     */
    static coinsToCents(coins) {
        return Math.round(coins * EuroConstants.CENTS_PER_COIN);
    }

    /**
     * @param {number} cents Number of Eurocents
     * @returns {number} Euro count in decimal
     */
    static centsToCoins(cents) {
        return cents / EuroConstants.CENTS_PER_COIN;
    }
}
/**
 * Adapted from https://github.com/arhs/iban.js
 *
 * Copyright (c) 2013-2020 ARHS Developments SA
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/* global Errors */

class IbanSpec {
    /**
     * Create a new IbanSpec for a valid IBAN number.
     *
     * @param {string} countryCode the code of the country
     * @param {number} length the length of the IBAN
     * @param {string} structure the structure of the underlying BBAN (for validation and formatting)
     */
    constructor(countryCode, length, structure) {
        this.countryCode = countryCode;
        this.length = length;
        this.structure = structure;
    }

    /**
     * Check if the passed iban is valid according to this specification.
     *
     * @param {String} iban the iban to validate
     * @returns {boolean} true if valid, false otherwise
     */
    isValid(iban) {
        return this.length === iban.length
            && this.countryCode === iban.slice(0, 2)
            && this._regex().test(iban.slice(4))
            && this._iso7064Mod97_10(this._iso13616Prepare(iban)) === 1;
    }

    /**
     * Lazy-loaded regex (parse the structure and construct the regular
     * expression the first time we need it for validation)
     *
     * @returns {RegExp}
     * @private
     */
    _regex() {
        if (this._cachedRegex) return this._cachedRegex;
        this._cachedRegex = this._parseStructure(this.structure);
        return this._cachedRegex;
    }

    /**
     * Parse the BBAN structure used to configure each IBAN IbanSpec and returns a matching regular expression.
     * A structure is composed of blocks of 3 characters (one letter and 2 digits). Each block represents
     * a logical group in the typical representation of the BBAN. For each group, the letter indicates which characters
     * are allowed in this group and the following 2-digits number tells the length of the group.
     *
     * @param {string} structure the structure to parse
     * @returns {RegExp}
     * @private
     */
    _parseStructure(structure) {
        const blocks = structure.match(/(.{3})/g);
        if (!blocks) throw new Errors.KeyguardError('Invalid IBAN specification');

        // split in blocks of 3 chars
        const regex = blocks.map(block => {
            // parse each structure block (1-char + 2-digits)
            let format;
            const pattern = block.slice(0, 1);
            const repeats = parseInt(block.slice(1), 10);

            switch (pattern) {
                case 'A': format = '0-9A-Za-z'; break;
                case 'B': format = '0-9A-Z'; break;
                case 'C': format = 'A-Za-z'; break;
                case 'F': format = '0-9'; break;
                case 'L': format = 'a-z'; break;
                case 'U': format = 'A-Z'; break;
                case 'W': format = '0-9a-z'; break;
                default: throw new Errors.KeyguardError('Invalid IBAN specification pattern');
            }

            return `([${format}]{${repeats}})`;
        });

        return new RegExp(`^${regex.join('')}$`);
    }

    /**
     * Prepare an IBAN for mod 97 computation by moving the first 4 chars to the end and transforming the letters to
     * numbers (A = 10, B = 11, ..., Z = 35), as specified in ISO13616.
     *
     * @param {string} iban the IBAN
     * @returns {string} the prepared IBAN
     * @private
     */
    _iso13616Prepare(iban) {
        iban = iban.toUpperCase();
        iban = iban.substr(4) + iban.substr(0, 4);

        const A = 'A'.charCodeAt(0);
        const Z = 'Z'.charCodeAt(0);

        return iban.split('').map(n => {
            const code = n.charCodeAt(0);
            if (code >= A && code <= Z) {
                // A = 10, B = 11, ... Z = 35
                return code - A + 10;
            }
            return n;
        }).join('');
    }

    /**
     * Calculates the MOD 97 10 of the passed IBAN as specified in ISO7064.
     *
     * @param {string} iban
     * @returns {number}
     * @private
     */
    _iso7064Mod97_10(iban) { // eslint-disable-line camelcase
        let remainder = iban;
        let block;

        while (remainder.length > 2) {
            block = remainder.slice(0, 9);
            remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
        }

        return parseInt(remainder, 10) % 97;
    }
}

class Iban {
    /**
     * Check if an IBAN is valid.
     *
     * @param {unknown} str the IBAN to validate.
     * @returns {boolean} true if the passed IBAN is valid, false otherwise
     */
    static isValid(str) {
        if (typeof str !== 'string') return false;
        const iban = this.electronicFormat(str);
        const countryStructure = IbanSpec.Countries[iban.slice(0, 2)];
        return !!countryStructure && countryStructure.isValid(iban);
    }

    /**
     *
     * @param {string} iban
     * @returns {string}
     */
    static electronicFormat(iban) {
        return iban.replace(Iban.NON_ALPHANUM, '').toUpperCase();
    }

    /**
     *
     * @param {string} iban
     * @param {string} separator
     * @returns {string}
     */
    static printFormat(iban, separator) {
        if (typeof separator === 'undefined') {
            separator = ' ';
        }
        return this.electronicFormat(iban).replace(Iban.EVERY_FOUR_CHARS, `$1${separator}`);
    }
}

Iban.NON_ALPHANUM = /[^a-zA-Z0-9]/g;
Iban.EVERY_FOUR_CHARS = /(.{4})(?!$)/g;

/** @type {{[countryCode: string]: IbanSpec}} */
IbanSpec.Countries = {
    AD: new IbanSpec('AD', 24, 'F04F04A12'),
    AE: new IbanSpec('AE', 23, 'F03F16'),
    AL: new IbanSpec('AL', 28, 'F08A16'),
    AT: new IbanSpec('AT', 20, 'F05F11'),
    AZ: new IbanSpec('AZ', 28, 'U04A20'),
    BA: new IbanSpec('BA', 20, 'F03F03F08F02'),
    BE: new IbanSpec('BE', 16, 'F03F07F02'),
    BG: new IbanSpec('BG', 22, 'U04F04F02A08'),
    BH: new IbanSpec('BH', 22, 'U04A14'),
    BR: new IbanSpec('BR', 29, 'F08F05F10U01A01'),
    BY: new IbanSpec('BY', 28, 'A04F04A16'),
    CH: new IbanSpec('CH', 21, 'F05A12'),
    CR: new IbanSpec('CR', 22, 'F04F14'),
    CY: new IbanSpec('CY', 28, 'F03F05A16'),
    CZ: new IbanSpec('CZ', 24, 'F04F06F10'),
    DE: new IbanSpec('DE', 22, 'F08F10'),
    DK: new IbanSpec('DK', 18, 'F04F09F01'),
    DO: new IbanSpec('DO', 28, 'U04F20'),
    EE: new IbanSpec('EE', 20, 'F02F02F11F01'),
    EG: new IbanSpec('EG', 29, 'F04F04F17'),
    ES: new IbanSpec('ES', 24, 'F04F04F01F01F10'),
    FI: new IbanSpec('FI', 18, 'F06F07F01'),
    FO: new IbanSpec('FO', 18, 'F04F09F01'),
    FR: new IbanSpec('FR', 27, 'F05F05A11F02'),
    GB: new IbanSpec('GB', 22, 'U04F06F08'),
    GE: new IbanSpec('GE', 22, 'U02F16'),
    GI: new IbanSpec('GI', 23, 'U04A15'),
    GL: new IbanSpec('GL', 18, 'F04F09F01'),
    GR: new IbanSpec('GR', 27, 'F03F04A16'),
    GT: new IbanSpec('GT', 28, 'A04A20'),
    HR: new IbanSpec('HR', 21, 'F07F10'),
    HU: new IbanSpec('HU', 28, 'F03F04F01F15F01'),
    IE: new IbanSpec('IE', 22, 'U04F06F08'),
    IL: new IbanSpec('IL', 23, 'F03F03F13'),
    IS: new IbanSpec('IS', 26, 'F04F02F06F10'),
    IT: new IbanSpec('IT', 27, 'U01F05F05A12'),
    IQ: new IbanSpec('IQ', 23, 'U04F03A12'),
    JO: new IbanSpec('JO', 30, 'A04F22'),
    KW: new IbanSpec('KW', 30, 'U04A22'),
    KZ: new IbanSpec('KZ', 20, 'F03A13'),
    LB: new IbanSpec('LB', 28, 'F04A20'),
    LC: new IbanSpec('LC', 32, 'U04F24'),
    LI: new IbanSpec('LI', 21, 'F05A12'),
    LT: new IbanSpec('LT', 20, 'F05F11'),
    LU: new IbanSpec('LU', 20, 'F03A13'),
    LV: new IbanSpec('LV', 21, 'U04A13'),
    MC: new IbanSpec('MC', 27, 'F05F05A11F02'),
    MD: new IbanSpec('MD', 24, 'U02A18'),
    ME: new IbanSpec('ME', 22, 'F03F13F02'),
    MK: new IbanSpec('MK', 19, 'F03A10F02'),
    MR: new IbanSpec('MR', 27, 'F05F05F11F02'),
    MT: new IbanSpec('MT', 31, 'U04F05A18'),
    MU: new IbanSpec('MU', 30, 'U04F02F02F12F03U03'),
    NL: new IbanSpec('NL', 18, 'U04F10'),
    NO: new IbanSpec('NO', 15, 'F04F06F01'),
    PK: new IbanSpec('PK', 24, 'U04A16'),
    PL: new IbanSpec('PL', 28, 'F08F16'),
    PS: new IbanSpec('PS', 29, 'U04A21'),
    PT: new IbanSpec('PT', 25, 'F04F04F11F02'),
    QA: new IbanSpec('QA', 29, 'U04A21'),
    RO: new IbanSpec('RO', 24, 'U04A16'),
    RS: new IbanSpec('RS', 22, 'F03F13F02'),
    SA: new IbanSpec('SA', 24, 'F02A18'),
    SC: new IbanSpec('SC', 31, 'U04F04F16U03'),
    SE: new IbanSpec('SE', 24, 'F03F16F01'),
    SI: new IbanSpec('SI', 19, 'F05F08F02'),
    SK: new IbanSpec('SK', 24, 'F04F06F10'),
    SM: new IbanSpec('SM', 27, 'U01F05F05A12'),
    ST: new IbanSpec('ST', 25, 'F08F11F02'),
    SV: new IbanSpec('SV', 28, 'U04F20'),
    TL: new IbanSpec('TL', 23, 'F03F14F02'),
    TN: new IbanSpec('TN', 24, 'F02F03F13F02'),
    TR: new IbanSpec('TR', 26, 'F05F01A16'),
    UA: new IbanSpec('UA', 29, 'F25'),
    VA: new IbanSpec('VA', 22, 'F18'),
    VG: new IbanSpec('VG', 24, 'U04F16'),
    XK: new IbanSpec('XK', 20, 'F04F10F02'),

    // The following countries are not included in the official IBAN registry but use the IBAN specification

    // Angola
    AO: new IbanSpec('AO', 25, 'F21'),
    // Burkina
    BF: new IbanSpec('BF', 27, 'F23'),
    // Burundi
    BI: new IbanSpec('BI', 16, 'F12'),
    // Benin
    BJ: new IbanSpec('BJ', 28, 'F24'),
    // Ivory
    CI: new IbanSpec('CI', 28, 'U02F22'),
    // Cameron
    CM: new IbanSpec('CM', 27, 'F23'),
    // Cape Verde
    CV: new IbanSpec('CV', 25, 'F21'),
    // Algeria
    DZ: new IbanSpec('DZ', 24, 'F20'),
    // Iran
    IR: new IbanSpec('IR', 26, 'F22'),
    // Madagascar
    MG: new IbanSpec('MG', 27, 'F23'),
    // Mali
    ML: new IbanSpec('ML', 28, 'U01F23'),
    // Mozambique
    MZ: new IbanSpec('MZ', 25, 'F21'),
    // Senegal
    SN: new IbanSpec('SN', 28, 'U01F23'),

    // The following are regional and administrative French Republic subdivision IBAN specification
    // (same structure as FR, only country code vary)
    GF: new IbanSpec('GF', 27, 'F05F05A11F02'),
    GP: new IbanSpec('GP', 27, 'F05F05A11F02'),
    MQ: new IbanSpec('MQ', 27, 'F05F05A11F02'),
    RE: new IbanSpec('RE', 27, 'F05F05A11F02'),
    PF: new IbanSpec('PF', 27, 'F05F05A11F02'),
    TF: new IbanSpec('TF', 27, 'F05F05A11F02'),
    YT: new IbanSpec('YT', 27, 'F05F05A11F02'),
    NC: new IbanSpec('NC', 27, 'F05F05A11F02'),
    BL: new IbanSpec('BL', 27, 'F05F05A11F02'),
    MF: new IbanSpec('MF', 27, 'F05F05A11F02'),
    PM: new IbanSpec('PM', 27, 'F05F05A11F02'),
    WF: new IbanSpec('WF', 27, 'F05F05A11F02'),
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
/* global Nimiq */
/* global I18n */
/* global Errors */
/* global TemplateTags */
/* global NumberFormatting */
/* global BitcoinUtils */
/* global EuroUtils */

class SwapFeesTooltip { // eslint-disable-line no-unused-vars
    /**
     * @param {Parsed<KeyguardRequest.SignSwapRequest>} request
     * @param {number} exchangeFromAmount - In Luna or Satoshi, depending on which currency is funded
     * @param {number} exchangeToAmount - In Luna or Satoshi, depending on which currency is funded
     */
    constructor(request, exchangeFromAmount, exchangeToAmount) {
        const {
            fund: fundTx,
            redeem: redeemTx,
            fundingFiatRate,
            redeemingFiatRate,
            fundFees,
            redeemFees,
            serviceSwapFee,
            fiatCurrency,
        } = request;

        this.$el = SwapFeesTooltip._createElement();

        /** @private
         *  @type {SVGCircleElement} */
        this.$tooltip = (this.$el.querySelector('.tooltip-box'));
        /** @private
         *  @type {SVGCircleElement} */
        this.$fees = (this.$el.querySelector('.fees'));

        let totalFiatFees = 0;

        // Show Bitcoin fees first
        if (fundTx.type === 'BTC' || redeemTx.type === 'BTC') {
            const myFee = fundTx.type === 'BTC'
                ? fundTx.inputs.reduce((sum, input) => sum + input.witnessUtxo.value, 0)
                    - fundTx.recipientOutput.value
                    - (fundTx.changeOutput ? fundTx.changeOutput.value : 0)
                : redeemTx.type === 'BTC'
                    ? redeemTx.input.witnessUtxo.value - redeemTx.output.value
                    : 0;

            const theirFee = fundTx.type === 'BTC' ? fundFees.redeeming : redeemFees.funding;

            const fiatRate = fundTx.type === 'BTC' ? fundingFiatRate : redeemingFiatRate;
            const fiatFee = this._unitsToCoins('BTC', myFee + theirFee) * fiatRate;

            const rows = this._createBitcoinLine(fiatFee, fiatCurrency);
            this.$tooltip.appendChild(rows[0]);
            this.$tooltip.appendChild(rows[1]);

            totalFiatFees += fiatFee;
        }

        // Show OASIS fees second
        if (fundTx.type === 'EUR' || redeemTx.type === 'EUR') {
            const myFee = fundTx.type === 'EUR'
                ? fundTx.fee
                : redeemTx.type === 'EUR'
                    ? redeemTx.fee
                    : 0;

            const theirFee = fundTx.type === 'EUR' ? fundFees.processing : redeemFees.processing;

            const fiatRate = fundTx.type === 'EUR' ? fundingFiatRate : redeemingFiatRate;
            const fiatFee = this._unitsToCoins('EUR', myFee + theirFee) * fiatRate;

            const rows = this._createOasisLine(
                fiatFee,
                fiatCurrency,
                (myFee + theirFee) / (fundTx.type === 'EUR' ? exchangeFromAmount : exchangeToAmount),
            );
            this.$tooltip.appendChild(rows[0]);
            this.$tooltip.appendChild(rows[1]);

            totalFiatFees += fiatFee;
        }

        // Show SEPA Instant fees
        if (redeemTx.type === 'EUR' && redeemFees.funding > 0) {
            const theirFee = redeemFees.funding;

            const fiatRate = redeemingFiatRate;
            const fiatFee = this._unitsToCoins('EUR', theirFee) * fiatRate;

            const rows = this._createBankNetworkLine(fiatFee, fiatCurrency, 'SEPA Instant');
            this.$tooltip.appendChild(rows[0]);
            // this.$tooltip.appendChild(rows[1]);

            totalFiatFees += fiatFee;
        }

        // Show Nimiq fees last
        if (fundTx.type === 'NIM' || redeemTx.type === 'NIM') {
            const myFee = fundTx.type === 'NIM'
                ? fundTx.transaction.fee
                : redeemTx.type === 'NIM'
                    ? redeemTx.transaction.fee
                    : 0;

            const theirFee = fundTx.type === 'NIM' ? fundFees.redeeming : redeemFees.funding;

            const fiatRate = fundTx.type === 'NIM' ? fundingFiatRate : redeemingFiatRate;
            const fiatFee = this._unitsToCoins('NIM', myFee + theirFee) * fiatRate;

            const rows = this._createNimiqLine(fiatFee, fiatCurrency);
            this.$tooltip.appendChild(rows[0]);

            totalFiatFees += fiatFee;
        }

        // Show Swap fees
        if (serviceSwapFee) {
            const fiatFee = this._unitsToCoins(fundTx.type, serviceSwapFee) * fundingFiatRate;

            const rows = this._createServiceFeeLine(
                fiatFee,
                fiatCurrency,
                serviceSwapFee / (exchangeFromAmount - serviceSwapFee),
            );
            this.$tooltip.appendChild(rows[0]);
            this.$tooltip.appendChild(rows[1]);

            totalFiatFees += fiatFee;
        }

        // Add separator line
        this.$tooltip.appendChild(document.createElement('hr'));

        // Add total line
        this.$tooltip.appendChild(this._createTotalLine(totalFiatFees, fiatCurrency)[0]);

        // Write total into the pill box
        this.$fees.textContent = NumberFormatting.formatCurrency(totalFiatFees, fiatCurrency);
    }

    /**
     * @param {'NIM' | 'BTC' | 'EUR'} asset
     * @param {number} units
     * @returns {number}
     */
    _unitsToCoins(asset, units) {
        switch (asset) {
            case 'NIM': return Nimiq.Policy.lunasToCoins(units);
            case 'BTC': return BitcoinUtils.satoshisToCoins(units);
            case 'EUR': return EuroUtils.centsToCoins(units);
            default: throw new Errors.KeyguardError(`Invalid asset ${asset}`);
        }
    }

    /**
     * @private
     * @returns {HTMLElement}
     */
    static _createElement() {
        const $el = document.createElement('div');
        $el.classList.add('tooltip', 'fee-breakdown', 'bottom');
        $el.tabIndex = 0; // make the tooltip focusable

        $el.innerHTML = TemplateTags.hasVars(0)`
            <div class="pill">
                <span class="fees"></span>&nbsp;<span data-i18n="sign-swap-fees">fees</span>
            </div>
            <div class="tooltip-box"></div>
        `;
        I18n.translateDom($el);

        return $el;
    }

    /**
     * @param {number} fiatFee
     * @param {string} fiatCurrency
     * @returns {[HTMLDivElement, HTMLParagraphElement]}
     */
    _createBitcoinLine(fiatFee, fiatCurrency) {
        const $div = document.createElement('div');
        $div.classList.add('price-breakdown');

        $div.innerHTML = TemplateTags.hasVars(1)`
            <label data-i18n="sign-swap-btc-fees">BTC network fee</label>
            <div>${NumberFormatting.formatCurrency(fiatFee, fiatCurrency)}</div>
        `;
        I18n.translateDom($div);

        const $p = document.createElement('p');
        $p.classList.add('explainer');
        $p.textContent = I18n.translatePhrase('sign-swap-btc-fees-explainer');

        return [$div, $p];
    }

    /**
     * @param {number} fiatFee
     * @param {string} fiatCurrency
     * @param {number} percentage
     * @returns {[HTMLDivElement, HTMLParagraphElement]}
     */
    _createOasisLine(fiatFee, fiatCurrency, percentage) {
        const $div = document.createElement('div');
        $div.classList.add('price-breakdown');

        $div.innerHTML = TemplateTags.hasVars(1)`
            <label data-i18n="sign-swap-oasis-fees">OASIS service fee</label>
            <div>${NumberFormatting.formatCurrency(fiatFee, fiatCurrency)}</div>
        `;
        I18n.translateDom($div);

        const $p = document.createElement('p');
        $p.classList.add('explainer');
        $p.textContent = `${NumberFormatting.formatNumber(percentage * 100, 1)}%`
            + ` ${I18n.translatePhrase('sign-swap-oasis-fees-explainer')}`;

        return [$div, $p];
    }

    /**
     * @param {number} fiatFee
     * @param {string} fiatCurrency
     * @param {'SEPA Instant'} network
     * @returns {[HTMLDivElement]}
     */
    _createBankNetworkLine(fiatFee, fiatCurrency, network) {
        const $div = document.createElement('div');
        $div.classList.add('price-breakdown');

        $div.innerHTML = TemplateTags.hasVars(2)`
            <label>${network} <span data-i18n="sign-swap-bank-fees">fee</span></label>
            <div>${NumberFormatting.formatCurrency(fiatFee, fiatCurrency)}</div>
        `;
        I18n.translateDom($div);

        // const $p = document.createElement('p');
        // $p.classList.add('explainer');
        // $p.textContent = `${NumberFormatting.formatNumber(percentage * 100, 1)}%`
        //     + ` ${I18n.translatePhrase('sign-swap-bank-fees-explainer')}`;

        return [$div/* , $p */];
    }

    /**
     * @param {number} fiatFee
     * @param {string} fiatCurrency
     * @returns {[HTMLDivElement]}
     */
    _createNimiqLine(fiatFee, fiatCurrency) {
        const $div = document.createElement('div');
        $div.classList.add('price-breakdown');

        $div.innerHTML = TemplateTags.hasVars(1)`
            <label data-i18n="sign-swap-nim-fees">NIM network fee</label>
            <div>${NumberFormatting.formatCurrency(fiatFee, fiatCurrency)}</div>
        `;
        I18n.translateDom($div);

        return [$div];
    }

    /**
     * @param {number} fiatFee
     * @param {string} fiatCurrency
     * @param {number} percentage
     * @returns {[HTMLDivElement, HTMLParagraphElement]}
     */
    _createServiceFeeLine(fiatFee, fiatCurrency, percentage) {
        const $div = document.createElement('div');
        $div.classList.add('price-breakdown');

        $div.innerHTML = TemplateTags.hasVars(1)`
            <label data-i18n="sign-swap-exchange-fee">Swap fee</label>
            <div>${NumberFormatting.formatCurrency(fiatFee, fiatCurrency)}</div>
        `;
        I18n.translateDom($div);

        const $p = document.createElement('p');
        $p.classList.add('explainer');
        $p.textContent = `${NumberFormatting.formatNumber(percentage * 100, 2)}%`
            + ` ${I18n.translatePhrase('sign-swap-of-exchange-value')}`;

        return [$div, $p];
    }

    /**
     * @param {number} totalFiatFees
     * @param {string} fiatCurrency
     * @returns {[HTMLDivElement]}
     */
    _createTotalLine(totalFiatFees, fiatCurrency) {
        const $div = document.createElement('div');
        $div.classList.add('price-breakdown');

        $div.innerHTML = TemplateTags.hasVars(1)`
            <label data-i18n="sign-swap-total-fees">Total fees</label>
            <div class="total-fees">${NumberFormatting.formatCurrency(totalFiatFees, fiatCurrency)}</div>
        `;
        I18n.translateDom($div);

        return [$div];
    }
}
/* global Nimiq */
/* global LoginFileConfig */
/* global IqonHash */
/* global BitcoinUtils */

class BalanceDistributionBar { // eslint-disable-line no-unused-vars
    /**
     * @param {{
     *  nimiqAddresses: { address: string, balance: number }[],
     *  bitcoinAccount: { balance: number },
     *  swapNimAddress: string,
     *  nimFiatRate: number,
     *  btcFiatRate: number,
     *  newNimBalance: number,
     *  newBtcBalanceFiat: number,
     * }} settings
     * @param {HTMLDivElement} [$el]
     */
    constructor(settings, $el) {
        this.$el = BalanceDistributionBar._createElement($el);

        const {
            nimiqAddresses,
            bitcoinAccount,
            swapNimAddress,
            nimFiatRate,
            btcFiatRate,
            newNimBalance,
            newBtcBalanceFiat,
        } = settings;

        const nimDistributionData = nimiqAddresses.map(addressInfo => {
            const active = swapNimAddress === addressInfo.address;
            const backgroundClass = LoginFileConfig[IqonHash.getBackgroundColorIndex(addressInfo.address)]
                .className;
            const oldBalance = Nimiq.Policy.lunasToCoins(addressInfo.balance) * nimFiatRate;
            const newBalance = active
                ? Nimiq.Policy.lunasToCoins(newNimBalance) * nimFiatRate
                : oldBalance;

            return {
                oldBalance,
                newBalance,
                backgroundClass,
                active,
            };
        });

        const btcDistributionData = {
            oldBalance: BitcoinUtils.satoshisToCoins(bitcoinAccount.balance) * btcFiatRate,
            newBalance: newBtcBalanceFiat,
            backgroundClass: 'bitcoin',
            active: true,
        };

        const totalBalance = nimDistributionData.reduce((sum, data) => sum + data.newBalance, 0)
            + btcDistributionData.newBalance;

        const $bars = document.createDocumentFragment();
        for (const data of nimDistributionData) {
            $bars.appendChild(this._createBar(data, totalBalance));
        }
        const $separator = document.createElement('div');
        $separator.classList.add('separator');
        $bars.appendChild($separator);
        $bars.appendChild(this._createBar(btcDistributionData, totalBalance));

        this.$el.appendChild($bars);
    }

    /**
     * @returns {HTMLDivElement}
     */
    getElement() {
        return this.$el;
    }

    /**
     * @param {HTMLDivElement} [$el]
     * @returns {HTMLDivElement}
     */
    static _createElement($el) {
        const $element = $el || document.createElement('div');
        $element.classList.add('balance-distribution-bar');
        return $element;
    }

    /**
     * @param {{oldBalance: number, newBalance: number, backgroundClass: string, active: boolean}} data
     * @param {number} totalBalance
     * @returns {HTMLDivElement}
     */
    _createBar(data, totalBalance) { // eslint-disable-line no-inner-declarations
        const $bar = document.createElement('div');
        $bar.classList.add('bar', data.backgroundClass);
        $bar.classList.toggle('active', data.active);
        $bar.style.width = `${data.newBalance / totalBalance * 100}%`;
        if (data.active && data.newBalance > data.oldBalance) {
            const $change = document.createElement('div');
            $change.classList.add('change');
            $change.style.width = `${(data.newBalance - data.oldBalance) / data.newBalance * 100}%`;
            $bar.appendChild($change);
        }
        return $bar;
    }
}
/* global Nimiq */
/* global Key */
/* global KeyStore */
/* global PasswordBox */
/* global Errors */
/* global Utf8Tools */
/* global TopLevelApi */
/* global NumberFormatting */
/* global BitcoinConstants */
/* global BitcoinUtils */
/* global BitcoinKey */
/* global EuroConstants */
/* global EuroUtils */
/* global Identicon */
/* global TemplateTags */
/* global I18n */
/* global SignSwapApi */
/* global SwapFeesTooltip */
/* global BalanceDistributionBar */
/* global Constants */

/**
 * @callback SignSwap.resolve
 * @param {KeyguardRequest.SignSwapResult} result
 */

class SignSwap {
    /**
     * @param {Parsed<KeyguardRequest.SignSwapRequest>} request
     * @param {SignSwap.resolve} resolve
     * @param {reject} reject
     */
    constructor(request, resolve, reject) {
        this._request = request;
        /** @type {HTMLElement} */
        this.$el = (document.getElementById(SignSwap.Pages.CONFIRM_SWAP));

        const fundTx = request.fund;
        const redeemTx = request.redeem;

        // Remove unused layout HTML before getting DOM nodes
        if (request.layout === SignSwapApi.Layouts.STANDARD) {
            /** @type {HTMLDivElement} */
            const sliderLayout = (this.$el.querySelector('.layout-slider'));
            this.$el.removeChild(sliderLayout);
        }
        if (request.layout === SignSwapApi.Layouts.SLIDER) {
            /** @type {HTMLDivElement} */
            const standardLayout = (this.$el.querySelector('.layout-standard'));
            this.$el.removeChild(standardLayout);
        }

        this.$el.classList.add(`layout-${request.layout}`);

        /** @type {HTMLDivElement} */
        const $exchangeRate = (this.$el.querySelector('#exchange-rate'));
        /** @type {HTMLDivElement} */
        const $leftIdenticon = (this.$el.querySelector('.left-account .identicon'));
        /** @type {HTMLDivElement} */
        const $rightIdenticon = (this.$el.querySelector('.right-account .identicon'));
        /** @type {HTMLSpanElement} */
        const $leftLabel = (this.$el.querySelector('.left-account .label'));
        /** @type {HTMLSpanElement} */
        const $rightLabel = (this.$el.querySelector('.right-account .label'));
        /** @type {HTMLDivElement} */
        const $swapValues = (this.$el.querySelector('.swap-values'));
        /** @type {HTMLSpanElement} */
        const $swapLeftValue = (this.$el.querySelector('#swap-nim-value'));
        /** @type {HTMLSpanElement} */
        const $swapRightValue = (this.$el.querySelector('#swap-btc-value'));

        // The total amount the user loses
        let swapFromValue = 0;
        switch (fundTx.type) {
            case 'NIM': swapFromValue = fundTx.transaction.value + fundTx.transaction.fee; break;
            case 'BTC': swapFromValue = fundTx.inputs.reduce((sum, input) => sum + input.witnessUtxo.value, 0)
                    - (fundTx.changeOutput ? fundTx.changeOutput.value : 0); break;
            case 'EUR': swapFromValue = fundTx.amount + fundTx.fee; break;
            default: throw new Errors.KeyguardError('Invalid asset');
        }

        // The total amount the user receives
        let swapToValue = 0;
        switch (redeemTx.type) {
            case 'NIM': swapToValue = redeemTx.transaction.value; break;
            case 'BTC': swapToValue = redeemTx.output.value; break;
            case 'EUR': swapToValue = redeemTx.amount - redeemTx.fee; break;
            default: throw new Errors.KeyguardError('Invalid asset');
        }

        const leftAsset = request.layout === SignSwapApi.Layouts.SLIDER ? 'NIM' : fundTx.type;
        const rightAsset = request.layout === SignSwapApi.Layouts.SLIDER ? 'BTC' : redeemTx.type;

        const leftAmount = fundTx.type === leftAsset ? swapFromValue : swapToValue;
        const rightAmount = redeemTx.type === rightAsset ? swapToValue : swapFromValue;

        $swapLeftValue.textContent = NumberFormatting.formatNumber(
            this._unitsToCoins(leftAsset, leftAmount),
            this._assetDecimals(leftAsset),
            leftAsset === 'EUR' ? this._assetDecimals(leftAsset) : 0,
        );

        $swapRightValue.textContent = NumberFormatting.formatNumber(
            this._unitsToCoins(rightAsset, rightAmount),
            this._assetDecimals(rightAsset),
            rightAsset === 'EUR' ? this._assetDecimals(rightAsset) : 0,
        );

        $swapValues.classList.add(`${fundTx.type.toLowerCase()}-to-${redeemTx.type.toLowerCase()}`);

        /** @type {'NIM' | 'BTC' | 'EUR'} */
        let exchangeBaseAsset;
        // If EUR is part of the swap, the other currency is the base asset
        if (fundTx.type === 'EUR') exchangeBaseAsset = redeemTx.type;
        else if (redeemTx.type === 'EUR') exchangeBaseAsset = fundTx.type;
        // If NIM is part of the swap, it is the base asset
        else if (fundTx.type === 'NIM' || redeemTx.type === 'NIM') exchangeBaseAsset = 'NIM';
        else exchangeBaseAsset = fundTx.type;

        const exchangeOtherAsset = exchangeBaseAsset === fundTx.type ? redeemTx.type : fundTx.type;

        // Exchange rate
        /** @type {number} */
        let exchangeBaseValue;
        switch (exchangeBaseAsset) {
            case 'NIM':
                exchangeBaseValue = fundTx.type === 'NIM'
                    // When the user funds NIM, the service receives the HTLC balance - their network fee.
                    ? fundTx.transaction.value - request.fundFees.redeeming
                    : redeemTx.type === 'NIM'
                        // When the user redeems NIM, the service lost the HTLC balance + their network fee.
                        // The transaction value is "HTLC balance - tx fee", therefore the "HTLC balance"
                        // is the transaction value + tx fee.
                        ? redeemTx.transaction.value + redeemTx.transaction.fee + request.redeemFees.funding
                        : 0; // Should never happen, if parsing works correctly
                break;
            case 'BTC':
                exchangeBaseValue = fundTx.type === 'BTC'
                    // When the user funds BTC, the service receives the HTLC balance - their network fee.
                    ? fundTx.recipientOutput.value - request.fundFees.redeeming
                    : redeemTx.type === 'BTC'
                        // When the user redeems BTC, the service lost the HTLC balance + their network fee.
                        // The HTLC balance is represented by the redeeming tx input value.
                        ? redeemTx.input.witnessUtxo.value + request.redeemFees.funding
                        : 0; // Should never happen, if parsing works correctly
                break;
            case 'EUR':
                exchangeBaseValue = fundTx.type === 'EUR'
                    ? fundTx.amount - request.fundFees.redeeming
                    : redeemTx.type === 'EUR'
                        ? redeemTx.amount + request.redeemFees.processing + request.redeemFees.funding
                        : 0; // Should never happen, if parsing works correctly
                break;
            default:
                throw new Errors.KeyguardError('UNEXPECTED: Unsupported exchange rate base asset');
        }

        /** @type {number} */
        let exchangeOtherValue;
        switch (exchangeOtherAsset) {
            case 'NIM':
                exchangeOtherValue = fundTx.type === 'NIM'
                    // When the user funds NIM, the service receives the HTLC balance - their network fee.
                    ? fundTx.transaction.value - request.fundFees.redeeming
                    : redeemTx.type === 'NIM'
                        // When the user redeems NIM, the service lost the HTLC balance + their network fee.
                        // The transaction value is "HTLC balance - tx fee", therefore the "HTLC balance"
                        // is the transaction value + tx fee.
                        ? redeemTx.transaction.value + redeemTx.transaction.fee + request.redeemFees.funding
                        : 0; // Should never happen, if parsing works correctly
                break;
            case 'BTC':
                exchangeOtherValue = fundTx.type === 'BTC'
                    // When the user funds BTC, the service receives the HTLC balance - their network fee.
                    ? fundTx.recipientOutput.value - request.fundFees.redeeming
                    : redeemTx.type === 'BTC'
                        // When the user redeems BTC, the service lost the HTLC balance + their network fee.
                        // The HTLC balance is represented by the redeeming tx input value.
                        ? redeemTx.input.witnessUtxo.value + request.redeemFees.funding
                        : 0; // Should never happen, if parsing works correctly
                break;
            case 'EUR':
                exchangeOtherValue = fundTx.type === 'EUR'
                    ? fundTx.amount - request.fundFees.redeeming
                    : redeemTx.type === 'EUR'
                        ? redeemTx.amount + request.redeemFees.processing + request.redeemFees.funding
                        : 0; // Should never happen, if parsing works correctly
                break;
            default:
                throw new Errors.KeyguardError('UNEXPECTED: Unsupported exchange rate other asset');
        }

        if (!exchangeBaseValue || !exchangeOtherValue) {
            throw new Errors.KeyguardError(
                'UNEXPECTED: Swap rate values are invalid -'
                    + ` ${exchangeBaseAsset}: ${this._unitsToCoins(exchangeBaseAsset, exchangeBaseValue)}`
                    + `, ${exchangeOtherAsset}: ${this._unitsToCoins(exchangeOtherAsset, exchangeOtherValue)}`,
            );
        }

        const exchangeRate = this._unitsToCoins(exchangeOtherAsset, exchangeOtherValue)
            / this._unitsToCoins(exchangeBaseAsset, exchangeBaseValue);
        $exchangeRate.textContent = `1 ${exchangeBaseAsset} = ${NumberFormatting.formatCurrency(
            exchangeRate,
            exchangeOtherAsset.toLocaleLowerCase(),
            0.01,
        )}`;

        /** @type {HTMLDivElement} */
        const $topRow = (this.$el.querySelector('.nq-notice'));
        $topRow.appendChild(
            new SwapFeesTooltip(
                request,
                fundTx.type === exchangeBaseAsset ? exchangeBaseValue : exchangeOtherValue,
                fundTx.type === exchangeBaseAsset ? exchangeOtherValue : exchangeBaseValue,
            ).$el,
        );

        if (request.layout === SignSwapApi.Layouts.STANDARD) {
            /** @type {HTMLDivElement} */
            const $leftAccount = (this.$el.querySelector('.left-account'));
            /** @type {HTMLDivElement} */
            const $rightAccount = (this.$el.querySelector('.right-account'));

            $leftAccount.classList.add(request.fund.type.toLocaleLowerCase());
            $rightAccount.classList.add(request.redeem.type.toLocaleLowerCase());

            // Add ticker symbols
            /** @type {HTMLSpanElement} */
            const $fromSymbol = (this.$el.querySelector('.swap-values .from-symbol'));
            /** @type {HTMLSpanElement} */
            const $toSymbol = (this.$el.querySelector('.swap-values .to-symbol'));

            $fromSymbol.classList.add(`${request.fund.type.toLowerCase()}-symbol`);
            $toSymbol.classList.add(`${request.redeem.type.toLowerCase()}-symbol`);

            if (request.fund.type === 'NIM') {
                const address = request.fund.transaction.sender.toUserFriendlyAddress();
                new Identicon(address, $leftIdenticon); // eslint-disable-line no-new
                $leftLabel.textContent = request.fund.senderLabel;
            } else if (request.fund.type === 'BTC') {
                $leftIdenticon.innerHTML = TemplateTags.hasVars(0)`<img src="../../assets/icons/bitcoin.svg"></img>`;
                $leftLabel.textContent = I18n.translatePhrase('bitcoin');
            } else if (request.fund.type === 'EUR') {
                $leftIdenticon.innerHTML = TemplateTags.hasVars(0)`<img src="../../assets/icons/bank.svg"></img>`;
                $leftLabel.textContent = request.fund.bankLabel || I18n.translatePhrase('sign-swap-your-bank');
            }

            if (request.redeem.type === 'NIM') {
                const address = request.redeem.transaction.recipient.toUserFriendlyAddress();
                new Identicon(address, $rightIdenticon); // eslint-disable-line no-new
                $rightLabel.textContent = request.redeem.recipientLabel;
            } else if (request.redeem.type === 'BTC') {
                $rightIdenticon.innerHTML = TemplateTags.hasVars(0)`<img src="../../assets/icons/bitcoin.svg"></img>`;
                $rightLabel.textContent = I18n.translatePhrase('bitcoin');
            } else if (request.redeem.type === 'EUR') {
                $rightIdenticon.innerHTML = TemplateTags.hasVars(0)`<img src="../../assets/icons/bank.svg"></img>`;

                let label = request.redeem.bankLabel || I18n.translatePhrase('sign-swap-your-bank');

                // Display IBAN as recipient label if available
                if (request.redeem.settlement.type === 'sepa') {
                    label = request.redeem.settlement.recipient.iban;
                }

                $rightLabel.textContent = label;
            }
        }

        if (request.layout === SignSwapApi.Layouts.SLIDER) {
            /** @type {HTMLDivElement} */
            const $balanceDistributionBar = (this.$el.querySelector('.balance-distribution-bar'));
            /** @type {HTMLSpanElement} */
            const $newNimBalance = (this.$el.querySelector('#new-nim-balance'));
            /** @type {HTMLSpanElement} */
            const $newBtcBalance = (this.$el.querySelector('#new-btc-balance'));
            /** @type {HTMLSpanElement} */
            const $newNimBalanceFiat = (this.$el.querySelector('#new-nim-balance-fiat'));
            /** @type {HTMLSpanElement} */
            const $newBtcBalanceFiat = (this.$el.querySelector('#new-btc-balance-fiat'));
            /** @type {HTMLSpanElement} */
            const $swapLeftValueFiat = (this.$el.querySelector('#swap-nim-value-fiat'));
            /** @type {HTMLSpanElement} */
            const $swapRightValueFiat = (this.$el.querySelector('#swap-btc-value-fiat'));

            const swapNimAddress = fundTx.type === 'NIM'
                ? fundTx.transaction.sender.toUserFriendlyAddress()
                : redeemTx.type === 'NIM'
                    ? redeemTx.transaction.recipient.toUserFriendlyAddress()
                    : ''; // Should never happen, if parsing works correctly

            new Identicon(swapNimAddress, $leftIdenticon); // eslint-disable-line no-new
            $leftLabel.textContent = fundTx.type === 'NIM'
                ? fundTx.senderLabel
                : redeemTx.type === 'NIM'
                    ? redeemTx.recipientLabel
                    : ''; // Should never happen, if parsing works correctly

            $rightIdenticon.innerHTML = TemplateTags.hasVars(0)`<img src="../../assets/icons/bitcoin.svg"></img>`;
            $rightLabel.textContent = I18n.translatePhrase('bitcoin');

            // Add signs in front of swap amounts
            $swapLeftValue.textContent = `${fundTx.type === leftAsset ? '-' : '+'}\u2009`
                + `${$swapLeftValue.textContent}`;
            $swapRightValue.textContent = `${redeemTx.type === rightAsset ? '+' : '-'}\u2009`
                + `${$swapRightValue.textContent}`;

            // Fiat swap amounts
            const leftFiatRate = fundTx.type === leftAsset ? request.fundingFiatRate : request.redeemingFiatRate;
            const rightFiatRate = redeemTx.type === rightAsset ? request.redeemingFiatRate : request.fundingFiatRate;
            $swapLeftValueFiat.textContent = NumberFormatting.formatCurrency(
                this._unitsToCoins(leftAsset, leftAmount) * leftFiatRate,
                request.fiatCurrency,
            );
            $swapRightValueFiat.textContent = NumberFormatting.formatCurrency(
                this._unitsToCoins(rightAsset, rightAmount) * rightFiatRate,
                request.fiatCurrency,
            );

            const nimAddressInfo = request.nimiqAddresses.find(address => address.address === swapNimAddress);
            if (!nimAddressInfo) {
                throw new Errors.KeyguardError('UNEXPECTED: Address info of swap NIM address not found');
            }

            const newNimBalance = nimAddressInfo.balance + (leftAmount * (fundTx.type === 'NIM' ? -1 : 1));
            const newBtcBalance = request.bitcoinAccount.balance + (rightAmount * (fundTx.type === 'BTC' ? -1 : 1));

            $newNimBalance.textContent = NumberFormatting.formatNumber(Nimiq.Policy.lunasToCoins(newNimBalance));
            $newNimBalanceFiat.textContent = NumberFormatting.formatCurrency(
                Nimiq.Policy.lunasToCoins(newNimBalance) * leftFiatRate,
                request.fiatCurrency,
            );
            $newBtcBalance.textContent = NumberFormatting.formatNumber(BitcoinUtils.satoshisToCoins(newBtcBalance), 8);
            const newBtcBalanceFiat = BitcoinUtils.satoshisToCoins(newBtcBalance) * rightFiatRate;
            $newBtcBalanceFiat.textContent = NumberFormatting.formatCurrency(newBtcBalanceFiat, request.fiatCurrency);

            new BalanceDistributionBar({ // eslint-disable-line no-new
                nimiqAddresses: request.nimiqAddresses,
                bitcoinAccount: request.bitcoinAccount,
                swapNimAddress,
                nimFiatRate: leftFiatRate,
                btcFiatRate: rightFiatRate,
                newNimBalance,
                newBtcBalanceFiat,
            }, $balanceDistributionBar);
        }

        // Set up password box.
        /** @type {HTMLFormElement} */
        const $passwordBox = (document.querySelector('#password-box'));
        this._passwordBox = new PasswordBox($passwordBox, {
            hideInput: !request.keyInfo.encrypted,
            buttonI18nTag: 'passwordbox-confirm-swap',
            minLength: request.keyInfo.hasPin ? Key.PIN_LENGTH : undefined,
        });

        this._passwordBox.on(
            PasswordBox.Events.SUBMIT,
            /** @param {string} [password] */ password => {
                this._onConfirm(request, resolve, reject, password);
            },
        );
    }

    /**
     * @param {'NIM' | 'BTC' | 'EUR'} asset
     * @param {number} units
     * @returns {number}
     */
    _unitsToCoins(asset, units) {
        switch (asset) {
            case 'NIM': return Nimiq.Policy.lunasToCoins(units);
            case 'BTC': return BitcoinUtils.satoshisToCoins(units);
            case 'EUR': return EuroUtils.centsToCoins(units);
            default: throw new Error(`Invalid asset ${asset}`);
        }
    }

    /**
     * @param {'NIM' | 'BTC' | 'EUR'} asset
     * @returns {number}
     */
    _assetDecimals(asset) {
        switch (asset) {
            case 'NIM': return Math.log10(Nimiq.Policy.LUNAS_PER_COIN);
            case 'BTC': return Math.log10(BitcoinConstants.SATOSHIS_PER_COIN);
            case 'EUR': return Math.log10(EuroConstants.CENTS_PER_COIN);
            default: throw new Error(`Invalid asset ${asset}`);
        }
    }

    /**
     * @param {Parsed<KeyguardRequest.SignSwapRequest>} request
     * @param {SignSwap.resolve} resolve
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

        const btcKey = new BitcoinKey(key);

        /** @type {{nim: string, btc: string[], eur: string, btc_refund?: string}} */
        const privateKeys = {};

        if (request.fund.type === 'NIM') {
            const privateKey = key.derivePrivateKey(request.fund.keyPath);
            privateKeys.nim = privateKey.toHex();
        }

        if (request.fund.type === 'BTC') {
            const keyPaths = request.fund.inputs.map(input => input.keyPath);
            const dedupedKeyPaths = keyPaths.filter(
                (path, index) => keyPaths.indexOf(path) === index,
            );
            const keyPairs = dedupedKeyPaths.map(path => btcKey.deriveKeyPair(path));
            const privKeys = keyPairs.map(keyPair => /** @type {Buffer} */ (keyPair.privateKey).toString('hex'));
            privateKeys.btc = privKeys;

            if (request.fund.changeOutput) {
                // Calculate, validate and store output address
                const address = btcKey.deriveAddress(request.fund.changeOutput.keyPath);
                if (request.fund.changeOutput.address && request.fund.changeOutput.address !== address) {
                    throw new Errors.InvalidRequestError(
                        'Given address is different from derived address for change output',
                    );
                }
                request.fund.changeOutput.address = address;
            }

            // Calculate and store refund key
            const refundKeyPair = btcKey.deriveKeyPair(request.fund.refundKeyPath);
            const privKey = Nimiq.BufferUtils.toHex(
                /** @type {Buffer} */ (refundKeyPair.privateKey),
            );
            privateKeys.btc_refund = privKey;

            // Calculate and store refund address
            request.fund.refundAddress = btcKey.deriveAddress(request.fund.refundKeyPath);
        }

        if (request.fund.type === 'EUR') {
            // No signature required
        }

        if (request.redeem.type === 'NIM') {
            const privateKey = key.derivePrivateKey(request.redeem.keyPath);
            privateKeys.nim = privateKey.toHex();
        }

        if (request.redeem.type === 'BTC') {
            const keyPairs = [btcKey.deriveKeyPair(request.redeem.input.keyPath)];
            const privKeys = keyPairs.map(keyPair => /** @type {Buffer} */ (keyPair.privateKey).toString('hex'));
            privateKeys.btc = privKeys;

            // Calculate, validate and store output address
            const address = btcKey.deriveAddress(request.redeem.output.keyPath);
            if (request.redeem.output.address && request.redeem.output.address !== address) {
                throw new Errors.InvalidRequestError(
                    'Given address is different from derived address for output',
                );
            }
            request.redeem.output.address = address;
        }

        /** @type {string | undefined} */
        let eurPubKey;

        if (request.redeem.type === 'EUR') {
            const privateKey = key.derivePrivateKey(request.redeem.keyPath);
            privateKeys.eur = privateKey.toHex();

            // Public key of EUR signing key is required as the contract recipient
            // when confirming a swap to Fastspot from the Hub.
            eurPubKey = Nimiq.PublicKey.derive(privateKey).toHex();
        }

        try {
            sessionStorage.setItem(
                Constants.SWAP_IFRAME_SESSION_STORAGE_KEY_PREFIX + request.swapId,
                JSON.stringify({
                    keys: privateKeys,
                    // Serialize request to store in SessionStorage
                    request,
                }, (_, value) => {
                    if (value instanceof Nimiq.Transaction) {
                        return value.toPlain();
                    }
                    if (value instanceof Uint8Array) {
                        return Nimiq.BufferUtils.toHex(value);
                    }
                    return value;
                }),
            );
        } catch (error) {
            reject(error);
            return;
        }

        resolve({
            success: true,
            eurPubKey,
        });
    }

    run() {
        // Go to start page
        window.location.hash = SignSwap.Pages.CONFIRM_SWAP;
    }
}

SignSwap.Pages = {
    CONFIRM_SWAP: 'confirm-swap',
};
/* global BitcoinRequestParserMixin */
/* global TopLevelApi */
/* global Nimiq */
/* global SignSwap */
/* global Errors */
/* global Iban */

class SignSwapApi extends BitcoinRequestParserMixin(TopLevelApi) {
    /**
     * @param {KeyguardRequest.SignSwapRequest} request
     * @returns {Promise<Parsed<KeyguardRequest.SignSwapRequest>>}
     */
    async parseRequest(request) {
        if (!request) {
            throw new Errors.InvalidRequestError('request is required');
        }

        try {
            sessionStorage.setItem('_test', 'write-access');
            const stored = sessionStorage.getItem('_test');
            if (stored !== 'write-access') throw new Error();
            sessionStorage.removeItem('_test');
        } catch (e) {
            throw new Error('Cannot access browser storage because of privacy settings');
        }

        /** @type {Parsed<KeyguardRequest.SignSwapRequest>} */
        const parsedRequest = {};
        parsedRequest.appName = this.parseAppName(request.appName);
        parsedRequest.keyInfo = await this.parseKeyId(request.keyId);
        if (parsedRequest.keyInfo.type !== Nimiq.Secret.Type.ENTROPY) {
            throw new Errors.InvalidRequestError('Swaps are only supported with modern accounts.');
        }
        parsedRequest.keyLabel = this.parseLabel(request.keyLabel, true, 'keyLabel');

        parsedRequest.swapId = /** @type {string} */ (this.parseLabel(request.swapId, false, 'swapId'));

        if (request.fund.type === request.redeem.type) {
            throw new Errors.InvalidRequestError('Swap must be between two different currencies');
        }

        if (request.fund.type === 'NIM') {
            parsedRequest.fund = {
                type: 'NIM',
                keyPath: this.parsePath(request.fund.keyPath, 'fund.keyPath'),
                transaction: this.parseTransaction({
                    data: new Uint8Array(78), // Dummy, required for CONTRACT_CREATION flag
                    ...request.fund,
                    // Enforced properties
                    recipient: 'CONTRACT_CREATION',
                    recipientType: Nimiq.Account.Type.HTLC,
                    flags: Nimiq.Transaction.Flag.CONTRACT_CREATION,
                }),
                /** @type {string} */
                senderLabel: (this.parseLabel(request.fund.senderLabel, false, 'fund.senderLabel')),
            };
        } else if (request.fund.type === 'BTC') {
            parsedRequest.fund = {
                type: 'BTC',
                inputs: this.parseInputs(request.fund.inputs),
                recipientOutput: {
                    value: this.parsePositiveInteger(
                        request.fund.recipientOutput.value,
                        false,
                        'fund.recipientOutput.value',
                    ),
                },
                changeOutput: this.parseChangeOutput(request.fund.changeOutput, true, 'fund.changeOutput'),
                locktime: request.fund.locktime !== undefined
                    ? this.parseUint32(request.fund.locktime, 'fund.locktime')
                    : undefined,
                refundKeyPath: this.parseBitcoinPath(request.fund.refundKeyPath, 'fund.refundKeyPath'),
                refundAddress: '', // Will be filled out after password entry
            };
            if (parsedRequest.fund.locktime
                && !parsedRequest.fund.inputs.some(({ sequence }) => sequence && sequence < 0xffffffff)) {
                throw new Errors.InvalidRequestError('For locktime to be effective, at least one input must have a '
                    + 'sequence number < 0xffffffff');
            }
        } else if (request.fund.type === 'EUR') {
            parsedRequest.fund = {
                type: 'EUR',
                amount: this.parsePositiveInteger(request.fund.amount, false, 'fund.amount'),
                fee: this.parsePositiveInteger(request.fund.fee, true, 'fund.fee'),
                bankLabel: this.parseLabel(request.fund.bankLabel, true, 'fund.bankLabel'),
            };
        } else {
            throw new Errors.InvalidRequestError('Invalid funding type');
        }

        if (request.redeem.type === 'NIM') {
            parsedRequest.redeem = {
                type: 'NIM',
                keyPath: this.parsePath(request.redeem.keyPath, 'redeem.keyPath'),
                transaction: this.parseTransaction({
                    sender: Nimiq.Address.NULL.toUserFriendlyAddress(), // Dummy
                    ...request.redeem,
                    // Enforced properties
                    senderType: Nimiq.Account.Type.HTLC,
                    recipientType: Nimiq.Account.Type.BASIC,
                    flags: Nimiq.Transaction.Flag.NONE,
                }),
                /** @type {string} */
                recipientLabel: (this.parseLabel(request.redeem.recipientLabel, false, 'recipientLabel')),
            };
        } else if (request.redeem.type === 'BTC') {
            parsedRequest.redeem = {
                type: 'BTC',
                input: {
                    witnessUtxo: {
                        value: this.parsePositiveInteger(request.redeem.input.value, false, 'redeem.input.value'),
                    },
                    keyPath: this.parseBitcoinPath(request.redeem.input.keyPath, 'redeem.input.keyPath'),
                },
                /** @type {KeyguardRequest.BitcoinTransactionChangeOutput} */
                output: (this.parseChangeOutput(request.redeem.output, false, 'redeem.output')),
            };
        } else if (request.redeem.type === 'EUR') {
            parsedRequest.redeem = {
                type: 'EUR',
                keyPath: this.parsePath(request.redeem.keyPath, 'redeem.keyPath'),
                settlement: this.parseOasisSettlementInstruction(request.redeem.settlement, 'redeem.settlement'),
                amount: this.parsePositiveInteger(request.redeem.amount, false, 'redeem.amount'),
                fee: this.parsePositiveInteger(request.redeem.fee, true, 'redeem.fee'),
                bankLabel: this.parseLabel(request.redeem.bankLabel, true, 'redeem.bankLabel'),
            };
        } else {
            throw new Errors.InvalidRequestError('Invalid redeeming type');
        }

        // Parse display data
        parsedRequest.fiatCurrency = /** @type {string} */ (this.parseFiatCurrency(request.fiatCurrency, false));
        parsedRequest.fundingFiatRate = /** @type {number} */ (
            this.parseNonNegativeFiniteNumber(request.fundingFiatRate, false, 'fundingFiatRate'));
        parsedRequest.redeemingFiatRate = /** @type {number} */ (
            this.parseNonNegativeFiniteNumber(request.redeemingFiatRate, false, 'redeemingFiatRate'));
        parsedRequest.fundFees = {
            processing: /** @type {number} */ (
                this.parsePositiveInteger(request.fundFees.processing, true, 'fundFees.processing')),
            redeeming: /** @type {number} */ (
                this.parsePositiveInteger(request.fundFees.redeeming, true, 'fundFees.redeeming')),
        };
        parsedRequest.redeemFees = {
            funding: /** @type {number} */ (
                this.parsePositiveInteger(request.redeemFees.funding, true, 'redeemFees.funding')),
            processing: /** @type {number} */ (
                this.parsePositiveInteger(request.redeemFees.processing, true, 'redeemFees.processing')),
        };
        parsedRequest.serviceSwapFee = /** @type {number} */ (
            this.parsePositiveInteger(request.serviceSwapFee, true, 'serviceSwapFee'));

        parsedRequest.layout = this.parseLayout(request.layout);

        if (request.layout === SignSwapApi.Layouts.SLIDER && parsedRequest.layout === SignSwapApi.Layouts.SLIDER) {
            // SLIDER layout is only allowed for NIM-BTC swaps
            const assets = ['NIM', 'BTC'];
            if (!assets.includes(parsedRequest.fund.type) || !assets.includes(parsedRequest.redeem.type)) {
                throw new Errors.InvalidRequestError(
                    'The \'slider\' layout is only allowed for swaps between NIM and BTC',
                );
            }

            parsedRequest.nimiqAddresses = request.nimiqAddresses.map((address, index) => ({
                address: this.parseAddress(address.address, `nimiqAddresses[${index}].address`).toUserFriendlyAddress(),
                balance: this.parsePositiveInteger(address.balance, true, `nimiqAddresses[${index}].balance`),
            }));
            parsedRequest.bitcoinAccount = {
                balance: this.parsePositiveInteger(request.bitcoinAccount.balance, true, 'bitcoinAccount.balance'),
            };

            const nimAddress = parsedRequest.fund.type === 'NIM'
                ? parsedRequest.fund.transaction.sender.toUserFriendlyAddress()
                : parsedRequest.redeem.type === 'NIM'
                    ? parsedRequest.redeem.transaction.recipient.toUserFriendlyAddress()
                    : ''; // Should never happen, if parsing works correctly
            const activeNimiqAddress = parsedRequest.nimiqAddresses
                .find(addressInfo => addressInfo.address === nimAddress);
            if (!activeNimiqAddress) {
                throw new Errors.InvalidRequestError(
                    'The address details of the NIM address doing the swap must be provided',
                );
            } else if (
                parsedRequest.fund.type === 'NIM'
                && activeNimiqAddress.balance < (
                    parsedRequest.fund.transaction.value + parsedRequest.fund.transaction.fee
                )
            ) {
                throw new Errors.InvalidRequestError('The sending NIM address does not have enough balance');
            }
        }

        return parsedRequest;
    }

    /**
     * Checks that the given layout is valid
     * @param {unknown} layout
     * @returns {KeyguardRequest.SignSwapRequestLayout}
     */
    parseLayout(layout) {
        if (!layout) {
            return SignSwapApi.Layouts.STANDARD;
        }
        // @ts-ignore (Property 'values' does not exist on type 'ObjectConstructor'.)
        if (Object.values(SignSwapApi.Layouts).indexOf(layout) === -1) {
            throw new Errors.InvalidRequestError('Invalid selected layout');
        }
        return /** @type KeyguardRequest.SignSwapRequestLayout */ (layout);
    }

    /**
     * Checks that the given instruction is a valid OASIS SettlementInstruction
     * @param {unknown} obj
     * @param {string} parameterName
     * @returns {Omit<KeyguardRequest.MockSettlementInstruction, 'contractId'> |
     *           Omit<KeyguardRequest.SepaSettlementInstruction, 'contractId'>}
     */
    parseOasisSettlementInstruction(obj, parameterName) {
        if (typeof obj !== 'object' || obj === null) {
            throw new Errors.InvalidRequestError('Invalid settlement');
        }

        switch (/** @type {{type: unknown}} */ (obj).type) {
            case 'mock': {
                /** @type {Omit<KeyguardRequest.MockSettlementInstruction, 'contractId'>} */
                const settlement = {
                    type: 'mock',
                };
                return settlement;
            }
            case 'sepa': {
                const recipient = /** @type {{recipient: unknown}} */ (obj).recipient;
                if (typeof recipient !== 'object' || recipient === null) {
                    throw new Errors.InvalidRequestError('Invalid settlement recipient');
                }

                /** @type {Omit<KeyguardRequest.SepaSettlementInstruction, 'contractId'>} */
                const settlement = {
                    type: 'sepa',
                    recipient: {
                        name: /** @type {string} */ (
                            this.parseLabel(
                                /** @type {{name: unknown}} */ (recipient).name,
                                false,
                                `${parameterName}.recipient.name`,
                            )
                        ),
                        iban: this.parseIban(
                            /** @type {{iban: unknown}} */ (recipient).iban,
                            `${parameterName}.recipient.iban`,
                        ),
                        bic: this.parseBic(
                            /** @type {{bic: unknown}} */ (recipient).bic,
                            `${parameterName}.recipient.bic`,
                        ),
                    },
                };
                return settlement;
            }
            default: throw new Errors.InvalidRequestError('Invalid settlement type');
        }
    }

    /**
     * @param {unknown} iban
     * @param {string} parameterName
     * @returns {string}
     */
    parseIban(iban, parameterName) {
        if (!Iban.isValid(iban)) {
            throw new Errors.InvalidRequestError(`${parameterName} is not a valid IBAN`);
        }
        return Iban.printFormat(/** @type {string} */ (iban), ' ');
    }

    get Handler() {
        return SignSwap;
    }

    /**
     * @param {unknown} bic
     * @param {string} parameterName
     * @returns {string}
     */
    parseBic(bic, parameterName) {
        if (typeof bic !== 'string') {
            throw new Errors.InvalidRequestError(`${parameterName} must be a string`);
        }
        // Regex from https://github.com/jquery-validation/jquery-validation/blob/master/src/additional/bic.js
        if (!/^([A-Z]{6}[A-Z2-9][A-NP-Z1-9])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test(bic)) {
            throw new Errors.InvalidRequestError(`${parameterName} is not a valid BIC`);
        }
        return bic;
    }
}

/**
 * @enum {KeyguardRequest.SignSwapRequestLayout}
 * @readonly
 */
SignSwapApi.Layouts = {
    STANDARD: /** @type {'standard'} */ ('standard'),
    SLIDER: /** @type {'slider'} */ ('slider'),
};
/* global SignSwapApi */
/* global runKeyguard */

runKeyguard(SignSwapApi);
