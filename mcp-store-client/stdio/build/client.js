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
//import { openai } from "@ai-sdk/openai";
//import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
// Or use the AI SDK's stdio transport by importing:
var mcp_stdio_1 = require("ai/mcp-stdio");
//import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';
var ai_1 = require("ai");
require("dotenv/config");
var zod_1 = require("zod");
var groq_1 = require("@ai-sdk/groq");
var groq = (0, groq_1.createGroq)({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: "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",
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var mcpClient, stdioTransport, answer, _a;
        var _b;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, , 4, 6]);
                    stdioTransport = new mcp_stdio_1.Experimental_StdioMCPTransport({
                        command: "node",
                        args: ["/home/pop/hosting/mcp-client-and-server/apps/mcp-store-client/stdio/dist/server.js"],
                        env: {
                            FOO: "bar",
                        },
                    });
                    return [4 /*yield*/, (0, ai_1.experimental_createMCPClient)({
                            transport: stdioTransport,
                        })];
                case 1:
                    mcpClient = _c.sent();
                    _a = ai_1.generateText;
                    _b = {
                        model: groq("qwen-2.5-32b")
                    };
                    return [4 /*yield*/, mcpClient.tools({
                            schemas: {
                                "get-pokemon": {
                                    parameters: zod_1.z.object({ name: zod_1.z.string() }),
                                },
                            },
                        })];
                case 2: return [4 /*yield*/, _a.apply(void 0, [(_b.tools = _c.sent(),
                            _b.maxSteps = 10,
                            _b.onStepFinish = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                                var toolResults = _b.toolResults;
                                return __generator(this, function (_c) {
                                    console.log("STEP RESULTS: ".concat(JSON.stringify(toolResults, null, 2)));
                                    return [2 /*return*/];
                                });
                            }); },
                            _b.system = "You are an expert in Pokemon",
                            _b.prompt = "Which Pokemon could best defeat Feebas? Choose one and share details about it.",
                            _b)])];
                case 3:
                    answer = (_c.sent()).text;
                    console.log("FINAL ANSWER: ".concat(answer));
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, (mcpClient === null || mcpClient === void 0 ? void 0 : mcpClient.close())];
                case 5:
                    _c.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
