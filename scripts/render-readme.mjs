#!/usr/bin/env node
import { recentBlock, validateReadme } from "./readme-contract.mjs";

import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (!key.startsWith("--")) {
      throw new Error(`无法识别的参数：${key}`);
    }
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`参数 ${key} 缺少值`);
    }
    args[key.slice(2)] = value;
    index += 1;
  }
  return args;
}

function required(args, name) {
  if (!args[name]) {
    throw new Error(`缺少必需参数：--${name}`);
  }
  return path.resolve(args[name]);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function assetName(asset) {
  return typeof asset === "string" ? asset : asset?.name;
}

function findAsset(names, matcher) {
  return names.find((name) => matcher.test(name));
}

function downloadUrl(repo, tag, name) {
  const encodedName = name.split("/").map(encodeURIComponent).join("/");
  return `https://github.com/${repo}/releases/download/${encodeURIComponent(tag)}/${encodedName}`;
}

function releaseNotes(latest, release, version) {
  const source = String(latest.notes || release.body || "").replace(/\r\n/g, "\n").trim();
  if (!source) {
    return `- 详情请查看 [GitHub Release](${release.url})。`;
  }

  const lines = source.split("\n");
  if (new RegExp(`^ScreenLex\\s+v?${version.replaceAll(".", "\\.")}\\s*$`, "i").test(lines[0]?.trim())) {
    lines.shift();
  }
  const downloadHeading = lines.findIndex((line) => /^\*\*下载\*\*\s*$/.test(line.trim()));
  const notes = (downloadHeading >= 0 ? lines.slice(0, downloadHeading) : lines)
    .join("\n")
    .trim();

  return notes || `- 详情请查看 [GitHub Release](${release.url})。`;
}

const args = parseArgs(process.argv.slice(2));
const releaseFile = required(args, "release-json");
const latestFile = required(args, "latest-json");
const templateFile = required(args, "template");
const outputFile = required(args, "output");
const repo = args.repo || process.env.GITHUB_REPOSITORY || "HackerChi-Hub/screenlex-download";
const language = args.language || "zh-CN";
const readmeName = language === "zh-CN" ? "README.md" : `README.${language}.md`;
if (!["zh-CN", "zh-TW", "en"].includes(language)) throw new Error("不支持的主页语言");
const vocabulary = {
  "zh-TW": {"下载":"下載", "安装程序":"安裝程式", "系统":"系統", "推荐安装包":"建議安裝套件", "其他格式":"其他格式", "适用设备":"適用裝置", "能力":"能力", "本地语音识别":"本機語音辨識", "安装格式":"安裝格式", "自动更新":"自動更新", "支持":"支援", "暂不支持":"暫不支援", "加速":"加速", "其余硬件使用 CPU":"其他硬體使用 CPU", "自动使用":"自動使用", "本地运行环境":"本機執行環境", "软件内的「检查更新」":"軟體內的「檢查更新」", "Linux 用户首次仍需手动安装一次。":"Linux 使用者首次仍需手動安裝一次。", "当前版本未声明软件内自动更新平台，请从 GitHub Release 手动下载安装。":"目前版本未宣告軟體內自動更新平台，請從 GitHub Release 手動下載安裝。", "AppImage 首次运行前可能需要添加执行权限：":"AppImage 首次執行前可能需要新增執行權限："},
  en: {"下载 EXE 安装程序":"Download EXE installer", "下载":"Download", "系统":"System", "推荐安装包":"Recommended installer", "其他格式":"Other formats", "适用设备":"Devices", "能力":"Platform", "本地语音识别":"Local transcription", "安装格式":"Package format", "自动更新":"Automatic updates", "暂不支持":"Unavailable", "支持":"Supported", "Apple Silicon 加速":"Apple Silicon acceleration", "NVIDIA 自动使用 CUDA/cuBLAS，其余硬件使用 CPU":"CUDA/cuBLAS on NVIDIA; CPU on other hardware", "whisper.cpp / 本地运行环境":"whisper.cpp / local runtime", "软件内的「检查更新」支持":"In-app update checks support", "Linux 用户首次仍需手动安装一次。":"Linux users must install manually the first time.", "当前版本未声明软件内自动更新平台，请从 GitHub Release 手动下载安装。":"No in-app updater platforms are declared for this release. Download an installer manually from GitHub Release.", "AppImage 首次运行前可能需要添加执行权限：":"Before the first AppImage launch, you may need to grant executable permission:"},
};
function localize(text) {
  for (const [from, to] of Object.entries(vocabulary[language] || {}).sort((a,b) => b[0].length-a[0].length)) text = text.replaceAll(from,to);
  return language === "en" ? text.replaceAll("、", ", ").replaceAll("。", ". ") : text;
}

const release = readJson(releaseFile);
const latest = readJson(latestFile);
const template = fs.readFileSync(templateFile, "utf8");
const tag = String(release.tagName || "").trim();
const version = tag.replace(/^v/i, "");

if (!tag || !version) {
  throw new Error("Release JSON 缺少 tagName");
}
if (String(latest.version || "").replace(/^v/i, "") !== version) {
  throw new Error(`版本不一致：Release=${tag}，latest.json=${latest.version || "缺失"}`);
}

const names = (release.assets || []).map(assetName).filter(Boolean);
const assets = {
  dmg: findAsset(names, /_aarch64\.dmg$/i),
  exe: findAsset(names, /_x64-setup\.exe$/i),
  msi: findAsset(names, /_x64(?:_[A-Za-z-]+)?\.msi$/i),
  appImage: findAsset(names, /_amd64\.AppImage$/i),
  deb: findAsset(names, /_amd64\.deb$/i),
  rpm: findAsset(names, /\.x86_64\.rpm$/i),
};

if (!assets.dmg && !assets.exe && !assets.msi && !assets.appImage && !assets.deb && !assets.rpm) {
  throw new Error(`Release ${tag} 中没有识别到可安装资产`);
}

const platforms = [];
const downloadRows = [];
const platformRows = [];

if (assets.dmg) {
  platforms.push("macOS Apple Silicon");
  downloadRows.push(`| **macOS** | [下载 DMG](${downloadUrl(repo, tag, assets.dmg)}) | — | Apple Silicon：M1 / M2 / M3 / M4 / M5 |`);
  platformRows.push("| macOS | MLX Whisper，Apple Silicon 加速 | DMG | 支持 |");
}

if (assets.exe || assets.msi) {
  platforms.push("Windows x64");
  const recommended = assets.exe
    ? `[下载 EXE 安装程序](${downloadUrl(repo, tag, assets.exe)})`
    : `[下载 MSI](${downloadUrl(repo, tag, assets.msi)})`;
  const other = assets.exe && assets.msi
    ? `[MSI](${downloadUrl(repo, tag, assets.msi)})`
    : "—";
  downloadRows.push(`| **Windows** | ${recommended} | ${other} | Windows 10 / 11，x64 |`);
  platformRows.push(`| Windows | whisper.cpp；NVIDIA 自动使用 CUDA/cuBLAS，其余硬件使用 CPU | ${assets.exe && assets.msi ? "EXE / MSI" : assets.exe ? "EXE" : "MSI"} | 支持 |`);
}

if (assets.appImage || assets.deb || assets.rpm) {
  platforms.push("Linux x64");
  const recommendedAsset = assets.appImage || assets.deb || assets.rpm;
  const recommendedLabel = assets.appImage ? "下载 AppImage" : assets.deb ? "下载 DEB" : "下载 RPM";
  const alternatives = [
    assets.deb && assets.deb !== recommendedAsset ? `[DEB](${downloadUrl(repo, tag, assets.deb)})` : null,
    assets.rpm && assets.rpm !== recommendedAsset ? `[RPM](${downloadUrl(repo, tag, assets.rpm)})` : null,
  ].filter(Boolean);
  downloadRows.push(`| **Linux** | [${recommendedLabel}](${downloadUrl(repo, tag, recommendedAsset)}) | ${alternatives.join(" · ") || "—"} | Linux x64 |`);
  const formats = [assets.appImage && "AppImage", assets.deb && "DEB", assets.rpm && "RPM"].filter(Boolean).join(" / ");
  platformRows.push(`| Linux | whisper.cpp / 本地运行环境 | ${formats} | ${assets.appImage ? "AppImage 支持" : "暂不支持"} |`);
}

const updaterNames = {
  "darwin-aarch64": "macOS",
  "windows-x86_64": "Windows",
  "linux-x86_64": "Linux AppImage",
};
const updaterPlatforms = Object.keys(latest.platforms || {})
  .map((key) => updaterNames[key] || key);
const updaterSentence = updaterPlatforms.length
  ? `软件内的「检查更新」支持 ${updaterPlatforms.join("、")}。${assets.appImage ? "Linux 用户首次仍需手动安装一次。" : ""}`
  : "当前版本未声明软件内自动更新平台，请从 GitHub Release 手动下载安装。";

const downloadTable = [
  "| 系统 | 推荐安装包 | 其他格式 | 适用设备 |",
  "| --- | --- | --- | --- |",
  ...downloadRows,
].join("\n");

const platformTable = [
  "| 能力 | 本地语音识别 | 安装格式 | 自动更新 |",
  "| --- | --- | --- | --- |",
  ...platformRows,
].join("\n");

const linuxInstallHint = assets.appImage
  ? `### Linux\n\nAppImage 首次运行前可能需要添加执行权限：\n\n\`\`\`bash\nchmod +x ${assets.appImage}\n\`\`\``
  : "";

const replacements = {
  VERSION: version,
  SUPPORTED_PLATFORMS: platforms.join("、"),
  DOWNLOAD_TABLE: localize(downloadTable),
  UPDATER_SENTENCE: localize(updaterSentence),
  RELEASE_NOTES: recentBlock(path.join(path.dirname(templateFile), "recent-features.json"), version, language),
  PLATFORM_TABLE: localize(platformTable),
  LINUX_INSTALL_HINT: localize(linuxInstallHint),
};

let output = template;
for (const [key, value] of Object.entries(replacements)) {
  output = output.replaceAll(`{{${key}}}`, value);
}
const unresolved = output.match(/\{\{[A-Z_]+\}\}/g);
if (unresolved) {
  throw new Error(`模板仍有未替换变量：${[...new Set(unresolved)].join(", ")}`);
}

validateReadme(output, readJson(path.join(path.dirname(templateFile), "readme-protection.json")).files[readmeName]);
fs.writeFileSync(outputFile, `${output.trimEnd()}\n`);
console.log(`已生成 ${outputFile}：${tag}，${platforms.join("、")}`);
