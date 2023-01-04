class ClipboardUtils { // eslint-disable-line no-unused-vars
    /**
     * @param {string} text
     * @returns {boolean}
     */
    static copy(text) {
        // Simplified and typed version of https://github.com/sindresorhus/copy-text-to-clipboard
        // Additionally added a fix for correctly restoring selections in input fields.
        const element = document.createElement('textarea');

        element.value = text;

        // Prevent keyboard from showing on mobile
        element.setAttribute('readonly', '');

        // @ts-ignore: css property contain not known to current ts version
        element.style.contain = 'strict';
        element.style.position = 'absolute';
        element.style.left = '-9999px';
        element.style.fontSize = '12pt'; // Prevent zooming on iOS

        // store selection to be restored later
        const selection = /** @type {Selection} */ (document.getSelection());
        const originalRange = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

        const activeInput = document.activeElement
        && (document.activeElement.nodeName === 'INPUT' || document.activeElement.nodeName === 'TEXTAREA')
            ? /** @type {HTMLInputElement | HTMLTextAreaElement} */ (document.activeElement)
            : null;

        document.body.append(element);
        element.select();

        // Explicit selection workaround for iOS
        element.selectionStart = 0;
        element.selectionEnd = text.length;

        let isSuccess = false;
        try {
            isSuccess = document.execCommand('copy');
        } catch (e) {} // eslint-disable-line no-empty

        element.remove();

        if (activeInput) {
            // Inputs retain their selection on blur. We just have to refocus again.
            activeInput.focus();
        } else if (originalRange) {
            selection.removeAllRanges();
            selection.addRange(originalRange);
        }

        return isSuccess;
    }
}
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
// Adapted and reduced version of FiatApi.ts from @nimiq/utils
// This file should also be updated whenever FiatApi.ts in @nimiq/utils is updated.
class FiatApi {
    // eslint-disable-next-line valid-jsdoc
    /**
     * @param {Array<FiatApi.SupportedCryptoCurrency>} cryptoCurrencies
     * @param {Array<FiatApi.SupportedFiatCurrency>} vsCurrencies
     * @returns {Promise<Partial<Record<
     *     FiatApi.SupportedCryptoCurrency,
     *     Partial<Record<FiatApi.SupportedFiatCurrency, number>>,
     * >>>}
     */
    static async getExchangeRates(cryptoCurrencies, vsCurrencies) {
        const coinIds = cryptoCurrencies.map(currency => FiatApi.COINGECKO_COIN_IDS[currency]);
        const response = await fetch(
            `${FiatApi.API_URL}/simple/price?ids=${coinIds.join(',')}&vs_currencies=${vsCurrencies.join(',')}`,
        );
        if (!response.ok) throw new Error(`Failed to fetch exchange rates: ${response.status}`);
        const apiResult = await response.json();
        // Map coingecko coin ids back to SupportedCryptoCurrency enum and sanitize retrieved data.
        return cryptoCurrencies.reduce((result, cryptoCurrency) => {
            const record = apiResult[FiatApi.COINGECKO_COIN_IDS[cryptoCurrency]];
            const sanitizedRecord = Object.keys(record).reduce((sanitized, fiatCurrency) => ({
                ...sanitized,
                ...(Object.values(FiatApi.SupportedFiatCurrency).includes(/** @type {any} */ (fiatCurrency))
                    ? { [fiatCurrency]: parseFloat(record[fiatCurrency]) }
                    : null
                ),
            }), {});
            return {
                ...result,
                [cryptoCurrency]: sanitizedRecord,
            };
        }, {});
    }
}

/**
 * @readonly
 * @enum { 'nim' | 'btc' }
 * Crypto currencies supported by the coingecko api that are currently of interest for us.
 */
FiatApi.SupportedCryptoCurrency = {
    NIM: /** @type {'nim'} */ ('nim'),
    BTC: /** @type {'btc'} */ ('btc'),
};

/**
 * @readonly
 * @enum {'aed' | 'ars' | 'aud' | 'bdt' | 'bhd' | 'bmd' | 'brl' | 'cad' | 'chf' | 'clp' | 'cny' | 'czk' | 'dkk' | 'eur'
 *     | 'gbp' | 'hkd' | 'huf' | 'idr' | 'ils' | 'inr' | 'jpy' | 'krw' | 'kwd' | 'lkr' | 'mmk' | 'mxn' | 'myr' | 'nok'
 *     | 'ngn' | 'nzd' | 'php' | 'pkr' | 'pln' | 'rub' | 'sar' | 'sek' | 'sgd' | 'thb' | 'try' | 'twd' | 'uah' | 'usd'
 *     | 'vnd' | 'zar'}
 * Fiat currencies supported by the coingecko api. Note that coingecko supports more vs_currencies (see
 * https://api.coingecko.com/api/v3/simple/supported_vs_currencies) but also includes crypto currencies and ounces of
 * gold amongst others that are not fiat currencies. See FiatApi in @nimiq/utils for how this list was assembled.
 */
