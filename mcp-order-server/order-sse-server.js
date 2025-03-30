import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

import { server } from "./order-server.js";

const app = express();

let transport;
app.get("/sse", async (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  await transport.handlePostMessage(req, res);
});

const port = process.env.PORT || 8083;
app.listen(port, () => {
  console.log(`Printer Store MCP SSE Server is running on http://localhost:${port}/sse`);
  console.log("/sse")
  console.log("/messages")
});
