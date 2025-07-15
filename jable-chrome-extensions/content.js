// 向页面注入script
var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject.js');
// indect.js加载完后，向inject.js发送配置信息
s.onload = function() { 
  this.remove(); 
  // console.log('通过postMessage传递配置参数到inject.js')
  // 通过postMessage传递配置参数到inject.js
  chrome.storage.local.get().then((settingsObj)=> {
    // console.log('chrome.storage.local.get() settingsObj:',settingsObj)
      settingsObj.workDir = settingsObj.workDir || '';
      window.postMessage({
          type: 'JABLE_SETTINGS',
          settings: settingsObj
      }, '*');
  }).catch(error =>{
      console.error('获取存储设置失败:', error);
      // 依然postMessage一个空配置
      window.postMessage({
          type: 'JABLE_SETTINGS',
          settings: { workDir: '',msg:'这是默认配置处理' }
      }, '*');
  });
};
(document.head || document.documentElement).appendChild(s);



