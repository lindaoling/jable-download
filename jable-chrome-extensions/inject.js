// 通过postMessage获取扩展配置参数
(function() {
    let config = null;
    // 监听来自content的配置消息
    // console.log('监听来自content的配置消息');
    window.addEventListener('message', event=> {
        if (event.source !== window) return;
        if (event.data && event.data.type === 'JABLE_SETTINGS') {
            // console.log('监听来自content的配置消息 JABLE_SETTINGS',event.data.settings);
            config = event.data.settings || {};
            renderDownloadButton();
        }
    });

    // 编码字符串为 Base64
    function encodeBase64(str) {
        const bytes = new TextEncoder().encode(str); // UTF-8 编码
        const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
        return btoa(binary);
    }

    function renderDownloadButton() {
        // console.log('config',config);
        // hlsUrl 是 m3u8地址（假设外部有定义或后续补充）
        let hlsUrl = typeof window.hlsUrl !== 'undefined' ? window.hlsUrl : '';
        let title = '';
        let ProtocolName = 'm3u8dl';
        let _downloadLinkTag = `<a id='jable-m3u8dl-download-btn' href='javascript:alert("未配置下载目录")' style='margin-left:10px;cursor:pointer;'> [ 未配置下载目录 ] </a>`;

        try {
            title = document.head.querySelector('[property="og:title"]').content;
        } catch (e) {
            title = document.title || '未命名';
        }

        
        if(hlsUrl && config && config.workDir){
            
            let M3U8dlProtocolParam = `${hlsUrl} --saveName "${title}" --workDir "${config && config.workDir ? config.workDir : '%USERPROFILE%\Downloads"'}" --enableDelAfterDone --disableDateInfo`;
            let b64Param = encodeBase64(M3U8dlProtocolParam);
            _downloadLinkTag = `<a id='jable-m3u8dl-download-btn' href='${ProtocolName}://${b64Param}' style='margin-left:10px;cursor:pointer;'> [ 下载 ] </a>`;
        }
        
        let titleconteinar = document.getElementsByClassName('header-left')[0];
        if (titleconteinar && titleconteinar.getElementsByTagName('h4')[0]) {
            titleconteinar.getElementsByTagName('h4')[0].innerHTML = title + _downloadLinkTag;
            // 绑定点击事件
            // let btn = document.getElementById('jable-m3u8dl-download-btn');
            // if (btn) {
            //     btn.addEventListener('click', function(e) {
            //         if (!config || !config.workDir) {
            //             e.preventDefault();
            //             alert('未配置下载目录，请先在插件设置中配置！');
            //         }
            //     });
            // }
        }
    }

    // 如果3秒后还没收到配置，也渲染按钮（无配置）
    // setTimeout(function() {
    //     if (!config) {
    //         config = { workDir: '' };
    //         renderDownloadButton();
    //     }
    // }, 5000);
})();