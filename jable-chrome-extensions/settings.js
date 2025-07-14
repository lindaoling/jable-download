console.log('from settings.js');

function serialize(form) {
    let request = {};
    form.querySelectorAll('[name]').forEach((elem) => {
        request[elem.name] = elem.value;
    });
    return request;
}

chrome.storage.local.get().then(function(settingsObj) {
    document.getElementById('workDir').value = settingsObj.workDir || '';
}).catch(function(error) {
    console.error('获取存储设置失败:', error);
    document.getElementById('workDir').value = '';
});

document.getElementById('savebotton').addEventListener('click', function() {
    let settingsfromDom = document.getElementById('settings-from');
    let settingsObj = serialize(settingsfromDom);
    chrome.storage.local.set(settingsObj).then(function() {
        console.log('settings change');
        alert('配置成功')
            // window.close()
    }).catch(function(error) {
        console.error('保存设置失败:', error);
        alert('配置失败，请重试');
    });
    // console.log(settingsObj)
    // console.log('saveSettings')
})

// let settingsfromDom=document.getElementById('settings-from');
// document.getElementById('settings-from').addEventListener('change', function() {
//     let tt = serialize(this);
//     chrome.storage.local.set(tt, function() {
//         console.log(tt)
//         console.log('settint change');
//     });
// });

//获取
// chrome.storage.local.get('tk', function(value) {
//     console.log(value);
//     window.postMessage(value)
// });
// chrome.storage.local.remove('tk', function() {
//     console.log('remove ');
// });

// chrome.storage.onChanged.addListener(function(changes, namespace) {
//     for (var key in changes) {
//       var storageChange = changes[key];
//       console.log('Storage key "%s" in namespace "%s" changed. ' +
//                   'Old value was "%s", new value is "%s".',
//                   key,
//                   namespace,
//                   storageChange.oldValue,
//                   storageChange.newValue);
//     }
//   });