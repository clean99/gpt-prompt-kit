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
Object.defineProperty(exports, "__esModule", { value: true });
const textNormalization_1 = require("./textNormalization");
const utils_1 = require("./utils");
class GPTPromptKit {
    constructor(prompt, getCodeBlock = textNormalization_1.getCodeBlock) {
        this.prompt = prompt;
        this.getCodeBlock = getCodeBlock;
    }
    // translate method
    translate(from, to) {
        return (text) => {
            return this.prompt(`A ${from} phrase is provided: ${text}
            The masterful ${from} translator flawlessly translates the phrase into ${to}:`);
        };
    }
    // formatJson method
    formatJson(schema) {
        return (description, input) => __awaiter(this, void 0, void 0, function* () {
            const promptResult = yield this.prompt(`
            ${description}\n
            Use JSON format, add \`\`\` at the start and end of json:\n
            ${Object.keys(schema)
                .map((key) => `${key}: ${schema[key]}`)
                .join('\n            // ')}

            input = ${JSON.stringify(input, null, 4)}
        `);
            const codeBlock = this.getCodeBlock(promptResult);
            if (codeBlock) {
                return JSON.parse(codeBlock);
            }
            return promptResult;
        });
    }
    // formatFree method
    formatFree(schema) {
        return (description) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const promptResult = yield this.prompt(`
            ${description}\n
            Use this format, add \`\`\` at the start and end of content:\n
            ${schema}
        `);
            return (_a = this.getCodeBlock(promptResult)) !== null && _a !== void 0 ? _a : promptResult;
        });
    }
    // useInterpreter method
    useInterpreter(interpreter, runCode) {
        return (question) => __awaiter(this, void 0, void 0, function* () {
            const promptResult = yield this.prompt(`
            Write an ${interpreter} program to answer the following question.\n
            Write a function to solution the problem, call the function and return at the end of the code.\n
            Don't use any third party module expect nodejs build-in module.\n
            Use this format:\n
            \`\`\`
            <${interpreter} function and output needed to find answer>\n
            
            return <function call>\n
            \`\`\`\n

            Begin.\n
            ${question}
            `);
            const codeBlock = this.getCodeBlock(promptResult);
            if (runCode && codeBlock) {
                return yield (0, utils_1.runScript)(codeBlock);
            }
            if (codeBlock) {
                return codeBlock;
            }
            return promptResult;
        });
    }
}
exports.default = GPTPromptKit;
