
//import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Experimental_StdioMCPTransport as StdioClientTransport } from 'ai/mcp-stdio' 
import { experimental_createMCPClient, generateText } from "ai";
import "dotenv/config";
import { createGroq } from "@ai-sdk/groq";

import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";


const SYSTEM_PROMPT = `You are an AI Assistant for a printer store.

There are products available for purchase. You can recommend a product to the user.
You can get a list of products by using the getProducts tool.

You also have access to a fulfillment server that can be used to purchase products.
You can get a list of products by using the getInventory tool.
You can purchase a product by using the purchase tool.

After purchasing a product tell the customer they've made a great choice and their order will be processed soon and they will be using their new printer in no time.
`;

console.log(process.env.GROQ_API_URL)
// console.log(process.env.GROQ_API_KEY)

const groq = createGroq({
  baseURL: process.env.GROQ_API_URL || "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY || "Your-GROQ-API-Key",
});

async function main() {
  let mcpClient;
  try {
    const stdioTransport = new StdioClientTransport({
      command: "node",
      args: [
        "/home/pop/hosting/mcp-client-and-server/apps/mcp-order-server/order-stdio-server.js",
      ],
      env: {
        store: "printer-store",
      },
    });

    mcpClient = await experimental_createMCPClient({
      transport: stdioTransport,
    });

    const toolset = await mcpClient.tools();
    console.log(`MCP Tools: ${JSON.stringify(toolset, null, 2)}`);
    console.log("================================================");
    console.log(" Welcome to Printer Store MCP/AI Assistant");
    console.log("================================================");
    const rl = readline.createInterface({ input, output });

    while (true) {
      const question = await rl.question(
        '\nAsk a question then press enter (or type "q" or "exit" to quit): \n>'
      );
      if (question.toLowerCase() === "q" || question.toLowerCase() === "exit") {
        break;
      }

      const { text: answer } = await generateText({
        model: groq("qwen-2.5-32b"), 
        tools: toolset,
        maxSteps: 10,
        onStepFinish: async ({ toolResults }) => {
          console.log(`STEP RESULTS: ${JSON.stringify(toolResults, null, 2)}`);
        },
        system: SYSTEM_PROMPT,
        prompt: question,
      });
      console.log("FINAL ANSWER:", answer);
    }
    rl.close();
  } catch (error) {
    console.error("Error:", error);
  } finally {
      await mcpClient?.close();
  }
}

// Update the main execution to properly handle the promise
main()
  .then(() => console.log("Conversation ended."))
  .catch((error) => console.error("Error:", error));
