<!-- evergreen:intro:start -->
![ScreenLex · HyphenTech](screenshots/readme-hero.svg)

# ScreenLex · Learn English from your own movies and subtitles

**Turn local films, episodes and subtitles into a searchable vocabulary library with original dialogue and spaced repetition.**

ScreenLex is a desktop English-learning application by HyphenTech. Scan your own media folders, extract advanced words and phrases from English or bilingual subtitles, listen to the original context, and review what you learn. Installers are available for macOS, Windows and Linux; see the actual release packages below.

<p align="center"><a href="README.md">简体中文</a> | <a href="README.zh-TW.md">繁體中文</a> | <a href="README.en.md">English</a></p>

<p align="center"><a href="https://github.com/HackerChi-Hub/screenlex-download/releases/latest"><img alt="Download" src="https://img.shields.io/badge/Download-18181b?style=for-the-badge&amp;logo=github" /></a> <a href="https://hyphentech.top"><img alt="Website" src="https://img.shields.io/badge/Website-334155?style=for-the-badge" /></a></p>
<!-- evergreen:intro:end -->

<!-- recent-features:start -->
## Recent features and improvements (5 items)

- **1.0.5** · Linux x64 installers are available for the first time, including automatic AppImage updates.
- **1.0.5** · Added an optional sponsorship entry without changing the main learning workflow.
- **1.0.4** · Double-click an episode to play it; the context menu offers subtitle checks, subtitle reruns and resetting defaults.
- **1.0.4** · Drag a movie folder into the app to set the media directory and start scanning automatically.
- **1.0.2** · Reveal review answers with Space, score them with number keys, close dialogs with Esc and see keyboard focus indicators.
<!-- recent-features:end -->

<!-- evergreen:demos:start -->
## ▶ Watch a practical demo

**Build vocabulary from local films and subtitles, replay dialogue and review**