FiatApi.SupportedFiatCurrency = {
    AED: /** @type {'aed'} */ ('aed'), // Arab Emirates Dirham
    ARS: /** @type {'ars'} */ ('ars'), // Argentine Peso
    AUD: /** @type {'aud'} */ ('aud'), // Australian Dollar
    BDT: /** @type {'bdt'} */ ('bdt'), // Bangladeshi Taka
    BHD: /** @type {'bhd'} */ ('bhd'), // Bahraini Dinar
    BMD: /** @type {'bmd'} */ ('bmd'), // Bermudan Dollar
    BRL: /** @type {'brl'} */ ('brl'), // Brazilian Real
    CAD: /** @type {'cad'} */ ('cad'), // Canadian Dollar
    CHF: /** @type {'chf'} */ ('chf'), // Swiss Franc
    CLP: /** @type {'clp'} */ ('clp'), // Chilean Peso
    CNY: /** @type {'cny'} */ ('cny'), // Chinese Yuan
    CZK: /** @type {'czk'} */ ('czk'), // Czech Koruna
    DKK: /** @type {'dkk'} */ ('dkk'), // Danish Krone
    EUR: /** @type {'eur'} */ ('eur'), // Euro
    GBP: /** @type {'gbp'} */ ('gbp'), // British Pound
    HKD: /** @type {'hkd'} */ ('hkd'), // Hong Kong Dollar
    HUF: /** @type {'huf'} */ ('huf'), // Hungarian Forint
    IDR: /** @type {'idr'} */ ('idr'), // Indonesian Rupiah
    ILS: /** @type {'ils'} */ ('ils'), // Israeli New Shekel
    INR: /** @type {'inr'} */ ('inr'), // Indian Rupee
    JPY: /** @type {'jpy'} */ ('jpy'), // Japanese Yen
    KRW: /** @type {'krw'} */ ('krw'), // South Korean Won
    KWD: /** @type {'kwd'} */ ('kwd'), // Kuwaiti Dinar
    LKR: /** @type {'lkr'} */ ('lkr'), // Sri Lankan Rupee
    MMK: /** @type {'mmk'} */ ('mmk'), // Burmese Kyat
    MXN: /** @type {'mxn'} */ ('mxn'), // Mexican Peso
    MYR: /** @type {'myr'} */ ('myr'), // Malaysian Ringgit
    NOK: /** @type {'nok'} */ ('nok'), // Norwegian Krone
    NGN: /** @type {'ngn'} */ ('ngn'), // Nigerian Naira
    NZD: /** @type {'nzd'} */ ('nzd'), // New Zealand Dollar
    PHP: /** @type {'php'} */ ('php'), // Philippine Peso
    PKR: /** @type {'pkr'} */ ('pkr'), // Pakistani Rupee
    PLN: /** @type {'pln'} */ ('pln'), // Poland Złoty
    RUB: /** @type {'rub'} */ ('rub'), // Russian Ruble
    SAR: /** @type {'sar'} */ ('sar'), // Saudi Riyal
    SEK: /** @type {'sek'} */ ('sek'), // Swedish Krona
    SGD: /** @type {'sgd'} */ ('sgd'), // Singapore Dollar
    THB: /** @type {'thb'} */ ('thb'), // Thai Baht
    TRY: /** @type {'try'} */ ('try'), // Turkish Lira
    TWD: /** @type {'twd'} */ ('twd'), // New Taiwan Dollar
    UAH: /** @type {'uah'} */ ('uah'), // Ukrainian Hryvnia
    USD: /** @type {'usd'} */ ('usd'), // United States Dollar
    // VEF: /** @type {'vef'} */ ('vef'), // Discontinued Venezuelan Bolívar Fuerte replaced by VES. Rates are off.
    VND: /** @type {'vnd'} */ ('vnd'), // Vietnamese Đồng
    ZAR: /** @type {'zar'} */ ('zar'), // South African Rand
};

/**
 * @readonly
 * Coingecko api url. Note that the origin must be whitelisted in the csp.
 */
FiatApi.API_URL = 'https://api.coingecko.com/api/v3';

/**
 * @readonly
 * Crypto currency tickers mapped to coingecko coin ids.
 */
FiatApi.COINGECKO_COIN_IDS = {
    [FiatApi.SupportedCryptoCurrency.NIM]: 'nimiq-2',
    [FiatApi.SupportedCryptoCurrency.BTC]: 'bitcoin',
};
/* global I18n */
/* global ClipboardUtils */

class Copyable {
    /**
     * @param {string} text
     * @param {HTMLDivElement} [$el]
     */
    constructor(text, $el) {
        this._text = text;
        this._copiedResetTimeout = -1;

        this.$el = Copyable._createElement($el);
        this.$el.addEventListener('click', () => this.copy());
        this.$el.addEventListener('keydown', event => {
            if (event.key !== ' ' /* Space */ && event.key !== 'Enter') return;
            this.copy();
        });
    }

    copy() {
        ClipboardUtils.copy(this._text);

        window.clearTimeout(this._copiedResetTimeout);
        this.$el.classList.add('copied', 'show-tooltip');
        this._copiedResetTimeout = window.setTimeout(
            () => this.$el.classList.remove('copied', 'show-tooltip'),
            Copyable.DISPLAY_TIME,
        );
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
        $element.classList.add('copyable', 'tooltip', 'top', 'disable-auto-tooltip');
        $element.tabIndex = 0;
        const $background = document.createElement('div');
        $background.classList.add('copyable-background');
        $element.appendChild($background);
        const $tooltipBox = document.createElement('div');
        $tooltipBox.classList.add('tooltip-box');
        // Apply the translation via translatePhrase such that the translationValidator finds it and additionally
        // apply the data-i18n attribute such that the translation can be updated on language switch.
        $tooltipBox.textContent = I18n.translatePhrase('copyable-copied');
        $tooltipBox.dataset.i18n = 'copyable-copied';
        $element.appendChild($tooltipBox);
        return $element;
    }
}

Copyable.DISPLAY_TIME = 800;
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
/* global I18n */
/* global Copyable */
/* global Identicon */

class AddressInfo { // eslint-disable-line no-unused-vars
    /**
     * @param {{ userFriendlyAddress: string, label: string?, imageUrl: URL?, accountLabel: string?}} addressInfo
     * @param {boolean} [displayAsCashlink = false]
     */
    constructor(addressInfo, displayAsCashlink = false) {
        this._displayAsCashlink = displayAsCashlink;
        this._addressInfo = addressInfo;
    }

