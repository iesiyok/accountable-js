(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add-account~add-ledger"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/IdenticonSelector.vue?vue&type=script&lang=ts&":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/IdenticonSelector.vue?vue&type=script&lang=ts& ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nimiq/vue-components */ "./node_modules/@nimiq/vue-components/dist/NimiqVueComponents.umd.js");
/* harmony import */ var _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Input_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Input.vue */ "./src/components/Input.vue");
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/Helpers */ "./src/lib/Helpers.ts");
var IdenticonSelector_1;





let IdenticonSelector = IdenticonSelector_1 = class IdenticonSelector extends vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"] {
    constructor() {
        super(...arguments);
        this.page = 0;
        this.selectedAccount = null;
    }
    get displayedAccounts() {
        if (this.accounts.length === 0)
            return [];
        const accountsToDisplay = [];
        let index = (this.page * IdenticonSelector_1.IDENTICONS_PER_PAGE) % this.accounts.length;
        while (accountsToDisplay.length < IdenticonSelector_1.IDENTICONS_PER_PAGE) {
            accountsToDisplay.push(this.accounts[index]);
            index = (index + 1) % this.accounts.length;
        }
        return accountsToDisplay;
    }
    _onAccountsChanged() {
        this.selectedAccount = null;
        this.page = 0;
    }
    _selectAccount(account) {
        this.selectedAccount = account;
        if (!account || this.confirmAccountSelection) {
            if (account && Object(_lib_Helpers__WEBPACK_IMPORTED_MODULE_4__["isDesktop"])()) {
                vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Vue"].nextTick().then(() => this.$refs.labelInput.focus());
            }
            return;
        }
        this._onSelectionConfirmed();
    }
    _onSelectionConfirmed() {
        this.$emit(IdenticonSelector_1.Events.IDENTICON_SELECTED, this.selectedAccount);
    }
};
IdenticonSelector.IDENTICONS_PER_PAGE = 7;
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])({ default: () => [], type: Array })
], IdenticonSelector.prototype, "accounts", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])({ default: true, type: Boolean })
], IdenticonSelector.prototype, "confirmAccountSelection", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Prop"])({ default: 'Select', type: String })
], IdenticonSelector.prototype, "confirmButtonText", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Watch"])('accounts')
], IdenticonSelector.prototype, "_onAccountsChanged", null);
IdenticonSelector = IdenticonSelector_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_1__["Component"])({ components: { PageHeader: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["PageHeader"], Identicon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["Identicon"], LoadingSpinner: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["LoadingSpinner"], AddressDisplay: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["AddressDisplay"], LabelInput: _Input_vue__WEBPACK_IMPORTED_MODULE_3__["default"], CloseIcon: _nimiq_vue_components__WEBPACK_IMPORTED_MODULE_2__["CloseIcon"] } })
], IdenticonSelector);
(function (IdenticonSelector) {
    let Events;
    (function (Events) {
        Events["IDENTICON_SELECTED"] = "identicon-selected";
    })(Events = IdenticonSelector.Events || (IdenticonSelector.Events = {}));
})(IdenticonSelector || (IdenticonSelector = {}));
/* harmony default export */ __webpack_exports__["default"] = (IdenticonSelector);


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/IdenticonSelector.vue?vue&type=template&id=b2093d30&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/IdenticonSelector.vue?vue&type=template&id=b2093d30&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "identicon-selector",
      class: {
        "account-details-shown":
          _vm.selectedAccount && _vm.confirmAccountSelection
      },
      on: {
        keydown: function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])
          ) {
            return null
          }
          return _vm._selectAccount(null)
        }
      }
    },
    [
      _c(
        "div",
        { staticClass: "blur-target" },
        [
          _vm._t("header", [
            _c("PageHeader", [_vm._v(_vm._s(_vm.$t('67')))])
          ])
        ],
        2
      ),
      _c(
        "div",
        { staticClass: "identicons" },
        [
          _vm.displayedAccounts.length === 0
            ? _c(
                "div",
                { staticClass: "center blur-target" },
                [
                  _c("LoadingSpinner"),
                  _c("h2", { staticClass: "nq-h2" }, [
                    _vm._v(_vm._s(_vm.$t('157')))
                  ])
                ],
                1
              )
            : _vm._e(),
          _vm._l(_vm.displayedAccounts, function(account) {
            return _c(
              "button",
              {
                key: account.userFriendlyAddress,
                staticClass: "wrapper",
                class: {
                  selected:
                    _vm.selectedAccount === account &&
                    _vm.confirmAccountSelection
                },
                attrs: {
                  tabindex:
                    _vm.selectedAccount && _vm.confirmAccountSelection ? -1 : 0
                },
                on: {
                  click: function($event) {
                    return _vm._selectAccount(account)
                  }
                }
              },
              [
                _c("Identicon", {
                  attrs: { address: account.userFriendlyAddress }
                })
              ],
              1
            )
          })
        ],
        2
      ),
      _vm.displayedAccounts.length > 0
        ? _c(
            "button",
            {
              staticClass: "generate-more nq-button-s blur-target",
              attrs: {
                tabindex:
                  _vm.selectedAccount && _vm.confirmAccountSelection ? -1 : 0
              },
              on: {
                click: function($event) {
                  _vm.page += 1
                }
              }
            },
            [_vm._v(" " + _vm._s(_vm.$t('158')) + " ")]
          )
        : _vm._e(),
      _c("transition", { attrs: { name: "transition-fade" } }, [
        _vm.selectedAccount && _vm.confirmAccountSelection
          ? _c(
              "div",
              {
                staticClass: "account-details",
                on: {
                  click: function($event) {
                    return _vm._selectAccount(null)
                  }
                }
              },
              [
                _c(
                  "button",
                  {
                    staticClass: "nq-button-s close-button",
                    on: {
                      click: function($event) {
                        return _vm._selectAccount(null)
                      }
                    }
                  },
                  [_c("CloseIcon")],
                  1
                ),
                _c("LabelInput", {
                  ref: "labelInput",
                  attrs: {
                    placeholder: _vm.selectedAccount.defaultLabel,
                    value: _vm.selectedAccount.label
                  },
                  on: {
                    changed: function($event) {
                      _vm.selectedAccount.label =
                        $event || _vm.selectedAccount.defaultLabel
                    }
                  },
                  nativeOn: {
                    click: function($event) {
                      $event.stopPropagation()
                    }
                  }
                }),
                _c("AddressDisplay", {
                  attrs: { address: _vm.selectedAccount.userFriendlyAddress },
                  nativeOn: {
                    click: function($event) {
                      $event.stopPropagation()
                    }
                  }
                }),
                _c(
                  "button",
                  {
                    staticClass: "nq-button light-blue",
                    on: {
                      click: function($event) {
                        $event.stopPropagation()
                        return _vm._onSelectionConfirmed($event)
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.confirmButtonText))]
                )
              ],
              1
            )
          : _vm._e()
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/IdenticonSelector.vue?vue&type=style&index=0&id=b2093d30&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/IdenticonSelector.vue?vue&type=style&index=0&id=b2093d30&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.identicon-selector[data-v-b2093d30] {\n    width: 100%;\n    text-align: center;\n    position: relative;\n    overflow: hidden;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\nbutton[data-v-b2093d30]:not(.nq-button):not(.nq-button-s) {\n    background: unset;\n    border: unset;\n    font-family: unset;\n    padding: unset;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n}\n.identicons[data-v-b2093d30] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: 100%;\n    height: 41rem;\n    position: relative;\n    margin-top: 3rem;\n}\n.wrapper[data-v-b2093d30] {\n    width: 14.25rem;\n    height: 14.25rem;\n    position: absolute;\n    z-index: 1;\n    /* use a delay for z-index to only reset the value after transitioning back */\n    -webkit-transition: z-index 0s .5s, -webkit-transform .5s 0s cubic-bezier(0.25, 0, 0, 1), -webkit-filter .4s 0s cubic-bezier(0.25, 0, 0, 1);\n    transition: z-index 0s .5s, -webkit-transform .5s 0s cubic-bezier(0.25, 0, 0, 1), -webkit-filter .4s 0s cubic-bezier(0.25, 0, 0, 1);\n    transition: transform .5s 0s cubic-bezier(0.25, 0, 0, 1), filter .4s 0s cubic-bezier(0.25, 0, 0, 1), z-index 0s .5s;\n    transition: transform .5s 0s cubic-bezier(0.25, 0, 0, 1), filter .4s 0s cubic-bezier(0.25, 0, 0, 1), z-index 0s .5s, -webkit-transform .5s 0s cubic-bezier(0.25, 0, 0, 1), -webkit-filter .4s 0s cubic-bezier(0.25, 0, 0, 1);\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n    cursor: pointer;\n    outline: none !important;\n}\n.wrapper .identicon[data-v-b2093d30] {\n    width: 100%;\n    height: 100%;\n    -webkit-animation: pop-in-data-v-b2093d30 500ms cubic-bezier(0.25, 0, 0, 1);\n            animation: pop-in-data-v-b2093d30 500ms cubic-bezier(0.25, 0, 0, 1);\n    -webkit-animation-fill-mode: backwards;\n            animation-fill-mode: backwards;\n}\n@-webkit-keyframes pop-in-data-v-b2093d30 {\nfrom { -webkit-transform: scale(0); transform: scale(0);\n}\nto   { -webkit-transform: scale(1); transform: scale(1);\n}\n}\n@keyframes pop-in-data-v-b2093d30 {\nfrom { -webkit-transform: scale(0); transform: scale(0);\n}\nto   { -webkit-transform: scale(1); transform: scale(1);\n}\n}\n.wrapper .identicon[data-v-b2093d30] img {\n    -webkit-transition: -webkit-transform .5s;\n    transition: -webkit-transform .5s;\n    transition: transform .5s;\n    transition: transform .5s, -webkit-transform .5s;\n}\n.wrapper[data-v-b2093d30]:hover img,\n.wrapper[data-v-b2093d30]:focus img {\n    -webkit-transform: scale(1.1);\n            transform: scale(1.1);\n}\n.wrapper[data-v-b2093d30]:nth-child(1) { -webkit-transform: translate(  0.0rem, -14.25rem); transform: translate(  0.0rem, -14.25rem);\n}\n.wrapper[data-v-b2093d30]:nth-child(2) { -webkit-transform: translate(-12.5rem,  -7.25rem); transform: translate(-12.5rem,  -7.25rem);\n}\n.wrapper[data-v-b2093d30]:nth-child(3) { -webkit-transform: translate( 12.5rem,  -7.25rem); transform: translate( 12.5rem,  -7.25rem);\n}\n.wrapper[data-v-b2093d30]:nth-child(4) { -webkit-transform: translate(  0.0rem,   0.00rem); transform: translate(  0.0rem,   0.00rem);\n}\n.wrapper[data-v-b2093d30]:nth-child(5) { -webkit-transform: translate(-12.5rem,   7.25rem); transform: translate(-12.5rem,   7.25rem);\n}\n.wrapper[data-v-b2093d30]:nth-child(6) { -webkit-transform: translate( 12.5rem,   7.25rem); transform: translate( 12.5rem,   7.25rem);\n}\n.wrapper[data-v-b2093d30]:nth-child(7) { -webkit-transform: translate(  0.0rem,  14.25rem); transform: translate(  0.0rem,  14.25rem);\n}\n.wrapper:nth-child(1) .identicon[data-v-b2093d30] { -webkit-animation-delay: 100ms; animation-delay: 100ms;\n}\n.wrapper:nth-child(2) .identicon[data-v-b2093d30] { -webkit-animation-delay: 150ms; animation-delay: 150ms;\n}\n.wrapper:nth-child(3) .identicon[data-v-b2093d30] { -webkit-animation-delay: 150ms; animation-delay: 150ms;\n}\n.wrapper:nth-child(4) .identicon[data-v-b2093d30] { -webkit-animation-delay: 200ms; animation-delay: 200ms;\n}\n.wrapper:nth-child(5) .identicon[data-v-b2093d30] { -webkit-animation-delay: 250ms; animation-delay: 250ms;\n}\n.wrapper:nth-child(6) .identicon[data-v-b2093d30] { -webkit-animation-delay: 250ms; animation-delay: 250ms;\n}\n.wrapper:nth-child(7) .identicon[data-v-b2093d30] { -webkit-animation-delay: 300ms; animation-delay: 300ms;\n}\n.wrapper.selected[data-v-b2093d30] {\n    z-index: 2;\n    -webkit-transform: translateY(-15rem);\n            transform: translateY(-15rem);\n    -webkit-transition-delay: 0s;\n            transition-delay: 0s;\n    width: 100%;\n    pointer-events: none;\n}\n.wrapper.selected[data-v-b2093d30] img {\n    -webkit-transform: scale(1.264) translateY(-1rem);\n            transform: scale(1.264) translateY(-1rem);\n}\n.generate-more[data-v-b2093d30] {\n    margin-top: 6rem;\n}\n.account-details[data-v-b2093d30] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n    padding: 4rem 3rem;\n    background: rgba(255, 255, 255, .875); /* equivalent to keyguard: .5 on blurred and .75 on account details */\n    border-radius: 1rem;\n    z-index: 1;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    -webkit-transition: opacity .5s cubic-bezier(0.25, 0, 0, 1);\n    transition: opacity .5s cubic-bezier(0.25, 0, 0, 1);\n}\n.account-details .label-input[data-v-b2093d30] {\n    font-size: 3rem;\n    font-weight: 600;\n    max-width: 100%;\n}\n.account-details .address-display[data-v-b2093d30] {\n    margin-top: 2.5rem;\n    -webkit-user-select: all;\n       -moz-user-select: all;\n        -ms-user-select: all;\n            user-select: all;\n}\n.account-details .nq-button[data-v-b2093d30] {\n    width: calc(100% - 6rem);\n    margin: 5rem auto 0;\n}\n.account-details .close-button[data-v-b2093d30] {\n    position: absolute;\n    right: 2rem;\n    top: 2rem;\n    font-size: 3rem;\n    padding: 0;\n    height: unset;\n}\n.account-details .close-button .nq-icon[data-v-b2093d30] {\n    opacity: .2;\n    -webkit-transition: opacity .3s cubic-bezier(0.25, 0, 0, 1);\n    transition: opacity .3s cubic-bezier(0.25, 0, 0, 1);\n}\n.account-details .close-button .nq-icon[data-v-b2093d30]:hover,\n.account-details .close-button .nq-icon[data-v-b2093d30]:focus,\n.account-details .close-button .nq-icon[data-v-b2093d30]:active {\n    opacity: .4;\n}\n.blur-target[data-v-b2093d30] {\n    -webkit-transition: -webkit-filter .4s;\n    transition: -webkit-filter .4s;\n    transition: filter .4s;\n    transition: filter .4s, -webkit-filter .4s;\n}\n.blur-target.nq-button-s[data-v-b2093d30] {\n    -webkit-transition: color .3s cubic-bezier(.25, 0, 0, 1), background-color .3s cubic-bezier(.25, 0, 0, 1),\n        \n        -webkit-filter .4s;\n    transition: color .3s cubic-bezier(.25, 0, 0, 1), background-color .3s cubic-bezier(.25, 0, 0, 1),\n        \n        -webkit-filter .4s;\n    transition: filter .4s,\n        /* Transitions from @nimiq/style .nq-button-s class for proper hover/focus effect */\n        color .3s cubic-bezier(.25, 0, 0, 1), background-color .3s cubic-bezier(.25, 0, 0, 1);\n    transition: filter .4s,\n        \n        color .3s cubic-bezier(.25, 0, 0, 1), background-color .3s cubic-bezier(.25, 0, 0, 1),\n        \n        -webkit-filter .4s;\n}\n.account-details-shown .blur-target[data-v-b2093d30],\n.account-details-shown .wrapper[data-v-b2093d30]:not(.selected) {\n    -webkit-filter: blur(20px);\n            filter: blur(20px);\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/IdenticonSelector.vue?vue&type=style&index=0&id=b2093d30&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/IdenticonSelector.vue?vue&type=style&index=0&id=b2093d30&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./IdenticonSelector.vue?vue&type=style&index=0&id=b2093d30&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/IdenticonSelector.vue?vue&type=style&index=0&id=b2093d30&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("6e238153", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/components/IdenticonSelector.vue":
/*!**********************************************!*\
  !*** ./src/components/IdenticonSelector.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IdenticonSelector_vue_vue_type_template_id_b2093d30_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IdenticonSelector.vue?vue&type=template&id=b2093d30&scoped=true& */ "./src/components/IdenticonSelector.vue?vue&type=template&id=b2093d30&scoped=true&");
/* harmony import */ var _IdenticonSelector_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IdenticonSelector.vue?vue&type=script&lang=ts& */ "./src/components/IdenticonSelector.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _IdenticonSelector_vue_vue_type_style_index_0_id_b2093d30_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IdenticonSelector.vue?vue&type=style&index=0&id=b2093d30&scoped=true&lang=css& */ "./src/components/IdenticonSelector.vue?vue&type=style&index=0&id=b2093d30&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _IdenticonSelector_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IdenticonSelector_vue_vue_type_template_id_b2093d30_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IdenticonSelector_vue_vue_type_template_id_b2093d30_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "b2093d30",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/IdenticonSelector.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/IdenticonSelector.vue?vue&type=script&lang=ts&":
/*!***********************************************************************!*\
  !*** ./src/components/IdenticonSelector.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdenticonSelector_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/ts-loader??ref--12-1!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./IdenticonSelector.vue?vue&type=script&lang=ts& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/IdenticonSelector.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_ts_loader_index_js_ref_12_1_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdenticonSelector_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/IdenticonSelector.vue?vue&type=style&index=0&id=b2093d30&scoped=true&lang=css&":
/*!*******************************************************************************************************!*\
  !*** ./src/components/IdenticonSelector.vue?vue&type=style&index=0&id=b2093d30&scoped=true&lang=css& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdenticonSelector_vue_vue_type_style_index_0_id_b2093d30_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./IdenticonSelector.vue?vue&type=style&index=0&id=b2093d30&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/IdenticonSelector.vue?vue&type=style&index=0&id=b2093d30&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdenticonSelector_vue_vue_type_style_index_0_id_b2093d30_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdenticonSelector_vue_vue_type_style_index_0_id_b2093d30_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdenticonSelector_vue_vue_type_style_index_0_id_b2093d30_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdenticonSelector_vue_vue_type_style_index_0_id_b2093d30_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdenticonSelector_vue_vue_type_style_index_0_id_b2093d30_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/IdenticonSelector.vue?vue&type=template&id=b2093d30&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./src/components/IdenticonSelector.vue?vue&type=template&id=b2093d30&scoped=true& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdenticonSelector_vue_vue_type_template_id_b2093d30_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e5283d1-vue-loader-template"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./IdenticonSelector.vue?vue&type=template&id=b2093d30&scoped=true& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e5283d1-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/IdenticonSelector.vue?vue&type=template&id=b2093d30&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdenticonSelector_vue_vue_type_template_id_b2093d30_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e5283d1_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdenticonSelector_vue_vue_type_template_id_b2093d30_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=add-account~add-ledger-legacy.js.map