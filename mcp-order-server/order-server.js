import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const server = new McpServer({
  name: "Printer Order Fulfillment MCP Server",
  version: "1.0.0",
});

server.tool('find-product', 'Find a product', {}, async () => {
  return {
    content: [
      {
        type: 'text',
        text: 'The Product is available in stock',
      },
    ],
  };
});

server.tool("getOrders", "Get product orders", async () => {
  console.error("Fetching orders");
  const res = await fetch("http://localhost:8081/orders");
  const orders = await res.json();

  return { content: [{ type: "text", text: JSON.stringify(orders) }] };
});

server.tool("getInventory", "Get product inventory", async () => {
  console.error("Fetching inventory");
  const res = await fetch("http://localhost:8081/inventory");
  const inventory = await res.json();

  return { content: [{ type: "text", text: JSON.stringify(inventory) }] };
});

server.tool(
  "buy",
  "buy a printer",
  {
    items: z
      .array(
        z.object({
          printerId: z.number().describe("ID of the printer to buy"),
          quantity: z.number().describe("Quantity of printer to buy"),
        })
      )
      .describe("list of printer to buy"),
    customerName: z.string().describe("Name of the customer"),
  },
  async ({ items, customerName }) => {
    console.error("Purchasing", { items, customerName });
    const res = await fetch("http://localhost:8081/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        customerName,
      }),
    });
    const order = await res.json();

    return { content: [{ type: "text", text: JSON.stringify(order) }] };
  }
);