| Bilibili | YouTube |
| :---: | :---: |
| [![Watch on Bilibili](https://img.shields.io/badge/Bilibili-00a1d6?style=for-the-badge&logo=bilibili&logoColor=white)](https://www.bilibili.com/video/BV1HgjU6UEe8/) | [![Watch on YouTube](https://img.shields.io/badge/YouTube-ff0033?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=5ivpXKXqECg) |

These videos show the versions available when recorded. Use the current release information on this page for downloads and capabilities. Narration is in Chinese.
<!-- evergreen:demos:end -->

**Latest release: v1.0.5 · macOS Apple Silicon、Windows x64、Linux x64**

## Download

Choose an installer from the [latest official release](https://github.com/HackerChi-Hub/screenlex-download/releases/latest), or use a direct link below.

| System | Recommended installer | Other formats | Devices |
| --- | --- | --- | --- |
| **macOS** | [Download DMG](https://github.com/HackerChi-Hub/screenlex-download/releases/download/v1.0.5/ScreenLex_1.0.5_aarch64.dmg) | — | Apple Silicon：M1 / M2 / M3 / M4 / M5 |
| **Windows** | [Download EXE installer](https://github.com/HackerChi-Hub/screenlex-download/releases/download/v1.0.5/ScreenLex_1.0.5_x64-setup.exe) | [MSI](https://github.com/HackerChi-Hub/screenlex-download/releases/download/v1.0.5/ScreenLex_1.0.5_x64_en-US.msi) | Windows 10 / 11，x64 |
| **Linux** | [Download AppImage](https://github.com/HackerChi-Hub/screenlex-download/releases/download/v1.0.5/ScreenLex_1.0.5_amd64.AppImage) | [DEB](https://github.com/HackerChi-Hub/screenlex-download/releases/download/v1.0.5/ScreenLex_1.0.5_amd64.deb) · [RPM](https://github.com/HackerChi-Hub/screenlex-download/releases/download/v1.0.5/ScreenLex-1.0.5-1.x86_64.rpm) | Linux x64 |

In-app update checks support macOS, Windows, Linux AppImage. Linux users must install manually the first time.

![ScreenLex workspace; application UI shown in Chinese](screenshots/overview.png)

<!-- evergreen:capabilities:start -->
## Start learning in five steps

1. Install and open ScreenLex.
2. Run the environment check and choose one-click setup.
3. Select a Whisper model and let FFmpeg, the transcription engine and local models finish downloading.
4. Select a folder containing your legally obtained movies or episodes and scan the library.
5. Extract vocabulary, play the original sentence and schedule reviews.

Dependencies and models stay in ScreenLex's private runtime directory. If setup becomes damaged, clear the environment from Settings and configure it again.

## Features

| Workflow | What you can do |
| --- | --- |
| Local media library | Scan nested folders; recognize English SRT and bilingual ASS subtitles; browse by work, series and episode; search across the library |
| Contextual vocabulary | Extract advanced words, phrases and their contexts offline; deduplicate entries and find occurrences across films |
| Learning filters | Filter by Chinese school/university exam categories, IELTS, TOEFL, GRE and academic-writing labels; labels do not guarantee exam coverage |
| Word cards | Chinese definitions, context, roots and affixes, memory cues and cultural expressions; optional AI explanations clarify meanings and confusing words |
| Review | Mark entries as mastered, to review or too easy; use active recall, a vocabulary notebook and adaptive spaced repetition |
| Listening and speaking | Word pronunciation, shadowing, jumps to original timestamps, sentence playback, sentence loops, A–B loops and speed control |
| Player and subtitles | Play local MKV/x265 media with bilingual subtitles and native full screen; generate missing subtitles locally with Whisper; optional AI correction and bilingual subtitle creation |
| Batch work | Generate subtitles, extract vocabulary and request AI explanations in batches |
| Local data | Learning packages, vocabulary, review history and preferences stay in a local SQLite database; backup, restore, clear caches or delete learning records |

ScreenLex does not upload your films, subtitle content, learning entries, file paths or model API keys. Optional online AI explanations require a network connection; you can also configure a working LocalBrain endpoint for local-model explanations.
<!-- evergreen:capabilities:end -->

## Application screenshots

Screenshots show the existing Chinese application interface; translated documentation does not imply that every UI label is translated.

![Advanced vocabulary and word cards](screenshots/vocab-cards.png)

![Series and episode selector](screenshots/sidebar-batch.png)

## Platform differences

| Platform | Local transcription | Package format | Automatic updates |
| --- | --- | --- | --- |
| macOS | MLX Whisper，Apple Silicon acceleration | DMG | Supported |
| Windows | whisper.cpp；CUDA/cuBLAS on NVIDIA; CPU on other hardware | EXE / MSI | Supported |
| Linux | whisper.cpp / local runtime | AppImage / DEB / RPM | AppImage Supported |

## Installation notes

### macOS

The application is not Apple-notarized. If macOS cannot verify the developer, right-click `ScreenLex.app` and select Open, or allow it in System Settings → Privacy & Security. If macOS reports that it is damaged, move it to Applications first, then run:

```bash
sudo xattr -rd com.apple.quarantine /Applications/ScreenLex.app
```

### Windows

If SmartScreen displays “Windows protected your PC”, select More info → Run anyway.

### Linux

Before the first AppImage launch, you may need to grant executable permission:

```bash
chmod +x ScreenLex_1.0.5_amd64.AppImage
```

<!-- evergreen:use-cases:start -->
## When ScreenLex is useful

| Goal | Approach |
| --- | --- |
| Learn English from films and TV | Build a library from your own media and subtitles; hear expressions at their original timestamps |
| Expand exam vocabulary | Filter learning labels and study real contexts; exam labels are organizational aids |
| Practise listening and shadowing | Repeat individual sentences or A–B segments and adjust playback speed |
| Retain words you have encountered | Save them to your notebook, recall them actively and revisit them with spaced repetition |

## Frequently asked questions

**Can I learn offline?** Once your media, subtitles and required environment are available, local extraction and learning work offline. Initial dependency/model downloads and optional online AI explanations need a network connection.

**What if a film has no English subtitles?** Configure local Whisper transcription. Speed depends on hardware, model and film duration. macOS uses MLX Whisper; Windows uses whisper.cpp. See the platform table for Linux.

**Are films or subtitle downloads included?** No. Use media and subtitles that you legally own or have permission to use. ScreenLex is for personal local learning; it does not distribute copyrighted media or replace a full-featured viewing application.

**Can I use LocalBrain?** Configure it in Settings after checking that your chosen local model and endpoint work.
<!-- evergreen:use-cases:end -->

<!-- evergreen:legal:start -->
## Project and legal information

ScreenLex is proprietary software. This public repository contains installers, update metadata and documentation; it does not contain the application source code. The [User Agreement](USER_AGREEMENT.md) and [Disclaimer](DISCLAIMER.md) are currently provided in Chinese.
<!-- evergreen:legal:end -->

<!-- evergreen:discovery:start -->
## More from HyphenTech

| Application | Purpose | Official download |
| --- | --- | --- |
| LocalBrain | Local AI models, file and media tools | [LocalBrain](https://github.com/HackerChi-Hub/localbrain-releases) |
| HyphenScreen | Screen recording, editing, captions and animation | [HyphenScreen](https://github.com/HackerChi-Hub/HyphenScreen-Releases) |
| ScreenLex | Movie English, contextual vocabulary and review | [ScreenLex](https://github.com/HackerChi-Hub/screenlex-download) |
| HyphenBox | AI API discovery, verification and routing | [HyphenBox](https://github.com/HackerChi-Hub/hyphenbox-release) |

Share this repository homepage so others can choose the latest installer for their system. Report issues with your system, version and reproducible steps; remove private information. Follow [HyphenTech on Bilibili](https://space.bilibili.com/1846717524), [YouTube](https://www.youtube.com/@hyphentech_top), or the [website](https://hyphentech.top). On WeChat, search for 黑粉科技.
<!-- evergreen:discovery:end -->
