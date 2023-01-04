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
class PasswordStrength {
    /**
     * Scores below 40 are considered 'weak', scores from 75 are 'strong',
     * scores above 150 are 'secure'.
     *
     * @param {string} password
     * @param {number} [minLength = 8]
     * @returns {number}
     */
    static strength(password, minLength = 8) {
        /*
        The code for this password strength function was taken (and adapted) from
        https://github.com/nourabusoud/password-genie and usage is granted under
        the following MIT license:

        Copyright (c) 2018 Nour Soud

        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.
        */

        const count = {
            excess: 0,
            upperCase: 0,
            numbers: 0,
            symbols: 0,
        };

        const weight = {
            excess: 3,
            upperCase: 4,
            numbers: 5,
            symbols: 5,
            combo: 0,
            flatLower: 0,
            flatNumber: 0,
        };

        const baseScore = 30;

        for (let i = 0; i < password.length; i++) {
            if (password.charAt(i).match(/[A-Z]/g)) { count.upperCase += 1; }
            if (password.charAt(i).match(/[0-9]/g)) { count.numbers += 1; }
            if (password.charAt(i).match(/(.*[!,@,#,$,%,^,&,*,?,_,~])/)) { count.symbols += 1; }
        }

        count.excess = password.length - minLength;

        if (count.upperCase && count.numbers && count.symbols) {
            weight.combo = 25;
        } else if ((count.upperCase && count.numbers)
            || (count.upperCase && count.symbols)
            || (count.numbers && count.symbols)) {
            weight.combo = 15;
        }

        if (password.match(/^[\sa-z]+$/)) {
            weight.flatLower = -30;
        }

        if (password.match(/^[\s0-9]+$/)) {
            weight.flatNumber = -50;
        }

        const score = baseScore
            + (count.excess * weight.excess)
            + (count.upperCase * weight.upperCase)
            + (count.numbers * weight.numbers)
            + (count.symbols * weight.symbols)
            + weight.combo
            + weight.flatLower
            + weight.flatNumber;

        return score;
    }
}

/** @type {{[score: string]: number}} */
PasswordStrength.Score = {
    MINIMUM: 40,
    STRONG: 75,
    SECURE: 150,
};
/* eslint-disable block-scoped-var, no-var, vars-on-top, no-redeclare, eqeqeq, no-continue, func-names, no-bitwise, no-mixed-operators, valid-jsdoc, no-use-before-define, max-len, no-nested-ternary */

class QrEncoder {
    /**
     * Library interface
     * @param {QrEncoderConfig} config
     */
    static render(config) {
        return this._qrCodeGenerator(config);
    }

    /**
     * Register the plugin
     * @param {QrEncoderConfig} options
     */
    static _qrCodeGenerator(options) {
        /** @type {QrEncoderSettings} */
        const settings = ({});
        Object.assign(settings, this.defaults, options);
        return this._createCanvas(settings);
    }

    /*! jquery-qrcode v0.14.0 - https://larsjung.de/jquery-qrcode/ */

    // Wrapper for the original QR code generator.
    /**
     * @param {string} text
     * @param {string} level
     * @param {number} version
     * @param {number} quiet
     */
    static _createQRCode(text, level, version, quiet) {
        const qr = {};

        const vqr = this.vendor_qrcode(version, level);
        vqr.addData(text);
        vqr.make();

        quiet = quiet || 0;

        const qrModuleCount = vqr.getModuleCount();
        const quietModuleCount = vqr.getModuleCount() + 2 * quiet;

        /**
         * @param {number} row
         * @param {number} col
         */
        function isDark(row, col) {
            row -= quiet;
            col -= quiet;

            if (row < 0 || row >= qrModuleCount || col < 0 || col >= qrModuleCount) {
                return false;
            }
            return vqr.isDark(row, col);
        }

        qr.text = text;
        qr.level = level;
        qr.version = version;
        qr.moduleCount = quietModuleCount;
        qr.isDark = isDark;
        //        qr.addBlank = addBlank;

        return qr;
    }

    // Returns a minimal QR code for the given text starting with version `minVersion`.
    // Returns `undefined` if `text` is too long to be encoded in `maxVersion`.
    /**
     * @param {string} text
     * @param {string} level
     * @param {number} minVersion
     * @param {number} maxVersion
     * @param {number} quiet
     */
    static _createMinQRCode(text, level, minVersion, maxVersion, quiet) {
        minVersion = Math.max(1, minVersion || 1);
        maxVersion = Math.min(40, maxVersion || 40);
        for (let version = minVersion; version <= maxVersion; version += 1) {
            try {
                return this._createQRCode(text, level, version, quiet);
            } catch (err) { } // eslint-disable-line no-empty
        }
        return undefined;
    }

    /**
     * @param {any} qr
     * @param {CanvasRenderingContext2D} context
     * @param {QrEncoderSettings} settings
     */
    static _drawBackground(qr, context, settings) {
        if (settings.background) {
            context.fillStyle = settings.background;
            context.fillRect(settings.left, settings.top, settings.size, settings.size);
        }
    }

    // used when center is filled
    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} l
     * @param {number} t
     * @param {number} r
     * @param {number} b
     * @param {number} rad
     * @param {boolean} nw
     * @param {boolean} ne
     * @param {boolean} se
     * @param {boolean} sw
     */
    static _drawModuleRoundedDark(ctx, l, t, r, b, rad, nw, ne, se, sw) {
        // let moveTo = (x, y) => ctx.moveTo(Math.floor(x), Math.floor(y));
        if (nw) {
            ctx.moveTo(l + rad, t);
        } else {
            ctx.moveTo(l, t);
        }

        /**
         * @param {boolean} b_
         * @param {number} x0
         * @param {number} y0
         * @param {number} x1
         * @param {number} y1
         * @param {number} r0
         * @param {number} r1
         */
        function lal(b_, x0, y0, x1, y1, r0, r1) {
            if (b_) {
                ctx.lineTo(x0 + r0, y0 + r1);
                ctx.arcTo(x0, y0, x1, y1, rad);
            } else {
                ctx.lineTo(x0, y0);
            }
        }

        lal(ne, r, t, r, b, -rad, 0);
        lal(se, r, b, l, b, 0, -rad);
        lal(sw, l, b, l, t, rad, 0);
        lal(nw, l, t, r, t, 0, rad);
    }

    // used when center is empty
    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} l
     * @param {number} t
     * @param {number} r
     * @param {number} b
     * @param {number} rad
     * @param {boolean} nw
     * @param {boolean} ne
     * @param {boolean} se
     * @param {boolean} sw
     */
    static _drawModuleRoundendLight(ctx, l, t, r, b, rad, nw, ne, se, sw) {
        /**
         * @param {number} x
         * @param {number} y
         * @param {number} r0
         * @param {number} r1
         */
        function mlla(x, y, r0, r1) {
            ctx.moveTo(x + r0, y);
            ctx.lineTo(x, y);
            ctx.lineTo(x, y + r1);
            ctx.arcTo(x, y, x + r0, y, rad);
        }

        if (nw) mlla(l, t, rad, rad);
        if (ne) mlla(r, t, -rad, rad);
        if (se) mlla(r, b, -rad, -rad);
        if (sw) mlla(l, b, rad, -rad);
    }

    /**
     * @param {any} qr
     * @param {CanvasRenderingContext2D} context
     * @param {QrEncoderSettings} settings
     * @param {number} left
     * @param {number} top
     * @param {number} width
     * @param {number} row
     * @param {number} col
     */
    static _drawModuleRounded(qr, context, settings, left, top, width, row, col) {
        const isDark = qr.isDark;
        const right = left + width;
        const bottom = top + width;
        const rowT = row - 1;
        const rowB = row + 1;
        const colL = col - 1;
        const colR = col + 1;
        const radius = Math.floor(Math.max(0.5, settings.radius) * width);
        const center = isDark(row, col);
        const northwest = isDark(rowT, colL);
        const north = isDark(rowT, col);
        const northeast = isDark(rowT, colR);
        const east = isDark(row, colR);
        const southeast = isDark(rowB, colR);
        const south = isDark(rowB, col);
        const southwest = isDark(rowB, colL);
        const west = isDark(row, colL);

        if (center) {
            this._drawModuleRoundedDark(context, left, top, right, bottom, radius, !north && !west, !north && !east, !south && !east, !south && !west);
        } else {
            this._drawModuleRoundendLight(context, left, top, right, bottom, radius, north && west && northwest, north && east && northeast, south && east && southeast, south && west && southwest);
        }
    }

    /**
     * @param {any} qr
     * @param {CanvasRenderingContext2D} context
     * @param {QrEncoderSettings} settings
     */
    static _drawModules(qr, context, settings) {
        const moduleCount = qr.moduleCount;
        const moduleSize = settings.size / moduleCount;
        let row;
        let col;

        context.beginPath();
        for (row = 0; row < moduleCount; row += 1) {
            for (col = 0; col < moduleCount; col += 1) {
                const l = settings.left + col * moduleSize;
                const t = settings.top + row * moduleSize;
                const w = moduleSize;

                this._drawModuleRounded(qr, context, settings, l, t, w, row, col);
            }
        }

        context.fillStyle = settings.fill;
        context.fill();
    }

    // Draws QR code to the given `canvas` and returns it.
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {QrEncoderSettings} settings
     */
    static _drawOnCanvas(canvas, settings) {
        const qr = this._createMinQRCode(settings.text, settings.ecLevel, settings.minVersion, settings.maxVersion, settings.quiet);
        if (!qr) {
            return null;
        }

        /** @type {CanvasRenderingContext2D} */
        const context = (canvas.getContext('2d'));

        this._drawBackground(qr, context, settings);
        this._drawModules(qr, context, settings);

        return canvas;
    }

    // Returns a `canvas` element representing the QR code for the given settings.
    /**
     * @param {QrEncoderSettings} settings
     */
    static _createCanvas(settings) {
        const $canvas = document.createElement('canvas');
        $canvas.width = settings.size;
        $canvas.height = settings.size;
        return this._drawOnCanvas($canvas, settings);
    }
}

// Plugin
// ======

// Default settings
// ----------------
/**
 * @typedef {{minVersion?: number, maxVersion?: number, ecLevel?: string, left?: number, top?: number, size?: number, fill?: string, background?: string|null, text?: string, radius?: number, quiet?: number}} QrEncoderConfig
 * @typedef {{minVersion: number, maxVersion: number, ecLevel: string, left: number, top: number, size: number, fill: string, background: string|null, text: string, radius: number, quiet: number}} QrEncoderSettings
 */
QrEncoder.defaults = {
    // version range somewhere in 1 .. 40
    minVersion: 1,
    maxVersion: 40,

    // error correction level: `'L'`, `'M'`, `'Q'` or `'H'`
    ecLevel: 'L',

    // offset in pixel if drawn onto existing canvas
    left: 0,
    top: 0,

    // size in pixel
    size: 200,

    // code color or image element
    fill: '#000',

    // background color, `null` for transparent background
    /** @type {string|null} */
    background: null,

    // content
    text: 'no text',

    // corner radius relative to module width: 0.0 .. 0.5
    radius: 0.5,

    // quiet zone in modules
    quiet: 0,

};

QrEncoder.vendor_qrcode = (function () {
    // `qrcode` is the single public function defined by the `QR Code Generator`
    //---------------------------------------------------------------------
    //
    // QR Code Generator for JavaScript
    //
    // Copyright (c) 2009 Kazuhiko Arase
    //
    // URL: http://www.d-project.com/
    //
    // Licensed under the MIT license:
    //  http://www.opensource.org/licenses/mit-license.php
    //
    // The word 'QR Code' is registered trademark of
    // DENSO WAVE INCORPORATED
    //  http://www.denso-wave.com/qrcode/faqpatent-e.html
    //
    //---------------------------------------------------------------------

    const qrcode = (function () {
        //---------------------------------------------------------------------
        // qrcode
        //---------------------------------------------------------------------

        /**
         * @typedef {{addData(data: string): void, isDark(row: number, col: number): boolean|null, getModuleCount(): number, make(): void}} QrCode
         * @param {number} typeNumber 1 to 40
         * @param {string} errorCorrectLevel 'L','M','Q','H'
         */
        const qrcode = function (typeNumber, errorCorrectLevel) { // eslint-disable-line no-shadow
            const PAD0 = 0xEC;
            const PAD1 = 0x11;
            const _typeNumber = typeNumber;
            const _errorCorrectLevel = QRErrorCorrectLevel[errorCorrectLevel];
            let _modules = /** @type {(boolean|null)[][]|null} */ (null);
            let _moduleCount = 0;
            let _dataCache = /** @type {any} */ (null);
            const _dataList = /** @type {any} */ ([]);
            /** @type {QrCode} */
            const _this = {};
            /** @param {boolean} test @param {number} maskPattern */
            const makeImpl = function (test, maskPattern) {
                _moduleCount = _typeNumber * 4 + 17;
                _modules = (function (moduleCount) {
                    /** @type {(boolean|null)[][]} */
                    const modules = new Array(moduleCount);
                    for (let row = 0; row < moduleCount; row += 1) {
                        modules[row] = new Array(moduleCount);
                        for (let col = 0; col < moduleCount; col += 1) {
                            modules[row][col] = null;
                        }
                    }
                    return modules;
                }(_moduleCount));

                setupPositionProbePattern(0, 0);
                setupPositionProbePattern(_moduleCount - 7, 0);
                setupPositionProbePattern(0, _moduleCount - 7);
                setupPositionAdjustPattern();
                setupTimingPattern();
                setupTypeInfo(test, maskPattern);

                if (_typeNumber >= 7) {
                    setupTypeNumber(test);
                }

                if (_dataCache == null) {
                    _dataCache = createData(_typeNumber, _errorCorrectLevel, _dataList);
                }

                mapData(_dataCache, maskPattern);
            };
            /** @param {number} row @param {number} col */
            var setupPositionProbePattern = function (row, col) {
                for (let r = -1; r <= 7; r += 1) {
                    if (row + r <= -1 || _moduleCount <= row + r) continue;

                    for (let c = -1; c <= 7; c += 1) {
                        if (col + c <= -1 || _moduleCount <= col + c) continue;

                        if ((r >= 0 && r <= 6 && (c == 0 || c == 6))
                            || (c >= 0 && c <= 6 && (r == 0 || r == 6))
                            || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
                            /** @type {(boolean|null)[][]} */ (_modules)[row + r][col + c] = true;
                        } else {
                            /** @type {(boolean|null)[][]} */ (_modules)[row + r][col + c] = false;
                        }
                    }
                }
            };
            /** @returns {number} */
            const getBestMaskPattern = function () {
                let minLostPoint = 0;
                let pattern = 0;

                for (let i = 0; i < 8; i += 1) {
                    makeImpl(true, i);

                    const lostPoint = QRUtil.getLostPoint(_this);

                    if (i == 0 || minLostPoint > lostPoint) {
                        minLostPoint = lostPoint;
                        pattern = i;
                    }
                }

                return pattern;
            };
            /** */
            var setupTimingPattern = function () {
                for (let r = 8; r < _moduleCount - 8; r += 1) {
                    if (/** @type {(boolean|null)[][]} */ (_modules)[r][6] != null) {
                        continue;
                    }
                    (/** @type {(boolean|null)[][]} */ (_modules))[r][6] = (r % 2 == 0);
                }

                for (let c = 8; c < _moduleCount - 8; c += 1) {
                    if (/** @type {(boolean|null)[][]} */ (_modules)[6][c] != null) {
                        continue;
                    }
                    (/** @type {(boolean|null)[][]} */ (_modules))[6][c] = (c % 2 == 0);
                }
            };
            /** */
            var setupPositionAdjustPattern = function () {
                const pos = QRUtil.getPatternPosition(_typeNumber);

                for (let i = 0; i < pos.length; i += 1) {
                    for (let j = 0; j < pos.length; j += 1) {
                        const row = pos[i];
                        const col = pos[j];

                        if (/** @type {(boolean|null)[][]} */ (_modules)[row][col] != null) {
                            continue;
                        }

                        for (let r = -2; r <= 2; r += 1) {
                            for (let c = -2; c <= 2; c += 1) {
                                /** @type {(boolean|null)[][]} */
                                (_modules)[row + r][col + c] = r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0);
                            }
                        }
                    }
                }
            };
            // TODO rm5 can be removed if we fix type to 5 (this method is called at 7 only)
            /** @param {boolean} test */
            var setupTypeNumber = function (test) {
                const bits = QRUtil.getBCHTypeNumber(_typeNumber);

                for (var i = 0; i < 18; i += 1) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    /** @type {(boolean|null)[][]} */
                    (_modules)[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
                }

                for (var i = 0; i < 18; i += 1) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    /** @type {(boolean|null)[][]} */
                    (_modules)[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
                }
            };
            /** @param {boolean} test @param {number} maskPattern */
            var setupTypeInfo = function (test, maskPattern) {
                const data = (_errorCorrectLevel << 3) | maskPattern;
                const bits = QRUtil.getBCHTypeInfo(data);

                for (let i = 0; i < 15; i += 1) {
                    const mod = (!test && ((bits >> i) & 1) == 1);

                    // vertical then horizontal
                    /** @type {(boolean|null)[][]} */
                    (_modules)[i < 6 ? i : (i < 8 ? i + 1 : _moduleCount - 15 + i)][8] = mod;
                    /** @type {(boolean|null)[][]} */
                    (_modules)[8][i < 8 ? _moduleCount - i - 1 : (i < 9 ? 15 - i : 14 - i)] = mod;
                }

                // fixed module
                (/** @type {(boolean|null)[][]} */ (_modules))[_moduleCount - 8][8] = (!test);
            };
            /** @param {number[]} data @param {number} maskPattern */
            var mapData = function (data, maskPattern) {
                let inc = -1;
                let row = _moduleCount - 1;
                let bitIndex = 7;
                let byteIndex = 0;
                const maskFunc = QRUtil.getMaskFunction(maskPattern);

                for (let col = _moduleCount - 1; col > 0; col -= 2) {
                    if (col == 6) col -= 1;

                    while (true) { // eslint-disable-line no-constant-condition
                        for (let c = 0; c < 2; c += 1) {
                            if (/** @type {(boolean|null)[][]} */ (_modules)[row][col - c] == null) {
                                let dark = false;

                                if (byteIndex < data.length) {
                                    dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
                                }

                                const mask = maskFunc(row, col - c);

                                if (mask) {
                                    dark = !dark;
                                }

                                /** @type {(boolean|null)[][]} */ (_modules)[row][col - c] = dark;
                                bitIndex -= 1;

                                if (bitIndex == -1) {
                                    byteIndex += 1;
                                    bitIndex = 7;
                                }
                            }
                        }

                        row += inc;

                        if (row < 0 || _moduleCount <= row) {
                            row -= inc;
                            inc = -inc;
                            break;
                        }
                    }
                }
            };
            /** @param {QrBitBuffer} buffer @param {any[]} rsBlocks */
            const createBytes = function (buffer, rsBlocks) {
                let offset = 0;
                let maxDcCount = 0;
                let maxEcCount = 0;
                const dcdata = new Array(rsBlocks.length);
                const ecdata = new Array(rsBlocks.length);

                for (var r = 0; r < rsBlocks.length; r += 1) {
                    const dcCount = rsBlocks[r].dataCount;
                    const ecCount = rsBlocks[r].totalCount - dcCount;

                    maxDcCount = Math.max(maxDcCount, dcCount);
                    maxEcCount = Math.max(maxEcCount, ecCount);

                    dcdata[r] = new Array(dcCount);

                    for (var i = 0; i < dcdata[r].length; i += 1) {
                        dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
                    }
                    offset += dcCount;

                    const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
                    const rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
                    const modPoly = rawPoly.mod(rsPoly);

                    ecdata[r] = new Array(rsPoly.getLength() - 1);
                    for (var i = 0; i < ecdata[r].length; i += 1) {
                        const modIndex = i + modPoly.getLength() - ecdata[r].length;
                        ecdata[r][i] = (modIndex >= 0) ? modPoly.getAt(modIndex) : 0;
                    }
                }

                let totalCodeCount = 0;
                for (var i = 0; i < rsBlocks.length; i += 1) {
                    totalCodeCount += rsBlocks[i].totalCount;
                }

                const data = new Array(totalCodeCount);
                let index = 0;

                for (var i = 0; i < maxDcCount; i += 1) {
                    for (var r = 0; r < rsBlocks.length; r += 1) {
                        if (i < dcdata[r].length) {
                            data[index] = dcdata[r][i];
                            index += 1;
                        }
                    }
                }

                for (var i = 0; i < maxEcCount; i += 1) {
                    for (var r = 0; r < rsBlocks.length; r += 1) {
                        if (i < ecdata[r].length) {
                            data[index] = ecdata[r][i];
                            index += 1;
                        }
                    }
                }

                return data;
            };
            /** @param {number} typeNumber_ @param {number} errorCorrectLevel_ @param {any} dataList */
            var createData = function (typeNumber_, errorCorrectLevel_, dataList) {
                const rsBlocks = QRRSBlock.getRSBlocks(typeNumber_, errorCorrectLevel_);
                const buffer = qrBitBuffer();

                for (var i = 0; i < dataList.length; i += 1) {
                    const data = dataList[i];
                    buffer.put(data.getMode(), 4);
                    buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber_));
                    data.write(buffer);
                }

                // calc num max data.
                let totalDataCount = 0;
                for (var i = 0; i < rsBlocks.length; i += 1) {
                    totalDataCount += rsBlocks[i].dataCount;
                }

                if (buffer.getLengthInBits() > totalDataCount * 8) {
                    throw new Error(`code length overflow. (${
                        buffer.getLengthInBits()
                    }>${
                        totalDataCount * 8
                    })`);
                }

                // end code
                if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
                    buffer.put(0, 4);
                }

                // padding
                while (buffer.getLengthInBits() % 8 != 0) {
                    buffer.putBit(false);
                }

                // padding
                while (true) { // eslint-disable-line no-constant-condition
                    if (buffer.getLengthInBits() >= totalDataCount * 8) {
                        break;
                    }
                    buffer.put(PAD0, 8);

                    if (buffer.getLengthInBits() >= totalDataCount * 8) {
                        break;
                    }
                    buffer.put(PAD1, 8);
                }

                return createBytes(buffer, rsBlocks);
            };

            /**
             * @param {string} data
             */
            _this.addData = function (data) {
                const newData = qr8BitByte(data);
                _dataList.push(newData);
                _dataCache = null;
            };

            /**
             * @param {number} row
             * @param {number} col
             */
            _this.isDark = function (row, col) {
                if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
                    throw new Error(`${row},${col}`);
                }
                return /** @type {(boolean|null)[][]} */ (_modules)[row][col];
            };

            _this.getModuleCount = function () {
                return _moduleCount;
            };

            _this.make = function () {
                makeImpl(false, getBestMaskPattern());
            };

            return _this;
        };

