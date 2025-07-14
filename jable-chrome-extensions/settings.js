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
        alert('配置成功')
    }).catch(function(error) {
        console.error('保存设置失败:', error);
        alert('配置失败，请重试');
    });
});