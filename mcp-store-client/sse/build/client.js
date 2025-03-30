"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ai_1 = require("ai");
require("dotenv/config");
// import { openai } from "@ai-sdk/openai";
// import { z } from "zod";
// import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
//import { groq } from '@ai-sdk/groq';
var groq_1 = require("@ai-sdk/groq");
var readline = require("readline/promises");
var process_1 = require("process");
var groq = (0, groq_1.createGroq)({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: "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",
});
var SYSTEM_PROMPT = "You are an AI Assistant for a printer store.\n\nThere are products available for purchase. You can recommend a product to the user.\nYou can get a list of products by using the getProducts tool.\n\nYou also have access to a fulfillment server that can be used to purchase products.\nYou can get a list of products by using the getInventory tool.\nYou can purchase a product by using the purchase tool.\n\nAfter purchasing a product tell the customer they've made a great choice and their order will be processed soon and they will be using their new printer in no time.\n";
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var mcpClient, toolset, rl, question, answer, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, 8, 11]);
                    return [4 /*yield*/, (0, ai_1.experimental_createMCPClient)({
                            transport: {
                                type: "sse",
                                url: "http://localhost:8083/sse",
                                headers: {
                                    example: "header",
                                },
                            },
                        })];
                case 1:
                    mcpClient = _a.sent();
                    // Check Server Available Tools
                    console.log("================================================");
                    console.log(" Retrieving MCP Server available tools");
                    console.log("================================================");
                    return [4 /*yield*/, mcpClient.tools()];
                case 2:
                    toolset = _a.sent();
                    console.log("MCP Tools: ".concat(JSON.stringify(toolset, null, 2)));
                    console.log("================================================");
                    console.log(" Welcome to Printer Store MCP/AI Assistant");
                    console.log("================================================");
                    rl = readline.createInterface({ input: process_1.stdin, output: process_1.stdout });
                    _a.label = 3;
                case 3:
                    if (!true) return [3 /*break*/, 6];
                    return [4 /*yield*/, rl.question('\nAsk a question then press enter (or type "q" or "exit" to quit): \n>')];
                case 4:
                    question = _a.sent();
                    if (question.toLowerCase() === 'q' || question.toLowerCase() === 'exit') {
                        return [3 /*break*/, 6];
                    }
                    return [4 /*yield*/, (0, ai_1.generateText)({
                            model: groq("qwen-2.5-32b"), //provider("gemini-2.0-flash-exp"), //openai("gpt-4o-mini", { structuredOutputs: true }),
                            tools: toolset,
                            maxSteps: 10,
                            onStepFinish: function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                                var toolResults = _b.toolResults;
                                return __generator(this, function (_c) {
                                    console.log("\nSTEP RESULTS: ".concat(JSON.stringify(toolResults, null, 2)));
                                    return [2 /*return*/];
                                });
                            }); },
                            system: SYSTEM_PROMPT,
                            prompt: question,
                            //temperature: 1.5,
                        })];
                case 5:
                    answer = (_a.sent()).text;
                    console.log("FINAL ANSWER:", answer);
                    return [3 /*break*/, 3];
                case 6:
                    rl.close();
                    return [3 /*break*/, 11];
                case 7:
                    error_1 = _a.sent();
                    console.error("Error:", error_1);
                    return [3 /*break*/, 11];
                case 8:
                    if (!mcpClient) return [3 /*break*/, 10];
                    return [4 /*yield*/, mcpClient.close()];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
// Update the main execution to properly handle the promise
main()
    .then(function () { return console.log("Conversation ended."); })
    .catch(function (error) { return console.error("Error:", error); });
