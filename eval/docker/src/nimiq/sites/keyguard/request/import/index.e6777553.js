/*
    JavaScript autoComplete v1.0.4
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/JavaScript-autoComplete
    License: http://www.opensource.org/licenses/mit-license.php
*/

class AutoComplete { // eslint-disable-line no-unused-vars
    /**
     * @param {Object} options
     */
    constructor(options) {
        if (!document.querySelector) return;

        // helpers
        /**
         * @param {string} elClass
         * @param {string} event
         * @param {function(HTMLElement, Event):void} cb
         * @param {Node} context
         */
        function live(elClass, event, cb, context = document) {
            context.addEventListener(event, e => {
                let el = /** @type {HTMLElement | null} */ (e.target || e.srcElement);
                let found = false;
                do {
                    if (!el) break;
                    found = !!el && el.classList.contains(elClass);
                    if (found) break;
                    el = el.parentElement;
                } while (!found);
                if (el && found) cb((/** @type {HTMLElement} */ (el)), e);
            });
        }

        const defaultOptions = {
            selector: 0,
            source: 0,
            minChars: 3,
            delay: 150,
            offsetLeft: 0,
            offsetTop: 1,
            cache: 1,
            menuClass: '',
            renderItem: /** @param {string} item */ item => {
                const element = document.createElement('div');
                element.classList.add('autocomplete-suggestion');
                element.dataset.val = item;
                element.textContent = item;
                return element;
            },
            // onSelect: /** @param {Event} e @param {string} term @param {Element} item */ (e, term, item) => {},
            onSelect: () => {},
        };
        const o = Object.assign(defaultOptions, options);

        // init
        this.elems = typeof o.selector === 'object' ? [o.selector] : document.querySelectorAll(o.selector);
        for (let i = 0; i < this.elems.length; i++) {
            const that = this.elems[i];

            // create suggestions container "sc"
            that.sc = document.createElement('div');
            that.sc.className = `autocomplete-suggestions ${o.menuClass}`;

            that.autocompleteAttr = that.getAttribute('autocomplete');
            that.setAttribute('autocomplete', 'off');
            that.cache = {};
            that.last_val = '';

            that.updateSC = /** @param {boolean} resize @param {Element} next */ (resize, next) => {
                const rect = that.getBoundingClientRect();
                const scrollX = window.pageXOffset || (document.documentElement && document.documentElement.scrollLeft);
                const scrollY = window.pageYOffset || (document.documentElement && document.documentElement.scrollTop);
                that.sc.style.left = `${Math.round(rect.left + scrollX + o.offsetLeft)}px`;
                that.sc.style.top = `${Math.round(rect.bottom + scrollY + o.offsetTop)}px`;
                that.sc.style.width = `${Math.round(rect.right - rect.left)}px`; // outerWidth
                if (!resize) {
                    that.sc.style.display = 'block';
                    if (!that.sc.maxHeight) {
                        const style = window.getComputedStyle ? getComputedStyle(that.sc, null) : that.sc.currentStyle;
                        that.sc.maxHeight = parseInt(style.maxHeight, 10);
                    }
                    if (!that.sc.suggestionHeight) {
                        that.sc.suggestionHeight = that.sc.querySelector('.autocomplete-suggestion').offsetHeight;
                    }
                    if (that.sc.suggestionHeight) {
                        if (!next) that.sc.scrollTop = 0;
                        else {
                            const scrTop = that.sc.scrollTop; const
                                selTop = next.getBoundingClientRect().top - that.sc.getBoundingClientRect().top;
                            if (selTop + that.sc.suggestionHeight - that.sc.maxHeight > 0) {
                                that.sc.scrollTop = selTop + that.sc.suggestionHeight + scrTop - that.sc.maxHeight;
                            } else if (selTop < 0) {
                                that.sc.scrollTop = selTop + scrTop;
                            }
                        }
                    }
                }
            };
            window.addEventListener('resize', that.updateSC);
            document.body.appendChild(that.sc);

            live('autocomplete-suggestion', 'mouseleave', () => {
                const sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                if (sel) setTimeout(() => { sel.classList.remove('selected'); }, 20);
            }, that.sc);

            live('autocomplete-suggestion', 'mouseover', el => {
                const sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                if (sel) sel.classList.remove('selected');
                el.classList.add('selected');
            }, that.sc);

            live('autocomplete-suggestion', 'mousedown', (el, e) => {
                if (el.classList.contains('autocomplete-suggestion')) { // else outside click
                    const v = el.dataset.val;
                    that.value = v;
                    o.onSelect(e, v, el);
                    that.sc.style.display = 'none';
                }
            }, that.sc);

            that.blurHandler = () => {
                that.last_val = that.value;
                that.sc.style.display = 'none';
                setTimeout(() => { that.sc.style.display = 'none'; }, 350); // hide suggestions on fast input
            };
            that.addEventListener('blur', that.blurHandler);

            /** @param {string[]} data */
            const suggest = data => {
                const val = that.value;
                that.cache[val] = data;
                if (data.length && val.length >= o.minChars) {
                    that.sc.innerHTML = '';
                    for (let x = 0; x < data.length; x++) {
                        that.sc.appendChild(o.renderItem(data[x]));
                    }
                    that.updateSC(0);
                    if (that.sc.childNodes.length === 1) {
                        that.sc.childNodes[0].className += ' selected';
                    }
                } else that.sc.style.display = 'none';
            };

            /**
             * @param {KeyboardEvent} e
             * @returns {boolean}
             */
            that.keydownHandler = e => {
                const key = window.event ? e.keyCode : e.which;
                // down (40), up (38)
                if ((key === 40 || key === 38) && that.sc.innerHTML) {
                    let next;
                    const sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                    if (!sel) {
                        next = (key === 40) ? that.sc.querySelector('.autocomplete-suggestion')
                            : that.sc.childNodes[that.sc.childNodes.length - 1]; // first : last
                        next.className += ' selected';
                        that.value = next.getAttribute('data-val');
                    } else {
                        next = (key === 40) ? sel.nextSibling : sel.previousSibling;
                        if (next) {
                            sel.className = sel.className.replace('selected', '');
                            next.className += ' selected';
                            that.value = next.getAttribute('data-val');
                        } else {
                            sel.className = sel.className.replace('selected', '');
                            that.value = that.last_val; next = 0;
                        }
                    }
                    that.updateSC(0, next);
                    return false;
                }
                // esc
                if (key === 27) {
                    that.value = that.last_val;
                    that.sc.style.display = 'none';
                } else if (key === 13 || key === 9 || key === 32) {
                    const sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                    if (sel && that.sc.style.display !== 'none') {
                        o.onSelect(e, sel.getAttribute('data-val'), sel);
                        setTimeout(() => { that.sc.style.display = 'none'; }, 20);
                    }
                }
                return true;
            };
            that.addEventListener('keydown', that.keydownHandler);

            that.keyupHandler = /** @param {KeyboardEvent} e */ e => {
                const key = window.event ? e.keyCode : e.which;
                if (!key || ((key < 35 || key > 40) && key !== 13 && key !== 27)) {
                    const val = that.value;
                    if (val.length >= o.minChars) {
                        if (val !== that.last_val) {
                            that.last_val = val;
                            clearTimeout(that.timer);
                            if (o.cache) {
                                if (val in that.cache) { suggest(that.cache[val]); return; }
                                // no requests if previous suggestions were empty
                                for (let x = 1; x < val.length - o.minChars; x++) {
                                    const part = val.slice(0, val.length - x);
                                    if (part in that.cache && !that.cache[part].length) { suggest([]); return; }
                                }
                            }
                            that.timer = setTimeout(() => { o.source(val, suggest); }, o.delay);
                        }
                    } else {
                        that.last_val = val;
                        that.sc.style.display = 'none';
                    }
                }
            };
            that.addEventListener('keyup', that.keyupHandler);

            that.focusHandler = /** @param {Event} e */ e => {
                that.last_val = '\n';
                that.keyupHandler(e);
            };
            if (!o.minChars) that.addEventListener('focus', that.focusHandler);
        }
    }

