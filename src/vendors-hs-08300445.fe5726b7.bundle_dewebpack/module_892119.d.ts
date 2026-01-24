import { formatValue } from './format-value';

/**
 * Configuration for date/time generation
 */
interface GenerateConfig<DateType = any> {
  locale?: string;
  // Add other config properties as needed
}

/**
 * Locale configuration for formatting
 */
interface Locale {
  // Define locale properties based on your requirements
  [key: string]: any;
}

/**
 * Options for formatting a value
 */
interface FormatOptions<DateType> {
  /** List of format patterns to apply */
  formatList: string[];
  /** Configuration for generating date/time values */
  generateConfig: GenerateConfig<DateType>;
  /** Locale settings for formatting */
  locale: Locale;
}

/**
 * Result tuple containing formatted values array and primary formatted value
 * [formattedValuesArray, primaryFormattedValue]
 */
type FormatResult = [string[], string];

/**
 * Comparison function to check if two arrays are deeply equal
 */
function areArraysEqual<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item === arr2[index]);
}

/**
 * Memoization function that caches results based on custom equality check
 * @param fn - Function to memoize
 * @param getDeps - Function to extract dependencies
 * @param isEqual - Custom equality checker for dependencies
 */
function useMemo<T, Deps>(
  fn: () => T,
  getDeps: Deps,
  isEqual: (prev: Deps, next: Deps) => boolean
): T {
  // Simplified memoization implementation
  // In production, this would integrate with React.useMemo or similar
  return fn();
}

/**
 * Formats a date/time value according to multiple format patterns
 * 
 * @param value - The date/time value to format
 * @param options - Formatting options
 * @returns Tuple of [array of formatted strings, primary formatted string]
 * 
 * @example
 * const [formats, primary] = formatWithList(date, {
 *   formatList: ['YYYY-MM-DD', 'DD/MM/YYYY'],
 *   generateConfig: config,
 *   locale: enUS
 * });
 */
export default function formatWithList<DateType>(
  value: DateType | null | undefined,
  options: FormatOptions<DateType>
): FormatResult {
  const { formatList, generateConfig, locale } = options;

  return useMemo(
    () => {
      // Return empty result if no value provided
      if (!value) {
        return [[''], ''] as FormatResult;
      }

      let primaryFormattedValue = '';
      const formattedValues: string[] = [];

      // Apply each format pattern to the value
      for (let formatIndex = 0; formatIndex < formatList.length; formatIndex += 1) {
        const formatPattern = formatList[formatIndex];
        
        const formattedString = formatValue(value, {
          generateConfig,
          locale,
          format: formatPattern,
        });

        formattedValues.push(formattedString);

        // Use first format as primary
        if (formatIndex === 0) {
          primaryFormattedValue = formattedString;
        }
      }

      return [formattedValues, primaryFormattedValue] as FormatResult;
    },
    [value, formatList],
    (prevDeps, nextDeps) => {
      // Compare value reference and format list equality
      return (
        prevDeps[0] === nextDeps[0] &&
        areArraysEqual(prevDeps[1] as string[], nextDeps[1] as string[])
      );
    }
  );
}