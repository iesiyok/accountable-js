(function () {
  'use strict';

  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  // Firefox and Safari currently do not support CompressionStream
  const DOWNLOAD_JS_ENABLED = 'CompressionStream' in window;

  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  chrome.runtime.onMessage.addListener(message => {
    if (message && message.popup) {
      const state = message.popup.slice(message.popup.indexOf('=') + 1);
      updateDisplay(state);
    }
  });

  // doing this so we can add support for i18n using messages.json
  function attachTextToHtml() {
    const i18nElements = document.querySelectorAll(`[id^="i18n"]`);
    Array.from(i18nElements).forEach(element => {
      element.innerHTML = chrome.i18n.getMessage(element.id);
    });
  }

  function attachListeners() {
    const menuButtonList = document.getElementsByClassName('menu');
    Array.from(menuButtonList).forEach(menuButton => {
      menuButton.addEventListener('click', () => updateDisplay('menu'));
    });

    const closeMenuButton = document.getElementById('close_menu');
    closeMenuButton.addEventListener('click', () => window.close());

    const menuRowList = document.getElementsByClassName('menu_row');

    menuRowList[0].addEventListener('click', () => {
      chrome.runtime.sendMessage({
        popup_help_wa: chrome.i18n.getMessage('about_code_verify_faq_url_wa'),
        popup_help_msgr: chrome.i18n.getMessage('about_code_verify_faq_url_msgr'),
        popup_help_fb: chrome.i18n.getMessage('about_code_verify_faq_url_fb'),
      });
    });
    menuRowList[0].style.cursor = 'pointer';

    const downloadTextList = document.getElementsByClassName(
      'status_message_highlight'
    );
    const downloadSrcButton = document.getElementById('i18nDownloadSourceButton');

    if (DOWNLOAD_JS_ENABLED) {
      menuRowList[1].addEventListener('click', () => updateDisplay('download'));
      menuRowList[1].style.cursor = 'pointer';

      downloadTextList[0].addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { greeting: 'downloadSource' },
            () => {}
          );
        });
      });
      downloadTextList[0].style.cursor = 'pointer';

      downloadSrcButton.onclick = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { greeting: 'downloadSource' },
            () => {}
          );
        });
      };

      downloadSrcButton.style.cursor = 'pointer';

      downloadTextList[0].addEventListener('click', () =>
        updateDisplay('download')
      );
      downloadTextList[0].style.cursor = 'pointer';
    } else {
      menuRowList[1].remove();
      downloadTextList[0].remove();
      const downloadMessagePartTwo = document.getElementById(
        'i18nValidationFailureStatusMessagePartTwo'
      );
      if (downloadMessagePartTwo != null) {
        downloadMessagePartTwo.remove();
      }
      downloadSrcButton.remove();
    }

    const learnMoreList = document.getElementsByClassName(
      'anomaly_learn_more_button'
    );
    learnMoreList[0].addEventListener('click', () => {
      chrome.runtime.sendMessage({
        popup_help_wa: chrome.i18n.getMessage('validation_failure_faq_url_wa'),
        popup_help_msgr: chrome.i18n.getMessage(
          'validation_failure_faq_url_msgr'
        ),
        popup_help_fb: chrome.i18n.getMessage('validation_failure_faq_url_fb'),
      });
    });
    learnMoreList[0].style.cursor = 'pointer';

    const riskLearnMoreList = document.getElementsByClassName(
      'risk_learn_more_button'
    );
    riskLearnMoreList[0].addEventListener('click', () => {
      chrome.runtime.sendMessage({
        popup_help_wa: chrome.i18n.getMessage(
          'possible_risk_detected_faq_url_wa'
        ),
        popup_help_msgr: chrome.i18n.getMessage(
          'possible_risk_detected_faq_url_msgr'
        ),
        popup_help_fb: chrome.i18n.getMessage(
          'possible_risk_detected_faq_url_fb'
        ),
      });
    });
    riskLearnMoreList[0].style.cursor = 'pointer';

    const retryButtonList = document.getElementsByClassName('retry_button');
    Array.from(retryButtonList).forEach(retryButton => {
      retryButton.addEventListener('click', () => {
        chrome.tabs.reload();
      });
      retryButton.style.cursor = 'pointer';
    });

    const timeoutLearnMoreList = document.getElementsByClassName(
      'timeout_learn_more_button'
    );
    timeoutLearnMoreList[0].addEventListener('click', () => {
      chrome.runtime.sendMessage({
        popup_help_wa: chrome.i18n.getMessage('network_timeout_faq_url_wa'),
        popup_help_msgr: chrome.i18n.getMessage('network_timeout_faq_url_msgr'),
        popup_help_fb: chrome.i18n.getMessage('network_timeout_faq_url_fb'),
      });
    });
    timeoutLearnMoreList[0].style.cursor = 'pointer';
  }

  function updateDisplay(state) {
    Array.from(document.getElementsByClassName('state_boundary')).forEach(
      element => {
        if (element.id == state) {
          element.style.display = 'flex';
          document.body.className = state + '_body';
        } else {
          element.style.display = 'none';
        }
      }
    );
  }

  function loadUp() {
    const params = new URL(document.location).searchParams;
    const state = params.get('state');
    updateDisplay(state);
    attachTextToHtml();
    attachListeners();
  }

  loadUp();

}());