    destroy() {
        for (let i = 0; i < this.elems.length; i++) {
            const that = this.elems[i];
            window.removeEventListener('resize', that.updateSC);
            that.removeEventListener('blur', that.blurHandler);
            that.removeEventListener('focus', that.focusHandler);
            that.removeEventListener('keydown', that.keydownHandler);
            that.removeEventListener('keyup', that.keyupHandler);
            if (that.autocompleteAttr !== undefined) that.setAttribute('autocomplete', that.autocompleteAttr);
            else that.removeAttribute('autocomplete');
            document.body.removeChild(that.sc);
        }
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
/* eslint-disable prefer-promise-reject-errors, no-throw-literal */
/* global BarcodeDetector */

/**
 * @typedef {{
 *     x?: number,
 *     y?: number,
 *     width?: number,
 *     height?: number,
 *     downScaledWidth?: number,
 *     downScaledHeight?: number,
 * }} ScanRegion
 */

class QrScanner {
    /**
     * @returns {Promise<boolean>}
     */
    static async hasCamera() {
        if (!navigator.mediaDevices) return false;
        // note that enumerateDevices can always be called and does not prompt the user for permission. However, device
        // labels are only readable if served via https and an active media stream exists or permanent permission is
        // given. That doesn't matter for us though as we don't require labels.
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            return devices.some(device => device.kind === 'videoinput');
        } catch (error) {
            return false;
        }
    }

    // eslint-disable-next-line valid-jsdoc
    /**
     * @param {HTMLVideoElement} video
     * @param {(result: string) => any} onDecode
     * @param {(error: string) => any} [onDecodeError]
     * @param {(video: HTMLVideoElement) => ScanRegion} [calculateScanRegion]
     * @param {'environment' | 'user'} [preferredFacingMode = 'environment']
     */
    constructor(
        video,
        onDecode,
        onDecodeError,
        calculateScanRegion,
        preferredFacingMode = 'environment',
    ) {
        this.$video = video;
        this.$canvas = document.createElement('canvas');
        this._onDecode = onDecode;
        this._onDecodeError = onDecodeError || this._onDecodeError;
        this._calculateScanRegion = calculateScanRegion || this._calculateScanRegion;
        this._preferredFacingMode = preferredFacingMode;
        this._active = false;
        this._paused = false;

        this._scanRegion = this._calculateScanRegion(video);

        this._onPlay = this._onPlay.bind(this);
        this._onLoadedMetaData = this._onLoadedMetaData.bind(this);
        this._onVisibilityChange = this._onVisibilityChange.bind(this);

        // Allow inline playback on iPhone instead of requiring full screen playback,
        // see https://webkit.org/blog/6784/new-video-policies-for-ios/
        // @ts-ignore Property 'playsInline' does not exist on type 'HTMLVideoElement'
        this.$video.playsInline = true;
        // Allow play() on iPhone without requiring a user gesture. Should not really be needed as camera stream
        // includes no audio, but just to be safe.
        this.$video.muted = true;
        // @ts-ignore Property 'disablePictureInPicture' does not exist on type 'HTMLVideoElement'
        this.$video.disablePictureInPicture = true;
        this.$video.addEventListener('play', this._onPlay);
        this.$video.addEventListener('loadedmetadata', this._onLoadedMetaData);
        document.addEventListener('visibilitychange', this._onVisibilityChange);

        this._qrEnginePromise = QrScanner.createQrEngine();
    }

    destroy() {
        this.$video.removeEventListener('loadedmetadata', this._onLoadedMetaData);
        this.$video.removeEventListener('play', this._onPlay);
        document.removeEventListener('visibilitychange', this._onVisibilityChange);

        this.stop();
        QrScanner._postWorkerMessage(this._qrEnginePromise, 'close');
    }

    async start() {
        if (this._active && !this._paused) return;

        if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
            // warn but try starting the camera anyways
            console.warn('The camera stream is only accessible if the page is transferred via https.');
        }
        this._active = true;
        this._paused = false;
        if (document.hidden) return; // camera will be started as soon as tab is in foreground

        window.clearTimeout(this._offTimeout);
        this._offTimeout = undefined;
        if (this.$video.srcObject) {
            // camera stream already/still set
            this.$video.play();
            return;
        }

        try {
            let facingMode = this._preferredFacingMode;
            /** @type {MediaStream} */
            let stream;
            try {
                stream = await this._getCameraStream(facingMode, true);
            } catch (error) {
                // We (probably) don't have a camera of the requested facing mode
                facingMode = facingMode === 'environment' ? 'user' : 'environment';
                stream = await this._getCameraStream(); // throws if camera is not accessible (e.g. due to not https)
            }

            // Try to determine the facing mode from the stream, otherwise use our guess. Note that the guess is not
            // always accurate as Safari returns cameras of different facing mode, even for exact constraints.
            facingMode = this._getFacingMode(stream) || facingMode;
            this.$video.srcObject = stream;
            this.$video.play();
            this._setVideoMirror(facingMode);
        } catch (error) {
            this._active = false;
            throw error;
        }
    }

    stop() {
        this.pause();
        this._active = false;
    }

    pause() {
        this._paused = true;
        if (!this._active) {
            return;
        }
        this.$video.pause();
        if (this._offTimeout) {
            return;
        }
        this._offTimeout = window.setTimeout(() => {
            const tracks = this.$video.srcObject && this.$video.srcObject instanceof MediaStream
                ? this.$video.srcObject.getTracks()
                : [];
            for (const track of tracks) {
                track.stop();
            }
            this.$video.srcObject = null;
            this._offTimeout = undefined;
        }, 300);
    }

    /**
     * @param {HTMLImageElement | HTMLVideoElement | string} imageOrVideoOrUrl
     * @param {ScanRegion} [scanRegion]
     * @param {Promise<Worker | BarcodeDetector>} [givenEngine]
     * @param {HTMLCanvasElement} [givenCanvas]
     * @param {boolean} [alsoTryWithoutScanRegion = false]
     * @returns {Promise<string>}
     */
    static async scanImage(
        imageOrVideoOrUrl,
        scanRegion,
        givenEngine,
        givenCanvas,
        alsoTryWithoutScanRegion = false,
    ) {
        const qrEngine = givenEngine || QrScanner.createQrEngine();
        /** @type {HTMLCanvasElement | undefined} */
        let usedCanvas;

        try {
            const [engine, image] = await Promise.all([
                qrEngine,
                QrScanner._loadImage(imageOrVideoOrUrl),
            ]);
            const [canvas, canvasContext] = this._drawToCanvas(image, scanRegion, givenCanvas);
            usedCanvas = canvas;

            if (engine instanceof Worker) {
                return await new Promise((resolve, reject) => {
                    /** @type {(error: string | ErrorEvent) => any} */
                    let onError;

                    /** @type {number} */
                    let timeout;

                    /** @param {MessageEvent} event */
                    const onMessage = event => {
                        if (event.data.type !== 'qrResult') {
                            return;
                        }
                        engine.removeEventListener('message', onMessage);
                        engine.removeEventListener('error', onError);
                        window.clearTimeout(timeout);
                        if (event.data.data !== null) {
                            resolve(event.data.data);
                        } else {
                            reject(QrScanner.NO_QR_CODE_FOUND);
                        }
                    };

                    /** @param {string | ErrorEvent} e */
                    onError = e => {
                        engine.removeEventListener('message', onMessage);
                        engine.removeEventListener('error', onError);
                        window.clearTimeout(timeout);
                        const errorMessage = !e
                            ? 'Unknown Error'
                            : (e instanceof Error ? e.message : e);
                        reject(`Scanner error: ${errorMessage}`);
                    };

                    engine.addEventListener('message', onMessage);
                    engine.addEventListener('error', onError);
                    timeout = window.setTimeout(() => onError('timeout'), 10000);

                    const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
                    engine.postMessage({
                        type: 'decode',
                        data: imageData,
                    }, [imageData.data.buffer]);
                });
            }

            return await Promise.race([
                new Promise((resolve, reject) => window.setTimeout(() => reject('Scanner error: timeout'), 10000)),
                (async () => {
                    try {
                        const [scanResult] = await engine.detect(canvas);
                        if (!scanResult) throw QrScanner.NO_QR_CODE_FOUND;
                        return scanResult.rawValue;
                    } catch (e) {
                        throw `Scanner error: ${e instanceof Error ? e.message : e}`;
                    }
                })(),
            ]);
        } catch (e) {
            if (!alsoTryWithoutScanRegion) throw e;
            return await QrScanner.scanImage(
                imageOrVideoOrUrl,
                undefined,
                qrEngine,
                usedCanvas,
                false,
            );
        } finally {
            if (qrEngine !== givenEngine) {
                QrScanner._postWorkerMessage(qrEngine, 'close').catch(() => {});
            }
        }
    }

    /**
     * @param {string} [workerPath]
     * @returns {Promise<Worker | BarcodeDetector>}
     */
    static async createQrEngine(workerPath = QrScanner.WORKER_PATH) {
        const supportsBarcodeDetector = 'BarcodeDetector' in window
            && BarcodeDetector.getSupportedFormats
            && (await BarcodeDetector.getSupportedFormats()).includes('qr_code');

        if (!supportsBarcodeDetector) return new Worker(workerPath);

        // On Macs with an M1/M2 processor and macOS Ventura (macOS version 13), the BarcodeDetector is broken in
        // Chromium based browsers, regardless of the version. For that constellation, the BarcodeDetector does not
        // error but does not detect QR codes. Macs without an M1/M2 or before Ventura are fine.
        // See issue qr-scanner/#209 and https://bugs.chromium.org/p/chromium/issues/detail?id=1382442
        // TODO update this once the issue in macOS is fixed
        const userAgentData = navigator.userAgentData;
        const isChromiumOnMacWithArmVentura = userAgentData // all Chromium browsers support userAgentData
            && userAgentData.brands.some(({ brand }) => /Chromium/i.test(brand))
            && /mac ?OS/i.test(userAgentData.platform)
            // Does it have an ARM chip (e.g. M1/M2) and Ventura? Check this last as getHighEntropyValues can
            // theoretically trigger a browser prompt, although no browser currently does seem to show one.
            // If browser or user refused to return the requested values, assume broken ARM Ventura, to be safe.
            && await userAgentData.getHighEntropyValues(['architecture', 'platformVersion'])
                .then(({ architecture, platformVersion }) => /arm/i.test(architecture || 'arm')
                    && Number.parseInt(platformVersion || '13', 10) >= /* Ventura */ 13)
                .catch(() => true);
        if (isChromiumOnMacWithArmVentura) return new Worker(workerPath);

        return new BarcodeDetector({ formats: ['qr_code'] });
    }

