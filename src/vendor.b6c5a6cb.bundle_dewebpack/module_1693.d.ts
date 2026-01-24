/**
 * Base converter for converting numbers between different alphabets/bases.
 * Allows conversion of numeric strings from one base system to another.
 */
export default class BaseConverter {
  /**
   * Source alphabet representing the input base system
   */
  private readonly srcAlphabet: string;

  /**
   * Destination alphabet representing the output base system
   */
  private readonly dstAlphabet: string;

  /**
   * Creates a new BaseConverter instance.
   * 
   * @param srcAlphabet - The alphabet string representing the source base (e.g., "0123456789" for decimal)
   * @param dstAlphabet - The alphabet string representing the destination base (e.g., "0123456789ABCDEF" for hexadecimal)
   * @throws {Error} If either alphabet is empty or invalid
   * 
   * @example
   *