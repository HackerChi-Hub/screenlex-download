# ScreenLex 光影词库

ScreenLex 是黑粉科技 HyphenTech 出品的本地影视英语学习工具：把你本机已有的电影 / 剧集字幕，离线整理成按考试分级的高级英语词库，并配套逐句学习播放器与主动回忆复习。

> 它不提供电影、不分发字幕资源；内置播放器只服务逐句学习，不替代完整观影体验。支持 **macOS Apple Silicon** 与 **Windows x86_64**。

## 下载

前往 **[Releases](https://github.com/HackerChi-Hub/screenlex-download/releases/latest)** 下载最新版安装包：

- **macOS**（Apple Silicon）：`.dmg`
- **Windows**（x86_64，最低 SSE2，兼容 Intel Core 2 / AMD Zen 全系）：`.exe`（NSIS）或 `.msi`

软件内「检查更新」也会自动获取并安装新版本。

## 平台差异

| 功能 | macOS Apple Silicon | Windows x86_64 |
|---|---|---|
| 字幕扫描、词库生成、AI 精讲、复习 | ✅ | ✅ |
| 学习播放器（FFmpeg 切 3 分钟 H.264 片段） | ✅ | ✅ |
| 字幕校对、双语 ASS 生成、字幕体检 | ✅ | ✅ |
| 本地 Whisper 补字幕 | MLX Whisper（Apple GPU 加速） | OpenAI Whisper（CPU 或 CUDA） |
| **原片直放（mpv 内嵌视频）** | ✅ | ❌（仅用 FFmpeg 片段播放器） |
| FFmpeg / Whisper 一键安装 | 静态 arm64 二进制（私有目录） | 静态 x64 二进制（私有目录，PowerShell 下载） |

Windows 上「原片直放」按钮会被隐藏，所有逐句学习场景都走 FFmpeg 学习片段播放器，体验与 macOS 等同。

## 截图

![工作台总览](screenshots/overview.png)

![分级词库与词卡](screenshots/vocab-cards.png)

![侧边栏与批量处理](screenshots/sidebar-batch.png)

## 主要功能

- 扫描本地电影 / 剧集，识别英文 SRT 与双语 ASS 字幕；
- 离线提取高级词汇、短语与中文释义，按高考 / 四六级 / 考研 / 雅思 / 托福 / GRE 分级；
- 可选 AI 精讲：例句、词源、记忆法、易混辨析、文化背景；
- 主动回忆复习 + 自适应间隔；朗读、跟读、听写；
- 逐句学习播放器：双语字幕、单句 / A-B 循环、倍速、时间点跳转；
- 本地 Whisper 补字幕、AI 校对、生成双语字幕、字幕体检；
- 纯本地运行，不上传、不分发任何片源或字幕。

## 安装提示

### macOS

当前版本尚未进行 Apple Developer ID 签名与公证。若提示「无法验证开发者」：右键点 `ScreenLex.app` →「打开」，或在「系统设置 → 隐私与安全性」中允许打开。

### Windows

- **NSIS `.exe`**：双击运行，按提示安装即可。SmartScreen 可能提示「Windows 已保护你的电脑」→ 点击「更多信息」→「仍要运行」。
- **MSI**：企业部署场景可用，普通用户建议用 `.exe`。
- 应用首次启动需要 WebView2 Runtime；若系统未自带，安装包会自动下载 Bootstrapper。
- 本地 Whisper 在 Windows 上使用 `openai-whisper`（PyTorch CPU/CUDA 后端），与 macOS 的 MLX Whisper 命令行接口兼容；首次运行会下载模型到 `%USERPROFILE%\.cache\whisper`。

## 法律

- [用户协议](./USER_AGREEMENT.md)
- [免责声明](./DISCLAIMER.md)

## 说明

ScreenLex 为闭源发布软件。本公开仓库仅用于发布安装包与说明，不包含源代码。
