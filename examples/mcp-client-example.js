#!/usr/bin/env node

/**
 * @file examples/mcp-client-example.js
 * @description MCP 客戶端範例，展示如何與司法院 MCP 伺服器互動
 * @author Terry Chen
 * @version 1.0.0
 */

const { spawn } = require('child_process');
const readline = require('readline');

/**
 * 簡單的 MCP 客戶端範例
 * 展示如何透過 stdio 與 MCP 伺服器通訊
 */
class SimpleMCPClient {
  constructor() {
    this.messageId = 1;
    this.server = null;
  }

  /**
   * 啟動 MCP 伺服器
   */
  async startServer() {
    console.log('🚀 啟動司法院 MCP 伺服器...');
    
    this.server = spawn('node', ['../src/index.js'], {
      stdio: ['pipe', 'pipe', 'inherit'],
      cwd: __dirname
    });

    this.server.stdout.on('data', (data) => {
      const messages = data.toString().split('\n').filter(line => line.trim());
      messages.forEach(message => {
        try {
          const parsed = JSON.parse(message);
          this.handleServerMessage(parsed);
        } catch (e) {
          console.log('📝 伺服器訊息:', message);
        }
      });
    });

    this.server.on('error', (error) => {
      console.error('❌ 伺服器錯誤:', error);
    });

    await this.delay(1000); // 等待伺服器啟動
  }

  /**
   * 處理伺服器回應
   */
  handleServerMessage(message) {
    console.log('📨 收到伺服器回應:', JSON.stringify(message, null, 2));
  }

  /**
   * 發送訊息到伺服器
   */
  sendMessage(message) {
    const jsonMessage = JSON.stringify(message) + '\n';
    console.log('📤 發送訊息:', JSON.stringify(message, null, 2));
    this.server.stdin.write(jsonMessage);
  }

  /**
   * 初始化 MCP 連接
   */
  async initialize() {
    const initMessage = {
      jsonrpc: '2.0',
      id: this.messageId++,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {
          sampling: {}
        },
        clientInfo: {
          name: 'simple-mcp-client',
          version: '1.0.0'
        }
      }
    };

    this.sendMessage(initMessage);
    await this.delay(1000);
  }

  /**
   * 列出可用工具
   */
  async listTools() {
    const listMessage = {
      jsonrpc: '2.0',
      id: this.messageId++,
      method: 'tools/list',
      params: {}
    };

    this.sendMessage(listMessage);
    await this.delay(1000);
  }

  /**
   * 呼叫工具
   */
  async callTool(toolName, args = {}) {
    const callMessage = {
      jsonrpc: '2.0',
      id: this.messageId++,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args
      }
    };

    this.sendMessage(callMessage);
    await this.delay(2000);
  }

  /**
   * 等待指定時間
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 關閉伺服器
   */
  async close() {
    if (this.server) {
      this.server.kill();
      console.log('🛑 已關閉 MCP 伺服器');
    }
  }
}

/**
 * 互動式 MCP 客戶端
 */
async function interactiveExample() {
  const client = new SimpleMCPClient();
  
  try {
    await client.startServer();
    await client.initialize();
    await client.listTools();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log('\\n🎯 互動式 MCP 客戶端');
    console.log('可用指令:');
    console.log('  list - 列出可用工具');
    console.log('  auth - 取得授權 Token');
    console.log('  categories - 列出主題分類');
    console.log('  help - 顯示說明');
    console.log('  exit - 結束程式');

    const askQuestion = () => {
      rl.question('\\n> ', async (answer) => {
        const command = answer.trim().toLowerCase();

        switch (command) {
          case 'list':
            await client.listTools();
            break;
          
          case 'auth':
            await client.callTool('auth_token');
            break;
          
          case 'categories':
            await client.callTool('list_categories');
            break;
          
          case 'help':
            console.log('\\n📚 工具說明:');
            console.log('  auth_token - 取得司法院授權 Token');
            console.log('  list_judgments - 取得裁判書異動清單');
            console.log('  get_judgment - 取得裁判書內容');
            console.log('  list_categories - 取得主題分類清單');
            console.log('  list_resources - 取得分類資料源清單');
            console.log('  download_file - 下載資料檔案');
            break;
          
          case 'exit':
            console.log('👋 再見！');
            await client.close();
            rl.close();
            process.exit(0);
            return;
          
          default:
            console.log('❓ 未知指令，輸入 help 查看可用指令');
        }

        askQuestion();
      });
    };

    askQuestion();

  } catch (error) {
    console.error('❌ 範例執行錯誤:', error);
    await client.close();
  }
}

/**
 * 基本範例展示
 */
async function basicExample() {
  const client = new SimpleMCPClient();
  
  try {
    console.log('🎬 開始基本 MCP 互動範例');
    
    await client.startServer();
    console.log('✅ 伺服器已啟動');
    
    await client.initialize();
    console.log('✅ 已初始化連接');
    
    await client.listTools();
    console.log('✅ 已列出可用工具');
    
    await client.callTool('list_categories');
    console.log('✅ 已呼叫 list_categories 工具');
    
    await client.delay(2000);
    await client.close();
    console.log('✅ 範例完成');
    
  } catch (error) {
    console.error('❌ 範例執行錯誤:', error);
    await client.close();
  }
}

// 主程式
if (require.main === module) {
  const mode = process.argv[2];
  
  if (mode === 'interactive') {
    interactiveExample();
  } else {
    basicExample();
  }
}

module.exports = { SimpleMCPClient };