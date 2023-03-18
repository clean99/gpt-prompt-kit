/**
 * A function that takes a string input and returns the normalized string.
 * @param text
 * @returns {string}
 */
export const getCodeBlock = (text: string): string | null =>
  /```[\s\S]*?\n([\s\S]*?)\n```/.exec(text)?.[1].trim() ?? null;