    _onPlay() {
        this._scanRegion = this._calculateScanRegion(this.$video);
        this._scanFrame();
    }

    _onLoadedMetaData() {
        this._scanRegion = this._calculateScanRegion(this.$video);
    }

    _onVisibilityChange() {
        if (document.hidden) {
            this.pause();
        } else if (this._active) {
            this.start();
        }
    }

    /**
     * @param {HTMLVideoElement} video
     * @returns {ScanRegion}
     */
    _calculateScanRegion(video) {
        // Default scan region calculation. Note that this can be overwritten in the constructor.
        const smallestDimension = Math.min(video.videoWidth, video.videoHeight);
        const scanRegionSize = Math.round(2 / 3 * smallestDimension);
        return {
            x: Math.round((video.videoWidth - scanRegionSize) / 2),
            y: Math.round((video.videoHeight - scanRegionSize) / 2),
            width: scanRegionSize,
            height: scanRegionSize,
            downScaledWidth: QrScanner.DEFAULT_CANVAS_SIZE,
            downScaledHeight: QrScanner.DEFAULT_CANVAS_SIZE,
        };
    }

    _scanFrame() {
        if (!this._active || this.$video.paused || this.$video.ended) return;
        // using requestAnimationFrame to avoid scanning if tab is in background
        requestAnimationFrame(async () => {
            if (this.$video.readyState <= 1) {
                // Skip scans until the video is ready as drawImage() only works correctly on a video with readyState
                // > 1, see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage#Notes.
                // This also avoids false positives for videos paused after a successful scan which remains visible on
                // the canvas until the video is started again and ready.
                this._scanFrame();
                return;
            }
            /** @type {string | undefined} */
            let result;
            try {
                result = await QrScanner.scanImage(
                    this.$video,
                    this._scanRegion,
                    this._qrEnginePromise,
                    this.$canvas,
                );
            } catch (error) {
                if (!this._active) return;
                const errorMessage = error.message || error;
                if (errorMessage.includes('service unavailable')) {
                    // When the native BarcodeDetector crashed, create a new one
                    this._qrEnginePromise = QrScanner.createQrEngine();
                }
                this._onDecodeError(error);
            }

            if (result) {
                this._onDecode(result);
            }

            this._scanFrame();
        });
    }

    /**
     * @param {string} error
     */
    _onDecodeError(error) {
        // default error handler; can be overwritten in the constructor
        if (error === QrScanner.NO_QR_CODE_FOUND) return;
        console.log(error);
    }

    /**
     * @param {'environment' | 'user'} [facingMode]
     * @param {boolean} [exact = false]
     * @returns {Promise<MediaStream>}
     */
    _getCameraStream(facingMode, exact = false) {
        /** @type {MediaTrackConstraints[]} */
        const constraintsToTry = [{
            width: { min: 1024 },
        }, {
            width: { min: 768 },
        }, {}];

        if (facingMode) {
            constraintsToTry.forEach(constraint => {
                constraint.facingMode = exact ? { exact: facingMode } : facingMode;
            });
        }
        return this._getMatchingCameraStream(constraintsToTry);
    }

    /**
     * @param {MediaTrackConstraints[]} constraintsToTry
     * @returns {Promise<MediaStream>}
     */
    async _getMatchingCameraStream(constraintsToTry) {
        if (!navigator.mediaDevices || constraintsToTry.length === 0) {
            throw 'Camera not found.';
        }
        try {
            return await navigator.mediaDevices.getUserMedia({
                video: constraintsToTry.shift(),
            });
        } catch (error) {
            return this._getMatchingCameraStream(constraintsToTry);
        }
    }

    /**
     * @param {'environment' | 'user'} facingMode
     */
    _setVideoMirror(facingMode) {
        // in user facing mode mirror the video to make it easier for the user to position the QR code
        const scaleFactor = facingMode === 'user' ? -1 : 1;
        this.$video.style.transform = `scaleX(${scaleFactor})`;
    }

    /**
     * @param {MediaStream} videoStream
     * @returns {'environment' | 'user' | null}
     */
    _getFacingMode(videoStream) {
        const videoTrack = videoStream.getVideoTracks()[0];
        if (!videoTrack) return null; // unknown
        // inspired by https://github.com/JodusNodus/react-qr-reader/blob/master/src/getDeviceId.js#L13
        if (/rear|back|environment/i.test(videoTrack.label)) return 'environment';
        if (/front|user|face/i.test(videoTrack.label)) return 'user';
        return null; // unknown
    }

    /**
     * @param {HTMLImageElement | HTMLVideoElement} image
     * @param {ScanRegion?} scanRegion
     * @param {HTMLCanvasElement?} canvas
     * @returns {[HTMLCanvasElement, CanvasRenderingContext2D]}
     */
    static _drawToCanvas(image, scanRegion = null, canvas = null) {
        canvas = canvas || document.createElement('canvas');
        const scanRegionX = scanRegion && scanRegion.x ? scanRegion.x : 0;
        const scanRegionY = scanRegion && scanRegion.y ? scanRegion.y : 0;
        const scanRegionWidth = scanRegion && scanRegion.width
            ? scanRegion.width
            : image.width || /** @type {HTMLVideoElement} */ (image).videoWidth;
        const scanRegionHeight = scanRegion && scanRegion.height
            ? scanRegion.height
            : image.height || /** @type {HTMLVideoElement} */ (image).videoHeight;
        const canvasWidth = scanRegion && scanRegion.downScaledWidth
            ? scanRegion.downScaledWidth
            : scanRegionWidth;
        const canvasHeight = scanRegion && scanRegion.downScaledHeight
            ? scanRegion.downScaledHeight
            : scanRegionHeight;

        // Setting the canvas width or height clears the canvas, even if the values didn't change, therefore only set
        // them if they actually changed.
        if (canvas.width !== canvasWidth) {
            canvas.width = canvasWidth;
        }
        if (canvas.height !== canvasHeight) {
            canvas.height = canvasHeight;
        }

        const context = canvas.getContext('2d', { alpha: false });
        if (!context) throw 'Unable to get canvas context';
        context.imageSmoothingEnabled = false; // gives less blurry images
        context.drawImage(
            image,
            scanRegionX, scanRegionY, scanRegionWidth, scanRegionHeight,
            0, 0, canvas.width, canvas.height,
        );
        return [canvas, context];
    }

    /**
     * @param {HTMLImageElement | HTMLVideoElement | string} imageOrVideoOrUrl
     * @returns {Promise<HTMLImageElement | HTMLVideoElement>}
     */
    static async _loadImage(imageOrVideoOrUrl) {
        if (imageOrVideoOrUrl instanceof HTMLVideoElement) {
            return imageOrVideoOrUrl;
        }

        /** @type {HTMLImageElement} */
        let image;
        if (imageOrVideoOrUrl instanceof HTMLImageElement) {
            image = imageOrVideoOrUrl;
        } else {
            image = new Image();
            image.src = imageOrVideoOrUrl;
        }
        await QrScanner._awaitImageLoad(image);
        return image;
    }

    /**
     * @param {HTMLImageElement} image
     * @returns {Promise<void>}
     */
    static async _awaitImageLoad(image) {
        if (image.complete && image.naturalWidth !== 0) {
            // already loaded
            return;
        }
        await new Promise((resolve, reject) => {
            /** @type {EventListener} */
            let onError;
            const onLoad = () => { // eslint-disable-line require-jsdoc-except/require-jsdoc
                image.removeEventListener('load', onLoad);
                image.removeEventListener('error', onError);
                resolve(undefined);
            };
            onError = () => {
                image.removeEventListener('load', onLoad);
                image.removeEventListener('error', onError);
                reject('Image load error');
            };
            image.addEventListener('load', onLoad);
            image.addEventListener('error', onError);
        });
    }

    /**
     * @param {Worker | BarcodeDetector | Promise<Worker | BarcodeDetector>} qrEngineOrQrEnginePromise
     * @param {string} type
     * @param {any} [data]
     * @returns {Promise<void>}
     */
    static async _postWorkerMessage(qrEngineOrQrEnginePromise, type, data) {
        const qrEngine = await qrEngineOrQrEnginePromise;
        if (!(qrEngine instanceof Worker)) return;
        qrEngine.postMessage({ type, data });
    }
}
QrScanner.DEFAULT_CANVAS_SIZE = 400;
QrScanner.NO_QR_CODE_FOUND = 'No QR code found';
QrScanner.WORKER_PATH = '../../lib/QrScannerWorker.js';
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
/* global Nimiq */
/* global AnimationUtils */
/* global QrScanner */
/* global I18n */
/* global LoginFile */
/* global TemplateTags */
/* global KeyStore */
/* global Utf8Tools */

