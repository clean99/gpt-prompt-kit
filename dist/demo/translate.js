"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../src/constant");
const index_1 = require("../src/index");
const promptCraft = (0, index_1.promptCraftFactory)('Your API key');
const translator = promptCraft.translate(constant_1.Lang.English, constant_1.Lang.Chinese);
translator('This is an awesome library, gpt is awesome!').then(console.log);
/**
 * output = 这是一个很棒的图书馆，gpt太棒了！
 */