    /**
     * Inserts this AddressInfo into $el overwriting the original content of $el.
     * @param {HTMLElement} $el
     * @param {boolean} [isDetailedView = false]
     */
    renderTo($el, isDetailedView = false) {
        $el = $el || document.createElement('div');
        $el.textContent = '';
        $el.classList.add('address-info');
        $el.classList.toggle('detailed-view', isDetailedView);
        $el.classList.toggle('cashlink', this._displayAsCashlink);

        // identicon
        const $identicon = document.createElement('div');
        $identicon.classList.add('identicon');
        if (this._addressInfo.imageUrl) { // URl is given, use image
            const $shopLogo = document.createElement('img');
            $shopLogo.src = this._addressInfo.imageUrl.href;
            $identicon.appendChild($shopLogo);
            $shopLogo.addEventListener('error', () => {
                $shopLogo.remove();
                // eslint-disable-next-line no-new
                new Identicon(this._addressInfo.userFriendlyAddress, $identicon);
            });
        } else if (this._displayAsCashlink) {
            const $cashlinkIcon = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'svg',
            );
            const cashlinkIconUseTag = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'use',
            );
            cashlinkIconUseTag.setAttributeNS(
                'http://www.w3.org/1999/xlink',
                'xlink:href',
                '/assets/nimiq-style.icons.svg#nq-cashlink',
            );
            $cashlinkIcon.appendChild(cashlinkIconUseTag);
            $cashlinkIcon.classList.add('nq-icon', 'nq-blue-bg');
            $identicon.appendChild($cashlinkIcon);
        } else {
            // eslint-disable-next-line no-new
            new Identicon(this._addressInfo.userFriendlyAddress, $identicon);
        }
        $el.appendChild($identicon);

        // label
        const $label = document.createElement('div');
        $label.classList.add('label');
        if (this._displayAsCashlink) {
            // Apply the translation via translatePhrase such that the translationValidator finds it and additionally
            // apply the data-i18n attribute such that the translation can be updated on language switch.
            $label.textContent = I18n.translatePhrase('address-info-new-cashlink');
            $label.dataset.i18n = 'address-info-new-cashlink';
        } else if (this._addressInfo.label) {
            $label.textContent = this._addressInfo.label;
        } else if (!isDetailedView) {
            $label.textContent = this._addressInfo.userFriendlyAddress;
            $label.classList.add('mono'); // Fira Mono font for address display
        }
        if ($label.textContent) {
            $el.appendChild($label);
        }

        if (isDetailedView) {
            // accountLabel
            // if (this._addressInfo.accountLabel) {
            //     const $accountLabel = document.createElement('div');
            //     $accountLabel.classList.add('account-label', 'nq-label');
            //     $accountLabel.textContent = this._addressInfo.accountLabel;
            //     $el.appendChild($accountLabel);
            // }

            // address
            const $address = document.createElement('div');
            $address.classList.add('address');
            // last space is necessary for the rendering to work properly with white-space: pre-wrap.
            $address.textContent = `${this._addressInfo.userFriendlyAddress} `;
            const copyableAddress = new Copyable(this._addressInfo.userFriendlyAddress, $address);
            $el.appendChild(copyableAddress.getElement());
        }
    }
}
/* global Nimiq */
/* global I18n */
/* global Errors */
/* global TemplateTags */

/** @typedef {{
 *      length: number,
 *      lengthWithLineCaps: number,
 *      gap: number,
 *      offset: number,
 *      strokeWidth: number
 *  }} CircleInfo */

class Timer extends Nimiq.Observable {
    /**
     * @param {number} startTime
     * @param {number} endTime
     * @param {HTMLElement} [$el]
     */
    constructor(startTime, endTime, $el) {
        super();

        this.$el = Timer._createElement($el);
        /** @private
         *  @type {SVGCircleElement} */
        this.$timeCircle = (this.$el.querySelector('.time-circle'));
        /** @private
         *  @type {SVGCircleElement} */
        this.$fillerCircle = (this.$el.querySelector('.filler-circle'));
        /** @private
         *  @type {SVGTextElement} */
        this.$countdown = (this.$el.querySelector('.countdown'));
        /** @private
         *  @type {HTMLDivElement} */
        this.$tooltipCountdown = (this.$el.querySelector('.tooltip-countdown'));

        /** @private
         *  @type {number} */
        this._startTime = startTime;
        /** @private
         *  @type {number} */
        this._endTime = endTime;
        /** @private
         *  @type {number} */
        this._size = Timer.VIEWBOX_SIZE;

        window.setTimeout(() => this.fire(Timer.Events.END, endTime), endTime - Date.now());
        // eslint-disable-next-line no-return-assign
        window.addEventListener('resize', () => this._size = this.$el.offsetWidth);

        requestAnimationFrame(() => {
            this._size = this.$el.offsetWidth;
            this._rerender();
        });
    }

    /**
     * @private
     * @param {HTMLElement} [$el]
     * @returns {HTMLElement}
     */
    static _createElement($el) {
        $el = $el || document.createElement('div');
        $el.classList.add('timer', 'tooltip');
        $el.tabIndex = 0; // make it focusable

        $el.innerHTML = TemplateTags.noVars`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                <circle class="time-circle" cx="50%" cy="50%" r="12"
                        stroke-width="2"></circle>
                <circle class="filler-circle" cx="50%" cy="50%" r="12"
                        stroke-width="0"></circle>

                <text class="countdown" x="50%" y="50%">0</text>
            </svg>
            <div class="tooltip-box">
                <span data-i18n="timer-expiry">This offer expires in</span>
                <span class="tooltip-countdown"></span>.
            </div>
        `;

        I18n.translateDom($el);

        return $el;
    }

    /**
     * @private
     * @returns {number}
     */
    get _totalTime() {
        return Math.max(0, this._endTime - this._startTime);
    }

    /**
     * @private
     * @returns {number}
     */
    get _timeLeft() {
        return Math.max(0, Math.min(this._totalTime, this._endTime - Date.now()));
    }

    /**
     * @private
     * @returns {number}
     */
    get _progress() {
        return 1 - this._timeLeft / this._totalTime;
    }

