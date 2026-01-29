import { formatValue } from './458880';

interface FormatOptions {
  formatList: string[];
  generateConfig: unknown;
  locale: unknown;
}

/**
 * Formats a value according to multiple format patterns and returns all formatted results
 * along with the primary formatted value.
 * 
 * @param value - The value to format
 * @param options - Configuration containing format list, generator config, and locale
 * @returns A tuple containing an array of all formatted values and the primary formatted value
 */
export default function formatMultiple(
  value: unknown,
  options: FormatOptions
): [string[], string] {
  const { formatList, generateConfig, locale } = options;

  if (!value) {
    return [[''], ''];
  }

  let primaryFormatted = '';
  const formattedValues: string[] = [];

  for (let index = 0; index < formatList.length; index += 1) {
    const format = formatList[index];
    const formatted = formatValue(value, {
      generateConfig,
      locale,
      format
    });

    formattedValues.push(formatted);

    if (index === 0) {
      primaryFormatted = formatted;
    }
  }

  return [formattedValues, primaryFormatted];
}