        //---------------------------------------------------------------------
        // qrcode.stringToBytes
        //---------------------------------------------------------------------

        // UTF-8 version
        /**
         * @param {string} s
         */
        qrcode.stringToBytes = function (s) {
            // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
            /**
             * @param {string} str
             */
            function toUTF8Array(str) {
                const utf8 = [];
                for (let i = 0; i < str.length; i++) {
                    let charcode = str.charCodeAt(i);
                    if (charcode < 0x80) utf8.push(charcode);
                    else if (charcode < 0x800) {
                        utf8.push(0xc0 | (charcode >> 6),
                            0x80 | (charcode & 0x3f));
                    } else if (charcode < 0xd800 || charcode >= 0xe000) {
                        utf8.push(0xe0 | (charcode >> 12),
                            0x80 | ((charcode >> 6) & 0x3f),
                            0x80 | (charcode & 0x3f));
                    } else { // surrogate pair
                        i += 1;
                        // UTF-16 encodes 0x10000-0x10FFFF by
                        // subtracting 0x10000 and splitting the
                        // 20 bits of 0x0-0xFFFFF into two halves
                        charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                            | (str.charCodeAt(i) & 0x3ff));
                        utf8.push(0xf0 | (charcode >> 18),
                            0x80 | ((charcode >> 12) & 0x3f),
                            0x80 | ((charcode >> 6) & 0x3f),
                            0x80 | (charcode & 0x3f));
                    }
                }
                return utf8;
            }
            return toUTF8Array(s);
        };

        //---------------------------------------------------------------------
        // QRMode
        //---------------------------------------------------------------------

        const QRMode = {
            MODE_8BIT_BYTE: 1 << 2,
        };

        //---------------------------------------------------------------------
        // QRErrorCorrectLevel
        //---------------------------------------------------------------------

        /** @type {{[level: string]: number}} */
        var QRErrorCorrectLevel = {
            L: 1,
            M: 0,
            Q: 3,
            H: 2,
        };

        //---------------------------------------------------------------------
        // QRMaskPattern
        //---------------------------------------------------------------------

        /** @type {{[pattern: string]: number}} */
        const QRMaskPattern = {
            PATTERN000: 0,
            PATTERN001: 1,
            PATTERN010: 2,
            PATTERN011: 3,
            PATTERN100: 4,
            PATTERN101: 5,
            PATTERN110: 6,
            PATTERN111: 7,
        };

        //---------------------------------------------------------------------
        // QRUtil
        //---------------------------------------------------------------------

        var QRUtil = (function () {
            const PATTERN_POSITION_TABLE = [
                [],
                [6, 18],
                [6, 22],
                [6, 26],
                [6, 30],
                [6, 34],
                [6, 22, 38],
                [6, 24, 42],
                [6, 26, 46],
                [6, 28, 50],
                [6, 30, 54],
                [6, 32, 58],
                [6, 34, 62],
                [6, 26, 46, 66],
                [6, 26, 48, 70],
                [6, 26, 50, 74],
                [6, 30, 54, 78],
                [6, 30, 56, 82],
                [6, 30, 58, 86],
                [6, 34, 62, 90],
                [6, 28, 50, 72, 94],
                [6, 26, 50, 74, 98],
                [6, 30, 54, 78, 102],
                [6, 28, 54, 80, 106],
                [6, 32, 58, 84, 110],
                [6, 30, 58, 86, 114],
                [6, 34, 62, 90, 118],
                [6, 26, 50, 74, 98, 122],
                [6, 30, 54, 78, 102, 126],
                [6, 26, 52, 78, 104, 130],
                [6, 30, 56, 82, 108, 134],
                [6, 34, 60, 86, 112, 138],
                [6, 30, 58, 86, 114, 142],
                [6, 34, 62, 90, 118, 146],
                [6, 30, 54, 78, 102, 126, 150],
                [6, 24, 50, 76, 102, 128, 154],
                [6, 28, 54, 80, 106, 132, 158],
                [6, 32, 58, 84, 110, 136, 162],
                [6, 26, 54, 82, 110, 138, 166],
                [6, 30, 58, 86, 114, 142, 170],
            ];
            const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
            const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
            const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
            const _this = {};
            /** @param {number} data */
            const getBCHDigit = function (data) {
                let digit = 0;
                while (data != 0) {
                    digit += 1;
                    data >>>= 1;
                }
                return digit;
            };

            _this.getBCHTypeInfo = /** @param {number} data */ function (data) {
                let d = data << 10;
                while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
                    d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15)));
                }
                return ((data << 10) | d) ^ G15_MASK;
            };

            // TODO rm5 (see rm5 above)
            _this.getBCHTypeNumber = /** @param {number} data */ function (data) {
                let d = data << 12;
                while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
                    d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18)));
                }
                return (data << 12) | d;
            };

            _this.getPatternPosition = /** @param {number} typeNumber */ function (typeNumber) {
                return PATTERN_POSITION_TABLE[typeNumber - 1];
            };

            _this.getMaskFunction = /** @param {number} maskPattern */ function (maskPattern) {
                switch (maskPattern) {
                    case QRMaskPattern.PATTERN000:
                        return /** @param {number} i @param {number} j */ function (i, j) { return (i + j) % 2 == 0; };
                    case QRMaskPattern.PATTERN001:
                        return /** @param {number} i @param {number} j */ function (i, j) { return i % 2 == 0; }; // eslint-disable-line no-unused-vars
                    case QRMaskPattern.PATTERN010:
                        return /** @param {number} i @param {number} j */ function (i, j) { return j % 3 == 0; };
                    case QRMaskPattern.PATTERN011:
                        return /** @param {number} i @param {number} j */ function (i, j) { return (i + j) % 3 == 0; };
                    case QRMaskPattern.PATTERN100:
                        return /** @param {number} i @param {number} j */ function (i, j) { return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0; };
                    case QRMaskPattern.PATTERN101:
                        return /** @param {number} i @param {number} j */ function (i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };
                    case QRMaskPattern.PATTERN110:
                        return /** @param {number} i @param {number} j */ function (i, j) { return ((i * j) % 2 + (i * j) % 3) % 2 == 0; };
                    case QRMaskPattern.PATTERN111:
                        return /** @param {number} i @param {number} j */ function (i, j) { return ((i * j) % 3 + (i + j) % 2) % 2 == 0; };

                    default:
                        throw new Error(`bad maskPattern:${maskPattern}`);
                }
            };

            /**
             * @param {number} errorCorrectLength
             */
            _this.getErrorCorrectPolynomial = function (errorCorrectLength) {
                let a = qrPolynomial([1], 0);
                for (let i = 0; i < errorCorrectLength; i += 1) {
                    a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
                }
                return a;
            };

            /**
             * @param {number} mode
             * @param {number} type
             */
            _this.getLengthInBits = function (mode, type) {
                if (mode != QRMode.MODE_8BIT_BYTE || type < 1 || type > 40) throw new Error(`mode: ${mode}; type: ${type}`);

                return type < 10 ? 8 : 16;
            };

            /**
             * @param {QrCode} qrcode
             */
            _this.getLostPoint = function (qrcode) { // eslint-disable-line no-shadow
                const moduleCount = qrcode.getModuleCount();
                let lostPoint = 0;

                // LEVEL1
                for (var row = 0; row < moduleCount; row += 1) {
                    for (var col = 0; col < moduleCount; col += 1) {
                        let sameCount = 0;
                        const dark = qrcode.isDark(row, col);

                        for (let r = -1; r <= 1; r += 1) {
                            if (row + r < 0 || moduleCount <= row + r) {
                                continue;
                            }

                            for (let c = -1; c <= 1; c += 1) {
                                if (col + c < 0 || moduleCount <= col + c) {
                                    continue;
                                }

                                if (r == 0 && c == 0) {
                                    continue;
                                }

                                if (dark == qrcode.isDark(row + r, col + c)) {
                                    sameCount += 1;
                                }
                            }
                        }

                        if (sameCount > 5) {
                            lostPoint += (3 + sameCount - 5);
                        }
                    }
                }

                // LEVEL2
                for (var row = 0; row < moduleCount - 1; row += 1) {
                    for (var col = 0; col < moduleCount - 1; col += 1) {
                        let count = 0;
                        if (qrcode.isDark(row, col)) count += 1;
                        if (qrcode.isDark(row + 1, col)) count += 1;
                        if (qrcode.isDark(row, col + 1)) count += 1;
                        if (qrcode.isDark(row + 1, col + 1)) count += 1;
                        if (count == 0 || count == 4) {
                            lostPoint += 3;
                        }
                    }
                }

                // LEVEL3
                for (var row = 0; row < moduleCount; row += 1) {
                    for (var col = 0; col < moduleCount - 6; col += 1) {
                        if (qrcode.isDark(row, col)
                            && !qrcode.isDark(row, col + 1)
                            && qrcode.isDark(row, col + 2)
                            && qrcode.isDark(row, col + 3)
                            && qrcode.isDark(row, col + 4)
                            && !qrcode.isDark(row, col + 5)
                            && qrcode.isDark(row, col + 6)) {
                            lostPoint += 40;
                        }
                    }
                }
                for (var col = 0; col < moduleCount; col += 1) {
                    for (var row = 0; row < moduleCount - 6; row += 1) {
                        if (qrcode.isDark(row, col)
                            && !qrcode.isDark(row + 1, col)
                            && qrcode.isDark(row + 2, col)
                            && qrcode.isDark(row + 3, col)
                            && qrcode.isDark(row + 4, col)
                            && !qrcode.isDark(row + 5, col)
                            && qrcode.isDark(row + 6, col)) {
                            lostPoint += 40;
                        }
                    }
                }

                // LEVEL4
                let darkCount = 0;
                for (var col = 0; col < moduleCount; col += 1) {
                    for (var row = 0; row < moduleCount; row += 1) {
                        if (qrcode.isDark(row, col)) {
                            darkCount += 1;
                        }
                    }
                }

                const ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
                lostPoint += ratio * 10;

                return lostPoint;
            };

            return _this;
        }());

        //---------------------------------------------------------------------
        // QRMath
        //---------------------------------------------------------------------

        var QRMath = (function () {
            const EXP_TABLE = /** @type {number[]} */ (new Array(256));
            const LOG_TABLE = /** @type {number[]} */ (new Array(256));

            // initialize tables
            for (var i = 0; i < 8; i += 1) {
                EXP_TABLE[i] = 1 << i;
            }
            for (var i = 8; i < 256; i += 1) {
                EXP_TABLE[i] = EXP_TABLE[i - 4]
                    ^ EXP_TABLE[i - 5]
                    ^ EXP_TABLE[i - 6]
                    ^ EXP_TABLE[i - 8];
            }
            for (var i = 0; i < 255; i += 1) {
                LOG_TABLE[EXP_TABLE[i]] = i;
            }

            const _this = {};

            /** @param {number} n */
            _this.glog = function (n) {
                if (n < 1) {
                    throw new Error(`glog(${n})`);
                }

                return LOG_TABLE[n];
            };

            /** @param {number} n */
            _this.gexp = function (n) {
                while (n < 0) {
                    n += 255;
                }

                while (n >= 256) {
                    n -= 255;
                }

                return EXP_TABLE[n];
            };

            return _this;
        }());

        //---------------------------------------------------------------------
        // qrPolynomial
        //---------------------------------------------------------------------

        /**
         * @typedef {{getAt(index: number): number, getLength(): number, multiply(e: QrPolynomial): QrPolynomial, mod(e: QrPolynomial): QrPolynomial}} QrPolynomial
         * @param {number[]} num
         * @param {number} shift
         * @returns {QrPolynomial}
         */
        function qrPolynomial(num, shift) {
            if (typeof num.length === 'undefined') {
                throw new Error(`${num.length}/${shift}`);
            }

            /** @type {number[]} */
            const _num = (function () {
                let offset = 0;
                while (offset < num.length && num[offset] == 0) {
                    offset += 1;
                }
                /** @type {number[]} */
                const _num_ = new Array(num.length - offset + shift);
                for (let i = 0; i < num.length - offset; i += 1) {
                    _num_[i] = num[i + offset];
                }
                return _num_;
            }());

            const _this = {};

            /** @param {number} index */
            _this.getAt = function (index) {
                return _num[index];
            };

            _this.getLength = function () {
                return _num.length;
            };

            /**
             * @param {QrPolynomial} e
             * @returns {QrPolynomial}
             */
            _this.multiply = function (e) {
                const num_ = new Array(_this.getLength() + e.getLength() - 1);

                for (let i = 0; i < _this.getLength(); i += 1) {
                    for (let j = 0; j < e.getLength(); j += 1) {
                        num_[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
                    }
                }

                return qrPolynomial(num_, 0);
            };

            /**
             * @param {QrPolynomial} e
             * @returns {QrPolynomial}
             */
            _this.mod = function (e) {
                if (_this.getLength() - e.getLength() < 0) {
                    return _this;
                }

                const ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));

                const num_ = new Array(_this.getLength());
                for (var i = 0; i < _this.getLength(); i += 1) {
                    num_[i] = _this.getAt(i);
                }

                for (var i = 0; i < e.getLength(); i += 1) {
                    num_[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
                }

                // recursive call
                return qrPolynomial(num_, 0).mod(e);
            };

            return _this;
        }

        //---------------------------------------------------------------------
        // QRRSBlock
        //---------------------------------------------------------------------

        var QRRSBlock = (function () {
            // TODO is it possible to generate this block with JS in less kB?
            const RS_BLOCK_TABLE = [

                // L
                // M
                // Q
                // H

                // 1
                [1, 26, 19],
                [1, 26, 16],
                [1, 26, 13],
                [1, 26, 9],

                // 2
                [1, 44, 34],
                [1, 44, 28],
                [1, 44, 22],
                [1, 44, 16],

                // 3
                [1, 70, 55],
                [1, 70, 44],
                [2, 35, 17],
                [2, 35, 13],

                // 4
                [1, 100, 80],
                [2, 50, 32],
                [2, 50, 24],
                [4, 25, 9],

                // 5
                [1, 134, 108],
                [2, 67, 43],
                [2, 33, 15, 2, 34, 16],
                [2, 33, 11, 2, 34, 12],

                // 6
                [2, 86, 68],
                [4, 43, 27],
                [4, 43, 19],
                [4, 43, 15],

                // 7
                [2, 98, 78],
                [4, 49, 31],
                [2, 32, 14, 4, 33, 15],
                [4, 39, 13, 1, 40, 14],

                // 8
                [2, 121, 97],
                [2, 60, 38, 2, 61, 39],
                [4, 40, 18, 2, 41, 19],
                [4, 40, 14, 2, 41, 15],

                // 9
                [2, 146, 116],
                [3, 58, 36, 2, 59, 37],
                [4, 36, 16, 4, 37, 17],
                [4, 36, 12, 4, 37, 13],

                // 10
                [2, 86, 68, 2, 87, 69],
                [4, 69, 43, 1, 70, 44],
                [6, 43, 19, 2, 44, 20],
                [6, 43, 15, 2, 44, 16],

                // 11
                [4, 101, 81],
                [1, 80, 50, 4, 81, 51],
                [4, 50, 22, 4, 51, 23],
                [3, 36, 12, 8, 37, 13],

                // 12
                [2, 116, 92, 2, 117, 93],
                [6, 58, 36, 2, 59, 37],
                [4, 46, 20, 6, 47, 21],
                [7, 42, 14, 4, 43, 15],

                // 13
                [4, 133, 107],
                [8, 59, 37, 1, 60, 38],
                [8, 44, 20, 4, 45, 21],
                [12, 33, 11, 4, 34, 12],

                // 14
                [3, 145, 115, 1, 146, 116],
                [4, 64, 40, 5, 65, 41],
                [11, 36, 16, 5, 37, 17],
                [11, 36, 12, 5, 37, 13],

                // 15
                [5, 109, 87, 1, 110, 88],
                [5, 65, 41, 5, 66, 42],
                [5, 54, 24, 7, 55, 25],
                [11, 36, 12, 7, 37, 13],

                // 16
                [5, 122, 98, 1, 123, 99],
                [7, 73, 45, 3, 74, 46],
                [15, 43, 19, 2, 44, 20],
                [3, 45, 15, 13, 46, 16],

                // 17
                [1, 135, 107, 5, 136, 108],
                [10, 74, 46, 1, 75, 47],
                [1, 50, 22, 15, 51, 23],
                [2, 42, 14, 17, 43, 15],

                // 18
                [5, 150, 120, 1, 151, 121],
                [9, 69, 43, 4, 70, 44],
                [17, 50, 22, 1, 51, 23],
                [2, 42, 14, 19, 43, 15],

                // 19
                [3, 141, 113, 4, 142, 114],
                [3, 70, 44, 11, 71, 45],
                [17, 47, 21, 4, 48, 22],
                [9, 39, 13, 16, 40, 14],

                // 20
                [3, 135, 107, 5, 136, 108],
                [3, 67, 41, 13, 68, 42],
                [15, 54, 24, 5, 55, 25],
                [15, 43, 15, 10, 44, 16],

                // 21
                [4, 144, 116, 4, 145, 117],
                [17, 68, 42],
                [17, 50, 22, 6, 51, 23],
                [19, 46, 16, 6, 47, 17],

                // 22
                [2, 139, 111, 7, 140, 112],
                [17, 74, 46],
                [7, 54, 24, 16, 55, 25],
                [34, 37, 13],

                // 23
                [4, 151, 121, 5, 152, 122],
                [4, 75, 47, 14, 76, 48],
                [11, 54, 24, 14, 55, 25],
                [16, 45, 15, 14, 46, 16],

                // 24
                [6, 147, 117, 4, 148, 118],
                [6, 73, 45, 14, 74, 46],
                [11, 54, 24, 16, 55, 25],
                [30, 46, 16, 2, 47, 17],

                // 25
                [8, 132, 106, 4, 133, 107],
                [8, 75, 47, 13, 76, 48],
                [7, 54, 24, 22, 55, 25],
                [22, 45, 15, 13, 46, 16],

                // 26
                [10, 142, 114, 2, 143, 115],
                [19, 74, 46, 4, 75, 47],
                [28, 50, 22, 6, 51, 23],
                [33, 46, 16, 4, 47, 17],

                // 27
                [8, 152, 122, 4, 153, 123],
                [22, 73, 45, 3, 74, 46],
                [8, 53, 23, 26, 54, 24],
                [12, 45, 15, 28, 46, 16],

                // 28
                [3, 147, 117, 10, 148, 118],
                [3, 73, 45, 23, 74, 46],
                [4, 54, 24, 31, 55, 25],
                [11, 45, 15, 31, 46, 16],

                // 29
                [7, 146, 116, 7, 147, 117],
                [21, 73, 45, 7, 74, 46],
                [1, 53, 23, 37, 54, 24],
                [19, 45, 15, 26, 46, 16],

                // 30
                [5, 145, 115, 10, 146, 116],
                [19, 75, 47, 10, 76, 48],
                [15, 54, 24, 25, 55, 25],
                [23, 45, 15, 25, 46, 16],

                // 31
                [13, 145, 115, 3, 146, 116],
                [2, 74, 46, 29, 75, 47],
                [42, 54, 24, 1, 55, 25],
                [23, 45, 15, 28, 46, 16],

                // 32
                [17, 145, 115],
                [10, 74, 46, 23, 75, 47],
                [10, 54, 24, 35, 55, 25],
                [19, 45, 15, 35, 46, 16],

                // 33
                [17, 145, 115, 1, 146, 116],
                [14, 74, 46, 21, 75, 47],
                [29, 54, 24, 19, 55, 25],
                [11, 45, 15, 46, 46, 16],

                // 34
                [13, 145, 115, 6, 146, 116],
                [14, 74, 46, 23, 75, 47],
                [44, 54, 24, 7, 55, 25],
                [59, 46, 16, 1, 47, 17],

                // 35
                [12, 151, 121, 7, 152, 122],
                [12, 75, 47, 26, 76, 48],
                [39, 54, 24, 14, 55, 25],
                [22, 45, 15, 41, 46, 16],

                // 36
                [6, 151, 121, 14, 152, 122],
                [6, 75, 47, 34, 76, 48],
                [46, 54, 24, 10, 55, 25],
                [2, 45, 15, 64, 46, 16],

                // 37
                [17, 152, 122, 4, 153, 123],
                [29, 74, 46, 14, 75, 47],
                [49, 54, 24, 10, 55, 25],
                [24, 45, 15, 46, 46, 16],

                // 38
                [4, 152, 122, 18, 153, 123],
                [13, 74, 46, 32, 75, 47],
                [48, 54, 24, 14, 55, 25],
                [42, 45, 15, 32, 46, 16],

                // 39
                [20, 147, 117, 4, 148, 118],
                [40, 75, 47, 7, 76, 48],
                [43, 54, 24, 22, 55, 25],
                [10, 45, 15, 67, 46, 16],

                // 40
                [19, 148, 118, 6, 149, 119],
                [18, 75, 47, 31, 76, 48],
                [34, 54, 24, 34, 55, 25],
                [20, 45, 15, 61, 46, 16],
            ];

            /**
             * @typedef {{totalCount: number, dataCount: number}} QRRSBlock
             * @param {number} totalCount
             * @param {number} dataCount
             */
            const qrRSBlock = function (totalCount, dataCount) {
                const _this = {};
                _this.totalCount = totalCount;
                _this.dataCount = dataCount;
                return _this;
            };

            const _this = {};

            /**
             * @param {number} typeNumber
             * @param {number} errorCorrectLevel
             */
            const getRsBlockTable = function (typeNumber, errorCorrectLevel) {
                switch (errorCorrectLevel) {
                    case QRErrorCorrectLevel.L:
                        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
                    case QRErrorCorrectLevel.M:
                        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
                    case QRErrorCorrectLevel.Q:
                        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
                    case QRErrorCorrectLevel.H:
                        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
                    default:
                        return undefined;
                }
            };

            /**
             * @param {number} typeNumber
             * @param {number} errorCorrectLevel
             */
            _this.getRSBlocks = function (typeNumber, errorCorrectLevel) {
                const rsBlock = getRsBlockTable(typeNumber, errorCorrectLevel);

                if (typeof rsBlock === 'undefined') {
                    throw new Error(`bad rs block @ typeNumber:${typeNumber
                    }/errorCorrectLevel:${errorCorrectLevel}`);
                }

                const length = rsBlock.length / 3;
                const list = /** @type {QRRSBlock[]} */ ([]);

                for (let i = 0; i < length; i += 1) {
                    const count = rsBlock[i * 3 + 0];
                    const totalCount = rsBlock[i * 3 + 1];
                    const dataCount = rsBlock[i * 3 + 2];

                    for (let j = 0; j < count; j += 1) {
                        list.push(qrRSBlock(totalCount, dataCount));
                    }
                }

                return list;
            };

            return _this;
        }());

        //---------------------------------------------------------------------
        // qrBitBuffer
        //---------------------------------------------------------------------

        /** @typedef {{getBuffer(): number[], getAt(index: number): boolean, put(num: number, length: number): void, getLengthInBits(): number, putBit(bit: boolean): void}} QrBitBuffer */
        var qrBitBuffer = function () {
            /** @type {number[]} */
            const _buffer = [];
            let _length = 0;
            const _this = {};

            _this.getBuffer = function () {
                return _buffer;
            };

            /**
             * @param {number} index
             */
            _this.getAt = function (index) {
                const bufIndex = Math.floor(index / 8);
                return ((_buffer[bufIndex] >>> (7 - index % 8)) & 1) == 1;
            };

            /**
             * @param {number} num
             * @param {number} length
             */
            _this.put = function (num, length) {
                for (let i = 0; i < length; i += 1) {
                    _this.putBit(((num >>> (length - i - 1)) & 1) == 1);
                }
            };

            _this.getLengthInBits = function () {
                return _length;
            };

            /**
             * @param {boolean} bit
             */
            _this.putBit = function (bit) {
                const bufIndex = Math.floor(_length / 8);
                if (_buffer.length <= bufIndex) {
                    _buffer.push(0);
                }

                if (bit) {
                    _buffer[bufIndex] |= (0x80 >>> (_length % 8));
                }

                _length += 1;
            };

            return _this;
        };

        //---------------------------------------------------------------------
        // qr8BitByte
        //---------------------------------------------------------------------

        /**
         * @param {string} data
         */
        var qr8BitByte = function (data) {
            const _mode = QRMode.MODE_8BIT_BYTE;
            const _bytes = qrcode.stringToBytes(data);
            const _this = {};

            _this.getMode = function () {
                return _mode;
            };

            _this.getLength = function () {
                return _bytes.length;
            };

            /**
             * @param {QrBitBuffer} buffer
             */
            _this.write = function (buffer) {
                for (let i = 0; i < _bytes.length; i += 1) {
                    buffer.put(_bytes[i], 8);
                }
            };

            return _this;
        };

        // returns qrcode function.
        return qrcode;
    }());

    return qrcode; // eslint-disable-line no-undef
}());
/* global I18n */
/* global QrEncoder */
/* global LoginFileConfig */

