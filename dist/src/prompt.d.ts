import { OpenAIApi, CreateChatCompletionRequest } from 'openai';
export declare const prompt: (messages: CreateChatCompletionRequest['messages'], openai: OpenAIApi, options?: any) => Promise<string>;
export declare const promptWithTextGenerator: (apiKey: string, options?: any) => (content: string) => Promise<string>;
