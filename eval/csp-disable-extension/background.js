

const iframeHosts = [
  'web.whatsapp.com',
];
chrome.runtime.onInstalled.addListener(() => {
  const RULE = {
    id: 1,
    condition: {
      requestDomains: iframeHosts,
      resourceTypes: ['main_frame'],
    },
    action: {
      type: 'modifyHeaders',
      responseHeaders: [
        {header: 'Content-Security-Policy', operation: 'remove'}
      ],
    },
  };
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE.id],
    addRules: [RULE],
  });
});