    /**
     * @private
     * @returns {number}
     */
    get _updateInterval() {
        const scaleFactor = this._size / Timer.VIEWBOX_SIZE;
        const circleLengthPixels = Timer.FULL_CIRCLE_LENGTH * scaleFactor;
        const steps = circleLengthPixels * 3; // update every .33 pixel change for smooth transitions
        const minInterval = 1000 / 60; // up to 60 fps
        // Constrain interval such that we don't skip time steps in the countdown for the respective time unit.
        const timeLeft = this._timeLeft;
        const totalTime = this._totalTime;
        const updatesPerTimeStep = 2; // multiple times per time step to avoid skipping a step by a delayed interval
        let timeStep = 1000; // starting with seconds
        let maxInterval = timeStep / updatesPerTimeStep;
        for (const { factor } of Timer.TIME_STEPS) { // eslint-disable-line no-restricted-syntax
            const nextTimeStep = timeStep * factor;
            const nextMaxInterval = nextTimeStep / updatesPerTimeStep;
            const nextInterval = Math.min(nextMaxInterval, Math.max(minInterval, totalTime / steps));
            if ((timeLeft - nextInterval) / nextTimeStep < 1) {
                // If the time left after nextInterval can't be expressed in nextTimeStep as a value >=1, stop. We check
                // for the time after the next interval to avoid jumping for example from 70s (displayed as 1 minute)
                // directly to 50s if the interval is 20s. Note that the behavior here resembles the one in
                // _toSimplifiedTime.
                if (timeLeft / nextTimeStep > 1) {
                    // If the value before the interval is still >1 in the next time unit still allow a larger jump than
                    // at the smaller time unit but set the maxInterval such that we jump no further than where the
                    // switch to the smaller unit happens, for example jump from 70s to 60s if the interval is 20s.
                    maxInterval = timeLeft - nextTimeStep;
                }
                break;
            }
            timeStep = nextTimeStep;
            maxInterval = nextMaxInterval;
        }

        return Math.min(maxInterval, Math.max(minInterval, this._totalTime / steps));
    }

    /**
     * @private
     * @returns {CircleInfo}
     */
    _calculateTimeCircleInfo() {
        // Have a max length to make it more recognizable that this is a timer by never rendering a full circle.
        // The rounded stroke ending rendered with radius strokeWidth/2 does not count towards the stroke length,
        // therefore to get the desired gap of 1.5 strokeWidths, we use 2.5 strokeWidths.
        const maxLength = Timer.FULL_CIRCLE_LENGTH - 2.5 * Timer.STROKE_WIDTH;
        const length = Math.min(maxLength, (1 - this._progress) * Timer.FULL_CIRCLE_LENGTH);
        const lengthWithLineCaps = length + Timer.STROKE_WIDTH; // add line caps with strokeWidth/2 radius
        const gap = Timer.FULL_CIRCLE_LENGTH - length;
        // The path grows clockwise starting on the right side. Offset by 90 degrees and gap to let path start with gap
        // and end on top.
        const offset = Timer.FULL_CIRCLE_LENGTH / 4 - gap;
        return {
            length,
            lengthWithLineCaps,
            gap,
            offset,
            strokeWidth: Timer.STROKE_WIDTH,
        };
    }

    /**
     * @private
     * @param {CircleInfo} timeCircleInfo
     * @returns {CircleInfo}
     */
    _calculateFillerCircleInfo(timeCircleInfo) {
        // Filler circle should be rendered in the gap left by the time circle with a margin of strokeWidth. If there
        // is not enough space, compensate by reducing the filler circle stroke width.
        const availableSpace = Timer.FULL_CIRCLE_LENGTH - timeCircleInfo.lengthWithLineCaps - 2 * Timer.STROKE_WIDTH;
        const lengthWithLineCaps = Math.max(0, availableSpace);
        const strokeWidth = Math.min(Timer.STROKE_WIDTH, lengthWithLineCaps);
        const length = Math.max(0, lengthWithLineCaps - strokeWidth); // subtract rounded line caps
        const gap = Timer.FULL_CIRCLE_LENGTH - length;
        const offset = Timer.FULL_CIRCLE_LENGTH / 4 // rotate by 90 degrees
            - Timer.STROKE_WIDTH / 2 // skip rounded line cap of time circle
            - Timer.STROKE_WIDTH // margin
            - strokeWidth / 2; // account for our own line cap
        return {
            length,
            lengthWithLineCaps,
            gap,
            offset,
            strokeWidth,
        };
    }

    /** @private */
    _rerender() {
        const timeCircleInfo = this._calculateTimeCircleInfo();
        this.$timeCircle.style.strokeDasharray = `${timeCircleInfo.length} ${timeCircleInfo.gap}`;
        this.$timeCircle.style.strokeDashoffset = timeCircleInfo.offset.toString();

        const fillerCircleInfo = this._calculateFillerCircleInfo(timeCircleInfo);
        this.$fillerCircle.style.strokeDasharray = `${fillerCircleInfo.length} ${fillerCircleInfo.gap}`;
        this.$fillerCircle.style.strokeDashoffset = fillerCircleInfo.offset.toString();
        this.$fillerCircle.style.strokeWidth = fillerCircleInfo.strokeWidth.toString();

        this.$el.classList.toggle('little-time-left', this._progress >= 0.75);

        this.$countdown.textContent = this._toSimplifiedTime(false);
        this.$tooltipCountdown.textContent = this._toSimplifiedTime(true);

        if (this._timeLeft === 0) return;
        setTimeout(() => this._rerender(), this._updateInterval);
    }

    /**
     * @private
     * @param {boolean} [includeUnit=true]
     * @returns {string}
     */
    _toSimplifiedTime(includeUnit = true) {
        // find appropriate unit, starting with second
        let resultTime = this._timeLeft / 1000;
        let resultUnit = 'second';
        for (const { unit, factor } of Timer.TIME_STEPS) { // eslint-disable-line no-restricted-syntax
            if (resultTime / factor < 1) break;
            resultTime /= factor;
            resultUnit = unit;
        }

        resultTime = Math.floor(resultTime);
        if (!includeUnit) {
            return resultTime.toString();
        }

        resultUnit = `${resultUnit}${resultTime !== 1 ? 's' : ''}`;
        let translatedUnit;
        // Specifically listing all possible i18n translations to enable the translationValidator to find and verify
        // them with its regular expression.
        switch (resultUnit) {
            case 'second': translatedUnit = I18n.translatePhrase('timer-second'); break;
            case 'seconds': translatedUnit = I18n.translatePhrase('timer-seconds'); break;
            case 'minute': translatedUnit = I18n.translatePhrase('timer-minute'); break;
            case 'minutes': translatedUnit = I18n.translatePhrase('timer-minutes'); break;
            case 'hour': translatedUnit = I18n.translatePhrase('timer-hour'); break;
            case 'hours': translatedUnit = I18n.translatePhrase('timer-hours'); break;
            case 'day': translatedUnit = I18n.translatePhrase('timer-day'); break;
            case 'days': translatedUnit = I18n.translatePhrase('timer-days'); break;
            default: throw new Errors.KeyguardError(`Unexpected: Unknown time unit ${resultUnit}`);
        }

        return `${resultTime} ${translatedUnit}`;
    }
}

