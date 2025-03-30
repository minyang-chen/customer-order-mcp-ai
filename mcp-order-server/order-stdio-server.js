import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./order-server.js";

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("Printer Store MCP Server running on stdio");
}  

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
