import { Lang, Interpreter } from './constant';
import { getCodeBlock as defaultGetCodeBlock } from './textNormalization';

interface PromptEngineering {
  /**
   * Returns a function that translates the given text from the specified source language to the target language.
   * @param {string} from The source language.
   * @param {string} to The target language.
   * @returns {(text: string) => string} A function that takes a string input and returns the translated string.
   */
  translate: (from: Lang, to: Lang) => (text: string) => Promise<string>;

  /**
   * Returns a function that formats the given input data into the specified JSON schema.
   * @param {object} schema The JSON schema to format the data into.
   * @returns {(description: string, input: object) => string} A function that takes an input object and returns the formatted JSON string.
   */
  formatJson: (
    schema: Record<string, unknown>
  ) => (description: string, input: object) => Promise<string>;

  /**
   * Returns a function that formats the given input data according to the specified format string.
   * @param {string format The format string to use for formatting the input data.
   * @returns {(description: string) => string} A function that takes an description and returns the formatted string.
   */
  formatFree: (format: string) => (description: string) => Promise<string>;
}

class GPTPromptKit implements PromptEngineering {
  // prompt method, pass when construct
  private prompt: (text: string) => Promise<string>;
  private getCodeBlock: (text: string) => string | null;

  constructor(
    prompt: (text: string) => Promise<string>,
    getCodeBlock: (text: string) => string | null = defaultGetCodeBlock
  ) {
    this.prompt = prompt;
    this.getCodeBlock = getCodeBlock;
  }

  // translate method
  translate(from: Lang, to: Lang) {
    return (text: string) => {
      return this.prompt(`A ${from} phrase is provided: ${text}
            The masterful ${from} translator flawlessly translates the phrase into ${to}:`);
    };
  }

  // formatJson method
  formatJson(schema: Record<string, unknown>) {
    return async (description: string, input: object) => {
      const promptResult = await this.prompt(`
            ${description}\n
            Add \`\`\` at the start and end of json:\n
            ${Object.keys(schema)
              .map((key) => `${key}: ${schema[key]}`)
              .join('\n            // ')}

            input = ${JSON.stringify(input, null, 4)}
            Use JSON format:
            \`\`\`
            <JSON string>
            \`\`\`
        `);

      const codeBlock = this.getCodeBlock(promptResult);

      if (codeBlock) {
        return JSON.parse(codeBlock);
      }

      return promptResult;
    };
  }

  // formatFree method
  formatFree(schema: string) {
    return async (description: string) => {
      const promptResult = await this.prompt(`
            ${description}\n
            Use this format, add \`\`\` at the start and end of content:\n
            ${schema}
        `);

      return this.getCodeBlock(promptResult) ?? promptResult;
    };
  }
}

export default GPTPromptKit;
