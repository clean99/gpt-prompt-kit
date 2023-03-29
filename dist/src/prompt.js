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
exports.promptWithTextGenerator = exports.prompt = void 0;
const openai_1 = require("openai");
const DEFUALT_OPTIONS = {
    model: 'gpt-3.5-turbo',
    max_tokens: 3500,
    temperature: 0.4,
};
const prompt = (messages, openai, options = DEFUALT_OPTIONS) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const response = yield openai.createChatCompletion(Object.assign(Object.assign({}, options), { messages }));
    return (_e = (_d = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.choices) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.content) !== null && _e !== void 0 ? _e : '';
});
exports.prompt = prompt;
const promptWithTextGenerator = (apiKey, options) => (content) => __awaiter(void 0, void 0, void 0, function* () {
    const configuration = new openai_1.Configuration({
        apiKey,
    });
    const openai = new openai_1.OpenAIApi(configuration);
    return (0, exports.prompt)([{ content, role: openai_1.ChatCompletionRequestMessageRoleEnum.User }], openai, options);
});
exports.promptWithTextGenerator = promptWithTextGenerator;
