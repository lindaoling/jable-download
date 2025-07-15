// 向页面注入script，为了得到页面中js变量
var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject.js');
s.onload = function() { this.remove(); };
(document.head || document.documentElement).appendChild(s);

// 通过postMessage传递配置参数到inject.js
chrome.storage.local.get().then(function(settingsObj) {
    settingsObj.workDir = settingsObj.workDir || '';
    window.postMessage({
        type: 'JABLE_SETTINGS',
        settings: settingsObj
    }, '*');
}).catch(function(error) {
    console.error('获取存储设置失败:', error);
    // 依然postMessage一个空配置
    window.postMessage({
        type: 'JABLE_SETTINGS',
        settings: { workDir: '' }
    }, '*');
});