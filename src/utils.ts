import * as vm from 'node:vm';

export function runScript(script: string) {
  // Create a new context for the script
  const context = vm.createContext();

  // Run the script in the context and capture the result
  const result = vm.runInContext(script, context);

  // Return the result
  return result;
}
