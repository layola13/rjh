class BaseConverter {
  private base: string;
  private radix: number;

  constructor(base: string, radix: number) {
    this.base = base;
    this.radix = radix;
  }

  convert(value: number): string {
    if (value === 0) return this.base[0];
    
    let result = '';
    let num = Math.abs(value);
    
    while (num > 0) {
      result = this.base[num % this.radix] + result;
      num = Math.floor(num / this.radix);
    }
    
    return value < 0 ? '-' + result : result;
  }
}

interface BaseConverterFactory {
  (base: string, radix: number): (value: number) => string;
  BIN: string;
  OCT: string;
  DEC: string;
  HEX: string;
}

const createBaseConverter: BaseConverterFactory = ((base: string, radix: number) => {
  const converter = new BaseConverter(base, radix);
  return (value: number): string => converter.convert(value);
}) as BaseConverterFactory;

createBaseConverter.BIN = "01";
createBaseConverter.OCT = "01234567";
createBaseConverter.DEC = "0123456789";
createBaseConverter.HEX = "0123456789abcdef";

export default createBaseConverter;