class LoginFile {
    /**
     * @param {string} encodedSecret - Base64-encoded and encrypted secret
     * @param {number} [color = 0]
     * @param {string} [label] - Login file label
     */
    constructor(encodedSecret, color = 0, label) {
        this._width = LoginFile.WIDTH;
        this._height = LoginFile.HEIGHT;
        const $canvas = document.createElement('canvas');
        $canvas.width = this._width;
        $canvas.height = this._height;
        this.$canvas = $canvas;
        this._config = LoginFileConfig[color];
        if (!this._config) throw new Error(`Invalid color index: ${color}`);
        this._label = label && label.trim()
            ? label.trim()
            : I18n.translatePhrase('login-file-default-account-label').replace('{color}', this._config.name);
        /** @type {CanvasRenderingContext2D} */
        this._ctx = ($canvas.getContext('2d'));
        this._drawPromise = this._draw(encodedSecret);
    }

    static calculateQrPosition() {
        return {
            x: 138,
            y: 536,
            size: LoginFile.QR_SIZE,
            padding: LoginFile.QR_PADDING,
            width: LoginFile.QR_BOX_SIZE,
            height: LoginFile.QR_BOX_SIZE,
        };
    }

    /**
     * @returns {string}
     */
    filename() {
        const filename = I18n.translatePhrase('login-file-filename');
        return filename.replace(
            '{accountLabel}',
            // Replace spaces and sanitize file name (see https://stackoverflow.com/a/31976060).
            // However, sanitizing the file name would not be strictly necessary as the browser also takes care of it.
            // Note that the browser sanitization seems to also replace zero width joiners \u200D which breaks joined
            // symbols like some emojis (https://en.wikipedia.org/wiki/Zero-width_joiner) into their components.
            // eslint-disable-next-line no-control-regex
            this._label.replace(/\s+/gu, '-').replace(/[<>:"/\\|?*\x00-\x1F]/gu, '_'),
        );
    }

    /**
     * @returns {Promise<string>}
     */
    async toDataUrl() {
        await this._drawPromise;
        return this.$canvas.toDataURL().replace(/#/g, '%23');
    }

    /**
     * @returns {Promise<string>}
     */
    async toObjectUrl() {
        await this._drawPromise;

        return new Promise(resolve => {
            this.$canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                resolve(url);
            });
        });
    }

    /**
     * @param {string} encodedSecret
     * @returns {Promise<void>}
     */
    async _draw(encodedSecret) {
        this._drawBackground();
        await this._drawDecorations();
        await this._drawNimiqLogo();

        this._setFont();
        this._drawDateText();
        this._drawLabelText();
        this._drawWarningText();

        this._drawQrCode(encodedSecret);
    }

    async _drawNimiqLogo() {
        await this._drawDataUrlImage(
            // eslint-disable-next-line max-len
            'data:image/svg+xml,<svg width="199" height="24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M26.7 10.88l-5.62-9.76A2.25 2.25 0 0 0 19.13 0H7.88c-.79 0-1.54.41-1.95 1.13L.3 10.88a2.2 2.2 0 0 0 0 2.24l5.63 9.76A2.25 2.25 0 0 0 7.88 24h11.25c.78 0 1.53-.41 1.95-1.13l5.62-9.75a2.2 2.2 0 0 0 0-2.24zM46.73 4.72h2.43v14.4h-1.91L39.49 9.04v10.08h-2.44V4.72H39l7.76 10.1V4.71h-.03zM53.96 19.12V4.72h2.63v14.4h-2.63zM73.28 4.72h2.06v14.4H73v-8.96l-3.79 8.96H67.5l-3.86-8.85v8.85H61.3V4.72h2.06l4.96 11.3 4.95-11.3zM80.14 19.12V4.72h2.62v14.4h-2.62zM98.06 20.17c.45.45.94.94 1.5 1.4l-1.76 1.42a11.6 11.6 0 0 1-3.34-3.71c-.11 0-.3.03-.6.03-1.39 0-2.58-.3-3.64-.9a5.94 5.94 0 0 1-2.4-2.59A8.7 8.7 0 0 1 87 11.9c0-1.5.26-2.82.83-3.9a6 6 0 0 1 2.36-2.55c1.05-.6 2.25-.9 3.64-.9 1.38 0 2.62.3 3.63.9a5.76 5.76 0 0 1 2.37 2.55c.56 1.12.82 2.43.82 3.9 0 1.65-.34 3.07-.98 4.23a5.99 5.99 0 0 1-2.77 2.6c.38.52.71 1 1.16 1.45zm-7.31-4.3c.75.9 1.8 1.38 3.11 1.38 1.31 0 2.36-.45 3.11-1.39.75-.9 1.13-2.25 1.13-3.94 0-1.68-.38-3-1.13-3.9a3.85 3.85 0 0 0-3.1-1.35c-1.32 0-2.37.45-3.12 1.35-.75.9-1.13 2.22-1.13 3.94a6.6 6.6 0 0 0 1.13 3.9zM112.42 19.12V4.72h1.66v13.02h7.23v1.38h-8.89zM124.91 18.64a4.7 4.7 0 0 1-1.69-1.84 6 6 0 0 1-.6-2.81c0-1.05.2-1.99.6-2.81a4.46 4.46 0 0 1 4.24-2.48c.98 0 1.8.23 2.55.64a4.7 4.7 0 0 1 1.69 1.84 6 6 0 0 1 .6 2.8 6.2 6.2 0 0 1-.6 2.82 4.46 4.46 0 0 1-4.24 2.48c-.97 0-1.83-.23-2.55-.64zm4.84-1.73c.53-.67.82-1.65.82-2.92 0-1.24-.26-2.21-.82-2.89a2.83 2.83 0 0 0-2.33-1.01c-1 0-1.76.34-2.32 1.01-.56.68-.82 1.65-.82 2.89 0 1.27.26 2.25.82 2.92a2.83 2.83 0 0 0 2.33 1.02c1 0 1.8-.34 2.32-1.02zM143.89 8.92v10.1c0 1.5-.38 2.65-1.16 3.44-.8.79-1.92 1.16-3.45 1.16a7.36 7.36 0 0 1-4.02-1.05l.3-1.35c.64.38 1.28.64 1.84.8.56.14 1.2.22 1.88.22.97 0 1.72-.27 2.2-.79.5-.53.76-1.28.76-2.33v-2.4c-.3.64-.75 1.17-1.35 1.5-.6.38-1.31.53-2.14.53-.9 0-1.69-.23-2.36-.64a3.98 3.98 0 0 1-1.61-1.8 6.04 6.04 0 0 1-.57-2.66c0-1.01.19-1.88.56-2.66.38-.79.9-1.35 1.62-1.8a4.65 4.65 0 0 1 4.46-.12c.6.34 1.05.83 1.35 1.47V8.77h1.69v.15zm-2.48 7.54c.56-.64.83-1.54.83-2.7 0-1.16-.27-2.06-.83-2.7a2.97 2.97 0 0 0-2.32-.97 3 3 0 0 0-2.37.97 3.95 3.95 0 0 0-.86 2.7c0 1.16.3 2.06.86 2.7a3 3 0 0 0 2.37.98c.97 0 1.76-.34 2.32-.98zM146.89 4.61h1.99V6.5h-2V4.6zm.15 14.51V8.92h1.65v10.2h-1.65zM160.61 12.71v6.41h-1.65v-6.3c0-.93-.19-1.65-.56-2.06-.38-.45-.97-.67-1.8-.67-.94 0-1.69.3-2.25.86a3.2 3.2 0 0 0-.86 2.36v5.81h-1.62v-7.3c0-1.06-.03-2-.15-2.86h1.58l.15 1.84c.3-.68.79-1.16 1.39-1.54a4.02 4.02 0 0 1 2.13-.52c2.4-.04 3.64 1.31 3.64 3.97zM169.2 19.12V4.72h8.93v1.4h-7.28v4.98h6.86v1.39h-6.86v6.63h-1.65zM180.22 4.61h2V6.5h-2V4.6zm.16 14.51V8.92h1.65v10.2h-1.66zM185.21 19.12V4.24h1.65v14.88h-1.65zM198.56 13.99h-7.46c0 1.31.3 2.28.9 2.92.6.68 1.43.98 2.55.98 1.2 0 2.29-.41 3.26-1.2l.56 1.2c-.44.41-1 .75-1.72.97-.71.23-1.43.38-2.14.38a5 5 0 0 1-3.75-1.43 5.33 5.33 0 0 1-1.35-3.86c0-1.05.19-1.95.6-2.77a4.8 4.8 0 0 1 1.69-1.88 4.63 4.63 0 0 1 2.48-.68c1.34 0 2.4.46 3.18 1.32a5.3 5.3 0 0 1 1.16 3.63V14h.04zm-6.41-3.27a3.81 3.81 0 0 0-1.01 2.18h5.92a3.5 3.5 0 0 0-.82-2.18 2.72 2.72 0 0 0-1.99-.75c-.86 0-1.54.27-2.1.75z"/></svg>',
            116, 86, 398, 48,
        );
    }

    _setFont() {
        this._ctx.font = `600 28px ${LoginFile.FONT_FAMILY}`;
        this._ctx.textAlign = 'center';
    }

    _drawDateText() {
        const qrPosition = LoginFile.calculateQrPosition();
        const padding = qrPosition.padding;
        const x = LoginFile.WIDTH - LoginFile.BORDER_WIDTH * 2;
        const y = qrPosition.y + padding + qrPosition.height / 2;

        /**
         * @param {number} num
         * @returns {string}
         */
        const leftPad = num => `${num < 10 ? '0' : ''}${num}`;

        const date = new Date();
        const datestring = `${date.getFullYear()}-${leftPad(date.getMonth() + 1)}-${leftPad(date.getDate())}`;

        this._ctx.translate(x, y);
        this._ctx.rotate(-Math.PI / 2);
        this._ctx.translate(-x, -y);

        this._ctx.font = `600 24px ${LoginFile.FONT_FAMILY}`;
        this._ctx.fillStyle = `rgba(255, 255, 255, ${this._config.opacityDate})`;
        this._ctx.fillText(datestring, x, y);

        this._ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
        this._setFont(); // reset font
    }

    _drawLabelText() {
        const x = LoginFile.WIDTH / 2;
        const y = 200;
        this._ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this._ctx.font = `600 36px ${LoginFile.FONT_FAMILY}`;
        this._ctx.filter = 'grayscale(100%) brightness(160%)';
        this._ctx.globalCompositeOperation = 'screen';
        this._ctx.fillText(this._getLabelForDisplay(), x, y, LoginFile.WIDTH - LoginFile.BORDER_WIDTH * 4);
        // reset filter, composite operation and font
        this._ctx.filter = '';
        this._ctx.globalCompositeOperation = '';
        this._setFont();
    }

    /**
     * @returns {string}
     */
    _getLabelForDisplay() {
        if (!this._label) {
            // Generate default account label
            const label = I18n.translatePhrase('login-file-default-account-label');
            return label.replace('{color}', this._config.name);
        }

        // Truncate the label if necessary. To handle unicode astral symbols consisting of two surrogate chars (like
        // emojis) correctly we split the string into its symbols rather than using label.length and label.substring
        // (see https://mathiasbynens.be/notes/javascript-unicode#accounting-for-astral-symbols). Additionally, we
        // normalize combined symbols into their single symbol equivalents. Note that this can still break for joined
        // emojis consisting of multiple codepoints like https://emojipedia.org/family-man-woman-girl-boy/. To handle
        // those, an exhaustive regex like https://github.com/mathiasbynens/emoji-regex would need to be used.
        // The length 25 is chosen arbitrarily to what still looks good with wide characters.
        const symbols = [...this._label.normalize()];
        if (symbols.length > 25) {
            return [...symbols.slice(0, 24), '…'].join('');
        }
        return this._label;
    }

    _drawWarningText() {
        const x = LoginFile.WIDTH / 2;
        const y = LoginFile.HEIGHT - 86 - 2;
        this._ctx.fillStyle = 'white';
        this._ctx.fillText('Keep safe and confidential', x, y);
    }

    /**
     * @param {string} encodedSecret
     */
    _drawQrCode(encodedSecret) {
        const $canvas = QrEncoder.render({
            text: encodedSecret,
            radius: 0.5,
            ecLevel: 'M',
            fill: 'white',
            background: 'transparent',
            size: LoginFile.QR_SIZE,
        });
        if (!$canvas) throw new Error('Cannot draw QR code');

        const qrPosition = LoginFile.calculateQrPosition();
        const padding = qrPosition.padding;

        this._ctx.drawImage($canvas,
            qrPosition.x + padding,
            qrPosition.y + padding,
            qrPosition.size,
            qrPosition.size);
    }

    _drawBackground() {
        this._ctx.fillStyle = 'white';
        this._roundRect(0, 0, this._width, this._height, LoginFile.OUTER_RADIUS, true);

        const gradient = this._ctx.createRadialGradient(
            this._width - LoginFile.BORDER_WIDTH,
            this._height - LoginFile.BORDER_WIDTH,
            0,
            this._width - LoginFile.BORDER_WIDTH,
            this._height - LoginFile.BORDER_WIDTH,
            Math.sqrt(
                ((this._width - 2 * LoginFile.BORDER_WIDTH) ** 2)
              + ((this._height - 2 * LoginFile.BORDER_WIDTH) ** 2),
            ),
        );
        gradient.addColorStop(0, this._config.corner);
        gradient.addColorStop(1, this._config.color);
        this._ctx.fillStyle = gradient;
        this._roundRect(
            LoginFile.BORDER_WIDTH,
            LoginFile.BORDER_WIDTH,
            this._width - LoginFile.BORDER_WIDTH * 2,
            this._height - LoginFile.BORDER_WIDTH * 2,
            LoginFile.RADIUS,
            true, false,
        );
    }

    async _drawDecorations() {
        // Security waves
        await this._drawDataUrlImage(
            // eslint-disable-next-line max-len
            `data:image/svg+xml,<svg width="303" height="288" fill="none" stroke="white" opacity="${this._config.opacityLines}" xmlns="http://www.w3.org/2000/svg"><path d="M365.7-158.8c-43 43-57.1 28.8-100 71.8-43 43-29 57.1-72 100.1-43 43-57 28.9-100 71.9-43 43-29 57.1-71.9 100-43 43-57.1 29-100.1 72"/><path d="M360-164.5c-43 43-59.9 26-102.9 69-43 43-26 60-69 103s-60 26-103 69-26 60-69 103-60 26-103 69"/><path d="M354.4-170.2c-43 43-62.8 23.2-105.8 66.2S225.4-41.2 182.5 1.8c-43 43-62.8 23.2-105.8 66.2s-23.2 62.8-66.2 105.8S-52.3 197-95.3 240"/><path d="M348.8-175.8c-43 43-65.7 20.3-108.6 63.3-43 43-20.4 65.7-63.4 108.7S111.2 16.5 68.2 59.5 47.8 125.1 4.8 168.1s-65.6 20.4-108.6 63.4"/><path d="M343.1-181.5c-43 43-68.4 17.6-111.4 60.6S214-52.5 171-9.5 102.7 8 59.7 51 42.2 119.5-.8 162.5-69.3 180-112.3 223"/><path d="M337.5-187.1c-43 43-71.3 14.7-114.3 57.7s-14.7 71.2-57.7 114.2S94.2-.5 51.2 42.5 36.5 113.8-6.5 156.8s-71.3 14.7-114.3 57.7"/><path d="M331.8-192.8c-43 43-74.1 11.9-117.1 54.9s-11.9 74-54.9 117-74 12-117 55-12 74-55 117-74 12-117 55"/><path d="M326.1-198.4c-43 43-76.9 9-119.9 52s-9 77-52 120-77 9-120 52-9 76.9-52 119.9-77 9-120 52"/><path d="M320.5-204.1c-43 43-79.8 6.2-122.8 49.2S191.5-75 148.5-32 68.8-26 25.8 17s-6.3 79.7-49.3 122.7-79.7 6.3-122.7 49.3"/><path d="M314.8-209.8c-43 43-82.6 3.4-125.6 46.4S185.8-80.8 143-37.8c-43 43-82.6 3.4-125.6 46.4s-3.4 82.6-46.4 125.6-82.6 3.4-125.6 46.4"/></svg>`,
            LoginFile.BORDER_WIDTH, LoginFile.BORDER_WIDTH, 606, 576,
        );

        // Key
        await this._drawDataUrlImage(
            // eslint-disable-next-line max-len
            'data:image/svg+xml,<svg width="47" height="49" opacity="0.6" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M46.97 14.27a14 14 0 00-5.34-11.03 14.28 14.28 0 00-17.73-.03 14.12 14.12 0 00-5.38 11.01 14 14 0 001.4 6.12 1 1 0 01-.2 1.15L1.91 39.12a4.01 4.01 0 002.82 6.83 4.09 4.09 0 002.86-1.06 1.02 1.02 0 011.4.04L12 47.92a2.03 2.03 0 002.9.02 2.01 2.01 0 00-.02-2.87l-3.02-2.98a1 1 0 010-1.42l1.27-1.27a1.02 1.02 0 011.44 0l3.01 2.99a2.04 2.04 0 003.45-1.44 2 2 0 00-.57-1.41l-3.02-2.99a1 1 0 010-1.42l8.02-7.95a1.02 1.02 0 011.15-.2 14.31 14.31 0 0018.59-5.9 13.98 13.98 0 001.76-6.8zm-14.23 6.05a6.13 6.13 0 01-5.63-3.73A6 6 0 0128.43 10a6.11 6.11 0 0110.41 4.27c0 1.6-.64 3.14-1.78 4.28a6.12 6.12 0 01-4.32 1.77z"/></svg>',
            244, 291, 150, 158,
        );
    }

    /**
     * @param {string} dataUrl
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @returns {Promise<void>}
     */
    async _drawDataUrlImage(dataUrl, x, y, w, h) {
        const img = new Image();
        const loaded = new Promise(resolve => {
            img.onload = () => resolve(true);
        });
        img.src = dataUrl;
        await loaded;
        this._ctx.drawImage(img, x, y, w, h);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} [radius = 5]
     * @param {boolean} [fill = false]
     * @param {boolean} [stroke = false]
     */
    _roundRect(x, y, width, height, radius = 5, fill = false, stroke = false) {
        const ctx = this._ctx;

        ctx.beginPath();
        ctx.moveTo(x + radius, y); // Top left
        ctx.lineTo(x + width - radius, y); // Top right
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius); // Bottom right
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height); // Bottom left
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius); // Top left
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
    }
}

