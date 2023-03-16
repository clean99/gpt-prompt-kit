import { Lang } from '../src/constant';
import { gptPromptKitFactory } from '../src/index';

const gptPromptKit = gptPromptKitFactory('Your API key');

const translator = gptPromptKit.translate(Lang.English, Lang.Chinese);

translator('This is an awesome library, gpt is awesome!').then(console.log);

/**
 * output = 这是一个很棒的图书馆，gpt太棒了！
 */
