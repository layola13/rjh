class BaseConverter {
  private srcAlphabet: string;
  private dstAlphabet: string;

  constructor(sourceAlphabet: string, destinationAlphabet: string) {
    if (!(sourceAlphabet && destinationAlphabet && sourceAlphabet.length && destinationAlphabet.length)) {
      throw new Error("Bad alphabet");
    }
    this.srcAlphabet = sourceAlphabet;
    this.dstAlphabet = destinationAlphabet;
  }

  convert(input: string): string;
  convert(input: number[]): number[];
  convert(input: string | number[]): string | number[] {
    const isStringInput = typeof input === "string";
    const inputLength = input.length;
    const sourceBase = this.srcAlphabet.length;
    const destinationBase = this.dstAlphabet.length;

    if (!this.isValid(input)) {
      throw new Error(
        `Number "${input}" contains of non-alphabetic digits (${this.srcAlphabet})`
      );
    }

    if (this.srcAlphabet === this.dstAlphabet) {
      return input;
    }

    const digitMap: Record<number, number> = {};
    for (let index = 0; index < inputLength; index++) {
      digitMap[index] = this.srcAlphabet.indexOf(input[index]);
    }

    let currentLength = inputLength;
    let result: string | number[] = isStringInput ? "" : [];
    let writePosition: number;
    let remainder: number;

    do {
      remainder = 0;
      writePosition = 0;

      for (let index = 0; index < currentLength; index++) {
        remainder = remainder * sourceBase + digitMap[index];

        if (remainder >= destinationBase) {
          digitMap[writePosition++] = Math.floor(remainder / destinationBase);
          remainder %= destinationBase;
        } else if (writePosition > 0) {
          digitMap[writePosition++] = 0;
        }
      }

      currentLength = writePosition;
      result = this.dstAlphabet.slice(remainder, remainder + 1).concat(result);
    } while (writePosition !== 0);

    return result;
  }

  isValid(input: string | number[]): boolean {
    for (let index = 0; index < input.length; index++) {
      if (this.srcAlphabet.indexOf(input[index]) === -1) {
        return false;
      }
    }
    return true;
  }
}

export default BaseConverter;