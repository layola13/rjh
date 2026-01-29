class BaseConverter {
  private readonly srcAlphabet: string;
  private readonly dstAlphabet: string;

  constructor(srcAlphabet: string, dstAlphabet: string) {
    if (!(srcAlphabet && dstAlphabet && srcAlphabet.length && dstAlphabet.length)) {
      throw new Error("Bad alphabet");
    }
    this.srcAlphabet = srcAlphabet;
    this.dstAlphabet = dstAlphabet;
  }

  /**
   * Convert a number from source alphabet to destination alphabet
   */
  convert(input: string | unknown[]): string | unknown[] {
    if (!this.isValid(input)) {
      throw new Error(`Number "${input}" contains of non-alphabetic digits (${this.srcAlphabet})`);
    }

    if (this.srcAlphabet === this.dstAlphabet) {
      return input;
    }

    const srcBase = this.srcAlphabet.length;
    const dstBase = this.dstAlphabet.length;
    let inputLength = input.length;
    const isString = typeof input === "string";
    let result: string | unknown[] = isString ? "" : [];

    const digitMap: Record<number, number> = {};
    for (let i = 0; i < inputLength; i++) {
      digitMap[i] = this.srcAlphabet.indexOf(input[i] as string);
    }

    let carry = 0;
    do {
      let remainder = 0;
      let outputIndex = 0;

      for (let i = 0; i < inputLength; i++) {
        carry = carry * srcBase + digitMap[i];
        
        if (carry >= dstBase) {
          digitMap[outputIndex++] = parseInt(String(carry / dstBase), 10);
          carry %= dstBase;
        } else if (outputIndex > 0) {
          digitMap[outputIndex++] = 0;
        }
      }

      inputLength = outputIndex;
      result = this.dstAlphabet.slice(carry, carry + 1).concat(result);
    } while (outputIndex !== 0);

    return result;
  }

  /**
   * Check if input contains only valid characters from source alphabet
   */
  isValid(input: string | unknown[]): boolean {
    for (let i = 0; i < input.length; i++) {
      if (this.srcAlphabet.indexOf(input[i] as string) === -1) {
        return false;
      }
    }
    return true;
  }
}

export default BaseConverter;