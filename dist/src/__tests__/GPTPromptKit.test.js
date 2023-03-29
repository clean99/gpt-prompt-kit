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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
const GPTPromptKit_1 = __importDefault(require("../GPTPromptKit"));
// mock ./prompt
jest.mock('../prompt', () => {
    return {
        promptWithTextGenerator: jest.fn(),
    };
});
describe('GPTPromptKit', () => {
    const getCodeBlock = jest.fn();
    const mockPrompt = jest.fn();
    const gptPromptKit = new GPTPromptKit_1.default(mockPrompt, getCodeBlock);
    beforeEach(() => {
        getCodeBlock.mockClear();
        mockPrompt.mockClear();
    });
    it('should init an instance with correct api key when new a gptPromptKit', () => {
        expect(gptPromptKit).toBeDefined();
    });
    it('should call prompt with correct text when call translate', () => __awaiter(void 0, void 0, void 0, function* () {
        const from = constant_1.Lang.French;
        const to = constant_1.Lang.English;
        const translator = gptPromptKit.translate(from, to);
        const text = 'hello';
        yield translator(text);
        expect(mockPrompt).toBeCalledWith(`A ${from} phrase is provided: ${text}
            The masterful ${from} translator flawlessly translates the phrase into ${to}:`);
    }));
    it('should call prompt with correct text when call formatJson', () => __awaiter(void 0, void 0, void 0, function* () {
        const jsonSchema = {
            page_name: 'The name of the page to get the text for.',
            page_url: 'The URL of the page.',
            page_text: 'The text of the page.',
        };
        const description = `Give the URL and text of the Wikipedia article for the given
        page name.`;
        const input = {
            page_name: 'Taken 4: The Musical',
        };
        const formatJsonWithSchema = gptPromptKit.formatJson(jsonSchema);
        yield formatJsonWithSchema(description, input);
        expect(mockPrompt.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "
                  Give the URL and text of the Wikipedia article for the given
              page name.

                  Add \`\`\` at the start and end of json:

                  page_name: The name of the page to get the text for.
                  // page_url: The URL of the page.
                  // page_text: The text of the page.

                  input = {
          "page_name": "Taken 4: The Musical"
      }
                  Use JSON format:
                  \`\`\`
                  <JSON string>
                  \`\`\`
              ",
        ],
      ]
    `);
        expect(getCodeBlock).toBeCalled();
    }));
    it('should call prompt with correct text when call formatFree', () => __awaiter(void 0, void 0, void 0, function* () {
        const customSchema = `
      Tilte: <Title>
      ## Abstract ##
      <Text of abstract>
      ## Sections ##
      <Numbered list of 10 top-level sections>
      ## Content ##
      <Text of entire arXiv pre-print in LaTeX notation>
      `;
        const description = `Generate an arXiv pre-print with the given title.`;
        const formatFreeWithSchema = gptPromptKit.formatFree(customSchema);
        yield formatFreeWithSchema(description);
        expect(mockPrompt.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "
                  Generate an arXiv pre-print with the given title.

                  Use this format, add \`\`\` at the start and end of content:

                  
            Tilte: <Title>
            ## Abstract ##
            <Text of abstract>
            ## Sections ##
            <Numbered list of 10 top-level sections>
            ## Content ##
            <Text of entire arXiv pre-print in LaTeX notation>
            
              ",
        ],
      ]
    `);
        expect(getCodeBlock).toBeCalled();
    }));
});
