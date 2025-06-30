#!/usr/bin/env node

/**
 * @file judicial-mcp.js
 * @description 司法院 MCP 伺服器的命令列介面 (CLI) 入口點
 * 此檔案作為全域安裝時的可執行檔案，直接啟動伺服器
 * @author Terry Chen
 * @version 1.0.0
 * @license MIT
 * @since 1.0.0
 */

/**
 * 引入並執行伺服器啟動腳本
 * 直接載入 start.js 來啟動 Express 伺服器
 * 
 * 使用方式：
 * - 全域安裝後：judicial-mcp
 * - 或直接執行：node bin/judicial-mcp.js
 */
require('../start');
