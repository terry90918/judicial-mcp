/**
 * @file server.js
 * @description 司法院 MCP 伺服器主要檔案，提供存取台灣司法院開放資料和裁判書的 API 服務
 * @author Terry Chen
 * @version 1.0.0
 * @license MIT
 */

require('dotenv').config();
const express = require('express');
const axios = require('axios');

/**
 * Express 應用程式實例
 * 建立 Express 伺服器用於處理 MCP API 請求
 * @type {express.Application}
 */
const app = express();

/**
 * 設定 Express 中介軟體
 * 啟用 JSON 解析器以處理 POST 請求的 JSON 資料
 */
app.use(express.json());

/**
 * 統一的錯誤回應處理函數
 * 標準化所有 API 端點的錯誤回應格式
 * 
 * @param {Object} res - Express 回應物件
 * @param {Error} error - 錯誤物件
 * @param {string} message - 自訂錯誤訊息
 * @param {number} [statusCode=500] - HTTP 狀態碼
 */
const handleError = (res, error, message, statusCode = 500) => {
  console.error(`API Error: ${message}`, error.response?.data || error.message);
  res.status(statusCode).json({ 
    error: message, 
    detail: error.response?.data || error.message 
  });
};

/**
 * 裁判書授權取得 Token API
 * 透過司法院裁判書查詢 API 進行使用者認證，取得存取授權 Token
 * 支援使用環境變數中的預設帳密，若請求中未提供帳密則自動使用預設值
 * 
 * @route POST /mcp/auth_token
 * @param {Object} req.body - 請求資料
 * @param {string} [req.body.user] - 使用者帳號（可選，未提供時使用 JUDICIAL_USER 環境變數）
 * @param {string} [req.body.password] - 使用者密碼（可選，未提供時使用 JUDICIAL_PASSWORD 環境變數）
 * @returns {Object} 回傳授權 Token 或錯誤訊息
 * 
 * @example
 * // 方式一：使用預設帳密（從 .env 環境變數）
 * POST /mcp/auth_token
 * Content-Type: application/json
 * 
 * {}
 * 
 * // 方式二：使用自訂帳密
 * POST /mcp/auth_token
 * Content-Type: application/json
 * 
 * {
 *   "user": "your_username",
 *   "password": "your_password"
 * }
 */
app.post('/mcp/auth_token', async (req, res) => {
  const user = req.body.user || process.env.JUDICIAL_USER;
  const password = req.body.password || process.env.JUDICIAL_PASSWORD;

  try {
    const result = await axios.post('https://data.judicial.gov.tw/jdg/api/Auth', { user, password });
    res.json(result.data);
  } catch (error) {
    handleError(res, error, '授權失敗');
  }
});

/**
 * 取得裁判書異動清單 API
 * 使用授權 Token 取得裁判書異動清單，包含新增、修改或刪除的裁判書資訊
 * 
 * @route POST /mcp/list_judgments
 * @param {Object} req.body - 請求資料
 * @param {string} req.body.token - 授權 Token
 * @returns {Object} 回傳裁判書異動清單或錯誤訊息
 * 
 * @example
 * POST /mcp/list_judgments
 * Content-Type: application/json
 * {
 *   "token": "your_auth_token"
 * }
 */
app.post('/mcp/list_judgments', async (req, res) => {
  const { token } = req.body;
  try {
    const result = await axios.post('https://data.judicial.gov.tw/jdg/api/JList', { token });
    res.json(result.data);
  } catch (error) {
    handleError(res, error, '取得異動清單失敗');
  }
});

/**
 * 取得裁判書內容 API
 * 使用授權 Token 和裁判書 ID 取得特定裁判書的完整內容
 * 
 * @route POST /mcp/get_judgment
 * @param {Object} req.body - 請求資料
 * @param {string} req.body.token - 授權 Token
 * @param {string} req.body.jid - 裁判書 ID
 * @returns {Object} 回傳裁判書內容或錯誤訊息
 * 
 * @example
 * POST /mcp/get_judgment
 * Content-Type: application/json
 * {
 *   "token": "your_auth_token",
 *   "jid": "judgment_id"
 * }
 */
app.post('/mcp/get_judgment', async (req, res) => {
  const { token, jid } = req.body;
  try {
    const result = await axios.post('https://data.judicial.gov.tw/jdg/api/JDoc', { token, j: jid });
    res.json(result.data);
  } catch (error) {
    handleError(res, error, '取得裁判書失敗');
  }
});

/**
 * 取得主題分類清單 API
 * 從司法院開放資料平台取得所有可用的主題分類清單
 * 
 * @route GET /mcp/list_categories
 * @returns {Object[]} 回傳主題分類清單陣列或錯誤訊息
 * 
 * @example
 * GET /mcp/list_categories
 */
app.get('/mcp/list_categories', async (_, res) => {
  try {
    const result = await axios.get('https://opendata.judicial.gov.tw/data/api/rest/categories');
    res.json(result.data);
  } catch (error) {
    handleError(res, error, '取得分類失敗');
  }
});

/**
 * 取得分類資料源 API
 * 根據指定的分類編號取得該分類下的所有資料源清單
 * 
 * @route GET /mcp/list_resources/:categoryNo
 * @param {string} req.params.categoryNo - 分類編號
 * @returns {Object[]} 回傳資料源清單陣列或錯誤訊息
 * 
 * @example
 * GET /mcp/list_resources/001
 */
app.get('/mcp/list_resources/:categoryNo', async (req, res) => {
  const { categoryNo } = req.params;
  try {
    const url = `https://opendata.judicial.gov.tw/data/api/rest/categories/${categoryNo}/resources`;
    const result = await axios.get(url);
    res.json(result.data);
  } catch (error) {
    handleError(res, error, '取得資料源失敗');
  }
});

/**
 * 下載資料檔案 API
 * 根據檔案集 ID 下載對應的資料檔案，支援分頁參數
 * 
 * @route GET /mcp/download_file/:fileSetId
 * @param {string} req.params.fileSetId - 檔案集 ID
 * @param {string} [req.query.top] - 限制回傳筆數（可選）
 * @param {string} [req.query.skip] - 跳過筆數（可選）
 * @returns {Buffer} 回傳檔案內容或錯誤訊息
 * 
 * @example
 * GET /mcp/download_file/123?top=100&skip=0
 */
app.get('/mcp/download_file/:fileSetId', async (req, res) => {
  const { fileSetId } = req.params;
  const { top, skip } = req.query;
  
  // 建構查詢參數
  const params = new URLSearchParams();
  if (top) params.append('top', top);
  if (skip) params.append('skip', skip);
  let url = `https://opendata.judicial.gov.tw/api/FilesetLists/${fileSetId}/file`;
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  try {
    const result = await axios.get(url, { responseType: 'arraybuffer' });
    res.setHeader('Content-Disposition', 'attachment; filename="data_file"');
    res.send(result.data);
  } catch (error) {
    handleError(res, error, '下載失敗');
  }
});

/**
 * 匯出 Express 應用程式實例
 * 供其他模組（如 start.js 和測試檔案）使用
 * @module server
 */
module.exports = app;
