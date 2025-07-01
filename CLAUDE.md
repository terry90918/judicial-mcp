# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a judicial-mcp (司法院 MCP) server - a Node.js application that provides MCP (Model Context Protocol) compliant tools for accessing Taiwan Judicial Yuan's open data and court judgments. The server implements the MCP specification to enable AI assistants and other clients to access judicial data through standardized protocol tools.

### MCP Implementation

The server follows the Model Context Protocol specification:
- **Protocol Version**: Compatible with MCP SDK v0.5.0
- **Transport**: stdio (standard input/output)
- **Tools**: 6 judicial data access tools
- **Authentication**: Environment variable based credentials

## Commands

### Development
- `npm start` or `npm run dev` - Start the MCP server (runs src/index.js)
- `npm test` - Run Jest tests (includes MCP functionality tests)
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run oxlint linter
- `npm run lint:fix` - Run oxlint with auto-fix

### Installation & Setup
- Copy `.env.example` to `.env` and configure JUDICIAL_USER and JUDICIAL_PASSWORD
- Credentials are for Taiwan Judicial Yuan API access at https://data.judicial.gov.tw/jdg/
- Install dependencies: `npm install` (includes @modelcontextprotocol/sdk)

### MCP Client Configuration
Add to your MCP client configuration (e.g., Claude Desktop):
```json
{
  "mcpServers": {
    "judicial-mcp": {
      "command": "node",
      "args": ["path/to/judicial-mcp/src/index.js"],
      "env": {
        "JUDICIAL_USER": "your_username",
        "JUDICIAL_PASSWORD": "your_password"
      }
    }
  }
}
```

## Architecture

### Core Structure
- **src/index.js** - Main MCP server with protocol handlers and transport setup
- **src/tools.js** - MCP tool definitions and handlers
- **server.js** - Legacy Express server (kept for compatibility)
- **start.js** - Legacy server startup script
- **bin/judicial-mcp.js** - CLI entry point for global npm installations
- **mcp.json** - MCP server configuration manifest

### MCP Tools Architecture
The server provides 6 MCP tools for judicial data access:

1. **auth_token** - Gets JWT token from Judicial Yuan API
2. **list_judgments** - Retrieves judgment change lists
3. **get_judgment** - Gets specific judgment content
4. **list_categories** - Lists all data categories
5. **list_resources** - Gets resources by category number
6. **download_file** - Downloads data files with pagination support

### MCP Protocol Implementation
- **Transport**: StdioServerTransport for client-server communication
- **Protocol**: JSON-RPC 2.0 based MCP specification
- **Tools**: Each tool has input schema validation and structured output
- **Error Handling**: Standardized MCP error responses with detailed logging

### External API Integration
The server proxies requests to two main external APIs:
- `https://data.judicial.gov.tw/jdg/api/` - Judgment database API (requires auth)
- `https://opendata.judicial.gov.tw/` - Open data platform API (public access)

### Environment Configuration
- Uses dotenv for environment variables
- Supports default credentials from env vars in auth_token tool
- MCP server configuration via mcp.json manifest

## Testing

- Jest for MCP tool and configuration testing
- Test environment configured in package.json
- **__tests__/mcp.test.js** - MCP server functionality tests
- **__tests__/server.test.js** - Legacy Express server tests (kept for compatibility)
- Tests verify tool configuration, input schema validation, and handler functionality

### Test Coverage
- MCP tool configuration validation
- Tool handler existence and functionality
- Input schema compliance
- Error handling scenarios

## Linting

- Uses oxlint with configuration in oxlintrc.json
- Key rules: no-unused-vars, prefer-const, no-var, eqeqeq, no-undef
- Node.js, ES2022, and Jest environments enabled
- Ignores node_modules, coverage, dist, and minified files