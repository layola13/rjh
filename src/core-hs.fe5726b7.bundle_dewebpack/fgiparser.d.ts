export interface FgiParserContext { ... }
export class FgiParser {
  constructor(data: FgiData): void;
  static parseFgiData(data: FgiData): ParseResult;
  // ... 其他方法签名
}