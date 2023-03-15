"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const textNormalization_1 = require("../textNormalization");
describe('getCodeBlock', () => {
    test('returns null for input without code block', () => {
        const text = 'This is some text without a code block.';
        expect((0, textNormalization_1.getCodeBlock)(text)).toBeNull();
    });
    test('returns normalized code block for input with code block', () => {
        const text = 'This is some text with a code block:\n```js\nconsole.log("Hello, world!");\n```';
        const expected = 'console.log("Hello, world!");';
        expect((0, textNormalization_1.getCodeBlock)(text)).toBe(expected);
    });
    test('normalizes leading/trailing whitespace', () => {
        const text = 'Here is a code block with leading/trailing whitespace:\n```\n  foo  \n```';
        const expected = 'foo';
        expect((0, textNormalization_1.getCodeBlock)(text)).toBe(expected);
    });
    test('normalizes multiple lines of code', () => {
        const text = 'Here is a code block with multiple lines:\n```html\n<h1>Hello, world!</h1>\n<p>Welcome to my website.</p>\n```';
        const expected = '<h1>Hello, world!</h1>\n<p>Welcome to my website.</p>';
        expect((0, textNormalization_1.getCodeBlock)(text)).toBe(expected);
    });
    test('normalizes empty code block', () => {
        const text = 'Here is an empty code block:\n```\n```';
        expect((0, textNormalization_1.getCodeBlock)(text)).toBeNull();
    });
    test('normalizes code block with leading/trailing newlines', () => {
        const text = '\nHere is a code block with leading/trailing newlines:\n```\n\nfoo\n\n```';
        const expected = 'foo';
        expect((0, textNormalization_1.getCodeBlock)(text)).toBe(expected);
    });
    test('normalizes code block with leading/trailing backticks', () => {
        const text = 'Here is a code block with leading/trailing backticks:\n```js```\nconsole.log("Hello, world!");\n``````';
        const expected = 'console.log("Hello, world!");';
        expect((0, textNormalization_1.getCodeBlock)(text)).toBe(expected);
    });
    test('normalizes multiple lines of code', () => {
        const text = 'Here is a code block with multiple lines:\n```js\nfunction add(a, b) {\n  return a + b;\n}\n```';
        const expected = 'function add(a, b) {\n  return a + b;\n}';
        expect((0, textNormalization_1.getCodeBlock)(text)).toBe(expected);
    });
    test('normalizes multiple lines of code', () => {
        const text = 'Here is a code block with multiple lines:\n```json\n{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}\n```';
        const expected = '{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}';
        expect((0, textNormalization_1.getCodeBlock)(text)).toBe(expected);
    });
});
