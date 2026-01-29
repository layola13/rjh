type CharacterSet = string;

class BaseConverter {
  constructor(
    private readonly fromBase: CharacterSet,
    private readonly toBase: CharacterSet
  ) {}

  convert(value: string): string {
    // Implementation would be in module 383
    throw new Error('Method not implemented');
  }
}

function createConverter(fromBase: CharacterSet, toBase: CharacterSet): (value: string) => string {
  const converter = new BaseConverter(fromBase, toBase);
  return (value: string): string => {
    return converter.convert(value);
  };
}

export const BIN: CharacterSet = "01";
export const OCT: CharacterSet = "01234567";
export const DEC: CharacterSet = "0123456789";
export const HEX: CharacterSet = "0123456789abcdef";

export default createConverter;