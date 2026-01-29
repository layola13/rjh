type BaseCharset = string;

interface BaseConverter {
  convert(value: string): string;
}

class BaseConverterImpl implements BaseConverter {
  constructor(
    private readonly sourceBase: BaseCharset,
    private readonly targetBase: BaseCharset
  ) {}

  convert(value: string): string {
    // Implementation would be in module 383
    throw new Error('Method not implemented');
  }
}

const BIN: BaseCharset = "01";
const OCT: BaseCharset = "01234567";
const DEC: BaseCharset = "0123456789";
const HEX: BaseCharset = "0123456789abcdef";

function createBaseConverter(
  sourceBase: BaseCharset,
  targetBase: BaseCharset
): (value: string) => string {
  const converter = new BaseConverterImpl(sourceBase, targetBase);
  return (value: string): string => converter.convert(value);
}

createBaseConverter.BIN = BIN;
createBaseConverter.OCT = OCT;
createBaseConverter.DEC = DEC;
createBaseConverter.HEX = HEX;

export default createBaseConverter;
export { BIN, OCT, DEC, HEX };