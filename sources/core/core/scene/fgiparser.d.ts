export interface FgiParserContext {
  [key: string]: unknown;
}

export class FgiParser {
  constructor(data: FgiData);
  static parseFgiData(data: FgiData): ParseResult;
}