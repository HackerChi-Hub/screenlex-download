# ScreenLex 光影词库

ScreenLex 是黑粉科技 HyphenTech 出品的本地影视英语学习工具。

它不提供电影、不内置播放器、不分发字幕资源。你可以继续用 Infuse、浏览器或其它播放器看视频，ScreenLex 负责把你本机已有字幕整理成英语学习材料。

## 当前 macOS 版本

请到本仓库根目录或 [Releases](https://github.com/HackerChi-Hub/screenlex-download/releases) 下载最新版 macOS 安装包。

当前发布：

- macOS Apple Silicon：[ScreenLex_0.1.4_aarch64.dmg](./ScreenLex_0.1.4_aarch64.dmg)

## 主要功能

- 扫描本地电影/剧集目录；
- 识别英文 SRT 和 Infuse 双语 ASS；
- 本地提取高级词汇、短语、中文释义和考试分级；
- 支持高考、四级、六级、考研、专四、专八、雅思、托福、GRE 等分类；
- 支持 AI 精讲，补充例句、翻译、词根和记忆方法；
- 支持本地 Whisper 生成英文字幕；
- 支持 AI 校对英文字幕；
- 支持 AI 生成双语 ASS 字幕；
- 字幕 AI 处理支持断点续跑；
- 支持复习标记和生词本；
- 支持匿名用户统计，默认开启，可在设置中关闭；
- 支持软件内检查更新。

## 安装提示

当前版本尚未进行 Apple Developer ID 签名和 notarization。

如果 macOS 提示“无法验证开发者”：

1. 在 Finder 中找到 `ScreenLex.app`；
2. 右键点击，选择“打开”；
3. 或进入“系统设置 → 隐私与安全性”，允许打开该应用。

后续版本会补充正式签名和公证流程。

## 自动更新

ScreenLex 使用 Tauri updater 的签名更新机制。软件会从本仓库 Release 中读取 `latest.json`，并校验更新包签名后安装。

## 法律与免责声明

下载和使用前请阅读：

- [用户协议](./USER_AGREEMENT.md)
- [免责声明](./DISCLAIMER.md)

## 源码说明

ScreenLex 是闭源发布软件。本公开仓库仅用于下载安装包和发布说明，不包含源代码。
