import { prompt } from '../prompt';
import {
  CreateChatCompletionResponse,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';

describe('prompt', () => {
  const mockCreateChatCompletion = jest.fn();
  const mockOpenai = {
    createChatCompletion: mockCreateChatCompletion,
  };
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('returns empty string when no message is provided', async () => {
    // eslint-disable-next-line
    // @ts-ignore
    const result = await prompt([], mockOpenai);
    expect(result).toBe('');
    expect(mockCreateChatCompletion).toHaveBeenCalled();
  });

  test('returns response from createChatCompletion', async () => {
    const mockResponse: CreateChatCompletionResponse = {
      id: '123',
      object: 'object',
      created: 123,
      model: 'model',
      choices: [
        {
          message: {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Hello, world!',
          },
        },
      ],
    };
    mockCreateChatCompletion.mockResolvedValue({
      data: mockResponse,
    });

    const messages = [
      { role: ChatCompletionRequestMessageRoleEnum.User, content: 'Hi!' },
    ];
    const options = { engine: 'davinci', maxTokens: 10 };
    // eslint-disable-next-line
    // @ts-ignore
    const result = await prompt(messages, mockOpenai, options);

    expect(mockCreateChatCompletion).toHaveBeenCalledWith({
      ...options,
      messages,
    });
    expect(result).toBe(mockResponse?.choices?.[0]?.message?.content);
  });

  test('returns empty string when no message content is provided', async () => {
    const mockResponse: CreateChatCompletionResponse = {
      id: '123',
      object: 'object',
      created: 123,
      model: 'model',
      choices: [
        {
          // eslint-disable-next-line
          // @ts-ignore
          message: {},
        },
      ],
    };
    mockCreateChatCompletion.mockResolvedValue({
      data: mockResponse,
    });

    const messages = [{ text: 'Hi!' }];
    // eslint-disable-next-line
    // @ts-ignore
    const result = await prompt(messages, mockOpenai);

    expect(mockCreateChatCompletion).toHaveBeenCalled();
    expect(result).toBe('');
  });

  test('returns empty string when response is undefined', async () => {
    mockCreateChatCompletion.mockResolvedValue(undefined);
    const messages = [{ text: 'Hi!' }];
    // eslint-disable-next-line
    // @ts-ignore
    const result = await prompt(messages, mockOpenai);

    expect(mockCreateChatCompletion).toHaveBeenCalled();
    expect(result).toBe('');
  });
});