Timer.Events = {
    END: 'end',
};
Timer.TIME_STEPS = [
    { unit: 'minute', factor: 60 },
    { unit: 'hour', factor: 60 },
    { unit: 'day', factor: 24 },
];
// These values are the same as in the svg.
Timer.STROKE_WIDTH = 2;
Timer.VIEWBOX_SIZE = 26;
Timer.RADIUS = 12; // This component is a simplified version of Timer in vue-components with always expanded radius
Timer.FULL_CIRCLE_LENGTH = 2 * Math.PI * Timer.RADIUS;
/* global I18n */
/* global TemplateTags */
/* global NumberFormatting */
/* global FiatApi */
/* global AddressInfo */
/* global Timer */

/** @typedef {{
 *      recipient: string,
 *      label?: string,
 *      imageUrl?: URL,
 *      amount: number,
 *      currency: 'nim' | 'btc',
 *      unitsToCoins: (units: number) => number,
 *      networkFee: number,
 *      fiatAmount?: number,
 *      fiatCurrency?: string,
 *      vendorMarkup?: number,
 *      time?: number,
 *      expires?: number
 *  }} PaymentInfo */

class PaymentInfoLine { // eslint-disable-line no-unused-vars
    /**
     * @param {PaymentInfo} paymentInfo
     * @param {HTMLElement} [$el]
     */
    constructor(paymentInfo, $el) {
        this.paymentInfo = paymentInfo;
        this.$el = PaymentInfoLine._createElement($el);

        /** @type HTMLElement */
        const $amount = (this.$el.querySelector('.amount'));
        const amount = NumberFormatting.formatNumber(
            paymentInfo.unitsToCoins(paymentInfo.amount),
            paymentInfo.currency === 'nim' ? 4 : 7,
        );
        $amount.textContent = `${amount} ${paymentInfo.currency.toUpperCase()}`;

        this._createPriceTooltip(/** @type {HTMLElement} */ (this.$el.querySelector('.amounts')));

        const recipientInfo = new AddressInfo({
            userFriendlyAddress: paymentInfo.recipient,
            label: paymentInfo.label || null,
            imageUrl: paymentInfo.imageUrl || null,
            accountLabel: null,
        });
        recipientInfo.renderTo(/** @type HTMLElement */ (this.$el.querySelector('.recipient')));

        /** @type HTMLElement */
        const $timer = (this.$el.querySelector('.timer'));
        if (paymentInfo.time && paymentInfo.expires) {
            new Timer(paymentInfo.time, paymentInfo.expires, $timer); // eslint-disable-line no-new
        } else {
            $timer.remove();
        }
    }

    /**
     * @private
     * @param {HTMLElement} [$el]
     * @returns {HTMLElement}
     */
    static _createElement($el) {
        $el = $el || document.createElement('div');
        $el.classList.add('payment-info-line');

        $el.innerHTML = TemplateTags.noVars`
            <div class="amounts">
                <div class="amount"></div>
            </div>
            <div class="arrow-runway">
                <svg class="nq-icon">
                    <use xlink:href="/assets/nimiq-style.icons.svg#nq-arrow-right-small"/>
                </svg>
            </div>
            <div class="recipient"></div>
            <div class="timer"></div>
        `;

        return $el;
    }

