<!-- evergreen:intro:start -->
# 光影词库 ScreenLex · 看电影学英语、本地字幕查词与间隔复习

**把本机电影、剧集和字幕，变成能播放原句、检索词汇、安排复习的英语学习系统。**

光影词库是黑粉科技开发的本地影视英语学习工具，面向美剧英语、电影英语和考试词汇学习。扫描自己的影视目录，识别英文或双语字幕，离线提取单词、短语和真实语境；用逐句播放、单句循环、主动回忆与间隔复习，把看过的表达留下来。支持 macOS、Windows 与 Linux，安装包以下载表为准。

[**立即下载光影词库**](https://github.com/HackerChi-Hub/screenlex-download/releases/latest) · [B 站实际演示](https://www.bilibili.com/video/BV1HgjU6UEe8/) · [黑粉科技官网](https://hyphentech.top) · [反馈问题](https://github.com/HackerChi-Hub/screenlex-download/issues)
<!-- evergreen:intro:end -->

<!-- recent-features:start -->
## 近期新增与改进（最近 5 项）

- **1.0.5** · 首次提供 Linux x64 安装包，并支持 AppImage 自动更新。
- **1.0.5** · 新增自愿赞助入口，功能使用不受影响。
- **1.0.4** · 双击集数直接播放，右键可执行字幕体检、重跑字幕和恢复默认。
- **1.0.4** · 拖入电影文件夹即可设为影片目录并自动扫描。
- **1.0.2** · 复习支持空格揭晓与数字键评分，弹窗支持 Esc，补齐键盘焦点提示。
<!-- recent-features:end -->

**当前最新版：v1.0.5 · 支持 macOS Apple Silicon、Windows x64、Linux x64**

[官方网站](https://hyphentech.top) · [下载最新版](https://github.com/HackerChi-Hub/screenlex-download/releases/latest) · [B 站演示](https://www.bilibili.com/video/BV1HgjU6UEe8/) · [关注黑粉科技](https://space.bilibili.com/1846717524)

![ScreenLex v1.0.5 工作台](screenshots/overview.png)

## 下载

推荐前往 **[Latest Release](https://github.com/HackerChi-Hub/screenlex-download/releases/latest)** 下载。下面是当前 `v1.0.5` 的直接入口：

| 系统 | 推荐安装包 | 其他格式 | 适用设备 |
| --- | --- | --- | --- |
| **macOS** | [下载 DMG](https://github.com/HackerChi-Hub/screenlex-download/releases/download/v1.0.5/ScreenLex_1.0.5_aarch64.dmg) | — | Apple Silicon：M1 / M2 / M3 / M4 / M5 |
| **Windows** | [下载 EXE 安装程序](https://github.com/HackerChi-Hub/screenlex-download/releases/download/v1.0.5/ScreenLex_1.0.5_x64-setup.exe) | [MSI](https://github.com/HackerChi-Hub/screenlex-download/releases/download/v1.0.5/ScreenLex_1.0.5_x64_en-US.msi) | Windows 10 / 11，x64 |
| **Linux** | [下载 AppImage](https://github.com/HackerChi-Hub/screenlex-download/releases/download/v1.0.5/ScreenLex_1.0.5_amd64.AppImage) | [DEB](https://github.com/HackerChi-Hub/screenlex-download/releases/download/v1.0.5/ScreenLex_1.0.5_amd64.deb) · [RPM](https://github.com/HackerChi-Hub/screenlex-download/releases/download/v1.0.5/ScreenLex-1.0.5-1.x86_64.rpm) | Linux x64 |

软件内的「检查更新」支持 macOS、Windows、Linux AppImage。Linux 用户首次仍需手动安装一次。

<!-- evergreen:capabilities:start -->
## 从安装到开始使用

1. 安装并打开 ScreenLex。
2. 完成环境检测，点击「一键配置」。
3. 选择 Whisper 模型，等待 FFmpeg、语音识别引擎和离线模型就绪。
4. 选择本地电影或剧集目录，扫描影片库。
5. 选择一集，开始提取词汇、播放原句和安排复习。

依赖与模型存放在 ScreenLex 的私有运行目录中；如果环境残留或损坏，可在设置中执行「全面清除」后重新配置。

## 你可以用它做什么

### 本地影视词库

- 扫描电影、剧集与多级目录，识别英文 SRT 和双语 ASS 字幕；
- 按作品、系列和集数浏览，支持搜索与大号视频选择界面；
- 离线提取高级词汇、短语和上下文，不抓简单词；
- 按高考、四六级、考研、专四专八、雅思、托福、GRE、学术写作等标签筛选；
- 全库去重，快速查询同一个词在不同影片中的真实出现位置。

### 词卡与复习

- 中文释义、上下文例句、词根词缀、场景记忆和文化负载表达；
- 可选 AI 精讲：义项确认、记忆法、易混辨析与拓展解释；
- 「已掌握 / 待复习 / 太简单」三种学习动作；
- 主动回忆、生词本和自适应间隔复习；
- 单词朗读、跟读和原片时间点跳转。

### 播放与字幕工具

- 片段播放器：逐句字幕、单句循环、A-B 循环、倍速和时间跳转；
- 原片直放：直接播放 MKV、x265 等本地影片，支持双语字幕与原生全屏；
- Whisper 本地补字幕、AI 校对、双语字幕生成与字幕体检；
- 批量生成字幕、提取词汇和执行 AI 精讲。

### 本地数据

- 学习包、词库、复习记录和界面偏好保存在本地 SQLite 数据库；
- 支持学习数据备份、恢复、缓存清理和全部记录清除；
- 不上传片源、字幕内容、学习词条、文件路径或模型 API Key。
<!-- evergreen:capabilities:end -->

## 最新版界面

### 高级词汇工作台

![ScreenLex v1.0.5 高级词汇与词卡](screenshots/vocab-cards.png)

### 系列与视频选择器

![ScreenLex v1.0.5 系列与视频选择器](screenshots/sidebar-batch.png)

## 平台差异

| 能力 | 本地语音识别 | 安装格式 | 自动更新 |
| --- | --- | --- | --- |
| macOS | MLX Whisper，Apple Silicon 加速 | DMG | 支持 |
| Windows | whisper.cpp；NVIDIA 自动使用 CUDA/cuBLAS，其余硬件使用 CPU | EXE / MSI | 支持 |
| Linux | whisper.cpp / 本地运行环境 | AppImage / DEB / RPM | AppImage 支持 |

## 安装提示

### macOS

当前版本尚未进行 Apple 公证，macOS 可能拦截首次启动。这不是安装包损坏。

- 如果提示「无法验证开发者」：右键点击 `ScreenLex.app` →「打开」，或前往「系统设置 → 隐私与安全性」允许打开。
- 如果提示「已损坏，无法打开」：先把应用拖入「应用程序」，然后在终端执行：

  ```bash
  sudo xattr -rd com.apple.quarantine /Applications/ScreenLex.app
  ```

### Windows

如果 SmartScreen 显示「Windows 已保护你的电脑」，点击「更多信息」→「仍要运行」。

### Linux

AppImage 首次运行前可能需要添加执行权限：

```bash
chmod +x ScreenLex_1.0.5_amd64.AppImage
```

## 隐私与版权边界

ScreenLex 不提供电影，不分发字幕资源，也不会上传你的片源或字幕。播放器与字幕工具只服务于个人本地学习，不替代完整观影软件，也不用于导出或传播版权内容。

## 关注黑粉科技

- 官网：[hyphentech.top](https://hyphentech.top)
- GitHub：[HackerChi-Hub](https://github.com/HackerChi-Hub)
- 哔哩哔哩：[黑粉科技](https://space.bilibili.com/1846717524)
- YouTube：[@hyphentech_top](https://www.youtube.com/@hyphentech_top)
- 公众号 / 视频号：微信搜索「黑粉科技」

## 法律与仓库说明

- [用户协议](./USER_AGREEMENT.md)
- [免责声明](./DISCLAIMER.md)

ScreenLex 为闭源发布软件。本公开仓库只用于发布安装包、更新清单和使用说明，不包含应用源代码。

<!-- evergreen:use-cases:start -->
## 适合怎样的学习方式

| 需求 | 使用方法 |
| --- | --- |
| 看美剧、电影学英语 | 用自己的影片与字幕建立词库，在原片时间点听到真实表达 |
| 雅思、托福、四六级等词汇积累 | 按考试和学习标签筛选，再结合影视语境理解；标签不代表考试命中保证 |
| 听力与口语跟读 | 逐句播放、单句循环、A-B 循环和倍速练习 |
| 记住已经见过的生词 | 加入生词本，主动回忆并按间隔复习安排再见面 |

## 常见问题

**需要联网才能学英语吗？** 已有影片、字幕和所需本地环境后，可使用本地规则提词与学习；首次依赖、模型下载及可选在线 AI 精讲需要网络。

**没有英文字幕怎么办？** 可配置 Whisper 本地语音识别补字幕。速度取决于模型、影片时长和硬件；macOS 使用 MLX Whisper，Windows 使用 whisper.cpp。

**软件提供电影或字幕下载吗？** 不提供。需要准备自己合法拥有或获授权使用的本地影视和字幕。

**能与方寸智匣配合吗？** 可以按设置接入 LocalBrain，使用自己的本地模型完成可选 AI 解释；先确认模型与接口可用。
<!-- evergreen:use-cases:end -->

<!-- evergreen:discovery:start -->
## 黑粉科技自制软件

按需求选用，也可以组合使用：本地模型交给方寸智匣，云端接口交给黑粉盒子，录制教程用黑粉录屏，影视英语学习用光影词库。

| 软件 | 适合解决的问题 | 官方下载 |
| --- | --- | --- |
| 方寸智匣 LocalBrain | 本地大模型、文件与媒体工作台 | [下载方寸智匣](https://github.com/HackerChi-Hub/localbrain-releases) |
| 黑粉录屏 HyphenScreen | 屏幕录制、教程剪辑、字幕与动画 | [下载黑粉录屏](https://github.com/HackerChi-Hub/HyphenScreen-Releases) |
| 光影词库 ScreenLex | 看电影学英语、字幕查词、生词复习 | [下载光影词库](https://github.com/HackerChi-Hub/screenlex-download) |
| 黑粉盒子 HyphenBox | 免费 AI API 发现、模型核验与统一接口 | [下载黑粉盒子](https://github.com/HackerChi-Hub/hyphenbox-release) |

## 分享与反馈

分享给朋友时，请复制本仓库首页或[官方网站](https://hyphentech.top)，让对方按自己的系统下载当前安装包。欢迎收藏仓库、点亮 Star，或在本仓库 Issues 提交使用体验、需求和脱敏问题。

关注[哔哩哔哩「黑粉科技」](https://space.bilibili.com/1846717524)、[YouTube 黑粉科技频道](https://www.youtube.com/@hyphentech_top)；公众号和视频号搜索「黑粉科技」，查看实际演示与使用教程。
<!-- evergreen:discovery:end -->