class FileImporter extends Nimiq.Observable {
    /**
     * @param {string} str
     * @returns {boolean}
     */
    static isLoginFileData(str) {
        try {
            // Make sure it is base64.
            // This throws an atob() exception if data is not in base64 format.
            // Skip prefix for PIN-encrypted Login Files.
            /** @type {Uint8Array} */
            const data = Nimiq.BufferUtils.fromBase64(str.substr(0, 2) === '#2' ? str.substr(2) : str);

            // Make sure the data size is correct and that a potential label is correctly encoded.
            return data.byteLength === KeyStore.ENCRYPTED_SECRET_SIZE // a secret without label
                // or a secret with label
                || (
                    data.byteLength >= KeyStore.ENCRYPTED_SECRET_SIZE + /* label length field */ 1
                    && data.byteLength === KeyStore.ENCRYPTED_SECRET_SIZE
                        + /* label length field */ 1
                        + /* label length */ data[KeyStore.ENCRYPTED_SECRET_SIZE]
                    && Utf8Tools.isValidUtf8(data.subarray(KeyStore.ENCRYPTED_SECRET_SIZE + /* label length field */ 1))
                )
                // or a legacy secret
                || data.byteLength === KeyStore.ENCRYPTED_SECRET_SIZE_V2;
        } catch (e) {
            return false;
        }
    }

    /**
     * @param {HTMLLabelElement} [$el]
     * @param {boolean} [displayFile = true]
     */
    constructor($el, displayFile = true) {
        super();
        this.$el = FileImporter._createElement($el);
        this._displayFile = displayFile;

        /** @type {HTMLElement} */
        this.$errorMessage = (this.$el.querySelector('.error-message'));
        /** @type {HTMLInputElement} */
        this.$fileInput = (this.$el.querySelector('input'));

        // Add drag-and-drop handlers
        this.$el.addEventListener('dragover', this._onDragOver.bind(this));
        this.$el.addEventListener('dragleave', this._onDragEnd.bind(this));
        this.$el.addEventListener('dragend', this._onDragEnd.bind(this));
        this.$el.addEventListener('drop', this._onFileDrop.bind(this));

        this.$fileInput.addEventListener('change', e => this._onFileSelected(e));

        // Prevent dropping on window
        window.addEventListener('dragover', event => event.preventDefault());
        window.addEventListener('drop', event => event.preventDefault());
    }

    /**
     * @param {HTMLLabelElement} [$el]
     * @returns {HTMLLabelElement}
     */
    static _createElement($el) {
        $el = $el || document.createElement('label');
        $el.classList.add('file-import');

        $el.innerHTML = TemplateTags.noVars`
            <h3 class="nq-h3 nq-light-blue" data-i18n="file-import-prompt">Drag here or click to import</h3>
            <span class="error-message"></span>
            <svg class="nq-icon qr-code">
                <use xlink:href="/assets/nimiq-style.icons.svg#nq-qr-code"/>
            </svg>
            <input type="file" accept="image/*">
        `;

        I18n.translateDom($el);
        return $el;
    }

    /**
     * @returns {HTMLElement}
     */
    getElement() {
        return this.$el;
    }

    /**
     * @param {Event} event
     */
    _onFileSelected(event) {
        /** @type {HTMLInputElement} */
        const eventTarget = (event.target);
        if (!eventTarget.files || !eventTarget.files.length) return;
        this._handleFile(eventTarget.files[0]);
    }

    /**
     * @param {File} file
     */
    async _handleFile(file) {
        this.$errorMessage.style.display = '';
        this.$errorMessage.textContent = '';
        delete this.$errorMessage.dataset.i18n;
        this.$fileInput.value = '';

        const url = URL.createObjectURL(file);
        const image = this.$el.querySelector('img') || document.createElement('img');
        image.classList.remove('pop-down'); // reset image style in case it was already used in UI
        image.src = url;
        const decoded = await this._readQrCode(image);

        if (!decoded) {
            AnimationUtils.animate('shake', this.$el);
            this.$errorMessage.textContent = I18n.translatePhrase('file-import-error-could-not-read');
            this.$errorMessage.dataset.i18n = 'file-import-error-could-not-read';
            this.$errorMessage.style.display = 'block';
            return;
        }

        // Check that the found QR code encodes a Nimiq secret
        if (!FileImporter.isLoginFileData(decoded)) {
            AnimationUtils.animate('shake', this.$el);
            this.$errorMessage.textContent = I18n.translatePhrase('file-import-error-invalid');
            this.$errorMessage.dataset.i18n = 'file-import-error-invalid';
            this.$errorMessage.style.display = 'block';
            return;
        }

        if (this._displayFile) {
            // Show image in UI
            this.$el.appendChild(image);
            image.classList.add('pop-down');
        }

        this.fire(FileImporter.Events.IMPORT, decoded, url);

        URL.revokeObjectURL(url);
    }

    /**
     * @param {HTMLImageElement} image
     * @returns {Promise<string?>}
     */
    async _readQrCode(image) {
        try {
            const qrPosition = LoginFile.calculateQrPosition();
            return await QrScanner.scanImage(image, qrPosition, undefined, undefined, true);
        } catch (e) {
            return null;
        }
    }

    /**
     * @param {DragEvent} event
     */
    _onFileDrop(event) {
        event.stopPropagation();
        event.preventDefault();
        if (!event.dataTransfer || !event.dataTransfer.files || !event.dataTransfer.files.length) return;
        this._handleFile(event.dataTransfer.files[0]);

        this._onDragEnd();
    }

    /**
     * @param {DragEvent} event
     */
    _onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();

        this.$errorMessage.style.display = '';
        this.$errorMessage.textContent = '';
        delete this.$errorMessage.dataset.i18n;

        if (!event.dataTransfer) return;

        event.dataTransfer.dropEffect = 'copy';

        this.$el.classList.add('drag-over');
    }

    _onDragEnd() {
        this.$el.classList.remove('drag-over');
    }
}

FileImporter.Events = {
    IMPORT: 'import',
};
/* global Nimiq */
/* global I18n */
/* global QrScanner */
/* global TemplateTags */

class QrVideoScanner extends Nimiq.Observable {
    // eslint-disable-next-line valid-jsdoc
    /**
     * @param {HTMLDivElement} [$el]
     * @param {(result: string) => boolean} [validator]
     * @param {number} [reportFrequency = 7000]
     */
    constructor($el, validator = /** @param {string} result */ result => !!result, reportFrequency = 7000) {
        super();

        this._reportFrequency = reportFrequency;
        this._validator = validator;

        this._isRepositioningOverlay = false;
        this._cameraRetryTimer = 0;
        /** @type {string | undefined} */
        this._lastResult = undefined;
        this._lastResultTime = 0;

        this.$el = QrVideoScanner._createElement($el);

        /** @type {HTMLVideoElement} */
        const $video = (this.$el.querySelector('video'));

        /** @type {HTMLDivElement} */
        this.$overlay = (this.$el.querySelector('.overlay'));

        /** @type {HTMLButtonElement} */
        const $cancelButton = (this.$el.querySelector('.cancel-button'));

        this._scanner = new QrScanner($video, result => this._onResult(result));

        $cancelButton.addEventListener('click', () => this.fire(QrVideoScanner.Events.CANCEL));

        QrScanner.hasCamera().then(hasCamera => this.$el.classList.toggle('no-camera', !hasCamera));
    }

    /**
     * @returns {Promise<boolean>}
     */
    async start() {
        try {
            await this._scanner.start();
            this.$el.classList.remove('camera-issue');
            if (this._cameraRetryTimer) {
                window.clearInterval(this._cameraRetryTimer);
                this._cameraRetryTimer = 0;
            }
            return true;
        } catch (error) {
            this.$el.classList.add('camera-issue');
            this.fire(QrVideoScanner.Events.ERROR, typeof error === 'string' ? new Error(error) : error);
            if (!this._cameraRetryTimer) {
                this._cameraRetryTimer = window.setInterval(() => this.start(), 3000);
            }
            return false;
        }
    }

    /**
     * @param {string} result
     */
    _onResult(result) {
        if (
            (result === this._lastResult && Date.now() - this._lastResultTime < this._reportFrequency)
            || !this._validator(result)
        ) return;

        this._lastResult = result;
        this._lastResultTime = Date.now();
        this.fire(QrVideoScanner.Events.RESULT, result);
    }

    stop() {
        this._scanner.stop();
        if (this._cameraRetryTimer) {
            window.clearInterval(this._cameraRetryTimer);
            this._cameraRetryTimer = 0;
        }
    }