    /**
     * @protected
     * @param {HTMLElement} $container
     */
    _createPriceTooltip($container) {
        // eslint-disable-next-line object-curly-newline
        const { fiatAmount, fiatCurrency, vendorMarkup, amount, networkFee } = this.paymentInfo;
        if (!fiatAmount || !fiatCurrency) return;

        const $tooltip = document.createElement('div');
        $tooltip.classList.add('price-tooltip', 'tooltip');
        $tooltip.tabIndex = 0; // make the tooltip focusable

        /* eslint-disable indent */
        $tooltip.innerHTML = TemplateTags.hasVars(1)`
            <svg class="warning-triangle nq-icon">
                <use xlink:href="/assets/nimiq-style.icons.svg#nq-alert-triangle"/>
            </svg>
            <span class="fiat-amount"></span>
            <div class="tooltip-box">
                <div class="price-breakdown">
                    <label data-i18n="payment-info-line-order-amount">Order amount</label>
                    <div class="fiat-amount"></div>
                    <template class="vendor-markup-template">
                        ${!vendorMarkup || vendorMarkup >= 0
                            ? '<label data-i18n="payment-info-line-vendor-markup">Vendor crypto markup</label>'
                            : '<label data-i18n="payment-info-line-vendor-discount">Vendor crypto discount</label>'
                        }
                        <div class="vendor-markup"></div>
                    </template>
                    <label class="highlight-on-bad-rate" data-i18n="payment-info-line-effective-rate">
                        Effective rate
                    </label>
                    <div class="effective-rate highlight-on-bad-rate"></div>
                </div>
                <div class="rate-info info highlight-on-bad-rate"></div>
                <div class="free-service-info info" data-i18n="payment-info-line-free-service">
                    Nimiq provides this service free of charge.
                </div>
                <hr>
                <div class="price-breakdown">
                    <label data-i18n="payment-info-line-total">Total</label>
                    <div class="total"></div>
                </div>
                <div class="network-fee-info info">
                    + <span class="network-fee"></span>
                    <span data-i18n="payment-info-line-network-fee">network fee</span>
                </div>
            </div>
        `;
        /* eslint-enable indent */

        I18n.translateDom($tooltip);

        const formattedFiatAmount = NumberFormatting.formatCurrency(fiatAmount, fiatCurrency);
        $tooltip.querySelectorAll('.fiat-amount').forEach($fiatAmount => {
            $fiatAmount.textContent = formattedFiatAmount;
        });

        /** @type {HTMLTemplateElement} */
        const $vendorMarkupTemplate = ($tooltip.querySelector('.vendor-markup-template'));
        if (vendorMarkup !== undefined) {
            // Convert to percent and round to two decimals. Always ceil to avoid displaying a lower fee than charged or
            // larger discount than applied. Subtract small epsilon to avoid that numbers get rounded up as a result of
            // floating point imprecision after multiplication. Otherwise formatting for example .07 results in 7.01%.
            const vendorMarkupPercent = Math.ceil(vendorMarkup * 100 * 100 - 1e-10) / 100;
            $vendorMarkupTemplate.replaceWith($vendorMarkupTemplate.content);
            /** @type {HTMLElement} */
            const $vendorMarkup = ($tooltip.querySelector('.vendor-markup'));
            $vendorMarkup.textContent = `${vendorMarkup >= 0 ? '+' : ''}${vendorMarkupPercent}%`;
        } else {
            $vendorMarkupTemplate.remove();
        }

        const ticker = this.paymentInfo.currency.toUpperCase();

        /** @type {HTMLElement} */
        const $effectiveRate = ($tooltip.querySelector('.effective-rate'));
        // Fiat/crypto rate. Higher fiat/crypto rate means user is paying less crypto for the requested fiat amount
        // and is therefore better for the user. Note: precision loss should be acceptable here.
        const effectiveRate = fiatAmount / this.paymentInfo.unitsToCoins(amount);
        $effectiveRate.textContent = `${NumberFormatting.formatCurrency(
            effectiveRate,
            fiatCurrency,
            0.0001,
        )} / ${ticker}`;

        /** @type {HTMLElement} */
        const $total = ($tooltip.querySelector('.total'));
        $total.textContent = `${NumberFormatting.formatNumber(this.paymentInfo.unitsToCoins(amount))} ${ticker}`;

        // Note that in the Keyguard the fee is never undefined.
        if (networkFee !== 0) {
            /** @type {HTMLElement} */
            const $networkFee = ($tooltip.querySelector('.network-fee'));
            $networkFee.textContent = `${NumberFormatting.formatNumber(
                this.paymentInfo.unitsToCoins(networkFee),
            )} ${ticker}`;
        } else {
            /** @type {HTMLElement} */
            const $networkFeeInfo = ($tooltip.querySelector('.network-fee-info'));
            $networkFeeInfo.remove();
        }

        /** @type {HTMLElement} */
        const $rateInfo = ($tooltip.querySelector('.rate-info'));
        const updateRateComparison = this._updateRateComparison.bind(this, effectiveRate, $tooltip, $rateInfo);
        updateRateComparison();
        window.setInterval(updateRateComparison, PaymentInfoLine.REFERENCE_RATE_UPDATE_INTERVAL);
        I18n.observer.on(I18n.Events.LANGUAGE_CHANGED, updateRateComparison);

        $container.appendChild($tooltip);
    }

    /**
     * @protected
     * @param {number} effectiveRate
     * @param {HTMLElement} $tooltip
     * @param {HTMLElement} $rateInfo
     */
    async _updateRateComparison(effectiveRate, $tooltip, $rateInfo) {
        if (!this.paymentInfo.fiatCurrency) return;
        /** @type {FiatApi.SupportedFiatCurrency} */
        const fiatCurrency = (this.paymentInfo.fiatCurrency.toLowerCase());
        if (!Object.values(FiatApi.SupportedFiatCurrency).includes(fiatCurrency)) return;

        let referenceRate;
        try {
            /* eslint-disable object-curly-spacing */
            const {[this.paymentInfo.currency]: currencyRecord} = await FiatApi.getExchangeRates(
                [this.paymentInfo.currency],
                [fiatCurrency],
            );
            if (!currencyRecord) return;
            ({[fiatCurrency]: referenceRate} = currencyRecord);
            /* eslint-enable object-curly-spacing */
            if (typeof referenceRate !== 'number') return;
        } catch (e) {
            return;
        }

        // Compare rates. Convert them from fiat/crypto to crypto/fiat as the user will be paying crypto in the end
        // and the flipped rates can therefore be compared more intuitively. Negative rate deviation is better for
        // the user.
        const flippedEffectiveRate = 1 / effectiveRate;
        const flippedReferenceRate = 1 / referenceRate;
        const rateDeviation = (flippedEffectiveRate - flippedReferenceRate) / flippedReferenceRate;

        const isBadRate = rateDeviation >= PaymentInfoLine.RATE_DEVIATION_THRESHOLD
            || (!!this.paymentInfo.vendorMarkup
                && this.paymentInfo.vendorMarkup < 0 // verify promised discount
                && rateDeviation >= this.paymentInfo.vendorMarkup + PaymentInfoLine.RATE_DEVIATION_THRESHOLD
            );
        $tooltip.classList.toggle('bad-rate', isBadRate);

        if (isBadRate || Math.abs(rateDeviation) >= PaymentInfoLine.RATE_DEVIATION_THRESHOLD) {
            let rateInfo;
            if (rateDeviation < 0 && isBadRate) {
                // False discount
                rateInfo = I18n.translatePhrase('payment-info-line-actual-discount');
            } else if (rateDeviation >= 0) {
                rateInfo = I18n.translatePhrase('payment-info-line-paying-more');
            } else {
                rateInfo = I18n.translatePhrase('payment-info-line-paying-less');
            }

            // Converted to absolute percent, rounded to one decimal
            const formattedRateDeviation = `${Math.round(Math.abs(rateDeviation) * 100 * 10) / 10}%`;
            $rateInfo.textContent = rateInfo.replace('%RATE_DEVIATION%', formattedRateDeviation);

            $rateInfo.style.display = 'block';
        } else {
            $rateInfo.style.display = 'none';
        }
    }
}

PaymentInfoLine.RATE_DEVIATION_THRESHOLD = 0.1;
PaymentInfoLine.REFERENCE_RATE_UPDATE_INTERVAL = 30000;
/* global Nimiq */
/* global Key */
/* global KeyStore */
/* global SignTransactionApi */
/* global PasswordBox */
/* global SignTransactionApi */
/* global Errors */
/* global Utf8Tools */
/* global TopLevelApi */
/* global AddressInfo */
/* global PaymentInfoLine */
/* global Constants */
/* global NumberFormatting */
/* global I18n */

