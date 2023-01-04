(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=script&lang=ts&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StatusScreen.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
var StatusScreen_1;



/**
 * **Nimiq StatusScreen Component**
 *
 * Props:
 *
 * **title** {string} The current title, dynamic for both loading and result states
 *
 * **status** {string} [optional] Currently doing this
 *
 * **state** {'loading'|'success'|'warning'|'error'} [optional, default 'loading']
 *
 * **lightBlue** {boolean} [optional, default false] Show light blue loading screen
 *
 * **message** {string} [optional] Message displayed for warning and error states
 *
 * **mainAction** {string} [optional] Text of main action button (button is hidden otherwise)
 *
 * **alternativeAction** {string} [optional] Text of alternative action link (link is hidden otherwise)
 *
 * **small** {boolean} [optional] Toggle to a smaller layout
 *
 * Events:
 *
 * **@main-action**
 *
 * **@alternative-action**
 *
 * The `state` is available as `StatusScreen.State.LOADING`, `StatusScreen.State.SUCCESS`,
 * `StatusScreen.State.WARNING` and `StatusScreen.State.ERROR`.
 *
 * The events are available as `StatusScreen.Events.MAIN_ACTION` and `StatusScreen.Events.ALTERNATIVE_ACTION`.
 */
let StatusScreen = StatusScreen_1 = class StatusScreen extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.currentStatus = '';
        this.nextStatus = '';
        this.isTransitioningStatus = false;
        /**
         * To enable a smooth transition of the non-transitionable background-image
         * property, we instead place the new background above the old one and
         * animate the top element's opacity. But because the color area has rounded
         * corners, and the browser creates transparent pixels in the corner
         * because of anti-aliasing, the blue background partly shines through the
         * transparent corner pixels of the foreground. Thus we remove the background
         * color after the transition is complete.
         */
        this.showLoadingBackground = true;
        this.loadingTitle = '';
        this.hideLoadingBackgroundTimeout = -1;
        this.statusUpdateTimeout = -1;
    }
    updateLoadingTitle(newTitle) {
        // only change the _loadingTitle, if we're still in the loading state (and not changing the state right after
        // setting the title) to avoid it being changed on the loading screen when we actually want to set it for the
        // success/error/warning screen.
        this.$nextTick(() => {
            if (this.state !== StatusScreen_1.State.LOADING)
                return;
            this.loadingTitle = newTitle;
        });
    }
    updateState(newState, oldState) {
        if (newState === StatusScreen_1.State.LOADING) {
            // Starting in or changing to LOADING
            if (this.hideLoadingBackgroundTimeout !== -1) {
                clearTimeout(this.hideLoadingBackgroundTimeout);
                this.hideLoadingBackgroundTimeout = -1;
            }
            this.showLoadingBackground = true;
        }
        else {
            // other state than LOADING
            if (oldState === StatusScreen_1.State.LOADING) {
                if (this.hideLoadingBackgroundTimeout === -1) {
                    this.hideLoadingBackgroundTimeout = window.setTimeout(() => {
                        this.showLoadingBackground = false;
                        this.hideLoadingBackgroundTimeout = -1;
                    }, 1000);
                }
            }
            else {
                this.showLoadingBackground = false;
            }
        }
    }
    async updateStatus(newStatus) {
        if (this.statusUpdateTimeout !== -1) {
            clearTimeout(this.statusUpdateTimeout);
            // reset transitioning state for new change
            this.isTransitioningStatus = false;
            await this.$nextTick();
            await new Promise((resolve) => requestAnimationFrame(resolve)); // await style update
            this.currentStatus = this.nextStatus;
        }
        this.nextStatus = newStatus;
        this.isTransitioningStatus = true;
        this.statusUpdateTimeout = window.setTimeout(() => {
            this.statusUpdateTimeout = -1;
            this.currentStatus = newStatus;
            this.isTransitioningStatus = false;
        }, 500);
    }
    onMainAction() {
        this.$emit(StatusScreen_1.Events.MAIN_ACTION);
    }
    onAlternativeAction() {
        this.$emit(StatusScreen_1.Events.ALTERNATIVE_ACTION);
    }
};
// TODO: Move to CONSTANTS
StatusScreen.SUCCESS_REDIRECT_DELAY = 2000; // 1s of transition + 1s of display
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])({ type: String })
], StatusScreen.prototype, "title", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])({ default: 'loading' })
], StatusScreen.prototype, "state", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(Boolean)
], StatusScreen.prototype, "lightBlue", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(String)
], StatusScreen.prototype, "status", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(String)
], StatusScreen.prototype, "message", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(String)
], StatusScreen.prototype, "mainAction", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(String)
], StatusScreen.prototype, "alternativeAction", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])(Boolean)
], StatusScreen.prototype, "small", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('title', { immediate: true })
], StatusScreen.prototype, "updateLoadingTitle", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('state', { immediate: true })
], StatusScreen.prototype, "updateState", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('status', { immediate: true })
], StatusScreen.prototype, "updateStatus", null);
StatusScreen = StatusScreen_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { LoadingSpinner: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["LoadingSpinner"], CheckmarkIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["CheckmarkIcon"], FaceNeutralIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["FaceNeutralIcon"], FaceSadIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["FaceSadIcon"] } })
], StatusScreen);
(function (StatusScreen) {
    let State;
    (function (State) {
        State["LOADING"] = "loading";
        State["SUCCESS"] = "success";
        State["WARNING"] = "warning";
        State["ERROR"] = "error";
    })(State = StatusScreen.State || (StatusScreen.State = {}));
    let Events;
    (function (Events) {
        Events["MAIN_ACTION"] = "main-action";
        Events["ALTERNATIVE_ACTION"] = "alternative-action";
    })(Events = StatusScreen.Events || (StatusScreen.Events = {}));
})(StatusScreen || (StatusScreen = {}));
/* harmony default export */ __webpack_exports__["default"] = (StatusScreen);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "status-screen",
      class: {
        "nq-blue-bg": _vm.showLoadingBackground && !_vm.lightBlue,
        "nq-light-blue-bg": _vm.showLoadingBackground && _vm.lightBlue,
        "exit-transition": _vm.state === "success",
        small: _vm.small
      }
    },
    [
      _c("transition", { attrs: { name: "fade-loading" } }, [
        _vm.state === "loading"
          ? _c("div", { staticClass: "wrapper" }, [
              _c("h1", { staticClass: "title nq-h1" }, [
                _vm._v(_vm._s(_vm.loadingTitle))
              ]),
              _c(
                "div",
                { staticClass: "icon-row" },
                [_vm._t("loading", [_c("LoadingSpinner")])],
                2
              ),
              _c(
                "div",
                {
                  staticClass: "status-row",
                  class: { transition: _vm.isTransitioningStatus }
                },
                [
                  _c("div", { staticClass: "status current nq-h2" }, [
                    _vm._v(_vm._s(_vm.currentStatus))
                  ]),
                  _c("div", { staticClass: "status next nq-h2" }, [
                    _vm._v(_vm._s(_vm.nextStatus))
                  ])
                ]
              )
            ])
          : _vm._e()
      ]),
      _c("transition", { attrs: { name: "fade-result" } }, [
        _vm.state === "success"
          ? _c("div", { staticClass: "wrapper success nq-green-bg" }, [
              _c("div", { staticClass: "spacer" }),
              _c(
                "div",
                { staticClass: "icon-row" },
                [
                  _vm._t("success", [
                    _c("CheckmarkIcon"),
                    _c("h1", { staticClass: "title nq-h1" }, [
                      _vm._v(_vm._s(_vm.title))
                    ])
                  ])
                ],
                2
              ),
              _c("div", { staticClass: "spacer" })
            ])
          : _vm._e()
      ]),
      _c("transition", { attrs: { name: "fade-result" } }, [
        _vm.state === "warning"
          ? _c("div", { staticClass: "wrapper warning nq-orange-bg" }, [
              _c("div", {
                staticClass: "spacer",
                class: {
                  "with-main-action": !!_vm.mainAction,
                  "with-alternative-action": !!_vm.alternativeAction
                }
              }),
              _c(
                "div",
                { staticClass: "icon-row" },
                [
                  _vm._t("warning", [
                    _c("FaceNeutralIcon"),
                    _c("h1", { staticClass: "title nq-h1" }, [
                      _vm._v(_vm._s(_vm.title))
                    ]),
                    _vm.message
                      ? _c("p", { staticClass: "message nq-text" }, [
                          _vm._v(_vm._s(_vm.message))
                        ])
                      : _vm._e()
                  ])
                ],
                2
              ),
              _c("div", { staticClass: "action-row" }, [
                _vm.mainAction
                  ? _c(
                      "button",
                      {
                        staticClass: "nq-button orange inverse",
                        on: { click: _vm.onMainAction }
                      },
                      [_vm._v(_vm._s(_vm.mainAction))]
                    )
                  : _vm._e(),
                _vm.alternativeAction
                  ? _c(
                      "a",
                      {
                        staticClass: "alternative-action nq-link",
                        attrs: { href: "javascript:void(0)" },
                        on: { click: _vm.onAlternativeAction }
                      },
                      [_vm._v(_vm._s(_vm.alternativeAction))]
                    )
                  : _vm._e()
              ])
            ])
          : _vm._e()
      ]),
      _c("transition", { attrs: { name: "fade-result" } }, [
        _vm.state === "error"
          ? _c("div", { staticClass: "wrapper error nq-red-bg" }, [
              _c("div", {
                staticClass: "spacer",
                class: {
                  "with-main-action": !!_vm.mainAction,
                  "with-alternative-action": !!_vm.alternativeAction
                }
              }),
              _c(
                "div",
                { staticClass: "icon-row" },
                [
                  _vm._t("error", [
                    _c("FaceSadIcon"),
                    _c("h1", { staticClass: "title nq-h1" }, [
                      _vm._v(_vm._s(_vm.title))
                    ]),
                    _vm.message
                      ? _c("p", { staticClass: "message nq-text" }, [
                          _vm._v(_vm._s(_vm.message))
                        ])
                      : _vm._e()
                  ])
                ],
                2
              ),
              _c("div", { staticClass: "action-row" }, [
                _vm.mainAction
                  ? _c(
                      "button",
                      {
                        staticClass: "main-action nq-button red inverse",
                        on: { click: _vm.onMainAction }
                      },
                      [_vm._v(_vm._s(_vm.mainAction))]
                    )
                  : _vm._e(),
                _vm.alternativeAction
                  ? _c(
                      "a",
                      {
                        staticClass: "alternative-action nq-link",
                        attrs: { href: "javascript:void(0)" },
                        on: { click: _vm.onAlternativeAction }
                      },
                      [_vm._v(_vm._s(_vm.alternativeAction))]
                    )
                  : _vm._e()
              ])
            ])
          : _vm._e()
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.status-screen[data-v-5e2db7a4] {\n    --status-screen-margin: .75rem;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    border-radius: 0.625rem;\n    width: calc(100% - 2 * var(--status-screen-margin));\n    height: calc(100% - 2 * var(--status-screen-margin));\n    margin: var(--status-screen-margin);\n    z-index: 1000;\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n.wrapper[data-v-5e2db7a4] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    border-radius: 0.625rem;\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n}\n.icon-row[data-v-5e2db7a4],\n.status-row[data-v-5e2db7a4],\n.action-row[data-v-5e2db7a4] {\n    width: 100%;\n    text-align: center;\n}\n.success .icon-row[data-v-5e2db7a4] {\n    margin-top: 2rem;\n}\n.status-row[data-v-5e2db7a4] {\n    --status-font-size: 2.5rem;\n    margin-top: 2rem; /* Same as title margin-bottom, to equalize spacing to center icon */\n    margin-bottom: 5rem;\n    height: var(--status-font-size); /* 1 line of status text. For multiple lines, the text overflows to the top */\n    position: relative;\n}\n.status-screen.small .status-row[data-v-5e2db7a4] {\n    margin-bottom: 2.5rem;\n}\n.status[data-v-5e2db7a4] {\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    margin: 0;\n    padding: 0 2rem;\n    font-size: var(--status-font-size);\n    font-weight: normal;\n    line-height: 1.2;\n    opacity: 1;\n}\n.status-screen.small .status[data-v-5e2db7a4] {\n    /* on small layout center multiple lines vertically instead of overflowing to the top */\n    -webkit-transform: translateY(calc(50% - var(--status-font-size) / 2));\n            transform: translateY(calc(50% - var(--status-font-size) / 2));\n}\n.status-row.transition .status[data-v-5e2db7a4] {\n    -webkit-transition: opacity 500ms, -webkit-transform 500ms;\n    transition: opacity 500ms, -webkit-transform 500ms;\n    transition: transform 500ms, opacity 500ms;\n    transition: transform 500ms, opacity 500ms, -webkit-transform 500ms;\n}\n.status-row.transition .status.current[data-v-5e2db7a4] {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%);\n    opacity: 0;\n}\n.status-screen.small .status-row.transition .status.current[data-v-5e2db7a4] {\n    /* on small layout move message less to avoid that it flies over half the screen */\n    -webkit-transform: translateY(calc(-1 * var(--status-font-size)));\n            transform: translateY(calc(-1 * var(--status-font-size)));\n}\n.status-row:not(.transition) .status.next[data-v-5e2db7a4] {\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%);\n    opacity: 0;\n}\n.spacer[data-v-5e2db7a4] {\n    padding-top: 2rem;\n}\n.success .spacer[data-v-5e2db7a4] {\n    padding-top: 6rem;\n}\n.spacer.with-main-action[data-v-5e2db7a4] {\n    padding-bottom: 8rem;\n}\n.spacer.with-alternative-action[data-v-5e2db7a4] {\n    margin-bottom: 2rem;\n}\n.action-row[data-v-5e2db7a4] {\n    padding-bottom: 2rem;\n}\n.action-row .nq-link[data-v-5e2db7a4] {\n    color: white;\n    font-size: 2rem;\n}\n\n/* FADE transitions */\n.fade-loading-leave-active[data-v-5e2db7a4],\n.fade-result-leave-active[data-v-5e2db7a4] {\n    -webkit-transition: opacity 300ms;\n    transition: opacity 300ms;\n}\n.fade-loading-enter-active[data-v-5e2db7a4],\n.fade-result-enter-active[data-v-5e2db7a4] {\n    -webkit-transition: opacity 700ms 300ms;\n    transition: opacity 700ms 300ms;\n}\n.fade-loading-enter[data-v-5e2db7a4],\n.fade-loading-leave-to[data-v-5e2db7a4],\n.fade-result-enter[data-v-5e2db7a4],\n.fade-result-leave-to[data-v-5e2db7a4] {\n    opacity: 0;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.status-screen .title {\n    line-height: 1;\n    margin-top: 4rem;\n    white-space: pre-line;\n}\n.status-screen.small .title {\n    margin-top: 3rem;\n    margin-bottom: 2rem;\n    font-size: 2.5rem;\n}\n.status-screen .icon-row .nq-icon {\n    margin: auto;\n}\n.status-screen .success .nq-icon {\n    font-size: 9rem;\n}\n.status-screen .warning .nq-icon {\n    font-size: 10rem;\n}\n.status-screen .error .nq-icon {\n    font-size: 12rem;\n}\n.status-screen .icon-row .title,\n.status-screen .icon-row .message {\n    margin-left: auto;\n    margin-right: auto;\n}\n.status-screen .icon-row .title {\n    max-width: 80%;\n    line-height: 1.4;\n}\n.status-screen .message {\n    max-width: 70%;\n    opacity: 1;\n}\n.status-screen.exit-transition {\n    /* animation: exit-transition 600ms 1s; */\n}\n@-webkit-keyframes exit-transition {\nfrom { -webkit-transform: scale(1); transform: scale(1); opacity: 1;\n}\n80%  { opacity: 0;\n}\nto   { -webkit-transform: scale(0); transform: scale(0); opacity: 0;\n}\n}\n@keyframes exit-transition {\nfrom { -webkit-transform: scale(1); transform: scale(1); opacity: 1;\n}\n80%  { opacity: 0;\n}\nto   { -webkit-transform: scale(0); transform: scale(0); opacity: 0;\n}\n}\n.status-screen.exit-transition .success .icon-row {\n    -webkit-animation: success-title-slide 1s;\n            animation: success-title-slide 1s;\n}\n@-webkit-keyframes success-title-slide {\nfrom { -webkit-transform: translateY(8rem); transform: translateY(8rem);\n}\nto   { -webkit-transform: translateY(0); transform: translateY(0);\n}\n}\n@keyframes success-title-slide {\nfrom { -webkit-transform: translateY(8rem); transform: translateY(8rem);\n}\nto   { -webkit-transform: translateY(0); transform: translateY(0);\n}\n}\n\n/* Optional entry animation that components can apply on the status-screen */\n.status-screen.grow-from-bottom-button {\n    position: absolute;\n    -webkit-animation: status-screen-grow-from-bottom-button .6s forwards cubic-bezier(0.25, 0, 0, 1);\n            animation: status-screen-grow-from-bottom-button .6s forwards cubic-bezier(0.25, 0, 0, 1);\n    overflow: hidden;\n}\n@-webkit-keyframes status-screen-grow-from-bottom-button {\n0%,\n    20% {\n        max-width: calc(100% - 12rem);\n        max-height: 7.5rem;\n        bottom: calc(4.25rem - var(--status-screen-margin));\n        left: calc(6rem - var(--status-screen-margin));\n        border-radius: 4rem;\n}\n0% {\n        opacity: 0;\n}\n25% {\n        opacity: 1;\n}\n100% {\n        max-width: calc(100% - 2 * var(--status-screen-margin));\n        max-height: calc(100% - 2 * var(--status-screen-margin));\n        bottom: 0;\n        left: 0;\n        border-radius: 0.5rem;\n}\n}\n@keyframes status-screen-grow-from-bottom-button {\n0%,\n    20% {\n        max-width: calc(100% - 12rem);\n        max-height: 7.5rem;\n        bottom: calc(4.25rem - var(--status-screen-margin));\n        left: calc(6rem - var(--status-screen-margin));\n        border-radius: 4rem;\n}\n0% {\n        opacity: 0;\n}\n25% {\n        opacity: 1;\n}\n100% {\n        max-width: calc(100% - 2 * var(--status-screen-margin));\n        max-height: calc(100% - 2 * var(--status-screen-margin));\n        bottom: 0;\n        left: 0;\n        border-radius: 0.5rem;\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("00195264", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./StatusScreen.vue?vue&type=style&index=1&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("75340254", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/StatusScreen.vue":
/*!*****************************************!*\
  !*** ./src/components/StatusScreen.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StatusScreen_vue_vue_type_template_id_5e2db7a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true& */ "./src/components/StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true&");
/* harmony import */ var _StatusScreen_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StatusScreen.vue?vue&type=script&lang=ts& */ "./src/components/StatusScreen.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css& */ "./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css&");
/* harmony import */ var _StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StatusScreen.vue?vue&type=style&index=1&lang=css& */ "./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _StatusScreen_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StatusScreen_vue_vue_type_template_id_5e2db7a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StatusScreen_vue_vue_type_template_id_5e2db7a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5e2db7a4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/StatusScreen.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/StatusScreen.vue?vue&type=script&lang=ts&":
/*!******************************************************************!*\
  !*** ./src/components/StatusScreen.vue?vue&type=script&lang=ts& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./StatusScreen.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css&":
/*!**************************************************************************************************!*\
  !*** ./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=0&id=5e2db7a4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_0_id_5e2db7a4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css&":
/*!**************************************************************************!*\
  !*** ./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css& ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./StatusScreen.vue?vue&type=style&index=1&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=style&index=1&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true&":
/*!************************************************************************************!*\
  !*** ./src/components/StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_template_id_5e2db7a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/StatusScreen.vue?vue&type=template&id=5e2db7a4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_template_id_5e2db7a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusScreen_vue_vue_type_template_id_5e2db7a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=activate-btc~activate-btc-ledger~add-account~add-ledger~add-vesting-contract~cashlink~checkout~choos~64eed30e.js.map