import { Interpreter, Lang } from "../constant";
import PromptCraft from "../PromptCraft";

describe("PromptCraft", () => {
    const prompt = jest.fn();
    const getCodeBlock = jest.fn();
    let promptCraft: PromptCraft;
    beforeEach(() => {
        prompt.mockClear();
        getCodeBlock.mockClear();
        promptCraft = new PromptCraft(prompt, getCodeBlock);
    });

    it('should init an instance with correct api key when new a promptCraft', () => {
        expect(promptCraft).toBeDefined();
    });

    it('should call prompt with correct text when call translate', () => {
        const from = Lang.French;
        const to = Lang.English;
        const translator = promptCraft.translate(from, to);
        const text = 'hello'
    
        translator(text);
    
        expect(prompt).toBeCalledWith(`A ${from} phrase is provided: ${text}
            The masterful ${from} translator flawlessly translates the phrase into ${to}:`)
    });

    it('should call prompt with correct text when call formatJson', () => {
        const jsonSchema = {
            page_name: "The name of the page to get the text for.",
            page_url: "The URL of the page.",
            page_text: "The text of the page."
        }
        const description = `Give the URL and text of the Wikipedia article for the given
        page name.`
        const input = {
            page_name: "Taken 4: The Musical"
        }
        const formatJsonWithSchema = promptCraft.formatJson(jsonSchema);
      
        formatJsonWithSchema(description, input);
      
        expect(prompt.mock.calls).toMatchInlineSnapshot(`
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
    expect(getCodeBlock).toBeCalled()
    })


it('should call prompt with correct text when call formatFree', () => {
    const customSchema = `
      Tilte: <Title>
      ## Abstract ##
      <Text of abstract>
      ## Sections ##
      <Numbered list of 10 top-level sections>
      ## Content ##
      <Text of entire arXiv pre-print in LaTeX notation>
      `
    const description = `Generate an arXiv pre-print with the given title.`
    const formatFreeWithSchema = promptCraft.formatFree(customSchema);
  
    formatFreeWithSchema(description);
  
    expect(prompt.mock.calls).toMatchInlineSnapshot(`
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

expect(getCodeBlock).toBeCalled()
})

it('should call prompt with correct text when call useInterpreter', () => {
    const interpreter = Interpreter.JS_V8;
    const question = `What is the answer to life, the universe, and everything?`
    const useInterpreterWithInterpreter = promptCraft.useInterpreter(interpreter);
  
    useInterpreterWithInterpreter(question);
  
    expect(prompt.mock.calls).toMatchInlineSnapshot(`
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
})
});