/**
 * @callback SignTransaction.resolve
 * @param {KeyguardRequest.SignTransactionResult} result
 */

class SignTransaction {
    /**
     * @param {Parsed<KeyguardRequest.SignTransactionRequest>} request
     * @param {SignTransaction.resolve} resolve
     * @param {reject} reject
     */
    constructor(request, resolve, reject) {
        this._request = request;
        /** @type {HTMLElement} */
        this.$el = (document.getElementById(SignTransaction.Pages.CONFIRM_TRANSACTION));
        this.$el.classList.add(request.layout);

        const transaction = request.transaction;

        /** @type {HTMLElement} */
        this.$accountDetails = (this.$el.querySelector('#account-details'));

        /** @type {HTMLLinkElement} */
        const $sender = (this.$el.querySelector('.accounts .sender'));
        this._senderAddressInfo = new AddressInfo({
            userFriendlyAddress: transaction.sender.toUserFriendlyAddress(),
            label: request.senderLabel || null,
            imageUrl: null,
            accountLabel: request.keyLabel || null,
        });
        this._senderAddressInfo.renderTo($sender);
        $sender.addEventListener('click', () => {
            this._openDetails(this._senderAddressInfo);
        });

        /** @type {HTMLLinkElement} */
        const $recipient = (this.$el.querySelector('.accounts .recipient'));
        const recipientAddress = transaction.recipient.toUserFriendlyAddress();
        /* eslint-disable no-nested-ternary */
        const recipientLabel = 'shopOrigin' in request && !!request.shopOrigin
            ? request.shopOrigin.split('://')[1]
            : 'recipientLabel' in request && !!request.recipientLabel
                ? request.recipientLabel
                : null;
        /* eslint-enable no-nested-ternary */
        const recipientImage = 'shopLogoUrl' in request && !!request.shopLogoUrl
            ? request.shopLogoUrl
            : null;
        this._recipientAddressInfo = new AddressInfo({
            userFriendlyAddress: recipientAddress,
            label: recipientLabel,
            imageUrl: recipientImage,
            accountLabel: null,
        }, request.layout === SignTransactionApi.Layouts.CASHLINK);
        this._recipientAddressInfo.renderTo($recipient);
        if (request.layout !== SignTransactionApi.Layouts.CASHLINK) {
            $recipient.addEventListener('click', () => {
                this._openDetails(this._recipientAddressInfo);
            });
        }

        /** @type {HTMLElement} */
        const $paymentInfoLine = (this.$el.querySelector('.payment-info-line'));
        if (request.layout === SignTransactionApi.Layouts.CHECKOUT) {
            // eslint-disable-next-line no-new
            new PaymentInfoLine(Object.assign({}, request, {
                recipient: recipientAddress,
                label: recipientLabel || recipientAddress,
                imageUrl: request.shopLogoUrl,
                amount: request.transaction.value,
                currency: /** @type {'nim'} */ ('nim'),
                unitsToCoins: Nimiq.Policy.lunasToCoins,
                networkFee: request.transaction.fee,
            }), $paymentInfoLine);
        } else {
            $paymentInfoLine.remove();
        }

        /** @type {HTMLButtonElement} */
        const $closeDetails = (this.$accountDetails.querySelector('#close-details'));
        $closeDetails.addEventListener('click', this._closeDetails.bind(this));

        /** @type {HTMLDivElement} */
        const $value = (this.$el.querySelector('#value'));
        /** @type {HTMLDivElement} */
        const $fee = (this.$el.querySelector('#fee'));
        /** @type {HTMLDivElement} */
        const $data = (this.$el.querySelector('#data'));

        // Set value and fee.
        $value.textContent = NumberFormatting.formatNumber(Nimiq.Policy.lunasToCoins(transaction.value));
        if ($fee && transaction.fee > 0) {
            $fee.textContent = NumberFormatting.formatNumber(Nimiq.Policy.lunasToCoins(transaction.fee));
            /** @type {HTMLDivElement} */
            const $feeSection = (this.$el.querySelector('.fee-section'));
            $feeSection.classList.remove('display-none');
        }

        if (request.layout === SignTransactionApi.Layouts.CASHLINK
         && Nimiq.BufferUtils.equals(transaction.data, Constants.CASHLINK_FUNDING_DATA)) {
            if (request.cashlinkMessage) {
                $data.textContent = request.cashlinkMessage;
                /** @type {HTMLDivElement} */
                const $dataSection = (this.$el.querySelector('.data-section'));
                $dataSection.classList.remove('display-none');
            }
        } else if ($data && transaction.data.byteLength > 0) {
            // Set transaction extra data.
            $data.textContent = this._formatData(transaction);
            /** @type {HTMLDivElement} */
            const $dataSection = (this.$el.querySelector('.data-section'));
            $dataSection.classList.remove('display-none');
        }

        // Set up password box.
        /** @type {HTMLFormElement} */
        const $passwordBox = (document.querySelector('#password-box'));
        this._passwordBox = new PasswordBox($passwordBox, {
            hideInput: !request.keyInfo.encrypted,
            buttonI18nTag: request.layout === SignTransactionApi.Layouts.CASHLINK
                ? 'passwordbox-create-cashlink'
                : 'passwordbox-confirm-tx',
            minLength: request.keyInfo.hasPin ? Key.PIN_LENGTH : undefined,
        });

        this._passwordBox.on(
            PasswordBox.Events.SUBMIT,
            /** @param {string} [password] */ password => {
                this._onConfirm(request, resolve, reject, password);
            },
        );

        if ('expires' in request && request.expires) {
            setTimeout(() => reject(new Errors.RequestExpired()), request.expires - Date.now());
        }
    }

    /**
     * @param {AddressInfo} which
     */
    _openDetails(which) {
        which.renderTo(
            /** @type {HTMLElement} */(this.$accountDetails.querySelector('#details')),
            true,
        );
        this.$el.classList.add('account-details-open');
    }

    _closeDetails() {
        this.$el.classList.remove('account-details-open');
    }