    repositionOverlay() {
        if (this._isRepositioningOverlay) return;
        this._isRepositioningOverlay = true;
        requestAnimationFrame(() => {
            const scannerHeight = this.$el.offsetHeight;
            const scannerWidth = this.$el.offsetWidth;

            const shorterSideLength = Math.min(scannerHeight, scannerWidth);
            if (!shorterSideLength) return; // component not visible or destroyed

            // not always the accurate size of the sourceRect for QR detection in QrScannerLib (e.g. if video is
            // landscape and screen portrait) but looks nicer in the UI.
            const overlaySize = Math.ceil(2 / 3 * shorterSideLength);

            this.$overlay.style.width = `${overlaySize}px`;
            this.$overlay.style.height = `${overlaySize}px`;
            this.$overlay.style.top = `${(scannerHeight - overlaySize) / 2}px`;
            this.$overlay.style.left = `${(scannerWidth - overlaySize) / 2}px`;

            this._isRepositioningOverlay = false;
        });
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
        $element.classList.add('qr-video-scanner', 'nq-blue-bg');

        /* eslint-disable max-len */
        $element.innerHTML = TemplateTags.noVars`
            <video muted autoplay playsinline width="600" height="600"></video>
            <div class="overlay">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 238 238">
                    <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M31.3 2H10a8 8 0 0 0-8 8v21.3M206.8 2H228a8 8 0 0 1 8 8v21.3m0 175.4V228a8 8 0 0 1-8 8h-21.3m-175.4 0H10a8 8 0 0 1-8-8v-21.3"/>
                </svg>
            </div>
            <button class="nq-button-s inverse cancel-button" data-i18n="qr-video-scanner-cancel">Cancel</button>

            <div class="camera-access-failed">
                <div class="camera-access-failed-warning no-camera" data-i18n="qr-video-scanner-no-camera">
                    Your device does not have an accessible camera.
                </div>
                <div class="camera-access-failed-warning unblock-camera" data-i18n="qr-video-scanner-enable-camera">
                    Unblock the camera for this website to scan QR codes.
                </div>
            </div>
        `;
        /* eslint-enable max-len */

        I18n.translateDom($element);

        return $element;
    }
}

QrVideoScanner.Events = {
    RESULT: 'qr-video-scanner-result',
    ERROR: 'qr-video-scanner-error',
    CANCEL: 'qr-video-scanner-cancel',
};
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
/* global TemplateTags */

class LoginFileIcon { // eslint-disable-line no-unused-vars
    /**
     *
     * @param {HTMLDivElement?} [$el]
     */
    constructor($el) {
        this.colorClass = '';
        this.fileUnavailable = false;

        $el = $el || document.createElement('div');
        $el.classList.add('nq-icon', 'login-file-icon');

        /* eslint-disable max-len */
        $el.innerHTML = TemplateTags.noVars`
            <svg class="nq-icon lock">
                <use class="lock-unlocked" xlink:href="/assets/nimiq-style.icons.svg#nq-lock-unlocked"/>
                <use class="lock-locked" xlink:href="/assets/nimiq-style.icons.svg#nq-lock-locked"/>
            </svg>
            <svg class="nq-icon qr-code"><use xlink:href="/assets/nimiq-style.icons.svg#nq-qr-code"/></svg>
        `;
        /* eslint-enable max-len */

        this.$el = $el;
    }

    /**
     *
     * @param {string} [colorClassName = ''] - only relevant for LoginFileIcon without `setFileUnavailable(true)`
     */
    lock(colorClassName = '') {
        if (!this.fileUnavailable && colorClassName) {
            this.colorClass = colorClassName;
            this.$el.classList.add(this.colorClass);
        }
        this.$el.classList.add('locked');
    }

    setFileUnavailable(unavailable = true) {
        this.fileUnavailable = unavailable;
        this.$el.classList.toggle('file-unavailable', unavailable);
    }

    unlock() {
        if (this.colorClass) {
            this.$el.classList.remove(this.colorClass);
            this._colorClass = '';
        }
        this.$el.classList.remove('locked');
    }

    getElement() {
        return this.$el;
    }
}
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
/* global I18n */
/* global RecoveryWordsInputField */
/* global AnimationUtils */
/* global TemplateTags */

class RecoveryWords extends Nimiq.Observable {
    /**
     *
     * @param {HTMLElement} [$el]
     * @param {boolean} providesInput
     */
    constructor($el, providesInput) {
        super();

        /** @type {Object[]} */
        this.$fields = [];

        /** @type {HTMLElement} */
        this.$el = this._createElement($el, providesInput);

        /**
         * @type {?{words: Array<string>, type: number}}
         * @private
         */
        this._mnemonic = null;
    }

    /**
     * @param {string[]} words
     */
    setWords(words) {
        for (let i = 0; i < 24; i++) {
            this.$fields[i].textContent = words[i];
        }
    }

    /**
     * @param {HTMLElement} [$el]
     * @param {boolean} input
     * @returns {HTMLElement}
     * */
    _createElement($el, input = true) {
        $el = $el || document.createElement('div');
        $el.classList.add('recovery-words');

        $el.innerHTML = TemplateTags.noVars`
            <div class="words-container">
                <div class="word-section"></div>
            </div>
        `;

        const wordSection = /** @type {HTMLElement} */ ($el.querySelector('.word-section'));

        for (let i = 0; i < 24; i++) {
            if (input) {
                const field = new RecoveryWordsInputField(i);
                field.element.classList.add('word');
                field.element.dataset.i = i.toString();
                field.on(RecoveryWordsInputField.Events.VALID, this._onFieldComplete.bind(this));
                field.on(RecoveryWordsInputField.Events.INVALID, this._onFieldIncomplete.bind(this));
                field.on(RecoveryWordsInputField.Events.FOCUS_NEXT, this._setFocusToNextInput.bind(this));

                this.$fields.push(field);
                wordSection.appendChild(field.element);
            } else {
                const content = document.createElement('span');
                content.classList.add('word-content');
                content.title = `word #${i + 1}`;
                this.$fields.push(content);

                const $wordNumber = document.createElement('span');
                $wordNumber.classList.add('word-number');
                $wordNumber.textContent = `${i < 9 ? '0' : ''}${i + 1}`;

                const word = document.createElement('div');
                word.classList.add('word', 'complete');
                word.classList.add('recovery-words-input-field');
                word.appendChild($wordNumber);
                word.appendChild(content);
                wordSection.appendChild(word);
            }
        }

        I18n.translateDom($el);

        return $el;
    }

    focus() {
        this.$fields[0].focus();
    }

    /** @returns {HTMLElement} @deprecated */
    getElement() {
        return this.$el;
    }

    /** @type {HTMLElement} */
    get element() {
        return this.$el;
    }

    wrongSeedPhrase() {
        this._animateError();
        window.setTimeout(() => {
            for (let i = 0; i < 24; i++) {
                this.$fields[i].value = '';
            }
        }, 500);
    }

    _onFieldComplete() {
        this._checkPhraseComplete();
    }

    _onFieldIncomplete() {
        if (this._mnemonic) {
            this._mnemonic = null;
            this.fire(RecoveryWords.Events.INCOMPLETE);
        }
    }

    async _checkPhraseComplete() {
        // Check if all fields are complete
        if (this.$fields.some(field => !field.complete)) {
            this._onFieldIncomplete();
            return;
        }

        try {
            const mnemonic = this.$fields.map(field => field.value);
            const type = Nimiq.MnemonicUtils.getMnemonicType(mnemonic); // throws on invalid mnemonic
            this._mnemonic = { words: mnemonic, type };
            this.fire(RecoveryWords.Events.COMPLETE, mnemonic, type);
        } catch (e) {
            if (e.message !== 'Invalid checksum') {
                console.error(e); // eslint-disable-line no-console
            } else {
                // wrong words
                if (this._mnemonic) this._mnemonic = null;
                /*
                 * The animation time is used to delay the INVALID event firing, thus the await. It is possible
                 * to trigger this by a keyboard event which results in a focus on a different $field which would
                 * reset the invalid state again. This way the message pops up after the animation and after the focus.
                 */
                await this._animateError();
                this.fire(RecoveryWords.Events.INVALID);
            }
        }
    }

    /**
     * @param {number} index
     * @param {?string} paste
     */
    _setFocusToNextInput(index, paste) {
        index = Math.max(index, 0);
        if (index < this.$fields.length) {
            this.$fields[index].focus();
            if (paste) {
                this.$fields[index].fillValueFrom(paste);
            }
        }
    }

    _animateError() {
        AnimationUtils.animate('shake', this.$el);
    }

    get mnemonic() {
        return this._mnemonic ? this._mnemonic.words : null;
    }

    get mnemonicType() {
        return this._mnemonic ? this._mnemonic.type : null;
    }
}

RecoveryWords.Events = {
    COMPLETE: 'recovery-words-complete',
    INCOMPLETE: 'recovery-words-incomplete',
    INVALID: 'recovery-words-invalid',
};
/* global Nimiq */
/* global I18n */
/* global AutoComplete */
/* global AnimationUtils */

class RecoveryWordsInputField extends Nimiq.Observable {
    /**
     *
     * @param {number} index
     */
    constructor(index) {
        super();

        this._index = index;

        /** @type {string} */
        this._value = '';

        this.complete = false;

        this.dom = this._createElements();
        this._setupAutocomplete();
        this._addEvents();
    }

