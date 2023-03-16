import { Lang, Interpreter } from './constant';
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
    formatJson: (schema: Record<string, unknown>) => (description: string, input: object) => Promise<string>;
    /**
     * Returns a function that formats the given input data according to the specified format string.
     * @param {string format The format string to use for formatting the input data.
     * @returns {(description: string) => string} A function that takes an description and returns the formatted string.
     */
    formatFree: (format: string) => (description: string) => Promise<string>;
    /**
     * Returns a function that uses an external interpreter to answer the given question.
     * @param {Interpreter} interpreter The name or path of the external interpreter to use.
     * @returns {(question: string) => string} A function that takes a question string and returns the interpreter's answer.
     */
    useInterpreter: (interpreter: Interpreter, runCode?: boolean) => (question: string) => Promise<unknown>;
}
declare class GPTPromptKit implements PromptEngineering {
    private prompt;
    private getCodeBlock;
    constructor(prompt: (text: string) => Promise<string>, getCodeBlock?: (text: string) => string | null);
    translate(from: Lang, to: Lang): (text: string) => Promise<string>;
    formatJson(schema: Record<string, unknown>): (description: string, input: object) => Promise<any>;
    formatFree(schema: string): (description: string) => Promise<string>;
    useInterpreter(interpreter: Interpreter, runCode?: boolean): (question: string) => Promise<any>;
}
export default GPTPromptKit;
