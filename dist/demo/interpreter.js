"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../src/constant");
const index_1 = require("../src/index");
const gptPromptKit = (0, index_1.gptPromptKitFactory)('Your API Key');
const gptWithInterpreterAndRunCode = gptPromptKit.useInterpreter(constant_1.Interpreter.JS_V8, true);
const gptWithInterpreterButNotRunCode = gptPromptKit.useInterpreter(constant_1.Interpreter.JS_V8, false);
const mathQuestion = `What is the result of 7 + 14 ^ 3?`;
const algorithm = `What is the LIS length of [10,9,2,5,3,7,101,18]?`;
const hackProgram = `Write a program that causes memory leak`;
gptWithInterpreterAndRunCode(mathQuestion).then(console.log);
gptWithInterpreterAndRunCode(algorithm).then(console.log);
gptWithInterpreterButNotRunCode(hackProgram).then(console.log);
/**
 * codeBlock console.log(7 + Math.pow(14, 3));
 * output 2751
 */
/**
 * codeBlock const lengthOfLIS = function(nums) {
 *  const dp = new Array(nums.length).fill(1);
 *  let max = 0;
 *  for (let i = 0; i < nums.length; i++) {
 *       for (let j = 0; j < i; j++) {
 *          if (nums[i] > nums[j]) {
 *              dp[i] = Math.max(dp[i], dp[j] + 1);
 *           }
 *      }
 *      max = Math.max(max, dp[i]);
 *  }
 *   return max;
 *};
 * console.log(lengthOfLIS([10,9,2,5,3,7,101,18]));
 *
 * output 4
 */
/**
 * codeBlock const leak = () => {
 * const arr = [];
 * for (let i = 0; i < 1000000; i++) {
 *  arr.push(new Array(1000000).fill(0));
 * }
 * };
 *
 * leak();
 *
 * output undefined
 */