// Run Client
// **************************************************************
// npx tsc --outDir ./build client.ts || node ./build/client.js
// **************************************************************
// Toolcall - get invetories 
// prompt: tell me what printer you have in product inventory
// STEP RESULTS: [
//   {
//     "type": "tool-result",
//     "toolCallId": "call_3m5s",
//     "toolName": "getInventory",
//     "args": {},
//     "result": {
//       "content": [
//         {
//           "type": "text",
//           "text": "[{\"printerId\":1,\"quantity\":7,\"printer\":{\"id\":1,\"name\":\"EcoPrint 3000\",\"image\":\"http://localhost:8082/eco-print-3000.jpg\",\"description\":\"The EcoPrint 3000 is designed for the environmentally conscious user. It uses recycled materials in its construction and featu
//         }
//       ]
//     }
//   }
// ]
// STEP RESULTS: []
// FINAL ANSWER: Here are some of the printers we currently have in inventory:
// - **EcoPrint 3000** - Environmentally friendly with energy-saving features.
// - **SpeedyJet Pro** - A high-speed printer perfect for keeping busy offices running smoothly.
// - **ColorBurst 500** - Specializes in high-quality color printing & has wireless capabilities.
// - **CompactPrint Mini** - Portable and perfect if you're looking for something on the go.
// - **LaserSharp 1000** - An efficient printer recommended for printing at high volumes.
// - **PhotoPro Max** - Offers professional grade photo print quality perfect for printing stunning photographs.
// - **MultiFunction X5** - An all-in-one printer featuring print, scan, copy & fax capabilities.
// - **DuraPrint Industrial** - Durable & designed for large, high-volume industrial environments.
// - **SmartPrint Cloud** - Cloud-connected for printing from anywhere, perfect in today’s interconnected world.
// - **LabelMaster Pro** - High-performing special printer, adept in print types of labels, this one has varied and flexible capabilities including a built-in label cutter.
// Is there a specific kind of feature or application they're intended for? This could help me recommend a product more in line with their needs.
// Toolcall - buy
// prompt: I want to buy a printer ID 3 with quantity 5 and my name is John.
//
// STEP RESULTS: [
//   {
//     "type": "tool-result",
//     "toolCallId": "call_gx7s",
//     "toolName": "buy",
//     "args": {
//       "customerName": "John",
//       "items": [
//         {
//           "printerId": 3,
//           "quantity": 5
//         }
//       ]
//     },
//     "result": {
//       "content": [
//         {
//           "type": "text",
//           "text": "{\"id\":11,\"customerName\":\"John\",\"items\":[{\"printerId\":3,\"quantity\":5}],\"totalAmount\":2245,\"orderDate\":\"2025-03-30T13:01:20.085Z\"}"
//         }
//       ]
//     }
//   }
// ]
// STEP RESULTS: []
// FINAL ANSWER: You've made a great choice! Your order for 5 printers with ID 3 has been successfully placed, John. The total amount for your order is $2,245. Your order will be processed soon, and you will be using your new printers in no time.
// Toolcall - recommend product
// can you recommend my an eco-priendly printer with cloud support
// STEP RESULTS: [
//   {
//     "type": "tool-result",
//     "toolCallId": "call_z62j",
//     "toolName": "getInventory",
//     "args": {},
//     "result": {
//       "content": [
//         {
//           "type": "text",
//         }
//       ]
//     }
//   }
// ]
// STEP RESULTS: []
// FINAL ANSWER: Based on your requirements for an eco-friendly printer with cloud support, I'd recommend the **SmartPrint Cloud** printer. While it isn't specifically labeled as eco-friendly, it supports cloud services which aligns with reducing paper waste and aligns well with being eco-conscious. It's a cloud-connected printer that allows for remote printing and management with advanced security features. Would you like to proceed with purchasing this printer or are you interested in finding more options?  
// Would you like to see if there's another printer that meets the eco-friendly criteria more directly? If so, I'll conduct a further search for you.
// what is the printer ID of **SmartPrint Cloud**
// STEP RESULTS: [
//   {
//     "type": "tool-result",
//     "toolCallId": "call_25x1",
//     "toolName": "getInventory",
//     "args": {},
//     "result": {
//       "content": [
//         {
//           "type": "text",
//           "text": "[{\"printerId\":1,\"quantity\":7,\"printer\":{\"id\":1,\"name\":\"EcoPrint 3000\",\"image\":\"http://localhost:8082/eco-print-3000.jpg\",\"description\":\"The EcoPrint 3000 is designed for the environmentally conscious user. It uses recycled materials in its construction and features an energy-saving mode that reduces power consumption by up to 50%. It offers high-quality printing with vibrant colors and sharp text.\",\"shortDescription\":\"Eco-friendly printer with energy-saving features and high-quality output.\",\"price\":249}},{\"printerId\":2,\"quantity\":8,\"printer\":{\"id\":2,\"name\":\"SpeedyJet Pro\",\"image\":\"http://localhost:8082/speedy-jet-pro.jpg\",\"description\":\"The SpeedyJet Pro is built for speed. It can print up to 40 pages per minute in black and white and 30 pages per minute in color. It's perfect for busy offices that need to print large volumes quickly.\",\"shortDescription\":\"High-speed printer capable of printing up to 40 pages per minute.\",\"price\":399}},{\"printerId\":3,\"quantity\":0,\"printer\":{\"id\":3,\"name\":\"ColorBurst 500\",\"image\":\"http://localhost:8082/color-burst-500.jpg\",\"description\":\"The ColorBurst 500 is designed for those who need vibrant, high-resolution color printing. It uses advanced ink technology to produce stunning photos and graphics. It also features wireless connectivity for easy printing from any device.\",\"shortDescription\":\"High-resolution color printer with advanced ink technology and wireless connectivity.\",\"price\":449}},{\"printerId\":4,\"quantity\":7,\"printer\":{\"id\":4,\"name\":\"CompactPrint Mini\",\"image\":\"http://localhost:8082/compact-print-mini.jpg\",\"description\":\"The CompactPrint Mini is a small, portable printer that's perfect for students or anyone who needs to print on the go. It's lightweight and easy to carry, and it can connect wirelessly to your phone or laptop.\",\"shortDescription\":\"Portable mini printer with wireless connectivity, ideal for on-the-go printing.\",\"price\":129}},{\"printerId\":5,\"quantity\":9,\"printer\":{\"id\":5,\"name\":\"LaserSharp 1000\",\"image\":\"http://localhost:8082/laser-sharp-1000.jpg\",\"description\":\"The LaserSharp 1000 is a laser printer that produces crisp, clear text and graphics. It's designed for high-volume printing and can handle large print jobs with ease. It also features duplex printing to save paper.\",\"shortDescription\":\"High-volume laser printer with duplex printing for crisp text and graphics.\",\"price\":599}},{\"printerId\":6,\"quantity\":8,\"printer\":{\"id\":6,\"name\":\"PhotoPro Max\",\"image\":\"http://localhost:8082/photo-pro-max.jpg\",\"description\":\"The PhotoPro Max is a professional-grade photo printer that produces stunning, gallery-quality prints. It uses a wide range of inks to create vibrant colors and deep blacks. It also features a large touchscreen display for easy navigation.\",\"shortDescription\":\"Professional photo printer with gallery-quality output and a large touchscreen display.\",\"price\":799}},{\"printerId\":7,\"quantity\":7,\"printer\":{\"id\":7,\"name\":\"MultiFunction X5\",\"image\":\"http://localhost:8082/multi-function-x5.jpg\",\"description\":\"The MultiFunction X5 is an all-in-one printer that can print, scan, copy, and fax. It's perfect for small businesses or home offices that need a versatile device. It also features automatic document feeding for easy scanning and copying.\",\"shortDescription\":\"All-in-one printer with print, scan, copy, and fax capabilities.\",\"price\":349}},{\"printerId\":8,\"quantity\":8,\"printer\":{\"id\":8,\"name\":\"DuraPrint Industrial\",\"image\":\"http://localhost:8082/dura-print-industrial.jpg\",\"description\":\"The DuraPrint Industrial is a heavy-duty printer designed for industrial environments. It's built to withstand harsh conditions and can handle large print jobs with ease. It also features secure printing to protect sensitive documents.\",\"shortDescription\":\"Heavy-duty industrial printer with secure printing features.\",\"price\":999}},{\"printerId\":9,\"quantity\":11,\"printer\":{\"id\":9,\"name\":\"SmartPrint Cloud\",\"image\":\"http://localhost:8082/smart-print-cloud.jpg\",\"description\":\"The SmartPrint Cloud is a cloud-connected printer that allows you to print from anywhere in the world. It features advanced security features to protect your data and can be managed remotely. It also integrates with popular cloud services.\",\"shortDescription\":\"Cloud-connected printer with remote management and advanced security features.\",\"price\":499}},{\"printerId\":10,\"quantity\":9,\"printer\":{\"id\":10,\"name\":\"LabelMaster Pro\",\"image\":\"http://localhost:8082/label-master-pro.jpg\",\"description\":\"The LabelMaster Pro is a specialized label printer that can print on a variety of label types and sizes. It's perfect for businesses that need to print shipping labels, product labels, or barcodes. It also features a built-in label cutter.\",\"shortDescription\":\"Specialized label printer with a built-in cutter for various label types and sizes.\",\"price\":299}}]"
//         }
//       ]
//     }
//   }
// ]
// STEP RESULTS: []
// FINAL ANSWER: The printer ID of the **SmartPrint Cloud** is 9.
//====
// okay, I want to buy a printer ID 9 with quantity 15 and my name is John.
// STEP RESULTS: [
//   {
//     "type": "tool-result",
//     "toolCallId": "call_4eyw",
//     "toolName": "buy",
//     "args": {
//       "customerName": "John",
//       "items": [
//         {
//           "printerId": 9,
//           "quantity": 15
//         }
//       ]
//     },
//     "result": {
//       "content": [
//         {
//           "type": "text",
//           "text": "{\"error\":\"Insufficient inventory for printer SmartPrint Cloud. Available: 11\"}"
//         }
//       ]
//     }
//   }
// ]
// STEP RESULTS: []
// FINAL ANSWER: It looks like we don't have sufficient quantity available for the printer you want to buy. We currently have 11 units of printer SmartPrint Cloud in stock. Would you like to go ahead and purchase a lesser quantity, or perhaps you'd like to take a look at other printer options we have available?
// Ask a question (or type "q" or "exit" to quit): 
//]
// STEP RESULTS: []
// FINAL ANSWER: It looks like we currently do not have any of the Printer with ID 9, the SmartPrint Cloud, in stock at the moment. Is there another model you might be interested in?
// Ask a question (or type "q" or "exit" to quit): 
