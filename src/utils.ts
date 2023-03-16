import { NodeVM } from 'vm2';

export async function runScript(script: string) {
  const result = {
    exports: null,
  };
  // Create a new context for the script
  const vm = new NodeVM({
    console: 'inherit', // Forward the console output to the main process
    wrapper: 'none', // Do not wrap the script in a function
    sandbox: {
      result,
    }, // Provide an empty sandbox object
    require: {
      external: true, // Allow the 'request' external module
      builtin: ['*'], // Allow the 'readline' built-in module
      root: './',
    },
  });

  // Run the script in the context and capture the result
  const vmExports = await vm.run(script);

  // Return the result
  return vmExports;
}
