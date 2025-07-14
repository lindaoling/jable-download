# jable视频下载插件 - Manifest V3版本

## 升级说明

此插件已从Manifest V2升级到Manifest V3，主要变化包括：

### 1. manifest.json 变化
- `manifest_version`: 2 → 3
- `options_page`: 改为 `options_ui` 对象格式
- `web_accessible_resources`: 改为对象数组格式，需要指定 `matches`
- 新增 `host_permissions`: 明确声明对jable.tv的访问权限

### 2. JavaScript API 变化
- `chrome.storage.local.get()`: 从回调函数改为Promise API
- `chrome.storage.local.set()`: 从回调函数改为Promise API
- 添加了错误处理机制

### 3. 功能保持不变
- 插件核心功能未改变
- 设置页面功能保持不变
- 视频下载功能保持不变

## 安装方法

1. 打开Chrome浏览器
2. 进入扩展程序页面 (chrome://extensions/)
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择此文件夹

## 使用方法

1. 访问 jable.tv 的视频页面
2. 插件会自动注入下载功能
3. 右键点击插件图标可以进入设置页面配置下载目录

## 注意事项

- 此版本需要Chrome 88或更高版本
- 如果从V2版本升级，建议先卸载旧版本再安装新版本 