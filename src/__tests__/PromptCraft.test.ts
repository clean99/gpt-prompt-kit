import { Interpreter, Lang } from '../constant';
import PromptCraft from '../PromptCraft';
import * as defaultPrompt from '../prompt';

// mock ./prompt
jest.mock('../prompt', () => {
  return {
    promptWithTextGenerator: jest.fn(),
  };
});

describe('PromptCraft', () => {
  const mockOpenai = jest.fn();
  const getCodeBlock = jest.fn();
  const mockPrompt = jest.fn();
  const promptCraft: PromptCraft = new PromptCraft(mockPrompt, getCodeBlock);
  beforeEach(() => {
    getCodeBlock.mockClear();
    mockPrompt.mockClear();
  });

  it('should init an instance with correct api key when new a promptCraft', () => {
    expect(promptCraft).toBeDefined();
  });

  it('should call prompt with correct text when call translate', async () => {
    const from = Lang.French;
    const to = Lang.English;
    const translator = promptCraft.translate(from, to);
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
    const formatJsonWithSchema = promptCraft.formatJson(jsonSchema);

    await formatJsonWithSchema(description, input);

    expect(mockPrompt.mock.calls).toMatchInlineSnapshot(`
[
  [
    "
            Give the URL and text of the Wikipedia article for the given
        page name.

            Use JSON format, add \`\`\` at the start and end of json:

            page_name: The name of the page to get the text for.
            // page_url: The URL of the page.
            // page_text: The text of the page.

            input = {
    "page_name": "Taken 4: The Musical"
}
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
    const formatFreeWithSchema = promptCraft.formatFree(customSchema);

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

  it('should call prompt with correct text when call useInterpreter', async () => {
    const interpreter = Interpreter.JS_V8;
    const question = `What is the answer to life, the universe, and everything?`;
    const useInterpreterWithInterpreter =
      promptCraft.useInterpreter(interpreter);

    await useInterpreterWithInterpreter(question);

    expect(mockPrompt.mock.calls).toMatchInlineSnapshot(`
[
  [
    "
            Write an NodeJS program to answer the following question,

            use this format:

            \`\`\`
            <NodeJS commands and output needed to find answer>
            \`\`\`

            Only return the program code, don't return the explanation.

            Begin.

            What is the answer to life, the universe, and everything?
            ",
  ],
]
`);

    expect(getCodeBlock).toBeCalled();
  });
});
