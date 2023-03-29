import {
  Configuration,
  OpenAIApi,
  CreateChatCompletionRequest,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';

const DEFUALT_OPTIONS = {
  model: 'gpt-3.5-turbo',
  max_tokens: 3500,
  temperature: 0.4,
};

export const prompt = async (
  messages: CreateChatCompletionRequest['messages'],
  openai: OpenAIApi,
  options: any = DEFUALT_OPTIONS
): Promise<string> => {
  const response = await openai.createChatCompletion({
    ...options,
    messages,
  });
  return response?.data?.choices?.[0]?.message?.content ?? '';
};

export const promptWithTextGenerator =
  (apiKey: string, options?: any) =>
  async (content: string): Promise<string> => {
    const configuration = new Configuration({
      apiKey,
    });
    const openai = new OpenAIApi(configuration);
    return prompt(
      [{ content, role: ChatCompletionRequestMessageRoleEnum.User }],
      openai,
      options
    );
  };
