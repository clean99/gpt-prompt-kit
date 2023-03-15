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
const prompt_1 = require("../prompt");
const openai_1 = require("openai");
describe('prompt', () => {
    const mockCreateChatCompletion = jest.fn();
    const mockOpenai = {
        createChatCompletion: mockCreateChatCompletion,
    };
    afterEach(() => {
        jest.resetAllMocks();
    });
    test('returns empty string when no message is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        // eslint-disable-next-line
        // @ts-ignore
        const result = yield (0, prompt_1.prompt)([], mockOpenai);
        expect(result).toBe('');
        expect(mockCreateChatCompletion).toHaveBeenCalled();
    }));
    test('returns response from createChatCompletion', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const mockResponse = {
            id: '123',
            object: 'object',
            created: 123,
            model: 'model',
            choices: [
                {
                    message: {
                        role: openai_1.ChatCompletionRequestMessageRoleEnum.Assistant,
                        content: 'Hello, world!',
                    },
                },
            ],
        };
        mockCreateChatCompletion.mockResolvedValue({
            data: mockResponse,
        });
        const messages = [
            { role: openai_1.ChatCompletionRequestMessageRoleEnum.User, content: 'Hi!' },
        ];
        const options = { engine: 'davinci', maxTokens: 10 };
        // eslint-disable-next-line
        // @ts-ignore
        const result = yield (0, prompt_1.prompt)(messages, mockOpenai, options);
        expect(mockCreateChatCompletion).toHaveBeenCalledWith(Object.assign(Object.assign({}, options), { messages }));
        expect(result).toBe((_c = (_b = (_a = mockResponse === null || mockResponse === void 0 ? void 0 : mockResponse.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content);
    }));
    test('returns empty string when no message content is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResponse = {
            id: '123',
            object: 'object',
            created: 123,
            model: 'model',
            choices: [
                {
                    // eslint-disable-next-line
                    // @ts-ignore
                    message: {},
                },
            ],
        };
        mockCreateChatCompletion.mockResolvedValue({
            data: mockResponse,
        });
        const messages = [{ text: 'Hi!' }];
        // eslint-disable-next-line
        // @ts-ignore
        const result = yield (0, prompt_1.prompt)(messages, mockOpenai);
        expect(mockCreateChatCompletion).toHaveBeenCalled();
        expect(result).toBe('');
    }));
    test('returns empty string when response is undefined', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCreateChatCompletion.mockResolvedValue(undefined);
        const messages = [{ text: 'Hi!' }];
        // eslint-disable-next-line
        // @ts-ignore
        const result = yield (0, prompt_1.prompt)(messages, mockOpenai);
        expect(mockCreateChatCompletion).toHaveBeenCalled();
        expect(result).toBe('');
    }));
});
