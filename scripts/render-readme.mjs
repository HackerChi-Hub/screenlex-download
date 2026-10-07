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
  DOWNLOAD_TABLE: downloadTable,
  UPDATER_SENTENCE: updaterSentence,
  RELEASE_NOTES: recentBlock(path.join(path.dirname(templateFile), "recent-features.json"), version),
  PLATFORM_TABLE: platformTable,
  LINUX_INSTALL_HINT: linuxInstallHint,
};

let output = template;
for (const [key, value] of Object.entries(replacements)) {
  output = output.replaceAll(`{{${key}}}`, value);
}
const unresolved = output.match(/\{\{[A-Z_]+\}\}/g);
if (unresolved) {
  throw new Error(`模板仍有未替换变量：${[...new Set(unresolved)].join(", ")}`);
}

validateReadme(output, readJson(path.join(path.dirname(templateFile), "readme-protection.json")).files["README.md"]);
fs.writeFileSync(outputFile, `${output.trimEnd()}\n`);
console.log(`已生成 ${outputFile}：${tag}，${platforms.join("、")}`);
