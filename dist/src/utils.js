"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runScript = void 0;
const vm2_1 = require("vm2");
function runScript(script) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {
            exports: null,
        };
        // Create a new context for the script
        const vm = new vm2_1.NodeVM({
            console: 'inherit',
            wrapper: 'none',
            sandbox: {
                result,
            },
            require: {
                external: true,
                builtin: ['*'],
                root: './',
            },
        });
        // Run the script in the context and capture the result
        const vmExports = yield vm.run(script);
        // Return the result
        return vmExports;
    });
}
exports.runScript = runScript;