LoginFile.WIDTH = 630;
LoginFile.HEIGHT = 1060;
LoginFile.OUTER_RADIUS = 24;
LoginFile.RADIUS = 16;
LoginFile.QR_SIZE = 330;
LoginFile.QR_PADDING = 12;
LoginFile.QR_BOX_SIZE = LoginFile.QR_SIZE + 2 * LoginFile.QR_PADDING;
LoginFile.BORDER_WIDTH = 12;
LoginFile.FONT_FAMILY = '\'Muli\', system-ui, sans-serif';
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
/* global TemplateTags */
/* global LoginFileConfig */

class LoginFileAnimation {
    /**
     * @param {HTMLDivElement} [$el]
     */
    constructor($el) {
        this._color = 0;
        this.$el = LoginFileAnimation._createElement($el);

        /** @type {HTMLDivElement} */
        this.$background = (this.$el.querySelector('.background'));
    }

    /**
     * Set the current animation step for both clear and colored states.
     * Does not need to be called when switching between states.
     *
     * @param {number} step
     */
    setStep(step) {
        for (let i = LoginFileAnimation.STEPS; i > step; i--) {
            this.$el.classList.remove(`step-${i}`);
        }
        for (let i = 0; i <= Math.min(step, LoginFileAnimation.STEPS); i++) {
            this.$el.classList.add(`step-${i}`);
        }
    }

