export interface FormatCountdownOptions {
  format?: string;
}

/**
 * Time unit configurations: [unit symbol, milliseconds]
 */
const TIME_UNITS: ReadonlyArray<readonly [string, number]> = [
  ["Y", 31536000000], // Years: 365 days
  ["M", 2592000000],  // Months: 30 days
  ["D", 86400000],    // Days
  ["H", 3600000],     // Hours
  ["m", 60000],       // Minutes
  ["s", 1000],        // Seconds
  ["S", 1],           // Milliseconds
] as const;

const ESCAPE_PATTERN = /\[[^\]]*]/g;

/**
 * Formats a countdown from a target date to now
 * @param targetDate - Target date string or timestamp
 * @param options - Formatting options
 * @returns Formatted time string
 */
export function formatCountdown(
  targetDate: string | number | Date,
  options: FormatCountdownOptions = {}
): string {
  const { format = "" } = options;
  const targetTime = new Date(targetDate).getTime();
  const currentTime = Date.now();
  const remainingTime = Math.max(targetTime - currentTime, 0);
  
  return formatTimeStr(remainingTime, format);
}

/**
 * Formats milliseconds into a time string based on format pattern
 * @param milliseconds - Time duration in milliseconds
 * @param format - Format pattern (e.g., "HH:mm:ss", "DD[days] HH[hours]")
 * @returns Formatted time string
 */
export function formatTimeStr(milliseconds: number, format: string): string {
  let remainingTime = milliseconds;
  
  // Extract escaped text within brackets
  const escapedTexts = (format.match(ESCAPE_PATTERN) ?? []).map(
    (text) => text.slice(1, -1)
  );
  
  // Replace escaped sections with placeholder
  const formatWithPlaceholders = format.replace(ESCAPE_PATTERN, "[]");
  
  // Process each time unit
  const formattedString = TIME_UNITS.reduce((result, [unit, unitInMs]) => {
    if (result.indexOf(unit) === -1) {
      return result;
    }
    
    const unitValue = Math.floor(remainingTime / unitInMs);
    remainingTime -= unitValue * unitInMs;
    
    return result.replace(
      new RegExp(`${unit}+`, "g"),
      (match) => {
        const desiredLength = match.length;
        return padStart(unitValue.toString(), desiredLength, "0");
      }
    );
  }, formatWithPlaceholders);
  
  // Restore escaped text
  let escapeIndex = 0;
  return formattedString.replace(ESCAPE_PATTERN, () => {
    const text = escapedTexts[escapeIndex];
    escapeIndex += 1;
    return text;
  });
}

/**
 * Pads a string to a target length with a fill string
 * @param str - String to pad
 * @param targetLength - Desired length
 * @param fillString - String to use for padding
 * @returns Padded string
 */
function padStart(str: string, targetLength: number, fillString: string): string {
  if (str.length >= targetLength) {
    return str;
  }
  
  const fillLength = targetLength - str.length;
  const repeatedFill = fillString.repeat(Math.ceil(fillLength / fillString.length));
  
  return repeatedFill.slice(0, fillLength) + str;
}