    /**
     * @param {string} paste
     */
    fillValueFrom(paste) {
        if (paste.indexOf(' ') !== -1) {
            this.value = paste.substr(0, paste.indexOf(' '));
            this._checkValidity();

            this.fire(RecoveryWordsInputField.Events.FOCUS_NEXT, this._index + 1, paste.substr(paste.indexOf(' ') + 1));
        } else {
            this.value = paste;
            this._checkValidity();
        }
    }

    /**
     * @returns {{ element: HTMLElement, input: HTMLInputElement, placeholder: HTMLDivElement }}
     */
    _createElements() {
        const element = document.createElement('div');
        element.classList.add('recovery-words-input-field');

        const input = document.createElement('input');
        input.classList.add('nq-input');
        input.setAttribute('type', 'text');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('autocapitalize', 'none');
        input.setAttribute('spellcheck', 'false');

        /** */
        const setPlaceholder = () => {
            input.placeholder = `${this._index < 9 ? '0' : ''}${this._index + 1}`;
        };
        I18n.observer.on(I18n.Events.LANGUAGE_CHANGED, setPlaceholder);
        setPlaceholder();

        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.textContent = (this._index + 1).toString();
        element.appendChild(input);

        return { element, input, placeholder };
    }

    _addEvents() {
        this.dom.input.addEventListener('keydown', this._onKeydown.bind(this));
        this.dom.input.addEventListener('keyup', this._onKeyup.bind(this));
        this.dom.input.addEventListener('paste', this._onPaste.bind(this));
        this.dom.input.addEventListener('blur', this._onBlur.bind(this));
    }

    _setupAutocomplete() {
        this.autocomplete = new AutoComplete({
            selector: this.dom.input,
            source: /** @param{string} term @param{function} response */ (term, response) => {
                term = term.toLowerCase();
                const list = Nimiq.MnemonicUtils.DEFAULT_WORDLIST.filter(word => word.startsWith(term));
                response(list);
            },
            onSelect: this._select.bind(this),
            minChars: 3,
            delay: 0,
        });
    }

    focus() {
        // cf. https://stackoverflow.com/questions/20747591
        setTimeout(() => this.dom.input.focus(), 50);
    }

    get value() {
        return this.dom.input.value;
    }

    set value(value) {
        this.dom.input.value = value;
        this._value = value;
    }

    get element() {
        return this.dom.element;
    }

    _onBlur() {
        this._checkValidity();
    }

    /**
     * @param {KeyboardEvent} e
     */
    _onKeydown(e) {
        if (e.keyCode === 32 /* space */
            || e.keyCode === 9 /* tab */) {
            e.preventDefault();
        }

        if (e.keyCode === 32 // space
            || e.keyCode === 13 // enter
            || (e.keyCode === 9 && !e.shiftKey)) { // tab
            this._checkValidity(1);
        }
        if (e.keyCode === 9 && e.shiftKey) { // shift-tab
            this._checkValidity(-1);
        }
    }

    _onKeyup() {
        this._onValueChanged();
    }

    /**
     * @param {ClipboardEvent} e
     */
    _onPaste(e) {
        // @ts-ignore (Property 'clipboardData' does not exist on type 'Window'.)
        let paste = (e.clipboardData || window.clipboardData).getData('text');
        paste = paste.replace(/\s+/g, ' ');
        if (paste && paste.split(' ').length > 1) {
            e.preventDefault();
            e.stopPropagation();
            this.fillValueFrom(paste);
        }
    }

    /**
     *
     * @param {number} [setFocusToNextInputOffset = 0]
     */
    _checkValidity(setFocusToNextInputOffset = 0) {
        // Do not block tabbing through empty fields
        if (!this.dom.input.value) {
            if (setFocusToNextInputOffset) {
                this._focusNext(setFocusToNextInputOffset);
            }
            return;
        }

        if (Nimiq.MnemonicUtils.DEFAULT_WORDLIST.indexOf(this.value.toLowerCase()) >= 0) {
            this.complete = true;
            this.dom.element.classList.add('complete');
            this.fire(RecoveryWordsInputField.Events.VALID, this);
            if (setFocusToNextInputOffset) {
                this._focusNext(setFocusToNextInputOffset);
            }
        } else {
            this._onInvalid();
        }
    }

    /**
     * Callback from AutoComplete
     * @param {Event} e - original Event
     * @param {string} term - the selected term
     * @param {Element} item - the item that held the term
     */
    _select(e, term, item) {
        item.classList.remove('selected');
        this.value = term;
        this._focusNext();
    }

    /**
     *
     * @param {number} [offset = 1]
     */
    _focusNext(offset = 1) {
        this.fire(RecoveryWordsInputField.Events.FOCUS_NEXT, this._index + offset);
    }

    _onInvalid() {
        this.dom.input.value = '';
        this._onValueChanged();
        AnimationUtils.animate('shake', this.dom.input);
    }

    _onValueChanged() {
        if (this.value === this._value) return;

        if (this.complete) {
            this.complete = false;
            this.dom.element.classList.remove('complete');
            this.fire(RecoveryWordsInputField.Events.INVALID, this);
        }

        this._value = this.value;
    }
}

/**
 * @type {RecoveryWordsInputField | undefined} _revealedWord
 */
RecoveryWordsInputField._revealedWord = undefined;

RecoveryWordsInputField.Events = {
    FOCUS_NEXT: 'recovery-words-focus-next',
    VALID: 'recovery-word-valid',
    INVALID: 'recovery-word-invalid',
};
/* global Constants */
/* global Nimiq */
/* global Key */
/* global ImportWords */
/* global FileImporter */
/* global PasswordBox */
/* global ImportApi */
/* global Errors */
/* global TopLevelApi */
/* global Utf8Tools */
/* global KeyStore */
/* global BitcoinKey */
/* global QrVideoScanner */

/**
 * @callback ImportFile.resolve
 * @param {KeyguardRequest.KeyResult} result
 */

class ImportFile {
    /**
     * @param {Parsed<KeyguardRequest.ImportRequest>} request
     * @param {ImportFile.resolve} resolve
     * @param {reject} reject
     */
    constructor(request, resolve, reject) {
        this._request = request;
        this._resolve = resolve;
        this._reject = reject;

        this._encryptedKey = new Nimiq.SerialBuffer(0);
        /** @type {string | undefined} */
        this._label = undefined;
        this._flags = {
            hasPin: false,
        };

        this.importWordsHandler = new ImportWords(request, resolve, reject);

        /** @type {HTMLElement} */
        this.$importFilePage = (document.getElementById(ImportFile.Pages.IMPORT_FILE));
        /** @type {HTMLElement} */
        this.$unlockAccountPage = (document.getElementById(ImportFile.Pages.UNLOCK_ACCOUNT));

        if (request.isKeyLost) {
            /** @type {HTMLElement} */
            (this.$importFilePage.querySelector('.login-to-continue')).classList.remove('display-none');
        }

        /** @type {HTMLLabelElement} */
        const $fileImport = (this.$importFilePage.querySelector('.file-import'));
        const fileImport = new FileImporter($fileImport, false);

        /** @type {HTMLButtonElement} */
        this.$qrVideoButton = (this.$importFilePage.querySelector('.qr-video-button'));

        /** @type {HTMLDivElement} */
        this.$qrVideoScanner = (this.$importFilePage.querySelector('.qr-video-scanner'));
        this.qrVideoScanner = new QrVideoScanner(this.$qrVideoScanner, FileImporter.isLoginFileData);

        /** @type {HTMLElement} */
        const $gotoWords = (this.$importFilePage.querySelector('#goto-words'));
        $gotoWords.addEventListener('click', () => { this.importWordsHandler.run(); });

        const $gotoCreate = this.$importFilePage.querySelector('#goto-create');
        if ($gotoCreate) {
            $gotoCreate.addEventListener('click', this._goToCreate.bind(this));
        }

        /** @type {HTMLImageElement} */
        this.$loginFileImage = (this.$unlockAccountPage.querySelector('.loginfile-image'));

        /** @type {HTMLFormElement} */
        const $passwordBox = (this.$unlockAccountPage.querySelector('.password-box'));
        this.passwordBox = new PasswordBox(
            $passwordBox,
            { buttonI18nTag: 'passwordbox-log-in' },
        );
        fileImport.on(FileImporter.Events.IMPORT, this._onFileImported.bind(this));
        this.passwordBox.on(PasswordBox.Events.SUBMIT, this._onPasswordEntered.bind(this));

        this.qrVideoScanner.on(QrVideoScanner.Events.RESULT, result => {
            this._onFileImported(result);
            this._stopQrVideo();
        });
        this.qrVideoScanner.on(QrVideoScanner.Events.CANCEL, this._stopQrVideo.bind(this));

        this.$qrVideoButton.addEventListener('click', this._startQrVideo.bind(this));

        if (request.enableBackArrow) {
            /** @type {HTMLElement} */
            (this.$importFilePage.querySelector('.page-header-back-button')).classList.remove('display-none');
        }
    }

    run() {
        window.location.hash = ImportFile.Pages.IMPORT_FILE;
    }

