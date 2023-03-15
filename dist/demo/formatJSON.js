"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const promptCraft = (0, index_1.promptCraftFactory)('Your API key');
const formatJson = promptCraft.formatJson({
    title: 'The title of the subject.',
    subjects: 'The subjects list under the title.',
});
const description = 'Generate a list of subjects that I need to learned under the title, which the length is 5.';
const input = {
    title: 'Math',
};
formatJson(description, input).then(console.log);
/**
 * output = {
 *  "title": "Math",
 * "subjects": [
 *     "Algebra",
 *     "Geometry",
 *     "Calculus",
 *      "Statistics",
 *      "Trigonometry"
 *  ]
 * }
 */