    /**
     * Set the color of the LoginFile and transition into colored state.
     *
     * @param {number} color
     */
    setColor(color) {
        this._color = color;
        this.$background.classList.add(LoginFileConfig[this._color].className);

        // Transition to colored state
        this.$el.classList.add('colored');
        this.setStep(0);
    }

    /**
     * Reset to initial state
     */
    reset() {
        this.$background.classList.remove(LoginFileConfig[this._color].className);
        this.$el.classList.remove('colored');
        this.setStep(0);
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
        $element.classList.add('login-file-animation');
        /* eslint-disable max-len */
        $element.innerHTML = TemplateTags.noVars`
            <div class="background"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114 186">
                <g class="waves" fill="none" stroke="currentColor">
                    <!-- Wave stroke length is 124 -->
                    <path opacity="0.3" d="M-2.8 77.3c4-2 8.4-4.7 13.9-10.3 15.2-15.2 9.2-21.2 24.4-36.4s21.2-9.2 36.4-24.4a57 57 0 006.6-7.7"/>
                    <path opacity="0.6" d="M-8.4 71.7C-4 70.1.6 67.6 6.2 62c15.2-15.2 7.2-23.2 22.4-38.4S51.8 16.4 67 1.2c2.9-2.9 4.9-5.5 6.4-7.9"/>
                    <path opacity="0.75" stroke-width="1.5" d="M-13 67.1a33 33 0 0015.2-9c15.2-15.2 5.2-25.2 20.4-40.4s25.1-5.2 40.3-20.4c2.9-2.9 4.8-5.5 6.2-8.1"/>
                    <path opacity="0.6" d="M-17.6 62.5a28 28 0 0015.8-8.4c15.2-15.2 3.2-27.2 18.4-42.4S43.8 8.4 59-6.7c2.9-2.9 4.8-5.6 6-8.3"/>
                    <path opacity="0.3" d="M-20.9 59.2c5.2-.8 10.5-2.5 16.1-8.1C10.4 35.8-2.6 22.9 12.6 7.7S40.8 5.5 56-9.7a30 30 0 006-8.4"/>
                    <path opacity="0.3" d="M-23.2 56.8c5.4-.6 10.8-2.2 16.4-7.8C8.4 33.8-5.6 19.9 9.6 4.7S38.8 3.5 54-11.7c2.9-2.9 4.7-5.7 5.9-8.5"/>
                </g>
                <g fill="currentColor">
                    <path class="logo" fill="currentColor" d="M29.9 18l-2.1-3.4a.8.8 0 00-.7-.4h-4.2c-.3 0-.6.1-.7.4l-2 3.4c-.2.3-.2.6 0 .8l2 3.5c.1.3.4.4.7.4h4.2c.3 0 .5-.1.7-.4l2-3.5c.2-.2.2-.5 0-.8z"/>
                    <path class="key" fill="currentColor" d="M73.5 57a9.8 9.8 0 00-7.8-9.8c-1.5-.3-3-.3-4.5 0s-2.8 1-4 2a9.9 9.9 0 00-2.8 12l.1.4-.2.4-12.5 12.4a2.8 2.8 0 000 4 2.9 2.9 0 004 0c.1 0 .3-.2.5-.1l.5.2 2 2 .6.4.5.1.6-.1.4-.3c.1-.1.3-.3.3-.5l.1-.5a1.4 1.4 0 00-.4-1l-2.1-2.1-.2-.3V76v-.3l.2-.2.9-1a.7.7 0 011 0l2.1 2.2c.3.2.7.4 1 .4s.8-.2 1-.4c.3-.3.4-.7.4-1 0-.4-.1-.7-.4-1l-2-2.1c-.2-.1-.3-.3-.3-.5l.2-.5 5.6-5.6.4-.2h.5a10 10 0 0013-4 9.8 9.8 0 001.3-4.9zm-10 4.2c-.9 0-1.8-.3-2.5-.8s-1.2-1-1.5-1.8c-.3-.8-.5-1.7-.3-2.5s.6-1.6 1.2-2.2 1.4-1 2.2-1.1a4.3 4.3 0 015.1 4.2c0 1-.5 2.1-1.3 2.9-.8.8-1.8 1.3-3 1.3z"/>
                </g>
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <!-- Border stroke length is 585 -->
                    <path class="border" stroke-width="2" d="M1 5a4 4 0 014-4h104a4 4 0 014 4v176a4 4 0 01-4 4H5a4 4 0 01-4-4V5z"/>
                    <path class="border" stroke-width="2" d="M1 5a4 4 0 014-4h104a4 4 0 014 4v176a4 4 0 01-4 4H5a4 4 0 01-4-4V5z"/>
                    <path class="border" stroke-width="2" d="M1 5a4 4 0 014-4h104a4 4 0 014 4v176a4 4 0 01-4 4H5a4 4 0 01-4-4V5z"/>
                    <path class="title" stroke-width="6" d="M89 18H64M55 18H36"/>
                    <path class="date" stroke-width="3" d="M70 31H44"/>
                    <g stroke-width="4">
                        <path class="qr" d="M33 138h14v14H33z"/>
                        <path class="qr" d="M67 104h14v14H67z"/>
                        <path class="qr" d="M61 126v6H33h5v-8M60 146v6h21"/>
                        <path class="qr" d="M58 104h3v14M79 124H67v6"/>
                        <path class="qr" d="M45 125h8v-9M80 131v14"/>
                        <path class="qr" d="M59 139h-6v8"/>
                        <path class="qr" d="M53 104v5h3"/>
                        <path class="qr" d="M33 104h14v14H33zM67 138h6v6h-6z"/>
                    </g>
                </g>
            </svg>
        `;
        /* eslint-enable max-len */
        return $element;
    }
}