    /**
     * @param {string} decoded
     * @param {string} [src]
     */
    _onFileImported(decoded, src) {
        if (decoded.substr(0, 2) === '#2') {
            // Imported file is a PIN-encrypted account Access File
            decoded = decoded.substr(2);
            this._flags.hasPin = true;
        }

        const buffer = Nimiq.BufferUtils.fromBase64(decoded);
        if (buffer.byteLength > KeyStore.ENCRYPTED_SECRET_SIZE) {
            this._encryptedKey = new Nimiq.SerialBuffer(buffer.read(KeyStore.ENCRYPTED_SECRET_SIZE));
            const labelLength = buffer.readUint8();
            const labelBytes = buffer.read(labelLength);
            if (Utf8Tools.isValidUtf8(labelBytes)) {
                this._label = Utf8Tools.utf8ByteArrayToString(labelBytes);
            }
        } else {
            this._encryptedKey = buffer;
        }

        // Prepare next page
        if (src) {
            this.$loginFileImage.src = src;
        }
        const version = this._encryptedKey.readUint8();
        this.passwordBox.setMinLength(this._flags.hasPin ? Key.PIN_LENGTH : version < 3 ? 10 : undefined);
        this.passwordBox.reset();
        this.$unlockAccountPage.classList.remove('animate');

        // Go to next page
        window.location.hash = ImportFile.Pages.UNLOCK_ACCOUNT;
        setTimeout(() => this.$unlockAccountPage.classList.add('animate'), 0);

        TopLevelApi.focusPasswordBox();
    }

    _startQrVideo() {
        this.qrVideoScanner.start();
        this.qrVideoScanner.repositionOverlay();
        this.$qrVideoScanner.classList.add('active');
        this.$qrVideoButton.classList.add('hide-tooltip');
    }

    _stopQrVideo() {
        this.$qrVideoScanner.classList.remove('active');
        this.$qrVideoButton.classList.remove('hide-tooltip');
        window.setTimeout(() => this.qrVideoScanner.stop(), 1000);
    }

    /**
     * @param {string} password
     * @returns {Promise<void>}
     */
    async _onPasswordEntered(password) {
        /** @type {Key?} */
        let key;

        try {
            key = await this._decryptAndStoreKey(password);
        } catch (error) {
            this.passwordBox.onPasswordIncorrect();
            return;
        }

        if (!key) {
            this.passwordBox.onPasswordIncorrect();
            return;
        }

        /** @type {{keyPath: string, address: Uint8Array}[]} */
        const addresses = [];

        /** @type {string | undefined} */
        let bitcoinXPub;

        if (key.secret instanceof Nimiq.PrivateKey) {
            addresses.push({
                keyPath: Constants.LEGACY_DERIVATION_PATH,
                address: key.deriveAddress('').serialize(),
            });
        } else if (key.secret instanceof Nimiq.Entropy) {
            /** @type {KeyguardRequest.ImportRequest} */
            (this._request).requestedKeyPaths.forEach(keyPath => {
                addresses.push({
                    keyPath,
                    address: /** @type {Key} */(key).deriveAddress(keyPath).serialize(),
                });
            });

            bitcoinXPub = new BitcoinKey(key).deriveExtendedPublicKey(this._request.bitcoinXPubPath);

            // Store entropy in SessionStorage so addresses can be derived in the KeyguardIframe
            const secretString = Nimiq.BufferUtils.toBase64(key.secret.serialize());
            sessionStorage.setItem(ImportApi.SESSION_STORAGE_KEY_PREFIX + key.id, secretString);
        } else {
            this._reject(new Errors.KeyguardError(`Unkown key type ${key.type}`));
            return;
        }

        /** @type {KeyguardRequest.KeyResult} */
        const result = [{
            keyId: key.id,
            keyType: key.type,
            ...(this._label ? { keyLabel: this._label } : {}),
            addresses,

            // Backup warnings should not be shown for imported accounts, only for newly created accounts.
            // Therefore we set both flags to true.
            fileExported: true,
            wordsExported: true,
            bitcoinXPub,
        }];

        this._resolve(result);
    }

    /**
     * @param {string} password
     * @returns {Promise<Key?>}
     */
    async _decryptAndStoreKey(password) {
        TopLevelApi.setLoading(true);
        try {
            const encryptionKey = Utf8Tools.stringToUtf8ByteArray(password);

            // Make sure read position is at 0 even after a wrong password
            this._encryptedKey.reset();

            const secret = await Nimiq.Secret.fromEncrypted(this._encryptedKey, encryptionKey);

            // If this code runs, the password was correct and the request returns
            /** @type {HTMLElement} */
            (this.$unlockAccountPage.querySelector('.lock')).classList.add('unlocked');

            // TODO expectedKeyId check if it gets used in the future.
            const key = new Key(secret, this._flags.hasPin);
            await KeyStore.instance.put(key, encryptionKey);
            return key;
        } catch (event) {
            console.error(event);
            TopLevelApi.setLoading(false);
            return null; // Triggers onPasswordIncorrect above
        }
    }

    /**
     * @param {Event} event
     */
    _goToCreate(event) {
        event.preventDefault();
        this._reject(new Errors.GoToCreate());
    }
}

ImportFile.Pages = {
    IMPORT_FILE: 'import-file',
    UNLOCK_ACCOUNT: 'unlock-account',
};
/* global Constants */
/* global DownloadLoginFile */
/* global Errors */
/* global FlippableHandler */
/* global ImportApi */
/* global IqonHash */
/* global Key */
/* global KeyStore */
/* global LoginFileConfig */
/* global LoginFileIcon */
/* global Nimiq */
/* global PasswordInput */
/* global PasswordSetterBox */
/* global RecoveryWords */
/* global TopLevelApi */
/* global Utf8Tools */
/* global BitcoinKey */

/**
 * @callback ImportWords.resolve
 * @param {KeyguardRequest.KeyResult} result
 */

class ImportWords {
    /**
     * @param {Parsed<KeyguardRequest.ImportRequest | KeyguardRequest.ResetPasswordRequest>} request
     * @param {ImportWords.resolve} resolve
     * @param {reject} reject
     */
    constructor(request, resolve, reject) {
        this._request = request;
        this._resolve = resolve;
        this._reject = reject;

        FlippableHandler.init();

        /** @type {{entropy: Nimiq.Entropy?, privateKey: Nimiq.PrivateKey?}} */
        this._secrets = { entropy: null, privateKey: null };
        // eslint-disable-next-line max-len
        /** @type {KeyguardRequest.KeyResult} */
        this._keyResults = [];
        /** @type {Nimiq.SerialBuffer?} */
        this._encryptedSecret = null;

        // Pages
        /** @type {HTMLFormElement} */
        this.$words = (document.getElementById(ImportWords.Pages.ENTER_WORDS));
        /** @type {HTMLFormElement} */
        this.$setPassword = (document.getElementById(ImportWords.Pages.SET_PASSWORD));
        /** @type {HTMLFormElement} */
        const $downloadFile = (document.getElementById(ImportWords.Pages.DOWNLOAD_LOGINFILE));

        // Elements
        /** @type {HTMLFormElement} */
        const $recoveryWords = (this.$words.querySelector('.recovery-words'));
        /** @type {HTMLLinkElement} */
        this.$setPasswordBackButton = (this.$setPassword.querySelector('a.page-header-back-button'));
        /** @type {HTMLFormElement} */
        const $passwordSetter = (this.$setPassword.querySelector('.password-setter-box'));
        /** @type {HTMLDivElement} */
        const $loginFileIcon = (this.$setPassword.querySelector('.login-file-icon'));
        /** @type {HTMLDivElement} */
        const $downloadLoginFile = ($downloadFile.querySelector('.download-loginfile'));
        /** @type {HTMLLinkElement} */
        const $skipDownloadButton = ($downloadFile.querySelector('.skip'));

        // Components
        this._recoveryWords = new RecoveryWords($recoveryWords, true);
        this._passwordSetter = new PasswordSetterBox($passwordSetter, { buttonI18nTag: 'passwordbox-confirm-log-in' });
        this._loginFileIcon = new LoginFileIcon($loginFileIcon);
        const downloadLoginFile = new DownloadLoginFile($downloadLoginFile);

        // Events
        this._recoveryWords.on(RecoveryWords.Events.COMPLETE, (mnemonic, mnemonicType) => {
            if (this._recoveryWords.mnemonic) {
                this._onRecoveryWordsComplete(mnemonic, mnemonicType);
            }
        });
        this._recoveryWords.on(RecoveryWords.Events.INCOMPLETE, () => {
            this._secrets = { entropy: null, privateKey: null };
            this._keyResults = [];
        });
        this._recoveryWords.on(RecoveryWords.Events.INVALID, () => this.$words.classList.add('invalid-words'));
        this.$words.querySelectorAll('input').forEach(
            el => el.addEventListener('focus',
                () => this.$words.classList.remove('invalid-words', 'wrong-seed-phrase')),
        );
        this.$words.addEventListener('submit', event => {
            event.preventDefault();
            if (this._recoveryWords.mnemonic) {
                this._onRecoveryWordsComplete(this._recoveryWords.mnemonic, this._recoveryWords.mnemonicType);
            }
        });

        this._passwordSetter.on(PasswordSetterBox.Events.RESET, this.backToEnterPassword.bind(this));

        this._passwordSetter.on(PasswordSetterBox.Events.ENTERED, () => {
            let colorClass = '';
            if (this._secrets.entropy) {
                const key = new Key(this._secrets.entropy, false);
                const color = IqonHash.getBackgroundColorIndex(
                    key.defaultAddress.toUserFriendlyAddress(),
                );
                colorClass = LoginFileConfig[color].className;
            }
            this._loginFileIcon.lock(colorClass);
        });

        this._passwordSetter.on(PasswordSetterBox.Events.SUBMIT, async password => {
            await this._storeKeys(password);

            if (!this._fileAvailable) {
                this._resolve(this._keyResults);
                return;
            }

            // Prepare LoginFile for download

            const key = new Key(/** @type {Nimiq.Entropy} */(this._secrets.entropy), false);

            downloadLoginFile.setEncryptedEntropy(
                /** @type {Nimiq.SerialBuffer} */ (this._encryptedSecret),
                key.defaultAddress,
            );

            $skipDownloadButton.style.display = '';
            window.location.hash = ImportWords.Pages.DOWNLOAD_LOGINFILE;
        });

        downloadLoginFile.on(DownloadLoginFile.Events.INITIATED, () => {
            $skipDownloadButton.style.display = 'none';
        });
        downloadLoginFile.on(DownloadLoginFile.Events.DOWNLOADED, () => {
            for (let i = 0; i < this._keyResults.length; i++) {
                this._keyResults[i].fileExported = true;
            }
            this._resolve(this._keyResults);
        });
        if (this._request.wordsOnly && 'expectedKeyId' in this._request) {
            $skipDownloadButton.remove();
        } else {
            $skipDownloadButton.addEventListener('click', e => {
                e.preventDefault();
                this._resolve(this._keyResults);
            });
        }
    }

