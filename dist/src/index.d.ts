import GPTPromptKit from './GPTPromptKit';
import * as defaultPrompt from './prompt';
import * as textNormalization from './textNormalization';
import * as constant from './constant';
declare const gptPromptKitFactory: (apiKey: string) => GPTPromptKit;
export { gptPromptKitFactory, GPTPromptKit, defaultPrompt, textNormalization, constant, };
