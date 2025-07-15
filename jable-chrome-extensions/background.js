chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'GET_CONFIG') {
      chrome.storage.sync.get(['config'], (result) => {
        sendResponse(result.config || {});
      });
      return true; // 异步响应
    }
    if (msg.type === 'SET_CONFIG') {
      chrome.storage.sync.set({config: msg.config}, () => {
        // 广播给所有 content-script
        chrome.tabs.query({url: "https://jable.tv/videos/*/"}, (tabs) => {
          for (let tab of tabs) {
            chrome.tabs.sendMessage(tab.id, {type: 'CONFIG_UPDATED', config: msg.config});
          }
        });
        sendResponse({success: true});
      });
      return true;
    }
  });