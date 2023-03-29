import { Interpreter, Lang } from '../constant';
import GPTPromptKit from '../GPTPromptKit';
import * as defaultPrompt from '../prompt';

// mock ./prompt
jest.mock('../prompt', () => {
  return {
    promptWithTextGenerator: jest.fn(),
  };
});

describe('GPTPromptKit', () => {
  const getCodeBlock = jest.fn();
  const mockPrompt = jest.fn();
  const gptPromptKit: GPTPromptKit = new GPTPromptKit(mockPrompt, getCodeBlock);
  beforeEach(() => {
    getCodeBlock.mockClear();
    mockPrompt.mockClear();
  });

  it('should init an instance with correct api key when new a gptPromptKit', () => {
    expect(gptPromptKit).toBeDefined();
  });

  it('should call prompt with correct text when call translate', async () => {
    const from = Lang.French;
    const to = Lang.English;
    const translator = gptPromptKit.translate(from, to);
    const text = 'hello';

    await translator(text);

    expect(mockPrompt).toBeCalledWith(`A ${from} phrase is provided: ${text}
            The masterful ${from} translator flawlessly translates the phrase into ${to}:`);
  });

  it('should call prompt with correct text when call formatJson', async () => {
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

    await formatJsonWithSchema(description, input);

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
  });

  it('should call prompt with correct text when call formatFree', async () => {
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

    await formatFreeWithSchema(description);

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
  });
});
