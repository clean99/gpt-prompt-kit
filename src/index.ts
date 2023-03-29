import GPTPromptKit from './GPTPromptKit';
import * as defaultPrompt from './prompt';

export const gptPromptKitFactory = (apiKey: string, options?: any) =>
  new GPTPromptKit(defaultPrompt.promptWithTextGenerator(apiKey, options));

export * as defaultPrompt from './prompt';
export * from './textNormalization';
export * from './constant';
export { default as GPTPromptKit } from './GPTPromptKit';
