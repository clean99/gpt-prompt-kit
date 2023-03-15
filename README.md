# PromptCraft 📚

**Power your AI language model with the ability to run program in NodeJS!**
PromptCraft is a library that helps developers interact with AI language models more effectively by using prompt engineering techniques. The library offers several techniques that can be used depending on the situation, improving the clarity and accuracy of prompts, and enabling more effective communication with users.

## Features 🎁

1. **Translate** 🌐 : Ask questions in a clear and concise manner to improve translation accuracy.
2. **Format (Text Normalization)** 📝: Use a specific format to prompt the user with two available options:
    - **JSON**: Provide a JSON schema and input, and receive output in this format.
    - **Free**: Specify any desired format and receive output accordingly.
3. **Interpreter** 🧐: Use an external interpreter to answer complex questions, expanding the range of problems that can be tackled. ChatGPT generates code to solve the question, runs it in your Node.js environment, and returns the result.
4. **ChainOfThought** 🤔: Prompt GPT to think through the problem step by step.

## Demo 🥸

In demo directory there are some use demo for you to test the abilities of this library.

To use those demo:

1. Install dependencies:

```
npm install
```

2. Compile & Run the demo:

```
tsc demo/translate.ts
node demo/translate.js
```


## Installation 📦

Install PromptCraft using npm:

```
npm install prompt-js
```


## Usage 🚀

Create a new file named `index.js` and add the following code:

```javascript
import { PromptCraft, promptCraftFactory } from 'prompt-js';

// custom your prompt function to create a promptCraft instance.
const prompt = (text) => {
  // Your function to send the text to GPT and receive a response
};

const promptCraft = new PromptCraft(prompt);

// or you can just pass API_KEY to use the build-in GPT-3.5 model

const promptCraft = promptCraftFactory(API_KEY);

// Example usage:
// Translate
const translate = promptCraft.translate(Lang.English, Lang.Chinese);
translate('Hello, world!').then(console.log);

// Format JSON
const formatJson = promptCraft.formatJson({ key: 'explain it', key2: 'explain it' });
formatJson('Description here', { key: 'example' }).then(console.log);

// Format Free
const formatFree = promptCraft.formatFree('Any format template you want');
formatFree('Description here').then(console.log);

// Use Interpreter
const useInterpreter = promptCraft.useInterpreter(Interpreter.JS_V8, true);
useInterpreter('Calculate the factorial of 5').then(console.log);
```

## Development 🛠️

To contribute to PromptCraft, follow these steps:

1. Clone the repository and install dependencies:

```
git clone https://github.com/clean99/prompt-js.git
cd prompt-js
npm install
```

2. Build the project:

```
npm run build
```

3. Test the project:

```
npm test
```

4. Lint the project:

```
npm run lint
```

5. Format the project:

```
npm run format
```

## Contributing 🤝
We welcome contributions to PromptCraft! If you'd like to contribute, please fork the repository, create a new branch, make your changes, and submit a pull request.

## License 📄
PromptCraft is licensed under the [MIT License](/LICENSE).

```

Feel free to modify the code snippets, installation, usage, and contributing sections as necessary to match your library's actual implementation and requirements.
```
