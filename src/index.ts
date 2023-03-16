import GPTPromptKit from './GPTPromptKit';
import * as defaultPrompt from './prompt';
import * as textNormalization from './textNormalization';
import * as constant from './constant';

const gptPromptKitFactory = (apiKey: string) =>
  new GPTPromptKit(defaultPrompt.promptWithTextGenerator(apiKey));

export {
  gptPromptKitFactory,
  GPTPromptKit,
  defaultPrompt,
  textNormalization,
  constant,
};