LoginFileAnimation.STEPS = 8;
/* global Nimiq */
/* global I18n */
/* global PasswordInput */
/* global AnimationUtils */
/* global PasswordStrength */
/* global TemplateTags */

class PasswordSetterBox extends Nimiq.Observable {
    // eslint-disable-next-line valid-jsdoc
    /**
     * @param {?HTMLFormElement} $el
     * @param {{bgColor?: string, buttonI18nTag?: string}} [options]
     */
    constructor($el, options = {}) {
        const defaults = {
            bgColor: 'light-blue',
            buttonI18nTag: 'passwordbox-confirm',
        };

        super();

        this._password = '';

        /** @type {{bgColor: string, buttonI18nTag: string}} */
        this.options = Object.assign(defaults, options);

        this.$el = PasswordSetterBox._createElement($el, this.options);

        this._passwordInput = new PasswordInput(
            this.$el.querySelector('[password-input]'),
            PasswordSetterBox.PASSWORD_MAX_LENGTH,
        );
        this._passwordInput.on(PasswordInput.Events.VALID, isValid => this._onInputChangeValidity(isValid));
        this._passwordInput.on(
            PasswordInput.Events.LENGTH,
            length => this.fire(PasswordSetterBox.Events.LENGTH, length),
        );

        this.$el.addEventListener('submit', event => this._onSubmit(event));

        this._onInputChangeValidity(false);

        window.onpopstate = /** @param {PopStateEvent} ev */ ev => {
            if (ev.state && ev.state.isPasswordBoxInitialStep === true) {
                this.fire(PasswordSetterBox.Events.RESET);
                this.$el.classList.remove('repeat-short', 'repeat-long');
            }
        };
    }

    /**
     * @param {?HTMLFormElement} [$el]
     * @param {{bgColor: string, buttonI18nTag: string}} options
     * @returns {HTMLFormElement}
     */
    static _createElement($el, options) {
        $el = $el || document.createElement('form');
        $el.classList.add('password-box', 'actionbox', 'setter', `nq-${options.bgColor}-bg`);

        // To enable i18n validation with the dynamic nature of the password box's contents,
        // all possible i18n tags and texts have to be specified here in the below format to
        // enable the validator to find them with its regular expression.
        /* eslint-disable max-len */
        /** @type {{[i18nTag: string]: string}} */
        const buttonVersions = {
            'passwordbox-confirm': '<button class="submit show-in-repeat" data-i18n="passwordbox-confirm">Confirm</button>',
            'passwordbox-confirm-create': '<button class="submit show-in-repeat" data-i18n="passwordbox-confirm-create">Create account</button>',
            'passwordbox-confirm-log-in': '<button class="submit show-in-repeat" data-i18n="passwordbox-confirm-log-in">Log in</button>',
        };

        $el.innerHTML = TemplateTags.hasVars(1)`
            <div class="password-strength strength-short  nq-text-s" data-i18n="passwordbox-password-strength-short" >Enter 8 characters or more</div>
            <div class="password-strength strength-weak   nq-text-s" data-i18n="passwordbox-password-strength-weak"  >Weak password</div>
            <div class="password-strength strength-good   nq-text-s" data-i18n="passwordbox-password-strength-good"  >Good password</div>
            <div class="password-strength strength-strong nq-text-s" data-i18n="passwordbox-password-strength-strong">Strong password</div>
            <div class="password-strength strength-secure nq-text-s" data-i18n="passwordbox-password-strength-secure">Secure password</div>
            <div class="password-strength too-long nq-text-s" data-i18n="passwordbox-password-too-long">Max. 256 characters</div>

            <div class="repeat-long nq-text-s" data-i18n="passwordbox-repeat-password-long">No match, please try again</div>
            <div class="repeat-short nq-text-s" data-i18n="passwordbox-repeat-password-short">Password is too short</div>
            <div class="repeat-password nq-text-s" data-i18n="passwordbox-repeat-password">Repeat your password</div>

            <div password-input></div>

            <button class="submit" data-i18n="passwordbox-repeat">Repeat password</button>
            ${buttonVersions[options.buttonI18nTag]}

            <!-- Loading spinner SVG -->
            <svg height="48" width="54" color="inherit" class="loading-spinner"><g>
                <path class="big-hex" d="M51.9,21.9L41.3,3.6c-0.8-1.3-2.2-2.1-3.7-2.1H16.4c-1.5,0-2.9,0.8-3.7,2.1L2.1,21.9c-0.8,1.3-0.8,2.9,0,4.2 l10.6,18.3c0.8,1.3,2.2,2.1,3.7,2.1h21.3c1.5,0,2.9-0.8,3.7-2.1l10.6-18.3C52.7,24.8,52.7,23.2,51.9,21.9z" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.4" stroke-dasharray="92.5 60"/>
                <path class="small-hex" d="M51.9,21.9L41.3,3.6c-0.8-1.3-2.2-2.1-3.7-2.1H16.4c-1.5,0-2.9,0.8-3.7,2.1L2.1,21.9c-0.8,1.3-0.8,2.9,0,4.2 l10.6,18.3c0.8,1.3,2.2,2.1,3.7,2.1h21.3c1.5,0,2.9-0.8,3.7-2.1l10.6-18.3C52.7,24.8,52.7,23.2,51.9,21.9z" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="47.5 105"/>
            </g></svg>
        `;
        /* eslint-enable max-len */

        $el.querySelectorAll('button.submit').forEach(
            $button => $button.classList.add('nq-button', 'inverse', options.bgColor),
        );

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
        this._passwordInput.focus();
    }

    /**
     * @param {boolean} [isWrongPassword]
     */
    async reset(isWrongPassword) {
        this._password = '';

        if (isWrongPassword) await AnimationUtils.animate('shake', this.$el);
        else this._passwordInput.reset();

        this.$el.classList.remove('repeat');
    }

    async onPasswordIneligible() {
        await AnimationUtils.animate('shake', this.$el);
    }

    /**
     * @param {boolean} isValid
     */
    _onInputChangeValidity(isValid) {
        if (this._repeatPasswordTimout) {
            window.clearTimeout(this._repeatPasswordTimout);
            this._repeatPasswordTimout = null;
        }

        if (this._password) {
            if (this._passwordInput.text.length > 0 && this._passwordInput.text.length < this._password.length) {
                this._repeatPasswordTimout = window.setTimeout(
                    () => {
                        this.$el.classList.remove('repeat-long');
                        this.$el.classList.add('repeat-short');
                    },
                    400,
                );
            } else {
                this.$el.classList.remove('repeat-short', 'repeat-long');
            }
        }

        const score = PasswordStrength.strength(this._passwordInput.text);
        const length = this._passwordInput.text.length;

        this.$el.classList.toggle(
            'input-eligible',
            isValid && (!this._password || this._passwordInput.text.length >= this._password.length),
        );

        this.$el.classList.toggle('too-long', length > PasswordSetterBox.PASSWORD_MAX_LENGTH);
        this.$el.classList.toggle('strength-short', !isValid && length <= PasswordSetterBox.PASSWORD_MAX_LENGTH);
        this.$el.classList.toggle('strength-weak', isValid && score < PasswordStrength.Score.MINIMUM);
        this.$el.classList.toggle('strength-good',
            isValid
            && score >= PasswordStrength.Score.MINIMUM
            && score < PasswordStrength.Score.STRONG);
        this.$el.classList.toggle('strength-strong',
            isValid
            && score >= PasswordStrength.Score.STRONG
            && score < PasswordStrength.Score.SECURE);
        this.$el.classList.toggle('strength-secure', isValid && score >= PasswordStrength.Score.SECURE);
    }

    _isPasswordEligible() {
        return this._passwordInput.text.length >= PasswordInput.DEFAULT_MIN_LENGTH;
    }

