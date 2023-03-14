import PromptCraft from './PromptCraft';
import * as defaultPrompt from './prompt';
import * as textNormalization from './textNormalization';
import * as constant from './constant';

const promptCraftFactory = (apiKey: string) => new PromptCraft(defaultPrompt.promptWithTextGenerator(apiKey));

export { promptCraftFactory, PromptCraft, defaultPrompt, textNormalization, constant };