    run() {
        this._recoveryWords.setWords(new Array(24));
        window.location.hash = ImportWords.Pages.ENTER_WORDS;
    }

    backToEnterPassword() {
        this._passwordSetter.reset();
        this._loginFileIcon.unlock();

        TopLevelApi.focusPasswordBox();
    }

    /**
     * @param {string} [password = '']
     * @returns {Promise<void>}
     */
    async _storeKeys(password = '') {
        TopLevelApi.setLoading(true);
        let encryptionKey = null;
        if (password && password.length >= PasswordInput.DEFAULT_MIN_LENGTH) {
            encryptionKey = Utf8Tools.stringToUtf8ByteArray(password);
        }
        try {
            if (this._secrets.entropy) {
                const key = new Key(this._secrets.entropy, false);

                /** @type {{keyPath: string, address: Uint8Array}[]} */
                const addresses = this._request.requestedKeyPaths.map(keyPath => ({
                    keyPath,
                    address: key.deriveAddress(keyPath).serialize(),
                }));

                const bitcoinXPub = new BitcoinKey(key).deriveExtendedPublicKey(this._request.bitcoinXPubPath);

                /** @type {KeyguardRequest.SingleKeyResult} */
                const result = {
                    keyId: await KeyStore.instance.put(key, encryptionKey || undefined),
                    keyType: Nimiq.Secret.Type.ENTROPY,
                    addresses,

                    // Backup warnings should not be shown for imported accounts, only for newly created accounts.
                    // Therefore we set both flags to true.
                    fileExported: true,
                    wordsExported: true,
                    bitcoinXPub,
                };
                this._keyResults.push(result);

                const secretString = Nimiq.BufferUtils.toBase64(key.secret.serialize());
                sessionStorage.setItem(ImportApi.SESSION_STORAGE_KEY_PREFIX + result.keyId, secretString);

                if (encryptionKey) {
                    // Make the encrypted secret available for the Login File
                    this._encryptedSecret = await this._secrets.entropy.exportEncrypted(encryptionKey);
                }

                // Possible performance improvement:
                // The key is encrypted twice here:
                //     1. Inside the KeyStore when storing it (put)
                //     2. Again to get the encrypted secret for the Login File (exportEncrypted)
                // Is it possible to encrypt once and use KeyStore.putPlain() instead?
            }
            if (this._secrets.privateKey) {
                const key = new Key(this._secrets.privateKey, false);

                /** @type {KeyguardRequest.SingleKeyResult} */
                const result = {
                    keyId: await KeyStore.instance.put(key, encryptionKey || undefined),
                    keyType: Nimiq.Secret.Type.PRIVATE_KEY,
                    addresses: [{
                        keyPath: Constants.LEGACY_DERIVATION_PATH,
                        address: key.deriveAddress(Constants.LEGACY_DERIVATION_PATH).serialize(),
                    }],
                    fileExported: false, // Legacy accounts do not get a LoginFile
                    wordsExported: true,
                };
                this._keyResults.push(result);

                sessionStorage.setItem(ImportApi.SESSION_STORAGE_KEY_PREFIX + result.keyId, 'Private key');
            } else {
                TopLevelApi.setLoading(false);
            }
        } catch (e) { // Keystore.instance.put throws Errors.KeyguardError
            console.log(e);
            TopLevelApi.setLoading(false);
            this._reject(e);
        }
    }

    /**
     * Store key and request password
     * @param {Array<string>} mnemonic
     * @param {number?} mnemonicType
     */
    _onRecoveryWordsComplete(mnemonic, mnemonicType) {
        this._secrets = { entropy: null, privateKey: null };
        this._keyResults = [];

        if (mnemonicType === Nimiq.MnemonicUtils.MnemonicType.BIP39
            || mnemonicType === Nimiq.MnemonicUtils.MnemonicType.UNKNOWN) {
            this._fileAvailable = true;
            this._secrets.entropy = Nimiq.MnemonicUtils.mnemonicToEntropy(mnemonic);
        }

        if (mnemonicType === Nimiq.MnemonicUtils.MnemonicType.LEGACY
            || mnemonicType === Nimiq.MnemonicUtils.MnemonicType.UNKNOWN) {
            this._fileAvailable = false;
            const entropy = Nimiq.MnemonicUtils.legacyMnemonicToEntropy(mnemonic);
            this._secrets.privateKey = new Nimiq.PrivateKey(entropy.serialize());
        }

        if (!this._secrets.entropy && !this._secrets.privateKey) {
            // no mnemonicType was matched.
            this._reject(new Errors.KeyguardError('Invalid mnemonic type'));
            return;
        }
        if ('expectedKeyId' in this._request
            && (!this._secrets.entropy
                || this._request.expectedKeyId !== (new Key(this._secrets.entropy)).id)
            && (!this._secrets.privateKey
                || this._request.expectedKeyId !== (new Key(this._secrets.privateKey)).id)) {
            this.$words.classList.add('wrong-seed-phrase');
            this._recoveryWords.wrongSeedPhrase();
            this._secrets = { entropy: null, privateKey: null };
            this._fileAvailable = undefined;
            return;
        }

        this._passwordSetter.reset();
        this._loginFileIcon.unlock();
        this._loginFileIcon.setFileUnavailable(!this._fileAvailable);
        this.$setPassword.classList.toggle('login-file-available', this._fileAvailable);
        window.location.hash = ImportWords.Pages.SET_PASSWORD;

        TopLevelApi.focusPasswordBox();
    }
}

ImportWords.Pages = {
    ENTER_WORDS: 'recovery-words',
    SET_PASSWORD: 'set-password',
    DOWNLOAD_LOGINFILE: 'download-file',
};
/* global BitcoinRequestParserMixin */
/* global TopLevelApi */
/* global ImportFile */
/* global ImportWords */
/* global Errors */

class ImportApi extends BitcoinRequestParserMixin(TopLevelApi) {
    /**
     * @param {KeyguardRequest.ImportRequest | KeyguardRequest.ResetPasswordRequest} request
     * @returns {Promise<Parsed<KeyguardRequest.ImportRequest | KeyguardRequest.ResetPasswordRequest>>}
     */
    async parseRequest(request) {
        if (!request) {
            throw new Errors.InvalidRequestError('request is required');
        }

        const parsedRequest = {};
        parsedRequest.appName = this.parseAppName(request.appName);
        parsedRequest.requestedKeyPaths = this.parsePathsArray(request.requestedKeyPaths, 'requestedKeyPaths');
        parsedRequest.isKeyLost = this.parseBoolean(request.isKeyLost);
        parsedRequest.enableBackArrow = this.parseBoolean(request.enableBackArrow);
        parsedRequest.wordsOnly = this.parseBoolean(request.wordsOnly);
        if ('expectedKeyId' in request) {
            parsedRequest.expectedKeyId = (await this.parseKeyId(request.expectedKeyId)).id;
        }
        parsedRequest.bitcoinXPubPath = this.parseBitcoinPath(request.bitcoinXPubPath, 'bitcoinXPubPath');

        this._handler = parsedRequest.wordsOnly ? ImportWords : ImportFile;

        return parsedRequest;
    }

    get Handler() {
        return this._handler;
    }
}

ImportApi.SESSION_STORAGE_KEY_PREFIX = 'nimiq_key_';
/* global runKeyguard */
/* global ImportApi */

runKeyguard(ImportApi);