    /**
     * @param {Event} event
     */
    async _onSubmit(event) {
        event.preventDefault();
        if (!this._isPasswordEligible()) {
            this.onPasswordIneligible();
            return;
        }
        if (!this._password) {
            this._password = this._passwordInput.text;
            this._passwordInput.reset();
            this.$el.classList.add('repeat');
            this.fire(PasswordSetterBox.Events.ENTERED);
            window.history.replaceState({ isPasswordBoxInitialStep: true }, 'Keyguard');
            window.history.pushState({ isPasswordBoxRepeatStep: true }, 'Keyguard');
            this._passwordInput.focus();
            return;
        }
        if (this._password === this._passwordInput.text) {
            this.fire(PasswordSetterBox.Events.SUBMIT, this._password);
            this._passwordInput.reset();
            return;
        }
        if (this._passwordInput.text.length >= this._password.length) {
            this.$el.classList.remove('repeat-short');
            this.$el.classList.add('repeat-long');
            await AnimationUtils.animate('shake', this.$el);
            this._passwordInput.focus();
        }
    }
}

PasswordSetterBox.Events = {
    SUBMIT: 'passwordbox-submit',
    ENTERED: 'passwordbox-entered',
    RESET: 'passwordbox-reset',
    LENGTH: 'passwordbox-length',
};

PasswordSetterBox.PASSWORD_MAX_LENGTH = 256;
/* global Nimiq */
/* global TemplateTags */

class ProgressIndicator extends Nimiq.Observable { // eslint-disable-line no-unused-vars
    /**
     * @param {?HTMLElement} $el
     * @param {number} numberOfSteps
     * @param {number} [currentStep]
     */
    constructor($el, numberOfSteps, currentStep) {
        super();
        this.$el = ProgressIndicator._createElement($el, numberOfSteps);
        this.setStep(currentStep || 0);
    }

    /**
     * @param {?HTMLElement} [$el]
     * @param {number} numberOfSteps
     * @returns {HTMLElement}
     */
    static _createElement($el, numberOfSteps) {
        $el = $el || document.createElement('div');
        $el.classList.add('progress-indicator');

        let html = '';

        for (let i = 0; i < numberOfSteps; i++) {
            html += TemplateTags.hasVars(1)`<div class="indicator step-${i + 1}"></div>`;
        }

        $el.innerHTML = html;

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

    /**
     * @param {number} step
     */
    setStep(step) {
        this.$el.setAttribute('data-step', step.toString());
    }
}
/* global Nimiq */
/* global I18n */
/* global LoginFile */
/* global KeyStore */
/* global Errors */
/* global IqonHash */
/* global TemplateTags */
/* global Utf8Tools */

class DownloadLoginFile extends Nimiq.Observable {
    /**
     * @param {HTMLDivElement} [$el]
     * @param {string} [description]
     */
    constructor($el, description) {
        super();

        this.$el = DownloadLoginFile._createElement($el, description);

        /** @type {LoginFile | null} */
        this._file = null;

        /** @type {HTMLImageElement} */
        this.$loginfile = (this.$el.querySelector('.loginfile'));

        /** @type {HTMLAnchorElement} */
        this.$loginfileLink = (this.$el.querySelector('.loginfile-link'));

        /** @type {HTMLAnchorElement} */
        this.$downloadButton = (this.$el.querySelector('.download-button'));

        /** @type {HTMLButtonElement} */
        this.$continueButton = (this.$el.querySelector('.continue'));

        /** @type {SVGElement} */
        this.$longTouchIndicator = (this.$el.querySelector('.long-touch-indicator'));

        this.$loginfile.addEventListener('mousedown', e => this._onMouseDown(e));
        this.$loginfile.addEventListener('touchstart', () => this._onTouchStart());
        this.$downloadButton.addEventListener('click', () => this._onDownloadStart());
        this.$continueButton.addEventListener('click', () => {
            this._onDownloadEnd();
            // Remove previously added classes after a short delay to restore the initial state.
            window.setTimeout(this._reset.bind(this), 300);
        });
    }

    /**
     * @param {?HTMLDivElement} [$el]
     * @param {?string} [description]
     * @returns {HTMLDivElement}
     */
    static _createElement($el, description) {
        $el = $el || document.createElement('div');
        $el.classList.add('download-loginfile');

        /* eslint-disable max-len */
        $el.innerHTML = TemplateTags.noVars`
            <a class="loginfile-link"><img class="loginfile" src=""></img></a>

            <svg class="long-touch-indicator" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <defs>
                    <clipPath id="hexClip-download-loginfile">
                        <path clip-rule="evenodd" d="M16 4.29h32l16 27.71l-16 27.71h-32l-16 -27.71zM20.62 12.29h22.76l11.38 19.71l-11.38 19.71h-22.76l-11.38 -19.71z"/>
                    </clipPath>
                </defs>
                <path fill-rule="evenodd" d="M16 4.29h32l16 27.71l-16 27.71h-32l-16 -27.71zM20.62 12.29h22.76l11.38 19.71l-11.38 19.71h-22.76l-11.38 -19.71z" fill="white" opacity="0.2"/>
                <g clip-path="url(#hexClip-download-loginfile)">
                    <circle id="circle" cx="32" cy="32" r="16" fill="none" stroke-width="32" stroke-dasharray="100.53 100.53" transform="rotate(-120 32 32)"/>
                </g>
            </svg>

            <p class="loginfile-description"></p>

            <div class="actions">
                <span class="nq-label tap-and-hold" data-i18n="download-loginfile-tap-and-hold">
                    Tap and hold image
                    to download
                </span>
                <a class="nq-button light-blue download-button">
                    <svg class="nq-icon"><use xlink:href="/assets/nimiq-style.icons.svg#nq-download"/></svg>
                    <span data-i18n="download-loginfile-download">Download</span>
                </a>
                <button class="nq-button light-blue continue" disabled>
                    <span data-i18n="download-loginfile-continue">Continue</span>
                    <svg class="nq-icon"><use xlink:href="/assets/nimiq-style.icons.svg#nq-caret-right-small"/></svg>
                </button>
            </div>
        `;
        /* eslint-enable max-len */

        if (description) {
            /** @type {HTMLParagraphElement} */
            const $description = ($el.querySelector('.loginfile-description'));
            $description.textContent = description;
            $description.classList.add('visible');
        }

        I18n.translateDom($el);
        return $el;
    }

    /**
     * @param {Uint8Array} encryptedEntropy
     * @param {Nimiq.Address} firstAddress
     * @param {string} [label = '']
     */
    setEncryptedEntropy(encryptedEntropy, firstAddress, label = '') {
        if (encryptedEntropy.byteLength !== KeyStore.ENCRYPTED_SECRET_SIZE) {
            throw new Errors.KeyguardError('Can only export encrypted Entropies');
        }
        // Remove previously added classes to restore the initial state.
        this._reset();

        if (label) {
            // Add label bytes to the end of the encrypted entropy
            const labelBytes = Utf8Tools.stringToUtf8ByteArray(label.trim());
            if (labelBytes.byteLength > 255) {
                // Should not happen for labels parsed via RequestParser.parseLabel as these are restricted to 63 bytes.
                throw new Errors.KeyguardError('Account label too long.');
            }
            const newData = new Nimiq.SerialBuffer(encryptedEntropy.byteLength + 1 + labelBytes.byteLength);
            newData.write(encryptedEntropy);
            newData.writeUint8(labelBytes.byteLength);
            newData.write(labelBytes);
            encryptedEntropy = newData;
        }

        const color = IqonHash.getBackgroundColorIndex(firstAddress.toUserFriendlyAddress());
        this.file = new LoginFile(Nimiq.BufferUtils.toBase64(encryptedEntropy), color, label);
    }

    /**
     * @param {Nimiq.Address} firstAddress
     */
    createDummyFile(firstAddress) {
        const color = IqonHash.getBackgroundColorIndex(firstAddress.toUserFriendlyAddress());
        this.file = new LoginFile(Nimiq.BufferUtils.toBase64(new Uint8Array(0)), color);
    }

    /**
     * @param {string} href
     * @param {string} filename
     */
    _setupDownload(href, filename) {
        if (this._supportsNativeDownload()) {
            // Setup native download
            this.$downloadButton.href = href;
            this.$downloadButton.download = filename;
        } else {
            // Setup fallback download
            // Hack to make image downloadable on iOS via long tap.
            this.$loginfileLink.href = 'javascript:void(0);'; // eslint-disable-line no-script-url
            this.$el.classList.add('fallback-download');
        }
    }

    /**
     * Detect if browser supports native `download` attribute
     *
     * @returns {boolean}
     */
    _supportsNativeDownload() {
        return typeof this.$downloadButton.download !== 'undefined';
    }

    /**
     * Also gets triggered after touchstart.
     *
     * @param {MouseEvent} event
     */
    _onMouseDown(event) {
        /** @type {HTMLElement} */
        const target = (event.target);
        // Clicks on the continue or download buttons are already covered by a 'click' handler.
        if (target.matches('.continue') || target.matches('.download-button')) return;

        if (event.button === 2) { // secondary button
            this._onDownloadStart(true);
        }
    }

    async _onDownloadStart(fromContextMenu = false) {
        // Cancel previous download listeners
        if (this._cancelDownload) {
            this._cancelDownload();
        }
        try {
            await new Promise((resolve, reject) => {
                if (!fromContextMenu) {
                    // Add delay timeout if not initiated from context menu.
                    // ("Save as" always opens a dialog.)

                    // If no download dialog opens, consider the download successful after a delay. On Macs it takes a
                    // bit longer until the dialog gets focused and the window blurred, therefore waiting 1s.
                    window.setTimeout(resolve, 1000);
                }
                window.addEventListener('blur', resolve, { once: true });
                this._cancelDownload = reject;
            });

            this.fire(DownloadLoginFile.Events.INITIATED);

            this._maybeDownloaded();
        } catch (e) {
            // do nothing
        } finally {
            this._cancelDownload = null;
        }
    }

    /**
     * @param {MouseEvent} [event]
     */
    _onDownloadEnd(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.fire(DownloadLoginFile.Events.DOWNLOADED);
    }

    async _onTouchStart() {
        if (this._supportsNativeDownload()) return;

        // If no native download is supported, show the long-tap-indicator
        // and restart the animation
        this.$longTouchIndicator.style.display = 'block';
        this.$longTouchIndicator.classList.add('animate');

        try {
            await new Promise((resolve, reject) => {
                // Consider the long-touch successfull after LONG_TOUCH_DURATION
                window.setTimeout(resolve, DownloadLoginFile.LONG_TOUCH_DURATION);
                this.$loginfile.addEventListener('touchstart', reject, { once: true }); // Second finger cancels overlay
                this.$loginfile.addEventListener('touchend', reject, { once: true });
            });

            this._maybeDownloaded();
        } catch (e) {
            // do nothing
        } finally {
            this.$longTouchIndicator.style.display = 'none';
            this.$longTouchIndicator.classList.remove('animate');
        }
    }

    _maybeDownloaded() {
        this.$el.classList.add('maybe-downloaded');
        this.$continueButton.disabled = false;
    }

    _reset() {
        this.$el.classList.remove('maybe-downloaded');
        this.$continueButton.disabled = true;
        this.fire(DownloadLoginFile.Events.RESET);
    }

    get file() {
        return this._file;
    }

    set file(file) {
        this._file = file;

        if (file) {
            file.toObjectUrl().then(objectUrl => {
                this.$loginfile.src = objectUrl;
                this._setupDownload(objectUrl, file.filename());
            });
        } else {
            this.$loginfile.src = '';
        }
    }
}

DownloadLoginFile.Events = {
    DOWNLOADED: 'loginfile-downloaded',
    INITIATED: 'loginfile-download-initiated',
    RESET: 'loginfile-download-reset',
};

DownloadLoginFile.LONG_TOUCH_DURATION = 800; // iOS Safari long-touch duration
class FlippableHandler {
    /**
     * Classname 'flipped' is the default flippable name, and has its css already available.
     * If other classes should be flipped to the backside they need to be added to FlippableHandler.css
     * @param {string} [classname = "flipped"] - Pages with this classname will be on the backside of the flip.
     */
    static init(classname = 'flipped') {
        if (!FlippableHandler.flippableHandlerInitialised) {
            /** @type {HTMLElement} */
            const $rotationContainer = (document.getElementById('rotation-container'));
            if (window.location.hash) {
                const $page = document.querySelector(window.location.hash);
                if ($page) {
                    $rotationContainer.classList.add('disable-transition');
                    FlippableHandler._updateContainerHeight($page);
                    window.setTimeout(() => {
                        $rotationContainer.classList.toggle('flipped', $page.classList.contains(classname));
                        window.setTimeout(() => $rotationContainer.classList.remove('disable-transition'), 10);
                    }, 0);
                }
            }
            window.addEventListener('hashchange', event => {
                const newHash = new URL(event.newURL).hash;
                const oldHash = new URL(event.oldURL).hash;
                if (oldHash && newHash) {
                    const $oldEl = document.querySelector(oldHash);
                    const $newEl = document.querySelector(newHash);
                    if ($newEl && $oldEl
                        && $newEl.classList.contains(classname) !== $oldEl.classList.contains(classname)) {
                        $newEl.classList.add('display-flex');
                        window.setTimeout(() => $newEl.classList.remove('display-flex'), 600);
                        $oldEl.classList.add('display-flex');
                        window.setTimeout(() => $oldEl.classList.remove('display-flex'), 300);
                        window.setTimeout(() => {
                            $rotationContainer.classList.toggle('flipped', $newEl.classList.contains(classname));
                            FlippableHandler._updateContainerHeight($newEl);
                        }, 0);
                    } else {
                        FlippableHandler._updateContainerHeight($newEl || undefined);
                    }
                } else if (newHash) {
                    const $newEl = document.querySelector(newHash);
                    if ($newEl && $newEl.classList.contains(classname)) {
                        $rotationContainer.classList.add('disable-transition');
                        FlippableHandler._updateContainerHeight($newEl);
                        window.setTimeout(() => {
                            $rotationContainer.classList.toggle('flipped', $newEl.classList.contains(classname));
                            window.setTimeout(() => $rotationContainer.classList.remove('disable-transition'), 10);
                        }, 0);
                    } else {
                        $rotationContainer.classList.add('disable-transition');
                        FlippableHandler._updateContainerHeight($newEl || undefined);
                        window.setTimeout(() => {
                            $rotationContainer.classList.remove('disable-transition');
                        }, 0);
                    }
                }
            });
            FlippableHandler.flippableHandlerInitialised = true;
        }
    }

