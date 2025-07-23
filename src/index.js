#!/usr/bin/env node

/**
 * @file src/index.js
 * @description 司法院 MCP 伺服器 - 遵循 Model Context Protocol 規範
 */

const originalConsole = { ...console };
console.log = console.info = console.warn = () => {};
try {
  require('dotenv').config();
} finally {
  Object.assign(console, originalConsole);
}
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const { TOOLS_CONFIG, TOOL_HANDLERS } = require('./tools.js');


/**
 * MCP 伺服器實例
 */
const server = new Server(
  {
    name: 'judicial-mcp',
    version: '1.2.3',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * 統一的錯誤處理函數
 * @param {Error} error - 錯誤物件
 * @param {string} message - 自訂錯誤訊息
 * @returns {Object} 標準化錯誤回應
 */
const handleError = (error, message) => {
  const errorDetail = error.response?.data || error.message;
  console.error(`${message}:`, errorDetail);
  
  return {
    content: [
      {
        type: 'text',
        text: `錯誤: ${message}\n詳細資訊: ${JSON.stringify(errorDetail, null, 2)}`
      }
    ]
  };
};


/**
 * 列出所有可用的工具
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: Object.values(TOOLS_CONFIG)
  };
});

/**
 * 處理工具調用請求
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // 檢查工具是否存在
    if (!TOOL_HANDLERS[name]) {
      throw new Error(`未知的工具: ${name}`);
    }

    // 執行工具處理器
    const result = await TOOL_HANDLERS[name](args || {});
    
    return {
      content: [
        {
          type: 'text',
          text: `${result.message}\n\n${JSON.stringify(result.data, null, 2)}`
        }
      ]
    };
  } catch (error) {
    return handleError(error, `執行工具 ${name} 時發生錯誤`);
  }
});

/**
 * 啟動 MCP 伺服器
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('伺服器啟動失敗:', error);
  process.exit(1);
});