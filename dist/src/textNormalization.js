"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeBlock = void 0;
/**
 * A function that takes a string input and returns the normalized string.
 * @param text
 * @returns {string}
 */
const getCodeBlock = (text) => { var _a, _b; return (_b = (_a = /```[\s\S]*?\n([\s\S]*?)\n```/.exec(text)) === null || _a === void 0 ? void 0 : _a[1].trim()) !== null && _b !== void 0 ? _b : null; };
exports.getCodeBlock = getCodeBlock;