    /**
     * Update the height of the #rotation-container element to match its content.
     * The default behavior is to look for every visible `.page` element,
     * and, if there are multiple, take the height of the higher.
     * @param {Element} [$enforcedElement] - Enforce which element the function is taking the height from.
     *  Must be a child of `#rotation-container`
     */
    static _updateContainerHeight($enforcedElement) {
        /** @type {HTMLElement} */
        const $rotationContainer = (document.getElementById('rotation-container'));
        if ($enforcedElement && $rotationContainer.contains($enforcedElement)) {
            $rotationContainer.style.height = `${$enforcedElement.clientHeight}px`;
        } else {
            /** @type {Array<HTMLElement>} */
            const $pages = Array.from($rotationContainer.querySelectorAll('.page'));
            if ($pages && $pages.length > 0) {
                const heights = $pages.map($el => $el.clientHeight);
                const visiblePageHeight = Math.max(...heights);
                $rotationContainer.style.height = visiblePageHeight > 0 ? `${visiblePageHeight}px` : '';
            }
        }
    }
}
FlippableHandler.flippableHandlerInitialised = false;
/* global Nimiq */
/* global I18n */
/* global Identicon */
/* global TemplateTags */

class IdenticonSelector extends Nimiq.Observable {
    /**
     * @param {HTMLElement} [$el]
     * @param {string} keyPath
     */
    constructor($el, keyPath) {
        super();

        this._keyPath = keyPath;

        this.$el = IdenticonSelector._createElement($el);

        /** @type {{ [address: string]: Nimiq.Entropy}} */
        this._volatileEntropies = {};

        this.$identicons = /** @type {HTMLElement} */ (this.$el.querySelector('.identicons'));
        this.$generateMoreButton = /** @type {HTMLElement} */ (this.$el.querySelector('.generate-more'));

        this.$generateMoreButton.addEventListener('click', this.generateIdenticons.bind(this));
    }

    /**
     * @param {HTMLElement} [$el]
     *
     * @returns {HTMLElement}
     */
    static _createElement($el) {
        $el = $el || document.createElement('div');
        $el.classList.add('identicon-selector');

        $el.innerHTML = TemplateTags.noVars`
            <div class="identicons"></div>
            <p data-i18n="identicon-selector-avatars-hint">Avatars represent NIM addresses.</p>
            <p data-i18n="identicon-selector-avatars-hint-2">Think of them as bank account numbers.</p>
            <button class="generate-more nq-button-s" data-i18n="identicon-selector-generate-new">
                New avatars
            </button>`;

        I18n.translateDom($el);
        return $el;
    }

    /**
     * @returns {HTMLElement}
     */
    getElement() {
        return this.$el;
    }

    generateIdenticons() {
        this.$generateMoreButton.blur();
        this.$el.classList.remove('active');

        /** @type {{[address: string]: Nimiq.Entropy}} */
        const entropies = {};

        for (let i = 0; i < 7; i++) {
            const entropy = Nimiq.Entropy.generate();
            if (!Nimiq.MnemonicUtils.isCollidingChecksum(entropy)) {
                const masterKey = entropy.toExtendedPrivateKey();
                const key = masterKey.derivePath(this._keyPath);
                const address = key.toAddress().toUserFriendlyAddress();
                entropies[address] = entropy;
            } else {
                // Try again.
                i -= 1;
            }
        }

        this._volatileEntropies = entropies;

        this.$identicons.textContent = '';

        Object.keys(entropies).forEach(address => {
            const $wrapper = document.createElement('a');
            $wrapper.classList.add('wrapper');
            $wrapper.setAttribute('tabindex', '0');
            $wrapper.setAttribute('href', '#');

            const identicon = new Identicon(address);
            const $identicon = identicon.getElement();

            $wrapper.appendChild($identicon);

            $wrapper.addEventListener('click', e => this._onSelectionConfirmed(address, e));

            this.$identicons.appendChild($wrapper);
        });

        setTimeout(() => this.$el.classList.add('active'), 100);
    }

    /**
     * @param {string} selectedAddress
     * @param {Event} e
     * @private
     */
    _onSelectionConfirmed(selectedAddress, e) {
        e.preventDefault();

        this.fire(
            IdenticonSelector.Events.IDENTICON_SELECTED,
            this._volatileEntropies[selectedAddress],
            selectedAddress,
        );
    }
}

IdenticonSelector.Events = {
    IDENTICON_SELECTED: 'identicon-selected',
};
/* global IdenticonSelector */
/* global PasswordSetterBox */
/* global Key */
/* global KeyStore */
/* global ProgressIndicator */
/* global Utf8Tools */
/* global TopLevelApi */
/* global Identicon */
/* global BitcoinKey */
/* global IqonHash */
/* global LoginFileAnimation */
/* global DownloadLoginFile */
/* global I18n */
/* global FlippableHandler */
/* global LoginFileConfig */

/**
 * @callback Create.resolve
 * @param {KeyguardRequest.KeyResult} result
 */

class Create {
    /**
     * @param {KeyguardRequest.CreateRequest} request
     * @param {Create.resolve} resolve
     * @param {reject} reject
     */
    constructor(request, resolve, reject) {
        this._resolve = resolve;
        this._reject = reject;

        this._password = '';

        FlippableHandler.init();

        /** @type {HTMLDivElement} */
        this.$identiconSelector = (document.querySelector('.identicon-selector'));

        /** @type {HTMLDivElement} */
        const $overlayContainer = (document.querySelector('.overlay-container'));

        /** @type {HTMLButtonElement} */
        const $overlayCloseButton = (document.querySelector('.overlay-container .overlay .close-overlay'));

        /** @type {HTMLButtonElement} */
        const $confirmAddressButton = (document.querySelector('.confirm-address'));

        /** @type {HTMLDivElement} */
        this.$loginFileAnimation = (document.querySelector('.login-file-animation'));

        /** @type {HTMLFormElement} */
        const $setPassword = (document.querySelector('.password-box'));

        /** @type {HTMLFormElement} */
        this.$setPasswordPage = (document.getElementById('set-password'));

        /** @type {HTMLElement} */
        const $downloadFilePage = (document.getElementById(Create.Pages.LOGIN_FILE_DOWNLOAD));
        /** @type {HTMLDivElement} */
        const $downloadLoginFile = (document.querySelector('.download-loginfile'));

        /** @type {HTMLImageElement} */
        const $loginFilePreviewImage = (document.getElementById('loginfile-preview'));

        /** @type {HTMLButtonElement} */
        const $loginFileExplainerBackButton = (document.getElementById('loginfile-explainer-go-back'));

        // Create components

        this._identiconSelector = new IdenticonSelector(this.$identiconSelector, request.defaultKeyPath);
        this._loginFileAnimation = new LoginFileAnimation(this.$loginFileAnimation);
        this._passwordSetter = new PasswordSetterBox($setPassword, { buttonI18nTag: 'passwordbox-confirm-create' });
        this._downloadLoginFile = new DownloadLoginFile(
            $downloadLoginFile,
            I18n.translatePhrase('create-loginfile-any-device'),
        );
        // Set up progress indicators
        /* eslint-disable no-new */
        new ProgressIndicator(document.querySelector(`#${Create.Pages.CHOOSE_IDENTICON} .progress-indicator`), 3, 1);
        new ProgressIndicator(document.querySelector(`#${Create.Pages.SET_PASSWORD} .progress-indicator`), 3, 2);
        new ProgressIndicator(document.querySelector(`#${Create.Pages.LOGIN_FILE_DOWNLOAD} .progress-indicator`), 3, 3);
        /* eslint-enable no-new */

        // Wire up logic

        this._identiconSelector.on(
            IdenticonSelector.Events.IDENTICON_SELECTED,
            /**
             * @param {Nimiq.Entropy} entropy
             * @param {string} address
            */
            (entropy, address) => {
                this._selectedEntropy = entropy;
                this._selectedAddress = address;

                // eslint-disable-next-line no-new
                new Identicon(
                    address,
                    /** @type {HTMLDivElement} */($overlayContainer.querySelector('#identicon')),
                );

                /** @type {HTMLDivElement} */
                const $address = ($overlayContainer.querySelector('#address'));
                // last space is necessary for the rendering to work properly with white-space: pre-wrap.
                $address.textContent = `${address} `;

                window.location.hash = Create.Pages.CONFIRM_IDENTICON;
            },
        );

        this._downloadLoginFile.on(DownloadLoginFile.Events.INITIATED, () => {
            $downloadFilePage.classList.add(DownloadLoginFile.Events.INITIATED);
        });

        this._downloadLoginFile.on(DownloadLoginFile.Events.RESET, () => {
            $downloadFilePage.classList.remove(DownloadLoginFile.Events.INITIATED);
        });

        this._downloadLoginFile.on(DownloadLoginFile.Events.DOWNLOADED, () => {
            this.finish(request);
        });

        $overlayCloseButton.addEventListener('click', () => window.history.back());

        $confirmAddressButton.addEventListener('click', () => {
            window.location.hash = Create.Pages.SET_PASSWORD;
            this._passwordSetter.reset();
            TopLevelApi.focusPasswordBox();
        });

        this._passwordSetter.on(PasswordSetterBox.Events.SUBMIT, /** @param {string} password */ async password => {
            this._password = password;

            // Set up LoginFile
            const key = new Key(this._selectedEntropy);
            const passwordBuffer = Utf8Tools.stringToUtf8ByteArray(password);
            const encryptedSecret = await key.secret.exportEncrypted(passwordBuffer);

            this._downloadLoginFile.setEncryptedEntropy(encryptedSecret, key.defaultAddress);
            // Reset to initial state
            $downloadFilePage.classList.remove(DownloadLoginFile.Events.INITIATED);

            window.location.hash = Create.Pages.LOGIN_FILE_DOWNLOAD;
        });

        this._passwordSetter.on(PasswordSetterBox.Events.ENTERED, () => {
            this.$setPasswordPage.classList.add('repeat-password');
            const colorIndex = IqonHash.getBackgroundColorIndex(this._selectedAddress);
            this._loginFileAnimation.setColor(colorIndex);
            $loginFilePreviewImage.classList.add(LoginFileConfig[colorIndex].className);
        });

        this._passwordSetter.on(PasswordSetterBox.Events.RESET, this.backToEnterPassword.bind(this));

        this._passwordSetter.on(PasswordSetterBox.Events.LENGTH, length => this._loginFileAnimation.setStep(length));

        $loginFileExplainerBackButton.addEventListener('click', () => window.history.back());

        if (request.enableBackArrow) {
            /** @type {HTMLElement} */
            (document.querySelector('#choose-identicon .page-header-back-button')).classList.remove('display-none');
        }
    } // constructor

    backToEnterPassword() {
        this.$setPasswordPage.classList.remove('repeat-password');
        this._loginFileAnimation.reset();
        this._passwordSetter.reset();

        TopLevelApi.focusPasswordBox();
    }

    /**
     * @param {KeyguardRequest.CreateRequest} request
     */
    async finish(request) {
        TopLevelApi.setLoading(true);
        const key = new Key(this._selectedEntropy);
        const password = this._password.length > 0 ? Utf8Tools.stringToUtf8ByteArray(this._password) : undefined;
        await KeyStore.instance.put(key, password);

        const keyPath = request.defaultKeyPath;

        /** @type {KeyguardRequest.KeyResult} */
        const result = [{
            keyId: key.id,
            keyType: key.type,
            addresses: [{
                address: key.deriveAddress(keyPath).serialize(),
                keyPath,
            }],
            fileExported: true,
            wordsExported: false,
            bitcoinXPub: new BitcoinKey(key).deriveExtendedPublicKey(request.bitcoinXPubPath),
        }];

        this._resolve(result);
    }

    run() {
        // go to start page
        window.location.hash = Create.Pages.CHOOSE_IDENTICON;
        this._identiconSelector.generateIdenticons();
    }
}

Create.Pages = {
    CHOOSE_IDENTICON: 'choose-identicon',
    CONFIRM_IDENTICON: 'confirm-identicon',
    SET_PASSWORD: 'set-password',
    LOGIN_FILE_DOWNLOAD: 'login-file-download',
    LOGIN_FILE_EXPLAINER: 'login-file-explainer',
};
/* global BitcoinRequestParserMixin */
/* global TopLevelApi */
/* global Create */
/* global Errors */

class CreateApi extends BitcoinRequestParserMixin(TopLevelApi) { // eslint-disable-line no-unused-vars
    /**
     * @param {KeyguardRequest.CreateRequest} request
     * @returns {Promise<KeyguardRequest.CreateRequest>}
     */
    async parseRequest(request) {
        if (!request) {
            throw new Errors.InvalidRequestError('request is required');
        }

        const parsedRequest = {};
        parsedRequest.appName = this.parseAppName(request.appName);
        parsedRequest.defaultKeyPath = this.parsePath(request.defaultKeyPath, 'defaultKeyPath');
        parsedRequest.enableBackArrow = this.parseBoolean(request.enableBackArrow);
        parsedRequest.bitcoinXPubPath = this.parseBitcoinPath(request.bitcoinXPubPath, 'bitcoinXPubPath');

        return parsedRequest;
    }

    get Handler() {
        return Create;
    }
}
/* global CreateApi */
/* global runKeyguard */

runKeyguard(CreateApi);
