#!/usr/bin/env node

/**
 * @file scripts/update-version.js
 * @description 自動同步所有檔案中的版本號
 */

const fs = require('fs');
const path = require('path');

// 讀取 package.json 獲取主版本號
const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const version = packageJson.version;

console.log(`正在更新版本號至 ${version}...`);

// 需要更新版本號的檔案清單
const filesToUpdate = [
  {
    path: path.join(__dirname, '..', 'src', 'index.js'),
    pattern: /version: '[^']+'/,
    replacement: `version: '${version}'`
  },
  {
    path: path.join(__dirname, '..', 'package.json'),
    pattern: /"version": "[^"]+"/,
    replacement: `"version": "${version}"`,
    section: 'mcp'
  }
];

// 更新每個檔案
filesToUpdate.forEach(({ path: filePath, pattern, replacement, section }) => {
  if (!fs.existsSync(filePath)) {
    console.warn(`警告: 檔案不存在 ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  
  if (section === 'mcp') {
    // 特殊處理 package.json 中的 mcp.version
    const packageData = JSON.parse(content);
    if (packageData.mcp && packageData.mcp.version !== version) {
      packageData.mcp.version = version;
      fs.writeFileSync(filePath, JSON.stringify(packageData, null, 2) + '\n');
      console.log(`✅ 已更新 ${filePath} 中的 mcp.version`);
    }
  } else {
    // 一般的字串替換
    if (pattern.test(content)) {
      const newContent = content.replace(pattern, replacement);
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ 已更新 ${filePath}`);
    } else {
      console.log(`ℹ️  ${filePath} 中未找到需要更新的版本號`);
    }
  }
});

console.log(`🎉 版本號更新完成: ${version}`);
