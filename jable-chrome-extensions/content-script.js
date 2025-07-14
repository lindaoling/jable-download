// 向页面注入script，为了得到页面中js变量
var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject.js');
s.onload = function() { this.remove(); };
(document.head || document.documentElement).appendChild(s);

console.log('contents-script.js');
// 把配置注入到原网页中
chrome.storage.local.get().then(function(settingsObj) {
    settingsObj.workDir = settingsObj.workDir || '%USERPROFILE%/Downloads/m3u8dl'
    let settingsJsonStr = JSON.stringify(settingsObj);
    // 生成 script 直接注入代码，把settings注入到原网页
    var script_tag = document.createElement('script');
    script_tag.type = 'text/javascript';
    script_tag.text = `var settings=${settingsJsonStr};`;
    document.body.appendChild(script_tag);
}).catch(function(error) {
    console.error('获取存储设置失败:', error);
    // 使用默认设置
    let settingsObj = { workDir: '%USERPROFILE%/Downloads/m3u8dl' };
    let settingsJsonStr = JSON.stringify(settingsObj);
    var script_tag = document.createElement('script');
    script_tag.type = 'text/javascript';
    script_tag.text = `var settings=${settingsJsonStr};`;
    document.body.appendChild(script_tag);
});