    /**
     * @param {Parsed<KeyguardRequest.SignTransactionRequest>} request
     * @param {SignTransaction.resolve} resolve
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
        const signature = key.sign(request.keyPath, request.transaction.serializeContent());

        /** @type {KeyguardRequest.SignTransactionResult} */
        const result = {
            publicKey: publicKey.serialize(),
            signature: signature.serialize(),
        };
        resolve(result);
    }

    run() {
        // Go to start page
        window.location.hash = SignTransaction.Pages.CONFIRM_TRANSACTION;
    }

    /**
     * @param {Nimiq.Transaction} transaction
     * @returns {string}
     */
    _formatData(transaction) {
        if (Nimiq.BufferUtils.equals(transaction.data, Constants.CASHLINK_FUNDING_DATA)) {
            return I18n.translatePhrase('funding-cashlink');
        }

        if (transaction.hasFlag(Nimiq.Transaction.Flag.CONTRACT_CREATION)) {
            // TODO: Decode contract creation transactions
            // return ...
        }

        return Utf8Tools.isValidUtf8(transaction.data)
            ? Utf8Tools.utf8ByteArrayToString(transaction.data)
            : Nimiq.BufferUtils.toHex(transaction.data);
    }
}

SignTransaction.Pages = {
    CONFIRM_TRANSACTION: 'confirm-transaction',
};
/* global I18n */
/* global TopLevelApi */
/* global SignTransaction */
/* global Errors */

/** @extends {TopLevelApi<KeyguardRequest.SignTransactionRequest>} */
class SignTransactionApi extends TopLevelApi {
    /**
     * @param {KeyguardRequest.SignTransactionRequest} request
     * @returns {Promise<Parsed<KeyguardRequest.SignTransactionRequest>>}
     */
    async parseRequest(request) {
        if (!request) {
            throw new Errors.InvalidRequestError('request is required');
        }

        /** @type {Parsed<KeyguardRequest.SignTransactionRequest>} */
        const parsedRequest = {};
        parsedRequest.appName = this.parseAppName(request.appName);
        parsedRequest.keyInfo = await this.parseKeyId(request.keyId);
        parsedRequest.keyLabel = this.parseLabel(request.keyLabel);
        parsedRequest.keyPath = this.parsePath(request.keyPath, 'keyPath');
        parsedRequest.senderLabel = this.parseLabel(request.senderLabel);
        parsedRequest.transaction = this.parseTransaction(request);
        parsedRequest.layout = this.parseLayout(request.layout);
        if ((!request.layout || request.layout === SignTransactionApi.Layouts.STANDARD)
            && parsedRequest.layout === SignTransactionApi.Layouts.STANDARD) {
            parsedRequest.recipientLabel = this.parseLabel(request.recipientLabel);
        } else if (request.layout === SignTransactionApi.Layouts.CHECKOUT
            && parsedRequest.layout === SignTransactionApi.Layouts.CHECKOUT) {
            parsedRequest.shopOrigin = this.parseShopOrigin(request.shopOrigin);
            parsedRequest.shopLogoUrl = this.parseShopLogoUrl(request.shopLogoUrl);
            if (parsedRequest.shopLogoUrl && parsedRequest.shopLogoUrl.origin !== parsedRequest.shopOrigin) {
                throw new Errors.InvalidRequestError('origin of shopLogoUrl must be same as shopOrigin');
            }

            parsedRequest.fiatAmount = this.parseNonNegativeFiniteNumber(request.fiatAmount);
            parsedRequest.fiatCurrency = this.parseFiatCurrency(request.fiatCurrency);
            if ((parsedRequest.fiatAmount === undefined) !== (parsedRequest.fiatCurrency === undefined)) {
                throw new Errors.InvalidRequestError('fiatAmount and fiatCurrency must be both defined or undefined.');
            }

            parsedRequest.vendorMarkup = this.parseVendorMarkup(request.vendorMarkup);

            parsedRequest.time = this.parseNonNegativeFiniteNumber(request.time);
            parsedRequest.expires = this.parseNonNegativeFiniteNumber(request.expires);
            if (parsedRequest.expires !== undefined) {
                if (parsedRequest.time === undefined) {
                    throw new Errors.InvalidRequestError('If `expires` is given, `time` must be given too.');
                } else if (parsedRequest.time >= parsedRequest.expires) {
                    throw new Errors.InvalidRequestError('`expires` must be greater than `time`');
                }
            }
        } else if (request.layout === SignTransactionApi.Layouts.CASHLINK
            && parsedRequest.layout === SignTransactionApi.Layouts.CASHLINK
            && request.cashlinkMessage) {
            parsedRequest.cashlinkMessage = /** @type {string} */(this.parseMessage(request.cashlinkMessage));
        }

        return parsedRequest;
    }

    /**
     * Checks that the given layout is valid
     * @param {unknown} layout
     * @returns {KeyguardRequest.SignTransactionRequestLayout}
     */
    parseLayout(layout) {
        if (!layout) {
            return SignTransactionApi.Layouts.STANDARD;
        }
        // @ts-ignore (Property 'values' does not exist on type 'ObjectConstructor'.)
        if (Object.values(SignTransactionApi.Layouts).indexOf(layout) === -1) {
            throw new Errors.InvalidRequestError('Invalid selected layout');
        }
        return /** @type KeyguardRequest.SignTransactionRequestLayout */ (layout);
    }

    get Handler() {
        return SignTransaction;
    }

    /**
     * @param {Parsed<KeyguardRequest.SignTransactionRequest>} parsedRequest
     */
    async onBeforeRun(parsedRequest) {
        if (parsedRequest.layout === SignTransactionApi.Layouts.CHECKOUT) {
            this.enableGlobalCloseButton(I18n.translatePhrase('sign-tx-cancel-payment'));
        }
    }
}

/**
 * @enum {KeyguardRequest.SignTransactionRequestLayout}
 * @readonly
 */
SignTransactionApi.Layouts = {
    STANDARD: /** @type {'standard'} */ ('standard'),
    CHECKOUT: /** @type {'checkout'} */ ('checkout'),
    CASHLINK: /** @type {'cashlink'} */ ('cashlink'),
};
/* global SignTransactionApi */
/* global runKeyguard */

runKeyguard(SignTransactionApi);
