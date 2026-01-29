export class BaseConverter {
  private readonly srcAlphabet: string;
  private readonly dstAlphabet: string;

  constructor(sourceAlphabet: string, destinationAlphabet: string) {
    if (!sourceAlphabet || !destinationAlphabet || !sourceAlphabet.length || !destinationAlphabet.length) {
      throw new Error("Bad alphabet");
    }
    this.srcAlphabet = sourceAlphabet;
    this.dstAlphabet = destinationAlphabet;
  }

  /**
   * Converts a number from source alphabet to destination alphabet
   * @param input - The number to convert (string or array format)
   * @returns The converted number in destination alphabet
   */
  convert(input: string | number[]): string | number[] {
    const sourceBase = this.srcAlphabet.length;
    const destinationBase = this.dstAlphabet.length;
    let inputLength = input.length;
    let result: string | number[] = typeof input === "string" ? "" : [];

    if (!this.isValid(input)) {
      throw new Error(`Number "${input}" contains of non-alphabetic digits (${this.srcAlphabet})`);
    }

    if (this.srcAlphabet === this.dstAlphabet) {
      return input;
    }

    const digitValues: Record<number, number> = {};
    for (let i = 0; i < inputLength; i++) {
      digitValues[i] = this.srcAlphabet.indexOf(input[i]);
    }

    let newLength = 0;
    do {
      let carry = 0;
      newLength = 0;

      for (let i = 0; i < inputLength; i++) {
        carry = carry * sourceBase + digitValues[i];

        if (carry >= destinationBase) {
          digitValues[newLength++] = parseInt(String(carry / destinationBase), 10);
          carry %= destinationBase;
        } else if (newLength > 0) {
          digitValues[newLength++] = 0;
        }
      }

      inputLength = newLength;
      result = this.dstAlphabet.slice(carry, carry + 1).concat(result);
    } while (newLength !== 0);

    return result;
  }

  /**
   * Validates if the input contains only characters from source alphabet
   * @param input - The input to validate
   * @returns True if valid, false otherwise
   */
  isValid(input: string | number[]): boolean {
    for (let i = 0; i < input.length; ++i) {
      if (this.srcAlphabet.indexOf(input[i]) === -1) {
        return false;
      }
    }
    return true;
  }
}

export default BaseConverter;