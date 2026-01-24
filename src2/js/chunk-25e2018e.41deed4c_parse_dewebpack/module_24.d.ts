/**
 * Processor class for converting and normalizing code expressions.
 * Handles chained comparisons, equality operators, logical operators, and quote normalization.
 */
export declare class Processor {
  /**
   * Array of conversion functions to be applied in sequence.
   */
  private readonly convertions: Array<(input: string) => string>;

  /**
   * Creates a new Processor instance with predefined conversion functions.
   */
  constructor();

  /**
   * Processes the input string by applying all registered conversion functions.
   * @param input - The string to be processed
   * @returns The processed string after all conversions
   */
  process(input: string): string;

  /**
   * Converts chained comparison operators into logical AND expressions.
   * Example: "a < b < c" becomes "a < b && b < c"
   * @param input - The string containing potential chained comparisons
   * @returns The string with chained comparisons converted to AND expressions
   */
  private convertChainedComparison(input: string): string;

  /**
   * Converts single equal signs to double equal signs for equality comparison.
   * Avoids converting operators like <=, >=, !=, ==
   * @param input - The string containing potential single equal signs
   * @returns The string with single equals converted to double equals
   */
  private convertEqualTo(input: string): string;

  /**
   * Converts comma and semicolon operators to logical AND and OR operators.
   * Commas become "&&" and semicolons become "||"
   * Special handling for "hc()" function calls to preserve comma syntax
   * @param input - The string containing commas and semicolons
   * @returns The string with commas and semicolons converted to logical operators
   */
  private convertAndOr(input: string): string;

  /**
   * Normalizes all quotes (single and double) to double quotes.
   * @param input - The string containing single or double quoted strings
   * @returns The string with all quotes normalized to double quotes
   */
  private convertSingleQuote(input: string): string;
}